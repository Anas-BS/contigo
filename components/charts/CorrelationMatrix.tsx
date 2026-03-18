'use client'

import { CorrelationDataPoint } from '@/lib/mockData'

interface CorrelationMatrixProps {
  data: CorrelationDataPoint[]
}

export default function CorrelationMatrix({ data }: CorrelationMatrixProps) {
  const variables = ['mood', 'speaking', 'attendance', 'grammar', 'tlPercent', 'classSize'] as const
  const variableLabels: Record<typeof variables[number], string> = {
    mood: 'Mood',
    speaking: 'Speaking',
    attendance: 'Attendance',
    grammar: 'Grammar',
    tlPercent: 'TL%',
    classSize: 'Class Size',
  }

  const getColor = (value: number) => {
    if (value >= 0.7) return 'bg-green-600 text-white'
    if (value >= 0.5) return 'bg-green-400 text-white'
    if (value >= 0.3) return 'bg-green-200 text-gray-800'
    if (value >= 0) return 'bg-gray-100 text-gray-800'
    if (value >= -0.3) return 'bg-red-200 text-gray-800'
    if (value >= -0.5) return 'bg-red-400 text-white'
    return 'bg-red-600 text-white'
  }

  return (
    <div className="bg-contigo-peach rounded-xl p-6 shadow-sm overflow-x-auto">
      <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
        Variable Correlation Matrix
      </h3>
      <div className="inline-block min-w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs font-semibold text-contigo-navy text-left">Variable</th>
              {variables.map((v) => (
                <th key={v} className="p-2 text-xs font-semibold text-contigo-navy text-center">
                  {variableLabels[v]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td className="p-2 text-xs font-semibold text-contigo-navy">
                  {row.variable}
                </td>
                {variables.map((v) => {
                  const value = row[v]
                  return (
                    <td key={v} className="p-0">
                      <div className={`${getColor(value)} h-12 w-12 mx-auto flex items-center justify-center rounded text-xs font-mono font-bold`}>
                        {value.toFixed(2)}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-contigo-slate">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span>Strong Positive</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 rounded border border-gray-300"></div>
          <span>Neutral</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span>Strong Negative</span>
        </div>
      </div>
    </div>
  )
}
