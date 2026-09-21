/*
  A wireframe globe, turning.

  Real three-dimensional geometry, and no library and no model file:
  twelve meridians and five parallels in one preserve-3d space, the
  parallels scaled by the cosine of their latitude and lifted by its
  sine so they sit on the sphere rather than near it, the whole turning
  once every ninety seconds. It runs on the compositor and there is
  nothing to download.

  Why this and not a rendered object. The site already speaks three
  visual languages — photography, engraving, and Cormorant — and a
  fourth would be a fourth. A wireframe is a drawing rather than a
  prop, which puts it with the engravings rather than against them;
  and for a company called HORIZONS a turning globe is the brand
  stated plainly, not decoration hung on it.

  Three things stop it reading as a bare mesh. It has mass — a faint
  radial fill, lit from the upper left and falling away to nothing at
  the lower right, so there is a body under the lines. It has an
  atmosphere — one soft ring just outside the limb. And the poles are
  damped: meridians converge into a knot there, which is the ugliest
  thing about any wireframe sphere, so a gradient sits over the top
  and bottom and takes the knot out.
*/
const MERIDIANS = 12;
const PARALLELS = [-55, -28, 0, 28, 55];

export default function WireGlobe() {
  return (
    <div
      aria-hidden
      className="horizons-globe-stage pointer-events-none absolute right-[-20%] top-[-2%] w-[58vw] max-w-[620px] select-none sm:right-[-16%] sm:top-[4%] sm:w-[70vw] lg:right-[2%] lg:top-[6%] lg:w-[86vw]"
    >
      <style>{`
        .horizons-globe-stage {
          perspective: 1500px;
          opacity: 0;
          animation: horizons-globe-in 3000ms cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards;
        }

        @keyframes horizons-globe-in { to { opacity: 1; } }

        .horizons-globe {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          transform-style: preserve-3d;
          /* Tipped, the way a globe sits on a stand. */
          transform: rotateX(14deg) rotateZ(-7deg);
        }

        .horizons-globe-spin {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          animation: horizons-globe-spin 90s linear infinite;
        }

        @keyframes horizons-globe-spin { to { transform: rotateY(360deg); } }

        .horizons-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 50%;
        }

        .horizons-ring-equator { border-color: rgba(138, 149, 86, 0.3); }
        .horizons-ring-lat { border-color: rgba(255, 255, 255, 0.05); }

        /* The limb: the one line that says this is a sphere. */
        .horizons-limb {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 50%;
        }

        /* Body, lit from the upper left. */
        .horizons-body {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at 32% 28%,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.018) 38%,
            rgba(17, 17, 17, 0) 72%
          );
        }

        /* Atmosphere: one soft ring sitting just outside the limb. */
        .horizons-atmosphere {
          position: absolute;
          inset: -3%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(17, 17, 17, 0) 62%,
            rgba(138, 149, 86, 0.05) 79%,
            rgba(17, 17, 17, 0) 88%
          );
        }

        /*
          The poles. Twelve meridians converging is a knot, and a knot
          is the thing that makes a wireframe look like a diagram.
        */
        .horizons-poles {
          position: absolute;
          inset: -2%;
          border-radius: 50%;
          background:
            linear-gradient(to bottom, #111111 0%, rgba(17,17,17,0.7) 7%, rgba(17,17,17,0) 17%),
            linear-gradient(to top,    #111111 0%, rgba(17,17,17,0.7) 7%, rgba(17,17,17,0) 17%);
        }

        /*
          On a phone there is nowhere for it to go that is not behind
          the writing, so it gives way: smaller, higher, and fainter,
          sitting above the heading rather than across it.
        */
        @media (max-width: 639px) {
          .horizons-ring { border-color: rgba(255, 255, 255, 0.04); }
          .horizons-ring-equator { border-color: rgba(138, 149, 86, 0.16); }
          .horizons-ring-lat { border-color: rgba(255, 255, 255, 0.032); }
          .horizons-limb { border-color: rgba(255, 255, 255, 0.075); }
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-globe-spin { animation: none; }
          .horizons-globe-stage { animation-duration: 1ms; }
        }
      `}</style>

      <div className="horizons-globe">
        <div className="horizons-body" />

        <div className="horizons-globe-spin">
          {Array.from({ length: MERIDIANS }).map((_, index) => (
            <span
              key={`m-${index}`}
              className="horizons-ring"
              style={{ transform: `rotateY(${(index * 180) / MERIDIANS}deg)` }}
            />
          ))}

          {PARALLELS.map((lat) => {
            const radians = (lat * Math.PI) / 180;

            return (
              <span
                key={`p-${lat}`}
                className={`horizons-ring ${
                  lat === 0 ? "horizons-ring-equator" : "horizons-ring-lat"
                }`}
                style={{
                  transform: `rotateX(90deg) translateZ(${
                    Math.sin(radians) * 50
                  }%) scale(${Math.cos(radians)})`,
                }}
              />
            );
          })}
        </div>

        <div className="horizons-limb" />
        <div className="horizons-atmosphere" />
        <div className="horizons-poles" />
      </div>
    </div>
  );
}
