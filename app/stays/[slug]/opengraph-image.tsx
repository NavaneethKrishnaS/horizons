import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";
import { stays } from "@/data/stays";

export const alt = "A place to stay, with HORIZONS by Scenic Escapes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stay = stays.find((entry) => entry.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        label={stay ? `${stay.place} · ${stay.kind}` : "Where you stay"}
        title={stay?.name ?? "Where you stay"}
        note={stay?.standfirst}
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
