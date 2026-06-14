"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { Emblem, ChevronRightIcon, HeartIcon } from "@/components/icons";

type Phase = "loading" | "ready" | "leaving";

/**
 * The immersive opening — a game-style "title screen" painted over the live
 * sunset world (the Hero's scene shows through the vignette). A pixel
 * "Loading world…" bar fills, then becomes a pulsing "Tap to Enter" button.
 *
 * Entering lifts the vignette and hands off to the Hero: it toggles
 * `<html class="entered">`, which CSS uses to choreograph the title reveal and
 * glide the HUD + page-nav into place (see globals.css → "Experience intro").
 *
 * The whole experience is opt-in on `<html class="js pre-enter">` (set by an
 * inline script in layout.tsx), so without JavaScript the gate never shows and
 * the page is fully readable and scrollable.
 */
export function IntroGate() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [mounted, setMounted] = useState(true);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const enteredRef = useRef(false);

  // Decide the opening beat: a short "loading" pause for the scene to breathe,
  // or — for reduced-motion — skip straight to the Enter prompt.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);
    if (prefersReduced) {
      setPhase("ready");
      return;
    }
    const t = setTimeout(() => setPhase("ready"), 1600);
    return () => clearTimeout(t);
  }, []);

  const enter = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;

    // start the music — must happen inside this user gesture (autoplay rules)
    window.dispatchEvent(new CustomEvent("sys:enter"));

    const root = document.documentElement;
    root.classList.remove("pre-enter");
    root.classList.add("entered");
    setPhase("leaving");

    // hand keyboard focus to the content once the curtain lifts
    window.setTimeout(() => {
      document.getElementById("main")?.focus?.();
    }, 60);
    // unmount after the fade so it leaves nothing behind
    window.setTimeout(() => setMounted(false), reduced ? 0 : 900);
  }, [reduced]);

  // let "Enter"/"Space" trigger it too, for keyboard users
  useEffect(() => {
    if (!mounted) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        enter();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mounted, enter]);

  if (!mounted) return null;

  return (
    <div
      ref={rootRef}
      className="intro-gate"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome — ${site.hero.title}`}
      onClick={enter}
    >
      <div className="intro-vignette" aria-hidden="true" />

      <div className="intro-content">
        {/* framed emblem */}
        <span className="intro-emblem pix bg-outline/80 p-1.5">
          <span className="pix block bg-wood p-2">
            <Emblem size={46} />
          </span>
        </span>

        <p className="intro-kicker pix-sm panel-parchment px-4 py-1.5 font-arcade text-[0.55rem] text-ink sm:text-[0.62rem]">
          {site.hero.kicker}
        </p>

        <p className="intro-brand font-pixel text-2xl font-semibold text-glow text-pixel-shadow-sm sm:text-3xl">
          {site.brand.name}
        </p>

        <span className="intro-divider" aria-hidden="true">
          <span className="pixel-rule w-10 text-cream/80" />
          <HeartIcon size={16} beat />
          <span className="pixel-rule w-10 text-cream/80" />
        </span>

        {/* loading bar → enter prompt */}
        <div className="intro-action">
          {phase === "loading" && !reduced ? (
            <div className="intro-loader" aria-live="polite">
              <span className="pix-sm intro-bar" aria-hidden="true">
                <span className="intro-bar-fill" />
              </span>
              <span className="font-arcade text-[0.5rem] tracking-widest text-cream/80">
                LOADING WORLD…
              </span>
            </div>
          ) : (
            <button
              type="button"
              autoFocus
              onClick={(e) => {
                e.stopPropagation();
                enter();
              }}
              className="intro-enter pixel-btn pix pixel-btn--amber"
            >
              <span className="pixel-btn-face pix-sm" aria-hidden="true" />
              <span className="pixel-btn-label">
                Tap to Enter <ChevronRightIcon size={14} />
              </span>
            </button>
          )}
        </div>

        <p className="intro-hint font-arcade text-[0.46rem] tracking-wide text-cream/55">
          an invitation awaits
        </p>
      </div>
    </div>
  );
}
