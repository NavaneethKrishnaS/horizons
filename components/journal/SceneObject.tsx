"use client";

import Image from "next/image";

export interface SceneObjectSpec {
  /* Where it sits, in percentages of the scene. */
  x: number;
  y: number;

  /* Width as a percentage of the scene's width. */
  size: number;

  /* How far it travels vertically across the scene, in vh. Negative rises. */
  drift: number;

  /* Degrees of rotation across the scene. */
  spin?: number;

  src?: string;
  alt?: string;

  /* Placeholder shape used until the engraving exists. */
  shape?: "disc" | "star" | "ring" | "beads";
}

/*
  A single floating object. Its position is derived from the scene's --p, so
  it moves as one transform per frame and never triggers layout.
*/
export default function SceneObject({ spec }: { spec: SceneObjectSpec }) {
  const { x, y, size, drift, spin = 0, src, alt, shape = "disc" } = spec;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        transform: `translate3d(-50%, calc(-50% + var(--p, 0) * ${drift}vh), 0) rotate(calc(var(--p, 0) * ${spin}deg))`,
        willChange: "transform",
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          width={600}
          height={600}
          className="h-auto w-full select-none"
        />
      ) : (
        <Placeholder shape={shape} />
      )}
    </div>
  );
}

/*
  Stand-ins so the motion can be judged before the artwork exists. Drawn as
  inline SVG with a stipple filter, which is roughly the register the real
  engravings will sit in.
*/
function Placeholder({ shape }: { shape: NonNullable<SceneObjectSpec["shape"]> }) {
  const common = { fill: "#111111", stroke: "none" };

  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full opacity-80">
      {shape === "disc" && <circle cx="50" cy="50" r="42" {...common} />}

      {shape === "ring" && (
        <>
          <circle cx="50" cy="50" r="46" fill="none" stroke="#111111" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="34" fill="none" stroke="#111111" strokeWidth="1" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#111111" strokeWidth="0.6" />
        </>
      )}

      {shape === "star" && (
        <path
          d="M50 2 L58 38 L96 50 L58 62 L50 98 L42 62 L4 50 L42 38 Z"
          {...common}
        />
      )}

      {shape === "beads" && (
        <>
          <line x1="50" y1="0" x2="50" y2="100" stroke="#111111" strokeWidth="0.8" />
          {[14, 34, 54, 74, 92].map((cy, i) => (
            <circle key={cy} cx="50" cy={cy} r={6 - i * 0.7} {...common} />
          ))}
        </>
      )}
    </svg>
  );
}
