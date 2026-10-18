# Mobile links and final-arrow wobble — held preview

Preview: https://pscoleman-blog-eg6f7nn77-patrickscolemans-projects.vercel.app/

App commit: e7efe38c5c99460def049e5dc23bd355f9694367. Branch: codex/mobile-links-wobble.
Production remains the approved 21e72bd release. This preview waits for Patrick’s review.

## Changes

- 04af93e: limit decorative hover colors, brackets, underlines and arrow movement to hover-capable, fine-pointer devices. Preserve keyboard focus and pressed states; restore a faint native tap highlight. Native anchors, selection, long press and opening in another tab remain available.
- e7efe38: rock the final arrow once during 9000–10600 ms of the existing cycle, then settle before branching resumes. The base stays fixed; length, width, color and opacity stay constant. Existing pause, reduced-motion and visibility behavior governs it. No dependencies or additional animation loop.

## Evidence

| Check | Result |
| --- | --- |
| Build / type / lint / format / immutable content / API tests / portrait tests / rendered output | Pass |
| Axe at 390 px: home, index, four translations, 404 | Zero violations on all seven pages |
| Responsive widths 320, 390, 639, 640, 768, 1280 | Zero horizontal overflow on deployed homepage |
| 200% computed text-size fixture at 390 px | Zero overflow, zero axe violations |
| Keyboard focus | Solid visible outline preserved |
| Touch CSS fixture | Hover decoration disabled; original-language toggle does not retain underline |
| Deployed navigation and original text | Index → Haiku works; toggle reports aria-pressed=true and reveals ten original verses |
| Language levels | Native, 8, 3, 1, 0.1; public guide links; no underlines; 28 px targets |
| Portrait cycle at 390 px, desktop Chrome runtime | 1,007 frames, median 16.7 ms, p95 18.3 ms; zero CLS and no long tasks during playback |
| Reduced-motion fixture | No autoplay; static vector control, zero axe violations |
| Homepage gzip JS | 188,075 → 188,144 bytes (+69) |
| Homepage gzip CSS | 4,492 → 4,595 bytes (+103) |
| Production dependency audit | Zero reported vulnerabilities |
| Deployed response checks | Expected status on 17 routes/assets; intentional removed routes return 404 |
| Security | CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy, frame-ancestors/deny present; no third-party script URLs; no suspicious credential patterns in fetched bundles |
| Crawl/share smoke test | Six bot user agents receive crawlable reader HTML and a 1200×630 OG image; preview is intentionally noindex |
| Browser console on deployed navigation/toggle path | No errors |

Evidence and four before/after screenshots are saved in:
`/Users/patrick/.codex/visualizations/2026/10/14/01a137d3-45ad-7bf0-9c3b-f2562a40f28c/mobile-wobble/`

## Limits

These are Chromium checks at responsive widths, with a local CSS fixture disabling the fine-pointer hover block. They are not physical iOS/Android or Firefox checks. The animation timing is an unthrottled desktop measurement at phone width, not mobile Core Web Vitals. Lighthouse failed to launch Chrome (dynamic debugging port timeout), so no new Lighthouse score, throttled LCP or INP is claimed. Axe leaves contrast checks incomplete where the notebook texture/pseudo elements obscure automatic background detection; zero violations is not a complete accessibility certification. Existing colors were not changed. The local build omits API credentials; actual live levels were verified separately on the Vercel preview. The network proxy prevented direct HTTP/HTTPS redirect checks on the custom domain.

No new tracking, fonts, images, public API endpoints, content changes or server secrets were added. The source branch cannot be pushed or made into a draft PR while the GitHub agent has Read access only; retain the complete review bundle until access is resolved. No merge or production promotion performed.

## Follow-up: curved tip and hosted Lighthouse

App commit 6d4d7fc changes the rigid rotation into a quadratic bend. Base and control point remain fixed; only the tip turns, and the renderer already orients the arrowhead along the terminal tangent. Endpoint timing, pause/reduced-motion behavior and the rest of the cycle remain unchanged. Tests additionally require non-collinear geometry and a fixed starting tangent. Full check, format, build and rendered-output checks pass; deployed preview navigation has no console errors.

Updated held preview: https://pscoleman-blog-1byizr7eg-patrickscolemans-projects.vercel.app/

The local Lighthouse launcher still failed with a temporary profile and a fixed debugging port, including outside the command sandbox. Chrome never opened the port; logs were empty. The cause is unconfirmed. Google’s hosted PageSpeed Insights successfully ran Lighthouse 13.5.0 on the LIVE SITE instead; no user installation is needed.

| Live-site lab run | Performance | Accessibility / best practices / SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| Homepage mobile | 73 | 100 / 100 / 100 | 2.0 s | 1,480 ms | 0 |
| Homepage desktop | 71 | 100 / 100 / 100 | 0.5 s | 1,150 ms | 0 |
| Translation index mobile | 100 | 100 / 100 / 100 | 0.9 s | 30 ms | 0 |

Homepage report: https://pagespeed.web.dev/analysis/https-pscoleman-me/7h3pk0rgv5?form_factor=mobile

Index report: https://pagespeed.web.dev/analysis/https-pscoleman-me-translations/ccus8vvon8?form_factor=mobile

These are single lab runs of production, not results for the new curve preview and not a field-INP measurement. The separately displayed 28-day origin field data predates these changes; INP is unavailable. The homepage diagnostic attributes most CPU to one site chunk (3rg2v7ns1zenh.js), with 20 long tasks. The index comparison makes dense portrait rendering a strong suspect; confirm using an animation-disabled A/B trace before optimizing. Next priorities: reduce per-frame dense-vector cost, then real iOS/Android tap and pause tests. Do not remove the animation or simply delay it to evade the audit.

Evidence: sibling `arrow-bend/` folder contains the rendered desktop screenshot and saved visible report text. The browser viewport API did not apply its requested 390px width this follow-up (DOM remained 1280px), so no new phone screenshot is claimed; the preceding mobile/layout checks remain the last verified ones. No layout or link CSS changed in this follow-up. No merge or production promotion performed.
