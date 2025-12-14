import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { SessionStatus, Language } from '../types';
import { getSystemInstruction, MODEL_NAME, TRANSLATIONS } from '../constants';
import AudioVisualizer from './AudioVisualizer';

interface SessionManagerProps {
  onDisconnect: () => void;
  lang: Language;
}

// --- Icons ---

const MicIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
  </svg>
);

const MicOffIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-15 15m0-15l15 15m-4.02-3.831a6 6 0 0 0 1.02-3.169v-1.5m-6 7.5a6 6 0 0 1-3.674-.634m9.674.634v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v1.751m-6 10.998v-3m0 0h.01" />
  </svg>
);

const VolumeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
  </svg>
);

const RecordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="8" />
  </svg>
);

const StopRecordIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
);

const ThumbUpIcon = ({ className, filled }: { className?: string, filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.281-.723 3.311.482.3 1.054.485 1.666.485 2.652 0 4.688 2.342 4.07 5.087l-.922 4.15a4.5 4.5 0 0 1-3.648 3.518 7.5 7.5 0 0 1-5.632-.613 2.25 2.25 0 0 1-.952-1.672l-.337-1.352a.75.75 0 0 0-.75-.75h-.375a.75.75 0 0 0-.75.75v3.375a.75.75 0 0 0 .75.75h1.875c.31 0 .616.056.903.159.283.101.558.215.825.34l.278.13c.806.379 1.517 1.037 1.948 1.823.18.328.322.678.418 1.042.062.235.086.478.077.72H5.25a2.25 2.25 0 0 1-2.25-2.25v-8.375a2.25 2.25 0 0 1 2.25-2.25h1.383Z" />
  </svg>
);

const ThumbDownIcon = ({ className, filled }: { className?: string, filled?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25a2.25 2.25 0 0 0 2.25-2.25V4.5a2.25 2.25 0 0 0-2.25-2.25h-1.383a2.25 2.25 0 0 0-2.25 2.25v8.375a2.25 2.25 0 0 0 2.25 2.25Zm0 0-3.75 3.75M4.875 15h-1.875a.75.75 0 0 0-.75.75v3.375a.75.75 0 0 0 .75.75h.375a.75.75 0 0 0 .75-.75l.337-1.352a2.25 2.25 0 0 1 .952-1.672 7.5 7.5 0 0 1 5.632-.613 4.5 4.5 0 0 1 3.648 3.518l.922 4.15a.75.75 0 0 0 1.25.132 4.07 4.07 0 0 0 .285-.503 9.041 9.041 0 0 0 1.08-2.031c.384-.723.956-1.35 1.715-1.653.76-.304 1.348-.917 1.672-1.672.279-.65.503-1.345.613-2.25a2.25 2.25 0 0 0-2.25-2.25h-6.633l.922-4.15a4.5 4.5 0 0 0-3.648-3.518 7.5 7.5 0 0 0-5.632.613 2.25 2.25 0 0 0-.952 1.672l-.337 1.352Z" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
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
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Audio Context Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const outputGainRef = useRef<GainNode | null>(null);
  
  // Recording Refs
  const recordingDestRef = useRef<MediaStreamAudioDestinationNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

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
  
  // Session Refs
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const timerRef = useRef<number>();
  
  // Volume analysis
  const analyserRef = useRef<AnalyserNode | null>(null); // For User Mic
  const aiAnalyserRef = useRef<AnalyserNode | null>(null); // For AI Output
  const animationFrameRef = useRef<number>();

  const text = TRANSLATIONS[lang];

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const cleanupAudio = useCallback(() => {
    stopRecording();
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
  }, [stopRecording]);

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
           console.log("Idle threshold reached. (Text nudge disabled due to API limits)");
           hasTriggeredIdleRef.current = true; // Prevent re-triggering until reset
           
           // session.send disabled
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
  
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
         recordedChunksRef.current = [];
         mediaRecorderRef.current.start();
         setIsRecording(true);
      }
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

      // Create Recording Destination (Mixer for Mic + AI)
      const recordingDest = audioCtx.createMediaStreamDestination();
      recordingDestRef.current = recordingDest;

      // Setup MediaRecorder
      const recorder = new MediaRecorder(recordingDest.stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
        }
      };
      recorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        a.download = `inner-voice-session-${timestamp}.webm`;
        a.click();
        window.URL.revokeObjectURL(url);
      };
      mediaRecorderRef.current = recorder;

      // Output Gain for Volume Control (To Speakers)
      const outputGain = audioCtx.createGain();
      outputGain.gain.value = outputVolumeRef.current; // Use current ref value
      outputGain.connect(audioCtx.destination);
      outputGainRef.current = outputGain;

      // AI Analyser for visualizer
      const aiAnalyser = audioCtx.createAnalyser();
      aiAnalyser.fftSize = 256;
      aiAnalyser.connect(outputGain); // Connect analyser to output gain so it is heard
      // ALSO connect to recording destination
      aiAnalyser.connect(recordingDest);
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

      // Pipe User Input into Recording Destination (Cross-Context requires simple source creation)
      // We create a source in the OUTPUT context for recording purposes only
      const recordingMicSource = audioCtx.createMediaStreamSource(mediaStream);
      recordingMicSource.connect(recordingDest);

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

      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          // Dynamically inject the language requirement into the system prompt
          systemInstruction: getSystemInstruction(lang),
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
              message = "Access Denied: Please check if your API Key supports the selected model.";
            } else if (errMsg.includes('inference') || errMsg.includes('503')) {
              message = "Service Temporarily Unavailable. Please try again later.";
            } else if (errMsg.includes('Network error') || errMsg.includes('fetch')) {
              message = "Network Error: Unable to connect. Please check your internet connection.";
            } else if (errMsg.includes('404') || errMsg.includes('Not Found')) {
               message = "Model Not Found. Please verify API Key access to 'gemini-2.5-flash-native-audio-preview-09-2025'.";
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
        
        if (rms > inputSensitivityRef.current) {
            setIsUserSpeaking(true);
            lastUserActivityRef.current = Date.now();
            hasTriggeredIdleRef.current = false; // Reset idle trigger
        } else {
            setIsUserSpeaking(false);
        }

        // Convert and Send
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
      };
      
      // Animation Loop for Volume Visualizer
      const updateVolume = () => {
        let currentVol = 0;
        
        // Prioritize AI speaking for visualizer if active
        if (isAiSpeakingRef.current && aiAnalyserRef.current) {
             const dataArray = new Uint8Array(aiAnalyserRef.current.frequencyBinCount);
             aiAnalyserRef.current.getByteFrequencyData(dataArray);
             const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
             // AI volume normalization
             currentVol = avg / 100; 
        } 
        // Fallback to User Mic if not muted
        else if (analyserRef.current && !isMicMutedRef.current) {
            const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(dataArray);
            const avg = dataArray.reduce((a, b) => a + b) / dataArray.length;
            // User volume normalization
            currentVol = avg / 128; 
        }
        
        setVolume(currentVol);
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();

    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "Failed to start session.");
      setStatus(SessionStatus.ERROR);
    }
  }, [lang, text.status.error]);

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
        <div className="text-red-300 font-serif text-xl max-w-md">{errorMsg}</div>
        <button 
          onClick={onDisconnect}
          className="px-6 py-2 border border-stone-600 rounded-full hover:bg-stone-800 transition-colors text-stone-300"
        >
          {text.status.returnHome}
        </button>
      </div>
    );
  }

  const isConnecting = status === SessionStatus.CONNECTING;

  // Colors: 
  // AI = Bright Cyan (rgb(34, 211, 238) - cyan-400)
  // User = Muted Stone (rgb(120, 113, 108) - stone-500)
  const visualizerColor = isAiSpeaking ? "rgb(34, 211, 238)" : "rgb(120, 113, 108)";

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full">
      
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-stone-950/80 backdrop-blur-sm p-6 animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 p-8 rounded-2xl max-w-sm text-center space-y-6 shadow-2xl">
            <h3 className="font-serif text-2xl text-stone-200">End Session?</h3>
            <p className="text-sm text-stone-400">Are you sure you want to leave the sanctuary?</p>
            <div className="flex flex-col space-y-3 pt-2">
              <button 
                onClick={handleEndSession}
                className="w-full px-4 py-2 bg-red-900/30 border border-red-900 text-red-300 rounded-lg hover:bg-red-900/50 transition-colors uppercase text-xs tracking-widest"
              >
                Yes, End Session
              </button>
              <button 
                onClick={cancelEndSession}
                className="w-full px-4 py-2 bg-transparent border border-stone-700 text-stone-400 rounded-lg hover:bg-stone-800 transition-colors uppercase text-xs tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (Overlay near bottom) */}
      {showSettings && (
         <div className="absolute bottom-32 bg-stone-900/90 backdrop-blur border border-stone-700 p-4 rounded-xl shadow-2xl z-40 w-64 animate-fade-in mb-2">
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Audio Settings</span>
                    <button onClick={() => setShowSettings(false)} className="text-stone-500 hover:text-stone-300">
                        ✕
                    </button>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-stone-500 block">Voice Sensitivity</label>
                    <input 
                      type="range" 
                      min="0.001" 
                      max="0.1" 
                      step="0.001" 
                      value={inputSensitivity} 
                      onChange={handleSensitivityChange}
                      className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] text-stone-600">
                        <span>Sensitive</span>
                        <span>Loud</span>
                    </div>
                </div>
            </div>
         </div>
      )}

      {/* Session Timer (Top Right) */}
      <div className="absolute top-6 right-6 font-mono text-xs tracking-widest text-stone-500 opacity-80">
        {text.controls.session}: {formatTime(elapsedSeconds)}
      </div>

      {/* Ambient Background Glow for AI */}
      <div 
        className={`absolute inset-0 bg-teal-900/20 transition-opacity duration-1000 pointer-events-none ${isAiSpeaking ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'radial-gradient(circle at center, rgba(45, 212, 191, 0.15) 0%, transparent 70%)' }}
      ></div>
        
      {/* Background Visualizer Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 pointer-events-none">
        <AudioVisualizer 
            volume={volume} 
            isActive={(isUserSpeaking && !isMicMuted) || isAiSpeaking} 
            color={visualizerColor} 
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-2xl px-6">
        
        {/* Status Text Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-4">
                <h2 className={`text-3xl md:text-4xl font-serif transition-all duration-700 
                  ${isConnecting ? 'opacity-50 animate-pulse text-stone-400' : 
                    isAiSpeaking ? 'opacity-100 scale-110 text-teal-200 drop-shadow-[0_0_35px_rgba(45,212,191,0.8)]' : 
                    isMicMuted ? 'opacity-80 text-red-400 tracking-widest' :
                    'opacity-100 text-stone-300'}`}>
                    {isConnecting ? text.status.connecting : 
                     isAiSpeaking ? text.status.aiSpeaking : 
                     isMicMuted ? "MUTED" : 
                     text.status.listening}
                </h2>
                <p className="text-stone-500 font-light text-sm tracking-widest uppercase transition-opacity duration-500">
                    {isConnecting ? text.status.aligning : isAiSpeaking ? text.status.receiving : isMicMuted ? "Microphone Disabled" : text.status.speakFreely}
                </p>
            </div>

            {/* Feedback Actions (Only visible when connected) */}
            {!isConnecting && (
              <div className="flex space-x-6 opacity-0 hover:opacity-100 transition-opacity duration-500 delay-150">
                <button 
                  onClick={() => handleFeedback('up')}
                  className={`p-2 rounded-full border border-stone-800 hover:border-teal-800 transition-colors ${feedback === 'up' ? 'text-teal-400 border-teal-800 bg-teal-900/20' : 'text-stone-600 hover:text-stone-300'}`}
                  title="Helpful"
                >
                  <ThumbUpIcon className="w-5 h-5" filled={feedback === 'up'} />
                </button>
                <button 
                  onClick={() => handleFeedback('down')}
                  className={`p-2 rounded-full border border-stone-800 hover:border-red-900 transition-colors ${feedback === 'down' ? 'text-red-400 border-red-900 bg-red-900/20' : 'text-stone-600 hover:text-stone-300'}`}
                  title="Not helpful"
                >
                  <ThumbDownIcon className="w-5 h-5" filled={feedback === 'down'} />
                </button>
              </div>
            )}
        </div>

        {/* Bottom Control Bar */}
        <div className="w-full pb-12 space-y-8 flex flex-col items-center">
            
            <div className="flex items-center space-x-4 md:space-x-8 bg-stone-900/50 backdrop-blur-md px-6 py-4 rounded-full border border-stone-800/50">
               {/* Mic Toggle */}
               <button 
                 onClick={toggleMic}
                 className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 shadow-lg ${
                    isMicMuted 
                      ? 'bg-red-900/30 text-red-400 border border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.2)]' 
                      : 'bg-stone-800 text-stone-400 border border-stone-700 hover:border-teal-700/50 hover:text-teal-200 hover:shadow-[0_0_15px_rgba(45,212,191,0.1)]'
                 }`}
                 title={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
                 aria-label={isMicMuted ? "Unmute Microphone" : "Mute Microphone"}
               >
                 {isMicMuted ? <MicOffIcon className="w-5 h-5 md:w-6 md:h-6" /> : <MicIcon className="w-5 h-5 md:w-6 md:h-6" />}
               </button>

               <div className="h-6 w-px bg-stone-800"></div>

               {/* Recording Toggle */}
               <button 
                 onClick={toggleRecording}
                 className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 shadow-lg ${
                    isRecording
                      ? 'bg-teal-900/30 text-teal-400 border border-teal-500/50 shadow-[0_0_20px_rgba(45,212,191,0.2)] animate-pulse' 
                      : 'bg-stone-800 text-stone-400 border border-stone-700 hover:border-teal-700/50 hover:text-teal-200'
                 }`}
                 title={isRecording ? "Stop Recording" : "Record Session"}
                 aria-label={isRecording ? "Stop Recording" : "Record Session"}
               >
                 {isRecording ? <StopRecordIcon className="w-5 h-5 md:w-6 md:h-6" /> : <RecordIcon className="w-5 h-5 md:w-6 md:h-6" />}
               </button>

               <div className="h-6 w-px bg-stone-800"></div>
               
               {/* Settings Toggle */}
               <button 
                 onClick={() => setShowSettings(!showSettings)}
                 className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${showSettings ? 'text-teal-400 bg-stone-800' : 'text-stone-500 hover:text-stone-300'}`}
                 title="Audio Settings"
               >
                 <SettingsIcon className="w-5 h-5" />
               </button>

               <div className="h-6 w-px bg-stone-800"></div>

               {/* Volume Slider */}
               <div className="flex items-center space-x-3 w-28 md:w-40">
                 <VolumeIcon className="w-5 h-5 text-stone-500" />
                 <input 
                   type="range" 
                   min="0" 
                   max="1" 
                   step="0.01" 
                   value={outputVolume} 
                   onChange={handleVolumeChange}
                   className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-0"
                 />
               </div>
            </div>

            <button
                onClick={confirmEndSession}
                className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-stone-700 text-stone-400 hover:text-stone-200 transition-colors duration-500"
            >
                <span className="relative z-10 text-xs tracking-[0.2em] uppercase">{text.controls.leave}</span>
                <div className="absolute inset-0 bg-stone-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-30"></div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default SessionManager;