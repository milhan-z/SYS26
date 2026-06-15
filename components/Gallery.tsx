"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { MemoryAlbum, GalleryPhoto } from "@/data/site";
import { MemoryPlaceholder } from "@/components/scene/MemoryPlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";
import { blurData } from "@/data/blurData";

/** Smooth fade-in: a tiny base64 preview while the real photo loads. */
function blurProps(src: string) {
  const blurDataURL = blurData[src];
  return blurDataURL
    ? ({ placeholder: "blur", blurDataURL } as const)
    : ({ placeholder: "empty" } as const);
}
import {
  CameraIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HeartIcon,
} from "@/components/icons";

const TILT = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];

/* ── Level 1: an album cover on the wall ──────────────────────────────────── */
function AlbumCover({
  album,
  index,
  onOpen,
  coverRef,
}: {
  album: MemoryAlbum;
  index: number;
  onOpen: (index: number) => void;
  coverRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <Reveal delay={(index % 3) * 90}>
      <button
        ref={coverRef}
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open album: ${album.title} — ${album.photos.length} photos`}
        className={`group relative block w-full ${TILT[index % TILT.length]} transition-transform duration-200 hover:rotate-0 hover:scale-[1.03] focus-visible:rotate-0`}
      >
        {/* a little pile behind, hinting there's more than one photo inside */}
        <span
          aria-hidden="true"
          className="pix absolute inset-0 translate-x-[6px] translate-y-[6px] rotate-3 bg-cream/35"
        />
        <span
          aria-hidden="true"
          className="pix absolute inset-0 translate-x-[3px] translate-y-[3px] rotate-2 bg-cream/60"
        />
        {/* tape */}
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-1/2 z-10 h-5 w-16 -translate-x-1/2 rotate-3 bg-parchment/70"
        />
        <span className="pix relative block bg-outline p-1">
          <span className="pix block bg-cream p-1.5 pb-2.5 sm:p-2 sm:pb-3">
            <span className="relative block aspect-[3/2] overflow-hidden bg-wood-dark">
              {album.cover ? (
                <Image
                  src={album.cover}
                  alt={album.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover"
                  {...blurProps(album.cover)}
                />
              ) : (
                <MemoryPlaceholder seed={index} />
              )}
              {/* photo-count badge */}
              <span className="pix-sm absolute right-1.5 top-1.5 flex items-center gap-1 bg-wood-deep/85 px-1.5 py-0.5 font-arcade text-[0.5rem] text-cream">
                <CameraIcon size={11} /> {album.photos.length}
              </span>
            </span>
            <span className="mt-1.5 flex items-center justify-between gap-2 px-1">
              <span className="font-pixel text-sm leading-tight text-ink sm:text-base">
                {album.title}
              </span>
              <HeartIcon size={15} className="shrink-0" />
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

/* ── Level 2: a photo thumbnail inside the open album ─────────────────────── */
function PhotoThumb({
  photo,
  index,
  albumIndex,
  onOpen,
}: {
  photo: GalleryPhoto;
  index: number;
  albumIndex: number;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`View photo: ${photo.caption ?? photo.alt}`}
      className={`group block w-full ${TILT[index % TILT.length]} transition-transform duration-200 hover:rotate-0 hover:scale-[1.03] focus-visible:rotate-0`}
    >
      <span className="pix block bg-outline p-1">
        <span className="pix block bg-cream p-1.5 pb-2 sm:p-2 sm:pb-2.5">
          <span className="relative block aspect-[3/2] overflow-hidden bg-wood-dark">
            {photo.src ? (
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                className="object-cover"
                {...blurProps(photo.src)}
              />
            ) : (
              <MemoryPlaceholder seed={albumIndex * 3 + index} />
            )}
          </span>
          {photo.caption ? (
            <span className="mt-1 block px-1 text-center font-pixel text-xs leading-tight text-ink sm:text-sm">
              {photo.caption}
            </span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

/**
 * The memory wall — a grid of album covers (one per moment). Tapping a cover
 * opens that album's photos; tapping a photo opens it full-size with prev/next
 * (swipe, ◄ ► arrows, or keys), Escape/✕ steps back out.
 */
export function Gallery({ albums }: { albums: MemoryAlbum[] }) {
  const [albumIndex, setAlbumIndex] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);

  const coverRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const albumCloseRef = useRef<HTMLButtonElement>(null);
  const photoCloseRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const album = albumIndex === null ? null : albums[albumIndex];
  const photos = album?.photos ?? [];
  const photo = photoIndex === null ? null : photos[photoIndex];

  const openAlbum = useCallback((index: number) => setAlbumIndex(index), []);
  const closeAlbum = useCallback(() => {
    const restore = albumIndex;
    setPhotoIndex(null);
    setAlbumIndex(null);
    if (restore !== null) {
      requestAnimationFrame(() => coverRefs.current[restore]?.focus());
    }
  }, [albumIndex]);

  const openPhoto = useCallback((index: number) => setPhotoIndex(index), []);
  const closePhoto = useCallback(() => setPhotoIndex(null), []);
  const stepPhoto = useCallback(
    (dir: 1 | -1) =>
      setPhotoIndex((current) =>
        current === null ? current : (current + dir + photos.length) % photos.length,
      ),
    [photos.length],
  );

  // scroll lock + Escape / arrow keys, scoped to whichever layer is on top
  useEffect(() => {
    if (albumIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (photoIndex !== null) {
        if (event.key === "Escape") closePhoto();
        if (event.key === "ArrowRight") stepPhoto(1);
        if (event.key === "ArrowLeft") stepPhoto(-1);
      } else if (event.key === "Escape") {
        closeAlbum();
      }
    };
    document.addEventListener("keydown", onKey);
    lockScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [albumIndex, photoIndex, closeAlbum, closePhoto, stepPhoto]);

  // move focus into the layer that just opened
  useEffect(() => {
    if (photoIndex !== null) photoCloseRef.current?.focus();
    else if (albumIndex !== null) albumCloseRef.current?.focus();
  }, [albumIndex, photoIndex]);

  return (
    <>
      {/* ── the wall of moments ── */}
      <ul className="grid grid-cols-2 gap-x-2 gap-y-3 sm:gap-x-5 sm:gap-y-6 lg:grid-cols-3">
        {albums.map((item, index) => (
          <li key={index}>
            <AlbumCover
              album={item}
              index={index}
              onOpen={openAlbum}
              coverRef={(el) => {
                coverRefs.current[index] = el;
              }}
            />
          </li>
        ))}
      </ul>

      {/* ── Level 2: the open album (portaled to <body> so it sits above the
          fixed HUD / page-nav, which the slide's stacking context would trap) ── */}
      {album !== null
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Album: ${album.title}`}
          className="fixed inset-0 z-50 flex justify-center bg-[#0d0804]/96 px-3 pb-4 pt-4 sm:pt-6"
        >
          <div className="flex w-full max-w-2xl flex-col">
            {/* header */}
            <div className="pix shrink-0 bg-outline p-1">
              <div className="pix panel-wood flex items-center gap-3 px-3 py-2.5">
                <span className="pix-sm flex size-9 shrink-0 items-center justify-center bg-wood-dark text-gold">
                  <CameraIcon size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-pixel text-lg font-bold text-glow sm:text-xl">
                    {album.title}
                  </h3>
                  <p className="font-arcade text-[0.5rem] text-cream/70">
                    {album.photos.length}{" "}
                    {album.photos.length === 1 ? "photo" : "photos"}
                  </p>
                </div>
                <button
                  ref={albumCloseRef}
                  type="button"
                  onClick={closeAlbum}
                  aria-label="Close album"
                  className="pix-sm flex size-10 shrink-0 items-center justify-center bg-wood-dark text-cream hover:text-gold"
                >
                  <CloseIcon size={18} />
                </button>
              </div>
            </div>

            {/* scrollable photo grid */}
            <div className="mt-3 min-h-0 flex-1 overflow-y-auto pb-2 pt-1">
              <ul className="grid grid-cols-2 gap-x-3 gap-y-4 px-0.5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-5">
                {album.photos.map((p, i) => (
                  <li key={i}>
                    <PhotoThumb
                      photo={p}
                      index={i}
                      albumIndex={albumIndex as number}
                      onOpen={openPhoto}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}

      {/* ── Level 3: a single photo, full-size (also portaled to <body>) ── */}
      {photo !== null && photoIndex !== null
        ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${photoIndex + 1} of ${photos.length}: ${photo.caption ?? photo.alt}`}
          className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-[#0d0804]/95 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) closePhoto();
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
            if (Math.abs(delta) > 48) stepPhoto(delta < 0 ? 1 : -1);
          }}
        >
          <div className="pix w-full max-w-lg bg-outline p-1">
            <div className="pix bg-cream p-2.5 pb-4 sm:p-3 sm:pb-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-wood-dark">
                {photo.src ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 512px, 92vw"
                    className="object-cover"
                    {...blurProps(photo.src)}
                  />
                ) : (
                  <MemoryPlaceholder seed={(albumIndex as number) * 3 + photoIndex} />
                )}
              </div>
              <p className="mt-3 px-1 text-center font-pixel text-lg text-ink">
                {photo.caption ?? album?.title}
              </p>
            </div>
          </div>

          <div className="mt-4 flex w-full max-w-lg items-center justify-between">
            <button
              type="button"
              onClick={() => stepPhoto(-1)}
              aria-label="Previous photo"
              className="pix-sm flex size-12 items-center justify-center bg-wood text-cream hover:text-gold"
            >
              <ChevronLeftIcon size={22} />
            </button>
            <span className="font-arcade text-[0.65rem] text-cream/85">
              {photoIndex + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => stepPhoto(1)}
              aria-label="Next photo"
              className="pix-sm flex size-12 items-center justify-center bg-wood text-cream hover:text-gold"
            >
              <ChevronRightIcon size={22} />
            </button>
          </div>

          <button
            ref={photoCloseRef}
            type="button"
            onClick={closePhoto}
            aria-label="Close photo"
            className="pix-sm absolute right-4 top-4 flex size-12 items-center justify-center bg-wood text-cream hover:text-gold"
          >
            <CloseIcon size={22} />
          </button>
        </div>,
            document.body,
          )
        : null}
    </>
  );
}
