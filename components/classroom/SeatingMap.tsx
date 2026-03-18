'use client'

import { useState } from 'react'
import { students } from '@/lib/mockData'
import { X } from 'lucide-react'

type HeatmapMode = 'speaking' | 'mood' | 'engagement' | 'anxiety' | 'grade'
type LayoutMode = 'rows' | 'u-shape' | 'clusters' | 'pairs'

export default function SeatingMap() {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>('speaking')
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('rows')

  const getHeatmapColor = (student: typeof students[0]) => {
    let value = 0
    switch (heatmapMode) {
      case 'speaking':
        value = student.speaking
        break
      case 'mood':
        value = student.mood * 10
        break
      case 'engagement':
        value = student.attendance
        break
      case 'anxiety':
        value = 100 - (student.anxiety * 10)
        break
      case 'grade':
        value = (student.speaking + student.listening + student.reading + student.writing) / 4
        break
    }

    if (value >= 80) return 'bg-green-400 border-green-600'
    if (value >= 60) return 'bg-yellow-400 border-yellow-600'
    if (value >= 40) return 'bg-orange-400 border-orange-600'
    return 'bg-red-400 border-red-600'
  }

  const getGridLayout = () => {
    switch (layoutMode) {
      case 'rows':
        return 'grid-cols-4'
      case 'u-shape':
        return 'grid-cols-5'
      case 'clusters':
        return 'grid-cols-3'
      case 'pairs':
        return 'grid-cols-2'
      default:
        return 'grid-cols-4'
    }
  }

  const renderSeats = () => {
    const rows = 4
    const cols = 4
    const seats = []

    for (let r = 1; r <= rows; r++) {
      for (let c = 1; c <= cols; c++) {
        const seatId = `R${r}C${c}`
        const student = students.find(s => s.seat === seatId)
        
        seats.push(
          <div
            key={seatId}
            onClick={() => student && setSelectedStudent(student.id)}
            className={`
              relative h-24 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg
              ${student ? getHeatmapColor(student) : 'bg-gray-100 border-gray-300'}
              ${selectedStudent === student?.id ? 'ring-4 ring-contigo-orange' : ''}
            `}
          >
            {student ? (
              <div className="h-full flex flex-col items-center justify-center p-2 text-center">
                <div className="font-semibold text-xs text-white bg-contigo-navy/80 px-2 py-1 rounded mb-1">
                  {student.name.split(' ')[0]}
                </div>
                <div className="text-xl font-bold text-contigo-navy">
                  {heatmapMode === 'speaking' && student.speaking}
                  {heatmapMode === 'mood' && `${student.mood}/10`}
                  {heatmapMode === 'engagement' && `${student.attendance}%`}
                  {heatmapMode === 'anxiety' && `${student.anxiety}/10`}
                  {heatmapMode === 'grade' && student.cefr}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                Empty
              </div>
            )}
          </div>
        )
      }
    }

    return seats
  }

  const selectedStudentData = students.find(s => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heatmap Mode */}
          <div>
            <label className="block text-sm font-semibold text-contigo-navy mb-3">
              Heatmap View
            </label>
            <div className="flex flex-wrap gap-2">
              {(['speaking', 'mood', 'engagement', 'anxiety', 'grade'] as HeatmapMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setHeatmapMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    heatmapMode === mode
                      ? 'bg-contigo-orange text-white'
                      : 'bg-white text-contigo-navy hover:bg-contigo-white'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Layout Mode */}
          <div>
            <label className="block text-sm font-semibold text-contigo-navy mb-3">
              Layout
            </label>
            <div className="flex flex-wrap gap-2">
              {(['rows', 'u-shape', 'clusters', 'pairs'] as LayoutMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setLayoutMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    layoutMode === mode
                      ? 'bg-contigo-blue text-white'
                      : 'bg-white text-contigo-navy hover:bg-contigo-white'
                  }`}
                >
                  {mode.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seating Grid */}
      <div className="bg-contigo-white rounded-xl p-8 shadow-sm">
        <div className="mb-4 text-center">
          <div className="inline-block bg-contigo-navy text-white px-6 py-2 rounded-lg font-semibold">
            📚 Teacher's Desk
          </div>
        </div>
        <div className={`grid ${getGridLayout()} gap-4 max-w-4xl mx-auto`}>
          {renderSeats()}
        </div>
      </div>

      {/* AI Suggestion Panel */}
      <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-3 flex items-center">
          <span className="mr-2">🤖</span>
          AI Seating Suggestion
        </h3>
        <p className="text-sm text-contigo-navy mb-4">
          Based on current performance data, I recommend moving Hassan (B1, high anxiety) next to Omar (B2, low anxiety) for peer support. 
          Also consider placing Lena closer to the front for better engagement.
        </p>
        <button className="bg-contigo-orange hover:bg-contigo-coral text-white font-semibold px-4 py-2 rounded-lg transition-colors">
          Apply Suggested Layout
        </button>
      </div>

      {/* Student Detail Popover */}
      {selectedStudentData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-contigo-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold font-nunito text-contigo-navy">
                  {selectedStudentData.name}
                </h3>
                <p className="text-sm text-contigo-slate">{selectedStudentData.id} • {selectedStudentData.seat}</p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-contigo-slate hover:text-contigo-navy"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-contigo-peach p-3 rounded-lg">
                <span className="text-sm font-medium text-contigo-navy">CEFR Level</span>
                <span className="text-lg font-bold text-contigo-orange">{selectedStudentData.cefr}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-contigo-peach p-3 rounded-lg">
                  <div className="text-xs text-contigo-slate mb-1">Speaking</div>
                  <div className="text-lg font-bold text-contigo-navy">{selectedStudentData.speaking}</div>
                </div>
                <div className="bg-contigo-peach p-3 rounded-lg">
                  <div className="text-xs text-contigo-slate mb-1">Listening</div>
                  <div className="text-lg font-bold text-contigo-navy">{selectedStudentData.listening}</div>
                </div>
                <div className="bg-contigo-peach p-3 rounded-lg">
                  <div className="text-xs text-contigo-slate mb-1">Mood</div>
                  <div className="text-lg font-bold text-contigo-navy">{selectedStudentData.mood}/10</div>
                </div>
                <div className="bg-contigo-peach p-3 rounded-lg">
                  <div className="text-xs text-contigo-slate mb-1">Attendance</div>
                  <div className="text-lg font-bold text-contigo-navy">{selectedStudentData.attendance}%</div>
                </div>
              </div>

              {selectedStudentData.atRisk && (
                <div className="bg-red-50 border-2 border-red-300 p-3 rounded-lg">
                  <div className="flex items-center text-red-800">
                    <span className="mr-2">⚠️</span>
                    <span className="text-sm font-semibold">At-Risk Student</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
