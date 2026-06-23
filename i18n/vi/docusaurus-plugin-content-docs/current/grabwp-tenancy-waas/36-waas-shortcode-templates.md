---
title: "Shortcode Reference: Template Browser"
description: "All attributes for [grabwp_waas_templates] — pool filtering, tag pills, pagination, and URL parameters"
order: 36
section: waas
---

# `[grabwp_waas_templates]` — Shortcode Reference

Renders the template browser gallery with optional server-side pre-filtering and configurable client-side filter toolbar.

---

## Shortcode Attributes

### `tags`
**Type:** comma-separated tag slugs  
**Default:** _(empty — show all active templates)_

Server-side pool filter. Only templates that carry **at least one** of the listed tags are loaded into the gallery. Reduces the card pool before anything else runs.

```
[grabwp_waas_templates tags="ecommerce,portfolio"]
```

---

### `filter-tags`
**Type:** comma-separated **tag group** slugs  
**Default:** _(empty)_

Controls which tags appear as **pill buttons** in the primary filter row, and which groups get secondary `<select>` dropdowns.

| `filter-tags` value | Pill row | Secondary selects |
|---|---|---|
| _(empty)_ | All pool tags | None (everything is in pills) |
| `"industry"` | Tags from the `industry` group | All other groups with ≥ 2 values |
| `"industry,feature"` | Tags from `industry` + `feature` | All remaining groups with ≥ 2 values |

> **Note:** A group is either pills **or** a select — never both.

```
[grabwp_waas_templates filter-tags="industry"]
```

---

### `tags-browser`
**Type:** `yes` / `no`  
**Default:** `yes`

Set to `no` to hide the entire filter toolbar (pill row + selects + search box). Useful for pages that show a curated, pre-filtered subset with no user-facing filters.

```
[grabwp_waas_templates tags="portfolio" tags-browser="no"]
```

---

### `per-page`
**Type:** integer  
**Default:** `12`

Number of template cards per page. Set to `0` to disable pagination and show all templates at once.

```
[grabwp_waas_templates per-page="9"]
[grabwp_waas_templates per-page="0"]
```

---

## URL Parameters

Recognised on page load. Ignored when `tags-browser="no"`.

### `template_tag`
**Type:** tag slug

Pre-selects a tag pill on page load, equivalent to the user clicking that pill. Works on top of any server-side `tags=` filter.

```
https://example.com/templates/?template_tag=ecommerce
```

Combine with `tags=` to pre-filter the pool **and** pre-select a pill:

```
/templates/?template_tag=woocommerce
```
Shortcode: `[grabwp_waas_templates tags="ecommerce" filter-tags="industry"]`  
Effect: pool is pre-filtered to ecommerce templates, then `woocommerce` pill is highlighted on load.

---

### `grabwp_waas_preview`
**Type:** template slug

Bypasses the normal page render entirely and serves the iframe preview for the given template. Added automatically by "Preview" buttons; not for shortcode use.

```
https://example.com/?grabwp_waas_preview=el-restaurant-pro
```

---

## Client-Side Filters (Toolbar)

All filters are applied in the browser without a page reload. They stack — all active conditions must match.

| Filter | UI element | Matches against | Data attribute |
|---|---|---|---|
| Tag pill | Button row | `data-tags` (space-separated tag slugs) | `data-filter-dim="tag"` |
| Group select | `<select>` per tag group | `data-tags` (any tag in the group) | `data-filter-select="tag-group"` |
| Category select | `<select>` | `data-cat` | `data-filter-select="cat"` |
| Text search | `<input type="search">` | `data-name` + `data-tags` | `id="grabwp-waas-tpl-search"` |

> Category select only appears when there are no tag pills **and** more than one distinct category exists in the pool.

> Group selects appear automatically for any tag group that has **≥ 2 distinct values** present in the pool and is **not** listed in `filter-tags`.

---

## Common Recipes

```
// Full browser — all templates, all tags as pills
[grabwp_waas_templates]

// Industry tag pills + theme/builder selects in secondary bar
[grabwp_waas_templates filter-tags="industry"]

// Pre-filtered to Elementor templates, 9 per page
[grabwp_waas_templates tags="elementor" per-page="9"]

// Curated showcase — no filters, no pagination
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]

// Page linked to with ?template_tag=restaurant pre-selected
[grabwp_waas_templates filter-tags="industry"]
// URL: /templates/?template_tag=restaurant
```

---

**See also:** [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough) — Gutenberg block equivalent with visual Inspector UI
