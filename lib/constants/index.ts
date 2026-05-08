// Shared constants for Contigo platform

export const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓', path: '/student/dashboard' },
  { id: 'teacher', label: 'Teacher', emoji: '🧑‍🏫', path: '/teacher/dashboard' },
  { id: 'admin', label: 'Admin', emoji: '🏛️', path: '/admin/dashboard' },
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

export const HEATMAP_KPIS = ['Speaking', 'Mood', 'Engagement', 'Anxiety', 'Grade'] as const;

export const QUICK_REPLIES = [
  'How am I doing this week?',
  'What should I focus on?',
  'Show my best skill',
] as const;

export const APP_CONFIG = {
  name: 'Contigo',
  tagline: 'With you, every step.',
  description: 'Contigo is a Holistic English Language Teaching (ELT) Student Performance Intelligence Platform.',
  brandEmoji: '🌟',
  tigoEmoji: '🤖',
} as const;
