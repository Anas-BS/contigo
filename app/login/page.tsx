'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓', path: '/student/dashboard', gradient: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-400/40' },
  { id: 'teacher', label: 'Teacher', emoji: '🧑‍🏫', path: '/teacher/dashboard', gradient: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-400/40' },
  { id: 'admin', label: 'Admin', emoji: '🏛️', path: '/admin/dashboard', gradient: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-400/40' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const role = ROLES.find((r) => r.id === selectedRole);
    if (!role) return;
    setLoading(true);
    setTimeout(() => router.push(role.path), 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-6 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 50, -30, 0], y: [0, -60, 60, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -40, 40, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-glass p-8 space-y-6"
          variants={itemVariants}
          whileHover={{ boxShadow: '0 20px 60px rgba(249,123,79,0.15)' }}
        >
          {/* Header */}
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 mb-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Sparkles className="w-6 h-6 text-orange-400" />
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Contigo
              </span>
            </motion.div>
            <p className="text-white/50 text-sm italic">&ldquo;With you, every step.&rdquo;</p>
          </motion.div>

          <motion.h2
            className="text-xl font-semibold text-white text-center"
            variants={itemVariants}
          >
            Welcome Back
          </motion.h2>

          {/* Role Selector */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <p className="text-sm font-medium text-white/60">Select your role:</p>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all bg-gradient-to-br ${
                    selectedRole === role.id
                      ? `${role.gradient} ${role.border} shadow-orange-glow-sm`
                      : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <span className="text-2xl">{role.emoji}</span>
                  <span className={`text-xs font-medium mt-1 ${selectedRole === role.id ? 'text-white' : 'text-white/60'}`}>
                    {role.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Input Fields */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-400/60 focus:bg-white/15 transition-all backdrop-blur-md"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-400/60 focus:bg-white/15 transition-all backdrop-blur-md"
              />
            </div>
          </motion.div>

          {/* Login Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              onClick={handleLogin}
              disabled={!selectedRole || loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: !selectedRole || loading ? 1 : 1.02 }}
              whileTap={{ scale: !selectedRole || loading ? 1 : 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Signing in…
                  </motion.span>
                ) : (
                  <motion.span
                    key="signin"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>

          <motion.p
            className="text-center text-xs text-white/30"
            variants={itemVariants}
          >
            Demo — select any role to explore the platform
          </motion.p>
        </motion.div>
      </motion.div>
    </main>
  );
}
