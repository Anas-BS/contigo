import Link from 'next/link';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';

const PLATFORM_STATS = [
  { label: 'Total Students', value: '342', color: '#E8632A' },
  { label: 'Active Teachers', value: '18', color: '#3A82C4' },
  { label: 'School Average', value: '71%', color: '#28B89A' },
  { label: 'At-Risk Students', value: '24', color: '#C43A3A' },
  { label: 'Avg Wellbeing', value: '7.1/10', color: '#D4A017' },
  { label: 'Tigo Sessions', value: '1,204', color: '#8B5CF6' },
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

const AT_RISK_ALERTS = [
  { alert: '3 students below 40% in Grade 5B', urgency: 'high' },
  { alert: 'Mood drop detected in Grade 3A this week', urgency: 'medium' },
  { alert: 'Attendance below 80% — 4 students', urgency: 'high' },
  { alert: 'Speaking anxiety spike in Grade 6B', urgency: 'medium' },
];

export default function AdminDashboard() {
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
          <span className="arc-label">The Full Picture</span>
          <div className="w-8 h-8 flex items-center justify-center text-xs font-bold tracking-widest border"
            style={{ background: 'var(--arc-panel)', borderColor: 'var(--arc-border)', color: '#8B5CF6', fontFamily: 'Barlow Condensed, monospace' }}>
            ADM
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <div className="arc-label mb-1">// SCHOOL COMMAND CENTER</div>
          <h1 className="text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--arc-text)', fontFamily: 'Barlow Condensed, monospace' }}>
            Admin — The Full Picture
          </h1>
          <div className="arc-divider w-48 mt-2" />
          <p className="arc-label mt-2">School-wide ELT Intelligence Dashboard</p>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLATFORM_STATS.map((stat) => (
            <div key={stat.label} className="arc-panel p-4 text-center">
              <p className="text-2xl font-bold tracking-wide"
                style={{ color: stat.color, fontFamily: 'Barlow Condensed, monospace' }}>
                {stat.value}
              </p>
              <p className="arc-label mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Grade Breakdown */}
        <div className="arc-panel p-6">
          <div className="arc-label mb-4">Average Score by Grade</div>
          <PerformanceBarChart data={GRADE_BREAKDOWN} color="#3A82C4" />
        </div>

        {/* Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Teachers */}
          <div className="arc-panel p-6">
            <div className="arc-label mb-4">Top Performing Teachers</div>
            <div className="space-y-0">
              {TOP_TEACHERS.map((t, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b"
                  style={{ borderColor: 'var(--arc-border)' }}>
                  <div>
                    <p className="font-semibold tracking-wide text-sm"
                      style={{ color: 'var(--arc-text)', fontFamily: 'Barlow Condensed, monospace' }}>
                      {t.name}
                    </p>
                    <p className="arc-label">{t.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-base" style={{ color: 'var(--arc-orange)', fontFamily: 'Share Tech Mono, monospace' }}>{t.avg}%</p>
                    <p className="arc-label">Wellbeing: {t.wellbeing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* At-Risk Alerts */}
          <div className="arc-panel p-6">
            <div className="arc-label mb-4">At-Risk Alerts</div>
            <div className="space-y-3">
              {AT_RISK_ALERTS.map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 mt-1.5 flex-shrink-0"
                    style={{ background: item.urgency === 'high' ? '#C43A3A' : '#D4A017' }} />
                  <span style={{ color: 'var(--arc-text)' }}>{item.alert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="arc-panel p-6">
          <div className="arc-label mb-2" style={{ color: 'var(--arc-orange)' }}>
            Tigo School Intelligence Summary
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--arc-text)' }}>
            This week&apos;s data shows a 4% drop in average speaking scores school-wide.
            The strongest predictor of this decline is increased seating instability in
            Grades 4–6. Recommendation: implement fixed seating for 3 weeks and re-measure
            speaking confidence scores. Estimated improvement: +6–9%.
          </p>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
