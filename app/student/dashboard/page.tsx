import Link from 'next/link';
import SkillsChart from '@/components/charts/SkillsChart';
import MoodChart from '@/components/charts/MoodChart';
import TigoChat from '@/components/TigoChat';

const KPI_CARDS = [
  { label: 'Overall Grade', value: '78%', delta: '+4%', color: '#F97B4F', emoji: '📈' },
  { label: 'Mood Score', value: '7.8/10', delta: '+0.5', color: '#3ECFAC', emoji: '😊' },
  { label: 'Speaking', value: '72%', delta: '+8%', color: '#2E6FDF', emoji: '🗣️' },
  { label: 'Streak', value: '12 days', delta: '🔥', color: '#F5C842', emoji: '⚡' },
];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-[#F97B4F] font-bold text-xl">Contigo 🌟</Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">My Journey</span>
          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm">🎓</div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Journey 🎓</h1>
          <p className="text-gray-500 text-sm mt-1">Track your English learning progress</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">{kpi.label}</span>
                <span className="text-lg">{kpi.emoji}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
              <p className="text-xs text-green-600 mt-1 font-medium">{kpi.delta} this week</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills Radar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">🎯 Skill Profile</h2>
            <SkillsChart />
          </div>

          {/* Mood Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-4">😊 Mood Trend (Last 7 Days)</h2>
            <MoodChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">📋 Recent Activity</h2>
          <div className="space-y-3">
            {[
              { icon: '🗣️', text: 'Speaking test completed — Score: 72%', time: '2h ago' },
              { icon: '📝', text: 'Writing assignment submitted', time: '1d ago' },
              { icon: '😊', text: 'Mood check-in: Feeling confident!', time: '1d ago' },
              { icon: '📚', text: 'Vocabulary quiz — 18/20 correct', time: '2d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-gray-700">{item.text}</span>
                <span className="text-gray-400 text-xs">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TigoChat role="student" />
    </div>
  );
}
