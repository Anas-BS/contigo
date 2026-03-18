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
  color = '#2E6FDF',
}: PerformanceBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Bar dataKey="score" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
