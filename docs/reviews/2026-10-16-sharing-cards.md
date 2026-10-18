# Sharing-card review and public level guides

Status: held for Patrick's visual approval. Preview only; no merge or production release.

## Design decisions, ranked

| Perspective | Finding | Improvement |
| --- | --- | --- |
| Brand / design | The uppercase sans-serif labels looked like a different site. | Shared monospace header: blue square, lowercase `pscoleman.me:~`, matching navigation and selected Translations underline. |
| Art direction | Old card paper had only margin dots and heavier rules. | Match the site's paper color, 32px rules, 32×8 dotted grid, original grain tile, margin guides and original tapered ink-rule asset. |
| Social / mobile | The image must still identify its subject at feed size. | Larger handwriting and portrait, clear title/author hierarchy, reserved space for the longest title to wrap into two lines. Reviewed all six cards at 390px wide. |
| Accessibility / content | Attribution should survive sharing independently of the page. | Keep each work's original title, author, source language and translator. Existing descriptive image alt text and page metadata retained. |
| Performance / engineering | Matching typography should not add page downloads. | Liberation Mono (an existing CSS fallback) is read only while building static PNG cards. No new browser font, JS, dependency or external request. Shared server-only asset helper. |
| Security / maintenance | Public guides need the canonical destination and exact selected level. | Footer overview now uses `app.alloglot.com`; verified all five actual API-provided destinations and exact anchors with signed-out UI. No token or API behavior changes. |

## Verification

- `npm run check`, `npm run format:check`, `npm run build`, `npm run check:output`: pass in the full validation directory (including immutable archive).
- Six generated PNGs are 1200×630. Homepage 272,779 bytes; index/reader cards 98,172–112,064 bytes. The fuller paper texture increases image bytes; these files are for sharing crawlers, not page rendering.
- Visual review includes all six images at 390px wide and full-size homepage / longest title. R/O counters remain open; no clipped title or portrait.
- Canonical public overview loads signed-out. English Native, Spanish 8, Japanese 3, Korean 1 and French 0.1 all stay on their public guide URL and have their exact `level-*` target present. Sign in / Sign up remain offered in the public header, rather than being required.
- Library license retained with the card-only font; no system font is redistributed.

## Limits

- These are the actual generated cards, not screenshots of X/LinkedIn/iMessage previews. Social applications may retain an older cached card until re-scraped.
- No new Lighthouse or real-device claim: page CSS, browser components, animation and content layout are unchanged by this pass.
- Original checkout untouched; review files synced to the attached worktree without altering its unrelated changes.

## Deployed review

Preview: https://pscoleman-blog-2hg9ff0up-patrickscolemans-projects.vercel.app/

App commit: `54aae50`. Vercel deployment `dpl_G5iGkPehYKyEzogFN5k2Ftsnjp7r` is Ready.
All six deployed sharing URLs return 200 image/png. Five reader/index cards match
the locally reviewed images byte-for-byte. The homepage PNG is 272,845 bytes on
Vercel (66 bytes larger after platform-specific portrait rasterization) and was
visually rechecked. Homepage HTML still preloads only its original handwriting
WOFF2, with no social-card font. Real levels and canonical overview verified in
the deployed page; 390px layout has no horizontal overflow. Phone and desktop
screenshots saved with the six sharing images in the `sharing` evidence folder.
