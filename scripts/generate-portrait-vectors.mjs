import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import sharp from 'sharp';

// Image-derived artwork, not a face embedding. Sobel tangents follow local
// contours; color, contrast and brightness determine each mark's appearance.
const source = await fs.readFile('public/images/patrick-layered.webp');
const size = 64;
const { data } = await sharp(source)
  .resize(size, size)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const light = (x, y) => {
  const i =
    (Math.max(0, Math.min(size - 1, y)) * size +
      Math.max(0, Math.min(size - 1, x))) *
    4;
  return (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) / 255;
};
const round = (n) => Math.round(n * 1000) / 1000;
const vectors = [];
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const dx =
      light(x + 1, y - 1) +
      2 * light(x + 1, y) +
      light(x + 1, y + 1) -
      light(x - 1, y - 1) -
      2 * light(x - 1, y) -
      light(x - 1, y + 1);
    const dy =
      light(x - 1, y + 1) +
      2 * light(x, y + 1) +
      light(x + 1, y + 1) -
      light(x - 1, y - 1) -
      2 * light(x, y - 1) -
      light(x + 1, y - 1);
    const edge = Math.min(1, Math.hypot(dx, dy));
    const dark = 1 - light(x, y);
    const angle = Math.atan2(dy, dx) + Math.PI / 2;
    const i = (y * size + x) * 4;
    vectors.push([
      x + 0.5,
      y + 0.5,
      round(angle),
      round(0.35 + edge * 0.7 + dark * 0.35),
      round(
        0.1 +
          0.52 * dark ** 0.85 +
          (0.14 *
            (Math.max(data[i], data[i + 1], data[i + 2]) -
              Math.min(data[i], data[i + 1], data[i + 2]))) /
            255 +
          edge * 0.12,
      ),
      data[i],
      data[i + 1],
      data[i + 2],
      round(data[i + 3] / 255),
    ]);
  }
}
await fs.writeFile(
  'src/generated/portrait-vectors.json',
  `${JSON.stringify({
    sourceSha256: crypto.createHash('sha256').update(source).digest('hex'),
    size,
    vectors,
  })}\n`,
);
console.log(
  `Generated ${vectors.length} portrait vectors from the transparent portrait.`,
);
