import { site } from "@/data/site";
import { SkyBackdrop } from "@/components/scene/SkyBackdrop";
import { TitleBanner } from "@/components/ui/TitleBanner";
import { PixelPanel } from "@/components/ui/PixelPanel";
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
    <Reveal delay={delay}>
      <PixelPanel innerClassName="p-3.5 sm:p-4">
        <div className="flex items-center gap-3">
          <span className="pix-sm flex size-12 shrink-0 items-center justify-center bg-wood-dark">
            {icon}
          </span>
          <h3 className="font-pixel text-xl font-bold text-glow">{title}</h3>
        </div>
        <div className="pixel-rule mt-2.5 text-cream" aria-hidden="true" />
        <div className="mt-2.5 space-y-1.5">{children}</div>
      </PixelPanel>
    </Reveal>
  );
}

/**
 * Chapter 2 — date, time, dress code. All values come from data/site.ts.
 */
export function Details() {
  return (
    <section id="details" aria-labelledby="details-heading" className="slide">
      <SkyBackdrop tone="sunset" />
      <div className="scene-scrim" />

      <div className="slide-body max-w-xl gap-3.5">
        <TitleBanner showKicker={false} compact />

        <Reveal className="flex flex-col items-center gap-2 text-center">
          <div className="pix -rotate-1 bg-outline p-1">
            <h2
              id="details-heading"
              className="pix panel-parchment px-6 py-2.5 font-pixel text-2xl font-bold text-ink sm:text-3xl"
            >
              {site.details.heading}
            </h2>
          </div>
          <p className="font-body text-sm text-cream/90 sm:text-base">
            <span aria-hidden="true">🌿 </span>
            {site.details.intro}
            <span aria-hidden="true"> 🌿</span>
          </p>
        </Reveal>

        <div className="flex flex-col gap-3.5">
          <DetailCard icon={<CalendarIcon size={34} />} title="Date">
            <p className="flex items-center gap-2.5 font-body text-base text-cream">
              <CalendarIcon size={18} className="shrink-0" />
              <strong className="font-semibold">{site.event.dateLabel}</strong>
            </p>
            <p className="flex items-center gap-2.5 font-body text-base text-cream/90">
              <ClockIcon size={18} className="shrink-0" />
              {site.event.timeLabel}
            </p>
          </DetailCard>

          <DetailCard
            icon={<ShirtIcon size={34} />}
            title="Dresscode"
            delay={120}
          >
            <p className="flex items-center gap-2.5 font-body text-base text-cream">
              <ShirtIcon size={18} className="shrink-0" />
              <strong className="font-semibold">
                {site.event.dresscode.main}
              </strong>
            </p>
            <p className="flex items-center gap-2.5 font-body text-base italic text-leaf">
              <SparkleIcon size={18} className="shrink-0" />
              {site.event.dresscode.hint}
            </p>
          </DetailCard>
        </div>

        <Reveal>
          <PixelPanel
            variant="wood-dark"
            innerClassName="flex items-center gap-3 px-4 py-3.5"
          >
            <PinIcon size={22} className="shrink-0" />
            <p className="font-body text-sm leading-relaxed text-cream/90">
              {site.event.note}
            </p>
          </PixelPanel>
        </Reveal>
      </div>
    </section>
  );
}
