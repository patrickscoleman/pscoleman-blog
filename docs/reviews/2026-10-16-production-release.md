# Approved production release

Patrick approved release with “Ship it.” The public Alloglot overview and five
exact-level guides were live and signed-out checks passed before release.

- Live site: https://pscoleman.me/
- Reviewed app commit: `21e72bd0432a84ba590c9c577a89429e5564f991`
- Production deployment: `dpl_5dRtBeEwHAKfcWWGhLa79MtEXte2`
- Immutable deployment: https://pscoleman-blog-efsgbclfw-patrickscolemans-projects.vercel.app/
- Vercel rebuilt the approved source with Production environment values; this was
  not a direct promotion of preview HTML with its noindex metadata.
- 60 deployment inputs compared byte-for-byte against the approved commit.
- Production key metadata confirms ALLOGLOT_LEVELS_KEY available; no secret value
  was read or changed.
- Built production routes checked before promotion; promotion succeeded.
- Public pscoleman.me checked in browser: approved portrait/name, language links
  without underlines, exact Native/8/3/1/0.1 values, canonical homepage URL,
  index/follow metadata and canonical sharing image URL. Translation index and
  Genjō Kōan reader also checked on the custom domain. French guide verified at
  its exact public 0.1 anchor.
- Production deployment HTTP check covers 23 pages/assets, expected 200/404s,
  crawlable content-page metadata, security headers, RSS/sitemap/robots, and
  sharing images. Direct shell fetches of pscoleman.me are blocked by this
  session's network proxy, so custom-domain validation uses the browser and
  HTTP/header validation uses its exact deployed build URL.
- Phone screenshot and HTTP results saved under the release evidence folder.

## Outstanding source-control step

GitHub still reports `patrick-aloglot-agent` has Read access. Source push / PR /
merge could not be completed. Patrick was asked to grant Write access; production
release proceeded under his explicit shipping approval. No GitHub identity was
switched and no existing working-tree edits were discarded.

The approved commit history remains in `/private/tmp/pscoleman-cursor-review`
and in `release/approved-site.bundle` (verified complete history) under the
session's visualization evidence directory. Source files are also synchronized
to the attached `codex/personal-notebook` worktree. Attempts to preserve a new
local branch in the original repository failed with an OS permission error
writing `.git/FETCH_HEAD`, including the elevated attempt; working files were
not changed. Reconcile and merge the approved branch once access is available.

Existing Lighthouse / native-device coverage limits remain as documented in the
final review. No paid monitoring or tracking was added.
