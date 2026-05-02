'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, BarChart3, AlertTriangle, Heart, Bot } from 'lucide-react';

const PLATFORM_STATS = [
  { label: 'Total Students', value: '342', icon: GraduationCap, color: 'from-orange-500/20 to-orange-600/20', borderColor: 'border-orange-400/30', iconColor: 'text-orange-400' },
  { label: 'Active Teachers', value: '18', icon: Users, color: 'from-blue-500/20 to-blue-600/20', borderColor: 'border-blue-400/30', iconColor: 'text-blue-400' },
  { label: 'School Average', value: '71%', icon: BarChart3, color: 'from-teal-500/20 to-teal-600/20', borderColor: 'border-teal-400/30', iconColor: 'text-teal-400' },
  { label: 'At-Risk Students', value: '24', icon: AlertTriangle, color: 'from-red-500/20 to-red-600/20', borderColor: 'border-red-400/30', iconColor: 'text-red-400' },
  { label: 'Avg Wellbeing', value: '7.1/10', icon: Heart, color: 'from-amber-500/20 to-amber-600/20', borderColor: 'border-amber-400/30', iconColor: 'text-amber-400' },
  { label: 'Tigo Sessions', value: '1,204', icon: Bot, color: 'from-purple-500/20 to-purple-600/20', borderColor: 'border-purple-400/30', iconColor: 'text-purple-400' },
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

const ALERTS = [
  { alert: '3 students below 40% in Grade 5B', urgency: 'high' },
  { alert: 'Mood drop detected in Grade 3A this week', urgency: 'medium' },
  { alert: 'Attendance below 80% — 4 students', urgency: 'high' },
  { alert: 'Speaking anxiety spike in Grade 6B', urgency: 'medium' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 60, -60, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -40, 40, 0], y: [0, -60, 60, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
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
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60 hidden md:block">The Full Picture</span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-sm">
                🏛️
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
              Admin Dashboard
            </h1>
            <p className="text-white/60 text-lg">School-wide ELT Intelligence Dashboard</p>
          </motion.div>

          {/* Platform Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PLATFORM_STATS.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className={`backdrop-blur-md bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-2xl p-4 text-center hover:border-white/30 transition-all`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, boxShadow: '0px 15px 30px rgba(249,123,79,0.1)' }}
                >
                  <Icon className={`w-5 h-5 ${stat.iconColor} mx-auto mb-2`} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60 mt-0.5 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Grade Breakdown Chart */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:border-white/20">
              <CardHeader>
                <CardTitle>📊 Average Score by Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <PerformanceBarChart data={GRADE_BREAKDOWN} color="#2E6FDF" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Two Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Teachers */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full hover:border-white/20">
                <CardHeader>
                  <CardTitle>🏆 Top Performing Teachers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {TOP_TEACHERS.map((t, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400/20 to-orange-600/20 border border-orange-400/20 flex items-center justify-center text-orange-400 text-xs font-bold">
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{t.name}</p>
                            <p className="text-xs text-white/50">{t.class}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-orange-400">{t.avg}%</p>
                          <p className="text-xs text-white/50">Wellbeing: {t.wellbeing}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* At-Risk Alerts */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.35 }}
            >
              <Card className="h-full hover:border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>⚠️ At-Risk Alerts</CardTitle>
                    <Badge variant="danger">4 Active</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {ALERTS.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 text-sm p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.07 }}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            item.urgency === 'high' ? 'bg-red-400' : 'bg-amber-400'
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-white/80">{item.alert}</p>
                        </div>
                        <Badge variant={item.urgency === 'high' ? 'danger' : 'warning'} className="text-[10px] flex-shrink-0">
                          {item.urgency}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* AI Insight Banner */}
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
                <p className="font-semibold text-white text-base mb-2">Tigo School Intelligence Summary</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  This week&apos;s data shows a 4% drop in average speaking scores school-wide.
                  The strongest predictor of this decline is increased seating instability in
                  Grades 4–6. Recommendation: implement fixed seating for 3 weeks and re-measure
                  speaking confidence scores. Estimated improvement: +6–9%.
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
