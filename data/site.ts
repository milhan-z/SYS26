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
    scrollHint: string;
    /**
     * Optional photo/artwork to use instead of the built-in pixel scene,
     * e.g. "/images/hero.jpg". Keep `null` to use the illustrated sunset.
     */
    backgroundImage: string | null;
  };
  details: {
    heading: string;
    intro: string;
  };
  event: {
    /** Used for the calendar entry title. */
    title: string;
    /** Human-readable date, exactly as it should appear on the card. */
    dateLabel: string;
    /** Human-readable time range, exactly as it should appear on the card. */
    timeLabel: string;
    /** ISO datetime (with timezone offset) — drives the calendar entry. */
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
    heading: string;
    name: string;
    addressLines: string[];
    /** Short label shown on the little map pin. */
    mapLabel: string;
    /** Full Google Maps link opened by the "View Map" button. */
    mapsUrl: string;
    /**
     * Optional venue photo, e.g. "/images/venue.jpg".
     * Keep `null` to show the built-in pixel illustration of the venue.
     */
    image: string | null;
    imageAlt: string;
  };
  memories: {
    titleId: string;
    titleEn: string;
    introId: string;
    introEn: string;
    items: GalleryItem[];
  };
  rsvp: {
    /** Big pixel word, e.g. "RSVP". */
    heading: string;
    /** One-line invitation under the heading. */
    message: string;
    /** Main green button — top line. */
    buttonLabel: string;
    /** Main green button — small second line. */
    buttonSub: string;
    /** Where the button + copy action point (real form link). */
    url: string;
    /** Pretty version of the link shown in the copy box. */
    displayUrl: string;
    deadlineLabel: string;
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
      "You're invited! One last gathering with ITS Global Engagement — an afternoon of stories, laughter, and goodbyes that are really just 'see you soon'.",
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
    scrollHint: "scroll to continue",
    backgroundImage: null,
  },

  details: {
    heading: "Event Details",
    intro: "All the info you need for the big day!",
  },

  event: {
    title: "See You Soon — ITS Global Engagement",
    dateLabel: "Saturday, 21 June 2025",
    timeLabel: "10:00 AM – 3:00 PM",
    start: "2025-06-21T10:00:00+07:00",
    end: "2025-06-21T15:00:00+07:00",
    dresscode: {
      main: "Smart Casual",
      hint: "a touch of green is encouraged",
    },
    note: "More location details will be shared closer to the event.",
  },

  venue: {
    heading: "Venue",
    name: "ITS Global Hub",
    addressLines: [
      "Jl. Teknik Kimia No.1",
      "Kampus ITS, Keputih",
      "Sukolilo, Surabaya",
      "Jawa Timur 60111",
      "Indonesia",
    ],
    mapLabel: "ITS Global Hub",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=ITS+Global+Engagement+Institut+Teknologi+Sepuluh+Nopember+Sukolilo+Surabaya",
    image: null,
    imageAlt: "ITS Global Hub — the venue building at golden hour",
  },

  memories: {
    titleId: "Kenangan",
    titleEn: "Memories",
    introId: "Kenangan bersama",
    introEn: "Moments we've shared",
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
  },

  rsvp: {
    heading: "RSVP",
    message: "Let us know if you're joining!",
    buttonLabel: "Yes, I'll be there",
    buttonSub: "Open RSVP Link",
    // ⬇️ Replace with your real Google Form / Typeform / RSVP link.
    url: "https://its.ui.ac.id/rsvp/see-you-soon",
    displayUrl: "its.ui.ac.id/rsvp/see-you-soon",
    deadlineLabel: "Kindly respond by May 25, 2025",
  },

  footer: {
    line: "Made with ♥ by ITS Global Engagement",
    subline: "Surabaya · 2025",
  },
};

/** Ordered list of page sections — used by the HUD menu and page nav. */
export const SECTIONS = [
  { id: "invitation", label: "The Invitation", num: "01" },
  { id: "details", label: "Event Details", num: "02" },
  { id: "venue", label: "The Venue", num: "03" },
  { id: "memories", label: "Memories", num: "04" },
  { id: "rsvp", label: "RSVP", num: "05" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
