import Link from 'next/link';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';

const PLATFORM_STATS = [
  { label: 'Total Students', value: '342', color: '#F97B4F', emoji: '🎓' },
  { label: 'Active Teachers', value: '18', color: '#2E6FDF', emoji: '🧑‍🏫' },
  { label: 'School Average', value: '71%', color: '#3ECFAC', emoji: '📊' },
  { label: 'At-Risk Students', value: '24', color: '#EF4444', emoji: '⚠️' },
  { label: 'Avg Wellbeing', value: '7.1/10', color: '#F5C842', emoji: '😊' },
  { label: 'Tigo Sessions', value: '1,204', color: '#8B5CF6', emoji: '🤖' },
];

const GRADE_BREAKDOWN = [
  { name: 'Grade 1', score: 78 },
  { name: 'Grade 2', score: 72 },
  { name: 'Grade 3', score: 68 },
  { name: 'Grade 4', score: 74 },
  { name: 'Grade 5', score: 71 },
  { name: 'Grade 6', score: 69 },
];

const TOP_TEACHERS = [
  { name: 'Ms. Amina Khalil', class: 'Grade 5A', avg: 82, wellbeing: 8.5 },
  { name: 'Mr. Tariq Nasser', class: 'Grade 3B', avg: 79, wellbeing: 7.8 },
  { name: 'Ms. Rania Farid', class: 'Grade 6A', avg: 77, wellbeing: 8.1 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-[#F97B4F] font-bold text-xl">Contigo 🌟</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">The Full Picture</span>
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">🏛️</div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin — The Full Picture 🏛️</h1>
          <p className="text-gray-500 text-sm mt-1">School-wide ELT Intelligence Dashboard</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLATFORM_STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-center space-y-1">
                <span className="text-2xl">{stat.emoji}</span>
                <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grade Breakdown Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">📊 Average Score by Grade</h2>
          <PerformanceBarChart data={GRADE_BREAKDOWN} color="#2E6FDF" />
        </div>

        {/* Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Teachers */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">🏆 Top Performing Teachers</h2>
            <div className="space-y-3">
              {TOP_TEACHERS.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#F97B4F]">{t.avg}%</p>
                    <p className="text-xs text-gray-500">Wellbeing: {t.wellbeing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* At-Risk Summary */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">⚠️ At-Risk Alerts</h2>
            <div className="space-y-3">
              {[
                { alert: '3 students below 40% in Grade 5B', type: 'grade', urgency: 'high' },
                { alert: 'Mood drop detected in Grade 3A this week', type: 'wellbeing', urgency: 'medium' },
                { alert: 'Attendance below 80% — 4 students', type: 'attendance', urgency: 'high' },
                { alert: 'Speaking anxiety spike in Grade 6B', type: 'anxiety', urgency: 'medium' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.urgency === 'high' ? 'bg-red-500' : 'bg-amber-400'}`} />
                  <span className="text-gray-700">{item.alert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-gradient-to-r from-orange-50 to-purple-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🤖</span>
            <div>
              <p className="font-semibold text-gray-800">Tigo School Intelligence Summary</p>
              <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                This week&apos;s data shows a 4% drop in average speaking scores school-wide. 
                The strongest predictor of this decline is increased seating instability in 
                Grades 4–6. Recommendation: implement fixed seating for 3 weeks and re-measure 
                speaking confidence scores. Estimated improvement: +6–9%.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
