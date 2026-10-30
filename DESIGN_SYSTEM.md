# Contigo design system

Contigo is a product about children's progress. The interface should read like a well-edited school report, not a trading terminal. The direction is **editorial software**: warm paper, ink text, one signature colour used sparingly, and typography doing the work that gradients and shadows usually do.

Tokens live in `tailwind.config.ts`. Base styles live in `app/globals.css`. Components live in `components/ui` and `components/charts`.

## Principles

1. **Reasons beside every flag.** A status never appears without the signal that caused it ("Attendance 79%", not "At risk").
2. **One surface level.** Panels sit on the page. Panels are never nested; inside a panel, use dividers.
3. **Strips, not card grids.** Headline numbers sit in a single `MetricStrip` with context under each value.
4. **Charts state their finding.** Each chart answers one question, labels values directly, and has a sentence underneath that says what it found. Every chart ships a screen-reader table or list.
5. **Colour is never the only signal.** Text carries meaning; colour reinforces it.
6. **Honest data.** Sample data is labelled as such. Nothing is shown that the data cannot support.
7. **Motion is feedback, not decoration.** 150 to 200 ms transitions on state changes only. No infinite animation. `prefers-reduced-motion` collapses all motion to 1 ms.

## Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1C1B18` | Primary text, primary buttons, chart lines |
| `ink-700` / `600` / `500` | `#45423B` / `#5A564D` / `#6B665C` | Secondary text; `ink-500` is the lightest allowed text colour (≥4.5:1 on all surfaces) |
| `paper` | `#F4F0E8` | Page background |
| `paper-raised` | `#FBFAF6` | Panels, inputs |
| `paper-sunken` | `#ECE6DA` | Table heads, tracks, neutral tags |
| `line` / `line-strong` | `#E0D9CB` / `#C9C0AE` | Dividers and panel borders (decorative) |
| `line-control` | `#8F8778` | Form control borders (≥3:1, WCAG 1.4.11) |
| `ember-500` / `600` | `#F97B4F` / `#E0612F` | Logo, highlighted bars and data marks only |
| `ember-700` | `#B4441C` | Accent text and links (≥4.8:1) |
| `positive`, `caution`, `critical`, `info` | `#2D6A4F`, `#85590A`, `#A3261B`, `#2B4C7E` | Status text, each with a `-soft` background (all pairs ≥5:1) |
| `heat-green` / `amber` / `orange` / `red` | `#CCE3D1` / `#F1E0A9` / `#F4C9AC` / `#EBB1A8` | Seating heatmap fills, always with ink text |

Contigo Orange (`#F97B4F`) is kept from the original identity, but only for the logo and data emphasis. Primary actions are ink, so the orange keeps its meaning: "look here".

## Type

| Role | Family | Notes |
|---|---|---|
| Display | Newsreader | Page titles, hero, key numbers, written summaries |
| Interface | IBM Plex Sans | Everything else; 15 px body, 13 px secondary |
| Data and labels | IBM Plex Mono | Uppercase `.label` eyebrows, tabular figures via `.num` |

All three fonts are self-hosted from `app/fonts` (SIL Open Font License 1.1, licences included) through `next/font/local`, so builds never depend on a font CDN.

## Shape and depth

- Radius: `sm` 3 px (tags), default 6 px (controls, panels), `lg` 10 px (dialogs and product previews).
- Elevation: `shadow-hairline` for panels; `shadow-overlay` only for dialogs and floating previews.
- Content width: `max-w-page` (1200 px); running text uses `max-w-prose`.

## Components

| Component | File | Notes |
|---|---|---|
| `Button`, `buttonStyles` | `components/ui/Button.tsx` | `primary` (ink), `accent`, `secondary`, `ghost`, `danger`; `sm`/`md`/`lg`; `loading` shows a spinner and sets `aria-busy` |
| `Field`, `Input`, `Select`, `controlStyles` | `components/ui/Field.tsx` | Field wires label, hint and error ids; reuse `controlStyles` for any custom control |
| `Panel` | `components/ui/Panel.tsx` | Titled section with optional actions; `flush` for edge-to-edge tables and lists |
| `MetricStrip` | `components/ui/Metric.tsx` | Headline numbers with unit and context |
| `StatusTag` | `components/ui/StatusTag.tsx` | Text-first status label in six tones |
| `PageHeader` | `components/ui/PageHeader.tsx` | Eyebrow, display title, description and actions |
| `Segmented` | `components/ui/Segmented.tsx` | Radio group with arrow-key navigation |
| `Dialog` | `components/ui/Dialog.tsx` | Focus trap, Escape, focus return, scroll lock; centre, left or right placement |
| `LineTrend`, `BarList`, `ColumnStrip`, `Meter` | `components/charts` | Dependency-free HTML/SVG charts with screen-reader tables |
| `AppShell` | `components/app/AppShell.tsx` | Role-aware rail on desktop, top bar and drawer below `lg` |

## Breakpoints

Tailwind defaults. The app shell switches from drawer to rail at `lg` (1024 px). Data tables become stacked rows below `md`. The seating grid keeps its six columns at every width and switches to initials on small screens, because the room's shape is the information.
