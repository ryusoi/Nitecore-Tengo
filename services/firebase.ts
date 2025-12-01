
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIeFqpLo1YgvStagPF8edoZfHVT_YvHCk",
  authDomain: "nitecoreiran-1.firebaseapp.com",
  projectId: "nitecoreiran-1",
  storageBucket: "nitecoreiran-1.firebasestorage.app",
  messagingSenderId: "577342036022",
  appId: "1:577342036022:web:f62ec6a80dc343f7cbe097",
  measurementId: "G-K3KVWG8SBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export const googleProvider = new GoogleAuthProvider();
