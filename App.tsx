import React, { useState, useEffect } from 'react';
import SessionManager from './components/SessionManager';
import { TRANSLATIONS } from './constants';
import { Language } from './types';

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

const QrCodeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  
  // Initialize language from localStorage or default to 'en'
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('pch_lang');
      // Basic validation to ensure saved value is a valid Language
      if (saved && LANGUAGES.some(l => l.code === saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const text = TRANSLATIONS[lang];

  // Persist language selection
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pch_lang', lang);
    }
  }, [lang]);

  useEffect(() => {
    setCurrentUrl(window.location.href);

    // Check if running in standalone mode (installed)
    const mq = window.matchMedia('(display-mode: standalone)');
    setIsStandalone(mq.matches);
    const changeHandler = (e: MediaQueryListEvent) => setIsStandalone(e.matches);
    mq.addEventListener('change', changeHandler);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      mq.removeEventListener('change', changeHandler);
    };
  }, []);

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Android / Chrome Desktop
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        setDeferredPrompt(null);
      });
    } else if (isIOS) {
      // iOS
      setShowIOSInstructions(true);
    } else {
      // Fallback
      alert('Para instalar, toque no menu do navegador e selecione "Adicionar à Tela de Início" ou "Instalar Aplicativo".');
    }
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black text-stone-200 overflow-hidden flex flex-col font-sans">
      
      {/* Header / Logo */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 opacity-60">
        <div className="font-serif text-lg tracking-widest text-teal-700/60 uppercase">Inner Voice PCH</div>
        <div className="flex items-center space-x-4">
            
            {/* QR Code Button (Desktop Only) */}
            <button 
              onClick={() => setShowQR(true)}
              className="hidden md:flex p-2 text-stone-500 hover:text-teal-400 transition-colors"
              title="Abrir no celular"
            >
              <QrCodeIcon className="w-5 h-5" />
            </button>

            {/* Show Install Button if not installed and not in session yet */}
            {!isStandalone && !hasStarted && (
              <button 
                onClick={handleInstallClick}
                className="text-xs font-light tracking-widest text-teal-600 hover:text-teal-400 uppercase border border-teal-900/30 px-3 py-1 rounded-full bg-teal-900/10 transition-colors"
              >
                {text.installBtn}
              </button>
            )}
            <div className="text-xs font-light tracking-widest text-stone-600 hidden md:block">THERAPEUTIC COGNITIVE POETRY</div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-md p-6" onClick={() => setShowQR(false)}>
          <div className="bg-stone-900 border border-stone-800 p-8 rounded-2xl max-w-sm text-center space-y-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-stone-600 hover:text-stone-300">
               <XMarkIcon className="w-6 h-6" />
            </button>
            
            <h3 className="font-serif text-2xl text-stone-200">Leve para o celular</h3>
            <p className="text-sm text-stone-400">Escaneie para abrir no seu dispositivo móvel e instalar o aplicativo.</p>
            
            <div className="bg-white p-4 rounded-xl mx-auto w-fit">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&color=0c0a09&bgcolor=ffffff&data=${encodeURIComponent(currentUrl)}`} 
                alt="QR Code" 
                className="w-48 h-48"
              />
            </div>
            
            <p className="text-xs text-stone-500">Certifique-se de que ambos os dispositivos estão conectados à internet.</p>
          </div>
        </div>
      )}

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6" onClick={() => setShowIOSInstructions(false)}>
          <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl max-w-sm text-center space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-teal-500 mb-2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-stone-200">Instalar no iPhone</h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              1. Toque no botão <strong>Compartilhar</strong> <span className="inline-block align-middle"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg></span> na barra inferior do Safari.<br/>
              2. Role para baixo e escolha <strong>"Adicionar à Tela de Início"</strong>.
            </p>
            <button 
              onClick={() => setShowIOSInstructions(false)}
              className="mt-4 px-6 py-2 bg-stone-800 hover:bg-stone-700 rounded-full text-xs uppercase tracking-widest text-stone-300 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        
        {!hasStarted ? (
          <div className="max-w-xl mx-auto px-8 text-center space-y-12 animate-fade-in-up">
            
            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-stone-200 to-stone-500 pb-2">
              {text.title}
            </h1>
            
            <div className="text-xs font-light tracking-[0.2em] text-stone-500 uppercase">
              {text.subtitle}
            </div>

            {/* Intro Text */}
            <div className="space-y-6 text-lg font-light leading-relaxed text-stone-400">
              {text.welcome.split('\n').map((line, i) => (
                <p key={i} className={`${i === 0 ? 'text-stone-300 font-normal' : ''}`}>
                  {line}
                </p>
              ))}
            </div>

            {/* Minimal Language Dropdown */}
            <div className="flex justify-center pt-2">
               <div className="relative group">
                 <select
                   value={lang}
                   onChange={(e) => setLang(e.target.value as Language)}
                   className="appearance-none bg-transparent border-b border-stone-800 text-stone-600 text-xs tracking-widest uppercase cursor-pointer py-1 pr-6 hover:text-stone-400 hover:border-stone-600 focus:outline-none focus:border-teal-800 transition-colors text-center"
                   style={{ textAlignLast: 'center' }}
                 >
                   {LANGUAGES.map(({ code, label }) => (
                     <option key={code} value={code} className="bg-stone-950 text-stone-300">
                       {label}
                     </option>
                   ))}
                 </select>
                 {/* Custom small arrow indicator */}
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-700 group-hover:text-stone-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                 </div>
               </div>
            </div>

            {/* Start Button */}
            <div className="pt-4">
              <button 
                onClick={() => setHasStarted(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:ring-offset-2 focus:ring-offset-stone-900"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-900 via-stone-800 to-stone-900 opacity-50 group-hover:opacity-100 transition-opacity duration-500 ease-out"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-teal-500 opacity-10 group-hover:rotate-90 ease"></span>
                <span className="relative text-stone-200 font-serif italic text-xl tracking-wide group-hover:text-white transition-colors">
                  {text.beginBtn}
                </span>
              </button>
            </div>
            
            <p className="text-xs text-stone-700 pt-8 max-w-xs mx-auto">
              {text.micNote}
            </p>

          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-fade-in">
            <SessionManager onDisconnect={() => setHasStarted(false)} lang={lang} />
          </div>
        )}

      </main>

      {/* Footer decorations */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}

export default App;