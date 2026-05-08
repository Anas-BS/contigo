// Utility functions for Contigo platform

/**
 * Get color class based on score
 */
export function getScoreColorClass(score: number): string {
  if (score >= 80) return 'text-green-600';
  if (score >= 65) return 'text-amber-600';
  return 'text-red-500';
}

/**
 * Get background color class based on score for heatmap
 */
export function getScoreBgColorClass(score: number): string {
  if (score >= 80) return 'bg-green-400 text-white';
  if (score >= 65) return 'bg-yellow-400 text-white';
  if (score >= 50) return 'bg-orange-400 text-white';
  return 'bg-red-500 text-white';
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
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
