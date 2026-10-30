// Shared constants for Contigo platform
import type { HeatmapKpi } from '@/lib/types';

export const ROLES = [
  { id: 'student', label: 'Student', description: 'Your progress and goals', path: '/student/dashboard' },
  { id: 'teacher', label: 'Teacher', description: 'Your classes and students', path: '/teacher/dashboard' },
  { id: 'admin', label: 'School leader', description: 'Whole-school overview', path: '/admin/dashboard' },
] as const;

export const COLORS = {
  primary: '#F97B4F',
  amber: '#F5C842',
  blue: '#2E6FDF',
  teal: '#3ECFAC',
  red: '#EF4444',
  green: '#10B981',
  purple: '#8B5CF6',
} as const;

export const COLOR_CLASSES = {
  orange: 'text-orange-500',
  amber: 'text-amber-500',
  blue: 'text-blue-600',
  teal: 'text-teal-500',
  red: 'text-red-500',
  green: 'text-green-600',
  purple: 'text-purple-600',
} as const;

export const HEATMAP_KPIS: readonly HeatmapKpi[] = [
  'Speaking',
  'Mood',
  'Engagement',
  'Anxiety',
  'Grade',
];

// KPIs where LOW score = GOOD (color is inverted in heatmap)
export const INVERSE_HEATMAP_KPIS = new Set<HeatmapKpi>(['Anxiety']);

export const GRADE_THRESHOLDS = {
  high: 80,
  medium: 65,
  low: 50,
  atRisk: 60,
} as const;

export const QUICK_REPLIES = [
  'How am I doing this week?',
  'What should I focus on?',
  'Show my best skill',
] as const;

export const APP_CONFIG = {
  name: 'Contigo',
  tagline: 'With you, every step.',
  description: 'Contigo is a Holistic English Language Teaching (ELT) Student Performance Intelligence Platform.',
} as const;
