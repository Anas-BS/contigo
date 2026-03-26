import Link from 'next/link';

const FEATURES = [
  'Holistic Analytics',
  'Seating Intelligence',
  'AI Insights via Tigo',
  'ELT Skill Tracking',
  'Wellbeing Check-ins',
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #080B10 60%, #0D1520 100%)' }}>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(58,130,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(58,130,196,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Diagonal accent line */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, var(--arc-orange), transparent 60%)' }} />

      <div className="max-w-3xl w-full space-y-10 relative z-10">

        {/* Brand */}
        <div className="space-y-3">
          <div className="arc-label mb-2">// ELT INTELLIGENCE PLATFORM</div>
          <h1
            className="text-7xl font-bold tracking-widest uppercase text-glow-orange"
            style={{ color: 'var(--arc-orange)', fontFamily: 'Barlow Condensed, monospace' }}
          >
            CONTIGO
          </h1>
          <div className="arc-divider w-48" />
          <p className="text-lg tracking-widest uppercase" style={{ color: 'var(--arc-muted)', fontFamily: 'Share Tech Mono, monospace' }}>
            &ldquo;With you, every step.&rdquo;
          </p>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed" style={{ color: 'var(--arc-text)', maxWidth: '520px' }}>
          A holistic English Language Teaching student performance intelligence platform.
          Track every variable — grades, mood, seating, wellbeing — and discover what truly
          drives learning outcomes.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-3">
          {FEATURES.map((feature) => (
            <span
              key={feature}
              className="arc-label px-4 py-2 border"
              style={{
                borderColor: 'var(--arc-border-bright)',
                background: 'var(--arc-surface)',
                color: 'var(--arc-muted)',
                letterSpacing: '0.1em',
              }}
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login" className="arc-btn-primary font-bold text-base px-8 py-3 text-center tracking-widest uppercase"
            style={{ fontFamily: 'Barlow Condensed, monospace', background: 'var(--arc-orange)', border: '1px solid var(--arc-orange)', color: '#fff', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)', display: 'inline-block' }}>
            ENTER PLATFORM
          </Link>
          <Link href="/student/dashboard" className="arc-btn text-base text-center"
            style={{ display: 'inline-block', padding: '0.75rem 2rem', clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)' }}>
            VIEW DEMO
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-2 flex flex-wrap gap-x-8 gap-y-2 arc-label">
          <Link href="/student/dashboard" className="hover:text-arc-orange transition-colors" style={{ color: 'var(--arc-muted)' }}>Student Dashboard</Link>
          <Link href="/teacher/dashboard" className="hover:text-arc-orange transition-colors" style={{ color: 'var(--arc-muted)' }}>Teacher Dashboard</Link>
          <Link href="/teacher/classroom" className="hover:text-arc-orange transition-colors" style={{ color: 'var(--arc-muted)' }}>Classroom Map</Link>
          <Link href="/admin/dashboard" className="hover:text-arc-orange transition-colors" style={{ color: 'var(--arc-muted)' }}>Admin Dashboard</Link>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, transparent, var(--arc-border-bright), transparent)' }} />
    </main>
  );
}
