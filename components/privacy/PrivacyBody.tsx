import Link from "next/link";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SECTIONS } from "@/data/privacy";

/*
  Set in the same two columns as the company register — the heading small
  and lettered in the left margin, the prose in the reading size on the
  right — so the two legal pages of the site look like one thought rather
  than two templates. Legal text people cannot read is the same as legal
  text that is not there.
*/
export default function PrivacyBody() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        {SECTIONS.map((section, index) => (
          <Reveal key={section.id} delay={Math.min(index, 4) * 60}>
            <div
              id={section.id}
              className={`grid gap-4 border-b border-white/10 pb-10 md:grid-cols-[220px_1fr] md:gap-10 md:pb-12 ${
                index === 0 ? "" : "pt-10 md:pt-12"
              }`}
            >
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/35 md:pt-2">
                {section.heading}
              </h2>

              <div className="max-w-2xl">
                {section.body.map((paragraph, line) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className={`text-[15px] leading-8 text-white/60 md:text-[16px] md:leading-9 ${
                      line === 0 ? "" : "mt-6"
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.links ? (
                  <div className="mt-7 flex flex-col gap-3">
                    {section.links.map((link) =>
                      link.external ? (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-baseline gap-2 self-start text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-[#A8B473]"
                        >
                          {link.label}
                          <span
                            aria-hidden
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          >
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="group inline-flex items-baseline gap-2 self-start text-[11px] uppercase tracking-[0.3em] text-white/50 transition-colors duration-300 hover:text-[#A8B473]"
                        >
                          {link.label}
                          <span
                            aria-hidden
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          >
                            →
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
