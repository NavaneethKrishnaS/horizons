import Link from "next/link";
import Image from "next/image";

import { ARTICLES } from "@/data/journalArticles";

/*
  The articles, listed at the foot of the story.

  The story is the Journal's front page and stays that way: somebody who
  came to read it should not be interrupted by a list of links. So this
  sits after the last chapter, on the same paper, as a quieter second
  half of the page rather than as a sidebar competing with it.

  It is also the only internal path to the articles, which is what stops
  them being pages only a sitemap knows about.
*/
export default function ArticleIndex() {
  if (ARTICLES.length === 0) return null;

  return (
    <section className="border-t border-black/10 bg-[#F4F2ED] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-[10px] uppercase tracking-[0.4em] text-black/45">
          Also in the Journal
        </p>

        <h2 className="mt-5 max-w-[20ch] font-cormorant text-[30px] font-light leading-[1.08] text-[#111111] md:text-[44px]">
          The plainer questions, answered at length.
        </h2>

        <ul className="mt-12 grid gap-px bg-black/10 md:mt-16">
          {ARTICLES.map((article) => (
            <li key={article.slug} className="bg-[#F4F2ED]">
              <Link
                href={`/journal/${article.slug}`}
                className="group grid items-start gap-5 py-8 transition-colors duration-300 md:grid-cols-[88px_1fr_auto] md:gap-10 md:py-10"
              >
                <Image
                  src={article.railArt.src}
                  alt=""
                  aria-hidden
                  width={176}
                  height={176}
                  sizes="88px"
                  className="h-auto w-[56px] opacity-60 transition-opacity duration-300 group-hover:opacity-90 md:w-[88px]"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#6B7341]">
                    {article.eyebrow}
                  </p>

                  <h3 className="mt-3 max-w-[22ch] font-cormorant text-[24px] font-light leading-[1.12] text-[#111111] md:text-[30px]">
                    {article.title}
                  </h3>

                  <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.75] text-black/55">
                    {article.standfirst}
                  </p>
                </div>

                <span
                  aria-hidden
                  className="self-center text-[12px] uppercase tracking-[0.25em] text-black/40 transition-transform duration-300 group-hover:translate-x-1 md:self-end md:pb-1"
                >
                  Read &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
