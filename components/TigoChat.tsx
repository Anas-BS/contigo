'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'tigo';
  text: string;
}

type TigoRole = 'student' | 'teacher' | 'staff' | 'admin';

interface TigoChatProps {
  role?: TigoRole;
}

const ROLE_CONFIG: Record<TigoRole, { greeting: string; subtitle: string; quickReplies: string[] }> = {
  student: {
    greeting: "Hi! I'm Tigo 🤖 — your personal AI learning assistant. Ask me anything about your progress, skills, or how to improve!",
    subtitle: 'AI Learning Assistant',
    quickReplies: ['How am I doing this week?', 'What should I focus on?', 'Show my weakest skill', 'Tips to improve speaking'],
  },
  teacher: {
    greeting: "Hi! I'm Tigo 🤖 — your AI teaching assistant. I can help you analyze class performance, spot at-risk students, and suggest interventions.",
    subtitle: 'AI Teaching Assistant',
    quickReplies: ['Who needs attention?', 'Class performance summary', 'Seating suggestions', 'At-risk students'],
  },
  staff: {
    greeting: "Hi! I'm Tigo 🤖 — your AI staff assistant. I can help you manage classes, track student details, and generate insights.",
    subtitle: 'AI Staff Assistant',
    quickReplies: ['Class overview', 'Add student guidance', 'Attendance summary', 'Weekly report'],
  },
  admin: {
    greeting: "Hi! I'm Tigo 🤖 — your school intelligence assistant. I can provide school-wide analytics, teacher performance insights, and strategic recommendations.",
    subtitle: 'AI School Intelligence',
    quickReplies: ['School performance summary', 'Top performing classes', 'At-risk alerts', 'Teacher recommendations'],
  },
};

const TIGO_RESPONSES: Record<string, string> = {
  'how am i doing this week?': "📈 You're performing well! Your speaking score is up 8% and your streak is at 12 days. Keep it up! Focus on writing to round out your skills.",
  'what should i focus on?': "🎯 Based on your skill profile, I recommend focusing on **Writing** (currently your lowest at 60%) and continuing your great momentum in Speaking (72%).",
  'show my weakest skill': "📊 Your weakest skill is **Writing** at 60%, followed by Listening at 65%. I suggest 15 minutes of daily writing exercises and active listening to English podcasts.",
  'tips to improve speaking': "🗣️ Top tips: (1) Practice shadowing — repeat after native speakers. (2) Record yourself for 1 minute daily. (3) Join the speaking circle every Thursday. You got this! 💪",
  'who needs attention?': "⚠️ **3 students** need immediate attention:\n• Mariam T. (41%) — Back row, consistently declining\n• Khalid A. (38%) — Frequent absences\n• Ahmed W. (35%) — Very low engagement\n\nConsider 1-on-1 check-ins this week.",
  'class performance summary': "📊 **Class 5B Summary:**\n• Average: 74% (↑2% from last week)\n• Top performer: Ali N. (91%)\n• 3 at-risk students below 50%\n• Average mood: 7.2/10\n• Attendance: 94%",
  'seating suggestions': "🪑 **Seating Recommendation:**\nMove Mariam T. and Khalid A. to the front-center — data shows 38% higher engagement there. Pair Ahmed W. with Ali N. for peer learning. This could improve back-row scores by 6–9%.",
  'at-risk students': "🚨 **At-Risk List:**\n1. Mariam T. — Grade: 41%, Mood: 4/10, Trend: ↓\n2. Khalid A. — Grade: 38%, Mood: 5/10, Trend: ↓\n3. Ahmed W. — Grade: 35%, Mood: 3/10, Trend: ↓\n\nAll three are in the back row. Recommend parent meetings this week.",
  'class overview': "📋 **Class Overview:**\n• 18 students enrolled\n• Average attendance: 94%\n• Average grade: 74%\n• 3 students at risk\n• Next assessment: Friday",
  'add student guidance': "➕ **Adding a Student:**\nGo to the **Class Management** page from the Teacher Dashboard. Click **Add Student**, fill in their name, level, grade, and mood score. The system will automatically place them in the seating map.",
  'attendance summary': "✅ **Attendance Summary:**\n• Present today: 26/28 (93%)\n• Absent: Tariq L., Mariam T.\n• Weekly average: 94%\n• Below 80% threshold: 2 students need intervention",
  'weekly report': "📅 **Weekly Report:**\n• Classes held: 5/5\n• Average grade: 74%\n• Mood trend: Stable (7.2/10)\n• New assessments: 2\n• Parent contacts needed: 3\n\nReport ready to export.",
  'school performance summary': "🏫 **School-Wide Summary:**\n• 342 students across 18 classes\n• School average: 71% (↓1% this week)\n• Speaking scores dropped 4% school-wide\n• 24 at-risk students flagged\n• Highest performing: Ms. Amina's Grade 5A (82%)",
  'top performing classes': "🏆 **Top Classes This Week:**\n1. Grade 5A — Ms. Amina (82%)\n2. Grade 3B — Mr. Tariq (79%)\n3. Grade 6A — Ms. Rania (77%)\n\nCommon factor: consistent seating + weekly speaking circles.",
  'at-risk alerts': "🚨 **School-Wide Alerts:**\n• 3 students below 40% in Grade 5B\n• Mood drop in Grade 3A (↓1.5 pts)\n• 4 students with attendance <80%\n• Speaking anxiety spike in Grade 6B\n\nRecommend school counselor check-ins.",
  'teacher recommendations': "💡 **Teacher Development Insights:**\nClasses with weekly seating rotation show 12% lower speaking anxiety. Teachers using Tigo insights score 8% higher student outcomes. Consider cross-classroom collaboration between Grade 5 teachers.",
};

function getTigoResponse(text: string, role: TigoRole): string {
  const lower = text.toLowerCase().trim();
  const match = Object.keys(TIGO_RESPONSES).find((key) => lower.includes(key.replace('?', '').trim()) || key.includes(lower));
  if (match) return TIGO_RESPONSES[match];

  const roleDefaults: Record<TigoRole, string> = {
    student: "Great question! 📚 Based on your profile, I'd suggest focusing on your writing and listening skills this week. Remember: consistent daily practice beats cramming! 🎯",
    teacher: "Interesting! 📊 Based on class data, I recommend checking in with your back-row students and reviewing last week's speaking assessment trends for actionable insights.",
    staff: "Sure! 📋 For detailed class management, head to the Class Management page. I can help you track student progress, attendance, and flag any concerns for review.",
    admin: "Good question! 🏫 The latest analytics show a positive trend in attendance but a slight dip in speaking scores. Consider a school-wide speaking initiative this month.",
  };
  return roleDefaults[role];
}

export default function TigoChat({ role = 'student' }: TigoChatProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const config = ROLE_CONFIG[role];
  const [messages, setMessages] = useState<Message[]>([
    { role: 'tigo', text: config.greeting },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    const tigoMsg: Message = { role: 'tigo', text: getTigoResponse(text, role) };
    setMessages((prev) => [...prev, userMsg, tigoMsg]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-[#F97B4F] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-orange-500 transition-all hover:scale-110 z-50"
        aria-label="Open Tigo AI Copilot"
      >
        {open ? '✕' : '🤖'}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-orange-100 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#F97B4F] to-orange-400 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div>
                <p className="font-bold text-sm">Tigo AI Copilot</p>
                <p className="text-xs opacity-90">{config.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-xs opacity-80">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-72 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                {msg.role === 'tigo' && (
                  <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5">🤖</div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#F97B4F] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === 'user' && (
                  <div className="w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 text-white font-bold">U</div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-3 pt-2 pb-1 flex flex-wrap gap-1.5 border-t border-gray-100 bg-white">
            {config.quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-xs bg-orange-50 border border-orange-200 text-[#F97B4F] px-2.5 py-1 rounded-full hover:bg-orange-100 transition-colors font-medium"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask Tigo anything…"
              className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#F97B4F] bg-gray-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="bg-[#F97B4F] text-white px-4 py-2 rounded-xl text-sm hover:bg-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
