import React, { useEffect, useState } from 'react';
import { Watchdog } from '../watchdog';
import { AlertTriangle, WifiOff, RefreshCw, Activity } from 'lucide-react';
import { translations, Language } from '../i18n';

export const WatchdogOverlay: React.FC<{ lang: Language }> = ({ lang }) => {
  // Use public method getStatus() instead of accessing private property 'status'
  const [status, setStatus] = useState(Watchdog.init().getStatus());
  const t = translations[lang];

  useEffect(() => {
    return Watchdog.subscribe(setStatus);
  }, []);

  if (status.isStable && status.isOnline && !status.isRecovering) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-none">
      
      {/* Offline Indicator */}
      {!status.isOnline && (
        <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 backdrop-blur-sm animate-pulse">
           <WifiOff size={16} />
           <span className="text-sm font-bold">{t['watchdog.offline']}</span>
        </div>
      )}

      {/* Recovering Indicator */}
      {status.isRecovering && (
        <div className="bg-amber-500/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 backdrop-blur-sm">
           <RefreshCw size={16} className="animate-spin" />
           <span className="text-sm font-bold">{t['watchdog.recovering']}</span>
        </div>
      )}

      {/* Fallback Mode Indicator */}
      {!status.isStable && (
        <div className="bg-purple-600/90 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 backdrop-blur-sm pointer-events-auto">
           <AlertTriangle size={16} />
           <span className="text-sm font-bold">Fallback Mode</span>
           <button onClick={() => window.location.reload()} className="ml-2 underline text-xs">
             Reload
           </button>
        </div>
      )}

      {/* Diagnostics (Hidden in production usually, visible here for demo) */}
      <div className="hidden">
         {status.lastError && (
             <div className="bg-black/80 text-red-400 p-2 text-xs rounded max-w-xs break-words">
                 {status.lastError}
             </div>
         )}
      </div>
    </div>
  );
};