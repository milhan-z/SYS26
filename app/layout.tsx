import type { Metadata, Viewport } from "next";
import { Nunito, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.meta.title,
  description: site.meta.description,
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b110a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pixelify.variable} ${pressStart.variable} ${nunito.variable}`}
    >
      <head>
        {/* Preload critical images so they're ready before the user scrolls */}
        {site.venue.image && (
          <link rel="preload" as="image" href={site.venue.image} />
        )}
        {site.memories.albums.map((album, i) =>
          album.cover ? (
            <link key={i} rel="preload" as="image" href={album.cover} />
          ) : null,
        )}
        {/*
          Opt into the gated "intro" experience before first paint, so the page
          opens on the title screen with no flash of the hero behind it. If this
          script is blocked (or JS is off), `js`/`pre-enter` are never set and
          the page renders as a normal, fully-readable, scrollable document.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js','pre-enter');" +
              // every fresh open / reload starts from the landing, at the top
              "if('scrollRestoration' in history){history.scrollRestoration='manual';}",
          }}
        />
      </head>
      <body className="antialiased">
        <noscript>
          {/* without JS, make scroll-reveal content visible immediately */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a href="#details" className="skip-link pix-sm">
          Skip to event details
        </a>
        {children}
      </body>
    </html>
  );
}
