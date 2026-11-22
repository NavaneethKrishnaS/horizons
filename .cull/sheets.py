"""
Contact sheets of every gallery photograph, so they can be judged as a
set rather than one at a time.

Reads only from the scenicescapes folder. Writes only into horizons/.cull,
which is temporary and removed once the culling is settled.
"""
import os, json
from PIL import Image, ImageDraw

SRC = os.path.expanduser("~/mnt/scenicescapes/public/images")
OUT = os.path.expanduser("~/mnt/horizons/.cull")

ORDER = ["backwaters", "munnar", "fort-kochi", "thekkady", "rajakkad",
         "thattekkad", "festival", "kerala-coast", "around-kerala",
         "thanjavur", "trichy", "chettinad", "mahabalipuram", "kumbakonam",
         "pondicherry", "chidambaram", "gangaikondacholapuram", "auroville",
         "tamil-nadu-tour"]

# one entry per photograph: its stem, and the smallest file that exists for it
photos = []
names = os.listdir(SRC)
for place in ORDER:
    stems = sorted({n.rsplit("-", 1)[0] for n in names
                    if n.startswith("gallery-%s-" % place) and n.endswith(".webp")})
    for stem in stems:
        widths = sorted(int(n.rsplit("-", 1)[1][:-5]) for n in names
                        if n.startswith(stem + "-") and n.endswith(".webp"))
        photos.append({"place": place, "stem": stem,
                       "file": "%s-%d.webp" % (stem, widths[0])})

COLS, ROWS, CELL, PAD, BAR = 8, 8, 230, 6, 26
PER = COLS * ROWS
sheets = (len(photos) + PER - 1) // PER

for s in range(sheets):
    chunk = photos[s * PER:(s + 1) * PER]
    W = COLS * CELL + (COLS + 1) * PAD
    H = ROWS * (CELL + BAR) + (ROWS + 1) * PAD
    sheet = Image.new("RGB", (W, H), (17, 17, 17))
    draw = ImageDraw.Draw(sheet)

    for i, p in enumerate(chunk):
        c, r = i % COLS, i // COLS
        x = PAD + c * (CELL + PAD)
        y = PAD + r * (CELL + BAR + PAD)
        try:
            im = Image.open(os.path.join(SRC, p["file"])).convert("RGB")
        except Exception:
            continue
        # square centre crop, so every cell is the same size
        side = min(im.size)
        im = im.crop(((im.width - side) // 2, (im.height - side) // 2,
                      (im.width + side) // 2, (im.height + side) // 2))
        sheet.paste(im.resize((CELL, CELL), Image.LANCZOS), (x, y))
        n = s * PER + i + 1
        draw.text((x + 2, y + CELL + 6),
                  "%d  %s" % (n, p["place"][:14]), fill=(190, 190, 180))

    sheet.save(os.path.join(OUT, "sheet-%02d.jpg" % (s + 1)), quality=86)
    print("sheet-%02d.jpg  photos %d-%d"
          % (s + 1, s * PER + 1, s * PER + len(chunk)))

json.dump(photos, open(os.path.join(OUT, "manifest.json"), "w"), indent=0)
print("total photographs:", len(photos), "| sheets:", sheets)
