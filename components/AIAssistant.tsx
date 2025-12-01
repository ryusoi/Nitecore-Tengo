import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Search } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { translations, Language } from '../i18n';

interface AIAssistantProps {
  lang: Language;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for API
    const history = messages.map(m => ({ role: m.role, text: m.text }));

    const response = await geminiService.chat(userMsg.text, history);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: response.text,
      sources: response.sources
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent to-blue-600 dark:from-purple-600 dark:to-blue-600 p-6 flex items-center justify-between">
         <div className="flex items-center text-white space-x-3">
             <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles size={24} />
             </div>
             <div>
                <h2 className="font-bold text-lg">{t['ai.header.title']}</h2>
                <p className="text-xs text-blue-100 opacity-80">{t['ai.header.subtitle']}</p>
             </div>
         </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950/50">
         {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center px-4">
                 <Bot size={48} className="mb-4 opacity-50" />
                 <p className="max-w-md leading-relaxed">{t['ai.welcome_message']}</p>
             </div>
         )}
         
         {messages.map(msg => (
             <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`max-w-[80%] rounded-2xl p-4 ${
                     msg.role === 'user' 
                     ? 'bg-accent dark:bg-tek-600 text-white rounded-br-none shadow-md' 
                     : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-bl-none shadow-sm'
                 }`}>
                     <div className="flex items-center space-x-2 mb-1 opacity-50 text-xs uppercase tracking-wider font-bold">
                        {msg.role === 'user' ? <User size={12}/> : <Bot size={12}/>}
                        <span>{msg.role === 'user' ? 'You' : 'Aria'}</span>
                     </div>
                     <div className="prose dark:prose-invert text-sm leading-relaxed">
                         {msg.text}
                     </div>

                     {/* Sources from Grounding */}
                     {msg.sources && msg.sources.length > 0 && (
                       <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
                         <p className="text-xs font-bold mb-1 flex items-center text-gray-500">
                           <Search size={10} className="mr-1" /> Sources
                         </p>
                         <div className="flex flex-wrap gap-2">
                           {msg.sources.map((chunk: any, idx: number) => {
                             if (chunk.web?.uri) {
                               return (
                                 <a 
                                  key={idx} 
                                  href={chunk.web.uri} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded hover:underline truncate max-w-[150px]"
                                 >
                                   {chunk.web.title || 'Source'}
                                 </a>
                               )
                             }
                             return null;
                           })}
                         </div>
                       </div>
                     )}
                 </div>
             </div>
         ))}
         {isLoading && (
             <div className="flex justify-start">
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-bl-none flex items-center space-x-2 shadow-sm border border-gray-100 dark:border-slate-700">
                     <div className="w-2 h-2 bg-accent dark:bg-tek-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                     <div className="w-2 h-2 bg-accent dark:bg-tek-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                     <div className="w-2 h-2 bg-accent dark:bg-tek-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
             </div>
         )}
         <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
         <div className="flex items-center space-x-2">
             <input 
               type="text" 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder={t['ai.placeholder']}
               className="flex-1 bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-tek-500 transition-all"
             />
             <button 
               onClick={handleSend}
               disabled={isLoading || !input.trim()}
               className="p-3 bg-accent dark:bg-tek-600 text-white rounded-xl hover:bg-cyan-600 dark:hover:bg-tek-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
             >
                 <Send size={20} />
             </button>
         </div>
      </div>
    </div>
  );
};