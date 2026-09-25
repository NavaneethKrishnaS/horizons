import Container from "@/components/ui/Container";

/*
  The opening the two legal pages share.

  Privacy and terms have to look like one thought rather than two
  templates, so they use the same component: label, statement, the date
  it last changed, the rule, and under it three facts a person is
  actually looking for. The animation names are shared too — there is no
  reason for a page to own a keyframe.
*/
export default function LegalHero({
  label,
  title,
  intro,
  updated,
  facts,
}: {
  label: string;
  title: string;
  intro: React.ReactNode;
  updated: string;
  facts: { label: string; value: string }[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-legal-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-legal-in {
          animation: horizons-legal-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-legal-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-legal-rule {
          transform-origin: left center;
          animation: horizons-legal-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-legal-in { animation: none; }
          .horizons-legal-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-legal-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          {label}
        </p>

        <h1
          className="horizons-legal-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          {title}
        </h1>

        <p
          className="horizons-legal-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          {intro}
        </p>

        <p
          className="horizons-legal-in mt-7 text-[12px] uppercase tracking-[0.3em] text-white/30 lining-nums"
          style={{ animationDelay: "440ms" }}
        >
          Last changed {updated}
        </p>
      </Container>

      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-legal-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-legal-in grid gap-8 py-10 sm:grid-cols-3 md:gap-16 md:py-12"
            style={{ animationDelay: "520ms" }}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {fact.label}
                </p>

                <p className="mt-3 font-cormorant text-[26px] font-light leading-none text-[#A8B473] md:text-[30px]">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
