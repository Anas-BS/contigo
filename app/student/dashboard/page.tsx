import Link from 'next/link';
import SkillsChart from '@/components/charts/SkillsChart';
import MoodChart from '@/components/charts/MoodChart';
import TigoChat from '@/components/TigoChat';

const KPI_CARDS = [
  { label: 'Overall Grade', value: '78%', delta: '+4% this week', color: '#E8632A' },
  { label: 'Mood Score', value: '7.8/10', delta: '+0.5 this week', color: '#28B89A' },
  { label: 'Speaking', value: '72%', delta: '+8% this week', color: '#3A82C4' },
  { label: 'Streak', value: '12 Days', delta: 'Active', color: '#D4A017' },
];

const ACTIVITY = [
  { label: 'Speaking test completed', value: 'Score: 72%', time: '2h ago' },
  { label: 'Writing assignment submitted', value: '', time: '1d ago' },
  { label: 'Mood check-in', value: 'Feeling confident', time: '1d ago' },
  { label: 'Vocabulary quiz', value: '18/20 correct', time: '2d ago' },
];

export default function StudentDashboard() {
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
          <span className="arc-label">My Journey</span>
          <div className="w-8 h-8 flex items-center justify-center text-xs font-bold tracking-widest border"
            style={{ background: 'var(--arc-panel)', borderColor: 'var(--arc-border)', color: 'var(--arc-orange)', fontFamily: 'Barlow Condensed, monospace' }}>
            STU
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <div className="arc-label mb-1">// LEARNER PROFILE</div>
          <h1 className="text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--arc-text)', fontFamily: 'Barlow Condensed, monospace' }}>
            My Journey
          </h1>
          <div className="arc-divider w-40 mt-2" />
          <p className="arc-label mt-2">Track your English learning progress</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {KPI_CARDS.map((kpi) => (
            <div key={kpi.label} className="arc-panel p-4">
              <p className="arc-label mb-2">{kpi.label}</p>
              <p className="text-3xl font-bold tracking-wide"
                style={{ color: kpi.color, fontFamily: 'Barlow Condensed, monospace' }}>
                {kpi.value}
              </p>
              <p className="arc-label mt-2" style={{ color: '#28B89A' }}>{kpi.delta}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="arc-panel p-6">
            <div className="arc-label mb-4">Skill Profile</div>
            <SkillsChart />
          </div>
          <div className="arc-panel p-6">
            <div className="arc-label mb-4">Mood Trend — Last 7 Days</div>
            <MoodChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="arc-panel p-6">
          <div className="arc-label mb-4">Recent Activity</div>
          <div className="space-y-0">
            {ACTIVITY.map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b text-sm"
                style={{ borderColor: 'var(--arc-border)' }}>
                <div className="w-1.5 h-1.5 flex-shrink-0" style={{ background: 'var(--arc-orange)' }} />
                <span className="flex-1" style={{ color: 'var(--arc-text)' }}>
                  {item.label}{item.value ? ` — ${item.value}` : ''}
                </span>
                <span className="arc-label">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
