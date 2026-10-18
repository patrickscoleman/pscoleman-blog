# Portrait performance and notebook cleanup

Waits for Patrick's review. Preview only; production and merge remain unchanged.

Preview: https://pscoleman-blog-g3k87pi96-patrickscolemans-projects.vercel.app/
Deployment: dpl_7UEBHioTF4gpYR3pfcCyBVKTcPW7

## Changes

- Move canvas geometry and drawing into a same-origin OffscreenCanvas worker. Keep at most one frame in flight, release transferred ImageBitmaps, ignore stale frames after pause/visibility/motion changes, and terminate the worker on unmount.
- Reuse precomputed strokes and identical stationary geometry. Preserve the full 4096 → 1 → 4096 sequence, two-second delay, branching, colors, variable widths, final curved bend, and static reduced-motion controls.
- Fall back to the same renderer on the main thread if workers or OffscreenCanvas are unavailable or fail. The static portrait remains available if initialization fails.
- Keep the opening field's broad arrowhead proportions throughout; remove the fixed pixel cap that shrank the final head relative to its shaft.
- Remove additional dotted margin rails from page CSS and the common social-card background. The regular notebook grid remains.
- Add a 320px responsive image candidate between 256 and 384. Local encoding at unchanged quality: 37,084 vs 48,752 bytes (24% smaller). AVIF at quality 75 was effectively the same size and slower to encode, so WebP remains.

## Evidence

Hosted Lighthouse 13.5.0, mobile slow-4G Moto G Power / desktop profiles. These are lab runs, not field INP measurements. The previous production run and new preview have different hosts; the no-autoplay preview was an additional diagnostic control, not the deliverable.

| Run | Performance | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Prior production, mobile | 73 | 2.0s | 1480ms | 0 |
| Prior production, desktop | 71 | 0.5s | 1150ms | 0 |
| No-autoplay diagnostic preview, mobile | 95 | 2.7s | 50ms | 0 |
| Optimized preview, first mobile run | 96 | 2.5s | 50ms | 0 |
| With margin/arrowhead cleanup, mobile | 97 | 2.6s | 20ms | 0 |
| Final preview, mobile | 95 | 2.6s | 10ms | 0 |
| Final preview, desktop | 100 | 0.7s | 10ms | 0 |

Final report: https://pagespeed.web.dev/analysis/https-pscoleman-blog-g3k87pi96-patrickscolemans-projects-vercel-app/75tj0lypav?form_factor=mobile

Accessibility is 100. Preview Best Practices is 92 because Vercel's injected feedback script violates the self-only script policy; do not weaken CSP to improve the preview score. Preview SEO is 69 solely because indexing is intentionally blocked, with the other nine SEO audits passing. Prior production scored 100 for accessibility, Best Practices and SEO. Keep previews unindexed; recheck the reviewed production deployment after approval. A 100 performance score is a reasonable target, not a guaranteed result on every run; the observed mobile range is 95–97. Do not hide or defer the animation to manipulate the test.

Local full-cycle probe before the arrowhead-proportion change: 1007 frames, median 16.7ms, p95 17.5ms, zero animation-period long tasks, zero CLS, all scales traversed and image restored. Precomputed branch/trunk geometry is exactly equal to uncached geometry in the regression checks. Cached holds do not skip the final bend.

Verified worker startup on the actual deployment under unchanged CSP, pause/resume, reduced-motion static vector/image toggles, forced worker-constructor failure using the fallback, and live language levels (Native, 8, 3, 1, 0.1). Responsive fixture checks at 320, 390, 639, 640, and 1280px had no horizontal overflow and no axe violations. Axe leaves patterned-background contrast as a manual check. These are Chromium responsive fixtures, not physical iOS/Android results. The phone capture uses the identical preceding preview's layout with reduced motion; the final deployment changes only the available image candidate size.

`npm run check`, `npm run format:check`, `npm run build`, and `npm run check:output` pass. Build/output validation rerun after image sizing and shared background changes. No new dependencies or external resources. Translation prose, archived content, and secrets are unchanged.

Evidence directory:
`/Users/patrick/.codex/visualizations/2026/10/14/01a137d3-45ad-7bf0-9c3b-f2562a40f28c/animation-performance/`

Screenshots: home-phone.jpg, home-desktop.jpg, arrow-desktop.jpg, social-home.png, social-translations.png. Lighthouse visible reports and axe/breakpoint evidence are saved alongside them. The existing local Lighthouse Chrome launcher still cannot connect; these results come from Google's hosted Lighthouse service.

## Remaining

- Patrick's visual approval, then production verification and merge.
- GitHub agent repository access is still read-only, so the review branch is retained locally with a complete Git bundle; no draft PR can be pushed under that identity yet.
- Removing Vercel's preview feedback injection is a hosting-setting follow-up. The attempted preview-feedback environment setting did not prevent injection. Production does not include that script.
- No new physical Safari iOS / Android run or field INP data is claimed.
