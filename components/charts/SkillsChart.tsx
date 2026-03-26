'use client';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface SkillsChartProps {
  data?: Array<{ skill: string; score: number }>;
}

const DEFAULT_DATA = [
  { skill: 'Speaking', score: 72 },
  { skill: 'Listening', score: 85 },
  { skill: 'Reading', score: 78 },
  { skill: 'Writing', score: 65 },
  { skill: 'Grammar', score: 80 },
  { skill: 'Vocabulary', score: 88 },
];

export default function SkillsChart({ data = DEFAULT_DATA }: SkillsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RadarChart data={data}>
        <PolarGrid stroke="#1E2C3A" />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#5C7080', fontFamily: 'Share Tech Mono, monospace' }} />
        <Radar
          name="Skills"
          dataKey="score"
          stroke="#E8632A"
          fill="#E8632A"
          fillOpacity={0.2}
          strokeWidth={1.5}
        />
        <Tooltip
          contentStyle={{ background: '#141C24', border: '1px solid #1E2C3A', color: '#C8D8E4', fontSize: 11, fontFamily: 'Share Tech Mono, monospace' }}
          labelStyle={{ color: '#5C7080' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
