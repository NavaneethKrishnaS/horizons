import { ImageResponse } from "next/og";

import { OgCard, OG_CONTENT_TYPE, OG_SIZE, ogFonts } from "@/lib/og";

export const alt = "HORIZONS by Scenic Escapes — luxury travel in Kerala and India";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/* The card every page falls back to, and the one the home page uses. */
export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        label="Luxury travel in India"
        title="Find Your Next Horizon."
        note="Kettuvallam houseboats on the Kerala backwaters, small hotels and family houses across India, and journeys arranged by the people who run them."
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
