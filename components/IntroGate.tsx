"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { DuskLanterns } from "@/components/scene/DuskLanterns";
import { Emblem, ChevronRightIcon, HeartIcon } from "@/components/icons";

type Phase = "loading" | "ready" | "leaving";

/**
 * The landing screen — a clean, fully opaque title page with its own starry
 * backdrop (it does NOT show the hero through it, so it stays tidy on every
 * phone). A pixel "Loading world…" bar fills, then an "Open Invitation" button
 * appears. Pressing it starts the music (must be inside this tap — autoplay
 * rules) and lifts the curtain to reveal the hero.
 *
 * Gated on `<html class="js pre-enter">` (set pre-paint in layout.tsx); without
 * JavaScript the landing never shows and the page is a normal document.
 */
export function IntroGate() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [mounted, setMounted] = useState(true);
  const [reduced, setReduced] = useState(false);
  const enteredRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReduced(prefersReduced);
    // a fresh open / reload always begins at the top of the landing
    window.scrollTo(0, 0);
    if (prefersReduced) {
      setPhase("ready");
      return;
    }
    const t = setTimeout(() => setPhase("ready"), 1000);
    return () => clearTimeout(t);
  }, []);

  const enter = useCallback(() => {
    if (enteredRef.current) return;
    enteredRef.current = true;

    // start the music — must happen inside this user gesture (autoplay rules)
    window.dispatchEvent(new CustomEvent("sys:enter"));

    const root = document.documentElement;
    window.scrollTo(0, 0);
    root.classList.remove("pre-enter");
    root.classList.add("entered");
    setPhase("leaving");

    window.setTimeout(() => {
      document.getElementById("main")?.focus?.();
    }, 60);
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
      className="intro-gate"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome — ${site.hero.title}`}
      onClick={enter}
    >
      {/* opaque, self-contained backdrop — the same world the hero opens into */}
      <DuskLanterns />
      <div className="intro-scrim" aria-hidden="true" />

      <div className="intro-content">
        <span className="intro-emblem pix bg-outline/80 p-1.5">
          <span className="pix block bg-wood p-2">
            <Emblem size={42} />
          </span>
        </span>

        <p className="intro-kicker pix-sm panel-parchment px-4 py-1.5 font-arcade text-ink">
          {site.hero.kicker}
        </p>

        <p className="intro-brand font-pixel font-semibold text-glow text-pixel-shadow-sm">
          {site.brand.name}
        </p>

        <span className="intro-divider" aria-hidden="true">
          <span className="pixel-rule w-10 text-cream/80" />
          <HeartIcon size={16} beat />
          <span className="pixel-rule w-10 text-cream/80" />
        </span>

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
              onClick={enter}
              className="intro-enter pixel-btn pix pixel-btn--amber"
            >
              <span className="pixel-btn-face pix-sm" aria-hidden="true" />
              <span className="pixel-btn-label">
                Open Invitation <ChevronRightIcon size={14} />
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
