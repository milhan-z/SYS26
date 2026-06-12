import { cn } from "@/lib/cn";

type PixelPanelProps = {
  children: React.ReactNode;
  /** Visual style of the panel interior. */
  variant?: "wood" | "wood-dark" | "parchment";
  /** Extra classes for the outer (outline) element. */
  className?: string;
  /** Extra classes for the inner (content) element. */
  innerClassName?: string;
  as?: "div" | "section" | "article" | "aside" | "figure";
  id?: string;
};

const VARIANT_CLASS: Record<NonNullable<PixelPanelProps["variant"]>, string> = {
  wood: "panel-wood text-cream",
  "wood-dark": "panel-wood-dark text-cream",
  parchment: "panel-parchment text-ink",
};

/**
 * A chunky voxel panel: dark outline with notched pixel corners and a
 * carved interior. The base building block for every card on the site.
 */
export function PixelPanel({
  children,
  variant = "wood",
  className,
  innerClassName,
  as: Tag = "div",
  id,
}: PixelPanelProps) {
  return (
    <Tag id={id} className={cn("pix bg-outline p-1", className)}>
      <div className={cn("pix h-full", VARIANT_CLASS[variant], innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
