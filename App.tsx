
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { HomePage, ShopPage, ComparePage, AIAssistantPage, OlightPage, WubenPage, VictorinoxPage, TechPage, AccessoriesPage } from './pages/MainPages';
import { ProductDetail } from './pages/ProductDetail';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { WatchdogOverlay } from './components/WatchdogUI';
import { SocialProof } from './components/SocialProof';
import { WelcomeModal } from './components/WelcomeModal';
import { Language } from './types';
import { dir } from './i18n';
import { Watchdog } from './watchdog';

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);
    return null;
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Initial App Load Signal
    Watchdog.markStable();

    // Theme handling
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Direction handling
    document.documentElement.dir = dir(lang);
    document.documentElement.lang = lang;

  }, [theme, lang]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <HashRouter>
      <div className={`min-h-screen flex flex-col font-sans ${dir(lang) === 'rtl' ? 'font-[Vazirmatn]' : 'font-[Inter]'}`}>
        <ScrollToTop />
        <Routes>
            <Route path="/auth" element={<AuthPage lang={lang} />} />
            <Route path="*" element={
               <>
                 <Header lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />
                 <main className="flex-grow pt-0">
                    <Routes>
                       <Route path="/" element={<HomePage lang={lang} />} />
                       <Route path="/shop" element={<ShopPage lang={lang} />} />
                       <Route path="/wuben" element={<WubenPage lang={lang} />} />
                       <Route path="/olight" element={<OlightPage lang={lang} />} />
                       <Route path="/victorinox" element={<VictorinoxPage lang={lang} />} />
                       <Route path="/tech" element={<TechPage lang={lang} />} />
                       <Route path="/accessories" element={<AccessoriesPage lang={lang} />} />
                       <Route path="/product/:id" element={<ProductDetail lang={lang} />} />
                       <Route path="/compare" element={<ComparePage lang={lang} />} />
                       <Route path="/ai" element={<AIAssistantPage lang={lang} />} />
                       <Route path="/contact" element={<ContactPage lang={lang} />} />
                    </Routes>
                 </main>
                 <Footer lang={lang} />
                 <SocialProof lang={lang} />
                 <WatchdogOverlay lang={lang} />
                 <WelcomeModal lang={lang} />
               </>
            } />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
