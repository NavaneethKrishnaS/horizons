import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";
import { packages } from "@/data/packages";

export const alt = "A journey with HORIZONS by Scenic Escapes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = packages.find((entry) => entry.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        label={tour ? `${tour.region} · ${tour.duration}` : "A journey"}
        title={tour?.title ?? "Journeys across India"}
        note={tour?.standfirst}
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
