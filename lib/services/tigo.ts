import type { AuthRole } from '@/lib/context/AuthContext';
import { GRADE_THRESHOLDS } from '@/lib/constants';
import { getAttentionReasons, mean, round } from '@/lib/utils';
import {
  MOCK_ALERTS,
  MOCK_GRADE_BREAKDOWN,
  MOCK_MOOD_DATA,
  MOCK_PERFORMANCE_DATA,
  MOCK_SKILLS_DATA,
  MOCK_STUDENTS,
} from '@/lib/services/mockData';

/** Suggested prompts per role. Each one has a data-backed answer below. */
export const TIGO_PROMPTS: Record<AuthRole, string[]> = {
  student: ['How am I doing this week?', 'What should I focus on?', 'What is my strongest skill?'],
  teacher: ['Who needs attention?', 'How is the class trending?'],
  admin: ['Which grade needs support?', 'Summarise the open alerts'],
};

function skills() {
  return MOCK_SKILLS_DATA.map((s) => ({ skill: s.skill ?? '', score: s.score ?? 0 })).sort((a, b) => b.score - a.score);
}

/**
 * Preview assistant. Answers are computed from the same sample data shown on screen,
 * so nothing Tigo says contradicts the page. Unknown questions get an honest fallback.
 */
export function tigoReply(role: AuthRole, question: string): string {
  const q = question.toLowerCase();

  if (role === 'student') {
    const ranked = skills();
    if (/strong|best/.test(q)) {
      const top = ranked[0];
      return `${top.skill} is your strongest skill at ${top.score}%. ${ranked[1].skill} is close behind at ${ranked[1].score}%.`;
    }
    if (/focus|improve|work on|weak/.test(q)) {
      const low = ranked[ranked.length - 1];
      return `${low.skill} is your lowest skill at ${low.score}%. Two short, focused sessions this week will do more than one long one. Your opinion essay draft on Monday is a good place to practise.`;
    }
    if (/how am i|doing|progress|week/.test(q)) {
      const avg = round(mean(ranked.map((s) => s.score)));
      const moods = MOCK_MOOD_DATA.map((m) => m.mood ?? 0);
      return `Across your six skills you average ${avg}%. Your check-ins this week average ${round(mean(moods), 1)} out of 10. Steady progress, nothing to worry about.`;
    }
    return fallback(role);
  }

  if (role === 'teacher') {
    if (/attention|who|risk|support/.test(q)) {
      const flagged = MOCK_STUDENTS.map((s) => ({ s, r: getAttentionReasons(s) })).filter((x) => x.r.length > 0);
      if (flagged.length === 0) return 'No one stands out this week.';
      return flagged.map(({ s, r }) => `${s.name}: ${r.join(', ').toLowerCase()}.`).join(' ');
    }
    if (/trend|class|average/.test(q)) {
      const first = MOCK_PERFORMANCE_DATA[0];
      const last = MOCK_PERFORMANCE_DATA[MOCK_PERFORMANCE_DATA.length - 1];
      const diff = (last.score ?? 0) - (first.score ?? 0);
      return `The class average moved from ${first.score}% in ${first.name} to ${last.score}% in ${last.name}, ${diff >= 0 ? 'up' : 'down'} ${Math.abs(diff)} points. April was the only dip.`;
    }
    return fallback(role);
  }

  if (/grade|support|lowest/.test(q)) {
    const grades = MOCK_GRADE_BREAKDOWN.map((g) => ({ name: g.name ?? '', score: g.score ?? 0 }));
    const avg = round(mean(grades.map((g) => g.score)));
    const low = [...grades].sort((a, b) => a.score - b.score)[0];
    return `${low.name} has the lowest average at ${low.score}%, ${avg - low.score} points below the school average of ${avg}%. The at-risk threshold is ${GRADE_THRESHOLDS.atRisk}%.`;
  }
  if (/alert|summar/.test(q)) {
    const high = MOCK_ALERTS.filter((a) => a.urgency === 'high');
    return `${MOCK_ALERTS.length} open alerts, ${high.length} high urgency: ${high.map((a) => a.alert.toLowerCase()).join('; ')}.`;
  }
  return fallback(role);
}

function fallback(role: AuthRole): string {
  return `This preview of Tigo can only answer a few questions so far. Try: ${TIGO_PROMPTS[role].map((p) => `"${p}"`).join(', ')}.`;
}
