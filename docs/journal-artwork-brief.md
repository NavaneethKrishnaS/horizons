# Journal artwork — every prompt, in order

Black ink on cream paper, every object an antique engraving. Reference:
emergenceprojects.com, whose objects are pre-rendered illustrations rather
than 3D.

## Before anything else

Open **one** ChatGPT chat and keep every object in it. The model holds the
style across a conversation; starting fresh chats is the main reason these
sets end up mismatched.

Paste this first, on its own. It sets the rules once so each object after
it is a single line.

> For this whole conversation you are producing a matched set of
> illustrations in one consistent style. Every image: antique copperplate
> engraving, dense stipple and fine cross-hatching, pure black ink on a
> plain white background, one isolated object, centred, filling most of the
> frame. No background scenery, no ground shadow, no text, no border, no
> frame, no signature. High contrast. All volume and shading made only of
> dots and lines — never soft grey airbrushed tone. Square image. 19th
> century natural history plate. Confirm and wait for my first object.

If a result comes back wrong, correct it in plain words rather than
re-prompting: *too grey, use only black dots* · *remove the border* ·
*just the object, nothing behind it* · *denser stipple, harder contrast*.

---

## Part A — attach a photograph

Five objects come out far better redrawn from your own photographs. The
proportions and the ornament are then genuinely Kerala rather than a
model's guess. Attach the file, then paste the line.

### 1. Kathakali crown, cylindrical
**Attach:** `public/images/about/kadhakali-1.jpg`
> Redraw only the tall ribbed cylindrical crown from this photograph, the
> kireedam, removing the performer and everything else. Same engraving
> style as before.

### 2. Kathakali crown, halo
**Attach:** `public/images/about/kadhakali-2.jpg`
> Redraw only the large circular halo crown from this photograph, the full
> disc behind the head, removing the performer and the background. Same
> engraving style.

### 3. The painted face
**Attach:** `public/images/about/kadhakali-1.jpg`
> Redraw only the painted face from this photograph — the green pacha
> makeup, the white chutti frame around the jaw, the outlined eyes — with
> no crown, no costume, no background. Same engraving style.

### 4. Mudra hand
**Attach:** `public/images/about/kadhakali-2.jpg`
> Redraw only the raised hand from this photograph, with its long silver
> nail extensions, held in the dance gesture. Hand and forearm alone,
> nothing else. Same engraving style.

### 5. Temple elephant in nettipattam
**Attach:** `public/images/about/elephant.jpg`
> Redraw the central elephant from this photograph wearing its golden
> forehead caparison, side on, the elephant alone with no people, no
> background, no lamps. Same engraving style.

### 6. The houseboat
**Attach:** `public/images/houseboats/1-bedroom/cover.jpeg`
> Redraw this houseboat from the photograph — the long wooden hull and the
> arched woven bamboo roof — side on, the boat alone on nothing, no water,
> no background. Same engraving style.

---

## Part B — no attachment, just paste the line

### Act I — the spice coast
7. A cantilevered Chinese fishing net, a wooden frame on a pivot with hanging counterweight stones, seen from the side.
8. A cluster of black peppercorns on the vine, with leaves and hanging berry spikes.
9. Three cardamom pods, one split open with the seeds showing.
10. A wooden trading dhow with a single lateen sail, side on.

### Act II — kathakali
11. A chenda, the tall cylindrical South Indian drum, roped along its length and slung on a strap.

### Act III — vallamkali
12. A snake boat, a chundan vallam, extremely long and low with an enormously tall curved stern prow rising at the back, side on.
13. A single wooden rowing paddle with a long leaf-shaped blade.
14. Concentric ripple rings spreading on still water, seen from directly above.
15. A circular flower mandala of concentric petal rings, a pookkalam, seen from directly above.

### Act IV — the kettuvallam
16. A coiled rope of twisted coconut fibre, laid flat in a spiral.
17. A single coconut palm, leaning, with a full crown of fronds and a cluster of nuts.

### Act V — the founder
18. A tall brass oil lamp with a wide round bowl, a lit flame at the top, an ornate turned stem and a stepped circular base.

### Recurring — the ambient furniture
These drift between the acts the way the stars and beads do on the reference.

19. A string of round beads hanging on a fine thread, vertical, largest at the top.
20. A single perfect sphere, lit from the upper left.
21. An eight-pointed star burst with long sharp spines.
22. A seamless repeating border tile of interlocking stars and polygons, flat, no perspective.

---

## When they are done

Drop every file into `public/images/journal/raw/` with whatever filenames
they arrive with. Nothing needs renaming, cropping or cleaning up — the
white background, the trimming, the resizing and the optimising are all
handled from there.

## Start with two

Do **1** and **3** — the crown and the face — and stop. They will be wired
into the live page so the style can be judged before an evening goes into
the other twenty.

## What makes one unusable

- Grey or coloured tone instead of pure black stipple
- Scenery, a horizon or a ground shadow behind the object
- Text, a border, a frame or a signature
- More than one object in the picture
- Soft airbrushed shading instead of visible dots and lines
