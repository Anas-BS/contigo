import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon: LucideIcon
  color?: 'orange' | 'blue' | 'teal' | 'amber'
}

export default function KPICard({ title, value, trend, trendValue, icon: Icon, color = 'orange' }: KPICardProps) {
  const colorClasses = {
    orange: 'bg-contigo-orange',
    blue: 'bg-contigo-blue',
    teal: 'bg-contigo-teal',
    amber: 'bg-contigo-amber',
  }

  const bgColorClass = colorClasses[color]

  return (
    <div className="bg-contigo-peach rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-contigo-slate mb-1">{title}</p>
          <p className="text-3xl font-bold font-nunito text-contigo-navy">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp size={16} className="text-contigo-teal mr-1" />
              ) : trend === 'down' ? (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              ) : null}
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-contigo-teal' : trend === 'down' ? 'text-red-500' : 'text-contigo-slate'}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`${bgColorClass} rounded-lg p-3`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  )
}
