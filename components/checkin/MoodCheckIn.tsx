"use client";

import { useState } from "react";

const moodEmojis = [
  { emoji: "😞", label: "Struggling", value: 1 },
  { emoji: "😐", label: "Okay", value: 3 },
  { emoji: "🙂", label: "Good", value: 5 },
  { emoji: "😊", label: "Happy", value: 7 },
  { emoji: "🤩", label: "Excellent", value: 10 },
];

interface MoodCheckInProps {
  onSubmit?: (data: { mood: number; confidence: number; anxiety: number }) => void;
}

export default function MoodCheckIn({ onSubmit }: MoodCheckInProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [confidence, setConfidence] = useState(5);
  const [anxiety, setAnxiety] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedMood === null) return;
    const data = { mood: selectedMood, confidence, anxiety };
    onSubmit?.(data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-2">✅</div>
        <p className="font-nunito font-bold text-contigo-navy">Check-in saved!</p>
        <p className="text-sm text-contigo-slate mt-1">See you in class. You&#39;ve got this! 💪</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-3 text-xs text-contigo-orange underline"
        >
          Update check-in
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Mood Selection */}
      <div>
        <p className="text-sm font-medium text-contigo-navy mb-3">
          How are you feeling today?
        </p>
        <div className="flex gap-2 justify-between">
          {moodEmojis.map((item) => (
            <button
              key={item.value}
              onClick={() => setSelectedMood(item.value)}
              className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                selectedMood === item.value
                  ? "bg-contigo-orange text-white scale-105 shadow"
                  : "bg-contigo-peach hover:bg-contigo-orange/10"
              }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Confidence Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-contigo-navy">English confidence</p>
          <span className="text-sm font-mono font-bold text-contigo-orange">
            {confidence}/10
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={confidence}
          onChange={(e) => setConfidence(Number(e.target.value))}
          className="w-full accent-contigo-orange"
        />
        <div className="flex justify-between text-[10px] text-contigo-slate mt-1">
          <span>Not confident</span>
          <span>Very confident</span>
        </div>
      </div>

      {/* Anxiety Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-medium text-contigo-navy">Nervous about speaking?</p>
          <span className="text-sm font-mono font-bold text-contigo-orange">
            {anxiety}/10
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={anxiety}
          onChange={(e) => setAnxiety(Number(e.target.value))}
          className="w-full accent-contigo-orange"
        />
        <div className="flex justify-between text-[10px] text-contigo-slate mt-1">
          <span>Not at all</span>
          <span>Very nervous</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={selectedMood === null}
        className="w-full py-2.5 bg-contigo-orange text-white rounded-xl font-medium text-sm hover:bg-contigo-coral transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Check-in
      </button>
    </div>
  );
}
