export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  nickname?: string;
  role: Role;
  stars: number;
}

export interface DiaryEntry {
  id: string;
  date: string;
  text: string;
  mood: string;
  aiResponse?: string;
}

export interface Appointment {
  id: string;
  studentName: string;
  date: string;
  reason: string;
  status: 'pending' | 'approved' | 'completed';
  teacherNote?: string;
}

export interface EmotionStat {
  name: string;
  value: number;
  color: string;
}

export const MOCK_STUDENTS: User[] = [
  { id: '1', name: 'น้องฟ้า (Fah)', role: 'student', stars: 12 },
  { id: '2', name: 'น้องวิน (Win)', role: 'student', stars: 8 },
  { id: '3', name: 'น้องแก้ม (Gam)', role: 'student', stars: 15 },
];