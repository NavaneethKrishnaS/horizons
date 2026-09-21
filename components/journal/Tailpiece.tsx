"use client";

import Image from "next/image";

/*
  The mark the page signs off with.

  It is a single feather rather than the full peacock on purpose: the
  peacock is already sitting in the navbar, and meeting it twice on one
  screen reads as a stray logo instead of as a closing flourish. A printer
  ends a book with a small ornament, not with the house's trademark.

  The sway is deliberately slow and slightly irregular — four stops at odd
  intervals over eleven seconds, pivoting at the tip of the quill — so it
  reads as still air rather than as an animation looping. The rule ships
  with the component, since styles added to globals.css in this project
  have twice failed to reach the browser.
*/
export default function Tailpiece() {
  return (
    <>
      <style>{`
        @keyframes horizons-feather-sway {
          0%   { transform: rotate(-1.1deg) translateY(0);     }
          27%  { transform: rotate(0.7deg)  translateY(-4px);  }
          53%  { transform: rotate(1.2deg)  translateY(1px);   }
          78%  { transform: rotate(-0.4deg) translateY(-2px);  }
          100% { transform: rotate(-1.1deg) translateY(0);     }
        }

        .horizons-feather {
          transform-origin: 50% 96%;
          animation: horizons-feather-sway 11s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-feather { animation: none; }
        }
      `}</style>

      <div className="horizons-feather mx-auto mt-20 w-[92px] md:mt-28 md:w-[116px]">
        <Image
          src="/images/journal/feather.webp"
          alt="The HORIZONS peacock feather"
          width={700}
          height={1596}
          sizes="116px"
          className="h-auto w-full"
        />
      </div>
    </>
  );
}
