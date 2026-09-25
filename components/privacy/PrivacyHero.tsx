import Container from "@/components/ui/Container";
import { LAST_UPDATED, SUMMARY } from "@/data/privacy";

/*
  The same opening as the rest of the site, and under the rule the three
  answers people are actually looking for when they open a privacy page.
  Most sites make you read eleven paragraphs to find out whether they
  track you; ours can say no three times before you scroll.
*/
export default function PrivacyHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-privacy-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-privacy-in {
          animation: horizons-privacy-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-privacy-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-privacy-rule {
          transform-origin: left center;
          animation: horizons-privacy-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-privacy-in { animation: none; }
          .horizons-privacy-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-privacy-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Privacy
        </p>

        <h1
          className="horizons-privacy-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          What happens to what you tell us.
        </h1>

        <p
          className="horizons-privacy-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          This website sets no cookies, runs no analytics and knows nothing
          about you. The only personal information we hold is what you choose
          to write to us, and the only thing we do with it is arrange your
          journey. Everything below is the long version of those two
          sentences.
        </p>

        <p
          className="horizons-privacy-in mt-7 text-[12px] uppercase tracking-[0.3em] text-white/30 lining-nums"
          style={{ animationDelay: "440ms" }}
        >
          Last changed {LAST_UPDATED}
        </p>
      </Container>

      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-privacy-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-privacy-in grid gap-8 py-10 sm:grid-cols-3 md:gap-16 md:py-12"
            style={{ animationDelay: "520ms" }}
          >
            {SUMMARY.map((line) => (
              <div key={line.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {line.label}
                </p>

                <p className="mt-3 font-cormorant text-[26px] font-light leading-none text-[#A8B473] md:text-[30px]">
                  {line.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
