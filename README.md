# Contigo 🌟
### "With you, every step."

Contigo is a **Holistic English Language Teaching (ELT) Student Performance Intelligence Platform**. It tracks every variable around a student — grades, mood, seating, teacher wellbeing, timetable, classroom environment — and correlates them to understand what truly drives English language learning outcomes.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📁 Project Structure

```
contigo/
├── app/
│   ├── layout.tsx                  (Root layout with fonts + TigoChat)
│   ├── page.tsx                    (Landing page)
│   ├── login/page.tsx              (Login page)
│   ├── student/dashboard/page.tsx  (Student dashboard)
│   ├── teacher/dashboard/page.tsx  (Teacher dashboard)
│   ├── teacher/classroom/page.tsx  (Seating map)
│   └── admin/dashboard/page.tsx   (Admin dashboard)
├── components/
│   ├── ui/                         (Navbar, KPICard, CEFRBadge, AlertCard)
│   ├── charts/                     (SkillRadarChart, TimelineChart, CorrelationMatrix)
│   ├── classroom/                  (SeatingMap)
│   ├── checkin/                    (MoodCheckIn)
│   └── tigo/                       (TigoChat — floating AI assistant)
├── lib/
│   └── mockData.ts                 (All mock data)
└── tailwind.config.ts              (Contigo colour palette)
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| Tailwind CSS | Styling with custom warm orange theme |
| Recharts | Radar, line, and bar charts |
| Framer Motion | Animations |
| Lucide React | Icons |
| Google Fonts (Nunito, Inter, JetBrains Mono) | Typography |

---

## 🎨 Colour Palette

| Name | Hex | Usage |
|---|---|---|
| Contigo Orange | `#F97B4F` | Primary — dominant warm colour |
| Insight Amber | `#F5C842` | Accents, highlights, AI nudges |
| Contigo Blue | `#2E6FDF` | Trust, links, secondary actions |
| Contigo Teal | `#3ECFAC` | Growth, wellbeing indicators |
| Warm White | `#FFF8F4` | Backgrounds |
| Deep Navy | `#1E2A3A` | Headings, body text |
| Soft Slate | `#8A9BB0` | Secondary text, muted elements |
| Soft Peach | `#FDEEE6` | Card backgrounds |

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, stats, features, role cards |
| `/login` | Login page with role selector |
| `/student/dashboard` | Student journey — radar chart, CEFR, mood check-in |
| `/teacher/dashboard` | Teacher dashboard — classes, lesson log, alerts |
| `/teacher/classroom` | Classroom seating heatmap with AI suggestions |
| `/admin/dashboard` | Institution overview — correlations, timetable, teacher table |

---

## 🤖 Tigo — AI Assistant

Tigo is the floating AI chat assistant available on every page. Click the orange robot button (bottom-right) to:
- Ask about student performance
- Get seating suggestions
- View lesson time insights
- Receive at-risk alerts

---

## 📊 Mock Data

All data lives in `lib/mockData.ts`. No backend required — everything runs from static mock data.

Students: Hassan Al-Rashid, Sara Benali, Omar Khalil, Lena Mostafa, Ahmed Farouq  
Teachers: Amina Okafor (DELTA), James Hartley (CELTA)
