# AGENTS.md: rules for any agent working in grabwp-docs

docs.grabwp.com is the public knowledge base for GrabWP (Docusaurus). It is the source that CS replies, social posts, the website and plugin UI help links all point to. Treat every published URL and anchor as a public contract.

## Who may change what
- Only Emmy writes here, on a feature branch (`docs/<task-id>-<slug>`) with a PR. Chú merges. Never push to `main`.
- Other agents (CS, social, coding agents) do not edit pages. Send a request to Emmy: in project-hub, a new file `grabwp/handoffs/agents/<YYYY-MM-DD>-<from>-to-emmy-docs-<topic>.md` with the page URL, what is wrong or missing, and evidence. A coding agent puts the request in its final report instead.

## Build and check
- Install with the existing lockfile; no new dependencies without Chú (keep `package-lock.json` and `pnpm-lock.yaml` in sync if a dep is ever approved).
- `npm run build` must pass before a PR. Cloudflare builds `main` on merge.
- Facts come from prod code (`~/grabwp-prod`, branch `prod`) and `internal/facts.md` (not built, internal only). Code wins over docs: if they disagree, fix the doc or report the code bug, never write around it.

## Page template
- Front matter: `title`, `description`, `tags`, `last_verified_date` (YYYY-MM-DD, the date you checked it against prod).
- Body starts with **Short answer** (2 or 3 sentences), then **What you need**, then steps.
- One topic = one page. If a topic is already covered, edit that page.

## Stable links (contract)
- Every section that the plugin UI, `cs/` or the website may link to gets an explicit id: `## Free trials {#free-trials}`.
- A published `{#id}` never changes, even if the heading text does.
- Moving or renaming a page always adds a line to `static/_redirects` (`/old /new 301`). Never delete a published route without a redirect.
- Plugins link only to anchors listed in the anchor map Emmy keeps. Need a new one: ask Emmy first, the page ships before the link.

## Content rules
- Docs describe released behaviour. A new feature gets its page in the same release, marked "since x.y".
- Do not put on public pages: prices, discounts, promises, roadmap details or dates, customer names or data, CS-only workarounds.
- No em dashes. Plain English for low-tech readers. EN is the source; VI comes later and each VI page records the EN date it was synced from.
- Screenshots come from the project-hub asset library (`docs-image-map.json` + `scripts/sync_docs_images.py`). Do not add one-off images.

## Agent index
- `static/llms.txt` lists every page: route, title, Short answer, stable anchors. Update it in the same PR as any page add, move or anchor change.
