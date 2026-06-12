import { HeartIcon } from "@/components/icons";

/** The little "── ❤ ──" flourish from the invitation artwork. */
export function HeartDivider({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className ?? ""}`}
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
