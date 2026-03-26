'use client';

import { useState } from 'react';
import Link from 'next/link';
import TigoChat from '@/components/TigoChat';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface Student {
  id: string;
  name: string;
  level: Level;
  grade: number;
  mood: number;
  attendance: number;
  trend: '↑' | '→' | '↓';
  notes: string;
}

interface ClassSession {
  id: string;
  date: string;
  topic: string;
  activity: string;
  attendance: number;
  notes: string;
}

const INITIAL_STUDENTS: Student[] = [
  { id: '1', name: 'Sara Ahmed', level: 'B2', grade: 82, mood: 8, attendance: 95, trend: '↑', notes: 'Strong speaker, needs writing support' },
  { id: '2', name: 'Omar Hassan', level: 'B1', grade: 75, mood: 7, attendance: 92, trend: '→', notes: '' },
  { id: '3', name: 'Lena Khalil', level: 'B1', grade: 68, mood: 6, attendance: 88, trend: '↓', notes: 'Struggling with grammar' },
  { id: '4', name: 'Ali Nasser', level: 'C1', grade: 91, mood: 9, attendance: 98, trend: '↑', notes: 'Top performer' },
  { id: '5', name: 'Fatima Zahra', level: 'A2', grade: 55, mood: 5, attendance: 85, trend: '↓', notes: 'Needs extra support — consider counselor referral' },
  { id: '6', name: 'Hassan Malik', level: 'B2', grade: 77, mood: 8, attendance: 96, trend: '↑', notes: '' },
];

const INITIAL_SESSIONS: ClassSession[] = [
  { id: '1', date: '2024-06-10', topic: 'Present Perfect Tense', activity: 'Group Discussion', attendance: 27, notes: 'Good engagement, speaking activity successful' },
  { id: '2', date: '2024-06-07', topic: 'Reading Comprehension', activity: 'Individual Work', attendance: 26, notes: 'Two students absent' },
  { id: '3', date: '2024-06-05', topic: 'Vocabulary: Technology', activity: 'Pair Work', attendance: 28, notes: 'Excellent session, all students participated' },
];

const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const EMPTY_STUDENT: Omit<Student, 'id'> = {
  name: '', level: 'B1', grade: 70, mood: 7, attendance: 90, trend: '→', notes: '',
};

const EMPTY_SESSION: Omit<ClassSession, 'id'> = {
  date: new Date().toISOString().slice(0, 10),
  topic: '', activity: '', attendance: 28, notes: '',
};

export default function ClassManagementPage() {
  const [tab, setTab] = useState<'students' | 'sessions'>('students');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [sessions, setSessions] = useState<ClassSession[]>(INITIAL_SESSIONS);

  // Student modal state
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [studentForm, setStudentForm] = useState<Omit<Student, 'id'>>(EMPTY_STUDENT);

  // Session modal state
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);
  const [sessionForm, setSessionForm] = useState<Omit<ClassSession, 'id'>>(EMPTY_SESSION);

  // Confirm delete
  const [confirmDelete, setConfirmDelete] = useState<{ type: 'student' | 'session'; id: string } | null>(null);

  // Search
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.level.toLowerCase().includes(search.toLowerCase())
  );

  // Student CRUD
  const openAddStudent = () => {
    setEditingStudent(null);
    setStudentForm(EMPTY_STUDENT);
    setShowStudentModal(true);
  };
  const openEditStudent = (s: Student) => {
    setEditingStudent(s);
    setStudentForm({ name: s.name, level: s.level, grade: s.grade, mood: s.mood, attendance: s.attendance, trend: s.trend, notes: s.notes });
    setShowStudentModal(true);
  };
  const saveStudent = () => {
    if (!studentForm.name.trim()) return;
    if (editingStudent) {
      setStudents((prev) => prev.map((s) => s.id === editingStudent.id ? { ...studentForm, id: editingStudent.id } : s));
    } else {
      setStudents((prev) => [...prev, { ...studentForm, id: Date.now().toString() }]);
    }
    setShowStudentModal(false);
  };
  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setConfirmDelete(null);
  };

  // Session CRUD
  const openAddSession = () => {
    setEditingSession(null);
    setSessionForm(EMPTY_SESSION);
    setShowSessionModal(true);
  };
  const openEditSession = (s: ClassSession) => {
    setEditingSession(s);
    setSessionForm({ date: s.date, topic: s.topic, activity: s.activity, attendance: s.attendance, notes: s.notes });
    setShowSessionModal(true);
  };
  const saveSession = () => {
    if (!sessionForm.topic.trim()) return;
    if (editingSession) {
      setSessions((prev) => prev.map((s) => s.id === editingSession.id ? { ...sessionForm, id: editingSession.id } : s));
    } else {
      setSessions((prev) => [{ ...sessionForm, id: Date.now().toString() }, ...prev]);
    }
    setShowSessionModal(false);
  };
  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    setConfirmDelete(null);
  };

  const classAvg = students.length ? Math.round(students.reduce((a, s) => a + s.grade, 0) / students.length) : 0;
  const avgMood = students.length ? (students.reduce((a, s) => a + s.mood, 0) / students.length).toFixed(1) : '0';
  const avgAttendance = students.length ? Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length) : 0;
  const atRisk = students.filter((s) => s.grade < 60).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-[#F97B4F] font-bold text-xl">Contigo 🌟</Link>
        <div className="flex items-center gap-4">
          <Link href="/teacher/dashboard" className="text-sm text-[#2E6FDF] hover:underline">← Teacher Dashboard</Link>
          <Link href="/teacher/classroom" className="text-sm text-[#2E6FDF] hover:underline">Classroom Map</Link>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">🧑‍🏫</div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Class Management 📚</h1>
            <p className="text-gray-500 text-sm mt-1">Grade 5B — English — Manage students, grades & sessions</p>
          </div>
          <button
            onClick={tab === 'students' ? openAddStudent : openAddSession}
            className="bg-[#F97B4F] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-orange-500 transition-colors flex items-center gap-2 shadow-sm"
          >
            <span className="text-lg">+</span>
            {tab === 'students' ? 'Add Student' : 'Add Session'}
          </button>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: students.length, color: '#2E6FDF', emoji: '👥' },
            { label: 'Class Average', value: `${classAvg}%`, color: '#F97B4F', emoji: '📊' },
            { label: 'Avg Mood', value: `${avgMood}/10`, color: '#3ECFAC', emoji: '😊' },
            { label: 'At-Risk', value: atRisk, color: '#EF4444', emoji: '⚠️' },
          ].map((kpi) => (
            <div key={kpi.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 font-medium">{kpi.label}</span>
                <span className="text-lg">{kpi.emoji}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['students', 'sessions'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                tab === t ? 'bg-[#F97B4F] text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300'
              }`}
            >
              {t === 'students' ? '👥 Students' : '📅 Class Sessions'}
            </button>
          ))}
        </div>

        {/* Students Tab */}
        {tab === 'students' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search students by name or level…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-sm border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-gray-500 font-semibold">Student</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Level</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Grade</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Mood</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Attendance</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Trend</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold">Notes</th>
                    <th className="px-4 py-3 text-gray-500 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800">{student.name}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">{student.level}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-semibold ${student.grade >= 80 ? 'text-green-600' : student.grade >= 65 ? 'text-amber-600' : student.grade >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
                          {student.grade}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <div className="w-16 bg-gray-100 rounded-full h-1.5">
                            <div className="bg-[#3ECFAC] h-1.5 rounded-full" style={{ width: `${student.mood * 10}%` }} />
                          </div>
                          <span className="text-gray-600 text-xs">{student.mood}/10</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{student.attendance}%</td>
                      <td className="px-4 py-3">
                        <span className={`text-lg font-bold ${student.trend === '↑' ? 'text-green-500' : student.trend === '↓' ? 'text-red-500' : 'text-gray-400'}`}>
                          {student.trend}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[150px] truncate">{student.notes || '—'}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditStudent(student)}
                            className="text-xs bg-blue-50 text-[#2E6FDF] border border-blue-100 px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmDelete({ type: 'student', id: student.id })}
                            className="text-xs bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-400">No students found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {tab === 'sessions' && (
          <div className="space-y-3">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-gray-800">{session.topic}</span>
                    <span className="text-xs bg-orange-50 text-[#F97B4F] border border-orange-200 px-2 py-0.5 rounded-full font-medium">{session.activity}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📅 {session.date}</span>
                    <span>✅ {session.attendance}/28 present</span>
                    {session.notes && <span className="text-gray-400 italic truncate max-w-xs">"{session.notes}"</span>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEditSession(session)}
                    className="text-xs bg-blue-50 text-[#2E6FDF] border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDelete({ type: 'session', id: session.id })}
                    className="text-xs bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {sessions.length === 0 && (
              <div className="bg-white rounded-xl p-10 text-center text-gray-400 border border-gray-100">
                No sessions recorded yet. Add your first session!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  placeholder="Student name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">CEFR Level</label>
                  <select
                    value={studentForm.level}
                    onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value as Level })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  >
                    {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Trend</label>
                  <select
                    value={studentForm.trend}
                    onChange={(e) => setStudentForm({ ...studentForm, trend: e.target.value as '↑' | '→' | '↓' })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  >
                    <option value="↑">↑ Improving</option>
                    <option value="→">→ Stable</option>
                    <option value="↓">↓ Declining</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Grade (%)</label>
                  <input
                    type="number"
                    min={0} max={100}
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Mood (1–10)</label>
                  <input
                    type="number"
                    min={1} max={10}
                    value={studentForm.mood}
                    onChange={(e) => setStudentForm({ ...studentForm, mood: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Attendance (%)</label>
                  <input
                    type="number"
                    min={0} max={100}
                    value={studentForm.attendance}
                    onChange={(e) => setStudentForm({ ...studentForm, attendance: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Notes</label>
                <textarea
                  value={studentForm.notes}
                  onChange={(e) => setStudentForm({ ...studentForm, notes: e.target.value })}
                  placeholder="Optional notes about this student…"
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveStudent}
                disabled={!studentForm.name.trim()}
                className="px-5 py-2 text-sm bg-[#F97B4F] text-white rounded-xl font-semibold hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingStudent ? 'Save Changes' : 'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900">{editingSession ? 'Edit Session' : 'Add Class Session'}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Date</label>
                  <input
                    type="date"
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Attendance</label>
                  <input
                    type="number"
                    min={0}
                    value={sessionForm.attendance}
                    onChange={(e) => setSessionForm({ ...sessionForm, attendance: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Topic / Lesson *</label>
                <input
                  type="text"
                  value={sessionForm.topic}
                  onChange={(e) => setSessionForm({ ...sessionForm, topic: e.target.value })}
                  placeholder="e.g. Present Perfect Tense"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Activity Type</label>
                <input
                  type="text"
                  value={sessionForm.activity}
                  onChange={(e) => setSessionForm({ ...sessionForm, activity: e.target.value })}
                  placeholder="e.g. Group Discussion, Pair Work, Quiz"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Session Notes</label>
                <textarea
                  value={sessionForm.notes}
                  onChange={(e) => setSessionForm({ ...sessionForm, notes: e.target.value })}
                  placeholder="How did the session go?"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F97B4F] resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSessionModal(false)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveSession}
                disabled={!sessionForm.topic.trim()}
                className="px-5 py-2 text-sm bg-[#F97B4F] text-white rounded-xl font-semibold hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingSession ? 'Save Changes' : 'Add Session'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4 text-center">
            <div className="text-4xl">🗑️</div>
            <h2 className="text-lg font-bold text-gray-900">Confirm Delete</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this {confirmDelete.type}? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-5 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete.type === 'student' ? deleteStudent(confirmDelete.id) : deleteSession(confirmDelete.id)}
                className="px-5 py-2 text-sm bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <TigoChat role="teacher" />
    </div>
  );
}
