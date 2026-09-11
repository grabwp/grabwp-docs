---
title: "Block Walkthrough: Template Browser"
description: "Configure the GrabWP Template Browser Gutenberg block using the visual Inspector sidebar"
order: 37
section: waas
---

# Template Browser - Gutenberg Block Walkthrough

The `grabwp-waas/template-browser` block gives site editors a visual Inspector UI to configure the template gallery without touching shortcode strings. The original `[grabwp_waas_templates]` shortcode is fully preserved and works exactly as before.

## How to Use the Block

1. Open any page in the block editor
2. Click **+** (block inserter) and search for **"GrabWP Template Browser"**
3. Insert the block - it shows a descriptive placeholder in the editor canvas
4. Configure via the **Settings sidebar → Block settings** (gear icon)
5. Save/publish - the frontend renders the full template gallery

> **Note:** The block shows a placeholder in the editor. The live gallery renders only on the frontend.

## Inspector Controls

Open the block sidebar (gear icon) to configure:

| Control | Inspector label | Shortcode equivalent |
|---|---|---|
| Text | **Limit by tags (pool filter)** | `tags="ecommerce,blog"` |
| Toggle | **Show tag browser toolbar** | `tags-browser="no"` |
| Text | **Pill filter groups** | `filter-tags="industry"` |
| Range (0–60, step 4) | **Cards per page** | `per-page="12"` |

## Shortcode Attribute Mapping

| Shortcode attr | Block attribute | Type |
|---|---|---|
| `tags` | `tags` | string |
| `filter-tags` | `filterTags` | string |
| `tags-browser` (`yes`/`no`) | `tagsBrowser` | boolean |
| `per-page` | `perPage` | integer |

## How It Works

```
block.json
  └─ render: "file:./render.php"     → PHP server render
  └─ editorScript: "file:./index.js" → Gutenberg editor UI

render.php
  └─ maps block attributes → shortcode atts array
  └─ calls GrabWP_Tenancy_WaaS_Templates_Shortcode::render($atts)
  └─ wraps in get_block_wrapper_attributes() div

GrabWP_Tenancy_WaaS_Blocks
  └─ register_block_type_from_metadata( blocks/template-browser/ )
  └─ enqueue_block_assets → loads CSS/JS only when block is present
```

> No build step (Node/npm) is required. `index.js` is plain ES5/ES2015 using globally available `wp.*` packages that WordPress loads automatically in the block editor.

## Block vs Shortcode

Both produce identical frontend output. Choose based on your workflow:

| | Shortcode | Block |
|---|---|---|
| **Configure** | Edit attribute strings | Visual sidebar controls |
| **Preview** | Shows shortcode text | Shows placeholder |
| **Theme support** | Works everywhere | Requires block-compatible theme |
| **Best for** | Developers, copy-paste setup | Site editors, visual workflow |

---

**See also:** [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates) - all shortcode attributes and URL parameters
