"use client";

import { RefObject, useEffect } from "react";

/*
  Writes a single number onto a section as the CSS variable --p: 0 when the
  section's top reaches the bottom of the screen, 1 when its bottom leaves
  the top. Objects inside then position themselves with calc() against it.

  One listener for the whole page, coalesced into one animation frame, and
  one style write per section per frame. Everything downstream is a
  transform, so the compositor does the rest — no layout, no paint. This is
  the shape that scroll animation has to take on this site; the version that
  read scrollHeight inside the scroll event is what made it stutter before.
*/
export function useSceneProgress(
  ref: RefObject<HTMLElement | null>,
  enabled = true
) {
  useEffect(() => {
    const node = ref.current;

    if (!node || !enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--p", "0.5");
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;

      const rect = node.getBoundingClientRect();
      const span = rect.height + window.innerHeight;
      const progress = (window.innerHeight - rect.top) / span;

      node.style.setProperty("--p", String(Math.min(1, Math.max(0, progress))));
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
  }, [ref, enabled]);
}
