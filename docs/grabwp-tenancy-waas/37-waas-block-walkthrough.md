---
title: "Block Walkthrough"
description: "Insert the WaaS Pricing, Signup, Template Browser, Login, and Dashboard blocks and set their inspector controls"
order: 37
section: waas
---

# Block Walkthrough

Five blocks in the **grabwp-waas** category match the shortcodes. Search the block inserter for the title. The editor shows a placeholder. The live markup renders on the front end. Attribute names and defaults are the same as the [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates).

| Inserter title | Block name | Shortcode |
|----------------|------------|-----------|
| **WaaS Template Browser** | `grabwp-waas/template-browser` | `[grabwp_waas_templates]` |
| **WaaS Pricing** | `grabwp-waas/pricing` | `[grabwp_waas_pricing]` |
| **WaaS Signup** | `grabwp-waas/signup` | `[grabwp_waas_signup]` |
| **WaaS Login** | `grabwp-waas/login` | `[grabwp_waas_login]` |
| **WaaS Dashboard** | `grabwp-waas/dashboard` | `[grabwp_waas_dashboard]` |

Wide and full alignment, plus margin and padding, are supported on all five. HTML editing is off. Login and Dashboard have no extra settings.

## Insert a block

1. Edit the page in the block editor.
2. Click **+** and search for the title, for example **WaaS Pricing**.
3. Insert the block.
4. Open **Settings → Block** (gear icon) and set the controls below.
5. Update the page and view it on the front end.

**Verify:** The front end matches a page that uses the equivalent shortcode with the same values.

## WaaS Template Browser

Placeholder title: **WaaS Template Browser**. It lists the pool filter, pill groups, toolbar, cards per page, and columns.

| Inspector label | Panel | Shortcode |
|-----------------|-------|-----------|
| **Limit by tags (pool filter)** | **Template Pool** | `tags` |
| **Show tag browser toolbar** | **Filter Toolbar** | `tags-browser` (`yes` when on) |
| **Pill filter groups (filter-tags)** | **Filter Toolbar** (only while the toolbar is on) | `filter-tags` |
| **Columns** | **Layout** | `columns` (1-6, reset 4) |
| **Cards per page** | **Pagination** | `per-page` (0-60, reset 12). `0` shows every template. |

Leave **Pill filter groups** blank for dropdowns only (no pill row). Groups you list become pills. The inspector help text mentions dropdowns for groups with more than two tags. The gallery itself shows a dropdown when a group has more than one tag in the pool.

## WaaS Pricing

Placeholder title: **WaaS Pricing**. Copy: **Plan cards, benefits, billing toggle, and comparison.** It notes whether comparison is included.

| Inspector label | Panel | Shortcode |
|-----------------|-------|-----------|
| **Highlighted plan ID** | **Pricing table** | `highlighted` |
| **Plan IDs** | **Pricing table** | `plans` |
| **Default billing cycle** | **Pricing table** | `default-cycle`: **Monthly** or **Yearly** |
| **CTA label** | **Pricing table** | `cta-label`. Blank uses **Start for free** / **Get started**. |
| **Show plan cards** | **Layout** | `show-cards` |
| **Show comparison table** | **Layout** | `show-comparison` |

**Highlighted plan ID** help: leave blank to auto-pick the middle paid plan as **Most popular**.

**Plan IDs** help: comma-separated plan IDs. Leave blank to show all active plans.

Cards come from the pricing table template. The comparison block is the pricing comparison template (**Compare plans**). Turn either toggle off to hide that part.

## WaaS Signup

Placeholder title: **WaaS Signup**. It shows **Flow:** and the preset label, then **Preview on the frontend.**

Presets are the named flows from **Waas → Settings → Signup Flow**. See [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow). If the list cannot load, the control falls back to **Default**.

| Inspector label | Panel | Shortcode |
|-----------------|-------|-----------|
| **Flow preset** | **Signup flow** | `flow`. **Default** is stored as an empty slug. |
| **Hide step descriptions** | **Display** | `hide-labels` |
| **Hide step titles** | **Display** | `hide-titles` |
| **Hide template thumbnail** | **Display** | `hide-thumbnail` |
| **Account** | **Step labels** | `label-account` |
| **Plan** | **Step labels** | `label-plan` |
| **Add-ons** | **Step labels** | `label-addons` |
| **Billing cycle** | **Step labels** | `label-cycle` |
| **Payment** | **Step labels** | `label-payment` |
| **Email verification** | **Step labels** | `label-otp` |

Each step label help line says to leave it blank for the preset or default label. **Flow preset** help: unknown slugs fall back to **Default**.

Built-in step labels, before a preset overrides them:

| Step | Label |
|------|-------|
| Account | **Create your account** |
| Plan | **Choose a plan** |
| Add-ons | **Optional Services** |
| Billing cycle | **Billing Cycle** |
| Payment | **Payment Method** |
| Email verification | **Verify your email** |

## WaaS Login and WaaS Dashboard

**WaaS Login** placeholder: **Displays the tenant owner login form. Preview on the frontend.**

**WaaS Dashboard** placeholder: **Displays the tenant dashboard. Preview on the frontend.**

No inspector fields. Behavior matches `[grabwp_waas_login]` and `[grabwp_waas_dashboard]`.

---

**See also:** [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates)
