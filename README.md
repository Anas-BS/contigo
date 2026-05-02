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

## 🎨 Brand
- Primary colour: #F97B4F (Contigo Orange)
- Tagline: "With you, every step."
- AI Assistant: Tigo 🤖

---

## 🗂️ Project Structure Review

### Directory & File Tree

```
contigo/
├── app/                          # Next.js App Router — all pages & layouts
│   ├── layout.tsx                # Root layout (HTML shell, global metadata)
│   ├── globals.css               # Global styles, CSS variables, Tailwind directives
│   ├── page.tsx                  # Landing page (/)
│   ├── login/
│   │   └── page.tsx              # Login page with role selector (/login)
│   ├── student/
│   │   └── dashboard/
│   │       └── page.tsx          # Student "My Journey" dashboard
│   ├── teacher/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Teacher analytics dashboard
│   │   └── classroom/
│   │       └── page.tsx          # Classroom seating map & heatmap
│   └── admin/
│       └── dashboard/
│           └── page.tsx          # Admin "The Full Picture" dashboard
│
├── components/                   # Shared React components
│   ├── TigoChat.tsx              # Tigo AI assistant chat panel (floating widget)
│   └── charts/                  # Recharts-based data visualization components
│       ├── MoodChart.tsx         # Mood trend line/area chart
│       ├── PerformanceBarChart.tsx # Grade/performance bar chart
│       └── SkillsChart.tsx       # Skills radar or bar chart
│
├── .env.example                  # Environment variable template
├── .gitignore                    # Git ignore rules
├── next.config.ts                # Next.js configuration (standalone output)
├── tailwind.config.ts            # Tailwind CSS theme & content paths
├── tsconfig.json                 # TypeScript compiler options
├── postcss.config.js             # PostCSS plugins (Tailwind + Autoprefixer)
├── package.json                  # Dependencies & npm scripts
├── vercel.json                   # Vercel deployment settings
│
├── README.md                     # Project overview & quick-start guide
├── IMPLEMENTATION_GUIDE.md       # Step-by-step redesign integration guide
└── design_system_and_motion_principles.md  # Design system & animation spec
```

---

### 📐 Conventions

#### Source Code

| Convention | Detail |
| :--------- | :----- |
| **Language** | TypeScript (`.tsx` / `.ts`) throughout |
| **Framework** | Next.js 15 — App Router (`app/` directory) |
| **Client components** | Marked with `'use client'` at the top of the file |
| **Page files** | Always named `page.tsx` inside a route folder |
| **Layout files** | `layout.tsx` at the root of `app/` for the global shell |
| **Component naming** | PascalCase filenames matching the exported default function (e.g. `TigoChat.tsx`) |
| **Animation** | Framer Motion — variants defined at module scope, applied via `motion.*` elements |
| **Icons** | `lucide-react` icon library |
| **Charts** | `recharts` library, isolated in `components/charts/` |
| **Drag-and-drop** | `@dnd-kit/core` + `@dnd-kit/sortable` (used in classroom seating map) |

#### Assets & Styling

| Convention | Detail |
| :--------- | :----- |
| **CSS framework** | Tailwind CSS v3 — utility classes applied inline in JSX |
| **Global styles** | `app/globals.css` — Tailwind base/components/utilities directives + CSS custom properties |
| **Design tokens** | CSS variables on `:root` (`--contigo-orange`, `--contigo-amber`, `--contigo-blue`, `--contigo-teal`) and mirrored in `tailwind.config.ts` under `theme.extend.colors` |
| **Primary brand colour** | `#F97B4F` (Contigo Orange) |
| **Background pattern** | Dark gradient (`from-slate-900 via-purple-900 to-slate-900`) with animated Glassmorphism blobs on most dashboards |
| **Card style** | Glassmorphic — `bg-white/10 backdrop-blur-md border border-white/20` |
| **No image assets** | All visuals are achieved through CSS gradients, Tailwind utilities, and Lucide icons; no `/public` image files are used |

#### Configuration

| File | Purpose |
| :--- | :------ |
| `next.config.ts` | Sets `output: 'standalone'` for containerised / Vercel deployments |
| `tailwind.config.ts` | Extends theme with brand colours; scans `app/`, `components/`, and `pages/` for class names |
| `tsconfig.json` | Standard Next.js TypeScript config with strict mode |
| `postcss.config.js` | Enables Tailwind CSS and Autoprefixer |
| `.env.example` | Documents required env vars (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_TAGLINE`, `NEXT_PUBLIC_TIGO_ENABLED`) |
| `vercel.json` | Vercel-specific deployment overrides |

#### Documentation

| File | Purpose |
| :--- | :------ |
| `README.md` | Top-level project overview, quick-start commands, page list, and brand guide |
| `IMPLEMENTATION_GUIDE.md` | Step-by-step instructions for applying the Glassmorphism redesign, including colour palette, animation variants, responsive breakpoints, and troubleshooting |
| `design_system_and_motion_principles.md` | Full design system specification — Glassmorphism philosophy, colour palette, typography, Framer Motion animation types, and implementation strategy |