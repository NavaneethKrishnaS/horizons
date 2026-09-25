import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions from "@/components/ui/EnquiryActions";

/*
  Every legal page on this site ends the way the rest of it does: with
  the two ways of reaching a person, rather than a postal address nobody
  answers.
*/
export default function LegalCTA({
  label,
  title,
  body,
  message,
  subject,
}: {
  label: string;
  title: string;
  body: string;
  message: string;
  subject: string;
}) {
  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              {label}
            </p>

            <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={140} className="lg:pt-16">
            <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              {body}
            </p>

            <EnquiryActions message={message} subject={subject} className="mt-10" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
