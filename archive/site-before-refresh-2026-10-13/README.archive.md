# Site before the October 2026 refresh

This is a verbatim snapshot of every tracked file at commit
`4e05e634be8b99226e4b82732529cf5e3275f0a1`, before the Astro migration.
It includes all 16 original articles, images, homepage copy, translation notes,
the bilingual Genjō Kōan component, configuration, and dependency lockfile.
`manifest.json` records SHA-256 checksums of the original files.

These files are historical content, not routes or public assets. The site build
reads only `src/content/translations/`; nothing under `archive/` is published.
Retired `/blog/` and `/posts/` URLs intentionally return 404s.

To recover an individual file, copy it from this directory. To inspect the
complete previous site, use a separate checkout of the commit above. Its build
scripts used Algolia credentials and should not be run merely to read content.
