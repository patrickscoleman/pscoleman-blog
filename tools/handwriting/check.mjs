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
  ['Patrick', 7],
  ['Coleman', 7],
  ['Patrick Coleman', 15],
]) {
  const buffer = new hb.Buffer();
  buffer.addText(text);
  buffer.guessSegmentProperties();
  hb.shape(font, buffer, text === 'Coleman' ? [new hb.Feature('ss01', 1)] : []);
  const glyphs = buffer.getGlyphInfos();
  assert.equal(glyphs.length, count);
  assert(glyphs.every((g) => g.codepoint > 0));
  assert.deepEqual(
    glyphs.map((g) => g.cluster),
    [...text].map((_, i) => i),
    `${text}: one cluster per selectable letter`,
  );
  const total = buffer
    .getGlyphPositions()
    .reduce((sum, p) => sum + p.xAdvance, 0);
  if (text === 'Patrick') assert.equal(total, 3686);
  if (text === 'Coleman') assert.equal(total, 3626);
  console.log(
    `${text}: ${glyphs.length} distinct selection clusters; advance ${total}`,
  );
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
for (const name of ['char110', 'char97', 'char97.surname']) {
  const glyph = [...Array(parsed.glyphs.length).keys()]
    .map((i) => parsed.glyphs.get(i))
    .find((g) => g.name === name);
  assert.ok(glyph, `${name}: glyph exists`);
  const contours = [];
  for (const command of glyph.path.commands) {
    if (command.type === 'M') contours.push(new opentype.Path());
    contours.at(-1).commands.push(command);
  }
  for (const contour of contours) {
    const b = contour.getBoundingBox();
    assert.ok(
      (b.x2 - b.x1) * (b.y2 - b.y1) > 100,
      `${name}: no isolated paper specks`,
    );
  }
}
for (const [text, x, y] of [
  ['Patrick', 2050, 400],
  ['Coleman', 775, 250],
  ['r', 159, 400],
  ['o', 180, 250],
]) {
  const glyph =
    text.length > 1
      ? [...Array(parsed.glyphs.length).keys()]
          .map((i) => parsed.glyphs.get(i))
          .find((g) => g.name === `${text}.signature`)
      : parsed.charToGlyph(text);
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
  'Shipped WOFF2: R/O counters remain open in sharing-card outlines and selectable letters.',
);
