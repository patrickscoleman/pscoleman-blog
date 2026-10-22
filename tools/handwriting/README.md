# Patrick Sharpie

A name-only OpenType font traced from Patrick's supplied Sharpie photograph.
The original image is retained here as its source, outside public assets and
Vercel uploads. The browser font is `src/fonts/patrick-sharpie.woff2` (about 6 KB).
`src/generated/handwriting-outlines.json` exports the same word contours for
build-time social-card rendering; it is not imported by browser components.

Each Unicode letter has its own traced outline and advance width, so browser
selection and caret positions follow the ink rather than dividing a whole-word
ligature evenly. The `ss01` stylistic set preserves Coleman's distinct “a” and
is enabled on the surname span. No extra spacing is inserted between the slices;
word widths and the original photographed joins are preserved. This is a
name-only display font, not a full alphabet.

Regenerate from the repo root after `npm ci`:

```sh
npm ci --prefix tools/handwriting
node tools/handwriting/build.cjs
node tools/handwriting/check.mjs
```

The offline tools trace dark ink, discard paper rules and isolated specks, create
Bezier outlines, retain separate character clusters, and compress to WOFF2.
They are not application dependencies and are never needed for a site build.
The tracer's even-odd SVG contours are normalized to nonzero font winding so
letter counters stay open. The check rasterizes the shipped WOFF2 and verifies
the R/O counters in both sharing-card outlines and selectable letters. The shaping check also verifies
one cluster per letter and unchanged total word widths.
The source photo and generated-font hashes are recorded in `manifest.json`.
The OTF is retained for independent font inspection and HarfBuzz shaping tests.
