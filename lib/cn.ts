/** Tiny class-name joiner (avoids pulling in clsx for one helper). */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
