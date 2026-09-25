/*
  A car going to Kerala, in the corner of the panel.

  The trick is that nothing travels. The car sits exactly where it is
  drawn and the world does the moving: the road slides underneath, the
  exhaust drifts off the back, and the body rocks on its springs.
  Cartoons have worked this way for a century and it reads as motion far
  better than an element actually crossing a box — which would either
  leave the frame or visibly loop back to the start.

  An Ambassador, because on a Kerala road for fifty years it was the car
  that met you at the airport, with the bags roped to the roof because
  that is where the bags went.

  Everything is transform and opacity, so it is composited, and it only
  runs while the panel is hovered.
*/

const PALMS = [
  { x: 36, scale: 1, lean: 1, delay: "0s" },
  { x: 92, scale: 0.78, lean: -1, delay: "0.9s" },
  { x: 64, scale: 0.56, lean: 1, delay: "1.8s" },
];

/* Big, generous fronds — a coconut palm, not a shrub. */
function Palm({
  x,
  scale,
  lean,
  delay,
}: {
  x: number;
  scale: number;
  lean: number;
  delay: string;
}) {
  const height = 86 * scale;
  const topX = 9 * lean * scale;

  return (
    <g transform={`translate(${x} 0)`}>
      {/* Trunk: tapered, leaning, with the ringed segments palms have. */}
      <path
        d={`M${-3.6 * scale} 0
            C${-2 * scale} ${-height * 0.45} ${topX - 3 * scale} ${-height * 0.75}
             ${topX - 2.2 * scale} ${-height}
            L${topX + 2.2 * scale} ${-height}
            C${topX + 3 * scale} ${-height * 0.75} ${2 * scale} ${-height * 0.45}
             ${3.6 * scale} 0 Z`}
        fill="#8C6B47"
        stroke="#5E4630"
        strokeWidth={1.2 * scale}
        strokeLinejoin="round"
      />

      {[0.25, 0.42, 0.59, 0.76].map((t) => (
        <path
          key={t}
          d={`M${-3.2 * scale + topX * t} ${-height * t} q${3.2 * scale} ${1.6 * scale} ${
            6.4 * scale
          } 0`}
          stroke="#5E4630"
          strokeOpacity="0.55"
          strokeWidth={0.9 * scale}
          fill="none"
        />
      ))}

      {/* Crown, swaying from where it joins the trunk. */}
      <g
        className="rk rk-anim"
        style={{
          animation: `rk-frond 3.8s ease-in-out ${delay} infinite`,
          transformOrigin: `${topX}px ${-height}px`,
        }}
      >
        <g transform={`translate(${topX} ${-height}) scale(${scale})`}>
          {[
            { r: -150, c: "#3F7D34" },
            { r: -118, c: "#4E9440" },
            { r: -80, c: "#5CA84B" },
            { r: -38, c: "#4E9440" },
            { r: -8, c: "#3F7D34" },
            { r: 26, c: "#5CA84B" },
            { r: 62, c: "#4E9440" },
            { r: 100, c: "#3F7D34" },
          ].map((frond) => (
            <path
              key={frond.r}
              d="M0 0 C12 -9 30 -11 44 -4 C40 2 34 5 27 5 C18 5 8 3 0 0 Z"
              transform={`rotate(${frond.r})`}
              fill={frond.c}
              stroke="#2F5E28"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
          ))}

          <circle cx="1.5" cy="2.5" r="3.2" fill="#8C6B47" stroke="#5E4630" strokeWidth="0.8" />
          <circle cx="-4" cy="4" r="2.8" fill="#7A5C3C" stroke="#5E4630" strokeWidth="0.8" />
          <circle cx="5.5" cy="6" r="2.6" fill="#7A5C3C" stroke="#5E4630" strokeWidth="0.8" />
        </g>
      </g>
    </g>
  );
}

export default function RoadToKerala({ lit }: { lit: boolean }) {
  return (
    <svg
      viewBox="-56 -34 386 194"
      aria-hidden
      data-road
      className={`pointer-events-none absolute bottom-0 right-0 hidden h-[150px] w-auto transition-opacity duration-500 md:block md:h-[182px] ${
        lit ? "opacity-100" : "opacity-0"
      }`}
    >
      <style>{`
        .rk { transform-box: fill-box; transform-origin: center; }

        @keyframes rk-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-1px) rotate(-0.35deg); }
        }
        @keyframes rk-road { to { transform: translateX(-40px); } }
        @keyframes rk-smoke {
          0%   { transform: translate(0,0) scale(0.45); opacity: 0; }
          18%  { opacity: 0.55; }
          100% { transform: translate(-40px,-16px) scale(2.8); opacity: 0; }
        }
        @keyframes rk-frond {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        @keyframes rk-rise {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes rk-pop {
          0%   { transform: translateY(30px) scale(0.84); opacity: 0; }
          70%  { transform: translateY(-3px) scale(1.03); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        .rk-anim { animation-play-state: paused; }
        .rk-lit .rk-anim { animation-play-state: running; }

        @media (prefers-reduced-motion: reduce) {
          .rk-lit .rk-anim { animation-play-state: paused; }
        }
      `}</style>

      <defs>
        {/* The road fades out before it reaches the island. */}
        {/* The road comes out of the haze on the left and gives out again
            before the island, so nothing is drawn across the water. */}
        <linearGradient id="rk-road-fade" x1="0" x2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="14%" stopColor="#fff" stopOpacity="1" />
          <stop offset="44%" stopColor="#fff" stopOpacity="1" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        {/* userSpaceOnUse, because the road is a horizontal line: its
            bounding box has no height, and a default mask region measured
            from that box masks the road away entirely. */}
        <mask id="rk-road-mask" maskUnits="userSpaceOnUse" x="-100" y="118" width="480" height="30">
          <rect x="-56" y="120" width="386" height="26" fill="url(#rk-road-fade)" />
        </mask>

        <linearGradient id="rk-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E6D3A3" />
          <stop offset="100%" stopColor="#C9A86F" />
        </linearGradient>

        <linearGradient id="rk-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3EEDD" />
          <stop offset="55%" stopColor="#E3DCC5" />
          <stop offset="100%" stopColor="#CFC6A9" />
        </linearGradient>
      </defs>

      <g className={lit ? "rk-lit" : undefined}>
        {/* ——— the road, sliding the other way ——— */}
        <g mask="url(#rk-road-mask)">
          <path d="M-56 132 H330" stroke="#5A5A50" strokeOpacity="0.55" strokeWidth="2.5" />

          <g className="rk rk-anim" style={{ animation: "rk-road 0.75s linear infinite" }}>
            <path
              d="M-100 132 H374"
              stroke="#E8E3CF"
              strokeOpacity="0.75"
              strokeWidth="2"
              strokeDasharray="16 24"
              strokeLinecap="round"
            />
          </g>
        </g>

        {/* ——— the island, drawn after the road so nothing crosses it ——— */}
        <g
          className="rk rk-anim"
          style={{ animation: "rk-pop 950ms cubic-bezier(0.22, 1.35, 0.36, 1) 150ms both" }}
        >
          <g transform="translate(196 126)">
            {/* Water, lapping at the sand. */}
            <path
              d="M-24 6 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0"
              stroke="#5AA9C4"
              strokeOpacity="0.6"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            <path
              d="M-26 2 C-12 -12 12 -18 42 -18 C72 -18 96 -12 110 2 Z"
              fill="url(#rk-sand)"
              stroke="#A98A55"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />

            <g transform="translate(0 -14)">
              {PALMS.map((palm) => (
                <Palm key={palm.x} {...palm} />
              ))}
            </g>
          </g>
        </g>

        {/* ——— the car, standing still and going fast ——— */}
        <g
          className="rk rk-anim"
          style={{ animation: "rk-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both" }}
        >
          <g transform="translate(24 84)">
            {[0, 0.95, 1.9].map((delay) => (
              <circle
                key={delay}
                className="rk rk-anim"
                cx="2"
                cy="42"
                r="3.6"
                fill="#D9D9D0"
                fillOpacity="0.5"
                style={{ animation: `rk-smoke 2.8s ease-out ${delay}s infinite` }}
              />
            ))}

            <g className="rk rk-anim" style={{ animation: "rk-bob 0.42s ease-in-out infinite" }}>
              {/* Luggage, roped to the roof. */}
              <g strokeLinejoin="round">
                <rect x="33" y="-4" width="22" height="11" rx="2" fill="#D19A3F" stroke="#8A5F1F" strokeWidth="1.3" />
                <rect x="56" y="0" width="15" height="7" rx="2" fill="#B4633E" stroke="#7A3D24" strokeWidth="1.3" />
                <path d="M41 -4 V7 M63 0 V7" stroke="#7A3D24" strokeOpacity="0.7" strokeWidth="1" />
                <path d="M29 7 H75" stroke="#4A4A42" strokeWidth="1.6" strokeLinecap="round" />
              </g>

              {/* The Ambassador. */}
              <path
                d="M6 34 L6 26 C6 23 8 21.5 11 21 L25 19.5 C30 10 38 6 50 6 C62 6 69 10 74 19.5 L87 21 C90 21.5 92 23 92 26 L92 34 Z"
                fill="url(#rk-body)"
                stroke="#3C3C34"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />

              <path d="M29 19 C33 12 39 9 48 9 L48 19 Z" fill="#A9C6D6" stroke="#3C3C34" strokeWidth="1.1" />
              <path d="M52 9 C60 9 66 12 70 19 L52 19 Z" fill="#A9C6D6" stroke="#3C3C34" strokeWidth="1.1" />

              <path d="M10 27 H88" stroke="#B9B7A6" strokeWidth="1.1" />
              <path d="M50 19.5 V34" stroke="#8E8C7E" strokeOpacity="0.8" strokeWidth="1" />
              <path d="M44 24 h5" stroke="#8E8C7E" strokeWidth="1.5" strokeLinecap="round" />

              <rect x="88" y="29" width="5" height="3" rx="1" fill="#C9C7BA" />
              <rect x="5" y="29" width="5" height="3" rx="1" fill="#C9C7BA" />
              <circle cx="89.5" cy="25" r="2.4" fill="#FFE9A8" stroke="#C9A93F" strokeWidth="0.8" />
              <circle cx="8" cy="25" r="1.8" fill="#C4564B" />
            </g>

            {/* Wheels. Nothing spins: any small mark going round at this size
                reads as a particle rather than a wheel. The sliding road and
                the body rocking on its springs carry the speed. */}
            {[24, 76].map((cx) => (
              <g key={cx}>
                <circle cx={cx} cy="36" r="9" fill="#2B2B27" stroke="#1B1B18" strokeWidth="1.4" />
                <circle cx={cx} cy="36" r="4.2" fill="#CFCFC4" stroke="#8E8C7E" strokeWidth="0.9" />
                <circle cx={cx - 1.4} cy="34.6" r="1.1" fill="#FFFFFF" fillOpacity="0.7" />
              </g>
            ))}
          </g>
        </g>
      </g>
    </svg>
  );
}
