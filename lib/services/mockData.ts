// Mock data service for development
import type { Student, Activity, ChartDataPoint, Seat, PlatformStats, Alert } from '@/lib/types';

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Sara Ahmed', email: 'sara@example.com', role: 'student', grade: 82, mood: 8, trend: 'up', level: 'B2' },
  { id: '2', name: 'Omar Hassan', email: 'omar@example.com', role: 'student', grade: 75, mood: 7, trend: 'stable', level: 'B1' },
  { id: '3', name: 'Lena Khalil', email: 'lena@example.com', role: 'student', grade: 68, mood: 6, trend: 'down', level: 'B1' },
  { id: '4', name: 'Ali Nasser', email: 'ali@example.com', role: 'student', grade: 91, mood: 9, trend: 'up', level: 'C1' },
  { id: '5', name: 'Fatima Zahra', email: 'fatima@example.com', role: 'student', grade: 55, mood: 5, trend: 'down', level: 'A2' },
  { id: '6', name: 'Hassan Malik', email: 'hassan@example.com', role: 'student', grade: 77, mood: 8, trend: 'up', level: 'B2' },
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: 1, title: 'Completed Speaking Practice', time: '2 hours ago', icon: '🎤' },
  { id: 2, title: 'Improved Listening Score', time: '5 hours ago', icon: '👂' },
  { id: 3, title: 'Vocabulary Quiz: 92%', time: 'Yesterday', icon: '📚' },
  { id: 4, title: 'Attended Live Class', time: '2 days ago', icon: '👥' },
];

export const MOCK_MOOD_DATA: ChartDataPoint[] = [
  { date: 'Mon 3/11', mood: 7 },
  { date: 'Tue 3/12', mood: 6 },
  { date: 'Wed 3/13', mood: 8 },
  { date: 'Thu 3/14', mood: 5 },
  { date: 'Fri 3/15', mood: 9 },
  { date: 'Mon 3/18', mood: 7 },
  { date: 'Tue 3/19', mood: 8 },
];

export const MOCK_SKILLS_DATA: ChartDataPoint[] = [
  { skill: 'Speaking', score: 72 },
  { skill: 'Listening', score: 85 },
  { skill: 'Reading', score: 78 },
  { skill: 'Writing', score: 65 },
  { skill: 'Grammar', score: 80 },
  { skill: 'Vocabulary', score: 88 },
];

export const MOCK_PERFORMANCE_DATA: ChartDataPoint[] = [
  { name: 'Jan', score: 68 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 75 },
  { name: 'Apr', score: 70 },
  { name: 'May', score: 80 },
  { name: 'Jun', score: 85 },
];

export const MOCK_SEATS: Seat[] = [
  { id: 'R1C1', row: 1, col: 1, name: 'Sara A.', score: 82 },
  { id: 'R1C2', row: 1, col: 2, name: 'Omar H.', score: 75 },
  { id: 'R1C3', row: 1, col: 3, name: 'Ali N.', score: 91 },
  { id: 'R1C4', row: 1, col: 4, name: 'Lena K.', score: 68 },
  { id: 'R1C5', row: 1, col: 5, name: 'Fatima Z.', score: 55 },
  { id: 'R1C6', row: 1, col: 6, name: 'Hassan M.', score: 77 },
  { id: 'R2C1', row: 2, col: 1, name: 'Nour S.', score: 70 },
  { id: 'R2C2', row: 2, col: 2, name: 'Karim B.', score: 62 },
  { id: 'R2C3', row: 2, col: 3, name: 'Rania F.', score: 85 },
  { id: 'R2C4', row: 2, col: 4, name: 'Tariq L.', score: 48 },
  { id: 'R2C5', row: 2, col: 5, name: 'Dina M.', score: 79 },
  { id: 'R2C6', row: 2, col: 6, name: 'Youssef K.', score: 73 },
  { id: 'R3C1', row: 3, col: 1, name: 'Mariam T.', score: 41 },
  { id: 'R3C2', row: 3, col: 2, name: 'Khalid A.', score: 38 },
  { id: 'R3C3', row: 3, col: 3, name: 'Sana R.', score: 44 },
  { id: 'R3C4', row: 3, col: 4, name: 'Ahmed W.', score: 35 },
  { id: 'R3C5', row: 3, col: 5, name: 'Layla H.', score: 52 },
  { id: 'R3C6', row: 3, col: 6, name: 'Ismail B.', score: 40 },
];

export const MOCK_PLATFORM_STATS: PlatformStats[] = [
  { label: 'Total Students', value: '342', color: '#F97B4F', emoji: '🎓' },
  { label: 'Active Teachers', value: '18', color: '#2E6FDF', emoji: '🧑‍🏫' },
  { label: 'School Average', value: '71%', color: '#3ECFAC', emoji: '📊' },
  { label: 'At-Risk Students', value: '24', color: '#EF4444', emoji: '⚠️' },
  { label: 'Avg Wellbeing', value: '7.1/10', color: '#F5C842', emoji: '😊' },
  { label: 'Tigo Sessions', value: '1,204', color: '#8B5CF6', emoji: '🤖' },
];

export const MOCK_GRADE_BREAKDOWN: ChartDataPoint[] = [
  { name: 'Grade 1', score: 78 },
  { name: 'Grade 2', score: 72 },
  { name: 'Grade 3', score: 68 },
  { name: 'Grade 4', score: 74 },
  { name: 'Grade 5', score: 71 },
  { name: 'Grade 6', score: 69 },
];

export const MOCK_ALERTS: Alert[] = [
  { alert: '3 students below 40% in Grade 5B', type: 'grade', urgency: 'high' },
  { alert: 'Mood drop detected in Grade 3A this week', type: 'wellbeing', urgency: 'medium' },
  { alert: 'Attendance below 80% — 4 students', type: 'attendance', urgency: 'high' },
  { alert: 'Speaking anxiety spike in Grade 6B', type: 'anxiety', urgency: 'medium' },
];
