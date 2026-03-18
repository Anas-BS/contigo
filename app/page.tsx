"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  MapPin,
  Bot,
  ChevronRight,
  GraduationCap,
  Users,
  Settings,
  ArrowRight,
  Star,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";

// Animated counter
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Holistic Analytics",
    description:
      "Track 50+ variables per student — from speaking scores to room temperature — and surface the correlations that actually matter.",
    color: "bg-contigo-orange",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Classroom Intelligence",
    description:
      "Visual seating heatmaps powered by real KPI data. See who sits where, and how it affects performance, anxiety, and engagement.",
    color: "bg-contigo-teal",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI-Powered Insights",
    description:
      "Tigo, your AI assistant, reads the data and delivers plain-English recommendations — so teachers spend less time analysing and more time teaching.",
    color: "bg-contigo-blue",
  },
];

const steps = [
  {
    number: "01",
    title: "Collect",
    description:
      "Teachers log lessons in under 3 minutes. Students check in with a 30-second mood widget. Passive tracking runs in the background.",
    color: "text-contigo-orange",
  },
  {
    number: "02",
    title: "Correlate",
    description:
      "Contigo maps every variable against every outcome — automatically surfacing the hidden drivers behind student performance.",
    color: "text-contigo-teal",
  },
  {
    number: "03",
    title: "Act",
    description:
      "Tigo delivers prioritised, actionable nudges. Move a student, adjust a lesson slot, check in with a struggling learner — with one tap.",
    color: "text-contigo-blue",
  },
];

const roles = [
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Student",
    description:
      "See your CEFR journey, skill radar, and personalised AI insights. Track your mood, celebrate growth, stay on course.",
    href: "/student/dashboard",
    color: "bg-contigo-orange",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Teacher",
    description:
      "Log lessons effortlessly. Monitor your class in real-time. Get Tigo's seating suggestions and at-risk alerts before problems escalate.",
    href: "/teacher/dashboard",
    color: "bg-contigo-teal",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Admin",
    description:
      "The full institutional picture. Correlation matrix, teacher wellbeing index, timetable impact — everything in one warm dashboard.",
    href: "/admin/dashboard",
    color: "bg-contigo-blue",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-contigo-white font-inter">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 px-4">
        <div className="absolute inset-0 gradient-hero opacity-10 pointer-events-none" />
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #F97B4F 0%, transparent 70%)" }}
        />
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-contigo-peach border border-contigo-orange/30 rounded-full text-contigo-orange text-sm font-medium mb-6">
              <Bot className="w-4 h-4" />
              <span>Meet Tigo — your AI ELT assistant</span>
            </div>
            <h1 className="font-nunito font-extrabold text-4xl md:text-6xl lg:text-7xl text-contigo-navy leading-tight mb-6">
              With you,{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #F97B4F, #F5C842)" }}
              >
                every step.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-contigo-slate max-w-2xl mx-auto leading-relaxed mb-10">
              Contigo is the holistic ELT intelligence platform that tracks every
              variable around your students — and tells you exactly what to do next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-contigo-orange text-white rounded-xl font-semibold text-base hover:bg-contigo-coral transition-colors shadow-lg shadow-contigo-orange/30"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-contigo-peach text-contigo-navy rounded-xl font-semibold text-base hover:bg-contigo-peach transition-colors"
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-12 px-4 bg-contigo-navy">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { target: 6, suffix: "", label: "KPI Dimensions" },
            { target: 50, suffix: "+", label: "Variables Tracked" },
            { target: 100, suffix: "%", label: "Real-time AI Insights" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-nunito font-extrabold text-3xl md:text-5xl text-contigo-orange mb-1">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </p>
              <p className="text-contigo-slate text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-contigo-navy mb-3">
              Built for every corner of the classroom
            </h2>
            <p className="text-contigo-slate text-lg max-w-2xl mx-auto">
              Three powerful engines working together so nothing falls through the cracks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-nunito font-bold text-lg text-contigo-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-contigo-slate text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-contigo-peach/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-contigo-navy mb-3">
              How it works
            </h2>
            <p className="text-contigo-slate text-lg">Three steps from data to action.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <p className={`font-nunito font-extrabold text-5xl ${step.color} mb-4`}>
                  {step.number}
                </p>
                <h3 className="font-nunito font-bold text-xl text-contigo-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-contigo-slate text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-nunito font-bold text-3xl md:text-4xl text-contigo-navy mb-3">
              Your role in Contigo
            </h2>
            <p className="text-contigo-slate text-lg">
              Every perspective matters — and every dashboard is tailored to it.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={role.href}
                  className="block bg-white rounded-2xl p-6 shadow-sm border border-contigo-peach hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${role.color} flex items-center justify-center text-white mb-4`}
                  >
                    {role.icon}
                  </div>
                  <h3 className="font-nunito font-bold text-lg text-contigo-navy mb-2">
                    {role.title}
                  </h3>
                  <p className="text-contigo-slate text-sm leading-relaxed mb-4">
                    {role.description}
                  </p>
                  <span className="text-contigo-orange text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore dashboard <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 bg-contigo-navy text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-5 h-5 fill-contigo-amber text-contigo-amber" />
            ))}
          </div>
          <blockquote className="font-nunito text-xl md:text-2xl font-semibold leading-relaxed mb-6 text-white/90">
            &ldquo;Contigo showed me that Hassan&apos;s speaking score wasn&apos;t about ability — it was
            about anxiety and seating. One move, and his scores jumped 18% in three
            weeks.&rdquo;
          </blockquote>
          <p className="text-contigo-slate">Amina Okafor — DELTA Teacher, Grade 5B</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-contigo-peach py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-contigo-orange flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-nunito font-bold text-contigo-navy">Contigo</p>
                <p className="text-xs text-contigo-slate">With you, every step.</p>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-contigo-slate">
              <Link href="/" className="hover:text-contigo-orange transition-colors">Home</Link>
              <Link href="/login" className="hover:text-contigo-orange transition-colors">Sign In</Link>
              <Link href="/student/dashboard" className="hover:text-contigo-orange transition-colors">Student</Link>
              <Link href="/teacher/dashboard" className="hover:text-contigo-orange transition-colors">Teacher</Link>
              <Link href="/admin/dashboard" className="hover:text-contigo-orange transition-colors">Admin</Link>
            </div>
            <p className="text-xs text-contigo-slate">© 2026 Contigo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
