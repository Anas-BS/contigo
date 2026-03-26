import Link from 'next/link';

const FEATURES = [
  {
    icon: '📊',
    title: 'Holistic Analytics',
    description: 'Track grades, mood, seating, and wellbeing in one unified view. Discover the hidden drivers of student performance.',
    color: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-orange-100',
  },
  {
    icon: '🤖',
    title: 'Tigo AI Copilot',
    description: 'Your personal AI assistant powered by class data. Get smart insights, at-risk alerts, and seating recommendations instantly.',
    color: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-100',
  },
  {
    icon: '🪑',
    title: 'Seating Intelligence',
    description: 'Visualize your classroom as a live heatmap. See which seats correlate with better speaking, engagement, and mood.',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    icon: '📚',
    title: 'Class Management',
    description: 'Add, edit, and manage student details, grades, attendance, and class sessions — all from one organized interface.',
    color: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-teal-100',
  },
  {
    icon: '🗣️',
    title: 'ELT Skill Tracking',
    description: 'Monitor Speaking, Writing, Listening, Reading, and Vocabulary with visual skill profiles for every student.',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
  },
  {
    icon: '😊',
    title: 'Wellbeing Check-ins',
    description: 'Daily mood tracking surfaces emotional trends early, so no student falls through the cracks.',
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
  },
];

const ROLES = [
  {
    icon: '🎓',
    title: 'Students',
    description: 'Track your learning journey, view your skill profile, and get personalized tips from Tigo.',
    href: '/student/dashboard',
    color: 'from-orange-400 to-orange-500',
    actions: ['View progress & grades', 'Skill radar chart', 'Mood trend tracker', 'Tigo learning coach'],
  },
  {
    icon: '🧑‍🏫',
    title: 'Teachers & Staff',
    description: 'Manage your class, add students, input grades, log sessions, and get AI-powered insights.',
    href: '/teacher/dashboard',
    color: 'from-blue-500 to-blue-600',
    actions: ['Class management (CRUD)', 'Student grade & mood input', 'Session logging', 'Tigo teaching assistant'],
  },
  {
    icon: '🏛️',
    title: 'Administrators',
    description: 'Get the full school picture — performance trends, teacher rankings, and strategic AI recommendations.',
    href: '/admin/dashboard',
    color: 'from-purple-500 to-purple-600',
    actions: ['School-wide analytics', 'At-risk student alerts', 'Teacher performance', 'Tigo school intelligence'],
  },
];

const STATS = [
  { value: '342', label: 'Students Tracked', emoji: '🎓' },
  { value: '18', label: 'Active Teachers', emoji: '🧑‍🏫' },
  { value: '1,204', label: 'Tigo AI Sessions', emoji: '🤖' },
  { value: '94%', label: 'Avg Attendance', emoji: '✅' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header / Nav */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#F97B4F]">Contigo 🌟</span>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <a href="#features" className="hover:text-[#F97B4F] transition-colors">Features</a>
            <a href="#roles" className="hover:text-[#F97B4F] transition-colors">Roles</a>
            <a href="#demo" className="hover:text-[#F97B4F] transition-colors">Demo</a>
          </nav>
          <Link
            href="/login"
            className="bg-[#F97B4F] text-white px-5 py-2 rounded-xl font-semibold text-sm hover:bg-orange-500 transition-colors shadow-sm"
          >
            Sign In →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-[#F97B4F] text-xs font-semibold px-3 py-1.5 rounded-full">
            🤖 Now with Tigo AI Copilot
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            The smarter way to teach<br />
            <span className="text-[#F97B4F]">English.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Contigo is a Holistic ELT Intelligence Platform — giving teachers, staff, and administrators 
            the insights they need to help every student thrive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/login"
              className="bg-[#F97B4F] text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-orange-500 transition-colors shadow-md"
            >
              Get Started →
            </Link>
            <Link
              href="/student/dashboard"
              className="bg-white text-[#2E6FDF] border-2 border-blue-200 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              View Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-900 py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-3xl font-extrabold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900">Everything you need, in one place</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From AI-powered insights to full class management, Contigo gives every user the tools to make a difference.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className={`rounded-2xl border p-6 space-y-3 ${f.color}`}>
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center text-2xl`}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900">Built for every role</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Whether you&apos;re a student tracking your journey, a teacher managing your class, or an admin overseeing the whole school — Contigo has you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map((role) => (
              <div key={role.title} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className={`bg-gradient-to-r ${role.color} text-white p-6`}>
                  <div className="text-4xl mb-2">{role.icon}</div>
                  <h3 className="text-xl font-bold">{role.title}</h3>
                  <p className="text-sm opacity-90 mt-1 leading-relaxed">{role.description}</p>
                </div>
                <div className="p-5 space-y-2 flex-1">
                  {role.actions.map((action) => (
                    <div key={action} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500 font-bold">✓</span>
                      {action}
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href={role.href}
                    className="block text-center border-2 border-[#F97B4F] text-[#F97B4F] px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-orange-50 transition-colors"
                  >
                    View Dashboard →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Links Section */}
      <section id="demo" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Explore the platform</h2>
          <p className="text-gray-500">Jump straight into any view — no login required for the demo.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/student/dashboard', icon: '🎓', label: 'Student Dashboard', desc: 'Skills, mood & progress' },
              { href: '/teacher/dashboard', icon: '🧑‍🏫', label: 'Teacher Dashboard', desc: 'Class overview & insights' },
              { href: '/teacher/classes', icon: '📚', label: 'Class Management', desc: 'Add, edit & manage students' },
              { href: '/teacher/classroom', icon: '🪑', label: 'Classroom Map', desc: 'Seating heatmap & KPIs' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:border-[#F97B4F] hover:bg-orange-50 transition-all group text-left space-y-2"
              >
                <div className="text-3xl">{item.icon}</div>
                <p className="font-semibold text-gray-800 group-hover:text-[#F97B4F] transition-colors">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-500 to-orange-400 py-16 px-6 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-extrabold">Ready to transform your classroom?</h2>
          <p className="opacity-90 text-lg">Join teachers who use Contigo to make data-driven decisions and help every student succeed.</p>
          <Link
            href="/login"
            className="inline-block bg-white text-[#F97B4F] font-bold px-8 py-3.5 rounded-xl hover:bg-orange-50 transition-colors shadow-lg text-lg"
          >
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white font-bold text-lg">Contigo 🌟</span>
          <p className="text-sm italic">&ldquo;With you, every step.&rdquo;</p>
          <div className="flex gap-4 text-sm">
            <Link href="/student/dashboard" className="hover:text-white transition-colors">Student</Link>
            <Link href="/teacher/dashboard" className="hover:text-white transition-colors">Teacher</Link>
            <Link href="/admin/dashboard" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
