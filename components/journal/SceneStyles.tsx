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
      .j-object {
        top: var(--j-y);
        width: var(--j-w);
      }

      /*
        Every size and margin in an act's writing is a multiple of one
        number, so that useFitWriting can bring a block that is taller
        than its pinned screen down to fit by setting that one number.
        Line heights are unitless and follow their font size on their
        own. Nothing here is a Tailwind class, because a class cannot be
        scaled by a variable at run time.
      */
      .j-writing {
        --j-fit: 1;
      }

      .j-writing .j-label {
        font-size: calc(10px * var(--j-fit));
      }

      .j-writing h2 {
        margin-top: calc(18px * var(--j-fit));
        font-size: calc(30px * var(--j-fit));
        line-height: 1.12;
      }

      .j-writing .j-body {
        margin-top: calc(24px * var(--j-fit));
        font-size: calc(14.5px * var(--j-fit));
        line-height: 1.66;
      }

      .j-writing .j-body p + p {
        margin-top: calc(18px * var(--j-fit));
      }

      @media (min-width: 640px) {
        .j-writing h2 {
          font-size: calc(48px * var(--j-fit));
        }
      }

      @media (min-width: 768px) {
        .j-writing h2 {
          margin-top: calc(24px * var(--j-fit));
          font-size: calc(58px * var(--j-fit));
          line-height: 1.08;
        }

        .j-writing .j-body {
          margin-top: calc(32px * var(--j-fit));
          font-size: calc(15px * var(--j-fit));
          line-height: 2.133;
        }

        .j-writing .j-body p + p {
          margin-top: calc(20px * var(--j-fit));
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
