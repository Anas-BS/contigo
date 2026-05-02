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

## 🗂️ Project Structure

```
contigo/
├── app/                          # Next.js App Router — all routes live here
│   ├── layout.tsx                # Root layout: sets <html>, <body>, global metadata
│   ├── globals.css               # Global Tailwind directives & base styles
│   ├── page.tsx                  # Landing page (route: /)
│   ├── login/
│   │   └── page.tsx              # Login + role selector (route: /login)
│   ├── student/
│   │   └── dashboard/
│   │       └── page.tsx          # Student "My Journey" dashboard (/student/dashboard)
│   ├── teacher/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Teacher dashboard (/teacher/dashboard)
│   │   └── classroom/
│   │       └── page.tsx          # Classroom seating map & heatmap (/teacher/classroom)
│   └── admin/
│       └── dashboard/
│           └── page.tsx          # Admin "The Full Picture" dashboard (/admin/dashboard)
│
├── components/                   # Shared, reusable React components
│   ├── TigoChat.tsx              # Tigo AI chat assistant (floating, used on every dashboard)
│   └── charts/                   # Recharts-based data-visualisation components
│       ├── MoodChart.tsx         # 7-day mood trend line chart (student dashboard)
│       ├── PerformanceBarChart.tsx # Monthly/grade bar chart (teacher & admin dashboards)
│       └── SkillsChart.tsx       # Radar/skills profile chart (student dashboard)
│
├── next.config.ts                # Next.js config — sets output: 'standalone' for Docker/Vercel
├── tailwind.config.ts            # Tailwind config — extends theme with Contigo brand colours
├── postcss.config.js             # PostCSS config — wires Tailwind & Autoprefixer
├── tsconfig.json                 # TypeScript config — includes @/ path alias for the project root
├── package.json                  # NPM scripts (dev / build / start / lint) and dependencies
├── vercel.json                   # Vercel deployment config
├── .env.example                  # Template for environment variables
├── .gitignore                    # Standard Next.js gitignore
│
├── IMPLEMENTATION_GUIDE.md       # Step-by-step guide for applying the redesign
├── design_system_and_motion_principles.md  # Glassmorphism & Framer Motion design spec
└── README.md                     # This file
```

### Key Folder Roles

| Folder / File | Purpose |
|---|---|
| `app/` | **All pages and routing.** Each subfolder maps 1-to-1 to a URL segment (Next.js App Router). Every route is a `page.tsx` file. |
| `app/layout.tsx` | Single root layout wrapping every page. Imports `globals.css` and sets site-wide `<title>` and `<meta>` tags. |
| `components/` | UI components that are *shared across multiple routes*. Chart sub-components live in `components/charts/`. |
| `components/TigoChat.tsx` | The floating AI assistant widget imported by every dashboard page. |
| `tailwind.config.ts` | Extends Tailwind with four custom brand tokens: `contigo-orange`, `contigo-amber`, `contigo-blue`, and `contigo-teal`. |

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, TypeScript) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with custom brand tokens |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Charts** | [Recharts 2](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) (classroom seating map) |
| **Deployment** | [Vercel](https://vercel.com/) (`output: 'standalone'`) |

### Architectural Conventions

- **Next.js App Router** — Every page is a `page.tsx` file inside a folder whose name becomes the URL segment. There are no `pages/` directory routes.
- **`'use client'` directive** — Pages and components that use React hooks (`useState`, `useRouter`) or browser-only APIs (Framer Motion animations) start with `'use client'`. Server components (e.g. `app/layout.tsx`) omit this directive.
- **`@/` path alias** — TypeScript is configured with `@/` pointing to the project root, so imports read `@/components/TigoChat` instead of relative `../../components/TigoChat`.
- **Co-located page data** — Static mock data (student lists, KPIs, chart data) is defined as `const` arrays at the top of the relevant `page.tsx` file. No separate data layer exists yet; the platform is currently a demo/prototype.
- **Shared chart components** — Recharts wrappers live in `components/charts/` so they can be imported by multiple role-specific dashboards without duplication.
- **Brand colours in Tailwind** — The Contigo brand palette is registered in `tailwind.config.ts` (`contigo-orange: #F97B4F`, etc.) so class names like `bg-contigo-orange` work project-wide. Inline hex values (`text-[#F97B4F]`) are also used where necessary.
- **Glassmorphism design system** — UI uses `backdrop-blur-md`, `bg-white/10`, and `border border-white/20` Tailwind utilities to achieve the frosted-glass aesthetic described in `design_system_and_motion_principles.md`.
- **Framer Motion animation patterns** — Every animated page defines reusable `containerVariants` / `itemVariants` objects at the module level and passes them to `motion.div` via `variants` props, enabling staggered entrance animations with a single `animate="visible"` prop on the parent.