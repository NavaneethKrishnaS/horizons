"use client";

import { useEffect } from "react";

/*
  One scroll lock for the whole site, counted.

  Six components used to lock page scrolling on their own — the mobile menu,
  the booking sheet, the intro, the gallery lightbox and both modals — and
  they trod on each other:

    * Most set overflow to "hidden" and cleared it to "" on the way out, so
      whichever closed first unlocked the page while another overlay was
      still open.
    * The mobile menu instead restored whatever value it found. If it opened
      while something else had already locked the page, it restored "hidden"
      on close and the page stayed frozen for good.
    * Some locked <html> and others <body>, so the two could not even see
      each other's lock.

  Counting fixes all three: the page is locked while at least one overlay
  wants it locked, and released once — to its original value — when the last
  one lets go.
*/

let depth = 0;
let previousOverflow = "";
let previousPaddingRight = "";

export function lockScroll() {
  if (typeof document === "undefined") return;

  depth += 1;

  if (depth > 1) return;

  const root = document.documentElement;

  previousOverflow = root.style.overflow;
  previousPaddingRight = root.style.paddingRight;

  // Hold the page still where a scrollbar takes up width, so the layout does
  // not jump sideways as an overlay opens. Phones have no such gap.
  const scrollbar = window.innerWidth - root.clientWidth;

  if (scrollbar > 0) {
    root.style.paddingRight = `${scrollbar}px`;
  }

  root.style.overflow = "hidden";
}

export function unlockScroll() {
  if (typeof document === "undefined") return;
  if (depth === 0) return;

  depth -= 1;

  if (depth > 0) return;

  const root = document.documentElement;

  root.style.overflow = previousOverflow;
  root.style.paddingRight = previousPaddingRight;
}

/** Locks page scrolling for as long as `active` is true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    lockScroll();

    return unlockScroll;
  }, [active]);
}
