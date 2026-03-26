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
    { role: 'tigo', text: 'TIGO online. I am your AI learning assistant. How can I help you today?' },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      {
        role: 'tigo',
        text: `Based on your recent data, you are making good progress. Keep focusing on speaking practice.`,
      },
    ]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center font-bold text-xs tracking-widest uppercase z-50 transition-all"
        style={{
          background: open ? 'var(--arc-surface)' : 'var(--arc-orange)',
          border: '1px solid var(--arc-orange)',
          color: open ? 'var(--arc-orange)' : '#fff',
          fontFamily: 'Barlow Condensed, monospace',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          boxShadow: '0 0 16px rgba(232,99,42,0.4)',
        }}
        aria-label="Open Tigo Chat"
      >
        {open ? 'CLOSE' : 'TIGO'}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 z-50 flex flex-col overflow-hidden"
          style={{
            background: 'var(--arc-surface)',
            border: '1px solid var(--arc-border)',
            boxShadow: '0 0 30px rgba(0,0,0,0.6)',
          }}>
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between border-b"
            style={{ background: 'var(--arc-panel)', borderColor: 'var(--arc-border)' }}>
            <div>
              <p className="font-bold text-sm tracking-widest uppercase text-glow-orange"
                style={{ color: 'var(--arc-orange)', fontFamily: 'Barlow Condensed, monospace' }}>
                TIGO
              </p>
              <p className="arc-label">AI Learning Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="arc-label hover:text-arc-orange transition-colors text-base"
              style={{ color: 'var(--arc-muted)' }}>
              X
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-64">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="max-w-[80%] px-3 py-2 text-sm"
                  style={{
                    background: msg.role === 'user' ? 'var(--arc-orange)' : 'var(--arc-panel)',
                    color: msg.role === 'user' ? '#fff' : 'var(--arc-text)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--arc-border)',
                    fontFamily: msg.role === 'tigo' ? 'Share Tech Mono, monospace' : undefined,
                    fontSize: msg.role === 'tigo' ? '0.7rem' : '0.875rem',
                    clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3 pb-2 flex flex-wrap gap-1">
            {QUICK_REPLIES.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="text-xs px-2 py-1 transition-colors arc-label"
                style={{
                  background: 'var(--arc-panel)',
                  border: '1px solid var(--arc-border)',
                  color: 'var(--arc-muted)',
                  clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
                }}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2 border-t" style={{ borderColor: 'var(--arc-border)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="ASK TIGO..."
              className="flex-1 px-3 py-2 text-xs tracking-wider focus:outline-none"
              style={{
                background: 'var(--arc-panel)',
                border: '1px solid var(--arc-border)',
                color: 'var(--arc-text)',
                fontFamily: 'Share Tech Mono, monospace',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              className="px-3 py-2 text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                background: 'var(--arc-orange)',
                border: '1px solid var(--arc-orange)',
                color: '#fff',
                fontFamily: 'Barlow Condensed, monospace',
                clipPath: 'polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)',
              }}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  );
}
