import type { Metadata } from "next";

/*
  One page's metadata, written once.

  Every page needs the same four things said in three places — the
  browser title, the description, the canonical, and the Open Graph
  pair a preview card reads — and Next does not copy a page's title into
  its og:title for you. Left to hand-written objects, some pages had
  them and some did not, which is how a link sent on WhatsApp ends up
  titled after the site instead of after the page.

  The image is not passed: the opengraph-image file convention attaches
  the right card to each route on its own.
*/
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    /*
      siteName and locale are repeated here rather than left in the root
      layout on purpose: a page that declares openGraph replaces the
      layout's openGraph object whole rather than merging into it, so
      anything only the layout knows is lost on every page that has its
      own. The same goes for the twitter block.
    */
    openGraph: {
      title,
      description,
      url: path,
      siteName: "HORIZONS by Scenic Escapes",
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
