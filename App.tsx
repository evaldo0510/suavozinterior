import React, { useState, useEffect } from 'react';
import SessionManager from './components/SessionManager';
import { TRANSLATIONS, HUMAN_CONNECTION_TASKS } from './constants';
import { Language, SessionHistoryItem, UserPlan, User } from './types';
import { Logo } from './components/Logo';
import { JournalModal } from './components/JournalModal';
import { LandingModal } from './components/LandingModal';
import { LoginModal } from './components/LoginModal';
import { AdminModal } from './components/AdminModal';

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

// --- Icons ---
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

const BookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

const PenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [introStep, setIntroStep] = useState(0); 
  const [introOpacity, setIntroOpacity] = useState(0);
  
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('pch_lang');
      if (saved && LANGUAGES.some(l => l.code === saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  // --- User Plan & Auth State ---
  const [userPlan, setUserPlan] = useState<UserPlan>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('pch_user_plan');
        return (saved as UserPlan) || 'visitor';
    }
    return 'visitor';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem('pch_current_user');
        if (saved) return JSON.parse(saved);
    }
    return null;
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [showJournal, setShowJournal] = useState(false); 
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showLanding, setShowLanding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showHumanTask, setShowHumanTask] = useState(false);

  const [historyItems, setHistoryItems] = useState<SessionHistoryItem[]>([]);
  const [isProcessingUpgrade, setIsProcessingUpgrade] = useState(false);
  
  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  const text = TRANSLATIONS[lang];

  // Track Landing Visits for Analytics
  useEffect(() => {
      const visits = parseInt(localStorage.getItem('pch_landing_visits') || '0');
      localStorage.setItem('pch_landing_visits', (visits + 1).toString());
  }, []);

  // Check for Human Connection Task on Logic
  useEffect(() => {
      if (currentUser?.pendingTask && !hasStarted && introStep === 3) {
          // Show task modal if there is a pending task and user is on home screen
          setTimeout(() => setShowHumanTask(true), 1500);
      }
  }, [currentUser, hasStarted, introStep]);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    if (window.matchMedia('(display-mode: standalone)').matches) {
       setIsInstallable(false);
    }
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  // Persist language
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pch_lang', lang);
    }
  }, [lang]);

  // Persist Plan
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('pch_user_plan', userPlan);
    }
  }, [userPlan]);

  // Persist User & Update Global "Database"
  useEffect(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
          if (currentUser) {
            localStorage.setItem('pch_current_user', JSON.stringify(currentUser));
            
            // Update "Global" user list for Admin analytics (Simulated DB)
            const allUsers: User[] = JSON.parse(localStorage.getItem('pch_all_users_db') || '[]');
            const index = allUsers.findIndex(u => u.email === currentUser.email);
            if (index >= 0) {
                allUsers[index] = currentUser;
            } else {
                allUsers.push(currentUser);
            }
            localStorage.setItem('pch_all_users_db', JSON.stringify(allUsers));

          } else {
            localStorage.removeItem('pch_current_user');
          }
      }
  }, [currentUser]);

  // Check Privacy Consent
  useEffect(() => {
    const consent = localStorage.getItem('pch_privacy_consent');
    if (!consent) {
       setTimeout(() => setShowPrivacy(true), 1500);
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem('pch_privacy_consent', 'true');
    setShowPrivacy(false);
  };

  const handleSubscribe = () => {
    setIsProcessingUpgrade(true);
    setTimeout(() => {
        setUserPlan('member');
        setIsProcessingUpgrade(false);
        if (currentUser) {
            setCurrentUser({ ...currentUser, plan: 'member' });
        }
    }, 1500);
  };

  const handleLogin = (user: User) => {
      // Check existing in "DB"
      const allUsers: User[] = JSON.parse(localStorage.getItem('pch_all_users_db') || '[]');
      const existing = allUsers.find(u => u.email === user.email);
      
      let finalUser = user;
      
      if (existing) {
          // Restore existing state but update login time
          finalUser = { 
              ...existing, 
              lastActive: new Date().toISOString() 
          };
      } else {
          // New user init
          finalUser = {
              ...user,
              id: Date.now().toString(),
              registeredAt: new Date().toISOString(),
              lastActive: new Date().toISOString(),
              plan: user.isAdmin ? 'guardian' : 'member', // Login grants Member by default per requirement
              resonanceScore: 0
          };
      }

      setCurrentUser(finalUser);
      setUserPlan(finalUser.plan);
  };

  const handleResetApp = () => {
      localStorage.clear();
      window.location.reload();
  };

  const handleSessionDisconnect = () => {
      setHasStarted(false);
      
      // Update last active
      if (currentUser) {
          // 30% chance to assign a Human Connection Task if none exists
          let newTask = currentUser.pendingTask;
          if (!newTask && Math.random() > 0.3) { // 70% chance actually
              const taskDesc = HUMAN_CONNECTION_TASKS[Math.floor(Math.random() * HUMAN_CONNECTION_TASKS.length)];
              newTask = {
                  id: Date.now().toString(),
                  description: taskDesc,
                  dateAssigned: new Date().toISOString()
              };
          }

          setCurrentUser({
              ...currentUser,
              lastActive: new Date().toISOString(),
              pendingTask: newTask
          });
      }
  };

  const completeTask = (completed: boolean) => {
      if (currentUser) {
          const newScore = completed ? (currentUser.resonanceScore || 0) + 1 : (currentUser.resonanceScore || 0);
          setCurrentUser({
              ...currentUser,
              pendingTask: undefined,
              resonanceScore: newScore
          });
      }
      setShowHumanTask(false);
  };

  // Mini Presentation Sequence
  useEffect(() => {
    const runIntro = async () => {
      setIntroStep(0);
      setIntroOpacity(1);
      await new Promise(r => setTimeout(r, 2000));
      setIntroOpacity(0);
      await new Promise(r => setTimeout(r, 1000));

      setIntroStep(1);
      setIntroOpacity(1);
      await new Promise(r => setTimeout(r, 2000));
      setIntroOpacity(0);
      await new Promise(r => setTimeout(r, 1000));

      setIntroStep(2);
      setIntroOpacity(1);
      await new Promise(r => setTimeout(r, 2000));
      setIntroOpacity(0);
      await new Promise(r => setTimeout(r, 1000));

      setIntroStep(3);
      setIntroOpacity(1);
    };

    runIntro();
  }, [lang]);

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
    <div className="h-[100dvh] w-full bg-stone-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-800/40 via-stone-950 to-black text-stone-200 overflow-hidden flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Minimal Header */}
      {introStep === 3 && (
        <header className={`absolute top-0 left-0 w-full p-4 md:p-6 flex flex-col md:flex-row justify-between items-center z-50 transition-opacity duration-1000 ${hasStarted ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
          {/* Logo Section - Hidden on Mobile to avoid overlap */}
          <div className="hidden md:flex items-center space-x-3 mb-4 md:mb-0">
             <Logo className="w-8 h-8 text-stone-400 drop-shadow-md" />
             <div className="font-serif text-sm tracking-[0.3em] text-stone-400 uppercase hover:text-stone-200 transition-colors cursor-default hidden md:block">
               {text.title}
             </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-center space-x-2 md:space-x-4">
              {/* Concept/Landing Button */}
              <button 
                onClick={() => setShowLanding(true)}
                className="px-4 py-1.5 rounded-full border border-stone-700/50 bg-stone-900/60 backdrop-blur-sm text-[10px] uppercase tracking-widest text-stone-300 hover:bg-stone-800/80 hover:text-white hover:border-teal-500/30 transition-all mr-2"
              >
                  {text.conceptBtn || "The Concept"}
              </button>

              {isInstallable && (
                <button 
                  onClick={handleInstallClick}
                  className="flex p-2 text-stone-400 hover:text-teal-400 transition-colors"
                  title={text.installBtn}
                >
                  <DownloadIcon className="w-5 h-5 animate-pulse" />
                </button>
              )}
              
              {/* Login / Admin Button */}
              {currentUser ? (
                  <button 
                    onClick={() => currentUser.isAdmin ? setShowAdmin(true) : null}
                    className={`flex items-center space-x-2 p-2 transition-colors ${currentUser.isAdmin ? 'text-red-400' : 'text-teal-500'}`}
                    title={currentUser.email}
                  >
                     <UserIcon className="w-5 h-5" />
                     {currentUser.resonanceScore > 0 && (
                         <span className="text-[9px] font-mono border border-teal-900 px-1 rounded bg-teal-950/50 text-teal-300">
                             Lvl {currentUser.resonanceScore}
                         </span>
                     )}
                  </button>
              ) : (
                  <button 
                    onClick={() => setShowLogin(true)}
                    className="flex p-2 text-stone-400 hover:text-teal-400 transition-colors"
                    title="Login / Access"
                  >
                     <UserIcon className="w-5 h-5" />
                  </button>
              )}

              <button 
                onClick={() => setShowPremium(true)}
                className={`flex p-2 transition-colors ${userPlan !== 'visitor' ? 'text-amber-400' : 'text-stone-400 hover:text-amber-300'}`}
                title="Premium"
              >
                <StarIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowJournal(true)}
                className="flex p-2 text-stone-400 hover:text-teal-400 transition-colors"
                title="Journal"
              >
                <PenIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowGuide(true)}
                className="flex p-2 text-stone-400 hover:text-stone-200 transition-colors"
                title="Guide"
              >
                <BookIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setShowHistory(true)}
                className="flex p-2 text-stone-400 hover:text-stone-200 transition-colors"
                title="History"
              >
                <ClockIcon className="w-5 h-5" />
              </button>
          </div>
        </header>
      )}

      {/* Components Modals */}
      <JournalModal isOpen={showJournal} onClose={() => setShowJournal(false)} lang={lang} />
      <LandingModal isOpen={showLanding} onClose={() => setShowLanding(false)} lang={lang} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} lang={lang} onLogin={handleLogin} />
      
      {currentUser && (
          <AdminModal 
            isOpen={showAdmin} 
            onClose={() => setShowAdmin(false)} 
            user={currentUser} 
            currentPlan={userPlan}
            onUpdatePlan={setUserPlan}
            onResetApp={handleResetApp}
          />
      )}

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-fade-in" onClick={() => setShowGuide(false)}>
           <div className="bg-stone-900 border border-stone-800 rounded-lg w-full max-w-lg flex flex-col max-h-[85vh] relative shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowGuide(false)} className="absolute top-4 right-4 text-stone-500 hover:text-stone-200">
                  <XMarkIcon className="w-6 h-6" />
              </button>
              
              <div className="p-8 pb-4 text-center border-b border-stone-800/50">
                  <h3 className="font-serif text-2xl text-teal-400 tracking-widest uppercase mb-1 drop-shadow-md">{text.guide?.title}</h3>
                  <div className="w-12 h-px bg-teal-900/50 mx-auto mt-4"></div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  {text.guide?.steps.map((step: any, idx: number) => (
                      <div key={idx} className="space-y-2">
                          <h4 className="text-stone-200 font-serif text-lg tracking-wide">{step.title}</h4>
                          <p className="text-stone-400 font-light leading-relaxed text-sm">{step.text}</p>
                      </div>
                  ))}
              </div>

              <div className="p-6 border-t border-stone-800/50 flex justify-center">
                  <button 
                    onClick={() => setShowGuide(false)}
                    className="text-xs uppercase tracking-[0.3em] text-stone-500 hover:text-stone-200 transition-colors"
                  >
                    {text.guide?.close}
                  </button>
              </div>
           </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-fade-in" onClick={() => setShowHistory(false)}>
           <div className="bg-stone-900/90 border border-stone-800 rounded-none w-full max-w-md flex flex-col max-h-[80vh] shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b border-stone-800 flex justify-between items-center">
                <h3 className="font-serif text-xl text-stone-200 tracking-widest uppercase drop-shadow-sm">{text.history.title}</h3>
                <button onClick={() => setShowHistory(false)} className="text-stone-500 hover:text-stone-200">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {historyItems.length === 0 ? (
                  <div className="text-center py-10 text-stone-500 font-light text-sm tracking-widest">
                    {text.history.empty}
                  </div>
                ) : (
                  historyItems.map((item, idx) => (
                    <div key={idx} className="bg-stone-950/50 border border-stone-800/50 p-4 flex justify-between items-center hover:bg-stone-800/50 transition-colors">
                      <div className="flex flex-col">
                        <span className="text-sm text-stone-300 font-serif">{formatDate(item.date)}</span>
                      </div>
                      <div className="font-mono text-stone-500 text-xs">
                        {formatDuration(item.duration)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {historyItems.length > 0 && (
                <div className="p-4 border-t border-stone-800 bg-stone-900/50 flex justify-end">
                   <button 
                     onClick={clearHistory}
                     className="flex items-center text-[10px] text-red-800 hover:text-red-400 transition-colors uppercase tracking-[0.2em] space-x-2 px-3 py-2"
                   >
                     <TrashIcon className="w-3 h-3" />
                     <span>{text.history.clear}</span>
                   </button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* Premium / Community Teaser Modal */}
      {showPremium && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-stone-950/95 backdrop-blur-xl p-6 animate-fade-in" onClick={() => setShowPremium(false)}>
           <div className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-900/30 rounded-2xl w-full max-w-sm flex flex-col relative shadow-2xl shadow-amber-900/10" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowPremium(false)} className="absolute top-4 right-4 text-stone-500 hover:text-stone-200">
                  <XMarkIcon className="w-6 h-6" />
              </button>
              
              <div className="p-8 text-center space-y-4">
                  <div className="flex justify-center mb-4">
                      <div className="p-3 bg-amber-950/30 rounded-full border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                          <StarIcon className="w-8 h-8 text-amber-400" />
                      </div>
                  </div>
                  <h3 className="font-serif text-2xl text-amber-100 tracking-widest uppercase drop-shadow-md">{text.premium?.title}</h3>
                  <p className="text-amber-600/80 text-xs uppercase tracking-[0.2em]">{text.premium?.subtitle}</p>
                  <p className="text-stone-300 font-light text-sm leading-relaxed px-2 py-2">
                    {text.premium?.desc}
                  </p>
                  
                  {currentUser && currentUser.isAdmin && (
                      <div className="p-2 mb-2 bg-red-950/30 border border-red-900/40 text-red-400 text-[10px] uppercase tracking-widest rounded">
                         {text.login?.adminBadge || "ADMIN ACCESS"}
                      </div>
                  )}

                  <div className="space-y-3 pt-4 text-left px-4">
                      <div className="flex items-center space-x-3 text-stone-300 text-sm">
                          <CheckIcon className={`w-4 h-4 ${userPlan === 'visitor' ? 'text-stone-600' : 'text-amber-500'}`} />
                          <span className={userPlan === 'visitor' ? 'opacity-50' : ''}>{text.premium?.perk1}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-stone-300 text-sm">
                          <CheckIcon className={`w-4 h-4 ${userPlan === 'member' || userPlan === 'guardian' ? 'text-amber-500' : 'text-stone-700'}`} />
                          <span className={userPlan === 'visitor' ? 'text-stone-500' : ''}>{text.premium?.perk2}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-stone-300 text-sm">
                          <CheckIcon className={`w-4 h-4 ${userPlan === 'guardian' ? 'text-amber-500' : 'text-stone-700'}`} />
                          <span className={userPlan !== 'guardian' ? 'text-stone-500' : ''}>{text.premium?.perk3}</span>
                      </div>
                  </div>

                  <div className="pt-6">
                      <button 
                        onClick={handleSubscribe}
                        disabled={userPlan !== 'visitor' || isProcessingUpgrade}
                        className={`w-full py-3 rounded-lg text-xs uppercase tracking-[0.2em] transition-all duration-300 ${userPlan !== 'visitor' ? 'bg-green-900/30 text-green-400 border border-green-900/50' : 'bg-amber-900/20 text-amber-100 border border-amber-500/30 hover:bg-amber-900/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]'}`}
                      >
                        {isProcessingUpgrade ? '...' : (userPlan !== 'visitor' ? text.premium?.joined : text.premium?.cta)}
                      </button>
                  </div>
              </div>
           </div>
        </div>
      )}

      {/* Privacy Consent Banner */}
      {showPrivacy && (
        <div className="fixed bottom-0 left-0 w-full z-[100] bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-4 md:p-6 animate-slide-up">
           <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="flex items-center space-x-3">
                   <ShieldIcon className="w-5 h-5 text-stone-400" />
                   <p className="text-stone-300 text-xs md:text-sm font-light leading-snug text-center md:text-left">
                       {text.legal?.text}
                   </p>
               </div>
               <div className="flex items-center space-x-4">
                   <button 
                     onClick={handleConsent}
                     className="px-6 py-2 bg-stone-200 text-stone-900 rounded text-xs uppercase tracking-widest hover:bg-white transition-colors font-semibold"
                   >
                       {text.legal?.accept}
                   </button>
               </div>
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
                  <span className="text-3xl md:text-5xl font-serif text-stone-200 tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {introStep < 3 ? text.intro[introStep] : ''}
                  </span>
             </div>

             {/* Final Landing Screen */}
             <div className={`max-w-md mx-auto px-8 text-center space-y-12 transition-opacity duration-1000 ${introStep === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
               
                {/* Minimal Title */}
                <div className="space-y-4 flex flex-col items-center">
                  <Logo className="w-24 h-24 text-stone-100 opacity-90 mb-6 drop-shadow-[0_0_20px_rgba(20,184,166,0.3)]" />
                  <h1 className="text-4xl md:text-6xl font-serif text-stone-100 tracking-wider drop-shadow-lg">
                    {text.title}
                  </h1>
                  <div className="h-px w-12 bg-stone-700 mx-auto shadow-[0_0_10px_white]"></div>
                  <p className="text-xs font-light tracking-[0.4em] text-stone-400 uppercase">
                    {text.subtitle}
                  </p>
                </div>

                {/* Daily Insight / Engagement Layer */}
                <div 
                    onClick={() => setShowJournal(true)}
                    className="bg-stone-900/40 border border-stone-700/50 p-6 rounded-lg backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500 cursor-pointer group shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                    <div className="flex justify-between items-center mb-3">
                         <span className="text-[10px] text-teal-500/80 uppercase tracking-[0.3em] block">{text.daily?.title}</span>
                         <PenIcon className="w-3 h-3 text-stone-500 group-hover:text-teal-400 transition-colors" />
                    </div>
                    <p className="font-serif italic text-stone-300 text-lg leading-relaxed">
                      "{text.daily?.quote}"
                    </p>
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest mt-4 block group-hover:text-stone-300 transition-colors">Tap to reflect</span>
                </div>

                {/* Entrance Button */}
                <div className="pt-4">
                  <button 
                    onClick={() => setHasStarted(true)}
                    className="group relative inline-flex items-center justify-center px-10 py-3 overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none"
                  >
                    <span className="absolute inset-0 w-full h-full border border-stone-600 rounded-full group-hover:border-stone-400 transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.05)]"></span>
                    <span className="relative text-stone-200 font-serif text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors drop-shadow-md">
                      {text.beginBtn}
                    </span>
                  </button>
                </div>

                {/* Minimal Language Selector (Bottom Center) */}
                <div className="pt-8 opacity-60 hover:opacity-100 transition-opacity">
                    <select
                      value={lang}
                      onChange={(e) => setLang(e.target.value as Language)}
                      className="bg-transparent text-stone-500 text-[10px] uppercase tracking-widest text-center focus:outline-none cursor-pointer hover:text-stone-300 appearance-none"
                      style={{ textAlignLast: 'center' }}
                    >
                      {LANGUAGES.map(({ code, label }) => (
                        <option key={code} value={code} className="bg-stone-900 text-stone-300">
                          {label}
                        </option>
                      ))}
                    </select>
                </div>

             </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col animate-fade-in">
            <SessionManager 
               onDisconnect={handleSessionDisconnect} 
               lang={lang} 
               userPlan={userPlan} 
               onUpgrade={() => setShowPremium(true)}
            />
          </div>
        )}

      </main>
    </div>
  );
}

export default App;