/*
  The helicopter that lives on the H of "How to get to Kerala".

  Parked, it sits on the letter with its rotor stopped — the H is the
  helipad. Hovering the panel spins it up, lifts it off and flies it
  across to the island in the far corner, where it holds a hover. Taking
  the pointer away flies it home again.

  The whole flight is one transform on the outer span, driven by two
  custom properties the panel measures (--hk-dx / --hk-dy), so the arc
  is correct at any width without a resize listener rewriting keyframes.
*/

export default function Helicopter({
  lit,
  flown,
  style,
}: {
  lit: boolean;
  flown: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={style}
      className={`hk pointer-events-none absolute hidden md:block ${
        lit ? "hk-out" : flown ? "hk-back" : ""
      }`}
    >
      <span className="hk-bob block">
        <svg viewBox="0 0 104 58" className="block h-auto w-full">
          <style>{`
            .hk { will-change: transform; }

            .hk-out  { animation: hk-fly 2.4s cubic-bezier(0.38, 0.02, 0.28, 1) both; }
            .hk-back { animation: hk-park 1.7s cubic-bezier(0.38, 0.02, 0.28, 1) both; }

            /* It grows as it goes: parked on a single letter it is the size
               of a letter, and by the island it is a helicopter. */
            @keyframes hk-fly {
              0%   { transform: translate(0, 0) rotate(0deg) scale(1); }
              14%  { transform: translate(calc(var(--hk-dx) * 0.03), calc(var(--hk-dy) * 0.02 - 20px)) rotate(3deg) scale(1.08); }
              58%  { transform: translate(calc(var(--hk-dx) * 0.56), calc(var(--hk-dy) * 0.34 - 30px)) rotate(9deg) scale(1.3); }
              90%  { transform: translate(calc(var(--hk-dx) * 1.02), calc(var(--hk-dy) * 1.02 + 5px)) rotate(2deg) scale(var(--hk-grow)); }
              100% { transform: translate(var(--hk-dx), var(--hk-dy)) rotate(0deg) scale(var(--hk-grow)); }
            }

            @keyframes hk-park {
              0%   { transform: translate(var(--hk-dx), var(--hk-dy)) rotate(0deg) scale(var(--hk-grow)); }
              30%  { transform: translate(calc(var(--hk-dx) * 0.82), calc(var(--hk-dy) * 0.62 - 26px)) rotate(-7deg) scale(1.3); }
              82%  { transform: translate(calc(var(--hk-dx) * 0.06), -22px) rotate(-3deg) scale(1.05); }
              100% { transform: translate(0, 0) rotate(0deg) scale(1); }
            }

            @keyframes hk-bob {
              0%, 100% { transform: translateY(0) rotate(0.8deg); }
              50%      { transform: translateY(-3px) rotate(-1.2deg); }
            }
            .hk-out .hk-bob { animation: hk-bob 2.6s ease-in-out 2.4s infinite; }

            /* Side on, the main rotor is edge-on: the blade shortens to
               nothing and comes back the other way. Far more convincing
               at this size than spinning a line through 360 degrees. */
            .hk-blade {
              transform-box: view-box;
              transform-origin: 59px 7px;
              animation: hk-blade 1.9s linear infinite;
            }
            .hk-out .hk-blade, .hk-back .hk-blade { animation-duration: 0.17s; }
            @keyframes hk-blade {
              0%   { transform: scaleX(1); }
              50%  { transform: scaleX(-1); }
              100% { transform: scaleX(1); }
            }

            .hk-disc, .hk-tail-disc { opacity: 0; transition: opacity 400ms ease; }
            .hk-out .hk-disc, .hk-out .hk-tail-disc,
            .hk-back .hk-disc, .hk-back .hk-tail-disc { opacity: 1; }

            .hk-tail-blade { transition: opacity 400ms ease; }
            .hk-out .hk-tail-blade, .hk-back .hk-tail-blade { opacity: 0; }

            @media (prefers-reduced-motion: reduce) {
              .hk, .hk-bob, .hk-blade { animation: none !important; }
            }
          `}</style>

          <defs>
            <linearGradient id="hk-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F7F3E6" />
              <stop offset="55%" stopColor="#E3DCC5" />
              <stop offset="100%" stopColor="#C5BC9F" />
            </linearGradient>
          </defs>

          {/* tail boom */}
          <path
            d="M46 23 C34 22 22 21 13 20 L13 28 C22 28 34 30 46 31 Z"
            fill="url(#hk-body)"
            stroke="#3C3C34"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M20 25 L9 22 L9 26.5 L20 28 Z"
            fill="#6B7341"
            stroke="#3C3C34"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M17 21 C16 15 14 10 11.5 7 L18.5 8.5 C20.5 12.5 21.5 17 21.5 21.5 Z"
            fill="#6B7341"
            stroke="#3C3C34"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />

          {/* tail rotor: blades when parked, a disc when it is turning */}
          <ellipse className="hk-tail-disc" cx="14.5" cy="9.5" rx="2.2" ry="8" fill="#DCD8C8" fillOpacity="0.3" />
          <path className="hk-tail-blade" d="M14.5 2 V17" stroke="#EDE8D6" strokeWidth="1.7" strokeLinecap="round" />
          <circle cx="14.5" cy="9.5" r="1.7" fill="#3C3C34" />

          {/* cabin */}
          <path
            d="M44 31
               C38.5 30 35 26 36 21.5
               C37 16.5 43 13.5 53 13.5
               C67 13.5 82 17.5 91 25
               C95 28.5 92.5 34.5 86 36.5
               C74 39.5 53 38.5 46 35.5 Z"
            fill="url(#hk-body)"
            stroke="#3C3C34"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M64 14.8 C74.5 16 85 20.5 90.5 26 C91.8 27.3 90.6 29 88.5 28.6 L70.5 26.5 C68.5 21.8 66.3 17.8 64 14.8 Z"
            fill="#A9C6D6"
            stroke="#3C3C34"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M47.5 16.4 C52 14.8 57 14.6 61 15.2 L63.5 24.6 L47 23.6 Z"
            fill="#A9C6D6"
            stroke="#3C3C34"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path d="M45.5 24.2 L46.8 33.6" stroke="#3C3C34" strokeOpacity="0.45" strokeWidth="1" />
          <path d="M55 27.5 h4" stroke="#3C3C34" strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" />
          <path
            d="M38.5 28.5 C50 32 70 34 85 32.5"
            stroke="#6B7341"
            strokeWidth="2.4"
            fill="none"
            strokeLinecap="round"
          />

          {/* skids */}
          <path d="M44 34 L40.5 46" stroke="#4A4A42" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M68 36.5 L69 46.5" stroke="#4A4A42" strokeWidth="2.2" strokeLinecap="round" />
          <path
            d="M33 45.5 H76 C79.5 45.5 81.5 44 82.5 42"
            stroke="#4A4A42"
            strokeWidth="2.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* mast and main rotor */}
          <rect x="57" y="7.5" width="4.2" height="7.5" rx="1.3" fill="#6B7341" stroke="#3C3C34" strokeWidth="1" />
          <ellipse className="hk-disc" cx="59" cy="6.8" rx="47" ry="2.4" fill="#DCD8C8" fillOpacity="0.22" />
          <path
            className="hk-blade"
            d="M12 8.6 C34 6 84 6 100 8.2"
            stroke="#EDE8D6"
            strokeWidth="2.1"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="59" cy="6.6" r="2.6" fill="#3C3C34" />
        </svg>
      </span>
    </span>
  );
}
