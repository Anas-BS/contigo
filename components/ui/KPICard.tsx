import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "flat";
  trendValue?: string;
  icon?: ReactNode;
  color?: "orange" | "teal" | "blue" | "amber";
  subtitle?: string;
}

const colorMap = {
  orange: {
    bg: "bg-contigo-peach",
    icon: "bg-contigo-orange text-white",
    text: "text-contigo-orange",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "bg-contigo-teal text-white",
    text: "text-contigo-teal",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-contigo-blue text-white",
    text: "text-contigo-blue",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "bg-contigo-amber text-white",
    text: "text-contigo-amber",
  },
};

export default function KPICard({
  title,
  value,
  trend,
  trendValue,
  icon,
  color = "orange",
  subtitle,
}: KPICardProps) {
  const colors = colorMap[color];

  return (
    <div className={`rounded-2xl p-5 ${colors.bg} border border-white shadow-sm`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-contigo-slate text-sm font-medium mb-1">{title}</p>
          <p className="font-nunito font-bold text-2xl text-contigo-navy">
            {value}
          </p>
          {subtitle && (
            <p className="text-contigo-slate text-xs mt-1">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              {trend === "up" && (
                <TrendingUp className="w-3.5 h-3.5 text-contigo-teal" />
              )}
              {trend === "down" && (
                <TrendingDown className="w-3.5 h-3.5 text-red-400" />
              )}
              {trend === "flat" && (
                <Minus className="w-3.5 h-3.5 text-contigo-slate" />
              )}
              <span
                className={`text-xs font-medium ${
                  trend === "up"
                    ? "text-contigo-teal"
                    : trend === "down"
                    ? "text-red-400"
                    : "text-contigo-slate"
                }`}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-xl ${colors.icon} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
