interface CEFRBadgeProps {
  level: string;
  progress?: number; // 0–100 progress to next level
  showProgress?: boolean;
}

const cefrColors: Record<string, string> = {
  A1: "bg-gray-100 text-gray-600 border-gray-200",
  A2: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "A2+": "bg-yellow-100 text-yellow-700 border-yellow-200",
  B1: "bg-contigo-peach text-contigo-orange border-contigo-orange/30",
  "B1+": "bg-orange-100 text-orange-600 border-orange-200",
  B2: "bg-blue-100 text-contigo-blue border-blue-200",
  "B2+": "bg-blue-100 text-contigo-blue border-blue-200",
  C1: "bg-teal-100 text-contigo-teal border-teal-200",
  C2: "bg-purple-100 text-purple-600 border-purple-200",
};

const nextLevel: Record<string, string> = {
  A1: "A2", A2: "A2+", "A2+": "B1",
  B1: "B1+", "B1+": "B2", B2: "B2+",
  "B2+": "C1", C1: "C2", C2: "C2",
};

export default function CEFRBadge({
  level,
  progress = 65,
  showProgress = true,
}: CEFRBadgeProps) {
  const colorClass = cefrColors[level] || cefrColors["B1"];
  const next = nextLevel[level] || level;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span
          className={`px-4 py-1.5 rounded-full border-2 font-nunito font-bold text-lg ${colorClass}`}
        >
          {level}
        </span>
        <div>
          <p className="text-xs text-contigo-slate">Current CEFR Level</p>
          {showProgress && (
            <p className="text-xs text-contigo-navy font-medium">
              {progress}% to {next}
            </p>
          )}
        </div>
      </div>
      {showProgress && (
        <div className="h-2 bg-contigo-peach rounded-full overflow-hidden">
          <div
            className="h-full bg-contigo-orange rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
