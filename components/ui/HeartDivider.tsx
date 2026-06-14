import { HeartIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** The little "── ❤ ──" flourish from the invitation artwork. */
export function HeartDivider({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3", className)}
      style={style}
      aria-hidden="true"
    >
      <span className="pixel-rule w-12 text-cream sm:w-20" />
      <span className="size-1.5 bg-cream/70" />
      <HeartIcon size={20} beat />
      <span className="size-1.5 bg-cream/70" />
      <span className="pixel-rule w-12 text-cream sm:w-20" />
    </div>
  );
}
