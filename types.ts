export enum SessionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
  ENDED = 'ENDED',
  LIMIT_REACHED = 'LIMIT_REACHED'
}

export interface AudioVolumeState {
  inputVolume: number;
  outputVolume: number;
}

export interface SessionHistoryItem {
  date: string;
  duration: number; // in seconds
}

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ru' | 'hi';

export type UserPlan = 'visitor' | 'member' | 'guardian';