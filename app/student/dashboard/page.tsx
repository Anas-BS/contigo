"use client";

import { useState } from "react";
import { Sun, TrendingUp, BookOpen, Star } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import KPICard from "@/components/ui/KPICard";
import CEFRBadge from "@/components/ui/CEFRBadge";
import SkillRadarChart from "@/components/charts/SkillRadarChart";
import TimelineChart from "@/components/charts/TimelineChart";
import MoodCheckIn from "@/components/checkin/MoodCheckIn";
import { students, recentAssessments, tigoInsights } from "@/lib/mockData";

const student = students[0]; // Hassan Al-Rashid

export default function StudentDashboard() {
  const [, setMoodDone] = useState(false);

  const overall = Math.round(
    (student.speaking + student.listening + student.reading + student.writing + student.grammar + student.vocabulary) / 6
  );

  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar userName={student.name} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-contigo-orange to-contigo-coral text-white px-6 py-5 mb-8 flex items-center gap-4 shadow-lg shadow-contigo-orange/20">
          <Sun className="w-8 h-8 flex-shrink-0" />
          <div>
            <h1 className="font-nunito font-bold text-xl md:text-2xl">
              Good morning, {student.name.split(" ")[0]}! 🌅
            </h1>
            <p className="text-white/80 text-sm mt-0.5">
              You&apos;re on track for {student.cefr} → B1+ this month. Keep going! 💪
            </p>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard
            title="Overall Score"
            value={`${overall}%`}
            trend="up"
            trendValue="+4% this month"
            color="orange"
          />
          <KPICard
            title="Speaking"
            value={`${student.speaking}%`}
            trend="down"
            trendValue="-2% this week"
            color="amber"
          />
          <KPICard
            title="Mood Score"
            value={`${student.mood}/10`}
            trend="up"
            trendValue="+1 since Monday"
            color="teal"
          />
          <KPICard
            title="Anxiety Index"
            value={`${student.anxiety}/10`}
            trend="down"
            trendValue="-1 this week"
            color="blue"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skill Radar */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-contigo-orange rounded-lg flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-white" />
              </span>
              My Skill Radar
            </h2>
            <SkillRadarChart
              speaking={student.speaking}
              listening={student.listening}
              reading={student.reading}
              writing={student.writing}
              grammar={student.grammar}
              vocabulary={student.vocabulary}
            />
          </div>

          {/* CEFR + Mood Check-in */}
          <div className="space-y-4">
            {/* CEFR Badge */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
              <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4">
                My CEFR Level
              </h2>
              <CEFRBadge level={student.cefr} progress={68} />
            </div>

            {/* Mood Check-in */}
            <div className="bg-contigo-peach rounded-2xl p-6 shadow-sm border border-contigo-orange/20">
              <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4">
                Today&apos;s Check-in 😊
              </h2>
              <MoodCheckIn onSubmit={() => setMoodDone(true)} />
            </div>
          </div>

          {/* My Story Timeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-contigo-teal rounded-lg flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </span>
              My Story — CEFR Journey
            </h2>
            <TimelineChart />
            <div className="flex gap-4 mt-4 text-xs text-contigo-slate justify-center">
              <span>Sep 2025: A2 → Mar 2026: B1+</span>
            </div>
          </div>

          {/* Tigo Says */}
          <div className="bg-gradient-to-br from-contigo-orange to-contigo-coral rounded-2xl p-6 text-white shadow-lg">
            <h2 className="font-nunito font-bold text-lg mb-3 flex items-center gap-2">
              🤖 Tigo Says...
            </h2>
            <div className="space-y-3">
              {tigoInsights.slice(0, 2).map((insight) => (
                <div key={insight.id} className="bg-white/20 rounded-xl p-3">
                  <p className="text-sm leading-relaxed">
                    {insight.icon} {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Assessments */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-contigo-blue rounded-lg flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </span>
              Recent Assessments
            </h2>
            <div className="space-y-4">
              {recentAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center gap-4 p-4 bg-contigo-peach/40 rounded-xl">
                  <div className="flex-1">
                    <p className="font-medium text-contigo-navy text-sm">{assessment.title}</p>
                    <p className="text-xs text-contigo-slate">{assessment.date}</p>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center">
                    {Object.entries(assessment.scores).map(([skill, score]) => (
                      <div key={skill} className="bg-white rounded-lg p-1.5">
                        <p className="text-[10px] text-contigo-slate capitalize">{skill.slice(0, 3)}</p>
                        <p className="text-xs font-bold font-mono text-contigo-navy">{score}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
