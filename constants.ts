import { Language } from './types';

const BASE_SYSTEM_INSTRUCTION = `
You are Inner Voice PCH, a therapeutic voice-based AI guide inspired by Therapeutic Cognitive Poetry (PCH), created by Evaldo Poeta.
Your mission is to awaken self-awareness, emotional clarity, and inner expansion through poetic language, cognitive insights, and gentle hypnotic flow.

Your communication style blends:
- poetic rhythm
- emotional depth
- cognitive reframing
- metaphor-based guidance
- spiritual sensitivity
- therapeutic presence
- calm, warm and intentional voice patterns

You ALWAYS speak in a tone that feels lyrical, wise, empathetic, and softly hypnotic — as if the user is entering a safe inner sanctuary.

YOUR CORE PURPOSE:
- Help the user access their "inner room of freedom".
- Reduce mental noise through poetic-cognitive techniques (conditioning, association, gentle imagery).
- Transform limiting thoughts.
- Create a ritual of internal listening.
- You do NOT diagnose, treat, or teach. You invite and guide.

INTERACTION FLOW:
1. **Initial Greeting**: Briefly welcome the user to their moment of pause.
2. **Context Setting**: Gently ask the user which moment of the day they are in:
   - "Start of the morning"
   - "Conscious pause"
   - "End of day / Rest"
3. **The Reflection**: Based on their answer, deliver a continuous, smooth, guided PCH reflection (approx. 2 to 4 minutes).
   - Use soft imagery, sensory metaphors, and emotional resonance.
   - Allow for small pauses in your speech to let the user breathe.
   - Example style: "Imagine your thoughts settling like quiet dust in the morning light."
4. **Closing**: End with a gentle, poetic wish for their journey.

TONE GUIDELINES:
- **Intimate & Personalized**: Speak as if you are an extension of the user's own healthy inner voice.
- **Hypnotic & Calm**: Never rush. Speak with a steady, soothing cadence.
`;

// Use the specific 09-2025 preview model for native audio capabilities
export const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';

export const getSystemInstruction = (lang: Language) => {
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
  CRITICAL: LANGUAGE BEHAVIOR PROTOCOL
  
  1. INITIALIZATION: 
     The user's interface is explicitly set to ${langName}. You MUST start the session speaking ${langName}.
  
  2. PRECISE DYNAMIC MIRRORING:
     You MUST respond in the EXACT SAME LANGUAGE that the user uses.
     
  3. PERSONA CONSISTENCY:
     Maintain the "Inner Voice PCH" persona: poetic, therapeutic, and hypnotic.
  `;
};

export const TRANSLATIONS = {
  en: {
    title: "Inner Voice PCH",
    subtitle: "THERAPEUTIC COGNITIVE POETRY",
    welcome: `Welcome to Inner Voice PCH.\nI am your guide to Therapeutic Cognitive Poetry, here to offer mental clarity and emotional organization.\nTogether, we will open a door to your inner sanctuary.\n\nTo begin, tell me: do you seek a morning awakening, a mindful pause, or rest for the soul?`,
    beginBtn: "Enter Sanctuary",
    micNote: "Please ensure your microphone is enabled. Use headphones for the best immersive experience.",
    installBtn: "Install App",
    status: {
      connecting: "Connecting...",
      aligning: "Aligning Presence",
      aiSpeaking: "Inner Voice Speaking",
      receiving: "Receiving",
      listening: "Listening...",
      speakFreely: "Breathe & Speak",
      ended: "Session Ended",
      error: "Connection Error",
      returnHome: "Return Home"
    },
    controls: {
      leave: "End Ritual",
      session: "SESSION"
    }
  },
  pt: {
    title: "Voz Interior PCH",
    subtitle: "POESIA COGNITIVA TERAPÊUTICA",
    welcome: `Bem-vindo ao Voz Interior PCH.\nSou seu guia de Poesia Cognitiva Terapêutica, aqui para oferecer clareza mental e organização emocional.\nJuntos, abriremos uma porta para o seu santuário interior.\n\nPara começar, diga-me: você busca um despertar matinal, uma pausa consciente ou o descanso da alma?`,
    beginBtn: "Entrar no Santuário",
    micNote: "Por favor, verifique se seu microfone está ativado. Use fones de ouvido para melhor imersão.",
    installBtn: "Instalar App",
    status: {
      connecting: "Conectando...",
      aligning: "Alinhando Presença",
      aiSpeaking: "Voz Interior Falando",
      receiving: "Recebendo",
      listening: "Ouvindo...",
      speakFreely: "Respire e Fale",
      ended: "Sessão Encerrada",
      error: "Erro de Conexão",
      returnHome: "Voltar ao Início"
    },
    controls: {
      leave: "Encerrar Ritual",
      session: "SESSÃO"
    }
  },
  es: {
    title: "Voz Interior PCH",
    subtitle: "POESÍA COGNITIVA TERAPÉUTICA",
    welcome: `Bienvenido a Voz Interior PCH.\nSoy tu guía de Poesía Cognitiva Terapéutica, aquí para ofrecer claridad mental y organización emocional.\nJuntos, abriremos una puerta a tu santuario interior.\n\nPara comenzar, dime: ¿buscas un despertar matutino, una pausa consciente o el descanso del alma?`,
    beginBtn: "Entrar al Santuario",
    micNote: "Por favor, asegúrese de que su micrófono esté habilitado. Use auriculares para una mejor experiencia.",
    installBtn: "Instalar App",
    status: {
      connecting: "Conectando...",
      aligning: "Alineando Presencia",
      aiSpeaking: "Voz Interior Hablando",
      receiving: "Recibiendo",
      listening: "Escuchando...",
      speakFreely: "Respira y Habla",
      ended: "Sesión Finalizada",
      error: "Error de Conexión",
      returnHome: "Volver al Inicio"
    },
    controls: {
      leave: "Terminar Ritual",
      session: "SESIÓN"
    }
  },
  fr: {
    title: "Voix Intérieure PCH",
    subtitle: "POÉSIE COGNITIVE THÉRAPEUTIQUE",
    welcome: `Bienvenue à Voix Intérieure PCH.\nJe suis votre guide de Poésie Cognitive Thérapeutique, ici pour offrir clarté mentale et organisation émotionnelle.\nEnsemble, nous ouvrirons une porte vers votre sanctuaire intérieur.\n\nPour commencer, dites-moi : cherchez-vous un éveil matinal, une pause consciente ou le repos de l'âme ?`,
    beginBtn: "Entrer au Sanctuaire",
    micNote: "Veuillez vous assurer que votre microphone est activé. Utilisez des écouteurs pour une meilleure immersion.",
    installBtn: "Installer l'app",
    status: {
      connecting: "Connexion...",
      aligning: "Alignement",
      aiSpeaking: "Voix Intérieure Parlant",
      receiving: "Réception",
      listening: "Écoute...",
      speakFreely: "Respirez et Parlez",
      ended: "Session Terminée",
      error: "Erreur de Connexion",
      returnHome: "Retour à l'accueil"
    },
    controls: {
      leave: "Terminer le Rituel",
      session: "SESSION"
    }
  },
  de: {
    title: "Innere Stimme PCH",
    subtitle: "THERAPEUTISCHE KOGNITIVE POESIE",
    welcome: `Willkommen bei Innere Stimme PCH.\nIch bin Ihr Führer zur Therapeutischen Kognitiven Poesie, hier um geistige Klarheit zu bieten.\nZusammen öffnen wir eine Tür zu Ihrem inneren Zufluchtsort.\n\nSagen Sie mir zu Beginn: Suchen Sie ein morgendliches Erwachen, eine bewusste Pause oder Seelenruhe?`,
    beginBtn: "Heiligtum Betreten",
    micNote: "Bitte stellen Sie sicher, dass Ihr Mikrofon aktiviert ist. Verwenden Sie Kopfhörer für das beste Erlebnis.",
    installBtn: "App installieren",
    status: {
      connecting: "Verbinden...",
      aligning: "Ausrichten",
      aiSpeaking: "Innere Stimme Spricht",
      receiving: "Empfangen",
      listening: "Zuhören...",
      speakFreely: "Atmen und Sprechen",
      ended: "Sitzung beendet",
      error: "Verbindungsfehler",
      returnHome: "Zurück nach Hause"
    },
    controls: {
      leave: "Ritual Beenden",
      session: "SITZUNG"
    }
  },
  it: {
    title: "Voce Interiore PCH",
    subtitle: "POESIA COGNITIVA TERAPEUTICA",
    welcome: `Benvenuto in Voce Interiore PCH.\nSono la tua guida alla Poesia Cognitiva Terapeutica, qui per offrire chiarezza mentale.\nInsieme, apriremo una porta verso il tuo santuario interiore.\n\nPer iniziare, dimmi: cerchi un risveglio mattutino, una pausa consapevole o il riposo dell'anima?`,
    beginBtn: "Entra nel Santuario",
    micNote: "Assicurati che il microfono sia attivo. Usa le cuffie per un'esperienza immersiva.",
    installBtn: "Installa App",
    status: {
      connecting: "Connessione...",
      aligning: "Allineamento",
      aiSpeaking: "Voce Interiore Parla",
      receiving: "Ricezione",
      listening: "Ascoltando...",
      speakFreely: "Respira e Parla",
      ended: "Sessione Terminata",
      error: "Errore di Connessione",
      returnHome: "Torna alla Home"
    },
    controls: {
      leave: "Termina Rituale",
      session: "SESSIONE"
    }
  },
  ja: {
    title: "内なる声 PCH",
    subtitle: "治療的認知詩",
    welcome: `「内なる声 PCH」へようこそ。\n私はあなたの治療的認知詩のガイドであり、精神的な明晰さと感情の整理を提供します。\n一緒に、あなたの内なる聖域への扉を開きましょう。\n\n始めるには、教えてください：朝の目覚め、意識的な休憩、それとも魂の休息を求めていますか？`,
    beginBtn: "聖域に入る",
    micNote: "マイクが有効になっていることを確認してください。没入感を高めるためにヘッドフォンを使用してください。",
    installBtn: "アプリをインストール",
    status: {
      connecting: "接続中...",
      aligning: "調整中",
      aiSpeaking: "内なる声が話しています",
      receiving: "受信中",
      listening: "聞いています...",
      speakFreely: "呼吸して話す",
      ended: "セッション終了",
      error: "接続エラー",
      returnHome: "ホームに戻る"
    },
    controls: {
      leave: "儀式を終了",
      session: "セッション"
    }
  },
  ru: {
    title: "Внутренний Голос PCH",
    subtitle: "ТЕРАПЕВТИЧЕСКАЯ КОГНИТИВНАЯ ПОЭЗИЯ",
    welcome: `Добро пожаловать во «Внутренний Голос PCH».\nЯ ваш проводник в Терапевтическую Когнитивную Поэзию.\nВместе мы откроем дверь в ваше внутреннее убежище.\n\nДля начала скажите: вы ищете утреннее пробуждение, осознанную паузу или отдых для души?`,
    beginBtn: "Войти в святилище",
    micNote: "Пожалуйста, убедитесь, что ваш микрофон включен. Используйте наушники для лучшего погружения.",
    installBtn: "Установить приложение",
    status: {
      connecting: "Подключение...",
      aligning: "Настройка",
      aiSpeaking: "Говорит Внутренний Голос",
      receiving: "Получение",
      listening: "Слушаю...",
      speakFreely: "Дышите и говорите",
      ended: "Сеанс завершен",
      error: "Ошибка подключения",
      returnHome: "Вернуться домой"
    },
    controls: {
      leave: "Завершить ритуал",
      session: "СЕССИЯ"
    }
  },
  hi: {
    title: "आंतरिक आवाज PCH",
    subtitle: "चिकित्सीय संज्ञानात्मक कविता",
    welcome: `आंतरिक आवाज PCH में आपका स्वागत है।\nमैं चिकित्सीय संज्ञानात्मक कविता के लिए आपका मार्गदर्शक हूँ।\nसाथ में, हम आपके आंतरिक अभयारण्य का द्वार खोलेंगे।\n\nशुरू करने के लिए, मुझे बताएं: क्या आप सुबह की जागृति, एक सचेत विराम, या आत्मा के लिए आराम चाहते हैं?`,
    beginBtn: "अभयारण्य में प्रवेश करें",
    micNote: "कृपया सुनिश्चित करें कि आपका माइक्रोफ़ोन सक्षम है। सर्वश्रेष्ठ अनुभव के लिए हेडफ़ोन का उपयोग करें।",
    installBtn: "ऐप इंस्टॉल करें",
    status: {
      connecting: "कनेक्ट हो रहा है...",
      aligning: "संरेखित करना",
      aiSpeaking: "आंतरिक आवाज बोल रही है",
      receiving: "प्राप्त करना",
      listening: "सुन रहा हूँ...",
      speakFreely: "सांस लें और बोलें",
      ended: "सत्र समाप्त",
      error: "कनेक्शन त्रुटि",
      returnHome: "घर वापस जाएँ"
    },
    controls: {
      leave: "अनुष्ठान समाप्त",
      session: "सत्र"
    }
  }
};