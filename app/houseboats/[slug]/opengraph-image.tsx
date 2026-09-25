import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";
import { houseboats } from "@/data/houseboats";

export const alt = "A Kerala houseboat with HORIZONS by Scenic Escapes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const boat = houseboats.find((entry) => entry.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        label={boat ? `Alleppey backwaters · sleeps ${boat.maxGuests}` : "Kerala houseboats"}
        title={boat?.name ?? "Kerala houseboats"}
        note={boat?.shortDescription}
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
