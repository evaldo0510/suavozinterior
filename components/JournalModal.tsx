import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

interface JournalEntry {
  id: string;
  date: string;
  text: string;
  prompt?: string;
}

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const SparklesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export const JournalModal: React.FC<JournalModalProps> = ({ isOpen, onClose, lang }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const text = TRANSLATIONS[lang].journal;

  // Load entries and initial prompt on open
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('pch_journal_entries');
        if (stored) {
          setEntries(JSON.parse(stored));
        }
        
        // Always select a prompt if none exists or simply to refresh state
        if (!currentPrompt && text?.prompts && text.prompts.length > 0) {
            const random = text.prompts[Math.floor(Math.random() * text.prompts.length)];
            setCurrentPrompt(random);
        }
      } catch (e) {
        console.error("Failed to load journal", e);
      }
    }
  }, [isOpen, text?.prompts]);

  const saveEntry = () => {
    if (!currentText.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: currentText,
      prompt: currentPrompt
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    // Ensure persistence
    localStorage.setItem('pch_journal_entries', JSON.stringify(updated));
    
    setCurrentText('');
    cyclePrompt();
  };

  const cyclePrompt = () => {
      if (text?.prompts && text.prompts.length > 0) {
          let newPrompt = currentPrompt;
          // Simple attempt to get a different prompt
          let attempts = 0;
          while (newPrompt === currentPrompt && attempts < 5 && text.prompts.length > 1) {
             newPrompt = text.prompts[Math.floor(Math.random() * text.prompts.length)];
             attempts++;
          }
          if (text.prompts.length === 1) newPrompt = text.prompts[0];
          setCurrentPrompt(newPrompt);
      }
  };

  const handleNewReflection = () => {
      setCurrentText('');
      cyclePrompt();
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    // Ensure persistence
    localStorage.setItem('pch_journal_entries', JSON.stringify(updated));
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(lang, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-fade-in" onClick={onClose}>
      <div className="bg-stone-900 border border-stone-800 w-full max-w-2xl h-[85vh] flex flex-col rounded-2xl shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
         
         {/* Header */}
         <div className="p-6 border-b border-stone-800 flex justify-between items-center bg-stone-900/50">
            <div className="flex items-center space-x-3">
                <h3 className="font-serif text-xl text-stone-200 tracking-widest uppercase">{text?.title}</h3>
                <span className="text-[10px] bg-stone-800 text-stone-500 px-2 py-0.5 rounded-full">{entries.length}</span>
            </div>
            <button onClick={onClose} className="text-stone-500 hover:text-stone-200 transition-colors">
              <XMarkIcon className="w-6 h-6" />
            </button>
         </div>

         <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            
            {/* Input Section */}
            <div className="flex-1 p-6 flex flex-col space-y-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-stone-900 to-stone-950">
               
               {/* Styled Prompt Card */}
               <div className="relative bg-stone-950 p-6 rounded-xl border border-stone-800/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] group transition-all hover:border-teal-900/30">
                   <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-800/40 to-transparent rounded-l-xl opacity-70" />
                   
                   <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2 text-teal-500/70">
                            <SparklesIcon className="w-4 h-4 animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.25em]">Reflection Prompt</span>
                        </div>
                        <button 
                            onClick={handleNewReflection}
                            className="flex items-center space-x-1 text-[9px] uppercase tracking-widest text-stone-500 hover:text-teal-400 transition-colors bg-stone-900/50 px-3 py-1.5 rounded-full border border-stone-800 hover:border-teal-900/50"
                        >
                            <PlusIcon className="w-3 h-3" />
                            <span>{text?.newEntry || "New Reflection"}</span>
                        </button>
                   </div>
                   
                   <p className="text-stone-200 font-serif italic text-xl leading-relaxed tracking-wide opacity-90 drop-shadow-sm">
                       "{currentPrompt}"
                   </p>
               </div>
               
               {/* Text Area */}
               <textarea 
                  className="flex-1 bg-transparent resize-none focus:outline-none text-stone-300 font-light leading-7 placeholder-stone-700/50 min-h-[250px] p-2 selection:bg-teal-900/30 selection:text-teal-200 text-base"
                  placeholder={text?.placeholder}
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
                  autoFocus
               />

               {/* Footer Actions */}
               <div className="flex justify-end pt-2">
                  <button 
                    onClick={saveEntry}
                    disabled={!currentText.trim()}
                    className="px-8 py-3 bg-stone-200 text-stone-900 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_15px_rgba(231,229,228,0.1)] disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
                  >
                     {text?.save}
                  </button>
               </div>
            </div>

            {/* History Sidebar */}
            <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-stone-800 bg-stone-950 flex flex-col">
                <div className="p-4 border-b border-stone-800 bg-stone-950/50">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-bold">Past Reflections</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {entries.length === 0 && (
                        <div className="p-8 text-center text-stone-600 text-xs italic">
                            Your history is empty.<br/>Begin your journey.
                        </div>
                    )}
                    {entries.map(entry => (
                        <div key={entry.id} className="p-5 border-b border-stone-800/40 hover:bg-stone-900 transition-colors group cursor-default">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] text-teal-700/80 font-mono tracking-wide">{formatDate(entry.date)}</span>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); deleteEntry(entry.id); }} 
                                    className="text-stone-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"
                                >
                                    <TrashIcon className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            {entry.prompt && (
                                <p className="text-[10px] text-stone-500 mb-2 italic line-clamp-1 border-l border-stone-800 pl-2">
                                    {entry.prompt}
                                </p>
                            )}
                            <p className="text-stone-400 text-xs line-clamp-3 leading-relaxed font-light">{entry.text}</p>
                        </div>
                    ))}
                </div>
            </div>
         </div>

      </div>
    </div>
  );
};