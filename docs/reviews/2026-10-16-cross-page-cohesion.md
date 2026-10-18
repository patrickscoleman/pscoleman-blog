# Cross-page cohesion review — 16 October 2026

Preview: https://pscoleman-blog-nu056at87-patrickscolemans-projects.vercel.app/translations (application commit e33ffa1).

Reviewed the homepage, translation index, all four readers, 404, and six social cards through design, editorial, accessibility, performance, SEO/sharing, and maintenance lenses. Production remains held for approval.

| Perspective                 | Finding                                                                                                    | Change / evidence                                                                                                                                                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design                      | Index still used Special Elite; reader headings and navigation used a separate serif hierarchy.            | System monospace now covers page headings, index titles, next-work links and controls. Patrick's actual handwriting remains exclusive to his name; serif is reserved for literary prose. Decorative title periods removed.                           |
| Interaction / accessibility | Boxed original-text control differed from the bracketed portrait control.                                  | Bracketed blue control, 44 px target, visible keyboard focus and preserved pressed state. Keyboard test: 82 Japanese passages show, then hide. All seven page types pass axe at 320 px.                                                              |
| Context / editorial         | Homepage language footnote appeared on unrelated reading pages.                                            | Shared footer hides the note on routes without its reference. No extra client-side routing or JS. Translation wording, line breaks, author/source credit, and dates remain unchanged.                                                                |
| Performance                 | Index loaded three webfonts for UI text.                                                                   | Observed font responses: Special Elite 53,296 B + Source Serif Latin 50,936 B + Latin Extended 42,212 B = **146,444 B → 0 B**. Remove Special Elite dependency and loader; move serif CSS to reader-only layout.                                     |
| Visual consistency          | Reader background supplied two layers but inherited three sizing rules.                                    | Restore the same three-layer notebook background, with quieter ruling/dots behind long-form text. All pages retain the shared ink dividers, blue accents, and safe-area spacing.                                                                     |
| Sharing / reliability       | Homepage OG card retained the old typewriter font and original photo; reader cards used a heavy blue edge. | Homepage card now uses current illustration and vector contours from the actual handwriting font. All cards share notebook ruling/dotted guides. No extra browser font or JS request. Clean dependency install catches removed-package dependencies. |
| SEO / security              | Shared metadata and security behavior must survive the styling pass.                                       | Build-output checks cover H1s, canonicals, descriptions, structured data, social dimensions, feed, sitemap, manifest, 404 and header configuration. No auth/API/security-policy changes.                                                             |

## Validation

- Clean `npm ci --ignore-scripts`, `npm run check`, `npm run format:check`, `npm run build`, `npm run check:output` pass. Native dependencies work from their prebuilt packages.
- Seven local page types at 320 px and all seven deployed page types at 390 px: zero axe violations, no horizontal overflow. Index and longest reader title also checked at 390, 639, 640, 768, 1280 and 1920 px.
- 200% text-size fixture at 390 px: heading 60 px, prose 38 px, no site overflow. This is a fixture, not native device zoom.
- Original-text control works by keyboard and retains visible focus. Reader-to-index client navigation retains correct heading typography and hides the unrelated footnote.
- All six social cards generated at 1200×630; homepage and representative reader cards visually inspected. Handwriting counters remain open; current portrait has no old frame/background box.
- Existing translation/archive integrity checks pass: four works, ten haiku, 82 English / 82 Japanese Genjō Kōan paragraphs, 161 archived originals.
- Font response measurements use actual browser resource timing through an audit proxy. The deployed index also confirms zero font requests. These are asset savings, not a claim about Lighthouse or field Core Web Vitals.

## Limits and approval

The prior final-review limits still apply: fresh throttled Lighthouse and native Safari/Android/Firefox testing are not claimed. Public Alloglot guide readiness remains a separate launch gate. No production deployment or merge. The local branch and bundle retain the review commits; GitHub agent write access is still unavailable.
