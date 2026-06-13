"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "@/data/site";
import { MemoryPlaceholder } from "@/components/scene/MemoryPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HeartIcon,
} from "@/components/icons";

const TILT = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];

function Polaroid({
  item,
  index,
  onOpen,
}: {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
}) {
  return (
    <Reveal delay={(index % 3) * 90}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`View memory: ${item.caption}`}
        className={`group relative block w-full ${TILT[index % TILT.length]} transition-transform duration-200 hover:rotate-0 hover:scale-[1.03] focus-visible:rotate-0`}
      >
        {/* tape */}
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 rotate-3 bg-parchment/70"
        />
        <span className="pix block bg-outline p-1">
          <span className="pix block bg-cream p-1.5 pb-2.5 sm:p-2 sm:pb-3">
            <span className="relative block aspect-[3/2] overflow-hidden bg-wood-dark">
              {item.src ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover"
                />
              ) : (
                <MemoryPlaceholder seed={index} />
              )}
            </span>
            <span className="mt-1.5 flex items-center justify-between gap-2 px-1">
              <span className="font-pixel text-sm leading-tight text-ink sm:text-base">
                {item.caption}
              </span>
              <HeartIcon size={15} className="shrink-0" />
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

/**
 * Polaroid wall + lightbox. Tap a photo to view it large; swipe or use
 * the arrows (or arrow keys) to browse, Escape/✕ to close.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((current) =>
        current === null
          ? current
          : (current + dir + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const active = open === null ? null : items[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-5 sm:gap-y-5 lg:grid-cols-3">
        {items.map((item, index) => (
          <li key={index}>
            <Polaroid item={item} index={index} onOpen={setOpen} />
          </li>
        ))}
      </ul>

      {active !== null && open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Memory ${open + 1} of ${items.length}: ${active.caption}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0804]/93 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = touchStartX.current;
            touchStartX.current = null;
            const endX = event.changedTouches[0]?.clientX;
            if (startX === null || endX === undefined) return;
            const delta = endX - startX;
            if (Math.abs(delta) > 48) step(delta < 0 ? 1 : -1);
          }}
        >
          <div className="pix w-full max-w-lg bg-outline p-1">
            <div className="pix bg-cream p-2.5 pb-4 sm:p-3 sm:pb-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-wood-dark">
                {active.src ? (
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="(min-width: 640px) 512px, 92vw"
                    className="object-cover"
                  />
                ) : (
                  <MemoryPlaceholder seed={open} />
                )}
              </div>
              <p className="mt-3 px-1 text-center font-pixel text-lg text-ink">
                {active.caption}
              </p>
            </div>
          </div>

          <div className="mt-4 flex w-full max-w-lg items-center justify-between">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous memory"
              className="pix-sm flex size-12 items-center justify-center bg-wood text-cream hover:text-gold"
            >
              <ChevronLeftIcon size={22} />
            </button>
            <span className="font-arcade text-[0.65rem] text-cream/85">
              {open + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next memory"
              className="pix-sm flex size-12 items-center justify-center bg-wood text-cream hover:text-gold"
            >
              <ChevronRightIcon size={22} />
            </button>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close memory viewer"
            className="pix-sm absolute right-4 top-4 flex size-12 items-center justify-center bg-wood text-cream hover:text-gold"
          >
            <CloseIcon size={22} />
          </button>
        </div>
      ) : null}
    </>
  );
}
