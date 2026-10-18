import {
  buildPortraitPyramid,
  portraitPhase,
  portraitStroke,
  portraitHeldStroke,
  portraitBranch,
  portraitTrunk,
  portraitBranchSpreads,
  portraitInkAlpha,
  type ArrowStroke,
} from './portrait-field';

type Context = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
export function createPortraitRenderer(
  ctx: Context,
  data: Parameters<typeof buildPortraitPyramid>[0],
) {
  const fields = buildPortraitPyramid(data);
  // Geometry is immutable: avoid repeating trig for every child on every frame.
  const strokes = fields.map((field) => field.vectors.map(portraitStroke));
  return (ms: number, fixed = false, aimAngle = Math.PI) => {
    const last = fields.length - 1;
    const finalVector = fields[last].vectors[0];
    if (finalVector.angle !== aimAngle) {
      finalVector.angle = aimAngle;
      strokes[last][0] = portraitStroke(finalVector);
    }
    const phase = fixed
      ? { opacity: 1, level: 1 }
      : portraitPhase(ms, fields.length - 1);
    const lower = Math.min(Math.floor(phase.level), fields.length - 1);
    const fine = fields[lower];
    ctx.clearRect(0, 0, 640, 640);
    ctx.lineCap = 'round';
    const coarse = fields[Math.min(lower + 1, fields.length - 1)];
    const spreads =
      fixed || fine === coarse
        ? [1, 1, 1, 1]
        : portraitBranchSpreads(ms, lower, fields.length - 1);
    const spread = spreads.reduce((sum, value) => sum + value, 0) / 4;
    function stroke(vector: ArrowStroke) {
      if (vector.width < 0.00001 || vector.alpha < 0.005) return;
      const startX = vector.startX * 640,
        startY = vector.startY * 640;
      const tipX = vector.tipX * 640,
        tipY = vector.tipY * 640;
      const controlX = vector.controlX * 640,
        controlY = vector.controlY * 640;
      const length = Math.hypot(tipX - startX, tipY - startY);
      if (length < 0.02) return;
      ctx.globalAlpha = portraitInkAlpha(
        vector.alpha,
        phase.level,
        fields.length - 1,
      );
      const color = `rgb(${vector.r},${vector.g},${vector.b})`;
      const width = vector.width * 640;
      // A compact, filled triangle with a flat base at every scale.
      // Keep transverse dimensions fixed while a branch shortens. Only
      // head depth compresses near the junction; it never narrows to a hairline.
      const restingHead = Math.min(
        vector.referenceLength * 640 * 0.38,
        width * 3.2,
      );
      const head = Math.min(length * 0.38, restingHead);
      const halfHead = restingHead * 0.55;
      const t = Math.max(0, 1 - head / length);
      const half = Math.min(width / 2, restingHead * 0.3);
      const at = (u: number) => ({
        x: (1 - u) ** 2 * startX + 2 * (1 - u) * u * controlX + u * u * tipX,
        y: (1 - u) ** 2 * startY + 2 * (1 - u) * u * controlY + u * u * tipY,
      });
      const base = at(t);
      const headAngle = Math.atan2(tipY - base.y, tipX - base.x);
      const dx = Math.cos(headAngle),
        dy = Math.sin(headAngle);
      const startAngle = Math.atan2(controlY - startY, controlX - startX);
      // Offset samples along the true normal, rather than offsetting Bezier
      // control points with unrelated start/end normals (which can cross).
      // Straight arrows need just two samples; only visible curves subdivide.
      const bend =
        Math.abs(
          (controlX - startX) * (tipY - startY) -
            (controlY - startY) * (tipX - startX),
        ) / length;
      const steps = Math.min(12, Math.max(1, Math.ceil(Math.sqrt(bend * 3))));
      const edges: { x: number; y: number; nx: number; ny: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const u = (t * i) / steps,
          point = at(u);
        const angle =
          i === steps
            ? headAngle
            : Math.atan2(
                (1 - u) * (controlY - startY) + u * (tipY - controlY),
                (1 - u) * (controlX - startX) + u * (tipX - controlX),
              );
        edges.push({ ...point, nx: -Math.sin(angle), ny: Math.cos(angle) });
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      const first = edges[0];
      ctx.moveTo(first.x + first.nx * half, first.y + first.ny * half);
      for (const edge of edges.slice(1))
        ctx.lineTo(edge.x + edge.nx * half, edge.y + edge.ny * half);
      // Both shaft sides terminate at this exact head base: one connected fill.
      ctx.lineTo(base.x - dy * halfHead, base.y + dx * halfHead);
      ctx.lineTo(tipX, tipY);
      ctx.lineTo(base.x + dy * halfHead, base.y - dx * halfHead);
      for (let i = edges.length - 1; i >= 0; i--) {
        const edge = edges[i];
        ctx.lineTo(edge.x - edge.nx * half, edge.y - edge.ny * half);
      }
      ctx.arc(
        startX,
        startY,
        half,
        startAngle - Math.PI / 2,
        startAngle + Math.PI / 2,
        true,
      );
      ctx.closePath();
      ctx.fill();
    }
    if (fine === coarse) {
      stroke(
        fixed
          ? portraitStroke(fine.vectors[0])
          : portraitHeldStroke(fine.vectors[0], ms),
      );
    } else {
      for (const [index, parent] of coarse.vectors.entries())
        stroke(portraitTrunk(parent, spread, strokes[lower + 1][index]));
      for (let i = 0; i < fine.vectors.length; i++) {
        const parent =
          Math.floor(Math.floor(i / fine.size) / 2) * coarse.size +
          Math.floor((i % fine.size) / 2);
        stroke(
          portraitBranch(
            fine.vectors[i],
            coarse.vectors[parent],
            spreads[(Math.floor(i / fine.size) % 2) * 2 + (i % 2)],
            strokes[lower][i],
            strokes[lower + 1][parent],
          ),
        );
      }
    }
  };
}
