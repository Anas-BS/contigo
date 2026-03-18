import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import SkillRadarChart from '@/components/charts/SkillRadarChart'
import TimelineChart from '@/components/charts/TimelineChart'
import CEFRBadge from '@/components/ui/CEFRBadge'
import MoodCheckIn from '@/components/checkin/MoodCheckIn'
import { students, cefrTimeline, recentAssessments } from '@/lib/mockData'

export default function StudentDashboard() {
  // Using Hassan's data as the logged-in student
  const student = students[0]

  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar />
      <div className="flex">
        <Sidebar role="student" />
        <main className="flex-1 p-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-contigo-orange to-contigo-coral rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-nunito font-bold mb-2">
              Good morning, Hassan! 🌅
            </h1>
            <p className="text-lg opacity-90">
              You're making great progress. Keep up the excellent work!
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-8">
              {/* Skill Radar Chart */}
              <SkillRadarChart
                data={{
                  speaking: student.speaking,
                  listening: student.listening,
                  reading: student.reading,
                  writing: student.writing,
                  grammar: student.grammar,
                  vocabulary: student.vocabulary,
                }}
              />

              {/* CEFR Timeline */}
              <TimelineChart data={cefrTimeline} title="My CEFR Journey" />

              {/* Recent Assessments */}
              <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
                  Recent Assessments
                </h3>
                <div className="space-y-3">
                  {recentAssessments.map((assessment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="bg-contigo-orange text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold">
                          {assessment.score}
                        </div>
                        <div>
                          <div className="font-semibold text-contigo-navy">
                            {assessment.type}
                          </div>
                          <div className="text-sm text-contigo-slate">
                            {assessment.date}
                          </div>
                        </div>
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {assessment.cefr}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Widgets */}
            <div className="space-y-8">
              {/* CEFR Badge */}
              <CEFRBadge level={student.cefr} progress={student.cefrProgress} />

              {/* Mood Check-In */}
              <MoodCheckIn />

              {/* Quick Stats */}
              <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-contigo-slate">Attendance</span>
                    <span className="text-lg font-bold text-contigo-navy">
                      {student.attendance}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-contigo-teal h-full rounded-full"
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-contigo-slate">Confidence Level</span>
                    <span className="text-lg font-bold text-contigo-navy">
                      {student.confidence}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-contigo-orange h-full rounded-full"
                      style={{ width: `${student.confidence * 10}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Tigo Says */}
              <div className="bg-gradient-to-br from-contigo-blue to-contigo-teal rounded-xl p-6 shadow-sm text-white">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🤖</span>
                  <h3 className="text-lg font-semibold font-nunito">Tigo Says</h3>
                </div>
                <p className="text-sm opacity-90">
                  "Your speaking scores have improved 15% this month! Keep practicing conversation with classmates during break time. 💬"
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
