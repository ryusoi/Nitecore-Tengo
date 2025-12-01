
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '../services/mockData';
import { Language } from '../i18n';

interface SocialProofProps {
  lang: Language;
}

const cities = [
  'Tehran', 'Shiraz', 'Isfahan', 'Mashhad', 'Tabriz', 'Karaj', 'Ahvaz', 'Qom'
];

const actions = [
  { type: 'buy', icon: ShoppingBag, text: { en: 'bought', fa: 'خرید', zh: '购买', es: 'compró' } },
  { type: 'view', icon: Eye, text: { en: 'is viewing', fa: 'در حال بازدید', zh: '正在查看', es: 'está viendo' } }
];

const userLabels = {
  en: 'User from',
  fa: 'کاربری از',
  zh: '用户来自',
  es: 'Usuario de'
};

export const SocialProof: React.FC<SocialProofProps> = ({ lang }) => {
  const [notification, setNotification] = useState<{
    id: number;
    productName: string;
    productImage: string;
    city: string;
    actionType: string;
    actionText: string;
  } | null>(null);

  useEffect(() => {
    const showNotification = () => {
      // Pick random product
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      // Pick random city
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      // Pick random action (buy or view)
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      setNotification({
        id: Date.now(),
        productName: randomProduct.name,
        productImage: randomProduct.images[0],
        city: randomCity,
        actionType: randomAction.type,
        actionText: randomAction.text[lang as keyof typeof randomAction.text] || randomAction.text['en']
      });

      // Hide after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    // Initial delay
    const initialTimer = setTimeout(showNotification, 30000); // 30 seconds initial delay

    // Loop
    const interval = setInterval(showNotification, 90000); // Every 90 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [lang]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-6 z-50 max-w-sm bg-[#151515] border border-nitecore-yellow shadow-[0_0_15px_rgba(255,225,0,0.3)] rounded-xl overflow-hidden flex items-center p-3 gap-3"
        >
          <div className="w-12 h-12 bg-black rounded-lg flex-shrink-0 border border-[#333] overflow-hidden">
            <img src={notification.productImage} alt="Product" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
             <div className="flex items-center text-nitecore-yellow text-xs font-bold mb-0.5">
                 {notification.actionType === 'buy' ? <ShoppingBag size={12} className="mr-1" /> : <Eye size={12} className="mr-1" />}
                 <span>{userLabels[lang] || userLabels['en']} {notification.city} {notification.actionText}</span>
             </div>
             <p className="text-white text-sm font-bold truncate leading-tight">
                 {notification.productName}
             </p>
             <div className="text-[10px] text-gray-500 mt-1 flex items-center">
                 <MapPin size={10} className="mr-1" /> Verified Visitor
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
