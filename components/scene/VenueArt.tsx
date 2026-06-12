/**
 * Built-in pixel illustration of ITS Global Kampong at dusk.
 * Shown in the Venue card until a real photo is set in data/site.ts.
 */
export function VenueArt() {
  return (
    <svg
      viewBox="0 0 320 200"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel-art illustration of the ITS Global Kampong building glowing at dusk"
    >
      {/* dusk sky */}
      <rect width="320" height="200" fill="#3b2353" />
      <rect y="56" width="320" height="48" fill="#6d3a6e" />
      <rect y="104" width="320" height="32" fill="#c75b66" />
      <rect y="128" width="320" height="16" fill="#f08a4b" />

      {/* stars + sun haze */}
      <g fill="#ffe6c9">
        <rect x="32" y="16" width="3" height="3" className="anim-twinkle" />
        <rect x="96" y="36" width="3" height="3" className="anim-twinkle" style={{ animationDelay: "1.1s" }} />
        <rect x="212" y="20" width="3" height="3" className="anim-twinkle" style={{ animationDelay: "0.5s" }} />
        <rect x="280" y="44" width="3" height="3" className="anim-twinkle" style={{ animationDelay: "1.7s" }} />
      </g>
      <rect x="124" y="120" width="40" height="8" fill="#ffce73" />
      <rect x="132" y="112" width="24" height="8" fill="#ffe3a3" />

      {/* ground */}
      <rect y="144" width="320" height="56" fill="#4e7230" />
      <rect y="144" width="320" height="6" fill="#6f9c44" />
      <rect y="176" width="320" height="24" fill="#4a3322" />

      {/* path to the door */}
      <g>
        <rect x="140" y="150" width="40" height="8" fill="#b59a72" />
        <rect x="132" y="158" width="56" height="8" fill="#9c8059" />
        <rect x="124" y="166" width="72" height="8" fill="#a98e66" />
        <rect x="116" y="174" width="88" height="8" fill="#92774f" />
        <rect x="108" y="182" width="104" height="18" fill="#9c8059" />
      </g>

      {/* main building */}
      <rect x="72" y="64" width="176" height="86" fill="#564a42" />
      <rect x="72" y="64" width="176" height="8" fill="#6e5f53" />
      <rect x="72" y="142" width="176" height="8" fill="#3e352f" />
      <rect x="64" y="56" width="192" height="10" fill="#2e2722" />
      {/* glass atrium */}
      <rect x="136" y="76" width="48" height="74" fill="#1f1a2e" />
      <rect x="140" y="80" width="40" height="66" fill="#ffb84d" />
      <rect x="146" y="86" width="28" height="20" fill="#ffd98a" />
      <rect x="150" y="120" width="20" height="30" fill="#ffe2a1" />
      {/* window rows */}
      <g fill="#ffb84d">
        <rect x="84" y="80" width="16" height="14" />
        <rect x="108" y="80" width="16" height="14" />
        <rect x="196" y="80" width="16" height="14" />
        <rect x="220" y="80" width="16" height="14" />
        <rect x="84" y="106" width="16" height="14" />
        <rect x="108" y="106" width="16" height="14" />
        <rect x="196" y="106" width="16" height="14" />
        <rect x="220" y="106" width="16" height="14" />
      </g>
      <g fill="#ffe2a1">
        <rect x="88" y="84" width="6" height="6" />
        <rect x="200" y="84" width="6" height="6" />
        <rect x="112" y="110" width="6" height="6" />
        <rect x="224" y="110" width="6" height="6" />
      </g>
      {/* sign */}
      <rect x="92" y="68" width="40" height="3" fill="#ffd98a" />
      <text
        x="160"
        y="73"
        textAnchor="middle"
        fontFamily="var(--font-press-start)"
        fontSize="7"
        fill="#ffd98a"
      >
        ITS
      </text>

      {/* flag */}
      <rect x="256" y="32" width="4" height="118" fill="#3e352f" />
      <rect x="260" y="36" width="24" height="14" fill="#4a66b0" />
      <rect x="260" y="36" width="24" height="4" fill="#6c86c8" />

      {/* trees */}
      <rect x="36" y="116" width="8" height="34" fill="#4a3018" />
      <g fill="#5d8636">
        <rect x="20" y="84" width="40" height="32" />
        <rect x="28" y="68" width="24" height="16" />
      </g>
      <rect x="24" y="88" width="14" height="10" fill="#6f9c44" />
      <rect x="292" y="120" width="8" height="30" fill="#4a3018" />
      <g fill="#5d8636">
        <rect x="278" y="88" width="36" height="32" />
        <rect x="286" y="72" width="20" height="16" />
      </g>

      {/* lanterns by the path */}
      {[100, 208].map((x) => (
        <g key={x}>
          <circle cx={x + 4} cy={150} r={14} fill="#ffb347" opacity={0.4} className="anim-glow" />
          <rect x={x + 2} y={146} width={4} height={28} fill="#3a2616" />
          <rect x={x} y={138} width={12} height={12} fill="#ffc257" />
          <rect x={x + 3} y={141} width={6} height={6} fill="#ffe6a8" />
          <rect x={x} y={134} width={12} height={4} fill="#2e1c10" />
        </g>
      ))}

      {/* flowers */}
      <g>
        <rect x="56" y="156" width="6" height="6" fill="#e0565e" />
        <rect x="244" y="160" width="6" height="6" fill="#c77bd1" />
        <rect x="24" y="168" width="6" height="6" fill="#f2a93b" />
        <rect x="284" y="170" width="6" height="6" fill="#f0eada" />
      </g>
    </svg>
  );
}
