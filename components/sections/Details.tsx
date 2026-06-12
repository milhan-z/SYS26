import { site } from "@/data/site";
import { googleCalendarUrl } from "@/lib/calendar";
import { BlockEdge } from "@/components/scene/BlockEdge";
import { Countdown } from "@/components/Countdown";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelButton } from "@/components/ui/PixelButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import {
  CalendarIcon,
  ClockIcon,
  PinIcon,
  ShirtIcon,
  SparkleIcon,
} from "@/components/icons";

function DetailCard({
  icon,
  title,
  children,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <PixelPanel className="h-full" innerClassName="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <span className="pix-sm flex size-14 shrink-0 items-center justify-center bg-wood-dark">
            {icon}
          </span>
          <h3 className="font-pixel text-2xl font-bold text-glow">{title}</h3>
        </div>
        <div className="pixel-rule mt-4 text-cream" aria-hidden="true" />
        <div className="mt-4 space-y-2.5">{children}</div>
      </PixelPanel>
    </Reveal>
  );
}

/**
 * Chapter 2 — date, time, dress code, countdown, add-to-calendar.
 * All values come from data/site.ts.
 */
export function Details() {
  return (
    <section id="details" aria-labelledby="details-heading" className="bg-[#261a10]">
      <BlockEdge fill="#3a2719" id="details" />
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
        <SectionHeader
          chapter={2}
          title="Event Details"
          subtitle="All the info you need for the big day!"
          headingId="details-heading"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <DetailCard icon={<CalendarIcon size={34} />} title="When">
            <p className="flex items-start gap-2.5 font-body text-base text-cream">
              <CalendarIcon size={18} className="mt-1 shrink-0" />
              <strong className="font-semibold">{site.event.dateLabel}</strong>
            </p>
            <p className="flex items-start gap-2.5 font-body text-base text-cream/90">
              <ClockIcon size={18} className="mt-1 shrink-0" />
              {site.event.timeLabel}
            </p>
          </DetailCard>

          <DetailCard icon={<ShirtIcon size={34} />} title="Dresscode" delay={120}>
            <p className="flex items-start gap-2.5 font-body text-base text-cream">
              <ShirtIcon size={18} className="mt-1 shrink-0" />
              <strong className="font-semibold">{site.event.dresscode.main}</strong>
            </p>
            <p className="flex items-start gap-2.5 font-body text-base italic text-leaf">
              <SparkleIcon size={18} className="mt-1 shrink-0" />
              {site.event.dresscode.hint}
            </p>
          </DetailCard>
        </div>

        <Reveal delay={120} className="mt-5">
          <PixelPanel variant="wood-dark" innerClassName="px-5 py-7">
            <Countdown />
          </PixelPanel>
        </Reveal>

        <Reveal className="mt-5">
          <PixelPanel variant="parchment" innerClassName="flex items-start gap-3 px-5 py-4">
            <PinIcon size={22} className="mt-0.5 shrink-0" />
            <p className="font-body text-sm leading-relaxed text-ink sm:text-base">
              {site.event.note}
            </p>
          </PixelPanel>
        </Reveal>

        <Reveal className="mt-8 text-center">
          <PixelButton href={googleCalendarUrl()} external variant="ghost">
            <CalendarIcon size={16} /> Add to Google Calendar
          </PixelButton>
        </Reveal>
      </div>
    </section>
  );
}
