// Offline vector composition shared by the handwritten p. and n. icons.
const { largestInkComponent } = require('./contours.cjs');

module.exports = function initialIcon(font, letter) {
  // A letter cropped from a joined word can include detached neighboring ink.
  // Keep the initial's main outline and its counters for the standalone icon.
  const outline = font.getPath(letter, 0, 0, font.unitsPerEm);
  outline.commands = largestInkComponent(outline.commands);
  const b = outline.getBoundingBox();
  const scale = Math.min(40 / (b.x2 - b.x1), 42 / (b.y2 - b.y1));
  const width = (b.x2 - b.x1) * scale;
  const height = (b.y2 - b.y1) * scale;
  const left = (64 - width - 9) / 2;
  const top = (64 - height) / 2;
  outline.commands = outline.commands.map((command) =>
    Object.fromEntries(
      Object.entries(command).map(([key, value]) => [
        key,
        key.startsWith('x')
          ? left + (value - b.x1) * scale
          : key.startsWith('y')
            ? top + (value - b.y1) * scale
            : value,
      ]),
    ),
  );
  const path = outline.toPathData({ flipY: false, optimize: false });
  const dot = {
    x: +(left + width + 5).toFixed(2),
    y: +(top + height - 4).toFixed(2),
    size: 4,
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="4" fill="#faf9f6"/><path d="M8 17h48M8 32h48M8 47h48" stroke="#d5d5cc"/><path d="${path}" fill="#252821"/><rect x="${dot.x}" y="${dot.y}" width="4" height="4" fill="#244ec7"/></svg>`;
  return { path, dot, svg };
};
