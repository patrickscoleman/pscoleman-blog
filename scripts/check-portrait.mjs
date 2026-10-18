import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {
  buildPortraitPyramid,
  portraitPhase,
  portraitRenderTime,
  portraitStroke,
  portraitHeldStroke,
  portraitBranch,
  portraitTrunk,
  portraitBranchSpreads,
  portraitInkAlpha,
  PORTRAIT_DURATION,
} from '../src/lib/portrait-field.ts';
const source = JSON.parse(
  fs.readFileSync('src/generated/portrait-vectors.json', 'utf8'),
);
assert.equal(
  source.sourceSha256,
  crypto
    .createHash('sha256')
    .update(fs.readFileSync('public/images/patrick-layered.webp'))
    .digest('hex'),
);
const fields = buildPortraitPyramid(source);
assert.deepEqual(
  fields.map((f) => f.size),
  [64, 32, 16, 8, 4, 2, 1],
);
for (const field of fields) {
  assert.equal(field.vectors.length, field.size ** 2);
  for (const v of field.vectors) {
    for (const n of Object.values(v)) assert(Number.isFinite(n));
    assert(v.alpha >= 0 && v.alpha <= 1);
    assert(v.x > 0 && v.x < 1 && v.y > 0 && v.y < 1);
    assert(v.length > 0 && v.length <= 0.62 && v.width > 0 && v.width <= 0.028);
  }
}
assert(fields[0].vectors.some((v) => v.alpha < 0.11));
assert(fields[0].vectors.some((v) => v.alpha > 0.98));
const last = fields.at(-1).vectors[0];
const restingArrow = portraitStroke(last);
for (const ms of [0, 7600, 9000, 10600, PORTRAIT_DURATION])
  assert.deepEqual(portraitHeldStroke(last, ms), restingArrow);
let maximumTipTravel = 0;
let maximumBend = 0;
for (let ms = 9000; ms <= 10600; ms += 10) {
  const held = portraitHeldStroke(last, ms);
  assert(Object.values(held).every(Number.isFinite));
  assert.equal(held.startX, restingArrow.startX);
  assert.equal(held.startY, restingArrow.startY);
  assert.equal(held.controlX, restingArrow.controlX);
  assert.equal(held.controlY, restingArrow.controlY);
  // A rotating straight arrow has zero cross product. Require an actual curve.
  maximumBend = Math.max(
    maximumBend,
    Math.abs(
      (held.controlX - held.startX) * (held.tipY - held.startY) -
        (held.controlY - held.startY) * (held.tipX - held.startX),
    ),
  );
  assert(
    Math.abs(
      Math.hypot(held.tipX - held.startX, held.tipY - held.startY) -
        last.length,
    ) < 1e-10,
  );
  for (const key of ['width', 'r', 'g', 'b', 'alpha'])
    assert.equal(held[key], restingArrow[key]);
  maximumTipTravel = Math.max(
    maximumTipTravel,
    Math.hypot(held.tipX - restingArrow.tipX, held.tipY - restingArrow.tipY),
  );
}
assert(maximumTipTravel > 0.02 && maximumTipTravel < 0.06);
assert(maximumBend > 0.005, 'The arrow must curve, not rotate as a rigid line');
for (const ms of [9000.1, 10599.9]) {
  const held = portraitHeldStroke(last, ms);
  assert(
    Math.hypot(held.tipX - restingArrow.tipX, held.tipY - restingArrow.tipY) <
      1e-8,
    'Wobble must meet the stationary/branching pose without a jump',
  );
}
console.log(
  'Single-arrow bend: fixed base/tangent, curved shaft, conserved chord/ink, bounded travel and smooth endpoints.',
);
assert.equal(last.x, 0.5);
assert.equal(last.y, 0.5);
for (const key of ['r', 'g', 'b'])
  assert(
    Math.abs(
      last[key] -
        fields[0].vectors.reduce((s, v) => s + v[key] * v.alpha, 0) /
          fields[0].vectors.reduce((s, v) => s + v.alpha, 0),
    ) < 1e-8,
  );
assert.deepEqual(portraitPhase(0, 6), { opacity: 0, level: 0 });
assert.deepEqual(portraitPhase(7600, 6), { opacity: 1, level: 6 });
assert.deepEqual(portraitPhase(10599, 6), { opacity: 1, level: 6 });
assert.deepEqual(portraitPhase(PORTRAIT_DURATION, 6), { opacity: 0, level: 0 });
assert(portraitPhase(4000, 6).level > portraitPhase(2000, 6).level);
assert(portraitPhase(14000, 6).level < portraitPhase(11000, 6).level);
console.log(
  'Portrait: 4096 → 1 → 4096 marks; conserved image colors, finite geometry and complete photo return.',
);

// At each boundary, children end as their original arrows and trunks start
// as exactly the next level. New branches share the parent's base, without fades.
for (let level = 0; level < fields.length - 1; level++) {
  const fine = fields[level],
    coarse = fields[level + 1];
  for (let i = 0; i < fine.vectors.length; i++) {
    const parent =
      coarse.vectors[
        Math.floor(Math.floor(i / fine.size) / 2) * coarse.size +
          Math.floor((i % fine.size) / 2)
      ];
    const child = fine.vectors[i],
      normal = portraitStroke(child),
      trunk = portraitStroke(parent);
    const grown = portraitBranch(child, parent, 1);
    for (const key of Object.keys(normal))
      assert(Math.abs(normal[key] - grown[key]) < 1e-10);
    for (const key of Object.keys(trunk))
      assert(Math.abs(portraitTrunk(parent, 0)[key] - trunk[key]) < 1e-10);
    const retracted = portraitTrunk(parent, 1);
    const unbranched = portraitBranch(child, parent, 0);
    assert(Math.abs(retracted.tipX - retracted.startX) < 1e-10);
    assert(Math.abs(retracted.tipY - retracted.startY) < 1e-10);
    assert.equal(unbranched.tipX, unbranched.startX);
    assert.equal(unbranched.tipY, unbranched.startY);
    for (const t of [0.1, 0.35, 0.65, 0.9]) {
      const branch = portraitBranch(child, parent, t);
      assert(Object.values(branch).every(Number.isFinite));
      assert.equal(branch.width, child.width);
      assert.equal(portraitTrunk(parent, t).width, parent.width);
      assert(branch.alpha >= Math.min(child.alpha, parent.alpha) - 1e-10);
      assert(branch.alpha <= Math.max(child.alpha, parent.alpha) + 1e-10);
      if (t < 0.45) {
        assert.equal(branch.startX, trunk.startX);
        assert.equal(branch.startY, trunk.startY);
      }
    }
  }
}
for (const field of fields.slice(0, -1)) {
  const widths = field.vectors.map((v) => v.width);
  assert(
    Math.max(...widths) / Math.min(...widths) > 1.05,
    'Stroke weights lost their image variation',
  );
}
console.log(
  'Connected branching and geometric continuity verified at all six scales; image-derived widths remain varied at every multi-arrow scale.',
);

assert.deepEqual(portraitBranchSpreads(1600, 0, 6), [1, 1, 1, 1]);
assert.deepEqual(portraitBranchSpreads(15600, 0, 6), [1, 1, 1, 1]);
assert(portraitBranchSpreads(10650, 5, 6)[0] > 0);
assert.equal(portraitBranchSpreads(10650, 5, 6)[1], 0);
assert(portraitBranchSpreads(10720, 5, 6)[1] > 0);
assert.equal(portraitBranchSpreads(10720, 5, 6)[3], 0);
for (let level = 0; level < 6; level++)
  for (let ms = 0; ms <= 16800; ms += 100)
    assert(
      portraitBranchSpreads(ms, level, 6).every(
        (t) => Number.isFinite(t) && t >= 0 && t <= 1,
      ),
    );
assert.equal(portraitInkAlpha(0, 6, 6), 0);
assert.equal(portraitInkAlpha(0.3, 4, 6), 0.3);
assert(portraitInkAlpha(0.3, 6, 6) > portraitInkAlpha(0.3, 5, 6));
assert.equal(portraitInkAlpha(1, 6, 6), 1);
console.log(
  'Base origins, clockwise stagger, fixed cycle timing and bounded coarse contrast verified.',
);

// Precomputed source strokes must produce the exact existing branch geometry.
for (let level = 0; level < fields.length - 1; level++) {
  const child = fields[level].vectors[0],
    parent = fields[level + 1].vectors[0];
  const a = portraitStroke(child),
    b = portraitStroke(parent);
  for (const spread of [0, 0.1, 0.5, 0.9, 1]) {
    assert.deepEqual(
      portraitBranch(child, parent, spread, a, b),
      portraitBranch(child, parent, spread),
    );
    assert.deepEqual(
      portraitTrunk(parent, spread, b),
      portraitTrunk(parent, spread),
    );
  }
  assert.deepEqual(a, portraitStroke(child));
  assert.deepEqual(b, portraitStroke(parent));
}
for (const ms of [0, 100, 900, 1600, 15600, 16000, 16799]) {
  assert.equal(portraitRenderTime(ms), 0);
  assert.equal(portraitPhase(ms, 6).level, 0);
}
for (const ms of [7600, 8000, 9000]) assert.equal(portraitRenderTime(ms), 7600);
for (const ms of [1601, 5000, 9001, 9400, 10599, 10600, 15599])
  assert.equal(portraitRenderTime(ms), ms);
assert.equal(portraitRenderTime(8000, true), -1);
console.log(
  'Cached geometry: exact branch/trunk equivalence, immutable strokes, and stable-stage reuse without skipping the final bend.',
);

// Exercise the actual canvas renderer: each arrow is one filled silhouette,
// its triangular base is flat, and the final direction follows the bio target.
const { stripTypeScriptTypes } = await import('node:module');
const { pathToFileURL } = await import('node:url');
const rendererSource = fs
  .readFileSync('src/lib/portrait-renderer.ts', 'utf8')
  .replace(
    "'./portrait-field'",
    JSON.stringify(
      pathToFileURL(`${process.cwd()}/src/lib/portrait-field.ts`).href,
    ),
  );
const { createPortraitRenderer } = await import(
  'data:text/javascript;base64,' +
    Buffer.from(stripTypeScriptTypes(rendererSource)).toString('base64')
);
let paths = [],
  current = [];
const ctx = {
  clearRect() {
    paths = [];
  },
  beginPath() {
    current = [];
  },
  moveTo(...args) {
    current.push(['M', ...args]);
  },
  lineTo(...args) {
    current.push(['L', ...args]);
  },
  quadraticCurveTo(...args) {
    current.push(['Q', ...args]);
  },
  arc(...args) {
    current.push(['A', ...args]);
  },
  closePath() {
    current.push(['Z']);
  },
  fill() {
    paths.push(current);
  },
  stroke() {
    assert.fail('Arrowheads and shafts must share one fill');
  },
};
const render = createPortraitRenderer(ctx, source);
for (const aim of [Math.PI, 2.1]) {
  for (const ms of [1200, 4000, 6500, 8000, 9600, 12000, 15000]) {
    render(ms, false, aim);
    assert(paths.length > 0);
    for (const commands of paths) {
      assert.equal(commands.at(-1)[0], 'Z');
      const lines = commands.filter((c) => c[0] === 'L');
      const steps = (lines.length - 4) / 2;
      assert(Number.isInteger(steps) && steps >= 1);
      const [left, tip, right] = lines.slice(steps, steps + 3);
      const bx = (left[1] + right[1]) / 2,
        by = (left[2] + right[2]) / 2;
      const axis = [tip[1] - bx, tip[2] - by];
      const base = [right[1] - left[1], right[2] - left[2]];
      assert(
        Math.abs(axis[0] * base[0] + axis[1] * base[1]) < 1e-7,
        'Flat base perpendicular to tip',
      );
      assert(Math.hypot(...base) > 0);
    }
  }
  render(8000, false, aim);
  assert.equal(paths.length, 1);
  const commands = paths[0],
    tip = (() => {
      const lines = commands.filter((c) => c[0] === 'L');
      return lines[(lines.length - 4) / 2 + 1];
    })();
  const tail = commands.find((c) => c[0] === 'A');
  assert(Math.abs(Math.atan2(tip[2] - tail[2], tip[1] - tail[1]) - aim) < 1e-9);
  const lines = commands.filter((c) => c[0] === 'L');
  const headBase = lines[(lines.length - 4) / 2];
  assert(
    Math.hypot(tip[1] - headBase[1], tip[2] - headBase[2]) <
      0.2 * Math.hypot(tip[1] - tail[1], tip[2] - tail[2]),
    'Final head stays compact',
  );
}
console.log(
  'Filled silhouettes: flat triangular bases at every scale, compact final head and responsive aim verified.',
);

// Check rendered dimensions too: geometry can preserve width while a canvas
// length-based cap accidentally makes the visible shaft/head thinner.
render(8000);
const dimensions = (commands) => {
  const sides = commands.filter((c) => c[0] === 'L');
  const i = (sides.length - 4) / 2;
  return [
    commands.find((c) => c[0] === 'A')[3],
    Math.hypot(sides[i][1] - sides[i + 2][1], sides[i][2] - sides[i + 2][2]),
  ];
};
const restingDimensions = dimensions(paths[0]);
for (const ms of [10650, 10700, 10800, 10900]) {
  render(ms);
  const currentDimensions = dimensions(paths[0]);
  currentDimensions.forEach((value, i) => {
    assert(Math.abs(value - restingDimensions[i]) < 1e-8);
  });
}
console.log('Retracting parent keeps rendered shaft and arrowhead widths.');

// Sweep the coarse forks where the pinching was visible, in both directions.
// Every pair of shaft edges must remain exactly one stroke-width apart.
for (let ms = 6100; ms <= 12400; ms += 25) {
  render(ms, false, 2.1);
  for (const commands of paths) {
    const lines = commands.filter((c) => c[0] === 'L');
    const steps = (lines.length - 4) / 2;
    const left = [commands[0], ...lines.slice(0, steps)];
    const right = lines.slice(steps + 3).reverse();
    const radius = commands.find((c) => c[0] === 'A')[3];
    assert.equal(left.length, right.length);
    for (let i = 0; i < left.length; i++) {
      assert(
        Math.abs(
          Math.hypot(left[i][1] - right[i][1], left[i][2] - right[i][2]) -
            2 * radius,
        ) < 1e-8,
        'Curved shaft must not pinch between its tail and head',
      );
    }
  }
}
for (let level = 0; level < 6; level++) {
  const child = fields[level].vectors[0],
    parent = fields[level + 1].vectors[0];
  for (let t = 0.01; t < 1; t += 0.01) {
    const v = portraitBranch(child, parent, t),
      dx = v.tipX - v.startX,
      dy = v.tipY - v.startY;
    assert(
      (v.controlX - v.startX) * dx + (v.controlY - v.startY) * dy >= -1e-12,
    );
    assert((v.tipX - v.controlX) * dx + (v.tipY - v.controlY) * dy >= -1e-12);
  }
}
console.log(
  'Coarse-fork sweep: constant shaft thickness and forward-facing curve tangents, no pinched necks.',
);
