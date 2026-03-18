"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SkillData {
  subject: string;
  score: number;
  fullMark: number;
}

interface SkillRadarChartProps {
  speaking: number;
  listening: number;
  reading: number;
  writing: number;
  grammar: number;
  vocabulary: number;
}

export default function SkillRadarChart({
  speaking,
  listening,
  reading,
  writing,
  grammar,
  vocabulary,
}: SkillRadarChartProps) {
  const data: SkillData[] = [
    { subject: "Speaking", score: speaking, fullMark: 100 },
    { subject: "Listening", score: listening, fullMark: 100 },
    { subject: "Reading", score: reading, fullMark: 100 },
    { subject: "Writing", score: writing, fullMark: 100 },
    { subject: "Grammar", score: grammar, fullMark: 100 },
    { subject: "Vocabulary", score: vocabulary, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#FDEEE6" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#8A9BB0", fontSize: 12, fontFamily: "var(--font-inter)" }}
        />
        <Radar
          name="Skills"
          dataKey="score"
          stroke="#F97B4F"
          fill="#F97B4F"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFF8F4",
            border: "1px solid #FDEEE6",
            borderRadius: "12px",
            fontSize: "12px",
            fontFamily: "var(--font-inter)",
          }}
          formatter={(value) => [`${value}%`, "Score"]}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
