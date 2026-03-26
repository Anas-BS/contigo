'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceBarChartProps {
  data?: Array<{ name: string; score: number }>;
  color?: string;
}

const DEFAULT_DATA = [
  { name: 'Jan', score: 68 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 75 },
  { name: 'Apr', score: 70 },
  { name: 'May', score: 80 },
  { name: 'Jun', score: 85 },
];

export default function PerformanceBarChart({
  data = DEFAULT_DATA,
  color = '#3A82C4',
}: PerformanceBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2C3A" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#5C7080', fontFamily: 'Share Tech Mono, monospace' }} axisLine={{ stroke: '#1E2C3A' }} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#5C7080', fontFamily: 'Share Tech Mono, monospace' }} axisLine={{ stroke: '#1E2C3A' }} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#141C24', border: '1px solid #1E2C3A', color: '#C8D8E4', fontSize: 11, fontFamily: 'Share Tech Mono, monospace' }}
          labelStyle={{ color: '#5C7080' }}
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
        />
        <Bar dataKey="score" fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
