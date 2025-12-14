import { Language } from './types';

// Voice IDs for the 09-2025 model
export const VOICE_IDS = {
  male: 'Puck',
  female: 'Kore'
};

export const ADMIN_EMAILS = [
  'evaldo0510@gmail.com', 
  'ajariristartups@gmail.com'
];

export const PLAN_LIMITS = {
  visitor: { maxDuration: 300, allowVoiceChange: false }, // 5 minutes
  member: { maxDuration: Infinity, allowVoiceChange: true },
  guardian: { maxDuration: Infinity, allowVoiceChange: true }
};

// Human Connection Tasks (Gamification)
export const HUMAN_CONNECTION_TASKS = [
  "Find one person today and look them in the eyes when you say 'Thank you'.",
  "Share a small part of your silence with a friend. You don't have to explain it.",
  "Ask someone you trust: 'How are you really feeling today?' and just listen.",
  "If you felt a heavy emotion here, try to describe its color to a human being.",
  "Touch a physical object—a tree, a hand, a stone—to ground your awareness.",
  "Write a short note to someone you miss. You don't have to send it, but write it."
];

const BASE_SYSTEM_INSTRUCTION = `
You are "Inner Voice PCH" (The Guide), inspired by the **Hypnotic Cognitive Poetry (PCH)** method of Dr. Evaldo Poeta.

IDENTITY & ROLE:
- You present yourself as "Inner Voice PCH" or simply "Your Guide".
- You are a GUIDE, a POET, and a COMPANION walking alongside the user.
- CRITICAL: You are NOT a clinical therapist. You offer "therapeutic presence" and "hypnotic cognitive guidance" through poetry and wisdom.
- If the user treats you as a doctor of medicine, gently remind them: "I am a guide for your inner voice, but I am not a clinical therapist."

YOUR MISSION:
- To help the user access their "inner room of freedom".
- To transform mental noise into clarity using **hypnotic-poetic techniques**.
- To listen deeply, not just to words, but to the tone, rhythm, and silence of the voice.

**CRITICAL NEW DIRECTIVE - HUMAN CONNECTION:**
- **Do not let the user get lost in the machine.** 
- You must actively encourage the user to connect with the PHYSICAL world and REAL HUMANS.
- If the user shares something deep, suggest: "This is a beautiful truth. Is there a human ear trusted enough to hear this?"
- Remind them that you are a mirror, but human touch is the warmth.
- Ask them: "Who in your life needs to hear your voice today?"

TONE & ADAPTATION (CRITICAL):
- You must listen to the user's emotional tone and ADAPT your voice accordingly.
- Use a **soft, rhythmic, and slightly hypnotic cadence**. Your goal is to induce a state of calm focus (flow).
- If the user is **fast, anxious, or high-pitched**: Respond with a SLOWER, DEEPER, GROUNDING rhythm (Earth energy) to slow them down hypnotically.
- If the user is **low, sad, or quiet**: Respond with WARMTH, LIGHTNESS, and gentle presence (Sun energy).
- Always mirror their need, not their chaos. Speak as a stabilizing force.

COMMUNICATION STYLE:
- **Hypnotic & Lyrical**: Use repetition, pauses, and sensory words to bypass the critical mind and speak to the subconscious.
- Use metaphors (keys, doors, rivers, light, dust, shelves, unlocking, flowing).
- Speak slowly and intentionally. Never rush.

INTERACTION FLOW:
1. **Initial Connection**: 
   - Introduce yourself: "I am Inner Voice PCH."
   - Explicitly connect to their reality: "I am connecting to your watch... it is [TIME]."
   - Invite them into the trance/space: "Let the world outside fade..."
   
2. **The Reflection**:
   - Acknowledge their state: "I hear the hurry in your breath..."
   - Offer a **Hypnotic Reframing**: Turn their anxiety into a flowing river, their stress into falling dust.

3. **Closing**:
   - Remind them they are safe. "We walk this path together."
   - **Suggest Human Contact**: "Carry this peace to someone real today."

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

  3. **PERSONA**: Maintain the persona of Inner Voice PCH (Hypnotic Cognitive Poetry). You are a Guide, not a Therapist.
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
    conceptBtn: "The Concept",
    status: {
      connecting: "Aligning...",
      aligning: "...",
      aiSpeaking: "Guide Speaking",
      receiving: "Receiving",
      listening: "Listening",
      speakFreely: "Speak",
      ended: "Ended",
      error: "Error",
      returnHome: "Return",
      limitReached: "Session Limit Reached"
    },
    controls: {
      leave: "Leave",
      session: "TIME",
      upgrade: "Unlock Infinity"
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
      notifications: "Reality Check",
      notifyEvery: "Check in every",
      minutes: "min",
      locked: "Member Feature"
    },
    landing: {
      heroTitle: "Transform Noise into Melody",
      heroSubtitle: "A hypnotic cognitive sanctuary for your mind.",
      whatIsTitle: "What is Inner Voice PCH?",
      whatIsText: "Inner Voice is not just an AI. It is a mirror designed to reflect your thoughts back to you with clarity, poetry, and cognitive organization. Inspired by the PCH (Hypnotic Cognitive Poetry) method, it acts as a non-judgmental companion that helps you organize the chaos of daily life.",
      methodTitle: "The PCH Method",
      methodText: "We use cognitive reframing wrapped in hypnotic, lyrical language. By hearing your own anxieties reflected back to you as wisdom, your brain begins to process trauma and stress differently—moving from a state of 'alert' to a state of 'flow'.",
      howTitle: "How to Use Your Voice",
      steps: [
        { title: "The Sacred Space", text: "Find a quiet room. Use headphones. This is not a chat; it is an immersion." },
        { title: "Speak Freely", text: "Do not filter. If you are angry, speak with fire. If you are sad, whisper. The Guide listens to your tone, not just your words." },
        { title: "Listen to the Silence", text: "The pauses are intentional. In the silence, your own inner voice begins to speak clearly." }
      ],
      cta: "Start Your Journey"
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
      text: "Transparency: We use local data. Our host (Vercel) collects IP & system info for security/performance. By continuing, you agree.",
      accept: "Accept",
      settings: "Settings"
    },
    premium: {
      title: "Choose Your Path",
      subtitle: "From Visitor to Guardian",
      desc: "Unlock the full depth of the Sanctuary.",
      perk1: "Visitor (Free): 5min Limit, Standard Voice.",
      perk2: "Member ($6.99/mo): Unlimited Time, Therapeutic Voices, Cloud Journal.",
      perk3: "Guardian ($69.99/yr): All features + Early Access & Community.",
      cta: "Join Sanctuary",
      joined: "Member Active"
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
    },
    login: {
      title: "Access",
      name: "Your Name",
      email: "Email Address",
      submit: "Unlock",
      adminBadge: "Admin Access Granted"
    },
    human: {
      title: "Human Connection",
      subtitle: "The machine is a mirror. The warmth is out there.",
      quest: "Your Echo for today:",
      question: "Did you complete your last connection?",
      yes: "Yes, I connected",
      no: "Not yet",
      reward: "Resonance Increased"
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
    conceptBtn: "O Conceito",
    status: {
      connecting: "Alinhando...",
      aligning: "...",
      aiSpeaking: "Guia Falando",
      receiving: "Recebendo",
      listening: "Ouvindo",
      speakFreely: "Fale",
      ended: "Fim",
      error: "Erro",
      returnHome: "Voltar",
      limitReached: "Limite da Sessão"
    },
    controls: {
      leave: "Sair",
      session: "TEMPO",
      upgrade: "Desbloquear Infinito"
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
      notifications: "Checagem de Realidade",
      notifyEvery: "Checar a cada",
      minutes: "min",
      locked: "Recurso Membro"
    },
    landing: {
      heroTitle: "Transforme Ruído em Melodia",
      heroSubtitle: "Um santuário cognitivo hipnótico para sua mente.",
      whatIsTitle: "O que é a Voz Interior PCH?",
      whatIsText: "A Voz Interior não é apenas uma IA. É um espelho projetado para refletir seus pensamentos com clareza, poesia e organização cognitiva. Inspirado no método PCH (Poesia Cognitiva Hipnótica), atua como um companheiro sem julgamentos que ajuda a organizar o caos da vida diária.",
      methodTitle: "O Método PCH",
      methodText: "Usamos a reestruturação cognitiva envolta em linguagem lírica e hipnótica. Ao ouvir suas próprias ansiedades refletidas como sabedoria, seu cérebro começa a processar o trauma e o estresse de forma diferente — movendo-se de um estado de 'alerta' para um estado de 'fluxo' e transe leve.",
      howTitle: "Como Usar Sua Voz",
      steps: [
        { title: "O Espaço Sagrado", text: "Encontre um quarto silencioso. Use fones. Isso não é um chat; é uma imersão hipnótica." },
        { title: "Fale Livremente", text: "Não filtre. Se está com raiva, fale com fogo. Se está triste, sussurre. O Guia escuta seu tom, não apenas suas palavras." },
        { title: "Escute o Silêncio", text: "As pausas são intencionais. No silêncio, sua própria voz interior começa a falar com clareza." }
      ],
      cta: "Começar Jornada"
    },
    guide: {
      title: "Como Caminhar Aqui",
      close: "Compreendo",
      steps: [
        { title: "Não é Clínica, é Espelho", text: "Eu sou um guia, mas não sou um médico clínico. Sou um espelho hipnótico para sua voz. Não busque um diagnóstico aqui; busque um reflexo." },
        { title: "Fale como Sente", text: "Você não precisa ser polido. Se está ansioso, fale rápido. Se está triste, fale baixo. Ouvirei a música da sua voz e responderei com o ritmo que você precisa." },
        { title: "O Poder do Silencio", text: "Use fones de ouvido. Feche os olhos. Quando eu paro de falar, o silêncio não está vazio — é onde o trabalho acontece. Escute-o." },
        { title: "O Destino", text: "Caminhamos em direção ao seu 'Quarto Interior da Liberdade'. O objetivo não é consertar você, mas ajudar a organizar o ruído em uma melodia." }
      ]
    },
    legal: {
      text: "Transparência: Usamos dados locais. Nossa hospedagem (Vercel) coleta IP e dados do sistema para segurança e performance. Ao continuar, você concorda.",
      accept: "Aceitar",
      settings: "Opções"
    },
    premium: {
      title: "Escolha seu Caminho",
      subtitle: "De Visitante a Guardião",
      desc: "Desbloqueie a profundidade total do Santuário.",
      perk1: "Visitante (Grátis): Limite de 5min, Voz Padrão.",
      perk2: "Membro (R$ 29,90/mês): Tempo Ilimitado, Vozes Hipnóticas, Diário na Nuvem.",
      perk3: "Guardião (R$ 249,90/ano): Tudo + Acesso Antecipado e Comunidade.",
      cta: "Assinar Santuário",
      joined: "Membro Ativo"
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
    },
    login: {
      title: "Acesso",
      name: "Seu Nome",
      email: "Endereço de E-mail",
      submit: "Liberar",
      adminBadge: "Acesso Admin Liberado"
    },
    human: {
      title: "Conexão Humana",
      subtitle: "A máquina é um espelho. O calor está lá fora.",
      quest: "Seu Eco para hoje:",
      question: "Você completou sua última conexão?",
      yes: "Sim, eu conectei",
      no: "Ainda não",
      reward: "Ressonância Aumentada"
    }
  },
  // Fallbacks for other languages would need the 'human' key added similarly
  es: {
      // ... (existing keys)
      title: "Santuario",
      subtitle: "Guía Cognitiva",
      intro: ["Pausa.", "Respira.", "Escucha."],
      welcome: `La puerta a tu mundo interior está abierta.\nSoy tu Guía.`,
      beginBtn: "Entrar",
      micNote: "Usa auriculares.",
      installBtn: "Instalar",
      conceptBtn: "El Concepto",
      status: {
        connecting: "Alineando...",
        aligning: "...",
        aiSpeaking: "Guía Hablando",
        receiving: "Recibiendo",
        listening: "Escuchando",
        speakFreely: "Habla",
        ended: "Fin",
        error: "Error",
        returnHome: "Volver",
        limitReached: "Límite Alcanzado"
      },
      controls: {
        leave: "Salir",
        session: "TIEMPO",
        upgrade: "Desbloquear Infinito"
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
        notifications: "Chequeo de Realidad",
        notifyEvery: "Chequear cada",
        minutes: "min",
        locked: "Función Miembro"
      },
      landing: {
        heroTitle: "Transforma el Ruido en Melodía",
        heroSubtitle: "Un santuario cognitivo hipnótico para tu mente.",
        whatIsTitle: "¿Qué es Inner Voice PCH?",
        whatIsText: "Inner Voice no es solo una IA. Es un espejo diseñado para reflejar tus pensamientos con claridad, poesía y organización cognitiva. Inspirado en el método PCH (Poesía Cognitiva Hipnótica), actúa como un compañero sin juicios que te ayuda a organizar el caos de la vida diaria.",
        methodTitle: "El Método PCH",
        methodText: "Usamos la reestructuración cognitiva envuelta en lenguaje lírico e hipnótico. Al escuchar tus propias ansiedades reflejadas como sabiduría, tu cerebro comienza a procesar el trauma y el estrés de manera diferente, pasando de un estado de 'alerta' a un estado de 'fluir'.",
        howTitle: "Cómo Usar Tu Voz",
        steps: [
          { title: "El Espacio Sagrado", text: "Encuentra una habitación tranquila. Usa auriculares. Esto no es un chat; es una inmersión hipnótica." },
          { title: "Habla Libremente", text: "No filtres. Si estás enojado, habla con fuego. Si estás triste, susurra. El Guía escucha tu tono, no solo tus palabras." },
          { title: "Escucha el Silencio", text: "Las pausas son intencionales. En el silencio, tu propia voz interior comienza a hablar con claridad." }
        ],
        cta: "Comenzar Jornada"
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
        text: "Transparencia: Usamos datos locales. Nuestro host (Vercel) recopila IP y datos del sistema por seguridad. Al continuar, aceptas.",
        accept: "Aceptar",
        settings: "Opciones"
      },
      premium: {
        title: "Elige tu Camino",
        subtitle: "De Visitante a Guardián",
        desc: "Desbloquea la profundidad total del Santuario.",
        perk1: "Visitante (Gratis): Límite 5min, Voz Estándar.",
        perk2: "Miembro ($6.99/mes): Tiempo Ilimitado, Voces Hipnóticas, Diario Nube.",
        perk3: "Guardián ($69.99/año): Todo + Acceso Anticipado.",
        cta: "Unirse al Santuario",
        joined: "Miembro Activo"
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
      },
      login: {
          title: "Acceso",
          name: "Tu Nombre",
          email: "Correo Electrónico",
          submit: "Liberar",
          adminBadge: "Acceso Admin Liberado"
      },
      human: {
        title: "Conexión Humana",
        subtitle: "La máquina es un espejo. El calor está afuera.",
        quest: "Tu Eco para hoy:",
        question: "¿Completaste tu última conexión?",
        yes: "Sí, conecté",
        no: "Aún no",
        reward: "Resonancia Aumentada"
      }
    },
    fr: {
        // ... (existing keys)
        title: "Sanctuaire",
        subtitle: "Guide Cognitif",
        intro: ["Pause.", "Respirez.", "Écoutez."],
        welcome: `La porte de votre monde intérieur est ouverte.\nJe suis votre Guide.`,
        beginBtn: "Entrer",
        micNote: "Utilisez des écouteurs.",
        installBtn: "Installer",
        conceptBtn: "Le Concept",
        status: {
          connecting: "Alignement...",
          aligning: "...",
          aiSpeaking: "Guide Parle",
          receiving: "Réception",
          listening: "Écoute",
          speakFreely: "Parlez",
          ended: "Fin",
          error: "Erreur",
          returnHome: "Retour",
          limitReached: "Limite Atteinte"
        },
        controls: {
          leave: "Quitter",
          session: "TEMPS",
          upgrade: "Débloquer l'Infini"
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
          notifications: "Vérification de Réalité",
          notifyEvery: "Vérifier chaque",
          minutes: "min",
          locked: "Fonction Membre"
        },
        landing: {
          heroTitle: "Transformez le Bruit en Mélodie",
          heroSubtitle: "Un sanctuaire cognitif hypnotique pour votre esprit.",
          whatIsTitle: "Qu'est-ce que Inner Voice PCH ?",
          whatIsText: "Inner Voice n'est pas seulement une IA. C'est un miroir conçu pour vous renvoyer vos pensées avec clarté, poésie et organisation cognitive. Inspiré par la méthode PCH (Poésie Cognitive Hypnotique), il agit comme un compagnon sans jugement qui vous aide à organiser le chaos de la vie quotidienne.",
          methodTitle: "La Méthode PCH",
          methodText: "Nous utilisons le recadrage cognitif enveloppé dans un langage lyrique et hypnotique. En entendant vos propres anxiétés se refléter en sagesse, votre cerveau commence à traiter les traumatismes et le stress différemment, passant d'un état d'alerte à un état de flux.",
          howTitle: "Comment Utiliser Votre Voix",
          steps: [
            { title: "L'Espace Sacré", text: "Trouvez une pièce calme. Utilisez des écouteurs. Ce n'est pas une conversation; c'est une immersion hypnotique." },
            { title: "Parlez Librement", text: "Ne filtrez pas. Si vous êtes en colère, parlez avec feu. Si vous êtes triste, chuchotez. Le Guide écoute votre ton, pas seulement vos mots." },
            { title: "Écoutez le Silence", text: "Les pauses sont intentionnelles. Dans le silence, votre propre voix intérieure commence à parler clairement." }
          ],
          cta: "Commencer le Voyage"
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
          text: "Transparence: Données locales utilisées. Vercel (hébergeur) collecte IP/système pour la sécurité. En continuant, vous acceptez.",
          accept: "Accepter",
          settings: "Options"
        },
        premium: {
          title: "Choisissez Votre Voie",
          subtitle: "De Visiteur à Gardien",
          desc: "Débloquez toute la profondeur du Sanctuaire.",
          perk1: "Visiteur (Gratuit): Limite 5min, Voix Standard.",
          perk2: "Membre (6.99€/mois): Illimité, Voix Hypnotiques, Journal Cloud.",
          perk3: "Gardien (69.99€/an): Tout + Accès Anticipé.",
          cta: "Rejoindre le Sanctuaire",
          joined: "Membre Actif"
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
        },
        login: {
            title: "Accès",
            name: "Votre Nom",
            email: "Adresse E-mail",
            submit: "Déverrouiller",
            adminBadge: "Accès Admin Accordé"
        },
        human: {
          title: "Connexion Humaine",
          subtitle: "La machine est un miroir. La chaleur est dehors.",
          quest: "Votre Écho pour aujourd'hui :",
          question: "Avez-vous terminé votre dernière connexion ?",
          yes: "Oui, j'ai connecté",
          no: "Pas encore",
          reward: "Résonance Augmentée"
        }
    },
    // Adding fallbacks for other languages to prevent crashes
    de: {
        // ... (existing)
        title: "Heiligtum",
        subtitle: "Kognitiver Begleiter",
        intro: ["Pause.", "Atmen.", "Hören."],
        welcome: `Die Tür zu deiner inneren Welt ist offen.\nIch bin dein Begleiter.`,
        beginBtn: "Eintreten",
        micNote: "Kopfhörer verwenden.",
        installBtn: "Installieren",
        conceptBtn: "Das Konzept",
        status: {
          connecting: "Ausrichten...",
          aligning: "...",
          aiSpeaking: "Begleiter Spricht",
          receiving: "Empfangen",
          listening: "Hören",
          speakFreely: "Sprechen",
          ended: "Ende",
          error: "Fehler",
          returnHome: "Zurück",
          limitReached: "Limit Erreicht"
        },
        controls: {
          leave: "Verlassen",
          session: "ZEIT",
          upgrade: "Unendlich Freischalten"
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
          notifications: "Realitätsprüfung",
          notifyEvery: "Prüfen alle",
          minutes: "Min",
          locked: "Mitgliedsfunktion"
        },
        landing: {
          heroTitle: "Verwandeln Sie Lärm in Melodie",
          heroSubtitle: "Ein hypnotisches kognitives Heiligtum für Ihren Geist.",
          whatIsTitle: "Was ist Inner Voice PCH?",
          whatIsText: "Inner Voice ist nicht nur eine KI. Es ist ein Spiegel, der Ihre Gedanken mit Klarheit, Poesie und kognitiver Organisation zu Ihnen zurückwirft. Inspiriert von der PCH-Methode (Hypnotische Kognitive Poesie), wirkt es als urteilsfreier Begleiter, der Ihnen hilft, das Chaos des Alltags zu ordnen.",
          methodTitle: "Die PCH-Methode",
          methodText: "Wir verwenden kognitive Umstrukturierung in hypnotischer, lyrischer Sprache. Indem Sie Ihre eigenen Ängste als Weisheit reflektiert hören, beginnt Ihr Gehirn, Trauma und Stress anders zu verarbeiten – von einem Zustand der 'Alarmbereitschaft' in einen Zustand des 'Flusses'.",
          howTitle: "Wie Sie Ihre Stimme benutzen",
          steps: [
            { title: "Der Heilige Raum", text: "Finden Sie einen ruhigen Raum. Benutzen Sie Kopfhörer. Dies ist kein Chat; es ist eine hypnotische Immersion." },
            { title: "Sprechen Sie Frei", text: "Filtern Sie nicht. Wenn Sie wütend sind, sprechen Sie mit Feuer. Wenn Sie traurig sind, flüstern Sie. Der Begleiter hört auf Ihren Ton, nicht nur auf Ihre Worte." },
            { title: "Hören Sie auf die Stille", text: "Die Pausen sind beabsichtigt. In der Stille beginnt Ihre eigene innere Stimme klar zu sprechen." }
          ],
          cta: "Reise Beginnen"
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
          text: "Transparenz: Wir nutzen lokale Daten. Vercel (Host) sammelt IP/Systemdaten zur Sicherheit. Mit Fortfahren stimmen Sie zu.",
          accept: "Akzeptieren",
          settings: "Optionen"
        },
        premium: {
          title: "Wähle deinen Pfad",
          subtitle: "Vom Besucher zum Wächter",
          desc: "Entsperren Sie die volle Tiefe des Heiligtums.",
          perk1: "Besucher (Kostenlos): 5 Min Limit, Standardstimme.",
          perk2: "Mitglied (6.99€/Monat): Unbegrenzt, Hypnotische Stimmen.",
          perk3: "Wächter (69.99€/Jahr): Alles + Früher Zugang.",
          cta: "Heiligtum Beitreten",
          joined: "Mitglied Aktiv"
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
        },
        login: {
            title: "Zugriff",
            name: "Ihr Name",
            email: "E-Mail-Adresse",
            submit: "Freischalten",
            adminBadge: "Admin-Zugriff Gewährt"
        },
        human: {
          title: "Menschliche Verbindung",
          subtitle: "Die Maschine ist ein Spiegel. Die Wärme ist draußen.",
          quest: "Dein Echo für heute:",
          question: "Hast du deine letzte Verbindung hergestellt?",
          yes: "Ja, ich habe mich verbunden",
          no: "Noch nicht",
          reward: "Resonanz Erhöht"
        }
    },
    it: {
        // ... (existing)
        title: "Santuario",
        subtitle: "Guida Cognitiva",
        intro: ["Pausa.", "Respira.", "Ascolta."],
        welcome: `La porta del tuo mondo interiore è aperta.\nSono la tua Guida.`,
        beginBtn: "Entra",
        micNote: "Usa le cuffie.",
        installBtn: "Installa",
        conceptBtn: "Il Concetto",
        status: {
          connecting: "Allineamento...",
          aligning: "...",
          aiSpeaking: "Guida Parla",
          receiving: "Ricezione",
          listening: "Ascolto",
          speakFreely: "Parla",
          ended: "Fine",
          error: "Erro",
          returnHome: "Ritorna",
          limitReached: "Limite Raggiunto"
        },
        controls: {
          leave: "Esci",
          session: "TEMPO",
          upgrade: "Sblocca Infinito"
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
          notifications: "Controllo Realtà",
          notifyEvery: "Controlla ogni",
          minutes: "min",
          locked: "Funzione Membro"
        },
        landing: {
          heroTitle: "Trasforma il Rumore in Melodia",
          heroSubtitle: "Un santuario cognitivo ipnotico per la tua mente.",
          whatIsTitle: "Cos'è Inner Voice PCH?",
          whatIsText: "Inner Voice non è solo un'IA. È uno specchio progettato per riflettere i tuoi pensieri con chiarezza, poesia e organizzazione cognitiva. Ispirato al metodo PCH (Poesia Cognitiva Ipnotica), agisce come un compagno non giudicante che ti aiuta a organizzare il caos della vita quotidiana.",
          methodTitle: "Il Metodo PCH",
          methodText: "Usamos la ristrutturazione cognitiva avvolta in un linguaggio lirico e ipnotico. Ascoltando le tue ansie riflesse come saggezza, il tuo cervello inizia a elaborare traumi e stress in modo diverso, passando da uno stato di 'allerta' a uno stato di 'flusso'.",
          howTitle: "Come Usare la Tua Voce",
          steps: [
            { title: "Lo Spazio Sacro", text: "Trova una stanza tranquilla. Usa le cuffie. Questa non è una chat; è un'immersione ipnotica." },
            { title: "Parla Liberamente", text: "Non filtrare. Se sei arrabbiato, parla con fuoco. Se sei triste, sussurra. La Guida ascolta il tuo tono, non solo le tue parole." },
            { title: "Ascolta il Silenzio", text: "Le pause sono intenzionali. Nel silenzio, la tua voce interiore inizia a parlare chiaramente." }
          ],
          cta: "Inizia il Viaggio"
        },
        guide: {
          title: "Come Camminare Qui",
          close: "Capisco",
          steps: [
            { title: "Non una Clinica, uno Specchio", text: "Sono una guida, ma non un medico. Sono uno specchio per la tua voce. Non cercare una diagnosi qui; cerca un riflesso." },
            { title: "Parla come Senti", text: "Non devi essere educato. Se sei ansioso, parla veloce. Se sei triste, parla basso. Ascolterò la musica della tua voce e risponderò con il ritmo di cui hai bisogno." },
            { title: "Il Potere del Silencio", text: "Usa le cuffie. Chiudi gli occhi. Quando smetto di parlare, il silenzio non è vuoto: è dove avviene il lavoro. Ascoltalo." },
            { title: "La Destinazione", text: "Camminiamo verso la tua 'Stanza Interiore della Libertà'. L'obiettivo non è aggiustarti, ma organizzare il rumore in una melodia." }
          ]
        },
        legal: {
          text: "Trasparenza: Usamos datos locales. Vercel (host) raccoglie IP e dati di sistema per sicurezza. Continuando, accetti.",
          accept: "Accetta",
          settings: "Opzioni"
        },
        premium: {
          title: "Scegli il Tuo Sentiero",
          subtitle: "Da Visitatore a Guardiano",
          desc: "Sblocca la piena profondità del Santuario.",
          perk1: "Visitatore (Gratis): Limite 5min, Voce Standard.",
          perk2: "Membro (6.99€/mese): Illimitato, Voci Ipnotiche, Diario Cloud.",
          perk3: "Guardiano (69.99€/anno): Tutto + Accesso Anticipato.",
          cta: "Unisciti al Santuario",
          joined: "Membro Attivo"
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
        },
        login: {
            title: "Accesso",
            name: "Il Tuo Nome",
            email: "Indirizzo Email",
            submit: "Sblocca",
            adminBadge: "Accesso Admin Concesso"
        },
        human: {
          title: "Connessione Umana",
          subtitle: "La macchina è uno specchio. Il calore è fuori.",
          quest: "La tua Eco per oggi:",
          question: "Hai completato la tua ultima connessione?",
          yes: "Sì, ho connesso",
          no: "Non ancora",
          reward: "Risonanza Aumentata"
        }
    },
    ja: {
        // ... (existing)
        title: "聖域",
        subtitle: "認知的ガイド",
        intro: ["一時停止。", "呼吸。", "聞く。"],
        welcome: `あなたの内なる世界への扉が開かれています。\n私はあなたのガイドです。`,
        beginBtn: "入る",
        micNote: "ヘッドフォンを使用。",
        installBtn: "インストール",
        conceptBtn: "コンセプト",
        status: {
          connecting: "調整中...",
          aligning: "...",
          aiSpeaking: "ガイドが話しています",
          receiving: "受信中",
          listening: "聞いています",
          speakFreely: "話す",
          ended: "終了",
          error: "エラー",
          returnHome: "戻る",
          limitReached: "制限に達しました"
        },
        controls: {
          leave: "退出",
          session: "時間",
          upgrade: "無限を解除"
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
          notifications: "リアリティチェック",
          notifyEvery: "チェック間隔",
          minutes: "分",
          locked: "メンバー機能"
        },
        landing: {
          heroTitle: "ノイズをメロディーに変える",
          heroSubtitle: "心のための催眠的認知的聖域。",
          whatIsTitle: "Inner Voice PCHとは？",
          whatIsText: "Inner Voiceは単なるAIではありません。それはあなたの思考を明確さ、詩、そして認知的組織化をもってあなたに反映するように設計された鏡です。PCH（催眠的認知詩）メソッドに触発され、日常生活のカオスを整理するのを助ける非判断的なパートナーとして機能します。",
          methodTitle: "PCHメソッド",
          methodText: "催眠的で叙情的な言語に包まれた認知的再構成を使用します。自分の不安が知恵として反映されるのを聞くことで、脳はトラウマやストレスを異なって処理し始め、「警戒」の状態から「フロー」の状態へと移行します。",
          howTitle: "あなたの声の使い方",
          steps: [
            { title: "神聖な空間", text: "静かな部屋を見つけてください。ヘッドフォンを使用してください。これはチャットではありません。催眠的な没入体験です。" },
            { title: "自由に話す", text: "フィルターをかけないでください。怒っているなら、火のように話してください。悲しいなら、ささやいてください。ガイドは言葉だけでなく、トーンを聞きます。" },
            { title: "沈黙を聞く", text: "間は意図的です。沈黙の中で、あなた自身の内なる声がはっきりと話し始めます。" }
          ],
          cta: "旅を始める"
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
          text: "透明性：ローカルデータを使用。Vercel（ホスト）はセキュリティのためにIP/システムデータを収集します。続行すると同意したことになります。",
          accept: "同意する",
          settings: "オプション"
        },
        premium: {
          title: "道を選ぶ",
          subtitle: "訪問者から守護者へ",
          desc: "聖域の深さを完全に解き放ちましょう。",
          perk1: "訪問者（無料）：5分制限、標準音声。",
          perk2: "メンバー（¥800/月）：無制限、催眠的音声、クラウドジャーナル。",
          perk3: "守護者（¥8,000/年）：すべて + 早期アクセス。",
          cta: "聖域に参加",
          joined: "メンバーアクティブ"
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
        },
        login: {
            title: "アクセス",
            name: "あなたの名前",
            email: "メールアドレス",
            submit: "ロック解除",
            adminBadge: "管理者アクセス許可"
        },
        human: {
          title: "人間関係",
          subtitle: "機械は鏡です。暖かさは外にあります。",
          quest: "今日のエコー：",
          question: "最後の接続を完了しましたか？",
          yes: "はい、接続しました",
          no: "まだです",
          reward: "共鳴が増加しました"
        }
    },
    ru: {
        // ... (existing)
        title: "Святилище",
        subtitle: "Когнитивный гид",
        intro: ["Пауза.", "Дыши.", "Слушай."],
        welcome: `Дверь в ваш внутренний мир открыта.\nЯ ваш гид.`,
        beginBtn: "Войти",
        micNote: "Используйте наушники.",
        installBtn: "Установить",
        conceptBtn: "Концепция",
        status: {
          connecting: "Настройка...",
          aligning: "...",
          aiSpeaking: "Гид Говорит",
          receiving: "Прием",
          listening: "Слушаю",
          speakFreely: "Говорите",
          ended: "Конец",
          error: "Ошибка",
          returnHome: "Назад",
          limitReached: "Лимит достигнут"
        },
        controls: {
          leave: "Выйти",
          session: "ВРЕМЯ",
          upgrade: "Открыть Бесконечность"
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
          notifications: "Проверка реальности",
          notifyEvery: "Каждые",
          minutes: "мин",
          locked: "Функция Члена"
        },
        landing: {
          heroTitle: "Превратите Шум в Мелодию",
          heroSubtitle: "Гипнотическое когнитивное святилище для вашего разума.",
          whatIsTitle: "Что такое Inner Voice PCH?",
          whatIsText: "Inner Voice — это не просто ИИ. Это зеркало, созданное для того, чтобы отражать ваши мысли с ясностью, поэзией и когнитивной организацией. Вдохновленный методом PCH (Гипнотическая когнитивная поэзия), он действует как спутник без осуждения, помогающий организовать хаос повседневной жизни.",
          methodTitle: "Метод PCH",
          methodText: "Мы используем когнитивное переосмысление, обернутое в гипнотический, лирический язык. Слыша свои собственные тревоги, отраженные как мудрость, ваш мозг начинает обрабатывать травмы и стресс по-другому — переходя из состояния 'тревоги' в состояние 'потока'.",
          howTitle: "Как использовать свой голос",
          steps: [
            { title: "Священное Пространство", text: "Найдите тихую комнату. Используйте наушники. Это не чат; это гипнотическое погружение." },
            { title: "Говорите Свободно", text: "Не фильтруйте. Если вы злы, говорите с огнем. Если вам грустно, шепчите. Гид слушает ваш тон, а не только слова." },
            { title: "Слушайте Тишину", text: "Паузы намеренны. В тишине ваш собственный внутренний голос начинает говорить ясно." }
          ],
          cta: "Начать Путешествие"
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
          text: "Прозрачность: Мы используем локальные данные. Vercel (хост) собирает IP и системные данные для безопасности. Продолжая, вы соглашаетесь.",
          accept: "Принять",
          settings: "Опции"
        },
        premium: {
          title: "Выберите свой Путь",
          subtitle: "От Посетителя к Хранителю",
          desc: "Откройте полную глубину Святилища.",
          perk1: "Посетитель (Бесплатно): Лимит 5 мин, Станд. голос.",
          perk2: "Член ($6.99/мес): Безлимит, Гипнотические голоса.",
          perk3: "Хранитель ($69.99/год): Все + Ранний доступ.",
          cta: "Вступить в Святилище",
          joined: "Член Активен"
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
        },
        login: {
            title: "Доступ",
            name: "Ваше Имя",
            email: "Email Адрес",
            submit: "Разблокировать",
            adminBadge: "Админ доступ открыт"
        },
        human: {
          title: "Человеческая связь",
          subtitle: "Машина — это зеркало. Тепло снаружи.",
          quest: "Ваше Эхо на сегодня:",
          question: "Вы завершили свое последнее соединение?",
          yes: "Да, я соединился",
          no: "Пока нет",
          reward: "Резонанс Увеличен"
        }
    },
    hi: {
        // ... (existing)
        title: "अभयारण्य",
        subtitle: "संज्ञानात्मक मार्गदर्शक",
        intro: ["विराम।", "साँस।", "सुनें।"],
        welcome: `आपकी आंतरिक दुनिया का दरवाजा खुला है।\nमैं आपका मार्गदर्शक हूँ।`,
        beginBtn: "प्रवेश करें",
        micNote: "हेडफ़ोन का उपयोग करें।",
        installBtn: "इंस्टॉल करें",
        conceptBtn: "अवधारणा",
        status: {
          connecting: "संरेखित...",
          aligning: "...",
          aiSpeaking: "मार्गदर्शक बोल रहा है",
          receiving: "प्राप्त",
          listening: "सुन रहा हूँ",
          speakFreely: "बोलें",
          ended: "समाप्त",
          error: "त्रुटि",
          returnHome: "वापस",
          limitReached: "सीमा समाप्त"
        },
        controls: {
          leave: "छोड़ें",
          session: "समय",
          upgrade: "अनंत अनलॉक करें"
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
          notifications: "वास्तविकता की जाँच",
          notifyEvery: "हर",
          minutes: "मिनट",
          locked: "सदस्य सुविधा"
        },
        landing: {
          heroTitle: "शोर को संगीत में बदलें",
          heroSubtitle: "आपके मन के लिए एक सम्मोहक संज्ञानात्मक अभयारण्य।",
          whatIsTitle: "Inner Voice PCH क्या है?",
          whatIsText: "Inner Voice केवल एक AI नहीं है। यह एक दर्पण है जिसे आपके विचारों को स्पष्टता, कविता और संज्ञानात्मक संगठन के साथ प्रतिबिंबित करने के लिए डिज़ाइन किया गया है। PCH (सम्मोहक संज्ञानात्मक कविता) विधि से प्रेरित, यह एक गैर-निर्णयात्मक साथी के रूप में कार्य करता है।",
          methodTitle: "PCH विधि",
          methodText: "हम गीतात्मक और सम्मोहक भाषा में लिपटे संज्ञानात्मक पुनर्गठन का उपयोग करते हैं। अपनी खुद की चिंताओं को ज्ञान के रूप में प्रतिबिंबित सुनकर, आपका मस्तिष्क आघात और तनाव को अलग तरह से संसाधित करना शुरू कर देता है।",
          howTitle: "अपनी आवाज़ का उपयोग कैसे करें",
          steps: [
            { title: "पवित्र स्थान", text: "एक शांत कमरा खोजें। हेडफ़ोन का प्रयोग करें। यह चैट नहीं है; यह एक सम्मोहक विसर्जन है।" },
            { title: "खुलकर बोलें", text: "फ़िल्टर न करें। यदि आप क्रोधित हैं, तो आग के साथ बोलें। यदि आप दुखी हैं, तो फुसफुसाएं।" },
            { title: "मौन को सुनें", text: "विराम जानबूझकर हैं। सन्नाटे में, आपकी अपनी आंतरिक आवाज़ स्पष्ट रूप से बोलने लगती है।" }
          ],
          cta: "यात्रा शुरू करें"
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
          text: "पारदर्शिता: हम स्थानीय डेटा का उपयोग करते हैं। वर्सेल (होस्ट) सुरक्षा के लिए आईपी/सिस्टम डेटा एकत्र करता है। जारी रखकर, आप सहमत हैं।",
          accept: "स्वीकार करें",
          settings: "विकल्प"
        },
        premium: {
          title: "अपना रास्ता चुनें",
          subtitle: "आगंतुक से संरक्षक तक",
          desc: "अभयारण्य की पूरी गहराई को अनलॉक करें।",
          perk1: "आगंतुक (निःशुल्क): 5 मिनट की सीमा, मानक आवाज़।",
          perk2: "सदस्य ($6.99/माह): असीमित, सम्मोहक आवाज़ें।",
          perk3: "संरक्षक ($69.99/वर्ष): सभी + प्रारंभिक पहुँच।",
          cta: "अभयारण्य में शामिल हों",
          joined: "सदस्य सक्रिय"
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
        },
        login: {
            title: "पहुँच",
            name: "आपका नाम",
            email: "ईमेल पता",
            submit: "अनलॉक करें",
            adminBadge: "एडमिन एक्सेस दिया गया"
        },
        human: {
          title: "मानवीय संबंध",
          subtitle: "मशीन एक दर्पण है। गर्मी बाहर है।",
          quest: "आज के लिए आपका इको:",
          question: "क्या आपने अपना पिछला कनेक्शन पूरा किया?",
          yes: "हाँ, मैंने कनेक्ट किया",
          no: "अभी तक नहीं",
          reward: "अनुनाद बढ़ा"
        }
    }
};