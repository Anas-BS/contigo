# Contigo
### "With you, every step."

Contigo is a Holistic English Language Teaching (ELT) Student Performance Intelligence Platform.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Anas-BS/contigo)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Build for Production

```bash
npm run build
npm run start
```

## Pages
- `/` — Landing page
- `/login` — Login with role selector
- `/student/dashboard` — Student progress: goal, skills, check-in, upcoming work
- `/teacher/dashboard` — Class overview: who needs attention and why, trend, roster, notes
- `/teacher/classroom` — Seating heatmap, row comparison and attendance register
- `/admin/dashboard` — School overview: grade comparison, alerts, attendance pattern, class results

## Design

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for tokens, typography, components and principles.

- Signature colour: Contigo Orange `#F97B4F`, used for the logo and data emphasis
- Type: Newsreader, IBM Plex Sans and IBM Plex Mono, self-hosted
- Tagline: "With you, every step."
- Assistant: Tigo (preview; answers are computed from the sample data on screen)

This is a demonstration build. Sign-in is simulated in the browser and all people shown are fictional.
