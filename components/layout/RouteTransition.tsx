"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { PEACOCK_KEYFRAMES, paintPeacock } from "./peacock";

/*
  The curtain between pages. Same language as the arrival intro — black, the
  peacock opening from its centre — but compressed, and only when there is
  actually something to wait for.

  The App Router has no navigation events, so we watch link clicks to know a
  page change is coming, then watch the pathname to know it has arrived. If
  the new page is slow the curtain simply stays up until it lands.
*/

// Nothing appears for this long after a click. A page that is already
// prefetched arrives well inside it, so an instant navigation shows no
// curtain at all — it only turns up when there is actually a wait.
const APPEAR_AFTER_MS = 260;

// Once it appears it stays long enough for the bird to finish opening.
const MINIMUM_VISIBLE_MS = 720;

// Nothing should ever trap the visitor behind the curtain. If a navigation is
// cancelled or fails, it lifts anyway.
const MAXIMUM_VISIBLE_MS = 8000;

const FEATHER_WINDOW_MS = 340;
const FEATHER_DURATION_MS = 420;
const BREATHE_MS = 900;

// Held while the page is still on its way.
const WAITING_DELAY_MS = 900;

const MARK_EXIT_MS = 300;
const VEIL_EXIT_DELAY_MS = 110;
const VEIL_EXIT_MS = 380;
const EXIT_TOTAL_MS = VEIL_EXIT_DELAY_MS + VEIL_EXIT_MS;

type Phase = "hidden" | "showing" | "leaving";

export default function RouteTransition() {
  const pathname = usePathname();

  const [phase, setPhase] = useState<Phase>("hidden");
  const [origin, setOrigin] = useState("50% 50%");

  const markRef = useRef<HTMLDivElement>(null);
  const shownAt = useRef(0);
  const destination = useRef<string | null>(null);
  const appearTimer = useRef<number | undefined>(undefined);

  // Arm the curtain the moment an internal link is clicked.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      let url: URL;

      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // Leave external links, mailto/tel and same-page links alone.
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      destination.current = url.pathname;

      window.clearTimeout(appearTimer.current);

      appearTimer.current = window.setTimeout(() => {
        // Still waiting when the delay elapsed — show the curtain.
        if (destination.current) {
          shownAt.current = Date.now();
          setPhase("showing");
        }
      }, APPEAR_AFTER_MS);
    };

    /*
      Capture phase. Next's Link calls preventDefault() on its own click
      handler, which runs before a listener on document in the bubble phase —
      so a bubble listener only ever sees an already-defaultPrevented event
      and never fires.
    */
    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  // Paint the mark once the curtain is up.
  useEffect(() => {
    if (phase !== "showing" || !markRef.current) return;

    let cancelled = false;

    paintPeacock(markRef.current, {
      featherWindowMs: FEATHER_WINDOW_MS,
      featherDurationMs: FEATHER_DURATION_MS,
      wordmarkDelayMs: 0,
      wordmarkDurationMs: 0,
      hideWordmark: true,
      animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    })
      .then((value) => {
        if (!cancelled && value) setOrigin(value);
      })
      .catch(() => {
        // The curtain still lifts on schedule without the mark.
      });

    return () => {
      cancelled = true;
    };
  }, [phase]);

  // The new page has arrived: cancel a curtain that never appeared, and start
  // lifting one that did — but never before the minimum.
  useEffect(() => {
    if (destination.current && pathname !== destination.current) return;

    window.clearTimeout(appearTimer.current);
    destination.current = null;

    if (phase !== "showing") return;

    const remaining = Math.max(
      0,
      MINIMUM_VISIBLE_MS - (Date.now() - shownAt.current)
    );

    const leave = setTimeout(() => setPhase("leaving"), remaining);
    const remove = setTimeout(
      () => setPhase("hidden"),
      remaining + EXIT_TOTAL_MS
    );

    return () => {
      clearTimeout(leave);
      clearTimeout(remove);
    };
  }, [pathname, phase]);

  // Failsafe.
  useEffect(() => {
    if (phase !== "showing") return;

    const timeout = setTimeout(() => {
      destination.current = null;
      setPhase("hidden");
    }, MAXIMUM_VISIBLE_MS);

    return () => clearTimeout(timeout);
  }, [phase]);

  if (phase === "hidden") return null;

  const isLeaving = phase === "leaving";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      data-overlay="route"
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(85% 65% at 50% 50%, #0b0b0b 0%, #000000 62%)",
        opacity: isLeaving ? 0 : 1,
        transition: isLeaving
          ? `opacity ${VEIL_EXIT_MS}ms ease-out ${VEIL_EXIT_DELAY_MS}ms`
          : "opacity 180ms ease-out",
      }}
    >
      <style>{`
        ${PEACOCK_KEYFRAMES}

        @media (prefers-reduced-motion: reduce) {
          [data-overlay="route"] * {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      <div
        aria-hidden
        style={{
          transformOrigin: origin,
          transform: isLeaving ? "scale(1.04)" : "scale(1)",
          opacity: isLeaving ? 0 : 1,
          transition: `opacity ${MARK_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${MARK_EXIT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          willChange: "transform, opacity",
        }}
      >
        <div
          style={{
            transformOrigin: origin,
            /*
              Opens like the intro, then keeps breathing for as long as the
              page takes. A slow pulse rather than a spinner.
            */
            animation: `horizons-breathe ${BREATHE_MS}ms cubic-bezier(0.16, 1, 0.3, 1) both, horizons-waiting 2000ms ease-in-out ${WAITING_DELAY_MS}ms infinite`,
            willChange: "transform, opacity",
          }}
        >
          <div ref={markRef} className="w-[110px] md:w-[130px]" />
        </div>
      </div>
    </div>
  );
}
