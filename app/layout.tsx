import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RouteTransition from "@/components/layout/RouteTransition";
import IntroScreen from "@/components/layout/IntroScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  /*
    Absolute URLs are built from this. Without it, a canonical written as
    "/company" is emitted exactly like that — valid, but Google would
    rather be told plainly, and og: images cannot be resolved at all.
  */
  metadataBase: new URL("https://horizonsindia.com"),

  /*
    The fallback for any page that does not set its own, which should be
    none of them: a search result reading HORIZONS and nothing else tells
    a person nothing about what they are about to open.
  */
  title: "HORIZONS by Scenic Escapes | Luxury travel in Kerala and India",
  description:
    "Kettuvallam houseboats on the Kerala backwaters, small hotels and family houses across India, and journeys arranged by the people who run them.",
};

export const viewport: Viewport = {
  themeColor: "#111111",
  // Lets the page extend into the iOS safe areas (the home-indicator strip
  // at the bottom). Without it iOS lays content out inside the safe area
  // and fills that strip with the page background instead.
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${cormorant.variable}
        h-full
        antialiased
      `}
    >
      <body className="flex min-h-full flex-col bg-[#111111]">
        <IntroScreen />

        <RouteTransition />

        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}