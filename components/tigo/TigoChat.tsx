"use client";

import { useState } from "react";
import { X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const quickChips = [
  "Who needs attention today?",
  "Show speaking trends",
  "Best lesson time?",
  "Seating suggestions",
  "Hassan's progress",
];

const tigoResponses: Record<string, string> = {
  "Who needs attention today?":
    "⚠️ Hassan Al-Rashid (S001) is showing high anxiety (7/10) and a downward score trend. I recommend moving him to a front-centre seat this week.",
  "Show speaking trends":
    "📊 Speaking scores have improved 8% school-wide this month. Sara Benali leads with +15%. Hassan shows a -12% dip — likely anxiety-related.",
  "Best lesson time?":
    "⏰ The 9–10am slot consistently outperforms others with a 78% average score. Afternoon lessons (2–4pm) see a 20% performance drop. Consider scheduling assessments in the morning.",
  "Seating suggestions":
    "🪑 Suggestion: Move Hassan to Front Centre (currently Row 2). Data shows his anxiety drops 40% near the teacher. Omar and Sara can move to middle — they're self-sufficient learners.",
  "Hassan's progress":
    "👤 Hassan Al-Rashid (B1) has shown declining trends: Speaking -12%, Writing -8% this month. Root cause analysis suggests anxiety (7/10) + afternoon lesson slots. Recommended: front seating + morning reassessment.",
};

interface Message {
  id: number;
  from: "user" | "tigo";
  text: string;
}

export default function TigoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: "tigo",
      text: "👋 Hi! I'm Tigo, your AI learning assistant. Ask me about student performance, seating, or lesson insights!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        tigoResponses[text] ||
        "🤖 Great question! Based on the current data, I'd suggest reviewing the student's recent mood check-ins and assessment trends. Would you like me to pull up a detailed report?";
      const tigoMsg: Message = {
        id: Date.now() + 1,
        from: "tigo",
        text: response,
      };
      setMessages((prev) => [...prev, tigoMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-contigo-orange shadow-lg flex items-center justify-center text-white hover:bg-contigo-coral transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Tigo AI Chat"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[600px] sm:h-[580px] sm:bottom-6 sm:right-6 sm:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden border border-contigo-peach"
          >
            {/* Header */}
            <div className="bg-contigo-orange px-4 py-3 flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-nunito font-bold text-white text-sm">
                  Tigo 🤖
                </p>
                <p className="text-white/80 text-xs">AI Learning Assistant</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-contigo-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "tigo" && (
                    <div className="w-7 h-7 rounded-full bg-contigo-orange flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "bg-contigo-orange text-white rounded-tr-sm"
                        : "bg-white text-contigo-navy rounded-tl-sm shadow-sm border border-contigo-peach"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-contigo-orange flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-contigo-peach rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-contigo-slate rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-contigo-slate rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-contigo-slate rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Chips */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0 bg-contigo-peach/40 border-t border-contigo-peach">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 bg-white border border-contigo-orange text-contigo-orange rounded-full hover:bg-contigo-orange hover:text-white transition-colors font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 py-3 bg-white border-t border-contigo-peach flex gap-2 flex-shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask Tigo anything..."
                className="flex-1 px-3 py-2 text-sm bg-contigo-white border border-contigo-peach rounded-xl focus:outline-none focus:ring-2 focus:ring-contigo-orange/50 text-contigo-navy placeholder:text-contigo-slate"
              />
              <button
                onClick={() => sendMessage(input)}
                className="w-9 h-9 bg-contigo-orange rounded-xl flex items-center justify-center text-white hover:bg-contigo-coral transition-colors flex-shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
