# Contigo 🌟
### "With you, every step."

Contigo is a Holistic English Language Teaching (ELT) Student Performance Intelligence Platform.

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Anas-BS/contigo)

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Build for Production

```bash
npm run build
npm run start
```

## 📱 Pages
- `/` — Landing page
- `/login` — Login with role selector
- `/student/dashboard` — Student "My Journey" dashboard
- `/teacher/dashboard` — Teacher dashboard
- `/teacher/classroom` — Classroom seating map & heatmap
- `/admin/dashboard` — Admin "The Full Picture" dashboard

## 🗂️ Project Structure

```
contigo/
├── app/                          # Next.js App Router (source pages & layouts)
│   ├── layout.tsx                # Root layout (HTML shell, global font/metadata)
│   ├── page.tsx                  # Landing page — animated hero & feature highlights
│   ├── globals.css               # Global CSS (Tailwind base + custom scrollbar styles)
│   ├── login/
│   │   └── page.tsx              # Login page with role selector (Student / Teacher / Admin)
│   ├── student/
│   │   └── dashboard/
│   │       └── page.tsx          # Student "My Journey" dashboard
│   ├── teacher/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Teacher dashboard (class overview & analytics)
│   │   └── classroom/
│   │       └── page.tsx          # Classroom seating map & heatmap
│   └── admin/
│       └── dashboard/
│           └── page.tsx          # Admin "The Full Picture" dashboard
│
├── components/                   # Reusable React components
│   ├── TigoChat.tsx              # Tigo AI assistant chat panel
│   └── charts/                   # Recharts-based data visualisation components
│       ├── MoodChart.tsx         # Student mood trend chart
│       ├── PerformanceBarChart.tsx # Grade / performance bar chart
│       └── SkillsChart.tsx       # Skills radar / breakdown chart
│
├── next.config.ts                # Next.js configuration (standalone output)
├── tailwind.config.ts            # Tailwind CSS config — brand colours & content paths
├── tsconfig.json                 # TypeScript compiler options
├── postcss.config.js             # PostCSS plugins (Tailwind + autoprefixer)
├── vercel.json                   # Vercel deployment settings
├── package.json                  # Project metadata, scripts & dependencies
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore rules
│
├── README.md                     # Project overview & quick-start guide (this file)
├── IMPLEMENTATION_GUIDE.md       # Step-by-step guide for integrating the redesign
└── design_system_and_motion_principles.md  # Glassmorphism & Framer Motion design spec
```

### Key Conventions

| Area | Convention |
|------|------------|
| **Routing** | Next.js App Router — every `page.tsx` inside `app/` becomes a route |
| **Styling** | Tailwind CSS utility classes throughout; brand tokens defined in `tailwind.config.ts` |
| **Animations** | Framer Motion (`motion.*` components) for page transitions and micro-interactions |
| **Charts** | Recharts components wrapped in `/components/charts/` |
| **AI assistant** | `TigoChat.tsx` component embedded in dashboards |
| **TypeScript** | Strict TypeScript used across all source files |
| **Deployment** | Vercel-ready; Docker-friendly via `output: 'standalone'` in `next.config.ts` |

## 🎨 Brand
- Primary colour: #F97B4F (Contigo Orange)
- Tagline: "With you, every step."
- AI Assistant: Tigo 🤖