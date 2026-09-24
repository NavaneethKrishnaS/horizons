"use client";

import { useState } from "react";

import { MAP, districts, project } from "@/data/keralaMap";
import { airports, places } from "@/data/gettingHere";

/*
  Kerala, drawn.

  Fourteen district outlines and a handful of points, all of it inline
  SVG — no map library, no tiles, no third-party script, no consent
  banner, and nothing to pay for per thousand views. It weighs less than
  one tile of an embedded map and it is the only picture on the site
  that is genuinely ours.

  Hovering or focusing an airport lights it and dims the rest, so the
  question the map exists to answer — which one do I fly into, and what
  is near it — is answered by moving the mouse.
*/
export default function KeralaMap({
  active,
  onActive,
}: {
  active: string | null;
  onActive: (code: string | null) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const lit = hovered ?? active;

  return (
    <svg
      viewBox={`-40 -30 ${MAP.width + 80} ${MAP.height + 60}`}
      /*
        Full width where it is the only thing on screen; bounded by the
        window height where it is sticky beside the text, so the map and
        its caption both stay visible instead of the bottom of Kerala
        disappearing under the fold.
      */
      className="h-auto w-full lg:h-[58vh] lg:max-h-[680px]"
      role="img"
      aria-label="Map of Kerala showing its four international airports and the places journeys begin"
    >
      <defs>
        {/* The water, barely there — enough to read as sea to the west. */}
        <linearGradient id="horizons-sea" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B7341" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#6B7341" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x={-40}
        y={-30}
        width={120}
        height={MAP.height + 60}
        fill="url(#horizons-sea)"
      />

      <g>
        {districts.map((district) => (
          <path
            key={district.name}
            d={district.d}
            fill="#ffffff"
            fillOpacity={0.03}
            stroke="#6B7341"
            strokeOpacity={0.35}
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* The places we send people. Quiet: the airports are the subject. */}
      <g>
        {places.map((place) => {
          const { x, y } = project(place.lat, place.lon);

          return (
            <g key={place.name} opacity={lit ? 0.35 : 1}>
              <circle cx={x} cy={y} r={3.5} fill="#A8B473" fillOpacity={0.55} />

              <text
                x={x + 10}
                y={y + 4}
                fill="#ffffff"
                fillOpacity={place.minor ? 0.35 : 0.55}
                fontSize={16}
                letterSpacing={0.6}
                className={place.minor ? "hidden sm:inline" : ""}
              >
                {place.name}
              </text>
            </g>
          );
        })}
      </g>

      {/* The airports. */}
      <g>
        {airports.map((airport) => {
          const { x, y } = project(airport.lat, airport.lon);
          const isLit = lit === airport.code;
          const dimmed = lit !== null && !isLit;

          return (
            <g
              key={airport.code}
              tabIndex={0}
              role="button"
              aria-label={`${airport.name}, ${airport.code}`}
              onMouseEnter={() => setHovered(airport.code)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(airport.code)}
              onBlur={() => setHovered(null)}
              onClick={() => onActive(active === airport.code ? null : airport.code)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onActive(active === airport.code ? null : airport.code);
                }
              }}
              className="cursor-pointer outline-none"
              opacity={dimmed ? 0.3 : 1}
              style={{ transition: "opacity 400ms ease" }}
            >
              {/* A ring that opens out when this is the one being asked about. */}
              <circle
                cx={x}
                cy={y}
                r={isLit ? 20 : 11}
                fill="none"
                stroke="#A8B473"
                strokeOpacity={isLit ? 0.55 : 0.3}
                strokeWidth={1}
                style={{ transition: "r 500ms cubic-bezier(0.16,1,0.3,1)" }}
              />

              <circle cx={x} cy={y} r={5} fill="#A8B473" />

              <text
                x={x + 16}
                y={y - 6}
                fill="#ffffff"
                fillOpacity={0.9}
                fontSize={20}
                letterSpacing={2}
              >
                {airport.code}
              </text>

              <text
                x={x + 16}
                y={y + 13}
                fill="#ffffff"
                fillOpacity={0.45}
                fontSize={15}
              >
                {airport.short}
              </text>
            </g>
          );
        })}
      </g>

      {/* Which way is which, for anyone who has not met Kerala before. */}
      <text
        x={-16}
        y={MAP.height + 18}
        fill="#ffffff"
        fillOpacity={0.25}
        fontSize={15}
        letterSpacing={3}
      >
        ARABIAN SEA
      </text>
    </svg>
  );
}
