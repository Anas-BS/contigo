'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'tigo';
  text: string;
}

const QUICK_REPLIES = [
  'How am I doing this week?',
  'What should I focus on?',
  'Show my best skill',
];

const floatingButtonVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  hover: {
    scale: 1.1,
    boxShadow: '0px 10px 30px rgba(249, 123, 79, 0.4)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const chatPanelVariants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const messageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

const pulseVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.15, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function TigoChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'tigo',
      text: "Hi! I'm Tigo 🤖, your learning companion. How can I help you today?",
    },
  ]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      {
        role: 'tigo',
        text: `Great question! Based on your recent data, I can see you're making excellent progress. Keep focusing on speaking practice! Your confidence has improved by 15% this month. 🎯`,
      },
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        <motion.button
          onClick={() => setOpen((o) => !o)}
          className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:shadow-orange-500/50 z-50 bg-gradient-to-br from-orange-500 to-orange-600 text-white border border-orange-400/50 backdrop-blur-md"
          variants={floatingButtonVariants}
          initial="initial"
          animate={open ? 'tap' : 'animate'}
          whileHover="hover"
          whileTap="tap"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Animation when closed */}
          {!open && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-orange-400"
              variants={pulseVariants}
              initial="initial"
              animate="animate"
            />
          )}
        </motion.button>
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 backdrop-blur-xl bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl shadow-2xl border border-white/20 z-50 flex flex-col overflow-hidden"
            variants={chatPanelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Header */}
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-5 flex items-center justify-between border-b border-orange-400/30"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🤖
                </motion.span>
                <div>
                  <p className="font-semibold text-base">Tigo</p>
                  <p className="text-xs opacity-80">Your Learning Companion</p>
                </div>
              </div>
            </motion.div>

            {/* Messages Container */}
            <motion.div
              className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 scrollbar-hide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div
                      className={`max-w-xs rounded-2xl px-4 py-3 text-sm font-medium backdrop-blur-md ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {msg.text}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Quick Replies */}
            <motion.div
              className="px-4 py-3 flex flex-wrap gap-2 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {QUICK_REPLIES.map((reply, index) => (
                <motion.button
                  key={reply}
                  onClick={() => sendMessage(reply)}
                  className="text-xs bg-white/10 border border-white/20 text-white px-3 py-2 rounded-full hover:bg-white/20 hover:border-orange-400/50 transition-all backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {reply}
                </motion.button>
              ))}
            </motion.div>

            {/* Input Section */}
            <motion.div
              className="p-4 border-t border-white/10 flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <motion.input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Tigo anything…"
                className="flex-1 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-400/50 focus:bg-white/20 transition-all backdrop-blur-md"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                onClick={() => sendMessage(input)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
