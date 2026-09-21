/*
  The one rule the scenes share.

  An object's position and width are published as custom properties by
  SceneObject, in two sets: the composed numbers, and a phone set that is
  larger and pushed clear of the middle of the screen. A media query can
  choose between them; an inline style cannot, which is why this lives
  here rather than on each object. It ships as a style tag because rules
  added to globals.css in this project have twice failed to reach the
  browser.

  On a phone the artwork keeps almost all of its weight. Holding it back
  far enough to protect the writing made it look washed out and wrong;
  the wash under the text does that job instead, only where it is
  actually needed.
*/
export default function SceneStyles() {
  return (
    <style>{`
      /*
        The navbar is fixed and therefore covers the top of every pinned
        stage. Its measured height is published by the navbar itself; the
        fallback is only for the first paint. The artwork is positioned
        against the padding box and so is not moved by this — only the
        writing is, which is the point.
      */
      .j-stage {
        padding-top: var(--horizons-nav, 88px);
      }

      .j-object {
        top: var(--j-y);
        width: var(--j-w);
      }

      /*
        An act's writing is set by three numbers rather than by fixed
        values, so that a scene can measure itself and settle its own
        density — see useFitWriting for the order they are spent in.

          --j-t    0 to 1. How hard the act is working to fit. It widens
                   the measure toward the width the heading already has,
                   and closes the leading and the gaps. It never touches
                   the size of the type, and it never changes the width
                   of the block, only of the lines inside it.

          --j-fit  A plain scale on everything, and the only thing that
                   does change the type size. Last resort.

        Line heights are in em so they follow their font size. None of
        this is a Tailwind class, because a class cannot be driven by a
        variable at run time.
      */
      .j-stage {
        --j-fit: 1;
        --j-t: 0;
      }

      .j-writing {
        --j-gap: calc(1 - 0.3 * var(--j-t));
      }

      .j-writing .j-label {
        font-size: calc(10px * var(--j-fit));
      }

      .j-writing h2 {
        margin-top: calc(18px * var(--j-fit) * var(--j-gap));
        font-size: calc(30px * var(--j-fit));
        line-height: 1.12;
      }

      .j-writing .j-body {
        margin-top: calc(24px * var(--j-fit) * var(--j-gap));
        font-size: calc(14.5px * var(--j-fit));
        line-height: 1.66;
      }

      .j-writing .j-body p + p {
        margin-top: calc(18px * var(--j-fit) * var(--j-gap));
      }

      @media (min-width: 640px) {
        .j-writing h2 {
          font-size: calc(48px * var(--j-fit));
        }
      }

      @media (min-width: 768px) {
        .j-writing h2 {
          margin-top: calc(24px * var(--j-fit) * var(--j-gap));
          font-size: calc(58px * var(--j-fit));
          line-height: 1.08;
        }

        .j-writing .j-body {
          /*
            The paragraphs are set narrower than the heading above them.
            Under pressure they are allowed to grow out to the heading's
            own width and no further, so the block's silhouette is the
            same in every act — only the line length inside it changes.
          */
          max-width: calc(36rem + 6rem * var(--j-t));
          margin-top: calc(32px * var(--j-fit) * var(--j-gap));
          font-size: calc(15px * var(--j-fit));
          line-height: calc((2.133 - 0.24 * var(--j-t)) * 1em);
        }

        .j-writing .j-body p + p {
          margin-top: calc(20px * var(--j-fit) * var(--j-gap));
        }
      }

      /*
        A window wide but short has horizontal room going spare and none
        at all vertically. There, and only there, an act under pressure
        may run wider than its heading: a long line at a readable size
        beats a short one at nine pixels, and the alternative at this
        height is the type scaling away to nothing.
      */
      @media (min-width: 768px) and (max-height: 700px) {
        .j-column {
          max-width: calc(42rem + 22rem * var(--j-t));
        }

        .j-writing .j-body {
          max-width: calc(36rem + 22rem * var(--j-t));
        }
      }

      @media (max-width: 767px) {
        .j-object {
          top: var(--j-y-phone);
          width: var(--j-w-phone);
          --j-fade: 0.92;
        }

        /*
          At this size an object can land squarely on a heading, and there
          is nowhere else on the screen to send it. A wash of the paper
          colour, strongest under the middle of the writing and gone by
          its edges, lets the artwork pass behind the words without ever
          reading as a panel: it has no edge of its own.
        */
        .j-wash {
          position: absolute;
          inset: -10% -8%;
          background: radial-gradient(
            62% 52% at 50% 50%,
            rgba(244, 242, 237, 0.95) 0%,
            rgba(244, 242, 237, 0.86) 48%,
            rgba(244, 242, 237, 0) 100%
          );
          pointer-events: none;
        }
      }
    `}</style>
  );
}
