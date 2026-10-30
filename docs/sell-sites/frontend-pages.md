---
title: "Frontend pages, shortcodes and blocks"
description: "The four public pages WaaS needs (signup, dashboard, templates, pricing), how to repair them, and how to build them with shortcodes or blocks."
sidebar_label: "Frontend pages"
tags: [settings, plan-waas, for-operator]
last_verified_date: "2026-10-30"
---

**Short answer:** WaaS needs four public pages: **Signup**, **Dashboard**, **Templates** and **Pricing**. WaaS creates them when you activate it, and **Create/Repair Signup and Dashboard Pages** recreates any that go missing. Each page holds one shortcode or one block, which you can place on your own designed pages instead.

**Needs:** Pro + WaaS

## The four pages

| Setting | Default address | Content |
|---|---|---|
| **Signup Page** | `/signup/` | `[grabwp_waas_signup]` or the **WaaS Signup** block |
| **Dashboard Page** | `/dashboard/` | `[grabwp_waas_dashboard]` or the **WaaS Dashboard** block |
| **Templates Page** | `/templates/` | `[grabwp_waas_templates]` or the **WaaS Template Browser** block |
| **Pricing Page** | `/pricing/` | `[grabwp_waas_pricing]` or the **WaaS Pricing** block |

An optional **WaaS Login** block (`[grabwp_waas_login]`) shows a standalone sign-in card. The dashboard page already includes sign-in, so you only need it on a separate page.

## Check or repair the pages

1. Go to **Waas > Settings > General**.
2. Open **Repair tools** and click **Create/Repair Signup and Dashboard Pages**. It creates or reuses all four pages and saves them. The notice is **Signup and Dashboard pages checked.**
3. Check the four page dropdowns. Each has a **View** link.
4. Click **Save Changes**.

![Pages on General settings](../images/waas-pages-config.png)

To use a page you designed yourself, add the shortcode or block to it and pick it in the matching dropdown.

## What each page does

**Signup.** Shows the signup flow from **Waas > Settings > Signup Flow**. The built-in **Default** flow covers account, plan, billing cycle, optional services and payment. See [Signup flow](/sell-sites/signup-flow).

**Dashboard.** The customer's control panel. Signed-out visitors on **WAAS Auth (Email signup)** see **Sign in to your dashboard**, an **Email address** field and **Send verification code**.

**Templates.** The template gallery with thumbnails, tag filters, search and pages. A card's **Get started** button opens signup with that template.

**Pricing.** Plan cards for the active plans, with monthly and yearly prices and an optional comparison table.

Shortcode attributes, such as how many templates show per page, are on [Shortcodes, blocks and emails](/sell-sites/shortcodes-blocks-emails). For example:

```
[grabwp_waas_templates per-page="9" filter-tags="industry"]

[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

## Use the blocks

The five blocks are in the **grabwp-waas** category. The editor shows a placeholder; the real output shows on the live page. Each block supports wide and full alignment, margin and padding. HTML editing is off.

| Inserter title | Block name | Same as |
|---|---|---|
| **WaaS Template Browser** | `grabwp-waas/template-browser` | `[grabwp_waas_templates]` |
| **WaaS Pricing** | `grabwp-waas/pricing` | `[grabwp_waas_pricing]` |
| **WaaS Signup** | `grabwp-waas/signup` | `[grabwp_waas_signup]` |
| **WaaS Login** | `grabwp-waas/login` | `[grabwp_waas_login]` |
| **WaaS Dashboard** | `grabwp-waas/dashboard` | `[grabwp_waas_dashboard]` |

**To insert a block**

1. Edit the page in the block editor.
2. Click **+** and search for the title, for example **WaaS Pricing**.
3. Insert the block.
4. Open the block settings (gear icon) and set the controls below.
5. Update the page and view it live. It should match a page using the shortcode with the same values.

### WaaS Template Browser

| Control | Panel | Shortcode attribute |
|---|---|---|
| **Limit by tags (pool filter)** | **Template Pool** | `tags` |
| **Show tag browser toolbar** | **Filter Toolbar** | `tags-browser` (`yes` when on) |
| **Pill filter groups (filter-tags)** | **Filter Toolbar** (only while the toolbar is on) | `filter-tags` |
| **Columns** | **Layout** | `columns` (1 to 6, default 4) |
| **Cards per page** | **Pagination** | `per-page` (0 to 60, default 12; `0` shows every template) |

Leave **Pill filter groups (filter-tags)** blank to show dropdowns only. Groups you list become pill buttons. In the gallery, a group shows as a dropdown when it has more than one tag in the pool.

### WaaS Pricing

The placeholder reads **Plan cards, benefits, billing toggle, and comparison.**

| Control | Panel | Shortcode attribute |
|---|---|---|
| **Highlighted plan ID** | **Pricing table** | `highlighted`. Leave blank to mark the middle paid plan **Most popular**. |
| **Plan IDs** | **Pricing table** | `plans`. Comma-separated. Leave blank for all active plans. |
| **Default billing cycle** | **Pricing table** | `default-cycle`: **Monthly** or **Yearly** |
| **CTA label** | **Pricing table** | `cta-label`. Blank uses **Start for free** or **Get started**. |
| **Show plan cards** | **Layout** | `show-cards` |
| **Show comparison table** | **Layout** | `show-comparison` (the **Compare plans** table) |

### WaaS Signup

The placeholder shows **Flow:** with the flow name. Flows are the presets on **Waas > Settings > Signup Flow**. If the list cannot load, or the slug is unknown, the block uses **Default**.

| Control | Panel | Shortcode attribute |
|---|---|---|
| **Flow preset** | **Signup flow** | `flow` (**Default** is stored as an empty value) |
| **Hide step descriptions** | **Display** | `hide-labels` |
| **Hide step titles** | **Display** | `hide-titles` |
| **Hide template thumbnail** | **Display** | `hide-thumbnail` |
| **Account** | **Step labels** | `label-account` |
| **Plan** | **Step labels** | `label-plan` |
| **Add-ons** | **Step labels** | `label-addons` |
| **Billing cycle** | **Step labels** | `label-cycle` |
| **Payment** | **Step labels** | `label-payment` |
| **Email verification** | **Step labels** | `label-otp` |

Leave a step label blank to keep the flow's own label. The built-in labels are **Create your account**, **Choose a plan**, **Optional Services**, **Billing Cycle**, **Payment Method** and **Verify your email**.

### WaaS Login and WaaS Dashboard

No settings. They work like `[grabwp_waas_login]` and `[grabwp_waas_dashboard]`.

## Check that it works

Signed out, in a private window:

1. **Signup** shows the account step (name and email).
2. **Templates** lists your active templates.
3. **Pricing** lists your active plans.
4. **Dashboard** shows **Sign in to your dashboard**.

## Related

- [Signup flow](/sell-sites/signup-flow)
- [Appearance](/sell-sites/appearance)
- [Shortcodes, blocks and emails](/sell-sites/shortcodes-blocks-emails)
- [Templates](/sell-sites/templates)
