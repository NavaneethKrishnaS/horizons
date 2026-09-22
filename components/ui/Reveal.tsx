"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/useReducedMotion";

interface RevealProps {
  children: ReactNode;
  /* Milliseconds. Use it to stagger a row or a list. */
  delay?: number;
  /* How far it travels before it settles. */
  distance?: number;
  className?: string;
}

/*
  Lifts its children into place the first time they come into view, once.

  An observer rather than a scroll handler, so it costs nothing while
  scrolling. The easing is a long tail — most of the distance is covered
  early and the last few pixels take their time, which is what makes a
  movement read as expensive rather than as a transition.
*/
export default function Reveal({
  children,
  delay = 0,
  distance = 26,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  /*
    Someone who has asked for less movement gets the finished state
    straight away. Every other animation on the page respects this;
    this one, the most used of them, did not.
  */
  const still = useReducedMotion();

  useEffect(() => {
    const node = ref.current;

    if (!node || still) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeout = setTimeout(() => setShown(true), 0);

      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [still]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown || still ? 1 : 0,
        transform: shown || still ? "translateY(0)" : `translateY(${distance}px)`,
        transition: still
          ? "none"
          : `opacity 1000ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
