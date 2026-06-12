import Image from "next/image";
import { site } from "@/data/site";
import { SunsetScene } from "@/components/scene/SunsetScene";
import { HeartDivider } from "@/components/ui/HeartDivider";
import { PixelButton } from "@/components/ui/PixelButton";
import { ArrowDownIcon, HeartIcon } from "@/components/icons";

/**
 * Chapter 1 — the opening invitation. A full-screen golden-hour scene of
 * the Kampong with the invitation title floating in the sunset sky.
 */
export function Hero() {
  return (
    <section
      id="invitation"
      aria-label="Opening invitation"
      className="relative flex min-h-svh flex-col overflow-clip"
    >
      {/* sunset sky */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#33204e] via-[#7a3b6e] via-45% to-[#e0784f]"
        aria-hidden="true"
      />

      {/* the kampong artwork (or a real photo, if configured) */}
      {site.hero.backgroundImage ? (
        <Image
          src={site.hero.backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom"
        />
      ) : (
        <SunsetScene />
      )}

      {/* gentle scrim so the title stays readable */}
      <div
        className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-night/70 to-transparent"
        aria-hidden="true"
      />

      {/* content */}
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-5 pb-24 pt-28 text-center sm:pt-32">
        <div className="pix bg-outline/80 p-1 -rotate-1">
          <p className="pix panel-parchment px-5 py-2.5 font-arcade text-[0.6rem] text-ink sm:text-[0.7rem]">
            {site.hero.kicker}
          </p>
        </div>

        <h1 className="mt-6 text-balance font-pixel text-[3.4rem] font-bold leading-[0.95] text-cream text-pixel-shadow sm:text-7xl">
          {site.hero.title}
        </h1>

        <HeartDivider className="mt-5" />

        <p className="mt-4 font-pixel text-2xl font-semibold text-glow text-pixel-shadow-sm sm:text-3xl">
          {site.hero.subtitle}
        </p>

        {/* little wooden sign */}
        <div className="pix mt-8 rotate-1 bg-outline/80 p-1">
          <div className="pix panel-wood px-6 py-4">
            <ul aria-label="Our motto">
              {site.hero.sign.map((line) => (
                <li
                  key={line}
                  className="font-arcade text-[0.58rem] leading-loose text-cream/90"
                >
                  {line}
                </li>
              ))}
            </ul>
            <HeartIcon size={14} className="mx-auto mt-2" />
          </div>
        </div>

        <PixelButton href="#details" className="mt-9">
          {site.hero.cta} <ArrowDownIcon size={16} />
        </PixelButton>
      </div>

      {/* scroll hint */}
      <div
        className="absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="anim-bob text-glow">
          <ArrowDownIcon size={22} />
        </span>
        <span className="font-arcade text-[0.55rem] text-cream/90 text-pixel-shadow-sm">
          {site.hero.scrollHint}
        </span>
      </div>
    </section>
  );
}
