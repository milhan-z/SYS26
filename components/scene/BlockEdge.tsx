/**
 * Jagged voxel terrain edge used to transition between sections —
 * the previous section's ground "bites" into the next one.
 */
export function BlockEdge({
  fill,
  id,
  flip = false,
  className,
}: {
  /** Color of the blocks (usually the *previous* section's ground color). */
  fill: string;
  /** Unique id per usage (SVG pattern ids are global on the page). */
  id: string;
  /** Flip vertically (blocks point upward instead of hanging down). */
  flip?: boolean;
  className?: string;
}) {
  const patternId = `block-edge-${id}`;
  return (
    <svg
      className={`block h-6 w-full ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <defs>
        <pattern
          id={patternId}
          width="64"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <g fill={fill}>
            <rect x="0" y="0" width="16" height="10" />
            <rect x="16" y="0" width="16" height="24" />
            <rect x="32" y="0" width="16" height="14" />
            <rect x="48" y="0" width="16" height="20" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
