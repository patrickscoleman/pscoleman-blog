import fs from 'node:fs';
import assert from 'node:assert/strict';
import * as hb from 'harfbuzzjs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const opentype = require('opentype.js');
const sharp = require('../../node_modules/sharp');
const wawoff2 = require('wawoff2');
const bytes = fs.readFileSync(
  new URL('./patrick-sharpie.otf', import.meta.url),
);
const blob = new hb.Blob(
  bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
);
const font = new hb.Font(new hb.Face(blob));
for (const [text, count] of [
  ['Patrick', 1],
  ['Coleman', 1],
  ['Patrick Coleman', 3],
]) {
  const buffer = new hb.Buffer();
  buffer.addText(text);
  buffer.guessSegmentProperties();
  hb.shape(font, buffer);
  const glyphs = buffer.getGlyphInfos();
  assert.equal(glyphs.length, count);
  assert(glyphs.every((g) => g.codepoint > 0));
  console.log(text, glyphs, buffer.getGlyphPositions());
}

// Check the actual shipped font, not only the tracing input. SVG even-odd
// filling can conceal bad font winding; render with the font's nonzero rule.
const shipped = Buffer.from(
  await wawoff2.decompress(
    fs.readFileSync(
      new URL('../../src/fonts/patrick-sharpie.woff2', import.meta.url),
    ),
  ),
);
const parsed = opentype.parse(
  shipped.buffer.slice(
    shipped.byteOffset,
    shipped.byteOffset + shipped.byteLength,
  ),
);
for (const [text, x, y] of [
  ['Patrick', 2050, 400],
  ['Coleman', 775, 250],
  ['r', 178, 400],
  ['o', 199, 250],
]) {
  const glyph = parsed.stringToGlyphs(text)[0];
  const width = Math.ceil(glyph.advanceWidth);
  const d = glyph.path.toPathData({ flipY: false, optimize: false });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="1100"><path fill-rule="nonzero" transform="translate(0 820) scale(1 -1)" d="${d}"/></svg>`;
  const { data, info } = await sharp(Buffer.from(svg))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let dy = -3; dy <= 3; dy++)
    for (let dx = -3; dx <= 3; dx++) {
      assert.equal(
        data[((820 - y + dy) * info.width + x + dx) * 4 + 3],
        0,
        `${text}: counter must remain open`,
      );
    }
}
console.log(
  'Shipped WOFF2: R/O counters remain open in word ligatures and individual-letter fallback.',
);
