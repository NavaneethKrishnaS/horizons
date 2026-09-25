import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import EnquiryActions from "@/components/ui/EnquiryActions";
import { COMPANY } from "@/data/company";

/*
  Whoever reads this page to the bottom is doing due diligence, not
  daydreaming — an accounts department, an agent, somebody about to send
  a deposit. So the closing offers the one thing they are likely to want
  next, which is a person to put the question to.
*/
export default function CompanyCTA() {
  const message = `Hello HORIZONS, I have a question about ${COMPANY.legalName} — company details, invoicing or documentation.`;

  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
              Paperwork
            </p>

            <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
              Anything your accounts department needs.
            </h2>
          </Reveal>

          <Reveal delay={140} className="lg:pt-16">
            <p className="max-w-lg text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
              A GST invoice in your company&rsquo;s name, a proforma before you
              transfer anything, a letter for a visa application, bank details
              on our letterhead — ask and it comes back the same day.
            </p>

            <EnquiryActions
              message={message}
              subject="Company details and documentation"
              className="mt-10"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
