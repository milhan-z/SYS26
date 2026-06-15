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
    /** Google Maps "embed" URL (Share → Embed a map → src) shown inline. */
    mapEmbedUrl: string;
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
    name: "Industrial Engineering",
    addressLines: [
      "Room 602",
      "Dept. of Industrial Engineering",
      "Kampus ITS, Sukolilo",
      "Surabaya, Jawa Timur 60111",
    ],
    mapLabel: "Teknik Sistem dan Industri ITS",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Departemen+Teknik+Sistem+dan+Industri+ITS+Sukolilo+Surabaya",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1190.9395010560552!2d112.79561090650165!3d-7.283135925414023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa12b7225b9b%3A0x919b4db9ad1f1c70!2sDepartemen%20Teknik%20Sistem%20dan%20Industri!5e1!3m2!1sen!2sid!4v1781513744797!5m2!1sen!2sid",
    image: "/images/venue.jpg",
    imageAlt:
      "A warm golden-hour view of the Industrial Engineering (DTSI) building at ITS",
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
          { src: "/images/gallery/o-week/01.jpg", alt: "O-Week — Formal First", caption: "Formal First" },
          { src: "/images/gallery/o-week/02.jpg", alt: "O-Week — I look good", caption: "I look good" },
          { src: "/images/gallery/o-week/03.jpg", alt: "O-Week — Respect", caption: "Respect" },
          { src: "/images/gallery/o-week/04.jpg", alt: "O-Week — World Class", caption: "World Class" },
          { src: "/images/gallery/o-week/05.jpg", alt: "O-Week — cheeseee!", caption: "cheeseee!" },
          { src: "/images/gallery/o-week/06.jpg", alt: "O-Week — its hot today🥲", caption: "its hot today🥲" },
        ],
      },
      {
        cover: "/images/gallery/global-night/01.jpg",
        title: "Global Night",
        alt: "Global Night moments",
        photos: [
          { src: "/images/gallery/global-night/01.jpg", alt: "Global Night — Smile!", caption: "Smile!" },
          { src: "/images/gallery/global-night/02.jpg", alt: "Global Night — Takjil Gratis", caption: "Takjil Gratis" },
          { src: "/images/gallery/global-night/03.jpg", alt: "Global Night — hello guys", caption: "hello guys" },
          { src: "/images/gallery/global-night/04.jpg", alt: "Global Night — hmmm", caption: "hmmm" },
          { src: "/images/gallery/global-night/05.jpg", alt: "Global Night — late night gang", caption: "late night gang" },
          { src: "/images/gallery/global-night/06.jpg", alt: "Global Night — you lose", caption: "you lose" },
        ],
      },
      {
        cover: "/images/gallery/guf/01.jpg",
        title: "GUF",
        alt: "GUF moments",
        photos: [
          { src: "/images/gallery/guf/01.jpg", alt: "GUF — Booth Duty On", caption: "Booth Duty On" },
          { src: "/images/gallery/guf/02.jpg", alt: "GUF — Deep In Discussion?", caption: "Deep In Discussion?" },
          { src: "/images/gallery/guf/03.jpg", alt: "GUF — Explaining the History", caption: "Explaining the History" },
          { src: "/images/gallery/guf/04.jpg", alt: "GUF — Frame It Up", caption: "Frame It Up" },
          { src: "/images/gallery/guf/05.jpg", alt: "GUF — Full House", caption: "Full House" },
          { src: "/images/gallery/guf/06.jpg", alt: "GUF — Hello Netherland", caption: "Hello Netherland" },
        ],
      },
      {
        cover: "/images/gallery/jcc/01.jpg",
        title: "JCC",
        alt: "JCC moments",
        photos: [
          { src: "/images/gallery/jcc/01.jpg", alt: "JCC — Crazy Night", caption: "Crazy Night" },
          { src: "/images/gallery/jcc/02.jpg", alt: "JCC — Interesting", caption: "Interesting" },
          { src: "/images/gallery/jcc/03.jpg", alt: "JCC — Surviving The Rapids", caption: "Surviving The Rapids" },
          { src: "/images/gallery/jcc/04.jpg", alt: "JCC — 🎶🎵", caption: "🎶🎵" },
          { src: "/images/gallery/jcc/05.jpg", alt: "JCC — 👘", caption: "👘" },
        ],
      },
      {
        cover: "/images/gallery/sports-day/01.jpg",
        title: "Sports Day",
        alt: "Sports Day moments",
        photos: [
          { src: "/images/gallery/sports-day/01.jpg", alt: "Sports Day — Ain't gonna lose", caption: "Ain't gonna lose" },
          { src: "/images/gallery/sports-day/02.jpg", alt: "Sports Day — Catch HIM", caption: "Catch HIM" },
          { src: "/images/gallery/sports-day/03.jpg", alt: "Sports Day — First Place!", caption: "First Place!" },
          { src: "/images/gallery/sports-day/04.jpg", alt: "Sports Day — Get Ready", caption: "Get Ready" },
          { src: "/images/gallery/sports-day/05.jpg", alt: "Sports Day — I Got it", caption: "I Got it" },
          { src: "/images/gallery/sports-day/06.jpg", alt: "Sports Day — Lets Gather", caption: "Lets Gather" },
        ],
      },
      {
        cover: "/images/gallery/bromo/01.jpg",
        title: "Bromo Adventurous Trip",
        alt: "Bromo Adventurous Trip moments",
        photos: [
          { src: "/images/gallery/bromo/01.jpg", alt: "Bromo Adventurous Trip — Assemble", caption: "Assemble" },
          { src: "/images/gallery/bromo/02.jpg", alt: "Bromo Adventurous Trip — Jeep Adventure", caption: "Jeep Adventure" },
          { src: "/images/gallery/bromo/03.jpg", alt: "Bromo Adventurous Trip — Misty Bromo Morning", caption: "Misty Bromo Morning" },
          { src: "/images/gallery/bromo/04.jpg", alt: "Bromo Adventurous Trip — No Filter Needed", caption: "No Filter Needed" },
          { src: "/images/gallery/bromo/05.jpg", alt: "Bromo Adventurous Trip — Volcano Who?", caption: "Volcano Who?" },
          { src: "/images/gallery/bromo/06.jpg", alt: "Bromo Adventurous Trip — hi", caption: "hi" },
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
    deadlineLabel: "Please let us know by June 19, 2026",
  },

  audio: {
    enabled: true,
    // Pre-trimmed clip (~36s, ~551KB) so it loads fast and starts instantly.
    // It covers 00:46–01:22 of "Slipping Through My Fingers" by ABBA;
    // the loop points below are offsets *within this clip*. The few
    // seconds of lead-in/tail keep the loop points interior, which is what
    // makes the repeat perfectly seamless. To re-trim from a full song, run:
    //   node scripts/trim-mp3.mjs "<full.mp3>" "public/audio/slipping-through-my-fingers.mp3" 46 82
    src: "/audio/slipping-through-my-fingers.mp3",
    loopStart: 3,
    loopEnd: 33,
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
