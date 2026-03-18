import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 px-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Logo & Brand */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-[#F97B4F]">Contigo 🌟</h1>
          <p className="text-xl text-gray-600 italic">&ldquo;With you, every step.&rdquo;</p>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed">
          A Holistic English Language Teaching (ELT) Student Performance Intelligence Platform.
          Track every variable — grades, mood, seating, wellbeing — and discover what truly
          drives learning outcomes.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            '📊 Holistic Analytics',
            '🪑 Seating Intelligence',
            '🤖 AI Insights via Tigo',
            '🗣️ ELT Skill Tracking',
            '😊 Wellbeing Check-ins',
          ].map((feature) => (
            <span
              key={feature}
              className="bg-white border border-orange-200 text-gray-700 px-4 py-2 rounded-full text-sm shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/login"
            className="bg-[#F97B4F] text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-orange-500 transition-colors shadow-md"
          >
            Get Started →
          </Link>
          <Link
            href="/student/dashboard"
            className="bg-white text-[#2E6FDF] border border-blue-300 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-sm"
          >
            View Demo
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
          <Link href="/student/dashboard" className="hover:text-[#F97B4F]">Student Dashboard</Link>
          <Link href="/teacher/dashboard" className="hover:text-[#F97B4F]">Teacher Dashboard</Link>
          <Link href="/teacher/classroom" className="hover:text-[#F97B4F]">Classroom Map</Link>
          <Link href="/admin/dashboard" className="hover:text-[#F97B4F]">Admin Dashboard</Link>
        </div>
      </div>
    </main>
  );
}
