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
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
        <Radar
          name="Skills"
          dataKey="score"
          stroke="#F97B4F"
          fill="#F97B4F"
          fillOpacity={0.35}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
}
