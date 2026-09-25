import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions from "@/components/ui/EnquiryActions";

/*
  A privacy policy that ends in a postal address nobody answers is the
  usual thing. This one ends the way every other page on the site ends —
  with the two ways of reaching a person.
*/
export default function PrivacyCTA() {
  const message =
    "Hello HORIZONS, I have a question about privacy — what you hold about me, or a request to delete it.";

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Ask us
            </p>

            <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
              Delete it, correct it, or just ask what we have.
            </h2>
          </Reveal>

          <Reveal delay={140} className="lg:pt-16">
            <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              There is no form for this and no reference number. Write to us
              and one of the people who answers the enquiries answers this
              too — the same day, in almost every case.
            </p>

            <EnquiryActions
              message={message}
              subject="Privacy — a question about my details"
              className="mt-10"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
