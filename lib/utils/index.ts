// Utility functions for Contigo platform
import { GRADE_THRESHOLDS, INVERSE_HEATMAP_KPIS } from '@/lib/constants';
import type { HeatmapKpi, Seat, ClassroomSeat } from '@/lib/types';

/**
 * Get color class based on score
 */
export function getScoreColorClass(score: number): string {
  if (score >= GRADE_THRESHOLDS.high) return 'text-green-600';
  if (score >= GRADE_THRESHOLDS.medium) return 'text-amber-600';
  return 'text-red-500';
}

/**
 * Get background color class based on score for heatmap
 */
export function getScoreBgColorClass(score: number): string {
  if (score >= GRADE_THRESHOLDS.high) return 'bg-green-400 text-white';
  if (score >= GRADE_THRESHOLDS.medium) return 'bg-yellow-400 text-white';
  if (score >= GRADE_THRESHOLDS.low) return 'bg-orange-400 text-white';
  return 'bg-red-500 text-white';
}

/**
 * Heatmap seat color (gradient flavour) based on raw score.
 */
export function seatScoreClass(score: number): string {
  if (score >= GRADE_THRESHOLDS.high)
    return 'bg-gradient-to-br from-green-400 to-green-600 text-white';
  if (score >= GRADE_THRESHOLDS.medium)
    return 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white';
  if (score >= GRADE_THRESHOLDS.low)
    return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
  return 'bg-gradient-to-br from-red-500 to-red-700 text-white';
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
      return 'text-green-500';
    case 'down':
      return 'text-red-500';
    default:
      return 'text-gray-400';
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
