"use client";

import { useEffect, useState } from "react";

import type { ArticleSection } from "@/data/journalArticles";

/*
  The contents list, marking the section you are in.

  An IntersectionObserver watching a band across the upper third of the
  window rather than scroll offsets: no listener runs per frame, the
  browser does the work off the main thread, and nothing has to know how
  tall anything is.

  The band is deliberately narrow — a section counts as the one you are
  reading only while its top is between a fifth and a third of the way
  down. A taller band means two sections qualify at once on a long
  screen; a shorter one leaves nothing marked between sections.

  It is an enhancement and nothing depends on it. Rendered on the server
  and before this runs, every row is simply unmarked, and the links work
  either way.
*/
export default function Contents({
  sections,
  listClassName = "",
}: {
  sections: ArticleSection[];
  listClassName?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (nodes.length === 0) return undefined;

    /*
      One set of what is currently in the band, kept across callbacks.
      A callback only carries the sections whose state CHANGED, so
      deciding from `entries` alone gets it wrong the moment two of them
      move at once.
    */
    const order = nodes.map((node) => node.id);
    const inBand = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }

        /* Document order decides, never the order they were reported in. */
        const first = order.find((id) => inBand.has(id));

        /*
          Nothing in the band — between two sections, or past the last —
          leaves the previous one marked rather than clearing it, which
          would blink the mark off every time you scroll over a join.
        */
        if (first) setActive(first);
      },
      { rootMargin: "-20% 0px -67% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);

    return () => observer.disconnect();
  }, [sections]);

  return (
    <ol className={listClassName}>
      {sections.map((section, index) => {
        const on = active === section.id;

        return (
          <li
            key={section.id}
            className={index === 0 ? "" : "border-t border-black/[0.07]"}
          >
            <a
              href={`#${section.id}`}
              aria-current={on ? "true" : undefined}
              className="group/row block py-2.5"
            >
              {section.kicker && (
                <span
                  className={`block text-[9.5px] uppercase tracking-[0.26em] transition-colors duration-300 group-hover/row:text-[#6B7341] ${
                    on ? "text-[#6B7341]" : "text-black/35"
                  }`}
                >
                  {section.kicker}
                </span>
              )}

              <span
                className={`mt-1 block text-[13.5px] leading-[1.4] transition-colors duration-300 group-hover/row:text-[#111111] ${
                  on ? "text-[#111111]" : "text-black/60"
                }`}
              >
                {section.rail}
              </span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}
