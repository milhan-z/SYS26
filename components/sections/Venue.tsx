import { site } from "@/data/site";
import { SkyBackdrop } from "@/components/scene/SkyBackdrop";
import { TitleBanner } from "@/components/ui/TitleBanner";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelButton } from "@/components/ui/PixelButton";
import { Reveal } from "@/components/ui/Reveal";
import { BuildingIcon, MapIcon, PinIcon } from "@/components/icons";

/**
 * Chapter 3 — the venue: a live embedded Google Map of the place, plus the
 * address and a "View Map" button. Swap the map via data/site.ts →
 * venue.mapEmbedUrl (Google Maps → Share → Embed a map → the src URL).
 */
export function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-heading" className="slide">
      <SkyBackdrop tone="dusk" />
      <div className="scene-scrim" />

      <div className="slide-body max-w-2xl gap-2.5">
        <TitleBanner compact className="hide-on-short" />

        {/* "Venue" wooden banner */}
        <Reveal className="flex justify-center">
          <div className="pix bg-outline p-1">
            <h2
              id="venue-heading"
              className="pix panel-wood-dark px-9 py-2 font-pixel text-2xl font-bold text-cream sm:text-3xl"
            >
              {site.venue.heading}
            </h2>
          </div>
        </Reveal>

        {/* live, embedded map of the venue */}
        <Reveal>
          <PixelPanel as="figure" innerClassName="p-1.5">
            <div className="relative aspect-[16/10] overflow-hidden bg-wood-dark">
              <iframe
                src={site.venue.mapEmbedUrl}
                title={`Map to ${site.venue.name} — ${site.venue.mapLabel}`}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </PixelPanel>
        </Reveal>

        {/* address + open-in-maps button */}
        <Reveal delay={100}>
          <PixelPanel innerClassName="flex flex-col p-3.5">
            <h3 className="flex items-center gap-2 font-pixel text-xl font-bold text-glow">
              <BuildingIcon size={20} className="shrink-0 text-gold" />
              {site.venue.name}
            </h3>
            <div className="pixel-rule mt-2 text-cream" aria-hidden="true" />
            <address className="mt-2.5 flex items-start gap-2 not-italic">
              <PinIcon size={16} className="mt-0.5 shrink-0" />
              <p className="font-body text-[0.82rem] leading-snug text-cream/90">
                {site.venue.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
            <PixelButton
              href={site.venue.mapsUrl}
              external
              variant="green"
              className="mt-3.5 w-full"
            >
              <MapIcon size={15} /> View Map
            </PixelButton>
          </PixelPanel>
        </Reveal>
      </div>
    </section>
  );
}
