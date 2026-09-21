"use client";

import Image from "next/image";

/*
  The mark the page signs off with.

  It is a single feather rather than the full peacock on purpose: the
  peacock is already sitting in the navbar, and meeting it twice on one
  screen reads as a stray logo instead of as a closing flourish. A printer
  ends a book with a small ornament, not with the house's trademark.

  The sway is deliberately slow and irregular — five stops at uneven
  intervals over thirteen seconds — so it reads as air moving rather than
  as an animation looping. The rule ships with the component, since styles
  added to globals.css in this project have twice failed to reach the
  browser.
*/
export default function Tailpiece() {
  return (
    <>
      <style>{`
        @keyframes horizons-feather-sway {
          0%   { transform: rotate(-2.2deg) translateY(0)    scale(1);     }
          23%  { transform: rotate(1.4deg)  translateY(-7px) scale(1.012); }
          41%  { transform: rotate(2.4deg)  translateY(-2px) scale(1.006); }
          64%  { transform: rotate(-0.6deg) translateY(-5px) scale(1.014); }
          82%  { transform: rotate(-1.7deg) translateY(1px)  scale(1.003); }
          100% { transform: rotate(-2.2deg) translateY(0)    scale(1);     }
        }

        /*
          Pivoting at the tip of the quill, so the eye of the feather
          travels furthest — the way a feather stood in a jar moves when
          someone walks past it.
        */
        .horizons-feather {
          transform-origin: 50% 96%;
          animation: horizons-feather-sway 13s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-feather { animation: none; }
        }
      `}</style>

      <div className="horizons-feather mx-auto mt-20 w-[104px] md:mt-28 md:w-[132px]">
        <Image
          src="/images/journal/feather.webp"
          alt="The HORIZONS peacock feather"
          width={700}
          height={1596}
          sizes="132px"
          className="h-auto w-full"
        />
      </div>
    </>
  );
}
