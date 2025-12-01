import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, User, Briefcase, Building } from 'lucide-react';
import { translations, Language } from '../i18n';

export const ContactPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = translations[lang];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 250]);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    type: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message simulation: Sent to Nitecore Iran support.");
    setFormState({ name: '', email: '', type: 'general', message: '' });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-20">
      
      {/* Hero Video Section with Parallax */}
      <div className="relative h-[600px] w-full overflow-hidden mb-16">
         <motion.div 
             style={{ y }} 
             className="absolute inset-0 w-full h-[150%] -top-[25%] z-0"
         >
             <video 
                src="https://wafisohswxqutsttotkb.supabase.co/storage/v1/object/public/Tek/Aria%20Tech.mp4" 
                className="w-full h-full object-cover brightness-[0.7]"
                autoPlay muted loop playsInline
             />
         </motion.div>
         
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#050505] z-10"></div>
         
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white mb-6 uppercase drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              {t['footer.contact']}
            </h1>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-3xl">
                <p className="text-gray-100 text-lg font-bold leading-relaxed">
                  {t['company.role']}
                </p>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#111] p-8 rounded-3xl border border-[#222] hover:border-nitecore-yellow/50 transition-all shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Building size={120} />
               </div>
               <h3 className="text-2xl font-bold text-nitecore-yellow mb-6 uppercase tracking-wider">{t['company.name']}</h3>
               
               {/* Leadership */}
               <div className="mb-8 space-y-4">
                   <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400">
                           <User size={24} />
                       </div>
                       <div>
                           <p className="font-bold text-white text-lg">{t['company.ceo']}</p>
                           <p className="text-sm text-nitecore-yellow font-bold uppercase tracking-wide">{t['company.cmo']}</p>
                           <a href={`tel:${t['contact.mobile'].replace(/\D/g, '')}`} className="text-xs text-gray-400 hover:text-white mt-1 block flex items-center gap-1">
                              <Phone size={12} /> {t['contact.mobile']}
                           </a>
                       </div>
                   </div>
               </div>

               {/* Address */}
               <div className="mb-8 flex gap-4">
                   <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center text-red-400 flex-shrink-0">
                       <MapPin size={24} />
                   </div>
                   <p className="text-gray-300 leading-relaxed font-mono text-sm">
                       {t['company.address']}
                   </p>
               </div>

               {/* Direct Contacts */}
               <div className="space-y-4">
                   <a href={`tel:${t['contact.mobile'].replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-[#333] hover:border-green-500 hover:bg-green-900/10 transition-all group/link">
                       <MessageCircle className="text-green-500 group-hover/link:scale-110 transition-transform" />
                       <div className="flex-1">
                           <span className="text-xs text-gray-500 uppercase font-bold block">WhatsApp / Mobile</span>
                           <span className="text-white font-mono font-bold">{t['contact.mobile']}</span>
                       </div>
                   </a>
                   
                   <a href={`tel:${t['contact.phone'].replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-[#333] hover:border-blue-500 hover:bg-blue-900/10 transition-all group/link">
                       <Phone className="text-blue-500 group-hover/link:scale-110 transition-transform" />
                       <div className="flex-1">
                           <span className="text-xs text-gray-500 uppercase font-bold block">Office Phone</span>
                           <span className="text-white font-mono font-bold">{t['contact.phone']}</span>
                       </div>
                   </a>

                   <a href={`mailto:${t['contact.email']}`} className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-[#333] hover:border-orange-500 hover:bg-orange-900/10 transition-all group/link">
                       <Mail className="text-orange-500 group-hover/link:scale-110 transition-transform" />
                       <div className="flex-1">
                           <span className="text-xs text-gray-500 uppercase font-bold block">Email</span>
                           <span className="text-white font-mono font-bold">{t['contact.email']}</span>
                       </div>
                   </a>

                   <a href="https://t.me/+8ETRinn0OhdiNDZk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-[#333] hover:border-blue-400 hover:bg-blue-400/10 transition-all group/link">
                       <Send className="text-blue-400 group-hover/link:scale-110 transition-transform" />
                       <div className="flex-1">
                           <span className="text-xs text-gray-500 uppercase font-bold block">Telegram</span>
                           <span className="text-white font-mono font-bold">{t['contact.telegram']}</span>
                       </div>
                   </a>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#111] p-8 rounded-3xl border border-[#222] shadow-2xl">
             <h3 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                 <Mail className="text-nitecore-yellow" /> {t['contact.form.title']}
             </h3>
             <form onSubmit={handleSubmit} className="space-y-6">
                 <div>
                     <label className="block text-gray-500 text-xs font-bold uppercase mb-2">{t['contact.form.name']}</label>
                     <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nitecore-yellow focus:ring-1 focus:ring-nitecore-yellow transition-all"
                     />
                 </div>
                 
                 <div>
                     <label className="block text-gray-500 text-xs font-bold uppercase mb-2">{t['contact.form.email']}</label>
                     <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nitecore-yellow focus:ring-1 focus:ring-nitecore-yellow transition-all"
                     />
                 </div>

                 <div>
                     <label className="block text-gray-500 text-xs font-bold uppercase mb-2">{t['contact.form.type']}</label>
                     <select 
                        value={formState.type}
                        onChange={e => setFormState({...formState, type: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nitecore-yellow focus:ring-1 focus:ring-nitecore-yellow transition-all appearance-none cursor-pointer"
                     >
                         <option value="general">{t['contact.form.type.general']}</option>
                         <option value="sales">{t['contact.form.type.sales']}</option>
                         <option value="support">{t['contact.form.type.support']}</option>
                         <option value="review">{t['contact.form.type.review']}</option>
                     </select>
                 </div>

                 <div>
                     <label className="block text-gray-500 text-xs font-bold uppercase mb-2">{t['contact.form.message']}</label>
                     <textarea 
                        required
                        rows={6}
                        value={formState.message}
                        onChange={e => setFormState({...formState, message: e.target.value})}
                        className="w-full bg-[#0a0a0a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nitecore-yellow focus:ring-1 focus:ring-nitecore-yellow transition-all resize-none"
                     ></textarea>
                 </div>

                 <button 
                    type="submit" 
                    className="w-full bg-nitecore-yellow text-black font-black uppercase py-4 rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,225,0,0.4)]"
                 >
                     {t['contact.form.submit']}
                 </button>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
};