import { site } from "@/data/site";
import { BlockEdge } from "@/components/scene/BlockEdge";
import { Gallery } from "@/components/Gallery";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CameraIcon } from "@/components/icons";

/**
 * Chapter 4 — the memory wall. Polaroids of moments together; tapping one
 * opens the lightbox. Photos are configured in data/site.ts → memories.
 */
export function Memories() {
  const hasPlaceholders = site.memories.items.some((item) => !item.src);

  return (
    <section
      id="memories"
      aria-labelledby="memories-heading"
      className="bg-[#2c1f13]"
    >
      <BlockEdge fill="#3e2350" id="memories" />
      <div className="mx-auto max-w-4xl px-5 pb-20 pt-12 sm:pt-16">
        <SectionHeader
          chapter={4}
          title={`${site.memories.titleId} / ${site.memories.titleEn}`}
          subtitle={site.memories.intro}
          headingId="memories-heading"
        />

        <div className="mt-12">
          <Gallery items={site.memories.items} />
        </div>

        {hasPlaceholders ? (
          <Reveal className="mt-12 flex justify-center">
            <p className="pix-sm inline-flex items-center gap-2.5 bg-wood px-4 py-3 font-body text-sm text-cream/85">
              <CameraIcon size={20} className="shrink-0" />
              {site.memories.note}
            </p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
