"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import RoadToKerala from "./RoadToKerala";
import Helicopter from "./Helicopter";
import { MAP, districts } from "@/data/keralaMap";

/*
  The way out of the short answers and into the long ones.

  Sits under the Getting here questions, because that is where somebody
  reading "which airport should I fly into?" decides they want the whole
  story. The silhouette is the same geometry as the map on the guide,
  drawn once and still — enough to say there is a map through here
  without pretending to be one.

  Hovering sends a car down the road in the bottom corner and lifts the
  helicopter off the H of the headline, which is its helipad, over to
  the island. Both flights are measured here rather than hard-coded:
  the H and the island svg are asked where they are, and the distance
  between them goes to the helicopter as two custom properties, so the
  arc lands in the right place at any width.
*/

const HELI_RATIO = 58 / 104;
/* Where the skids sit inside the drawing, as a fraction of its height. */
const SKID_LINE = 45.5 / 58;
/* Parked, it is about twice the width of the letter it stands on. */
const PARKED = 2.1;
/* And this much bigger by the time it reaches the island. */
const GROW = 1.55;

/* Where the helicopter ends up, in the road drawing's own coordinates:
   over the island, clear above the palm tops. */
const ISLAND = { x: 236, y: -52 };
const ROAD_VIEWBOX = { x: -56, y: -34, height: 194 };

export default function GettingHerePanel() {
  const [lit, setLit] = useState(false);
  const [flown, setFlown] = useState(false);
  const link = useRef<HTMLAnchorElement>(null);
  const pad = useRef<HTMLSpanElement>(null);
  const [seat, setSeat] = useState<React.CSSProperties>({ opacity: 0 });

  useEffect(() => {
    const place = () => {
      const anchor = link.current;
      const letter = pad.current;
      const road = anchor?.querySelector("svg[data-road]");
      if (!anchor || !letter || !road) return;

      const box = anchor.getBoundingClientRect();
      const h = letter.getBoundingClientRect();
      const drawing = road.getBoundingClientRect();

      const width = Math.max(40, Math.round(h.width * PARKED));
      const height = width * HELI_RATIO;

      /* The skids have to rest on the top of the H itself, which is a good
         deal lower than the top of the line box the letter sits in. Ask the
         font where the cap actually starts. */
      const type = getComputedStyle(letter);
      const ink = document.createElement("canvas").getContext("2d");
      let capTop = h.top - box.top;
      if (ink) {
        ink.font = `${type.fontStyle} ${type.fontWeight} ${type.fontSize} ${type.fontFamily}`;
        const m = ink.measureText("H");
        const lead = (h.height - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2;
        capTop += lead + m.fontBoundingBoxAscent - m.actualBoundingBoxAscent;
      }

      const left = h.left - box.left + h.width / 2 - width / 2;
      const top = capTop - height * SKID_LINE;

      /* The island, converted out of the drawing's viewBox. */
      const unit = drawing.height / ROAD_VIEWBOX.height;
      const toX = drawing.left - box.left + (ISLAND.x - ROAD_VIEWBOX.x) * unit;
      const toY = drawing.top - box.top + (ISLAND.y - ROAD_VIEWBOX.y) * unit;

      setSeat({
        left,
        top,
        width,
        opacity: 1,
        "--hk-dx": `${Math.round(toX - (left + width / 2))}px`,
        "--hk-dy": `${Math.round(toY - (top + height / 2))}px`,
        "--hk-grow": GROW,
      } as React.CSSProperties);
    };

    place();
    document.fonts?.ready.then(place);
    const settled = window.setTimeout(place, 400);
    window.addEventListener("resize", place);
    return () => {
      window.clearTimeout(settled);
      window.removeEventListener("resize", place);
    };
  }, []);

  const lift = () => {
    setLit(true);
    setFlown(true);
  };

  return (
    <Reveal delay={120}>
      <Link
        ref={link}
        href="/how-to-get-to-kerala"
        onMouseEnter={lift}
        onMouseLeave={() => setLit(false)}
        onFocus={lift}
        onBlur={() => setLit(false)}
        className="group relative isolate mt-12 flex items-center gap-8 overflow-hidden border border-white/12 p-7 transition-colors duration-500 hover:border-[#6B7341] focus-visible:border-[#6B7341] md:gap-12 md:p-9"
      >
        <Helicopter lit={lit} flown={flown} style={seat} />

        <RoadToKerala lit={lit} />

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
            <span ref={pad}>H</span>ow to get to Kerala
          </span>

          <span className="mt-4 block max-w-md text-[14px] leading-7 text-white/50 transition-colors duration-500 group-hover:text-white/75">
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
