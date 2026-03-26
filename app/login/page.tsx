'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ROLES = [
  { id: 'student', label: 'STUDENT', path: '/student/dashboard' },
  { id: 'teacher', label: 'TEACHER', path: '/teacher/dashboard' },
  { id: 'admin', label: 'ADMIN', path: '/admin/dashboard' },
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
    <main className="min-h-screen flex items-center justify-center px-6 relative"
      style={{ background: 'linear-gradient(160deg, #080B10 60%, #0D1520 100%)' }}>

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(58,130,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(58,130,196,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(to right, var(--arc-orange), transparent 60%)' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Panel */}
        <div className="arc-panel p-8 space-y-6">

          {/* Header */}
          <div className="space-y-1">
            <div className="arc-label mb-3">// AUTHENTICATION REQUIRED</div>
            <h1 className="text-4xl font-bold tracking-widest uppercase text-glow-orange"
              style={{ color: 'var(--arc-orange)', fontFamily: 'Barlow Condensed, monospace' }}>
              CONTIGO
            </h1>
            <div className="arc-divider w-32 mt-2" />
            <p className="arc-label mt-2">ELT Intelligence Platform</p>
          </div>

          {/* Role Selector */}
          <div className="space-y-2">
            <p className="arc-label">Select Role</p>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className="py-3 text-xs font-bold tracking-widest uppercase transition-all border"
                  style={{
                    fontFamily: 'Barlow Condensed, monospace',
                    borderColor: selectedRole === role.id ? 'var(--arc-orange)' : 'var(--arc-border)',
                    background: selectedRole === role.id ? 'rgba(232,99,42,0.12)' : 'var(--arc-surface)',
                    color: selectedRole === role.id ? 'var(--arc-orange)' : 'var(--arc-muted)',
                    clipPath: 'polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)',
                    boxShadow: selectedRole === role.id ? '0 0 10px rgba(232,99,42,0.3)' : 'none',
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full px-4 py-2.5 text-sm tracking-wider uppercase focus:outline-none"
              style={{
                background: 'var(--arc-surface)',
                border: '1px solid var(--arc-border)',
                color: 'var(--arc-text)',
                fontFamily: 'Share Tech Mono, monospace',
                letterSpacing: '0.05em',
              }}
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full px-4 py-2.5 text-sm tracking-wider uppercase focus:outline-none"
              style={{
                background: 'var(--arc-surface)',
                border: '1px solid var(--arc-border)',
                color: 'var(--arc-text)',
                fontFamily: 'Share Tech Mono, monospace',
                letterSpacing: '0.05em',
              }}
            />
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedRole || loading}
            className="w-full py-3 font-bold text-sm tracking-widest uppercase transition-all"
            style={{
              fontFamily: 'Barlow Condensed, monospace',
              background: selectedRole && !loading ? 'var(--arc-orange)' : 'transparent',
              border: '1px solid var(--arc-orange)',
              color: selectedRole && !loading ? '#fff' : 'var(--arc-muted)',
              clipPath: 'polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)',
              opacity: (!selectedRole || loading) ? 0.5 : 1,
              cursor: (!selectedRole || loading) ? 'not-allowed' : 'pointer',
              boxShadow: (selectedRole && !loading) ? '0 0 14px rgba(232,99,42,0.4)' : 'none',
            }}
          >
            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
          </button>

          <p className="arc-label text-center">Demo — select any role to explore</p>
        </div>
      </div>
    </main>
  );
}
