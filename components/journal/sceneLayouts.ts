import { SceneObjectSpec } from "./SceneObject";

/*
  The choreography.

  Each object has an anchor and a shot: where it is when the act begins and
  where it has got to when the act ends. Offsets are in viewport widths and
  heights, so an x of -60 means it starts well off the left edge and flies
  in. Objects that pass behind the writing carry a lower `depth`, which
  shortens their travel and lightens them — the parallax that makes the
  scene feel like it has room in it.
*/
const J = "/images/journal";

export const sceneObjects: Record<string, SceneObjectSpec[]> = {
  /* Ships arrive from the sea, spices settle, the nets swing past. */
  "spice-coast": [
    {
      ax: 50, ay: 42, size: 26, src: `${J}/dhow.webp`,
      from: { x: -95, y: 6, scale: 0.85, rotate: -6 },
      to: { x: 95, y: -4, scale: 1.05, rotate: 4 },
    },
    {
      ax: 16, ay: 34, size: 20, src: `${J}/fishing-net.webp`, depth: 0.7,
      from: { y: 40, scale: 0.9, opacity: 0 },
      to: { y: -34, scale: 1.06, rotate: -5, opacity: 1 },
    },
    {
      ax: 85, ay: 30, size: 13, src: `${J}/peppercorns.webp`, depth: 0.8,
      from: { y: 46, rotate: 14, opacity: 0 },
      to: { y: -40, rotate: -6, opacity: 1 },
    },
    {
      ax: 82, ay: 74, size: 12, src: `${J}/cardamom.webp`, depth: 0.55,
      from: { y: 34, scale: 0.92, opacity: 0 },
      to: { y: -26, scale: 1.04, rotate: 10, opacity: 1 },
    },
  ],

  /* The crown rises, the face comes forward, the drum drifts. */
  kathakali: [
    {
      ax: 50, ay: 50, size: 30, src: `${J}/crown-halo.webp`, depth: 0.9,
      from: { y: 70, scale: 0.7, rotate: -8, opacity: 0 },
      to: { y: -60, scale: 1.25, rotate: 6, opacity: 0.16 },
    },
    {
      ax: 17, ay: 40, size: 12, src: `${J}/crown-cylindrical.webp`, depth: 0.8,
      from: { x: -22, y: 34, opacity: 0 },
      to: { x: 4, y: -30, rotate: -7, opacity: 1 },
    },
    {
      ax: 20, ay: 78, size: 16, src: `${J}/face.webp`, depth: 0.6,
      from: { y: 30, scale: 0.8, opacity: 0 },
      to: { y: -22, scale: 1.12, opacity: 1 },
    },
    {
      ax: 88, ay: 72, size: 10, src: `${J}/chenda.webp`, depth: 0.7,
      from: { x: 20, y: 30, rotate: 12, opacity: 0 },
      to: { x: -2, y: -26, rotate: -8, opacity: 1 },
    },
    {
      ax: 86, ay: 26, size: 10, src: `${J}/mudra.webp`, depth: 0.5,
      from: { y: 26, rotate: -14, opacity: 0 },
      to: { y: -20, rotate: 6, opacity: 1 },
    },
  ],

  /* Four figures cross the frame, each on its own line. */
  kalakal: [
    {
      ax: 50, ay: 52, size: 15, src: `${J}/theyyam.webp`,
      from: { y: 62, scale: 0.72, opacity: 0 },
      to: { y: -52, scale: 1.18, opacity: 0.18 },
    },
    {
      ax: 16, ay: 44, size: 12, src: `${J}/mohiniyattam.webp`, depth: 0.75,
      from: { x: -34, y: 24, opacity: 0 },
      to: { x: 6, y: -28, rotate: 3, opacity: 1 },
    },
    {
      ax: 86, ay: 42, size: 11, src: `${J}/bharatanatyam.webp`, depth: 0.75,
      from: { x: 34, y: 28, opacity: 0 },
      to: { x: -6, y: -24, rotate: -3, opacity: 1 },
    },
    {
      ax: 24, ay: 84, size: 16, src: `${J}/kalaripayattu.webp`, depth: 0.5,
      from: { x: -16, y: 26, scale: 0.9, opacity: 0 },
      to: { x: 4, y: -18, scale: 1.08, opacity: 1 },
    },
  ],

  /* The boat runs the length of the screen; the water opens under it. */
  vallamkali: [
    {
      ax: 50, ay: 38, size: 62, src: `${J}/snake-boat.webp`,
      from: { x: -80, y: 8, rotate: -3 },
      to: { x: 80, y: -6, rotate: 3 },
    },
    {
      ax: 50, ay: 72, size: 34, src: `${J}/ripples.webp`, depth: 0.4,
      from: { y: 22, scale: 0.55, opacity: 0 },
      to: { y: -10, scale: 1.3, opacity: 0.3 },
    },
    {
      ax: 84, ay: 30, size: 10, src: `${J}/paddle.webp`, depth: 0.8,
      from: { y: 44, rotate: 28, opacity: 0 },
      to: { y: -36, rotate: -14, opacity: 1 },
    },
    {
      ax: 14, ay: 66, size: 18, src: `${J}/pookkalam.webp`, depth: 0.6,
      from: { y: 30, scale: 0.8, rotate: -20, opacity: 0 },
      to: { y: -24, scale: 1.1, rotate: 30, opacity: 1 },
    },
  ],

  /* The houseboat glides; rope and palm hold the banks. */
  kettuvallam: [
    {
      ax: 50, ay: 40, size: 54, src: `${J}/houseboat.webp`,
      from: { x: -70, y: 6 },
      to: { x: 70, y: -4 },
    },
    {
      ax: 84, ay: 62, size: 14, src: `${J}/rope.webp`, depth: 0.7,
      from: { y: 36, rotate: -30, opacity: 0 },
      to: { y: -28, rotate: 40, opacity: 1 },
    },
    {
      ax: 13, ay: 70, size: 14, src: `${J}/palm.webp`, depth: 0.55,
      from: { y: 30, scale: 0.9, rotate: -4, opacity: 0 },
      to: { y: -22, scale: 1.08, rotate: 3, opacity: 1 },
    },
    {
      ax: 15, ay: 24, size: 8, src: `${J}/elephant.webp`, depth: 0.85,
      from: { x: -30, y: 18, opacity: 0 },
      to: { x: 4, y: -22, opacity: 1 },
    },
  ],
};
