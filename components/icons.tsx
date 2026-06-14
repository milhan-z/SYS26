/**
 * Hand-drawn 16×16 pixel icons.
 * Every icon is decorative by default (aria-hidden) — pair it with visible
 * text or pass your own aria-label via the wrapping element.
 */

type IconProps = {
  size?: number;
  className?: string;
};

function Px({
  children,
  size = 24,
  className,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Px {...props}>
      <rect x="1" y="2" width="14" height="13" fill="#f3e7c9" />
      <rect x="1" y="2" width="14" height="4" fill="#d9534f" />
      <rect x="4" y="0" width="2" height="4" fill="#8a8a8a" />
      <rect x="10" y="0" width="2" height="4" fill="#8a8a8a" />
      <rect x="1" y="14" width="14" height="1" fill="#b8a77e" />
      <g fill="#a3906a">
        <rect x="3" y="8" width="2" height="2" />
        <rect x="7" y="8" width="2" height="2" />
        <rect x="11" y="8" width="2" height="2" />
        <rect x="3" y="11" width="2" height="2" />
        <rect x="7" y="11" width="2" height="2" />
      </g>
      <rect x="11" y="11" width="2" height="2" fill="#d9534f" />
    </Px>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Px {...props}>
      <rect x="4" y="1" width="8" height="1" fill="#c9b88a" />
      <rect x="2" y="2" width="12" height="1" fill="#c9b88a" />
      <rect x="1" y="4" width="14" height="8" fill="#f3e7c9" />
      <rect x="2" y="3" width="12" height="10" fill="#f3e7c9" />
      <rect x="4" y="14" width="8" height="1" fill="#c9b88a" />
      <rect x="2" y="13" width="12" height="1" fill="#c9b88a" />
      <rect x="7" y="5" width="2" height="4" fill="#2b1c12" />
      <rect x="9" y="8" width="3" height="2" fill="#2b1c12" />
      <rect x="7" y="8" width="2" height="2" fill="#d9534f" />
    </Px>
  );
}

export function ShirtIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="#8cc152">
        <rect x="5" y="1" width="6" height="2" />
        <rect x="2" y="2" width="4" height="3" />
        <rect x="10" y="2" width="4" height="3" />
        <rect x="1" y="4" width="3" height="3" />
        <rect x="12" y="4" width="3" height="3" />
        <rect x="4" y="3" width="8" height="12" />
      </g>
      <g fill="#6da23e">
        <rect x="4" y="13" width="8" height="2" />
        <rect x="6" y="2" width="4" height="2" />
        <rect x="1" y="6" width="3" height="1" />
        <rect x="12" y="6" width="3" height="1" />
      </g>
      <rect x="7" y="7" width="2" height="2" fill="#a8d96c" />
    </Px>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="#d9534f">
        <rect x="5" y="1" width="6" height="2" />
        <rect x="3" y="3" width="10" height="5" />
        <rect x="4" y="8" width="8" height="2" />
        <rect x="6" y="10" width="4" height="2" />
        <rect x="7" y="12" width="2" height="3" />
      </g>
      <rect x="6" y="3" width="3" height="3" fill="#f3a0a5" />
      <rect x="6" y="4" width="4" height="3" fill="#2b1c12" />
    </Px>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <Px {...props}>
      <rect x="1" y="2" width="14" height="12" fill="#e9dcb6" />
      <rect x="5" y="2" width="1" height="12" fill="#c9b88a" />
      <rect x="10" y="2" width="1" height="12" fill="#c9b88a" />
      <g fill="#8cc152">
        <rect x="2" y="3" width="3" height="3" />
        <rect x="11" y="9" width="3" height="4" />
      </g>
      <g fill="#7db3d6">
        <rect x="2" y="9" width="2" height="4" />
        <rect x="6" y="4" width="4" height="2" />
      </g>
      <rect x="7" y="8" width="2" height="2" fill="#d9534f" />
    </Px>
  );
}

export function HeartIcon({
  size = 24,
  className,
  beat = false,
}: IconProps & { beat?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="#e0565e" className={beat ? "anim-heart" : undefined}>
        <rect x="2" y="3" width="4" height="2" />
        <rect x="10" y="3" width="4" height="2" />
        <rect x="1" y="5" width="14" height="4" />
        <rect x="2" y="9" width="12" height="2" />
        <rect x="4" y="11" width="8" height="2" />
        <rect x="6" y="13" width="4" height="2" />
        <rect x="3" y="4" width="2" height="2" fill="#f3a0a5" />
      </g>
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="#ffd98a">
        <rect x="7" y="1" width="2" height="4" />
        <rect x="7" y="11" width="2" height="4" />
        <rect x="1" y="7" width="4" height="2" />
        <rect x="11" y="7" width="4" height="2" />
        <rect x="6" y="6" width="4" height="4" />
      </g>
      <rect x="7" y="7" width="2" height="2" fill="#fff8e1" />
    </Px>
  );
}

export function CameraIcon(props: IconProps) {
  return (
    <Px {...props}>
      <rect x="1" y="4" width="14" height="10" fill="#57422c" />
      <rect x="5" y="2" width="6" height="2" fill="#57422c" />
      <rect x="1" y="4" width="14" height="2" fill="#6f5638" />
      <rect x="5" y="6" width="6" height="6" fill="#2b1c12" />
      <rect x="6" y="7" width="4" height="4" fill="#7db3d6" />
      <rect x="6" y="7" width="2" height="2" fill="#cfe8f7" />
      <rect x="12" y="5" width="2" height="2" fill="#ffd98a" />
    </Px>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="7" y="1" width="2" height="9" />
        <rect x="3" y="7" width="2" height="3" />
        <rect x="11" y="7" width="2" height="3" />
        <rect x="5" y="9" width="2" height="3" />
        <rect x="9" y="9" width="2" height="3" />
        <rect x="7" y="11" width="2" height="3" />
      </g>
    </Px>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="2" y="4" width="2" height="10" />
        <rect x="2" y="12" width="10" height="2" />
        <rect x="10" y="9" width="2" height="3" />
        <rect x="2" y="4" width="3" height="2" />
        <rect x="8" y="2" width="6" height="2" />
        <rect x="12" y="2" width="2" height="6" />
        <rect x="9" y="5" width="2" height="2" />
        <rect x="7" y="7" width="2" height="2" />
      </g>
    </Px>
  );
}

export function LanternIcon(props: IconProps) {
  return (
    <Px {...props}>
      <rect x="6" y="0" width="4" height="2" fill="#57422c" />
      <rect x="7" y="2" width="2" height="1" fill="#2b1c12" />
      <g fill="#f5b942">
        <rect x="4" y="3" width="8" height="9" />
      </g>
      <rect x="5" y="4" width="6" height="7" fill="#ffd98a" />
      <rect x="6" y="5" width="4" height="4" fill="#fff3cf" />
      <rect x="4" y="12" width="8" height="2" fill="#57422c" />
      <rect x="6" y="14" width="4" height="1" fill="#2b1c12" />
    </Px>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="2" y="3" width="12" height="2" />
        <rect x="2" y="7" width="12" height="2" />
        <rect x="2" y="11" width="12" height="2" />
      </g>
    </Px>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="3" y="3" width="3" height="3" />
        <rect x="10" y="3" width="3" height="3" />
        <rect x="5" y="5" width="3" height="3" />
        <rect x="8" y="5" width="3" height="3" />
        <rect x="6" y="7" width="4" height="2" />
        <rect x="5" y="8" width="3" height="3" />
        <rect x="8" y="8" width="3" height="3" />
        <rect x="3" y="10" width="3" height="3" />
        <rect x="10" y="10" width="3" height="3" />
      </g>
    </Px>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="9" y="2" width="3" height="3" />
        <rect x="7" y="4" width="3" height="3" />
        <rect x="5" y="6" width="3" height="4" />
        <rect x="7" y="9" width="3" height="3" />
        <rect x="9" y="11" width="3" height="3" />
      </g>
    </Px>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="4" y="2" width="3" height="3" />
        <rect x="6" y="4" width="3" height="3" />
        <rect x="8" y="6" width="3" height="4" />
        <rect x="6" y="9" width="3" height="3" />
        <rect x="4" y="11" width="3" height="3" />
      </g>
    </Px>
  );
}

/** Pixel emblem used in the HUD — a heart shield on wood. */
export function Emblem({ size = 36, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="20" height="20" fill="#160d07" />
      <rect x="1" y="1" width="18" height="18" fill="#3a2a1c" />
      <rect x="1" y="1" width="18" height="2" fill="#57422c" />
      <rect x="1" y="17" width="18" height="2" fill="#241910" />
      <g fill="#e0565e">
        <rect x="5" y="5" width="4" height="2" />
        <rect x="11" y="5" width="4" height="2" />
        <rect x="4" y="7" width="12" height="3" />
        <rect x="5" y="10" width="10" height="2" />
        <rect x="7" y="12" width="6" height="2" />
        <rect x="9" y="14" width="2" height="2" />
      </g>
      <rect x="5" y="6" width="2" height="2" fill="#f3a0a5" />
    </svg>
  );
}

export function LinkIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="6" y="7" width="4" height="2" />
        <rect x="2" y="5" width="3" height="2" />
        <rect x="2" y="9" width="3" height="2" />
        <rect x="1" y="6" width="2" height="4" />
        <rect x="4" y="7" width="3" height="2" />
        <rect x="11" y="5" width="3" height="2" />
        <rect x="11" y="9" width="3" height="2" />
        <rect x="13" y="6" width="2" height="4" />
        <rect x="9" y="7" width="3" height="2" />
      </g>
    </Px>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        {/* back page */}
        <rect x="6" y="2" width="8" height="2" />
        <rect x="6" y="2" width="2" height="7" />
        <rect x="12" y="2" width="2" height="7" />
        <rect x="6" y="8" width="3" height="2" />
        <rect x="12" y="8" width="2" height="2" />
        {/* front page */}
        <rect x="2" y="6" width="9" height="2" />
        <rect x="2" y="6" width="2" height="8" />
        <rect x="9" y="6" width="2" height="8" />
        <rect x="2" y="12" width="9" height="2" />
      </g>
    </Px>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="2" y="7" width="2" height="2" />
        <rect x="4" y="9" width="2" height="2" />
        <rect x="6" y="11" width="2" height="2" />
        <rect x="8" y="8" width="2" height="3" />
        <rect x="10" y="5" width="2" height="3" />
        <rect x="12" y="3" width="2" height="3" />
      </g>
    </Px>
  );
}

export function SoundOnIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        {/* speaker box + cone */}
        <rect x="1" y="6" width="3" height="4" />
        <rect x="4" y="5" width="1" height="6" />
        <rect x="5" y="4" width="1" height="8" />
        <rect x="6" y="3" width="1" height="10" />
        {/* sound waves */}
        <rect x="9" y="6" width="1" height="4" />
        <rect x="11" y="5" width="1" height="6" />
        <rect x="13" y="3" width="1" height="10" />
      </g>
    </Px>
  );
}

export function SoundOffIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        {/* speaker box + cone */}
        <rect x="1" y="6" width="3" height="4" />
        <rect x="4" y="5" width="1" height="6" />
        <rect x="5" y="4" width="1" height="8" />
        <rect x="6" y="3" width="1" height="10" />
        {/* a little "x" where the waves were */}
        <rect x="10" y="6" width="1" height="1" />
        <rect x="11" y="7" width="1" height="1" />
        <rect x="12" y="8" width="1" height="1" />
        <rect x="13" y="9" width="1" height="1" />
        <rect x="13" y="6" width="1" height="1" />
        <rect x="12" y="7" width="1" height="1" />
        <rect x="11" y="8" width="1" height="1" />
        <rect x="10" y="9" width="1" height="1" />
      </g>
    </Px>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Px {...props}>
      <g fill="currentColor">
        <rect x="7" y="1" width="2" height="2" />
        <rect x="4" y="3" width="8" height="2" />
        <rect x="2" y="5" width="12" height="1" />
        <rect x="1" y="6" width="14" height="2" />
        <rect x="2" y="8" width="2" height="5" />
        <rect x="5" y="8" width="2" height="5" />
        <rect x="9" y="8" width="2" height="5" />
        <rect x="12" y="8" width="2" height="5" />
        <rect x="1" y="13" width="14" height="2" />
      </g>
    </Px>
  );
}
