"""
The cull, as two sets of contact sheets: what survives and what goes.

Numbers are the same ones from the first sheets, so anything wrongly
dropped can be named by its number and put back.
"""
import os, json
from PIL import Image, ImageDraw

SRC = os.path.expanduser("~/mnt/scenicescapes/public/images")
OUT = os.path.expanduser("~/mnt/horizons/.cull")
photos = json.load(open(os.path.join(OUT, "manifest.json")))

KEEP = set("""
2 3 4 5 6 8 11 14 15 16 19 21 24 26 27 28 29 30 31 32 34 36 37 38 44 45 53 54 56
66 70 71 72 73 74 76 77 79 82 83 84 85 86 87 88 90 91 92 93 94 95 96 99 101 102
103 104 105 110 111 118
130 131 132 133 134 135 136 139 143 144 145 150 151 152 154 155 157 159 160 163
165 172 173 175 176 188 190
194 195 201 203 204 207 208 209 211 212 213 215 216 225 226 227 229 230 231 233
234 236 237 239 240 241 246 247
267 280 289 290 291 304 305 306 309 310 313 314 315 317
325 326 327 328 329 330 332 333 334 335 336 337 338 339 341 342 343 344 347 348
349 351 352 353 354 355 356 357 358 359 360 361 362 365 366 367 369 370 371 374
376 377 380 381 382 383 384
385 387 388 392 393 394 395 396 399 400 401 402 403 404 405 406 407 408 409 410
411 412 413 415 416 417 418 419 420 421 422 423 424 425 426 427 428 437 439

10 12 18 25 33 47 52 55 57 153 162 164 167 178 181 191 205 206 217 218 219 220
221 222 223 224 238 248 251 252 253 255 256 285 286 300 301 302 363 364 368 373
379 429 436 443
""".split())
KEEP = {int(n) for n in KEEP}

COLS, ROWS, CELL, PAD, BAR = 8, 8, 230, 6, 26
PER = COLS * ROWS

def sheets(items, prefix):
    n_sheets = (len(items) + PER - 1) // PER
    for s in range(n_sheets):
        chunk = items[s * PER:(s + 1) * PER]
        W = COLS * CELL + (COLS + 1) * PAD
        H = ROWS * (CELL + BAR) + (ROWS + 1) * PAD
        sheet = Image.new("RGB", (W, H), (17, 17, 17))
        draw = ImageDraw.Draw(sheet)
        for i, (num, p) in enumerate(chunk):
            c, r = i % COLS, i // COLS
            x, y = PAD + c * (CELL + PAD), PAD + r * (CELL + BAR + PAD)
            try:
                im = Image.open(os.path.join(SRC, p["file"])).convert("RGB")
            except Exception:
                continue
            side = min(im.size)
            im = im.crop(((im.width - side) // 2, (im.height - side) // 2,
                          (im.width + side) // 2, (im.height + side) // 2))
            sheet.paste(im.resize((CELL, CELL), Image.LANCZOS), (x, y))
            draw.text((x + 2, y + CELL + 6), "%d  %s" % (num, p["place"][:14]),
                      fill=(190, 190, 180))
        sheet.save(os.path.join(OUT, "%s-%02d.jpg" % (prefix, s + 1)), quality=86)
        print("%s-%02d.jpg  (%d)" % (prefix, s + 1, len(chunk)))

numbered = [(i + 1, p) for i, p in enumerate(photos)]
keep = [x for x in numbered if x[0] in KEEP]
drop = [x for x in numbered if x[0] not in KEEP]

sheets(keep, "KEEP")
sheets(drop, "DROP")
print("keeping", len(keep), "| dropping", len(drop))

by_place = {}
for num, p in keep:
    by_place[p["place"]] = by_place.get(p["place"], 0) + 1
print()
for place, n in sorted(by_place.items(), key=lambda kv: -kv[1]):
    print("  %-24s %3d" % (place, n))
