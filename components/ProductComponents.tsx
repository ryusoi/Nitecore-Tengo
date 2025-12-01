import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle, Shield, Zap, Star, ImageOff, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { translations, Language } from '../i18n';

interface ProductCardProps {
  product: Product;
  lang: Language;
}

const translateSpecKey = (key: string, t: any) => {
    const code = 'spec.' + key.toLowerCase().replace(/ /g, '_');
    return t[code] || key;
};

// Helper to format price in Rials (IRR)
// 1 USD = 1,000,000 Rials
export const formatPrice = (priceUSD: number, t: any) => {
    if (priceUSD === 0) return <span className="text-neon animate-pulse font-black uppercase">GIVEAWAY</span>;
    const rials = priceUSD * 1000000;
    return `${rials.toLocaleString()} ${t['common.currency']}`;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, lang }) => {
  const t = translations[lang];
  const [imgError, setImgError] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group bg-white dark:bg-[#151515] border border-gray-200 dark:border-[#222] hover:border-accent dark:hover:border-nitecore-yellow shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-300 block overflow-hidden relative rounded-xl"
    >
      {/* Image Area */}
      <div className="aspect-square bg-white relative overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-transparent">
        {!imgError ? (
            <img 
              src={imgSrc} 
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
              onError={() => {
                  if (product.images.length > 1 && imgSrc === product.images[0]) {
                      setImgSrc(product.images[1]);
                  } else {
                      setImgError(true);
                  }
              }}
            />
        ) : (
            <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-black w-full h-full p-4 text-center">
                <ImageOff size={32} className="mb-2" />
                <span className="text-[10px] font-mono">{product.name}</span>
            </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1 z-20">
           {product.price === 0 && (
               <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase shadow-md animate-bounce rounded-sm">
                  FREE
               </span>
           )}
           {product.specs['Max Output'] && (
               <span className="bg-accent dark:bg-nitecore-yellow text-white dark:text-black text-[10px] font-bold px-2 py-1 uppercase shadow-md rounded-sm">
                  {product.specs['Max Output']}
               </span>
           )}
        </div>
        
        {/* Hover Overlay - Mini Description Popup */}
        <div className="absolute inset-0 bg-white/95 dark:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-center z-10 backdrop-blur-sm pointer-events-none">
            <h4 className="text-accent dark:text-nitecore-yellow font-serif text-lg mb-3 text-center border-b border-gray-200 dark:border-gray-700 pb-2 font-bold">{product.name}</h4>
            <div className="space-y-2">
                {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-xs border-b border-gray-100 dark:border-gray-800/50 pb-1">
                        <span className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider text-[10px]">{translateSpecKey(key, t)}</span>
                        <span className="text-slate-800 dark:text-white text-right font-mono truncate max-w-[100px] text-[10px]">{val}</span>
                    </div>
                ))}
            </div>
            <div className="mt-auto pt-3 flex justify-center">
                <span className="text-[10px] text-white dark:text-black bg-accent dark:bg-nitecore-yellow font-bold uppercase tracking-widest px-3 py-1 rounded-sm shadow-md">
                    {t['common.view_details']}
                </span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-white dark:bg-[#151515]">
         <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 group-hover:text-accent dark:group-hover:text-nitecore-yellow transition-colors line-clamp-1">
             {product.name}
         </h3>
         <p className="text-gray-500 text-xs mb-3 line-clamp-2 min-h-[2.5em] leading-relaxed">
             {product.description[lang]}
         </p>
         
         <div className="flex items-center justify-between border-t border-gray-100 dark:border-[#333] pt-3 mt-2">
             <span className="text-slate-900 dark:text-white font-bold text-lg">{formatPrice(product.price, t)}</span>
             <span className="text-xs text-accent dark:text-nitecore-yellow uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300 flex items-center gap-1">
                Details <ExternalLink size={10} />
             </span>
         </div>
      </div>
    </Link>
  );
};

export const ProductDetailView: React.FC<{ product: Product; lang: Language }> = ({ product, lang }) => {
    const t = translations[lang];
    const message = encodeURIComponent(`Hi, I am interested in ${product.name} (ID: ${product.id}). Is it available?`);
    const whatsappLink = `https://wa.me/989122050669?text=${message}`;
    const [activeImage, setActiveImage] = useState(0);
    const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

    const handleImgError = (idx: number) => {
        setImgErrors(prev => ({...prev, [idx]: true}));
    };

    return (
        <div className="text-slate-900 dark:text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                
                {/* Left: Images - High Definition Viewer */}
                <div className="space-y-4">
                     {/* Large Image Container with Zoom effect on hover */}
                     <div className="bg-white border border-gray-200 dark:border-[#222] rounded-lg h-[500px] flex items-center justify-center p-8 group overflow-hidden relative shadow-lg dark:shadow-2xl">
                         {!imgErrors[activeImage] ? (
                             <img 
                                src={product.images[activeImage]} 
                                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-125 cursor-zoom-in" 
                                alt={product.name}
                                onError={() => handleImgError(activeImage)}
                             />
                         ) : (
                             <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-black w-full h-full">
                                <ImageOff size={64} className="mb-4" />
                                <span className="text-sm">High-Res Image Unavailable</span>
                             </div>
                         )}
                         <div className="absolute bottom-4 right-4 bg-white/70 dark:bg-black/70 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm shadow-sm">
                             Hover to Zoom
                         </div>
                     </div>
                     <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {product.images.map((img, idx) => (
                           <button 
                             key={idx} 
                             onClick={() => setActiveImage(idx)}
                             className={`w-24 h-24 border ${activeImage === idx ? 'border-accent dark:border-nitecore-yellow scale-105' : 'border-gray-200 dark:border-[#333] hover:border-gray-400 dark:hover:border-gray-500'} bg-white p-2 flex-shrink-0 overflow-hidden relative rounded transition-all duration-200`}
                           >
                              {!imgErrors[idx] ? (
                                  <img 
                                    src={img} 
                                    className="w-full h-full object-contain" 
                                    onError={() => handleImgError(idx)}
                                  />
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-[#111]">
                                      <ImageOff size={16} className="text-gray-400 dark:text-gray-600" />
                                  </div>
                              )}
                           </button>
                        ))}
                     </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="text-accent dark:text-nitecore-yellow font-black text-sm tracking-[0.2em] uppercase bg-accent/10 dark:bg-nitecore-yellow/10 px-3 py-1 rounded inline-block mb-3">{product.brand}</span>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{product.name}</h1>
                    </div>
                    
                    <div className="flex items-center space-x-6 mb-8 border-b border-gray-200 dark:border-[#222] pb-8">
                       <span className="text-4xl font-bold text-slate-900 dark:text-white">{formatPrice(product.price, t)}</span>
                       {product.price === 0 ? (
                           <span className="bg-red-600 text-white text-sm font-black px-4 py-2 rounded uppercase animate-pulse">Giveaway Active</span>
                       ) : (
                           <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-bold px-3 py-1 rounded border border-green-200 dark:border-green-800">{t['common.in_stock']}</span>
                       )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg font-light">
                        {product.description[lang]}
                    </p>

                    <div className="bg-gray-50 dark:bg-[#1a1a1a] p-6 rounded-xl mb-8 border border-gray-200 dark:border-[#333]">
                        <h3 className="font-bold mb-4 text-sm uppercase text-gray-400 tracking-wider">Quick Specs</h3>
                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                            {Object.entries(product.specs).slice(0, 6).map(([key, val]) => (
                                <div key={key} className="flex flex-col">
                                    <span className="text-gray-500 dark:text-gray-600 text-[10px] uppercase font-bold mb-1">{translateSpecKey(key, t)}</span>
                                    <span className="text-slate-900 dark:text-white font-mono font-bold text-base">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative w-full bg-accent dark:bg-green-600 hover:bg-cyan-600 dark:hover:bg-green-500 text-white font-black text-center py-5 rounded-xl transition-all uppercase tracking-wide mb-6 overflow-hidden shadow-[0_4px_14px_0_rgba(0,151,189,0.39)] dark:shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {t['common.buyNow']} <MessageCircle size={20} />
                        </span>
                    </a>
                    
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Shield size={14} className="text-accent dark:text-nitecore-yellow" />
                        <span>Official Distributor Warranty - Nitecore Iran</span>
                    </div>
                </div>
            </div>

            {/* Full Specs Table */}
            <div className="border-t border-gray-200 dark:border-[#222] pt-12 mb-12">
                <h2 className="text-3xl font-black mb-8 uppercase text-slate-900 dark:text-white flex items-center gap-3">
                    <Zap className="text-accent dark:text-nitecore-yellow" /> {t['detail.specs']}
                </h2>
                <div className="bg-white dark:bg-[#111] overflow-hidden rounded-xl border border-gray-200 dark:border-[#222] shadow-sm">
                    <table className="w-full text-left text-sm">
                        <tbody>
                            {Object.entries(product.specs).map(([key, val], idx) => (
                                <tr key={key} className={`border-b border-gray-100 dark:border-[#222] ${idx % 2 === 0 ? 'bg-gray-50 dark:bg-[#151515]' : 'bg-white dark:bg-[#111]'} hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors`}>
                                    <td className="p-5 text-gray-500 dark:text-gray-400 font-bold uppercase w-1/3 border-r border-gray-100 dark:border-[#222] tracking-wider">{translateSpecKey(key, t)}</td>
                                    <td className="p-5 text-slate-900 dark:text-white font-mono text-lg">{val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 dark:border-[#222] pt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold uppercase text-slate-900 dark:text-white">{t['detail.reviews']}</h2>
                    <button className="text-accent dark:text-nitecore-yellow text-sm font-bold border border-accent dark:border-nitecore-yellow px-4 py-2 rounded hover:bg-accent dark:hover:bg-nitecore-yellow hover:text-white dark:hover:text-black transition-colors">
                        {t['detail.write_review']}
                    </button>
                </div>
                
                {(!product.reviews || product.reviews.length === 0) ? (
                    <div className="text-gray-400 dark:text-gray-500 italic border border-dashed border-gray-300 dark:border-[#333] p-12 text-center rounded-xl bg-gray-50 dark:bg-[#111]">
                        {t['detail.no_reviews']}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.reviews.map((review) => (
                            <div key={review.id} className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-gray-200 dark:border-[#333] hover:border-gray-300 dark:hover:border-gray-500 transition-colors shadow-sm dark:shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-gray-600 dark:text-white">
                                            {review.user.charAt(0)}
                                        </div>
                                        {review.user}
                                    </div>
                                    <div className="flex text-accent dark:text-nitecore-yellow">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300 dark:text-gray-600"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">"{review.comment}"</p>
                                <div className="text-gray-400 dark:text-gray-600 text-xs font-mono">{review.date}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export const ComparisonChart: React.FC = () => <div></div>;