'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TigoChat from '@/components/TigoChat';
import { ArrowLeft } from 'lucide-react';

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

function scoreColor(score: number): string {
  if (score >= 80) return 'bg-gradient-to-br from-green-400 to-green-500 text-white border-green-300/40';
  if (score >= 65) return 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white border-yellow-300/40';
  if (score >= 50) return 'bg-gradient-to-br from-orange-400 to-orange-500 text-white border-orange-300/40';
  return 'bg-gradient-to-br from-red-500 to-red-600 text-white border-red-400/40';
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function ClassroomPage() {
  const [activeKpi, setActiveKpi] = useState('Speaking');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const selected = SEATS.find((s) => s.id === selectedSeat);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 40, -40, 0], y: [0, 60, -60, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -40, 40, 0], y: [0, -60, 60, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
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
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Contigo 🌟
            </Link>
            <motion.div whileHover={{ x: -3 }}>
              <Link
                href="/teacher/dashboard"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-orange-400 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Teacher Dashboard
              </Link>
            </motion.div>
          </div>
        </motion.nav>

        <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
          {/* Header */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-white">
              Classroom Seating Map <span className="text-3xl">🪑</span>
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
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md ${
                  activeKpi === kpi
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-glow-sm border border-orange-400/50'
                    : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:border-white/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {kpi}
              </motion.button>
            ))}
          </motion.div>

          {/* Classroom */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Board */}
            <motion.div
              className="bg-gradient-to-r from-slate-700 to-slate-600 text-white/80 text-center py-3 rounded-xl mb-4 text-sm font-medium border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              📺 Whiteboard / Projector
            </motion.div>
            <div className="text-center text-xs text-white/40 mb-6">🧑‍🏫 Teacher&apos;s Desk</div>

            {/* Seats Grid */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex justify-center gap-3 flex-wrap">
                  {SEATS.filter((s) => s.row === row).map((seat) => (
                    <motion.button
                      key={seat.id}
                      onClick={() => setSelectedSeat(seat.id === selectedSeat ? null : seat.id)}
                      className={`w-24 h-16 rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all shadow-md border ${scoreColor(seat.score)} ${
                        selectedSeat === seat.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                      }`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>{seat.name}</span>
                      <span className="font-bold mt-0.5">{seat.score}%</span>
                    </motion.button>
                  ))}
                </div>
              ))}
            </motion.div>

            {/* Legend */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-6 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { color: 'bg-green-400', label: 'High (80–100)' },
                { color: 'bg-yellow-400', label: 'Medium (65–79)' },
                { color: 'bg-orange-400', label: 'Low (50–64)' },
                { color: 'bg-red-500', label: 'At-Risk (<50)' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded ${color}`} />
                  <span className="text-white/50">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Selected Seat Detail */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="backdrop-blur-md bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-400/30 rounded-2xl p-6"
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-semibold text-white mb-4">📍 {selected.name} — Seat {selected.id}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  {[
                    { label: `KPI (${activeKpi})`, value: `${selected.score}%`, highlight: true },
                    { label: 'Row', value: `Row ${selected.row}` },
                    { label: 'Zone', value: selected.row === 1 ? 'Front' : selected.row === 2 ? 'Middle' : 'Back' },
                    { label: 'Status', value: selected.score >= 65 ? 'On Track' : 'At Risk', status: selected.score >= 65 ? 'good' : 'bad' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <p className="text-white/50 text-xs mb-1">{item.label}</p>
                      <p className={`font-bold text-lg ${item.highlight ? 'text-orange-400' : item.status === 'good' ? 'text-green-400' : item.status === 'bad' ? 'text-red-400' : 'text-white'}`}>
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* AI Insight */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-4">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🤖
              </motion.span>
              <div>
                <p className="font-semibold text-white mb-2">Tigo AI Insight</p>
                <p className="text-white/70 text-sm leading-relaxed">
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
