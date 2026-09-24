import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions, { EnquiryAddress } from "@/components/ui/EnquiryActions";

/*
  A page of answers should end by admitting it cannot have them all.
*/
export default function FaqCTA() {
  const message =
    "Hello HORIZONS, I have a question that is not answered on your site.";

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Still wondering
            </p>

            <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
              Ask the one we have not answered.
            </h2>
          </Reveal>

          <Reveal delay={140} className="lg:pt-16">
            <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              Most of what we are asked is particular to the person asking —
              a knee that does not like stairs, a child who will not eat
              chilli, a week that has to include a wedding in Kochi. Those
              are the useful questions, and they are not on this page.
            </p>

            <EnquiryActions
              message={message}
              subject="A question about travelling with HORIZONS"
              className="mt-10"
            />

            <EnquiryAddress className="mt-7" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
