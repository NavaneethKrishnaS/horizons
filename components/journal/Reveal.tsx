"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/*
  Lifts its children into place the first time they come into view.

  An observer rather than a scroll handler: it costs nothing while scrolling,
  which matters on a page this long. The rule ships with the component, since
  styles added to globals.css in this project have twice failed to reach the
  browser.
*/
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    // No observer means a browser old enough that the safe thing is simply
    // to show the content. Deferred by a tick so it is not a synchronous
    // state change inside the effect.
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
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
