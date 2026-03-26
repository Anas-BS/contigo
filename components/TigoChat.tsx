'use client';

import { useState } from 'react';

interface Message {
  role: 'user' | 'tigo';
  text: string;
}

function CopilotIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.656 1.424 5.168L2 22l4.832-1.424A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 2a8 8 0 1 1 0 16A8 8 0 0 1 12 4Zm-2.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-5.25 5.5c.69 1.17 1.82 2 3.75 2s3.06-.83 3.75-2H9.25Z" />
    </svg>
  );
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
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={() => setOpen((o) => !o)}
          className="bg-[#F97B4F] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
          aria-label="Chat with Tigo"
          aria-describedby="tigo-tooltip"
        >
          <CopilotIcon className="w-8 h-8" />
        </button>
        {/* Tooltip */}
        <span
          id="tigo-tooltip"
          role="tooltip"
          className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md"
        >
          Chat with Tigo
        </span>
      </div>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border border-orange-100 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#F97B4F] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CopilotIcon className="w-6 h-6" />
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
