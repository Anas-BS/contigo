'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Heart, CheckCircle, ArrowRight, MapPin } from 'lucide-react';

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
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const KPI_CARDS = [
  {
    label: 'Class Average',
    value: '74%',
    icon: TrendingUp,
    color: 'from-orange-500/20 to-orange-600/20',
    borderColor: 'border-orange-400/30',
    badge: '+2% this month',
    badgeVariant: 'success' as const,
  },
  {
    label: 'At-Risk Students',
    value: '3',
    icon: Users,
    color: 'from-red-500/20 to-red-600/20',
    borderColor: 'border-red-400/30',
    badge: 'Needs attention',
    badgeVariant: 'danger' as const,
  },
  {
    label: 'Avg Mood',
    value: '7.2/10',
    icon: Heart,
    color: 'from-teal-500/20 to-teal-600/20',
    borderColor: 'border-teal-400/30',
    badge: 'Healthy',
    badgeVariant: 'success' as const,
  },
  {
    label: 'Attendance',
    value: '94%',
    icon: CheckCircle,
    color: 'from-blue-500/20 to-blue-600/20',
    borderColor: 'border-blue-400/30',
    badge: 'On track',
    badgeVariant: 'info' as const,
  },
];

function gradeColor(grade: number) {
  if (grade >= 80) return 'text-green-400';
  if (grade >= 65) return 'text-amber-400';
  return 'text-red-400';
}

function trendColor(trend: string) {
  if (trend === '↑') return 'text-green-400';
  if (trend === '↓') return 'text-red-400';
  return 'text-white/40';
}

function levelBadgeVariant(level: string) {
  if (level === 'C1' || level === 'C2') return 'success' as const;
  if (level === 'B2') return 'info' as const;
  if (level === 'B1') return 'ghost' as const;
  return 'warning' as const;
}

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 40, -40, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -40, 40, 0], y: [0, -80, 80, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              Contigo 🌟
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/teacher/classroom"
                className="flex items-center gap-1.5 text-sm text-white/70 hover:text-orange-400 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Classroom Map
              </Link>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                🧑‍🏫
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Teacher Dashboard
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
            {KPI_CARDS.map((kpi, index) => {
              const Icon = kpi.icon;
              return (
                <motion.div
                  key={index}
                  className={`backdrop-blur-md bg-gradient-to-br ${kpi.color} border ${kpi.borderColor} rounded-2xl p-5 hover:border-white/30 transition-all cursor-default`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0px 20px 40px rgba(249,123,79,0.1)' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/10">
                      <Icon className="w-5 h-5 text-orange-400" />
                    </div>
                    <Badge variant={kpi.badgeVariant} className="text-[10px]">
                      {kpi.badge}
                    </Badge>
                  </div>
                  <p className="text-white/60 text-xs mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:border-white/20">
              <CardHeader>
                <CardTitle>📈 Class Average — Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceBarChart color="#F97B4F" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Student Table */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>👥 Student Overview</CardTitle>
                  <Link
                    href="/teacher/classroom"
                    className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
                  >
                    Classroom Map
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-3 text-left text-white/50 font-medium">Student</th>
                        <th className="pb-3 text-left text-white/50 font-medium">Level</th>
                        <th className="pb-3 text-left text-white/50 font-medium">Grade</th>
                        <th className="pb-3 text-left text-white/50 font-medium">Mood</th>
                        <th className="pb-3 text-left text-white/50 font-medium">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CLASS_STUDENTS.map((student, i) => (
                        <motion.tr
                          key={i}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                        >
                          <td className="py-3 font-medium text-white">{student.name}</td>
                          <td className="py-3">
                            <Badge variant={levelBadgeVariant(student.level)}>
                              {student.level}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <span className={`font-bold ${gradeColor(student.grade)}`}>
                              {student.grade}%
                            </span>
                          </td>
                          <td className="py-3 text-white/70">{student.mood}/10</td>
                          <td className="py-3">
                            <span className={`text-lg font-bold ${trendColor(student.trend)}`}>
                              {student.trend}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insight */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
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
                <p className="font-semibold text-white text-base mb-2">Tigo AI Insight</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Three students in your class show a downward trend in both grades and mood scores.
                  Consider a one-on-one check-in with Fatima Zahra, who has shown a 15% grade drop
                  over the last 3 weeks alongside reduced engagement. 📋
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
