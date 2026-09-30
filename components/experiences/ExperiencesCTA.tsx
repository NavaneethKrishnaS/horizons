import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions from "@/components/ui/EnquiryActions";

/*
  The closing. Deliberately not a fifth entry.

  What it says is the one thing this page cannot say in a list: that
  these are usually not booked on their own. Somebody already coming to
  Alappuzha for a boat adds the canoe to the morning before, and that is
  a sentence rather than a product.
*/
export default function ExperiencesCTA() {
  const message =
    "Hello HORIZONS, I would like to add something on the water to a journey — a shikara, a canoe, kayaking or the ferries.";

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Putting it together
            </p>

            <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
              Most of these belong to a morning, not a holiday.
            </h2>
          </Reveal>

          <Reveal delay={140} className="lg:pt-16">
            <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              Nobody comes to Kerala for a shikara ride. They come for the
              backwaters, and then there is a morning before the boat or an
              afternoon after it, and this is what that morning is for. Tell us
              which nights you are on the water and we will say which of these
              fits where — including the ones we would talk you out of.
            </p>

            <EnquiryActions
              message={message}
              subject="Something on the water"
              className="mt-10"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
