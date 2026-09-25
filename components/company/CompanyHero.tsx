import Container from "@/components/ui/Container";
import { COMPANY, HEADLINE_FACTS } from "@/data/company";

/*
  The same opening as contact and the questions — label, statement, the
  rule drawn across, and three facts under it. The facts here are the
  three an agent asks for before they will put a client on a boat, so
  they go above the fold rather than at the foot of the page.
*/
export default function CompanyHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-company-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-company-in {
          animation: horizons-company-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-company-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-company-rule {
          transform-origin: left center;
          animation: horizons-company-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-company-in { animation: none; }
          .horizons-company-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-company-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Company
        </p>

        <h1
          className="horizons-company-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          Who you are dealing with.
        </h1>

        <p
          className="horizons-company-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          HORIZONS is the travel name of {COMPANY.legalName}, registered in{" "}
          {COMPANY.jurisdiction}. Sending money to a company on the other side
          of the world is an act of trust, and trust should be checkable — so
          every number below is on a public register, and both certificates
          are here to read rather than to ask for.
        </p>
      </Container>

      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-company-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-company-in grid gap-8 py-10 sm:grid-cols-3 md:gap-16 md:py-12"
            style={{ animationDelay: "520ms" }}
          >
            {HEADLINE_FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  {fact.label}
                </p>

                <p className="mt-3 text-[15px] leading-7 text-white/70 lining-nums md:text-[16px]">
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
