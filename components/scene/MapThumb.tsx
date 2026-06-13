import { site } from "@/data/site";

/**
 * A little pixel "street map" with a red pin — the mini-map from the concept's
 * venue page. Tapping it opens the same Google Maps link as the View Map
 * button. Purely illustrative; not a real map tile.
 */
export function MapThumb() {
  return (
    <a
      href={site.venue.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${site.venue.mapLabel} in Google Maps`}
      className="pix group relative block aspect-square w-full overflow-hidden bg-outline p-1"
    >
      <span className="pix relative block h-full w-full overflow-hidden">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full transition-transform duration-200 group-hover:scale-105"
          shapeRendering="crispEdges"
          aria-hidden="true"
          focusable="false"
        >
          {/* land */}
          <rect width="120" height="120" fill="#d9d2bd" />
          {/* park blocks */}
          <rect x="6" y="8" width="30" height="26" fill="#bcd49a" />
          <rect x="84" y="74" width="30" height="30" fill="#bcd49a" />
          <rect x="74" y="10" width="22" height="20" fill="#cfe0b4" />
          {/* river */}
          <g fill="#9cc4dd">
            <rect x="92" y="0" width="12" height="40" />
            <rect x="80" y="36" width="14" height="18" />
            <rect x="70" y="50" width="14" height="20" />
            <rect x="60" y="64" width="14" height="22" />
            <rect x="52" y="84" width="14" height="36" />
          </g>
          {/* roads */}
          <g fill="#f4efe0">
            <rect x="0" y="44" width="120" height="8" />
            <rect x="0" y="86" width="120" height="8" />
            <rect x="34" y="0" width="8" height="120" />
            <rect x="0" y="20" width="120" height="5" />
          </g>
          <g fill="#c9c0a6">
            <rect x="0" y="47" width="120" height="2" />
            <rect x="37" y="0" width="2" height="120" />
          </g>
        </svg>

        {/* pin */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
          <svg
            viewBox="0 0 16 16"
            width={34}
            height={34}
            shapeRendering="crispEdges"
            aria-hidden="true"
            focusable="false"
            className="anim-floaty drop-shadow-[0_3px_0_rgba(10,5,2,0.4)]"
          >
            <g fill="#d9534f">
              <rect x="5" y="1" width="6" height="2" />
              <rect x="3" y="3" width="10" height="5" />
              <rect x="4" y="8" width="8" height="2" />
              <rect x="6" y="10" width="4" height="2" />
              <rect x="7" y="12" width="2" height="3" />
            </g>
            <rect x="6" y="4" width="4" height="3" fill="#2b1c12" />
            <rect x="6" y="3" width="2" height="2" fill="#f3a0a5" />
          </svg>
        </span>

        {/* label chip */}
        <span className="pix-sm absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-wood-deep/92 px-2.5 py-1 font-arcade text-[0.5rem] text-cream">
          {site.venue.mapLabel}
        </span>
      </span>
    </a>
  );
}
