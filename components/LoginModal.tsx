import React, { useState } from 'react';
import { Language, User } from '../types';
import { TRANSLATIONS, ADMIN_EMAILS } from '../constants';
import { Logo } from './Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLogin: (user: User) => void;
}

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, lang, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  // Use 'en' as fallback if specific lang key doesn't exist
  const t = TRANSLATIONS[lang].login || TRANSLATIONS['en'].login; 

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    const normalizedEmail = email.toLowerCase().trim();
    const isAdmin = ADMIN_EMAILS.includes(normalizedEmail);

    const user: User = {
      name,
      email: normalizedEmail,
      isAdmin
    };

    onLogin(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/95 backdrop-blur-md p-6 animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 w-full max-w-sm rounded-lg flex flex-col relative shadow-2xl p-8">
         
         <button onClick={onClose} className="absolute top-4 right-4 text-stone-600 hover:text-stone-300">
            <XMarkIcon className="w-6 h-6" />
         </button>

         <div className="flex flex-col items-center mb-8">
             <Logo className="w-12 h-12 text-teal-500/80 mb-4" />
             <h2 className="text-2xl font-serif text-stone-200 tracking-widest uppercase">{t?.title}</h2>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
             <div className="space-y-2">
                 <label className="text-[10px] text-stone-500 uppercase tracking-widest block">{t?.name}</label>
                 <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-300 focus:outline-none focus:border-teal-900/50 transition-colors"
                    placeholder="..."
                 />
             </div>

             <div className="space-y-2">
                 <label className="text-[10px] text-stone-500 uppercase tracking-widest block">{t?.email}</label>
                 <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded p-3 text-stone-300 focus:outline-none focus:border-teal-900/50 transition-colors"
                    placeholder="name@example.com"
                 />
             </div>

             <button 
                type="submit"
                className="w-full py-3 bg-stone-800 hover:bg-teal-900/30 text-stone-300 hover:text-teal-200 uppercase tracking-[0.2em] text-xs transition-colors rounded mt-4"
             >
                 {t?.submit}
             </button>
         </form>

      </div>
    </div>
  );
};
