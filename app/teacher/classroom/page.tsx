'use client';

import { useState } from 'react';
import Link from 'next/link';
import TigoChat from '@/components/TigoChat';

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
  if (score >= 80) return 'bg-green-400 text-white';
  if (score >= 65) return 'bg-yellow-400 text-white';
  if (score >= 50) return 'bg-orange-400 text-white';
  return 'bg-red-500 text-white';
}

export default function ClassroomPage() {
  const [activeKpi, setActiveKpi] = useState('Speaking');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const selected = SEATS.find((s) => s.id === selectedSeat);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-[#F97B4F] font-bold text-xl">Contigo 🌟</Link>
        <Link href="/teacher/dashboard" className="text-sm text-[#2E6FDF] hover:underline">← Teacher Dashboard</Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Classroom Seating Map 🪑</h1>
          <p className="text-gray-500 text-sm mt-1">Room 12 — Grade 5B — KPI Heatmap</p>
        </div>

        {/* KPI Selector */}
        <div className="flex flex-wrap gap-2">
          {HEATMAP_KPIS.map((kpi) => (
            <button
              key={kpi}
              onClick={() => setActiveKpi(kpi)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeKpi === kpi
                  ? 'bg-[#F97B4F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
              {kpi}
            </button>
          ))}
        </div>

        {/* Classroom */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {/* Board */}
          <div className="bg-gray-800 text-white text-center py-2 rounded-lg mb-4 text-sm font-medium">
            📺 Whiteboard / Projector
          </div>
          <div className="text-center text-xs text-gray-500 mb-6">🧑‍🏫 Teacher&apos;s Desk</div>

          {/* Seats Grid */}
          <div className="space-y-4">
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex justify-center gap-3 flex-wrap">
                {SEATS.filter((s) => s.row === row).map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => setSelectedSeat(seat.id === selectedSeat ? null : seat.id)}
                    className={`w-24 h-16 rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all shadow-sm ${scoreColor(seat.score)} ${
                      selectedSeat === seat.id ? 'ring-4 ring-[#F97B4F] scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <span>{seat.name}</span>
                    <span className="font-bold mt-0.5">{seat.score}%</span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
            {[
              { color: 'bg-green-400', label: 'High (80–100)' },
              { color: 'bg-yellow-400', label: 'Medium (65–79)' },
              { color: 'bg-orange-400', label: 'Low (50–64)' },
              { color: 'bg-red-500', label: 'At-Risk (<50)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded ${color}`} />
                <span className="text-gray-600">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Seat Detail */}
        {selected && (
          <div className="bg-white rounded-xl p-5 shadow-sm border border-orange-100">
            <h3 className="font-semibold text-gray-800 mb-3">📍 {selected.name} — Seat {selected.id}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div><span className="text-gray-500">KPI ({activeKpi}):</span> <span className="font-bold text-[#F97B4F]">{selected.score}%</span></div>
              <div><span className="text-gray-500">Row:</span> <span className="font-bold">{selected.row}</span></div>
              <div><span className="text-gray-500">Zone:</span> <span className="font-bold">{selected.row === 1 ? 'Front' : selected.row === 2 ? 'Middle' : 'Back'}</span></div>
              <div><span className="text-gray-500">Status:</span> <span className={`font-bold ${selected.score >= 65 ? 'text-green-600' : 'text-red-500'}`}>{selected.score >= 65 ? 'On Track' : 'At Risk'}</span></div>
            </div>
          </div>
        )}

        {/* AI Insight */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Tigo AI Insight</p>
              <p className="text-gray-700 text-sm mt-1">
                Front-centre seats score 38% higher on {activeKpi.toLowerCase()} on average.
                Back row students average 3.9 vs 8.2 for front row. Consider rotating seating next week.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TigoChat role="teacher" />
    </div>
  );
}
