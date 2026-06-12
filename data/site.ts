/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEE YOU SOON — ITS GLOBAL ENGAGEMENT
 *  Central content file.
 *
 *  ✏️  Everything visitors read on the website lives here.
 *  Edit the values, save, and the site updates — no component changes needed.
 *  See README.md ("Editing content") for a field-by-field guide.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface GalleryItem {
  /**
   * Path to a photo inside /public, e.g. "/images/gallery/01.jpg".
   * Leave as `null` to show a built-in pixel-art placeholder until the
   * real photo is ready.
   */
  src: string | null;
  /** Description of the photo for screen readers. */
  alt: string;
  /** Short handwritten-style caption shown under the polaroid. */
  caption: string;
}

export interface SiteConfig {
  meta: {
    title: string;
    description: string;
  };
  brand: {
    name: string;
    short: string;
  };
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    /** Lines painted on the little wooden sign. */
    sign: string[];
    cta: string;
    scrollHint: string;
    /**
     * Optional photo/artwork to use instead of the built-in pixel scene,
     * e.g. "/images/hero.jpg". Keep `null` to use the illustrated sunset.
     */
    backgroundImage: string | null;
  };
  event: {
    /** Used for the calendar entry title. */
    title: string;
    /** Human-readable date, exactly as it should appear on the card. */
    dateLabel: string;
    /** Human-readable time range, exactly as it should appear on the card. */
    timeLabel: string;
    /** ISO datetime (with timezone offset) — drives the countdown + calendar. */
    start: string;
    /** ISO datetime (with timezone offset) — drives the calendar entry end. */
    end: string;
    dresscode: {
      main: string;
      hint: string;
    };
    note: string;
  };
  venue: {
    name: string;
    tagline: string;
    addressLines: string[];
    /** Full Google Maps link opened by the "Open in Google Maps" button. */
    mapsUrl: string;
    /**
     * Optional venue photo, e.g. "/images/venue.jpg".
     * Keep `null` to show the built-in pixel illustration of the Kampong.
     */
    image: string | null;
    imageAlt: string;
  };
  memories: {
    titleId: string;
    titleEn: string;
    intro: string;
    items: GalleryItem[];
    /** Small note shown under the gallery while photos are placeholders. */
    note: string;
  };
  rsvp: {
    heading: string;
    headingId: string;
    message: string;
    deadlineLabel: string;
    buttonLabel: string;
    /** External RSVP form (Google Form, Typeform, …). */
    url: string;
    closing: string;
  };
  footer: {
    line: string;
    subline: string;
  };
}

export const site: SiteConfig = {
  meta: {
    title: "See You Soon — ITS Global Engagement",
    description:
      "You're invited! One last gathering with ITS Global Engagement at ITS Global Kampong — an afternoon of stories, laughter, and goodbyes that are really just 'see you soon'.",
  },

  brand: {
    name: "ITS Global Engagement",
    short: "IGE",
  },

  hero: {
    kicker: "you're invited to...",
    title: "See You Soon",
    subtitle: "ITS Global Engagement",
    sign: ["Great people.", "Meaningful work.", "Global impact."],
    cta: "Open the invitation",
    scrollHint: "scroll to continue",
    backgroundImage: null,
  },

  event: {
    title: "See You Soon — ITS Global Engagement",
    dateLabel: "Saturday, 27 June 2026",
    timeLabel: "10:00 AM – 3:00 PM (WIB)",
    start: "2026-06-27T10:00:00+07:00",
    end: "2026-06-27T15:00:00+07:00",
    dresscode: {
      main: "Smart casual",
      hint: "a touch of green is encouraged",
    },
    note: "A light lunch is on us. More little surprises will be shared closer to the day.",
  },

  venue: {
    name: "ITS Global Kampong",
    tagline: "the home of our adventures",
    addressLines: [
      "ITS Global Engagement Office",
      "Jl. Teknik Kimia No. 1, Kampus ITS",
      "Keputih, Sukolilo, Surabaya",
      "Jawa Timur 60111, Indonesia",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=ITS+Global+Engagement+Institut+Teknologi+Sepuluh+Nopember+Sukolilo+Surabaya",
    image: null,
    imageAlt:
      "ITS Global Kampong — the ITS Global Engagement building at golden hour",
  },

  memories: {
    titleId: "Kenangan",
    titleEn: "Memories",
    intro: "Kenangan bersama — moments we've shared",
    items: [
      {
        src: null,
        alt: "The team smiling together after an international event",
        caption: "Together, we shine!",
      },
      {
        src: null,
        alt: "Brainstorming around a table full of sticky notes",
        caption: "Ideas. Impact. Us.",
      },
      {
        src: null,
        alt: "Celebrating a successful program with the whole crew",
        caption: "Celebrating every step",
      },
      {
        src: null,
        alt: "Late-night conversations under lantern light",
        caption: "Night talks, big dreams",
      },
      {
        src: null,
        alt: "Friends gathered around a campfire",
        caption: "Friendships that last",
      },
      {
        src: null,
        alt: "The team in front of the ITS Global Engagement office",
        caption: "Different paths, same purpose",
      },
    ],
    note: "This wall is still being decorated — our real photos are on their way. 📷",
  },

  rsvp: {
    heading: "One last quest together",
    headingId: "Sampai jumpa lagi",
    message:
      "Every great story deserves a proper ending — and every goodbye between friends is really just a 'see you soon'. Come spend one more afternoon with the people who made this journey unforgettable. Bring your stories, your laughter, and maybe a tissue or two.",
    deadlineLabel: "Please RSVP by Saturday, 20 June 2026",
    buttonLabel: "RSVP — I'll be there",
    // ⬇️ Replace with your real Google Form / Typeform link.
    url: "https://forms.gle/REPLACE_WITH_YOUR_FORM",
    closing: "Wherever the next adventure takes us — see you soon. ♥",
  },

  footer: {
    line: "Made with ♥ by ITS Global Engagement",
    subline: "Surabaya · 2026",
  },
};

/** Ordered list of page sections — used by the HUD menu and progress bar. */
export const SECTIONS = [
  { id: "invitation", label: "The Invitation", num: "01" },
  { id: "details", label: "Event Details", num: "02" },
  { id: "venue", label: "The Venue", num: "03" },
  { id: "memories", label: "Memories", num: "04" },
  { id: "rsvp", label: "RSVP", num: "05" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
