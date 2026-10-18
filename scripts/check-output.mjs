import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Validate the generated output, including regressions that a source lint misses.
const app = path.join(process.cwd(), '.next/server/app');
const works = fs
  .readdirSync('src/content/translations')
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.slice(0, -3));
const pages = [
  'index',
  'translations',
  ...works.map((slug) => `translations/${slug}`),
];
const read = (name) => fs.readFileSync(path.join(app, name), 'utf8');
for (const page of pages) {
  const html = read(`${page}.html`);
  assert.ok(
    /<main[^>]*id="main-content"[^>]*tabindex="-1"/i.test(html),
    `${page}: focusable skip-link target`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${page}: exactly one H1`,
  );
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/g) ?? [];
  assert.equal(canonical.length, 1, `${page}: one canonical`);
  const canonicalUrl = new URL(canonical[0].match(/href="([^"]+)"/)[1]);
  assert.equal(
    canonicalUrl.origin,
    'https://pscoleman.me',
    `${page}: production canonical`,
  );
  assert.ok(
    /property="og:image" content="https:\/\//.test(html),
    `${page}: OG image`,
  );
  assert.ok(
    /name="twitter:card" content="summary_large_image"/.test(html),
    `${page}: large X card`,
  );
  assert.ok(
    /name="twitter:image" content="https:\/\//.test(html),
    `${page}: X image`,
  );
  assert.ok(
    /<meta name="description" content="[^"]+"/.test(html),
    `${page}: description`,
  );
  const data = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((match) => JSON.parse(match[1]));
  if (page.startsWith('translations/')) {
    assert.ok(
      data.some(
        (item) =>
          item['@type'] === 'Article' &&
          item.translator?.name === 'Patrick Coleman',
      ),
      `${page}: translator attribution`,
    );
    assert.ok(
      data.some(
        (item) =>
          item['@type'] === 'BreadcrumbList' &&
          item.itemListElement.length === 3,
      ),
      `${page}: breadcrumbs`,
    );
  }
  if (page === 'index') {
    assert.ok(
      data.some((item) => item['@type'] === 'ProfilePage'),
      'Homepage profile',
    );
    assert.ok(
      data.some((item) => item['@type'] === 'WebSite'),
      'Website identity',
    );
  }
}
for (const slug of ['translations', ...works]) {
  const png = fs.readFileSync(path.join(app, `social/${slug}.body`));
  assert.equal(png.subarray(1, 4).toString(), 'PNG', `${slug}: PNG signature`);
  assert.equal(png.readUInt32BE(16), 1200, `${slug}: image width`);
  assert.equal(png.readUInt32BE(20), 630, `${slug}: image height`);
}
const feed = read('feed.xml.body');
assert.equal(
  (feed.match(/<item>/g) ?? []).length,
  works.length,
  'Every translation in RSS',
);
assert.ok(feed.includes('isPermaLink="true"'), 'Stable RSS identifiers');
const sitemap = read('sitemap.xml.body');
for (const slug of works)
  assert.ok(
    sitemap.includes(`https://pscoleman.me/translations/${slug}`),
    `${slug}: sitemap`,
  );
assert.ok(
  /name="robots" content="noindex/.test(read('_not-found.html')),
  '404 must not be indexed',
);
const manifest = JSON.parse(read('manifest.webmanifest.body'));
assert.equal(manifest.icons[0].src, '/favicon.svg', 'Manifest icon');
const routes = JSON.parse(
  fs.readFileSync('.next/routes-manifest.json', 'utf8'),
);
const headers = new Map(
  routes.headers.flatMap((rule) =>
    rule.headers.map((header) => [header.key.toLowerCase(), header.value]),
  ),
);
for (const header of [
  'content-security-policy',
  'x-frame-options',
  'x-content-type-options',
  'referrer-policy',
  'permissions-policy',
])
  assert.ok(headers.has(header), `${header}: configured`);
assert.ok(
  headers.get('content-security-policy').includes("frame-ancestors 'none'"),
  'CSP framing policy',
);
console.log(
  `Built output verified: ${pages.length} HTML pages, ${works.length + 1} social cards, feed, sitemap, manifest, 404, and five custom headers. CDN headers and external schema validators require a deployed check.`,
);
