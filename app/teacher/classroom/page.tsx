'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import TigoChat from '@/components/TigoChat';
import Logo from '@/components/Logo';
import { HEATMAP_KPIS, INVERSE_HEATMAP_KPIS, GRADE_THRESHOLDS } from '@/lib/constants';
import { MOCK_SEATS } from '@/lib/services/mockData';
import { buildClassroomSeats, seatScoreClassForKpi } from '@/lib/utils';
import { useDebounce } from '@/lib/hooks';
import type { HeatmapKpi, ClassroomSeat } from '@/lib/types';

const SEATS: ClassroomSeat[] = buildClassroomSeats(MOCK_SEATS);

function legendForKpi(kpi: HeatmapKpi) {
  const inverted = INVERSE_HEATMAP_KPIS.has(kpi);
  if (inverted) {
    return [
      { color: 'bg-green-500', label: 'Low (calm)' },
      { color: 'bg-amber-500', label: 'Moderate' },
      { color: 'bg-orange-500', label: 'Elevated' },
      { color: 'bg-red-500', label: 'High (anxious)' },
    ];
  }
  return [
    { color: 'bg-green-500', label: `High (${GRADE_THRESHOLDS.high} to 100)` },
    { color: 'bg-amber-500', label: `Medium (${GRADE_THRESHOLDS.medium} to ${GRADE_THRESHOLDS.high - 1})` },
    { color: 'bg-orange-500', label: `Low (${GRADE_THRESHOLDS.low} to ${GRADE_THRESHOLDS.medium - 1})` },
    { color: 'bg-red-500', label: `At risk (under ${GRADE_THRESHOLDS.low})` },
  ];
}

export default function ClassroomPage() {
  const [activeKpi, setActiveKpi] = useState<HeatmapKpi>('Speaking');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);

  const selected = SEATS.find((s) => s.id === selectedSeat) ?? null;

  const insight = useMemo(() => {
    const front = SEATS.filter((s) => s.row === 1).reduce((sum, s) => sum + s.scores[activeKpi], 0) / 6;
    const back = SEATS.filter((s) => s.row === 3).reduce((sum, s) => sum + s.scores[activeKpi], 0) / 6;
    return { front: front.toFixed(0), back: back.toFixed(0), diff: (front - back).toFixed(0) };
  }, [activeKpi]);

  const legend = legendForKpi(activeKpi);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 50, -50, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
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
            <Link
              href="/teacher/dashboard"
              className="text-sm text-white/70 hover:text-orange-400 transition-colors"
            >
              ← Teacher Dashboard
            </Link>
          </div>
        </motion.nav>

        <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">Classroom Seating Map 🪑</h1>
            <p className="text-white/60 text-lg mt-2">Room 12, Grade 5B. Live KPI heatmap.</p>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex flex-wrap gap-2">
              {HEATMAP_KPIS.map((kpi) => (
                <motion.button
                  key={kpi}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveKpi(kpi)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all backdrop-blur-md ${
                    activeKpi === kpi
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40'
                      : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {kpi}
                </motion.button>
              ))}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a student"
              className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400/50 md:w-64"
            />
          </motion.div>

          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white text-center py-2.5 rounded-xl mb-3 text-sm font-medium border border-white/10">
              📺 Whiteboard / Projector
            </div>
            <div className="text-center text-xs text-white/50 mb-6">🧑‍🏫 Teacher&apos;s Desk</div>

            <div className="space-y-4">
              {[1, 2, 3].map((row) => (
                <div key={row} className="flex justify-center gap-3 flex-wrap">
                  {SEATS.filter((s) => s.row === row).map((seat) => {
                    const matched =
                      !debouncedSearch ||
                      seat.name.toLowerCase().includes(debouncedSearch.toLowerCase());
                    const score = seat.scores[activeKpi];
                    return (
                      <motion.button
                        key={seat.id}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSelectedSeat(seat.id === selectedSeat ? null : seat.id)
                        }
                        className={`w-24 h-20 rounded-xl flex flex-col items-center justify-center text-xs font-semibold shadow-lg transition-all ${seatScoreClassForKpi(
                          score,
                          activeKpi
                        )} ${
                          selectedSeat === seat.id
                            ? 'ring-4 ring-orange-300 scale-105'
                            : matched
                            ? ''
                            : 'opacity-30'
                        }`}
                      >
                        <span>{seat.name}</span>
                        <span className="font-bold text-base mt-1">{score}%</span>
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
              {legend.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2 text-white/70">
                  <div className={`w-3 h-3 rounded ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="backdrop-blur-md bg-white/5 border border-orange-400/30 rounded-2xl p-6"
              >
                <h3 className="font-bold text-white text-lg mb-4">
                  📍 {selected.name}, Seat {selected.id}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
                  {HEATMAP_KPIS.map((k) => (
                    <div key={k} className="bg-white/5 rounded-xl p-3 border border-white/10">
                      <p className="text-white/50 text-xs">{k}</p>
                      <p className="font-bold text-orange-300 text-lg">{selected.scores[k]}%</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                <p className="font-semibold text-white mb-2">Tigo Insight</p>
                <p className="text-white/80">
                  Front row averages {insight.front}% on {activeKpi.toLowerCase()}, while the back row sits at {insight.back}%. That is a {insight.diff} point gap. Try rotating seating next week and re measure.
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
