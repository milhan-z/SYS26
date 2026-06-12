"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

type Slot = { value: string; label: string };

function getSlots(now: number): Slot[] | "live" | "past" {
  const start = new Date(site.event.start).getTime();
  const end = new Date(site.event.end).getTime();
  if (now >= start && now <= end) return "live";
  if (now > end) return "past";

  let diff = Math.floor((start - now) / 1000);
  const days = Math.floor(diff / 86400);
  diff -= days * 86400;
  const hours = Math.floor(diff / 3600);
  diff -= hours * 3600;
  const minutes = Math.floor(diff / 60);
  const seconds = diff - minutes * 60;

  const pad = (n: number) => String(n).padStart(2, "0");
  return [
    { value: String(days), label: "days" },
    { value: pad(hours), label: "hrs" },
    { value: pad(minutes), label: "min" },
    { value: pad(seconds), label: "sec" },
  ];
}

/**
 * Item-slot style countdown to the event. Renders placeholders on the
 * server and starts ticking after hydration (avoids time mismatches).
 */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const state = now === null ? null : getSlots(now);

  if (state === "live") {
    return (
      <p className="text-center font-arcade text-[0.7rem] leading-relaxed text-glow">
        ✦ IT&apos;S HAPPENING RIGHT NOW — SEE YOU THERE! ✦
      </p>
    );
  }

  if (state === "past") {
    return (
      <p className="text-center font-arcade text-[0.7rem] leading-relaxed text-glow">
        ✦ UNTIL WE MEET AGAIN ✦
      </p>
    );
  }

  const slots: Slot[] =
    state ?? (["days", "hrs", "min", "sec"] as const).map((label) => ({
      value: "--",
      label,
    }));

  return (
    <div role="timer" aria-label="Countdown to the event">
      <p className="mb-3 text-center font-arcade text-[0.6rem] tracking-wider text-cream/75">
        THE ADVENTURE CONTINUES IN
      </p>
      <div className="flex items-stretch justify-center gap-2 sm:gap-3">
        {slots.map((slot) => (
          <div key={slot.label} className="pix-sm bg-outline p-1">
            <div className="pix-sm panel-wood-dark flex w-[4.4rem] flex-col items-center gap-1 px-2 py-2.5 sm:w-20">
              <span className="font-pixel text-2xl font-bold text-gold sm:text-3xl">
                {slot.value}
              </span>
              <span className="font-arcade text-[0.5rem] uppercase text-cream/70">
                {slot.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
