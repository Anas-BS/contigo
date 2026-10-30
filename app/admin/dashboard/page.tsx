'use client';

import { useMemo, useState } from 'react';
import { MetricStrip, PageHeader, Panel, Select, StatusTag, type MetricItem } from '@/components/ui';
import { BarList } from '@/components/charts/BarList';
import { ColumnStrip } from '@/components/charts/ColumnStrip';
import { Meter } from '@/components/charts/Meter';
import { GRADE_THRESHOLDS } from '@/lib/constants';
import {
  MOCK_ALERTS,
  MOCK_ATTENDANCE_BY_DAY,
  MOCK_GRADE_BREAKDOWN,
  MOCK_PLATFORM_STATS,
  MOCK_TOP_TEACHERS,
} from '@/lib/services/mockData';
import { mean, round } from '@/lib/utils';
import type { Alert } from '@/lib/types';

const GRADES = MOCK_GRADE_BREAKDOWN.map((g) => ({ name: g.name ?? '', score: g.score ?? 0 }));
const SCHOOL_AVG = round(mean(GRADES.map((g) => g.score)));
const URGENCY_ORDER: Record<Alert['urgency'], number> = { high: 0, medium: 1, low: 2 };
const TYPE_LABEL: Record<Alert['type'], string> = { grade: 'Grades', wellbeing: 'Wellbeing', attendance: 'Attendance', anxiety: 'Speaking anxiety' };

const METRIC_CONTEXT: Record<string, Pick<MetricItem, 'context' | 'tone'>> = {
  'Total Students': { context: 'Grades 1 to 6' },
  'Active Teachers': { context: 'Signed in this term' },
  'School Average': { context: 'Mean of grade averages, term to date' },
  'At Risk Students': { context: `Average under ${GRADE_THRESHOLDS.atRisk}%`, tone: 'critical' },
  'Average Wellbeing': { context: 'Student check-ins, last 7 days' },
};

function splitValue(raw: string): { value: string; unit?: string } {
  const m = raw.match(/^([\d.,]+)(.*)$/);
  return m ? { value: m[1], unit: m[2] || undefined } : { value: raw };
}

export default function AdminDashboard() {
  const [focus, setFocus] = useState<string>('all');

  const metrics: MetricItem[] = MOCK_PLATFORM_STATS.filter((s) => s.label in METRIC_CONTEXT).map((s) => {
    const label = s.label.charAt(0) + s.label.slice(1).toLowerCase();
    // School average is derived from the grade breakdown so the strip, chart and brief always agree.
    const value = s.label === 'School Average' ? { value: String(SCHOOL_AVG), unit: '%' } : splitValue(s.value);
    return { label, ...value, ...METRIC_CONTEXT[s.label] };
  });

  const lowest = useMemo(() => [...GRADES].sort((a, b) => a.score - b.score)[0], []);
  const alerts = useMemo(() => [...MOCK_ALERTS].sort((a, b) => URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency]), []);
  const highAlerts = alerts.filter((a) => a.urgency === 'high').length;
  const weekAvg = round(mean(MOCK_ATTENDANCE_BY_DAY.map((d) => d.rate)), 1);
  const weakestDay = [...MOCK_ATTENDANCE_BY_DAY].sort((a, b) => a.rate - b.rate)[0];
  const focused = GRADES.find((g) => g.name === focus);

  return (
    <div className="space-y-8">
      <PageHeader eyebrow="Whole school · Term 2 · Sample data" title="School overview" />

      <section aria-labelledby="brief-title" className="grid gap-4 md:grid-cols-[10rem_1fr]">
        <h2 id="brief-title" className="label pt-1.5">This week in brief</h2>
        <p className="max-w-3xl font-display text-[1.35rem] leading-8 text-ink md:text-[1.5rem] md:leading-9">
          {lowest.name} is furthest below the school average, at {lowest.score}% against {SCHOOL_AVG}%.{' '}
          <span className="text-ember-700">{highAlerts} high-urgency alerts</span> are open.{' '}
          {weakestDay.day === 'Fri' ? 'Friday' : weakestDay.day} is the weakest day for attendance, {round(weekAvg - weakestDay.rate)} points under the weekly average.
        </p>
      </section>

      <MetricStrip items={metrics} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Panel
          className="lg:col-span-7"
          title="Average score by grade"
          description="Grades below the school average are highlighted."
          actions={
            <div className="w-40">
              <label htmlFor="grade-focus" className="sr-only">Focus on a grade</label>
              <Select id="grade-focus" value={focus} onChange={(e) => setFocus(e.target.value)} className="h-9 text-sm">
                <option value="all">All grades</option>
                {GRADES.map((g) => (
                  <option key={g.name} value={g.name}>{g.name}</option>
                ))}
              </Select>
            </div>
          }
        >
          <BarList
            label="Average score by grade"
            data={GRADES.map((g) => ({
              key: g.name,
              label: g.name,
              value: g.score,
              emphasis: g.score < SCHOOL_AVG,
              muted: focus !== 'all' && g.name !== focus,
            }))}
            reference={{ value: SCHOOL_AVG, label: 'School average' }}
          />
          <p className="mt-4 min-h-[1.5rem] text-sm text-ink-700" aria-live="polite">
            {focused
              ? `${focused.name} is ${Math.abs(focused.score - SCHOOL_AVG)} point${Math.abs(focused.score - SCHOOL_AVG) === 1 ? '' : 's'} ${focused.score >= SCHOOL_AVG ? 'above' : 'below'} the school average.`
              : `${GRADES.filter((g) => g.score < SCHOOL_AVG).length} of ${GRADES.length} grades are below the school average.`}
          </p>
        </Panel>

        <Panel className="lg:col-span-5" title="Open alerts" description={`${alerts.length} open, most urgent first`} flush>
          <ul className="divide-y divide-line">
            {alerts.map((a) => (
              <li key={a.alert} className="flex gap-3 px-5 py-3.5">
                <span className="w-16 shrink-0 pt-0.5">
                  <StatusTag tone={a.urgency === 'high' ? 'critical' : a.urgency === 'medium' ? 'caution' : 'neutral'} dot>
                    {a.urgency === 'high' ? 'High' : a.urgency === 'medium' ? 'Medium' : 'Low'}
                  </StatusTag>
                </span>
                <span className="min-w-0">
                  <span className="label block">{TYPE_LABEL[a.type]}</span>
                  <span className="mt-0.5 block text-sm text-ink">{a.alert}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="lg:col-span-5" title="Attendance by weekday" description="Whole school, term to date. Axis starts at 80%.">
          <ColumnStrip
            title="Attendance by weekday"
            unit="%"
            min={80}
            max={100}
            height={120}
            data={MOCK_ATTENDANCE_BY_DAY.map((d) => ({ label: d.day, value: d.rate, highlight: d.day === weakestDay.day }))}
          />
          <p className="mt-4 border-t border-line pt-3 text-sm text-ink-700">
            Weekly average <span className="num font-medium text-ink">{weekAvg}%</span>. {weakestDay.day} is lowest at{' '}
            <span className="num font-medium text-ember-700">{weakestDay.rate}%</span>.
          </p>
        </Panel>

        <Panel className="lg:col-span-7" title="Class results" description="Current class average and student wellbeing, by class." flush>
          <div className="overflow-x-auto" role="region" aria-label="Class results table" tabIndex={0}>
            <table className="w-full min-w-[30rem] text-sm">
              <thead className="border-b border-line bg-paper">
                <tr className="text-left">
                  <th scope="col" className="label px-5 py-2.5 font-medium">Class</th>
                  <th scope="col" className="label px-3 py-2.5 font-medium">Teacher</th>
                  <th scope="col" className="label px-3 py-2.5 font-medium">Average</th>
                  <th scope="col" className="label px-5 py-2.5 text-right font-medium">Wellbeing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {[...MOCK_TOP_TEACHERS].sort((a, b) => a.class.localeCompare(b.class)).map((t) => (
                  <tr key={t.name}>
                    <th scope="row" className="px-5 py-3 text-left font-medium text-ink">{t.class}</th>
                    <td className="px-3 py-3 text-ink-700">{t.name}</td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-3">
                        <span className="num w-9 font-medium text-ink">{t.avg}%</span>
                        <Meter value={t.avg} />
                      </span>
                    </td>
                    <td className="num px-5 py-3 text-right text-ink-700">{t.wellbeing.toFixed(1)}/10</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
