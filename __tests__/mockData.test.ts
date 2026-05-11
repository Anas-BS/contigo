import {
  MOCK_STUDENTS,
  MOCK_SEATS,
  MOCK_PLATFORM_STATS,
  MOCK_ALERTS,
  MOCK_TOP_TEACHERS,
} from '@/lib/services/mockData';

describe('MOCK_STUDENTS', () => {
  it('has at least one student', () => {
    expect(MOCK_STUDENTS.length).toBeGreaterThan(0);
  });
  it('each student has required fields', () => {
    for (const s of MOCK_STUDENTS) {
      expect(typeof s.id).toBe('string');
      expect(typeof s.name).toBe('string');
      expect(s.role).toBe('student');
      expect(s.grade).toBeGreaterThanOrEqual(0);
      expect(s.grade).toBeLessThanOrEqual(100);
      expect(s.mood).toBeGreaterThanOrEqual(0);
      expect(s.mood).toBeLessThanOrEqual(10);
    }
  });
});

describe('MOCK_SEATS', () => {
  it('has 18 seats (3 rows x 6 cols)', () => {
    expect(MOCK_SEATS).toHaveLength(18);
  });
  it('seat ids are unique', () => {
    const ids = MOCK_SEATS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('every score is between 0 and 100', () => {
    for (const seat of MOCK_SEATS) {
      expect(seat.score).toBeGreaterThanOrEqual(0);
      expect(seat.score).toBeLessThanOrEqual(100);
    }
  });
  it('rows go from 1 to 3', () => {
    for (const seat of MOCK_SEATS) {
      expect([1, 2, 3]).toContain(seat.row);
    }
  });
});

describe('MOCK_PLATFORM_STATS', () => {
  it('every stat exposes gradient and border class strings', () => {
    for (const stat of MOCK_PLATFORM_STATS) {
      expect(typeof stat.gradient).toBe('string');
      expect(stat.gradient.length).toBeGreaterThan(0);
      expect(typeof stat.border).toBe('string');
      expect(stat.border.startsWith('border-')).toBe(true);
      expect(typeof stat.emoji).toBe('string');
      expect(typeof stat.label).toBe('string');
      expect(typeof stat.value).toBe('string');
    }
  });
});

describe('MOCK_ALERTS', () => {
  it('every alert has a recognized urgency', () => {
    for (const a of MOCK_ALERTS) {
      expect(['high', 'medium', 'low']).toContain(a.urgency);
    }
  });
  it('every alert has a recognized type', () => {
    for (const a of MOCK_ALERTS) {
      expect(['grade', 'wellbeing', 'attendance', 'anxiety']).toContain(a.type);
    }
  });
});

describe('MOCK_TOP_TEACHERS', () => {
  it('avg scores are 0 to 100', () => {
    for (const t of MOCK_TOP_TEACHERS) {
      expect(t.avg).toBeGreaterThanOrEqual(0);
      expect(t.avg).toBeLessThanOrEqual(100);
    }
  });
  it('wellbeing scores are 0 to 10', () => {
    for (const t of MOCK_TOP_TEACHERS) {
      expect(t.wellbeing).toBeGreaterThanOrEqual(0);
      expect(t.wellbeing).toBeLessThanOrEqual(10);
    }
  });
});
