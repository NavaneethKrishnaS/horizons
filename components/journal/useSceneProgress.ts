"use client";

import { RefObject, useEffect } from "react";

/*
  Publishes two numbers on the section as it passes through the screen:

    --p  progress, 0 to 1
    --e  the same eased

  Two things make this feel like film rather than like a scrollbar.

  The value is damped. Each frame it moves a fraction of the way toward
  where the scroll actually is, rather than jumping straight there. A
  trackpad delivers scroll in coarse, uneven steps; following them exactly
  is what makes scroll-driven motion look mechanical. Chasing them smooths
  the steps out without touching native scrolling at all — no scroll
  hijacking, no broken trackpad momentum, no accessibility cost.

  And the loop only runs for sections actually on screen. An observer
  starts and stops it, so at most two sections are doing any work; the
  other four cost nothing.
*/

// How far the value closes on the target in one 60Hz frame. Lower is
// smoother and heavier; higher is tighter and more literal. The exponent
// below rescales it for the real frame time, so a 120Hz screen gets the
// same weight rather than twice the speed.
const FOLLOW = 0.12;
const FRAME = 1000 / 60;

const SETTLED = 0.0004;

export function useSceneProgress(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--p", "0.5");
      node.style.setProperty("--e", "0.5");
      return;
    }

    let frame = 0;
    let onScreen = false;
    let current = -1;
    let last = 0;

    const targetNow = () => {
      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const raw = span > 0 ? -rect.top / span : 0;

      return Math.min(1, Math.max(0, raw));
    };

    const write = (p: number) => {
      // easeInOutCubic
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      node.style.setProperty("--p", p.toFixed(4));
      node.style.setProperty("--e", e.toFixed(4));
    };

    const tick = (now: number) => {
      const target = targetNow();

      // Clamped, because a backgrounded tab hands back a huge first delta.
      const dt = last ? Math.min(now - last, 64) : FRAME;

      last = now;

      const follow = 1 - Math.pow(1 - FOLLOW, dt / FRAME);

      current += (target - current) * follow;

      if (Math.abs(target - current) < SETTLED) current = target;

      write(current);

      // Keep going while it is on screen, or while it is still catching up.
      if (onScreen || Math.abs(target - current) >= SETTLED) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const start = () => {
      if (frame) return;

      last = 0;
      frame = requestAnimationFrame(tick);
    };

    // Land on the right value immediately rather than sliding in from zero.
    current = targetNow();
    write(current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;

        if (onScreen) start();
      },
      { rootMargin: "20% 0px" }
    );

    observer.observe(node);

    const onResize = () => {
      current = targetNow();
      write(current);
    };

    window.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);

      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);
}
