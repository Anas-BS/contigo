'use client'

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

interface SkillRadarChartProps {
  data?: {
    speaking: number
    listening: number
    reading: number
    writing: number
    grammar: number
    vocabulary: number
  }
}

export default function SkillRadarChart({ data }: SkillRadarChartProps) {
  const chartData = [
    { skill: 'Speaking', value: data?.speaking || 0 },
    { skill: 'Listening', value: data?.listening || 0 },
    { skill: 'Reading', value: data?.reading || 0 },
    { skill: 'Writing', value: data?.writing || 0 },
    { skill: 'Grammar', value: data?.grammar || 0 },
    { skill: 'Vocabulary', value: data?.vocabulary || 0 },
  ]

  return (
    <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
        Skill Profile
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#8A9BB0" />
          <PolarAngleAxis 
            dataKey="skill" 
            tick={{ fill: '#1E2A3A', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={{ fill: '#8A9BB0', fontSize: 10 }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#F97B4F"
            fill="#F97B4F"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
