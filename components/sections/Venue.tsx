import Image from "next/image";
import { site } from "@/data/site";
import { BlockEdge } from "@/components/scene/BlockEdge";
import { VenueArt } from "@/components/scene/VenueArt";
import { PixelPanel } from "@/components/ui/PixelPanel";
import { PixelButton } from "@/components/ui/PixelButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ExternalIcon, MapIcon, PinIcon } from "@/components/icons";

/**
 * Chapter 3 — the venue: ITS Global Kampong, with address and a
 * Google Maps link. Swap in a real photo via data/site.ts → venue.image.
 */
export function Venue() {
  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="bg-gradient-to-b from-[#2b1a3e] to-[#3e2350]"
    >
      <BlockEdge fill="#261a10" id="venue" />
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
        <SectionHeader
          chapter={3}
          title="The Venue"
          subtitle={site.venue.tagline}
          headingId="venue-heading"
        />

        <Reveal className="mt-10">
          <PixelPanel as="figure" innerClassName="p-2 sm:p-2.5">
            <div className="relative aspect-[16/10] overflow-hidden bg-wood-dark">
              {site.venue.image ? (
                <Image
                  src={site.venue.image}
                  alt={site.venue.imageAlt}
                  fill
                  sizes="(min-width: 768px) 720px, 94vw"
                  className="object-cover"
                />
              ) : (
                <VenueArt />
              )}
            </div>
            <figcaption className="px-2 py-3 text-center font-arcade text-[0.6rem] text-gold">
              ✦ {site.venue.name} ✦
            </figcaption>
          </PixelPanel>
        </Reveal>

        <Reveal delay={100} className="mt-5">
          <PixelPanel innerClassName="p-5 sm:p-6">
            <h3 className="font-pixel text-2xl font-bold text-glow">
              {site.venue.name}
            </h3>
            <div className="pixel-rule mt-3 text-cream" aria-hidden="true" />
            <address className="mt-4 flex items-start gap-3 not-italic">
              <PinIcon size={22} className="mt-1 shrink-0" />
              <p className="font-body text-base leading-relaxed text-cream/90">
                {site.venue.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </address>
            <div className="mt-6">
              <PixelButton
                href={site.venue.mapsUrl}
                external
                variant="green"
                className="w-full sm:w-auto"
              >
                <MapIcon size={16} /> Open in Google Maps{" "}
                <ExternalIcon size={13} />
              </PixelButton>
            </div>
          </PixelPanel>
        </Reveal>

        <Reveal className="mt-6 text-center">
          <p className="font-body text-sm italic text-cream/70">
            More directions and parking tips will be shared closer to the event.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
