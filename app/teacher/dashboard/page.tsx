'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, ArrowRight, Minus, Plus, Search } from 'lucide-react';
import { Button, Dialog, Field, Input, MetricStrip, PageHeader, Panel, Select, StatusTag, buttonStyles, controlStyles } from '@/components/ui';
import { cx } from '@/components/ui/cx';
import { LineTrend } from '@/components/charts/LineTrend';
import { Meter } from '@/components/charts/Meter';
import { MOCK_PERFORMANCE_DATA, MOCK_STUDENTS } from '@/lib/services/mockData';
import { GRADE_THRESHOLDS } from '@/lib/constants';
import { useDebounce } from '@/lib/hooks';
import { ATTENTION_RULES, clamp, getAttentionReasons, getTrendLabel, mean, round, scoreTone } from '@/lib/utils';
import type { CEFRLevel, Student, TrendDirection } from '@/lib/types';

interface Note {
  text: string;
  at: string;
}
type TeacherStudent = Student & { notes: Note[] };
type SortKey = 'name' | 'grade' | 'attendance' | 'mood';

const INITIAL_STUDENTS: TeacherStudent[] = MOCK_STUDENTS.map((s) => ({ ...s, notes: [] }));
const NAME_PATTERN = /^[A-Za-zÀ-ÿ' -]+$/;
const CEFR_OPTIONS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'];
const TREND = MOCK_PERFORMANCE_DATA.map((d) => ({ label: d.name ?? '', value: d.score ?? 0 }));

function TrendCell({ trend }: { trend: TrendDirection }) {
  const Icon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;
  return (
    <span className={cx('inline-flex items-center gap-1 text-[13px]', trend === 'up' ? 'text-positive' : trend === 'down' ? 'text-critical' : 'text-ink-500')}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {getTrendLabel(trend)}
    </span>
  );
}

function GradeCell({ grade }: { grade: number }) {
  const tone = scoreTone(grade);
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className={cx('num w-9 text-right font-medium', tone === 'critical' ? 'text-critical' : 'text-ink')}>{grade}%</span>
      <Meter value={grade} tone={tone === 'critical' ? 'critical' : 'ink'} className="hidden xl:block" />
    </span>
  );
}

export default function TeacherDashboard() {
  const [students, setStudents] = useState<TeacherStudent[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);
  const [levelFilter, setLevelFilter] = useState<'all' | CEFRLevel>('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'name', dir: 'asc' });
  const [showAdd, setShowAdd] = useState(false);
  const [newStudent, setNewStudent] = useState<{ name: string; level: CEFRLevel; grade: string }>({ name: '', level: 'B1', grade: '70' });
  const [formErrors, setFormErrors] = useState<{ name?: string; grade?: string }>({});
  const [announcement, setAnnouncement] = useState('');
  const [activeStudent, setActiveStudent] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showAdd) nameRef.current?.focus();
  }, [showAdd]);

  useEffect(() => {
    if (!announcement) return;
    const t = setTimeout(() => setAnnouncement(''), 5000);
    return () => clearTimeout(t);
  }, [announcement]);

  const stats = useMemo(() => {
    const flagged = students.filter((s) => getAttentionReasons(s).length > 0);
    return {
      total: students.length,
      classAvg: round(mean(students.map((s) => s.grade))),
      attendance: round(mean(students.filter((s) => s.attendance !== undefined).map((s) => s.attendance as number))),
      avgMood: round(mean(students.map((s) => s.mood)), 1),
      flagged,
    };
  }, [students]);

  const trendDelta = TREND[TREND.length - 1].value - TREND[0].value;

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    const rows = students.filter((s) => (!q || s.name.toLowerCase().includes(q)) && (levelFilter === 'all' || s.level === levelFilter));
    const dir = sort.dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      if (sort.key === 'name') return a.name.localeCompare(b.name) * dir;
      return (((a[sort.key] ?? 0) as number) - ((b[sort.key] ?? 0) as number)) * dir;
    });
  }, [students, debouncedSearch, levelFilter, sort]);

  const followUps = useMemo(
    () => students.flatMap((s) => s.notes.map((n) => ({ ...n, student: s.name, id: s.id }))).slice(0, 5),
    [students]
  );

  const validateNewStudent = () => {
    const errors: { name?: string; grade?: string } = {};
    const name = newStudent.name.trim();
    if (!name) errors.name = 'Enter the student’s full name.';
    else if (!NAME_PATTERN.test(name)) errors.name = 'Use letters, spaces, hyphens and apostrophes only.';
    const grade = Number(newStudent.grade);
    if (newStudent.grade.trim() === '' || !Number.isInteger(grade)) errors.grade = 'Enter a whole number.';
    else if (grade < 0 || grade > 100) errors.grade = 'Enter a value from 0 to 100.';
    return errors;
  };

  const addStudent = (e: FormEvent) => {
    e.preventDefault();
    const errors = validateNewStudent();
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    const name = newStudent.name.trim();
    setStudents((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        role: 'student',
        grade: clamp(parseInt(newStudent.grade, 10), 0, 100),
        mood: 7,
        trend: 'stable',
        level: newStudent.level,
        notes: [],
      },
    ]);
    setNewStudent({ name: '', level: 'B1', grade: '70' });
    setShowAdd(false);
    setAnnouncement(`${name} was added to the roster.`);
  };

  const addNote = (e: FormEvent) => {
    e.preventDefault();
    const text = noteDraft.trim();
    if (!text || activeStudent === null) return;
    const at = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    setStudents((prev) => prev.map((s) => (s.id === activeStudent ? { ...s, notes: [{ text, at }, ...s.notes] } : s)));
    setNoteDraft('');
  };

  const openNotes = (id: string) => {
    setActiveStudent(id);
    setNoteDraft('');
  };

  const toggleSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'name' ? 'asc' : 'desc' }));

  const active = students.find((s) => s.id === activeStudent) ?? null;

  const SortHeader = ({ k, children, align = 'left' }: { k: SortKey; children: string; align?: 'left' | 'right' }) => (
    <th scope="col" aria-sort={sort.key === k ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'} className={cx('px-3 py-2.5 font-normal', align === 'right' && 'text-right')}>
      <button
        type="button"
        onClick={() => toggleSort(k)}
        className={cx('label inline-flex items-center gap-1 rounded-sm hover:text-ink', sort.key === k && 'text-ink')}
      >
        {children}
        {sort.key === k ? (sort.dir === 'asc' ? <ArrowUp className="h-3 w-3" aria-hidden="true" /> : <ArrowDown className="h-3 w-3" aria-hidden="true" />) : null}
      </button>
    </th>
  );

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Grade 5B · English · Term 2, week 11"
        title="Class overview"
        description={`${stats.total} students. Start with the students flagged below, then work through the roster.`}
        actions={
          <>
            <Link href="/teacher/classroom" className={buttonStyles({ variant: 'secondary' })}>
              Open classroom
            </Link>
            <Button onClick={() => { setShowAdd((v) => !v); setFormErrors({}); }} aria-expanded={showAdd} aria-controls="add-student">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add student
            </Button>
          </>
        }
      />

      <p role="status" aria-live="polite" className={cx('text-sm', announcement ? 'rounded border border-positive/30 bg-positive-soft px-4 py-2.5 text-positive' : 'sr-only')}>
        {announcement}
      </p>

      {showAdd && (
        <Panel id="add-student" title="Add a student" description="They will appear in the roster straight away." className="animate-rise-in">
          <form onSubmit={addStudent} noValidate className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto] md:items-start">
            <Field label="Full name" error={formErrors.name}>
              {({ id, describedBy, invalid }) => (
                <Input ref={nameRef} id={id} aria-describedby={describedBy} aria-invalid={invalid} autoComplete="off" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
              )}
            </Field>
            <Field label="CEFR level">
              {({ id }) => (
                <Select id={id} value={newStudent.level} onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value as CEFRLevel })}>
                  {CEFR_OPTIONS.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </Select>
              )}
            </Field>
            <Field label="Current grade (%)" error={formErrors.grade}>
              {({ id, describedBy, invalid }) => (
                <Input id={id} aria-describedby={describedBy} aria-invalid={invalid} inputMode="numeric" value={newStudent.grade} onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })} />
              )}
            </Field>
            <div className="flex gap-2 md:pt-[26px]">
              <Button type="submit">Save student</Button>
              <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        </Panel>
      )}

      <MetricStrip
        items={[
          { label: 'Class average', value: stats.classAvg, unit: '%', context: `${trendDelta >= 0 ? 'Up' : 'Down'} ${Math.abs(trendDelta)} points since ${TREND[0].label}` },
          { label: 'Attendance', value: stats.attendance, unit: '%', context: 'Term to date' },
          {
            label: 'Need attention',
            value: stats.flagged.length,
            tone: stats.flagged.length ? 'critical' : 'default',
            context: `of ${stats.total} students`,
          },
          { label: 'Average check-in', value: stats.avgMood, unit: '/10', context: 'Self-reported, last 7 days' },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Panel
          className="lg:col-span-7 lg:self-start"
          title="Needs attention this week"
          description={`Flagged when grade is under ${GRADE_THRESHOLDS.atRisk}%, attendance under ${ATTENTION_RULES.attendanceBelow}%, check-in at ${ATTENTION_RULES.moodAtOrBelow}/10 or lower, or grade is falling.`}
          flush
        >
          {stats.flagged.length === 0 ? (
            <p className="px-5 py-8 text-sm text-ink-500">No one stands out this week.</p>
          ) : (
            <ul className="divide-y divide-line">
              {stats.flagged.map((s) => {
                const reasons = getAttentionReasons(s);
                return (
                  <li key={s.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-ink">
                        {s.name} <span className="ml-1 text-[13px] font-normal text-ink-500">{s.level}</span>
                      </p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5" aria-label={`Reasons for ${s.name}`}>
                        {reasons.map((r) => (
                          <li key={r}>
                            <StatusTag tone={r.startsWith('Grade') ? 'critical' : 'caution'}>{r}</StatusTag>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => openNotes(s.id)} className="self-start sm:self-center">
                      {s.notes.length ? `Notes (${s.notes.length})` : 'Add note'}
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <div className="space-y-6 lg:col-span-5">
          <Panel title="Class average" description={`Monthly, ${TREND[0].label} to ${TREND[TREND.length - 1].label}`}>
            <LineTrend data={TREND} title="Class average by month" min={50} max={100} reference={{ value: GRADE_THRESHOLDS.atRisk, label: `At-risk line, ${GRADE_THRESHOLDS.atRisk}%` }} height={150} />
          </Panel>
          <Panel title="Follow-ups" description="Notes you add this session, newest first." flush>
            {followUps.length === 0 ? (
              <p className="px-5 py-5 text-sm text-ink-500">Notes you add to a student appear here, so follow-ups don’t get lost.</p>
            ) : (
              <ul className="divide-y divide-line">
                {followUps.map((n, i) => (
                  <li key={i} className="px-5 py-3">
                    <button type="button" onClick={() => openNotes(n.id)} className="w-full text-left">
                      <span className="flex justify-between gap-4 text-[13px]">
                        <span className="font-medium text-ink">{n.student}</span>
                        <span className="num text-ink-500">{n.at}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-ink-600">{n.text}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>

      <Panel
        id="roster"
        title="Roster"
        description={filtered.length === stats.total ? `${stats.total} students` : `Showing ${filtered.length} of ${stats.total} students`}
        actions={
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <div className="relative min-w-0 flex-1 sm:w-56 sm:flex-none">
              <label htmlFor="roster-search" className="sr-only">Search students by name</label>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" aria-hidden="true" />
              <Input id="roster-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name" className="h-9 pl-9 text-sm" />
            </div>
            <div className="w-32">
              <label htmlFor="roster-level" className="sr-only">Filter by level</label>
              <Select id="roster-level" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value as 'all' | CEFRLevel)} className="h-9 text-sm">
                <option value="all">All levels</option>
                {CEFR_OPTIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </Select>
            </div>
          </div>
        }
        flush
      >
        {/* Table on medium screens and up */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <caption className="sr-only">Students in Grade 5B. Column headers sort the table.</caption>
            <thead className="border-b border-line bg-paper">
              <tr className="text-left">
                <SortHeader k="name">Student</SortHeader>
                <th scope="col" className="label px-3 py-2.5 font-medium">Level</th>
                <SortHeader k="grade">Grade</SortHeader>
                <SortHeader k="attendance">Attendance</SortHeader>
                <SortHeader k="mood">Check-in</SortHeader>
                <th scope="col" className="label px-3 py-2.5 font-medium">Trend</th>
                <th scope="col" className="px-5 py-2.5 text-right"><span className="sr-only">Notes</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((s) => {
                const flagged = getAttentionReasons(s).length > 0;
                return (
                  <tr key={s.id} className="transition-colors hover:bg-paper">
                    <td className="py-3 pl-5 pr-3">
                      <span className="flex items-center gap-2">
                        {flagged && <span className="h-1.5 w-1.5 rounded-full bg-critical" aria-hidden="true" />}
                        <span className={cx('font-medium text-ink', !flagged && 'pl-3.5')}>{s.name}</span>
                        {flagged && <span className="sr-only">(needs attention)</span>}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-ink-700">{s.level}</td>
                    <td className="px-3 py-3"><GradeCell grade={s.grade} /></td>
                    <td className={cx('num px-3 py-3', s.attendance !== undefined && s.attendance < ATTENTION_RULES.attendanceBelow ? 'text-critical' : 'text-ink-700')}>
                      {s.attendance !== undefined ? `${s.attendance}%` : <span className="text-ink-500">No record</span>}
                    </td>
                    <td className="num px-3 py-3 text-ink-700">{s.mood}/10</td>
                    <td className="px-3 py-3"><TrendCell trend={s.trend} /></td>
                    <td className="py-3 pl-3 pr-5 text-right">
                      <button type="button" onClick={() => openNotes(s.id)} className="rounded-sm text-[13px] font-medium text-ember-700 hover:text-ember-800 hover:underline">
                        {s.notes.length ? `${s.notes.length} note${s.notes.length > 1 ? 's' : ''}` : 'Add note'}
                        <span className="sr-only"> for {s.name}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Stacked rows on small screens */}
        <ul className="divide-y divide-line md:hidden">
          {filtered.map((s) => (
            <li key={s.id} className="px-4 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{s.name}</p>
                  <p className="text-[13px] text-ink-500">Level {s.level}</p>
                </div>
                <TrendCell trend={s.trend} />
              </div>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-[13px]">
                <div><dt className="label">Grade</dt><dd className={cx('num mt-0.5 font-medium', scoreTone(s.grade) === 'critical' ? 'text-critical' : 'text-ink')}>{s.grade}%</dd></div>
                <div><dt className="label">Attend.</dt><dd className="num mt-0.5 text-ink">{s.attendance !== undefined ? `${s.attendance}%` : 'No record'}</dd></div>
                <div><dt className="label">Check-in</dt><dd className="num mt-0.5 text-ink">{s.mood}/10</dd></div>
              </dl>
              <button type="button" onClick={() => openNotes(s.id)} className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-ember-700">
                {s.notes.length ? `${s.notes.length} note${s.notes.length > 1 ? 's' : ''}` : 'Add note'}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-ink-700">No students match those filters.</p>
            <button type="button" className="link mt-1 text-sm" onClick={() => { setSearch(''); setLevelFilter('all'); }}>
              Clear filters
            </button>
          </div>
        )}
      </Panel>

      <Dialog open={Boolean(active)} onClose={() => setActiveStudent(null)} title={active ? `Notes on ${active.name}` : ''} description="Private to you. Students and families cannot see these.">
        {active && (
          <div className="space-y-5 p-5">
            <form onSubmit={addNote} className="space-y-2">
              <label htmlFor="note-draft" className="block text-[13px] font-medium text-ink-700">New note</label>
              <textarea
                id="note-draft"
                data-autofocus
                rows={3}
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addNote(e);
                }}
                placeholder="One observation, and what you will do next"
                className={cx(controlStyles, 'resize-none py-2')}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-ink-500">Ctrl + Enter to save</p>
                <Button type="submit" size="sm" disabled={!noteDraft.trim()}>Save note</Button>
              </div>
            </form>
            <div>
              <p className="label mb-2">History</p>
              {active.notes.length === 0 ? (
                <p className="text-sm text-ink-500">No notes yet.</p>
              ) : (
                <ol className="divide-y divide-line border-y border-line">
                  {active.notes.map((n, i) => (
                    <li key={i} className="flex gap-4 py-2.5 text-sm">
                      <span className="num w-11 shrink-0 text-[13px] text-ink-500">{n.at}</span>
                      <span className="text-ink-800">{n.text}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
