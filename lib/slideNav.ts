/**
 * Jump to a slide cleanly — no scroll-snap "stutter".
 *
 * The page is a CSS scroll-snap deck (`scroll-snap-type: y proximity` +
 * `scroll-behavior: smooth` on <html>). A programmatic smooth-scroll across
 * several slides travels through the snap points in between, and the browser
 * keeps trying to re-snap mid-flight — so a multi-slide jump (e.g. from the
 * Quest menu) judders and sometimes stalls partway ("nyangkut").
 *
 * The fix: switch snapping off for the duration of the jump, then turn it back
 * on once the scroll has actually come to rest. We detect "at rest" by watching
 * the position settle (scrollend isn't supported on older iOS Safari), with a
 * hard safety timeout so snapping is always restored.
 */
let restoreTimer = 0;
// bumped on every call so a rapid second jump supersedes the first — an older
// watcher must never restore snapping while a newer jump is still in flight
let gen = 0;

export function goToSection(id: string) {
  if (typeof document === "undefined") return;
  const target = document.getElementById(id);
  if (!target) return;

  const root = document.documentElement;
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const myGen = ++gen;

  // pause snapping so the jump doesn't catch on the slides in between
  root.style.scrollSnapType = "none";
  window.clearTimeout(restoreTimer);

  target.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start",
  });

  if (reduce) {
    root.style.scrollSnapType = "";
    return;
  }

  // where the viewport should end up (absolute, captured before it moves)
  const desired = Math.round(window.scrollY + target.getBoundingClientRect().top);

  let stable = 0;
  let done = false;
  const finish = () => {
    if (done || myGen !== gen) return; // a newer jump now owns the scroll
    done = true;
    window.clearTimeout(restoreTimer);
    root.style.scrollSnapType = "";
  };

  const watch = () => {
    if (done || myGen !== gen) return; // superseded — stop this watcher
    // only settle once we've truly reached the destination, so we never
    // re-enable snap before the smooth-scroll has even begun moving
    if (Math.abs(window.scrollY - desired) < 2) {
      if (++stable >= 2) {
        finish();
        return;
      }
    } else {
      stable = 0;
    }
    requestAnimationFrame(watch);
  };
  requestAnimationFrame(watch);

  // safety net: restore snapping no matter what (e.g. the user grabs the scroll
  // mid-jump and we never reach `desired`)
  restoreTimer = window.setTimeout(finish, 2000);
}
