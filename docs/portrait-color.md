# Color portrait trial

Created with the built-in image generation tool, using Alloglot's
`apps/website/evidence/patrick-drawing.png` as the illustration target and
`apps/website/evidence/patrick.png` as the natural-color/background reference.
The original photograph remains unchanged in `public/images/patrick.png`.
The website uses a 640 px WebP derivative with alpha; the vector field is
regenerated from that exact derivative. No image-generation runtime is shipped.

Previous mottled-background prompt:

Edit Image 1, the color illustrated portrait. Image 2 is the original PHOTO and is the exact background-pattern reference. Keep Image 1 face, skin colors, hair, moustache, smile, likeness, framing, pose, illustration style and black shirt unchanged. REPLACE the large floating blue blobs entirely. Background must closely resemble the photo's finely mottled/crumpled blue pattern: many tiny angular irregular interlocking blue and pale blue flecks, dense and richly intricate, an organic marbled mosaic like the ORIGINAL PHOTO, not large blobs, not circles, not polka dots. Use a light-blue overall field with medium cobalt accents and tiny genuinely transparent gaps in place of white, let the fine pattern softly dissolve at the outside corners. No opaque white rectangle. Shirt outline accents should be darker cobalt blue, closer to #2944A4, subtle against black. Keep no halftone, no pixel/dither overlays, no text. The only changes are the background and darkening the blue shirt outline. True transparent outer corners and small gaps.

Initial cellular-to-silicon background prompt:

Edit ONLY the blue background of this illustrated portrait. Preserve the face, all facial features, natural skin tones, smile, ginger moustache, bald head, proportions, framing, black shirt and dark cobalt-blue shirt outlines EXACTLY. Replace the noisy blue mottling with a sophisticated quiet visual metaphor of living organization becoming computation. Behind the head, use a small number of spacious, clean, softly irregular polygonal cells, like translucent pale-blue stained-glass compartments or an elegant Voronoi drawing. No nuclei, organelles, bacteria, worms, dots, holes clusters, slime, flesh, fuzz or microscope imagery. The cellular outlines subtly straighten and branch into sparse fine blue silicon-chip traces toward the outer edges: mostly horizontal/vertical lines with a few clean right-angle turns and tiny squared junctions. Blend the geometry gradually; do not make two disconnected halves. Not a literal circuit board, no chips, no labels, no cyberpunk glow. Very restrained pale ice-blue translucent fills, medium blue thin lines, generous transparent negative space. Keep background lower contrast than face, graphic and beautiful at 125px wide. No dense texture or speckle. Background fragments and lines taper out naturally to genuinely transparent corners, without white backing. Square portrait composition unchanged. No text or watermark.

Final organic refinement:

Refine ONLY the pale-blue cellular/circuit background of the supplied portrait. Preserve the illustrated person pixel-faithfully in appearance: same face, smile, skin tones, ginger moustache, eyes, bald head, black shirt with dark blue outlines, pose and framing. Current background is too geometric and diagrammatic. Give it more organic elegance: softly curving asymmetrical cell boundaries, varying sizes and gentle flowing branches inspired by leaf venation and living tissue organization, without literal leaves. Some open compartments, some softly translucent pale-blue filled areas, irregular breathing room. Replace rigid straight polygon tessellation around the head with these smooth fluid contours; avoid a repetitive honeycomb. Let several flowing lines gradually straighten into restrained thin silicon-chip paths at the far edges, retaining the life-to-computation metaphor. Less uniform line width, fewer square terminals, more graceful curves, quieter contrast. Clean and healthy, never bacteria, germs, organs, nuclei, worm forms, slime, mottling, stippling, clustered holes or microscopic speckles. Pale ice blue with restrained medium-blue lines; face remains strongest focus. Preserve transparent outer edges and negative-space gaps. No white backing, text, glow or added objects.

## Separate sources, one live image

The first user-supplied portrait is now preserved verbatim in
`tools/portrait/original.png`. The face is not regenerated. Small editable
blue shirt accents live in `tools/portrait/shirt-trim.svg`; their geometry
stays below the head. `compose-portrait.mjs` checks that all opaque pixels in the first 1000 rows
of the original portrait remain pixel-identical after applying the accent.
Standard downsampling and WebP encoding happen after that check.

The background is an independent transparent image in
`tools/portrait/background.png`, made with the built-in image generation tool
from the second user-supplied reference. Its final prompt was:

> Create ONLY a separate transparent background layer based on the blue organic background in this reference. REMOVE the entire person, face, skin, hair, shirt, body and their silhouettes; no human forms anywhere. Keep the beautiful pale-blue translucent cellular forms and flowing branches from the reference, with a broad quiet transparent central opening where a portrait will be placed later. Surrounding shape is an irregular open halo, wider than tall, softly organic around the inside, transitioning into visibly computational structures at the OUTER edges: several longer fine straight circuit traces with deliberate 90-degree turns, short parallel tracks, occasional tiny squared terminals, not round neuronal bulbs on all ends. Some asymmetric traces extend farther to left/right/top beyond the main halo. Keep airy irregular negative-space gaps, understated translucent ice-blue fills and restrained medium-blue strokes. Preserve the clean pleasant organic feeling, no bacteria, clustered holes, worms, speckle, grain or gross anatomical cues. Avoid a filled oval or a literal circuit-board rectangle. No text, labels, chips, neon glow, cast shadows or white backing. A standalone wide transparent PNG; all negative space including broad center genuinely transparent. Portrait will be overlaid separately and must not appear in this output. Ratio around 6:5, enough empty margin to keep extended trace ends unclipped.

`npm run generate:portrait` composes those layers into the sole published
image, `public/images/patrick-layered.webp`, then rebuilds the vector field
from that exact image. Source layers are excluded from Vercel uploads and
never requested by visitors. The former combined illustration remains in
Git history. The 1500px composition preserves the original 1254px portrait
at its center; CSS allows the transparent margin to extend about 10% beyond
the existing frame, without shrinking the face or adding page height.
The original and generated background stay independently editable.
