import Image from "next/image";
import { site } from "@/data/site";
import { SkyBackdrop } from "@/components/scene/SkyBackdrop";
import { VenueArt } from "@/components/scene/VenueArt";
import { TitleBanner } from "@/components/ui/TitleBanner";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelButton } from "@/components/ui/PixelButton";
import { Reveal } from "@/components/ui/Reveal";
import { BuildingIcon, MapIcon, PinIcon } from "@/components/icons";

/** Tiny base64 preview so the venue photo fades in instead of popping. */
const VENUE_BLUR =
  "data:image/jpeg;base64,/9j/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wAARCAAJAAwDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgQF/8QAHxAAAgIBBAMAAAAAAAAAAAAAAQIAAzEEERIUIkFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAA//EABURAQEAAAAAAAAAAAAAAAAAABEA/9oADAMBAAIRAxEAPwDO7hNvOpUqPsKMxHUXA+bLvJUyPgibMIJG/9k=";

/**
 * Chapter 3 — the venue: a golden-hour photo of the building, a live embedded
 * Google Map, the address, and a "View Map" button. Swap the photo via
 * data/site.ts → venue.image and the map via venue.mapEmbedUrl.
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

        {/* venue photo */}
        <Reveal>
          <PixelPanel as="figure" innerClassName="p-1.5">
            <div className="relative w-full overflow-hidden bg-wood-dark" style={{ aspectRatio: "16/9", maxHeight: "42vh" }}>
              {site.venue.image ? (
                <Image
                  src={site.venue.image}
                  alt={site.venue.imageAlt}
                  fill
                  sizes="(min-width: 768px) 672px, 94vw"
                  className="object-cover object-center"
                  placeholder="blur"
                  blurDataURL={VENUE_BLUR}
                />
              ) : (
                <VenueArt />
              )}
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
