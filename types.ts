export enum SessionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
  ENDED = 'ENDED'
}

export interface AudioVolumeState {
  inputVolume: number;
  outputVolume: number;
}

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ru' | 'hi';
