'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { Button, Input } from '@/components/ui';
import { cx } from '@/components/ui/cx';
import { ROLES } from '@/lib/constants';
import { useAuth, type AuthRole } from '@/lib/context/AuthContext';

type Errors = Partial<Record<'role' | 'email' | 'password', string>>;

/** Admin may open any area; other roles only their own. */
function allowedNext(role: AuthRole): string | null {
  if (typeof window === 'undefined') return null;
  const next = new URLSearchParams(window.location.search).get('next');
  if (!next || !next.startsWith('/') || next.startsWith('//')) return null;
  if (role === 'admin') return /^\/(student|teacher|admin)(\/|$)/.test(next) ? next : null;
  return next.startsWith(`/${role}`) ? next : null;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [role, setRole] = useState<AuthRole | ''>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!role) e.role = 'Please choose a role to continue.';
    if (!email.trim()) e.email = 'Email is required.';
    if (!password.trim()) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const first = (['role', 'email', 'password'] as const).find((k) => found[k]);
      document.getElementById(first === 'role' ? 'role-student' : `login-${first}`)?.focus();
      return;
    }
    setLoading(true);
    const r = role as AuthRole;
    const target = allowedNext(r) ?? ROLES.find((x) => x.id === r)?.path ?? '/';
    setTimeout(() => {
      login(r, email.trim());
      router.push(target);
    }, 500);
  };

  const fillDemo = () => {
    const r = role || 'teacher';
    setRole(r);
    setEmail(`${r}@demo.contigo.school`);
    setPassword('demo');
    setErrors({});
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="mx-auto flex w-full max-w-page items-center justify-between px-5 py-5 md:px-8">
        <Logo href="/" />
        <Link href="/" className="link text-sm">Back to site</Link>
      </header>

      <main id="main" className="flex flex-1 items-start justify-center px-5 pb-16 pt-6 md:items-center md:pt-0">
        <div className="w-full max-w-[26rem]">
          <p className="label">Demo workspace</p>
          <h1 className="mt-2 font-display text-[2.25rem] leading-[2.6rem] text-ink">Sign in to Contigo</h1>
          <p className="mt-2 text-[15px] leading-6 text-ink-600">Choose the view you want to explore. Any email and password will work.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
            <fieldset aria-describedby={errors.role ? 'role-error' : undefined}>
              <legend className="mb-2 text-[13px] font-medium text-ink-700">I am signing in as</legend>
              <div className="divide-y divide-line overflow-hidden rounded-md border border-line-strong bg-paper-raised">
                {ROLES.map((r) => {
                  const checked = role === r.id;
                  return (
                    <label
                      key={r.id}
                      htmlFor={`role-${r.id}`}
                      className={cx('flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors duration-150', checked ? 'bg-ember-50' : 'hover:bg-paper')}
                    >
                      <input
                        id={`role-${r.id}`}
                        type="radio"
                        name="role"
                        value={r.id}
                        checked={checked}
                        onChange={() => { setRole(r.id); setErrors((e) => ({ ...e, role: undefined })); }}
                        className="h-4 w-4 accent-ink"
                      />
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-ink">{r.label}</span>
                        <span className="block text-[13px] text-ink-500">{r.description}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.role && <p id="role-error" className="mt-1.5 text-[13px] text-critical">{errors.role}</p>}
            </fieldset>

            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-[13px] font-medium text-ink-700">Email</label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <p id="email-error" className="text-[13px] text-critical">{errors.email}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <label htmlFor="login-password" className="text-[13px] font-medium text-ink-700">Password</label>
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="link text-[13px]" aria-controls="login-password" aria-pressed={showPassword}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                aria-invalid={Boolean(errors.password)}
              />
              {errors.password && <p id="password-error" className="text-[13px] text-critical">{errors.password}</p>}
            </div>

            <div className="space-y-3">
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {loading ? 'Signing in' : 'Sign in'}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={fillDemo} disabled={loading}>
                Fill demo details
              </Button>
            </div>
          </form>

          <p className="mt-8 border-t border-line pt-4 text-[13px] leading-5 text-ink-500">
            This is a demonstration. Sign-in is simulated in your browser, nothing is sent to a server, and every student shown is fictional.
          </p>
        </div>
      </main>
    </div>
  );
}
