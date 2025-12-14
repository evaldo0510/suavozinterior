import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SessionStatus, Language, VoiceType } from '../types';
import { getSystemInstruction, MODEL_NAME, TRANSLATIONS, VOICE_IDS } from '../constants';
import AudioVisualizer from './AudioVisualizer';

interface SessionManagerProps {
  onDisconnect: () => void;
  lang: Language;
}

// --- Icons ---

const MicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
  </svg>
);

const MicOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-15 15m0-15l15 15m-4.02-3.831a6 6 0 0 0 1.02-3.169v-1.5m-6 7.5a6 6 0 0 1-3.674-.634m9.674.634v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v1.751m-6 10.998v-3m0 0h.01" />
  </svg>
);

const VolumeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
  </svg>
);

const ThumbUpIcon = ({ className, filled }: { className?: string, filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.281-.723 3.311.482.3 1.054.485 1.666.485 2.652 0 4.688 2.342 4.07 5.087l-.922 4.15a4.5 4.5 0 0 1-3.648 3.518 7.5 7.5 0 0 1-5.632-.613 2.25 2.25 0 0 1-.952-1.672l-.337-1.352a.75.75 0 0 0-.75-.75h-.375a.75.75 0 0 0-.75.75v3.375a.75.75 0 0 0 .75.75h1.875c.31 0 .616.056.903.159.283.101.558.215.825.34l.278.13c.806.379 1.517 1.037 1.948 1.823.18.328.322.678.418 1.042.062.235.086.478.077.72H5.25a2.25 2.25 0 0 1-2.25-2.25v-8.375a2.25 2.25 0 0 1 2.25-2.25h1.383Z" />
  </svg>
);

const ThumbDownIcon = ({ className, filled }: { className?: string, filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25a2.25 2.25 0 0 0 2.25-2.25V4.5a2.25 2.25 0 0 0-2.25-2.25h-1.383a2.25 2.25 0 0 0-2.25 2.25v8.375a2.25 2.25 0 0 0 2.25 2.25Zm0 0-3.75 3.75M4.875 15h-1.875a.75.75 0 0 0-.75.75v3.375a.75.75 0 0 0 .75.75h.375a.75.75 0 0 0 .75-.75l.337-1.352a2.25 2.25 0 0 1 .952-1.672 7.5 7.5 0 0 1 5.632-.613 4.5 4.5 0 0 1 3.648 3.518l.922 4.15a.75.75 0 0 0 1.25.132 4.07 4.07 0 0 0 .285-.503 9.041 9.041 0 0 0 1.08-2.031c.384-.723.956-1.35 1.715-1.653.76-.304 1.348-.917 1.672-1.672.279-.65.503-1.345.613-2.25a2.25 2.25 0 0 0-2.25-2.25h-6.633l.922-4.15a4.5 4.5 0 0 0-3.648-3.518 7.5 7.5 0 0 0-5.632.613 2.25 2.25 0 0 0-.952 1.672l-.337 1.352Z" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg>
);


// --- Audio Helpers ---

function floatTo16BitPCM(float32Array: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Array.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Array.length; i++) {
    let s = Math.max(-1, Math.min(1, float32Array[i]));
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
  return buffer;
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const IDLE_THRESHOLD_MS = 30000; // 30 seconds

const SessionManager: React.FC<SessionManagerProps> = ({ onDisconnect, lang }) => {
  const [status, setStatus] = useState<SessionStatus>(SessionStatus.CONNECTING);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [volume, setVolume] = useState(0);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  
  // New features state
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [outputVolume, setOutputVolume] = useState(0.8);
  const [inputSensitivity, setInputSensitivity] = useState(0.02);
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>('female'); // Default to female (Kore)
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Notification State
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationInterval, setNotificationInterval] = useState(60); // minutes
  const notificationTimerRef = useRef<number | undefined>(undefined);

  // UI meter state
  const [inputLevel, setInputLevel] = useState(0);

  // Audio Context Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const outputGainRef = useRef<GainNode | null>(null);
  
  // Idle Detection Refs
  const lastUserActivityRef = useRef<number>(Date.now());
  const idleCheckIntervalRef = useRef<number | undefined>(undefined);
  const hasTriggeredIdleRef = useRef<boolean>(false);
  
  // Audio state refs to access in loops
  const isMicMutedRef = useRef(false); 
  const outputVolumeRef = useRef(0.8);
  const inputSensitivityRef = useRef(0.02);
  const isAiSpeakingRef = useRef(false);
  const hasErrorRef = useRef(false);
  const currentRmsRef = useRef(0);
  const silenceFramesRef = useRef(0);
  
  // Session Refs
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const timerRef = useRef<number>();
  
  // Volume analysis
  const analyserRef = useRef<AnalyserNode | null>(null); // For User Mic
  const aiAnalyserRef = useRef<AnalyserNode | null>(null); // For AI Output
  const animationFrameRef = useRef<number>();

  const text = TRANSLATIONS[lang];

  const cleanupAudio = useCallback(() => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (inputSourceRef.current) {
      inputSourceRef.current.disconnect();
      inputSourceRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (aiAnalyserRef.current) {
      aiAnalyserRef.current.disconnect();
      aiAnalyserRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (idleCheckIntervalRef.current) {
      clearInterval(idleCheckIntervalRef.current);
    }
    if (notificationTimerRef.current) {
      clearInterval(notificationTimerRef.current);
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    if (status === SessionStatus.CONNECTED) {
      const startTime = Date.now();
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      
      // Start idle check loop
      lastUserActivityRef.current = Date.now();
      idleCheckIntervalRef.current = window.setInterval(() => {
        const timeSinceActivity = Date.now() - lastUserActivityRef.current;
        
        // If idle for > 30s AND not currently having AI speak AND haven't already triggered for this specific idle period
        if (timeSinceActivity > IDLE_THRESHOLD_MS && !isAiSpeakingRef.current && !hasTriggeredIdleRef.current) {
           console.log("Idle threshold reached.");
           hasTriggeredIdleRef.current = true; // Prevent re-triggering until reset
           // Logic to gently nudge could go here if implementing proactive AI speech
        }
      }, 1000);

    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (idleCheckIntervalRef.current) clearInterval(idleCheckIntervalRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (idleCheckIntervalRef.current) clearInterval(idleCheckIntervalRef.current);
    };
  }, [status]);

  // Notifications Effect
  useEffect(() => {
    if (notificationsEnabled) {
      // Clear existing interval
      if (notificationTimerRef.current) clearInterval(notificationTimerRef.current);
      
      // Set new interval
      const ms = notificationInterval * 60 * 1000;
      notificationTimerRef.current = window.setInterval(() => {
         if (Notification.permission === 'granted') {
             new Notification('Inner Voice PCH', {
                 body: "The sanctuary is open. It is time to return.",
                 icon: '/favicon.ico' 
             });
         }
      }, ms);
    } else {
       if (notificationTimerRef.current) clearInterval(notificationTimerRef.current);
    }
    return () => {
        if (notificationTimerRef.current) clearInterval(notificationTimerRef.current);
    }
  }, [notificationsEnabled, notificationInterval]);

  // Settings Meter Effect
  useEffect(() => {
    let frameId: number;
    const updateMeter = () => {
        if (showSettings) {
            // Smooth decay for visual
            setInputLevel(prev => {
                const curr = currentRmsRef.current;
                // Attack fast, decay slow
                return curr > prev ? curr : prev * 0.9;
            });
            frameId = requestAnimationFrame(updateMeter);
        }
    };
    if (showSettings) {
        updateMeter();
    }
    return () => cancelAnimationFrame(frameId);
  }, [showSettings]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setOutputVolume(val);
    outputVolumeRef.current = val;
    if (outputGainRef.current && audioContextRef.current) {
      // Smooth audio transition over 0.1 seconds to prevent clicks
      outputGainRef.current.gain.setTargetAtTime(val, audioContextRef.current.currentTime, 0.1);
    }
  };

  const handleSensitivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setInputSensitivity(val);
    inputSensitivityRef.current = val;
  };
  
  const handleVoiceChange = (voice: VoiceType) => {
    setSelectedVoice(voice);
  };
  
  const handleNotificationToggle = async () => {
      if (!notificationsEnabled) {
          const perm = await Notification.requestPermission();
          if (perm === 'granted') {
              setNotificationsEnabled(true);
          } else {
              alert("Notifications blocked. Please enable them in your browser settings.");
          }
      } else {
          setNotificationsEnabled(false);
      }
  };

  const toggleMic = () => {
    const newState = !isMicMuted;
    setIsMicMuted(newState);
    isMicMutedRef.current = newState;
    
    // Also toggle the actual media track enabled state
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !newState;
      });
    }
  };
  
  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    setTimeout(() => setFeedback(null), 2000); 
  };

  const connectToGemini = useCallback(async () => {
    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key not found in environment (Vercel). Please check Project Settings.");
      }

      setStatus(SessionStatus.CONNECTING);
      hasErrorRef.current = false;
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initialize Audio Contexts
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = audioCtx;

      // Output Gain for Volume Control (To Speakers)
      const outputGain = audioCtx.createGain();
      outputGain.gain.value = outputVolumeRef.current; // Use current ref value
      outputGain.connect(audioCtx.destination);
      outputGainRef.current = outputGain;

      // AI Analyser for visualizer
      const aiAnalyser = audioCtx.createAnalyser();
      aiAnalyser.fftSize = 256;
      aiAnalyser.connect(outputGain); // Connect analyser to output gain so it is heard
      aiAnalyserRef.current = aiAnalyser;

      // Prepare Input Stream (Microphone) with Error Handling
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err: any) {
        if (err.name === 'NotAllowedError' || err.message.includes('Permission denied')) {
            throw new Error("Microphone access denied. Please allow microphone permissions in your browser settings to continue.");
        }
        throw err;
      }
      
      streamRef.current = mediaStream;

      // Ensure mute state is applied if reconnecting
      mediaStream.getAudioTracks().forEach(track => {
        track.enabled = !isMicMutedRef.current;
      });

      // User Input Source (for processing/sending)
      const source = inputCtx.createMediaStreamSource(mediaStream);
      inputSourceRef.current = source;

      // Visualizer Analyser for User
      const analyser = inputCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Audio Processor for sending data
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(inputCtx.destination);

      // --- TIME & CONTEXT INJECTION ---
      const currentTime = new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });

      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            // Dynamically select voice based on state
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_IDS[selectedVoice] } },
          },
          // Dynamically inject the language AND TIME into the system prompt
          systemInstruction: getSystemInstruction(lang, currentTime),
        },
        callbacks: {
          onopen: () => {
            setStatus(SessionStatus.CONNECTED);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setIsAiSpeaking(true);
              isAiSpeakingRef.current = true;
              
              const audioData = base64ToUint8Array(base64Audio);
              const int16Array = new Int16Array(audioData.buffer);
              const float32Output = new Float32Array(int16Array.length);
              for(let i=0; i<int16Array.length; i++) {
                float32Output[i] = int16Array[i] / 32768.0;
              }

              const buffer = audioCtx.createBuffer(1, float32Output.length, 24000);
              buffer.getChannelData(0).set(float32Output);

              const sourceNode = audioCtx.createBufferSource();
              sourceNode.buffer = buffer;
              // Connect source -> AI Analyser -> Output Gain/Recording
              sourceNode.connect(aiAnalyser);

              const now = audioCtx.currentTime;
              const startTime = Math.max(now, nextStartTimeRef.current);
              sourceNode.start(startTime);
              nextStartTimeRef.current = startTime + buffer.duration;
              
              sourceNode.onended = () => {
                 if (audioCtx.currentTime >= nextStartTimeRef.current - 0.1) {
                    setIsAiSpeaking(false);
                    isAiSpeakingRef.current = false;
                 }
              };
            }
          },
          onclose: () => {
            // Only set to ENDED if we haven't already hit an error
            if (!hasErrorRef.current) {
               setStatus(SessionStatus.ENDED);
            }
          },
          onerror: (err) => {
            console.error("Gemini Live API Error:", err);
            hasErrorRef.current = true;
            let message = text.status.error;
            const errMsg = err.message || '';
            
            if (errMsg.includes('Permission denied') || errMsg.includes('403')) {
              message = "Access Denied.";
            } else if (errMsg.includes('inference') || errMsg.includes('503')) {
              message = "Service Unavailable.";
            } else if (errMsg.includes('Network error') || errMsg.includes('fetch')) {
              message = "Network Error.";
            } else if (errMsg.includes('404') || errMsg.includes('Not Found')) {
               message = "Model Not Found.";
            }
            setErrorMsg(message);
            setStatus(SessionStatus.ERROR);
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

      // Handle Input Processing
      processor.onaudioprocess = (e) => {
        // If Mic is muted, do not process or send audio
        if (isMicMutedRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        
        // Calculate volume for thresholding
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) {
            sum += inputData[i] * inputData[i];
        }
        const rms = Math.sqrt(sum / inputData.length);
        currentRmsRef.current = rms;
        
        const isAboveThreshold = rms > inputSensitivityRef.current;
        
        if (isAboveThreshold) {
            setIsUserSpeaking(true);
            lastUserActivityRef.current = Date.now();
            hasTriggeredIdleRef.current = false; // Reset idle trigger
            silenceFramesRef.current = 0;
        } else {
            setIsUserSpeaking(false);
            silenceFramesRef.current++;
        }

        if (isAboveThreshold || silenceFramesRef.current <= 4) {
            const pcm16 = floatTo16BitPCM(inputData);
            const base64Str = btoa(
                new Uint8Array(pcm16).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            sessionPromise.then(session => {
                session.sendRealtimeInput({
                    media: {
                        mimeType: 'audio/pcm;rate=16000',
                        data: base64Str
                    }
                });
            });
        }
      };
      
      // Animation Loop for Volume Visualizer
      const updateVolume = () => {
        let currentVol = 0;
        if (isAiSpeakingRef.current && aiAnalyserRef.current) {
             const dataArray = new Uint8Array(aiAnalyserRef.current.frequencyBinCount);
             aiAnalyserRef.current.getByteFrequencyData(dataArray);
             const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
             currentVol = avg / 100; 
        } else if (analyserRef.current && !isMicMutedRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
            currentVol = avg / 128; 
        }
        setVolume(currentVol);
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "Failed.");
      setStatus(SessionStatus.ERROR);
    }
  }, [lang, selectedVoice, text.status.error]);

  useEffect(() => {
    connectToGemini();
    return () => {
      cleanupAudio();
    };
  }, [connectToGemini, cleanupAudio]);

  const confirmEndSession = () => {
    setShowExitConfirm(true);
  };
  
  const cancelEndSession = () => {
    setShowExitConfirm(false);
  };

  const handleEndSession = () => {
    setShowExitConfirm(false);
    
    // Save session history
    const historyItem = {
      date: new Date().toISOString(),
      duration: elapsedSeconds
    };
    try {
      const existingHistory = JSON.parse(localStorage.getItem('pch_session_history') || '[]');
      localStorage.setItem('pch_session_history', JSON.stringify([historyItem, ...existingHistory].slice(0, 50))); // Keep last 50
    } catch (e) {
      console.error("Failed to save history", e);
    }

    if (sessionPromiseRef.current) {
        sessionPromiseRef.current.then(s => {
             // @ts-ignore
             if(s.close) s.close();
        });
    }
    cleanupAudio();
    onDisconnect();
  };

  if (status === SessionStatus.ERROR) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in p-8">
        <div className="text-stone-400 font-serif text-lg">{errorMsg}</div>
        <button 
          onClick={onDisconnect}
          className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-300 transition-colors border-b border-transparent hover:border-stone-500"
        >
          {text.status.returnHome}
        </button>
      </div>
    );
  }

  const isConnecting = status === SessionStatus.CONNECTING;
  const visualizerColor = isAiSpeaking ? "rgb(34, 211, 238)" : "rgb(120, 113, 108)";

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-fade-in">
          <div className="bg-transparent text-center space-y-8">
            <h3 className="font-serif text-2xl text-stone-300">Leave Sanctuary?</h3>
            <div className="flex flex-col space-y-4">
              <button 
                onClick={handleEndSession}
                className="text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-red-400 transition-colors"
              >
                Yes
              </button>
              <button 
                onClick={cancelEndSession}
                className="text-xs uppercase tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (Clean) */}
      {showSettings && (
         <div className="absolute bottom-28 bg-stone-950/90 backdrop-blur border border-stone-800 p-6 rounded-none z-40 w-72 animate-fade-in mb-2 shadow-2xl">
            <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">{text.settings?.title}</span>
                    <button onClick={() => setShowSettings(false)} className="text-stone-600 hover:text-stone-300">
                        ✕
                    </button>
                </div>
                
                {/* Voice */}
                <div className="space-y-3 pb-4 border-b border-stone-800/50">
                    <label className="text-[10px] text-stone-600 block uppercase tracking-wider">{text.settings?.voice}</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                         onClick={() => handleVoiceChange('female')}
                         className={`text-[10px] py-2 border transition-colors ${selectedVoice === 'female' ? 'bg-stone-800 border-stone-600 text-stone-300' : 'bg-transparent border-stone-800 text-stone-600 hover:text-stone-400'}`}
                      >
                         {text.settings?.female}
                      </button>
                      <button 
                         onClick={() => handleVoiceChange('male')}
                         className={`text-[10px] py-2 border transition-colors ${selectedVoice === 'male' ? 'bg-stone-800 border-stone-600 text-stone-300' : 'bg-transparent border-stone-800 text-stone-600 hover:text-stone-400'}`}
                      >
                         {text.settings?.male}
                      </button>
                    </div>
                </div>

                {/* Notifications (Grandmother Mode) */}
                 <div className="space-y-3 pb-4 border-b border-stone-800/50">
                     <div className="flex justify-between items-center">
                         <label className="text-[10px] text-stone-600 block uppercase tracking-wider">{text.settings?.notifications}</label>
                         <button 
                           onClick={handleNotificationToggle}
                           className={`w-8 h-4 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-teal-900' : 'bg-stone-800'}`}
                         >
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-stone-400 transition-all ${notificationsEnabled ? 'left-4 bg-teal-400' : 'left-0.5'}`}></div>
                         </button>
                     </div>
                     
                     {notificationsEnabled && (
                         <div className="flex items-center space-x-2 text-[10px] text-stone-500">
                            <span>{text.settings?.notifyEvery}</span>
                            <input 
                              type="number" 
                              min="10" 
                              max="120"
                              value={notificationInterval}
                              onChange={(e) => setNotificationInterval(Math.max(10, parseInt(e.target.value)))}
                              className="bg-stone-900 border border-stone-800 w-12 text-center py-1 rounded"
                            />
                            <span>{text.settings?.minutes}</span>
                         </div>
                     )}
                 </div>

                {/* Sensitivity */}
                <div className="space-y-3">
                    <label className="text-[10px] text-stone-600 block uppercase tracking-wider">{text.settings?.sensitivity}</label>
                    <div className="h-0.5 w-full bg-stone-800 relative">
                        <div 
                          className="absolute top-0 bottom-0 left-0 bg-stone-500 transition-all duration-75" 
                          style={{ width: `${Math.min(100, (inputLevel / 0.1) * 100)}%` }} 
                        />
                        <div 
                          className="absolute -top-1 bottom-0 w-0.5 h-2.5 bg-teal-500/50 z-10" 
                          style={{ left: `${Math.min(100, (inputSensitivity / 0.1) * 100)}%` }} 
                        />
                    </div>
                    
                    <input 
                      type="range" 
                      min="0.001" 
                      max="0.1" 
                      step="0.001" 
                      value={inputSensitivity} 
                      onChange={handleSensitivityChange}
                      className="w-full h-1 bg-transparent appearance-none cursor-pointer accent-stone-500 focus:outline-none"
                    />
                </div>
            </div>
         </div>
      )}

      {/* Session Timer (Very subtle) */}
      <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest text-stone-700 opacity-40 hover:opacity-100 transition-opacity">
        {text.controls.session} {formatTime(elapsedSeconds)}
      </div>

      {/* Background Visualizer Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60 pointer-events-none">
        <AudioVisualizer 
            volume={volume} 
            isActive={(isUserSpeaking && !isMicMuted) || isAiSpeaking} 
            color={visualizerColor} 
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-2xl px-6">
        
        {/* Simplified Status Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
            {isConnecting ? (
               <div className="text-stone-600 text-xs tracking-[0.3em] uppercase animate-pulse">{text.status.connecting}</div>
            ) : (
               <div className="h-8"></div> // Spacer to keep layout stable
            )}
        </div>

        {/* Bottom Control Bar - Auto fade */}
        <div className="w-full pb-12 flex flex-col items-center space-y-8 group transition-opacity duration-500 opacity-40 hover:opacity-100">
            
            {/* Main Controls */}
            <div className="flex items-center space-x-6">
               
               {/* Settings (Hidden unless hovered/active) */}
               <button 
                 onClick={() => setShowSettings(!showSettings)}
                 className={`transition-colors ${showSettings ? 'text-stone-300' : 'text-stone-700 hover:text-stone-500'}`}
               >
                 <SettingsIcon className="w-4 h-4" />
               </button>

               {/* Mic Toggle */}
               <button 
                 onClick={toggleMic}
                 className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-500 ${
                    isMicMuted 
                      ? 'border-red-900/50 text-red-900' 
                      : 'border-stone-800 text-stone-500 hover:border-stone-600 hover:text-stone-300'
                 }`}
               >
                 {isMicMuted ? <MicOffIcon className="w-5 h-5" /> : <MicIcon className="w-5 h-5" />}
               </button>

               {/* Volume Slider */}
               <div className="flex items-center space-x-2 w-20">
                 <VolumeIcon className="w-3 h-3 text-stone-700" />
                 <input 
                   type="range" 
                   min="0" 
                   max="1" 
                   step="0.01" 
                   value={outputVolume} 
                   onChange={handleVolumeChange}
                   className="w-full h-0.5 bg-stone-800 appearance-none cursor-pointer accent-stone-500"
                 />
               </div>

               {/* Feedback (Small) */}
               <div className="flex space-x-2 pl-4 border-l border-stone-900">
                 <button onClick={() => handleFeedback('up')} className={`text-stone-700 hover:text-teal-700 ${feedback === 'up' ? 'text-teal-600' : ''}`}>
                    <ThumbUpIcon className="w-3 h-3" filled={feedback === 'up'} />
                 </button>
                 <button onClick={() => handleFeedback('down')} className={`text-stone-700 hover:text-red-900 ${feedback === 'down' ? 'text-red-800' : ''}`}>
                    <ThumbDownIcon className="w-3 h-3" filled={feedback === 'down'} />
                 </button>
               </div>

            </div>

            {/* Leave Button */}
            <button
                onClick={confirmEndSession}
                className="text-[10px] tracking-[0.3em] uppercase text-stone-700 hover:text-stone-400 transition-colors"
            >
                {text.controls.leave}
            </button>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;