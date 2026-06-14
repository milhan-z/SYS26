import { site } from "@/data/site";
import { SkyBackdrop } from "@/components/scene/SkyBackdrop";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Chapter 4 — the memory wall. Polaroids of moments together; tapping one
 * opens the lightbox. Photos are configured in data/site.ts → memories.
 */
export function Memories() {
  return (
    <section id="memories" aria-labelledby="memories-heading" className="slide">
      <SkyBackdrop tone="rose" />
      <div className="scene-scrim" />

      <div className="slide-body max-w-2xl gap-4">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <div className="pix -rotate-1 bg-outline p-1">
            <h2
              id="memories-heading"
              className="pix panel-parchment px-6 py-2.5 font-pixel text-2xl font-bold text-ink sm:text-3xl"
            >
              {site.memories.titleId} / {site.memories.titleEn}
            </h2>
          </div>
          <p className="font-body text-sm leading-tight text-cream/90 sm:text-base">
            <span className="block">{site.memories.introId}</span>
            <span className="block">{site.memories.introEn}</span>
          </p>
        </Reveal>

        <Gallery albums={site.memories.albums} />
      </div>
    </section>
  );
}
