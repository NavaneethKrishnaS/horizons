import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { pageMeta } from "@/lib/meta";

import Article from "@/components/journal/article/Article";
import { ARTICLES, articleBySlug } from "@/data/journalArticles";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) return {};

  return pageMeta({
    title: `${article.metaTitle} | HORIZONS`,
    description: article.metaDescription,
    path: `/journal/${article.slug}`,
  });
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articleBySlug(slug);

  if (!article) notFound();

  /*
    Article rather than BlogPosting: this is a reference piece that stays
    true rather than a post with a date on it, and dating it would start
    it going stale the day it is published.

    The sections are published as their own named parts so a result can
    link straight to one of them.
  */
  const structured = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.metaTitle,
    description: article.metaDescription,
    mainEntityOfPage: `https://horizonsindia.com/journal/${article.slug}`,
    author: {
      "@type": "Organization",
      name: "HORIZONS by Scenic Escapes",
      url: "https://horizonsindia.com",
    },
    publisher: {
      "@type": "Organization",
      name: "HORIZONS by Scenic Escapes",
      url: "https://horizonsindia.com",
    },
    hasPart: article.sections.map((section) => ({
      "@type": "WebPageElement",
      name: section.heading,
      url: `https://horizonsindia.com/journal/${article.slug}#${section.id}`,
    })),
  };

  return (
    <main className="overflow-x-clip bg-[#F4F2ED]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
        }}
      />

      <Article article={article} />
    </main>
  );
}
