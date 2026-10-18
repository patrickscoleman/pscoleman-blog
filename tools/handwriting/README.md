# Patrick Sharpie

A name-only OpenType font traced from Patrick's supplied Sharpie photograph.
The original image is retained here as its source, outside public assets and
Vercel uploads. The browser font is `src/fonts/patrick-sharpie.woff2` (about 5 KB).
`src/generated/handwriting-outlines.json` exports the same word contours for
build-time social-card rendering; it is not imported by browser components.

The `Patrick` and `Coleman` common ligatures preserve the original word shapes,
including joined strokes. The Unicode characters remain ordinary text. Separate
letter outlines are included for shaping fallback; this is not a full alphabet
or a general-purpose handwriting font.

Regenerate from the repo root after `npm ci`:

```sh
npm ci --prefix tools/handwriting
node tools/handwriting/build.cjs
node tools/handwriting/check.mjs
```

The offline tools trace dark ink, discard paper rules and isolated specks, create
Bezier outlines, shape the words with OpenType ligatures, and compress to WOFF2.
They are not application dependencies and are never needed for a site build.
The tracer's even-odd SVG contours are normalized to nonzero font winding so
letter counters stay open. The check rasterizes the shipped WOFF2 and verifies
the R/O counters in both word ligatures and individual-letter fallback.
The source photo and generated-font hashes are recorded in `manifest.json`.
The OTF is retained for independent font inspection and HarfBuzz shaping tests.
