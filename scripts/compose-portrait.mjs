import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import sharp from 'sharp';

// Keep authoring layers separate. The browser requests only the composed WebP.
const original = await fs.readFile('tools/portrait/original.png');
const trim = await fs.readFile('tools/portrait/shirt-trim.svg');
const portrait = await sharp(original)
  .composite([{ input: trim }])
  .png()
  .toBuffer();

// Protect the likeness: the shirt overlay cannot change any face/head pixels.
const face = { left: 0, top: 0, width: 1254, height: 1000 };
const before = await sharp(original).extract(face).raw().toBuffer();
const after = await sharp(portrait).extract(face).raw().toBuffer();
let changed = 0;
for (let i = 0; i < before.length; i += 4) {
  // Alpha compositing can normalize transparent edge RGB; the opaque likeness
  // must remain exact, including the lips, eyes, skin, hair, and facial ink.
  if (before[i + 3] !== 255) continue;
  if (!before.subarray(i, i + 4).equals(after.subarray(i, i + 4))) changed++;
}
assert.equal(
  changed,
  0,
  'Shirt accents must leave the original face unchanged',
);
const background = await sharp('tools/portrait/background.png')
  .resize(1500, 1250)
  .png()
  .toBuffer();
const composite = await sharp({
  create: { width: 1500, height: 1500, channels: 4, background: '#00000000' },
})
  .composite([
    { input: background, left: 0, top: 80 },
    { input: portrait, left: 123, top: 123 },
  ])
  .png()
  .toBuffer();
await sharp(composite)
  .resize(768, 768)
  .webp({ quality: 88, alphaQuality: 100, effort: 6 })
  .toFile('public/images/patrick-layered.webp');
console.log(
  'Composed one transparent portrait image; original face pixels preserved before web encoding.',
);
