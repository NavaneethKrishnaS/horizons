import Container from "@/components/ui/Container";
import { airports } from "@/data/gettingHere";

export default function GettingHereHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-28 md:pt-32">
      <style>{`
        @keyframes horizons-arrive-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-arrive-in {
          animation: horizons-arrive-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-arrive-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-arrive-rule {
          transform-origin: left center;
          animation: horizons-arrive-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-arrive-in { animation: none; }
          .horizons-arrive-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-arrive-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Getting here
        </p>

        <h1
          className="horizons-arrive-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          How to get to Kerala.
        </h1>

        <p
          className="horizons-arrive-in mt-7 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          Which airport, how long the drive from it really takes, when the
          train is the better answer, and what to do about the visa. Written
          by people who make this journey with guests every week, and who
          would rather tell you the road is slow than have you find out on
          the day.
        </p>
      </Container>

      <div className="mt-11 md:mt-14">
        <span
          aria-hidden
          className="horizons-arrive-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-arrive-in flex flex-col gap-6 py-8 md:flex-row md:items-start md:gap-16 md:py-9"
            style={{ animationDelay: "520ms" }}
          >
            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/35 md:w-32 md:pt-1">
              {airports.length} airports
            </p>

            <p className="text-[13.5px] leading-[1.95] tracking-[0.06em] text-white/45">
              {airports.map((airport, index) => (
                <span key={airport.code}>
                  {airport.code} · {airport.short}
                  {index < airports.length - 1 ? (
                    <span aria-hidden className="px-2.5 text-[#6B7341]">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
