import Container from "@/components/ui/Container";
import { faq } from "@/data/faq";

/*
  The same opening as the rest of the site: label, statement, the rule
  drawn across, and under it the groups the page is made of — which
  doubles as a contents page on a long page of questions.

  Set closer together than the others, and only that. Every size,
  weight and colour here is the one the journeys and stays pages use;
  changing those would make the site look like it had been built by two
  people. What changes is the air between them. Those pages open onto a
  grid of photographs and the ceremony is the point. This one opens
  onto somebody who wants to know what time check-in is, and a full
  screen of manifesto between them and the answer is a screen too many.
*/
export default function FaqHero() {
  const total = faq.reduce((sum, group) => sum + group.questions.length, 0);

  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-28 md:pt-32">
      <style>{`
        @keyframes horizons-faq-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-faq-in {
          animation: horizons-faq-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-faq-rule {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .horizons-faq-rule {
          transform-origin: left center;
          animation: horizons-faq-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-faq-in { animation: none; }
          .horizons-faq-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-faq-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          Questions
        </p>

        <h1
          className="horizons-faq-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          The things people ask first.
        </h1>

        <p
          className="horizons-faq-in mt-7 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          Answered plainly, and where we do not have an answer yet we have
          left the question off rather than written something that sounds
          like one. Anything missing, ask us — that is what the enquiry is
          for.
        </p>
      </Container>

      <div className="mt-11 md:mt-14">
        <span
          aria-hidden
          className="horizons-faq-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div
            className="horizons-faq-in flex flex-col gap-6 py-8 md:flex-row md:items-start md:gap-16 md:py-9"
            style={{ animationDelay: "520ms" }}
          >
            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/35 md:w-32 md:pt-1">
              {total} questions
            </p>

            <p className="text-[13.5px] leading-[1.95] tracking-[0.06em] text-white/45">
              {faq.map((group, index) => (
                <span key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="transition-colors duration-300 hover:text-[#A8B473]"
                  >
                    {group.label}
                  </a>
                  {index < faq.length - 1 ? (
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
