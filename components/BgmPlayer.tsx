"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { SoundOffIcon } from "@/components/icons";

/**
 * Background music. Uses the Web Audio API with sample-accurate
 * `loopStart`/`loopEnd`, so the chosen slice (e.g. 00:47–01:20) repeats with a
 * truly seamless, gap-free transition — something an <audio loop> can't do for
 * a sub-section.
 *
 * Autoplay rules block sound until the visitor interacts, so playback begins on
 * the "Tap to Enter" gesture: IntroGate dispatches a `sys:enter` event from
 * inside that click. A floating pixel button lets the visitor mute/unmute (it
 * glides in after entering, like the rest of the chrome).
 */
type WindowWithWebkit = typeof window & {
  webkitAudioContext?: typeof AudioContext;
};

export function BgmPlayer() {
  const cfg = site.audio;

  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [wantStart, setWantStart] = useState(false);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // fetch + decode the track up front, so it's ready the moment they enter
  useEffect(() => {
    if (!cfg.enabled || !cfg.src) return;
    const Ctor =
      window.AudioContext ?? (window as WindowWithWebkit).webkitAudioContext;
    if (!Ctor) return;

    const ctx = new Ctor();
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(cfg.src);
        const arr = await res.arrayBuffer();
        const buf = await ctx.decodeAudioData(arr);
        if (cancelled) return;
        bufferRef.current = buf;
        setReady(true);
      } catch {
        /* couldn't load/decode — the site just runs without music */
      }
    })();

    return () => {
      cancelled = true;
      try {
        sourceRef.current?.stop();
      } catch {
        /* already stopped */
      }
      ctx.close();
    };
  }, [cfg.enabled, cfg.src]);

  const tryStart = useCallback(() => {
    const ctx = ctxRef.current;
    const buf = bufferRef.current;
    const gain = gainRef.current;
    if (!ctx || !buf || !gain || startedRef.current) return;
    startedRef.current = true;

    if (ctx.state === "suspended") void ctx.resume();

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.loopStart = cfg.loopStart;
    src.loopEnd = cfg.loopEnd;
    src.connect(gain);
    src.start(0, cfg.loopStart);
    sourceRef.current = src;
    setPlaying(true);

    // gentle fade-in (exponential ramps can't hit 0, so use a tiny floor)
    const target = mutedRef.current ? 0.0001 : Math.max(cfg.volume, 0.0001);
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(target, now + 1.6);
  }, [cfg.loopStart, cfg.loopEnd, cfg.volume]);

  // call the latest tryStart from listeners without re-binding them
  const tryStartRef = useRef(tryStart);
  tryStartRef.current = tryStart;

  // begin on the "enter" gesture (in-stack); also flag it for the case where
  // decoding hasn't finished yet (the effect below starts it once ready)
  useEffect(() => {
    const onEnter = () => {
      tryStartRef.current();
      setWantStart(true);
    };
    window.addEventListener("sys:enter", onEnter);
    return () => window.removeEventListener("sys:enter", onEnter);
  }, []);

  useEffect(() => {
    if (wantStart && ready) tryStartRef.current();
  }, [wantStart, ready]);

  const toggleMute = useCallback(() => {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);

    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (ctx && gain) {
      if (!next && ctx.state === "suspended") void ctx.resume();
      const now = ctx.currentTime;
      const target = next ? 0.0001 : Math.max(cfg.volume, 0.0001);
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(Math.max(gain.gain.value, 0.0001), now);
      gain.gain.exponentialRampToValueAtTime(target, now + 0.4);
    }
    // if it never started (e.g. the enter gesture was missed), start it now
    if (!startedRef.current) {
      setWantStart(true);
      tryStartRef.current();
    }
  }, [cfg.volume]);

  if (!cfg.enabled) return null;

  const isOn = playing && !muted;

  return (
    <div className="music-shell fixed bottom-3 left-3 z-40 pb-[env(safe-area-inset-bottom)]">
      <button
        type="button"
        onClick={toggleMute}
        aria-pressed={isOn}
        aria-label={muted ? `Unmute ${cfg.label}` : `Mute ${cfg.label}`}
        title={muted ? "Unmute music" : "Mute music"}
        className="pix block bg-outline/90 p-1 backdrop-blur-[2px] transition-transform active:translate-y-[2px]"
      >
        <span className="pix flex size-10 items-center justify-center panel-wood text-gold transition-colors hover:text-glow">
          {isOn ? (
            <span className="eq" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          ) : (
            <SoundOffIcon size={20} />
          )}
        </span>
      </button>
    </div>
  );
}
