'use client'

import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import KPICard from '@/components/ui/KPICard'
import CorrelationMatrix from '@/components/charts/CorrelationMatrix'
import { students, teachers, correlationData, timeSlotPerformance, topInsights } from '@/lib/mockData'
import { TrendingUp, Users, Award, Heart, Clock } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminDashboard() {
  const totalStudents = students.length
  const atRiskCount = students.filter(s => s.atRisk).length
  const atRiskPercent = Math.round((atRiskCount / totalStudents) * 100)
  
  const avgCEFRScores: Record<string, number> = { 'A1': 30, 'A2': 50, 'B1': 65, 'B2': 85, 'C1': 95, 'C2': 100 }
  const cefrCounts: Record<string, number> = {}
  students.forEach(s => {
    cefrCounts[s.cefr] = (cefrCounts[s.cefr] || 0) + 1
  })
  const weightedAvgScore = Object.entries(cefrCounts).reduce((sum, [level, count]) => {
    return sum + (avgCEFRScores[level] || 0) * count
  }, 0) / totalStudents
  const dominantCEFR = Object.entries(cefrCounts).sort((a, b) => b[1] - a[1])[0][0]
  
  const avgWellbeing = Math.round(teachers.reduce((sum, t) => sum + t.wellbeing, 0) / teachers.length)

  const passRate = Math.round(students.filter(s => {
    const avgScore = (s.speaking + s.listening + s.reading + s.writing) / 4
    return avgScore >= 60
  }).length / totalStudents * 100)

  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <main className="flex-1 p-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-contigo-navy to-contigo-blue rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-nunito font-bold mb-2">
              Admin Dashboard 📊
            </h1>
            <p className="text-lg opacity-90">
              School-wide analytics and performance insights
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <KPICard
              title="Overall Pass Rate"
              value={`${passRate}%`}
              trend="up"
              trendValue="+5% vs last term"
              icon={Award}
              color="teal"
            />
            <KPICard
              title="At-Risk Students"
              value={`${atRiskPercent}%`}
              trend="down"
              trendValue="-3% improvement"
              icon={Users}
              color="orange"
            />
            <KPICard
              title="Avg CEFR Level"
              value={dominantCEFR}
              trend="up"
              trendValue={`Avg score: ${Math.round(weightedAvgScore)}`}
              icon={TrendingUp}
              color="blue"
            />
            <KPICard
              title="Teacher Wellbeing"
              value={`${avgWellbeing}/10`}
              trend="neutral"
              trendValue="Steady"
              icon={Heart}
              color="amber"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Correlation Matrix */}
            <div className="lg:col-span-2">
              <CorrelationMatrix data={correlationData} />
            </div>

            {/* Time Slot Performance */}
            <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4 flex items-center">
                <Clock className="mr-2" size={20} />
                Performance by Time Slot
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={timeSlotPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#8A9BB0" opacity={0.3} />
                  <XAxis dataKey="slot" tick={{ fill: '#1E2A3A', fontSize: 11 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#1E2A3A', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFF8F4',
                      border: '1px solid #F97B4F',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="score" fill="#F97B4F" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Insights */}
            <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4 flex items-center">
                <span className="mr-2">🤖</span>
                Top AI Insights
              </h3>
              <div className="space-y-3">
                {topInsights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      insight.impact === 'high'
                        ? 'bg-red-50 border-l-4 border-red-500'
                        : 'bg-yellow-50 border-l-4 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="mr-2 text-lg">
                        {insight.impact === 'high' ? '🔴' : '🟡'}
                      </span>
                      <p className="text-sm text-contigo-navy">{insight.insight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teacher Performance Table */}
          <div className="bg-contigo-peach rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
              Teacher Performance Overview
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-contigo-orange">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-contigo-navy">
                      Teacher
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-contigo-navy">
                      Qualification
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-contigo-navy">
                      TL%
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-contigo-navy">
                      Class Avg
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-contigo-navy">
                      Wellbeing
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-contigo-navy">
                      Students
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map(teacher => (
                    <tr key={teacher.id} className="border-b border-gray-200 hover:bg-white transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-contigo-navy">{teacher.name}</div>
                        <div className="text-xs text-contigo-slate">
                          {teacher.yearsExp} years exp
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="bg-contigo-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {teacher.qualification}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`font-bold ${teacher.tlPercent >= 90 ? 'text-contigo-teal' : 'text-contigo-orange'}`}>
                          {teacher.tlPercent}%
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="font-bold text-contigo-navy">{teacher.classAvg}</span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className={`font-bold ${teacher.wellbeing >= 7 ? 'text-contigo-teal' : 'text-contigo-orange'}`}>
                          {teacher.wellbeing}/10
                        </span>
                      </td>
                      <td className="text-center py-3 px-4">
                        <span className="text-contigo-navy font-semibold">{teacher.studentsCount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Environment KPIs */}
          <div className="bg-gradient-to-br from-contigo-teal to-contigo-blue rounded-xl p-6 shadow-sm text-white">
            <h3 className="text-lg font-semibold font-nunito mb-4">
              🌍 Environment & Context Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">28</div>
                <div className="text-sm opacity-90">Avg Class Size</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">10–11am</div>
                <div className="text-sm opacity-90">Peak Performance Time</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">92%</div>
                <div className="text-sm opacity-90">Avg TL Usage</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
