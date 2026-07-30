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

## 📁 Project Structure

```
contigo/
├── app/                        # Next.js App Router — all routes live here
│   ├── layout.tsx              # Root HTML layout & global metadata
│   ├── globals.css             # Global CSS / Tailwind base styles
│   ├── page.tsx                # Landing page (/)
│   ├── login/
│   │   └── page.tsx            # Role-selector login page (/login)
│   ├── student/
│   │   └── dashboard/          # Student "My Journey" dashboard (/student/dashboard)
│   ├── teacher/
│   │   ├── dashboard/          # Teacher overview dashboard (/teacher/dashboard)
│   │   └── classroom/          # Classroom seating map & heatmap (/teacher/classroom)
│   └── admin/
│       └── dashboard/          # Admin "The Full Picture" dashboard (/admin/dashboard)
│
├── components/                 # Shared, reusable React components
│   ├── TigoChat.tsx            # AI assistant chat panel (Tigo 🤖)
│   └── charts/                 # Recharts-based visualisation components
│       ├── MoodChart.tsx
│       ├── PerformanceBarChart.tsx
│       └── SkillsChart.tsx
│
├── next.config.ts              # Next.js configuration (standalone output)
├── tailwind.config.ts          # Tailwind CSS theme — brand colours & content paths
├── postcss.config.js           # PostCSS plugins (Tailwind + Autoprefixer)
├── tsconfig.json               # TypeScript compiler settings
├── vercel.json                 # Vercel deployment settings
├── .env.example                # Environment variable template
├── package.json                # Dependencies & npm scripts (dev/build/start/lint)
│
├── README.md                   # Project overview & quick-start guide (this file)
├── IMPLEMENTATION_GUIDE.md     # Step-by-step guide for animations & glassmorphism
└── design_system_and_motion_principles.md  # Brand colours, typography & motion rules
```

### Conventions at a glance

| Area | Convention |
|------|-----------|
| **Routing** | Next.js App Router — each folder under `app/` maps to a URL segment |
| **Components** | Shared UI lives in `components/`; chart sub-components grouped in `components/charts/` |
| **Styling** | Tailwind CSS utility classes; brand colours defined as custom tokens in `tailwind.config.ts` |
| **Animations** | Framer Motion throughout; motion variants declared at the top of each file |
| **Language** | TypeScript (`.ts` / `.tsx`) for all source files |
| **Deployment** | Optimised for Vercel; standalone Next.js output configured in `next.config.ts` |

## 🎨 Brand
- Primary colour: #F97B4F (Contigo Orange)
- Tagline: "With you, every step."
- AI Assistant: Tigo 🤖