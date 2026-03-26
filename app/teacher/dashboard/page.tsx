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

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-[#F97B4F] font-bold text-xl">Contigo 🌟</Link>
        <div className="flex items-center gap-4">
          <Link href="/teacher/classes" className="text-sm text-[#2E6FDF] hover:underline">Manage Classes</Link>
          <Link href="/teacher/classroom" className="text-sm text-[#2E6FDF] hover:underline">Classroom Map</Link>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">🧑‍🏫</div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard 🧑‍🏫</h1>
          <p className="text-gray-500 text-sm mt-1">Grade 5B — English — 28 students</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📚', label: 'Manage Classes', desc: 'Add, edit & delete students', href: '/teacher/classes', color: 'bg-blue-50 border-blue-200 hover:bg-blue-100' },
            { icon: '🪑', label: 'Classroom Map', desc: 'Seating heatmap & KPIs', href: '/teacher/classroom', color: 'bg-orange-50 border-orange-200 hover:bg-orange-100' },
            { icon: '🤖', label: 'Ask Tigo', desc: 'AI insights & suggestions', href: '#', color: 'bg-purple-50 border-purple-200 hover:bg-purple-100' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${action.color}`}
            >
              <span className="text-3xl">{action.icon}</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{action.label}</p>
                <p className="text-xs text-gray-500">{action.desc}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Class Average', value: '74%', color: '#F97B4F', emoji: '📊' },
            { label: 'At-Risk Students', value: '3', color: '#EF4444', emoji: '⚠️' },
            { label: 'Avg Mood', value: '7.2/10', color: '#3ECFAC', emoji: '😊' },
            { label: 'Attendance', value: '94%', color: '#2E6FDF', emoji: '✅' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{kpi.label}</span>
                <span className="text-lg">{kpi.emoji}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Class Performance Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">📈 Class Average — Monthly Trend</h2>
          <PerformanceBarChart color="#F97B4F" />
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">👥 Student Overview</h2>
            <Link href="/teacher/classroom" className="text-sm text-[#2E6FDF] hover:underline">View Classroom Map →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-2 text-gray-500 font-medium">Student</th>
                  <th className="pb-2 text-gray-500 font-medium">Level</th>
                  <th className="pb-2 text-gray-500 font-medium">Grade</th>
                  <th className="pb-2 text-gray-500 font-medium">Mood</th>
                  <th className="pb-2 text-gray-500 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {CLASS_STUDENTS.map((student, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2.5 font-medium text-gray-800">{student.name}</td>
                    <td className="py-2.5">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        {student.level}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`font-semibold ${student.grade >= 80 ? 'text-green-600' : student.grade >= 65 ? 'text-amber-600' : 'text-red-500'}`}>
                        {student.grade}%
                      </span>
                    </td>
                    <td className="py-2.5 text-gray-700">{student.mood}/10</td>
                    <td className="py-2.5">
                      <span className={`text-lg ${student.trend === '↑' ? 'text-green-500' : student.trend === '↓' ? 'text-red-500' : 'text-gray-400'}`}>
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

      <TigoChat role="teacher" />
    </div>
  );
}
