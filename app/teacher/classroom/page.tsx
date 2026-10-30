'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, Input, PageHeader, Panel, Segmented, StatusTag, buttonStyles } from '@/components/ui';
import { cx } from '@/components/ui/cx';
import { BarList } from '@/components/charts/BarList';
import { HEATMAP_KPIS, INVERSE_HEATMAP_KPIS, GRADE_THRESHOLDS } from '@/lib/constants';
import { MOCK_SEATS } from '@/lib/services/mockData';
import { buildClassroomSeats, getInitials, mean, round, seatScoreClassForKpi } from '@/lib/utils';
import { useDebounce } from '@/lib/hooks';
import type { HeatmapKpi, ClassroomSeat } from '@/lib/types';

const SEATS: ClassroomSeat[] = buildClassroomSeats(MOCK_SEATS);
const ROWS = [1, 2, 3] as const;
const ROW_NAME: Record<number, string> = { 1: 'Front', 2: 'Middle', 3: 'Back' };

type Mode = 'signals' | 'attendance';
type Presence = 'present' | 'late' | 'absent';
const NEXT_PRESENCE: Record<Presence, Presence> = { present: 'late', late: 'absent', absent: 'present' };
const PRESENCE_STYLE: Record<Presence, string> = {
  present: 'bg-paper-raised text-ink border-line-strong',
  late: 'bg-caution-soft text-caution border-caution/40',
  absent: 'bg-critical-soft text-critical border-critical/40 line-through decoration-1',
};
const PRESENCE_LABEL: Record<Presence, string> = { present: 'Present', late: 'Late', absent: 'Absent' };

function legendForKpi(kpi: HeatmapKpi) {
  if (INVERSE_HEATMAP_KPIS.has(kpi)) {
    return [
      { color: 'bg-heat-green', label: `Calm, ${100 - GRADE_THRESHOLDS.high} or under` },
      { color: 'bg-heat-amber', label: `${101 - GRADE_THRESHOLDS.high} to ${100 - GRADE_THRESHOLDS.medium}` },
      { color: 'bg-heat-orange', label: `${101 - GRADE_THRESHOLDS.medium} to ${100 - GRADE_THRESHOLDS.low}` },
      { color: 'bg-heat-red', label: `High, over ${100 - GRADE_THRESHOLDS.low}` },
    ];
  }
  return [
    { color: 'bg-heat-green', label: `${GRADE_THRESHOLDS.high}+` },
    { color: 'bg-heat-amber', label: `${GRADE_THRESHOLDS.medium} to ${GRADE_THRESHOLDS.high - 1}` },
    { color: 'bg-heat-orange', label: `${GRADE_THRESHOLDS.low} to ${GRADE_THRESHOLDS.medium - 1}` },
    { color: 'bg-heat-red', label: `Under ${GRADE_THRESHOLDS.low}` },
  ];
}

export default function ClassroomPage() {
  const [mode, setMode] = useState<Mode>('signals');
  const [activeKpi, setActiveKpi] = useState<HeatmapKpi>('Speaking');
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);
  const [presence, setPresence] = useState<Record<string, Presence>>(() => Object.fromEntries(SEATS.map((s) => [s.id, 'present'])));
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const selected = SEATS.find((s) => s.id === selectedSeat) ?? null;
  const inverted = INVERSE_HEATMAP_KPIS.has(activeKpi);
  const legend = legendForKpi(activeKpi);

  const rowAverages = useMemo(
    () => ROWS.map((r) => ({ row: r, avg: round(mean(SEATS.filter((s) => s.row === r).map((s) => s.scores[activeKpi]))) })),
    [activeKpi]
  );
  const gap = rowAverages[0].avg - rowAverages[2].avg;

  const counts = useMemo(() => {
    const values = Object.values(presence);
    return {
      present: values.filter((v) => v === 'present').length,
      late: values.filter((v) => v === 'late').length,
      absent: values.filter((v) => v === 'absent').length,
    };
  }, [presence]);

  const q = debouncedSearch.trim().toLowerCase();
  const matchCount = q ? SEATS.filter((s) => s.name.toLowerCase().includes(q)).length : SEATS.length;

  const onSeat = (seat: ClassroomSeat) => {
    if (mode === 'attendance') {
      setPresence((p) => ({ ...p, [seat.id]: NEXT_PRESENCE[p[seat.id]] }));
      setSavedAt(null);
      return;
    }
    setSelectedSeat(seat.id === selectedSeat ? null : seat.id);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Room 12 · Grade 5B · English"
        title="Classroom"
        description="Signals and attendance laid out as the room is. Select a seat to see that student’s full picture."
        actions={
          <Link href="/teacher/dashboard" className={buttonStyles({ variant: 'ghost', size: 'sm' })}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Class overview
          </Link>
        }
      />

      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
          <Segmented
            label="Mode"
            hideLabel={false}
            value={mode}
            onChange={(m) => { setMode(m); setSelectedSeat(null); }}
            options={[{ value: 'signals', label: 'Signals' }, { value: 'attendance', label: 'Take attendance' }]}
          />
          {mode === 'signals' && (
            <Segmented label="Signal shown on seats" hideLabel={false} value={activeKpi} onChange={setActiveKpi} options={HEATMAP_KPIS.map((k) => ({ value: k, label: k }))} />
          )}
        </div>
        <div className="sm:w-64">
          <label htmlFor="seat-search" className="label mb-2 block">Find a student</label>
          <Input id="seat-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name" className="h-9 text-sm" />
          <p className="sr-only" aria-live="polite">{q ? `${matchCount} matching seat${matchCount === 1 ? '' : 's'}` : ''}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Panel
          className="lg:col-span-8"
          title={mode === 'signals' ? `${activeKpi} by seat` : 'Register'}
          description={mode === 'signals' ? (inverted ? 'Lower is calmer.' : 'Higher is better.') : 'Select a seat to cycle present, late and absent.'}
        >
          <div className="mb-5 border-b-2 border-ink pb-1.5 text-center">
            <span className="label text-ink-700">Front · Whiteboard</span>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {ROWS.map((row) => (
              <div key={row} className="grid grid-cols-[1.25rem_minmax(0,1fr)] items-center gap-2 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-3">
                <span className="label -rotate-90 whitespace-nowrap text-center sm:rotate-0 sm:text-left">
                  <span className="sm:hidden">{row}</span>
                  <span className="hidden sm:inline">{ROW_NAME[row]}</span>
                </span>
                <div className="grid grid-cols-[repeat(6,minmax(0,1fr))] gap-1.5 sm:gap-2.5">
                  {SEATS.filter((s) => s.row === row).map((seat) => {
                    const matched = !q || seat.name.toLowerCase().includes(q);
                    const score = seat.scores[activeKpi];
                    const isSelected = selectedSeat === seat.id;
                    const p = presence[seat.id];
                    return (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => onSeat(seat)}
                        aria-pressed={mode === 'signals' ? isSelected : undefined}
                        className={cx(
                          'flex h-14 min-w-0 flex-col sm:aspect-[5/4] sm:h-auto items-start justify-between rounded border p-1.5 text-left transition-[opacity,box-shadow,border-color] duration-150 sm:p-2.5',
                          mode === 'signals' ? cx(seatScoreClassForKpi(score, activeKpi), 'border-transparent hover:border-ink/40') : PRESENCE_STYLE[p],
                          isSelected && 'ring-2 ring-ink ring-offset-2 ring-offset-paper-raised',
                          !matched && 'opacity-25'
                        )}
                      >
                        <span className="w-full truncate text-[11px] font-medium leading-4 sm:text-[13px]">
                          <span className="sm:hidden" aria-hidden="true">{getInitials(seat.name)}</span>
                          <span className="sr-only sm:not-sr-only">{seat.name}</span>
                        </span>
                        {/* Visible text leads the accessible name (WCAG 2.5.3); context follows for screen readers. */}
                        {mode === 'signals' ? (
                          <span className="num font-mono text-sm font-medium leading-none sm:text-lg">
                            {score}
                            <span className="sr-only">, {activeKpi}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium uppercase tracking-wide sm:text-2xs">
                            {PRESENCE_LABEL[p]}
                            <span className="sr-only">, select to change</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {mode === 'signals' && (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-ink-600" aria-label={`${activeKpi} colour key`}>
              {legend.map(({ color, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <span className={cx('h-3 w-5 rounded-sm', color)} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <div className="lg:col-span-4">
          {mode === 'attendance' ? (
            <Panel title="Today’s register" description={`${SEATS.length} students on the seating plan`}>
              <dl className="grid grid-cols-3 divide-x divide-line border-y border-line">
                {(['present', 'late', 'absent'] as const).map((k) => (
                  <div key={k} className="px-3 py-3 first:pl-0">
                    <dt className="label">{PRESENCE_LABEL[k]}</dt>
                    <dd className={cx('num mt-1 font-display text-2xl', k === 'absent' && counts.absent ? 'text-critical' : 'text-ink')}>{counts[k]}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button onClick={() => setSavedAt(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }))}>Save register</Button>
                <Button variant="ghost" onClick={() => { setPresence(Object.fromEntries(SEATS.map((s) => [s.id, 'present']))); setSavedAt(null); }}>
                  Mark all present
                </Button>
              </div>
              <p role="status" aria-live="polite" className="mt-3 text-[13px] text-ink-500">
                {savedAt ? `Saved at ${savedAt}. Demo only: the register is kept until you leave this page.` : 'Not saved yet.'}
              </p>
            </Panel>
          ) : selected ? (
            <Panel
              eyebrow={`Seat ${selected.id} · ${ROW_NAME[selected.row]} row`}
              title={selected.name}
              actions={<Button variant="ghost" size="sm" onClick={() => setSelectedSeat(null)}>Clear</Button>}
            >
              <BarList
                label={`Signals for ${selected.name}`}
                data={HEATMAP_KPIS.map((k) => ({
                  key: k,
                  label: INVERSE_HEATMAP_KPIS.has(k) ? `${k} (lower is calmer)` : k,
                  value: selected.scores[k],
                  emphasis: k === activeKpi,
                }))}
              />
              <div className="mt-5 border-t border-line pt-4">
                {selected.scores.Grade < GRADE_THRESHOLDS.atRisk ? (
                  <StatusTag tone="critical" dot>Below the {GRADE_THRESHOLDS.atRisk}% at-risk line</StatusTag>
                ) : (
                  <StatusTag tone="positive" dot>On track</StatusTag>
                )}
              </div>
            </Panel>
          ) : (
            <Panel title="Front to back" description={`Average ${activeKpi.toLowerCase()} by row`}>
              <BarList
                label={`Average ${activeKpi} by row`}
                data={rowAverages.map((r) => ({ key: String(r.row), label: `${ROW_NAME[r.row]} row`, value: r.avg, emphasis: r.row === 3 && !inverted && gap > 10 }))}
                unit=""
              />
              <p className="mt-5 border-t border-line pt-4 text-sm leading-6 text-ink-700">
                {Math.abs(gap) < 5
                  ? `Little difference between front and back for ${activeKpi.toLowerCase()}.`
                  : `The front row ${inverted ? (gap > 0 ? 'reports more' : 'reports less') : gap > 0 ? 'is ahead by' : 'is behind by'} ${inverted ? `anxiety, a ${Math.abs(gap)} point gap` : `${Math.abs(gap)} points`}. Seating is one factor among many; consider a rotation and compare in three weeks.`}
              </p>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
