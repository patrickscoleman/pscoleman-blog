# Filled arrows production release

Patrick explicitly authorized shipping updates after verification, without another approval round. AGENTS.md now records that policy.

- Live: https://pscoleman.me/
- App commit: 13d49b1
- Production deployment: dpl_TpdspnSeAfXsqQpMRX5LYyUz6ELf
- Immutable URL: https://pscoleman-blog-qqnedn8n9-patrickscolemans-projects.vercel.app/
- Previous production rollback target: dpl_5dRtBeEwHAKfcWWGhLa79MtEXte2

## Changes

Filled triangular arrowheads with flat bases replace the open chevrons. Each arrow is a single filled silhouette, avoiding dark alpha-overlap seams. Heads follow stroke thickness and are capped for short branches; the final head stays below 20% of shaft length. The final vector points toward the first bio paragraph, measured from the actual layout. Its orientation feeds into the final parent geometry, so branches join it continuously. ResizeObserver updates that target without per-frame layout reads.

Animation runs at 1.25× speed: approximately 13.4s rather than 16.8s, preserving the two-second entrance delay. Pause/resume, reduced-motion static controls, worker rendering, stable-frame caching and the subtle curved finish remain. This release also includes the preceding verified preview's performance improvements, mobile link behavior, dotted-margin removal, and phone image-size candidate.

## Verification

- `npm run check`, `npm run format:check`, `npm run build`, `npm run check:output` all pass.
- Actual renderer tests verify one filled silhouette per arrow, perpendicular flat bases across the sequence, compact final head and target direction for desktop and mobile angles.
- Desktop and 390px browser fixtures inspected at the single-arrow stage. Actual aim angles: desktop 2.965 radians, phone down-left. Local fixtures intentionally pause at that stage for screenshots; this behavior is not shipped.
- 320/390/639/640/1280px checks have no overflow and no axe violations. Patterned-background contrast remains a manual item. These are Chromium fixtures, not physical-phone tests.
- Production build checked before promotion: six content routes, feeds/robots/sitemap, social images and intended 404 passed; content pages index/follow. Security headers unchanged.
- Promoted successfully, then verified pscoleman.me itself: worker renderer, target direction, canonical production indexing, Native/8/3/1/0.1 live levels, no browser errors.

Evidence: `/Users/patrick/.codex/visualizations/2026/10/14/01a137d3-45ad-7bf0-9c3b-f2562a40f28c/flat-arrows/`.

GitHub source push/merge remains pending the existing agent access limitation. Tested commits are preserved in the local review clone, attached worktree files, and a complete Git bundle. No alternate GitHub identity was used.

## Final production measurements

PageSpeed Insights report: https://pagespeed.web.dev/analysis/https-pscoleman-me/hul2yljwcv?form_factor=mobile (17 October 2026, 15:07 PDT; Lighthouse 13.5.0).

| Profile | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile, Slow 4G | 97 | 100 | 100 | 100 | 1.9s | 0ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.5s | 20ms | 0 |

Mobile FCP is 0.9s and Speed Index 4.1s. The remaining score does not warrant delaying or suppressing the animation to influence measurement. These are laboratory results; the report's rolling 28-day field data predates this release.

The local full-cycle probe measured 13,450ms of animation after the two-second delay, median frame interval 16.7ms, p95 18ms, zero layout shift and no animation-period long tasks. This is one Chromium run, not a physical-device frame-rate guarantee. The complete 64-to-1-to-64 sequence was observed. Evidence includes motion.json and both Lighthouse snapshots.
