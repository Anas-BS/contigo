'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-contigo-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-nunito font-bold text-contigo-orange">
              Contigo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-contigo-navy hover:text-contigo-orange transition-colors">
              Home
            </Link>
            <Link href="/student/dashboard" className="text-contigo-navy hover:text-contigo-orange transition-colors">
              Student
            </Link>
            <Link href="/teacher/dashboard" className="text-contigo-navy hover:text-contigo-orange transition-colors">
              Teacher
            </Link>
            <Link href="/teacher/classroom" className="text-contigo-navy hover:text-contigo-orange transition-colors">
              Classroom
            </Link>
            <Link href="/admin/dashboard" className="text-contigo-navy hover:text-contigo-orange transition-colors">
              Admin
            </Link>
          </div>

          {/* User Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <div className="w-10 h-10 bg-contigo-orange rounded-full flex items-center justify-center text-white font-semibold hover:bg-contigo-coral transition-colors cursor-pointer">
                <User size={20} />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-contigo-navy hover:text-contigo-orange"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-contigo-white border-t border-contigo-peach">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-contigo-navy hover:text-contigo-orange hover:bg-contigo-peach rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/student/dashboard"
              className="block px-3 py-2 text-contigo-navy hover:text-contigo-orange hover:bg-contigo-peach rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Student
            </Link>
            <Link
              href="/teacher/dashboard"
              className="block px-3 py-2 text-contigo-navy hover:text-contigo-orange hover:bg-contigo-peach rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Teacher
            </Link>
            <Link
              href="/teacher/classroom"
              className="block px-3 py-2 text-contigo-navy hover:text-contigo-orange hover:bg-contigo-peach rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Classroom
            </Link>
            <Link
              href="/admin/dashboard"
              className="block px-3 py-2 text-contigo-navy hover:text-contigo-orange hover:bg-contigo-peach rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 text-contigo-navy hover:text-contigo-orange hover:bg-contigo-peach rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
