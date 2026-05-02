'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';
import { Users, AlertTriangle, Smile, CheckSquare, Map } from 'lucide-react';

const CLASS_STUDENTS = [
  { name: 'Sara Ahmed', grade: 82, mood: 8, trend: '↑', level: 'B2' },
  { name: 'Omar Hassan', grade: 75, mood: 7, trend: '→', level: 'B1' },
  { name: 'Lena Khalil', grade: 68, mood: 6, trend: '↓', level: 'B1' },
  { name: 'Ali Nasser', grade: 91, mood: 9, trend: '↑', level: 'C1' },
  { name: 'Fatima Zahra', grade: 55, mood: 5, trend: '↓', level: 'A2' },
  { name: 'Hassan Malik', grade: 77, mood: 8, trend: '↑', level: 'B2' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const cardHoverVariants = {
  scale: 1.02,
  boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.15)',
  transition: { type: 'spring', stiffness: 400, damping: 10 },
};

export default function TeacherDashboard() {
  const KPI_CARDS = [
    { label: 'Class Average', value: '74%', icon: Users, color: 'from-orange-500/20 to-orange-600/20', borderColor: 'border-orange-400/30', emoji: '📊' },
    { label: 'At-Risk Students', value: '3', icon: AlertTriangle, color: 'from-red-500/20 to-red-600/20', borderColor: 'border-red-400/30', emoji: '⚠️' },
    { label: 'Avg Mood', value: '7.2/10', icon: Smile, color: 'from-teal-500/20 to-teal-600/20', borderColor: 'border-teal-400/30', emoji: '😊' },
    { label: 'Attendance', value: '94%', icon: CheckSquare, color: 'from-blue-500/20 to-blue-600/20', borderColor: 'border-blue-400/30', emoji: '✅' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 50, -50, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -50, 50, 0], y: [0, -100, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
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
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Contigo 🌟
            </Link>
            <div className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/teacher/classroom"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-orange-400 transition-colors backdrop-blur-md bg-white/5 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 hover:border-orange-400/30"
                >
                  <Map className="w-4 h-4" />
                  Classroom Map
                </Link>
              </motion.div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-sm">🧑‍🏫</div>
            </div>
          </div>
        </motion.nav>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Teacher Dashboard <span className="text-3xl">🧑‍🏫</span>
            </h1>
            <p className="text-white/60 text-lg">Grade 5B — English — 28 students</p>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {KPI_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className={`backdrop-blur-md bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-2xl p-5 hover:border-white/30 transition-all cursor-pointer group`}
                  variants={itemVariants}
                  whileHover={cardHoverVariants}
                >
                  <div className="flex items-center justify-between mb-3">
                    <motion.div
                      className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-5 h-5 text-orange-400" />
                    </motion.div>
                    <span className="text-lg">{card.emoji}</span>
                  </div>
                  <p className="text-white/60 text-xs font-medium mb-1">{card.label}</p>
                  <p className="text-2xl font-bold text-white">{card.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={cardHoverVariants}
          >
            <h2 className="text-xl font-bold text-white mb-6">📈 Class Average — Monthly Trend</h2>
            <PerformanceBarChart color="#F97B4F" />
          </motion.div>

          {/* Student Table */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">👥 Student Overview</h2>
              <motion.div whileHover={{ x: 3 }}>
                <Link
                  href="/teacher/classroom"
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                >
                  View Classroom Map →
                </Link>
              </motion.div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-3 text-white/50 font-medium">Student</th>
                    <th className="pb-3 text-white/50 font-medium">Level</th>
                    <th className="pb-3 text-white/50 font-medium">Grade</th>
                    <th className="pb-3 text-white/50 font-medium">Mood</th>
                    <th className="pb-3 text-white/50 font-medium">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {CLASS_STUDENTS.map((student, i) => (
                    <motion.tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      whileHover={{ x: 4 }}
                    >
                      <td className="py-3 font-medium text-white">{student.name}</td>
                      <td className="py-3">
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full text-xs font-medium">
                          {student.level}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`font-semibold ${student.grade >= 80 ? 'text-green-400' : student.grade >= 65 ? 'text-amber-400' : 'text-red-400'}`}>
                          {student.grade}%
                        </span>
                      </td>
                      <td className="py-3 text-white/70">{student.mood}/10</td>
                      <td className="py-3">
                        <span className={`text-lg ${student.trend === '↑' ? 'text-green-400' : student.trend === '↓' ? 'text-red-400' : 'text-white/40'}`}>
                          {student.trend}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
