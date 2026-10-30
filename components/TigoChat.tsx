'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Dialog, controlStyles } from '@/components/ui';
import type { AuthRole } from '@/lib/context/AuthContext';
import { TIGO_PROMPTS, tigoReply } from '@/lib/services/tigo';
import { cx } from '@/components/ui/cx';

interface Message {
  role: 'user' | 'tigo';
  text: string;
}

const GREETING: Record<AuthRole, string> = {
  student: 'I can explain your progress and suggest what to practise next.',
  teacher: 'I can summarise who needs attention and how the class is trending.',
  admin: 'I can summarise grade-level results and open alerts.',
};

export default function TigoChat({ open, onClose, role }: { open: boolean; onClose: () => void; role: AuthRole }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'tigo', text: GREETING[role] }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'tigo', text: GREETING[role] }]);
  }, [role]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { role: 'user', text: value }, { role: 'tigo', text: tigoReply(role, value) }]);
    setInput('');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      placement="right"
      title="Ask Tigo"
      description="Preview assistant. Answers are computed from the sample data in this demo."
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-4 px-5 py-5" aria-live="polite" aria-relevant="additions">
          {messages.map((m, i) => (
            <div key={i} className={cx('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              <div
                className={cx(
                  'max-w-[85%] text-[14px] leading-6',
                  m.role === 'user'
                    ? 'rounded-md rounded-br-sm bg-ink px-3.5 py-2 text-paper'
                    : 'border-l-2 border-ember-500 pl-3 text-ink-800'
                )}
              >
                {m.role === 'tigo' && <span className="label mb-0.5 block">Tigo</span>}
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="border-t border-line px-5 py-4">
          <p className="label mb-2">Suggested</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {TIGO_PROMPTS[role].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                className="rounded border border-line-strong bg-paper-raised px-2.5 py-1 text-[13px] text-ink-700 transition-colors hover:border-ink-500 hover:text-ink"
              >
                {p}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <label htmlFor="tigo-input" className="sr-only">
              Ask Tigo a question
            </label>
            <input
              id="tigo-input"
              data-autofocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this page"
              autoComplete="off"
              className={cx(controlStyles, 'h-10 min-w-0 flex-1')}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="inline-flex h-10 w-10 items-center justify-center rounded bg-ink text-paper transition-colors hover:bg-ink-800 disabled:opacity-40"
            >
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
