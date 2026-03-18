import { AlertTriangle, AlertCircle, Info } from 'lucide-react'

interface AlertCardProps {
  studentName: string
  riskLevel: 'high' | 'medium' | 'low'
  issues: string[]
  onAction?: () => void
}

export default function AlertCard({ studentName, riskLevel, issues, onAction }: AlertCardProps) {
  const config = {
    high: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: AlertTriangle,
      iconBg: 'bg-red-100',
      label: 'High Risk',
    },
    medium: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      text: 'text-amber-800',
      icon: AlertCircle,
      iconBg: 'bg-amber-100',
      label: 'Medium Risk',
    },
    low: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: Info,
      iconBg: 'bg-blue-100',
      label: 'Low Risk',
    },
  }

  const { bg, border, text, icon: Icon, iconBg, label } = config[riskLevel]

  return (
    <div className={`${bg} ${border} border-2 rounded-xl p-4 shadow-sm`}>
      <div className="flex items-start space-x-3">
        <div className={`${iconBg} rounded-lg p-2 flex-shrink-0`}>
          <Icon size={20} className={text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-contigo-navy">{studentName}</h4>
            <span className={`text-xs font-medium ${text} px-2 py-1 rounded-full ${iconBg}`}>
              {label}
            </span>
          </div>
          <ul className="space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="text-sm text-contigo-navy flex items-start">
                <span className="mr-2">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
          {onAction && (
            <button
              onClick={onAction}
              className="mt-3 text-sm font-medium text-contigo-orange hover:text-contigo-coral transition-colors"
            >
              View Details →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
