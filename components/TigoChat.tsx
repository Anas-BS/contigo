'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'tigo';
  text: string;
}

const QUICK_REPLIES = [
  'How am I doing this week?',
  'What should I focus on?',
  'Show my best skill',
];

export default function TigoChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'tigo', text: 'Hi! I\'m Tigo 🤖 — your AI learning assistant. How can I help you today?' },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      {
        role: 'tigo',
        text: `Great question! Based on your recent data, I can see you're making good progress. Keep focusing on speaking practice! 🎯`,
      },
    ]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 bg-[#F97B4F] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-orange-500 transition-colors z-50"
        aria-label="Open Tigo Chat"
      >
        🤖
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-orange-100 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#F97B4F] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <p className="font-semibold text-sm">Tigo</p>
                <p className="text-xs opacity-80">AI Learning Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-lg">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-64">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#F97B4F] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-1 flex flex-wrap gap-1">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-xs bg-orange-50 border border-orange-200 text-[#F97B4F] px-2 py-1 rounded-full hover:bg-orange-100 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask Tigo anything…"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F97B4F]"
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-[#F97B4F] text-white px-3 py-2 rounded-lg text-sm hover:bg-orange-500 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
