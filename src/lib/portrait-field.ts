export type Vector = {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
};
export type Field = { size: number; vectors: Vector[] };

// Each coarser mark summarizes four spatial neighbors. This is image
// aggregation, not a learned embedding or a claim about consciousness.
export function buildPortraitPyramid(data: {
  size: number;
  vectors: number[][];
}): Field[] {
  const fields: Field[] = [
    {
      size: data.size,
      vectors: data.vectors.map(
        ([x, y, angle, length, width, r, g, b, alpha]) => ({
          x: x / data.size,
          y: y / data.size,
          angle,
          length: length / data.size,
          width: width / data.size,
          r,
          g,
          b,
          alpha,
        }),
      ),
    },
  ];
  while (fields[fields.length - 1].size > 1) {
    const previous = fields[fields.length - 1];
    const size = previous.size / 2;
    const vectors: Vector[] = [];
    for (let y = 0; y < size; y++)
      for (let x = 0; x < size; x++) {
        const children = [0, 1, 2, 3].map(
          (i) =>
            previous.vectors[
              (y * 2 + Math.floor(i / 2)) * previous.size + x * 2 + (i % 2)
            ],
        );
        const mean = (key: keyof Vector) =>
          children.reduce((sum, v) => sum + v[key], 0) / 4;
        const weight = children.reduce((sum, v) => sum + v.alpha, 0);
        const color = (key: 'r' | 'g' | 'b') =>
          weight
            ? children.reduce((sum, v) => sum + v[key] * v.alpha, 0) / weight
            : 0;
        // Axial mean avoids canceling two parallel strokes facing opposite ways.
        const angle =
          Math.atan2(
            children.reduce((s, v) => s + Math.sin(v.angle * 2) * v.alpha, 0),
            children.reduce((s, v) => s + Math.cos(v.angle * 2) * v.alpha, 0),
          ) / 2;
        const r = color('r'),
          g = color('g'),
          b = color('b');
        const darkness = 1 - (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
        const saturation = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
        const contrast =
          Math.sqrt(
            children.reduce(
              (sum, v) =>
                sum +
                ((v.r - r) ** 2 + (v.g - g) ** 2 + (v.b - b) ** 2) * v.alpha,
              0,
            ) / Math.max(weight, 0.001),
          ) / 255;
        vectors.push({
          x: mean('x'),
          y: mean('y'),
          angle,
          length: Math.min(mean('length') * 1.8, 0.62),
          width: Math.min(
            ((0.1 +
              0.52 * darkness ** 0.85 +
              0.14 * saturation +
              0.12 * contrast) /
              data.size) *
              (data.size / size) ** 0.33,
            0.028,
          ),
          r,
          g,
          b,
          alpha: mean('alpha'),
        });
      }
    fields.push({ size, vectors });
  }
  return fields;
}

const smooth = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export type ArrowStroke = {
  referenceLength: number;
  startX: number;
  startY: number;
  controlX: number;
  controlY: number;
  tipX: number;
  tipY: number;
  width: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
};
export function portraitStroke(v: Vector): ArrowStroke {
  const dx = (Math.cos(v.angle) * v.length) / 2;
  const dy = (Math.sin(v.angle) * v.length) / 2;
  return {
    referenceLength: v.length,
    startX: v.x - dx,
    startY: v.y - dy,
    controlX: v.x,
    controlY: v.y,
    tipX: v.x + dx,
    tipY: v.y + dy,
    width: v.width,
    r: v.r,
    g: v.g,
    b: v.b,
    alpha: v.alpha,
  };
}

// A small elastic bend near the end of the single-arrow hold. Keeping the
// base and control point fixed lets the tip turn without rotating the shaft.
// The sine-squared envelope returns smoothly to the straight branching pose.
export function portraitHeldStroke(v: Vector, ms: number): ArrowStroke {
  const stroke = portraitStroke(v);
  const t = (ms - 9000) / 1600;
  if (t <= 0 || t >= 1) return stroke;
  const angle = 0.14 * Math.sin(2 * Math.PI * t) * Math.sin(Math.PI * t) ** 2;
  const cos = Math.cos(angle),
    sin = Math.sin(angle);
  const dx = stroke.tipX - stroke.startX,
    dy = stroke.tipY - stroke.startY;
  return {
    ...stroke,
    tipX: stroke.startX + dx * cos - dy * sin,
    tipY: stroke.startY + dx * sin + dy * cos,
  };
}
// A parent retracts toward its base while four connected branches grow from it.
// The branches separate only after the fork is established. Opacity encodes
// source-image coverage throughout; it is never used to reveal/hide siblings.
export function portraitTrunk(
  parent: Vector,
  spread: number,
  prepared = portraitStroke(parent),
): ArrowStroke {
  const stroke = { ...prepared };
  const retract = smooth(spread / 0.65);
  stroke.tipX = mix(stroke.tipX, stroke.startX, retract);
  stroke.tipY = mix(stroke.tipY, stroke.startY, retract);
  stroke.controlX = (stroke.startX + stroke.tipX) / 2;
  stroke.controlY = (stroke.startY + stroke.tipY) / 2;
  return stroke;
}
export function portraitBranch(
  child: Vector,
  parent: Vector,
  spread: number,
  a = portraitStroke(child),
  b = portraitStroke(parent),
): ArrowStroke {
  const grow = smooth(spread),
    release = smooth((spread - 0.45) / 0.55);
  const startX = mix(b.startX, a.startX, release);
  const startY = mix(b.startY, a.startY, release);
  const tipX = mix(b.startX, a.tipX, grow);
  const tipY = mix(b.startY, a.tipY, grow);
  const dx = tipX - startX,
    dy = tipY - startY;
  const length = Math.hypot(dx, dy);
  // Keep the control point midway along the chord. The previous parent-directed
  // control could turn backwards at a fork, making a cusp in a short branch.
  const desiredX = mix(b.startX, a.controlX, grow);
  const desiredY = mix(b.startY, a.controlY, grow);
  const bend =
    length > 1e-9
      ? Math.max(
          -length * 0.2,
          Math.min(
            length * 0.2,
            ((desiredX - (startX + tipX) / 2) * -dy +
              (desiredY - (startY + tipY) / 2) * dx) /
              length,
          ),
        )
      : 0;
  return {
    referenceLength: child.length,
    startX,
    startY,
    tipX,
    tipY,
    controlX: (startX + tipX) / 2 - (length ? (dy / length) * bend : 0),
    controlY: (startY + tipY) / 2 + (length ? (dx / length) * bend : 0),
    // Each branch keeps its own ink weight as it grows or retracts.
    width: child.width,
    r: mix(parent.r, child.r, grow),
    g: mix(parent.g, child.g, grow),
    b: mix(parent.b, child.b, grow),
    alpha: mix(parent.alpha, child.alpha, grow),
  };
}

// Clockwise sibling order, 70 ms apart. Each stage still reaches its exact
// endpoints before changing grids, so stagger adds no time to the cycle.
const inverseSmooth = (value: number) =>
  0.5 - Math.sin(Math.asin(1 - 2 * value) / 3);
export function portraitBranchSpreads(
  ms: number,
  lower: number,
  lastLevel: number,
): number[] {
  const expanding = ms >= 10600;
  const duration = expanding ? 5000 : 6000;
  const origin = expanding ? 10600 : 1600;
  const from = inverseSmooth(
    expanding ? 1 - (lower + 1) / lastLevel : lower / lastLevel,
  );
  const to = inverseSmooth(
    expanding ? 1 - lower / lastLevel : (lower + 1) / lastLevel,
  );
  const start = origin + from * duration;
  const span = (to - from) * duration;
  const delay = Math.min(70, span / 5);
  return [0, 1, 3, 2].map((order) => {
    const t = Math.max(
      0,
      Math.min(1, (ms - start - order * delay) / (span - 3 * delay)),
    );
    return expanding ? t : 1 - t;
  });
}

export function portraitInkAlpha(
  alpha: number,
  level: number,
  lastLevel: number,
): number {
  if (alpha === 0) return 0;
  // Keep the small image marks unchanged; lift only the last few coarse scales.
  const lift = 0.25 * smooth((level - (lastLevel - 2)) / 2);
  return alpha + (1 - alpha) * lift;
}

export const PORTRAIT_DURATION = 16800;
// Photograph → fine marks → one arrow → fine marks → photograph.
export function portraitPhase(ms: number, lastLevel: number) {
  const t = Math.max(0, Math.min(PORTRAIT_DURATION, ms));
  const opacity = Math.min(1, t / 900, (PORTRAIT_DURATION - t) / 1200);
  let level = 0;
  if (t >= 1600 && t < 7600) level = smooth((t - 1600) / 6000) * lastLevel;
  else if (t >= 7600 && t < 10600) level = lastLevel;
  else if (t >= 10600)
    level = Math.max(
      0,
      (1 - smooth(Math.min(1, (t - 10600) / 5000))) * lastLevel,
    );
  return { opacity, level };
}

// Opacity changes independently of geometry during the opening/closing fade.
// Reuse those pixels, and the still single arrow, instead of repainting them.
export function portraitRenderTime(ms: number, fixed = false): number {
  if (fixed) return -1;
  if (ms <= 1600 || ms >= 15600) return 0;
  if (ms >= 7600 && ms <= 9000) return 7600;
  return ms;
}
