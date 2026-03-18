"use client";

import Navbar from "@/components/ui/Navbar";
import SeatingMap from "@/components/classroom/SeatingMap";
import { tigoInsights } from "@/lib/mockData";
import { CheckCircle, XCircle, Edit3, MapPin } from "lucide-react";

export default function ClassroomPage() {
  return (
    <div className="min-h-screen bg-contigo-white">
      <Navbar userName="Amina Okafor" />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-nunito font-bold text-2xl md:text-3xl text-contigo-navy flex items-center gap-3">
            <MapPin className="w-7 h-7 text-contigo-orange" />
            Classroom Intelligence
          </h1>
          <p className="text-contigo-slate mt-1">
            Grade 5B · Room R12 · 16 students · Traditional rows layout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seating Map */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach">
            <h2 className="font-nunito font-bold text-lg text-contigo-navy mb-5">
              Seating Heatmap
            </h2>
            <SeatingMap />
          </div>

          {/* Tigo Seating Suggestions */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-contigo-orange to-contigo-coral rounded-2xl p-5 text-white shadow-lg">
              <h2 className="font-nunito font-bold text-base mb-4 flex items-center gap-2">
                🤖 Tigo&apos;s Seating Suggestions
              </h2>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-sm font-medium mb-1">Move Hassan Al-Rashid</p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    → Front Centre. His anxiety drops 40% near the teacher. Speaking score projected +18%.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white text-contigo-orange rounded-lg text-xs font-medium hover:bg-white/90 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" /> Apply
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium hover:bg-white/30 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" /> Modify
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/10 text-white/70 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Keep
                    </button>
                  </div>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-sm font-medium mb-1">Pair Sara &amp; Lena</p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Sara&apos;s high motivation (8/10) can help Lena&apos;s flat trend. Peer learning boost expected.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white text-contigo-orange rounded-lg text-xs font-medium hover:bg-white/90 transition-colors">
                      <CheckCircle className="w-3.5 h-3.5" /> Apply
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/20 text-white rounded-lg text-xs font-medium hover:bg-white/30 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" /> Modify
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white/10 text-white/70 rounded-lg text-xs font-medium hover:bg-white/20 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Keep
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Selector */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-contigo-peach">
              <h3 className="font-nunito font-bold text-base text-contigo-navy mb-3">
                Layout Style
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {["Traditional Rows", "U-Shape", "Clusters", "Pairs"].map((layout) => (
                  <button
                    key={layout}
                    className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                      layout === "Traditional Rows"
                        ? "bg-contigo-orange text-white"
                        : "bg-contigo-peach text-contigo-slate hover:bg-contigo-orange/20"
                    }`}
                  >
                    {layout}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional insights */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-contigo-peach">
              <h3 className="font-nunito font-bold text-base text-contigo-navy mb-3">
                Class Insights
              </h3>
              <div className="space-y-2">
                {tigoInsights.slice(2, 5).map((insight) => (
                  <div key={insight.id} className="flex gap-2 text-sm">
                    <span className="flex-shrink-0">{insight.icon}</span>
                    <p className="text-contigo-slate text-xs leading-relaxed">{insight.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
