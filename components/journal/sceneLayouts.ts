import { SceneObjectSpec } from "./SceneObject";

/*
  Where each act's objects sit and how far they travel. Percentages of the
  scene, so the same numbers hold at any width; `drift` is in vh, negative
  meaning the object rises as the page scrolls past it.

  Wide objects — the boats, the border — carry a larger `size` because that
  figure is a share of the scene's width, not of the object's mass.
*/
const J = "/images/journal";

export const sceneObjects: Record<string, SceneObjectSpec[]> = {
  "spice-coast": [
    { x: 16, y: 30, size: 20, drift: -22, src: `${J}/fishing-net.webp`, alt: "" },
    { x: 85, y: 26, size: 13, drift: -30, src: `${J}/peppercorns.webp`, alt: "" },
    { x: 80, y: 74, size: 12, drift: -16, src: `${J}/cardamom.webp`, alt: "" },
    { x: 20, y: 80, size: 16, drift: -12, src: `${J}/dhow.webp`, alt: "" },
  ],

  kathakali: [
    { x: 84, y: 28, size: 19, drift: -26, src: `${J}/crown-halo.webp`, alt: "" },
    { x: 15, y: 34, size: 11, drift: -34, src: `${J}/crown-cylindrical.webp`, alt: "" },
    { x: 19, y: 78, size: 15, drift: -14, src: `${J}/face.webp`, alt: "" },
    { x: 88, y: 76, size: 9, drift: -20, src: `${J}/chenda.webp`, alt: "" },
    { x: 50, y: 96, size: 9, drift: -8, src: `${J}/mudra.webp`, alt: "" },
  ],

  kalakal: [
    { x: 84, y: 30, size: 12, drift: -28, src: `${J}/theyyam.webp`, alt: "" },
    { x: 14, y: 36, size: 11, drift: -22, src: `${J}/mohiniyattam.webp`, alt: "" },
    { x: 20, y: 82, size: 15, drift: -14, src: `${J}/kalaripayattu.webp`, alt: "" },
    { x: 86, y: 78, size: 10, drift: -18, src: `${J}/bharatanatyam.webp`, alt: "" },
  ],

  vallamkali: [
    { x: 50, y: 26, size: 46, drift: -18, src: `${J}/snake-boat.webp`, alt: "" },
    { x: 84, y: 52, size: 9, drift: -30, src: `${J}/paddle.webp`, alt: "" },
    { x: 15, y: 66, size: 17, drift: -22, src: `${J}/pookkalam.webp`, alt: "" },
  ],

  kettuvallam: [
    { x: 50, y: 28, size: 40, drift: -16, src: `${J}/houseboat.webp`, alt: "" },
    { x: 84, y: 58, size: 13, drift: -26, src: `${J}/rope.webp`, alt: "" },
    { x: 14, y: 70, size: 12, drift: -20, src: `${J}/palm.webp`, alt: "" },
  ],
};
