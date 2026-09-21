"use client";

import { useEffect, useRef, useState } from "react";

import { PEACOCK_KEYFRAMES, paintPeacock } from "./peacock";

import { useScrollLock } from "@/lib/scrollLock";

/*
  First-arrival intro. Black screen, the peacock opens out feather by feather,
  the wordmark settles underneath, then the screen opens onto the site.

  Rendered by default so it is already painted on the very first frame; if this
  browser session has seen it, it is dropped on the next frame instead.
*/

const SESSION_KEY = "horizons:intro-shown";

const FEATHER_WINDOW_MS = 620;
const FEATHER_DURATION_MS = 640;

// One transform, on one element, running under the whole build.
const BREATHE_MS = 1700;

const WORDMARK_DELAY_MS = 720;
const WORDMARK_DURATION_MS = 640;

// Drawn by ~1.36s, then a beat of stillness before it lifts.
const HOLD_MS = 1620;

// The mark goes first and the veil follows, rather than both dissolving
// together — the screen opens instead of simply fading.
const MARK_EXIT_MS = 560;
const VEIL_EXIT_DELAY_MS = 200;
const VEIL_EXIT_MS = 780;
const EXIT_TOTAL_MS = VEIL_EXIT_DELAY_MS + VEIL_EXIT_MS;

type Phase = "intro" | "leaving" | "done";

export default function IntroScreen() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [origin, setOrigin] = useState("50% 45%");

  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alreadyShown = false;

    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Private mode or blocked storage — treat it as a first visit.
    }

    /*
      Not requestAnimationFrame. A browser runs no animation frames at all
      while its tab is in the background, so on a phone — where opening a
      link and glancing at another app is normal — the callback that takes
      this screen down would never run. The visitor came back to a black
      screen over a page they could not scroll or tap. A timeout still fires
      in a background tab, throttled but reliably.
    */
    if (alreadyShown) {
      const immediately = setTimeout(() => setPhase("done"), 0);

      return () => clearTimeout(immediately);
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Ignore.
    }

    const startedAt = Date.now();

    const leave = setTimeout(() => setPhase("leaving"), HOLD_MS);
    const remove = setTimeout(() => setPhase("done"), HOLD_MS + EXIT_TOTAL_MS);

    /*
      Background tabs also throttle timers, and CSS animations stop entirely,
      so someone returning after a while would find the intro frozen part-way
      through. If its time is already up when they come back, end it at once.
    */
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - startedAt < HOLD_MS) return;

      setPhase("done");
    };

    // And whatever else happens, a tap takes it away. No visitor should ever
    // be stuck behind this.
    const dismiss = () => setPhase("done");

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pointerdown", dismiss);

    return () => {
      clearTimeout(leave);
      clearTimeout(remove);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pointerdown", dismiss);
    };
  }, []);

  useScrollLock(phase !== "done");

  useEffect(() => {
    if (phase !== "intro" || !markRef.current) return;

    let cancelled = false;

    paintPeacock(markRef.current, {
      featherWindowMs: FEATHER_WINDOW_MS,
      featherDurationMs: FEATHER_DURATION_MS,
      wordmarkDelayMs: WORDMARK_DELAY_MS,
      wordmarkDurationMs: WORDMARK_DURATION_MS,
      animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    })
      .then((value) => {
        if (!cancelled && value) setOrigin(value);
      })
      .catch(() => {
        // If the file cannot be read the screen still lifts on schedule.
      });

    return () => {
      cancelled = true;
    };
  }, [phase]);

  if (phase === "done") return null;

  const isLeaving = phase === "leaving";

  return (
    <div
      role="status"
      aria-label="Loading"
      data-overlay="intro"
      className="fixed inset-0 z-[3000] flex items-center justify-center overflow-hidden"
      style={{
        // True black, lifted very slightly behind the mark so it reads as
        // deep and glossy rather than a flat grey field.
        background:
          "radial-gradient(85% 65% at 50% 44%, #0b0b0b 0%, #000000 62%)",
        opacity: isLeaving ? 0 : 1,
        transition: `opacity ${VEIL_EXIT_MS}ms ease-out ${VEIL_EXIT_DELAY_MS}ms`,
      }}
    >
      <style>{`
        ${PEACOCK_KEYFRAMES}

        @media (prefers-reduced-motion: reduce) {
          [data-overlay="intro"] * {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/*
        Two layers so the entrance and the exit never fight over the same
        transform: the outer one owns the exit, the inner one the slow scale
        that runs underneath the whole build.
      */}
      <div
        aria-hidden
        style={{
          transformOrigin: origin,
          transform: isLeaving ? "scale(1.05)" : "scale(1)",
          opacity: isLeaving ? 0 : 1,
          transition: `opacity ${MARK_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${MARK_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            transformOrigin: origin,
            animation: `horizons-breathe ${BREATHE_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both`,
            willChange: "transform",
          }}
        >
          <div ref={markRef} className="w-[210px] md:w-[280px]" />
        </div>
      </div>
    </div>
  );
}
