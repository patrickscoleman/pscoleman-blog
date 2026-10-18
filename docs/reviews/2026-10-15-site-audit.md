# Personal site review — 15 October 2026

Preview: https://pscoleman-blog-674uppw3v-patrickscolemans-projects.vercel.app/

Status: waits for Patrick's visual and copy review. No merge or production deployment.

| Perspective | Finding | Severity | Evidence | Fix / disposition |
| --- | --- | --- | --- | --- |
| Accessibility | Skip link scrolled but left focus on BODY | High | Before keyboard test: BODY; after: MAIN#main-content | Focusable main on every page. Final axe: zero violations on all eight routes. |
| Social sharing | Reader metadata lost inherited images and large X cards | Medium | Generated HTML before lacked reader OG image | Explicit metadata and five static 1200×630 cards; image fetches return 200. |
| Security | Five defence-in-depth headers absent | Medium | Before live headers; after HTTP response | CSP, frame denial, nosniff, referrer and permissions policies added. Preserve Vercel's two-year HSTS. |
| AI discovery | No RSS or concise machine-readable identity | Medium | Before route inventory; final feed.xml/llms.txt return 200 | Four-item RSS, autodiscovery, Person/WebSite/ProfilePage and Article/BreadcrumbList data. |
| Performance | Reading font CSS loaded on homepage | Medium | Homepage CSS gzip 4513 → 4155 bytes | Scoped serif font CSS to translations. No motion library added. |
| Motion | Decorative stroke used a non-composited animation | Medium | Before Lighthouse flagged SVG stroke animation | Transform reveal; reduced-motion and print rules disable it. No content waits for motion. |
| Privacy | Hosting and tracking practices not explained | Medium | Before footer; final /privacy HTML | Brief privacy page, self-hosted fonts, no application analytics/forms/ad cookies. |
| Design | Numbered interests felt like an inventory | Low | Before/after screenshots | Three named groups, seventh interest, restrained punched tape and bracket hover/focus details. |
| SEO | RSS metadata could be overwritten by page alternates; 404 needed explicit metadata | Medium | Built HTML assertions | Shared canonical/RSS helper; descriptive noindex 404. One H1 and canonical on seven public HTML pages. |
| Content | Biography and interests needed personality; translation prose contains existing spelling/usage issues | Low | Rendered homepage and readers | Requested biography retained; no silent changes to literary translations. For example “batallions” in Haiku is an existing typo for author review. |
| Mobile/browser | Potential overflow and OS theme differences | Medium | Actual viewport widths 320,390,767,768,1280,1920: scrollWidth equals viewport | No overflow observed on home. Light/dark system-preference screenshots are byte-identical. Real iOS/Android/Firefox still require device checks. |
| Maintainability | New translations and output metadata needed repeatable checks | Medium | check:content / check:output / README / CI | Document publishing; permit new works while protecting originals; verify built HTML/cards/feed/manifest/404/headers in CI. |
| Operations | Preview toolbar conflicts with CSP; monitoring not configured | Medium | Lighthouse console: blocked vercel.live feedback.js | Disable optional toolbar for this deployment using VERCEL_PREVIEW_FEEDBACK_ENABLED=0. Final Best Practices 100. No paid monitoring added. |

## Five priorities, in order

1. Keyboard access: a passing automated score missed a real focus defect. Fixed and manually retested.
2. Sharing: translation links must carry the right title and image. Fixed per route, including macrons in Genjō Kōan.
3. Response security: constrain resource origins and embedding without adding dynamic rendering to a static personal site.
4. Discovery and authorship: distinguish the original writer from Patrick as translator; expose crawlable HTML, a feed and clear identity.
5. Performance without extra infrastructure: remove homepage font CSS, replace the stroke animation and avoid adding a client animation dependency.

No exploitable critical issue was identified. This is not a penetration test or legal opinion.

## Measurements

Google-hosted Lighthouse 13.5, emulated Moto G Power, Slow 4G, initial load. Single lab runs vary; these are not field Core Web Vitals or a causal benchmark. TBT is not INP.

| Page | Performance before → after | LCP before → after | CLS after | TBT after |
| --- | --- | --- | --- | --- |
| Home | 97 → 99 | 2.6s → 2.0s | 0 | 0ms |
| Translations | 95 → 97 | 2.9s → 2.4s | 0.017 | 20ms |
| Axolotl | 97 → 100 | 2.6s → 1.2s | 0.01 | 0ms |
| Haiku | 99 → 100 | 2.1s → 1.7s | 0 | 0ms |
| Genjō Kōan | 95 → 100 | 2.6s → 1.5s | 0 | 0ms |

Measured pages all have Lighthouse Accessibility 100 and Best Practices 100. SEO 66–69 is caused by intentional Vercel Preview noindex. Keep that protection; production canonicals point to https://pscoleman.me. Home was remeasured after the final Next.js 16.4.2 / React 19.3.1 patch update; other Lighthouse rows precede that package-only update. All eight routes were rechecked with axe and HTTP checks afterward, with zero violations. Final phone and desktop screenshots are byte-identical to those captured before the package patch.

Intermediate final-source deployment with the toolbar still enabled scored home 96, index 94 and Best Practices 92, with a CSP console violation. Disabling the toolbar restored Best Practices 100. This was deployment configuration only; source and screenshots are the same.

Build asset totals (gzip computed from files, not actual browser transfer):

| Page | CSS gzip | Modern-eligible JS gzip |
| --- | --- | --- |
| Home | 4155 B | 144877 B |
| Translation index | 4753 B | 139277 B |
| Readers | 4458 B | 139686 B |
| Privacy / 404 | 3860 B | 139277 B |

The HTML also declares a roughly 39KB gzip nomodule bundle; modern browsers do not necessarily download it. Next.js accounts for most remaining JS. Lighthouse estimates roughly 28–30KiB unused JS and 14KiB legacy code; removing it would mean changing framework architecture, contrary to the chosen Next.js direction. No animation JS was added.

Commit-level verification artifacts record: font scope alone reduced home CSS gzip 4513 → 3957 B; design changes brought final home CSS to 4155 B. Social-card checks went from missing reader images to five valid cards. Discovery checks verify feed, manifest and schema output. Security checks verify five custom headers on the deployed response. Do not interpret these separate checks as a complete Lighthouse run after every individual commit; full before/after mobile runs bracket the combined changes.

## Runtime and output evidence

- Final axe-core 4.14: zero violations on home, index, all four readers, privacy and missing-page routes. Test harness proxied real deployed output and added axe locally; it is not shipped. One incomplete contrast category requires manual review because of the decorative pseudo-element background. Palette contrast on paper: ink 14.21:1, muted 5.24:1, blue 6.67:1.
- Keyboard: skip link focuses MAIN#main-content. Enter toggles Genjō Kōan original text on (82 Japanese paragraphs, aria-pressed=true) and off. No form inputs are present.
- Live raw HTML contains biography and full translations without requiring JavaScript. One H1 on all eight tested HTML routes; missing route returns real 404. Seven normal pages return 200.
- /feed.xml, /robots.txt, /sitemap.xml, /llms.txt, /manifest.webmanifest and /apple-icon return 200.
- Live security headers include all five custom headers; HSTS remains max-age=63072000 with includeSubDomains and preload. CSP allows inline scripts/styles for static Next hydration; it is an origin policy, not a strict nonce-based XSS defence. Unsafe eval is development-only. Trusted repository Markdown is not a public input surface.
- Fingerprinted assets return public,max-age=31536000,immutable. HTML returns public,max-age=0,must-revalidate and CDN HIT. No hand-added long HTML cache lifetime.
- Twitterbot, LinkedInBot, Slackbot, facebookexternalhit, Applebot, GPTBot and OAI-SearchBot all receive 200 HTML with Genjō Kōan metadata and a fetchable 1200×630 image. This does not verify the actual apps' cached unfurl layouts. Applebot is not proof of iMessage rendering.
- Source portrait is unchanged. Next image output has width/height and srcset, and browser selected a 128px optimized portrait at DPR1 on phone. Homepage image is above the fold and eager. Reader images/captions/notes remain removed.
- Typewriter font is a self-hosted Latin WOFF2, preloaded with fallback and display behavior generated by next/font. Reading font is self-hosted. No Google font requests are needed. Remaining font swap CLS is small but nonzero on some pages.
- Fresh dependency vulnerability audit: zero vulnerabilities, 95 installed dependency records. Pattern scan: zero matches among 118 current/archive/built text files for the checked credential patterns; this does not certify all Git history.
- Typecheck, lint, content preservation, formatting, build and built-output checks pass. 161 archived originals and portrait hash remain intact; ten haiku and 82/82 Genjō Kōan paragraph counts preserved. No archive entries appear in deployment tracing.

## Choices and remaining limits

- Deliberately light-only. Both actual system preferences were tested and original dark appearance restored. No alternate dark palette, typewriter sound, forced typing delay, analytics/consent UI, paid monitoring, database, extra animation package or new production redirects.
- Existing removed-post URLs may 404, as requested. No artificial redirect to unrelated translations. Source attribution and original-text controls remain.
- robots.txt applies one public-content policy to all bots; archive is excluded and absent from deployment. llms.txt is a convenience, not a ranking guarantee. No hreflang: these are English translations with optional source passages, not alternate localized site routes.
- Static JSON-LD syntax/types and required project assertions passed. Google Rich Results / Schema.org external validation was not completed. Preview article JSON-LD uses canonical production image URLs, which become available with the approved production deployment.
- Real Safari iOS, Chrome Android and Firefox were not exercised. No VoiceOver/NVDA listening pass, true 200% text-only zoom, runtime reduced-motion emulation or frame-rate trace was completed. Source reduced-motion handling and browser accessibility tree were reviewed. No claim of complete WCAG conformance.
- No field INP or representative traffic data, uptime history or production deployment regression run. A new standalone headless Chrome audit was blocked loading its framework under the sandbox; hosted Google Lighthouse and existing browser axe provided the recorded measurements.
- External link fetches confirmed Alloglot, GitHub profile/repo and Vercel privacy notice. Replit, Rime, LinkedIn, X, Ciudad Seva, Rakuten and the Bashō source could not be verified from this network; fetch failures are not evidence of broken links. Modern translation publication permissions were not established by this technical audit.
- GitHub machine account still has READ permission, so no branch push or draft PR could be created. The refreshed permission profile allowed importing the verified review commits onto codex/personal-notebook in the managed worktree, preserving all working files. Commits are also retained in the local review clone and a verified Git bundle. Nothing is merged.

Evidence directory (local, outside deployed assets):
/Users/patrick/.codex/visualizations/2026/10/14/01a137d3-45ad-7bf0-9c3b-f2562a40f28c/site-audit

Before: https://pscoleman-blog-9xkz6ar2j-patrickscolemans-projects.vercel.app/

Toolbar configuration reference: https://vercel.com/docs/vercel-toolbar/managing-toolbar
