---
title: "Set Up Frontend Pages"
description: "Create Signup, Dashboard, Templates, and Pricing pages with shortcodes or blocks"
order: 29
section: waas
---

# Set Up Frontend Pages

WaaS expects four pages: **Signup**, **Dashboard**, **Templates**, and **Pricing**. Each one can use a shortcode or a block. A separate **WaaS Login** block is optional.

## Quick Setup

1. Go to **Waas → Settings → General** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=general`)
2. Open **Repair tools**
3. Click **Create/Repair Signup and Dashboard Pages**

That action creates or reuses all four pages and saves their IDs. The notice is **Signup and Dashboard pages checked.**

Confirm the dropdowns, then click **Save Changes**.

![Pages on General settings](../images/waas-pages-config.png)

| Setting | Default slug | Content |
|---------|--------------|---------|
| **Signup Page** | `/signup/` | `[grabwp_waas_signup]` or block **WaaS Signup** |
| **Dashboard Page** | `/dashboard/` | `[grabwp_waas_dashboard]` or block **WaaS Dashboard** |
| **Templates Page** | `/templates/` | `[grabwp_waas_templates]` or block **WaaS Template Browser** |
| **Pricing Page** | `/pricing/` | `[grabwp_waas_pricing]` or block **WaaS Pricing** |

## Shortcodes

### Signup

```
[grabwp_waas_signup]
```

Renders the signup preset from **Waas → Settings → Signup Flow**. The built-in **Default** preset includes account, plan, billing cycle, optional services, and payment. Change the steps in [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

### Dashboard

```
[grabwp_waas_dashboard]
```

Signed-out visitors on **WAAS Auth (Email signup)** see **Sign in to your dashboard**, an **Email address** field, and **Send verification code**.

### Templates

```
[grabwp_waas_templates]
```

Gallery with thumbnails, tag filters, search, and pagination. Attributes:

| Attribute | Notes |
|-----------|-------|
| `tags` | Comma-separated tag slugs. Only templates with at least one of these tags are loaded. |
| `filter-tags` | Comma-separated tag group slugs shown as pill buttons. Other groups use dropdowns. |
| `tags-browser` | `no` hides the filter toolbar. |
| `per-page` | Cards per page. Default `12`. `0` shows all, with no pagination. |
| `columns` | Cards per row, from 1 to 6. Default `4`. |

```
[grabwp_waas_templates per-page="9" filter-tags="industry"]

[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

Full attribute reference: [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates).

### Pricing

```
[grabwp_waas_pricing]
```

Plan cards from active plans, with monthly and yearly prices.

### Login (optional)

```
[grabwp_waas_login]
```

Standalone login card. The dashboard page already includes sign-in, so you only need this on a separate page.

## Blocks

In the block inserter, search the titles below. Blocks show a placeholder in the editor. The live output is on the frontend.

| Block | Replaces |
|-------|----------|
| **WaaS Signup** | `[grabwp_waas_signup]` |
| **WaaS Dashboard** | `[grabwp_waas_dashboard]` |
| **WaaS Template Browser** | `[grabwp_waas_templates]` |
| **WaaS Pricing** | `[grabwp_waas_pricing]` |
| **WaaS Login** | `[grabwp_waas_login]` |

**WaaS Template Browser** sidebar controls:

| Control | What it does |
|---------|----------------|
| **Limit by tags (pool filter)** | Same as `tags` |
| **Show tag browser toolbar** | Same as `tags-browser` |
| **Pill filter groups (filter-tags)** | Same as `filter-tags` |
| **Columns** | Cards per row |
| **Cards per page** | Same as `per-page` |

Block details: [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough).

## Link the Pages

1. Go to **Waas → Settings → General**
2. Set **Signup Page**, **Dashboard Page**, **Templates Page**, and **Pricing Page**
3. Click **Save Changes**

## Verify

1. **Signup** shows the account step (name and email) when you are signed out and **Auth Mode** is **WAAS Auth (Email signup)**
2. **Templates** lists active templates
3. **Pricing** lists active plans
4. **Dashboard** shows **Sign in to your dashboard** when you are signed out

---

**Next:** [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist)
