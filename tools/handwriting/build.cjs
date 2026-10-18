// Offline authoring tool. None of these packages ships to the browser.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('../../node_modules/sharp');
const opentype = require('opentype.js');
const potrace = require('potrace');
const svgpath = require('svgpath');
const wawoff2 = require('wawoff2');
const { normalizeWinding } = require('./contours.cjs');
const root = path.resolve(__dirname, '../..');
const SCALE = 2.4;
const words = [
  {
    text: 'Patrick',
    box: { left: 0, top: 140, width: 1520, height: 350 },
    baseline: 290,
    cuts: [0, 350, 620, 780, 987, 1060, 1240, 1520],
  },
  {
    text: 'Coleman',
    box: { left: 110, top: 520, width: 1495, height: 315 },
    baseline: 290,
    cuts: [0, 240, 420, 605, 875, 1105, 1305, 1495],
  },
];
async function trace(box, baseline) {
  const bitmap = await sharp(path.join(__dirname, 'source.png'))
    .extract(box)
    .greyscale()
    .threshold(65)
    .png()
    .toBuffer();
  const svg = await new Promise((resolve, reject) =>
    potrace.trace(
      bitmap,
      { threshold: 128, turdSize: 45, optTolerance: 0.35 },
      (err, result) => (err ? reject(err) : resolve(result)),
    ),
  );
  const d = svg.match(/<path[^>]*d="([^"]+)"/)[1];
  const outline = new opentype.Path();
  svgpath(d)
    .abs()
    .unshort()
    .unarc()
    .iterate((segment) => {
      const [op, ...n] = segment;
      const X = (v) => Math.round((v + 8) * SCALE),
        Y = (v) => Math.round((baseline - v) * SCALE);
      if (op === 'M') outline.moveTo(X(n[0]), Y(n[1]));
      else if (op === 'L') outline.lineTo(X(n[0]), Y(n[1]));
      else if (op === 'C')
        outline.curveTo(X(n[0]), Y(n[1]), X(n[2]), Y(n[3]), X(n[4]), Y(n[5]));
      else if (op === 'Q') outline.quadTo(X(n[0]), Y(n[1]), X(n[2]), Y(n[3]));
      else if (op === 'Z') outline.close();
      else throw new Error('Unexpected SVG command ' + op);
    });
  outline.commands = normalizeWinding(outline.commands);
  return outline;
}
(async () => {
  const glyphs = [
    new opentype.Glyph({
      name: '.notdef',
      advanceWidth: 600,
      path: new opentype.Path(),
    }),
    new opentype.Glyph({
      name: 'space',
      unicode: 32,
      advanceWidth: 300,
      path: new opentype.Path(),
    }),
  ];
  const charIndices = new Map(),
    ligatures = [];
  for (const word of words) {
    for (let i = 0; i < word.text.length; i++) {
      const c = word.text[i];
      if (charIndices.has(c)) continue;
      const box = {
        ...word.box,
        left: word.box.left + word.cuts[i],
        width: word.cuts[i + 1] - word.cuts[i],
      };
      charIndices.set(c, glyphs.length);
      glyphs.push(
        new opentype.Glyph({
          name: 'char' + c.codePointAt(0),
          unicode: c.codePointAt(0),
          advanceWidth: Math.round((box.width + 8) * SCALE),
          path: await trace(box, word.baseline),
        }),
      );
    }
    const index = glyphs.length;
    glyphs.push(
      new opentype.Glyph({
        name: word.text + '.signature',
        advanceWidth: Math.round((word.box.width + 16) * SCALE),
        path: await trace(word.box, word.baseline),
      }),
    );
    ligatures.push({
      sub: [...word.text].map((c) => charIndices.get(c)),
      by: index,
    });
  }
  const font = new opentype.Font({
    familyName: 'Patrick Sharpie',
    styleName: 'Regular',
    unitsPerEm: 1000,
    ascender: 820,
    descender: -220,
    glyphs,
    description:
      'Patrick Coleman’s original Sharpie lettering. Name-only display font.',
    designer: 'Patrick Coleman',
    copyright: 'Copyright 2026 Patrick Coleman. Original handwriting.',
  });
  for (const ligature of ligatures)
    font.substitution.addLigature('liga', ligature);
  const otf = Buffer.from(font.toArrayBuffer());
  fs.writeFileSync(path.join(__dirname, 'patrick-sharpie.otf'), otf);
  const outlines = Object.fromEntries(words.map(({ text }) => {
    const glyph = font.stringToGlyphs(text)[0];
    return [text, { width: glyph.advanceWidth, path: glyph.path.toPathData({ flipY: false, optimize: false }) }];
  }));
  fs.writeFileSync(path.join(root, 'src/generated/handwriting-outlines.json'), JSON.stringify(outlines, null, 2) + '\n');
  const woff = Buffer.from(await wawoff2.compress(otf));
  fs.writeFileSync(path.join(root, 'src/fonts/patrick-sharpie.woff2'), woff);
  fs.writeFileSync(
    path.join(__dirname, 'manifest.json'),
    JSON.stringify(
      {
        sourceSha256: crypto
          .createHash('sha256')
          .update(fs.readFileSync(path.join(__dirname, 'source.png')))
          .digest('hex'),
        woff2Sha256: crypto.createHash('sha256').update(woff).digest('hex'),
        bytes: woff.length,
        characters: [...charIndices.keys()].join(''),
        ligatures: words.map((w) => w.text),
        unitsPerEm: 1000,
        ascender: 820,
        descender: -220,
      },
      null,
      2,
    ) + '\n',
  );
  console.log('Created WOFF2:', woff.length, 'bytes; glyphs:', glyphs.length);
})();
