// Shared TypeScript types and interfaces for Contigo platform
import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

export interface Student extends User {
  role: 'student';
  grade: number;
  mood: number;
  level: CEFRLevel;
  trend: TrendDirection;
  streak?: number;
  seatId?: string;
}

export interface Teacher extends User {
  role: 'teacher';
  classrooms: string[];
  averageScore?: number;
  wellbeingScore?: number;
}

export interface Admin extends User {
  role: 'admin';
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B1+' | 'B2' | 'C1' | 'C2';
export type TrendDirection = 'up' | 'down' | 'stable';

export interface KPI {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  trend: string;
  trendUp: boolean;
}

export interface Activity {
  id: number;
  title: string;
  time: string;
  icon: string;
}

export interface ChartDataPoint {
  date?: string;
  name?: string;
  score?: number;
  mood?: number;
  skill?: string;
  value?: number;
}

export interface Message {
  role: 'user' | 'tigo';
  text: string;
  timestamp?: Date;
}

export interface Seat {
  id: string;
  row: number;
  col: number;
  name: string;
  score: number;
  studentId?: string;
}

export interface ClassroomStats {
  totalStudents: number;
  classAverage: number;
  atRiskCount: number;
  averageMood: number;
  attendance: number;
}

export interface PlatformStats {
  label: string;
  value: string;
  color: string;
  emoji: string;
}

export interface Alert {
  alert: string;
  type: 'grade' | 'wellbeing' | 'attendance' | 'anxiety';
  urgency: 'high' | 'medium' | 'low';
}
