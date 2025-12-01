
import React, { useState } from 'react';
import { 
  Share2, X, Link as LinkIcon, Download, 
  Smartphone, Mail, MessageCircle, Send, Facebook, Linkedin, Twitter, QrCode
} from 'lucide-react';
import { translations, Language } from '../i18n';

// Static Assets - Generated QR Code for the App URL
const APP_URL = "https://nitecoreiran.vercel.app";
// Use user provided static QR code image
const APP_QR_URL = "https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/QR%20code%20Nitecoreiran.vercel.app.png";

interface ShareProps {
  lang: Language;
  variant: 'desktop' | 'mobile';
}

export const ShareMenuItem: React.FC<ShareProps> = ({ lang, variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const desktopClass = "text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white px-4 py-6 text-sm font-bold transition-colors uppercase tracking-wider flex items-center gap-2 cursor-pointer";
  const mobileClass = "text-slate-900 dark:text-white font-bold text-lg hover:text-accent dark:hover:text-nitecore-yellow flex items-center gap-2 cursor-pointer";

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={variant === 'desktop' ? desktopClass : mobileClass}
      >
        {variant === 'mobile' && <Share2 size={20} />}
        <span>{t['share.title'] || 'Share'}</span>
        {variant === 'desktop' && <Share2 size={16} />}
      </div>

      {isOpen && <ShareModal lang={lang} onClose={() => setIsOpen(false)} />}
    </>
  );
};

interface ShareModalProps {
  lang: Language;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ lang, onClose }) => {
  const t = translations[lang];
  const [currentTab, setCurrentTab] = useState<'social' | 'qr'>('social');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showFullScreenQr, setShowFullScreenQr] = useState(false);
  
  // Always use the fixed APP_URL instead of window.location.href
  const title = document.title;
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(APP_URL);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = APP_URL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: APP_URL });
      } catch (err) {
        console.error("Share failed", err);
      }
    }
  };

  const downloadQr = (imageUrl: string) => {
    // Open in new tab instead of blob download to avoid writing blob code
    window.open(imageUrl, '_blank');
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-24 md:items-center md:pt-4">
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" 
          onClick={onClose}
        ></div>

        <div className="bg-white dark:bg-[#111] rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-gray-200 dark:border-[#333] transform transition-all max-h-[85vh] overflow-y-auto">
          <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 flex items-center justify-between border-b border-gray-100 dark:border-[#222] sticky top-0 z-20">
             <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
               <Share2 size={20} className="text-accent dark:text-nitecore-yellow" />
               {t['share.title'] || 'Share'}
             </h3>
             <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
               <X size={24} />
             </button>
          </div>

          <div className="flex p-2 gap-2 bg-gray-50 dark:bg-[#1a1a1a]">
             <button 
               onClick={() => setCurrentTab('social')}
               className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'social' ? 'bg-white dark:bg-[#222] text-accent dark:text-nitecore-yellow shadow-sm' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-[#333]'}`}
             >
               Social
             </button>
             <button 
               onClick={() => setCurrentTab('qr')}
               className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${currentTab === 'qr' ? 'bg-white dark:bg-[#222] text-accent dark:text-nitecore-yellow shadow-sm' : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-[#333]'}`}
             >
               QR Code
             </button>
          </div>

          <div className="p-6">
             {currentTab === 'social' ? (
               <div className="space-y-6">
                  {typeof navigator !== 'undefined' && navigator.share && (
                      <button 
                        onClick={handleSystemShare}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-[1.02]"
                      >
                         <Smartphone size={20} />
                         {t['share.system'] || 'System Share'}
                      </button>
                  )}

                  <div className="relative">
                     <div className="flex items-center bg-gray-100 dark:bg-[#222] rounded-xl border border-gray-200 dark:border-[#333] overflow-hidden p-1">
                        <div className="p-3 text-gray-400">
                           <LinkIcon size={18} />
                        </div>
                        <input 
                          readOnly 
                          value={APP_URL} 
                          className="bg-transparent flex-1 text-sm text-slate-800 dark:text-white outline-none"
                        />
                        <button 
                          onClick={handleCopy}
                          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-white dark:bg-[#333] text-slate-900 dark:text-white hover:bg-gray-200 dark:hover:bg-[#444]'}`}
                        >
                           {copySuccess ? (t['share.copied'] || 'Copied!') : (t['share.copy'] || 'Copy')}
                        </button>
                     </div>
                  </div>

                  <div>
                     <p className="text-xs font-bold text-gray-500 uppercase mb-4 text-center">{t['share.via'] || 'Share via'}</p>
                     <div className="grid grid-cols-4 gap-4">
                        <ShareBtn label="WhatsApp" icon={<MessageCircle size={24} />} color="bg-green-500" href={`https://wa.me/?text=${encodeURIComponent(APP_URL)}`} />
                        <ShareBtn label="Telegram" icon={<Send size={24} />} color="bg-blue-400" href={`https://t.me/share/url?url=${encodeURIComponent(APP_URL)}`} />
                        <ShareBtn label="Email" icon={<Mail size={24} />} color="bg-gray-600" href={`mailto:?body=${encodeURIComponent(APP_URL)}`} />
                        <ShareBtn label="Twitter" icon={<Twitter size={24} />} color="bg-sky-500" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(APP_URL)}`} />
                        <ShareBtn label="Facebook" icon={<Facebook size={24} />} color="bg-blue-700" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(APP_URL)}`} />
                        <ShareBtn label="LinkedIn" icon={<Linkedin size={24} />} color="bg-blue-800" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(APP_URL)}`} />
                        
                        {/* New QR Code Icon that opens full screen */}
                        <button 
                            onClick={() => setShowFullScreenQr(true)}
                            className="flex flex-col items-center gap-2 group cursor-pointer"
                        >
                           <div className="bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                              <QrCode size={24} />
                           </div>
                           <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">QR Code</span>
                        </button>
                     </div>
                  </div>
               </div>
             ) : (
               <div className="space-y-6">
                  <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 dark:bg-[#222] p-1 rounded-lg inline-flex">
                          <div className="px-4 py-1 text-xs font-bold text-slate-500 dark:text-gray-400">Scan to Share</div>
                      </div>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                      <div className="flex flex-col items-center">
                          <div className="p-3 bg-white rounded-xl shadow-lg border border-gray-100 dark:border-none mb-3">
                              <img src={APP_QR_URL} alt="App QR" className="w-40 h-40 object-contain" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{t['share.qr_app'] || 'App QR'}</span>
                          <button 
                             onClick={() => downloadQr(APP_QR_URL)}
                             className="flex items-center gap-2 text-xs font-bold text-accent dark:text-nitecore-yellow hover:underline"
                          >
                              <Download size={14} /> {t['share.download'] || 'Download'}
                          </button>
                      </div>
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Full Screen QR Overlay */}
      {showFullScreenQr && (
          <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 pt-20 md:pt-6" onClick={() => setShowFullScreenQr(false)}>
              <div className="relative flex flex-col items-center animate-in zoom-in duration-300">
                  <button 
                    onClick={() => setShowFullScreenQr(false)}
                    className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
                  >
                     <X size={32} />
                  </button>
                  <div className="bg-white p-8 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                      <img src={APP_QR_URL} className="w-64 h-64 md:w-80 md:h-80 object-contain" alt="Full Screen QR" />
                  </div>
                  <p className="text-white font-bold uppercase tracking-[0.2em] mt-8 text-xl">Scan to Visit</p>
                  <p className="text-white/50 text-sm mt-2">{APP_URL}</p>
              </div>
          </div>
      )}
    </>
  );
};

const ShareBtn = ({ label, icon, color, href }: { label: string, icon: React.ReactNode, color: string, href: string }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 group"
    >
       <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
          {icon}
       </div>
       <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">{label}</span>
    </a>
);
