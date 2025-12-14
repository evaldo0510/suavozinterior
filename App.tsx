import React, { useState, useEffect } from 'react';
import SessionManager from './components/SessionManager';
import { TRANSLATIONS } from './constants';
import { Language, SessionHistoryItem } from './types';
import { Logo } from './components/Logo';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ja', label: '日本語' },
  { code: 'ru', label: 'Русский' },
  { code: 'hi', label: 'हिन्दी' },
];

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [introStep, setIntroStep] = useState(0); // 0, 1, 2 for words, 3 for final
  const [introOpacity, setIntroOpacity] = useState(0);
  
  // Initialize language from localStorage or default to 'en'
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('pch_lang');
      if (saved && LANGUAGES.some(l => l.code === saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  const [showHistory, setShowHistory] = useState(false);
  const [historyItems, setHistoryItems] = useState<SessionHistoryItem[]>([]);

  const text = TRANSLATIONS[lang];

  // Persist language selection
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pch_lang', lang);
    }
  }, [lang]);

  // Mini Presentation Sequence
  useEffect(() => {
    // Sequence:
    // 0ms: Start Step 0 (Word 1) -> Fade In
    // 1500ms: Fade Out
    // 2500ms: Start Step 1 (Word 2) -> Fade In
    // 4000ms: Fade Out
    // 5000ms: Start Step 2 (Word 3) -> Fade In
    // 6500ms: Fade Out
    // 7500ms: Final Step -> Show Title/Button
    
    const runIntro = async () => {
      // Step 0
      setIntroStep(0);
      setIntroOpacity(1);
      await new Promise(r => setTimeout(r, 2000));
      setIntroOpacity(0);
      await new Promise(r => setTimeout(r, 1000));

      // Step 1
      setIntroStep(1);
      setIntroOpacity(1);
      await new Promise(r => setTimeout(r, 2000));
      setIntroOpacity(0);
      await new Promise(r => setTimeout(r, 1000));

      // Step 2
      setIntroStep(2);
      setIntroOpacity(1);
      await new Promise(r => setTimeout(r, 2000));
      setIntroOpacity(0);
      await new Promise(r => setTimeout(r, 1000));

      // Final
      setIntroStep(3);
      setIntroOpacity(1);
    };

    runIntro();
  }, [lang]); // Re-run if language changes during intro, though unlikely

  // Load history when modal opens
  useEffect(() => {
    if (showHistory) {
      try {
        const stored = localStorage.getItem('pch_session_history');
        if (stored) {
          setHistoryItems(JSON.parse(stored));
        } else {
          setHistoryItems([]);
        }
      } catch (e) {
        console.error("Failed to load history", e);
        setHistoryItems([]);
      }
    }
  }, [showHistory]);

  const clearHistory = () => {
    localStorage.removeItem('pch_session_history');
    setHistoryItems([]);
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(lang, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black text-stone-200 overflow-hidden flex flex-col font-sans">
      
      {/* Minimal Header - Only show when Main Content is Ready or in History */}
      {introStep === 3 && (
        <header className={`absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 transition-opacity duration-1000 ${hasStarted ? 'opacity-0 hover:opacity-100' : 'opacity-60'}`}>
          <div className="flex items-center space-x-2">
             <Logo className="w-8 h-8 text-stone-600" />
             <div className="font-serif text-sm tracking-[0.3em] text-stone-600 uppercase hover:text-stone-400 transition-colors cursor-default">
               {text.title}
             </div>
          </div>
          <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowHistory(true)}
                className="flex p-2 text-stone-600 hover:text-stone-300 transition-colors"
                title="History"
              >
                <ClockIcon className="w-5 h-5" />
              </button>
          </div>
        </header>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-fade-in" onClick={() => setShowHistory(false)}>
           <div className="bg-stone-900/50 border border-stone-800 rounded-none w-full max-w-md flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-stone-800 flex justify-between items-center">
                <h3 className="font-serif text-xl text-stone-300 tracking-widest uppercase">{text.history.title}</h3>
                <button onClick={() => setShowHistory(false)} className="text-stone-600 hover:text-stone-300">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {historyItems.length === 0 ? (
                  <div className="text-center py-10 text-stone-600 font-light text-sm tracking-widest">
                    {text.history.empty}
                  </div>
                ) : (
                  historyItems.map((item, idx) => (
                    <div key={idx} className="bg-stone-950/30 border border-stone-800/30 p-4 flex justify-between items-center hover:bg-stone-900/50 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-sm text-stone-400 font-serif">{formatDate(item.date)}</span>
                      </div>
                      <div className="font-mono text-stone-500 text-xs">
                        {formatDuration(item.duration)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {historyItems.length > 0 && (
                <div className="p-4 border-t border-stone-800 bg-stone-900/30 flex justify-end">
                   <button 
                     onClick={clearHistory}
                     className="flex items-center text-[10px] text-red-900 hover:text-red-500 transition-colors uppercase tracking-[0.2em] space-x-2 px-3 py-2"
                   >
                     <TrashIcon className="w-3 h-3" />
                     <span>{text.history.clear}</span>
                   </button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        
        {!hasStarted ? (
          <div className="w-full h-full flex items-center justify-center">
             
             {/* Mini Presentation Intro Sequence */}
             <div className={`text-center transition-opacity duration-1000 ease-in-out absolute inset-0 flex items-center justify-center pointer-events-none`}
                  style={{ opacity: introStep < 3 ? introOpacity : 0 }}>
                  <span className="text-3xl md:text-5xl font-serif text-stone-300 tracking-[0.3em] uppercase">
                    {introStep < 3 ? text.intro[introStep] : ''}
                  </span>
             </div>

             {/* Final Landing Screen */}
             <div className={`max-w-md mx-auto px-8 text-center space-y-16 transition-opacity duration-1000 ${introStep === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
               
                {/* Minimal Title */}
                <div className="space-y-4 flex flex-col items-center">
                  <Logo className="w-24 h-24 text-stone-200 opacity-90 mb-6" />
                  <h1 className="text-4xl md:text-6xl font-serif text-stone-200 tracking-wider">
                    {text.title}
                  </h1>
                  <div className="h-px w-12 bg-stone-800 mx-auto"></div>
                  <p className="text-xs font-light tracking-[0.4em] text-stone-500 uppercase">
                    {text.subtitle}
                  </p>
                </div>

                {/* Minimal Welcome */}
                <div className="text-stone-400 font-light leading-relaxed font-serif italic text-lg opacity-80">
                  {text.welcome.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </div>

                {/* Entrance Button */}
                <div className="pt-8">
                  <button 
                    onClick={() => setHasStarted(true)}
                    className="group relative inline-flex items-center justify-center px-10 py-3 overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none"
                  >
                    <span className="absolute inset-0 w-full h-full border border-stone-800 rounded-full group-hover:border-stone-600 transition-colors duration-500"></span>
                    <span className="relative text-stone-300 font-serif text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                      {text.beginBtn}
                    </span>
                  </button>
                </div>

                {/* Minimal Language Selector (Bottom Center) */}
                <div className="pt-12 opacity-40 hover:opacity-100 transition-opacity">
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value as Language)}
                      className="bg-transparent text-stone-600 text-[10px] uppercase tracking-widest text-center focus:outline-none cursor-pointer hover:text-stone-400 appearance-none"
                      style={{ textAlignLast: 'center' }}
                    >
                      {LANGUAGES.map(({ code, label }) => (
                        <option key={code} value={code} className="bg-stone-950 text-stone-400">
                          {label}
                        </option>
                      ))}
                    </select>
                </div>

             </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-fade-in">
            <SessionManager onDisconnect={() => setHasStarted(false)} lang={lang} />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;