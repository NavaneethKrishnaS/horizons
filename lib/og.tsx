import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
  The card that shows up when somebody sends a horizonsindia.com link on
  WhatsApp.

  Typographic rather than photographic, on purpose. A preview is a
  thumbnail before it is anything else, and a dark photograph of a hotel
  at eighty pixels is mud; the name of the place in Cormorant on our own
  black is legible at any size and looks like us. It also stays correct
  for ever — rename a stay and its card renames itself, which a folder
  of exported images would not.

  The fonts are read off disk rather than imported, which is how
  ImageResponse wants them: satori needs a real font file and does not
  read woff2, so these are the woff builds of the two faces the site
  already uses.
*/

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export async function ogFonts() {
  const [display, sans] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Light.woff")),
    readFile(join(process.cwd(), "assets/fonts/GeistSans-Regular.woff")),
  ]);

  return [
    { name: "Cormorant", data: display, weight: 300 as const, style: "normal" as const },
    { name: "Geist", data: sans, weight: 400 as const, style: "normal" as const },
  ];
}

/*
  One layout for every card: the label, the name, the rule, the wordmark.
  Sizes step down as a title gets longer so a three-word stay and a
  nine-word journey both sit on the same baseline grid.
*/
export function OgCard({
  label,
  title,
  note,
}: {
  label: string;
  title: string;
  note?: string;
}) {
  const size = title.length > 58 ? 62 : title.length > 38 ? 76 : 92;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#111111",
        padding: "72px 80px",
        fontFamily: "Geist",
        position: "relative",
      }}
    >
      {/* the olive coming up out of the bottom corner, as on the site */}
      <div
        style={{
          position: "absolute",
          bottom: -260,
          right: -160,
          width: 720,
          height: 720,
          borderRadius: 720,
          background: "radial-gradient(circle, rgba(107,115,65,0.55) 0%, rgba(107,115,65,0) 70%)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#8B9556",
            display: "flex",
          }}
        >
          {label}
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: "Cormorant",
            fontSize: size,
            lineHeight: 1.05,
            color: "#FFFFFF",
            maxWidth: 940,
            display: "flex",
          }}
        >
          {title}
        </div>

        {note ? (
          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 820,
              display: "flex",
            }}
          >
            {note}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: 1,
            width: "100%",
            background: "linear-gradient(to right, #6B7341, rgba(107,115,65,0.15))",
            display: "flex",
          }}
        />

        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 30, letterSpacing: 14, color: "#FFFFFF", display: "flex" }}>
            HORIZONS
          </div>

          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              display: "flex",
            }}
          >
            by Scenic Escapes
          </div>
        </div>
      </div>
    </div>
  );
}
