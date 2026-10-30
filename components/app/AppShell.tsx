'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Menu, MessageSquareText } from 'lucide-react';
import Logo from '@/components/Logo';
import TigoChat from '@/components/TigoChat';
import { Dialog } from '@/components/ui';
import { cx } from '@/components/ui/cx';
import { useAuth, type AuthRole } from '@/lib/context/AuthContext';

interface NavItem {
  href: string;
  label: string;
}

interface NavGroup {
  heading?: string;
  items: NavItem[];
}

const NAV: Record<AuthRole, NavGroup[]> = {
  student: [{ items: [{ href: '/student/dashboard', label: 'My progress' }] }],
  teacher: [
    {
      items: [
        { href: '/teacher/dashboard', label: 'Class overview' },
        { href: '/teacher/classroom', label: 'Classroom' },
      ],
    },
  ],
  admin: [
    { items: [{ href: '/admin/dashboard', label: 'School overview' }] },
    {
      heading: 'View as',
      items: [
        { href: '/teacher/dashboard', label: 'Teacher, Grade 5B' },
        { href: '/teacher/classroom', label: 'Classroom, Room 12' },
        { href: '/student/dashboard', label: 'Student, Sara Ahmed' },
      ],
    },
  ],
};

const CONTEXT: Record<AuthRole, { title: string; detail: string }> = {
  student: { title: 'Sara Ahmed', detail: 'Grade 5B · English' },
  teacher: { title: 'Grade 5B', detail: 'English · Room 12' },
  admin: { title: 'Whole school', detail: 'Term 2' },
};

const ROLE_LABEL: Record<AuthRole, string> = { student: 'Student', teacher: 'Teacher', admin: 'School leader' };

function roleFromPath(pathname: string): AuthRole {
  if (pathname.startsWith('/admin')) return 'admin';
  if (pathname.startsWith('/teacher')) return 'teacher';
  return 'student';
}

function NavList({ role, pathname, onNavigate }: { role: AuthRole; pathname: string; onNavigate?: () => void }) {
  return (
    <nav aria-label="Main" className="space-y-6">
      {NAV[role].map((group, gi) => (
        <div key={gi}>
          {group.heading && <p className="label mb-2 px-2.5">{group.heading}</p>}
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      'relative flex h-9 items-center rounded px-2.5 text-sm transition-colors',
                      active ? 'bg-paper-raised font-medium text-ink shadow-hairline ring-1 ring-line' : 'text-ink-600 hover:bg-paper-sunken hover:text-ink'
                    )}
                  >
                    {active && <span aria-hidden="true" className="absolute -left-3 top-2 bottom-2 w-0.5 rounded-full bg-ember-600" />}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/** Application frame for signed-in views: rail navigation on desktop, drawer on small screens. */
export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? '/';
  const router = useRouter();
  const { user, logout } = useAuth();
  const role: AuthRole = user?.role ?? roleFromPath(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tigoOpen, setTigoOpen] = useState(false);
  const ctx = CONTEXT[role];

  const signOut = () => {
    logout();
    router.push('/login');
  };

  const account = (
    <div className="space-y-3">
      <div className="min-w-0">
        <p className="truncate text-[13px] font-medium text-ink">{user?.email ?? 'Demo account'}</p>
        <p className="text-xs text-ink-500">{ROLE_LABEL[role]}</p>
      </div>
      <button
        type="button"
        onClick={signOut}
        className="inline-flex h-8 items-center gap-2 rounded px-2 -ml-2 text-[13px] text-ink-600 transition-colors hover:bg-paper-sunken hover:text-ink"
      >
        <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
        Sign out
      </button>
    </div>
  );

  const tigoButton = (
    <button
      type="button"
      onClick={() => {
        setMenuOpen(false);
        setTigoOpen(true);
      }}
      className="flex h-9 w-full items-center gap-2 rounded border border-line-strong bg-paper-raised px-2.5 text-sm text-ink-700 transition-colors hover:border-ink-500 hover:text-ink"
    >
      <MessageSquareText className="h-4 w-4 text-ember-700" aria-hidden="true" />
      Ask Tigo
      <span className="ml-auto label">Preview</span>
    </button>
  );

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-line bg-paper px-5 py-6 lg:flex">
        <Logo size="sm" />
        <div className="mt-8 border-y border-line py-4">
          <p className="label">Workspace</p>
          <p className="mt-1 text-sm font-medium text-ink">{ctx.title}</p>
          <p className="text-xs text-ink-500">{ctx.detail}</p>
        </div>
        <div className="mt-6 flex-1">
          <NavList role={role} pathname={pathname} />
        </div>
        <div className="space-y-6">
          {tigoButton}
          <div className="border-t border-line pt-4">{account}</div>
        </div>
      </aside>

      {/* Mobile and tablet bar */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-paper/95 px-4 backdrop-blur-sm lg:hidden">
        <Logo size="sm" />
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTigoOpen(true)}
            className="inline-flex h-9 items-center gap-1.5 rounded px-2.5 text-[13px] text-ink-700 hover:bg-paper-sunken"
          >
            <MessageSquareText className="h-4 w-4 text-ember-700" aria-hidden="true" />
            Tigo
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded text-ink hover:bg-paper-sunken"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Dialog open={menuOpen} onClose={() => setMenuOpen(false)} title={ctx.title} description={ctx.detail} placement="left">
        <div className="flex h-full flex-col justify-between gap-8 px-5 py-5">
          <NavList role={role} pathname={pathname} onNavigate={() => setMenuOpen(false)} />
          <div className="space-y-6">
            {tigoButton}
            <div className="border-t border-line pt-4">{account}</div>
          </div>
        </div>
      </Dialog>

      <main id="main" className="min-w-0">
        <div className="mx-auto w-full max-w-page px-4 pb-16 pt-6 sm:px-6 md:pt-8 lg:px-10 lg:pt-10">{children}</div>
      </main>

      <TigoChat open={tigoOpen} onClose={() => setTigoOpen(false)} role={role} />
    </div>
  );
}
