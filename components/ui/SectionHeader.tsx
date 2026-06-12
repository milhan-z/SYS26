import { SECTIONS } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeaderProps = {
  /** 1-based chapter number, shown as "CHAPTER X / 5". */
  chapter: number;
  title: string;
  subtitle?: string;
  /** Optional id the heading should carry (for aria-labelledby). */
  headingId?: string;
};

/**
 * Parchment quest-banner heading used by every chapter of the invitation.
 */
export function SectionHeader({
  chapter,
  title,
  subtitle,
  headingId,
}: SectionHeaderProps) {
  return (
    <Reveal className="flex flex-col items-center gap-4 text-center">
      <p className="font-arcade text-[0.6rem] tracking-widest text-gold/90 text-pixel-shadow-sm">
        CHAPTER {chapter} / {SECTIONS.length}
      </p>
      <div className="pix bg-outline p-1 -rotate-1">
        <h2
          id={headingId}
          className="pix panel-parchment px-7 py-3.5 font-pixel text-3xl font-bold text-ink sm:px-10 sm:text-4xl"
        >
          {title}
        </h2>
      </div>
      {subtitle ? (
        <p className="max-w-md text-pretty font-body text-sm text-cream/85 sm:text-base">
          <span aria-hidden="true">🌿 </span>
          {subtitle}
          <span aria-hidden="true"> 🌿</span>
        </p>
      ) : null}
    </Reveal>
  );
}
