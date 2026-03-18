// Contigo Mock Data — All dashboard data sourced from here

export const students = [
  {
    id: "S001",
    name: "Hassan Al-Rashid",
    cefr: "B1",
    mood: 6,
    anxiety: 7,
    speaking: 62,
    listening: 71,
    reading: 68,
    writing: 55,
    grammar: 60,
    vocabulary: 65,
    trend: "down",
    risk: "high",
    avatar: "HA",
  },
  {
    id: "S002",
    name: "Sara Benali",
    cefr: "B1+",
    mood: 8,
    anxiety: 4,
    speaking: 74,
    listening: 80,
    reading: 77,
    writing: 70,
    grammar: 72,
    vocabulary: 75,
    trend: "up",
    risk: "low",
    avatar: "SB",
  },
  {
    id: "S003",
    name: "Omar Khalil",
    cefr: "B2",
    mood: 7,
    anxiety: 3,
    speaking: 85,
    listening: 88,
    reading: 82,
    writing: 79,
    grammar: 84,
    vocabulary: 87,
    trend: "up",
    risk: "low",
    avatar: "OK",
  },
  {
    id: "S004",
    name: "Lena Mostafa",
    cefr: "A2+",
    mood: 5,
    anxiety: 8,
    speaking: 45,
    listening: 52,
    reading: 58,
    writing: 42,
    grammar: 48,
    vocabulary: 50,
    trend: "flat",
    risk: "medium",
    avatar: "LM",
  },
  {
    id: "S005",
    name: "Ahmed Farouq",
    cefr: "B1",
    mood: 7,
    anxiety: 5,
    speaking: 66,
    listening: 70,
    reading: 64,
    writing: 60,
    grammar: 63,
    vocabulary: 68,
    trend: "up",
    risk: "low",
    avatar: "AF",
  },
];

export const teachers = [
  {
    id: "T001",
    name: "Amina Okafor",
    qualification: "DELTA",
    tlPercent: 98,
    wellbeing: 8,
    classAvg: 74,
    yearsExp: 8,
    studentsImproved: 92,
    avatar: "AO",
  },
  {
    id: "T002",
    name: "James Hartley",
    qualification: "CELTA",
    tlPercent: 85,
    wellbeing: 6,
    classAvg: 65,
    yearsExp: 3,
    studentsImproved: 71,
    avatar: "JH",
  },
];

export const cefrTimeline = [
  { month: "Sep", level: "A2", score: 42 },
  { month: "Oct", level: "A2+", score: 48 },
  { month: "Nov", level: "A2+", score: 53 },
  { month: "Dec", level: "B1", score: 61 },
  { month: "Jan", level: "B1", score: 65 },
  { month: "Feb", level: "B1", score: 68 },
  { month: "Mar", level: "B1+", score: 72 },
];

export const correlationData = [
  {
    var1: "Mood Score",
    var2: "Speaking Score",
    correlation: 0.72,
    category: "positive",
  },
  {
    var1: "Teacher TL%",
    var2: "Vocab Growth",
    correlation: 0.81,
    category: "positive",
  },
  {
    var1: "Class Size",
    var2: "Speaking Turns",
    correlation: -0.68,
    category: "negative",
  },
  {
    var1: "Anxiety Index",
    var2: "Oral Score",
    correlation: -0.74,
    category: "negative",
  },
  {
    var1: "Attendance",
    var2: "GPA",
    correlation: 0.85,
    category: "positive",
  },
  {
    var1: "Lesson Time",
    var2: "Engagement",
    correlation: 0.61,
    category: "positive",
  },
  {
    var1: "Noise Level",
    var2: "Listening Score",
    correlation: -0.59,
    category: "negative",
  },
  {
    var1: "Teacher Wellbeing",
    var2: "Class Avg",
    correlation: 0.77,
    category: "positive",
  },
];

export const seatingLayout = [
  { seatId: "R1C1", row: 1, col: 1, studentId: "S003", zone: "front_centre" },
  { seatId: "R1C2", row: 1, col: 2, studentId: "S002", zone: "front_centre" },
  { seatId: "R1C3", row: 1, col: 3, studentId: "S005", zone: "front_side" },
  { seatId: "R2C1", row: 2, col: 1, studentId: "S001", zone: "middle" },
  { seatId: "R2C2", row: 2, col: 2, studentId: null, zone: "middle" },
  { seatId: "R2C3", row: 2, col: 3, studentId: "S004", zone: "back" },
  { seatId: "R3C1", row: 3, col: 1, studentId: null, zone: "back" },
  { seatId: "R3C2", row: 3, col: 2, studentId: null, zone: "back" },
  { seatId: "R3C3", row: 3, col: 3, studentId: null, zone: "back" },
];

export const timetablePerformance = [
  { slot: "8–9am", avgScore: 74 },
  { slot: "9–10am", avgScore: 78 },
  { slot: "10–11am", avgScore: 76 },
  { slot: "11–12pm", avgScore: 70 },
  { slot: "1–2pm", avgScore: 65 },
  { slot: "2–3pm", avgScore: 61 },
  { slot: "3–4pm", avgScore: 58 },
];

export const classes = [
  {
    id: "C001",
    name: "Grade 5B",
    students: 16,
    avgCefr: "B1",
    avgScore: 74,
    teacherId: "T001",
    room: "R12",
  },
  {
    id: "C002",
    name: "Grade 4A",
    students: 18,
    avgCefr: "A2+",
    avgScore: 62,
    teacherId: "T001",
    room: "R08",
  },
  {
    id: "C003",
    name: "Grade 6C",
    students: 14,
    avgCefr: "B1+",
    avgScore: 79,
    teacherId: "T002",
    room: "R15",
  },
];

export const adminKPIs = {
  overallPassRate: 78,
  atRiskPercent: 22,
  avgCefr: "B1",
  teacherWellbeingIndex: 7.2,
  totalStudents: 48,
  totalTeachers: 2,
  totalClasses: 3,
};

export const tigoInsights = [
  {
    id: 1,
    type: "alert",
    message: "Hassan Al-Rashid's speaking score has dropped 12% this month. Consider front seating.",
    icon: "⚠️",
    severity: "high",
  },
  {
    id: 2,
    type: "positive",
    message: "Sara Benali has shown 15% improvement in listening over the last 4 weeks! 🎉",
    icon: "🌟",
    severity: "low",
  },
  {
    id: 3,
    type: "insight",
    message: "Classes held in the 9–10am slot score on average 13% higher than afternoon sessions.",
    icon: "💡",
    severity: "medium",
  },
  {
    id: 4,
    type: "seating",
    message: "Moving Hassan to Front Centre reduces his anxiety index by ~40% based on historical data.",
    icon: "🪑",
    severity: "high",
  },
  {
    id: 5,
    type: "teacher",
    message: "Amina Okafor's TL% of 98% correlates with the highest vocabulary growth in Grade 5B.",
    icon: "🧑‍🏫",
    severity: "low",
  },
];

export const recentAssessments = [
  {
    id: "A001",
    studentId: "S001",
    date: "2026-03-10",
    title: "Speaking Assessment",
    scores: { speaking: 60, listening: 70, reading: 65, writing: 55, grammar: 58, vocabulary: 63 },
  },
  {
    id: "A002",
    studentId: "S001",
    date: "2026-02-20",
    title: "Mid-Term Test",
    scores: { speaking: 58, listening: 68, reading: 62, writing: 52, grammar: 55, vocabulary: 60 },
  },
  {
    id: "A003",
    studentId: "S001",
    date: "2026-01-15",
    title: "Skills Audit",
    scores: { speaking: 55, listening: 65, reading: 60, writing: 48, grammar: 52, vocabulary: 58 },
  },
];

export const environmentKPIs = [
  { label: "Avg Noise Level", value: "Moderate", icon: "🔊", color: "amber" },
  { label: "Digital Access", value: "92%", icon: "💻", color: "teal" },
  { label: "Overcrowding Risk", value: "Low", icon: "🏫", color: "teal" },
  { label: "English Immersion", value: "74%", icon: "🌍", color: "orange" },
];
