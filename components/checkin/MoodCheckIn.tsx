'use client'

import { useState } from 'react'
import { Smile, Meh, Frown } from 'lucide-react'

export default function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [confidence, setConfidence] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const moods = [
    { value: 1, emoji: '😔', label: 'Very Low' },
    { value: 2, emoji: '😐', label: 'Low' },
    { value: 3, emoji: '🙂', label: 'Okay' },
    { value: 4, emoji: '😊', label: 'Good' },
    { value: 5, emoji: '😄', label: 'Great' },
  ]

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setSelectedMood(null)
      setConfidence(5)
    }, 3000)
  }

  return (
    <div className="bg-contigo-peach rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold font-nunito text-contigo-navy mb-4">
        Daily Check-In
      </h3>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-lg font-semibold text-contigo-orange mb-2">
            Thank you for checking in!
          </p>
          <p className="text-sm text-contigo-slate">
            Your feedback helps us support you better.
          </p>
        </div>
      ) : (
        <>
          {/* Mood Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-contigo-navy mb-3">
              How are you feeling today?
            </label>
            <div className="flex justify-between">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                    selectedMood === mood.value
                      ? 'bg-contigo-orange text-white scale-110'
                      : 'bg-white hover:bg-contigo-white hover:scale-105'
                  }`}
                >
                  <span className="text-3xl mb-1">{mood.emoji}</span>
                  <span className={`text-xs ${selectedMood === mood.value ? 'text-white' : 'text-contigo-slate'}`}>
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Confidence Slider */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-contigo-navy mb-3">
              How confident are you feeling about your English today?
            </label>
            <div className="flex items-center space-x-4">
              <Frown size={24} className="text-contigo-slate" />
              <input
                type="range"
                min="1"
                max="10"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-contigo-orange"
              />
              <Smile size={24} className="text-contigo-orange" />
            </div>
            <div className="text-center mt-2">
              <span className="text-2xl font-bold text-contigo-orange">{confidence}</span>
              <span className="text-sm text-contigo-slate">/10</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedMood === null}
            className="w-full bg-contigo-orange hover:bg-contigo-coral disabled:bg-contigo-slate disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Submit Check-In
          </button>
        </>
      )}
    </div>
  )
}
