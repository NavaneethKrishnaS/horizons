import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";
import { district } from "@/data/destinations";

export const alt = "A district of Kerala, with HORIZONS by Scenic Escapes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = district(slug);

  return new ImageResponse(
    (
      <OgCard
        label={place ? `${place.district} · Kerala` : "Kerala"}
        title={place?.name ?? "Where we would take you"}
        note={place?.standfirst}
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
