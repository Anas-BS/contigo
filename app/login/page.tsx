'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓', path: '/student/dashboard', color: 'from-blue-500/30 to-blue-600/30', border: 'border-blue-400/40' },
  { id: 'teacher', label: 'Teacher', emoji: '🧑‍🏫', path: '/teacher/dashboard', color: 'from-teal-500/30 to-teal-600/30', border: 'border-teal-400/40' },
  { id: 'admin', label: 'Admin', emoji: '🏛️', path: '/admin/dashboard', color: 'from-purple-500/30 to-purple-600/30', border: 'border-purple-400/40' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const role = ROLES.find((r) => r.id === selectedRole);
    if (!role) return;
    setLoading(true);
    setTimeout(() => router.push(role.path), 600);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden px-6">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{ x: [0, 40, -40, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          animate={{ x: [0, -40, 40, 0], y: [0, -80, 80, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 60, -60, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/15 rounded-3xl p-8 shadow-2xl shadow-black/40 space-y-7">
          {/* Header */}
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-7 h-7 text-orange-400" />
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Contigo
              </span>
            </motion.div>
            <p className="text-white/50 text-sm italic">&ldquo;With you, every step.&rdquo;</p>
          </motion.div>

          <motion.h2 className="text-xl font-semibold text-white text-center" variants={itemVariants}>
            Welcome back
          </motion.h2>

          {/* Role Selector */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <p className="text-sm font-medium text-white/60">Select your role</p>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all backdrop-blur-md ${
                    selectedRole === role.id
                      ? `bg-gradient-to-br ${role.color} ${role.border} text-white`
                      : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="text-2xl mb-1"
                    animate={selectedRole === role.id ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {role.emoji}
                  </motion.span>
                  <span className="text-xs font-medium">{role.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Email & Password Fields */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-400/50 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-orange-400/50 focus:bg-white/10 transition-all"
              />
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleLogin}
              disabled={!selectedRole || loading}
              size="lg"
              className="w-full"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    Signing in…
                  </motion.span>
                ) : (
                  <motion.span
                    key="signin"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          <motion.p
            className="text-center text-xs text-white/30"
            variants={itemVariants}
          >
            Demo — select any role to explore the platform
          </motion.p>
        </div>
      </motion.div>
    </main>
  );
}
