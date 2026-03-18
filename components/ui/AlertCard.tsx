import { TrendingDown, Minus, TrendingUp } from "lucide-react";

interface AlertCardProps {
  name: string;
  cefr: string;
  risk: "high" | "medium" | "low";
  trend: "up" | "down" | "flat";
  message: string;
  avatar?: string;
}

const riskConfig = {
  high: {
    bg: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-600",
    dot: "bg-red-400",
    label: "High Risk",
  },
  medium: {
    bg: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-600",
    dot: "bg-amber-400",
    label: "Needs Watch",
  },
  low: {
    bg: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-contigo-teal",
    dot: "bg-contigo-teal",
    label: "On Track",
  },
};

export default function AlertCard({
  name,
  cefr,
  risk,
  trend,
  message,
  avatar,
}: AlertCardProps) {
  const config = riskConfig[risk];

  return (
    <div className={`rounded-xl border p-4 ${config.bg}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-contigo-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {avatar || name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-nunito font-bold text-contigo-navy text-sm truncate">
              {name}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${config.badge}`}>
              {config.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-contigo-slate">{cefr}</span>
            <div className="flex items-center gap-1">
              {trend === "up" && <TrendingUp className="w-3 h-3 text-contigo-teal" />}
              {trend === "down" && <TrendingDown className="w-3 h-3 text-red-400" />}
              {trend === "flat" && <Minus className="w-3 h-3 text-contigo-slate" />}
            </div>
          </div>
          <p className="text-xs text-contigo-slate mt-2 leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
}
