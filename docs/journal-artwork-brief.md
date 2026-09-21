# Journal artwork brief — engraved objects

The Journal is black ink on near-white paper, every object drawn as an
antique engraving: dense stipple and fine hatching, volume implied by dot
density rather than grey tone. The reference is emergenceprojects.com,
whose objects are pre-rendered illustrations, not 3D.

## The one prompt that matters

Every object uses the same tail so the set looks like one hand drew it.
Change only the first line.

```
<SUBJECT>, antique copperplate engraving, dense stipple and fine cross-hatching,
pure black ink on plain white background, single isolated object, centred,
no background scenery, no text, no border, no signature, high contrast,
volumetric shading rendered entirely in dots and lines, scientific
illustration plate, 19th century natural history engraving
```

Generate each at **square, 2048px or larger**. Do not ask for colour, grey
wash, or a scene — one object, floating, nothing else.

## The objects

### Act I — The spice coast
| # | Subject line |
|---|---|
| 1 | A cantilevered Chinese fishing net, wooden frame with hanging counterweight stones |
| 2 | A cluster of black peppercorns on the vine, leaves and berries |
| 3 | Three cardamom pods, split open, seeds visible |
| 4 | A wooden trading dhow with a single lateen sail |

### Act II — Kathakali
| # | Subject line |
|---|---|
| 5 | An ornate Kathakali kireedam crown, tall and haloed, covered in beadwork and mirrors |
| 6 | A single human eye, wide open, heavily outlined in the Kathakali manner, lashes and brow |
| 7 | A human hand held in a formal dance mudra, fingers precisely arranged |
| 8 | A chenda, a tall cylindrical South Indian drum, roped and slung |

### Act III — Vallamkali
| # | Subject line |
|---|---|
| 9 | A snake boat with an enormously tall curved stern prow, long and low in the water |
| 10 | A single wooden rowing paddle, leaf shaped blade |
| 11 | Concentric ripple rings on still water, seen from directly above |
| 12 | A circular flower mandala of concentric petal rings, viewed from above |

### Act IV — The kettuvallam
| # | Subject line |
|---|---|
| 13 | A Kerala houseboat with an arched woven bamboo roof over a long wooden hull |
| 14 | A coiled rope of twisted coconut fibre |
| 15 | A single coconut palm, leaning, full crown of fronds |

### Act V — The founder
| # | Subject line |
|---|---|
| 16 | A tall brass oil lamp with a wide round bowl and a flame, ornate stem and base |

### Recurring — the ambient furniture
These drift between the acts, the way the stars and beads do on the reference.

| # | Subject line |
|---|---|
| 17 | A string of hanging round beads on a fine thread, vertical |
| 18 | A perfect sphere, lit from the upper left |
| 19 | An eight pointed star burst with sharp spines |
| 20 | A seamless geometric border tile pattern, interlocking stars and polygons |

## After you generate them

Drop everything into `public/images/journal/raw/` with any filenames. I will
batch process them: knock the white background out to transparency, trim to
the object, downscale, and export optimised PNGs into
`public/images/journal/`. You do not need to edit anything yourself.

## What makes one unusable

- Grey or coloured tone instead of pure black stipple
- A scene or horizon behind the object
- Text, borders, frames, or a signature in the image
- Several objects in one picture
- Soft airbrushed shading rather than visible dots and lines

Generate three or four variations of each and keep the cleanest.
