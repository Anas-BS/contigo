// Mock data service for development
import type {
  Student,
  Activity,
  ChartDataPoint,
  Seat,
  PlatformStats,
  TopTeacher,
  Alert,
} from '@/lib/types';

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
  { date: 'Mon', mood: 7 },
  { date: 'Tue', mood: 6 },
  { date: 'Wed', mood: 8 },
  { date: 'Thu', mood: 5 },
  { date: 'Fri', mood: 9 },
  { date: 'Sat', mood: 7 },
  { date: 'Sun', mood: 8 },
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
  { label: 'Total Students', value: '342', emoji: '🎓', gradient: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-400/30' },
  { label: 'Active Teachers', value: '18', emoji: '🧑‍🏫', gradient: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-400/30' },
  { label: 'School Average', value: '71%', emoji: '📊', gradient: 'from-teal-500/20 to-teal-600/20', border: 'border-teal-400/30' },
  { label: 'At Risk Students', value: '24', emoji: '⚠️', gradient: 'from-red-500/20 to-red-600/20', border: 'border-red-400/30' },
  { label: 'Average Wellbeing', value: '7.1/10', emoji: '😊', gradient: 'from-amber-500/20 to-amber-600/20', border: 'border-amber-400/30' },
  { label: 'Tigo Sessions', value: '1,204', emoji: '🤖', gradient: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-400/30' },
];

export const MOCK_TOP_TEACHERS: TopTeacher[] = [
  { name: 'Ms. Amina Khalil', class: 'Grade 5A', avg: 82, wellbeing: 8.5 },
  { name: 'Mr. Tariq Nasser', class: 'Grade 3B', avg: 79, wellbeing: 7.8 },
  { name: 'Ms. Rania Farid', class: 'Grade 6A', avg: 77, wellbeing: 8.1 },
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
  { alert: 'Attendance below 80% for 4 students', type: 'attendance', urgency: 'high' },
  { alert: 'Speaking anxiety spike in Grade 6B', type: 'anxiety', urgency: 'medium' },
];
