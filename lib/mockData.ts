export interface Student {
  id: string
  name: string
  cefr: string
  cefrProgress: number
  mood: number
  anxiety: number
  confidence: number
  speaking: number
  listening: number
  reading: number
  writing: number
  grammar: number
  vocabulary: number
  attendance: number
  atRisk: boolean
  riskLevel: 'high' | 'medium' | 'low'
  teacher: string
  seat: string
}

export interface Teacher {
  id: string
  name: string
  qualification: string
  tlPercent: number
  wellbeing: number
  classAvg: number
  yearsExp: number
  classes: string[]
  studentsCount: number
}

export interface CEFRTimelinePoint {
  month: string
  level: string
  score: number
}

export interface CorrelationDataPoint {
  variable: string
  mood: number
  speaking: number
  attendance: number
  grammar: number
  tlPercent: number
  classSize: number
}

export interface TimeSlotPerformance {
  slot: string
  score: number
}

export const students: Student[] = [
  { 
    id: 'S001', 
    name: 'Hassan Al-Rashid', 
    cefr: 'B1', 
    cefrProgress: 45, 
    mood: 6, 
    anxiety: 7, 
    confidence: 5, 
    speaking: 62, 
    listening: 71, 
    reading: 68, 
    writing: 55, 
    grammar: 60, 
    vocabulary: 65, 
    attendance: 72, 
    atRisk: true, 
    riskLevel: 'high', 
    teacher: 'T001', 
    seat: 'R3C4' 
  },
  { 
    id: 'S002', 
    name: 'Sara Benali', 
    cefr: 'B1', 
    cefrProgress: 78, 
    mood: 8, 
    anxiety: 4, 
    confidence: 8, 
    speaking: 74, 
    listening: 80, 
    reading: 77, 
    writing: 70, 
    grammar: 72, 
    vocabulary: 75, 
    attendance: 95, 
    atRisk: false, 
    riskLevel: 'low', 
    teacher: 'T001', 
    seat: 'R1C2' 
  },
  { 
    id: 'S003', 
    name: 'Omar Khalil', 
    cefr: 'B2', 
    cefrProgress: 30, 
    mood: 7, 
    anxiety: 3, 
    confidence: 9, 
    speaking: 85, 
    listening: 88, 
    reading: 82, 
    writing: 79, 
    grammar: 84, 
    vocabulary: 87, 
    attendance: 98, 
    atRisk: false, 
    riskLevel: 'low', 
    teacher: 'T001', 
    seat: 'R1C3' 
  },
  { 
    id: 'S004', 
    name: 'Lena Mostafa', 
    cefr: 'A2', 
    cefrProgress: 85, 
    mood: 5, 
    anxiety: 8, 
    confidence: 4, 
    speaking: 45, 
    listening: 52, 
    reading: 58, 
    writing: 42, 
    grammar: 48, 
    vocabulary: 50, 
    attendance: 80, 
    atRisk: true, 
    riskLevel: 'medium', 
    teacher: 'T001', 
    seat: 'R2C1' 
  },
  { 
    id: 'S005', 
    name: 'Ahmed Farouq', 
    cefr: 'B1', 
    cefrProgress: 55, 
    mood: 7, 
    anxiety: 5, 
    confidence: 7, 
    speaking: 66, 
    listening: 70, 
    reading: 64, 
    writing: 60, 
    grammar: 63, 
    vocabulary: 68, 
    attendance: 90, 
    atRisk: false, 
    riskLevel: 'low', 
    teacher: 'T001', 
    seat: 'R1C1' 
  },
  { 
    id: 'S006', 
    name: 'Nour Haddad', 
    cefr: 'A2', 
    cefrProgress: 60, 
    mood: 6, 
    anxiety: 6, 
    confidence: 6, 
    speaking: 50, 
    listening: 58, 
    reading: 55, 
    writing: 48, 
    grammar: 52, 
    vocabulary: 54, 
    attendance: 85, 
    atRisk: true, 
    riskLevel: 'medium', 
    teacher: 'T002', 
    seat: 'R2C2' 
  },
  { 
    id: 'S007', 
    name: 'Yasmin Ibrahim', 
    cefr: 'B2', 
    cefrProgress: 65, 
    mood: 9, 
    anxiety: 2, 
    confidence: 9, 
    speaking: 88, 
    listening: 90, 
    reading: 85, 
    writing: 82, 
    grammar: 86, 
    vocabulary: 89, 
    attendance: 100, 
    atRisk: false, 
    riskLevel: 'low', 
    teacher: 'T001', 
    seat: 'R1C4' 
  },
  { 
    id: 'S008', 
    name: 'Karim Zaki', 
    cefr: 'A2', 
    cefrProgress: 40, 
    mood: 4, 
    anxiety: 9, 
    confidence: 3, 
    speaking: 38, 
    listening: 45, 
    reading: 42, 
    writing: 35, 
    grammar: 40, 
    vocabulary: 43, 
    attendance: 65, 
    atRisk: true, 
    riskLevel: 'high', 
    teacher: 'T002', 
    seat: 'R3C1' 
  },
  { 
    id: 'S009', 
    name: 'Fatima Nasser', 
    cefr: 'B1', 
    cefrProgress: 70, 
    mood: 8, 
    anxiety: 4, 
    confidence: 8, 
    speaking: 72, 
    listening: 76, 
    reading: 74, 
    writing: 68, 
    grammar: 70, 
    vocabulary: 73, 
    attendance: 92, 
    atRisk: false, 
    riskLevel: 'low', 
    teacher: 'T001', 
    seat: 'R2C3' 
  },
  { 
    id: 'S010', 
    name: 'Malik Hassan', 
    cefr: 'B1', 
    cefrProgress: 50, 
    mood: 7, 
    anxiety: 5, 
    confidence: 7, 
    speaking: 64, 
    listening: 68, 
    reading: 66, 
    writing: 62, 
    grammar: 65, 
    vocabulary: 67, 
    attendance: 88, 
    atRisk: false, 
    riskLevel: 'low', 
    teacher: 'T002', 
    seat: 'R2C4' 
  },
]

export const teachers: Teacher[] = [
  { 
    id: 'T001', 
    name: 'Amina Okafor', 
    qualification: 'DELTA', 
    tlPercent: 98, 
    wellbeing: 8, 
    classAvg: 74, 
    yearsExp: 8, 
    classes: ['Grade 5B', 'Grade 6A'], 
    studentsCount: 32 
  },
  { 
    id: 'T002', 
    name: 'James Hartley', 
    qualification: 'CELTA', 
    tlPercent: 85, 
    wellbeing: 6, 
    classAvg: 65, 
    yearsExp: 3, 
    classes: ['Grade 4A', 'Grade 4B'], 
    studentsCount: 28 
  },
]

export const cefrTimeline: CEFRTimelinePoint[] = [
  { month: 'Sep', level: 'A2', score: 42 },
  { month: 'Oct', level: 'A2', score: 48 },
  { month: 'Nov', level: 'A2+', score: 55 },
  { month: 'Dec', level: 'B1', score: 61 },
  { month: 'Jan', level: 'B1', score: 65 },
  { month: 'Feb', level: 'B1', score: 70 },
  { month: 'Mar', level: 'B1+', score: 74 },
]

export const correlationData: CorrelationDataPoint[] = [
  { variable: 'Mood Score', mood: 1.0, speaking: 0.72, attendance: 0.65, grammar: 0.48, tlPercent: 0.55, classSize: -0.38 },
  { variable: 'Speaking Score', mood: 0.72, speaking: 1.0, attendance: 0.70, grammar: 0.81, tlPercent: 0.68, classSize: -0.45 },
  { variable: 'Attendance', mood: 0.65, speaking: 0.70, attendance: 1.0, grammar: 0.75, tlPercent: 0.50, classSize: -0.30 },
  { variable: 'Grammar', mood: 0.48, speaking: 0.81, attendance: 0.75, grammar: 1.0, tlPercent: 0.72, classSize: -0.40 },
  { variable: 'TL%', mood: 0.55, speaking: 0.68, attendance: 0.50, grammar: 0.72, tlPercent: 1.0, classSize: -0.25 },
  { variable: 'Class Size', mood: -0.38, speaking: -0.45, attendance: -0.30, grammar: -0.40, tlPercent: -0.25, classSize: 1.0 },
]

export const timeSlotPerformance: TimeSlotPerformance[] = [
  { slot: '8–9am', score: 74 },
  { slot: '9–10am', score: 78 },
  { slot: '10–11am', score: 82 },
  { slot: '11–12pm', score: 76 },
  { slot: '1–2pm', score: 68 },
  { slot: '2–3pm', score: 63 },
  { slot: '3–4pm', score: 59 },
]

export const tigoResponses: Record<string, string> = {
  "Which student needs the most support?": "Hassan Al-Rashid shows the highest risk signals: attendance dropped to 72%, mood score is 6/10 and declining, and his speaking score (62) is 12 points below class average. I'd recommend a 1-on-1 check-in this week. 🔴",
  "What's the best time for speaking lessons?": "Based on your class data, 10–11am slots show 22% higher speaking scores. Student anxiety check-ins are also lowest in morning sessions. I'd recommend scheduling speaking activities before noon. ☀️",
  "Show me Hassan's progress": "Hassan started at A2 in September and reached B1 by December — great progress! However, his scores have plateaued since January. His speaking anxiety index is high (7/10). Consider pairing him with Omar (B2) for peer modelling. 📊",
}

export const recentAssessments = [
  { date: '2024-03-15', type: 'Speaking', score: 62, cefr: 'B1' },
  { date: '2024-03-08', type: 'Writing', score: 55, cefr: 'B1' },
  { date: '2024-03-01', type: 'Reading', score: 68, cefr: 'B1' },
]

export const topInsights = [
  { insight: 'Morning sessions (10-11am) show 22% higher engagement scores', impact: 'high' },
  { insight: '3 students showing plateaued progress — recommend intervention', impact: 'high' },
  { insight: 'Teacher TL% correlates strongly (0.72) with grammar scores', impact: 'medium' },
  { insight: 'Class sizes over 30 students show -0.45 correlation with speaking scores', impact: 'medium' },
]
