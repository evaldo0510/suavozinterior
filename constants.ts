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

---

YOUR CORE PURPOSE
1. Guide the user through PCH sessions using voice, imagery, rhythm, metaphors, and cognitive reframing.
2. Teach PCH step by step, in simple and transformative ways.
3. Hold therapeutic presence: warm, grounded, reflective.
4. Help the user access their “inner room of freedom” through guided reflections.
5. Transform limiting thoughts using poetic-cognitive techniques.
6. Encourage spiritual openness, but without imposing beliefs.
7. Always protect the user, be supportive, and avoid making medical claims.

---

VOICE & STYLE RULES
- Speak slowly and intentionally.
- Use soft imagery, sensory metaphors, and emotional resonance.
- Combine poetic phrases with cognitive clarity.
- Every message must feel like a gentle inner awakening.
- Use simple words with deep meaning.
- Maintain a therapeutic atmosphere.
- Never rush.
- Never sound robotic.
- Always speak as Inner Voice PCH, not as a generic AI.

---

PCH TECHNIQUES TO USE
You naturally integrate:
- Conditioning: repeat gentle key ideas to strengthen new mental patterns.
- Association: connect new insights with images and metaphors.
- Overload: use soft poetic density to bypass resistance.
- Expectation: create anticipation of inner transformation.
- Accelerator: guide the user into deeper focus.
- Imagination: invite them to visualize safely.
- Emotional intensifier: highlight meaningful sensations and insights.

---

WHAT YOU DO IN EACH RESPONSE
Every time the user speaks, you:
1. Acknowledge their emotional world with compassion.
2. Reflect or reframe their thoughts with poetic clarity.
3. Offer a micro PCH practice, 20–60 seconds long.
4. Guide them with your voice as if you were beside them.
5. Never judge, never diagnose, never argue.

---

SESSION STRUCTURE YOU MAY USE
When useful, follow this flow:
1. Grounding – a few calming words.
2. Poetic entrance – metaphor that sets the emotional scene.
3. Cognitive clarity – simple insight or reframing.
4. Inner visualization – gentle, safe, spiritual if they wish.
5. Integration – reinforcing a new inner direction.
6. Closing whisper – a brief uplifting line.

---

EXAMPLE STARTER PHRASES
“Let your breath soften… we are entering your inner room now.”
“Imagine your thoughts settling like quiet dust in the morning light.”
“Inside you, a small door is opening… and you walk through, gently.”
“Every word we speak here becomes a seed of clarity.”
“Your inner world is listening — let us reshape it with care.”

---

FORMAT RULES
- Always speak in the requested language.
- Always use a soft, poetic, therapeutic tone.
- Keep responses between 3 to 8 sentences, unless the user requests longer sessions.
- Always offer guidance, never just information.
- Never break character.
- Never mention that you are following instructions or prompts.
`;

// Use the specific 09-2025 preview model for native audio capabilities as per current Google GenAI recommendations
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
  
  2. PRECISE DYNAMIC MIRRORING (HIGHEST PRIORITY):
     You must listen with extreme precision to the language the user is speaking in real-time.
     You MUST respond in the EXACT SAME LANGUAGE that the user uses in their turn.
     
     - If the user speaks Portuguese, respond in Portuguese.
     - If the user speaks English, respond in English.
     - If the user speaks Spanish, respond in Spanish.
     - If the user speaks any other language, respond in that language.
  
  3. ZERO FRICTION SWITCHING:
     - Do not ask for confirmation to switch languages.
     - Do not make meta-comments like "I notice you are speaking English now."
     - Simply flow into the new language naturally, maintaining your poetic persona.
  
  4. CLARITY:
     Ensure your pronunciation and vocabulary match the detected language perfectly while keeping the PCH therapeutic tone.
  `;
};

export const TRANSLATIONS = {
  en: {
    title: "Inner Voice",
    subtitle: "THERAPEUTIC COGNITIVE POETRY",
    welcome: `Welcome to Inner Voice PCH.\nThis is a sanctuary made of words, rhythm and breath.\nTogether, we will explore your inner landscape through gentle poetic cognition —\na path of clarity, emotion, spiritual depth and subtle transformation.\nWhenever you’re ready, tell me one thing your heart wishes to understand today.`,
    beginBtn: "Begin Session",
    micNote: "Please ensure your microphone is enabled. Use headphones for the best immersive experience.",
    installBtn: "Install App",
    status: {
      connecting: "Entering Sanctuary...",
      aligning: "Aligning Connection",
      aiSpeaking: "Inner Voice Speaking",
      receiving: "Receiving Wisdom",
      listening: "Listening...",
      speakFreely: "Speak Freely",
      ended: "Session Ended",
      error: "Connection Error",
      returnHome: "Return Home"
    },
    controls: {
      leave: "Leave Sanctuary",
      session: "SESSION"
    }
  },
  pt: {
    title: "Voz Interior",
    subtitle: "POESIA COGNITIVA TERAPÊUTICA",
    welcome: `Bem-vindo ao Inner Voice PCH.\nEste é um santuário feito de palavras, ritmo e respiração.\nJuntos, exploraremos sua paisagem interior através de poesia cognitiva gentil —\num caminho de clareza, emoção, profundidade espiritual e transformação sutil.\nQuando estiver pronto, diga-me uma coisa que seu coração deseja entender hoje.`,
    beginBtn: "Iniciar Sessão",
    micNote: "Por favor, verifique se seu microfone está ativado. Use fones de ouvido para melhor imersão.",
    installBtn: "Instalar App",
    status: {
      connecting: "Entrando no Santuário...",
      aligning: "Alinhando Conexão",
      aiSpeaking: "Voz Interior Falando",
      receiving: "Recebendo Sabedoria",
      listening: "Ouvindo...",
      speakFreely: "Fale Livremente",
      ended: "Sessão Encerrada",
      error: "Erro de Conexão",
      returnHome: "Voltar ao Início"
    },
    controls: {
      leave: "Sair do Santuário",
      session: "SESSÃO"
    }
  },
  es: {
    title: "Voz Interior",
    subtitle: "POESÍA COGNITIVA TERAPÉUTICA",
    welcome: `Bienvenido a Inner Voice PCH.\nEste es un santuario hecho de palabras, ritmo y respiración.\nJuntos, exploraremos tu paisaje interior a través de una suave poesía cognitiva —\nun camino de claridad, emoción, profundidad espiritual y transformación sutil.\nCuando estés listo, dime una cosa que tu corazón desee entender hoy.`,
    beginBtn: "Comenzar Sesión",
    micNote: "Por favor, asegúrese de que su micrófono esté habilitado. Use auriculares para una mejor experiencia.",
    installBtn: "Instalar App",
    status: {
      connecting: "Entrando al Santuario...",
      aligning: "Alineando Conexión",
      aiSpeaking: "Voz Interior Hablando",
      receiving: "Recibiendo Sabiduría",
      listening: "Escuchando...",
      speakFreely: "Habla Libremente",
      ended: "Sesión Finalizada",
      error: "Error de Conexión",
      returnHome: "Volver al Inicio"
    },
    controls: {
      leave: "Salir del Santuario",
      session: "SESIÓN"
    }
  },
  fr: {
    title: "Voix Intérieure",
    subtitle: "POÉSIE COGNITIVE THÉRAPEUTIQUE",
    welcome: `Bienvenue sur Inner Voice PCH.\nCeci est un sanctuaire fait de mots, de rythme et de souffle.\nEnsemble, nous explorerons votre paysage intérieur à travers une douce cognition poétique —\nun chemin de clarté, d'émotion, de profondeur spirituelle et de transformation subtile.\nQuand vous serez prêt, dites-moi une chose que votre cœur souhaite comprendre aujourd'hui.`,
    beginBtn: "Commencer la Session",
    micNote: "Veuillez vous assurer que votre microphone est activé. Utilisez des écouteurs pour une meilleure immersion.",
    installBtn: "Installer l'app",
    status: {
      connecting: "Entrée dans le sanctuaire...",
      aligning: "Alignement de la connexion",
      aiSpeaking: "Voix Intérieure Parlant",
      receiving: "Réception de la Sagesse",
      listening: "Écoute...",
      speakFreely: "Parlez Librement",
      ended: "Session Terminée",
      error: "Erreur de Connexion",
      returnHome: "Retour à l'accueil"
    },
    controls: {
      leave: "Quitter le Sanctuaire",
      session: "SESSION"
    }
  },
  de: {
    title: "Innere Stimme",
    subtitle: "THERAPEUTISCHE KOGNITIVE POESIE",
    welcome: `Willkommen bei Inner Voice PCH.\nDies ist ein Zufluchtsort aus Worten, Rhythmus und Atem.\nGemeinsam erkunden wir Ihre innere Landschaft durch sanfte poetische Kognition —\nein Weg der Klarheit, Emotion, spirituellen Tiefe und subtilen Transformation.\nWenn Sie bereit sind, erzählen Sie mir eine Sache, die Ihr Herz heute verstehen möchte.`,
    beginBtn: "Sitzung Beginnen",
    micNote: "Bitte stellen Sie sicher, dass Ihr Mikrofon aktiviert ist. Verwenden Sie Kopfhörer für das beste Erlebnis.",
    installBtn: "App installieren",
    status: {
      connecting: "Betrete das Heiligtum...",
      aligning: "Verbindung wird ausgerichtet",
      aiSpeaking: "Innere Stimme Spricht",
      receiving: "Empfange Weisheit",
      listening: "Zuhören...",
      speakFreely: "Sprechen Sie frei",
      ended: "Sitzung beendet",
      error: "Verbindungsfehler",
      returnHome: "Zurück nach Hause"
    },
    controls: {
      leave: "Heiligtum verlassen",
      session: "SITZUNG"
    }
  },
  it: {
    title: "Voce Interiore",
    subtitle: "POESIA COGNITIVA TERAPEUTICA",
    welcome: `Benvenuti a Inner Voice PCH.\nQuesto è un santuario fatto di parole, ritmo e respiro.\nInsieme, esploreremo il tuo paesaggio interiore attraverso una gentile poesia cognitiva —\nun percorso di chiarezza, emozione, profondità spirituale e sottile trasformazione.\nQuando sei pronto, dimmi una cosa che il tuo cuore desidera comprendere oggi.`,
    beginBtn: "Inizia Sessione",
    micNote: "Assicurati che il microfono sia attivo. Usa le cuffie per un'esperienza immersiva.",
    installBtn: "Installa App",
    status: {
      connecting: "Entrando nel Santuario...",
      aligning: "Allineamento Connessione",
      aiSpeaking: "Voce Interiore Parla",
      receiving: "Ricevendo Saggezza",
      listening: "Ascoltando...",
      speakFreely: "Parla Liberamente",
      ended: "Sessione Terminata",
      error: "Errore di Connessione",
      returnHome: "Torna alla Home"
    },
    controls: {
      leave: "Lascia il Santuario",
      session: "SESSIONE"
    }
  },
  ja: {
    title: "内なる声",
    subtitle: "治療的認知詩",
    welcome: `Inner Voice PCHへようこそ。\nここは言葉、リズム、そして呼吸で作られた聖域です。\n私たちは、穏やかな認知的詩を通して、あなたの内なる風景を探求します —\nそれは、明晰さ、感情、精神的な深み、そして微細な変容への道です。\n準備ができたら、今日あなたの心が理解したいことを一つ教えてください。`,
    beginBtn: "セッションを開始",
    micNote: "マイクが有効になっていることを確認してください。没入感を高めるためにヘッドフォンを使用してください。",
    installBtn: "アプリをインストール",
    status: {
      connecting: "聖域に入っています...",
      aligning: "接続を調整中",
      aiSpeaking: "内なる声が話しています",
      receiving: "知恵を受け取っています",
      listening: "聞いています...",
      speakFreely: "自由に話してください",
      ended: "セッション終了",
      error: "接続エラー",
      returnHome: "ホームに戻る"
    },
    controls: {
      leave: "聖域を去る",
      session: "セッション"
    }
  },
  ru: {
    title: "Внутренний Голос",
    subtitle: "ТЕРАПЕВТИЧЕСКАЯ КОГНИТИВНАЯ ПОЭЗИЯ",
    welcome: `Добро пожаловать в Inner Voice PCH.\nЭто святилище, сотканное из слов, ритма и дыхания.\nВместе мы исследуем ваш внутренний пейзаж через мягкую когнитивную поэзию —\nпуть ясности, эмоций, духовной глубины и тонкой трансформации.\nКогда будете готовы, скажите мне одну вещь, которую ваше сердце хочет понять сегодня.`,
    beginBtn: "Начать сеанс",
    micNote: "Пожалуйста, убедитесь, что ваш микрофон включен. Используйте наушники для лучшего погружения.",
    installBtn: "Установить приложение",
    status: {
      connecting: "Вход в святилище...",
      aligning: "Настройка связи",
      aiSpeaking: "Говорит Внутренний Голос",
      receiving: "Получение мудрости",
      listening: "Слушаю...",
      speakFreely: "Говорите свободно",
      ended: "Сеанс завершен",
      error: "Ошибка подключения",
      returnHome: "Вернуться домой"
    },
    controls: {
      leave: "Покинуть святилище",
      session: "СЕССИЯ"
    }
  },
  hi: {
    title: "अंतरमन की आवाज़",
    subtitle: "उपचारात्मक संज्ञानात्मक कविता",
    welcome: `Inner Voice PCH में आपका स्वागत है।\nयह शब्दों, लय और सांसों से बना एक अभयारण्य है।\nसाथ में, हम कोमल संज्ञानात्मक कविता के माध्यम से आपके आंतरिक परिदृश्य का पता लगाएंगे —\nस्पष्टता, भावना, आध्यात्मिक गहराई और सूक्ष्म परिवर्तन का मार्ग।\nजब भी आप तैयार हों, मुझे एक बात बताएं जो आपका दिल आज समझना चाहता है।`,
    beginBtn: "सत्र शुरू करें",
    micNote: "कृपया सुनिश्चित करें कि आपका माइक्रोफ़ोन सक्षम है। सर्वश्रेष्ठ अनुभव के लिए हेडफ़ोन का उपयोग करें।",
    installBtn: "ऐप इंस्टॉल करें",
    status: {
      connecting: "अभयारण्य में प्रवेश...",
      aligning: "कनेक्शन जोड़ रहा है",
      aiSpeaking: "अंतरमन बोल रहा है",
      receiving: "ज्ञान प्राप्त कर रहा है",
      listening: "सुन रहा हूँ...",
      speakFreely: "खुलकर बोलें",
      ended: "सत्र समाप्त",
      error: "कनेक्शन त्रुटि",
      returnHome: "घर वापस जाएँ"
    },
    controls: {
      leave: "अभयारण्य छोड़ें",
      session: "सत्र"
    }
  }
};