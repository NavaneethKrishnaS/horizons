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
*/
export default function GettingHerePanel() {
  return (
    <Reveal delay={120}>
      <Link
        href="/how-to-get-to-kerala"
        className="group mt-12 flex items-center gap-8 border border-white/12 p-7 transition-colors duration-500 hover:border-[#6B7341] md:gap-12 md:p-9"
      >
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
              className="transition-opacity duration-500 group-hover:opacity-100"
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

          <span className="mt-4 block max-w-md text-[14px] leading-7 text-white/50">
            All four airports on a map, what each one is near, how long
            every drive really takes, when the train is quicker than the
            road, and the visa.
          </span>

          <span className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70">
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
