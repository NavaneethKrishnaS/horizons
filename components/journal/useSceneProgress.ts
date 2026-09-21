"use client";

import { RefObject, useEffect } from "react";

/*
  Publishes two numbers on the section as it passes through the screen:

    --p  linear progress, 0 to 1
    --e  the same eased, so entrances settle rather than arriving at a
         constant speed

  One listener for the page, coalesced into a single animation frame, and
  one style write per section per frame. Everything downstream is a CSS
  calc() on a transform, so no layout and no paint while scrolling.
*/
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

    const measure = () => {
      frame = 0;

      const rect = node.getBoundingClientRect();
      const span = rect.height - window.innerHeight;

      const raw = span > 0 ? -rect.top / span : 0;
      const p = Math.min(1, Math.max(0, raw));

      // easeInOutCubic
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      node.style.setProperty("--p", p.toFixed(4));
      node.style.setProperty("--e", e.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;

      frame = requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}
