"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SECTIONS, site } from "@/data/site";
import { CloseIcon, Emblem, HeartIcon, MenuIcon } from "@/components/icons";

/**
 * Fixed game-HUD header: framed emblem + title on the left, a "quest log"
 * menu on the right for jumping between the five chapters.
 */
export function Hud() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // menu: Escape to close, lock body scroll, focus first item
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="pix mx-auto max-w-3xl bg-outline/90 p-1 backdrop-blur-[2px]">
          <div className="pix panel-wood flex items-center justify-between gap-3 px-2.5 py-2 sm:px-3">
            <a
              href="#invitation"
              className="flex min-h-11 items-center gap-2.5"
              aria-label={`${site.brand.name} — back to top`}
            >
              <span className="pix-sm shrink-0 bg-outline/70 p-1">
                <span className="pix-sm block">
                  <Emblem size={30} />
                </span>
              </span>
              <span className="font-arcade text-[0.58rem] leading-relaxed text-cream sm:text-[0.66rem]">
                {site.brand.name}
              </span>
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="quest-menu"
              aria-label={menuOpen ? "Close chapter menu" : "Open chapter menu"}
              className="pix-sm flex size-11 items-center justify-center bg-wood-dark text-gold transition-colors hover:bg-wood-light"
            >
              {menuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* quest-log menu */}
      {menuOpen ? (
        <div
          id="quest-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Chapter menu"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#0d0804]/88 px-4 pb-10 pt-20"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div className="pix w-full max-w-sm bg-outline p-1">
            <div className="pix panel-wood p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-arcade text-[0.65rem] text-gold">
                  ⭐ QUEST LOG
                </h2>
                <button
                  type="button"
                  onClick={() => closeMenu()}
                  aria-label="Close chapter menu"
                  className="pix-sm flex size-10 items-center justify-center bg-wood-dark text-cream hover:text-gold"
                >
                  <CloseIcon size={18} />
                </button>
              </div>
              <nav aria-label="Page chapters">
                <ul className="flex flex-col gap-2">
                  {SECTIONS.map((section, index) => (
                    <li key={section.id}>
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`#${section.id}`}
                        onClick={() => closeMenu(false)}
                        className="pix-sm group flex min-h-12 items-center gap-3 bg-wood-dark px-4 py-2.5 transition-colors hover:bg-wood-light"
                      >
                        <span className="font-arcade text-[0.6rem] text-gold/80">
                          {section.num}
                        </span>
                        <span className="font-pixel text-lg text-cream group-hover:text-glow">
                          {section.label}
                        </span>
                        <HeartIcon
                          size={14}
                          className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
