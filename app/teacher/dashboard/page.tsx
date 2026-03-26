import Link from 'next/link';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';

const CLASS_STUDENTS = [
  { name: 'Sara Ahmed', grade: 82, mood: 8, trend: '↑', level: 'B2' },
  { name: 'Omar Hassan', grade: 75, mood: 7, trend: '→', level: 'B1' },
  { name: 'Lena Khalil', grade: 68, mood: 6, trend: '↓', level: 'B1' },
  { name: 'Ali Nasser', grade: 91, mood: 9, trend: '↑', level: 'C1' },
  { name: 'Fatima Zahra', grade: 55, mood: 5, trend: '↓', level: 'A2' },
  { name: 'Hassan Malik', grade: 77, mood: 8, trend: '↑', level: 'B2' },
];

const KPIS = [
  { label: 'Class Average', value: '74%', color: '#E8632A' },
  { label: 'At-Risk Students', value: '3', color: '#C43A3A' },
  { label: 'Avg Mood', value: '7.2/10', color: '#28B89A' },
  { label: 'Attendance', value: '94%', color: '#3A82C4' },
];

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--arc-bg)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b"
        style={{ background: 'var(--arc-surface)', borderColor: 'var(--arc-border)' }}>
        <Link href="/" className="text-xl font-bold tracking-widest uppercase text-glow-orange"
          style={{ color: 'var(--arc-orange)', fontFamily: 'Barlow Condensed, monospace' }}>
          CONTIGO
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/teacher/classroom" className="arc-label hover:text-arc-orange transition-colors"
            style={{ color: 'var(--arc-blue)' }}>
            Classroom Map
          </Link>
          <div className="w-8 h-8 flex items-center justify-center text-xs font-bold tracking-widest border"
            style={{ background: 'var(--arc-panel)', borderColor: 'var(--arc-border)', color: 'var(--arc-blue)', fontFamily: 'Barlow Condensed, monospace' }}>
            TCH
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <div className="arc-label mb-1">// INSTRUCTOR COMMAND</div>
          <h1 className="text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--arc-text)', fontFamily: 'Barlow Condensed, monospace' }}>
            Teacher Dashboard
          </h1>
          <div className="arc-divider w-40 mt-2" />
          <p className="arc-label mt-2">Grade 5B — English — 28 students</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="arc-panel p-4">
              <p className="arc-label mb-2">{kpi.label}</p>
              <p className="text-3xl font-bold tracking-wide"
                style={{ color: kpi.color, fontFamily: 'Barlow Condensed, monospace' }}>
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="arc-panel p-6">
          <div className="arc-label mb-4">Class Average — Monthly Trend</div>
          <PerformanceBarChart color="#E8632A" />
        </div>

        {/* Student Table */}
        <div className="arc-panel p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="arc-label">Student Overview</div>
            <Link href="/teacher/classroom" className="arc-label transition-colors"
              style={{ color: 'var(--arc-blue)' }}>
              View Classroom Map —
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: 'Barlow Condensed, monospace' }}>
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--arc-border)' }}>
                  {['Student', 'Level', 'Grade', 'Mood', 'Trend'].map((h) => (
                    <th key={h} className="pb-2 text-left arc-label font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CLASS_STUDENTS.map((student, i) => (
                  <tr key={i} className="border-b transition-colors hover:bg-arc-panel"
                    style={{ borderColor: 'var(--arc-border)', background: 'transparent' }}>
                    <td className="py-2.5 font-semibold tracking-wide" style={{ color: 'var(--arc-text)' }}>{student.name}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 text-xs font-bold tracking-widest border"
                        style={{ borderColor: 'var(--arc-blue)', color: 'var(--arc-blue)', background: 'rgba(58,130,196,0.08)' }}>
                        {student.level}
                      </span>
                    </td>
                    <td className="py-2.5 font-bold">
                      <span style={{ color: student.grade >= 80 ? '#28B89A' : student.grade >= 65 ? '#D4A017' : '#C43A3A' }}>
                        {student.grade}%
                      </span>
                    </td>
                    <td className="py-2.5" style={{ color: 'var(--arc-muted)' }}>{student.mood}/10</td>
                    <td className="py-2.5">
                      <span className="text-base font-bold"
                        style={{ color: student.trend === '↑' ? '#28B89A' : student.trend === '↓' ? '#C43A3A' : 'var(--arc-muted)' }}>
                        {student.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
