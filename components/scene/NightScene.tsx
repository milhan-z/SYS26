/**
 * Closing-scene backdrop: a starry voxel night with paper lanterns
 * drifting up into the sky — the farewell moment of the invitation.
 */

// deterministic pseudo-random star field (same on every render/build)
function makeStars(count: number, seed: number) {
  let s = seed;
  const next = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    left: Math.round(next() * 980) / 10,
    top: Math.round(next() * 880) / 10,
    delay: Math.round(next() * 40) / 10,
    big: next() > 0.75,
  }));
}

const STARS = makeStars(46, 20260613);

const LANTERNS: Array<{
  left: string;
  size: number;
  duration: number;
  delay: number;
}> = [
  { left: "8%", size: 22, duration: 24, delay: 0 },
  { left: "22%", size: 16, duration: 30, delay: 7 },
  { left: "38%", size: 26, duration: 21, delay: 3 },
  { left: "55%", size: 14, duration: 33, delay: 12 },
  { left: "70%", size: 24, duration: 26, delay: 5 },
  { left: "84%", size: 18, duration: 29, delay: 15 },
  { left: "93%", size: 14, duration: 24, delay: 9 },
];

function FloatingLantern({ size }: { size: number }) {
  return (
    <span className="relative block">
      <span
        className="absolute -inset-3 rounded-full bg-[#ffb347]/35 blur-md"
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

/** Far-off village silhouette pinned to the bottom of the night sky. */
function VillageSilhouette() {
  return (
    <svg
      viewBox="0 0 640 56"
      preserveAspectRatio="xMidYMax slice"
      className="absolute bottom-0 left-0 h-14 w-full"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#0d0918">
        <rect x="0" y="32" width="640" height="24" />
        <rect x="24" y="16" width="56" height="20" />
        <rect x="36" y="8" width="32" height="8" />
        <rect x="120" y="24" width="40" height="12" />
        <rect x="208" y="12" width="64" height="24" />
        <rect x="224" y="4" width="32" height="8" />
        <rect x="356" y="20" width="48" height="16" />
        <rect x="448" y="8" width="72" height="28" />
        <rect x="468" y="0" width="32" height="8" />
        <rect x="576" y="24" width="48" height="12" />
      </g>
      <g fill="#f5b942" opacity="0.85">
        <rect x="44" y="22" width="4" height="4" />
        <rect x="232" y="18" width="4" height="4" />
        <rect x="252" y="18" width="4" height="4" />
        <rect x="372" y="26" width="4" height="4" />
        <rect x="468" y="16" width="4" height="4" />
        <rect x="492" y="16" width="4" height="4" />
        <rect x="592" y="28" width="4" height="4" />
      </g>
    </svg>
  );
}

/** Pixel moon with craters. */
function Moon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="absolute right-[8%] top-[9%] h-12 w-12 sm:h-16 sm:w-16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#f3e7c9">
        <rect x="6" y="0" width="12" height="2" />
        <rect x="3" y="2" width="18" height="3" />
        <rect x="1" y="5" width="22" height="14" />
        <rect x="3" y="19" width="18" height="3" />
        <rect x="6" y="22" width="12" height="2" />
      </g>
      <g fill="#d9c693">
        <rect x="7" y="6" width="4" height="4" />
        <rect x="14" y="12" width="5" height="4" />
        <rect x="5" y="14" width="3" height="3" />
      </g>
    </svg>
  );
}

export function NightScene() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#120d24] via-[#241740] to-[#46285c]" />

      {/* stars */}
      {STARS.map((star, i) => (
        <span
          key={i}
          className={`anim-twinkle absolute bg-[#f6ecd2] ${
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

      {/* drifting paper lanterns */}
      {LANTERNS.map((lantern, i) => (
        <span
          key={i}
          className="anim-lantern absolute bottom-[-60px]"
          style={{
            left: lantern.left,
            animationDuration: `${lantern.duration}s`,
            animationDelay: `${lantern.delay}s`,
            opacity: 0,
          }}
        >
          <FloatingLantern size={lantern.size} />
        </span>
      ))}

      <VillageSilhouette />
    </div>
  );
}
