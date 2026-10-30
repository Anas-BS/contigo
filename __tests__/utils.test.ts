import {
  getScoreColorClass,
  seatScoreClass,
  seatScoreClassForKpi,
  buildKpiScores,
  buildClassroomSeats,
  getInitials,
  clamp,
  getTrendEmoji,
  getTrendColorClass,
  getAttentionReasons,
  scoreTone,
  mean,
} from '@/lib/utils';
import type { Seat } from '@/lib/types';

describe('getScoreColorClass', () => {
  it('returns positive for >= 80', () => {
    expect(getScoreColorClass(80)).toBe('text-positive');
    expect(getScoreColorClass(99)).toBe('text-positive');
  });
  it('returns caution for 65 to 79', () => {
    expect(getScoreColorClass(65)).toBe('text-caution');
    expect(getScoreColorClass(79)).toBe('text-caution');
  });
  it('returns critical for < 65', () => {
    expect(getScoreColorClass(64)).toBe('text-critical');
    expect(getScoreColorClass(0)).toBe('text-critical');
  });
});

describe('seatScoreClass', () => {
  it('green gradient when high', () => {
    expect(seatScoreClass(85)).toContain('green');
  });
  it('yellow/amber gradient when medium', () => {
    expect(seatScoreClass(70)).toMatch(/yellow|amber/);
  });
  it('orange gradient when low', () => {
    expect(seatScoreClass(55)).toContain('orange');
  });
  it('red gradient when at risk', () => {
    expect(seatScoreClass(40)).toContain('red');
  });
});

describe('seatScoreClassForKpi', () => {
  it('inverts Anxiety: low anxiety = green', () => {
    expect(seatScoreClassForKpi(15, 'Anxiety')).toContain('green');
  });
  it('inverts Anxiety: high anxiety = red', () => {
    expect(seatScoreClassForKpi(85, 'Anxiety')).toContain('red');
  });
  it('does not invert Speaking', () => {
    expect(seatScoreClassForKpi(85, 'Speaking')).toContain('green');
    expect(seatScoreClassForKpi(20, 'Speaking')).toContain('red');
  });
  it('does not invert Grade', () => {
    expect(seatScoreClassForKpi(90, 'Grade')).toContain('green');
  });
});

describe('buildKpiScores', () => {
  it('produces all five KPI fields', () => {
    const scores = buildKpiScores(80);
    expect(Object.keys(scores).sort()).toEqual(
      ['Anxiety', 'Engagement', 'Grade', 'Mood', 'Speaking'].sort()
    );
  });
  it('inverts Anxiety from base', () => {
    expect(buildKpiScores(80).Anxiety).toBe(20);
    expect(buildKpiScores(20).Anxiety).toBe(80);
  });
  it('keeps Speaking and Grade equal to base', () => {
    expect(buildKpiScores(72).Speaking).toBe(72);
    expect(buildKpiScores(72).Grade).toBe(72);
  });
  it('clamps Mood and Engagement to [20, 100]', () => {
    expect(buildKpiScores(10).Engagement).toBeGreaterThanOrEqual(20);
    expect(buildKpiScores(200).Mood).toBeLessThanOrEqual(100);
  });
});

describe('buildClassroomSeats', () => {
  it('attaches a scores map per seat', () => {
    const seats: Seat[] = [{ id: 'A1', row: 1, col: 1, name: 'Alice', score: 75 }];
    const result = buildClassroomSeats(seats);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('A1');
    expect(result[0].scores.Speaking).toBe(75);
    expect(result[0].scores.Anxiety).toBe(25);
  });
  it('returns empty array for empty input', () => {
    expect(buildClassroomSeats([])).toEqual([]);
  });
});

describe('getInitials', () => {
  it('handles two-word names', () => {
    expect(getInitials('John Doe')).toBe('JD');
  });
  it('uppercases', () => {
    expect(getInitials('alice smith')).toBe('AS');
  });
  it('handles multiple internal spaces', () => {
    expect(getInitials('  Maria   Sofia   Lopez  ')).toBe('MS');
  });
  it('handles single name', () => {
    expect(getInitials('Plato')).toBe('P');
  });
});

describe('clamp', () => {
  it('returns the value when inside range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });
  it('clamps below min', () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });
  it('clamps above max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('getTrendEmoji', () => {
  it('up returns up arrow', () => {
    expect(getTrendEmoji('up')).toBe('↑');
  });
  it('down returns down arrow', () => {
    expect(getTrendEmoji('down')).toBe('↓');
  });
  it('stable returns right arrow', () => {
    expect(getTrendEmoji('stable')).toBe('→');
  });
});

describe('getTrendColorClass', () => {
  it('up is positive', () => {
    expect(getTrendColorClass('up')).toBe('text-positive');
  });
  it('down is critical', () => {
    expect(getTrendColorClass('down')).toBe('text-critical');
  });
  it('stable is neutral', () => {
    expect(getTrendColorClass('stable')).toBe('text-ink-500');
  });
});

describe('scoreTone', () => {
  it('maps thresholds to tones', () => {
    expect(scoreTone(85)).toBe('positive');
    expect(scoreTone(70)).toBe('caution');
    expect(scoreTone(40)).toBe('critical');
  });
});

describe('getAttentionReasons', () => {
  it('returns nothing for a student doing well', () => {
    expect(getAttentionReasons({ grade: 82, mood: 8, trend: 'up', attendance: 96 })).toEqual([]);
  });
  it('lists every reason that applies', () => {
    const reasons = getAttentionReasons({ grade: 55, mood: 5, trend: 'down', attendance: 79 });
    expect(reasons).toHaveLength(4);
    expect(reasons[0]).toMatch(/Grade 55%/);
  });
  it('ignores missing attendance', () => {
    expect(getAttentionReasons({ grade: 90, mood: 9, trend: 'stable' })).toEqual([]);
  });
});

describe('mean', () => {
  it('averages values and handles empty input', () => {
    expect(mean([60, 80])).toBe(70);
    expect(mean([])).toBe(0);
  });
});
