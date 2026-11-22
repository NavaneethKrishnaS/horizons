import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";
import { ARTICLES, articleBySlug } from "@/data/journalArticles";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export const alt = "The Journal — HORIZONS by Scenic Escapes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const article = articleBySlug(params.slug);

  return new ImageResponse(
    (
      <OgCard
        label="The Journal"
        title={article?.title ?? "The Journal"}
        note={article?.standfirst ?? ""}
      />
    ),
    { ...size, fonts: await ogFonts() },
  );
}
