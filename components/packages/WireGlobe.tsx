/*
  A wireframe globe, turning.

  Real three-dimensional geometry, and no library and no model file:
  twenty-four rings in one preserve-3d space, each rotated a little
  further about the vertical axis, the whole thing turning once every
  eighty seconds. It is about two hundred bytes of markup, runs on the
  compositor, and there is nothing to download.

  Why this and not a rendered object. The site already speaks three
  visual languages — photography, engraving, and Cormorant — and a
  fourth would be a fourth. A wireframe is a drawing rather than a
  prop, which puts it with the engravings rather than against them;
  and for a company called HORIZONS a turning globe is the brand
  stated plainly, not decoration hung on it.

  It is held at low opacity and sits behind and to the side of the
  writing. Nothing has to be read through it.
*/
const MERIDIANS = 18;
const PARALLELS = [-60, -40, -20, 0, 20, 40, 60];

export default function WireGlobe() {
  return (
    <div
      aria-hidden
      className="horizons-globe-stage pointer-events-none absolute right-[-20%] top-[-2%] w-[58vw] max-w-[640px] select-none sm:right-[-16%] sm:top-[4%] sm:w-[70vw] lg:right-[2%] lg:top-[6%] lg:w-[86vw]"
    >
      <style>{`
        .horizons-globe-stage {
          perspective: 1400px;
          opacity: 0;
          animation: horizons-globe-in 2800ms cubic-bezier(0.16, 1, 0.3, 1) 300ms forwards;
        }

        @keyframes horizons-globe-in {
          to { opacity: 1; }
        }

        .horizons-globe {
          position: relative;
          width: 100%;
          padding-bottom: 100%;
          transform-style: preserve-3d;
          /* Tipped, the way a globe sits on a stand. */
          transform: rotateX(16deg) rotateZ(-8deg);
        }

        .horizons-globe-spin {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          animation: horizons-globe-spin 80s linear infinite;
        }

        @keyframes horizons-globe-spin {
          to { transform: rotateY(360deg); }
        }

        .horizons-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 50%;
        }

        /* The equator and the tropics carry the brand colour. */
        .horizons-ring-lat {
          border-color: rgba(107, 115, 65, 0.22);
        }

        .horizons-ring-lat-faint {
          border-color: rgba(255, 255, 255, 0.05);
        }

        /*
          On a phone there is nowhere for it to go that is not behind
          the writing, so it gives way instead: smaller, higher, and
          fainter, sitting above the heading rather than across it.
        */
        @media (max-width: 639px) {
          .horizons-ring { border-color: rgba(255, 255, 255, 0.045); }
          .horizons-ring-lat { border-color: rgba(107, 115, 65, 0.14); }
          .horizons-ring-lat-faint { border-color: rgba(255, 255, 255, 0.035); }
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-globe-spin { animation: none; }
          .horizons-globe-stage { animation-duration: 1ms; }
        }
      `}</style>

      <div className="horizons-globe">
        <div className="horizons-globe-spin">
          {/* Meridians: one ring per slice of longitude. */}
          {Array.from({ length: MERIDIANS }).map((_, index) => (
            <span
              key={`m-${index}`}
              className="horizons-ring"
              style={{
                transform: `rotateY(${(index * 180) / MERIDIANS}deg)`,
              }}
            />
          ))}

          {/*
            Parallels: flat rings, scaled by the cosine of their latitude
            and lifted by its sine, which is what puts them on the sphere
            rather than merely near it.
          */}
          {PARALLELS.map((lat) => {
            const radians = (lat * Math.PI) / 180;
            const scale = Math.cos(radians);
            const lift = Math.sin(radians);

            return (
              <span
                key={`p-${lat}`}
                className={`horizons-ring ${
                  lat === 0 ? "horizons-ring-lat" : "horizons-ring-lat-faint"
                }`}
                style={{
                  transform: `rotateX(90deg) translateZ(${lift * 50}%) scale(${scale})`,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
