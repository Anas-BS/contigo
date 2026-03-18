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
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="mood"
          stroke="#3ECFAC"
          strokeWidth={2}
          dot={{ fill: '#3ECFAC', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
