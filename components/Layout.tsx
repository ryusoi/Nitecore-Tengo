
import React, { useState, useEffect } from 'react';
import { useLocation, Link, HashRouter } from 'react-router-dom';
import { Menu, X, Globe, Moon, Sun, Search, ChevronRight, Facebook, Instagram, Youtube, Twitter, Phone, Mail, MessageCircle, Send, Linkedin, User, QrCode } from 'lucide-react';
import { translations, dir } from '../i18n';
import { Language } from '../types';
import { auth } from '../services/firebase';
import { ShareMenuItem } from './ShareFeature';

interface LayoutProps {
  children?: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<LayoutProps> = ({ lang, setLang, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const t = translations[lang];
  const isRtl = dir(lang) === 'rtl';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Compute display name safely with fallback to email handle
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Member';

  return (
    <div className="w-full flex flex-col transition-colors duration-300">
       {/* Top Bar - Now containing Brand Links with Dynamic Zoom/Hover */}
       <div className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#333] h-12 flex items-center justify-between px-4 relative z-50 transition-colors duration-300">
          
          <div className="flex items-center space-x-2 md:space-x-6 overflow-x-auto no-scrollbar">
              <Link to="/" className="group flex items-center space-x-1 transition-transform hover:scale-110 duration-300">
                  <span className="text-black dark:text-nitecore-yellow font-black italic tracking-tighter text-sm group-hover:text-accent dark:group-hover:text-white transition-colors">{t['brand.nitecore'].toUpperCase()}</span>
              </Link>
              <div className="w-px h-4 bg-gray-300 dark:bg-[#333]"></div>
              
              <Link to="/olight" className="group flex items-center space-x-1 transition-transform hover:scale-110 duration-300">
                  <span className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase group-hover:text-olight-green transition-colors">{t['brand.olight'].toUpperCase()}</span>
              </Link>
              <div className="w-px h-4 bg-gray-300 dark:bg-[#333]"></div>

              <Link to="/wuben" className="group flex items-center space-x-1 transition-transform hover:scale-110 duration-300">
                   <span className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase group-hover:text-wuben-blue transition-colors">{t['brand.wuben'].toUpperCase()}</span>
              </Link>
              <div className="w-px h-4 bg-gray-300 dark:bg-[#333]"></div>

              <Link to="/victorinox" className="group flex items-center space-x-1 transition-transform hover:scale-110 duration-300">
                  <span className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase group-hover:text-victorinox-red transition-colors">{t['brand.victorinox'].toUpperCase()}</span>
              </Link>
              <div className="w-px h-4 bg-gray-300 dark:bg-[#333]"></div>

              <Link to="/tech" className="group flex items-center space-x-1 transition-transform hover:scale-110 duration-300">
                  <span className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase group-hover:text-neon transition-colors">TECH</span>
              </Link>
          </div>
          
          <div className="flex items-center space-x-4 ml-4">
             
             {/* User Icon - Auth Link - Modified for Logged In State */}
             <Link to={currentUser ? "/profile" : "/auth"} className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
                {currentUser ? (
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#222] px-3 py-1 rounded-full border border-gray-200 dark:border-[#333]">
                        <div className="relative">
                            <User size={14} />
                            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-[#222] animate-pulse"></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase hidden sm:inline truncate max-w-[100px]">{displayName}</span>
                        <span className="text-[8px] text-green-500 font-bold uppercase hidden sm:inline">{t['status.online']}</span>
                    </div>
                ) : (
                    <User size={16} />
                )}
             </Link>

             {/* Theme Toggle - Sleek Slider */}
             <button 
                onClick={toggleTheme} 
                className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none flex items-center p-1"
                aria-label="Toggle Theme"
             >
                <div className={`
                    w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                    ${theme === 'dark' ? 'translate-x-6 bg-black text-yellow-400' : 'translate-x-0 bg-white text-orange-500'}
                `}>
                    {theme === 'dark' ? <Moon size={10} /> : <Sun size={10} />}
                </div>
             </button>

             {/* Language Switcher */}
             <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-bold transition-colors">
                   <Globe size={14} />
                   <span className="uppercase text-xs">{lang}</span>
                </button>
                 <div className="absolute right-0 top-full mt-2 w-24 bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded shadow-xl overflow-hidden hidden group-hover:block z-50">
                  {(['en', 'fa', 'zh', 'es'] as Language[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-[#333] text-xs text-slate-800 dark:text-white font-bold uppercase transition-colors"
                    >
                      {l}
                    </button>
                  ))}
                </div>
             </div>
          </div>
       </div>

       {/* Main Navigation Bar */}
       <header className="bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-[#222] sticky top-0 z-40 shadow-sm dark:shadow-2xl transition-colors duration-300">
          <div className="container mx-auto px-4 h-20 flex items-center justify-between">
              
              {/* Animated Nitecore Iran Logo */}
              <Link to="/" className="flex items-center group relative pr-4">
                 <div className="font-black text-xl md:text-2xl italic tracking-tighter transform skew-x-[-5deg]">
                    <span 
                        className="logo-shine uppercase pr-2" 
                        data-text="NITECORE IRAN"
                    >
                        NITECORE IRAN
                    </span>
                 </div>
              </Link>

              {/* Desktop Menu - Categories */}
              <nav className="hidden lg:flex items-center space-x-1">
                 <Link to="/shop" className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white px-4 py-6 text-sm font-bold transition-colors uppercase tracking-wider">
                    {t['nav.shop']}
                 </Link>
                 <Link to="/accessories" className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white px-4 py-6 text-sm font-bold transition-colors uppercase tracking-wider">
                    {t['nav.accessories']}
                 </Link>
                 <Link to="/compare" className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white px-4 py-6 text-sm font-bold transition-colors uppercase tracking-wider">
                    {t['nav.compare']}
                 </Link>
                 <ShareMenuItem lang={lang} variant="desktop" />
                 <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white px-4 py-6 text-sm font-bold transition-colors uppercase tracking-wider text-accent dark:text-nitecore-yellow">
                    {t['nav.contact']}
                 </Link>
              </nav>

              {/* Right Icons */}
              <div className="flex items-center space-x-4">
                 <Link to="/ai" className="hidden md:flex items-center space-x-2 text-white dark:text-black bg-accent dark:bg-nitecore-yellow px-4 py-2 rounded-full hover:bg-black dark:hover:bg-white hover:text-white hover:scale-105 transition-all shadow-[0_4px_14px_0_rgba(0,151,189,0.39)] dark:shadow-[0_0_15px_rgba(255,225,0,0.3)]">
                    <span className="text-xs font-black uppercase tracking-wide">{t['nav.ai']}</span>
                 </Link>
                 <button className="lg:hidden text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                 </button>
              </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden bg-white dark:bg-[#111] border-t border-gray-200 dark:border-[#222] p-4 absolute w-full left-0 top-20 z-50 flex flex-col space-y-4 shadow-2xl">
                <Link to="/" className="text-accent dark:text-nitecore-yellow font-bold text-lg" onClick={() => setIsOpen(false)}>{t['brand.nitecore']}</Link>
                <Link to="/wuben" className="text-slate-900 dark:text-white font-bold text-lg hover:text-blue-400" onClick={() => setIsOpen(false)}>{t['brand.wuben']}</Link>
                <Link to="/olight" className="text-slate-900 dark:text-white font-bold text-lg hover:text-green-400" onClick={() => setIsOpen(false)}>{t['brand.olight']}</Link>
                <Link to="/victorinox" className="text-slate-900 dark:text-white font-bold text-lg hover:text-red-400" onClick={() => setIsOpen(false)}>{t['brand.victorinox']}</Link>
                <Link to="/tech" className="text-slate-900 dark:text-white font-bold text-lg" onClick={() => setIsOpen(false)}>{t['brand.tech']}</Link>
                <Link to="/accessories" className="text-gray-500 dark:text-gray-400 font-bold" onClick={() => setIsOpen(false)}>{t['nav.accessories']}</Link>
                <ShareMenuItem lang={lang} variant="mobile" />
                <Link to="/contact" className="text-accent dark:text-nitecore-yellow font-bold" onClick={() => setIsOpen(false)}>{t['nav.contact']}</Link>
                <Link to="/auth" className="text-gray-500 dark:text-gray-400 font-bold flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <User size={16} /> {t['auth.signin']}
                </Link>
            </div>
          )}
       </header>
    </div>
  );
};

export const Footer: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const [showFullQr, setShowFullQr] = useState(false);
  
  // Use user provided static QR code image
  const appQrUrl = "https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/QR%20code%20Nitecoreiran.vercel.app.png";

  return (
    <footer className="bg-slate-50 dark:bg-[#020202] border-t border-gray-200 dark:border-[#1a1a1a] text-gray-600 dark:text-gray-400 pt-16 pb-8 text-xs relative overflow-hidden transition-colors duration-300">
       {/* Background accent */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 dark:bg-nitecore-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 relative z-10">
          
          {/* Column 1: Company Profile (4 cols) */}
          <div className="md:col-span-5 pr-8">
             <div className="font-black text-3xl italic tracking-tighter text-slate-900 dark:text-white mb-6">
                NITECORE <span className="text-accent dark:text-nitecore-yellow">IRAN</span>
             </div>
             <p className="mb-4 text-slate-800 dark:text-white font-bold uppercase tracking-wide text-xs">{t['company.role']}</p>
             <p className="mb-6 leading-relaxed text-gray-500 text-sm text-justify">
                {t['footer.desc']}
             </p>
             
             {/* Dynamic Vivid Mini Icons */}
             <div className="flex items-center gap-3 mt-6">
                 <a href={`https://wa.me/${t['contact.mobile'].replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-500 hover:bg-green-500 hover:text-white transition-all">
                     <MessageCircle size={16} />
                 </a>
                 <a href={`mailto:${t['contact.email']}`} className="w-8 h-8 rounded bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-500 hover:bg-orange-500 hover:text-white transition-all">
                     <Mail size={16} />
                 </a>
                 <a href={`tel:${t['contact.phone'].replace(/\s/g, '')}`} className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
                     <Phone size={16} />
                 </a>
                 <a href="https://t.me/+8ETRinn0OhdiNDZk" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-400/20 flex items-center justify-center text-blue-500 dark:text-blue-400 hover:bg-blue-400 hover:text-white transition-all">
                     <Send size={16} />
                 </a>
                 <a href="#" className="w-8 h-8 rounded bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center text-pink-600 dark:text-pink-500 hover:bg-pink-500 hover:text-white transition-all">
                     <Instagram size={16} />
                 </a>
                 <a href="#" className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-700/20 flex items-center justify-center text-blue-700 hover:bg-blue-700 hover:text-white transition-all">
                     <Linkedin size={16} />
                 </a>
                 <button 
                   onClick={() => setShowFullQr(true)}
                   className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white transition-all shadow-sm"
                   title="Scan QR Code"
                 >
                    <QrCode size={16} />
                 </button>
             </div>
          </div>

          {/* Column 2: Sitemap (3 cols) */}
          <div className="md:col-span-3">
             <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase text-sm tracking-widest border-l-2 border-accent dark:border-nitecore-yellow pl-3">{t['sitemap.title']}</h4>
             <ul className="space-y-3">
                <li><Link to="/" className="hover:text-accent dark:hover:text-nitecore-yellow transition-colors hover:pl-2 duration-200 block">{t['nav.home']}</Link></li>
                <li><Link to="/shop" className="hover:text-accent dark:hover:text-nitecore-yellow transition-colors hover:pl-2 duration-200 block">{t['sitemap.products']}</Link></li>
                <li><Link to="/shop" className="hover:text-accent dark:hover:text-nitecore-yellow transition-colors hover:pl-2 duration-200 block">{t['sitemap.categories']}</Link></li>
                <li><Link to="/about" className="hover:text-accent dark:hover:text-nitecore-yellow transition-colors hover:pl-2 duration-200 block">{t['nav.about']}</Link></li>
                <li><Link to="/contact" className="hover:text-accent dark:hover:text-nitecore-yellow transition-colors hover:pl-2 duration-200 block">{t['nav.contact']}</Link></li>
                <li><Link to="/blog" className="hover:text-accent dark:hover:text-nitecore-yellow transition-colors hover:pl-2 duration-200 block">{t['sitemap.blog']}</Link></li>
             </ul>
          </div>

           {/* Column 3: Contact Details (4 cols) */}
           <div className="md:col-span-4 flex flex-col justify-between">
              <div>
                  <h4 className="text-slate-900 dark:text-white font-bold mb-6 uppercase text-sm tracking-widest border-l-2 border-accent dark:border-nitecore-yellow pl-3">{t['footer.contact']}</h4>
                  <div className="space-y-4">
                      <div>
                          <span className="text-gray-500 dark:text-gray-600 text-[10px] uppercase font-bold block mb-1">Headquarters</span>
                          <p className="text-gray-700 dark:text-gray-300 leading-snug">{t['company.address']}</p>
                      </div>
                      <div>
                          <span className="text-gray-500 dark:text-gray-600 text-[10px] uppercase font-bold block mb-1">Management</span>
                          <p className="text-slate-900 dark:text-white font-bold">{t['company.ceo']}</p>
                          <p className="text-slate-800 dark:text-white font-bold text-[10px] uppercase tracking-wide opacity-80">{t['company.cmo']}</p>
                      </div>
                      <div className="pt-2 space-y-2">
                           <p className="text-lg font-mono text-slate-900 dark:text-white font-bold tracking-wider hover:text-accent dark:hover:text-nitecore-yellow transition-colors cursor-pointer">{t['contact.mobile']}</p>
                           <p className="text-base font-mono text-gray-500 font-bold tracking-wider hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">{t['contact.phone']}</p>
                      </div>
                  </div>
              </div>

              {/* QR Code Embedded - Made Larger as Requested */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#222] flex items-center gap-4">
                  <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 dark:border-none">
                     <img 
                        src={appQrUrl}
                        alt="Nitecore Iran QR" 
                        className="w-32 h-32 object-contain"
                     />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-slate-900 dark:text-white mb-0.5">Share Me</span>
                      <span className="text-[9px] text-gray-500 max-w-[150px] leading-tight">Scan for exclusive deals and quick support access.</span>
                  </div>
              </div>
           </div>
       </div>

       {/* Bottom Legal Strip */}
       <div className="container mx-auto px-4 border-t border-gray-200 dark:border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
          <p>{t['footer.rights']}</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-[10px] uppercase font-bold tracking-wider">
             <Link to="/terms" className="hover:text-accent dark:hover:text-white">{t['sitemap.terms']}</Link>
             <Link to="/return" className="hover:text-accent dark:hover:text-white">{t['sitemap.return']}</Link>
             <Link to="/privacy" className="hover:text-accent dark:hover:text-white">{t['sitemap.privacy']}</Link>
          </div>
       </div>

       {/* Full Screen QR Modal */}
       {showFullQr && (
         <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setShowFullQr(false)}
         >
            <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative shadow-2xl transform scale-100 transition-transform">
                <button 
                   onClick={() => setShowFullQr(false)}
                   className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                   <X size={24} />
                </button>
                <div className="flex flex-col items-center">
                    <img 
                        src={appQrUrl}
                        className="w-full h-auto object-contain mb-4"
                        alt="Full QR" 
                    />
                    <p className="text-center font-bold text-black uppercase tracking-widest text-sm">Scan to Share</p>
                    <p className="text-center text-xs text-gray-500 mt-2">Nitecore Iran Official App</p>
                </div>
            </div>
         </div>
       )}
    </footer>
  );
};
