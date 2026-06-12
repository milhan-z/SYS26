import { site } from "@/data/site";
import { HeartIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t-4 border-outline bg-[#0d0918] py-9 text-center">
      <HeartIcon size={18} beat className="mx-auto" />
      <p className="mt-3 font-arcade text-[0.6rem] leading-relaxed text-cream/80">
        {site.footer.line}
      </p>
      <p className="mt-2 font-body text-xs text-cream/50">
        {site.footer.subline}
      </p>
    </footer>
  );
}
