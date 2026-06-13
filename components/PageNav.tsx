"use client";

import { useCallback, useEffect, useState } from "react";
import { SECTIONS } from "@/data/site";
import {
  ArrowDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons";

/**
 * Fixed bottom navigator that turns the page into a slide deck: prev/next
 * arrows, an "N / 5" counter, progress dots, and a "scroll to continue"
 * hint. The active slide is tracked with an IntersectionObserver so the
 * counter and dots always reflect what's on screen — whether the visitor
 * scrolls, swipes, taps an arrow, or jumps from the quest menu.
 */
export function PageNav() {
  const [active, setActive] = useState(0);
  const total = SECTIONS.length;

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(total - 1, index));
      document
        .getElementById(SECTIONS[clamped].id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [total],
  );

  const isFirst = active === 0;
  const isLast = active === total - 1;

  return (
    <nav
      aria-label="Slide navigation"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-2 bg-gradient-to-t from-wood-deep/95 via-wood-deep/70 to-transparent px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-7"
    >
      {/* arrows + counter */}
      <div className="pointer-events-auto pix bg-outline p-1">
        <div className="pix panel-wood flex items-center gap-1 px-1.5 py-1">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={isFirst}
            aria-label="Previous page"
            className="pix-sm flex size-10 items-center justify-center text-gold transition-colors enabled:hover:bg-wood-light disabled:cursor-not-allowed disabled:text-cream/20"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <span className="min-w-[3.6rem] text-center font-arcade text-[0.72rem] text-gold text-pixel-shadow-sm">
            {active + 1} / {total}
          </span>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={isLast}
            aria-label="Next page"
            className="pix-sm flex size-10 items-center justify-center text-gold transition-colors enabled:hover:bg-wood-light disabled:cursor-not-allowed disabled:text-cream/20"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      {/* progress dots */}
      <ol className="flex items-center gap-1.5" aria-hidden="true">
        {SECTIONS.map((section, index) => (
          <li
            key={section.id}
            className={
              index === active
                ? "h-2 w-5 bg-gold transition-all"
                : "size-2 bg-cream/30 transition-all"
            }
          />
        ))}
      </ol>

      {/* scroll hint / final marker */}
      <p className="flex items-center gap-1.5 font-arcade text-[0.5rem] text-cream/85 text-pixel-shadow-sm">
        {isLast ? (
          <span>
            page {total} of {total}
          </span>
        ) : (
          <>
            <span className="anim-bob text-glow">
              <ArrowDownIcon size={13} />
            </span>
            <span>scroll to continue</span>
          </>
        )}
      </p>
    </nav>
  );
}
