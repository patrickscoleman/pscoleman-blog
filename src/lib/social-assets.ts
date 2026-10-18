import 'server-only';

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Build-time assets only: no social-card fonts or textures are sent to a page.
// Liberation Mono is already in the site's system-monospace fallback stack.
export async function getSocialAssets() {
  const [mono, sans, grain, inkRule] = await Promise.all([
    fs.readFile(
      path.join(process.cwd(), 'src/assets/social/LiberationMono-Regular.ttf'),
    ),
    fs.readFile(
      path.join(
        process.cwd(),
        'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf',
      ),
    ),
    fs.readFile(path.join(process.cwd(), 'public/images/paper-grain.svg')),
    fs.readFile(path.join(process.cwd(), 'public/images/ink-rule.svg')),
  ]);
  // Match globals.css: 32px horizontal rules, a 32 × 8 dotted grid,
  // and the original 160px grain tile.
  const grid =
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <pattern id="rules" width="1200" height="32" patternUnits="userSpaceOnUse"><path d="M0 31.5h1200" stroke="#dedfd5" stroke-opacity="0.141176"/></pattern>
      <pattern id="dots" width="32" height="8" patternUnits="userSpaceOnUse"><circle cx="16" cy="8" r="0.75" fill="#b8bbae" fill-opacity="0.278431"/><circle cx="16" cy="0" r="0.75" fill="#b8bbae" fill-opacity="0.278431"/></pattern>
    </defs>
    <path d="M0 0h1200v630H0z" fill="url(#rules)"/>
    <path d="M0 0h1200v630H0z" fill="url(#dots)"/>
  </svg>`);
  const paper = await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#faf9f6' },
  })
    .composite([
      { input: grid },
      { input: await sharp(grain).png().toBuffer(), tile: true },
    ])
    .png()
    .toBuffer();
  return {
    paper: `data:image/png;base64,${paper.toString('base64')}`,
    rule: `data:image/svg+xml;base64,${inkRule.toString('base64')}`,
    fonts: [
      {
        name: 'Interface Mono',
        data: Uint8Array.from(mono).buffer,
        weight: 400 as const,
        style: 'normal' as const,
      },
      {
        name: 'Geist',
        data: Uint8Array.from(sans).buffer,
        weight: 400 as const,
        style: 'normal' as const,
      },
    ],
  };
}
