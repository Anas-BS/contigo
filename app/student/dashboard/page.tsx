'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SkillsChart from '@/components/charts/SkillsChart';
import MoodChart from '@/components/charts/MoodChart';
import TigoChat from '@/components/TigoChat';
import { TrendingUp, Zap, Award, Flame } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const cardHoverVariants = {
  scale: 1.02,
  boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.15)',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

export default function StudentDashboard() {
  const KPI_CARDS = [
    {
      label: 'Overall Grade',
      value: '87%',
      icon: Award,
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-400/30',
      trend: '+5%',
      trendUp: true,
    },
    {
      label: 'Mood Score',
      value: '8.2/10',
      icon: Zap,
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-400/30',
      trend: '+0.5',
      trendUp: true,
    },
    {
      label: 'Speaking Level',
      value: 'B1+',
      icon: TrendingUp,
      color: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-400/30',
      trend: '+1 level',
      trendUp: true,
    },
    {
      label: 'Current Streak',
      value: '12 Days',
      icon: Flame,
      color: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-400/30',
      trend: 'Keep it up!',
      trendUp: true,
    },
  ];

  const RECENT_ACTIVITY = [
    { id: 1, title: 'Completed Speaking Practice', time: '2 hours ago', icon: '🎤' },
    { id: 2, title: 'Improved Listening Score', time: '5 hours ago', icon: '👂' },
    { id: 3, title: 'Vocabulary Quiz: 92%', time: 'Yesterday', icon: '📚' },
    { id: 4, title: 'Attended Live Class', time: '2 days ago', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Contigo 🌟
            </Link>
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white/70 text-sm">Welcome, Sarah</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                SA
              </div>
            </motion.div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              My Journey
            </h1>
            <p className="text-white/60 text-lg">
              Track your progress and celebrate your achievements
            </p>
          </motion.div>

          {/* KPI Cards Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {KPI_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className={`backdrop-blur-md bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-2xl p-6 hover:border-white/30 transition-all cursor-pointer group`}
                  variants={itemVariants}
                  whileHover={cardHoverVariants}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-orange-400" />
                    </motion.div>
                    <motion.span
                      className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {card.trend}
                    </motion.span>
                  </div>

                  <p className="text-white/70 text-sm mb-2">{card.label}</p>
                  <p className="text-3xl font-bold text-white">{card.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Skills Chart */}
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
              variants={itemVariants}
              whileHover={cardHoverVariants}
            >
              <h2 className="text-xl font-bold text-white mb-6">Your Skills Profile</h2>
              <div className="h-64 flex items-center justify-center">
                <SkillsChart />
              </div>
            </motion.div>

            {/* Mood Chart */}
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
              variants={itemVariants}
              whileHover={cardHoverVariants}
            >
              <h2 className="text-xl font-bold text-white mb-6">7-Day Mood Trend</h2>
              <div className="h-64 flex items-center justify-center">
                <MoodChart />
              </div>
            </motion.div>
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

            <div className="space-y-4">
              {RECENT_ACTIVITY.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-white/50 text-sm">{activity.time}</p>
                  </div>
                  <motion.div
                    className="text-white/40 group-hover:text-orange-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Insight Banner */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-4">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🤖
              </motion.span>
              <div className="flex-1">
                <p className="font-semibold text-white text-lg mb-2">Tigo AI Insight</p>
                <p className="text-white/80">
                  You're on an amazing streak! Your speaking confidence has improved by 15% this month. Keep practicing with our daily speaking challenges to reach B2 level. 🎯
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tigo Chat */}
      <TigoChat />
    </div>
  );
}
