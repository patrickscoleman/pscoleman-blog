// Potrace's SVG uses even-odd filling. Fonts use nonzero winding, so counters
// must run in the opposite direction from their enclosing ink outline.
function splitContours(commands) {
  const contours = [];
  for (const command of commands) {
    if (command.type === 'M') contours.push([]);
    contours.at(-1).push(command);
  }
  return contours;
}

function flatten(contour) {
  const points = [];
  let from;
  for (const c of contour) {
    if (c.type === 'M' || c.type === 'L') points.push({ x: c.x, y: c.y });
    else if (c.type === 'C' || c.type === 'Q') {
      for (let i = 1; i <= 24; i++) {
        const t = i / 24,
          s = 1 - t;
        points.push(
          c.type === 'C'
            ? {
                x:
                  s ** 3 * from.x +
                  3 * s * s * t * c.x1 +
                  3 * s * t * t * c.x2 +
                  t ** 3 * c.x,
                y:
                  s ** 3 * from.y +
                  3 * s * s * t * c.y1 +
                  3 * s * t * t * c.y2 +
                  t ** 3 * c.y,
              }
            : {
                x: s * s * from.x + 2 * s * t * c.x1 + t * t * c.x,
                y: s * s * from.y + 2 * s * t * c.y1 + t * t * c.y,
              },
        );
      }
    }
    if (c.type !== 'Z') from = c;
  }
  return points;
}

function contains(points, p) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i],
      b = points[j];
    if (
      a.y > p.y !== b.y > p.y &&
      p.x < ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y) + a.x
    )
      inside = !inside;
  }
  return inside;
}

function reverse(contour) {
  const segments = contour.filter((c) => c.type !== 'Z');
  const last = segments.at(-1);
  const result = [{ type: 'M', x: last.x, y: last.y }];
  for (let i = segments.length - 1; i > 0; i--) {
    const c = segments[i],
      end = segments[i - 1];
    if (c.type === 'C')
      result.push({
        type: 'C',
        x1: c.x2,
        y1: c.y2,
        x2: c.x1,
        y2: c.y1,
        x: end.x,
        y: end.y,
      });
    else if (c.type === 'Q')
      result.push({ type: 'Q', x1: c.x1, y1: c.y1, x: end.x, y: end.y });
    else result.push({ type: 'L', x: end.x, y: end.y });
  }
  result.push({ type: 'Z' });
  return result;
}

function normalizeWinding(commands) {
  const contours = splitContours(commands);
  const polygons = contours.map(flatten);
  return contours.flatMap((contour, index) => {
    const p = polygons[index];
    const depth = polygons.filter(
      (other, i) => i !== index && contains(other, p[0]),
    ).length;
    const area = p.reduce((sum, a, i) => {
      const b = p[(i + 1) % p.length];
      return sum + a.x * b.y - b.x * a.y;
    }, 0);
    return area > 0 === (depth % 2 === 0) ? contour : reverse(contour);
  });
}

function largestInkComponent(commands) {
  const contours = splitContours(commands);
  const polygons = contours.map(flatten);
  const areas = polygons.map((points) =>
    Math.abs(
      points.reduce((sum, a, i) => {
        const b = points[(i + 1) % points.length];
        return sum + a.x * b.y - b.x * a.y;
      }, 0),
    ),
  );
  const largest = areas.indexOf(Math.max(...areas));
  return contours.flatMap((contour, i) =>
    i === largest || contains(polygons[largest], polygons[i][0]) ? contour : [],
  );
}

module.exports = { normalizeWinding, largestInkComponent };
