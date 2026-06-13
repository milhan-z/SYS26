/**
 * A lightweight painted-sky backdrop for the inner slides. Far cheaper than
 * rendering the full SunsetScene again: a gradient sky, a couple of drifting
 * pixel clouds, a few stars, and a dark kampong silhouette along the bottom.
 *
 * `tone` shifts the palette so consecutive slides feel like the same world at
 * slightly different moments of the golden hour.
 */
type Tone = "sunset" | "dusk" | "rose";

const SKY: Record<Tone, string> = {
  sunset:
    "linear-gradient(180deg,#2b1a3e 0%,#6d3a6e 38%,#c75d57 72%,#e0784f 100%)",
  dusk: "linear-gradient(180deg,#241b46 0%,#4b2a63 40%,#8a4a6b 74%,#c66a55 100%)",
  rose: "linear-gradient(180deg,#37224f 0%,#7b3a6b 42%,#c25f6a 76%,#e08a64 100%)",
};

function Cloud({
  x,
  y,
  scale,
  drift,
}: {
  x: number;
  y: number;
  scale: number;
  drift: string;
}) {
  return (
    <g className={drift}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <g fill="#f4b88e" opacity={0.8}>
          <rect x={16} y={0} width={48} height={8} />
          <rect x={0} y={8} width={80} height={16} />
        </g>
        <g fill="#dd8b70" opacity={0.8}>
          <rect x={8} y={24} width={72} height={8} />
        </g>
      </g>
    </g>
  );
}

const STARS: Array<[number, number, number]> = [
  [48, 22, 0],
  [150, 40, 1.1],
  [300, 16, 0.6],
  [470, 30, 1.6],
  [560, 18, 0.9],
  [620, 46, 1.4],
];

export function SkyBackdrop({ tone = "sunset" }: { tone?: Tone }) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: SKY[tone] }} />
      <svg
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        shapeRendering="crispEdges"
        focusable="false"
      >
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

        <Cloud x={40} y={48} scale={1} drift="cloud-drift-slow" />
        <Cloud x={330} y={88} scale={0.7} drift="cloud-drift" />
        <Cloud x={150} y={130} scale={0.5} drift="cloud-drift-slower" />

        {/* hazy sun low on the horizon */}
        <circle cx={320} cy={300} r={120} fill="#ffb46a" opacity={0.28} />

        {/* far hill line */}
        <g fill="#3a2350" opacity={0.85}>
          <rect x={0} y={300} width={120} height={100} />
          <rect x={96} y={288} width={120} height={112} />
          <rect x={420} y={292} width={120} height={108} />
          <rect x={520} y={300} width={120} height={100} />
        </g>

        {/* dark kampong silhouette along the very bottom */}
        <g fill="#1c1024">
          <rect x={0} y={352} width={640} height={48} />
          {/* trees */}
          <rect x={28} y={300} width={20} height={56} />
          <g>
            <rect x={8} y={276} width={60} height={36} />
            <rect x={20} y={262} width={36} height={16} />
          </g>
          <rect x={592} y={296} width={20} height={60} />
          <g>
            <rect x={568} y={268} width={64} height={40} />
            <rect x={584} y={252} width={40} height={16} />
          </g>
          {/* little cottages with glowing windows */}
          <rect x={120} y={320} width={64} height={36} />
          <polygon points="116,320 188,320 152,300" />
          <rect x={456} y={316} width={72} height={40} />
          <polygon points="452,316 532,316 492,294" />
        </g>
        <g fill="#ffb84d">
          <rect x={138} y={332} width={12} height={12} />
          <rect x={158} y={332} width={12} height={12} />
          <rect x={476} y={328} width={14} height={14} />
          <rect x={500} y={328} width={14} height={14} />
        </g>
      </svg>
    </div>
  );
}
