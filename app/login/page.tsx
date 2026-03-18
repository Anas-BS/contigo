'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLES = [
  { id: 'student', label: 'Student', emoji: '🎓', path: '/student/dashboard' },
  { id: 'teacher', label: 'Teacher', emoji: '🧑‍🏫', path: '/teacher/dashboard' },
  { id: 'admin', label: 'Admin', emoji: '🏛️', path: '/admin/dashboard' },
];

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
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-blue-50 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-[#F97B4F]">Contigo 🌟</h1>
          <p className="text-gray-500 text-sm italic">&ldquo;With you, every step.&rdquo;</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 text-center">Sign In</h2>

        {/* Role Selector */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Select your role:</p>
          <div className="grid grid-cols-3 gap-3">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  selectedRole === role.id
                    ? 'border-[#F97B4F] bg-orange-50 text-[#F97B4F]'
                    : 'border-gray-200 text-gray-600 hover:border-orange-200'
                }`}
              >
                <span className="text-2xl">{role.emoji}</span>
                <span className="text-xs font-medium mt-1">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Email & Password Fields */}
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97B4F]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#F97B4F]"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={!selectedRole || loading}
          className="w-full bg-[#F97B4F] text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Signing in…' : 'Sign In →'}
        </button>

        <p className="text-center text-xs text-gray-400">
          Demo — select any role to explore the platform
        </p>
      </div>
    </main>
  );
}
