"use client";

import { useEffect } from "react";

/*
  One scale for the whole Journal, or none at all.

  The acts are set identically — same type, same measure, same leading —
  and the page is built so that the longest of them has room to breathe
  at those settings. Nothing here is needed on a normal screen.

  Its threshold is almost one: the air an act has is the job of the
  system above, not of this. This only stops writing being lost.

  It exists for the screen that is too short for even the shortest act,
  where the choice is between smaller type and a heading nobody can
  reach. When that happens every act comes down by the same amount,
  decided by whichever one is worst off. Scaling only the act that is
  struggling would fix that act and break the page: five scenes set five
  different sizes is not a page, it is five pages.
*/
const TARGET = 0.98;
const FLOOR = 0.72;

export default function SceneFit() {
  useEffect(() => {
    const root = document.documentElement;

    let raf = 0;
    let applied = "1";

    const measure = () => {
      // Measure at full size, or each pass compounds the last.
      if (applied !== "1") {
        root.style.setProperty("--j-fit", "1");
        applied = "1";
      }

      let worst = 1;

      for (const stage of document.querySelectorAll<HTMLElement>(".j-stage")) {
        const text = stage.querySelector<HTMLElement>(".j-writing");

        if (!text) continue;

        const style = getComputedStyle(stage);
        const available =
          stage.clientHeight -
          parseFloat(style.paddingTop) -
          parseFloat(style.paddingBottom);

        if (available <= 0) continue;

        // Reading scrollHeight forces the layout, so this is full size.
        const needed = text.scrollHeight;

        if (needed <= available * TARGET) continue;

        worst = Math.min(worst, (available * TARGET) / needed);
      }

      const next = worst < 1 ? Math.max(FLOOR, worst).toFixed(3) : "1";

      if (next === applied) return;

      root.style.setProperty("--j-fit", next);
      applied = next;
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();

    // The heading is set in a webfont; measuring before it lands measures
    // the fallback.
    document.fonts?.ready.then(schedule).catch(() => {});

    // Rotating the phone, or the browser's bars sliding away, changes the
    // stage without changing the text.
    const resize = new ResizeObserver(schedule);

    resize.observe(root);

    for (const stage of document.querySelectorAll(".j-stage")) {
      resize.observe(stage);
    }

    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return null;
}
