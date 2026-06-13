"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon, LinkIcon } from "@/components/icons";

/**
 * The "· RSVP LINK ·" box from the concept: shows the link and a button that
 * copies the real URL to the clipboard, with a brief "Copied!" confirmation.
 */
export function CopyLink({ url, display }: { url: string; display: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // clipboard API can be blocked (e.g. insecure context) — fail quietly
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, [url]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <div className="pix bg-outline p-1">
      <div className="pix panel-wood-dark px-3 py-3">
        <p className="text-center font-arcade text-[0.5rem] tracking-widest text-gold/85">
          · RSVP LINK ·
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="pix-sm flex min-w-0 flex-1 items-center gap-2 bg-wood-deep px-3 py-2.5 text-cream hover:text-glow"
          >
            <LinkIcon size={16} className="shrink-0 text-gold" />
            <span className="truncate font-body text-sm">{display}</span>
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Link copied" : "Copy RSVP link"}
            className="pix-sm flex size-11 shrink-0 items-center justify-center bg-wood text-gold transition-colors hover:bg-wood-light"
          >
            {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
          </button>
        </div>
        <p
          className="mt-2 text-center font-arcade text-[0.5rem] text-leaf transition-opacity"
          style={{ opacity: copied ? 1 : 0 }}
          aria-live="polite"
        >
          {copied ? "Copied to clipboard!" : " "}
        </p>
      </div>
    </div>
  );
}
