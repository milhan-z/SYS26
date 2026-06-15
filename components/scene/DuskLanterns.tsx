/**
 * Dusk Lanterns — the opening's world.
 *
 * A deep twilight sky with a remembered ember glow low on the horizon, a soft
 * pixel moon, a quiet twinkling starfield, dreamy bokeh, and warm paper
 * lanterns drifting upward in depth layers (the farewell motif — letting a
 * lantern go is the gentlest "see you soon"). A low kampong silhouette grounds
 * it. Pure CSS/SVG — no image downloads — and the dark sky keeps the title crisp.
 *
 * Everything is deterministic (seeded), so server and client render identically.
 */

function makeStars(count: number, seed: number) {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    left: Math.round(next() * 1000) / 10,
    top: Math.round(next() * 720) / 10, // keep stars in the upper sky
    delay: Math.round(next() * 40) / 10,
    big: next() > 0.78,
  }));
}

const STARS = makeStars(42, 70260613);

/** Soft out-of-focus light orbs for dreamy depth. */
const BOKEH: Array<{ left: string; top: string; size: number; warm: boolean; delay: number; dur: number }> = [
  { left: "12%", top: "30%", size: 70, warm: true, delay: 0, dur: 11 },
  { left: "82%", top: "22%", size: 90, warm: false, delay: 3, dur: 14 },
  { left: "68%", top: "52%", size: 60, warm: true, delay: 6, dur: 12 },
  { left: "24%", top: "60%", size: 80, warm: true, delay: 2, dur: 15 },
  { left: "46%", top: "16%", size: 55, warm: false, delay: 8, dur: 13 },
];

/** Lanterns in three depth layers: far (small/dim) → near (large/glowy). */
const LANTERNS: Array<{
  left: string;
  size: number;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
}> = [
  // far
  { left: "6%", size: 13, duration: 34, delay: 0, blur: 0.6, opacity: 0.75 },
  { left: "30%", size: 12, duration: 38, delay: 9, blur: 0.6, opacity: 0.7 },
  { left: "52%", size: 14, duration: 32, delay: 4, blur: 0.6, opacity: 0.75 },
  { left: "74%", size: 12, duration: 40, delay: 14, blur: 0.6, opacity: 0.7 },
  { left: "90%", size: 13, duration: 36, delay: 7, blur: 0.6, opacity: 0.72 },
  // mid
  { left: "16%", size: 22, duration: 27, delay: 5, blur: 0, opacity: 0.95 },
  { left: "44%", size: 24, duration: 24, delay: 12, blur: 0, opacity: 1 },
  { left: "63%", size: 21, duration: 29, delay: 2, blur: 0, opacity: 0.95 },
  { left: "84%", size: 23, duration: 26, delay: 16, blur: 0, opacity: 0.95 },
  // near
  { left: "22%", size: 38, duration: 20, delay: 8, blur: 1.4, opacity: 1 },
  { left: "70%", size: 42, duration: 18, delay: 3, blur: 1.6, opacity: 1 },
  { left: "50%", size: 34, duration: 22, delay: 15, blur: 1.2, opacity: 1 },
];

function Lantern({ size }: { size: number }) {
  return (
    <span className="relative block">
      {/* pre-soft radial glow (no blur filter — cheap to animate) */}
      <span
        className="absolute -inset-[60%] rounded-full bg-[radial-gradient(circle,rgba(255,180,80,0.5)_0%,rgba(255,180,80,0.12)_45%,transparent_70%)]"
        aria-hidden="true"
      />
      <svg
        viewBox="0 0 16 22"
        width={size}
        height={size * 1.375}
        shapeRendering="crispEdges"
        className="relative"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="5" y="0" width="6" height="2" fill="#7c4a1e" />
        <rect x="3" y="2" width="10" height="14" fill="#f5a23c" />
        <rect x="4" y="3" width="8" height="12" fill="#ffc257" />
        <rect x="5" y="5" width="6" height="8" fill="#ffe6a8" />
        <rect x="6" y="7" width="4" height="4" fill="#fff6da" />
        <rect x="4" y="16" width="8" height="2" fill="#7c4a1e" />
        <rect x="6" y="18" width="4" height="2" fill="#ffd27a" />
      </svg>
    </span>
  );
}

function Moon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="absolute right-[12%] top-[8%] h-14 w-14 opacity-90 sm:h-20 sm:w-20"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#f6ecd2">
        <rect x="6" y="0" width="12" height="2" />
        <rect x="3" y="2" width="18" height="3" />
        <rect x="1" y="5" width="22" height="14" />
        <rect x="3" y="19" width="18" height="3" />
        <rect x="6" y="22" width="12" height="2" />
      </g>
      <g fill="#dcc98f">
        <rect x="7" y="6" width="4" height="4" />
        <rect x="14" y="12" width="5" height="4" />
        <rect x="5" y="14" width="3" height="3" />
      </g>
    </svg>
  );
}

/** Low, simple kampong + hills silhouette to ground the sky. */
function Horizon() {
  return (
    <svg
      viewBox="0 0 640 120"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 h-28 w-full sm:h-36"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {/* soft hills */}
      <g fill="#1a1230" opacity="0.9">
        <rect x="0" y="60" width="200" height="60" />
        <rect x="150" y="48" width="220" height="72" />
        <rect x="420" y="56" width="220" height="64" />
      </g>
      {/* foreground band + village */}
      <g fill="#0e0a1c">
        <rect x="0" y="84" width="640" height="36" />
        {/* trees */}
        <rect x="36" y="52" width="14" height="40" />
        <rect x="20" y="34" width="46" height="26" />
        <rect x="588" y="50" width="14" height="42" />
        <rect x="572" y="32" width="46" height="26" />
        {/* cottages */}
        <rect x="244" y="62" width="60" height="30" />
        <polygon points="240,62 308,62 274,44" />
        <rect x="360" y="66" width="52" height="26" />
        <polygon points="356,66 416,66 386,50" />
      </g>
      {/* warm windows */}
      <g fill="#ffb84d">
        <rect x="260" y="72" width="9" height="9" />
        <rect x="278" y="72" width="9" height="9" />
        <rect x="378" y="74" width="10" height="9" />
      </g>
    </svg>
  );
}

export function DuskLanterns() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* twilight sky */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#100a26_0%,#1d143c_28%,#33204e_52%,#5b3157_74%,#8a4148_90%,#b25a3c_100%)]" />

      {/* remembered ember glow rising from the horizon */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_55%_at_50%_104%,rgba(255,140,70,0.55)_0%,rgba(255,120,60,0.18)_38%,transparent_64%)]" />

      {/* stars */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className={`anim-twinkle absolute bg-[#f8eed6] ${
            star.big ? "h-[3px] w-[3px]" : "h-[2px] w-[2px]"
          }`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <Moon />

      {/* dreamy bokeh (soft radial fills — no blur filter) */}
      {BOKEH.map((b, i) => (
        <span
          key={i}
          className="anim-floaty absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: `${b.size}px`,
            height: `${b.size}px`,
            background: b.warm
              ? "radial-gradient(circle, rgba(255,190,110,0.45) 0%, transparent 72%)"
              : "radial-gradient(circle, rgba(150,170,255,0.36) 0%, transparent 72%)",
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            opacity: 0.7,
          }}
        />
      ))}

      {/* drifting paper lanterns, layered for depth */}
      {LANTERNS.map((l, i) => (
        <span
          key={i}
          className="anim-lantern absolute bottom-[-70px]"
          style={{
            left: l.left,
            animationDuration: `${l.duration}s`,
            animationDelay: `${l.delay}s`,
            opacity: 0,
          }}
        >
          <span style={{ opacity: l.opacity, display: "block" }}>
            <Lantern size={l.size} />
          </span>
        </span>
      ))}

      <Horizon />
    </div>
  );
}
