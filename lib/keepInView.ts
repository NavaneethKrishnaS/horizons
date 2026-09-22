"use client";

import { RefObject, useEffect, useRef } from "react";

import { useReducedMotion } from "@/lib/useReducedMotion";

/*
  Keeps a filtered list on screen when filtering shortens the page.

  Sixty-five stays are twenty thousand pixels. Filter to the three in the
  hill country while you are ten thousand pixels down and the page becomes
  three thousand pixels long, the browser clamps the scroll position to
  the new bottom, and you are standing in the footer looking at a call to
  action — having just asked to see the hill country. The results are a
  thousand pixels above your head and nothing tells you so.

  So: after the set changes, if none of it is on screen any more, bring
  the top of it back. If any part of the results is still visible the
  reader has their bearings and is left alone — which is what stops this
  from yanking the page on every keystroke of a search.
*/
export function useKeepResultsInView(
  results: RefObject<HTMLElement | null>,
  /*
    Whatever identifies the current set. A change to it is the signal to
    check; the value itself is never read.
  */
  set: string,
  /*
    The sticky thing above the results, where there is one. On a phone the
    index lies on top of the list, so scrolling the list to the top of the
    window would slide its first row underneath the index.
  */
  header?: RefObject<HTMLElement | null>
) {
  const still = useReducedMotion();

  /* The first run is the page arriving, not the reader filtering. */
  const settled = useRef(false);

  useEffect(() => {
    if (!settled.current) {
      settled.current = true;

      return;
    }

    const node = results.current;

    if (!node) return;

    const navHeight =
      Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--horizons-nav"
        ),
        10
      ) || 72;

    const box = node.getBoundingClientRect();

    /* Still something to see. Leave them where they are. */
    if (box.bottom > navHeight + 80) return;

    /*
      Beside the results rather than above them means it is not in the
      way — same offsetParent, so the same x is the whole test, and no
      breakpoint to keep in step with the class list.
    */
    const head = header?.current;
    const stacked = head ? head.offsetLeft === node.offsetLeft : false;

    const clearance = navHeight + 24 + (stacked && head ? head.offsetHeight : 0);

    window.scrollTo({
      top: Math.max(0, window.scrollY + box.top - clearance),
      behavior: still ? "auto" : "smooth",
    });
  }, [set, results, header, still]);
}
