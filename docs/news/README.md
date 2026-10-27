# Daily news: first-release design checkpoint

This is a local, interactive design prototype, not an authenticated news service.
The personal site is unchanged. No scheduled processing or email endpoint exists.

## Preview

```sh
node scripts/news/preview.mjs
```

Open http://127.0.0.1:4322/. The server binds only to loopback. Edition, Sources,
and Public view are available. Sources support category changes, pause/resume,
recoverable removal, search, and a simulated incoming newsletter. Changes persist
in browser-local storage; real mail subscriptions are never altered.

The tracked fixture is intentionally generic. An owner can supply a private,
ignored JSON fixture using `--data /absolute/path/to/fixture.json`. Never commit
personal source inventories, mailbox data, personalized editions, or screenshots
to this public repository. This preview must not be deployed with private data.

## Updated first-release decisions

- Optimize for finishing: headlines, one or two short factual bullets, source
  links, and an explicit ending. A ten-minute ceiling is not a word target.
- Separate news from dated local events. Event identity includes venue, start
  time, timezone and canonical URL; suppress expired events, duplicate marketing,
  donation drives and repeated reminders. Recheck cancellations before inclusion.
- Keep broad news coverage, including consequential politics. No category quota.
- Auto-register recognizable newsletters delivered to the dedicated address.
  Identity uses verified publication/list identity, not the sending platform or
  display name. Preserve category overrides. Ambiguous or suspicious mail goes to
  a small review queue; subscription confirmations are never followed by the app.
- A paused source stays recognized. Drop new content from digest processing while
  retaining its configuration; do not create a backlog or unsubscribe its mailbox.
  Resuming takes fresh arrivals only. Removal leaves a tombstone until restored.
  Settings apply to subsequent editions; the published edition stays fixed.
  Recheck source state at publication so queued work cannot override a pause.
- Sources without stable authenticated identity require a trusted fallback or
  review; universal zero-touch recognition is not a credible guarantee.
- Free newsletters and permitted feeds first. A print subscription does not
  imply web access; mark access as free, subscription, or unknown only with
  evidence. Never infer an article's contents from a headline behind a paywall.
- Hacker News is discovery, not independent corroboration. Read the official API
  with bounded candidates and at most two selections per edition. Deduplicate
  against reporting, prefer the original URL, keep discussion links optional,
  distinguish launches/essays from reported news, and skip comments ingestion.
- Public output has independent source inputs and publication. Private selection,
  sources, follows, settings, and reading behavior must not influence it.

## Architecture and cost

Keep the production news app, database and credentials separate from the static
personal site and other applications. Proposed stack: Next.js, Supabase Auth and
Postgres with owner authorization, Inngest durable daily processing, and an inbound
email adapter. Start on available free tiers with paid inference disabled. Target
$0 incremental cost; verify any available free model allowance before relying on
it. If free inference is unsuitable, use a links/snippets edition until a measured
paid option is accepted. No paid accounts, top-ups, upgrades or automatic paid
fallbacks have been enabled.

Production ingress must verify the provider signature, replay/delivery identity,
dedicated recipient, and authenticated sender evidence. Forwarded authentication
requires trusted provider/ARC handling; never trust arbitrary Authentication-Results
or caller-supplied booleans. Bind authenticated publisher identity to List-ID so
one sender cannot impersonate another source's enabled state. The prototype model accepts already-verified metadata
for testing only and is not an ingress implementation. Sender changes need identity
aliases so they cannot override a pause. Strip remote HTML, trackers, account links,
unsubscribe tokens, and recipient-bearing URLs before any model input or citation.

## Release sequence and acceptance

1. Source feasibility and reading preview. Collect parse evidence, audit dates and
   access limitations, test mail fixtures, and show phone/desktop views.
2. Private foundation. Owner login, data authorization and source management;
   signed-out HTML, APIs, caches, metadata and previews reveal no private data.
3. Live email and daily publishing. Verify real delivery end to end, then test
   retries, duplicate deliveries, cost reservations, pause races, and partial runs.
4. Seven-day calibration. Review accuracy, brevity, breadth, repetition, cost and
   ability to stop. Release public headlines and navigation only after independence
   and privacy checks pass. Keep tested commit and rollback identifiers.

Production operation belongs to hosted infrastructure, never an open chat. Store
editorial policy, settings, source state, migrations, schedule, retention and a
recovery runbook durably. Suggested retention: 30 days for fetched source text,
90 days for editions, and retained source settings until removed. Include deletion
and export behavior and expiry of vendor logs/backups in the implementation review.

## Checks

```sh
node --test scripts/news/model.test.mjs
python3 scripts/news/mail-fixtures.py
npx prettier --check prototypes/news scripts/news docs/news
npm run check
npm run format:check
npm run build
```

Visual review: 320px, usual phone, 759px/761px around the 760px breakpoint,
desktop, keyboard focus and 200% text sizing. Existing translations and intentional
404s remain part of regression review. Personal evidence stays under ignored
`artifacts/news/` locally, not in public PR comments.

## Challenges and deferred work

- Failure mode: a successful pipeline still feels like homework. Cut volume before
  adding features; measure finishing and factual quality rather than clicks.
- Smaller version: a few reliable feeds and newsletters, one edition, one owner.
- Right problem: subscribing to more mail must not make reading more demanding.
- Bigger version: more entity watches and release/tour adapters after calibration.
- Parked until after seven usable editions: catch-up generation, transcripts,
  automatic subscriptions, paid discovery APIs, native app and calendar writing.
- No changes to AGENTS.md are needed. One Codex implementation owner is sufficient
  for this checkpoint; specialist perspectives are review lenses, not user research.
