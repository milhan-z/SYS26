# See You Soon — ITS Global Engagement 💚

A mobile-first digital invitation for the ITS Global Engagement farewell,
styled as a warm Minecraft-inspired voxel world: golden-hour skies, glowing
lanterns, a pixel kampong, and a starry-night goodbye.

It reads like a little **slide deck** — five full-screen "pages" you scroll,
swipe, or tap through, with a game-style HUD on top and a page navigator
(arrows · counter · dots · "scroll to continue") pinned to the bottom.

Built with **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**.
No database, no CMS — all content lives in one editable file.

---

## The five pages

| Page | Section | What's there |
| ---- | ------------------ | ------------------------------------------------------------------ |
| 1 | **The Invitation** | Full-screen pixel sunset over the kampong, title, motto sign |
| 2 | **Event Details** | Recurring title, date/time + dress-code cards, location note |
| 3 | **The Venue** | Venue illustration, address with building icon, View Map + mini-map |
| 4 | **Memories** | "Kenangan / Memories" polaroid wall with lightbox (tap/swipe/keys) |
| 5 | **RSVP** | Floating-lantern night sky, big "RSVP", green button + copy-able link |

Navigation: scroll/swipe (the pages snap into view), the **◄ / ►** arrows
and **N / 5** counter at the bottom, the progress **dots**, the **← / →**
keyboard keys, or the **Quest Log** menu (☰, top-right) to jump straight to
any page.

---

## The opening (immersive intro)

Every fresh open / reload starts on a clean, full-screen **landing page**
([`components/IntroGate.tsx`](components/IntroGate.tsx)): a self-contained
starry night scene, the emblem, a pixel "Loading world…" bar that fills, then a
glowing **Open Invitation** button. Pressing it starts the music and lifts the
curtain to the hero — the title rises in, and the HUD + bottom nav glide into
place.

How it works: an inline script in [`app/layout.tsx`](app/layout.tsx) marks
`<html class="js pre-enter">` before first paint (locking scroll, resetting to
the top, and holding the content back); entering swaps it to `class="entered"`.
All the choreography lives in [`app/globals.css`](app/globals.css) under
**"Experience intro"**. To change the loading beat, edit the `1500` ms timeout
in `IntroGate.tsx`. With JavaScript off the landing never appears and the page
is a normal, fully-scrollable document.

### Background music

A track loops seamlessly once the visitor presses **Open Invitation** (browsers
block audio until a tap, so it begins on that gesture). A floating pixel button
(bottom-left) mutes/unmutes it. It uses the Web Audio API with sample-accurate
`loopStart`/`loopEnd`, so a sub-section of a song repeats with no gap. Configure
it in [`data/site.ts`](data/site.ts) → `audio`:

```ts
audio: {
  enabled: true,                 // set false to remove music entirely
  src: "/audio/good-life.mp3",   // a file inside /public
  loopStart: 47,                 // 00:47 — start of the loop, in seconds
  loopEnd: 80,                   // 01:20 — jumps back to loopStart seamlessly
  volume: 0.4,                   // 0–1
  label: "background music",     // for the mute button's screen-reader label
},
```

To use a different song, drop the file in `public/audio/` and update `src`
(plus `loopStart`/`loopEnd` for the section you want).

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

### Event details (page 2)

```ts
event: {
  dateLabel: "Saturday, 21 June 2025",   // shown on the card, any text
  timeLabel: "10:00 AM – 3:00 PM",       // shown on the card, any text
  start: "2025-06-21T10:00:00+07:00",    // ISO (the +07:00 is WIB)
  end:   "2025-06-21T15:00:00+07:00",    // ISO
  dresscode: { main: "Smart Casual", hint: "a touch of green is encouraged" },
  note: "More location details will be shared closer to the event.",
},
```

### Venue (page 3)

```ts
venue: {
  name: "ITS Global Hub",
  addressLines: ["…", "…"],   // one array item per line
  mapLabel: "ITS Global Hub", // label on the little map pin
  mapsUrl: "https://…",        // any Google Maps share/search link
  image: null,                 // ⬅ set to "/images/venue.jpg" to use a photo
  imageAlt: "…",
},
```

While `image` is `null`, a built-in pixel illustration of the venue is shown.
To use a real photo, drop it in `public/images/venue.jpg` and set
`image: "/images/venue.jpg"`.

### Memories (page 4) — albums per moment

Memories is now a wall of **albums**: each polaroid is one *moment* (a
category), and tapping it opens every photo inside (tap a photo for full-size,
then ◄ ► / swipe / arrow keys to browse, ✕ / Esc to step back out).

1. Copy photos into `public/images/gallery/`, e.g. `01.jpg`, `02.jpg`, …
   (landscape around **1200×800 px** looks best; JPEG is fine — Next.js
   optimizes and lazy-loads them automatically).
2. In `data/site.ts`, each entry under `memories.albums` is a moment. Set its
   `cover` (the polaroid on the wall) and list its `photos`:

```ts
albums: [
  {
    cover: "/images/gallery/01.jpg",         // the polaroid on the wall (null = placeholder)
    title: "Together, we shine!",            // the moment's name
    alt: "The team after Global Project Week 2025",
    photos: [
      { src: "/images/gallery/01.jpg", alt: "On stage", caption: "On stage together" },
      { src: "/images/gallery/02.jpg", alt: "Group shot", caption: "After the ceremony" },
      // …add as many photos as you like; the grid adapts.
    ],
  },
  // …add or remove whole moments freely.
],
```

Any `cover`/`src` left as `null` shows a friendly pixel placeholder, so you can
build albums while you're still collecting pictures. The photo-count badge on
each cover updates automatically.

### RSVP (page 5)

```ts
rsvp: {
  heading: "RSVP",
  message: "Let us know if you're joining!",
  buttonLabel: "Yes, I'll be there",     // big green button — top line
  buttonSub: "Open RSVP Link",            // small second line
  url: "https://its.ui.ac.id/rsvp/see-you-soon",  // ⬅ your real form link
  displayUrl: "its.ui.ac.id/rsvp/see-you-soon",   // pretty text in the copy box
  deadlineLabel: "Kindly respond by May 25, 2025",
},
```

The green button **and** the copy box both use `url`; `displayUrl` is only the
text shown in the box. Point `url` at your real Google Form / Typeform / RSVP
page when you have it.

### Hero artwork (page 1)

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

The repo is already on GitHub. Push your edits and import once:

```bash
git add -A
git commit -m "Update invitation content"
git push
```

Then on [vercel.com](https://vercel.com): **Add New → Project → Import** the
repo → Deploy. Vercel auto-detects Next.js; no settings needed. Every later
`git push` redeploys automatically.

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
  page.tsx                   assembles the five pages + HUD + page nav
  globals.css                design tokens, pixel UI, slide-deck CSS
  icon.svg                   favicon (pixel heart)
components/
  Hud.tsx                    fixed header + quest-log menu
  PageNav.tsx                bottom navigator (arrows, counter, dots)
  Gallery.tsx                polaroid grid + lightbox (client)
  sections/                  Hero, Details, Venue, Memories, Rsvp
  scene/                     hand-coded pixel art (SunsetScene, NightScene,
                             SkyBackdrop, VenueArt, MapThumb, MemoryPlaceholder)
  ui/                        PixelPanel, PixelButton, TitleBanner, CopyLink…
lib/cn.ts                    tiny class-name helper
public/images/gallery/       ← drop real photos here
```

---

## Performance & accessibility notes

- The hero/night/sky scenes are inline SVG — zero image downloads on first paint.
- Gallery photos go through `next/image`: resized, converted to AVIF/WebP,
  and lazy-loaded automatically.
- Pages use CSS scroll-snap; animations are transform/opacity only, and
  **`prefers-reduced-motion` disables them** (content appears instantly, the
  intro skips its loading bar, and the title screen reveals without motion).
- Buttons and tap targets are ≥ 44 px, focus states are visible, images have
  alt text, the page counter/dots reflect the active slide, and the copy
  action announces success to screen readers.
- Cream-on-dark-wood text meets WCAG AA contrast.
