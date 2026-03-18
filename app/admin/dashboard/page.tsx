"use client";

import Navbar from "@/components/ui/Navbar";
import KPICard from "@/components/ui/KPICard";
import CorrelationMatrix from "@/components/charts/CorrelationMatrix";
import {
  adminKPIs,
  teachers,
  tigoInsights,
  timetablePerformance,
  environmentKPIs,
} from "@/lib/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  Heart,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar userName="Admin" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-nunito font-bold text-2xl md:text-3xl text-contigo-navy">
            The Full Picture 🌐
          </h1>
          <p className="text-contigo-slate mt-1">
            Institution-wide KPIs · {adminKPIs.totalStudents} students · {adminKPIs.totalTeachers} teachers · {adminKPIs.totalClasses} classes
          </p>
        </div>

        {/* Institution KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Overall Pass Rate"
            value={`${adminKPIs.overallPassRate}%`}
            trend="up"
            trendValue="+3% vs last term"
            color="teal"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <KPICard
            title="At-Risk Students"
            value={`${adminKPIs.atRiskPercent}%`}
            trend="down"
            trendValue="-5% this month"
            color="amber"
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <KPICard
            title="Average CEFR"
            value={adminKPIs.avgCefr}
            trend="up"
            trendValue="+0.5 levels vs Sep"
            color="orange"
            icon={<GraduationCap className="w-5 h-5" />}
          />
          <KPICard
            title="Teacher Wellbeing"
            value={`${adminKPIs.teacherWellbeingIndex}/10`}
            trend="up"
            trendValue="+0.4 this term"
            color="blue"
            icon={<Heart className="w-5 h-5" />}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Correlation Matrix */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-5">
              Correlation Matrix
            </h2>
            <CorrelationMatrix />
          </div>

          {/* Tigo Top Insights */}
          <div className="bg-gradient-to-br from-contigo-orange to-contigo-coral rounded-2xl p-6 text-white shadow-lg">
            <h2 className="font-nunito font-bold text-lg mb-4">🤖 Tigo Top Insights</h2>
            <div className="space-y-3">
              {tigoInsights.map((insight) => (
                <div key={insight.id} className="bg-white/20 rounded-xl p-3">
                  <p className="text-xs leading-relaxed">
                    {insight.icon} {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timetable Impact Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-5">
              Timetable Impact — Lesson Time vs Performance
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={timetablePerformance} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#FDEEE6" />
                <XAxis
                  dataKey="slot"
                  tick={{ fill: "#8A9BB0", fontSize: 11 }}
                  axisLine={{ stroke: "#FDEEE6" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[50, 90]}
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
                  formatter={(value) => [`${value}%`, "Avg Score"]}
                />
                <Bar dataKey="avgScore" fill="#F97B4F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Environment KPIs */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4">
              Environment KPIs
            </h2>
            <div className="space-y-3">
              {environmentKPIs.map((kpi) => (
                <div key={kpi.label} className="flex items-center gap-3 p-3 bg-contigo-peach/40 rounded-xl">
                  <span className="text-xl">{kpi.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs text-contigo-slate">{kpi.label}</p>
                    <p className="font-bold text-contigo-navy text-sm">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Performance Table */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-contigo-orange" />
              Teacher Performance Overview
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-contigo-peach">
                    {["Teacher", "Qualification", "TL%", "Wellbeing", "Class Avg", "Years Exp", "Students Improved"].map((h) => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-medium text-contigo-slate">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="border-b border-contigo-peach/50 hover:bg-contigo-peach/20 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-contigo-orange flex items-center justify-center text-white text-xs font-bold">
                            {teacher.avatar}
                          </div>
                          <span className="font-medium text-contigo-navy">{teacher.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-contigo-blue/10 text-contigo-blue rounded-full text-xs">
                          {teacher.qualification}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-contigo-navy">{teacher.tlPercent}%</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-contigo-peach rounded-full overflow-hidden">
                            <div
                              className="h-full bg-contigo-teal rounded-full"
                              style={{ width: `${teacher.wellbeing * 10}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-contigo-navy">{teacher.wellbeing}/10</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-contigo-navy">{teacher.classAvg}%</td>
                      <td className="py-3 px-3 text-contigo-slate">{teacher.yearsExp} yrs</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${teacher.studentsImproved >= 85 ? "bg-teal-100 text-contigo-teal" : "bg-amber-100 text-amber-600"}`}>
                          {teacher.studentsImproved}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
