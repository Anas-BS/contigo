"use client";

import { correlationData } from "@/lib/mockData";

function getColor(value: number): string {
  if (value >= 0.7) return "bg-contigo-teal text-white";
  if (value >= 0.5) return "bg-contigo-teal/60 text-white";
  if (value >= 0) return "bg-contigo-teal/30 text-contigo-teal";
  if (value >= -0.5) return "bg-red-200 text-red-700";
  return "bg-red-400 text-white";
}

export default function CorrelationMatrix() {
  return (
    <div className="overflow-x-auto">
      <div className="space-y-2 min-w-[400px]">
        {correlationData.map((item) => (
          <div
            key={`${item.var1}-${item.var2}`}
            className="flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs text-contigo-slate truncate">
                <span className="font-medium text-contigo-navy">{item.var1}</span>
                {" → "}
                <span className="font-medium text-contigo-navy">{item.var2}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Bar */}
              <div className="w-32 h-2.5 bg-contigo-peach rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.correlation >= 0
                      ? "bg-contigo-teal"
                      : "bg-red-400"
                  }`}
                  style={{
                    width: `${Math.abs(item.correlation) * 100}%`,
                    marginLeft: item.correlation < 0 ? "auto" : "0",
                  }}
                />
              </div>
              {/* Badge */}
              <span
                className={`text-xs font-mono font-bold w-14 text-center px-2 py-0.5 rounded-full ${getColor(
                  item.correlation
                )}`}
              >
                {item.correlation > 0 ? "+" : ""}
                {item.correlation.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-4 text-xs text-contigo-slate">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-contigo-teal" />
          <span>Positive correlation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <span>Negative correlation</span>
        </div>
      </div>
    </div>
  );
}
