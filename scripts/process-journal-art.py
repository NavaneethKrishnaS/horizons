from PIL import Image, ImageOps
import os, glob, re

RAW = "raw"
OUT = "."

# Filename in the folder -> the name the page will use.
NAMES = {
  "Cylindrical crown2": "crown-cylindrical",
  "Halo crown": "crown-halo",
  "The painted face": "face",
  "Mudra hand": "mudra",
  "Temple elephant": "elephant",
  "houseboat": "houseboat",
  "cantilevered Chinese fishing": "fishing-net",
  "black peppercorns": "peppercorns",
  "Three cardamom pods": "cardamom",
  "wooden trading dhow": "dhow",
  "chenda": "chenda",
  "snake boat": "snake-boat",
  "rowing paddle": "paddle",
  "Concentric ripple rings": "ripples",
  "flower mandala": "pookkalam",
  "rope": "rope",
  "coconut palm": "palm",
  "brass oil lamp": "lamp",
  "round beads hanging": "beads",
  "sphere": "sphere",
  "star burst": "star",
  "repeating border tile of interlocking stars and polygons": "border-tile",
  "mohiniyattam": "mohiniyattam",
  "theyyam": "theyyam",
  "kalaripayattu": "kalaripayattu",
  "bharatanatyam": "bharatanatyam",
}

MAX = 760

def process(path, out_name):
    im = Image.open(path).convert("L")

    # Lift the contrast: these came back as soft graphite rather than the hard
    # black ink the page wants. Autocontrast first, then a curve that pushes
    # the light greys to paper-white and deepens the darks, without crushing
    # the stipple into solid black.
    im = ImageOps.autocontrast(im, cutoff=(0.5, 0.2))
    lut = []
    for v in range(256):
        x = v / 255.0
        x = min(1.0, max(0.0, (x - 0.04) / 0.90))   # white point in, black point in
        x = x ** 1.25                                # deepen midtones
        lut.append(int(round(x * 255)))
    im = im.point(lut)

    # Ink becomes opacity: white paper disappears, black stays solid. This
    # also removes any off-white cast without a background-removal step.
    alpha = ImageOps.invert(im)
    rgba = Image.new("RGBA", im.size, (17, 17, 17, 255))
    rgba.putalpha(alpha)

    bbox = alpha.getbbox()
    if bbox:
        rgba = rgba.crop(bbox)

    rgba.thumbnail((MAX, MAX), Image.LANCZOS)
    out = os.path.join(OUT, out_name + ".webp")
    rgba.save(out, format="WEBP", quality=86, method=4)
    return out, rgba.size, os.path.getsize(out)

done, missing = [], []
for f in sorted(glob.glob(os.path.join(RAW, "*.png"))):
    stem = os.path.splitext(os.path.basename(f))[0]
    if stem not in NAMES:
        missing.append(stem)
        continue
    target = os.path.join(OUT, NAMES[stem] + ".webp")
    if os.path.exists(target):
        continue
    out, size, nbytes = process(f, NAMES[stem])
    done.append((NAMES[stem], size, nbytes))

for name, size, nbytes in sorted(done):
    print(f"  {name:20s} {size[0]:4d}x{size[1]:<4d} {nbytes/1024:6.0f} KB")
print(f"\n{len(done)} processed")
if missing:
    print("skipped (variants):", ", ".join(missing))
total = sum(b for _, _, b in done)
print(f"total {total/1024/1024:.1f} MB")
