'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mock authentication - redirect to appropriate dashboard
    if (role === 'student') {
      router.push('/student/dashboard')
    } else if (role === 'teacher') {
      router.push('/teacher/dashboard')
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-contigo-orange via-contigo-coral to-contigo-orange p-4">
      <div className="bg-contigo-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-nunito font-bold text-contigo-orange mb-2">
              Contigo
            </h1>
          </Link>
          <p className="text-contigo-slate">With you, every step.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role Selector */}
          <div>
            <label className="block text-sm font-semibold text-contigo-navy mb-3">
              I am a...
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-contigo-orange text-white'
                    : 'bg-contigo-peach text-contigo-navy hover:bg-contigo-orange/20'
                }`}
              >
                🎓 Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  role === 'teacher'
                    ? 'bg-contigo-orange text-white'
                    : 'bg-contigo-peach text-contigo-navy hover:bg-contigo-orange/20'
                }`}
              >
                👩‍🏫 Teacher
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                  role === 'admin'
                    ? 'bg-contigo-orange text-white'
                    : 'bg-contigo-peach text-contigo-navy hover:bg-contigo-orange/20'
                }`}
              >
                📊 Admin
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-contigo-navy mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-contigo-peach border-2 border-transparent rounded-lg focus:outline-none focus:border-contigo-orange transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-contigo-navy mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-contigo-peach border-2 border-transparent rounded-lg focus:outline-none focus:border-contigo-orange transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-contigo-orange hover:text-contigo-coral transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-contigo-orange hover:bg-contigo-coral text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-contigo-slate">
          Don't have an account?{' '}
          <Link href="/signup" className="text-contigo-orange hover:text-contigo-coral font-semibold transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
