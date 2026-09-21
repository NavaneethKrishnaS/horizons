"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/*
  Add or reorder the hero photographs here — the rotation picks them up with
  no other changes. One entry is fine; it simply does not rotate.

  Keep them to three or four: every one is downloaded at full size while the
  visitor is looking at the first, so a long list costs load time on the page
  that matters most. WebP at around 2000px wide and under 300KB each.
*/
const HERO_IMAGES = [
  {
    src: "/images/hero/hero.png",
    alt: "Sunset over the Kerala coast",
  },
];

const INTERVAL_MS = 5000;
const FADE_MS = 1400;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length < 2) return;

    // Rotation is decoration, so hold still for anyone who has asked for less
    // movement.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;

    const start = () => {
      timer = window.setInterval(
        () => setIndex((current) => (current + 1) % HERO_IMAGES.length),
        INTERVAL_MS
      );
    };

    const stop = () => window.clearInterval(timer);

    // No point cycling photographs into a tab nobody is looking at — and the
    // browser throttles the timer there anyway, which makes the first change
    // after returning arrive at a random moment.
    const handleVisibility = () => {
      stop();

      if (document.visibilityState === "visible") start();
    };

    if (document.visibilityState === "visible") start();

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section className="relative flex min-h-lvh items-center justify-center overflow-hidden">
      {/*
        All the photographs are stacked and cross-faded on opacity alone.
        Nothing moves and nothing is laid out again, so the browser can hand
        the whole thing to the compositor.
      */}
      {HERO_IMAGES.map((image, position) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={position === 0}
          sizes="100vw"
          className="object-cover transition-opacity ease-in-out"
          style={{
            opacity: position === index ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}

      {/* Softer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center text-[#F7F4EE]">
        <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.55em] text-white/70">
          BY SCENIC ESCAPES
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
