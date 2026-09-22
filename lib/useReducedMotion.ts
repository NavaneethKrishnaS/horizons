"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/*
  Whether the visitor has asked their system for less movement.

  Read through useSyncExternalStore rather than with a state flag set
  inside an effect: the server and the first client render agree on
  false, React swaps in the real answer as part of hydration, and a
  visitor who changes the setting while the page is open is followed
  without a listener in every component.
*/
function subscribe(onChange: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }

  const query = window.matchMedia(QUERY);

  query.addEventListener("change", onChange);

  return () => query.removeEventListener("change", onChange);
}

function read() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia(QUERY).matches;
}

function onServer() {
  return false;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, read, onServer);
}
