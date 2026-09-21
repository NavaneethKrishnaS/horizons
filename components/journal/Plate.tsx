"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

/*
  Inks a plate onto the page the first time it comes into view.

  The artwork on this page is engraving, so the reveal is the one an
  engraving would have: the image develops from the top down behind a soft
  edge, the way ink meets paper coming off a press, rather than sliding in
  or fading up like a photograph. A breath of scale settles underneath it
  so the plate arrives rather than simply appearing.

  The soft edge is a mask whose gradient stop is animated, which needs the
  stop to be a registered custom property — an unregistered one jumps at
  the halfway point instead of interpolating. Where @property is missing
  the plate still lands, just in one step.

  The rule ships with the component, since styles added to globals.css in
  this project have twice failed to reach the browser.
*/
const PLATE_MS = 1600;

export default function Plate({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inked, setInked] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timeout = setTimeout(() => setInked(true), 0);

      return () => clearTimeout(timeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setInked(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -16% 0px", threshold: 0.01 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @property --plate-ink {
          syntax: "<percentage>";
          inherits: false;
          initial-value: -30%;
        }

        .horizons-plate {
          --plate-ink: -30%;
          -webkit-mask-image: linear-gradient(
            to bottom,
            #000 var(--plate-ink),
            transparent calc(var(--plate-ink) + 30%)
          );
          mask-image: linear-gradient(
            to bottom,
            #000 var(--plate-ink),
            transparent calc(var(--plate-ink) + 30%)
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          transform: scale(1.035);
          opacity: 0;
        }

        .horizons-plate-inked {
          animation:
            horizons-plate-ink ${PLATE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both,
            horizons-plate-settle ${PLATE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes horizons-plate-ink {
          from { --plate-ink: -30%; }
          to   { --plate-ink: 100%; }
        }

        @keyframes horizons-plate-settle {
          from { transform: scale(1.035); opacity: 0; }
          10%  { opacity: 1; }
          to   { transform: scale(1); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-plate {
            -webkit-mask-image: none;
            mask-image: none;
            transform: none;
            opacity: 1;
            animation: none !important;
          }
        }
      `}</style>

      <div
        ref={ref}
        className={`horizons-plate${inked ? " horizons-plate-inked" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
