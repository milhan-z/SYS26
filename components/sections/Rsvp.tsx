import { site } from "@/data/site";
import { NightScene } from "@/components/scene/NightScene";
import { TitleBanner } from "@/components/ui/TitleBanner";
import { CopyLink } from "@/components/ui/CopyLink";
import { HeartDivider } from "@/components/ui/HeartDivider";
import { Reveal } from "@/components/ui/Reveal";
import {
  CalendarIcon,
  CheckIcon,
  ChevronRightIcon,
  HeartIcon,
  SparkleIcon,
} from "@/components/icons";

/**
 * Chapter 5 — the farewell. Starry night, floating lanterns, the big "RSVP"
 * call-to-action, a copy-able link, and the response deadline.
 */
export function Rsvp() {
  return (
    <section id="rsvp" aria-labelledby="rsvp-heading" className="slide">
      <NightScene />
      <div className="scene-scrim" />

      <div className="slide-body max-w-md gap-4">
        <TitleBanner showKicker={false} />

        {/* big RSVP word with little sprigs */}
        <Reveal className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-3">
            <SparkleIcon size={20} className="text-leaf" />
            <h3
              id="rsvp-heading"
              className="font-pixel text-6xl font-bold leading-none text-cream text-pixel-shadow sm:text-7xl"
            >
              {site.rsvp.heading}
            </h3>
            <SparkleIcon size={20} className="text-leaf" />
          </div>
          <HeartDivider className="mt-3" />
          <p className="mt-3 text-balance text-center font-pixel text-2xl font-semibold text-glow text-pixel-shadow-sm">
            {site.rsvp.message}
          </p>
          <HeartIcon size={20} beat className="mt-3" />
        </Reveal>

        {/* the "Yes, I'll be there" button */}
        <Reveal delay={120}>
          <a
            href={site.rsvp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pixel-btn pix pixel-btn--green w-full flex-col gap-0 py-4"
          >
            <span className="pixel-btn-face pix-sm" aria-hidden="true" />
            <span className="pixel-btn-label flex-col gap-1">
              <span className="flex items-center gap-2 font-pixel text-2xl font-bold">
                <CheckIcon size={20} /> {site.rsvp.buttonLabel}
              </span>
              <span className="flex items-center gap-1 font-arcade text-[0.5rem] opacity-90">
                {site.rsvp.buttonSub} <ChevronRightIcon size={12} />
              </span>
            </span>
          </a>
        </Reveal>

        {/* copy-able link */}
        <Reveal delay={180}>
          <CopyLink url={site.rsvp.url} display={site.rsvp.displayUrl} />
        </Reveal>

        {/* deadline */}
        <Reveal delay={240} className="flex justify-center">
          <p className="flex items-center gap-2 font-arcade text-[0.55rem] text-cream/85 text-pixel-shadow-sm">
            <CalendarIcon size={16} className="shrink-0" />
            {site.rsvp.deadlineLabel}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
