'use client'

import { useState } from 'react'
import { X, Send, Sparkles } from 'lucide-react'
import { tigoResponses } from '@/lib/mockData'

export default function TigoChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'tigo' }[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickQueries = [
    "Which student needs the most support?",
    "What's the best time for speaking lessons?",
    "Show me Hassan's progress"
  ]

  const handleSend = (query?: string) => {
    const messageText = query || input
    if (!messageText.trim()) return

    setMessages(prev => [...prev, { text: messageText, sender: 'user' }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = tigoResponses[messageText] || 
        "I'm here to help! I can provide insights on student performance, suggest interventions, and analyze classroom data. Try asking me about specific students or patterns you've noticed. 📚"
      
      setMessages(prev => [...prev, { text: response, sender: 'tigo' }])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-contigo-orange hover:bg-contigo-coral text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label="Open Tigo Chat"
        >
          <div className="text-2xl">🤖</div>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-contigo-white rounded-2xl shadow-2xl flex flex-col border-2 border-contigo-orange">
          {/* Header */}
          <div className="bg-contigo-orange text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-semibold font-nunito">Tigo</h3>
                <p className="text-xs opacity-90">Your AI Teaching Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles size={48} className="text-contigo-orange mx-auto mb-4" />
                <p className="text-contigo-navy font-semibold mb-2">Hi! I'm Tigo 👋</p>
                <p className="text-sm text-contigo-slate mb-4">Ask me anything about your students and classroom!</p>
                <div className="space-y-2">
                  {quickQueries.map((query, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(query)}
                      className="block w-full text-left px-3 py-2 bg-contigo-peach hover:bg-contigo-orange/20 rounded-lg text-sm text-contigo-navy transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-contigo-orange text-white rounded-br-none'
                      : 'bg-contigo-peach text-contigo-navy rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-contigo-peach text-contigo-navy p-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-contigo-slate rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-contigo-slate rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-contigo-slate rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-contigo-peach">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Tigo anything..."
                className="flex-1 px-4 py-2 bg-contigo-peach rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-contigo-orange"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-contigo-orange hover:bg-contigo-coral disabled:bg-contigo-slate disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
