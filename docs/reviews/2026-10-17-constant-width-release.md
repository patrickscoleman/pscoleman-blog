# Constant-width branching and interests copy

- App commit: 0d52ffb.
- Live: https://pscoleman.me/
- Deployment: dpl_DVVVxTFSdwHtHnd8NzGcCjyzNPjv.
- Immutable URL: https://pscoleman-blog-9vctg29yo-patrickscolemans-projects.vercel.app/
- Rollback: dpl_TpdspnSeAfXsqQpMRX5LYyUz6ELf.

Each arrow retains its own image-derived shaft and head width as it grows or retracts. Only longitudinal geometry changes, including head depth close to a junction. Zero-length strokes are omitted. This applies in both branching directions; the compact filled head, final bio direction and curved finish remain. Copy follows Patrick's supplied wording exactly.

Verification: check, format:check, build and check:output pass. Geometry tests cover all scales and both zero-length endpoints. Actual canvas-path tests ensure the retracting parent's shaft radius and head width remain constant. Local Chromium full cycle: 13.43s, median 16.7ms/p95 18ms frame interval, no animation-period long tasks, CLS 0. Responsive 320/390/639/640/1280 checks: no overflow or axe violations. Reduced-motion static controls preserved. Physical phones and a new Lighthouse run were not tested for this narrow geometry/copy change; prior Lighthouse numbers are not claimed as a new measurement.

The production deployment was checked before promotion, then pscoleman.me checked afterward: new copy, live Native/8/3/1/0.1 levels, no browser errors. Evidence and screenshots: /Users/patrick/.codex/visualizations/2026/10/14/01a137d3-45ad-7bf0-9c3b-f2562a40f28c/constant-width/. Desktop screenshot is production; phone is a local responsive fixture (local levels unavailable because no API key is loaded locally).

GitHub source merge remains pending repository access. The tested changes are copied to the attached worktree and Git history is preserved in release.bundle.
