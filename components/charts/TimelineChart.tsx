"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cefrTimeline } from "@/lib/mockData";

export default function TimelineChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={cefrTimeline}
        margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#FDEEE6" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#8A9BB0", fontSize: 11 }}
          axisLine={{ stroke: "#FDEEE6" }}
          tickLine={false}
        />
        <YAxis
          domain={[30, 100]}
          tick={{ fill: "#8A9BB0", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#FFF8F4",
            border: "1px solid #FDEEE6",
            borderRadius: "12px",
            fontSize: "12px",
          }}
          formatter={(value) => [
            `${value}% (${cefrTimeline.find((d) => d.score === value)?.level || ""})`,
            "Score",
          ]}
        />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#F97B4F"
          strokeWidth={3}
          dot={{ fill: "#F97B4F", r: 5, strokeWidth: 2, stroke: "#FFF8F4" }}
          activeDot={{ r: 7, fill: "#F97B4F" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
