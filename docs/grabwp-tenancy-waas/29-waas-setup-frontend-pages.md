---
title: "Set Up Frontend Pages"
description: "Create signup, dashboard, and template browser pages using shortcodes or Gutenberg blocks"
order: 29
section: waas
---

# Set Up Frontend Pages

Your WaaS platform needs three customer-facing pages: **Signup**, **Dashboard**, and **Templates**. Each page can use either a shortcode or a Gutenberg block.

## Quick Setup (Auto-Create)

The fastest way: go to **WaaS → Settings → General** and click the **Create/Repair Signup and Dashboard Pages** button. This creates all three pages with the correct shortcodes.

Then select each page in the corresponding dropdown and save settings.

## Manual Setup

### Option A: Using Shortcodes

Create three WordPress pages with these shortcodes:

#### 1. Signup Page

Create a new page (e.g., title: "Signup", slug: `/signup/`).

Add this shortcode as the page content:

```
[grabwp_waas_signup]
```

This renders the complete signup flow:
- Plan selection
- Template picker (if templates exist)
- Site details form (subdomain, email)
- Payment redirect (for paid plans)
- Provisioning status

#### 2. Dashboard Page

Create a new page (e.g., title: "Dashboard", slug: `/dashboard/`).

```
[grabwp_waas_dashboard]
```

This renders the tenant owner dashboard:
- Site overview and quick links
- Subscription status and billing
- Custom domain management
- Backup and restore
- Account settings (email, password)

#### 3. Templates Page

Create a new page (e.g., title: "Templates", slug: `/templates/`).

```
[grabwp_waas_templates]
```

This renders the template browser gallery with:
- Template cards with thumbnails and descriptions
- Tag-based filtering (pills and dropdowns)
- Search
- Pagination
- Preview and "Use this template" buttons

> **Customize the template browser** with shortcode attributes. See [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates) for all options.

Common configurations:

```
// Show all templates, default filters
[grabwp_waas_templates]

// Show 9 templates per page, industry tags as pills
[grabwp_waas_templates per-page="9" filter-tags="industry"]

// Curated gallery, no filters, no pagination
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

### Option B: Using Gutenberg Blocks

If you prefer the block editor, use the Gutenberg blocks instead of shortcodes.

#### 1. Signup Block

1. Edit your Signup page
2. Click **+** (block inserter) and search for **"WaaS Signup"**
3. Insert the block
4. Save the page

#### 2. Dashboard Block

1. Edit your Dashboard page
2. Search for **"WaaS Dashboard"**
3. Insert the block - supports wide and full-width alignment
4. Save

#### 3. Template Browser Block

1. Edit your Templates page
2. Search for **"GrabWP Template Browser"**
3. Insert the block
4. Configure via the **Settings sidebar** (click the gear icon):

| Control | What it does |
|---------|-------------|
| **Limit by tags** | Server-side filter - only load templates with these tags |
| **Show tag browser toolbar** | Toggle the filter toolbar on/off |
| **Pill filter groups** | Which tag groups show as pill buttons vs. dropdowns |
| **Cards per page** | Number of template cards per page (0 = show all) |

5. Save the page

> **Note:** Blocks show a placeholder in the editor. The full gallery renders only on the frontend.

See [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough) for detailed block usage.

## Link Pages in WaaS Settings

After creating the pages, connect them:

1. Go to **WaaS → Settings → General**
2. Set each dropdown:
   - **Signup Page** → your Signup page
   - **Dashboard Page** → your Dashboard page
   - **Templates Page** → your Templates page
3. Click **Save Settings**

![Pages configuration](../images/waas-pages-config.png)

## Shortcode vs Block Comparison

| Feature | Shortcode | Block |
|---------|-----------|-------|
| **Ease of use** | Paste shortcode text | Visual editor insert |
| **Configuration** | Attributes in shortcode string | Inspector sidebar controls |
| **Preview in editor** | Shows shortcode text | Shows placeholder |
| **Frontend output** | Identical | Identical |
| **Theme compatibility** | Works everywhere | Requires block-compatible theme |

Both produce the same frontend output. Choose whichever you're more comfortable with.

## Test the Pages

After setup, visit each page on the frontend:

1. **Signup page** - should show plan selection and signup form
2. **Templates page** - should show the template gallery with your templates
3. **Dashboard page** - should show login/OTP form (when not logged in) or the dashboard (when logged in)

---

**Next:** [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist)
