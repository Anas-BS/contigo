'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface MoodChartProps {
  data?: Array<{ date: string; mood: number }>;
}

const DEFAULT_DATA = [
  { date: 'Mon 3/11', mood: 7 },
  { date: 'Tue 3/12', mood: 6 },
  { date: 'Wed 3/13', mood: 8 },
  { date: 'Thu 3/14', mood: 5 },
  { date: 'Fri 3/15', mood: 9 },
  { date: 'Mon 3/18', mood: 7 },
  { date: 'Tue 3/19', mood: 8 },
];

export default function MoodChart({ data = DEFAULT_DATA }: MoodChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2C3A" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#5C7080', fontFamily: 'Share Tech Mono, monospace' }} axisLine={{ stroke: '#1E2C3A' }} tickLine={false} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#5C7080', fontFamily: 'Share Tech Mono, monospace' }} axisLine={{ stroke: '#1E2C3A' }} tickLine={false} />
        <Tooltip
          contentStyle={{ background: '#141C24', border: '1px solid #1E2C3A', color: '#C8D8E4', fontSize: 11, fontFamily: 'Share Tech Mono, monospace' }}
          labelStyle={{ color: '#5C7080' }}
        />
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#28B89A"
          strokeWidth={2}
          dot={{ fill: '#28B89A', r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: '#28B89A', stroke: '#0F1318', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
