/*
  The helicopter that lives on the H of "How to get to Kerala".

  Parked, you are looking straight down at it: the letter is the pad and
  the machine is standing on it, rotor stopped. Hover the panel and the
  rotor spins up, it lifts off the letter, swings its nose round to the
  east and — as it turns side on — flies across to the island in the far
  corner, growing as it goes, where it holds a hover until the pointer
  leaves and it comes home.

  Two drawings, one box. The plan view does the standing and the turn,
  the side view does the flying, and they cross over halfway through the
  turn, which is the one moment where both readings look the same.

  The flight itself is one transform on the outer span driven by two
  custom properties the panel measures (--hk-dx / --hk-dy), so the arc
  lands on the island at any width without any JavaScript in the air.
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
      <span className="hk-bob">
        {/* ——— standing on the pad, seen from above ——— */}
        <span className="hk-view hk-plan">
          <svg viewBox="0 0 104 104" className="block h-full w-full">
            <style>{`
              .hk { will-change: transform; }
              .hk-bob, .hk-view { position: absolute; inset: 0; display: block; }

              .hk-out  { animation: hk-fly 3.4s cubic-bezier(0.36, 0.02, 0.26, 1) both; }
              .hk-back { animation: hk-home 2.4s cubic-bezier(0.36, 0.02, 0.26, 1) both; }

              @keyframes hk-fly {
                0%   { transform: translate(0, 0) scale(1); }
                10%  { transform: translate(0, 0) scale(1); }
                24%  { transform: translate(0, -10px) scale(1.08); }
                42%  { transform: translate(0, -16px) scale(1.14); }
                60%  { transform: translate(calc(var(--hk-dx) * 0.34), calc(var(--hk-dy) * 0.24 - 32px)) scale(1.45); }
                90%  { transform: translate(calc(var(--hk-dx) * 1.02), calc(var(--hk-dy) * 1.02 + 5px)) scale(var(--hk-grow)); }
                100% { transform: translate(var(--hk-dx), var(--hk-dy)) scale(var(--hk-grow)); }
              }

              @keyframes hk-home {
                0%   { transform: translate(var(--hk-dx), var(--hk-dy)) scale(var(--hk-grow)); }
                34%  { transform: translate(calc(var(--hk-dx) * 0.6), calc(var(--hk-dy) * 0.45 - 30px)) scale(1.4); }
                74%  { transform: translate(0, -16px) scale(1.14); }
                100% { transform: translate(0, 0) scale(1); }
              }

              /* The turn. Nose north on the pad, nose east by the time the
                 side view takes over. */
              .hk-plan { transform: rotate(-90deg); }
              .hk-out .hk-plan  { animation: hk-turn 3.4s cubic-bezier(0.36, 0.02, 0.26, 1) both; }
              .hk-back .hk-plan { animation: hk-turn-back 2.4s cubic-bezier(0.36, 0.02, 0.26, 1) both; }

              @keyframes hk-turn {
                0%, 24% { transform: rotate(-90deg); opacity: 1; }
                44%     { transform: rotate(-8deg);  opacity: 1; }
                53%     { transform: rotate(0deg);   opacity: 0; }
                100%    { transform: rotate(0deg);   opacity: 0; }
              }
              @keyframes hk-turn-back {
                0%, 47% { transform: rotate(0deg);   opacity: 0; }
                58%     { transform: rotate(-8deg);  opacity: 1; }
                84%     { transform: rotate(-90deg); opacity: 1; }
                100%    { transform: rotate(-90deg); opacity: 1; }
              }

              .hk-side { opacity: 0; }
              .hk-out .hk-side  { animation: hk-aboard 3.4s cubic-bezier(0.36, 0.02, 0.26, 1) both; }
              .hk-back .hk-side { animation: hk-ashore 2.4s cubic-bezier(0.36, 0.02, 0.26, 1) both; }

              @keyframes hk-aboard {
                0%, 42% { opacity: 0; transform: rotate(4deg); }
                54%     { opacity: 1; transform: rotate(8deg); }
                88%     { opacity: 1; transform: rotate(2deg); }
                100%    { opacity: 1; transform: rotate(0deg); }
              }
              @keyframes hk-ashore {
                0%      { opacity: 1; transform: rotate(0deg); }
                24%     { opacity: 1; transform: rotate(-6deg); }
                52%     { opacity: 0; transform: rotate(-4deg); }
                100%    { opacity: 0; transform: rotate(0deg); }
              }

              /* The shadow it leaves on the letter, gone once it is up. */
              .hk-shade { opacity: 0.4; }
              .hk-out .hk-shade  { animation: hk-shade 3.4s ease both; }
              .hk-back .hk-shade { animation: hk-shade 2.4s ease reverse both; }
              @keyframes hk-shade {
                0%   { opacity: 0.4; }
                26%  { opacity: 0; }
                100% { opacity: 0; }
              }

              @keyframes hk-bob {
                0%, 100% { transform: translateY(0) rotate(0.8deg); }
                50%      { transform: translateY(-3px) rotate(-1.2deg); }
              }
              .hk-out .hk-bob { animation: hk-bob 2.6s ease-in-out 3.4s infinite; }

              /* Rotors. Overhead it turns, which is what a rotor does seen
                 from above; side on it is edge on, so the blade shortens to
                 nothing and comes back the other way. */
              .hk-spin { transform-box: view-box; transform-origin: 56px 52px; }
              .hk-out .hk-spin  { animation: hk-spin 0.4s linear infinite; }
              /* Six turns is the length of the way home, so it comes to rest
                 on the pad instead of sitting there with the rotor running. */
              .hk-back .hk-spin { animation: hk-spin 0.4s linear 6 both; }
              @keyframes hk-spin { to { transform: rotate(360deg); } }

              .hk-disc { opacity: 0; }
              .hk-out .hk-disc  { animation: hk-disc-on 3.4s ease both; }
              .hk-back .hk-disc { animation: hk-disc-off 2.4s ease both; }
              @keyframes hk-disc-on  { 0% { opacity: 0; } 9% { opacity: 1; } 100% { opacity: 1; } }
              @keyframes hk-disc-off { 0%, 84% { opacity: 1; } 100% { opacity: 0; } }

              .hk-out .hk-blades  { animation: hk-blades-on 3.4s ease both; }
              .hk-back .hk-blades { animation: hk-blades-off 2.4s ease both; }
              @keyframes hk-blades-on  { 0% { opacity: 1; } 9% { opacity: 0.45; } 100% { opacity: 0.45; } }
              @keyframes hk-blades-off { 0%, 84% { opacity: 0.45; } 100% { opacity: 1; } }

              .hk-edge {
                transform-box: view-box;
                transform-origin: 59px 30px;
                animation: hk-edge 1.9s linear infinite;
              }
              .hk-out .hk-edge, .hk-back .hk-edge { animation-duration: 0.17s; }
              @keyframes hk-edge {
                0%   { transform: scaleX(1); }
                50%  { transform: scaleX(-1); }
                100% { transform: scaleX(1); }
              }

              .hk-tail-disc { opacity: 0; transition: opacity 400ms ease; }
              .hk-out .hk-tail-disc, .hk-back .hk-tail-disc { opacity: 1; }
              .hk-tail-blade { transition: opacity 400ms ease; }
              .hk-out .hk-tail-blade, .hk-back .hk-tail-blade { opacity: 0; }

              @media (prefers-reduced-motion: reduce) {
                .hk, .hk-bob, .hk-plan, .hk-side, .hk-spin, .hk-edge { animation: none !important; }
              }
            `}</style>

            <defs>
              <linearGradient id="hk-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F9F5E9" />
                <stop offset="60%" stopColor="#E6DFC9" />
                <stop offset="100%" stopColor="#C5BC9F" />
              </linearGradient>
              <radialGradient id="hk-shade">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse className="hk-shade" cx="56" cy="54" rx="30" ry="34" fill="url(#hk-shade)" />

            {/* skids, inboard enough to stand inside the letter */}
            <path d="M48 46 V38 M66 46 V38 M48 58 V66 M66 58 V66" stroke="#3A3A34" strokeWidth="2.6" />
            <path d="M40 38 H76" stroke="#3A3A34" strokeWidth="4.4" strokeLinecap="round" />
            <path d="M40 66 H76" stroke="#3A3A34" strokeWidth="4.4" strokeLinecap="round" />

            {/* boom and stabiliser */}
            <path
              d="M50 49 L20 50.5 L20 53.5 L50 55 Z"
              fill="url(#hk-body)"
              stroke="#2F2F29"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M16 44 L25 46 L25 58 L16 60 Z"
              fill="#6B7341"
              stroke="#2F2F29"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* fuselage and canopy */}
            <path
              d="M90 52 C90 47 84 44 74 42.8 C66 41.8 57 41.8 50 43 C43 44 40 47.4 40 52
                 C40 56.6 43 60 50 61 C57 62.2 66 62.2 74 61.2 C84 60 90 57 90 52 Z"
              fill="url(#hk-body)"
              stroke="#2F2F29"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <path
              d="M88.5 52 C88.5 48.4 84 45.6 77.5 44.6 C75.8 47 75.2 49.4 75.2 52
                 C75.2 54.6 75.8 57 77.5 59.4 C84 58.4 88.5 55.6 88.5 52 Z"
              fill="#9CC0D4"
              stroke="#2F2F29"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M46 52 H68" stroke="#6B7341" strokeWidth="3" strokeLinecap="round" />

            {/* rotor */}
            <g className="hk-spin">
              <circle
                className="hk-disc"
                cx="56"
                cy="52"
                r="34"
                fill="#DCD8C8"
                fillOpacity="0.13"
                stroke="#DCD8C8"
                strokeOpacity="0.28"
                strokeWidth="1.8"
              />
              <g className="hk-blades" transform="rotate(45 56 52)">
                <path d="M24 52 H88" stroke="#F2EEDD" strokeWidth="4.2" strokeLinecap="round" />
                <path d="M56 20 V84" stroke="#F2EEDD" strokeWidth="4.2" strokeLinecap="round" />
              </g>
            </g>
            <circle cx="56" cy="52" r="4.6" fill="#2F2F29" />
          </svg>
        </span>

        {/* ——— in the air, seen from the side ——— */}
        <span className="hk-view hk-side">
          <svg viewBox="0 0 104 104" className="block h-full w-full">
            <g transform="translate(0 23)">
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

              <ellipse className="hk-tail-disc" cx="14.5" cy="9.5" rx="2.2" ry="8" fill="#DCD8C8" fillOpacity="0.3" />
              <path className="hk-tail-blade" d="M14.5 2 V17" stroke="#EDE8D6" strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="14.5" cy="9.5" r="1.7" fill="#3C3C34" />

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

              <rect x="57" y="7.5" width="4.2" height="7.5" rx="1.3" fill="#6B7341" stroke="#3C3C34" strokeWidth="1" />
              <ellipse className="hk-disc" cx="59" cy="6.8" rx="45" ry="2.4" fill="#DCD8C8" fillOpacity="0.22" />
              <path
                className="hk-edge"
                d="M14 8.6 C34 6 84 6 98 8.2"
                stroke="#EDE8D6"
                strokeWidth="2.1"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="59" cy="6.6" r="2.6" fill="#3C3C34" />
            </g>
          </svg>
        </span>
      </span>
    </span>
  );
}
