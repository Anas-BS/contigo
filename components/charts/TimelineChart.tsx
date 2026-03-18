'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CEFRTimelinePoint } from '@/lib/mockData'

interface TimelineChartProps {
  data: CEFRTimelinePoint[]
  title?: string
}

export default function TimelineChart({ data, title = 'CEFR Progress Timeline' }: TimelineChartProps) {
  return (
    <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#8A9BB0" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            tick={{ fill: '#1E2A3A', fontSize: 12 }}
            stroke="#8A9BB0"
          />
          <YAxis 
            domain={[0, 100]}
            tick={{ fill: '#1E2A3A', fontSize: 12 }}
            stroke="#8A9BB0"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFF8F4',
              border: '1px solid #F97B4F',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#F97B4F"
            strokeWidth={3}
            dot={{ fill: '#F97B4F', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap gap-2">
        {data.map((point, index) => (
          <div key={index} className="text-xs text-contigo-slate">
            <span className="font-semibold">{point.month}:</span> {point.level} ({point.score})
          </div>
        ))}
      </div>
    </div>
  )
}
