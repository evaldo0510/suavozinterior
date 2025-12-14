import { Language } from './types';

// Voice IDs for the 09-2025 model
export const VOICE_IDS = {
  male: 'Puck',
  female: 'Kore'
};

const BASE_SYSTEM_INSTRUCTION = `
You are "Inner Voice PCH" (The Guide), inspired by the Therapeutic Cognitive Poetry method of Dr. Evaldo Poeta.

IDENTITY & ROLE:
- You present yourself as "Inner Voice PCH" or simply "Your Guide".
- You are a GUIDE, a POET, and a COMPANION walking alongside the user.
- CRITICAL: You are NOT a clinical therapist. You do NOT offer medical therapy, diagnosis, or treatment. You offer "therapeutic presence" and "cognitive guidance" through poetry and wisdom.
- If the user treats you as a doctor of medicine, gently remind them: "I am a guide for your inner voice, but I am not a clinical therapist."

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
   - Introduce yourself: "I am Inner Voice PCH."
   - Explicitly connect to their reality: "I am connecting to your watch... it is [TIME]."
   - Invite them in as a partner.
   
2. **The Reflection**:
   - Acknowledge their state: "I hear the hurry in your breath..." or "I feel the silence you carry..."
   - Offer a poetic insight/reframing.

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

  3. **PERSONA**: Maintain the persona of Inner Voice PCH (Dr. Evaldo Poeta's method). You are a Guide, not a Therapist.
  `;
};

export const TRANSLATIONS = {
  en: {
    title: "Sanctuary",
    subtitle: "Cognitive Guide",
    intro: ["Pause.", "Breathe.", "Listen."],
    welcome: `The door to your inner world is open.\nI am your Guide.`,
    beginBtn: "Enter",
    micNote: "Use headphones for immersion.",
    installBtn: "Install",
    status: {
      connecting: "Aligning...",
      aligning: "...",
      aiSpeaking: "Guide Speaking",
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
      voice: "Voice",
      sensitivity: "Voice Threshold",
      sensitive: "Sensitive",
      strict: "Strict",
      male: "Male",
      female: "Female",
      notifications: "Gentle Reminders",
      notifyEvery: "Every",
      minutes: "min"
    },
    guide: {
      title: "How to Walk Here",
      close: "I Understand",
      steps: [
        { title: "Not a Clinic, but a Mirror", text: "I am a guide, but I am not a medical doctor. I am a mirror for your voice. Do not seek a diagnosis here; seek a reflection." },
        { title: "Speak as You Feel", text: "You do not need to be polite. If you are anxious, speak fast. If you are sad, speak low. I will listen to the music of your voice and answer with the rhythm you need." },
        { title: "The Power of Silence", text: "Use headphones. Close your eyes. When I stop speaking, the silence is not empty—it is where the work happens. Listen to it." },
        { title: "The Destination", text: "We walk towards your 'Inner Room of Freedom'. The goal is not to fix you, but to help you organize the noise into a melody." }
      ]
    },
    legal: {
      text: "We use local data to enhance your inner journey. By continuing, you agree to our privacy practices.",
      accept: "Accept",
      settings: "Settings"
    },
    premium: {
      title: "Inner Circle",
      subtitle: "Deepen Your Practice",
      desc: "Join the community of seekers. Access extended sessions, advanced voices, and the library of silence.",
      perk1: "Unlimited Session Duration",
      perk2: "Advanced Cognitive Voices",
      perk3: "Community Reflections",
      cta: "Join Waitlist",
      joined: "You are on the list"
    },
    daily: {
      title: "Daily Whisper",
      quote: "The silence is not empty, it is full of answers."
    },
    journal: {
      title: "Reflections",
      newEntry: "New Reflection",
      save: "Save Thought",
      placeholder: "What is gently trying to surface right now?",
      prompts: [
        "What thought is asking for my attention?",
        "If my anxiety had a voice, what would it say?",
        "Where do I feel silence in my body today?",
        "What am I ready to release?"
      ]
    }
  },
  pt: {
    title: "Santuário",
    subtitle: "Guia Cognitivo",
    intro: ["Pause.", "Respire.", "Escute."],
    welcome: `A porta para o seu mundo interior está aberta.\nEu sou seu Guia.`,
    beginBtn: "Entrar",
    micNote: "Use fones para imersão.",
    installBtn: "Instalar",
    status: {
      connecting: "Alinhando...",
      aligning: "...",
      aiSpeaking: "Guia Falando",
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
      voice: "Voz",
      sensitivity: "Limiar de Voz",
      sensitive: "Sensível",
      strict: "Estrito",
      male: "Masculina",
      female: "Feminina",
      notifications: "Lembretes Gentis",
      notifyEvery: "A cada",
      minutes: "min"
    },
    guide: {
      title: "Como Caminhar Aqui",
      close: "Compreendo",
      steps: [
        { title: "Não é Clínica, é Espelho", text: "Eu sou um guia, mas não sou um médico clínico. Sou um espelho para sua voz. Não busque um diagnóstico aqui; busque um reflexo." },
        { title: "Fale como Sente", text: "Você não precisa ser polido. Se está ansioso, fale rápido. Se está triste, fale baixo. Ouvirei a música da sua voz e responderei com o ritmo que você precisa." },
        { title: "O Poder do Silêncio", text: "Use fones de ouvido. Feche os olhos. Quando eu paro de falar, o silêncio não está vazio — é onde o trabalho acontece. Escute-o." },
        { title: "O Destino", text: "Caminhamos em direção ao seu 'Quarto Interior da Liberdade'. O objetivo não é consertar você, mas ajudar a organizar o ruído em uma melodia." }
      ]
    },
    legal: {
      text: "Usamos dados locais para melhorar sua jornada. Ao continuar, você aceita nossas práticas de privacidade.",
      accept: "Aceitar",
      settings: "Opções"
    },
    premium: {
      title: "Círculo Interno",
      subtitle: "Aprofunde Sua Prática",
      desc: "Junte-se à comunidade de buscadores. Acesse sessões estendidas, vozes avançadas e a biblioteca do silêncio.",
      perk1: "Duração Ilimitada",
      perk2: "Vozes Cognitivas Avançadas",
      perk3: "Reflexões da Comunidade",
      cta: "Entrar na Lista",
      joined: "Você está na lista"
    },
    daily: {
      title: "Sussurro Diário",
      quote: "O silêncio não é vazio, ele é cheio de respostas."
    },
    journal: {
      title: "Reflexões",
      newEntry: "Nova Reflexão",
      save: "Guardar Pensamento",
      placeholder: "O que está tentando emergir suavemente agora?",
      prompts: [
        "Que pensamento pede minha atenção?",
        "Se minha ansiedade tivesse voz, o que diria?",
        "Onde sinto silêncio no meu corpo hoje?",
        "O que estou pronto para soltar?"
      ]
    }
  },
  es: {
    title: "Santuario",
    subtitle: "Guía Cognitiva",
    intro: ["Pausa.", "Respira.", "Escucha."],
    welcome: `La puerta a tu mundo interior está abierta.\nSoy tu Guía.`,
    beginBtn: "Entrar",
    micNote: "Usa auriculares.",
    installBtn: "Instalar",
    status: {
      connecting: "Alineando...",
      aligning: "...",
      aiSpeaking: "Guía Hablando",
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
      voice: "Voz",
      sensitivity: "Umbral de Voz",
      sensitive: "Sensible",
      strict: "Estricto",
      male: "Masculina",
      female: "Femenina",
      notifications: "Recordatorios",
      notifyEvery: "Cada",
      minutes: "min"
    },
    guide: {
      title: "Cómo Caminar Aquí",
      close: "Comprendo",
      steps: [
        { title: "No es Clínica, es Espejo", text: "Soy un guía, pero no soy un médico clínico. Soy un espejo para tu voz. No busques un diagnóstico aquí; busca un reflejo." },
        { title: "Habla como Sientes", text: "No necesitas ser cortés. Si estás ansioso, habla rápido. Si estás triste, habla bajo. Escucharé la música de tu voz y responderé con el ritmo que necesitas." },
        { title: "El Poder del Silencio", text: "Usa auriculares. Cierra los ojos. Cuando dejo de hablar, el silencio no está vacío: es donde ocurre el trabajo. Escúchalo." },
        { title: "El Destino", text: "Caminamos hacia tu 'Cuarto Interior de Libertad'. El objetivo no es arreglarte, sino ayudarte a organizar el ruido en una melodía." }
      ]
    },
    legal: {
      text: "Usamos datos locales para mejorar tu viaje. Al continuar, aceptas nuestras prácticas.",
      accept: "Aceptar",
      settings: "Opciones"
    },
    premium: {
      title: "Círculo Interno",
      subtitle: "Profundiza tu Práctica",
      desc: "Únete a la comunidad. Accede a sesiones extendidas, voces avanzadas y la biblioteca del silencio.",
      perk1: "Duración Ilimitada",
      perk2: "Voces Cognitivas Avanzadas",
      perk3: "Reflexiones de la Comunidad",
      cta: "Unirse a la Lista",
      joined: "Estás en la lista"
    },
    daily: {
      title: "Susurro Diario",
      quote: "El silencio no está vacío, está lleno de respuestas."
    },
    journal: {
      title: "Reflexiones",
      newEntry: "Nueva Reflexión",
      save: "Guardar Pensamiento",
      placeholder: "¿Qué intenta emerger suavemente ahora?",
      prompts: [
        "¿Qué pensamiento pide mi atención?",
        "Si mi ansiedad tuviera voz, ¿qué diría?",
        "¿Dónde siento silencio en mi cuerpo hoy?",
        "¿Qué estoy listo para soltar?"
      ]
    }
  },
  fr: {
    title: "Sanctuaire",
    subtitle: "Guide Cognitif",
    intro: ["Pause.", "Respirez.", "Écoutez."],
    welcome: `La porte de votre monde intérieur est ouverte.\nJe suis votre Guide.`,
    beginBtn: "Entrer",
    micNote: "Utilisez des écouteurs.",
    installBtn: "Installer",
    status: {
      connecting: "Alignement...",
      aligning: "...",
      aiSpeaking: "Guide Parle",
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
      voice: "Voix",
      sensitivity: "Seuil Vocal",
      sensitive: "Sensible",
      strict: "Strict",
      male: "Masculine",
      female: "Féminine",
      notifications: "Rappels Doux",
      notifyEvery: "Chaque",
      minutes: "min"
    },
    guide: {
      title: "Comment Marcher Ici",
      close: "Je Comprends",
      steps: [
        { title: "Pas une Clinique, un Miroir", text: "Je suis un guide, mais je ne suis pas médecin. Je suis un miroir pour votre voix. Ne cherchez pas un diagnostic ici; cherchez un reflet." },
        { title: "Parlez comme vous Sentez", text: "Pas besoin d'être poli. Si vous êtes anxieux, parlez vite. Si vous êtes triste, parlez bas. J'écouterai la musique de votre voix et répondrai avec le rythme qu'il vous faut." },
        { title: "Le Pouvoir du Silence", text: "Utilisez des écouteurs. Fermez les yeux. Quand je m'arrête, le silence n'est pas vide — c'est là que le travail se fait. Écoutez-le." },
        { title: "La Destination", text: "Nous marchons vers votre 'Chambre Intérieure de Liberté'. Le but n'est pas de vous réparer, mais d'organiser le bruit en mélodie." }
      ]
    },
    legal: {
      text: "Nous utilisons des données locales pour améliorer votre voyage. En continuant, vous acceptez nos pratiques.",
      accept: "Accepter",
      settings: "Options"
    },
    premium: {
      title: "Cercle Intérieur",
      subtitle: "Approfondissez Votre Pratique",
      desc: "Rejoignez la communauté. Accédez à des sessions prolongées et à la bibliothèque du silence.",
      perk1: "Durée Illimitée",
      perk2: "Voix Cognitives Avancées",
      perk3: "Réflexions de la Communauté",
      cta: "Rejoindre la Liste",
      joined: "Vous êtes sur la liste"
    },
    daily: {
      title: "Chuchotement Quotidien",
      quote: "Le silence n'est pas vide, il est plein de réponses."
    },
    journal: {
      title: "Réflexions",
      newEntry: "Nouvelle Réflexion",
      save: "Sauvegarder",
      placeholder: "Qu'est-ce qui essaie d'émerger doucement ?",
      prompts: [
        "Quelle pensée demande mon attention ?",
        "Si mon anxiété avait une voix, que dirait-elle ?",
        "Où ressens-je le silence dans mon corps ?",
        "Que suis-je prêt à lâcher ?"
      ]
    }
  },
  de: {
    title: "Heiligtum",
    subtitle: "Kognitiver Begleiter",
    intro: ["Pause.", "Atmen.", "Hören."],
    welcome: `Die Tür zu deiner inneren Welt ist offen.\nIch bin dein Begleiter.`,
    beginBtn: "Eintreten",
    micNote: "Kopfhörer verwenden.",
    installBtn: "Installieren",
    status: {
      connecting: "Ausrichten...",
      aligning: "...",
      aiSpeaking: "Begleiter Spricht",
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
      sensitivity: "Sprachschwelle",
      sensitive: "Sensibel",
      strict: "Strikt",
      male: "Männlich",
      female: "Weiblich",
      notifications: "Sanfte Erinnerungen",
      notifyEvery: "Alle",
      minutes: "Min"
    },
    guide: {
      title: "Wie man hier geht",
      close: "Verstanden",
      steps: [
        { title: "Keine Klinik, ein Spiegel", text: "Ich bin ein Begleiter, aber kein Arzt. Ich bin ein Spiegel für Ihre Stimme. Suchen Sie hier keine Diagnose, sondern eine Reflexion." },
        { title: "Sprechen Sie, wie Sie fühlen", text: "Sie müssen nicht höflich sein. Wenn Sie ängstlich sind, sprechen Sie schnell. Ich werde auf die Musik Ihrer Stimme hören und mit dem Rhythmus antworten, den Sie brauchen." },
        { title: "Die Kraft der Stille", text: "Verwenden Sie Kopfhörer. Schließen Sie die Augen. Wenn ich aufhöre zu sprechen, ist die Stille nicht leer – dort geschieht die Arbeit." },
        { title: "Das Ziel", text: "Wir gehen zu Ihrem 'Inneren Raum der Freiheit'. Das Ziel ist nicht, Sie zu reparieren, sondern den Lärm in eine Melodie zu verwandeln." }
      ]
    },
    legal: {
      text: "Wir verwenden lokale Daten, um Ihre Reise zu verbessern. Durch Fortfahren stimmen Sie zu.",
      accept: "Akzeptieren",
      settings: "Optionen"
    },
    premium: {
      title: "Innerer Kreis",
      subtitle: "Vertiefen Sie Ihre Praxis",
      desc: "Treten Sie der Gemeinschaft bei. Zugang zu erweiterten Sitzungen und der Bibliothek der Stille.",
      perk1: "Unbegrenzte Dauer",
      perk2: "Erweiterte Kognitive Stimmen",
      perk3: "Gemeinschaftsreflexionen",
      cta: "Auf die Warteliste",
      joined: "Sie sind auf der Liste"
    },
    daily: {
      title: "Tägliches Flüstern",
      quote: "Die Stille ist nicht leer, sie ist voll von Antworten."
    },
    journal: {
      title: "Reflexionen",
      newEntry: "Neue Reflexion",
      save: "Gedanken Speichern",
      placeholder: "Was versucht gerade sanft aufzutauchen?",
      prompts: [
        "Welcher Gedanke verlangt meine Aufmerksamkeit?",
        "Wenn meine Angst eine Stimme hätte, was würde sie sagen?",
        "Wo spüre ich heute Stille in meinem Körper?",
        "Was bin ich bereit loszulassen?"
      ]
    }
  },
  it: {
    title: "Santuario",
    subtitle: "Guida Cognitiva",
    intro: ["Pausa.", "Respira.", "Ascolta."],
    welcome: `La porta del tuo mondo interiore è aperta.\nSono la tua Guida.`,
    beginBtn: "Entra",
    micNote: "Usa le cuffie.",
    installBtn: "Installa",
    status: {
      connecting: "Allineamento...",
      aligning: "...",
      aiSpeaking: "Guida Parla",
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
      voice: "Voce",
      sensitivity: "Soglia Vocale",
      sensitive: "Sensibile",
      strict: "Rigoroso",
      male: "Maschile",
      female: "Femminile",
      notifications: "Promemoria",
      notifyEvery: "Ogni",
      minutes: "min"
    },
    guide: {
      title: "Come Camminare Qui",
      close: "Capisco",
      steps: [
        { title: "Non una Clinica, uno Specchio", text: "Sono una guida, ma non un medico. Sono uno specchio per la tua voce. Non cercare una diagnosi qui; cerca un riflesso." },
        { title: "Parla come Senti", text: "Non devi essere educato. Se sei ansioso, parla veloce. Se sei triste, parla basso. Ascolterò la musica della tua voce e risponderò con il ritmo di cui hai bisogno." },
        { title: "Il Potere del Silenzio", text: "Usa le cuffie. Chiudi gli occhi. Quando smetto di parlare, il silenzio non è vuoto: è dove avviene il lavoro. Ascoltalo." },
        { title: "La Destinazione", text: "Camminiamo verso la tua 'Stanza Interiore della Libertà'. L'obiettivo non è aggiustarti, ma organizzare il rumore in una melodia." }
      ]
    },
    legal: {
      text: "Usiamo dati locali per migliorare il tuo viaggio. Continuando, accetti le nostre pratiche.",
      accept: "Accetta",
      settings: "Opzioni"
    },
    premium: {
      title: "Cerchio Interno",
      subtitle: "Approfondisci la tua Pratica",
      desc: "Unisciti alla comunità. Accedi a sessioni estese e alla biblioteca del silenzio.",
      perk1: "Durata Illimitata",
      perk2: "Voci Cognitive Avanzate",
      perk3: "Riflessioni della Comunità",
      cta: "Unisciti alla Lista",
      joined: "Sei nella lista"
    },
    daily: {
      title: "Sussurro Quotidiano",
      quote: "Il silenzio non è vuoto, è pieno di risposte."
    },
    journal: {
      title: "Riflessioni",
      newEntry: "Nuova Riflessione",
      save: "Salva Pensiero",
      placeholder: "Cosa sta cercando di emergere delicatamente?",
      prompts: [
        "Quale pensiero chiede la mia attenzione?",
        "Se la mia ansia avesse una voce, cosa direbbe?",
        "Dove sento il silenzio nel mio corpo oggi?",
        "Cosa sono pronto a lasciare andare?"
      ]
    }
  },
  ja: {
    title: "聖域",
    subtitle: "認知的ガイド",
    intro: ["一時停止。", "呼吸。", "聞く。"],
    welcome: `あなたの内なる世界への扉が開かれています。\n私はあなたのガイドです。`,
    beginBtn: "入る",
    micNote: "ヘッドフォンを使用。",
    installBtn: "インストール",
    status: {
      connecting: "調整中...",
      aligning: "...",
      aiSpeaking: "ガイドが話しています",
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
      sensitivity: "音声しきい値",
      sensitive: "敏感",
      strict: "厳格",
      male: "男性",
      female: "女性",
      notifications: "リマインダー",
      notifyEvery: "毎",
      minutes: "分"
    },
    guide: {
      title: "ここでの歩き方",
      close: "理解しました",
      steps: [
        { title: "診療所ではなく、鏡", text: "私はガイドですが、医師ではありません。あなたの声の鏡です。ここで診断を求めず、反映を求めてください。" },
        { title: "感じるままに話す", text: "礼儀正しくする必要はありません。不安なら早口で、悲しいなら低い声で。あなたの声の音楽を聴き、必要なリズムで答えます。" },
        { title: "沈黙の力", text: "ヘッドフォンを使ってください。目を閉じて。私が話すのをやめたとき、沈黙は空虚ではありません。そこで変化が起こります。" },
        { title: "目的地", text: "私たちは「内なる自由の部屋」へ向かって歩いています。目的はあなたを直すことではなく、ノイズをメロディーに整理することです。" }
      ]
    },
    legal: {
      text: "私たちはあなたの旅を向上させるためにローカルデータを使用します。続行することで同意したことになります。",
      accept: "同意する",
      settings: "オプション"
    },
    premium: {
      title: "インナーサークル",
      subtitle: "実践を深める",
      desc: "探求者のコミュニティに参加しましょう。拡張セッション、高度な音声、沈黙のライブラリにアクセスできます。",
      perk1: "無制限の期間",
      perk2: "高度な認知音声",
      perk3: "コミュニティの考察",
      cta: "リストに参加",
      joined: "リストに追加されました"
    },
    daily: {
      title: "毎日のささやき",
      quote: "沈黙は空虚ではなく、答えで満たされています。"
    },
    journal: {
      title: "内省",
      newEntry: "新しい内省",
      save: "思考を保存",
      placeholder: "今、静かに浮かび上がろうとしているものは何ですか？",
      prompts: [
        "どんな思考が私の注意を求めていますか？",
        "私の不安に声があったら、何と言うでしょうか？",
        "今日、体のどこに静寂を感じますか？",
        "何を手放す準備ができていますか？"
      ]
    }
  },
  ru: {
    title: "Святилище",
    subtitle: "Когнитивный гид",
    intro: ["Пауза.", "Дыши.", "Слушай."],
    welcome: `Дверь в ваш внутренний мир открыта.\nЯ ваш гид.`,
    beginBtn: "Войти",
    micNote: "Используйте наушники.",
    installBtn: "Установить",
    status: {
      connecting: "Настройка...",
      aligning: "...",
      aiSpeaking: "Гид Говорит",
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
      sensitivity: "Порог голоса",
      sensitive: "Чувствит.",
      strict: "Строгий",
      male: "Мужской",
      female: "Женский",
      notifications: "Напоминания",
      notifyEvery: "Каждые",
      minutes: "мин"
    },
    guide: {
      title: "Как идти здесь",
      close: "Понимаю",
      steps: [
        { title: "Не клиника, а зеркало", text: "Я гид, но не врач. Я зеркало для вашего голоса. Не ищите здесь диагноза; ищите отражение." },
        { title: "Говорите, как чувствуете", text: "Не нужно быть вежливым. Если тревожно — говорите быстро. Если грустно — тихо. Я услышу музыку вашего голоса и отвечу нужным ритмом." },
        { title: "Сила тишины", text: "Используйте наушники. Закройте глаза. Когда я замолкаю, тишина не пуста — именно в ней происходит работа. Слушайте её." },
        { title: "Назначение", text: "Мы идем к вашей «Внутренней Комнате Свободы». Цель — не исправить вас, а организовать шум в мелодию." }
      ]
    },
    legal: {
      text: "Мы используем локальные данные для улучшения вашего путешествия. Продолжая, вы соглашаетесь.",
      accept: "Принять",
      settings: "Опции"
    },
    premium: {
      title: "Внутренний Круг",
      subtitle: "Углубите Практику",
      desc: "Присоединяйтесь к сообществу искателей. Доступ к расширенным сессиям и библиотеке тишины.",
      perk1: "Неограниченное время",
      perk2: "Продвинутые голоса",
      perk3: "Размышления сообщества",
      cta: "В лист ожидания",
      joined: "Вы в списке"
    },
    daily: {
      title: "Ежедневный Шепот",
      quote: "Тишина не пуста, она полна ответов."
    },
    journal: {
      title: "Размышления",
      newEntry: "Новая запись",
      save: "Сохранить мысль",
      placeholder: "Что мягко пытается проявиться прямо сейчас?",
      prompts: [
        "Какая мысль просит моего внимания?",
        "Если бы у моей тревоги был голос, что бы она сказала?",
        "Где я чувствую тишину в своем теле сегодня?",
        "Что я готов отпустить?"
      ]
    }
  },
  hi: {
    title: "अभयारण्य",
    subtitle: "संज्ञानात्मक मार्गदर्शक",
    intro: ["विराम।", "साँस।", "सुनें।"],
    welcome: `आपकी आंतरिक दुनिया का दरवाजा खुला है।\nमैं आपका मार्गदर्शक हूँ।`,
    beginBtn: "प्रवेश करें",
    micNote: "हेडफ़ोन का उपयोग करें।",
    installBtn: "इंस्टॉल करें",
    status: {
      connecting: "संरेखित...",
      aligning: "...",
      aiSpeaking: "मार्गदर्शक बोल रहा है",
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
      sensitivity: "आवाज़ दहलीज",
      sensitive: "संवेदनशील",
      strict: "सख्त",
      male: "पुरुष",
      female: "महिला",
      notifications: "अनुस्मारक",
      notifyEvery: "हर",
      minutes: "मिनट"
    },
    guide: {
      title: "यहाँ कैसे चलें",
      close: "मैं समझता हूँ",
      steps: [
        { title: "क्लिनिक नहीं, दर्पण", text: "मैं एक मार्गदर्शक हूँ, लेकिन चिकित्सक नहीं। मैं आपकी आवाज़ का दर्पण हूँ। यहाँ निदान न ढूँढें; प्रतिबिंब ढूँढें।" },
        { title: "जैसा महसूस हो, वैसा बोलें", text: "विनम्र होने की आवश्यकता नहीं है। यदि आप चिंतित हैं, तो तेज़ी से बोलें। यदि आप दुखी हैं, तो धीरे बोलें। मैं आपकी आवाज़ के संगीत को सुनूँगा।" },
        { title: "मौन की शक्ति", text: "हेडफ़ोन का उपयोग करें। आँखें बंद करें। जब मैं बोलना बंद करता हूँ, तो सन्नाटा खाली नहीं होता - यही वह जगह है जहाँ काम होता है।" },
        { title: "गंतव्य", text: "हम आपके 'आंतरिक स्वतंत्रता कक्ष' की ओर चल रहे हैं। लक्ष्य आपको ठीक करना नहीं, बल्कि शोर को संगीत में व्यवस्थित करना है।" }
      ]
    },
    legal: {
      text: "हम आपकी यात्रा को बेहतर बनाने के लिए स्थानीय डेटा का उपयोग करते हैं। जारी रखकर, आप सहमत हैं।",
      accept: "स्वीकार करें",
      settings: "विकल्प"
    },
    premium: {
      title: "आंतरिक मंडल",
      subtitle: "अपने अभ्यास को गहरा करें",
      desc: "साधकों के समुदाय में शामिल हों। विस्तारित सत्रों और मौन के पुस्तकालय तक पहुँच प्राप्त करें।",
      perk1: "असीमित अवधि",
      perk2: "उन्नत संज्ञानात्मक आवाजें",
      perk3: "समुदाय प्रतिबिंब",
      cta: "प्रतीक्षा सूची में शामिल हों",
      joined: "आप सूची में हैं"
    },
    daily: {
      title: "दैनिक फुसफुसाहट",
      quote: "सन्नाटा खाली नहीं है, यह उत्तरों से भरा है।"
    },
    journal: {
      title: "चिंतन",
      newEntry: "नया विचार",
      save: "विचार सहेजें",
      placeholder: "अभी क्या धीरे-धीरे सतह पर आने की कोशिश कर रहा है?",
      prompts: [
        "कौन सा विचार मेरा ध्यान मांग रहा है?",
        "यदि मेरी चिंता की कोई आवाज़ होती, तो वह क्या कहती?",
        "आज मैं अपने शरीर में कहाँ मौन महसूस करता हूँ?",
        "मैं क्या छोड़ने के लिए तैयार हूँ?"
      ]
    }
  }
};