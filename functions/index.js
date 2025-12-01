
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bcrypt = require('bcryptjs');

admin.initializeApp();
const db = admin.firestore();

// Rate limiting map (simple in-memory for demo, use Redis for production)
const rateLimits = new Map();

exports.validateSpecialCode = functions.https.onCall(async (data, context) => {
    // 1. Auth Check
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'User must be logged in.');
    }

    const { code } = data;
    const uid = context.auth.uid;

    // 2. Rate Limit (5 attempts per 10 minutes)
    const now = Date.now();
    const limitRecord = rateLimits.get(uid) || { count: 0, timestamp: now };
    if (now - limitRecord.timestamp > 600000) {
         limitRecord.count = 0;
         limitRecord.timestamp = now;
    }
    if (limitRecord.count >= 5) {
        throw new functions.https.HttpsError('resource-exhausted', 'Too many attempts. Try again later.');
    }
    limitRecord.count++;
    rateLimits.set(uid, limitRecord);

    // 3. Logic
    try {
        const codesSnapshot = await db.collection('accessCodes').where('active', '==', true).get();
        
        let validCodeDoc = null;

        // In production, optimize this. Here we iterate to compare bcrypt hash.
        // Assuming 'code' passed is plaintext. Stored is bcrypt hash.
        for (const doc of codesSnapshot.docs) {
             const codeData = doc.data();
             const isMatch = await bcrypt.compare(code, codeData.hashedCode);
             if (isMatch) {
                 if (codeData.expiresAt && codeData.expiresAt.toMillis() < now) continue;
                 if (codeData.singleUse && codeData.usedBy && codeData.usedBy.includes(uid)) {
                     throw new functions.https.HttpsError('failed-precondition', 'Code already used.');
                 }
                 validCodeDoc = doc;
                 break;
             }
        }

        if (validCodeDoc) {
             // Grant Claim
             await admin.auth().setCustomUserClaims(uid, { specialUser: true });
             
             // Update User Profile
             await db.collection('users').doc(uid).set({
                 isSpecialUser: true,
                 specialCode: 'REDACTED', // Don't store plain code
                 metadata: { specialUserSince: admin.firestore.FieldValue.serverTimestamp() }
             }, { merge: true });

             // Mark used if single use
             if (validCodeDoc.data().singleUse) {
                 await validCodeDoc.ref.update({
                     usedBy: admin.firestore.FieldValue.arrayUnion(uid)
                 });
             }

             return { valid: true };
        } else {
             return { valid: false };
        }

    } catch (error) {
        console.error("Validation Error", error);
        throw new functions.https.HttpsError('internal', 'Validation failed');
    }
});

exports.logLogin = functions.https.onCall(async (data, context) => {
    if (!context.auth) return;
    
    const { provider } = data;
    
    await db.collection('loginLogs').add({
        uid: context.auth.uid,
        provider: provider || 'unknown',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        userAgent: context.rawRequest.headers['user-agent'] || 'unknown',
        ip: context.rawRequest.ip || 'unknown'
    });
    
    return { success: true };
});
