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

export interface GalleryPhoto {
  /**
   * Path to a photo inside /public, e.g. "/images/gallery/01.jpg".
   * Leave as `null` to show a built-in pixel-art placeholder until the
   * real photo is ready.
   */
  src: string | null;
  /** Description of the photo for screen readers. */
  alt: string;
  /** Optional short caption shown under the photo in the viewer. */
  caption?: string;
}

export interface MemoryAlbum {
  /**
   * The cover photo shown on the wall (the polaroid you tap). Leave `null`
   * to show a built-in pixel-art placeholder.
   */
  cover: string | null;
  /** The moment / category name — shown on the cover and as the album title. */
  title: string;
  /** Description of the cover for screen readers. */
  alt: string;
  /** Every photo that lives inside this moment (tap the cover to open them). */
  photos: GalleryPhoto[];
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
    albums: MemoryAlbum[];
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
  /** Background music. Plays a seamless loop once the visitor taps "Enter". */
  audio: {
    /** Set `false` to disable music entirely. */
    enabled: boolean;
    /** Path to an audio file inside /public, e.g. "/audio/good-life.mp3". */
    src: string;
    /** Start of the loop, in seconds. */
    loopStart: number;
    /** End of the loop, in seconds (it jumps back to loopStart seamlessly). */
    loopEnd: number;
    /** Playback volume, 0–1. */
    volume: number;
    /** Accessible label for the mute/unmute control. */
    label: string;
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
    sign: ["See you", "in another", "server!"],
    scrollHint: "scroll to continue",
    backgroundImage: null,
  },

  details: {
    heading: "Event Details",
    intro: "All the info you need for the big day!",
  },

  event: {
    title: "See You Soon — ITS Global Engagement",
    dateLabel: "Saturday, 20 June 2026",
    timeLabel: "3:30 PM – 9:00 PM",
    start: "2026-06-20T15:30:00+07:00",
    end: "2026-06-20T21:00:00+07:00",
    dresscode: {
      main: "Earth Tone",
      hint: "warm browns, greens & neutrals",
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
    // Each entry is a moment (a category). Its `cover` is the polaroid on the
    // wall; tapping it opens every photo in `photos`. Drop real files into
    // /public/images/gallery/ and point `cover`/`src` at them. Items left as
    // `null` show a friendly pixel placeholder, so you can build albums while
    // you're still collecting pictures.
    albums: [
      {
        cover: "/images/gallery/o-week/01.jpg",
        title: "O-Week",
        alt: "O-Week moments",
        photos: [
          { src: "/images/gallery/o-week/01.jpg", alt: "O-Week — photo 1" },
          { src: "/images/gallery/o-week/02.jpg", alt: "O-Week — photo 2" },
          { src: "/images/gallery/o-week/03.jpg", alt: "O-Week — photo 3" },
          { src: "/images/gallery/o-week/04.jpg", alt: "O-Week — photo 4" },
          { src: "/images/gallery/o-week/05.jpg", alt: "O-Week — photo 5" },
          { src: "/images/gallery/o-week/06.jpg", alt: "O-Week — photo 6" },
        ],
      },
      {
        cover: "/images/gallery/global-night/01.jpg",
        title: "Global Night",
        alt: "Global Night moments",
        photos: [
          { src: "/images/gallery/global-night/01.jpg", alt: "Global Night — photo 1" },
          { src: "/images/gallery/global-night/02.jpg", alt: "Global Night — photo 2" },
          { src: "/images/gallery/global-night/03.jpg", alt: "Global Night — photo 3" },
          { src: "/images/gallery/global-night/04.jpg", alt: "Global Night — photo 4" },
        ],
      },
      {
        cover: "/images/gallery/guf/01.jpg",
        title: "GUF",
        alt: "GUF moments",
        photos: [
          { src: "/images/gallery/guf/01.jpg", alt: "GUF — photo 1" },
          { src: "/images/gallery/guf/02.jpg", alt: "GUF — photo 2" },
          { src: "/images/gallery/guf/03.jpg", alt: "GUF — photo 3" },
          { src: "/images/gallery/guf/04.jpg", alt: "GUF — photo 4" },
          { src: "/images/gallery/guf/05.jpg", alt: "GUF — photo 5" },
          { src: "/images/gallery/guf/06.jpg", alt: "GUF — photo 6" },
        ],
      },
      {
        cover: "/images/gallery/jcc/01.jpg",
        title: "JCC",
        alt: "JCC moments",
        photos: [
          { src: "/images/gallery/jcc/01.jpg", alt: "JCC — photo 1" },
          { src: "/images/gallery/jcc/02.jpg", alt: "JCC — photo 2" },
          { src: "/images/gallery/jcc/03.jpg", alt: "JCC — photo 3" },
          { src: "/images/gallery/jcc/04.jpg", alt: "JCC — photo 4" },
          { src: "/images/gallery/jcc/05.jpg", alt: "JCC — photo 5" },
        ],
      },
      {
        cover: "/images/gallery/sports-day/01.jpg",
        title: "Sports Day",
        alt: "Sports Day moments",
        photos: [
          { src: "/images/gallery/sports-day/01.jpg", alt: "Sports Day — photo 1" },
          { src: "/images/gallery/sports-day/02.jpg", alt: "Sports Day — photo 2" },
          { src: "/images/gallery/sports-day/03.jpg", alt: "Sports Day — photo 3" },
          { src: "/images/gallery/sports-day/04.jpg", alt: "Sports Day — photo 4" },
          { src: "/images/gallery/sports-day/05.jpg", alt: "Sports Day — photo 5" },
          { src: "/images/gallery/sports-day/06.jpg", alt: "Sports Day — photo 6" },
        ],
      },
      {
        cover: "/images/gallery/bromo/01.jpg",
        title: "Bromo Trip",
        alt: "Bromo Trip moments",
        photos: [
          { src: "/images/gallery/bromo/01.jpg", alt: "Bromo Trip — photo 1" },
          { src: "/images/gallery/bromo/02.jpg", alt: "Bromo Trip — photo 2" },
          { src: "/images/gallery/bromo/03.jpg", alt: "Bromo Trip — photo 3" },
          { src: "/images/gallery/bromo/04.jpg", alt: "Bromo Trip — photo 4" },
          { src: "/images/gallery/bromo/05.jpg", alt: "Bromo Trip — photo 5" },
          { src: "/images/gallery/bromo/06.jpg", alt: "Bromo Trip — photo 6" },
        ],
      },
    ],
  },

  rsvp: {
    heading: "RSVP",
    message: "Let us know if you're joining!",
    buttonLabel: "Yes, I'll be there",
    buttonSub: "Open RSVP Link",
    url: "https://its.id/m/RSVPSYSSpring2026",
    displayUrl: "its.id/m/RSVPSYSSpring2026",
    deadlineLabel: "Please let us know by June 18, 2026",
  },

  audio: {
    enabled: true,
    // Pre-trimmed clip (~39s, ~0.9MB) so it loads fast and starts instantly.
    // It covers 00:44–01:23 of the original song; the loop points below are
    // offsets *within this clip* (3s = the song's 00:47, 36s = 01:20). The few
    // seconds of lead-in/tail keep the loop points interior, which is what
    // makes the repeat perfectly seamless. To re-trim from a full song, run:
    //   node scripts/trim-mp3.mjs "<full.mp3>" "public/audio/good-life.mp3" 44 83
    src: "/audio/good-life.mp3",
    loopStart: 3, // 00:47 in the original
    loopEnd: 36, // 01:20 in the original
    volume: 0.4,
    label: "background music",
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
