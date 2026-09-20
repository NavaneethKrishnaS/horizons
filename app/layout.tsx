import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
  title: "HORIZONS",
  description: "Luxury travel experiences by Scenic Escapes",
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
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}