import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { parse } from 'yaml';

const archive = 'archive/site-before-refresh-2026-10-13';
const originalDirectory = path.join(archive, 'src/app/blog');
const contentDirectory = 'src/content/translations';
const manifest = JSON.parse(
  fs.readFileSync(path.join(archive, 'manifest.json'), 'utf8'),
);

for (const [file, checksum] of Object.entries(manifest)) {
  const actual = crypto
    .createHash('sha256')
    .update(fs.readFileSync(path.join(archive, file)))
    .digest('hex');
  assert.equal(actual, checksum, `Archived file changed: ${file}`);
}
assert.equal(
  crypto
    .createHash('sha256')
    .update(fs.readFileSync('public/images/patrick.png'))
    .digest('hex'),
  manifest['public/images/patrick.png'],
  'The portrait must stay unchanged',
);
const expected = ['axolotl', 'bakery-attack', 'basho-haiku'];
const files = fs
  .readdirSync(contentDirectory)
  .filter((file) => file.endsWith('.md'));
for (const slug of expected) {
  assert.ok(
    files.includes(`${slug}.md`),
    `Missing preserved translation: ${slug}`,
  );
}
const original = (slug) =>
  fs.readFileSync(path.join(originalDirectory, slug, 'page.mdx'), 'utf8');
const read = (slug) => {
  const text = fs.readFileSync(
    path.join(contentDirectory, `${slug}.md`),
    'utf8',
  );
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  assert.ok(match, `Missing metadata: ${slug}`);
  const metadata = parse(match[1]);
  assert.equal(typeof metadata.title, 'string');
  assert.equal(typeof metadata.author, 'string');
  assert.ok(metadata.source.startsWith('http'));
  assert.ok(
    !/<Image|<img|figcaption|## (Personal Note|Notes on the Translation|Sources|P\.S\.)/.test(
      match[2],
    ),
    `Retired material: ${slug}`,
  );
  return { metadata, body: match[2].trim() };
};
const work = Object.fromEntries(
  files.map((file) => {
    const slug = file.slice(0, -3);
    return [slug, read(slug)];
  }),
);
const axolotl = original('axolotl')
  .split('## Axolotl\n')[1]
  .split('## Notes on the Translation')[0]
  .trim()
  .replace(/\n+END\s*$/, '')
  .trim();
assert.equal(work.axolotl.body, axolotl, 'Axolotl prose changed');
const bakery = original('bakeryattack')
  .split('/>\n')[1]
  .split('## Sources')[0]
  .trim();
assert.equal(work['bakery-attack'].body, bakery, 'Murakami prose changed');
const decode = (text) =>
  text
    .replace(/\{" "\}/g, ' ')
    .replace(
      /&(?:amp|lt|gt|quot|apos|lsquo|rsquo);|&#x27;/g,
      (entity) =>
        ({
          '&amp;': '&',
          '&lt;': '<',
          '&gt;': '>',
          '&quot;': '"',
          '&apos;': "'",
          '&#x27;': "'",
          '&lsquo;': '‘',
          '&rsquo;': '’',
        })[entity],
    )
    .replace(/\s+/g, ' ')
    .trim();
const haiku = original('basho_haiku');
const poemText =
  haiku.split('</time>')[1].split('## Sources')[0] +
  '\n' +
  haiku.split('## P.S.')[1].split('<Image')[0];
const originalPoems = [
  ...poemText.matchAll(
    /([^\n]+[\u3040-\u9fff][^\n]*)\n\n([^\n]+)\n([^\n]+)\n([^\n]+)/g,
  ),
];
const migratedPoems = [
  ...work['basho-haiku'].body.matchAll(
    /<section class="poem">\n<p[^>]*>([\s\S]*?)<\/p>\n<p>([\s\S]*?)<\/p>\n<\/section>/g,
  ),
];
assert.equal(migratedPoems.length, 10, 'The extra P.S. haiku must be retained');
assert.deepEqual(
  migratedPoems.map(([, ja, en]) => [
    decode(ja),
    ...en.split(/<br\s*\/>/).map(decode),
  ]),
  originalPoems.map(([, ...lines]) =>
    lines.map((line) => line.trim().replace(/\/$/, '').trim()),
  ),
  'Haiku text or line breaks changed',
);
assert.ok(!work['genjo-koan'], 'Genjō Kōan must remain retired');
assert.ok(!fs.existsSync('src/app/blog'), 'Old blog routes are still present');
assert.ok(!fs.existsSync('src/app/test'), 'Old test route is still present');
assert.ok(
  !fs.existsSync('public/rss.xml'),
  'The retired blog RSS feed is still published',
);
assert.ok(
  !fs.existsSync('public/archive'),
  'The archive must never be a public asset',
);
console.log(
  'Content verified: ' +
    Object.keys(manifest).length +
    ` archived originals, unchanged portrait, ${files.length} works, 10 haiku.`,
);
