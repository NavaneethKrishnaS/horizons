import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import { MAP, districts } from "@/data/keralaMap";

/*
  The way out of the short answers and into the long ones.

  Sits under the Getting here questions, because that is where somebody
  reading "which airport should I fly into?" decides they want the whole
  story. The silhouette is the same geometry as the map on the guide,
  drawn once and still — enough to say there is a map through here
  without pretending to be one.

  On hover, olive light gathers inside the border and drifts upward, the
  way mist comes off the water at six in the morning. Three soft radial
  gradients on long, mismatched loops, so it never repeats visibly.

  All of it is transform and opacity — no blur filter, which is the
  expensive way to make fog and would cost a repaint of the whole panel
  every frame. The animations are paused until the pointer arrives, so a
  panel nobody is touching costs nothing at all.
*/
export default function GettingHerePanel() {
  return (
    <Reveal delay={120}>
      <style>{`
        .horizons-fog {
          position: absolute;
          border-radius: 9999px;
          will-change: transform, opacity;
          animation-play-state: paused;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .group:hover .horizons-fog,
        .group:focus-visible .horizons-fog {
          animation-play-state: running;
        }

        @keyframes horizons-fog-one {
          0%   { transform: translate3d(-8%, 20%, 0) scale(1); }
          50%  { transform: translate3d(10%, -16%, 0) scale(1.3); }
          100% { transform: translate3d(-8%, 20%, 0) scale(1); }
        }

        @keyframes horizons-fog-two {
          0%   { transform: translate3d(12%, 26%, 0) scale(1.15); }
          50%  { transform: translate3d(-14%, -10%, 0) scale(0.9); }
          100% { transform: translate3d(12%, 26%, 0) scale(1.15); }
        }

        @keyframes horizons-fog-three {
          0%   { transform: translate3d(0%, 30%, 0) scale(0.85); opacity: 0.45; }
          45%  { transform: translate3d(6%, -6%, 0) scale(1.2); opacity: 0.85; }
          100% { transform: translate3d(0%, 30%, 0) scale(0.85); opacity: 0.45; }
        }

        @media (prefers-reduced-motion: reduce) {
          .group:hover .horizons-fog,
          .group:focus-visible .horizons-fog { animation-play-state: paused; }
        }
      `}</style>

      <Link
        href="/how-to-get-to-kerala"
        className="group relative isolate mt-12 flex items-center gap-8 overflow-hidden border border-white/12 p-7 transition-colors duration-500 hover:border-[#6B7341] md:gap-12 md:p-9"
      >
        {/* The fog. Contained by the border, invisible until wanted. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <span
            className="horizons-fog left-[-10%] top-[20%] h-[120%] w-[55%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(139,149,86,0.5) 0%, rgba(107,115,65,0.2) 40%, rgba(107,115,65,0) 70%)",
              animationName: "horizons-fog-one",
              animationDuration: "13s",
            }}
          />

          <span
            className="horizons-fog left-[30%] top-[10%] h-[140%] w-[50%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(168,180,115,0.34) 0%, rgba(107,115,65,0.16) 45%, rgba(107,115,65,0) 72%)",
              animationName: "horizons-fog-two",
              animationDuration: "17s",
            }}
          />

          <span
            className="horizons-fog left-[62%] top-[15%] h-[130%] w-[48%]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(107,115,65,0.45) 0%, rgba(107,115,65,0.18) 42%, rgba(107,115,65,0) 70%)",
              animationName: "horizons-fog-three",
              animationDuration: "9.5s",
            }}
          />
        </span>

        <svg
          viewBox={`0 0 ${MAP.width} ${MAP.height}`}
          aria-hidden
          className="h-28 w-auto shrink-0 md:h-36"
        >
          {districts.map((district) => (
            <path
              key={district.name}
              d={district.d}
              fill="#A8B473"
              fillOpacity={0.07}
              stroke="#6B7341"
              strokeOpacity={0.45}
              strokeWidth={2}
              strokeLinejoin="round"
              className="transition-all duration-700 group-hover:fill-[#A8B473] group-hover:stroke-[#A8B473]"
            />
          ))}
        </svg>

        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            The long answer
          </span>

          <span className="mt-4 block font-cormorant text-[26px] font-light leading-[1.1] text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[34px]">
            How to get to Kerala
          </span>

          <span className="mt-4 block max-w-md text-[14px] leading-7 text-white/50 transition-colors duration-500 group-hover:text-white/70">
            All four airports on a map, what each one is near, how long
            every drive really takes, when the train is quicker than the
            road, and the visa.
          </span>

          <span className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 group-hover:text-white">
            Read the guide
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </span>
      </Link>
    </Reveal>
  );
}
