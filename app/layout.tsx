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
      className={`${pixelify.variable} ${pressStart.variable} ${nunito.variable}`}
    >
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
