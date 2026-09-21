"use client";

import { RefObject, useEffect } from "react";

/*
  Publishes two numbers on the section as it passes through the screen:

    --p  progress, 0 to 1
    --e  the same eased

  Progress starts when the section first appears at the bottom of the
  screen, not when it reaches the top of it.

  This matters more than it sounds. A pinned section is only pinned for
  all but its last screenful; after that it rides up and away while the
  next one climbs into the space. If progress only began at the pin, the
  arriving section spent that whole screen at zero — objects still off
  stage, writing still at zero opacity — and what you actually saw
  between one act and the next was a screen of blank paper. Starting a
  screen early means the next act is already alive as it arrives, which
  is the difference between a cut and a gap.

  Three more things make this feel like film rather than like a scrollbar.

  The value is damped. Each frame it moves a fraction of the way toward
  where the scroll actually is, rather than jumping straight there. A wheel
  or a trackpad delivers scroll in coarse, uneven steps; following them
  exactly is what makes scroll-driven motion look mechanical. Chasing them
  smooths the steps out without touching native scrolling at all — no
  scroll hijacking, no broken trackpad momentum, no accessibility cost.

  Nothing is measured while scrolling. The section's position is taken
  once and re-taken only when the layout actually changes, so the frame
  loop never asks the browser to lay the page out mid-scroll — which is
  the usual reason a scroll-driven page stutters.

  And the loop only runs for sections on screen. An observer starts and
  stops it, so at most two sections are doing any work; the rest cost
  nothing.
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
    let written = -1;

    // Where the run begins and how much scrolling it takes to cross.
    // Measured outside the frame loop.
    let begin = 0;
    let span = 1;

    const measure = () => {
      const top = node.getBoundingClientRect().top + window.scrollY;

      // Clamped at the top of the document, which is what keeps the first
      // section honest: it has no approach to play, so it starts at zero
      // rather than already part-way through.
      begin = Math.max(0, top - window.innerHeight);

      /*
        One section height of travel, always: a screen of approach and
        then the pin. For the first section, where there is no approach
        to be had, the same distance instead carries it through its own
        exit — so it is still drawn as it rides away rather than being
        finished and blank while the next act climbs past it.
      */
      span = Math.max(1, node.offsetHeight);
    };

    const targetNow = () => {
      const raw = (window.scrollY - begin) / span;

      return Math.min(1, Math.max(0, raw));
    };

    const write = (p: number) => {
      // easeInOutCubic
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      node.style.setProperty("--p", p.toFixed(4));
      node.style.setProperty("--e", e.toFixed(4));
      written = p;
    };

    const tick = (now: number) => {
      const target = targetNow();

      // Clamped, because a backgrounded tab hands back a huge first delta.
      const dt = last ? Math.min(now - last, 64) : FRAME;

      last = now;

      current += (target - current) * (1 - Math.pow(1 - FOLLOW, dt / FRAME));

      if (Math.abs(target - current) < SETTLED) current = target;

      // Skip the style write when nothing visible would change.
      if (Math.abs(current - written) >= 0.00005) write(current);

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
    measure();
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

    // The page grows as artwork loads and fonts settle; remeasure then
    // rather than every frame.
    const remeasure = () => {
      measure();

      if (onScreen) start();
      else {
        current = targetNow();
        write(current);
      }
    };

    const resize = new ResizeObserver(remeasure);

    resize.observe(document.documentElement);
    resize.observe(node);

    window.addEventListener("resize", remeasure);

    return () => {
      if (frame) cancelAnimationFrame(frame);

      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [ref]);
}
