import Image from "next/image";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { DOCUMENTS, PREVIEW } from "@/data/company";

/*
  The certificates themselves.

  A scan of a government form is a white rectangle, and two of them on a
  near-black page shout louder than anything else on the site — so they
  sit behind a hairline at three-quarter strength and come up to full
  when you go to open one. The paper is the point; it does not have to
  be the loudest thing here.
*/
export default function CompanyDocuments() {
  return (
    <section className="border-t border-white/10 py-20 md:py-28">
      <Container>
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#8B9556]">
            The certificates
          </p>

          <h2 className="mt-7 max-w-xl font-cormorant text-[32px] font-light leading-[1.08] text-white sm:text-5xl md:text-[54px]">
            As they were issued.
          </h2>

          <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/55 md:text-[17px] md:leading-9">
            Both open as PDFs. The GST certificate is here as its first two
            pages; the third is the directors&rsquo; annexure, which the
            department needs and you do not.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-16 md:gap-16">
          {DOCUMENTS.map((document, index) => (
            <Reveal key={document.title} delay={index * 120}>
              <a
                href={document.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="block overflow-hidden border border-white/10 transition-colors duration-500 group-hover:border-[#6B7341]">
                  <Image
                    src={document.preview}
                    alt={`${document.title} for Scenic Escapes India Private Limited`}
                    width={PREVIEW.width}
                    height={PREVIEW.height}
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="block h-auto w-full opacity-75 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </span>

                <span className="mt-6 block font-cormorant text-[24px] font-light leading-snug text-white transition-colors duration-300 group-hover:text-[#A8B473] md:text-[28px]">
                  {document.title}
                </span>

                <span className="mt-3 block text-[13px] leading-6 text-white/40">
                  {document.issuer}
                </span>

                <span className="mt-1 block text-[13px] leading-6 text-white/30 lining-nums">
                  {document.dated} · {document.pages}
                </span>

                <span className="mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 group-hover:text-white">
                  Open the PDF
                  <span
                    aria-hidden
                    className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
