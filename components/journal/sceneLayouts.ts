import { SceneObjectSpec } from "./SceneObject";

/*
  Where each act's objects sit and how far they travel. Percentages of the
  scene, so the same numbers hold at any width; `drift` is in vh, negative
  meaning the object rises as you scroll.

  Once the engravings exist, add `src` to a spec and the placeholder shape
  is replaced with no other change.
*/
export const sceneObjects: Record<string, SceneObjectSpec[]> = {
  "spice-coast": [
    { x: 14, y: 26, size: 13, drift: -22, shape: "ring" },
    { x: 86, y: 34, size: 9, drift: -30, spin: 25, shape: "star" },
    { x: 78, y: 74, size: 6, drift: -16, shape: "disc" },
    { x: 22, y: 78, size: 4, drift: -12, shape: "disc" },
  ],
  kathakali: [
    { x: 84, y: 24, size: 15, drift: -26, shape: "disc" },
    { x: 16, y: 40, size: 10, drift: -34, spin: -20, shape: "star" },
    { x: 24, y: 80, size: 7, drift: -14, shape: "ring" },
    { x: 90, y: 72, size: 3, drift: -20, shape: "beads" },
  ],
  vallamkali: [
    { x: 18, y: 30, size: 16, drift: -24, shape: "ring" },
    { x: 82, y: 44, size: 8, drift: -32, shape: "star" },
    { x: 50, y: 88, size: 20, drift: -10, shape: "ring" },
  ],
  kettuvallam: [
    { x: 80, y: 28, size: 14, drift: -20, shape: "ring" },
    { x: 14, y: 46, size: 7, drift: -28, spin: 30, shape: "star" },
    { x: 26, y: 82, size: 5, drift: -14, shape: "disc" },
  ],
};
