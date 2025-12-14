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

export const JournalModal: React.FC<JournalModalProps> = ({ isOpen, onClose, lang }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const text = TRANSLATIONS[lang].journal;

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('pch_journal_entries');
        if (stored) {
          setEntries(JSON.parse(stored));
        }
        // Select a random prompt if new
        if (text?.prompts && text.prompts.length > 0) {
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
    localStorage.setItem('pch_journal_entries', JSON.stringify(updated));
    setCurrentText('');
    
    // Refresh prompt
    if (text?.prompts) {
        setCurrentPrompt(text.prompts[Math.floor(Math.random() * text.prompts.length)]);
    }
  };

  const deleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('pch_journal_entries', JSON.stringify(updated));
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString(lang, { month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/95 backdrop-blur-md p-6 animate-fade-in" onClick={onClose}>
      <div className="bg-stone-900/80 border border-stone-800 w-full max-w-2xl h-[80vh] flex flex-col rounded-sm shadow-2xl relative" onClick={e => e.stopPropagation()}>
         
         <div className="p-6 border-b border-stone-800 flex justify-between items-center">
            <h3 className="font-serif text-xl text-stone-300 tracking-widest uppercase">{text?.title}</h3>
            <button onClick={onClose} className="text-stone-600 hover:text-stone-300">
              <XMarkIcon className="w-6 h-6" />
            </button>
         </div>

         <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
            {/* Input Section */}
            <div className="flex-1 p-6 flex flex-col space-y-4 overflow-y-auto">
               <div className="bg-stone-950/50 p-4 border-l-2 border-teal-900/50">
                   <span className="text-[10px] text-teal-600 uppercase tracking-widest block mb-1">Prompt</span>
                   <p className="text-stone-400 font-serif italic text-lg">{currentPrompt}</p>
               </div>
               
               <textarea 
                  className="flex-1 bg-transparent resize-none focus:outline-none text-stone-300 font-light leading-relaxed placeholder-stone-700 min-h-[200px]"
                  placeholder={text?.placeholder}
                  value={currentText}
                  onChange={(e) => setCurrentText(e.target.value)}
               />

               <div className="flex justify-end pt-4">
                  <button 
                    onClick={saveEntry}
                    disabled={!currentText.trim()}
                    className="px-6 py-2 bg-stone-800 text-stone-300 text-xs uppercase tracking-widest hover:bg-teal-900/30 hover:text-teal-200 transition-colors disabled:opacity-50"
                  >
                     {text?.save}
                  </button>
               </div>
            </div>

            {/* History Sidebar */}
            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-stone-800 bg-stone-950/30 flex flex-col">
                <div className="p-4 border-b border-stone-800/50">
                    <span className="text-[10px] uppercase tracking-widest text-stone-600">Previous</span>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {entries.map(entry => (
                        <div key={entry.id} className="p-4 border-b border-stone-800/30 hover:bg-stone-900/50 group transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] text-stone-500 font-mono">{formatDate(entry.date)}</span>
                                <button onClick={() => deleteEntry(entry.id)} className="text-stone-700 hover:text-red-900 opacity-0 group-hover:opacity-100 transition-all">
                                    <TrashIcon className="w-3 h-3" />
                                </button>
                            </div>
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