"use client";

import { useState } from "react";
import { Users, BookOpen, AlertTriangle } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import KPICard from "@/components/ui/KPICard";
import AlertCard from "@/components/ui/AlertCard";
import Link from "next/link";
import { teachers, classes, students, tigoInsights } from "@/lib/mockData";

const teacher = teachers[0]; // Amina Okafor

const skills = ["Speaking", "Listening", "Reading", "Writing", "Grammar", "Vocabulary"];

export default function TeacherDashboard() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Speaking", "Listening"]);
  const [tlPercent, setTlPercent] = useState(90);
  const [engagementSaved, setEngagementSaved] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const atRiskStudents = students.filter((s) => s.risk !== "low");

  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar userName={teacher.name} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-contigo-navy to-contigo-blue text-white px-6 py-5 mb-8 flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-contigo-orange flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {teacher.avatar}
          </div>
          <div>
            <h1 className="font-nunito font-bold text-xl md:text-2xl">
              Welcome back, {teacher.name.split(" ")[0]}! 📚
            </h1>
            <p className="text-white/70 text-sm mt-0.5">
              You have {classes.length} classes today · {atRiskStudents.length} students need attention
            </p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard title="Class Avg Score" value={`${teacher.classAvg}%`} trend="up" trendValue="+3% this month" color="orange" />
          <KPICard title="Students Improved" value={`${teacher.studentsImproved}%`} trend="up" trendValue="+5% vs last term" color="teal" />
          <KPICard title="My Wellbeing" value={`${teacher.wellbeing}/10`} trend="flat" trendValue="Stable" color="blue" />
          <KPICard title="TL% This Week" value={`${teacher.tlPercent}%`} trend="up" trendValue="+2% vs target" color="amber" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Classes */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-contigo-orange" />
              My Classes
            </h2>
            <div className="space-y-3">
              {classes.map((cls) => (
                <div key={cls.id} className="flex items-center gap-4 p-4 bg-contigo-peach/40 rounded-xl hover:bg-contigo-peach transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-contigo-orange flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {cls.name.split(" ").map((w) => w[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-contigo-navy text-sm">{cls.name}</p>
                    <p className="text-xs text-contigo-slate">{cls.students} students · {cls.avgCefr} avg · Room {cls.room}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold font-mono text-contigo-navy text-sm">{cls.avgScore}%</p>
                    <p className="text-xs text-contigo-slate">class avg</p>
                  </div>
                  <Link
                    href="/teacher/classroom"
                    className="text-xs px-3 py-1.5 bg-contigo-orange text-white rounded-lg hover:bg-contigo-coral transition-colors"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-contigo-amber" />
              Needs Attention
            </h2>
            <div className="space-y-3">
              {atRiskStudents.map((student) => (
                <AlertCard
                  key={student.id}
                  name={student.name}
                  cefr={student.cefr}
                  risk={student.risk as "high" | "medium" | "low"}
                  trend={student.trend as "up" | "down" | "flat"}
                  message={
                    student.risk === "high"
                      ? "Speaking declining, high anxiety. Consider front seating."
                      : "Flat trend. Schedule 1:1 feedback session."
                  }
                  avatar={student.avatar}
                />
              ))}
            </div>
          </div>

          {/* Today's Lesson Log */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-contigo-orange" />
              Today&apos;s Lesson Log
            </h2>
            <div className="space-y-5">
              {/* Skills covered */}
              <div>
                <p className="text-sm font-medium text-contigo-navy mb-2">Skills covered today</p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        selectedSkills.includes(skill)
                          ? "bg-contigo-orange text-white"
                          : "bg-contigo-peach text-contigo-slate hover:bg-contigo-orange/20"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* TL% Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-contigo-navy">Target Language use %</p>
                  <span className="text-sm font-mono font-bold text-contigo-orange">{tlPercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={tlPercent}
                  onChange={(e) => setTlPercent(Number(e.target.value))}
                  className="w-full accent-contigo-orange"
                />
              </div>

              {/* Error correction style */}
              <div>
                <p className="text-sm font-medium text-contigo-navy mb-2">Error correction style</p>
                <div className="flex gap-2">
                  {["Direct", "Indirect", "Mixed"].map((style) => (
                    <button key={style} className="flex-1 py-2 text-xs bg-contigo-peach text-contigo-slate rounded-xl hover:bg-contigo-orange hover:text-white transition-colors">
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setEngagementSaved(true)}
                className="w-full py-2.5 bg-contigo-orange text-white rounded-xl font-medium text-sm hover:bg-contigo-coral transition-colors"
              >
                {engagementSaved ? "✅ Lesson Logged!" : "Save Lesson Log"}
              </button>
            </div>
          </div>

          {/* Tigo Says */}
          <div className="bg-gradient-to-br from-contigo-orange to-contigo-coral rounded-2xl p-6 text-white shadow-lg">
            <h2 className="font-nunito font-bold text-lg mb-3">🤖 Tigo Says...</h2>
            <div className="space-y-3">
              {tigoInsights.slice(0, 3).map((insight) => (
                <div key={insight.id} className="bg-white/20 rounded-xl p-3">
                  <p className="text-xs leading-relaxed">
                    {insight.icon} {insight.message}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/teacher/classroom"
              className="mt-4 block text-center py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
            >
              View Seating Map →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
