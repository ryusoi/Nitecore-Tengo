
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Star, X } from 'lucide-react';
import { translations, Language } from '../i18n';

interface WelcomeModalProps {
  lang: Language;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ lang }) => {
  const t = translations[lang];
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if the user just signed up (flag set in AuthPage)
    const isNewSignup = window.sessionStorage.getItem('isNewSignup');

    if (isNewSignup === 'true') {
      setShow(true);
      
      // Clear the flag so it doesn't show again on refresh
      window.sessionStorage.removeItem('isNewSignup');

      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
          {/* Backdrop Blur */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
             onClick={() => setShow(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#111] border border-nitecore-yellow/30 rounded-2xl shadow-[0_0_50px_rgba(253,235,23,0.15)] overflow-hidden pointer-events-auto mx-4"
          >
             {/* Decorative Elements */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nitecore-yellow to-transparent"></div>
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-nitecore-yellow/10 rounded-full blur-3xl pointer-events-none"></div>
             
             <div className="p-8 text-center relative z-10">
                <button 
                  onClick={() => setShow(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 bg-nitecore-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-nitecore-yellow/20">
                    <ShieldCheck size={32} className="text-nitecore-yellow" />
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2 italic">
                   {t['welcome.elite_title']}
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                   {t['welcome.community_msg']}
                </p>

                {/* Coupon Ticket */}
                <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-1 shadow-lg transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300 group">
                    <div className="border-2 border-dashed border-black/30 rounded bg-white/10 backdrop-blur-sm p-4 flex items-center justify-between relative overflow-hidden">
                         <div className="text-left">
                             <span className="block text-[10px] font-black text-black/60 uppercase tracking-widest">{t['coupon.desc']}</span>
                             <span className="block text-3xl font-black text-black tracking-tighter">AMIGOS</span>
                         </div>
                         <div className="text-right">
                             <span className="block text-xl font-bold text-black">{t['coupon.off']}</span>
                             <div className="flex justify-end mt-1">
                                 <Star size={12} className="text-black fill-black" />
                                 <Star size={12} className="text-black fill-black" />
                                 <Star size={12} className="text-black fill-black" />
                             </div>
                         </div>
                         
                         {/* Circle Cutouts */}
                         <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#111] rounded-full"></div>
                         <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#111] rounded-full"></div>
                    </div>
                </div>

                <div className="mt-6 text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                    Authorized Member Access
                </div>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
