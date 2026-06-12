/**
 * Pixel-art stand-in shown inside a polaroid frame until the real photo
 * is added to /public/images/gallery and referenced in data/site.ts.
 * Each slot gets a slightly different little scene.
 */

const MOTIFS = [
  // heart
  <g key="heart" fill="#e0565e">
    <rect x="58" y="42" width="14" height="8" />
    <rect x="88" y="42" width="14" height="8" />
    <rect x="52" y="50" width="56" height="14" />
    <rect x="58" y="64" width="44" height="8" />
    <rect x="66" y="72" width="28" height="8" />
    <rect x="74" y="80" width="12" height="6" />
    <rect x="60" y="46" width="8" height="6" fill="#f3a0a5" />
  </g>,
  // star
  <g key="star" fill="#f5b942">
    <rect x="74" y="36" width="12" height="14" />
    <rect x="48" y="50" width="64" height="12" />
    <rect x="58" y="62" width="44" height="10" />
    <rect x="54" y="72" width="18" height="12" />
    <rect x="88" y="72" width="18" height="12" />
    <rect x="76" y="40" width="6" height="6" fill="#ffe3a3" />
  </g>,
  // sun over water
  <g key="sun">
    <rect x="66" y="40" width="28" height="8" fill="#ffce73" />
    <rect x="58" y="48" width="44" height="14" fill="#ffce73" />
    <rect x="40" y="62" width="80" height="6" fill="#f08a4b" />
    <rect x="48" y="72" width="22" height="5" fill="#ffd27a" />
    <rect x="86" y="72" width="26" height="5" fill="#ffd27a" />
    <rect x="62" y="81" width="30" height="5" fill="#f0a35e" />
  </g>,
  // lantern
  <g key="lantern">
    <rect x="72" y="34" width="16" height="5" fill="#7c4a1e" />
    <rect x="66" y="39" width="28" height="34" fill="#f5a23c" />
    <rect x="70" y="43" width="20" height="26" fill="#ffc257" />
    <rect x="75" y="49" width="10" height="14" fill="#fff6da" />
    <rect x="70" y="73" width="20" height="6" fill="#7c4a1e" />
  </g>,
  // flower
  <g key="flower">
    <rect x="70" y="38" width="20" height="20" fill="#c77bd1" />
    <rect x="76" y="44" width="8" height="8" fill="#ffe3a3" />
    <rect x="76" y="58" width="8" height="22" fill="#3f6b2a" />
    <rect x="62" y="64" width="14" height="6" fill="#56853a" />
    <rect x="84" y="70" width="14" height="6" fill="#56853a" />
  </g>,
  // flag on a hill
  <g key="flag">
    <rect x="60" y="68" width="40" height="16" fill="#56853a" />
    <rect x="76" y="36" width="4" height="34" fill="#4a3018" />
    <rect x="80" y="38" width="22" height="12" fill="#e0565e" />
    <rect x="80" y="38" width="22" height="4" fill="#f3a0a5" />
  </g>,
];

export function MemoryPlaceholder({ seed }: { seed: number }) {
  const motif = MOTIFS[seed % MOTIFS.length];
  return (
    <svg
      viewBox="0 0 160 120"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="160" height="120" fill="#42302a" />
      <rect width="160" height="60" fill="#4d3730" />
      <rect y="96" width="160" height="24" fill="#382722" />
      {/* film grain pixels */}
      <g fill="#5a423a">
        <rect x="16" y="18" width="6" height="6" />
        <rect x="132" y="30" width="6" height="6" />
        <rect x="28" y="92" width="6" height="6" />
        <rect x="118" y="86" width="6" height="6" />
        <rect x="146" y="58" width="6" height="6" />
        <rect x="8" y="56" width="6" height="6" />
      </g>
      {motif}
      {/* "developing…" dots */}
      <g fill="#d9c693" opacity="0.8">
        <rect x="64" y="102" width="6" height="6" />
        <rect x="77" y="102" width="6" height="6" className="anim-twinkle" />
        <rect
          x="90"
          y="102"
          width="6"
          height="6"
          className="anim-twinkle"
          style={{ animationDelay: "0.8s" }}
        />
      </g>
    </svg>
  );
}
