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
        One typographic system for every act. Same type, same measure,
        same leading, whichever act you are looking at — five scenes set
        five different ways is not a page, it is five pages.

        The measure and the leading are set so that the longest act has
        room to breathe at them, rather than so the shortest looks nice
        and the longest is left to cope. The paragraphs run to the same
        width as the heading above them, and the leading is the ordinary
        editorial one; the old settings were narrower and unusually airy,
        which was generous to the three short acts and left the two long
        ones with nothing.

        Sizes are multiples of --j-fit, which is one number for the whole
        page — see SceneFit. It stays at 1 on any normal screen. Line
        heights are in em so they follow their font size. None of this is
        a Tailwind class, because a class cannot be driven by a variable
        at run time.
      */
      .j-writing .j-label {
        font-size: calc(10px * var(--j-fit, 1));
      }

      .j-writing h2 {
        margin-top: calc(18px * var(--j-fit, 1));
        font-size: calc(30px * var(--j-fit, 1));
        line-height: 1.12;
      }

      .j-writing .j-body {
        margin-top: calc(24px * var(--j-fit, 1));
        font-size: calc(14.5px * var(--j-fit, 1));
        line-height: 1.5em;
      }

      .j-writing .j-body p + p {
        margin-top: calc(18px * var(--j-fit, 1));
      }

      @media (min-width: 640px) {
        .j-writing h2 {
          font-size: calc(48px * var(--j-fit, 1));
        }
      }

      @media (min-width: 768px) {
        .j-writing h2 {
          margin-top: calc(24px * var(--j-fit, 1));
          font-size: calc(58px * var(--j-fit, 1));
          line-height: 1.08;
        }

        .j-writing .j-body {
          max-width: 39rem;
          margin-top: calc(32px * var(--j-fit, 1));
          font-size: calc(15px * var(--j-fit, 1));
          line-height: 1.87em;
        }

        .j-writing .j-body p + p {
          margin-top: calc(20px * var(--j-fit, 1));
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
