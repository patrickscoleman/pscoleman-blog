# Language spacing and sharing-card label

Held for Patrick's visual review; preview only.

- Footnote numeral starts 2px after “Languages” instead of sitting in the middle of a 24px box. Its 24×24px hit area remains, positioned without enlarging the heading's line box.
- Language names and bracketed levels stay together, with a 4px internal gap. Entries retain 28px tap height; rows align consistently, with less excess vertical space and no extra list bottom margin.
- Translation sharing cards use a neutral `[Translations]` section marker, with neither blue color nor underline. Actual website navigation links retain their existing behavior.
- Required check, formatting, production build and output checks pass. No content, API, dependencies, browser JavaScript or font-loading changes.

## Deployed verification

Preview: https://pscoleman-blog-jkus0hbc5-patrickscolemans-projects.vercel.app/
App commit: `3c329ed`; deployment `dpl_8T48mhmVbuysv1wY6FPD4XGF4i6q` Ready.

- At 390px, Languages heading height is 18px (was 24.5px); the real-level list is 58px (was 73px). Footnote remains a 24×24px target.
- Actual levels checked at 320, 390, 639, 640 and 1280px, with no horizontal overflow. Wrapping remains intact across the desktop interest-grid breakpoint.
- Keyboard footnote navigation focuses the footer note, and the return link focuses the reference.
- Local axe fixture against the deployed homepage at 390px: zero violations. Texture-related contrast limitations from the prior audit still apply.
- Deployed index and longest-title sharing PNGs return 200 and match the reviewed local files byte-for-byte.
- Evidence: `language-spacing` folder alongside the prior `sharing` folder; phone and desktop details, sharing cards, and responsive/axe results.

No merge or production release. No new assets loaded by the website.
