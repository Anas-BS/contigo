'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { Button, Input, PageHeader, Panel, StatusTag } from '@/components/ui';
import { cx } from '@/components/ui/cx';
import { BarList } from '@/components/charts/BarList';
import { ColumnStrip } from '@/components/charts/ColumnStrip';
import { MOCK_ACTIVITIES, MOCK_MOOD_DATA, MOCK_SKILLS_DATA, MOCK_UPCOMING } from '@/lib/services/mockData';
import { mean, round } from '@/lib/utils';
import type { Activity, ActivityKind, CEFRLevel, ChartDataPoint } from '@/lib/types';

const CEFR_STEPS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1', 'C2'];
/** Speaking level; the overall course level shown to teachers can differ. */
const CURRENT_LEVEL: CEFRLevel = 'B1+';
const GOAL_LEVEL: CEFRLevel = 'B2';
/** Indicative skill score expected at the goal level, for this demo. */
const GOAL_TARGET = 75;
const STREAK_DAYS = 12;

const KIND_LABEL: Record<ActivityKind, string> = { practice: 'Practice', assessment: 'Assessment', class: 'Class', note: 'Your note' };
const UPCOMING_TONE = { assessment: 'info', class: 'neutral', deadline: 'brand' } as const;

function moodWord(v: number) {
  if (v <= 2) return 'Rough';
  if (v <= 4) return 'Low';
  if (v <= 6) return 'Okay';
  if (v <= 8) return 'Good';
  return 'Great';
}

export default function StudentDashboard() {
  const [moodToday, setMoodToday] = useState(7);
  const [moodHistory, setMoodHistory] = useState<ChartDataPoint[]>(MOCK_MOOD_DATA);
  const [moodLogged, setMoodLogged] = useState(false);
  const [goal, setGoal] = useState('Reach B2 speaking level by July');
  const [goalDraft, setGoalDraft] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [logEntry, setLogEntry] = useState('');
  const [activity, setActivity] = useState<Activity[]>(MOCK_ACTIVITIES);

  const skills = useMemo(
    () => MOCK_SKILLS_DATA.map((s) => ({ skill: s.skill ?? '', score: s.score ?? 0 })),
    []
  );
  const ranked = [...skills].sort((a, b) => b.score - a.score);
  const strongest = ranked[0];
  const weakest = ranked[ranked.length - 1];
  const average = round(mean(skills.map((s) => s.score)));
  const belowTarget = skills.filter((s) => s.score < GOAL_TARGET);

  const logMood = () => {
    setMoodHistory((prev) => {
      const next = [...prev];
      next[next.length - 1] = { date: 'Today', mood: moodToday };
      return next;
    });
    setMoodLogged(true);
  };

  const addLogEntry = (e: FormEvent) => {
    e.preventDefault();
    const text = logEntry.trim();
    if (!text) return;
    setActivity((prev) => [{ id: Date.now(), title: text, time: 'Just now', kind: 'note' }, ...prev]);
    setLogEntry('');
  };

  const saveGoal = (e: FormEvent) => {
    e.preventDefault();
    const value = goalDraft.trim();
    if (value) setGoal(value);
    setEditingGoal(false);
    setGoalDraft('');
  };

  const currentIdx = CEFR_STEPS.indexOf(CURRENT_LEVEL);
  const goalIdx = CEFR_STEPS.indexOf(GOAL_LEVEL);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Grade 5B · English · Term 2, week 11"
        title="Your progress, Sara"
        description={`You average ${average}% across six skills. ${strongest.skill} is your strongest; ${weakest.skill.toLowerCase()} is where practice will pay off most.`}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel
            title="Your goal"
            actions={
              !editingGoal && (
                <Button variant="ghost" size="sm" onClick={() => { setGoalDraft(goal); setEditingGoal(true); }}>
                  Edit goal
                </Button>
              )
            }
          >
            {editingGoal ? (
              <form onSubmit={saveGoal} className="space-y-3">
                <label htmlFor="goal" className="block text-[13px] font-medium text-ink-700">Goal, in your own words</label>
                <Input id="goal" autoFocus value={goalDraft} onChange={(e) => setGoalDraft(e.target.value)} placeholder="For example: give a two-minute talk without notes" />
                <div className="flex gap-2">
                  <Button type="submit" size="sm">Save</Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingGoal(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <p className="font-display text-[1.6rem] leading-8 text-ink">{goal}</p>
            )}

            <div className="mt-6">
              <p className="label mb-3">Speaking level</p>
              <ol className="grid grid-cols-7" aria-label={`Speaking level track. Current level ${CURRENT_LEVEL}, goal ${GOAL_LEVEL}.`}>
                {CEFR_STEPS.map((step, i) => {
                  const done = i <= currentIdx;
                  const isGoal = i === goalIdx;
                  return (
                    <li key={step} className="relative flex flex-col items-center" aria-current={i === currentIdx ? 'step' : undefined}>
                      <span
                        aria-hidden="true"
                        className={cx('absolute left-0 right-1/2 top-[7px] h-0.5', i === 0 ? 'invisible' : i <= currentIdx ? 'bg-ink' : i <= goalIdx ? 'bg-ember-300' : 'bg-line')}
                      />
                      <span
                        aria-hidden="true"
                        className={cx('absolute left-1/2 right-0 top-[7px] h-0.5', i === CEFR_STEPS.length - 1 ? 'invisible' : i < currentIdx ? 'bg-ink' : i < goalIdx ? 'bg-ember-300' : 'bg-line')}
                      />
                      <span
                        aria-hidden="true"
                        className={cx(
                          'relative z-10 h-4 w-4 rounded-full border-2',
                          i === currentIdx ? 'border-ink bg-ink ring-4 ring-ink/10' : done ? 'border-ink bg-ink' : isGoal ? 'border-ember-600 bg-paper-raised' : 'border-line-strong bg-paper-raised'
                        )}
                      />
                      <span className={cx('num mt-2 text-[13px]', i === currentIdx ? 'font-semibold text-ink' : isGoal ? 'font-medium text-ember-700' : 'text-ink-500')}>{step}</span>
                      <span className="mt-0.5 h-4 text-2xs text-ink-500">{i === currentIdx ? 'Now' : isGoal ? 'Goal' : ''}</span>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="mt-5 grid gap-4 border-t border-line pt-4 sm:grid-cols-3">
              <div>
                <p className="label">Skills at target</p>
                <p className="num mt-1 text-sm text-ink"><span className="font-display text-2xl">{skills.length - belowTarget.length}</span> of {skills.length}</p>
              </div>
              <div>
                <p className="label">Practice streak</p>
                <p className="num mt-1 text-sm text-ink"><span className="font-display text-2xl">{STREAK_DAYS}</span> days</p>
              </div>
              <div>
                <p className="label">Next step</p>
                <p className="mt-1 text-sm leading-5 text-ink-700">Two short {weakest.skill.toLowerCase()} sessions before Monday’s essay draft.</p>
              </div>
            </div>
          </Panel>

          <Panel title="Skills" description={`Compared with an indicative ${GOAL_TARGET}% for ${GOAL_LEVEL}. Highlighted skills are below it.`}>
            <BarList
              label="Skill scores"
              data={skills.map((s) => ({ key: s.skill, label: s.skill, value: s.score, emphasis: s.score < GOAL_TARGET }))}
              reference={{ value: GOAL_TARGET, label: `${GOAL_LEVEL} target` }}
            />
          </Panel>

          <Panel title="Activity" description="Your recent work and anything you log yourself." flush>
            <form onSubmit={addLogEntry} className="flex gap-2 border-b border-line px-5 py-4">
              <label htmlFor="quick-win" className="sr-only">Log something you practised</label>
              <Input id="quick-win" value={logEntry} onChange={(e) => setLogEntry(e.target.value)} placeholder="Log something you practised today" autoComplete="off" />
              <Button type="submit" variant="secondary" disabled={!logEntry.trim()}>Log</Button>
            </form>
            <ol className="divide-y divide-line">
              {activity.map((entry) => (
                <li key={entry.id} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 px-5 py-3 sm:grid-cols-[7rem_1fr_auto]">
                  <span className="order-3 col-span-2 sm:order-none sm:col-span-1">
                    <StatusTag tone={entry.kind === 'note' ? 'brand' : entry.kind === 'assessment' ? 'info' : 'neutral'}>{KIND_LABEL[entry.kind]}</StatusTag>
                  </span>
                  <span className="text-sm text-ink">{entry.title}</span>
                  <span className="text-[13px] text-ink-500">{entry.time}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <Panel title="Daily check-in" description="Only you and your teacher can see this.">
            <div className="flex items-baseline justify-between">
              <label htmlFor="mood" className="text-sm text-ink-700">How are you feeling today?</label>
              <p className="text-sm" aria-hidden="true">
                <span className="num font-display text-2xl text-ink">{moodToday}</span>
                <span className="text-ink-500">/10 · {moodWord(moodToday)}</span>
              </p>
            </div>
            <input
              id="mood"
              type="range"
              min={1}
              max={10}
              value={moodToday}
              aria-valuetext={`${moodToday} out of 10, ${moodWord(moodToday)}`}
              onChange={(e) => { setMoodToday(Number(e.target.value)); setMoodLogged(false); }}
              className="mt-3 w-full"
            />
            <div className="mt-1 flex justify-between text-2xs text-ink-500" aria-hidden="true">
              <span>Rough</span>
              <span>Great</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={logMood} size="sm">{moodLogged ? 'Update check-in' : 'Save check-in'}</Button>
              <p role="status" aria-live="polite" className="text-[13px] text-positive">{moodLogged ? 'Saved for today' : ''}</p>
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <p className="label mb-3">This week</p>
              <ColumnStrip
                title="Check-ins this week, out of 10"
                unit="/10"
                max={10}
                height={84}
                data={moodHistory.map((m, i) => ({ label: m.date ?? '', value: m.mood ?? 0, highlight: i === moodHistory.length - 1 }))}
              />
            </div>
          </Panel>

          <Panel title="Coming up" flush>
            <ol className="divide-y divide-line">
              {MOCK_UPCOMING.map((u) => (
                <li key={u.id} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="num text-[13px] font-medium text-ink">{u.when}</p>
                    <StatusTag tone={UPCOMING_TONE[u.kind]}>{u.kind === 'deadline' ? 'Due' : u.kind === 'assessment' ? 'Assessment' : 'Class'}</StatusTag>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink">{u.title}</p>
                  <p className="mt-0.5 text-[13px] leading-5 text-ink-500">{u.detail}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </div>
  );
}
