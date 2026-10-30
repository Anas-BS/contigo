import Link from 'next/link';
import Logo from '@/components/Logo';
import { buttonStyles, StatusTag } from '@/components/ui';
import { cx } from '@/components/ui/cx';
import { MOCK_ATTENDANCE_BY_DAY, MOCK_MOOD_DATA, MOCK_SEATS, MOCK_STUDENTS } from '@/lib/services/mockData';
import { TIGO_PROMPTS, tigoReply } from '@/lib/services/tigo';
import { getAttentionReasons, getInitials, mean, round, seatScoreClass } from '@/lib/utils';

const REPO_URL = 'https://github.com/Anas-BS/contigo';

const attention = MOCK_STUDENTS.map((s) => ({ ...s, reasons: getAttentionReasons(s) }))
  .filter((s) => s.reasons.length > 0)
  .sort((a, b) => b.reasons.length - a.reasons.length);
const classAvg = round(mean(MOCK_STUDENTS.map((s) => s.grade)));
const classAttendance = round(mean(MOCK_STUDENTS.map((s) => s.attendance ?? 0)));

const READERS = [
  {
    who: 'Students',
    sees: 'Their own progress toward a level, the skill that needs practice next, and what is coming up this week.',
    never: 'Never a leaderboard or a classmate’s score.',
    href: '/login?next=/student/dashboard',
    cta: 'See the student view',
  },
  {
    who: 'Teachers',
    sees: 'Which students need a conversation and why, attendance, the class trend, and a roster that sorts the way they think.',
    never: 'Never a flag without a reason beside it.',
    href: '/login?next=/teacher/dashboard',
    cta: 'See the teacher view',
  },
  {
    who: 'School leaders',
    sees: 'How grades compare with the school average, where attendance dips during the week, and which alerts are open.',
    never: 'Never individual check-ins or private notes.',
    href: '/login?next=/admin/dashboard',
    cta: 'See the school view',
  },
];

const PRINCIPLES = [
  ['Reasons, not risk scores', 'Every flag names the signal behind it: a grade under 60, attendance under 85%, a low check-in, a falling trend.'],
  ['Progress, not rank', 'Students compare themselves with their own goal. Nothing in their view is ordered against other students.'],
  ['Decisions, not decoration', 'Each chart answers one question and says what it found in a sentence underneath.'],
  ['Honest by default', 'This preview uses fictional sample data. Contigo will not show a number it cannot source.'],
];

function SectionHead({ index, eyebrow, title, id }: { index: string; eyebrow: string; title: string; id: string }) {
  return (
    <div className="grid gap-3 border-t border-ink pt-4 md:grid-cols-12 md:gap-8">
      <p className="label md:col-span-3">
        <span className="num text-ember-700">{index}</span> · {eyebrow}
      </p>
      <h2 id={id} className="font-display text-[2rem] leading-[2.4rem] text-ink md:col-span-9 md:text-[2.75rem] md:leading-[3.1rem]">
        {title}
      </h2>
    </div>
  );
}

function AttentionPreview() {
  return (
    <figure className="relative">
      <div className="overflow-hidden rounded-lg border border-line-strong bg-paper-raised shadow-overlay">
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <div>
            <p className="label">Grade 5B · English</p>
            <p className="mt-0.5 text-sm font-medium text-ink">Needs attention this week</p>
          </div>
          <StatusTag tone="critical">{attention.length} students</StatusTag>
        </div>
        <dl className="grid grid-cols-3 divide-x divide-line border-b border-line">
          {[
            ['Class average', `${classAvg}%`],
            ['Attendance', `${classAttendance}%`],
            ['Check-ins', '6 of 6'],
          ].map(([k, v]) => (
            <div key={k} className="px-5 py-3">
              <dt className="label">{k}</dt>
              <dd className="num mt-1 font-display text-2xl text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <ul className="divide-y divide-line">
          {attention.map((s) => (
            <li key={s.id} className="flex items-start gap-3 px-5 py-3.5">
              <span aria-hidden="true" className="num grid h-8 w-8 shrink-0 place-items-center rounded-full bg-paper-sunken text-xs font-medium text-ink-700">
                {getInitials(s.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium text-ink">{s.name}</p>
                  <p className="num text-sm text-ink-600">{s.grade}%</p>
                </div>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {s.reasons.map((r) => (
                    <li key={r}>
                      <StatusTag tone={r.startsWith('Grade ') ? 'critical' : 'caution'}>{r}</StatusTag>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-line bg-paper px-5 py-3 text-[13px]">
          <span className="text-ink-600">Suggested: schedule a check-in with Fatima</span>
          <span className="font-medium text-ink">Add note</span>
        </div>
      </div>
      <figcaption className="mt-3 text-[13px] text-ink-500">Teacher overview, as it appears in the demo. Sample data.</figcaption>
    </figure>
  );
}

function SeatGrid() {
  const rows = [1, 2, 3];
  return (
    <div aria-hidden="true" className="space-y-1.5">
      <div className="mb-3 border-b border-dashed border-line-strong pb-1 text-center text-2xs uppercase tracking-[0.14em] text-ink-500">Front of room</div>
      {rows.map((r) => (
        <div key={r} className="grid grid-cols-6 gap-1.5">
          {MOCK_SEATS.filter((s) => s.row === r).map((s) => (
            <div key={s.id} className={cx('num grid h-11 place-items-center rounded-sm text-[11px] font-medium', seatScoreClass(s.score))}>
              {s.score}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function MoodStrip() {
  return (
    <div aria-hidden="true" className="flex h-28 items-end gap-2">
      {MOCK_MOOD_DATA.map((m) => (
        <div key={m.date} className="flex flex-1 flex-col items-center gap-1.5">
          <span className="num text-[11px] text-ink-600">{m.mood}</span>
          <div className={cx('w-full rounded-t-sm', (m.mood ?? 0) <= 5 ? 'bg-ember-500' : 'bg-ink-700')} style={{ height: `${(m.mood ?? 0) * 7}px` }} />
          <span className="text-2xs text-ink-500">{m.date}</span>
        </div>
      ))}
    </div>
  );
}

function AttendanceRows() {
  const low = Math.min(...MOCK_ATTENDANCE_BY_DAY.map((d) => d.rate));
  return (
    <div aria-hidden="true" className="divide-y divide-line">
      {MOCK_ATTENDANCE_BY_DAY.map((d) => (
        <div key={d.day} className="flex items-center gap-3 py-2">
          <span className="w-8 text-[13px] text-ink-600">{d.day}</span>
          <div className="h-1.5 flex-1 rounded-full bg-paper-sunken">
            <div className={cx('h-full rounded-full', d.rate === low ? 'bg-ember-600' : 'bg-ink-700')} style={{ width: `${((d.rate - 80) / 20) * 100}%` }} />
          </div>
          <span className={cx('num w-10 text-right text-[13px]', d.rate === low ? 'font-medium text-ember-700' : 'text-ink')}>{d.rate}%</span>
        </div>
      ))}
    </div>
  );
}

function TigoExchange() {
  const q = TIGO_PROMPTS.teacher[0];
  return (
    <div aria-hidden="true" className="space-y-3 text-sm">
      <p className="ml-auto w-fit max-w-[85%] rounded-md bg-ink px-3 py-2 text-paper">{q}</p>
      <p className="max-w-[92%] rounded-md border border-line bg-paper px-3 py-2 leading-6 text-ink">{tigoReply('teacher', q)}</p>
    </div>
  );
}

const CAPABILITIES = [
  {
    title: 'A seating plan that shows the room',
    body: 'Each seat takes the colour of the signal you choose: grades, participation, speaking anxiety. Patterns by row or corner become visible in seconds, and every seat opens the student’s record.',
    artifact: <SeatGrid />,
  },
  {
    title: 'Check-ins that stay with the student',
    body: 'A ten-second daily check-in, private to the student and their teacher. Low days are visible to the people who can help, never to classmates or the wider school.',
    artifact: <MoodStrip />,
  },
  {
    title: 'Attendance with its pattern, not just its total',
    body: 'Teachers take the register on the seating plan. Leaders see where in the week attendance slips, which a single term percentage hides.',
    artifact: <AttendanceRows />,
  },
  {
    title: 'An assistant that reads the same page you do',
    body: 'Tigo answers from the data on screen and says so when it does not know. It is a shortcut to an answer, not a second opinion.',
    artifact: <TigoExchange />,
  },
];

export default function Home() {
  return (
    <div className="bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-page items-center justify-between gap-6 px-5 md:px-8">
          <Logo href="/" />
          <ul className="hidden items-center gap-8 text-sm text-ink-700 md:flex">
            <li><a href="#product" className="transition-colors hover:text-ink">Product</a></li>
            <li><a href="#roles" className="transition-colors hover:text-ink">Who it serves</a></li>
            <li><a href="#principles" className="transition-colors hover:text-ink">Principles</a></li>
          </ul>
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonStyles({ variant: 'ghost', size: 'sm', className: 'hidden sm:inline-flex' })}>Sign in</Link>
            <Link href="/login" className={buttonStyles({ size: 'sm' })}>Open the demo</Link>
          </div>
        </nav>
      </header>

      <main id="main">
        <section aria-labelledby="hero-title" className="mx-auto max-w-page px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6 lg:pt-6">
              <p className="label">Student performance intelligence</p>
              <h1 id="hero-title" className="mt-4 font-display text-[2.75rem] leading-[3rem] tracking-[-0.01em] text-ink md:text-[4rem] md:leading-[4.25rem]">
                Know which student needs you <em className="text-ember-700">before</em> the report card does.
              </h1>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-7 text-ink-700">
                Contigo brings grades, attendance and daily check-ins into one record, then tells each teacher, student and school leader the part that matters to them, with the reason attached.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/login" className={buttonStyles({ size: 'lg' })}>Open the demo</Link>
                <a href="#product" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>See how it works</a>
              </div>
              <p className="mt-5 text-[13px] text-ink-500">Working preview with fictional sample data. No sign-up required.</p>
            </div>
            <div className="lg:col-span-6">
              <AttentionPreview />
            </div>
          </div>
        </section>

        <section id="roles" aria-labelledby="roles-title" className="mx-auto max-w-page scroll-mt-20 px-5 pb-20 md:px-8 md:pb-28">
          <SectionHead index="01" eyebrow="Who it serves" title="One record, three readers. Each sees only what helps them act." id="roles-title" />
          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {READERS.map((r, i) => (
              <article key={r.who} className={cx('flex flex-col', i > 0 && 'md:pl-8', i < 2 && 'md:pr-8')}>
                <h3 className="font-display text-[1.6rem] leading-8 text-ink">{r.who}</h3>
                <p className="mt-3 text-[15px] leading-6 text-ink-700">{r.sees}</p>
                <p className="mt-3 text-[15px] leading-6 text-ink-500">{r.never}</p>
                <Link href={r.href} className="link mt-5 text-sm font-medium">{r.cta}<span aria-hidden="true"> →</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section id="product" aria-labelledby="product-title" className="mx-auto max-w-page scroll-mt-20 px-5 pb-20 md:px-8 md:pb-28">
          <SectionHead index="02" eyebrow="The product" title="Built around the questions teachers already ask on a Monday morning." id="product-title" />
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {CAPABILITIES.map((c, i) => (
              <li key={c.title} className="grid gap-6 py-10 md:grid-cols-12 md:gap-8">
                <p className="num font-display text-[1.75rem] leading-none text-ember-600 md:col-span-1">{String(i + 1).padStart(2, '0')}</p>
                <div className="md:col-span-5">
                  <h3 className="font-display text-[1.6rem] leading-8 text-ink">{c.title}</h3>
                  <p className="mt-3 max-w-[30rem] text-[15px] leading-6 text-ink-700">{c.body}</p>
                </div>
                <div className="rounded-md border border-line bg-paper-raised p-5 md:col-span-6 lg:col-span-5 lg:col-start-8">{c.artifact}</div>
              </li>
            ))}
          </ol>
        </section>

        <section id="principles" aria-labelledby="principles-title" className="scroll-mt-16 bg-ink text-paper">
          <div className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-24">
            <div className="grid gap-3 border-t border-paper/30 pt-4 md:grid-cols-12 md:gap-8">
              <p className="label text-paper/70 md:col-span-3"><span className="num text-ember-300">03</span> · Principles</p>
              <h2 id="principles-title" className="font-display text-paper text-[2rem] leading-[2.4rem] md:col-span-9 md:text-[2.75rem] md:leading-[3.1rem]">
                Data about children deserves restraint.
              </h2>
            </div>
            <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:ml-[25%]">
              {PRINCIPLES.map(([t, d]) => (
                <div key={t} className="border-t border-paper/20 pt-4">
                  <dt className="text-[17px] font-medium">{t}</dt>
                  <dd className="mt-2 text-[15px] leading-6 text-paper/75">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="cta-title" className="mx-auto max-w-page px-5 py-20 md:px-8 md:py-28">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <h2 id="cta-title" className="font-display text-[2.25rem] leading-[2.6rem] text-ink md:col-span-8 md:text-[3.25rem] md:leading-[3.6rem]">
              Walk through a school week as a student, a teacher or a school leader.
            </h2>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <Link href="/login" className={buttonStyles({ size: 'lg' })}>Open the demo</Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto grid max-w-page gap-8 px-5 py-10 text-[13px] text-ink-600 md:grid-cols-12 md:px-8">
          <div className="md:col-span-4">
            <Logo href="/" size="sm" />
            <p className="mt-3 italic text-ink-500">With you, every step.</p>
          </div>
          <p className="leading-5 md:col-span-5">
            Contigo is in active development. This preview runs entirely in your browser with fictional students and teachers; no real school data is used or stored.
          </p>
          <ul className="space-y-2 md:col-span-3 md:text-right">
            <li><Link href="/login" className="hover:text-ink">Sign in</Link></li>
            <li><a href={REPO_URL} className="hover:text-ink" rel="noopener noreferrer">Source on GitHub</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
