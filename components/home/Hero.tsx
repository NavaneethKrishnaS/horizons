"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/*
  The hero.

  A photograph, always — it is what the first paint shows, what a slow
  connection keeps, and what anyone who has asked for less movement
  sees. If HERO_VIDEO is set, a muted loop fades in over the top of it
  once the browser says it can actually play the thing; if it never
  says so, nothing happens and nobody notices.

  To put a film here:

    1. Drop the source file anywhere and run, on the Mac,
       scripts/encode-hero.sh <source>. It writes
       public/video/hero.mp4 and hero.webm at 1920 wide, no audio.
    2. Set HERO_VIDEO below.
    3. Keep the poster in step with the film's first frame — the
       script writes public/images/hero/hero-poster.jpg for exactly
       that.

  Keep the loop to twelve or fifteen seconds and under about 6MB. It is
  the first thing a visitor downloads, and a minute of drone footage is
  a minute they spend looking at nothing.
*/
const HERO_IMAGE = {
  src: "/images/hero/hero.png",
  alt: "Sunset over the Kerala coast",
};

const HERO_VIDEO: { mp4: string; webm?: string } | null = null;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!HERO_VIDEO) return;

    const node = videoRef.current;

    if (!node) return;

    /*
      Three reasons not to fetch several megabytes of film: the visitor
      has asked for less movement, the browser is in data-saver mode,
      or it is telling us the connection is slow. In all three the
      photograph is the whole hero, which is why the photograph is not
      a fallback but the base layer.
    */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    if (connection?.saveData) return;

    if (
      connection?.effectiveType &&
      /^(slow-)?2g$|^3g$/.test(connection.effectiveType)
    ) {
      return;
    }

    const show = () => setPlaying(true);

    node.addEventListener("playing", show, { once: true });

    node.load();

    // Autoplay is refused often enough — a battery-saving phone, a
    // browser setting — that it has to be treated as normal.
    node.play().catch(() => {});

    return () => node.removeEventListener("playing", show);
  }, []);

  return (
    <section className="relative flex min-h-lvh items-center justify-center overflow-hidden bg-[#111111]">
      <Image
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {HERO_VIDEO ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out"
          style={{ opacity: playing ? 1 : 0 }}
        >
          {HERO_VIDEO.webm ? (
            <source src={HERO_VIDEO.webm} type="video/webm" />
          ) : null}
          <source src={HERO_VIDEO.mp4} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/40"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-[#F7F4EE]">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.55em] text-white/70">
          By Scenic Escapes
        </p>

        <h1 className="font-cormorant text-[72px] font-medium leading-none tracking-[-0.02em] md:text-[118px] lg:text-[150px]">
          HORIZONS
        </h1>

        <p className="mt-8 max-w-xl text-[22px] font-light leading-relaxed text-white/85 md:text-[28px]">
          Find Your Next Horizon.
        </p>

        <Link
          href="/houseboats"
          className="group mt-12 flex items-center gap-2 text-[17px] font-normal tracking-wide text-white/90 transition-colors duration-300 hover:text-white"
        >
          <span>Begin Journey</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
