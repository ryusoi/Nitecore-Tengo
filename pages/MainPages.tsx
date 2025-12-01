
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ProductCard, formatPrice } from '../components/ProductComponents';
import { products } from '../services/mockData';
import { translations, Language } from '../i18n';
import { Link } from 'react-router-dom';
import { Shield, Zap, MapPin, Users, ChevronRight, Cpu, Play, Star, ExternalLink, Camera, BatteryCharging, Briefcase, Factory, Sparkles, ArrowRight, RotateCcw, Award, Calendar, MessageCircle, ArrowLeft } from 'lucide-react';
import { AIAssistant } from '../components/AIAssistant';

interface PageProps {
  lang: Language;
}

// Helper to filter products
const getBrandProducts = (brand: string) => products.filter(p => p.brand === brand);

export const HomePage: React.FC<PageProps> = ({ lang }) => {
  const t = translations[lang];
  
  // Specific IDs for the new sections
  const latestReleaseIds = ['nitecore-edc17', 'nitecore-tup2', 'nitecore-ut27-2024', 'nitecore-cb12k', 'nitecore-ex7', 'nitecore-p40'];
  const awardWinnerIds = ['nitecore-edc29', 'nitecore-cw20', 'nitecore-edc33', 'nitecore-summit10000'];
  const topSaleIds = ['nitecore-edc29', 'nitecore-mt2a-pro', 'nitecore-edc23', 'nitecore-ut27-2024', 'nitecore-nu25-2021', 'nitecore-hc65-uhe'];

  const latestReleases = products.filter(p => latestReleaseIds.includes(p.id));
  const awardWinners = products.filter(p => awardWinnerIds.includes(p.id));
  const topSales = products.filter(p => topSaleIds.includes(p.id));

  const olightProducts = getBrandProducts('Olight').slice(0, 4);
  const wubenProducts = getBrandProducts('Wuben').slice(0, 4);
  const victorinoxProducts = getBrandProducts('Victorinox').slice(0, 4);

  // Parallax Video Effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  return (
    <div className="bg-slate-50 dark:bg-[#050505] min-h-screen pb-20 overflow-x-hidden relative transition-colors duration-300">
      
      {/* 1. Parallax Video Hero Section */}
      <div className="fixed top-0 left-0 w-full h-[100vh] z-0 pointer-events-none overflow-hidden">
         <motion.video 
            style={{ y, opacity }}
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover scale-105" // slight scale to prevent white edges
            src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/Nitecore%20Iran.mp4"
         />
         {/* Cinematic Overlay - Darker in dark mode, lighter but visible in light mode for text contrast */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-50 dark:to-black/90 z-10"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-10 mix-blend-overlay"></div>
      </div>

      {/* Hero Content Wrapper */}
      <section className="relative z-10 h-[100vh] w-full flex items-center justify-center text-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl"
          >
              <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-white mb-6 drop-shadow-[0_0_30px_rgba(255,225,0,0.2)]">
                 NITECORE <span className="text-primary dark:text-nitecore-yellow relative inline-block">
                    IRAN
                    <span className="absolute -inset-1 blur-xl bg-primary/30 dark:bg-nitecore-yellow/30 -z-10 rounded-full"></span>
                 </span>
              </h1>
              <div className="w-32 h-1 bg-primary dark:bg-nitecore-yellow mx-auto mb-8 rounded-full shadow-[0_0_10px_rgba(255,225,0,0.8)]"></div>
              <p className="text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-xl tracking-wide">
                 {t['hero.subtitle']}
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                  <Link to="/shop" className="group relative px-12 py-4 bg-primary dark:bg-nitecore-yellow text-black text-lg font-black uppercase tracking-widest overflow-hidden rounded-sm hover:text-white transition-colors">
                     <div className="absolute inset-0 w-0 bg-black transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                     <span className="relative z-10 flex items-center gap-2">{t['hero.cta']} <ChevronRight size={20} /></span>
                  </Link>
                  <Link to="/ai" className="group relative px-12 py-4 border border-white/30 text-white text-lg font-bold uppercase tracking-widest backdrop-blur-sm hover:border-white hover:bg-white/10 transition-all rounded-sm">
                     <span className="relative z-10">{t['nav.ai']}</span>
                  </Link>
              </div>
          </motion.div>
      </section>

      {/* Content Container */}
      <div className="relative z-20 bg-slate-50 dark:bg-[#050505] shadow-[0_-50px_100px_rgba(255,255,255,0.1)] dark:shadow-[0_-50px_100px_rgba(5,5,5,1)] border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
        
        {/* 2. Latest Release Section - Large Form Layout */}
        <section className="py-24 bg-white dark:bg-[#080808] transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-3 h-16 bg-primary dark:bg-nitecore-yellow shadow-[0_0_20px_#ffe100]"></div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">{t['products.latest_release']}</h2>
                </div>
                
                <div className="space-y-32">
                    {latestReleases.map((p, idx) => (
                        <div key={p.id} className="flex flex-col lg:flex-row items-center gap-16 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}">
                            {/* Large Image Side */}
                            <div className="flex-1 w-full relative group">
                                <div className="absolute inset-0 bg-primary/5 dark:bg-nitecore-yellow/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <img 
                                    src={p.images[1] || p.images[0]} 
                                    alt={p.name} 
                                    className="w-full max-h-[600px] object-contain relative z-10 transition-transform duration-700 group-hover:scale-105" 
                                />
                            </div>
                            
                            {/* Text Side */}
                            <div className="flex-1 w-full space-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase leading-none">{p.name}</h3>
                                    <div className="w-20 h-1 bg-primary dark:bg-nitecore-yellow"></div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed font-light text-justify">
                                    {p.description[lang]}
                                </p>
                                <div className="flex items-center gap-6 pt-4">
                                    <Link to={`/product/${p.id}`} className="group bg-transparent border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-primary dark:hover:bg-nitecore-yellow hover:border-primary dark:hover:border-nitecore-yellow hover:text-black transition-all rounded-sm flex items-center gap-3">
                                        {t['common.more']} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <span className="text-2xl font-bold text-gray-500">{formatPrice(p.price, t)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <Link to="/shop" className="text-gray-500 hover:text-slate-900 dark:hover:text-white uppercase font-bold tracking-widest text-sm border-b border-gray-300 dark:border-gray-700 hover:border-slate-900 dark:hover:border-white pb-1 transition-all">{t['products.view_catalog']}</Link>
                </div>
            </div>
        </section>

        {/* 3. Award Winners Section - Full Width Banners */}
        <section className="py-24 bg-slate-50 dark:bg-[#050505] border-t border-gray-200 dark:border-[#222]">
            <div className="container mx-auto px-4 mb-16">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-4">
                        <Award className="text-primary dark:text-nitecore-yellow" size={48} /> {t['awards.title']}
                    </h2>
                </div>
            </div>
            
            <div className="container mx-auto px-4 space-y-12">
                {awardWinners.map((p) => (
                    <div key={p.id} className="relative bg-white dark:bg-[#111] rounded-3xl border border-gray-200 dark:border-[#222] overflow-hidden group hover:border-primary/50 dark:hover:border-nitecore-yellow/30 transition-all duration-500 shadow-xl dark:shadow-none">
                        <div className="absolute top-8 right-8 z-20">
                            <img src="https://flashlight.nitecore.com/Public/en/Flashlight/images/brand3.png" alt="Red Dot" className="h-16 object-contain drop-shadow-xl" />
                        </div>
                        <div className="grid lg:grid-cols-2">
                            <div className="p-12 lg:p-20 flex flex-col justify-center relative z-10">
                                <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">{p.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">{p.description[lang]}</p>
                                <Link to={`/product/${p.id}`} className="self-start bg-slate-900 dark:bg-white text-white dark:text-black px-10 py-4 font-bold uppercase rounded hover:bg-primary dark:hover:bg-nitecore-yellow transition-colors shadow-lg">
                                    {t['common.view_details']}
                                </Link>
                            </div>
                            <div className="relative h-[400px] lg:h-auto bg-gradient-to-br from-gray-100 to-white dark:from-[#1a1a1a] dark:to-[#0d0d0d] flex items-center justify-center p-8">
                                <img src={p.images[0]} alt={p.name} className="max-w-full max-h-[90%] object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl mix-blend-multiply dark:mix-blend-normal" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. Top Sale Products Section - Prominent Grid */}
        <section className="py-24 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-[#222]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-wider">
                        {t['products.top_sale']}
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {topSales.map(p => (
                        <div key={p.id} className="group relative bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#222] hover:border-primary dark:hover:border-nitecore-yellow transition-all duration-300 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl dark:shadow-none">
                            <div className="aspect-square bg-gray-50 dark:bg-[#1a1a1a] p-8 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 dark:bg-nitecore-yellow/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img src={p.images[0]} alt={p.name} className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-110 relative z-10" />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-nitecore-yellow transition-colors">{p.name}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">{p.description[lang]}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-[#333]">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">{formatPrice(p.price, t)}</span>
                                    <Link to={`/product/${p.id}`} className="text-primary dark:text-nitecore-yellow text-sm font-bold uppercase tracking-wider hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
                                        {t['common.more']} <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. Events & News Section */}
        <section className="py-24 bg-slate-50 dark:bg-[#050505] border-t border-gray-200 dark:border-[#222]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-3">
                        <Calendar className="text-primary dark:text-nitecore-yellow" /> {t['events.title']}
                    </h2>
                    <a href="https://flashlight.nitecore.com/About/events" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1">
                        {t['events.more']} <ExternalLink size={12} />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'events.milipol.title', desc: 'events.milipol.desc', img: 'https://flashlight.nitecore.com/Uploads/FLASHLIGHTS/goods_img/1763537596.jpeg', link: 'https://flashlight.nitecore.com/About/detail/ad/2120' },
                        { title: 'events.athlete.title', desc: 'events.athlete.desc', img: 'https://flashlight.nitecore.com/Uploads/FLASHLIGHTS/goods_img/1762220506.jpg', link: 'https://flashlight.nitecore.com/About/detail/ad/2118' },
                        { title: 'events.utmb.title', desc: 'events.utmb.desc', img: 'https://flashlight.nitecore.com/Uploads/FLASHLIGHTS/goods_img/1757315347.jpg', link: 'https://flashlight.nitecore.com/About/detail/ad/2117' },
                        { title: 'events.hardrock.title', desc: 'events.hardrock.desc', img: 'https://flashlight.nitecore.com/Uploads/FLASHLIGHTS/goods_img/1741227531.jpg', link: 'https://flashlight.nitecore.com/About/detail/ad/2115' }
                    ].map((event, idx) => (
                        <div key={idx} className="group bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-[#222] overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-all flex flex-col h-full shadow-lg dark:shadow-none">
                            <a href={event.link} target="_blank" rel="noopener noreferrer" className="overflow-hidden relative h-48 flex-shrink-0 block cursor-pointer">
                                <img src={`https://wsrv.nl/?url=${encodeURIComponent(event.img)}&w=600&q=80&output=webp`} alt={t[event.title]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                            </a>
                            <div className="p-6 flex flex-col flex-1">
                                <h3 className="text-slate-900 dark:text-white font-bold text-sm mb-3 leading-snug">{t[event.title]}</h3>
                                <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed mb-4 flex-1">{t[event.desc]}</p>
                                <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-primary dark:text-nitecore-yellow text-[10px] font-bold uppercase inline-block tracking-widest hover:underline mt-auto">Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 6. AI Comparison Section */}
        <section className="py-24 bg-white dark:bg-[#050505] border-y border-gray-200 dark:border-[#222] relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 dark:bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-10">
               <div className="flex flex-col md:flex-row items-center gap-16">
                   <div className="flex-1">
                       <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-800/30 mb-8">
                          <Cpu size={16} className="animate-pulse" />
                          <span className="text-xs font-bold tracking-[0.2em] uppercase">AI-Powered Analysis</span>
                       </div>
                       <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                          {t['ai.promo.title']}
                       </h2>
                       <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10 font-light border-l-2 border-accent dark:border-blue-900 pl-6">
                          {t['ai.promo.desc']}
                       </p>
                       <Link to="/ai" className="inline-flex items-center gap-3 bg-accent dark:bg-blue-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-cyan-600 dark:hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-500/20">
                          {t['ai.promo.btn']} <ChevronRight size={18} />
                       </Link>
                   </div>
                   <div className="flex-1 w-full">
                       <div className="relative bg-slate-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-3xl p-8 shadow-2xl">
                           <div className="absolute -top-4 -right-4 bg-accent dark:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">LIVE DEMO</div>
                           <div className="space-y-6">
                               <div className="flex justify-end">
                                   <div className="bg-blue-100 dark:bg-blue-600/20 text-blue-900 dark:text-blue-100 p-4 rounded-2xl rounded-br-none text-sm max-w-[80%] border border-blue-200 dark:border-blue-500/20">
                                       Compare Nitecore EDC27 vs Olight Arkfeld
                                   </div>
                               </div>
                               <div className="flex justify-start">
                                   <div className="bg-white dark:bg-[#151515] text-slate-800 dark:text-gray-200 p-6 rounded-2xl rounded-bl-none text-sm max-w-[90%] border border-gray-100 dark:border-[#333] shadow-md dark:shadow-inner">
                                       <div className="flex items-center gap-2 mb-3 border-b border-gray-100 dark:border-[#333] pb-3">
                                           <Sparkles size={16} className="text-primary dark:text-nitecore-yellow" />
                                           <span className="text-primary dark:text-nitecore-yellow font-bold text-xs uppercase tracking-wider">AI Analysis</span>
                                       </div>
                                       <p className="leading-relaxed">The <span className="text-slate-900 dark:text-white font-bold">Nitecore EDC27</span> offers significantly higher output (3000 lumens) and a dedicated OLED display for real-time status. The <span className="text-slate-900 dark:text-white font-bold">Olight Arkfeld</span> is more focused on utility with its built-in laser pointer and magnetic charging. For tactical use, Nitecore wins; for office/presentation, Olight is superior.</p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        </section>

        {/* 7. Other Brands (Olight, Wuben, Victorinox) */}
        <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Olight Column */}
                    <div>
                        <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-[#222] pb-4">
                            <h3 className="text-2xl font-black text-olight-green uppercase tracking-tighter">OLIGHT</h3>
                            <Link to="/olight" className="text-xs text-gray-500 hover:text-black dark:hover:text-white uppercase font-bold">More</Link>
                        </div>
                        <div className="space-y-6">
                            {olightProducts.slice(0,2).map(p => (
                                <div key={p.id} className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-[#222] hover:border-olight-green/50 transition-all group shadow-md dark:shadow-none">
                                    <Link to={`/product/${p.id}`} className="flex items-center p-4 gap-4">
                                        <div className="w-20 h-20 bg-gray-50 dark:bg-white rounded-lg p-2 flex-shrink-0">
                                            <img src={p.images[0]} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm group-hover:text-olight-green transition-colors">{p.name}</h4>
                                            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.description[lang]}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Wuben Column */}
                    <div>
                        <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-[#222] pb-4">
                            <h3 className="text-2xl font-black text-wuben-blue uppercase tracking-tighter">WUBEN</h3>
                            <Link to="/wuben" className="text-xs text-gray-500 hover:text-black dark:hover:text-white uppercase font-bold">More</Link>
                        </div>
                        <div className="space-y-6">
                            {wubenProducts.slice(0,2).map(p => (
                                <div key={p.id} className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-[#222] hover:border-wuben-blue/50 transition-all group shadow-md dark:shadow-none">
                                    <Link to={`/product/${p.id}`} className="flex items-center p-4 gap-4">
                                        <div className="w-20 h-20 bg-gray-50 dark:bg-white rounded-lg p-2 flex-shrink-0">
                                            <img src={p.images[0]} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm group-hover:text-wuben-blue transition-colors">{p.name}</h4>
                                            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.description[lang]}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Victorinox Column */}
                    <div>
                        <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-[#222] pb-4">
                            <h3 className="text-2xl font-black text-victorinox-red uppercase tracking-tighter">VICTORINOX</h3>
                            <Link to="/victorinox" className="text-xs text-gray-500 hover:text-black dark:hover:text-white uppercase font-bold">More</Link>
                        </div>
                        <div className="space-y-6">
                            {victorinoxProducts.slice(0,2).map(p => (
                                <div key={p.id} className="bg-white dark:bg-[#111] rounded-xl overflow-hidden border border-gray-200 dark:border-[#222] hover:border-victorinox-red/50 transition-all group shadow-md dark:shadow-none">
                                    <Link to={`/product/${p.id}`} className="flex items-center p-4 gap-4">
                                        <div className="w-20 h-20 bg-gray-50 dark:bg-white rounded-lg p-2 flex-shrink-0">
                                            <img src={p.images[0]} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="text-slate-900 dark:text-white font-bold text-sm group-hover:text-victorinox-red transition-colors">{p.name}</h4>
                                            <p className="text-gray-500 text-xs mt-1 line-clamp-2">{p.description[lang]}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Nitecore Logo Video Animation */}
        <section className="py-24 bg-white dark:bg-[#050505] border-t border-gray-200 dark:border-[#222] flex justify-center">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-[#222] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-white dark:bg-black">
                     <video 
                        src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/Nitecore%20logo.mp4"
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-screen opacity-80"
                        autoPlay
                        muted
                        loop
                        playsInline
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-black/50 via-transparent to-white/50 dark:to-black/50 pointer-events-none"></div>
                </div>
            </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 bg-slate-50 dark:bg-[#050505] border-t border-gray-200 dark:border-[#222]">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">{t['trust.title']}</h2>
               <p className="max-w-3xl mx-auto text-gray-500 mb-12 leading-loose">{t['trust.desc']}</p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                   <div className="flex flex-col items-center p-6 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222] hover:border-primary/30 dark:hover:border-nitecore-yellow/30 transition-colors shadow-lg dark:shadow-none">
                      <MapPin className="text-primary dark:text-nitecore-yellow mb-4" size={32} />
                      <span className="text-slate-900 dark:text-white font-bold">Tehran Central</span>
                   </div>
                   <div className="flex flex-col items-center p-6 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222] hover:border-primary/30 dark:hover:border-nitecore-yellow/30 transition-colors shadow-lg dark:shadow-none">
                      <Shield className="text-primary dark:text-nitecore-yellow mb-4" size={32} />
                      <span className="text-slate-900 dark:text-white font-bold">100% Original</span>
                   </div>
                   <div className="flex flex-col items-center p-6 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222] hover:border-primary/30 dark:hover:border-nitecore-yellow/30 transition-colors shadow-lg dark:shadow-none">
                      <Users className="text-primary dark:text-nitecore-yellow mb-4" size={32} />
                      <span className="text-slate-900 dark:text-white font-bold">10k+ Customers</span>
                   </div>
                   <div className="flex flex-col items-center p-6 bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222] hover:border-primary/30 dark:hover:border-nitecore-yellow/30 transition-colors shadow-lg dark:shadow-none">
                      <Zap className="text-primary dark:text-nitecore-yellow mb-4" size={32} />
                      <span className="text-slate-900 dark:text-white font-bold">Fast Delivery</span>
                   </div>
               </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export const OlightPage: React.FC<PageProps> = ({ lang }) => {
   const t = translations[lang];
   const products = getBrandProducts('Olight');

   // Parallax for Video
   const { scrollY } = useScroll();
   const y = useTransform(scrollY, [0, 600], [0, 200]);

   const categories = [
       { name: 'EDC Lights', img: 'https://cdn.olightstore.com/image/arkpro-ultra-gll-172x191-x2b-kvduyc.png@270w_270h_100q.webp' },
       { name: 'Outdoor', img: 'https://cdn.olightstore.com/image/marauder-mini-2-ayl-160x160-x2b-n5r4yl.png@270w_270h_100q.webp' },
       { name: 'Tactical', img: 'https://cdn.olightstore.com/image/pc-wrarrior-ultra-qhs-160x160-6g72k9-569eis.png@270w_270h_100q.webp' },
       { name: 'WMLs', img: 'https://cdn.olightstore.com/image/pc-baldr-s-hs-160x160-91hisc-s5hfmu.png@270w_270h_100q.webp' }
   ];

   return (
      <div className="bg-slate-50 dark:bg-[#101010] min-h-screen pb-20 transition-colors duration-300">
         {/* Hero Section with Video Parallax */}
         <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center bg-black">
             <motion.div 
                 style={{ y }} 
                 className="absolute inset-0 w-full h-[125%] -top-[12%] z-0"
             >
                 <video
                    src="https://cdn.olightstore.com/video/pc-ro1uau.mp4"
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                 />
             </motion.div>
             
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#101010] via-transparent to-black/30 z-10"></div>
             
             {/* Content Overlay */}
             <div className="relative z-20 text-center px-4">
                 <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter mb-4 drop-shadow-2xl">
                     OLIGHT <span className="text-olight-green">OFFICIAL</span>
                 </h1>
                 <p className="text-2xl text-white font-light tracking-widest uppercase mb-8">Illuminate Your World</p>
                 <button className="bg-olight-green text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors uppercase tracking-wider shadow-[0_0_20px_rgba(0,255,0,0.4)]">
                     {t['hero.cta']}
                 </button>
             </div>
         </div>

         {/* Categories Strip */}
         <div className="container mx-auto px-4 -mt-20 relative z-20 mb-20">
             <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-2xl p-6 shadow-2xl">
                 <h3 className="text-slate-900 dark:text-white font-bold mb-6 uppercase tracking-wider text-sm text-center">{t['olight.explore_cats']}</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {categories.map((cat, idx) => (
                         <div key={idx} className="flex flex-col items-center group cursor-pointer">
                             <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-[#222] border border-gray-200 dark:border-[#333] p-4 group-hover:border-olight-green transition-colors mb-3">
                                 <img src={cat.img} alt={cat.name} className="w-full h-full object-contain" />
                             </div>
                             <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase group-hover:text-black dark:group-hover:text-white transition-colors">{cat.name}</span>
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         {/* Special Anniversary Video Section */}
         <div className="container mx-auto px-4 mb-24">
             <div className="relative rounded-2xl overflow-hidden border border-blue-200 dark:border-blue-500/30 bg-white dark:bg-[#02040a] shadow-[0_10px_40px_rgba(37,99,235,0.1)] dark:shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                 <div className="grid md:grid-cols-2">
                      <div className="relative h-[400px]">
                           <video 
                              src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/Wuben%20Anniversary%20Edition.mp4"
                              className="w-full h-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                           />
                           {/* Gradient overlay for text readability if needed, or style matching */}
                           <div className="absolute inset-0 bg-gradient-to-t from-white/90 dark:from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/80 pointer-events-none"></div>
                      </div>
                      <div className="flex flex-col justify-center p-8 md:p-12 relative bg-gradient-to-br from-blue-50 to-white dark:from-[#050a1a] dark:to-black">
                           <h3 className="text-4xl md:text-6xl font-black mb-6 italic tracking-tighter text-blue-800 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-blue-300 dark:via-white dark:to-blue-600 drop-shadow-none dark:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                               {t['olight.g5_anniv.title']}
                           </h3>
                           <p className="text-blue-900/70 dark:text-blue-100/80 text-lg leading-relaxed mb-8 font-light">
                               {t['olight.g5_anniv.desc']}
                           </p>
                           <Link to="/product/wuben-g5" className="self-start bg-blue-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
                               {t['common.view_details']} <ChevronRight size={18} />
                           </Link>
                      </div>
                 </div>
             </div>
         </div>

         {/* Products Grid */}
         <div className="container mx-auto px-4 mb-24">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-l-4 border-olight-green pl-4 uppercase">{t['olight.top_picks']}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {products.map(p => (
                  <div key={p.id} className="border border-gray-200 dark:border-olight-green/20 rounded-xl overflow-hidden bg-white dark:bg-[#1a1a1a] hover:border-olight-green hover:shadow-[0_10px_30px_rgba(0,255,0,0.15)] dark:hover:shadow-[0_0_20px_rgba(0,255,0,0.2)] transition-all duration-300 group flex flex-col">
                      {/* Custom Render for Olight Cards with WhatsApp Icon */}
                      <div className="relative bg-gray-50 dark:bg-white aspect-square flex items-center justify-center p-4">
                          <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal" />
                          {/* Hover Overlay */}
                          <Link to={`/product/${p.id}`} className="absolute inset-0 bg-white/50 dark:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-olight-green text-black font-bold uppercase text-xs px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                  {t['common.view_details']}
                              </span>
                          </Link>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                          <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 group-hover:text-olight-green transition-colors">{p.name}</h3>
                          <p className="text-gray-500 text-xs mb-4 line-clamp-2 flex-1">{p.description[lang]}</p>
                          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                              <div className="flex items-center gap-3">
                                  <span className="text-olight-green font-bold text-lg">{formatPrice(p.price, t)}</span>
                                  {/* Custom Vivid Green WhatsApp Icon */}
                                  <a href={`https://wa.me/989122050669?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#00e676]/10 p-1.5 rounded-full text-[#00e676] hover:bg-[#00e676] hover:text-black transition-all shadow-[0_0_10px_rgba(0,230,118,0.2)]">
                                      <MessageCircle size={18} strokeWidth={1.5} />
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Featured Product Videos */}
         <section className="py-20 bg-white dark:bg-[#080808]">
             <div className="container mx-auto px-4">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Video 1: ArkPro */}
                     <div className="relative group rounded-2xl overflow-hidden aspect-video border border-gray-200 dark:border-[#222] shadow-xl dark:shadow-none">
                         <video 
                             src="https://cdn.olightstore.de/video/arkprocjsp-pc-gc8lmy.mp4"
                             className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                             autoPlay muted loop playsInline
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                             <h3 className="text-3xl font-bold text-white mb-2">{t['olight.video1.title']}</h3>
                             <p className="text-gray-300 mb-6">{t['olight.video1.subtitle']}</p>
                             <button className="self-start px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all rounded uppercase text-sm font-bold tracking-wider">
                                 {t['olight.video1.btn']}
                             </button>
                         </div>
                     </div>

                     {/* Video 2: Marauder */}
                     <div className="relative group rounded-2xl overflow-hidden aspect-video border border-gray-200 dark:border-[#222] shadow-xl dark:shadow-none">
                         <video 
                             src="https://cdn.olightstore.de/video/dgmarauder-mini-2hb-1-6iyg1m.mp4"
                             className="w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                             autoPlay muted loop playsInline
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                             <h3 className="text-3xl font-bold text-white mb-2">{t['olight.video2.title']}</h3>
                             <p className="text-gray-300 mb-6">{t['olight.video2.subtitle']}</p>
                             <button className="self-start px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-all rounded uppercase text-sm font-bold tracking-wider">
                                 {t['olight.video2.btn']}
                             </button>
                         </div>
                     </div>
                 </div>
             </div>
         </section>
      </div>
   );
};

export const WubenPage: React.FC<PageProps> = ({ lang }) => {
   const t = translations[lang];
   const products = getBrandProducts('Wuben');
   const featuredIds = ['wuben-x1', 'wuben-x4', 'wuben-g5', 'wuben-h4', 'wuben-x3', 'wuben-e7', 'wuben-pl01'];
   const featuredProducts = products.filter(p => featuredIds.includes(p.id));
   const wubenX4 = products.find(p => p.id === 'wuben-x4') || featuredProducts[0];

   // Slideshow Data
   const slides = [
       { id: 'wuben-x1', title: 'wuben.hero.x1.title', subtitle: 'wuben.hero.x1.subtitle', img: 'https://www.wubenlight.com/cdn/shop/files/X1_c359ceef-9747-4052-a034-a56eed388a57.jpg', theme: 'light' },
       { id: 'wuben-x1-pro', title: 'wuben.hero.x1pro.title', subtitle: 'wuben.hero.x1pro.subtitle', img: 'https://www.wubenlight.com/cdn/shop/files/lQLPJyCqpu6wyp_NA97NB4CwfsU4nhrhVfcI3k4FF0nOAA_1920_990.png', theme: 'light' },
       { id: 'wuben-g5', title: 'wuben.hero.g5.title', subtitle: 'wuben.hero.g5.subtitle', img: 'https://www.wubenlight.com/cdn/shop/files/G5_94fc98f6-4c83-4a72-a3a4-d2251d57d71a.jpg', theme: 'dark' },
       { id: 'wuben-x4', title: 'wuben.hero.x4.title', subtitle: 'wuben.hero.x4.subtitle', img: 'https://www.wubenlight.com/cdn/shop/files/X4_1920x990_7d00b166-4791-4d4c-840f-0effd5b9fce8.jpg', theme: 'light' },
       { id: 'wuben-x3', title: 'wuben.hero.x3.title', subtitle: 'wuben.hero.x3.subtitle', img: 'https://www.wubenlight.com/cdn/shop/files/X3_3da07585-8b71-4c6f-acef-a13a87f9de57.jpg', theme: 'dark' },
   ];

   const [currentSlide, setCurrentSlide] = useState(0);

   useEffect(() => {
       const timer = setInterval(() => {
           setCurrentSlide(prev => (prev + 1) % slides.length);
       }, 5000);
       return () => clearInterval(timer);
   }, [slides.length]);

   // Bottom Parallax
   const { scrollY } = useScroll();
   const parallaxY = useTransform(scrollY, [2000, 4000], [-100, 100]); // Adjust range based on page height

   return (
      <div className="bg-slate-50 dark:bg-white min-h-screen text-slate-900 font-sans overflow-x-hidden transition-colors duration-300">
         {/* Cyber Monday Banner */}
         <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 text-center font-bold uppercase tracking-wider text-xs md:text-sm">
             {t['wuben.slogan']} - {t['wuben.sale_text']}
         </div>

         {/* Hero Slider */}
         <div className="relative h-[600px] md:h-[700px] overflow-hidden bg-black">
             <AnimatePresence mode="wait">
                 <motion.div 
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full"
                 >
                     <img 
                        src={`https://wsrv.nl/?url=${encodeURIComponent(slides[currentSlide].img)}&w=1600&q=85&output=webp`} 
                        className="w-full h-full object-cover" 
                        alt={t[slides[currentSlide].title]} 
                     />
                     {/* Overlay for readability */}
                     <div className="absolute inset-0 bg-black/20"></div>
                 </motion.div>
             </AnimatePresence>

             <div className="absolute inset-0 flex items-center justify-center z-10 text-center px-4">
                 <div className="max-w-4xl">
                     <AnimatePresence mode="wait">
                         <motion.div
                            key={currentSlide}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                         >
                             <h2 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-lg">
                                 {t[slides[currentSlide].title]}
                             </h2>
                             <p className="text-xl md:text-3xl text-white/90 font-light mb-8 drop-shadow-md">
                                 {t[slides[currentSlide].subtitle]}
                             </p>
                             <div className="flex gap-4 justify-center">
                                 <Link to={`/product/${slides[currentSlide].id}`} className="bg-white text-black hover:bg-wuben-blue hover:text-white px-8 py-3 rounded-full font-bold transition-all uppercase tracking-wider shadow-xl">
                                     {t['common.view_details']}
                                 </Link>
                                 <Link to={`/product/${slides[currentSlide].id}`} className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-full font-bold transition-all uppercase tracking-wider shadow-xl">
                                     Shop Now
                                 </Link>
                             </div>
                         </motion.div>
                     </AnimatePresence>
                 </div>
             </div>
             
             {/* Slider Indicators */}
             <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
                 {slides.map((_, idx) => (
                     <button 
                        key={idx} 
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                     />
                 ))}
             </div>
         </div>

         {/* Features Grid (Visual) */}
         <div className="container mx-auto px-4 -mt-16 relative z-20 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { id: 'wuben-x4', label: 'wuben.compact_versatile', img: 'https://wubenlight.de/cdn/shop/files/X4_600x480_48d1b3ca-cf62-4a56-94dc-57be3888e81c.jpg' },
                    { id: 'wuben-g5', label: 'wuben.small_bright', img: 'https://wubenlight.de/cdn/shop/files/G5.jpg' },
                    { id: 'wuben-h4', label: 'wuben.three_lights', img: 'https://wubenlight.de/cdn/shop/files/H4_600x480_2a6ed71a-0e57-4d19-98c4-04dd37f039ae.jpg' },
                    { id: 'wuben-x3', label: 'wuben.creative_appearance', img: 'https://wubenlight.de/cdn/shop/files/589773E3-4469-4fc6-BCBA-7DDBE9C079C8.png' },
                ].map((item, idx) => (
                    <Link to={`/product/${item.id}`} key={idx} className="group relative bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 h-48 md:h-64 hover:-translate-y-2 transition-transform duration-300">
                        <img src={`https://wsrv.nl/?url=${encodeURIComponent(item.img)}&w=400&q=80&output=webp`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-6">
                             <h3 className="text-white font-bold uppercase text-sm md:text-lg leading-tight">{t[item.label]}</h3>
                             <span className="text-wuben-blue text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transform duration-300 flex items-center gap-1">Shop Now <ArrowRight size={10}/></span>
                        </div>
                    </Link>
                ))}
            </div>
         </div>

         {/* Main Product Showcase */}
         <div className="container mx-auto px-4 py-16">
             <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">
                    Flashlight Series
                </h2>
                <div className="hidden md:flex gap-4">
                    {['X-Series', 'E-Series', 'C-Series', 'L-Series'].map(s => (
                        <span key={s} className="text-sm font-bold text-gray-400 hover:text-wuben-blue cursor-pointer transition-colors border border-gray-200 px-4 py-1 rounded-full hover:border-wuben-blue">{s}</span>
                    ))}
                </div>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {featuredProducts.map(p => (
                  <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
                      <div className="relative bg-gray-50 aspect-[4/3] flex items-center justify-center p-6 overflow-hidden">
                          <Link to={`/product/${p.id}`} className="block w-full h-full relative">
                              <img src={p.images[0]} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply relative z-10" />
                              <div className="absolute inset-0 bg-wuben-blue/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-3xl transform scale-75"></div>
                          </Link>
                          {p.specs['Max Output'] && (
                              <div className="absolute top-4 right-4 bg-wuben-blue text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider z-20">
                                  {p.specs['Max Output']}
                              </div>
                          )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                          <Link to={`/product/${p.id}`} className="block">
                              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-wuben-blue transition-colors">{p.name}</h3>
                              <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{p.description[lang]}</p>
                          </Link>
                          <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                              <span className="text-wuben-blue font-black text-xl">
                                {formatPrice(p.price, t)}
                              </span>
                              <a href={`https://wa.me/989122050669?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg hover:shadow-green-500/30 transition-all transform hover:scale-110">
                                  <MessageCircle size={20} />
                              </a>
                          </div>
                      </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Feature Spotlight: Wuben X4 */}
         <section className="py-24 bg-white border-t border-gray-200 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                 <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <div className="w-full rounded-2xl overflow-hidden shadow-2xl mb-8 border border-gray-100">
                             <video 
                                src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/X3%20Owl%20Wuben.mp4" 
                                className="w-full h-auto object-cover" 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                             />
                        </div>
                        <div>
                             <span className="text-wuben-blue font-bold uppercase tracking-widest text-sm mb-2 block">Featured Spotlight</span>
                             <h2 className="text-5xl font-black text-slate-900 uppercase leading-none mb-6">Wuben X4</h2>
                             <p className="text-xl text-gray-600 leading-relaxed font-light">
                                The Wuben X4 is a compact multi-function flashlight delivering up to 1500 lumens. Featuring a 180-degree rotating head, magnetic base, and wireless charging, it redefines EDC versatility.
                             </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                 <div className="text-wuben-blue font-bold text-2xl mb-1">1500 LM</div>
                                 <div className="text-gray-500 text-xs uppercase font-bold">Max Output</div>
                             </div>
                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                 <div className="text-wuben-blue font-bold text-2xl mb-1">205 M</div>
                                 <div className="text-gray-500 text-xs uppercase font-bold">Beam Distance</div>
                             </div>
                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                 <div className="text-wuben-blue font-bold text-2xl mb-1">RGB</div>
                                 <div className="text-gray-500 text-xs uppercase font-bold">Side Light</div>
                             </div>
                             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                 <div className="text-wuben-blue font-bold text-2xl mb-1">IP68</div>
                                 <div className="text-gray-500 text-xs uppercase font-bold">Waterproof</div>
                             </div>
                        </div>

                        <Link to="/product/wuben-x4" className="inline-block bg-wuben-blue text-white px-10 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Discover X4
                        </Link>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-12">
                                 <img src="https://www.wubenlight.com/cdn/shop/files/X4_2f93154b-bd15-4a1b-be44-6f3ee0e43e97.jpg?v=1757576711" className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                                 <img src="https://www.wubenlight.com/cdn/shop/files/002.png?v=1757512739" className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 bg-gray-100" />
                            </div>
                            <div className="space-y-4">
                                 <img src="https://www.wubenlight.com/cdn/shop/files/lQDPKdjSI4JZa73NFePNINCwd6w1czbEJQQIm-bzPUOKAA_8400_5603.jpg?v=1757512739" className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                                 <img src="https://www.wubenlight.com/cdn/shop/files/X4_RGB.jpg?v=1757576711" className="w-full rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
         </section>

         {/* Bottom Parallax Section */}
         <div className="relative h-[800px] overflow-hidden">
             <motion.div 
                style={{ y: parallaxY }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
             >
                 <img 
                    src="https://wsrv.nl/?url=https://www.wubenlight.com/cdn/shop/files/H4_1920x990_18855315-a360-4d92-aaa3-2013e338c070.jpg&w=1920&q=90&output=webp" 
                    className="w-full h-full object-cover brightness-75"
                    alt="Wuben H4 Parallax"
                 />
             </motion.div>
             <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
                 <div className="text-center text-white max-w-2xl bg-black/40 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl">
                     <span className="text-wuben-blue font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Headlamp Series</span>
                     <h2 className="text-5xl md:text-7xl font-black mb-6">WUBEN H4</h2>
                     <p className="text-xl mb-8 font-light text-gray-200">
                         3 Light Sources for versatile use. The ultimate hands-free lighting solution.
                     </p>
                     <Link to="/product/wuben-h4" className="bg-wuben-blue hover:bg-white hover:text-wuben-blue text-white px-10 py-4 rounded-full font-bold transition-all uppercase tracking-wider shadow-lg inline-block">
                         {t['common.buyNow']}
                     </Link>
                 </div>
             </div>
         </div>
      </div>
   );
};

export const VictorinoxPage: React.FC<PageProps> = ({ lang }) => {
   const t = translations[lang];
   const products = getBrandProducts('Victorinox');
   
   // Filter Onyx products specifically
   const onyxProducts = products.filter(p => p.id.includes('onyx'));
   const standardProducts = products.filter(p => !p.id.includes('onyx'));

   // Parallax
   const { scrollY } = useScroll();
   const y = useTransform(scrollY, [0, 800], [0, 400]);

   const categories = [
      { name: 'vic.cat.knives', img: 'https://imageengine.victorinox.com/transform/6682e4f5-e5b0-40bf-819f-9a9e2884e309/SAK_1-3703_B3-jpg?io=transform%3Afill%2Cwidth%3A575%2Cheight%3A575&quality=100', desc: 'vic.desc.knives', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/c/SAK/' },
      { name: 'vic.cat.cutlery', img: 'https://imageengine.victorinox.com/transform/a3429d1f-548a-4dc7-975e-901db428a6ef/CUT_7-7403-20G_7-7323-17G_7-7203-12G_G?io=transform%3Acrop%2Cheight%3A1300%2Cwidth%3A1300%2Cpath%3Asquare&focuspoint=0.53%2C0.52&io=transform%3Afill%2Cwidth%3A575%2Cheight%3A575&quality=100', desc: 'vic.desc.cutlery', link: 'https://www.victorinox.com/en/Products/Cutlery/c/CUT/' },
      { name: 'vic.cat.watches', img: 'https://imageengine.victorinox.com/transform/fc99d1fd-f2e9-401a-9ce3-37986aea74a1/WAT_242024-1_B_1?io=transform%3Afill&focuspoint=0.49%2C0.43&io=transform%3Afill%2Cwidth%3A575%2Cheight%3A575&quality=100', desc: 'vic.desc.watches', link: 'https://www.victorinox.com/en/Products/Watches/c/TP/' },
      { name: 'vic.cat.travel', img: 'https://imageengine.victorinox.com/transform/96d036f1-cf03-4869-85fb-7d96aab69f0a/TGE_Category_Shot_2023_G_1?io=transform%3Acrop%2Cheight%3A1200%2Cwidth%3A1200%2Cpath%3Asquare&focuspoint=0.52%2C0.46&quality=100', desc: 'vic.desc.travel', link: 'https://www.victorinox.com/en/Products/Travel-Gear/c/TRG/' },
      { name: 'vic.cat.fragrance', img: 'https://imageengine.victorinox.com/transform/ba308ade-2e3d-4f00-a4d9-6046810e573e/FRA_V0001247_LS4-jpg?io=transform%3Afill%2Cheight%3A600%2Cwidth%3A600&io=overlay%3Abox%2Ccolor%3A000000%2Copacity%3A10&focuspoint=0.39%2C0.7&quality=100', desc: 'vic.desc.fragrance', link: 'https://www.victorinox.com/en/Products/Fragrances/c/FRA/' },
   ];

   return (
      <div className="bg-white min-h-screen text-slate-900 font-sans">
         {/* Hero Section */}
         <div className="relative h-[700px] w-full overflow-hidden">
             <motion.div 
                 style={{ y }} 
                 className="absolute inset-0 w-full h-[150%] -top-[25%] z-0"
             >
                 <video 
                    src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/Victor.mp4" 
                    className="w-full h-full object-cover brightness-[0.85]"
                    autoPlay muted loop playsInline
                 />
             </motion.div>
             <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-16 relative z-10">
                 <h1 className="text-6xl font-bold text-white mb-8 max-w-xl drop-shadow-lg uppercase">{t['vic.perfect_gift']}</h1>
                 <button className="bg-[#b10034] text-white font-bold py-4 px-8 rounded-md w-fit hover:bg-[#8a1b14] transition-colors uppercase tracking-wide text-sm shadow-xl">
                     {t['vic.browse_gift']}
                 </button>
             </div>
         </div>

         {/* Categories Grid */}
         <div className="container mx-auto px-4 py-20">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {categories.map((cat, idx) => {
                     const Wrapper = cat.link ? 'a' : 'div';
                     const wrapperProps = cat.link ? { href: cat.link, target: "_blank", rel: "noopener noreferrer" } : {};
                     return (
                         <Wrapper key={idx} {...wrapperProps} className="group relative h-[500px] overflow-hidden cursor-pointer block">
                             <img src={cat.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                             <div className="absolute bottom-8 left-8 text-white">
                                 <h3 className="text-2xl font-bold uppercase mb-2 drop-shadow-md">{t[cat.name]}</h3>
                                 <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{t[cat.desc]}</p>
                             </div>
                         </Wrapper>
                     );
                 })}
                 {/* Bestsellers Tile */}
                 <a href="https://www.victorinox.com/en/Best-Selling-Pocket-Knives/cms/best-selling-pocket-knives/" target="_blank" rel="noopener noreferrer" className="group relative h-[500px] bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                     <div className="text-center p-8">
                         <h3 className="text-2xl font-bold uppercase text-slate-800 mb-2">BESTSELLERS</h3>
                         <p className="text-slate-600">Top-tier treasures</p>
                         <div className="mt-6 inline-block border-b-2 border-[#b10034] pb-1 text-[#b10034] font-bold uppercase text-sm">Discover Now</div>
                     </div>
                 </a>
             </div>
         </div>

         {/* New Section: Onyx Black Collection - Product Grid (Internal Links Maintained) */}
         <div className="bg-slate-900 dark:bg-[#050505] text-white py-24 border-y border-gray-800 relative overflow-hidden transition-colors duration-300">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>
             
             <div className="container mx-auto px-4 relative z-10">
                 <div className="text-center mb-16">
                     <span className="text-gray-500 uppercase tracking-[0.3em] text-sm font-bold block mb-4">Limited Edition</span>
                     <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 tracking-tight">Onyx Black Collection</h2>
                     <p className="max-w-2xl mx-auto text-gray-400 font-light text-lg">
                        Specially treated with a polispectral process, the monochrome black finish creates a surface that is both timelessly elegant and exceptionally durable.
                     </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {onyxProducts.map(p => (
                         <div key={p.id} className="group bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-white/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                             <div className="aspect-[4/3] bg-[#1a1a1a] relative overflow-hidden p-8 flex items-center justify-center">
                                 <img 
                                    src={p.images[0]} 
                                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                                    alt={p.name}
                                 />
                                 <div className="absolute top-4 right-4 bg-black/80 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-wider backdrop-blur-sm border border-white/10">
                                     Onyx
                                 </div>
                             </div>
                             <div className="p-8">
                                 <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-gray-300 transition-colors">{p.name}</h3>
                                 <p className="text-gray-500 text-sm line-clamp-3 mb-6 font-light leading-relaxed">{p.description[lang]}</p>
                                 <div className="flex items-center justify-between border-t border-[#333] pt-6">
                                     <div className="flex items-center gap-3">
                                         <span className="text-xl font-mono font-bold text-white">{formatPrice(p.price, t)}</span>
                                         <a href={`https://wa.me/989122050669?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noopener noreferrer" className="text-[#00e676] hover:text-[#00c853] transition-colors flex items-center justify-center">
                                             <MessageCircle size={20} strokeWidth={1.5} className="drop-shadow-[0_0_8px_rgba(0,230,118,0.4)]" />
                                         </a>
                                     </div>
                                     <Link to={`/product/${p.id}`} className="text-white text-xs font-bold uppercase tracking-widest hover:underline decoration-[#b10034] underline-offset-4">
                                         {t['common.view_details']}
                                     </Link>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         {/* Standard New Arrivals Slider / Grid - Internal Links Maintained */}
         <div className="bg-gray-50 dark:bg-[#111] py-20 transition-colors duration-300">
             <div className="container mx-auto px-4">
                 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 uppercase">New Arrivals</h2>
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                     {standardProducts.slice(0, 4).map(p => (
                         <div key={p.id} className="group bg-white dark:bg-[#1a1a1a] p-4 transition-all duration-300 hover:shadow-xl shadow-sm border border-gray-100 dark:border-[#333]">
                             <div className="relative h-64 mb-4 overflow-hidden bg-white dark:bg-[#111]">
                                 <img src={p.images[0]} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                             </div>
                             <h4 className="font-bold text-slate-800 dark:text-white mb-1 line-clamp-1">{p.name}</h4>
                             <p className="text-gray-500 text-xs mb-4 line-clamp-2">{p.description[lang]}</p>
                             <div className="flex justify-between items-center">
                                 <div className="flex items-center gap-3">
                                     <span className="text-[#b10034] font-bold">{formatPrice(p.price, t)}</span>
                                     <a href={`https://wa.me/989122050669?text=${encodeURIComponent(`Hi, I'm interested in ${p.name}`)}`} target="_blank" rel="noopener noreferrer" className="text-[#00e676] hover:text-[#00c853] transition-colors flex items-center justify-center">
                                         <MessageCircle size={20} strokeWidth={1.5} />
                                     </a>
                                 </div>
                                 <ArrowRight size={18} className="text-slate-400 group-hover:text-[#b10034] transition-colors" />
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
         </div>

         {/* Lifestyle Section */}
         <div className="container mx-auto px-4 py-20">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 uppercase">What will you do with your knife?</h2>
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                 {[
                     { title: 'Everyday', img: 'https://imageengine.victorinox.com/transform/e4afb0f1-220b-45d1-a7da-f061890f0cbb/SAK_Master_the_Moment_0-8231-26_LS_3-jpg?io=transform%3Afill%2Cwidth%3A480%2Cheight%3A872&quality=100', link: 'https://www.victorinox.com/en/cms/sak-everyday/' },
                     { title: 'Outdoor & Sports', img: 'https://imageengine.victorinox.com/transform/7b9752a1-5859-4703-8f22-d11f3684acc4/SAK_B2M_OB_1080x1920px_Outdoor_Sports_1-3713_LS_1_withoutLogo?quality=100', link: 'https://www.victorinox.com/en/cms/sak-outdoor-and-sports/' },
                     { title: 'Trades & Crafts', img: 'https://imageengine.victorinox.com/transform/9b81c4eb-eaf7-492d-a7ee-b90bce830417/SAK_B2M_Trades_Crafts_3-0339-N_LS_1?io=transform%3Acrop%2Cheight%3A1080%2Cwidth%3A684%2Cpath%3Asquare&focuspoint=0.42%2C0.48&quality=100', link: 'https://www.victorinox.com/en/cms/sak-trades-and-crafts/' },
                     { title: 'Accessories', img: 'https://imageengine.victorinox.com/transform/e0cb811b-04d3-4c54-9672-50142f45cc5b/SAK_Segmentation_Accessories_G-jpg?io=transform%3Afill%2Cheight%3A880%2Cwidth%3A484&focuspoint=0.54%2C0.57&quality=100', link: 'https://www.victorinox.com/en/cms/sak-accessories/' },
                 ].map((item, idx) => (
                     <a href={item.link} target="_blank" rel="noopener noreferrer" key={idx} className="relative h-[400px] group cursor-pointer overflow-hidden rounded-lg block">
                         <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                         <div className="absolute bottom-6 left-6 text-white">
                             <h3 className="text-xl font-bold uppercase">{item.title}</h3>
                             <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 block">View Collection</span>
                         </div>
                     </a>
                 ))}
             </div>
         </div>
         
         {/* Shop By Category (Small Icons/Grid) */}
         <div className="bg-gray-100 dark:bg-[#1a1a1a] py-16 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 uppercase">Shop by Category</h2>
                <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
                    {[
                        { name: 'Small Pocket Knives', img: 'https://imageengine.victorinox.com/transform/3394ae99-399a-430f-a166-d1acb32666f2/SAK_Small_PocketKnives-jpg?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Small-Pocket-Knives/c/SAK_SmallPocketKnives/' },
                        { name: 'Medium Pocket Knives', img: 'https://imageengine.victorinox.com/transform/65f4fb66-87ad-405f-993b-a94a257c3edb/SAK_Medium_PocketKnives_B1-jpg?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Medium-Pocket-Knives/c/SAK_MediumPocketKnives/' },
                        { name: 'Large Pocket Knives', img: 'https://imageengine.victorinox.com/transform/86993d21-4690-40a7-a402-76cff9d58631/SAK_Large_PocketKnives_B2-jpg?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Large-Pocket-Knives/c/SAK_LargePocketKnives/' },
                        { name: 'Swiss Tools', img: 'https://imageengine.victorinox.com/transform/a973fb3c-3fe8-4e4a-ac11-0fdaba48ecb4/SAK_Swiss_Tool_Extension_1080x1080_G_3-jpg?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Swiss-Tools/c/SAK_SwissTool/' },
                        { name: 'Swiss Cards', img: 'https://imageengine.victorinox.com/transform/5d63db0b-eae3-4830-a68a-07f4f85e506f/SAK_Swiss_Cards_B1-jpg?io=transform%3Acrop%2Cheight%3A1000%2Cwidth%3A1000%2Cpath%3Asquare&io=overlay%3Abox%2Ccolor%3A666%2Copacity%3A20&focuspoint=0.48%2C0.44&io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Swiss-Cards/c/SAK_SwissCard/' },
                    ].map((cat, idx) => (
                        <a href={cat.link} target="_blank" rel="noopener noreferrer" key={idx} className="flex-shrink-0 w-48 group cursor-pointer block">
                            <div className="w-48 h-48 overflow-hidden mb-4 rounded-lg bg-white dark:bg-black p-2">
                                <img src={cat.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-gray-200 text-sm uppercase text-center group-hover:text-[#b10034] transition-colors">{cat.name}</h4>
                        </a>
                    ))}
                </div>
            </div>
         </div>

         {/* Collections Banner */}
         <div className="container mx-auto px-4 py-20">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 uppercase">Shop by Collection</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                 {[
                     { name: 'Alox Refined', img: 'https://imageengine.victorinox.com/transform/75557ed0-9ca7-4fee-9b0a-734c01bbf1b6/SAK_Alox_Refined_G1?io=transform%3Acrop%2Cheight%3A1500%2Cwidth%3A1500%2Cpath%3Asquare&focuspoint=0.49%2C0.44&io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Alox-Refined/collection/sak-collection/sak_collection_SAK-C086/' },
                     { name: 'Companion', img: 'https://imageengine.victorinox.com/transform/19b501f9-40c4-4648-8082-b581ce269bf0/SAK_-0-8170-20_B?io=transform%3Acrop%2Cheight%3A1000%2Cwidth%3A1000%2Cpath%3Asquare&focuspoint=0.48%2C0.59&io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Companion/collection/sak-collection/sak_collection_SAK-C084/' },
                     { name: 'Alox Limited', img: 'https://imageengine.victorinox.com/transform/947eb278-37b4-4fca-bd0d-f6eb7f4ba338/SAK_Alox_LE_StoneRed_G_1080x1080px_240919_RR?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Alox-Limited-Edition/cms/alox-limited-edition/' },
                     { name: 'Limited Ed.', img: 'https://imageengine.victorinox.com/transform/fe1d5133-768f-400d-9075-6a15ffb2f704/SAK_1-3603-T21E1_B_1080x1080px?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Products/Swiss-Army-Knife%E2%84%A2-and-Tools/Limited-edition/collection/sak-collection/sak_collection_SAK-C000/' },
                     { name: 'Live to Explore', img: 'https://imageengine.victorinox.com/transform/e5df0dce-959c-45d5-9dad-6b7c1dc9ed36/SAK_Live_to_Explore_G_SoMe_1080x1620px-jpg?io=transform%3Afill%2Cwidth%3A360%2Cheight%3A360&quality=100', link: 'https://www.victorinox.com/en/Live-to-Explore-Collection/cms/live-to-explore-collection/' },
                     { name: 'Evoke', img: 'https://imageengine.victorinox.com/transform/8aafdacf-c91b-45ad-856d-50c04be4516b/SAK_Evoke_G-jpg?io=transform%3Acrop%2Cheight%3A1040%2Cwidth%3A1920%2Cpath%3Asquare&focuspoint=0.48%2C0.57&quality=100', link: 'https://www.victorinox.com/en/Evoke-Alox/cms/evoke-collection/' },
                 ].map((col, idx) => (
                     <a href={col.link} target="_blank" rel="noopener noreferrer" key={idx} className="text-center group cursor-pointer text-slate-900 dark:text-white block">
                         <div className="aspect-square overflow-hidden rounded-full mb-4 border-2 border-transparent group-hover:border-[#b10034] transition-all p-1">
                             <img src={col.img} className="w-full h-full object-cover rounded-full" />
                         </div>
                         <h5 className="font-bold text-sm uppercase">{col.name}</h5>
                     </a>
                 ))}
             </div>
         </div>

      </div>
   );
};

export const TechPage: React.FC<PageProps> = ({ lang }) => {
    const t = translations[lang];
    const products = getBrandProducts('SharperImage').concat(getBrandProducts('Nitecore').filter(p => p.category === 'power' || p.category === 'tech'));

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    return (
       <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 transition-colors duration-300">
          {/* Hero Section */}
          <div className="relative h-[600px] w-full overflow-hidden mb-12">
             <motion.div 
                 style={{ y }} 
                 className="absolute inset-0 w-full h-[150%] -top-[25%] z-0"
             >
                 <video 
                    src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/Aria%20Tech.mp4" 
                    className="w-full h-full object-cover brightness-[0.6]"
                    autoPlay muted loop playsInline
                 />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-black/40 z-10"></div>
             
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
                 <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(0,255,157,0.5)]">
                    {t['brand.tech']}
                 </h1>
                 <p className="text-xl md:text-2xl text-neon font-mono tracking-widest uppercase bg-black/50 backdrop-blur-md px-6 py-2 rounded-full border border-neon/30">
                    {t['tech.slogan']}
                 </p>
             </div>
          </div>

          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(p => (
                    <div key={p.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-accent dark:hover:border-neon transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,255,157,0.2)] group hover:-translate-y-1">
                        <ProductCard product={p} lang={lang} />
                    </div>
                ))}
             </div>
          </div>
       </div>
    );
};

export const AccessoriesPage: React.FC<PageProps> = ({ lang }) => {
    const t = translations[lang];
    const products = getBrandProducts('Nitecore').filter(p => p.category === 'accessory' || p.category === 'bag' || p.category === 'power').concat(getBrandProducts('Wuben').filter(p => p.category === 'accessory')).concat(getBrandProducts('Olight').filter(p => p.category === 'accessory')).concat(getBrandProducts('Victorinox').filter(p => p.category === 'accessory'));

    return (
       <div className="bg-slate-50 dark:bg-[#111] min-h-screen pb-20 transition-colors duration-300">
          <div className="container mx-auto px-4 py-12">
             <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-[#333] pb-4 uppercase">{t['nav.accessories']}</h1>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {products.map(p => (
                     <ProductCard key={p.id} product={p} lang={lang} />
                 ))}
             </div>
          </div>
       </div>
    );
};

export const ShopPage: React.FC<PageProps> = ({ lang }) => {
    return (
        <div className="bg-slate-50 dark:bg-[#0b0b0b] min-h-screen py-12 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">ALL PRODUCTS</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} lang={lang} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const ComparePage: React.FC<PageProps> = ({ lang }) => (
    <div className="container mx-auto px-4 py-12 text-slate-900 dark:text-white">Compare Page Placeholder</div>
);

export const AIAssistantPage: React.FC<PageProps> = ({ lang }) => (
    <div className="container mx-auto px-4 py-12">
        <AIAssistant lang={lang} />
    </div>
);
