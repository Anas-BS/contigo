'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PerformanceBarChart from '@/components/charts/PerformanceBarChart';
import TigoChat from '@/components/TigoChat';
import Logo from '@/components/Logo';
import { Search, UserPlus, MessageSquare, X, BookOpen, Users, AlertTriangle, Smile, CheckCircle2 } from 'lucide-react';

type Student = {
  id: number;
  name: string;
  grade: number;
  mood: number;
  trend: 'up' | 'down' | 'stable';
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  notes: string[];
};

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Sara Ahmed', grade: 82, mood: 8, trend: 'up', level: 'B2', notes: [] },
  { id: 2, name: 'Omar Hassan', grade: 75, mood: 7, trend: 'stable', level: 'B1', notes: [] },
  { id: 3, name: 'Lena Khalil', grade: 68, mood: 6, trend: 'down', level: 'B1', notes: [] },
  { id: 4, name: 'Ali Nasser', grade: 91, mood: 9, trend: 'up', level: 'C1', notes: [] },
  { id: 5, name: 'Fatima Zahra', grade: 55, mood: 5, trend: 'down', level: 'A2', notes: [] },
  { id: 6, name: 'Hassan Malik', grade: 77, mood: 8, trend: 'up', level: 'B2', notes: [] },
];

const trendIcon = { up: '↑', down: '↓', stable: '→' };
const trendColor = { up: 'text-green-400', down: 'text-red-400', stable: 'text-white/40' };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', level: 'B1' as Student['level'], grade: '70' });
  const [activeStudent, setActiveStudent] = useState<number | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const filtered = useMemo(
    () => students.filter((s) => s.name.toLowerCase().includes(search.toLowerCase())),
    [students, search]
  );

  const stats = useMemo(() => {
    const avg = students.reduce((s, x) => s + x.grade, 0) / Math.max(students.length, 1);
    const atRisk = students.filter((x) => x.grade < 60).length;
    const avgMood = students.reduce((s, x) => s + x.mood, 0) / Math.max(students.length, 1);
    return {
      total: students.length,
      classAvg: avg.toFixed(0),
      atRisk,
      avgMood: avgMood.toFixed(1),
    };
  }, [students]);

  const addStudent = () => {
    const name = newStudent.name.trim();
    const grade = parseInt(newStudent.grade, 10);
    if (!name || isNaN(grade)) return;
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name,
        grade: Math.min(100, Math.max(0, grade)),
        mood: 7,
        trend: 'stable',
        level: newStudent.level,
        notes: [],
      },
    ]);
    setNewStudent({ name: '', level: 'B1', grade: '70' });
    setShowAdd(false);
  };

  const addNote = () => {
    const text = noteDraft.trim();
    if (!text || activeStudent === null) return;
    setStudents((prev) =>
      prev.map((s) => (s.id === activeStudent ? { ...s, notes: [text, ...s.notes] } : s))
    );
    setNoteDraft('');
  };

  const active = students.find((s) => s.id === activeStudent) ?? null;

  const KPIS = [
    { label: 'Class Average', value: `${stats.classAvg}%`, icon: BookOpen, color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-400/30' },
    { label: 'Total Students', value: `${stats.total}`, icon: Users, color: 'from-purple-500/20 to-purple-600/20', border: 'border-purple-400/30' },
    { label: 'At Risk', value: `${stats.atRisk}`, icon: AlertTriangle, color: 'from-red-500/20 to-red-600/20', border: 'border-red-400/30' },
    { label: 'Average Mood', value: `${stats.avgMood}/10`, icon: Smile, color: 'from-orange-500/20 to-orange-600/20', border: 'border-orange-400/30' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, 50, -50, 0], y: [0, 100, -100, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{ x: [0, -60, 60, 0], y: [0, -80, 80, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">
        <motion.nav
          className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo size={44} />
            <div className="flex items-center gap-4">
              <Link href="/teacher/classroom" className="text-sm text-white/70 hover:text-orange-400 transition-colors">
                Classroom Map
              </Link>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                T
              </div>
            </div>
          </div>
        </motion.nav>

        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">Teacher Dashboard</h1>
            <p className="text-white/60 text-lg mt-2">Grade 5B, English. {stats.total} students under your wing.</p>
          </motion.div>

          {/* KPIs */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {KPIS.map((k) => {
              const Icon = k.icon;
              return (
                <motion.div
                  key={k.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.15)' }}
                  className={`backdrop-blur-md bg-gradient-to-br ${k.color} border ${k.border} rounded-2xl p-6 transition-all`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div className="p-3 rounded-xl bg-white/10" whileHover={{ rotate: 10, scale: 1.1 }}>
                      <Icon className="w-6 h-6 text-orange-400" />
                    </motion.div>
                  </div>
                  <p className="text-white/70 text-sm mb-2">{k.label}</p>
                  <p className="text-3xl font-bold text-white">{k.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Performance Chart */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Class Average, Monthly Trend</h2>
            <div className="bg-white/5 rounded-xl p-4">
              <PerformanceBarChart color="#F97B4F" />
            </div>
          </motion.div>

          {/* Toolbar */}
          <motion.div
            className="flex flex-col md:flex-row gap-3 items-stretch md:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students by name"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
              />
            </div>
            <motion.button
              onClick={() => setShowAdd((v) => !v)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30"
            >
              <UserPlus className="w-4 h-4" />
              Add Student
            </motion.button>
          </motion.div>

          {/* Add Student Form */}
          <AnimatePresence>
            {showAdd && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-2xl p-6 grid md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    placeholder="Full name"
                    className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
                  />
                  <select
                    value={newStudent.level}
                    onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value as Student['level'] })}
                    aria-label="CEFR level"
                    title="CEFR level"
                    className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
                  >
                    {(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const).map((l) => (
                      <option key={l} value={l} className="bg-slate-800">
                        Level {l}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={newStudent.grade}
                    onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
                    placeholder="Grade %"
                    className="bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
                  />
                  <button
                    onClick={addStudent}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
                  >
                    Save Student
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Student Table */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Student Overview</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-3 text-white/60 font-medium">Student</th>
                    <th className="pb-3 text-white/60 font-medium">Level</th>
                    <th className="pb-3 text-white/60 font-medium">Grade</th>
                    <th className="pb-3 text-white/60 font-medium">Mood</th>
                    <th className="pb-3 text-white/60 font-medium">Trend</th>
                    <th className="pb-3 text-white/60 font-medium text-right">Note</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((s) => (
                      <motion.tr
                        key={s.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 font-medium text-white">{s.name}</td>
                        <td className="py-3">
                          <span className="bg-blue-500/20 border border-blue-400/30 text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {s.level}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`font-semibold ${
                              s.grade >= 80 ? 'text-green-400' : s.grade >= 65 ? 'text-amber-300' : 'text-red-400'
                            }`}
                          >
                            {s.grade}%
                          </span>
                        </td>
                        <td className="py-3 text-white/80">{s.mood}/10</td>
                        <td className={`py-3 text-lg ${trendColor[s.trend]}`}>{trendIcon[s.trend]}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setActiveStudent(s.id);
                              setNoteDraft('');
                            }}
                            className="inline-flex items-center gap-1 text-xs text-orange-300 hover:text-orange-200 font-semibold"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            {s.notes.length > 0 ? `${s.notes.length} note${s.notes.length > 1 ? 's' : ''}` : 'Add note'}
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filtered.length === 0 && (
                <p className="text-center text-white/40 text-sm py-6">No students match that search.</p>
              )}
            </div>
          </motion.div>

          {/* Tigo Insight */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-4">
              <motion.span
                className="text-3xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🤖
              </motion.span>
              <div className="flex-1">
                <p className="font-semibold text-white text-lg mb-2">Tigo Insight</p>
                <p className="text-white/80">
                  {stats.atRisk > 0
                    ? `${stats.atRisk} student${stats.atRisk > 1 ? 's are' : ' is'} below 60%. A short one to one check in this week could lift their confidence and grade.`
                    : 'No one is in the danger zone right now. Consider stretching your top performers with a creative speaking task.'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Note Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStudent(null)}
          >
            <motion.div
              className="bg-slate-900 border border-white/20 rounded-2xl p-6 w-full max-w-md space-y-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wide">Notes for</p>
                  <h3 className="text-xl font-bold text-white">{active.name}</h3>
                </div>
                <button
                  onClick={() => setActiveStudent(null)}
                  aria-label="Close notes"
                  title="Close"
                  className="text-white/50 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNote()}
                  placeholder="Write a private note about this student"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
                />
                <button
                  onClick={addNote}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-xl text-sm font-semibold transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {active.notes.length === 0 ? (
                  <p className="text-white/50 text-sm italic">No notes yet. Start with one observation.</p>
                ) : (
                  active.notes.map((n, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{n}</span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TigoChat />
    </div>
  );
}
