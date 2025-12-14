export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

export interface PrayerComment {
  id: string;
  userName: string;
  text: string;
  timestamp: string;
}

export interface Prayer {
  id: string;
  userName: string;
  userInitial: string;
  content: string;
  timestamp: string;
  prayedCount: number;
  commentCount: number;
  isPrayed: boolean;
  category: string;
  comments: PrayerComment[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppScreen {
  SPLASH = 'SPLASH',
  AUTH = 'AUTH',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  CHURCH_CODE = 'CHURCH_CODE',
  DASHBOARD = 'DASHBOARD',
  ADD_CHURCH = 'ADD_CHURCH',
}