import Image from "next/image";
import { site } from "@/data/site";
import { DuskLanterns } from "@/components/scene/DuskLanterns";
import { HeartDivider } from "@/components/ui/HeartDivider";
import { HeartIcon } from "@/components/icons";

/**
 * Chapter 1 — the opening invitation. A full-screen dusk world of drifting
 * paper lanterns; the title floats crisp over the dark twilight sky. The
 * landing screen shares this exact backdrop, so tapping "Open Invitation"
 * feels like stepping into the same world.
 *
 * The title block carries `hero-rise` classes: while the intro gate is up the
 * content waits off-screen, then rises in sequence the moment you enter (the
 * choreography lives in globals.css → "Experience intro"). With JS off, the
 * `hero-rise` default keeps everything visible.
 */
export function Hero() {
  return (
    <section id="invitation" aria-label="Opening invitation" className="slide">
      {/* the dusk-lantern world (or a real photo, if configured) */}
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
        <DuskLanterns />
      )}

      {/* cinematic framing veil — frames the scene + grounds it into the deck */}
      <div className="hero-veil" aria-hidden="true" />

      {/* content */}
      <div className="slide-body max-w-xl items-center text-center">
        <div
          className="hero-rise pix -rotate-1 bg-outline/85 p-1"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          <p className="pix panel-parchment px-5 py-2 font-arcade text-[0.6rem] uppercase tracking-wide text-ink sm:text-[0.68rem]">
            {site.hero.kicker}
          </p>
        </div>

        <div
          className="hero-title-wrap hero-rise mt-6"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          <span className="hero-title-aura" aria-hidden="true" />
          <h1 className="hero-title text-balance font-pixel text-[clamp(3rem,13vw,5rem)] font-bold leading-[0.92]">
            {site.hero.title}
          </h1>
        </div>

        <HeartDivider
          className="hero-rise mt-5"
          style={{ "--rise-delay": "360ms" } as React.CSSProperties}
        />

        <p
          className="hero-subtitle hero-rise mt-4 font-pixel text-2xl font-semibold sm:text-3xl"
          style={{ "--rise-delay": "480ms" } as React.CSSProperties}
        >
          {site.hero.subtitle}
        </p>

        {/* little wooden sign */}
        <div
          className="hero-rise pix mt-8 rotate-1 bg-outline/85 p-1"
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
