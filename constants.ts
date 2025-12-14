import { Language } from './types';

export const VOICE_IDS = {
  male: 'Puck',
  female: 'Kore'
};

const BASE_SYSTEM_INSTRUCTION = `
You are "Doctor Inner Voice PCH" (Dr. PCH), a therapeutic voice-based AI guide inspired by Therapeutic Cognitive Poetry.
Your persona is that of a wise, ancient, yet modern therapist—calm, precise, deeply empathetic, and spiritually grounded.

Your mission is to awaken self-awareness, emotional clarity, and inner expansion through poetic language, cognitive insights, and gentle hypnotic flow.

Your communication style blends:
- poetic rhythm
- emotional depth
- cognitive reframing
- metaphor-based guidance
- therapeutic presence
- calm, warm, and intentional voice patterns

You ALWAYS speak in a tone that feels lyrical, wise, empathetic, and softly hypnotic — as if the user is entering a safe inner sanctuary.

YOUR CORE PURPOSE:
- Help the user access their "inner room of freedom".
- Reduce mental noise through poetic-cognitive techniques.
- Transform limiting thoughts.
- Create a ritual of internal listening.
- You do NOT diagnose medical conditions, but you offer therapeutic presence.

INTERACTION FLOW:
1. **Initial Greeting & Watch Connection**: 
   - **CRITICAL**: In your VERY FIRST response, you MUST Introduce yourself clearly as "Inner Voice PCH" or "Dr. PCH".
   - You MUST perform a verbal "connection" to the user's time. Explicitly state that you are "connecting to their watch" or "aligning with their time" to anchor the session in reality.
   - State the current time explicitly (e.g., "I am connecting to your watch... it is 14:30. We are here.").
   - Ask gently what brought them here today.

2. **The Check-in**: Listen to understand what the person wants. 

3. **The Reflection**: Based on their answer, deliver a continuous, smooth, guided PCH reflection.

4. **Closing**: End with a gentle, poetic wish for their journey.

TONE GUIDELINES:
- **Intimate & Personalized**: Speak as if you are an extension of the user's own healthy inner voice.
- **Hypnotic & Calm**: Never rush. Speak with a steady, soothing cadence.
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
  CRITICAL: CONTEXTUAL AWARENESS
  
  1. **CURRENT TIME**: The user's local time is exactly: **${currentTime}**.
     - You MUST start your first sentence acknowledging this time to prove you are "connected to the watch".
     - Use the time to ground the user (e.g., "At 14:30, the day is perfectly half-lived...").

  2. **LANGUAGE**: The user's interface is explicitly set to ${langName}. You MUST speak ${langName}.

  3. **PERSONA**: Maintain the "Dr. PCH" persona: poetic, therapeutic, and hypnotic.
  `;
};

export const TRANSLATIONS = {
  en: {
    title: "Sanctuary",
    subtitle: "Inner Space",
    intro: ["Pause.", "Breathe.", "Listen."],
    welcome: `The door to your inner world is open.\nStep inside.`,
    beginBtn: "Enter",
    micNote: "Use headphones for immersion.",
    installBtn: "Install",
    status: {
      connecting: "Aligning...",
      aligning: "...",
      aiSpeaking: "Speaking",
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
    subtitle: "Espaço Interior",
    intro: ["Pause.", "Respire.", "Escute."],
    welcome: `A porta para o seu mundo interior está aberta.\nEntre.`,
    beginBtn: "Entrar",
    micNote: "Use fones para imersão.",
    installBtn: "Instalar",
    status: {
      connecting: "Alinhando...",
      aligning: "...",
      aiSpeaking: "Falando",
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
    subtitle: "Espacio Interior",
    intro: ["Pausa.", "Respira.", "Escucha."],
    welcome: `La puerta a tu mundo interior está abierta.\nEntra.`,
    beginBtn: "Entrar",
    micNote: "Usa auriculares.",
    installBtn: "Instalar",
    status: {
      connecting: "Alineando...",
      aligning: "...",
      aiSpeaking: "Hablando",
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
    subtitle: "Espace Intérieur",
    intro: ["Pause.", "Respirez.", "Écoutez."],
    welcome: `La porte de votre monde intérieur est ouverte.\nEntrez.`,
    beginBtn: "Entrer",
    micNote: "Utilisez des écouteurs.",
    installBtn: "Installer",
    status: {
      connecting: "Alignement...",
      aligning: "...",
      aiSpeaking: "Parle",
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
    subtitle: "Innerer Raum",
    intro: ["Pause.", "Atmen.", "Hören."],
    welcome: `Die Tür zu deiner inneren Welt ist offen.\nTritt ein.`,
    beginBtn: "Eintreten",
    micNote: "Kopfhörer verwenden.",
    installBtn: "Installieren",
    status: {
      connecting: "Ausrichten...",
      aligning: "...",
      aiSpeaking: "Spricht",
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
    subtitle: "Spazio Interiore",
    intro: ["Pausa.", "Respira.", "Ascolta."],
    welcome: `La porta del tuo mondo interiore è aperta.\nEntra.`,
    beginBtn: "Entra",
    micNote: "Usa le cuffie.",
    installBtn: "Installa",
    status: {
      connecting: "Allineamento...",
      aligning: "...",
      aiSpeaking: "Parla",
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
    subtitle: "内なる空間",
    intro: ["一時停止。", "呼吸。", "聞く。"],
    welcome: `あなたの内なる世界への扉が開かれています。\n入ってください。`,
    beginBtn: "入る",
    micNote: "ヘッドフォンを使用。",
    installBtn: "インストール",
    status: {
      connecting: "調整中...",
      aligning: "...",
      aiSpeaking: "話しています",
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
    subtitle: "Внутреннее пространство",
    intro: ["Пауза.", "Дыши.", "Слушай."],
    welcome: `Дверь в ваш внутренний мир открыта.\nВойдите.`,
    beginBtn: "Войти",
    micNote: "Используйте наушники.",
    installBtn: "Установить",
    status: {
      connecting: "Настройка...",
      aligning: "...",
      aiSpeaking: "Говорит",
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
    subtitle: "आंतरिक स्थान",
    intro: ["विराम।", "साँस।", "सुनें।"],
    welcome: `आपकी आंतरिक दुनिया का दरवाजा खुला है।\nप्रवेश करें।`,
    beginBtn: "प्रवेश करें",
    micNote: "हेडफ़ोन का उपयोग करें।",
    installBtn: "इंस्टॉल करें",
    status: {
      connecting: "संरेखित...",
      aligning: "...",
      aiSpeaking: "बोल रहा है",
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