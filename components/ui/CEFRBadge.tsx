interface CEFRBadgeProps {
  level: string
  progress: number
}

export default function CEFRBadge({ level, progress }: CEFRBadgeProps) {
  const levelColors: Record<string, { bg: string; text: string; border: string }> = {
    'A1': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
    'A2': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    'B1': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    'B2': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
    'C1': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
    'C2': { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300' },
  }

  const colors = levelColors[level] || levelColors['B1']
  const nextLevel = getNextLevel(level)

  return (
    <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-contigo-slate mb-1">Current CEFR Level</p>
          <div className={`inline-flex items-center px-4 py-2 rounded-full ${colors.bg} ${colors.text} ${colors.border} border-2 font-bold text-xl`}>
            {level}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-contigo-slate">Progress to {nextLevel}</p>
          <p className="text-2xl font-bold font-nunito text-contigo-orange">{progress}%</p>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-contigo-orange h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-contigo-slate mt-2">
        {progress < 30 && 'Keep going! You\'re building a strong foundation.'}
        {progress >= 30 && progress < 70 && 'Great progress! You\'re halfway there.'}
        {progress >= 70 && 'Almost there! You\'re ready to level up soon.'}
      </p>
    </div>
  )
}

function getNextLevel(current: string): string {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  const index = levels.indexOf(current)
  return index < levels.length - 1 ? levels[index + 1] : 'Mastery'
}
