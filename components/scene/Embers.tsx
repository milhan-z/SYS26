/**
 * A sparse layer of pixel "embers" (fireflies) drifting up through the hero —
 * the warm dust of golden hour. Pure CSS transform/opacity animation, so it's
 * cheap and pauses under prefers-reduced-motion. Purely decorative.
 *
 * Positions/timings are a fixed hand-picked set (no randomness) so the server
 * and client render identically — no hydration mismatch.
 */
const EMBERS: Array<{
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  warm: boolean;
}> = [
  { left: 8, size: 4, delay: 0, duration: 9, drift: 14, warm: true },
  { left: 18, size: 3, delay: 2.4, duration: 11, drift: -10, warm: false },
  { left: 27, size: 5, delay: 5.1, duration: 8.5, drift: 18, warm: true },
  { left: 39, size: 3, delay: 1.2, duration: 12, drift: -16, warm: true },
  { left: 48, size: 4, delay: 6.5, duration: 10, drift: 10, warm: false },
  { left: 57, size: 3, delay: 3.3, duration: 13, drift: -12, warm: true },
  { left: 66, size: 5, delay: 7.8, duration: 9.5, drift: 20, warm: true },
  { left: 74, size: 3, delay: 0.8, duration: 11.5, drift: -8, warm: false },
  { left: 83, size: 4, delay: 4.6, duration: 10.5, drift: 16, warm: true },
  { left: 92, size: 3, delay: 2.0, duration: 12.5, drift: -14, warm: true },
];

export function Embers() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      aria-hidden="true"
    >
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              background: e.warm ? "var(--color-glow)" : "var(--color-gold)",
              animationDelay: `${e.delay}s`,
              animationDuration: `${e.duration}s`,
              "--drift": `${e.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
