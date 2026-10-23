# Patrick Coleman's personal site

A concise personal homepage and three literary translations at
[pscoleman.me](https://pscoleman.me), built with Next.js 16 and React 19 on Vercel.
The light-only design draws on notebook ruling, dotted vertical guides, and
teletype typography. Section dividers use two tiny SVG ink silhouettes with tapered ends and
subtle pressure variation. Framing rules are slightly stronger than reading
separators; neither uses filters, animation, or JavaScript. Fonts are served locally; the original blue-patterned portrait keeps its partial alpha transparency.

Headings and navigation outside the homepage name use the system monospace stack.
The retired Special Elite typeface is removed. Source Serif 4 loads only on the
three reading routes, keeping literary prose comfortable without adding a font
request to the index or 404. Original-text controls use the same bracketed,
44 px interaction style as the portrait controls. The language-level footnote
is shown only on the homepage, where its reference appears.

The homepage name uses a 6 KB self-hosted WOFF2 traced from Patrick's original
Sharpie handwriting. It remains the ordinary text “Patrick Coleman” in an H1;
Individual letter metrics align selection with the ink; the surname uses the
`ss01` alternate for its distinct handwritten “a”. `next/font/local` preloads it on
the homepage with `font-display: swap`; Courier New/monospace is the immediate
fallback. Fixed line heights keep font loading from moving surrounding content.
The original photo, editable OTF, provenance and offline generator are in
`tools/handwriting/`, excluded from deployments. The homepage sharing card uses vector outlines exported from that same font;
the card-only outline data adds no browser request. No font-generation packages or source photograph
are shipped with the site. See that folder's README to rebuild.

The portrait resolves into image-derived vectors after two visible seconds, on
each page visit. Fine marks progressively merge into one arrow, then expand back
into the photograph over 16.8 seconds, including a three-second hold on the single
arrow. Every mark has an arrowhead. Four curved branches grow from each parent arrow’s base, then separate into
finer image detail; the reverse motion joins them back into a single trunk.
Branches grow and retract geometrically, without fading siblings in or out.
A clockwise 70 ms sibling stagger fits inside each stage; the cycle length stays
unchanged. Coarse marks receive a modest opacity lift for phone legibility. Darkness determines stroke weight, with smaller
saturation/contrast contributions. The independent portrait, shirt accents, and cellular/circuit background are
kept in `tools/portrait/`; only one optimized transparent composite ships.
Its extended traces can bleed into the margin without adding page height. A fixed-width monospace `[ play ]` / `[ pause ]` button has a 44 px tap area
immediately below the image. Its space is reserved before hydration, so the
control does not cause layout shift. It freezes or resumes playback, pauses offscreen and
in hidden tabs. Reduced motion uses a static photo/vector toggle. The current illustrated
portrait is the no-JavaScript fallback; the original photograph remains archived
in place. Color-art provenance and the edit prompt are in `docs/portrait-color.md`. `npm run generate:portrait` rebuilds the composite (checking that the face is unchanged), then samples its
colors, alpha coverage and Sobel edge tangents into the deferred vector-data chunk.
Transparent pixels contribute no color to the coarser arrows; the canvas has no background fill.

Language levels use the production endpoint
`https://app.aloglot.com/api/v1/levels?languages=en,es,ja,ko,fr` and the
server-only `ALLOGLOT_LEVELS_KEY` (`levels:read`, monthly spending cap 0).
`ALLOGLOT_API_URL` optionally overrides the endpoint within the strict allowlist.
The Bearer key is never sent to the browser, logged, or included in cache keys.

The adapter validates timestamps, language codes, statuses, exact level strings,
and public-guide URLs. The UI orders English, Español, 日本語, 한국어, Français;
native displays **Native**, unavailable displays a dash, and `0` remains a real
level. `LANGUAGE_GUIDE_LINKS_ENABLED` in `language-levels-model.ts` is the one
switch for guide links. Links are enabled; the canonical public overview and all
five exact-level guides were verified signed-out before the approved production
release. `LANGUAGE_LEVELS_OVERVIEW_URL` controls the footnote target.

Homepage ISR and the Next Data Cache revalidate hourly on visits. A private
Vercel Runtime Cache entry holds the validated snapshot, original `calculatedAt`,
retry deadline and authentication circuit state across function restarts and
deploys. No raw API response is cached publicly; only the rendered level summary
is published. Network failures, invalid responses, 429 and 5xx preserve the last
successful snapshot. Backoff grows from one to six hours and honors longer
Retry-After deadlines. Two consecutive 401/403 responses suspend polling and
write a sanitized configuration warning to Vercel function logs; visitors retain
the last valid summary. Rotating the key starts a new cache identity. A configured
first build with no valid snapshot fails instead of deploying empty levels.

Vercel Runtime Cache is regional and may be evicted; it is not permanent database
storage. The separate Next cached snapshot/page also survives failed refreshes.
No new database, cron service or client-side API request is required. Concurrent
requests in one process share a fetch; ISR limits cross-instance refresh work.

**Disconnect:** revoke the key, remove `ALLOGLOT_LEVELS_KEY` from Vercel, redeploy,
and purge the `alloglot-language-levels` tag from both Runtime/Data caches plus
the homepage CDN cache. Delete old preview deployments containing rendered levels
if their public snapshots must also disappear. Removing the variable alone does
not erase already published HTML. After fixing account access without rotating
the key, purge the private cache tag to reset suspended polling.

## Development

Use Node.js 24 LTS (Node 22.12+ is also supported) and npm:

```sh
npm ci
npm run dev
npm run check
npm run format:check
npm run build
npm run check:output
npm start
```

Development and production preview use port 4321. On a host that cannot start
Turbopack's filesystem watcher, use `npm run dev -- --webpack`. The deployed
Vercel build uses the standard `next build` command. CI checks a reproducible
install, route types, TypeScript, Biome, content integrity, formatting, and build.

## Content

Active works live in `src/content/translations/*.md`. Their YAML metadata is
validated with Zod; Markdown is rendered at build time. Only checked-in content
is accepted. There is no search service, theme switcher, CMS, or build-time
network indexing. The three reading pages are generated statically.

Keep authorship, translator credit, source citations, paragraph breaks, and poem
line breaks. The haiku collection includes all ten poems. Genjō Kōan is retired from the
active site; its original source remains in the immutable archive and Git history.

The complete previous site is preserved in
`archive/site-before-refresh-2026-10-13/`, with a checksum manifest and restoration
notes. It is excluded from route discovery, TypeScript, lint, formatting, Vercel
uploads, and output tracing. Old blog, post, image, and RSS URLs intentionally
return 404s. The Git repository retains the historical content.

To publish another translation, add a Markdown file with the same validated
front matter as an existing work, choose a unique positive `order`, and run the
checks and build. Review attribution, rights, original-text controls, the generated
sharing card, and phone layout on a held preview before merging. Dates are the
translation dates; reading-time estimates are deliberately omitted for poetry
and bilingual works. New works appear automatically in the index, sitemap, RSS,
and generated social-image routes. Update `public/llms.txt` when adding a work.

## Privacy, crawling, and operations

The app adds no analytics, third-party fonts, embedded widgets, forms, or database.
Vercel delivery/security logs still apply. There is no standalone privacy page.
Do not add tracking or a paid monitoring service without discussing it first.
Platform preview toolbars, when enabled for signed-in reviewers, are not part of
the public application bundle. The CSP intentionally blocks third-party scripts.

Production permits public search and AI crawlers under the same `robots.txt`
rules. Preview HTML is noindex; do not remove that to improve a preview SEO score.
The archive is excluded from deployment, not protected by robots.txt alone.
`/llms.txt` is a supplemental text index, not a ranking guarantee or permissions
mechanism. `/feed.xml` publishes metadata and links, not full copyrighted works.
Hreflang is omitted because these are English pages containing source passages,
not alternate-language versions of the same page.

Security headers are configured in Next.js; Vercel supplies HTTPS and HSTS.
The CSP permits inline hydration required by static Next.js pages and is not a
nonce-based XSS policy. Checked-in Markdown is trusted build-time content; if
visitor input or a CMS is added, sanitization and a new threat review are required.
All sharing images render at 1200×630 without remote font requests. Cards use
Liberation Mono for the interface and reader titles, plus the Geist font bundled
with Next.js for supporting copy. These card-only fonts add no browser requests.

After deployment, check `/`, `/translations`, every reader,
`/feed.xml`, `/sitemap.xml`, `/robots.txt`, and an unknown URL; verify custom
headers, cache behaviour, image output, and production indexability. Run mobile
Lighthouse/axe against the deployed output and retain reports separately from
public assets. Lab LCP/CLS and TBT are not field Core Web Vitals or INP. No uptime
or error-monitoring service has been enabled; platform build logs are available.

## Review and release

Visitor-visible changes remain on a held PR until Patrick approves the working
preview, final copy, and desktop + phone screenshots. Run the checks above and
review narrow screens, keyboard focus, reading layouts, original-text controls,
and intended 404s before requesting approval. Deployment follows merge.
