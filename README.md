# See You Soon — ITS Global Engagement 💚

A mobile-first digital invitation for the ITS Global Engagement farewell
event, styled as a warm Minecraft-inspired voxel world: golden-hour skies,
glowing lanterns, a pixel kampong, and a starry-night goodbye.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**.
No database, no CMS — all content lives in one editable file.

---

## The experience

| Chapter | Section | What's there |
| ------- | ------------------ | ------------------------------------------------------------------- |
| 1 | **The Invitation** | Full-screen pixel sunset over the Kampong, title, call to explore |
| 2 | **Event Details** | Date, time, dress code, live countdown, add-to-calendar |
| 3 | **The Venue** | ITS Global Kampong: illustration/photo, address, Google Maps button |
| 4 | **Memories** | Polaroid wall with lightbox (tap, swipe, arrow keys) |
| 5 | **RSVP** | Floating-lantern night sky, farewell message, RSVP form button |

Plus a game-style HUD: an XP scroll-progress bar and a "Quest Log" menu
for jumping between chapters.

---

## Quick start

Requirements: **Node.js 18.18+** (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — preferably in a mobile viewport
(DevTools → device toolbar) since the design is mobile-first.

Production build:

```bash
npm run build
npm start
```

---

## ✏️ Editing content

**Everything** — dates, addresses, captions, links, messages — lives in
[`data/site.ts`](data/site.ts). Open it, change the values, save. The dev
server hot-reloads instantly.

### Event details

```ts
event: {
  dateLabel: "Saturday, 27 June 2026",        // shown on the card, any text
  timeLabel: "10:00 AM – 3:00 PM (WIB)",      // shown on the card, any text
  start: "2026-06-27T10:00:00+07:00",         // ISO — drives countdown + calendar
  end:   "2026-06-27T15:00:00+07:00",         // ISO — drives calendar entry
  dresscode: { main: "Smart casual", hint: "a touch of green is encouraged" },
  note: "…",                                   // parchment note under the cards
},
```

> Keep `start`/`end` in sync with the labels — the countdown and the
> "Add to Google Calendar" button are generated from the ISO values
> (the `+07:00` suffix is the WIB timezone).

### Venue

```ts
venue: {
  name: "ITS Global Kampong",
  addressLines: ["…", "…"],     // one array item per line
  mapsUrl: "https://…",          // any Google Maps share/search link
  image: null,                   // ⬅ set to "/images/venue.jpg" to use a photo
  imageAlt: "…",
},
```

While `image` is `null`, a built-in pixel illustration of the Kampong is
shown. To use a real photo, drop it in `public/images/venue.jpg` and set
`image: "/images/venue.jpg"`.

### Adding real photos to Memories

1. Copy photos into `public/images/gallery/`, e.g. `01.jpg`, `02.jpg`, …
   (landscape 4:3 around **1200×900 px** looks best; JPEG is fine —
   Next.js optimizes and lazy-loads them automatically).
2. In `data/site.ts`, point each gallery item at its file:

```ts
items: [
  {
    src: "/images/gallery/01.jpg",   // was null
    alt: "The team after Global Project Week 2025",
    caption: "Together, we shine!",
  },
  // …add or remove items freely; the grid adapts.
],
```

Items with `src: null` show a friendly pixel placeholder, so you can mix
real photos and placeholders while collecting pictures. The
"photos on their way" note disappears by itself once every item has a photo.

### RSVP link

```ts
rsvp: {
  url: "https://forms.gle/REPLACE_WITH_YOUR_FORM",  // ⬅ your real form link
  deadlineLabel: "Please RSVP by Saturday, 20 June 2026",
  …
},
```

### Hero artwork

The opening scene is hand-coded pixel art (no download needed). If you'd
rather use the real ITS Global Kampong render, save it as
`public/images/hero.jpg` and set `hero.backgroundImage: "/images/hero.jpg"`.

### Colors & fonts

Design tokens live at the top of [`app/globals.css`](app/globals.css)
(`@theme` block) — change a hex there and every panel, button, and border
follows. Fonts (Pixelify Sans, Press Start 2P, Nunito) are configured in
[`app/layout.tsx`](app/layout.tsx).

---

## 🚀 Deploying to Vercel

### Option A — via GitHub (recommended)

```bash
git init
git add -A
git commit -m "See You Soon invitation site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on [vercel.com](https://vercel.com): **Add New → Project → Import**
your repo → Deploy. Vercel auto-detects Next.js; no settings needed.
Every later `git push` redeploys automatically.

### Option B — Vercel CLI (no GitHub needed)

```bash
npm i -g vercel
vercel          # first deploy (accept the defaults)
vercel --prod   # production deploy
```

Either way you'll get a shareable URL like
`https://see-you-soon-ige.vercel.app` — that's the link you put in the
WhatsApp/IG invitation message.

---

## Project structure

```
data/site.ts                 ← ✏️ ALL editable content
app/
  layout.tsx                 fonts, metadata, theme color
  page.tsx                   assembles the five chapters
  globals.css                design tokens + pixel UI system
  icon.svg                   favicon (pixel heart)
components/
  Hud.tsx                    fixed header, XP progress bar, quest-log menu
  Countdown.tsx              live countdown (client)
  Gallery.tsx                polaroid grid + lightbox (client)
  Footer.tsx
  sections/                  Hero, Details, Venue, Memories, Rsvp
  scene/                     hand-coded pixel art (sunset, night, venue…)
  ui/                        PixelPanel, PixelButton, SectionHeader…
  icons.tsx                  16×16 pixel icon set
lib/                         tiny helpers (class join, calendar link)
public/images/gallery/       ← drop real photos here
```

---

## Performance & accessibility notes

- The hero/night scenes are inline SVG — zero image downloads on first paint.
- Gallery photos go through `next/image`: resized, converted to AVIF/WebP,
  and lazy-loaded automatically.
- Animations are transform/opacity only, and **`prefers-reduced-motion`
  disables them** (content appears instantly).
- Buttons and tap targets are ≥ 44 px, focus states are visible, images
  have alt text, and the HUD progress bar is exposed to screen readers.
- Cream-on-dark-wood text meets WCAG AA contrast.
