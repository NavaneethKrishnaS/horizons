"use client";

import Image from "next/image";

/* Where an object is at one end of the shot. */
export interface Keyframe {
  /* Offset from the anchor, in viewport widths/heights. */
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
}

export interface SceneObjectSpec {
  /* Anchor, as a percentage of the scene. */
  ax: number;
  ay: number;

  /* Width as a percentage of the scene's width. */
  size: number;

  /* The shot: where it comes from and where it goes. */
  from: Keyframe;
  to: Keyframe;

  src: string;

  /* Objects further back move less and sit paler, which reads as depth. */
  depth?: number;

  /* Intrinsic pixels, so the srcset is built against the real picture. */
  w?: number;
  h?: number;
}

const value = (frame: Keyframe, key: keyof Keyframe, fallback: number) =>
  frame[key] ?? fallback;

/*
  Every object is a single element whose transform is written entirely in
  CSS, interpolated against the --e the scene publishes each frame. Nothing
  here runs JavaScript while scrolling: the browser is only re-evaluating a
  calc() on the compositor, which is why a dozen of these cost nothing.
*/
export default function SceneObject({ spec }: { spec: SceneObjectSpec }) {
  const { ax, ay, size, from, to, src, depth = 1, w = 760, h = 760 } = spec;

  const x0 = value(from, "x", 0) * depth;
  const x1 = value(to, "x", 0) * depth;
  const y0 = value(from, "y", 0) * depth;
  const y1 = value(to, "y", 0) * depth;
  const s0 = value(from, "scale", 1);
  const s1 = value(to, "scale", 1);
  const r0 = value(from, "rotate", 0);
  const r1 = value(to, "rotate", 0);
  const o0 = value(from, "opacity", 1);
  const o1 = value(to, "opacity", 1);

  const lerp = (a: number, b: number, unit: string) =>
    `calc((${a} + (${b} - ${a}) * var(--e, 0)) * 1${unit})`;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: `${ax}%`,
        top: `${ay}%`,
        width: `${size}%`,
        opacity: `calc(${o0} + (${o1} - ${o0}) * var(--e, 0))`,
        /*
          No will-change here. Two dozen objects each asking for their own
          compositor layer costs more memory than it saves, and the
          translate3d below already promotes the ones that move.
        */
        transform: [
          "translate(-50%, -50%)",
          `translate3d(${lerp(x0, x1, "vw")}, ${lerp(y0, y1, "vh")}, 0)`,
          `scale(calc(${s0} + (${s1} - ${s0}) * var(--e, 0)))`,
          `rotate(${lerp(r0, r1, "deg")})`,
        ].join(" "),
      }}
    >
      <Image
        src={src}
        alt=""
        width={w}
        height={h}
        sizes={`${Math.ceil(size * Math.max(s0, s1))}vw`}
        className="h-auto w-full select-none"
      />
    </div>
  );
}
