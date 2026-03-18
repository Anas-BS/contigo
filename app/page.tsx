'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BarChart3, Users, Brain, TrendingUp, Award, Clock } from 'lucide-react'

export default function LandingPage() {
  const [counts, setCounts] = useState({ students: 0, teachers: 0, insights: 0 })

  useEffect(() => {
    const targets = { students: 10000, teachers: 500, insights: 50000 }
    const duration = 2000
    const steps = 50
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      setCounts({
        students: Math.floor((targets.students / steps) * step),
        teachers: Math.floor((targets.teachers / steps) * step),
        insights: Math.floor((targets.insights / steps) * step),
      })
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-contigo-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-nunito font-bold text-contigo-orange">
                Contigo
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-contigo-navy hover:text-contigo-orange transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-contigo-navy hover:text-contigo-orange transition-colors">
                How It Works
              </Link>
              <Link href="#roles" className="text-contigo-navy hover:text-contigo-orange transition-colors">
                Roles
              </Link>
              <Link href="/login" className="bg-contigo-orange hover:bg-contigo-coral text-white px-6 py-2 rounded-full font-semibold transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-nunito font-bold text-contigo-navy mb-6">
              With you, <span className="text-contigo-orange">every step.</span>
            </h1>
            <p className="text-xl md:text-2xl text-contigo-slate mb-8 max-w-3xl mx-auto">
              A holistic ELT student performance intelligence platform that transforms data into actionable insights for educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="bg-contigo-orange hover:bg-contigo-coral text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block">
                Get Started
              </Link>
              <Link href="#features" className="bg-contigo-peach hover:bg-contigo-orange/20 text-contigo-navy px-8 py-4 rounded-full font-semibold text-lg transition-colors inline-block">
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-contigo-peach rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold font-nunito text-contigo-orange mb-2">
                {counts.students.toLocaleString()}+
              </div>
              <div className="text-contigo-navy font-semibold">Students Supported</div>
            </div>
            <div className="bg-contigo-peach rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold font-nunito text-contigo-orange mb-2">
                {counts.teachers.toLocaleString()}+
              </div>
              <div className="text-contigo-navy font-semibold">Teachers Empowered</div>
            </div>
            <div className="bg-contigo-peach rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold font-nunito text-contigo-orange mb-2">
                {counts.insights.toLocaleString()}+
              </div>
              <div className="text-contigo-navy font-semibold">AI Insights Generated</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-contigo-peach">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-nunito font-bold text-contigo-navy text-center mb-12">
            Everything you need to support every student
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-contigo-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-contigo-orange rounded-xl p-4 w-fit mb-4">
                <BarChart3 size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-nunito font-bold text-contigo-navy mb-3">
                📊 Holistic Analytics
              </h3>
              <p className="text-contigo-slate">
                Track mood, anxiety, confidence, and skill scores in one unified dashboard. See the full picture of student wellbeing and performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-contigo-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-contigo-blue rounded-xl p-4 w-fit mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-nunito font-bold text-contigo-navy mb-3">
                🪑 Classroom Intelligence
              </h3>
              <p className="text-contigo-slate">
                Interactive seating maps with performance overlays. AI-powered seating suggestions based on student needs and social dynamics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-contigo-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-contigo-teal rounded-xl p-4 w-fit mb-4">
                <Brain size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-nunito font-bold text-contigo-navy mb-3">
                🤖 AI-Powered Insights
              </h3>
              <p className="text-contigo-slate">
                Meet Tigo, your AI teaching assistant. Get instant answers about student performance, intervention strategies, and classroom patterns.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-nunito font-bold text-contigo-navy text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-contigo-orange text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-nunito font-bold text-contigo-navy mb-3">
                Collect Data
              </h3>
              <p className="text-contigo-slate">
                Students check in daily with mood and confidence levels. Teachers log lesson data and observations.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-contigo-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-nunito font-bold text-contigo-navy mb-3">
                AI Analysis
              </h3>
              <p className="text-contigo-slate">
                Our AI analyzes patterns, correlations, and trends across all data points to identify insights.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-contigo-teal text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-nunito font-bold text-contigo-navy mb-3">
                Take Action
              </h3>
              <p className="text-contigo-slate">
                Receive personalized recommendations and interventions to support each student's unique journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section id="roles" className="py-20 px-4 bg-contigo-peach">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-nunito font-bold text-contigo-navy text-center mb-12">
            Built for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/student/dashboard" className="bg-contigo-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-2xl font-nunito font-bold text-contigo-navy mb-3">
                Students
              </h3>
              <p className="text-contigo-slate mb-4">
                Track your progress, celebrate wins, and get personalized learning paths tailored to your goals.
              </p>
              <span className="text-contigo-orange font-semibold">Explore Student Portal →</span>
            </Link>

            <Link href="/teacher/dashboard" className="bg-contigo-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="text-6xl mb-4">👩‍🏫</div>
              <h3 className="text-2xl font-nunito font-bold text-contigo-navy mb-3">
                Teachers
              </h3>
              <p className="text-contigo-slate mb-4">
                Identify at-risk students, optimize seating, and get AI-powered intervention suggestions.
              </p>
              <span className="text-contigo-orange font-semibold">Explore Teacher Portal →</span>
            </Link>

            <Link href="/admin/dashboard" className="bg-contigo-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all hover:scale-105">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-nunito font-bold text-contigo-navy mb-3">
                Admins
              </h3>
              <p className="text-contigo-slate mb-4">
                Analyze school-wide trends, optimize resources, and measure the impact of interventions.
              </p>
              <span className="text-contigo-orange font-semibold">Explore Admin Portal →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">💬</div>
          <blockquote className="text-2xl md:text-3xl font-nunito text-contigo-navy mb-6 italic">
            "Contigo transformed how I understand my students. Now I can intervene before they fall behind, not after."
          </blockquote>
          <div className="text-contigo-slate font-semibold">
            — Amina Okafor, DELTA-certified ELT Teacher
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-contigo-navy text-contigo-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-nunito font-bold text-contigo-orange mb-3">
                Contigo
              </div>
              <p className="text-contigo-slate">
                With you, every step of your English learning journey.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-contigo-slate">
                <li><Link href="#features" className="hover:text-contigo-orange transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-contigo-orange transition-colors">How It Works</Link></li>
                <li><Link href="#roles" className="hover:text-contigo-orange transition-colors">Roles</Link></li>
                <li><Link href="/login" className="hover:text-contigo-orange transition-colors">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-contigo-slate">
                <li>hello@contigo.app</li>
                <li>@contigoedu</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-contigo-slate border-t border-contigo-slate/20 pt-8">
            © 2024 Contigo. Built with ❤️ for educators.
          </div>
        </div>
      </footer>
    </div>
  )
}
