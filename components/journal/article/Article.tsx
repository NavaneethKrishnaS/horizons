import Image from "next/image";
import Link from "next/link";

import { ARTICLES, type JournalArticle } from "@/data/journalArticles";

import Contents from "./Contents";

/*
  An article, in the Journal's own paper rather than the site's black.

  The rail down the left is the whole point of this layout. It is a
  contents list, and because each entry is an anchor to a section id, it
  is also what lets a search engine send somebody to the hour they asked
  about rather than to the top of the page. The links to the other
  articles underneath keep a new piece from being an orphan.

  At small widths the rail collapses into the flow above the text, where
  it still works as a contents list and still carries the anchors.
*/
export default function Article({ article }: { article: JournalArticle }) {
  const others = ARTICLES.filter((other) => other.slug !== article.slug);


  return (
    <div className="mx-auto grid max-w-[1120px] gap-10 px-6 pb-28 pt-28 md:px-10 md:pb-36 md:pt-32 lg:grid-cols-[230px_1fr] lg:gap-[72px]">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        {/*
          The contents.

          The kicker used to sit in a fixed 46px column beside the label,
          which is the right shape for "12:00" and the wrong one for
          "October to March" — that wrapped to three lines while its
          neighbour took one and the list stopped reading as a list. It
          has a line of its own now, so it can be any length and nothing
          moves.

          On a phone the same list would put eight stacked rows between
          the title and the first paragraph, so below lg it folds into a
          disclosure. <details> rather than state: it is a native control,
          it works with no JavaScript, and the anchors inside it are in
          the markup either way for anything reading the page.
        */}
        <details className="group border-y border-black/10 py-3 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] uppercase tracking-[0.4em] text-black/45">
            On this page
            <span
              aria-hidden
              className="text-[13px] transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <Contents sections={article.sections} listClassName="mt-3" />
        </details>

        <div className="hidden lg:block">
          <p className="text-[10px] uppercase tracking-[0.4em] text-black/45">
            On this page
          </p>

          <Contents sections={article.sections} listClassName="mt-5" />
        </div>

        <Image
          src={article.railArt.src}
          alt={article.railArt.alt}
          width={240}
          height={240}
          sizes="140px"
          className="mt-11 hidden h-auto w-[118px] opacity-80 lg:block"
        />

        {others.length > 0 && (
          <div className="mt-10 border-t border-black/10 pt-6 lg:mt-11">
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/45">
              Also in the Journal
            </p>

            <ul className="mt-4 space-y-2.5 text-[13px] leading-[1.6] text-black/55">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/journal/${other.slug}`}
                    className="transition-colors duration-300 hover:text-[#111111]"
                  >
                    {other.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <article>
        <p className="text-[10px] uppercase tracking-[0.4em] text-black/45">
          The Journal &nbsp;·&nbsp; {article.eyebrow}
        </p>

        <h1 className="mt-5 max-w-[16ch] font-cormorant text-[36px] font-light leading-[1.04] text-[#111111] sm:text-[44px] lg:text-[54px]">
          {article.title}
        </h1>

        <p className="mt-6 max-w-[38rem] text-[16px] leading-[1.75] text-black/60 lg:text-[18px]">
          {article.standfirst}
        </p>

        <div className="mt-10 h-px bg-black/10 lg:mt-11" />

        {article.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mt-11 grid gap-3 scroll-mt-[calc(var(--horizons-nav,80px)+2rem)] lg:mt-12 lg:grid-cols-[78px_1fr] lg:gap-[26px]"
          >
            {section.kicker ? (
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#6B7341] lg:pt-[9px]">
                {section.kicker}
              </p>
            ) : (
              <span aria-hidden />
            )}

            <div>
              <h2 className="font-cormorant text-[25px] font-light leading-[1.1] text-[#111111] lg:text-[30px]">
                {section.heading}
              </h2>

              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 28)}
                  className="mt-3 max-w-[40rem] text-[15.5px] leading-[1.85] text-black/72 lg:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}

              {section.art && (
                <Image
                  src={section.art.src}
                  alt={section.art.alt}
                  width={section.art.width * 2}
                  height={section.art.width * 2}
                  sizes={`${section.art.width}px`}
                  className="mt-8 h-auto opacity-70"
                  style={{ width: `${section.art.width}px` }}
                />
              )}
            </div>
          </section>
        ))}
      </article>
    </div>
  );
}
