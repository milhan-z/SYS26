import Image from "next/image";
import { site } from "@/data/site";
import { SunsetScene } from "@/components/scene/SunsetScene";
import { Embers } from "@/components/scene/Embers";
import { HeartDivider } from "@/components/ui/HeartDivider";
import { HeartIcon } from "@/components/icons";

/**
 * Chapter 1 — the opening invitation. A full-screen golden-hour scene of
 * the kampong with the invitation title floating in the sunset sky.
 *
 * The title block carries `hero-rise` classes: while the intro gate is up the
 * content waits off-screen, then rises in sequence the moment you enter (the
 * choreography lives in globals.css → "Experience intro"). With JS off, the
 * `hero-rise` default keeps everything visible.
 */
export function Hero() {
  return (
    <section id="invitation" aria-label="Opening invitation" className="slide">
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

      {/* drifting embers / fireflies catching the last light */}
      <Embers />

      {/* gentle scrim so the title stays readable */}
      <div
        className="absolute inset-x-0 top-0 z-[2] h-44 bg-gradient-to-b from-night/70 to-transparent"
        aria-hidden="true"
      />

      {/* content */}
      <div className="slide-body max-w-xl items-center text-center">
        <div
          className="hero-rise pix -rotate-1 bg-outline/80 p-1"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          <p className="pix panel-parchment px-5 py-2.5 font-arcade text-[0.6rem] text-ink sm:text-[0.7rem]">
            {site.hero.kicker}
          </p>
        </div>

        <h1
          className="hero-rise mt-5 text-balance font-pixel text-[clamp(2.6rem,11vw,4.5rem)] font-bold leading-[0.95] text-cream text-pixel-shadow"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          {site.hero.title}
        </h1>

        <HeartDivider
          className="hero-rise mt-5"
          style={{ "--rise-delay": "360ms" } as React.CSSProperties}
        />

        <p
          className="hero-rise mt-4 font-pixel text-2xl font-semibold text-glow text-pixel-shadow-sm sm:text-3xl"
          style={{ "--rise-delay": "480ms" } as React.CSSProperties}
        >
          {site.hero.subtitle}
        </p>

        {/* little wooden sign */}
        <div
          className="hero-rise pix mt-8 rotate-1 bg-outline/80 p-1"
          style={{ "--rise-delay": "620ms" } as React.CSSProperties}
        >
          <div className="pix panel-wood px-6 py-4">
            <ul aria-label="Our motto">
              {site.hero.sign.map((line) => (
                <li
                  key={line}
                  className="font-arcade text-[0.58rem] uppercase leading-loose tracking-wide text-cream/90"
                >
                  {line}
                </li>
              ))}
            </ul>
            <HeartIcon size={14} className="mx-auto mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
