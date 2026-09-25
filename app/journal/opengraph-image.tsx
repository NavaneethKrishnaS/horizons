import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";
import { OG_CARDS } from "@/data/ogCards";

const copy = OG_CARDS["journal"];

export const alt = `${copy.title} — HORIZONS by Scenic Escapes`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(<OgCard {...copy} />, {
    ...size,
    fonts: await ogFonts(),
  });
}
