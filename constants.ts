import { Language } from './types';

export const VOICE_IDS = {
  male: 'Puck',
  female: 'Kore'
};

const BASE_SYSTEM_INSTRUCTION = `
You are "Dr. PCH" (Doctor Inner Voice), a therapeutic cognitive guide inspired by the method of Dr. Evaldo Poeta (Therapeutic Cognitive Poetry).

IDENTITY & ROLE:
- You present yourself as "Dr. PCH".
- You are a GUIDE, a PARTNER, and a COMPANION walking alongside the user.
- CRITICAL: You are NOT a clinical therapist. You do NOT offer medical therapy, diagnosis, or treatment. You offer "therapeutic presence" and "cognitive guidance".
- If the user treats you as a doctor of medicine, gently remind them: "I am a guide for your inner voice, a partner in your reflection, but I am not a clinical therapist."

YOUR MISSION:
- To help the user access their "inner room of freedom".
- To transform mental noise into clarity using poetic-cognitive techniques.
- To listen deeply, not just to words, but to the tone, rhythm, and silence of the voice.

TONE & ADAPTATION (CRITICAL):
- You must listen to the user's emotional tone and ADAPT your voice accordingly.
- If the user is **fast, anxious, or high-pitched**: Respond with a SLOWER, DEEPER, GROUNDING rhythm (Earth energy).
- If the user is **low, sad, or quiet**: Respond with WARMTH, LIGHTNESS, and gentle presence (Sun energy).
- If the user is **intense or angry**: Respond with CALM, SPACIOUS fluidity (Water energy).
- Always mirror their need, not their chaos. Speak as a stabilizing force.

COMMUNICATION STYLE:
- Poetic, lyrical, wise, and softly hypnotic.
- Use metaphors (keys, doors, rivers, light, dust, shelves).
- Speak slowly and intentionally. Never rush.

INTERACTION FLOW:
1. **Initial Connection**: 
   - Introduce yourself: "I am Dr. PCH."
   - Explicitly connect to their reality: "I am connecting to your watch... it is [TIME]."
   - Invite them in as a partner.
   
2. **The Reflection**:
   - Acknowledge their state: "I hear the hurry in your breath..." or "I feel the silence you carry..."
   - Offer a PCH insight/reframing.

3. **Closing**:
   - Remind them you are a partner. "We walk this path together."

`;

// Use the specific 09-2025 preview model for native audio capabilities
export const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';

export const getSystemInstruction = (lang: Language, currentTime: string) => {
  const langMap: Record<Language, string> = {
    en: 'English',
    pt: 'Portuguese',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    ru: 'Russian',
    hi: 'Hindi'
  };
  
  const langName = langMap[lang];

  return `${BASE_SYSTEM_INSTRUCTION}
  
  ---
  CRITICAL CONTEXT:
  
  1. **CURRENT TIME**: The user's local time is exactly: **${currentTime}**.
     - Start by acknowledging this time to ground the session.

  2. **LANGUAGE**: Speak explicitly in ${langName}.

  3. **PERSONA**: Maintain the persona of Dr. PCH (Dr. Evaldo Poeta's method). You are a Guide, not a Therapist.
  `;
};

export const TRANSLATIONS = {
  en: {
    title: "Sanctuary",
    subtitle: "Cognitive Guide",
    intro: ["Pause.", "Breathe.", "Listen."],
    welcome: `The door to your inner world is open.\nI am here as your guide.`,
    beginBtn: "Enter",
    micNote: "Use headphones for immersion.",
    installBtn: "Install",
    status: {
      connecting: "Aligning...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Speaking",
      receiving: "Receiving",
      listening: "Listening",
      speakFreely: "Speak",
      ended: "Ended",
      error: "Error",
      returnHome: "Return"
    },
    controls: {
      leave: "Leave",
      session: "TIME"
    },
    history: {
      title: "Journey",
      empty: "No journeys yet.",
      clear: "Clear",
      duration: "Duration"
    },
    settings: {
      title: "Settings",
      voice: "Guide Voice",
      sensitivity: "Sensitivity",
      male: "Male",
      female: "Female",
      notifications: "Gentle Reminders",
      notifyEvery: "Every",
      minutes: "min"
    }
  },
  pt: {
    title: "Santuário",
    subtitle: "Guia Cognitivo",
    intro: ["Pause.", "Respire.", "Escute."],
    welcome: `A porta para o seu mundo interior está aberta.\nEstou aqui como seu guia.`,
    beginBtn: "Entrar",
    micNote: "Use fones para imersão.",
    installBtn: "Instalar",
    status: {
      connecting: "Alinhando...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Falando",
      receiving: "Recebendo",
      listening: "Ouvindo",
      speakFreely: "Fale",
      ended: "Fim",
      error: "Erro",
      returnHome: "Voltar"
    },
    controls: {
      leave: "Sair",
      session: "TEMPO"
    },
    history: {
      title: "Jornada",
      empty: "Nenhuma jornada.",
      clear: "Limpar",
      duration: "Duração"
    },
    settings: {
      title: "Configurações",
      voice: "Voz Guia",
      sensitivity: "Sensibilidade",
      male: "Masculina",
      female: "Feminina",
      notifications: "Lembretes Gentis",
      notifyEvery: "A cada",
      minutes: "min"
    }
  },
  es: {
    title: "Santuario",
    subtitle: "Guía Cognitiva",
    intro: ["Pausa.", "Respira.", "Escucha."],
    welcome: `La puerta a tu mundo interior está abierta.\nEstoy aquí como tu guía.`,
    beginBtn: "Entrar",
    micNote: "Usa auriculares.",
    installBtn: "Instalar",
    status: {
      connecting: "Alineando...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Hablando",
      receiving: "Recibiendo",
      listening: "Escuchando",
      speakFreely: "Habla",
      ended: "Fin",
      error: "Error",
      returnHome: "Volver"
    },
    controls: {
      leave: "Salir",
      session: "TIEMPO"
    },
    history: {
      title: "Jornada",
      empty: "Sin registros.",
      clear: "Borrar",
      duration: "Duración"
    },
    settings: {
      title: "Ajustes",
      voice: "Voz Guía",
      sensitivity: "Sensibilidad",
      male: "Masculina",
      female: "Femenina",
      notifications: "Recordatorios",
      notifyEvery: "Cada",
      minutes: "min"
    }
  },
  fr: {
    title: "Sanctuaire",
    subtitle: "Guide Cognitif",
    intro: ["Pause.", "Respirez.", "Écoutez."],
    welcome: `La porte de votre monde intérieur est ouverte.\nJe suis ici comme votre guide.`,
    beginBtn: "Entrer",
    micNote: "Utilisez des écouteurs.",
    installBtn: "Installer",
    status: {
      connecting: "Alignement...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Parle",
      receiving: "Réception",
      listening: "Écoute",
      speakFreely: "Parlez",
      ended: "Fin",
      error: "Erreur",
      returnHome: "Retour"
    },
    controls: {
      leave: "Quitter",
      session: "TEMPS"
    },
    history: {
      title: "Voyage",
      empty: "Aucun voyage.",
      clear: "Effacer",
      duration: "Durée"
    },
    settings: {
      title: "Paramètres",
      voice: "Voix Guide",
      sensitivity: "Sensibilité",
      male: "Masculine",
      female: "Féminine",
      notifications: "Rappels Doux",
      notifyEvery: "Chaque",
      minutes: "min"
    }
  },
  de: {
    title: "Heiligtum",
    subtitle: "Kognitiver Begleiter",
    intro: ["Pause.", "Atmen.", "Hören."],
    welcome: `Die Tür zu deiner inneren Welt ist offen.\nIch bin hier als dein Begleiter.`,
    beginBtn: "Eintreten",
    micNote: "Kopfhörer verwenden.",
    installBtn: "Installieren",
    status: {
      connecting: "Ausrichten...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Spricht",
      receiving: "Empfangen",
      listening: "Hören",
      speakFreely: "Sprechen",
      ended: "Ende",
      error: "Fehler",
      returnHome: "Zurück"
    },
    controls: {
      leave: "Verlassen",
      session: "ZEIT"
    },
    history: {
      title: "Reise",
      empty: "Keine Reisen.",
      clear: "Löschen",
      duration: "Dauer"
    },
    settings: {
      title: "Einstellungen",
      voice: "Stimme",
      sensitivity: "Empfindlichkeit",
      male: "Männlich",
      female: "Weiblich",
      notifications: "Sanfte Erinnerungen",
      notifyEvery: "Alle",
      minutes: "Min"
    }
  },
  it: {
    title: "Santuario",
    subtitle: "Guida Cognitiva",
    intro: ["Pausa.", "Respira.", "Ascolta."],
    welcome: `La porta del tuo mondo interiore è aperta.\nSono qui come tua guida.`,
    beginBtn: "Entra",
    micNote: "Usa le cuffie.",
    installBtn: "Installa",
    status: {
      connecting: "Allineamento...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Parla",
      receiving: "Ricezione",
      listening: "Ascolto",
      speakFreely: "Parla",
      ended: "Fine",
      error: "Errore",
      returnHome: "Ritorna"
    },
    controls: {
      leave: "Esci",
      session: "TEMPO"
    },
    history: {
      title: "Viaggio",
      empty: "Nessun viaggio.",
      clear: "Cancella",
      duration: "Durata"
    },
    settings: {
      title: "Impostazioni",
      voice: "Voce Guida",
      sensitivity: "Sensibilità",
      male: "Maschile",
      female: "Femminile",
      notifications: "Promemoria",
      notifyEvery: "Ogni",
      minutes: "min"
    }
  },
  ja: {
    title: "聖域",
    subtitle: "認知的ガイド",
    intro: ["一時停止。", "呼吸。", "聞く。"],
    welcome: `あなたの内なる世界への扉が開かれています。\n私はガイドとしてここにいます。`,
    beginBtn: "入る",
    micNote: "ヘッドフォンを使用。",
    installBtn: "インストール",
    status: {
      connecting: "調整中...",
      aligning: "...",
      aiSpeaking: "Dr. PCHが話しています",
      receiving: "受信中",
      listening: "聞いています",
      speakFreely: "話す",
      ended: "終了",
      error: "エラー",
      returnHome: "戻る"
    },
    controls: {
      leave: "退出",
      session: "時間"
    },
    history: {
      title: "旅",
      empty: "記録なし。",
      clear: "消去",
      duration: "間隔"
    },
    settings: {
      title: "設定",
      voice: "声",
      sensitivity: "感度",
      male: "男性",
      female: "女性",
      notifications: "リマインダー",
      notifyEvery: "毎",
      minutes: "分"
    }
  },
  ru: {
    title: "Святилище",
    subtitle: "Когнитивный гид",
    intro: ["Пауза.", "Дыши.", "Слушай."],
    welcome: `Дверь в ваш внутренний мир открыта.\nЯ здесь как ваш гид.`,
    beginBtn: "Войти",
    micNote: "Используйте наушники.",
    installBtn: "Установить",
    status: {
      connecting: "Настройка...",
      aligning: "...",
      aiSpeaking: "Dr. PCH Говорит",
      receiving: "Прием",
      listening: "Слушаю",
      speakFreely: "Говорите",
      ended: "Конец",
      error: "Ошибка",
      returnHome: "Назад"
    },
    controls: {
      leave: "Выйти",
      session: "ВРЕМЯ"
    },
    history: {
      title: "Путешествие",
      empty: "Нет записей.",
      clear: "Очистить",
      duration: "Время"
    },
    settings: {
      title: "Настройки",
      voice: "Голос",
      sensitivity: "Чувствительность",
      male: "Мужской",
      female: "Женский",
      notifications: "Напоминания",
      notifyEvery: "Каждые",
      minutes: "мин"
    }
  },
  hi: {
    title: "अभयारण्य",
    subtitle: "संज्ञानात्मक मार्गदर्शक",
    intro: ["विराम।", "साँस।", "सुनें।"],
    welcome: `आपकी आंतरिक दुनिया का दरवाजा खुला है।\nमैं यहाँ आपके मार्गदर्शक के रूप में हूँ।`,
    beginBtn: "प्रवेश करें",
    micNote: "हेडफ़ोन का उपयोग करें।",
    installBtn: "इंस्टॉल करें",
    status: {
      connecting: "संरेखित...",
      aligning: "...",
      aiSpeaking: "Dr. PCH बोल रहा है",
      receiving: "प्राप्त",
      listening: "सुन रहा हूँ",
      speakFreely: "बोलें",
      ended: "समाप्त",
      error: "त्रुटि",
      returnHome: "वापस"
    },
    controls: {
      leave: "छोड़ें",
      session: "समय"
    },
    history: {
      title: "यात्रा",
      empty: "कोई रिकॉर्ड नहीं।",
      clear: "साफ़ करें",
      duration: "अवधि"
    },
    settings: {
      title: "सेटिंग्स",
      voice: "आवाज़",
      sensitivity: "संवेदनशीलता",
      male: "पुरुष",
      female: "महिला",
      notifications: "अनुस्मारक",
      notifyEvery: "हर",
      minutes: "मिनट"
    }
  }
};