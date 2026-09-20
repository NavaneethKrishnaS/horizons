/*
  Shared plumbing for the peacock mark, used by the arrival intro and by the
  between-pages curtain so both speak the same language.

  The mark is fetched rather than inlined: it is 100KB of path data, and the
  browser already has it cached from the navbar.
*/

export const LOGO_SRC = "/logo/horizons-logo.svg";

export const PEACOCK_EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

/*
  Declared by each component in a <style> tag rather than in globals.css. The
  build minifier drops @keyframes that no CSS rule references, and these are
  applied from JavaScript — so in the stylesheet they looked unused and were
  removed, leaving every path animating toward a rule that did not exist.
*/
export const PEACOCK_KEYFRAMES = `
  @keyframes horizons-feather {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes horizons-wordmark {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes horizons-breathe {
    from { transform: scale(0.955); }
    to   { transform: scale(1); }
  }

  /* Held while a page is still on its way. */
  @keyframes horizons-waiting {
    0%   { opacity: 1; transform: scale(1); }
    50%  { opacity: 0.55; transform: scale(0.985); }
    100% { opacity: 1; transform: scale(1); }
  }
`;

interface PaintOptions {
  featherWindowMs: number;
  featherDurationMs: number;
  wordmarkDelayMs: number;
  wordmarkDurationMs: number;

  // The curtain shows the bird alone; the intro shows the full lockup.
  hideWordmark?: boolean;

  animate?: boolean;
}

/*
  Injects the mark into `container`, fades the feathers open from the centre
  of the bird outward, and returns the transform-origin to use for any scale
  applied to the mark as a whole — the bird's centre, not the middle of the
  artwork, which sits lower because of the wordmark.
*/
export async function paintPeacock(
  container: HTMLElement,
  options: PaintOptions
): Promise<string | null> {
  const response = await fetch(LOGO_SRC);
  const markup = await response.text();

  container.innerHTML = markup;

  const svg = container.querySelector("svg");

  if (!svg) return null;

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");

  const paths = Array.from(svg.querySelectorAll("path"));

  if (paths.length === 0) return null;

  const boxes = paths.map((path) => {
    const box = path.getBBox();

    return {
      path,
      cx: box.x + box.width / 2,
      cy: box.y + box.height / 2,
      top: box.y,
      left: box.x,
      right: box.x + box.width,
      bottom: box.y + box.height,
    };
  });

  const tops = boxes.map((entry) => entry.top);
  const highest = Math.min(...tops);
  const lowest = Math.max(...tops);

  // The wordmark sits in the bottom quarter of the artwork.
  const wordmarkLine = highest + (lowest - highest) * 0.72;

  const markPaths = boxes.filter((entry) => entry.top < wordmarkLine);
  const wordPaths = boxes.filter((entry) => entry.top >= wordmarkLine);

  const count = markPaths.length || 1;

  const centreX = markPaths.reduce((sum, e) => sum + e.cx, 0) / count;
  const centreY = markPaths.reduce((sum, e) => sum + e.cy, 0) / count;

  const viewBox = (svg.getAttribute("viewBox") ?? "0 0 1 1")
    .split(/\s+/)
    .map(Number);

  const boxWidth = viewBox[2] || 1;
  const boxHeight = viewBox[3] || 1;

  let frameX = 0;
  let frameY = 0;
  let frameWidth = boxWidth;
  let frameHeight = boxHeight;

  if (options.hideWordmark) {
    /*
      Crop to the bird's own bounding box rather than to the top of the
      wordmark: the full artwork is 3743 units wide because of the lettering,
      so keeping that width would letterbox the bird and shrink it.
    */
    const margin = 40;

    frameX = Math.min(...markPaths.map((entry) => entry.left)) - margin;
    frameY = Math.min(...markPaths.map((entry) => entry.top)) - margin;

    frameWidth =
      Math.max(...markPaths.map((entry) => entry.right)) + margin - frameX;
    frameHeight =
      Math.max(...markPaths.map((entry) => entry.bottom)) + margin - frameY;

    svg.setAttribute(
      "viewBox",
      `${frameX} ${frameY} ${frameWidth} ${frameHeight}`
    );

    wordPaths.forEach((entry) => {
      entry.path.style.display = "none";
    });
  }

  const origin = `${((centreX - frameX) / frameWidth) * 100}% ${
    ((centreY - frameY) / frameHeight) * 100
  }%`;

  if (options.animate === false) return origin;

  const distances = markPaths.map((entry) =>
    Math.hypot(entry.cx - centreX, entry.cy - centreY)
  );

  const furthest = Math.max(...distances, 1);

  /*
    The feathers cross-fade only — no per-path transform. Scaling 233 separate
    SVG paths forces a re-raster of each one every frame, which is what made
    the bloom feel granular; the sense of movement comes from a single scale
    on the container instead.

    The stagger is eased rather than linear: a straight ratio starts the outer
    paths all at once, which reads as a step. `both` carries the keyframe's own
    from-state through the delay, so if an animation ever fails to run the mark
    simply appears rather than staying blank.
  */
  markPaths.forEach((entry, index) => {
    const ratio = distances[index] / furthest;
    const eased = ratio * ratio * (3 - 2 * ratio);

    entry.path.style.animation = `horizons-feather ${options.featherDurationMs}ms ${PEACOCK_EASE} ${
      eased * options.featherWindowMs
    }ms both`;
  });

  if (!options.hideWordmark) {
    wordPaths.forEach((entry) => {
      entry.path.style.animation = `horizons-wordmark ${options.wordmarkDurationMs}ms ${PEACOCK_EASE} ${options.wordmarkDelayMs}ms both`;
    });
  }

  return origin;
}
