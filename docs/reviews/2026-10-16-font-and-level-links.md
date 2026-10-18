# Font counters and language-guide links

Review-only changes requested by Patrick:

- Normalize even-odd tracing contours to nonzero font winding. R and O counters
  stay open in both the word ligatures and individual-letter fallback. The
  shipped WOFF2 regression check rasterizes counter samples; font size fell from
  4696 to 4684 bytes and advances/metrics remain unchanged.
- Bracket level labels, retain API strings/native/unavailable distinctions, and
  use one language-plus-level link target with visible focus. The smaller
  linked caption acts as a source footnote.

## Production hold: Alloglot guide deployment

The public overview is configured as https://app.aloglot.com/levels.
Per-language links use validated API explanationUrl values, unchanged.
Unauthenticated HTTP checks on 2026-10-16 found /levels plus en, es, ja, ko,
fr guide URLs redirecting to /signin?next=... (the final HTTP 200 is the
sign-in page, not a working guide). Links are enabled only for Patrick's
requested combined review. Do not merge/promote this version before confirming
that the overview and all five API-provided guide URLs work signed out,
including native and fractional-level anchors. Patrick was given a prompt for
his Claude Alloglot session; no API credential changes are required.
