import { site } from "@/data/site";
import { HeartDivider } from "@/components/ui/HeartDivider";
import { cn } from "@/lib/cn";

/**
 * The recurring "See You Soon / ITS Global Engagement" title that crowns the
 * inner slides — a compact echo of the hero, so every page feels part of the
 * same invitation. `compact` shrinks it for the denser slides.
 */
export function TitleBanner({
  showKicker = true,
  compact = false,
  className,
}: {
  showKicker?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {showKicker ? (
        <div className="pix -rotate-1 bg-outline/80 p-1">
          <p className="pix panel-parchment px-4 py-1 font-arcade text-[0.48rem] text-ink sm:text-[0.58rem]">
            {site.hero.kicker}
          </p>
        </div>
      ) : null}

      <h2
        className={cn(
          "font-pixel font-bold leading-[0.9] text-cream text-pixel-shadow",
          compact
            ? "mt-2 text-[clamp(1.6rem,7vw,2.25rem)]"
            : "mt-3 text-[clamp(2.1rem,9vw,3.75rem)]",
        )}
      >
        {site.hero.title}
      </h2>

      <HeartDivider className={compact ? "mt-1.5" : "mt-2"} />

      <p
        className={cn(
          "font-pixel font-semibold text-glow text-pixel-shadow-sm",
          compact
            ? "mt-1.5 text-[clamp(0.95rem,4vw,1.5rem)]"
            : "mt-2 text-[clamp(1.1rem,4.5vw,1.875rem)]",
        )}
      >
        {site.hero.subtitle}
      </p>
    </div>
  );
}
