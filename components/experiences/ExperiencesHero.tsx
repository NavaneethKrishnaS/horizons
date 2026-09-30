import Container from "@/components/ui/Container";
import { experiences } from "@/data/experiences";

/*
  Type only, as the Stays hero is.

  Every photograph we could put behind this headline today is licensed
  rather than ours, and a borrowed picture at full height is the one
  place on the site where that would show. So the page opens on the
  sentence instead, and the photographs do their work further down where
  they belong to something specific.
*/
export default function ExperiencesHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pt-40">
      <style>{`
        @keyframes horizons-exp-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .horizons-exp-in {
          animation: horizons-exp-in 1100ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes horizons-exp-rule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .horizons-exp-rule {
          transform-origin: left center;
          animation: horizons-exp-rule 2500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        @media (prefers-reduced-motion: reduce) {
          .horizons-exp-in { animation: none; }
          .horizons-exp-rule { animation: none; transform: none; }
        }
      `}</style>

      <Container className="relative">
        <p
          className="horizons-exp-in text-[11px] uppercase tracking-[0.45em] text-white/50"
          style={{ animationDelay: "80ms" }}
        >
          On the water
        </p>

        <h1
          className="horizons-exp-in mt-7 max-w-4xl font-cormorant text-[44px] font-light leading-[1.02] text-white sm:text-6xl md:text-[88px]"
          style={{ animationDelay: "200ms" }}
        >
          The backwaters, without the boat.
        </h1>

        <p
          className="horizons-exp-in mt-9 max-w-2xl text-[15px] leading-8 text-white/60 md:text-[17px] md:leading-9"
          style={{ animationDelay: "360ms" }}
        >
          A houseboat is one way to see this water and it is not the only one.
          These are the others — an hour in a shikara, a village at first light
          from a canoe, a paddle before breakfast, and the ferry that everybody
          here takes and almost no visitor does. Any of them sits inside a
          journey, or stands on its own.
        </p>
      </Container>

      <div className="mt-16 md:mt-24">
        <span
          aria-hidden
          className="horizons-exp-rule block h-px w-full bg-gradient-to-r from-[#6B7341] via-[#6B7341]/40 to-transparent"
        />

        <Container>
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:gap-16 md:py-12">
            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/35 md:w-32 md:pt-1">
              {experiences.length} ways
            </p>

            <p className="text-[13.5px] leading-[1.95] tracking-[0.06em] text-white/45">
              {experiences.map((item, index) => (
                <span key={item.id}>
                  {item.title}
                  {index < experiences.length - 1 ? (
                    <span aria-hidden className="px-2.5 text-[#6B7341]">
                      ·
                    </span>
                  ) : null}
                </span>
              ))}
            </p>

            <p className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/35 md:w-24 md:pt-1 md:text-right">
              Alappuzha
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
