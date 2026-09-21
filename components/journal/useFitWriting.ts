"use client";

import { RefObject, useEffect } from "react";

/*
  Keeps an act's writing inside the screen it is pinned to.

  A pinned scene cannot scroll — that is the whole point of pinning it —
  so anything taller than the box is not merely cut off, it is
  unreachable. On an iPhone, with the browser's own bars taking a chunk
  and the site's navbar taking another, the longest act was 180px taller
  than the room it had, and its heading sat under the navbar where nobody
  could ever see it.

  Tuning the type small enough for the longest act would have made the
  other five needlessly cramped, so instead every size and margin in the
  block is a multiple of one number, and this measures the block and sets
  that number. An act that fits is left alone at 1; only one that does
  not is brought down, and only as far as it needs.

  It aims a little short of the full height rather than at it. Filling
  the box exactly is what made the two long acts feel cramped next to
  the short ones: the acts that read well sit at two thirds to nine
  tenths of the room, with air above and below, and one that fills it
  wall to wall looks crammed even though nothing is wrong with it.

  When to step in and how far are two different numbers on purpose. An
  act at nine tenths is one of the good ones and must not be touched at
  all, so the trigger sits just above it; an act past the trigger is
  then taken down to nine tenths, which is not the trigger but the
  proportion of the fullest act that reads well. Stopping at the
  trigger would leave it as tight as the case being avoided, and going
  further would shrink the type more than the room it buys is worth.

  The floor is low because clipping is never the better outcome: small
  type you can read beats a heading you cannot reach. It is only ever
  approached on a window short enough that nothing would have fitted.
*/
/*
  Only on a wide screen. A phone screen filled with text is simply a
  phone screen; the same density across a desktop act is what reads as
  crammed. There, the rule is the plain one: scale only what would
  actually overflow, and only just enough.
*/
const WIDE = "(min-width: 768px)";

const TRIGGER = { wide: 0.92, narrow: 1 };
const TARGET = { wide: 0.9, narrow: 0.98 };

const FLOOR = 0.72;

export function useFitWriting(
  boxRef: RefObject<HTMLElement | null>,
  textRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const box = boxRef.current;
    const text = textRef.current;

    if (!box || !text) return;

    let raf = 0;

    const fit = () => {
      // Measure at full size, or each pass would compound the last one.
      text.style.setProperty("--j-fit", "1");

      const style = getComputedStyle(box);
      const available =
        box.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom);

      // Reading scrollHeight forces the layout, so this sees full size.
      const needed = text.scrollHeight;

      if (available <= 0) return;

      const room = window.matchMedia(WIDE).matches ? "wide" : "narrow";

      if (needed <= available * TRIGGER[room]) return;

      text.style.setProperty(
        "--j-fit",
        Math.max(FLOOR, (available * TARGET[room]) / needed).toFixed(3)
      );
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    };

    schedule();

    // The heading is set in a webfont; measuring before it lands measures
    // the fallback.
    document.fonts?.ready.then(schedule).catch(() => {});

    // Rotating the phone, or the browser's bars sliding away, changes the
    // box without changing the text.
    const resize = new ResizeObserver(schedule);

    resize.observe(box);

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
    };
  }, [boxRef, textRef]);
}
