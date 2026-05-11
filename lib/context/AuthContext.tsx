'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type AuthRole = 'student' | 'teacher' | 'admin';

const STORAGE_KEY = 'contigo_user';
const COOKIE_NAME = 'contigo_role';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthUser {
  role: AuthRole;
  email?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (role: AuthRole, email?: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function writeCookie(role: AuthRole) {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=${role}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

function clearCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        if (parsed && parsed.role) {
          setUser(parsed);
          writeCookie(parsed.role);
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const login = useCallback((role: AuthRole, email?: string) => {
    const next: AuthUser = { role, email };
    setUser(next);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
    writeCookie(role);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
    clearCookie();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, logout, isAuthenticated: user !== null }),
    [user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
