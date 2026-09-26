import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/*
  The first thing after the photograph.

  One paragraph, and it has to earn the scroll: who this is, where it
  is from, and why that is different from a booking site. Everything
  here is stated on the About page too — this is the short version, not
  a new claim.
*/
export default function Statement() {
  return (
    <section className="bg-[#111111] pb-32 pt-24 md:pb-44 md:pt-40">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            Kerala, and the rest of India
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 max-w-4xl font-cormorant text-[34px] font-light leading-[1.1] text-white sm:text-5xl md:text-[58px]">
            The backwaters are home. The rest of India we know by having gone.
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
            <p className="text-[16px] leading-9 text-white/60 md:col-span-6 md:text-[18px] md:leading-[2]">
              HORIZONS is Scenic Escapes India, a small company in Alumkadavu —
              the village where the kettuvallam was reinvented, and where our
              founder still lives.
            </p>

            <p className="text-[16px] leading-9 text-white/45 md:col-span-5 md:col-start-8 md:text-[17px] md:leading-[2]">
              We run the boats. We have known most of the houses for years. And
              the person who reads your letter is the one who arranges the
              journey.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
