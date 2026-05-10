'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsChart from '@/components/charts/SkillsChart';
import MoodChart from '@/components/charts/MoodChart';
import TigoChat from '@/components/TigoChat';
import Logo from '@/components/Logo';
import { TrendingUp, Zap, Award, Flame, Plus, Target, Smile } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const cardHoverVariants = {
  scale: 1.02,
  boxShadow: '0px 20px 40px rgba(249, 123, 79, 0.15)',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10,
  },
};

export default function StudentDashboard() {
  const [moodToday, setMoodToday] = useState(7);
  const [moodHistory, setMoodHistory] = useState([
    { date: 'Mon', mood: 7 },
    { date: 'Tue', mood: 6 },
    { date: 'Wed', mood: 8 },
    { date: 'Thu', mood: 5 },
    { date: 'Fri', mood: 9 },
    { date: 'Sat', mood: 7 },
    { date: 'Sun', mood: 8 },
  ]);
  const [moodLogged, setMoodLogged] = useState(false);
  const [goal, setGoal] = useState('Reach B2 speaking level by July');
  const [goalDraft, setGoalDraft] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [logEntry, setLogEntry] = useState('');
  const [activity, setActivity] = useState([
    { id: 1, title: 'Completed Speaking Practice', time: '2 hours ago', icon: '🎤' },
    { id: 2, title: 'Improved Listening Score', time: '5 hours ago', icon: '👂' },
    { id: 3, title: 'Vocabulary Quiz: 92%', time: 'Yesterday', icon: '📚' },
    { id: 4, title: 'Attended Live Class', time: '2 days ago', icon: '👥' },
  ]);

  const logMood = () => {
    setMoodHistory((prev) => {
      const next = [...prev];
      next[next.length - 1] = { date: 'Today', mood: moodToday };
      return next;
    });
    setMoodLogged(true);
    setTimeout(() => setMoodLogged(false), 2000);
  };

  const addLogEntry = () => {
    const text = logEntry.trim();
    if (!text) return;
    setActivity((prev) => [
      { id: Date.now(), title: text, time: 'Just now', icon: '✏️' },
      ...prev,
    ]);
    setLogEntry('');
  };

  const saveGoal = () => {
    const value = goalDraft.trim();
    if (value) setGoal(value);
    setEditingGoal(false);
    setGoalDraft('');
  };

  const moodEmoji = moodToday >= 8 ? '😄' : moodToday >= 6 ? '🙂' : moodToday >= 4 ? '😐' : '😟';

  const KPI_CARDS = [
    {
      label: 'Overall Grade',
      value: '87%',
      icon: Award,
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-400/30',
      trend: '+5%',
      trendUp: true,
    },
    {
      label: 'Mood Score',
      value: '8.2/10',
      icon: Zap,
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-400/30',
      trend: '+0.5',
      trendUp: true,
    },
    {
      label: 'Speaking Level',
      value: 'B1+',
      icon: TrendingUp,
      color: 'from-orange-500/20 to-orange-600/20',
      borderColor: 'border-orange-400/30',
      trend: '+1 level',
      trendUp: true,
    },
    {
      label: 'Current Streak',
      value: '12 Days',
      icon: Flame,
      color: 'from-red-500/20 to-red-600/20',
      borderColor: 'border-red-400/30',
      trend: 'Keep it up!',
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 100, -100, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, -100, 100, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          className="backdrop-blur-md bg-white/5 border-b border-white/10 sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo size={44} />
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white/70 text-sm">Welcome, Sarah</span>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                SA
              </div>
            </motion.div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Header */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              My Journey
            </h1>
            <p className="text-white/60 text-lg">
              Track your progress and celebrate your wins.
            </p>
          </motion.div>

          {/* KPI Cards Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {KPI_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={index}
                  className={`backdrop-blur-md bg-gradient-to-br ${card.color} border ${card.borderColor} rounded-2xl p-6 hover:border-white/30 transition-all cursor-pointer group`}
                  variants={itemVariants}
                  whileHover={cardHoverVariants}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon className="w-6 h-6 text-orange-400" />
                    </motion.div>
                    <motion.span
                      className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {card.trend}
                    </motion.span>
                  </div>

                  <p className="text-white/70 text-sm mb-2">{card.label}</p>
                  <p className="text-3xl font-bold text-white">{card.value}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Skills Chart */}
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
              variants={itemVariants}
              whileHover={cardHoverVariants}
            >
              <h2 className="text-xl font-bold text-white mb-6">Your Skills Profile</h2>
              <div className="h-64 flex items-center justify-center">
                <SkillsChart />
              </div>
            </motion.div>

            {/* Mood Chart */}
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
              variants={itemVariants}
              whileHover={cardHoverVariants}
            >
              <h2 className="text-xl font-bold text-white mb-6">Weekly Mood Trend</h2>
              <div className="h-64 flex items-center justify-center">
                <MoodChart data={moodHistory.map((m) => ({ date: m.date, mood: m.mood }))} />
              </div>
            </motion.div>
          </motion.div>

          {/* Interactive Inputs Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Mood Check-in */}
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
              variants={itemVariants}
              whileHover={cardHoverVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30">
                  <Smile className="w-5 h-5 text-purple-300" />
                </div>
                <h2 className="text-xl font-bold text-white">Daily Mood Check in</h2>
              </div>
              <p className="text-white/60 text-sm mb-6">How are you feeling today?</p>
              <div className="flex items-center justify-center mb-6">
                <motion.span
                  key={moodEmoji}
                  className="text-7xl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {moodEmoji}
                </motion.span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={moodToday}
                onChange={(e) => setMoodToday(Number(e.target.value))}
                aria-label="Mood score from 1 to 10"
                title="Mood score from 1 to 10"
                className="w-full accent-orange-400"
              />
              <div className="flex justify-between text-xs text-white/50 mt-2 mb-6">
                <span>Rough day</span>
                <span className="text-orange-300 font-semibold">{moodToday}/10</span>
                <span>Amazing</span>
              </div>
              <motion.button
                onClick={logMood}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-orange-500/30"
              >
                {moodLogged ? '✓ Logged' : 'Save Today\u2019s Mood'}
              </motion.button>
            </motion.div>

            {/* Goal & Daily Log */}
            <motion.div
              className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all space-y-6"
              variants={itemVariants}
              whileHover={cardHoverVariants}
            >
              {/* Goal */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-blue-500/20 border border-blue-400/30">
                    <Target className="w-5 h-5 text-blue-300" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Current Goal</h2>
                </div>
                {!editingGoal ? (
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-white/80 text-sm leading-relaxed flex-1">{goal}</p>
                    <button
                      onClick={() => {
                        setGoalDraft(goal);
                        setEditingGoal(true);
                      }}
                      className="text-xs text-orange-300 hover:text-orange-200 font-medium whitespace-nowrap"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={goalDraft}
                      onChange={(e) => setGoalDraft(e.target.value)}
                      placeholder="Write a clear, kind goal for yourself"
                      className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveGoal}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingGoal(false)}
                        className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Daily Log */}
              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-orange-500/20 border border-orange-400/30">
                    <Plus className="w-5 h-5 text-orange-300" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Log a Quick Win</h2>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={logEntry}
                    onChange={(e) => setLogEntry(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addLogEntry()}
                    placeholder="What did you practice today?"
                    className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400/50"
                  />
                  <motion.button
                    onClick={addLogEntry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 rounded-xl font-semibold"
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-white/30 transition-all"
            variants={itemVariants}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

            <div className="space-y-4">
              <AnimatePresence>
                {activity.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    layout
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl">{entry.icon}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{entry.title}</p>
                      <p className="text-white/50 text-sm">{entry.time}</p>
                    </div>
                    <motion.div
                      className="text-white/40 group-hover:text-orange-400 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tigo Insight Banner */}
          <motion.div
            className="backdrop-blur-md bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-400/30 rounded-2xl p-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
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
                  You are on an amazing streak. Your speaking confidence climbed 15% this month. Keep going with the daily speaking challenges to reach B2 level. 🎯
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tigo Chat */}
      <TigoChat />
    </div>
  );
}
