# Contigo — With you, every step. 🌟

A **Holistic English Language Teaching (ELT) Student Performance Intelligence Platform** that transforms educational data into actionable insights for students, teachers, and administrators.

## 🎯 Overview

Contigo bridges the gap between traditional assessment metrics and the holistic factors that truly drive student success in language learning. By combining mood tracking, anxiety monitoring, skill assessments, and classroom dynamics, Contigo provides a 360° view of student performance.

## ✨ Key Features

### For Students 🎓
- **Personal Dashboard**: Track your CEFR progress with interactive radar charts and timelines
- **Daily Check-In**: Share your mood and confidence levels to get personalized support
- **CEFR Journey**: Visualize your language learning progression over time
- **Recent Assessments**: See your latest scores and achievements

### For Teachers 👩‍🏫
- **At-Risk Alerts**: Get notified when students need intervention
- **Lesson Logger**: Quick-log lessons with skills practiced, TL%, and engagement
- **Classroom Seating Map**: Interactive seating arrangements with performance heatmaps
- **AI Seating Suggestions**: Get data-driven recommendations for optimal seating
- **Tigo AI Assistant**: Ask questions about student performance and get instant insights

### For Admins 📊
- **School-Wide Analytics**: Monitor pass rates, CEFR levels, and at-risk percentages
- **Correlation Matrix**: Discover relationships between mood, performance, TL%, and class size
- **Teacher Performance**: Track teacher wellbeing, TL usage, and class averages
- **Time Slot Analysis**: Identify peak performance times for scheduling optimization
- **AI-Generated Insights**: Receive actionable recommendations based on data patterns

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit

## 🎨 Design System

```
PRIMARY:    #F97B4F (Contigo Orange)
ACCENT:     #F5C842 (Insight Amber)
SECONDARY:  #2E6FDF (Contigo Blue)
GROWTH:     #3ECFAC (Teal)
BACKGROUND: #FFF8F4 (Warm White)
TEXT:       #1E2A3A (Deep Navy)
MUTED:      #8A9BB0 (Soft Slate)
CARD BG:    #FDEEE6 (Soft Peach)
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/contigo.git
cd contigo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗂️ Project Structure

```
contigo/
├── app/
│   ├── layout.tsx              # Root layout with fonts
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── student/
│   │   └── dashboard/
│   │       └── page.tsx        # Student dashboard
│   ├── teacher/
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Teacher dashboard
│   │   └── classroom/
│   │       └── page.tsx        # Classroom seating map
│   └── admin/
│       └── dashboard/
│           └── page.tsx        # Admin analytics
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx          # Global navigation
│   │   ├── Sidebar.tsx         # Role-based sidebar
│   │   ├── KPICard.tsx         # Metric display card
│   │   ├── CEFRBadge.tsx       # CEFR level badge with progress
│   │   └── AlertCard.tsx       # At-risk student alert
│   ├── charts/
│   │   ├── SkillRadarChart.tsx        # 6-skill radar chart
│   │   ├── TimelineChart.tsx          # CEFR progress timeline
│   │   └── CorrelationMatrix.tsx      # Variable correlation heatmap
│   ├── classroom/
│   │   └── SeatingMap.tsx      # Interactive seating grid
│   ├── checkin/
│   │   └── MoodCheckIn.tsx     # Daily mood/confidence check-in
│   └── tigo/
│       └── TigoChat.tsx        # AI assistant chatbot
├── lib/
│   └── mockData.ts             # Sample data (students, teachers, etc.)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🔗 Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and role cards |
| `/login` | Authentication page with role selection |
| `/student/dashboard` | Student portal with skill radar, CEFR timeline, check-in |
| `/teacher/dashboard` | Teacher portal with alerts, lesson log, class overview |
| `/teacher/classroom` | Interactive seating map with heatmaps |
| `/admin/dashboard` | Admin analytics with KPIs, correlations, insights |

## 🤖 Meet Tigo

Tigo is your AI teaching assistant, available on every page via the floating chat button. Ask Tigo:
- "Which student needs the most support?"
- "What's the best time for speaking lessons?"
- "Show me Hassan's progress"

Tigo analyzes student data in real-time and provides actionable recommendations.

## 📊 Data Model

### Student
- Personal info (name, ID)
- CEFR level and progress
- Mood, anxiety, confidence scores
- Skill scores (speaking, listening, reading, writing, grammar, vocabulary)
- Attendance percentage
- At-risk status

### Teacher
- Qualification (CELTA, DELTA)
- Target Language (TL) usage %
- Wellbeing score
- Class average performance
- Years of experience

### Insights
- Correlation between mood and performance
- Time slot effectiveness
- TL% impact on grammar scores
- Class size effects

## 🎯 Key Concepts

### CEFR Levels
- **A1/A2**: Beginner
- **B1/B2**: Intermediate (most Contigo students)
- **C1/C2**: Advanced

### Holistic Metrics
- **Mood Score**: Daily emotional check-in (1-10)
- **Anxiety Level**: Speaking/learning anxiety (1-10)
- **Confidence**: Self-reported confidence in English (1-10)
- **TL%**: Percentage of lesson conducted in target language (English)

### At-Risk Indicators
- Low attendance (<80%)
- Low mood scores (<6/10)
- High anxiety (>7/10)
- Below-average skill scores

## 🛠️ Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 Development Notes

- All client components (using hooks/state) have `'use client'` directive
- Mock data is stored in `lib/mockData.ts`
- Responsive design: mobile-first with Tailwind breakpoints
- Charts are fully responsive with `ResponsiveContainer`
- Color system uses Tailwind's `contigo-*` custom colors

## 🌐 Environment Variables

No environment variables required for the demo. In production, you would add:
```
DATABASE_URL=
OPENAI_API_KEY=
NEXTAUTH_SECRET=
```

## 🤝 Contributing

This is a demo application showcasing a holistic ELT platform. For production use, consider:
- Real authentication (NextAuth.js)
- Database integration (Prisma + PostgreSQL)
- Real AI model integration (OpenAI GPT-4)
- Student data privacy compliance (GDPR, FERPA)
- Multi-language support (i18n)

## 📄 License

MIT License - Built with ❤️ for educators worldwide.

---

**Contigo** — Because every student deserves to be seen, understood, and supported. 🌟