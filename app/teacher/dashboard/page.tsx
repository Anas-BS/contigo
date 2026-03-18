'use client'

import { useState } from 'react'
import Navbar from '@/components/ui/Navbar'
import Sidebar from '@/components/ui/Sidebar'
import AlertCard from '@/components/ui/AlertCard'
import { students, teachers } from '@/lib/mockData'
import { Star } from 'lucide-react'

export default function TeacherDashboard() {
  const teacher = teachers[0]
  const teacherStudents = students.filter(s => s.teacher === teacher.id)
  const atRiskStudents = teacherStudents.filter(s => s.atRisk)

  const [tlPercent, setTlPercent] = useState(95)
  const [engagement, setEngagement] = useState(4)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const skills = ['Speaking', 'Listening', 'Reading', 'Writing', 'Grammar', 'Vocabulary']

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const handleLogLesson = () => {
    alert(`Lesson logged!\nSkills: ${selectedSkills.join(', ')}\nTL%: ${tlPercent}%\nEngagement: ${engagement} stars`)
    setSelectedSkills([])
    setTlPercent(95)
    setEngagement(4)
  }

  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar />
      <div className="flex">
        <Sidebar role="teacher" />
        <main className="flex-1 p-8">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-contigo-blue to-contigo-teal rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-3xl font-nunito font-bold mb-2">
              Welcome back, {teacher.name}! 👋
            </h1>
            <p className="text-lg opacity-90">
              {teacher.qualification} Certified • {teacher.yearsExp} years experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Lesson Log & Classes */}
            <div className="lg:col-span-2 space-y-8">
              {/* Lesson Log */}
              <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
                  📝 Quick Lesson Log
                </h3>

                {/* Skills Practiced */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-contigo-navy mb-2">
                    Skills Practiced
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedSkills.includes(skill)
                            ? 'bg-contigo-orange text-white'
                            : 'bg-white text-contigo-navy hover:bg-contigo-white'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TL% Slider */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-contigo-navy mb-2">
                    Target Language % (TL%)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tlPercent}
                      onChange={e => setTlPercent(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-contigo-orange"
                    />
                    <span className="text-2xl font-bold text-contigo-orange w-16 text-right">
                      {tlPercent}%
                    </span>
                  </div>
                </div>

                {/* Engagement Stars */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-contigo-navy mb-2">
                    Class Engagement
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setEngagement(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={star <= engagement ? 'fill-contigo-amber text-contigo-amber' : 'text-gray-300'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLogLesson}
                  className="w-full bg-contigo-orange hover:bg-contigo-coral text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Log Lesson
                </button>
              </div>

              {/* Class Cards */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-nunito text-contigo-navy">
                  My Classes
                </h3>
                {teacher.classes.map((className, index) => (
                  <div key={index} className="bg-contigo-peach rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-bold text-contigo-navy">{className}</h4>
                      <span className="bg-contigo-orange text-white px-4 py-2 rounded-full font-semibold">
                        {Math.floor(teacher.studentsCount / teacher.classes.length)} students
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-contigo-orange">
                          {teacher.classAvg}
                        </div>
                        <div className="text-xs text-contigo-slate">Avg Score</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-contigo-teal">
                          {teacher.tlPercent}%
                        </div>
                        <div className="text-xs text-contigo-slate">TL Usage</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-contigo-blue">
                          {atRiskStudents.length}
                        </div>
                        <div className="text-xs text-contigo-slate">At Risk</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Alerts & Insights */}
            <div className="space-y-8">
              {/* Needs Attention */}
              <div className="bg-contigo-white rounded-xl p-6 shadow-sm border-2 border-red-200">
                <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4 flex items-center">
                  <span className="mr-2">⚠️</span>
                  Needs Attention
                </h3>
                <div className="space-y-3">
                  {atRiskStudents.map(student => (
                    <AlertCard
                      key={student.id}
                      studentName={student.name}
                      riskLevel={student.riskLevel}
                      issues={[
                        student.attendance < 80 && `Attendance: ${student.attendance}%`,
                        student.mood < 6 && `Low mood: ${student.mood}/10`,
                        student.anxiety > 6 && `High anxiety: ${student.anxiety}/10`,
                        student.speaking < 60 && `Speaking: ${student.speaking}`,
                      ].filter(Boolean) as string[]}
                    />
                  ))}
                </div>
              </div>

              {/* Room Heatmap Preview */}
              <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
                  🪑 Classroom View
                </h3>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {teacherStudents.slice(0, 16).map((student, i) => (
                    <div
                      key={i}
                      className={`h-12 rounded flex items-center justify-center text-xs font-semibold ${
                        student.atRisk
                          ? 'bg-red-400 text-white'
                          : student.speaking >= 70
                          ? 'bg-green-400 text-white'
                          : 'bg-yellow-400 text-white'
                      }`}
                    >
                      {student.name.split(' ')[0].slice(0, 3)}
                    </div>
                  ))}
                </div>
                <a
                  href="/teacher/classroom"
                  className="block text-center text-contigo-orange hover:text-contigo-coral font-semibold transition-colors"
                >
                  View Full Seating Map →
                </a>
              </div>

              {/* Tigo Says */}
              <div className="bg-gradient-to-br from-contigo-orange to-contigo-coral rounded-xl p-6 shadow-sm text-white">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🤖</span>
                  <h3 className="text-lg font-semibold font-nunito">Tigo Says</h3>
                </div>
                <p className="text-sm opacity-90 mb-3">
                  "Your TL% of {teacher.tlPercent}% correlates with 18% higher grammar scores. Great work! Consider pairing Hassan with Omar for speaking practice."
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
