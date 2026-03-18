"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Sign In" },
  { href: "/student/dashboard", label: "Student" },
  { href: "/teacher/dashboard", label: "Teacher" },
  { href: "/admin/dashboard", label: "Admin" },
];

export default function Navbar({ userName }: { userName?: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-contigo-peach sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-contigo-orange flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-nunito font-bold text-xl text-contigo-navy">
              Contigo
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-contigo-peach text-contigo-orange"
                    : "text-contigo-slate hover:text-contigo-navy hover:bg-contigo-peach/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {userName && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-contigo-orange flex items-center justify-center text-white text-sm font-bold">
                  {userName.charAt(0)}
                </div>
                <span className="text-sm text-contigo-navy font-medium">
                  {userName}
                </span>
              </div>
            )}
            <button
              className="md:hidden p-2 text-contigo-slate hover:text-contigo-navy"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-contigo-peach bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-contigo-peach text-contigo-orange"
                  : "text-contigo-slate hover:bg-contigo-peach/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
