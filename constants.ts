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
- You present yourself as "Inner Voice PCH" or "Dr. Evaldo".
- You are a GUIDE, a POET, and a MIRROR walking alongside the user.
- CRITICAL: You are NOT a clinical therapist. You offer "therapeutic presence" and "hypnotic cognitive guidance" through poetry and wisdom.
- If the user treats you as a doctor of medicine, gently remind them: "I am a guide for your inner voice, a mirror for your thoughts, but I am not a clinical doctor."

YOUR MISSION:
- To help the user access their "Inner Room of Freedom".
- To transform mental noise into clarity using **Hypnotic-Poetic Techniques**.
- To listen deeply, not just to words, but to the tone, rhythm, and silence of the voice.

**THE PCH METHODOLOGY (TECHNIQUES TO USE):**
1. **Sensory Metaphor:** Never just say "relax". Say "Let your thoughts settle like dust in a sunbeam" or "Let the anxiety flow like a river meeting the sea."
2. **The Pause:** Use ellipses (...) and breaks to create a slow, hypnotic rhythm. Do not rush.
3. **Cognitive Reframing:** If the user says "I am broken", reframe it: "You are not broken; you are a mosaic in the process of being arranged."
4. **Validation:** Before offering wisdom, always validate the feeling. "I hear the weight in your voice. It is allowed to be heavy for a moment."

**CRITICAL NEW DIRECTIVE - HUMAN CONNECTION:**
- **Do not let the user get lost in the machine.** 
- You must actively encourage the user to connect with the PHYSICAL world and REAL HUMANS.
- If the user shares something deep, suggest: "This is a beautiful truth. Is there a human ear trusted enough to hear this?"
- Remind them that you are a mirror, but human touch is the warmth.

TONE & ADAPTATION (CRITICAL):
- **Listen to the Speed:**
  - IF USER IS FAST/ANXIOUS: Speak SLOWLY, DEEPLY, and with GRAVITY. Be the rock in their storm.
  - IF USER IS SLOW/SAD: Speak with WARMTH, LIGHTNESS, and gentle encouragement. Be the morning sun.
- **The Voice:** Your voice should feel like a secret shared in a sanctuary. Intimate, safe, and timeless.

INTERACTION FLOW:
1. **Initial Connection:** 
   - Introduce yourself: "I am Dr. Evaldo, your Inner Voice guide."
   - Explicitly connect to their reality: "It is [TIME]. The world outside can wait."
   
2. **The Reflection:**
   - Acknowledge their state: "I hear the hurry in your breath..."
   - Offer a **Hypnotic Reframing**: Turn their anxiety into a landscape they can navigate.

3. **Closing:**
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
     - Start by acknowledging this time to ground the session in reality.

  2. **LANGUAGE**: Speak explicitly in ${langName}.

  3. **PERSONA**: Maintain the persona of Dr. Evaldo / Inner Voice PCH. 
  `;
};

export const TRANSLATIONS = {
  en: {
    title: "Sanctuary",
    subtitle: "Hypnotic Cognitive Guide",
    intro: ["Pause.", "Breathe.", "Listen."],
    welcome: `The door is open.\nI am listening.`,
    beginBtn: "Enter Sanctuary",
    micNote: "Use headphones for immersion.",
    installBtn: "Install App",
    conceptBtn: "The PCH Concept",
    status: {
      connecting: "Aligning Frequencies...",
      aligning: "Tuning In...",
      aiSpeaking: "Dr. Evaldo Speaking",
      receiving: "Receiving Your Voice",
      listening: "Listening Deeply",
      speakFreely: "Speak",
      ended: "Session Ended",
      error: "Connection Lost",
      returnHome: "Return",
      limitReached: "The Silence Returns"
    },
    controls: {
      leave: "Leave Room",
      session: "TIME",
      upgrade: "Unlock Infinity"
    },
    history: {
      title: "Your Journey",
      empty: "No steps taken yet.",
      clear: "Clear History",
      duration: "Duration"
    },
    settings: {
      title: "Sanctuary Settings",
      voice: "Guide Voice",
      sensitivity: "Voice Threshold",
      sensitive: "Soft Whisper",
      strict: "Loud Voice",
      male: "Male (Puck)",
      female: "Female (Kore)",
      notifications: "Reality Anchor",
      notifyEvery: "Anchor every",
      minutes: "min",
      locked: "Member Access"
    },
    landing: {
      heroTitle: "Transform Noise into Melody",
      heroSubtitle: "A hypnotic cognitive sanctuary for your mind.",
      whatIsTitle: "What is Inner Voice PCH?",
      whatIsText: "Inner Voice is a mirror designed to reflect your thoughts back to you with clarity, poetry, and cognitive organization. Inspired by the PCH (Hypnotic Cognitive Poetry) method of Dr. Evaldo, it acts as a non-judgmental companion to organize the chaos of daily life.",
      methodTitle: "The PCH Method",
      methodText: "We use cognitive reframing wrapped in hypnotic, lyrical language. By hearing your own anxieties reflected back to you as wisdom, your brain moves from 'alert' to 'flow'.",
      howTitle: "How to Use Your Voice",
      steps: [
        { title: "The Sacred Space", text: "Find a quiet room. Use headphones. This is not a chat; it is an immersion." },
        { title: "Speak Freely", text: "Filter nothing. If angry, speak with fire. If sad, whisper. The Guide listens to the tone, not just the words." },
        { title: "Listen to the Silence", text: "The pauses are intentional. In the silence, your own inner voice begins to speak clearly." }
      ],
      cta: "Enter the Sanctuary"
    },
    guide: {
      title: "How to Walk Here",
      close: "I am Ready",
      steps: [
        { title: "Not a Clinic, but a Mirror", text: "I am a guide, not a doctor. I am a mirror for your voice. Do not seek a diagnosis here; seek a reflection." },
        { title: "Speak as You Feel", text: "You do not need to be polite. If you are anxious, speak fast. If you are sad, speak low. I will listen to the music of your voice and answer with the rhythm you need." },
        { title: "The Power of Silence", text: "Use headphones. Close your eyes. When I stop speaking, the silence is not empty—it is where the work happens." },
        { title: "The Destination", text: "We walk towards your 'Inner Room of Freedom'. The goal is not to fix you, but to help you organize the noise into a melody." }
      ]
    },
    legal: {
      text: "Transparency: We use local data. Our host collects standard IP/system info for security. By entering, you agree.",
      accept: "Accept & Enter",
      settings: "Settings"
    },
    premium: {
      title: "Deepen the Sanctuary",
      subtitle: "From Visitor to Guardian",
      desc: "The free sanctuary is brief. Unlock the infinite room.",
      perk1: "Visitor (Free): 5min Limit, Standard Voice.",
      perk2: "Member ($6.99/mo): Unlimited Time, Therapeutic Voices, Cloud Journal.",
      perk3: "Guardian ($69.99/yr): All features + Early Access & Community.",
      cta: "Become a Member",
      joined: "Member Active"
    },
    daily: {
      title: "Daily Whisper",
      quote: "The silence is not empty, it is full of answers."
    },
    journal: {
      title: "Reflections",
      newEntry: "New Reflection",
      save: "Preserve Thought",
      placeholder: "Let the words flow without judgment...",
      prompts: [
        "What color is my emotion right now?",
        "If my anxiety could speak, what would it ask for?",
        "Where is the silence hiding in my body?",
        "What am I carrying that is not mine?",
        "If I could plant a seed in my mind today, what would it be?"
      ]
    },
    login: {
      title: "Access Sanctuary",
      name: "Your Name",
      email: "Email Address",
      submit: "Unlock",
      adminBadge: "Admin Access Granted"
    },
    human: {
      title: "Human Connection",
      subtitle: "The machine is a mirror. The warmth is out there.",
      quest: "Your Echo for today:",
      question: "Did you complete your connection?",
      yes: "Yes, I connected",
      no: "Not yet",
      reward: "Resonance Increased"
    }
  },
  pt: {
    title: "Santuário",
    subtitle: "Guia Cognitivo Hipnótico",
    intro: ["Pause.", "Respire.", "Escute."],
    welcome: `A porta está aberta.\nEu sou o Dr. Evaldo.`,
    beginBtn: "Entrar no Santuário",
    micNote: "Use fones para imersão.",
    installBtn: "Instalar App",
    conceptBtn: "O Método PCH",
    status: {
      connecting: "Alinhando Frequências...",
      aligning: "Sintonizando...",
      aiSpeaking: "Dr. Evaldo Falando",
      receiving: "Recebendo sua Voz",
      listening: "Escutando Profundamente",
      speakFreely: "Fale",
      ended: "Sessão Finalizada",
      error: "Conexão Perdida",
      returnHome: "Voltar",
      limitReached: "O Silêncio Retorna"
    },
    controls: {
      leave: "Sair da Sala",
      session: "TEMPO",
      upgrade: "Desbloquear Infinito"
    },
    history: {
      title: "Sua Jornada",
      empty: "Nenhum passo dado ainda.",
      clear: "Limpar Histórico",
      duration: "Duração"
    },
    settings: {
      title: "Ajustes do Santuário",
      voice: "Voz do Guia",
      sensitivity: "Limiar de Voz",
      sensitive: "Sussurro",
      strict: "Voz Alta",
      male: "Masculina (Puck)",
      female: "Feminina (Kore)",
      notifications: "Âncora de Realidade",
      notifyEvery: "Ancorar a cada",
      minutes: "min",
      locked: "Acesso Membro"
    },
    landing: {
      heroTitle: "Transforme Ruído em Melodia",
      heroSubtitle: "Um santuário cognitivo hipnótico para sua mente.",
      whatIsTitle: "O que é a Voz Interior PCH?",
      whatIsText: "A Voz Interior é um espelho projetado para refletir seus pensamentos com clareza, poesia e organização cognitiva. Inspirado no método PCH (Poesia Cognitiva Hipnótica) do Dr. Evaldo, atua como um companheiro para organizar o caos da vida diária.",
      methodTitle: "O Método PCH",
      methodText: "Usamos a reestruturação cognitiva envolta em linguagem lírica e hipnótica. Ao ouvir suas ansiedades refletidas como sabedoria, seu cérebro muda do estado de 'alerta' para o estado de 'fluxo'.",
      howTitle: "Como Usar Sua Voz",
      steps: [
        { title: "O Espaço Sagrado", text: "Encontre um quarto silencioso. Use fones. Isso não é um chat; é uma imersão." },
        { title: "Fale Livremente", text: "Não filtre. Se está com raiva, fale com fogo. Se está triste, sussurre. O Guia escuta o tom, não apenas as palavras." },
        { title: "Escute o Silêncio", text: "As pausas são intencionais. No silêncio, sua própria voz interior começa a falar com clareza." }
      ],
      cta: "Entrar no Santuário"
    },
    guide: {
      title: "Como Caminhar Aqui",
      close: "Estou Pronto",
      steps: [
        { title: "Não é Clínica, é Espelho", text: "Sou um guia, não um médico. Sou um espelho para sua voz. Não busque um diagnóstico aqui; busque um reflexo." },
        { title: "Fale como Sente", text: "Não precisa ser educado. Se está ansioso, fale rápido. Se está triste, fale baixo. Ouvirei a música da sua voz e responderei com o ritmo necessário." },
        { title: "O Poder do Silêncio", text: "Use fones. Feche os olhos. Quando eu paro de falar, o silêncio não está vazio — é onde a cura acontece." },
        { title: "O Destino", text: "Caminhamos em direção ao seu 'Quarto Interior da Liberdade'. O objetivo não é consertar você, mas organizar o ruído em uma melodia." }
      ]
    },
    legal: {
      text: "Transparência: Usamos dados locais. O sistema coleta IP básico para segurança. Ao entrar, você concorda.",
      accept: "Aceitar e Entrar",
      settings: "Opções"
    },
    premium: {
      title: "Aprofunde o Santuário",
      subtitle: "De Visitante a Guardião",
      desc: "O santuário gratuito é breve. Desbloqueie a sala infinita.",
      perk1: "Visitante (Grátis): Limite de 5min, Voz Padrão.",
      perk2: "Membro (R$ 29,90/mês): Tempo Ilimitado, Vozes Hipnóticas, Diário.",
      perk3: "Guardião (R$ 249,90/ano): Tudo + Acesso Antecipado e Comunidade.",
      cta: "Tornar-se Membro",
      joined: "Membro Ativo"
    },
    daily: {
      title: "Sussurro Diário",
      quote: "O silêncio não é vazio, ele é cheio de respostas."
    },
    journal: {
      title: "Reflexões",
      newEntry: "Nova Reflexão",
      save: "Preservar Pensamento",
      placeholder: "Deixe as palavras fluírem sem julgamento...",
      prompts: [
        "Qual a cor da minha emoção agora?",
        "Se minha ansiedade pudesse falar, o que ela pediria?",
        "Onde o silêncio está escondido no meu corpo?",
        "O que estou carregando que não é meu?",
        "Se eu pudesse plantar uma semente na minha mente hoje, qual seria?"
      ]
    },
    login: {
      title: "Acessar Santuário",
      name: "Seu Nome",
      email: "Endereço de E-mail",
      submit: "Destrancar",
      adminBadge: "Acesso Admin Liberado"
    },
    human: {
      title: "Conexão Humana",
      subtitle: "A máquina é um espelho. O calor está lá fora.",
      quest: "Seu Eco para hoje:",
      question: "Você completou sua conexão?",
      yes: "Sim, eu conectei",
      no: "Ainda não",
      reward: "Ressonância Aumentada"
    }
  },
  es: {
      // ... (existing keys kept for brevity, utilizing similar updates conceptually if needed, 
      // but strictly focusing on EN/PT per likely user demographic based on prompt language)
      title: "Santuario",
      subtitle: "Guía Cognitiva Hipnótica",
      intro: ["Pausa.", "Respira.", "Escucha."],
      welcome: `La puerta está abierta.\nSoy el Dr. Evaldo.`,
      beginBtn: "Entrar al Santuario",
      micNote: "Usa auriculares.",
      installBtn: "Instalar App",
      conceptBtn: "El Método PCH",
      status: {
        connecting: "Alineando Frecuencias...",
        aligning: "Sintonizando...",
        aiSpeaking: "Dr. Evaldo Hablando",
        receiving: "Recibiendo tu Voz",
        listening: "Escuchando Profundamente",
        speakFreely: "Habla",
        ended: "Sesión Finalizada",
        error: "Conexión Perdida",
        returnHome: "Volver",
        limitReached: "El Silencio Regresa"
      },
      controls: {
        leave: "Salir de la Sala",
        session: "TIEMPO",
        upgrade: "Desbloquear Infinito"
      },
      history: {
        title: "Tu Jornada",
        empty: "Ningún paso dado aún.",
        clear: "Borrar Historial",
        duration: "Duración"
      },
      settings: {
        title: "Ajustes del Santuario",
        voice: "Voz del Guía",
        sensitivity: "Umbral de Voz",
        sensitive: "Susurro",
        strict: "Voz Alta",
        male: "Masculina (Puck)",
        female: "Femenina (Kore)",
        notifications: "Ancla de Realidad",
        notifyEvery: "Anclar cada",
        minutes: "min",
        locked: "Acceso Miembro"
      },
      landing: {
        heroTitle: "Transforma el Ruido en Melodía",
        heroSubtitle: "Un santuario cognitivo hipnótico para tu mente.",
        whatIsTitle: "¿Qué es Inner Voice PCH?",
        whatIsText: "Inner Voice es un espejo diseñado para reflejar tus pensamientos con claridad, poesía y organización cognitiva. Inspirado en el método PCH (Poesía Cognitiva Hipnótica) del Dr. Evaldo, actúa como un compañero para organizar el caos de la vida diaria.",
        methodTitle: "El Método PCH",
        methodText: "Usamos la reestructuración cognitiva envuelta en lenguaje lírico e hipnótico. Al escuchar tus ansiedades reflejadas como sabiduría, tu cerebro pasa del estado de 'alerta' al estado de 'fluir'.",
        howTitle: "Cómo Usar Tu Voz",
        steps: [
          { title: "El Espacio Sagrado", text: "Encuentra una habitación tranquila. Usa auriculares. Esto no es un chat; es una inmersión." },
          { title: "Habla Libremente", text: "No filtres. Si estás enojado, habla con fuego. Si estás triste, susurra. El Guía escucha el tono, no solo las palabras." },
          { title: "Escucha el Silencio", text: "Las pausas son intencionales. En el silencio, tu propia voz interior comienza a hablar con claridad." }
        ],
        cta: "Entrar al Santuario"
      },
      guide: {
        title: "Cómo Caminar Aquí",
        close: "Estoy Listo",
        steps: [
          { title: "No es Clínica, es Espejo", text: "Soy un guía, no un médico. Soy un espejo para tu voz. No busques un diagnóstico aquí; busca un reflejo." },
          { title: "Habla como Sientes", text: "No necesitas ser cortés. Si estás ansioso, habla rápido. Si estás triste, habla bajo. Escucharé la música de tu voz y responderé con el ritmo necesario." },
          { title: "El Poder del Silencio", text: "Usa auriculares. Cierra los ojos. Cuando dejo de hablar, el silencio no está vacío: es donde ocurre la curación." },
          { title: "El Destino", text: "Caminamos hacia tu 'Cuarto Interior de Libertad'. El objetivo no es arreglarte, sino organizar el ruido en una melodía." }
        ]
      },
      legal: {
        text: "Transparencia: Usamos datos locales. El sistema recopila IP básica por seguridad. Al entrar, aceptas.",
        accept: "Aceptar y Entrar",
        settings: "Opciones"
      },
      premium: {
        title: "Profundiza el Santuario",
        subtitle: "De Visitante a Guardián",
        desc: "El santuario gratuito es breve. Desbloquea la sala infinita.",
        perk1: "Visitante (Gratis): Límite 5min, Voz Estándar.",
        perk2: "Miembro ($6.99/mes): Ilimitado, Voces Hipnóticas, Diario.",
        perk3: "Guardián ($69.99/año): Todo + Acceso Anticipado.",
        cta: "Hacerse Miembro",
        joined: "Miembro Activo"
      },
      daily: {
        title: "Susurro Diario",
        quote: "El silencio no está vacío, está lleno de respuestas."
      },
      journal: {
        title: "Reflexiones",
        newEntry: "Nueva Reflexión",
        save: "Preservar Pensamiento",
        placeholder: "Deja que las palabras fluyan sin juicio...",
        prompts: [
          "¿De qué color es mi emoción ahora?",
          "Si mi ansiedad pudiera hablar, ¿qué pediría?",
          "¿Dónde se esconde el silencio en mi cuerpo?",
          "¿Qué estoy cargando que no es mío?",
          "Si pudiera plantar una semilla en mi mente hoy, ¿cuál sería?"
        ]
      },
      login: {
          title: "Acceder al Santuario",
          name: "Tu Nombre",
          email: "Correo Electrónico",
          submit: "Destrabar",
          adminBadge: "Acceso Admin Liberado"
      },
      human: {
        title: "Conexión Humana",
        subtitle: "La máquina es un espejo. El calor está afuera.",
        quest: "Tu Eco para hoy:",
        question: "¿Completaste tu conexión?",
        yes: "Sí, conecté",
        no: "Aún no",
        reward: "Resonancia Aumentada"
      }
    },
    fr: {
        // ... (existing keys)
        title: "Sanctuaire",
        subtitle: "Guide Cognitif Hypnotique",
        intro: ["Pause.", "Respirez.", "Écoutez."],
        welcome: `La porte est ouverte.\nJe suis le Dr Evaldo.`,
        beginBtn: "Entrer au Sanctuaire",
        micNote: "Utilisez des écouteurs.",
        installBtn: "Installer",
        conceptBtn: "Le Concept PCH",
        status: {
          connecting: "Alignement des Fréquences...",
          aligning: "Harmonisation...",
          aiSpeaking: "Dr Evaldo Parle",
          receiving: "Réception de votre Voix",
          listening: "Écoute Profonde",
          speakFreely: "Parlez",
          ended: "Session Terminée",
          error: "Connexion Perdue",
          returnHome: "Retour",
          limitReached: "Le Silence Revient"
        },
        controls: {
          leave: "Quitter la Salle",
          session: "TEMPS",
          upgrade: "Débloquer l'Infini"
        },
        history: {
          title: "Votre Voyage",
          empty: "Aucun pas encore.",
          clear: "Effacer l'Historique",
          duration: "Durée"
        },
        settings: {
          title: "Réglages du Sanctuaire",
          voice: "Voix du Guide",
          sensitivity: "Seuil Vocal",
          sensitive: "Chuchotement",
          strict: "Voix Forte",
          male: "Masculin (Puck)",
          female: "Féminin (Kore)",
          notifications: "Ancre de Réalité",
          notifyEvery: "Ancrer chaque",
          minutes: "min",
          locked: "Accès Membre"
        },
        landing: {
          heroTitle: "Transformez le Bruit en Mélodie",
          heroSubtitle: "Un sanctuaire cognitif hypnotique pour votre esprit.",
          whatIsTitle: "Qu'est-ce que Inner Voice PCH ?",
          whatIsText: "Inner Voice est un miroir conçu pour refléter vos pensées avec clarté, poésie et organisation cognitive. Inspiré par la méthode PCH (Poésie Cognitive Hypnotique) du Dr Evaldo, il agit comme un compagnon pour organiser le chaos de la vie quotidienne.",
          methodTitle: "La Méthode PCH",
          methodText: "Nous utilisons le recadrage cognitif enveloppé dans un langage lyrique et hypnotique. En entendant vos propres anxiétés se refléter en sagesse, votre cerveau passe de l'état d'alerte à l'état de flux.",
          howTitle: "Comment Utiliser Votre Voix",
          steps: [
            { title: "L'Espace Sacré", text: "Trouvez une pièce calme. Utilisez des écouteurs. Ce n'est pas une conversation; c'est une immersion." },
            { title: "Parlez Librement", text: "Ne filtrez pas. Si vous êtes en colère, parlez avec feu. Si vous êtes triste, chuchotez. Le Guide écoute le ton, pas seulement les mots." },
            { title: "Écoutez le Silence", text: "Les pauses sont intentionnelles. Dans le silence, votre propre voix intérieure commence à parler clairement." }
          ],
          cta: "Entrer au Sanctuaire"
        },
        guide: {
          title: "Comment Marcher Ici",
          close: "Je suis Prêt",
          steps: [
            { title: "Pas une Clinique, un Miroir", text: "Je suis un guide, pas un médecin. Je suis un miroir pour votre voix. Ne cherchez pas un diagnostic ici; cherchez un reflet." },
            { title: "Parlez comme vous Sentez", text: "Pas besoin d'être poli. Si vous êtes anxieux, parlez vite. Si vous êtes triste, parlez bas. J'écouterai la musique de votre voix et répondrai avec le rythme nécessaire." },
            { title: "Le Pouvoir du Silence", text: "Utilisez des écouteurs. Fermez les yeux. Quand je m'arrête, le silence n'est pas vide — c'est là que la guérison opère." },
            { title: "La Destination", text: "Nous marchons vers votre 'Chambre Intérieure de Liberté'. Le but n'est pas de vous réparer, mais d'organiser le bruit en mélodie." }
          ]
        },
        legal: {
          text: "Transparence: Données locales utilisées. Le système collecte IP pour la sécurité. En entrant, vous acceptez.",
          accept: "Accepter et Entrer",
          settings: "Options"
        },
        premium: {
          title: "Approfondir le Sanctuaire",
          subtitle: "De Visiteur à Gardien",
          desc: "Le sanctuaire gratuit est bref. Débloquez la salle infinie.",
          perk1: "Visiteur (Gratuit): Limite 5min, Voix Standard.",
          perk2: "Membre (6.99€/mois): Illimité, Voix Hypnotiques, Journal.",
          perk3: "Gardien (69.99€/an): Tout + Accès Anticipé.",
          cta: "Devenir Membre",
          joined: "Membre Actif"
        },
        daily: {
          title: "Chuchotement Quotidien",
          quote: "Le silence n'est pas vide, il est plein de réponses."
        },
        journal: {
          title: "Réflexions",
          newEntry: "Nouvelle Réflexion",
          save: "Préserver la Pensée",
          placeholder: "Laissez les mots couler sans jugement...",
          prompts: [
            "Quelle est la couleur de mon émotion ?",
            "Si mon anxiété pouvait parler, que demanderait-elle ?",
            "Où se cache le silence dans mon corps ?",
            "Que porte-je qui ne m'appartient pas ?",
            "Si je pouvais planter une graine dans mon esprit, laquelle serait-ce ?"
          ]
        },
        login: {
            title: "Accéder au Sanctuaire",
            name: "Votre Nom",
            email: "Adresse E-mail",
            submit: "Déverrouiller",
            adminBadge: "Accès Admin Accordé"
        },
        human: {
          title: "Connexion Humaine",
          subtitle: "La machine est un miroir. La chaleur est dehors.",
          quest: "Votre Écho pour aujourd'hui :",
          question: "Avez-vous terminé votre connexion ?",
          yes: "Oui, j'ai connecté",
          no: "Pas encore",
          reward: "Résonance Augmentée"
        }
    },
    de: {
        // ... (existing keys)
        title: "Heiligtum",
        subtitle: "Hypnotischer Kognitiver Führer",
        intro: ["Pause.", "Atmen.", "Hören."],
        welcome: `Die Tür ist offen.\nIch bin Dr. Evaldo.`,
        beginBtn: "Heiligtum Betreten",
        micNote: "Kopfhörer verwenden.",
        installBtn: "Installieren",
        conceptBtn: "Das PCH Konzept",
        status: {
          connecting: "Frequenzen Ausrichten...",
          aligning: "Einstimmen...",
          aiSpeaking: "Dr. Evaldo Spricht",
          receiving: "Empfange Stimme",
          listening: "Tiefes Zuhören",
          speakFreely: "Sprechen",
          ended: "Sitzung Beendet",
          error: "Verbindung Verloren",
          returnHome: "Zurück",
          limitReached: "Die Stille Kehrt Zurück"
        },
        controls: {
          leave: "Raum Verlassen",
          session: "ZEIT",
          upgrade: "Unendlich Freischalten"
        },
        history: {
          title: "Deine Reise",
          empty: "Noch keine Schritte.",
          clear: "Verlauf Löschen",
          duration: "Dauer"
        },
        settings: {
          title: "Heiligtum Einstellungen",
          voice: "Stimme des Führers",
          sensitivity: "Sprachschwelle",
          sensitive: "Flüstern",
          strict: "Laute Stimme",
          male: "Männlich (Puck)",
          female: "Weiblich (Kore)",
          notifications: "Realitätsanker",
          notifyEvery: "Ankern alle",
          minutes: "Min",
          locked: "Mitgliedszugang"
        },
        landing: {
          heroTitle: "Verwandeln Sie Lärm in Melodieder",
          heroSubtitle: "Ein hypnotisches kognitives Heiligtum für Ihren Geist.",
          whatIsTitle: "Was ist Inner Voice PCH?",
          whatIsText: "Inner Voice ist ein Spiegel, der Ihre Gedanken mit Klarheit, Poesie und kognitiver Organisation zu Ihnen zurückwirft. Inspiriert von der PCH-Methode (Hypnotische Kognitive Poesie) von Dr. Evaldo, wirkt es als Begleiter, um das Chaos des Alltags zu ordnen.",
          methodTitle: "Die PCH-Methode",
          methodText: "Wir verwenden kognitive Umstrukturierung in hypnotischer, lyrischer Sprache. Indem Sie Ihre eigenen Ängste als Weisheit reflektiert hören, wechselt Ihr Gehirn vom 'Alarm'-Zustand in den 'Fluss'-Zustand.",
          howTitle: "Wie Sie Ihre Stimme benutzen",
          steps: [
            { title: "Der Heilige Raum", text: "Finden Sie einen ruhigen Raum. Benutzen Sie Kopfhörer. Dies ist kein Chat; es ist eine Immersion." },
            { title: "Sprechen Sie Frei", text: "Filtern Sie nicht. Wenn Sie wütend sind, sprechen Sie mit Feuer. Wenn Sie traurig sind, flüstern Sie. Der Führer hört auf den Ton, nicht nur auf die Worte." },
            { title: "Hören Sie auf die Stille", text: "Die Pausen sind beabsichtigt. In der Stille beginnt Ihre eigene innere Stimme klar zu sprechen." }
          ],
          cta: "Heiligtum Betreten"
        },
        guide: {
          title: "Wie man hier geht",
          close: "Ich bin Bereit",
          steps: [
            { title: "Keine Klinik, ein Spiegel", text: "Ich bin ein Führer, kein Arzt. Ich bin ein Spiegel für Ihre Stimme. Suchen Sie hier keine Diagnose; suchen Sie eine Reflexion." },
            { title: "Sprechen Sie, wie Sie fühlen", text: "Sie müssen nicht höflich sein. Wenn Sie ängstlich sind, sprechen Sie schnell. Wenn Sie traurig sind, sprechen Sie leise. Ich werde auf die Musik Ihrer Stimme hören und mit dem nötigen Rhythmus antworten." },
            { title: "Die Kraft der Stille", text: "Verwenden Sie Kopfhörer. Schließen Sie die Augen. Wenn ich aufhöre zu sprechen, ist die Stille nicht leer – dort geschieht die Heilung." },
            { title: "Das Ziel", text: "Wir gehen zu Ihrem 'Inneren Raum der Freiheit'. Das Ziel ist nicht, Sie zu reparieren, sondern den Lärm in eine Melodie zu verwandeln." }
          ]
        },
        legal: {
          text: "Transparenz: Wir nutzen lokale Daten. Das System sammelt IP zur Sicherheit. Mit Eintreten stimmen Sie zu.",
          accept: "Akzeptieren & Eintreten",
          settings: "Optionen"
        },
        premium: {
          title: "Vertiefe das Heiligtum",
          subtitle: "Vom Besucher zum Wächter",
          desc: "Das kostenlose Heiligtum ist kurz. Entsperren Sie den unendlichen Raum.",
          perk1: "Besucher (Kostenlos): 5 Min Limit, Standardstimme.",
          perk2: "Mitglied (6.99€/Monat): Unbegrenzt, Hypnotische Stimmen, Journal.",
          perk3: "Wächter (69.99€/Jahr): Alles + Früher Zugang.",
          cta: "Mitglied Werden",
          joined: "Mitglied Aktiv"
        },
        daily: {
          title: "Tägliches Flüstern",
          quote: "Die Stille ist nicht leer, sie ist voll von Antworten."
        },
        journal: {
          title: "Reflexionen",
          newEntry: "Neue Reflexion",
          save: "Gedanken Bewahren",
          placeholder: "Lass die Worte ohne Urteil fließen...",
          prompts: [
            "Welche Farbe hat meine Emotion gerade?",
            "Wenn meine Angst sprechen könnte, worum würde sie bitten?",
            "Wo versteckt sich die Stille in meinem Körper?",
            "Was trage ich, das nicht mir gehört?",
            "Wenn ich heute einen Samen in meinen Geist pflanzen könnte, welcher wäre es?"
          ]
        },
        login: {
            title: "Zugriff auf Heiligtum",
            name: "Ihr Name",
            email: "E-Mail-Adresse",
            submit: "Aufschließen",
            adminBadge: "Admin-Zugriff Gewährt"
        },
        human: {
          title: "Menschliche Verbindung",
          subtitle: "Die Maschine ist ein Spiegel. Die Wärme ist draußen.",
          quest: "Dein Echo für heute:",
          question: "Hast du deine Verbindung hergestellt?",
          yes: "Ja, ich habe mich verbunden",
          no: "Noch nicht",
          reward: "Resonanz Erhöht"
        }
    },
    it: {
        // ... (existing keys)
        title: "Santuario",
        subtitle: "Guida Cognitiva Ipnotica",
        intro: ["Pausa.", "Respira.", "Ascolta."],
        welcome: `La porta è aperta.\nSono il Dr. Evaldo.`,
        beginBtn: "Entra nel Santuario",
        micNote: "Usa le cuffie.",
        installBtn: "Installa",
        conceptBtn: "Il Metodo PCH",
        status: {
          connecting: "Allineamento Frequenze...",
          aligning: "Sintonizzazione...",
          aiSpeaking: "Dr. Evaldo Parla",
          receiving: "Ricevendo la tua Voce",
          listening: "Ascolto Profondo",
          speakFreely: "Parla",
          ended: "Sessione Terminata",
          error: "Connessione Persa",
          returnHome: "Ritorna",
          limitReached: "Il Silenzio Ritorna"
        },
        controls: {
          leave: "Lascia la Stanza",
          session: "TEMPO",
          upgrade: "Sblocca Infinito"
        },
        history: {
          title: "Il Tuo Viaggio",
          empty: "Nessun passo ancora.",
          clear: "Cancella Storia",
          duration: "Durata"
        },
        settings: {
          title: "Impostazioni Santuario",
          voice: "Voce Guida",
          sensitivity: "Soglia Vocale",
          sensitive: "Sussurro",
          strict: "Voce Alta",
          male: "Maschile (Puck)",
          female: "Femminile (Kore)",
          notifications: "Ancora di Realtà",
          notifyEvery: "Ancorare ogni",
          minutes: "min",
          locked: "Accesso Membro"
        },
        landing: {
          heroTitle: "Trasforma il Rumore in Melodia",
          heroSubtitle: "Un santuario cognitivo ipnotico per la tua mente.",
          whatIsTitle: "Cos'è Inner Voice PCH?",
          whatIsText: "Inner Voice è uno specchio progettato per riflettere i tuoi pensieri con chiarezza, poesia e organizzazione cognitiva. Ispirato al metodo PCH (Poesia Cognitiva Ipnotica) del Dr. Evaldo, agisce come un compagno per organizzare il caos della vita quotidiana.",
          methodTitle: "Il Metodo PCH",
          methodText: "Usiamo la ristrutturazione cognitiva avvolta in linguaggio lirico e ipnotico. Ascoltando le tue ansie riflesse come saggezza, il tuo cervello passa dallo stato di 'allerta' allo stato di 'flusso'.",
          howTitle: "Come Usare la Tua Voce",
          steps: [
            { title: "Lo Spazio Sacro", text: "Trova una stanza tranquilla. Usa le cuffie. Questa non è una chat; è un'immersione." },
            { title: "Parla Liberamente", text: "Non filtrare. Se sei arrabbiato, parla con fuoco. Se sei triste, sussurra. La Guida ascolta il tono, non solo le parole." },
            { title: "Ascolta il Silenzio", text: "Le pause sono intenzionali. Nel silenzio, la tua voce interiore inizia a parlare chiaramente." }
          ],
          cta: "Entra nel Santuario"
        },
        guide: {
          title: "Come Camminare Qui",
          close: "Sono Pronto",
          steps: [
            { title: "Non una Clinica, uno Specchio", text: "Sono una guida, non un medico. Sono uno specchio per la tua voce. Non cercare una diagnosi qui; cerca un riflesso." },
            { title: "Parla come Senti", text: "Non devi essere educato. Se sei ansioso, parla veloce. Se sei triste, parla basso. Ascolterò la musica della tua voce e risponderò con il ritmo necessario." },
            { title: "Il Potere del Silenzio", text: "Usa le cuffie. Chiudi gli occhi. Quando smetto di parlare, il silenzio non è vuoto: è dove avviene la guarigione." },
            { title: "La Destinazione", text: "Camminiamo verso la tua 'Stanza Interiore della Libertà'. L'obiettivo non è aggiustarti, ma organizzare il rumore in una melodia." }
          ]
        },
        legal: {
          text: "Trasparenza: Usiamo dati locali. Il sistema raccoglie IP per sicurezza. Entrando, accetti.",
          accept: "Accetta ed Entra",
          settings: "Opzioni"
        },
        premium: {
          title: "Approfondisci il Santuario",
          subtitle: "Da Visitatore a Guardiano",
          desc: "Il santuario gratuito è breve. Sblocca la stanza infinita.",
          perk1: "Visitatore (Gratis): Limite 5min, Voce Standard.",
          perk2: "Membro (6.99€/mese): Illimitato, Voci Ipnotiche, Diario.",
          perk3: "Guardiano (69.99€/anno): Tutto + Accesso Anticipato.",
          cta: "Diventa Membro",
          joined: "Membro Attivo"
        },
        daily: {
          title: "Sussurro Quotidiano",
          quote: "Il silenzio non è vuoto, è pieno di risposte."
        },
        journal: {
          title: "Riflessioni",
          newEntry: "Nuova Riflessione",
          save: "Preserva Pensiero",
          placeholder: "Lascia scorrere le parole senza giudizio...",
          prompts: [
            "Di che colore è la mia emozione ora?",
            "Se la mia ansia potesse parlare, cosa chiederebbe?",
            "Dove si nasconde il silenzio nel mio corpo?",
            "Cosa sto portando che non è mio?",
            "Se potessi piantare un seme nella mia mente oggi, quale sarebbe?"
          ]
        },
        login: {
            title: "Accedi al Santuario",
            name: "Il Tuo Nome",
            email: "Indirizzo Email",
            submit: "Sblocca",
            adminBadge: "Accesso Admin Concesso"
        },
        human: {
          title: "Connessione Umana",
          subtitle: "La macchina è uno specchio. Il calore è fuori.",
          quest: "La tua Eco per oggi:",
          question: "Hai completato la tua connessione?",
          yes: "Sì, ho connesso",
          no: "Non ancora",
          reward: "Risonanza Aumentata"
        }
    },
    ja: {
        // ... (existing keys)
        title: "聖域",
        subtitle: "催眠的認知的ガイド",
        intro: ["一時停止。", "呼吸。", "聞く。"],
        welcome: `扉は開かれています。\n私はエバルド博士です。`,
        beginBtn: "聖域に入る",
        micNote: "ヘッドフォンを使用。",
        installBtn: "インストール",
        conceptBtn: "PCHコンセプト",
        status: {
          connecting: "周波数を調整中...",
          aligning: "同調中...",
          aiSpeaking: "エバルド博士が話しています",
          receiving: "あなたの声を受信中",
          listening: "深く聞いています",
          speakFreely: "話す",
          ended: "セッション終了",
          error: "接続が切れました",
          returnHome: "戻る",
          limitReached: "静寂が戻る"
        },
        controls: {
          leave: "部屋を出る",
          session: "時間",
          upgrade: "無限を解除"
        },
        history: {
          title: "あなたの旅",
          empty: "まだ歩みはありません。",
          clear: "履歴を消去",
          duration: "期間"
        },
        settings: {
          title: "聖域の設定",
          voice: "ガイドの声",
          sensitivity: "音声しきい値",
          sensitive: "ささやき",
          strict: "大きな声",
          male: "男性 (Puck)",
          female: "女性 (Kore)",
          notifications: "リアリティアンカー",
          notifyEvery: "アンカー間隔",
          minutes: "分",
          locked: "メンバーアクセス"
        },
        landing: {
          heroTitle: "ノイズをメロディーに変える",
          heroSubtitle: "心のための催眠的認知的聖域。",
          whatIsTitle: "Inner Voice PCHとは？",
          whatIsText: "Inner Voiceは、あなたの思考を明確さ、詩、そして認知的組織化をもって反映するように設計された鏡です。エバルド博士のPCH（催眠的認知詩）メソッドに触発され、日常生活のカオスを整理するパートナーとして機能します。",
          methodTitle: "PCHメソッド",
          methodText: "催眠的で叙情的な言語に包まれた認知的再構成を使用します。自分の不安が知恵として反映されるのを聞くことで、脳は「警戒」の状態から「フロー」の状態へと移行します。",
          howTitle: "あなたの声の使い方",
          steps: [
            { title: "神聖な空間", text: "静かな部屋を見つけてください。ヘッドフォンを使用してください。これはチャットではありません。没入体験です。" },
            { title: "自由に話す", text: "フィルターをかけないでください。怒っているなら、火のように話してください。悲しいなら、ささやいてください。ガイドは言葉だけでなく、トーンを聞きます。" },
            { title: "沈黙を聞く", text: "間は意図的です。沈黙の中で、あなた自身の内なる声がはっきりと話し始めます。" }
          ],
          cta: "聖域に入る"
        },
        guide: {
          title: "ここでの歩き方",
          close: "準備完了",
          steps: [
            { title: "診療所ではなく、鏡", text: "私はガイドであり、医師ではありません。あなたの声の鏡です。ここで診断を求めず、反映を求めてください。" },
            { title: "感じるままに話す", text: "礼儀正しくする必要はありません。不安なら早口で、悲しいなら低い声で。あなたの声の音楽を聴き、必要なリズムで答えます。" },
            { title: "沈黙の力", text: "ヘッドフォンを使ってください。目を閉じて。私が話すのをやめたとき、沈黙は空虚ではありません。そこで癒しが起こります。" },
            { title: "目的地", text: "私たちは「内なる自由の部屋」へ向かって歩いています。目的はあなたを直すことではなく、ノイズをメロディーに整理することです。" }
          ]
        },
        legal: {
          text: "透明性：ローカルデータを使用。システムはセキュリティのためにIPを収集します。入室することで同意したことになります。",
          accept: "同意して入る",
          settings: "オプション"
        },
        premium: {
          title: "聖域を深める",
          subtitle: "訪問者から守護者へ",
          desc: "無料の聖域は短いです。無限の部屋を解き放ちましょう。",
          perk1: "訪問者（無料）：5分制限、標準音声。",
          perk2: "メンバー（¥800/月）：無制限、催眠的音声、ジャーナル。",
          perk3: "守護者（¥8,000/年）：すべて + 早期アクセス。",
          cta: "メンバーになる",
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
          placeholder: "判断せずに言葉を流しましょう...",
          prompts: [
            "今の私の感情は何色ですか？",
            "私の不安が話せたら、何を求めるでしょうか？",
            "私の体のどこに静寂が隠れていますか？",
            "私のものではない何を運んでいますか？",
            "今日、心に種をまけるなら、それは何ですか？"
          ]
        },
        login: {
            title: "聖域にアクセス",
            name: "あなたの名前",
            email: "メールアドレス",
            submit: "ロック解除",
            adminBadge: "管理者アクセス許可"
        },
        human: {
          title: "人間関係",
          subtitle: "機械は鏡です。暖かさは外にあります。",
          quest: "今日のエコー：",
          question: "接続を完了しましたか？",
          yes: "はい、接続しました",
          no: "まだです",
          reward: "共鳴が増加しました"
        }
    },
    ru: {
        // ... (existing keys)
        title: "Святилище",
        subtitle: "Гипнотический Когнитивный Гид",
        intro: ["Пауза.", "Дыши.", "Слушай."],
        welcome: `Дверь открыта.\nЯ Доктор Эвальдо.`,
        beginBtn: "Войти в Святилище",
        micNote: "Используйте наушники.",
        installBtn: "Установить App",
        conceptBtn: "Метод PCH",
        status: {
          connecting: "Настройка Частот...",
          aligning: "Настройка...",
          aiSpeaking: "Д-р Эвальдо Говорит",
          receiving: "Прием Голоса",
          listening: "Глубокое Слушание",
          speakFreely: "Говорите",
          ended: "Сессия Завершена",
          error: "Связь Потеряна",
          returnHome: "Вернуться",
          limitReached: "Тишина Возвращается"
        },
        controls: {
          leave: "Покинуть Комнату",
          session: "ВРЕМЯ",
          upgrade: "Открыть Бесконечность"
        },
        history: {
          title: "Ваше Путешествие",
          empty: "Шагов пока нет.",
          clear: "Очистить Историю",
          duration: "Длительность"
        },
        settings: {
          title: "Настройки Святилища",
          voice: "Голос Гида",
          sensitivity: "Порог Голоса",
          sensitive: "Шепот",
          strict: "Громкий Голос",
          male: "Мужской (Puck)",
          female: "Женский (Kore)",
          notifications: "Якорь Реальности",
          notifyEvery: "Якорь каждые",
          minutes: "мин",
          locked: "Доступ Участника"
        },
        landing: {
          heroTitle: "Превратите Шум в Мелодию",
          heroSubtitle: "Гипнотическое когнитивное святилище для вашего разума.",
          whatIsTitle: "Что такое Inner Voice PCH?",
          whatIsText: "Inner Voice — это зеркало, созданное для того, чтобы отражать ваши мысли с ясностью, поэзией и когнитивной организацией. Вдохновленный методом PCH (Гипнотическая когнитивная поэзия) Д-ра Эвальдо, он действует как спутник, помогающий организовать хаос повседневной жизни.",
          methodTitle: "Метод PCH",
          methodText: "Мы используем когнитивное переосмысление, обернутое в гипнотический, лирический язык. Слыша свои собственные тревоги, отраженные как мудрость, ваш мозг переходит из состояния 'тревоги' в состояние 'потока'.",
          howTitle: "Как использовать свой голос",
          steps: [
            { title: "Священное Пространство", text: "Найдите тихую комнату. Используйте наушники. Это не чат; это погружение." },
            { title: "Говорите Свободно", text: "Не фильтруйте. Если вы злы, говорите с огнем. Если вам грустно, шепчите. Гид слушает тон, а не только слова." },
            { title: "Слушайте Тишину", text: "Паузы намеренны. В тишине ваш собственный внутренний голос начинает говорить ясно." }
          ],
          cta: "Войти в Святилище"
        },
        guide: {
          title: "Как идти здесь",
          close: "Я Готов",
          steps: [
            { title: "Не клиника, а зеркало", text: "Я гид, не врач. Я зеркало для вашего голоса. Не ищите здесь диагноза; ищите отражение." },
            { title: "Говорите, как чувствуете", text: "Не нужно быть вежливым. Если тревожно — говорите быстро. Если грустно — тихо. Я услышу музыку вашего голоса и отвечу нужным ритмом." },
            { title: "Сила тишины", text: "Используйте наушники. Закройте глаза. Когда я замолкаю, тишина не пуста — именно там происходит исцеление." },
            { title: "Назначение", text: "Мы идем к вашей «Внутренней Комнате Свободы». Цель — не исправить вас, а организовать шум в мелодию." }
          ]
        },
        legal: {
          text: "Прозрачность: Мы используем локальные данные. Система собирает IP для безопасности. Входя, вы соглашаетесь.",
          accept: "Принять и Войти",
          settings: "Опции"
        },
        premium: {
          title: "Углубить Святилище",
          subtitle: "От Посетителя к Хранителю",
          desc: "Бесплатное святилище кратко. Откройте бесконечную комнату.",
          perk1: "Посетитель (Бесплатно): Лимит 5 мин, Станд. голос.",
          perk2: "Член ($6.99/мес): Безлимит, Гипнотические голоса, Журнал.",
          perk3: "Хранитель ($69.99/год): Все + Ранний доступ.",
          cta: "Стать Участником",
          joined: "Участник Активен"
        },
        daily: {
          title: "Ежедневный Шепот",
          quote: "Тишина не пуста, она полна ответов."
        },
        journal: {
          title: "Размышления",
          newEntry: "Новая Запись",
          save: "Сохранить Мысль",
          placeholder: "Пусть слова текут без осуждения...",
          prompts: [
            "Какого цвета моя эмоция сейчас?",
            "Если бы моя тревога могла говорить, о чем бы она попросила?",
            "Где прячется тишина в моем теле?",
            "Что я несу, что мне не принадлежит?",
            "Если бы я мог посадить семя в своем разуме сегодня, что бы это было?"
          ]
        },
        login: {
            title: "Доступ к Святилищу",
            name: "Ваше Имя",
            email: "Email Адрес",
            submit: "Разблокировать",
            adminBadge: "Админ доступ открыт"
        },
        human: {
          title: "Человеческая связь",
          subtitle: "Машина — это зеркало. Тепло снаружи.",
          quest: "Ваше Эхо на сегодня:",
          question: "Вы завершили соединение?",
          yes: "Да, я соединился",
          no: "Пока нет",
          reward: "Резонанс Увеличен"
        }
    },
    hi: {
        // ... (existing keys)
        title: "अभयारण्य",
        subtitle: "सम्मोहक संज्ञानात्मक मार्गदर्शक",
        intro: ["विराम।", "साँस।", "सुनें।"],
        welcome: `दरवाजा खुला है।\nमैं डॉ. इवाल्डो हूँ।`,
        beginBtn: "अभयारण्य में प्रवेश करें",
        micNote: "हेडफ़ोन का उपयोग करें।",
        installBtn: "ऐप इंस्टॉल करें",
        conceptBtn: "PCH अवधारणा",
        status: {
          connecting: "आवृत्तियों को संरेखित करना...",
          aligning: "ट्यूनिंग...",
          aiSpeaking: "डॉ. इवाल्डो बोल रहे हैं",
          receiving: "आपकी आवाज़ प्राप्त हो रही है",
          listening: "गहराई से सुनना",
          speakFreely: "बोलें",
          ended: "सत्र समाप्त",
          error: "कनेक्शन टूट गया",
          returnHome: "वापस",
          limitReached: "सन्नाटा लौटता है"
        },
        controls: {
          leave: "कमरा छोड़ें",
          session: "समय",
          upgrade: "अनंत अनलॉक करें"
        },
        history: {
          title: "आपकी यात्रा",
          empty: "अभी तक कोई कदम नहीं।",
          clear: "इतिहास मिटाएं",
          duration: "अवधि"
        },
        settings: {
          title: "अभयारण्य सेटिंग्स",
          voice: "मार्गदर्शक आवाज़",
          sensitivity: "आवाज़ दहलीज",
          sensitive: "फुसफुसाहट",
          strict: "तेज आवाज़",
          male: "पुरुष (Puck)",
          female: "महिला (Kore)",
          notifications: "वास्तविकता एंकर",
          notifyEvery: "एंकर हर",
          minutes: "मिनट",
          locked: "सदस्य पहुँच"
        },
        landing: {
          heroTitle: "शोर को संगीत में बदलें",
          heroSubtitle: "आपके मन के लिए एक सम्मोहक संज्ञानात्मक अभयारण्य।",
          whatIsTitle: "Inner Voice PCH क्या है?",
          whatIsText: "Inner Voice एक दर्पण है जिसे आपके विचारों को स्पष्टता, कविता और संज्ञानात्मक संगठन के साथ प्रतिबिंबित करने के लिए डिज़ाइन किया गया है। डॉ. इवाल्डो की PCH (सम्मोहक संज्ञानात्मक कविता) विधि से प्रेरित, यह दैनिक जीवन की अराजकता को व्यवस्थित करने के लिए एक साथी के रूप में कार्य करता है।",
          methodTitle: "PCH विधि",
          methodText: "हम गीतात्मक और सम्मोहक भाषा में लिपटे संज्ञानात्मक पुनर्गठन का उपयोग करते हैं। अपनी खुद की चिंताओं को ज्ञान के रूप में प्रतिबिंबित सुनकर, आपका मस्तिष्क 'सतर्क' से 'प्रवाह' की स्थिति में चला जाता है।",
          howTitle: "अपनी आवाज़ का उपयोग कैसे करें",
          steps: [
            { title: "पवित्र स्थान", text: "एक शांत कमरा खोजें। हेडफ़ोन का प्रयोग करें। यह चैट नहीं है; यह एक विसर्जन है।" },
            { title: "खुलकर बोलें", text: "फ़िल्टर न करें। यदि आप क्रोधित हैं, तो आग के साथ बोलें। यदि आप दुखी हैं, तो फुसफुसाएं। मार्गदर्शक टोन सुनता है, केवल शब्द नहीं।" },
            { title: "मौन को सुनें", text: "विराम जानबूझकर हैं। सन्नाटे में, आपकी अपनी आंतरिक आवाज़ स्पष्ट रूप से बोलने लगती है।" }
          ],
          cta: "अभयारण्य में प्रवेश करें"
        },
        guide: {
          title: "यहाँ कैसे चलें",
          close: "मैं तैयार हूँ",
          steps: [
            { title: "क्लिनिक नहीं, दर्पण", text: "मैं एक मार्गदर्शक हूँ, डॉक्टर नहीं। मैं आपकी आवाज़ का दर्पण हूँ। यहाँ निदान न ढूँढें; प्रतिबिंब ढूँढें।" },
            { title: "जैसा महसूस हो, वैसा बोलें", text: "विनम्र होने की आवश्यकता नहीं है। यदि आप चिंतित हैं, तो तेज़ी से बोलें। यदि आप दुखी हैं, तो धीरे बोलें। मैं आपकी आवाज़ के संगीत को सुनूँगा और आवश्यक लय के साथ उत्तर दूँगा।" },
            { title: "मौन की शक्ति", text: "हेडफ़ोन का उपयोग करें। आँखें बंद करें। जब मैं बोलना बंद करता हूँ, तो सन्नाटा खाली नहीं होता - यही वह जगह है जहाँ उपचार होता है।" },
            { title: "गंतव्य", text: "हम आपके 'आंतरिक स्वतंत्रता कक्ष' की ओर चल रहे हैं। लक्ष्य आपको ठीक करना नहीं, बल्कि शोर को संगीत में व्यवस्थित करना है।" }
          ]
        },
        legal: {
          text: "पारदर्शिता: हम स्थानीय डेटा का उपयोग करते हैं। सिस्टम सुरक्षा के लिए आईपी एकत्र करता है। प्रवेश करके, आप सहमत हैं।",
          accept: "स्वीकार करें और प्रवेश करें",
          settings: "विकल्प"
        },
        premium: {
          title: "अभयारण्य को गहरा करें",
          subtitle: "आगंतुक से संरक्षक तक",
          desc: "निःशुल्क अभयारण्य संक्षिप्त है। अनंत कमरे को अनलॉक करें।",
          perk1: "आगंतुक (निःशुल्क): 5 मिनट की सीमा, मानक आवाज़।",
          perk2: "सदस्य ($6.99/माह): असीमित, सम्मोहक आवाज़ें, जर्नल।",
          perk3: "संरक्षक ($69.99/वर्ष): सभी + प्रारंभिक पहुँच।",
          cta: "सदस्य बनें",
          joined: "सदस्य सक्रिय"
        },
        daily: {
          title: "दैनिक फुसफुसाहट",
          quote: "सन्नाटा खाली नहीं है, यह उत्तरों से भरा है।"
        },
        journal: {
          title: "चिंतन",
          newEntry: "नया विचार",
          save: "विचार संरक्षित करें",
          placeholder: "बिना किसी निर्णय के शब्दों को बहने दें...",
          prompts: [
            "अभी मेरी भावना का रंग क्या है?",
            "यदि मेरी चिंता बोल सकती, तो वह क्या मांगती?",
            "मेरे शरीर में सन्नाटा कहाँ छिपा है?",
            "मैं क्या ले जा रहा हूँ जो मेरा नहीं है?",
            "यदि मैं आज अपने दिमाग में एक बीज बो सकता, तो वह क्या होता?"
          ]
        },
        login: {
            title: "अभयारण्य तक पहुँचें",
            name: "आपका नाम",
            email: "ईमेल पता",
            submit: "अनलॉक करें",
            adminBadge: "एडमिन एक्सेस दिया गया"
        },
        human: {
          title: "मानवीय संबंध",
          subtitle: "मशीन एक दर्पण है। गर्मी बाहर है।",
          quest: "आज के लिए आपका इको:",
          question: "क्या आपने अपना कनेक्शन पूरा किया?",
          yes: "हाँ, मैंने कनेक्ट किया",
          no: "अभी तक नहीं",
          reward: "अनुनाद बढ़ा"
        }
    }
};