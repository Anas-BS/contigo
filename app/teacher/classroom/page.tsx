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

function seatStyle(score: number, selected: boolean): React.CSSProperties {
  let bg: string;
  let borderColor: string;
  if (score >= 80) { bg = 'rgba(40, 184, 154, 0.15)'; borderColor = '#28B89A'; }
  else if (score >= 65) { bg = 'rgba(212, 160, 23, 0.15)'; borderColor = '#D4A017'; }
  else if (score >= 50) { bg = 'rgba(232, 99, 42, 0.15)'; borderColor = '#E8632A'; }
  else { bg = 'rgba(196, 58, 58, 0.18)'; borderColor = '#C43A3A'; }

  return {
    background: bg,
    border: `1px solid ${borderColor}`,
    boxShadow: selected ? `0 0 12px ${borderColor}80, inset 0 0 8px ${borderColor}30` : 'none',
    transform: selected ? 'scale(1.07)' : 'scale(1)',
    transition: 'all 0.15s',
  };
}

function scoreColor(score: number): string {
  if (score >= 80) return '#28B89A';
  if (score >= 65) return '#D4A017';
  if (score >= 50) return '#E8632A';
  return '#C43A3A';
}

export default function ClassroomPage() {
  const [activeKpi, setActiveKpi] = useState('Speaking');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const selected = SEATS.find((s) => s.id === selectedSeat);

  return (
    <div className="min-h-screen" style={{ background: 'var(--arc-bg)' }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-3 border-b"
        style={{ background: 'var(--arc-surface)', borderColor: 'var(--arc-border)' }}>
        <Link href="/" className="text-xl font-bold tracking-widest uppercase text-glow-orange"
          style={{ color: 'var(--arc-orange)', fontFamily: 'Barlow Condensed, monospace' }}>
          CONTIGO
        </Link>
        <Link href="/teacher/dashboard" className="arc-label transition-colors"
          style={{ color: 'var(--arc-blue)' }}>
          — Teacher Dashboard
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div>
          <div className="arc-label mb-1">// TACTICAL SEATING MAP</div>
          <h1 className="text-3xl font-bold tracking-widest uppercase"
            style={{ color: 'var(--arc-text)', fontFamily: 'Barlow Condensed, monospace' }}>
            Classroom Seating Map
          </h1>
          <div className="arc-divider w-48 mt-2" />
          <p className="arc-label mt-2">Room 12 — Grade 5B — KPI Heatmap</p>
        </div>

        {/* KPI Selector */}
        <div className="flex flex-wrap gap-2">
          {HEATMAP_KPIS.map((kpi) => (
            <button
              key={kpi}
              onClick={() => setActiveKpi(kpi)}
              className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                fontFamily: 'Barlow Condensed, monospace',
                background: activeKpi === kpi ? 'var(--arc-orange)' : 'var(--arc-surface)',
                border: `1px solid ${activeKpi === kpi ? 'var(--arc-orange)' : 'var(--arc-border)'}`,
                color: activeKpi === kpi ? '#fff' : 'var(--arc-muted)',
                clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                boxShadow: activeKpi === kpi ? '0 0 10px rgba(232,99,42,0.4)' : 'none',
              }}
            >
              {kpi}
            </button>
          ))}
        </div>

        {/* Classroom Map */}
        <div className="arc-panel p-6">
          {/* Board */}
          <div className="text-center py-2 mb-2 text-xs font-bold tracking-widest uppercase"
            style={{ background: 'var(--arc-border)', color: 'var(--arc-muted)', fontFamily: 'Barlow Condensed, monospace' }}>
            WHITEBOARD / PROJECTOR
          </div>
          <div className="text-center arc-label mb-6">Instructor Desk</div>

          {/* Seats Grid */}
          <div className="space-y-4">
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex justify-center gap-3 flex-wrap">
                {SEATS.filter((s) => s.row === row).map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => setSelectedSeat(seat.id === selectedSeat ? null : seat.id)}
                    className="w-24 h-16 flex flex-col items-center justify-center"
                    style={seatStyle(seat.score, selectedSeat === seat.id)}
                  >
                    <span className="text-xs font-semibold tracking-wide"
                      style={{ color: 'var(--arc-text)', fontFamily: 'Barlow Condensed, monospace' }}>
                      {seat.name}
                    </span>
                    <span className="text-sm font-bold mt-0.5"
                      style={{ color: scoreColor(seat.score), fontFamily: 'Share Tech Mono, monospace' }}>
                      {seat.score}%
                    </span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {[
              { color: '#28B89A', label: 'High (80–100)' },
              { color: '#D4A017', label: 'Medium (65–79)' },
              { color: '#E8632A', label: 'Low (50–64)' },
              { color: '#C43A3A', label: 'At-Risk (<50)' },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2 arc-label">
                <div className="w-2.5 h-2.5" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Seat Detail */}
        {selected && (
          <div className="arc-panel p-5">
            <div className="arc-label mb-3" style={{ color: 'var(--arc-orange)' }}>
              {selected.name} — Seat {selected.id}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm" style={{ fontFamily: 'Barlow Condensed, monospace' }}>
              <div>
                <span className="arc-label">KPI ({activeKpi})</span>
                <p className="font-bold text-lg" style={{ color: 'var(--arc-orange)' }}>{selected.score}%</p>
              </div>
              <div>
                <span className="arc-label">Row</span>
                <p className="font-bold text-lg" style={{ color: 'var(--arc-text)' }}>{selected.row}</p>
              </div>
              <div>
                <span className="arc-label">Zone</span>
                <p className="font-bold text-lg" style={{ color: 'var(--arc-text)' }}>
                  {selected.row === 1 ? 'Front' : selected.row === 2 ? 'Middle' : 'Back'}
                </p>
              </div>
              <div>
                <span className="arc-label">Status</span>
                <p className="font-bold text-lg" style={{ color: selected.score >= 65 ? '#28B89A' : '#C43A3A' }}>
                  {selected.score >= 65 ? 'On Track' : 'At Risk'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Insight */}
        <div className="arc-panel p-5">
          <div className="arc-label mb-2" style={{ color: 'var(--arc-orange)' }}>Tigo AI Insight</div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--arc-text)' }}>
            Front-centre seats score 38% higher on {activeKpi.toLowerCase()} on average.
            Back row students average 3.9 vs 8.2 for front row. Consider rotating seating next week.
          </p>
        </div>
      </div>

      <TigoChat />
    </div>
  );
}
