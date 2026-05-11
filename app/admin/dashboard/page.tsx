'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';
import Logo from '@/components/Logo';
import { Filter } from 'lucide-react';
import {
  MOCK_PLATFORM_STATS,
  MOCK_GRADE_BREAKDOWN,
  MOCK_ALERTS,
  MOCK_TOP_TEACHERS,
} from '@/lib/services/mockData';
import type { ChartDataPoint } from '@/lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function hasName(d: ChartDataPoint): d is ChartDataPoint & { name: string } {
  return typeof d.name === 'string';
}

export default function AdminDashboard() {
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  const filteredGrades = useMemo(() => {
    const named = MOCK_GRADE_BREAKDOWN.filter(hasName).map((g) => ({
      name: g.name,
      score: g.score ?? 0,
    }));
    return gradeFilter === 'all' ? named : named.filter((g) => g.name === gradeFilter);
  }, [gradeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{ x: [0, 50, -50, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -60, 60, 0], y: [0, -80, 80, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        <motion.nav
          className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo size={112} />
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70 hidden md:block">The Full Picture</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold">
                🏛️
              </div>
            </div>
          </div>
        </motion.nav>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Admin Overview 🏛️</h1>
            <p className="text-white/60 text-lg mt-2">School wide ELT intelligence dashboard.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {MOCK_PLATFORM_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.04, y: -4 }}
                className={`backdrop-blur-md bg-gradient-to-br ${stat.gradient} border ${stat.border} rounded-2xl p-5 text-center`}
              >
                <span className="text-3xl">{stat.emoji}</span>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                <p className="text-xs text-white/60 font-medium mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-xl font-bold text-white">Average Score by Grade</h2>
              <div className="flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4 text-white/50" />
                <select
                  value={gradeFilter}
                  onChange={(e) => setGradeFilter(e.target.value)}
                  aria-label="Filter by grade"
                  title="Filter by grade"
                  className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400/50"
                >
                  <option value="all" className="bg-slate-800">All grades</option>
                  {MOCK_GRADE_BREAKDOWN.filter(hasName).map((g) => (
                    <option key={g.name} value={g.name} className="bg-slate-800">
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <PerformanceBarChart data={filteredGrades} color="#A78BFA" />
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">🏆 Top Performing Teachers</h2>
              <div className="space-y-3">
                {MOCK_TOP_TEACHERS.map((t) => (
                  <div
                    key={t.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{t.name}</p>
                      <p className="text-xs text-white/50">{t.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-300">{t.avg}%</p>
                      <p className="text-xs text-white/50">Wellbeing {t.wellbeing}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">⚠️ At Risk Alerts</h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {MOCK_ALERTS.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      className="flex items-start gap-3 text-sm bg-white/5 border border-white/10 rounded-xl p-3"
                    >
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          item.urgency === 'high'
                            ? 'bg-red-400'
                            : item.urgency === 'medium'
                            ? 'bg-amber-300'
                            : 'bg-emerald-300'
                        }`}
                      />
                      <span className="text-white/80">{item.alert}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
              <div>
                <p className="font-semibold text-white text-lg mb-2">Tigo School Summary</p>
                <p className="text-white/80 leading-relaxed">
                  This week the school average for speaking dropped 4%. The strongest signal
                  behind the dip is unstable seating in Grades 4 to 6. Suggestion: lock seating
                  for three weeks, then remeasure speaking confidence. Expected lift, 6 to 9%.
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
