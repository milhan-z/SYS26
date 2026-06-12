/**
 * The hero artwork: a hand-coded pixel rendition of ITS Global Kampong at
 * golden hour — sun on the water, lantern-lit village, monument hill.
 * Pure SVG on an 8px grid, so it ships with the page (no image download)
 * and stays crisp at any size.
 *
 * Composition note: the scene is cropped to its center on portrait phones
 * (`preserveAspectRatio: slice`), so everything essential lives between
 * x≈220 and x≈420. Houses and trees near the edges are a bonus for
 * tablets and desktops.
 */

// ── small helpers ───────────────────────────────────────────────────────────
type R = [x: number, y: number, w: number, h: number];

function Rects({ fill, rects }: { fill: string; rects: R[] }) {
  return (
    <g fill={fill}>
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} />
      ))}
    </g>
  );
}

// ── scene data (8px grid, viewBox 640×400) ──────────────────────────────────
const FAR_HILLS: R[] = [
  [0, 208, 56, 24],
  [56, 198, 56, 34],
  [112, 206, 72, 26],
  [184, 214, 48, 18],
  [312, 210, 72, 22],
  [384, 216, 72, 16],
  [456, 206, 88, 26],
  [544, 212, 96, 20],
];

const MONUMENT_HILL: R[] = [
  [224, 200, 88, 32],
  [232, 184, 72, 16],
  [244, 168, 48, 16],
  [252, 160, 32, 8],
];

const HILL_LIGHT: R[] = [
  [56, 198, 56, 4],
  [252, 160, 32, 4],
  [456, 206, 88, 4],
];

const MONUMENT: R[] = [
  [262, 136, 12, 24],
  [258, 128, 20, 8],
  [266, 112, 8, 16],
];

const SUN: R[] = [
  [304, 192, 32, 8],
  [296, 200, 48, 8],
  [288, 208, 64, 8],
  [284, 216, 72, 8],
  [280, 224, 80, 8],
];

const SUN_CORE: R[] = [
  [308, 200, 24, 8],
  [300, 208, 40, 8],
  [296, 216, 48, 8],
];

const SHIMMER: Array<[number, number, number, string]> = [
  [120, 236, 24, "#f0a35e"],
  [232, 236, 16, "#ffd27a"],
  [432, 236, 24, "#f0a35e"],
  [560, 240, 16, "#c96a8a"],
  [64, 244, 16, "#c96a8a"],
  [296, 244, 48, "#ffd27a"],
  [400, 244, 16, "#f0a35e"],
  [504, 248, 24, "#ffd27a"],
  [160, 252, 24, "#f0a35e"],
  [304, 252, 32, "#f0a35e"],
  [448, 252, 16, "#c96a8a"],
  [80, 258, 16, "#ffd27a"],
  [248, 260, 16, "#f0a35e"],
  [368, 258, 24, "#ffd27a"],
  [528, 260, 16, "#f0a35e"],
];

const PATH: Array<[number, number, number, string]> = [
  [296, 272, 48, "#b59a72"],
  [288, 280, 64, "#a98e66"],
  [280, 288, 80, "#b59a72"],
  [272, 296, 96, "#9c8059"],
  [264, 304, 112, "#a98e66"],
  [256, 312, 128, "#92774f"],
  [248, 320, 144, "#a08257"],
  [240, 328, 160, "#92774f"],
  [232, 336, 176, "#9c8059"],
  [224, 344, 192, "#8a6f4d"],
  [216, 352, 208, "#97794f"],
  [208, 360, 224, "#8a6f4d"],
  [200, 368, 240, "#92744c"],
  [192, 376, 256, "#856a47"],
  [184, 384, 272, "#8a6f4d"],
  [176, 392, 288, "#806344"],
];

const PATH_STONES: R[] = [
  [304, 280, 16, 4],
  [328, 296, 16, 4],
  [288, 312, 16, 4],
  [344, 320, 16, 4],
  [264, 336, 16, 4],
  [312, 344, 24, 4],
  [368, 352, 16, 4],
  [240, 360, 16, 4],
  [296, 372, 16, 4],
  [352, 384, 16, 4],
];

const GRASS_NOISE: R[] = [
  [24, 272, 16, 8],
  [104, 280, 16, 8],
  [200, 276, 8, 8],
  [440, 276, 16, 8],
  [520, 272, 8, 8],
  [592, 284, 16, 8],
  [56, 300, 8, 8],
  [152, 304, 16, 8],
  [424, 304, 8, 8],
  [488, 300, 16, 8],
  [576, 308, 8, 8],
];

const DIRT_NOISE: R[] = [
  [40, 336, 16, 8],
  [128, 348, 8, 8],
  [488, 340, 16, 8],
  [576, 352, 8, 8],
  [88, 372, 16, 8],
  [520, 376, 16, 8],
];

// big house on the right (desktop bonus)
const RIGHT_ROOF: Array<[number, number, number, string]> = [
  [432, 184, 136, "#4d2c18"],
  [440, 176, 120, "#54301a"],
  [448, 168, 104, "#4d2c18"],
  [456, 160, 88, "#54301a"],
  [464, 152, 72, "#4d2c18"],
  [472, 144, 56, "#54301a"],
  [480, 136, 40, "#4d2c18"],
  [488, 128, 24, "#5e3a20"],
];

// cottage tucked behind the left trees (desktop bonus)
const LEFT_ROOF: Array<[number, number, number, string]> = [
  [72, 200, 112, "#4d2c18"],
  [84, 192, 88, "#54301a"],
  [96, 184, 64, "#4d2c18"],
  [108, 176, 40, "#54301a"],
];

// small cottage right of the path (always visible, even on phones)
const CENTER_ROOF: Array<[number, number, number, string]> = [
  [336, 192, 96, "#54301a"],
  [344, 184, 80, "#4d2c18"],
  [356, 176, 56, "#54301a"],
  [368, 168, 32, "#5e3a20"],
];

const FLOWERS: Array<[number, number, string]> = [
  [24, 320, "#e0565e"],
  [64, 312, "#c77bd1"],
  [136, 328, "#f0eada"],
  [96, 344, "#f2a93b"],
  [40, 368, "#c77bd1"],
  [120, 380, "#e0565e"],
  [160, 356, "#f0eada"],
  [464, 316, "#f2a93b"],
  [504, 332, "#e0565e"],
  [568, 320, "#c77bd1"],
  [600, 344, "#e0565e"],
  [488, 368, "#f0eada"],
  [552, 380, "#f2a93b"],
  [608, 376, "#c77bd1"],
];

const STARS: Array<[number, number, number]> = [
  [56, 16, 0],
  [168, 36, 1.2],
  [296, 10, 0.5],
  [408, 28, 1.8],
  [512, 12, 0.9],
  [600, 40, 1.5],
];

function Cloud({
  x,
  y,
  scale = 1,
  drift,
}: {
  x: number;
  y: number;
  scale?: number;
  drift: string;
}) {
  return (
    <g className={drift}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <Rects
          fill="#f4b88e"
          rects={[
            [16, 0, 48, 8],
            [0, 8, 80, 16],
          ]}
        />
        <Rects
          fill="#dd8b70"
          rects={[
            [8, 24, 72, 8],
            [0, 16, 8, 8],
          ]}
        />
      </g>
    </g>
  );
}

function GlowWindow({ x, y, size = 20 }: { x: number; y: number; size?: number }) {
  const inner = size - 4;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} fill="#533823" />
      <rect x={x + 2} y={y + 2} width={inner} height={inner} fill="#ffb84d" />
      <rect x={x + 6} y={y + 6} width={size - 12} height={size - 12} fill="#ffe2a1" />
    </g>
  );
}

function Lantern({ x, armLeft = false }: { x: number; armLeft?: boolean }) {
  // a post-mounted hanging lantern; x = left edge of the post
  const armX = armLeft ? x - 20 : x;
  const bodyX = armLeft ? x - 26 : x + 14;
  return (
    <g>
      <circle
        cx={bodyX + 10}
        cy={244}
        r={26}
        fill="#ffb347"
        opacity={0.45}
        className="anim-glow"
      />
      <rect x={x} y={216} width={8} height={56} fill="#3a2616" />
      <rect x={armX} y={216} width={28} height={8} fill="#3a2616" />
      <rect x={bodyX + 8} y={224} width={4} height={6} fill="#2e1c10" />
      <rect x={bodyX + 2} y={228} width={16} height={4} fill="#2e1c10" />
      <rect x={bodyX} y={232} width={20} height={24} fill="#ffc257" />
      <rect x={bodyX + 4} y={236} width={12} height={16} fill="#ffe6a8" />
      <rect x={bodyX + 2} y={256} width={16} height={4} fill="#2e1c10" />
    </g>
  );
}

export function SunsetScene() {
  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 h-full w-full"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#f5995c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f5995c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* early stars */}
      {STARS.map(([x, y, d], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width={4}
          height={4}
          fill="#ffe6c9"
          className="anim-twinkle"
          style={{ animationDelay: `${d}s` }}
        />
      ))}

      {/* drifting clouds */}
      <Cloud x={48} y={36} drift="cloud-drift-slow" />
      <Cloud x={336} y={76} scale={0.75} drift="cloud-drift" />
      <Cloud x={152} y={120} scale={0.55} drift="cloud-drift-slower" />

      {/* the setting sun */}
      <circle cx={320} cy={226} r={118} fill="url(#sunGlow)" />
      <Rects fill="#ffce73" rects={SUN} />
      <Rects fill="#ffe3a3" rects={SUN_CORE} />

      {/* distant hills + monument hill */}
      <Rects fill="#452a58" rects={FAR_HILLS} />
      <Rects fill="#452a58" rects={MONUMENT_HILL} />
      <Rects fill="#5c3a72" rects={HILL_LIGHT} />
      <Rects fill="#38204a" rects={MONUMENT} />
      <rect x={266} y={142} width={4} height={4} fill="#ffd27a" />

      {/* water */}
      <rect x={0} y={232} width={640} height={36} fill="#5e4a82" />
      <rect x={296} y={234} width={48} height={32} fill="#8a5e7e" opacity={0.8} />
      {SHIMMER.map(([x, y, w, c], i) => (
        <rect key={i} x={x} y={y} width={w} height={4} fill={c} opacity={0.85} />
      ))}

      {/* ground */}
      <rect x={0} y={264} width={640} height={12} fill="#6f9c44" />
      <rect x={0} y={276} width={640} height={28} fill="#5d8639" />
      <rect x={0} y={304} width={640} height={24} fill="#4e7230" />
      <rect x={0} y={328} width={640} height={40} fill="#4a3322" />
      <rect x={0} y={368} width={640} height={32} fill="#3a2719" />
      <Rects fill="#48682c" rects={GRASS_NOISE} />
      <Rects fill="#5b4226" rects={DIRT_NOISE} />

      {/* stone path down the middle */}
      {PATH.map(([x, y, w, c], i) => (
        <rect key={i} x={x} y={y} width={w} height={8} fill={c} />
      ))}
      <Rects fill="#c4a87e" rects={PATH_STONES} />

      {/* left cottage (tucked behind the trees) */}
      {LEFT_ROOF.map(([x, y, w, c], i) => (
        <rect key={i} x={x} y={y} width={w} height={8} fill={c} />
      ))}
      <rect x={80} y={208} width={96} height={56} fill="#61432a" />
      <rect x={80} y={228} width={96} height={4} fill="#533823" />
      <GlowWindow x={116} y={220} />

      {/* big house on the right with smoking chimney */}
      <rect x={528} y={96} width={16} height={40} fill="#41281a" />
      <rect x={524} y={92} width={24} height={6} fill="#2e1c10" />
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x={530 + i * 2}
          y={84}
          width={8}
          height={8}
          fill="#d8cfc4"
          opacity={0}
          className="anim-smoke"
          style={{ animationDelay: `${i * 1.5}s` }}
        />
      ))}
      {RIGHT_ROOF.map(([x, y, w, c], i) => (
        <rect key={i} x={x} y={y} width={w} height={8} fill={c} />
      ))}
      <rect x={440} y={192} width={120} height={72} fill="#6b4a2e" />
      <rect x={440} y={192} width={8} height={72} fill="#533823" />
      <rect x={552} y={192} width={8} height={72} fill="#533823" />
      <rect x={440} y={212} width={120} height={4} fill="#5d3f26" />
      <rect x={440} y={236} width={120} height={4} fill="#5d3f26" />
      <rect x={486} y={212} width={28} height={4} fill="#533823" />
      <rect x={486} y={216} width={28} height={48} fill="#3a2616" />
      <rect x={506} y={238} width={4} height={4} fill="#ffd27a" />
      <GlowWindow x={452} y={208} />
      <GlowWindow x={524} y={208} />

      {/* small cottage beside the path — the heart of the kampong */}
      {CENTER_ROOF.map(([x, y, w, c], i) => (
        <rect key={i} x={x} y={y} width={w} height={8} fill={c} />
      ))}
      <rect x={344} y={200} width={80} height={64} fill="#5f4128" />
      <rect x={344} y={200} width={6} height={64} fill="#4c3420" />
      <rect x={418} y={200} width={6} height={64} fill="#4c3420" />
      <rect x={344} y={222} width={80} height={4} fill="#533823" />
      <GlowWindow x={354} y={214} />
      <rect x={386} y={220} width={24} height={4} fill="#4c3420" />
      <rect x={386} y={224} width={24} height={40} fill="#36220f" />
      <rect x={404} y={242} width={4} height={4} fill="#ffd27a" />

      {/* fences along the waterfront */}
      <Rects
        fill="#5e4128"
        rects={[
          [152, 258, 84, 4],
          [152, 266, 84, 4],
          [428, 258, 40, 4],
          [428, 266, 40, 4],
        ]}
      />
      <Rects
        fill="#503722"
        rects={[
          [152, 252, 8, 24],
          [190, 252, 8, 24],
          [228, 252, 8, 24],
          [428, 252, 8, 24],
          [460, 252, 8, 24],
        ]}
      />

      {/* trees framing the scene */}
      <rect x={40} y={176} width={16} height={88} fill="#4a3018" />
      <Rects
        fill="#5d8636"
        rects={[
          [8, 120, 80, 56],
          [16, 96, 64, 24],
          [32, 80, 32, 16],
        ]}
      />
      <Rects
        fill="#6f9c44"
        rects={[
          [16, 120, 24, 16],
          [40, 96, 24, 8],
        ]}
      />
      <Rects
        fill="#486f2a"
        rects={[
          [56, 144, 32, 24],
          [24, 152, 16, 16],
        ]}
      />

      <rect x={592} y={160} width={16} height={104} fill="#4a3018" />
      <Rects
        fill="#5d8636"
        rects={[
          [560, 88, 80, 64],
          [576, 56, 64, 32],
          [592, 40, 40, 16],
        ]}
      />
      <Rects
        fill="#6f9c44"
        rects={[
          [568, 96, 24, 16],
          [600, 56, 24, 8],
        ]}
      />
      <Rects
        fill="#486f2a"
        rects={[
          [612, 112, 28, 40],
          [584, 132, 24, 16],
        ]}
      />

      {/* foreground bushes */}
      <Rects
        fill="#4e7230"
        rects={[
          [0, 336, 56, 32],
          [584, 344, 56, 32],
        ]}
      />
      <Rects
        fill="#5d8639"
        rects={[
          [8, 336, 32, 8],
          [592, 344, 32, 8],
        ]}
      />

      {/* lantern posts flanking the path */}
      <Lantern x={236} />
      <Lantern x={448} armLeft />

      {/* flowers */}
      {FLOWERS.map(([x, y, c], i) => (
        <g key={i}>
          <rect x={x + 2} y={y + 8} width={4} height={8} fill="#3f6b2a" />
          <rect x={x} y={y} width={8} height={8} fill={c} />
        </g>
      ))}
    </svg>
  );
}
