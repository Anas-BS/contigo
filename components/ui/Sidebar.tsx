'use client'

import Link from 'next/link'
import { Home, BarChart3, Users, Settings, BookOpen, ClipboardList, LayoutDashboard, School } from 'lucide-react'

interface SidebarProps {
  role: 'student' | 'teacher' | 'admin'
}

export default function Sidebar({ role }: SidebarProps) {
  const studentLinks = [
    { href: '/student/dashboard', label: 'Dashboard', icon: Home },
    { href: '/student/progress', label: 'My Progress', icon: BarChart3 },
    { href: '/student/checkin', label: 'Check-In', icon: ClipboardList },
    { href: '/student/resources', label: 'Resources', icon: BookOpen },
  ]

  const teacherLinks = [
    { href: '/teacher/dashboard', label: 'Dashboard', icon: Home },
    { href: '/teacher/classroom', label: 'Classroom', icon: School },
    { href: '/teacher/students', label: 'Students', icon: Users },
    { href: '/teacher/lessons', label: 'Lessons', icon: BookOpen },
  ]

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/teachers', label: 'Teachers', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  const links = role === 'student' ? studentLinks : role === 'teacher' ? teacherLinks : adminLinks

  return (
    <aside className="w-64 bg-contigo-white border-r border-contigo-peach h-screen sticky top-16">
      <div className="p-6">
        <h2 className="text-sm font-semibold text-contigo-slate uppercase tracking-wide mb-4">
          {role === 'student' ? 'Student Portal' : role === 'teacher' ? 'Teacher Portal' : 'Admin Portal'}
        </h2>
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-contigo-navy hover:bg-contigo-peach hover:text-contigo-orange transition-all group"
              >
                <Icon size={20} className="group-hover:text-contigo-orange" />
                <span className="font-medium">{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
