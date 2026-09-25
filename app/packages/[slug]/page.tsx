import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PackageDetail from "@/components/packages/PackageDetail";
import { packages } from "@/data/packages";

export function generateStaticParams() {
  return packages.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = packages.find((entry) => entry.slug === slug);

  if (!tour) return { title: "Journey not found | HORIZONS" };

  return {
    title: `${tour.title} | HORIZONS by Scenic Escapes`,
    description: tour.summary,
    alternates: { canonical: `/packages/${tour.slug}` },
  };
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = packages.find((entry) => entry.slug === slug);

  if (!tour) notFound();

  return <PackageDetail tour={tour} />;
}
