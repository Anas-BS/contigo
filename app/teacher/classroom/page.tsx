'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TigoChat from '@/components/TigoChat';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Monitor, User } from 'lucide-react';

const HEATMAP_KPIS = ['Speaking', 'Mood', 'Engagement', 'Anxiety', 'Grade'];

// 3 rows × 6 seats
const SEATS = [
  { id: 'R1C1', row: 1, col: 1, name: 'Sara A.', score: 82 },
  { id: 'R1C2', row: 1, col: 2, name: 'Omar H.', score: 75 },
  { id: 'R1C3', row: 1, col: 3, name: 'Ali N.', score: 91 },
  { id: 'R1C4', row: 1, col: 4, name: 'Lena K.', score: 68 },
  { id: 'R1C5', row: 1, col: 5, name: 'Fatima Z.', score: 55 },
  { id: 'R1C6', row: 1, col: 6, name: 'Hassan M.', score: 77 },
  { id: 'R2C1', row: 2, col: 1, name: 'Nour S.', score: 70 },
  { id: 'R2C2', row: 2, col: 2, name: 'Karim B.', score: 62 },
  { id: 'R2C3', row: 2, col: 3, name: 'Rania F.', score: 85 },
  { id: 'R2C4', row: 2, col: 4, name: 'Tariq L.', score: 48 },
  { id: 'R2C5', row: 2, col: 5, name: 'Dina M.', score: 79 },
  { id: 'R2C6', row: 2, col: 6, name: 'Youssef K.', score: 73 },
  { id: 'R3C1', row: 3, col: 1, name: 'Mariam T.', score: 41 },
  { id: 'R3C2', row: 3, col: 2, name: 'Khalid A.', score: 38 },
  { id: 'R3C3', row: 3, col: 3, name: 'Sana R.', score: 44 },
  { id: 'R3C4', row: 3, col: 4, name: 'Ahmed W.', score: 35 },
  { id: 'R3C5', row: 3, col: 5, name: 'Layla H.', score: 52 },
  { id: 'R3C6', row: 3, col: 6, name: 'Ismail B.', score: 40 },
];

function scoreGradient(score: number): string {
  if (score >= 80) return 'bg-gradient-to-br from-green-500/80 to-green-600/80 border-green-400/50 shadow-green-500/20';
  if (score >= 65) return 'bg-gradient-to-br from-amber-500/80 to-amber-600/80 border-amber-400/50 shadow-amber-500/20';
  if (score >= 50) return 'bg-gradient-to-br from-orange-500/80 to-orange-600/80 border-orange-400/50 shadow-orange-500/20';
  return 'bg-gradient-to-br from-red-500/80 to-red-600/80 border-red-400/50 shadow-red-500/20';
}

function scoreBadgeVariant(score: number) {
  if (score >= 80) return 'success' as const;
  if (score >= 65) return 'warning' as const;
  if (score >= 50) return 'default' as const;
  return 'danger' as const;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function ClassroomPage() {
  const [activeKpi, setActiveKpi] = useState('Speaking');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const selected = SEATS.find((s) => s.id === selectedSeat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 60, -60, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -50, 50, 0], y: [0, -60, 60, 0] }}
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
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
            >
              Contigo 🌟
            </Link>
            <Link
              href="/teacher/dashboard"
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-orange-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Teacher Dashboard
            </Link>
          </div>
        </motion.nav>

        <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Classroom Seating Map
            </h1>
            <p className="text-white/60 text-lg">Room 12 — Grade 5B — KPI Heatmap</p>
          </motion.div>

          {/* KPI Selector */}
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {HEATMAP_KPIS.map((kpi) => (
              <motion.button
                key={kpi}
                onClick={() => setActiveKpi(kpi)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeKpi === kpi
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'backdrop-blur-md bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {kpi}
              </motion.button>
            ))}
          </motion.div>

          {/* Classroom Map */}
          <motion.div
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Board */}
            <motion.div
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-slate-700/80 to-slate-600/80 border border-white/10 text-white/80 py-3 rounded-xl mb-3 text-sm font-medium backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Monitor className="w-4 h-4" />
              Whiteboard / Projector
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-white/40 text-xs mb-8">
              <User className="w-3.5 h-3.5" />
              Teacher&apos;s Desk
            </div>

            {/* Seats Grid */}
            <div className="space-y-4">
              {[1, 2, 3].map((row) => (
                <motion.div
                  key={row}
                  className="flex justify-center gap-3 flex-wrap"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {SEATS.filter((s) => s.row === row).map((seat) => (
                    <motion.button
                      key={seat.id}
                      onClick={() => setSelectedSeat(seat.id === selectedSeat ? null : seat.id)}
                      className={`w-24 h-16 rounded-xl border flex flex-col items-center justify-center text-xs font-medium transition-all shadow-md text-white ${scoreGradient(seat.score)} ${
                        selectedSeat === seat.id
                          ? 'ring-2 ring-orange-400 ring-offset-1 ring-offset-transparent scale-105'
                          : 'hover:scale-105'
                      }`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="font-medium">{seat.name}</span>
                      <span className="font-bold mt-0.5 text-white/90">{seat.score}%</span>
                    </motion.button>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-8 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { color: 'bg-green-500', label: 'High (80–100)' },
                { color: 'bg-amber-500', label: 'Medium (65–79)' },
                { color: 'bg-orange-500', label: 'Low (50–64)' },
                { color: 'bg-red-500', label: 'At-Risk (<50)' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-full ${color}`} />
                  <span className="text-white/60">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Selected Seat Detail */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="backdrop-blur-md bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-400/30 rounded-2xl p-5"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  📍 <span>{selected.name}</span>
                  <Badge variant="ghost" className="text-xs">Seat {selected.id}</Badge>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="space-y-0.5">
                    <p className="text-white/50 text-xs">KPI ({activeKpi})</p>
                    <p className="font-bold text-orange-400 text-base">{selected.score}%</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-white/50 text-xs">Row</p>
                    <p className="font-bold text-white text-base">{selected.row}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-white/50 text-xs">Zone</p>
                    <p className="font-bold text-white text-base">
                      {selected.row === 1 ? 'Front' : selected.row === 2 ? 'Middle' : 'Back'}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-white/50 text-xs">Status</p>
                    <Badge variant={scoreBadgeVariant(selected.score)} className="text-xs">
                      {selected.score >= 65 ? 'On Track' : 'At Risk'}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Insight */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🤖
              </motion.span>
              <div>
                <p className="font-semibold text-white text-sm mb-1">Tigo AI Insight</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Front-centre seats score 38% higher on {activeKpi.toLowerCase()} on average.
                  Back row students average 3.9 vs 8.2 for front row. Consider rotating seating next week.
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
