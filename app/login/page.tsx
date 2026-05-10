'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Logo from '@/components/Logo';

const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓', path: '/student/dashboard' },
  { id: 'teacher', label: 'Teacher', emoji: '🧑‍🏫', path: '/teacher/dashboard' },
  { id: 'admin', label: 'Admin', emoji: '🏛️', path: '/admin/dashboard' },
];

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const role = ROLES.find((r) => r.id === selectedRole);
    if (!role) return;
    setLoading(true);
    setTimeout(() => router.push(role.path), 600);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-6 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-25"
          animate={{ x: [0, 60, -60, 0], y: [0, 80, -80, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -60, 60, 0], y: [0, -80, 80, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-3 flex flex-col items-center">
            <Logo href="" size={160} />
            <p className="text-white/60 text-sm italic">&ldquo;With you, every step.&rdquo;</p>
          </div>

          <h2 className="text-xl font-semibold text-white text-center">Sign in to continue</h2>

          {/* Role Selector */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-white/70">Choose your role</p>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map((role) => (
                <motion.button
                  key={role.id}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center p-4 rounded-2xl border transition-all backdrop-blur-md ${
                    selectedRole === role.id
                      ? 'border-orange-400 bg-orange-500/20 text-orange-200 shadow-lg shadow-orange-500/30'
                      : 'border-white/20 bg-white/5 text-white/70 hover:border-white/40'
                  }`}
                >
                  <span className="text-2xl">{role.emoji}</span>
                  <span className="text-xs font-medium mt-2">{role.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Email & Password */}
          <div className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50 transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50 transition-colors"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: selectedRole ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={!selectedRole || loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? 'Signing you in…' : 'Sign In'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </motion.button>

          <p className="text-center text-xs text-white/40">
            Demo mode. Pick any role to explore the platform.
          </p>

          <div className="text-center">
            <Link href="/" className="text-xs text-white/50 hover:text-orange-300 transition-colors">
              ← Back to landing
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
