'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BarChart3, Users, Brain, Smile } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const featureCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const featureCardHover = {
  scale: 1.05,
  boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.2)',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

export default function LandingPage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Holistic Analytics',
      description: 'Track every variable that matters: grades, mood, seating, and wellbeing.',
    },
    {
      icon: Users,
      title: 'Seating Intelligence',
      description: 'Interactive classroom heatmaps reveal how position impacts performance.',
    },
    {
      icon: Brain,
      title: 'Smart Insights via Tigo',
      description: 'Personalised recommendations that turn raw data into clear next steps.',
    },
    {
      icon: Smile,
      title: 'Wellbeing Check-ins',
      description: 'Monitor student mood and emotional health alongside academic progress.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 100, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          className="backdrop-blur-md bg-white/10 border border-white/20 sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Sparkles className="w-6 h-6 text-orange-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Contigo
              </span>
            </motion.div>
            <motion.div
              className="hidden md:flex gap-6 text-sm text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/student/dashboard" className="hover:text-orange-400 transition-colors">
                Demo
              </Link>
              <Link href="/login" className="hover:text-orange-400 transition-colors">
                Sign In
              </Link>
            </motion.div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          className="max-w-6xl mx-auto px-6 py-20 md:py-32 text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div
              className="inline-block"
              variants={floatingVariants}
              initial="initial"
              animate="animate"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-orange-300 text-sm font-medium">
                ✨ The Future of ELT Analytics
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent">
                With You,
              </span>
              <br />
              <span className="text-white">Every Step</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Contigo is a holistic English Language Teaching platform that tracks every variable that matters: grades, mood, seating, and wellbeing. The result is a clear picture of what truly drives learning outcomes.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all backdrop-blur-md"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/student/dashboard"
                className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                View Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="max-w-6xl mx-auto px-6 py-20 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Powerful Features
            </h2>
            <p className="text-white/60 text-lg">
              Everything you need to understand and improve student performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:border-orange-400/50 transition-colors group"
                  variants={featureCardVariants}
                  whileHover={featureCardHover}
                >
                  <motion.div
                    className="inline-block p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 mb-4 group-hover:bg-gradient-to-br group-hover:from-orange-500/40 group-hover:to-orange-600/40 transition-all"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <Icon className="w-6 h-6 text-orange-400" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Dashboard Preview Section */}
        <motion.div
          className="max-w-6xl mx-auto px-6 py-20 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Three Powerful Dashboards
            </h2>
            <p className="text-white/60 text-lg">
              Tailored views for students, teachers, and administrators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Student Dashboard',
                description: 'Track your journey with skill analytics and mood insights',
                href: '/student/dashboard',
                gradient: 'from-blue-500/20 to-blue-600/20',
              },
              {
                title: 'Teacher Dashboard',
                description: 'Monitor class performance and identify at-risk students',
                href: '/teacher/dashboard',
                gradient: 'from-purple-500/20 to-purple-600/20',
              },
              {
                title: 'Classroom Seating Map',
                description: 'Interactive heatmaps reveal seating impact on performance',
                href: '/teacher/classroom',
                gradient: 'from-orange-500/20 to-orange-600/20',
              },
            ].map((dashboard, index) => (
              <motion.div
                key={index}
                className={`backdrop-blur-md bg-gradient-to-br ${dashboard.gradient} border border-white/20 rounded-2xl p-8 hover:border-white/40 transition-all cursor-pointer group`}
                variants={featureCardVariants}
                whileHover={featureCardHover}
              >
                <Link href={dashboard.href} className="block space-y-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                    {dashboard.title}
                  </h3>
                  <p className="text-white/60">{dashboard.description}</p>
                  <motion.div
                    className="inline-flex items-center gap-2 text-orange-400 font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-white/20 rounded-2xl p-12 space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your ELT Experience?
            </h2>
            <p className="text-white/70 text-lg">
              Join educators and students who are discovering what truly drives learning outcomes.
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
