"use client";

import { useState } from "react";
import { students, seatingLayout } from "@/lib/mockData";
import { X } from "lucide-react";

type KPILayer = "speaking" | "mood" | "anxiety" | "overall";

const kpiLabels: Record<KPILayer, string> = {
  speaking: "Speaking Score",
  mood: "Mood Score",
  anxiety: "Anxiety Index",
  overall: "Overall Grade",
};

function getHeatColor(value: number, isAnxiety = false): string {
  // For anxiety, high = bad; for others, high = good
  const normalized = isAnxiety ? 100 - value * 10 : value;
  if (normalized >= 80) return "bg-contigo-teal text-white";
  if (normalized >= 65) return "bg-contigo-amber text-white";
  if (normalized >= 50) return "bg-contigo-orange text-white";
  return "bg-red-400 text-white";
}

function getStudentValue(student: (typeof students)[0], layer: KPILayer): number {
  switch (layer) {
    case "speaking": return student.speaking;
    case "mood": return student.mood * 10;
    case "anxiety": return student.anxiety;
    case "overall":
      return Math.round(
        (student.speaking + student.listening + student.reading + student.writing + student.grammar + student.vocabulary) / 6
      );
  }
}

export default function SeatingMap() {
  const [activeLayer, setActiveLayer] = useState<KPILayer>("overall");
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const maxRow = Math.max(...seatingLayout.map((s) => s.row));
  const maxCol = Math.max(...seatingLayout.map((s) => s.col));

  const getStudent = (studentId: string | null) =>
    students.find((s) => s.id === studentId) || null;

  const selectedSeatData = seatingLayout.find((s) => s.seatId === selectedSeat);
  const selectedStudent = selectedSeatData
    ? getStudent(selectedSeatData.studentId)
    : null;

  return (
    <div className="space-y-4">
      {/* KPI Layer Toggle */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(kpiLabels) as KPILayer[]).map((layer) => (
          <button
            key={layer}
            onClick={() => setActiveLayer(layer)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              activeLayer === layer
                ? "bg-contigo-orange text-white"
                : "bg-contigo-peach text-contigo-slate hover:bg-contigo-orange/20"
            }`}
          >
            {kpiLabels[layer]}
          </button>
        ))}
      </div>

      {/* Teacher position */}
      <div className="flex justify-center">
        <div className="px-8 py-2 bg-contigo-navy text-white text-xs font-medium rounded-lg">
          🧑‍🏫 Teacher&apos;s Desk
        </div>
      </div>

      {/* Seating Grid */}
      <div className="flex flex-col gap-3 items-center">
        {Array.from({ length: maxRow }, (_, rowIdx) => (
          <div key={rowIdx} className="flex gap-3">
            {Array.from({ length: maxCol }, (_, colIdx) => {
              const seat = seatingLayout.find(
                (s) => s.row === rowIdx + 1 && s.col === colIdx + 1
              );
              if (!seat) return null;
              const student = getStudent(seat.studentId);
              const value = student
                ? getStudentValue(student, activeLayer)
                : null;
              const isAnxiety = activeLayer === "anxiety";
              const colorClass = student && value !== null
                ? getHeatColor(value, isAnxiety)
                : "bg-contigo-peach text-contigo-slate";

              return (
                <button
                  key={seat.seatId}
                  onClick={() => setSelectedSeat(seat.seatId === selectedSeat ? null : seat.seatId)}
                  className={`w-20 h-16 rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all border-2 ${
                    selectedSeat === seat.seatId
                      ? "border-contigo-amber scale-105 shadow-lg"
                      : "border-transparent hover:border-contigo-orange/50 hover:scale-102"
                  } ${colorClass}`}
                >
                  {student ? (
                    <>
                      <span className="font-bold text-xs">{student.avatar}</span>
                      {value !== null && (
                        <span className="text-[10px] opacity-90">
                          {isAnxiety ? `A:${student.anxiety}` : `${value}%`}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-[10px] opacity-50">Empty</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Zone Labels */}
      <div className="flex justify-center gap-4 text-xs text-contigo-slate">
        <span className="px-2 py-0.5 bg-contigo-peach rounded-full">Front Centre</span>
        <span className="px-2 py-0.5 bg-contigo-peach rounded-full">Middle</span>
        <span className="px-2 py-0.5 bg-contigo-peach rounded-full">Back</span>
      </div>

      {/* Selected Student Info */}
      {selectedStudent && (
        <div className="bg-contigo-peach border border-contigo-orange/20 rounded-xl p-4 relative">
          <button
            onClick={() => setSelectedSeat(null)}
            className="absolute top-3 right-3 text-contigo-slate hover:text-contigo-navy"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-contigo-orange flex items-center justify-center text-white font-bold">
              {selectedStudent.avatar}
            </div>
            <div>
              <p className="font-nunito font-bold text-contigo-navy">{selectedStudent.name}</p>
              <p className="text-xs text-contigo-slate">CEFR: {selectedStudent.cefr} · Risk: {selectedStudent.risk}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {[
              ["Speaking", selectedStudent.speaking],
              ["Listening", selectedStudent.listening],
              ["Reading", selectedStudent.reading],
              ["Writing", selectedStudent.writing],
              ["Grammar", selectedStudent.grammar],
              ["Vocabulary", selectedStudent.vocabulary],
            ].map(([label, val]) => (
              <div key={String(label)} className="bg-white rounded-lg p-2 text-center">
                <p className="text-contigo-slate">{label}</p>
                <p className="font-bold text-contigo-navy font-mono">{val}%</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Heatmap Legend */}
      <div className="flex items-center gap-2 text-xs text-contigo-slate">
        <span>Low</span>
        <div className="flex gap-1">
          <div className="w-5 h-3 rounded bg-red-400" />
          <div className="w-5 h-3 rounded bg-contigo-orange" />
          <div className="w-5 h-3 rounded bg-contigo-amber" />
          <div className="w-5 h-3 rounded bg-contigo-teal" />
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
