import { site } from "@/data/site";
import { googleCalendarUrl } from "@/lib/calendar";
import { BlockEdge } from "@/components/scene/BlockEdge";
import { NightScene } from "@/components/scene/NightScene";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelButton } from "@/components/ui/PixelButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HeartDivider } from "@/components/ui/HeartDivider";
import { Reveal } from "@/components/ui/Reveal";
import { CalendarIcon, ExternalIcon, HeartIcon } from "@/components/icons";

/**
 * Chapter 5 — the farewell. Starry night, floating lanterns, and the
 * RSVP call-to-action linking to the external form.
 */
export function Rsvp() {
  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="relative overflow-clip"
    >
      <NightScene />
      <div className="relative z-10">
        <BlockEdge fill="#2c1f13" id="rsvp" />
        <div className="mx-auto flex min-h-[88svh] max-w-2xl flex-col justify-center px-5 pb-28 pt-12 sm:pt-16">
          <SectionHeader
            chapter={5}
            title="RSVP"
            subtitle={site.rsvp.headingId}
            headingId="rsvp-heading"
          />

          <Reveal className="mt-10">
            <PixelPanel variant="parchment" innerClassName="px-6 py-7 text-center sm:px-9">
              <h3 className="text-balance font-pixel text-2xl font-bold text-ink sm:text-3xl">
                {site.rsvp.heading}
              </h3>
              <p className="mx-auto mt-4 max-w-prose text-pretty font-body text-base leading-relaxed text-ink/90">
                {site.rsvp.message}
              </p>
              <p className="mt-5 inline-block bg-ink/8 px-3 py-1.5 font-arcade text-[0.55rem] text-ink/80">
                {site.rsvp.deadlineLabel}
              </p>
            </PixelPanel>
          </Reveal>

          <Reveal delay={120} className="mt-9 flex flex-col items-center gap-4">
            <PixelButton
              href={site.rsvp.url}
              external
              className="w-full max-w-sm text-[0.78rem]"
            >
              <HeartIcon size={16} /> {site.rsvp.buttonLabel}{" "}
              <ExternalIcon size={13} />
            </PixelButton>
            <PixelButton href={googleCalendarUrl()} external variant="ghost">
              <CalendarIcon size={15} /> Add to Google Calendar
            </PixelButton>
          </Reveal>

          <Reveal delay={200} className="mt-14">
            <HeartDivider />
            <p className="mt-6 text-center font-pixel text-xl font-semibold text-glow text-pixel-shadow-sm sm:text-2xl">
              {site.rsvp.closing}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
