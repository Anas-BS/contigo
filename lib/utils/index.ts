// Utility functions for Contigo platform
import { GRADE_THRESHOLDS, INVERSE_HEATMAP_KPIS } from '@/lib/constants';
import type { HeatmapKpi, Seat, ClassroomSeat, Student } from '@/lib/types';

/**
 * Get color class based on score
 */
export function getScoreColorClass(score: number): string {
  if (score >= GRADE_THRESHOLDS.high) return 'text-positive';
  if (score >= GRADE_THRESHOLDS.medium) return 'text-caution';
  return 'text-critical';
}

export type ScoreTone = 'positive' | 'caution' | 'critical';

/** Semantic tone for a 0 to 100 score, using the shared grade thresholds. */
export function scoreTone(score: number): ScoreTone {
  if (score >= GRADE_THRESHOLDS.high) return 'positive';
  if (score >= GRADE_THRESHOLDS.medium) return 'caution';
  return 'critical';
}

/**
 * Get background color class based on score for heatmap
 */
export function getScoreBgColorClass(score: number): string {
  return seatScoreClass(score);
}

/**
 * Heatmap seat tone based on raw score. Tints stay light so ink text keeps AA contrast.
 */
export function seatScoreClass(score: number): string {
  if (score >= GRADE_THRESHOLDS.high) return 'bg-heat-green text-ink';
  if (score >= GRADE_THRESHOLDS.medium) return 'bg-heat-amber text-ink';
  if (score >= GRADE_THRESHOLDS.low) return 'bg-heat-orange text-ink';
  return 'bg-heat-red text-ink';
}

/**
 * Heatmap seat color taking KPI semantics into account.
 * For Anxiety: low value = calm = green, so invert before coloring.
 */
export function seatScoreClassForKpi(score: number, kpi: HeatmapKpi): string {
  const colorScore = INVERSE_HEATMAP_KPIS.has(kpi) ? 100 - score : score;
  return seatScoreClass(colorScore);
}

/**
 * Derive a full set of KPI scores from a single base score.
 */
export function buildKpiScores(base: number): Record<HeatmapKpi, number> {
  return {
    Speaking: base,
    Mood: Math.max(20, Math.min(100, base + 6)),
    Engagement: Math.max(20, Math.min(100, base - 4)),
    Anxiety: Math.max(0, Math.min(100, 100 - base)),
    Grade: base,
  };
}

/**
 * Lift a flat list of Seats into ClassroomSeats with full KPI matrices.
 */
export function buildClassroomSeats(seats: Seat[]): ClassroomSeat[] {
  return seats.map((seat) => ({ ...seat, scores: buildKpiScores(seat.score) }));
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Get trend emoji
 */
export function getTrendEmoji(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
}

/**
 * Get trend color class
 */
export function getTrendColorClass(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return 'text-positive';
    case 'down':
      return 'text-critical';
    default:
      return 'text-ink-500';
  }
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Human label for a trend direction. */
export function getTrendLabel(trend: 'up' | 'down' | 'stable'): string {
  if (trend === 'up') return 'Rising';
  if (trend === 'down') return 'Falling';
  return 'Steady';
}

export const ATTENTION_RULES = {
  attendanceBelow: 85,
  moodAtOrBelow: 5,
} as const;

/**
 * Concrete reasons a student may need a teacher's attention.
 * An empty array means nothing currently stands out.
 */
export function getAttentionReasons(
  student: Pick<Student, 'grade' | 'mood' | 'trend' | 'attendance'>
): string[] {
  const reasons: string[] = [];
  if (student.grade < GRADE_THRESHOLDS.atRisk) reasons.push(`Grade ${student.grade}%, below ${GRADE_THRESHOLDS.atRisk}%`);
  if (student.attendance !== undefined && student.attendance < ATTENTION_RULES.attendanceBelow)
    reasons.push(`Attendance ${student.attendance}%`);
  if (student.mood <= ATTENTION_RULES.moodAtOrBelow) reasons.push(`Check-in ${student.mood}/10`);
  if (student.trend === 'down') reasons.push('Grade falling');
  return reasons;
}

/** Round to a fixed number of decimals and return a number. */
export function round(value: number, decimals = 0): number {
  const f = 10 ** decimals;
  return Math.round(value * f) / f;
}

/** Arithmetic mean; 0 for an empty list. */
export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
