import type { Metadata } from "next";
import { notFound } from "next/navigation";

import StayDetail from "@/components/stays/StayDetail";
import { stays } from "@/data/stays";

export function generateStaticParams() {
  return stays.map((stay) => ({ slug: stay.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stay = stays.find((entry) => entry.slug === slug);

  if (!stay) return { title: "Stay not found | HORIZONS" };

  return {
    title: `${stay.name}, ${stay.place} | HORIZONS by Scenic Escapes`,
    description: stay.summary,
  };
}

export default async function StayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stay = stays.find((entry) => entry.slug === slug);

  if (!stay) notFound();

  return <StayDetail stay={stay} />;
}
