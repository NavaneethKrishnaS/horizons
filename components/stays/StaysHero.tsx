import Container from "@/components/ui/Container";
import { stays } from "@/data/stays";

const WORDS: Record<number, string> = {};

function spelled(count: number) {
  const units = [
    "no", "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen",
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  if (WORDS[count]) return WORDS[count];
  if (count < 20) return units[count];

  const t = tens[Math.floor(count / 10)];
  const u = count % 10;

  return u ? `${t}-${units[u]}` : t;
}

export default function StaysHero() {
  const total = spelled(stays.length);
  const kerala = stays.filter((stay) => stay.from === 0).length;

  return (
    <section className="relative flex min-h-[64vh] items-end overflow-hidden border-b border-white/10 pb-16 pt-40 md:min-h-[72vh] md:pb-24">
      <style>{`
        @keyframes horizons-stays-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-stays-rise {
          animation: horizons-stays-rise 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /*
          A quiet grid behind the type — the plan of a place rather than a
          picture of one, which is the right register for a page that is
          waiting on its photographs.
        */
        .horizons-plan {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 96px 96px;
          mask-image: radial-gradient(120% 90% at 78% 28%, #000 0%, transparent 72%);
          -webkit-mask-image: radial-gradient(120% 90% at 78% 28%, #000 0%, transparent 72%);
          opacity: 0;
          animation: horizons-stays-rise 2400ms cubic-bezier(0.16, 1, 0.3, 1) 200ms forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-stays-rise { animation: none; opacity: 1; }
          .horizons-plan { animation: none; opacity: 1; }
        }
      `}</style>

      <div aria-hidden className="horizons-plan" />

      <Container className="relative">
        <p
          className="horizons-stays-rise text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Stays
        </p>

        <h1
          className="horizons-stays-rise mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          {total.charAt(0).toUpperCase() + total.slice(1)} places we would send
          you ourselves.
        </h1>

        <p
          className="horizons-stays-rise mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          Small hotels, family houses, houseboats and camps across India —
          {" "}{kerala} of them in Kerala, which is where we are and what we
          know best. None of them is large, none of them is a chain, and we
          have stood in most of them. Tell us who is travelling and we will
          tell you which one.
        </p>
      </Container>
    </section>
  );
}
