
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { auth } from '../services/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { translations, Language } from '../i18n';

interface AuthPageProps {
  lang: Language;
}

export const AuthPage: React.FC<AuthPageProps> = ({ lang }) => {
  const t = translations[lang];
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  // Secure system salt to enable instant "passwordless" experience without email links
  const SYSTEM_KEY = "Nitecore_Fast_Auth_2025_Secure"; 

  const handleInstantLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError(null);
    setLoading(true);

    try {
      // 1. Try to Login
      try {
        await signInWithEmailAndPassword(auth, email, SYSTEM_KEY);
        // Login Successful - Existing User
        navigate('/', { replace: true });
      } catch (signInError: any) {
        // 2. If User Not Found -> Register New User
        if (
          signInError.code === 'auth/user-not-found' || 
          signInError.code === 'auth/invalid-credential' || 
          signInError.code === 'auth/wrong-password'
        ) {
             const userCredential = await createUserWithEmailAndPassword(auth, email, SYSTEM_KEY);
             const user = userCredential.user;

             // Extract Name from Email (e.g., john@gmail.com -> John)
             const rawName = email.split('@')[0].replace(/[0-9]/g, '');
             const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1) || 'Member';

             // Set New Signup Flag for Coupon Modal
             window.sessionStorage.setItem('isNewSignup', 'true');

             // Update Profile (Fire & Forget for speed)
             updateProfile(user, {
                 displayName: displayName
             }).catch(console.error);

             navigate('/', { replace: true });
        } else {
            throw signInError;
        }
      }
    } catch (err: any) {
      console.error("Auth Error", err);
      setLoading(false);
      let msg = err.message;
      if (err.code === 'auth/network-request-failed') msg = "Network error. Please check connection.";
      if (err.code === 'auth/too-many-requests') msg = "Too many attempts. Please wait.";
      if (err.code === 'auth/invalid-email') msg = "Invalid email format.";
      setError(msg.replace('Firebase:', '').trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white font-sans overflow-hidden p-6 relative">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
         
         {/* Logo Section */}
         <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-2">
              NITECORE <span className="text-nitecore-yellow">IRAN</span>
            </h1>
            <p className="text-gray-400 text-sm tracking-widest uppercase font-bold">
              {t['auth.welcome']}
            </p>
         </div>

         {/* Main Card */}
         <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111] border border-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
         >
            {/* Top Highlight Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nitecore-yellow to-transparent opacity-50"></div>

            <form onSubmit={handleInstantLogin} className="space-y-6">
               {error && (
                 <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg text-xs text-center font-bold animate-pulse">
                    {error}
                 </div>
               )}

               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                    {t['auth.email']}
                  </label>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-nitecore-yellow transition-colors" size={20} />
                     <input 
                       type="email" 
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       className="w-full bg-[#080808] border border-[#333] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:border-nitecore-yellow focus:ring-1 focus:ring-nitecore-yellow transition-all outline-none text-lg"
                       placeholder="you@example.com"
                       autoFocus
                       required
                       autoComplete="email"
                     />
                  </div>
               </div>

               <button 
                  type="submit" 
                  disabled={loading || !email}
                  className="w-full bg-nitecore-yellow hover:bg-yellow-400 text-black font-black uppercase py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(253,235,23,0.2)] hover:shadow-[0_0_30px_rgba(253,235,23,0.4)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
               >
                  {loading ? (
                    <div className="flex items-center gap-2">
                         <Loader2 className="animate-spin" size={20} />
                         <span>Connecting...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">{t['auth.continue']}</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
               </button>
               
               <p className="text-center text-[10px] text-gray-600">
                  By continuing, you unlock exclusive member prices.
               </p>
            </form>
         </motion.div>
         
         <div className="mt-8 text-center flex items-center justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Zap size={14} className="text-nitecore-yellow" /> Instant
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <ShieldCheck size={14} className="text-green-500" /> Secure
             </div>
         </div>
      </div>
    </div>
  );
};
