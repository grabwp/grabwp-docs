---
title: "Shortcode Reference"
description: "Attributes for the template browser, pricing table, signup flow, login, and dashboard shortcodes"
order: 36
section: waas
---

# Shortcode Reference

Place these shortcodes on the pages selected under **Waas → Settings → General** (signup, dashboard, templates, and pricing). The same output is available as blocks. See [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough).

| Shortcode | Page |
|-----------|------|
| `[grabwp_waas_templates]` | Template gallery |
| `[grabwp_waas_pricing]` | Plan cards and comparison |
| `[grabwp_waas_signup]` | Signup wizard |
| `[grabwp_waas_login]` | Login form |
| `[grabwp_waas_dashboard]` | Tenant dashboard |

`[grabwp_waas_login]` and `[grabwp_waas_dashboard]` take no attributes.

## `[grabwp_waas_templates]`

Renders active templates. Cards link to the signup page with `?template=<slug>`. The overlay button label is **Get started**.

| Attribute | Default | Notes |
|-----------|---------|-------|
| `tags` | empty | Comma-separated tag slugs. The pool keeps templates that have **at least one** of these tags. |
| `filter-tags` | empty | Comma-separated **tag group** slugs. Those groups become pill buttons, including **All Tags**. Leave empty for no pills. |
| `tags-browser` | `yes` | `no` hides pills, group dropdowns, and the search box. |
| `per-page` | `12` | Cards per page. `0` loads the full set and turns pagination off. |
| `columns` | `4` | Cards per row. Clamped to 1-6. |

`filter-tags` and dropdowns:

- A group listed in `filter-tags` is pills only.
- Any other group that has **more than one** tag in the current pool becomes a `<select>`. The first option is **All &lt;group label&gt;**.
- A group is not both a pill row and a dropdown.
- The search box placeholder is **Type to search templates...**.

Pills, dropdowns, and search call the templates API. They stack: pool tags and the tags you pick must all match (`tags_match=all` when both are set).

```text
[grabwp_waas_templates]
[grabwp_waas_templates filter-tags="industry"]
[grabwp_waas_templates tags="elementor" per-page="9" columns="3"]
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

### URL parameters

| Parameter | Notes |
|-----------|-------|
| `template_tag` | Tag slug to pre-select. Ignored when `tags-browser="no"`. The tag must exist in the pool. Example: `/templates/?template_tag=restaurant` |
| `grabwp_waas_preview` | Template slug. Replaces the normal page with the preview. Preview buttons add this. Do not put it on the shortcode. Example: `/?grabwp_waas_preview=el-restaurant-pro` |

> **Note:** There is no category dropdown on the gallery. Filter with tag groups.

## `[grabwp_waas_pricing]`

Renders plan cards from `templates/pricing-table.php` and, when enabled, the comparison table from `templates/pricing-comparison.php`. The comparison heading is **Compare plans**. The first column header is **Benefit**.

Data comes from active plans and the benefit catalog. Card buttons go to the signup page with `plan` and `billing_cycle`. If there are no plans, the page shows **No plans are available yet.**

| Attribute | Default | Notes |
|-----------|---------|-------|
| `highlighted` | empty | Plan ID marked **Most popular**. Blank, or an unknown ID, picks a paid plan in the middle of the list. |
| `plans` | empty | Comma-separated plan IDs. Blank shows every active plan. |
| `default-cycle` | `monthly` | `monthly` or `yearly`. Anything else becomes `monthly`. |
| `cta-label` | empty | Button text. Blank uses **Start for free** on a free plan and **Get started** on a paid plan. |
| `show-cards` | `yes` | `no` hides the cards. |
| `show-comparison` | `yes` | `no` hides the comparison table. |

The **Monthly** / **Yearly** toggle appears when at least one plan has a yearly price. The yearly button can show **Save N%**.

```text
[grabwp_waas_pricing]
[grabwp_waas_pricing highlighted="pro" default-cycle="yearly"]
[grabwp_waas_pricing plans="free,pro" show-comparison="no"]
[grabwp_waas_pricing show-cards="no" show-comparison="yes"]
```

Benefit rows and colors are configured under [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits) and [Appearance](/grabwp-tenancy-waas/waas-appearance).

## `[grabwp_waas_signup]`

Renders the signup wizard. Named presets are stored under **Waas → Settings → Signup Flow**. See [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

The built-in preset slug is `default` (label **Default**). Its groups are: account, then plan + billing cycle (group label **Plans**), then add-ons, then payment. An empty `flow`, `default`, or an unknown slug uses that preset.

| Attribute | Default | Notes |
|-----------|---------|-------|
| `flow` | empty | Preset slug. Unknown slugs fall back to **Default**. |
| `label-account` | empty | Replaces **Create your account** |
| `label-plan` | empty | Replaces **Choose a plan** |
| `label-addons` | empty | Replaces **Optional Services** |
| `label-cycle` | empty | Replaces **Billing Cycle** |
| `label-payment` | empty | Replaces **Payment Method** |
| `label-otp` | empty | Replaces **Verify your email** |
| `hide-labels` | off | Hides the short description under each step heading. Truthy values: `1`, `yes`, `true`, `on`. |
| `hide-titles` | off | Hides the heading at the top of each step. |
| `hide-thumbnail` | off | Hides the template thumbnail. |

Blank label attributes keep the preset label, then the built-in label above.

```text
[grabwp_waas_signup]
[grabwp_waas_signup flow="checkout-first"]
[grabwp_waas_signup flow="default" hide-titles="yes" label-plan="Pick a plan"]
```

> **Note:** The signup page refuses full-page cache (`DONOTCACHEPAGE` and no-cache headers) because the HTML includes a REST nonce. Exclude it from cache plugins anyway.

With no template pre-selected, the form embeds a template browser so the visitor can pick one.

## `[grabwp_waas_login]` and `[grabwp_waas_dashboard]`

```text
[grabwp_waas_login]
[grabwp_waas_dashboard]
```

**Login** follows **Auth Mode** on **General**: **WAAS Auth (Email signup)** or **WordPress Auth (Login required)**. A logged-in visitor can continue to the dashboard URL.

**Dashboard** is the tenant owner screen (sites, plan, benefits such as domains, backups). Logged-out visitors on **WAAS Auth** see the login form instead of the dashboard. `?tenant=<id>` selects a site the current user owns.

**Verify:** View the page while logged out. The gallery, pricing table, signup steps, or login form matches the attributes. Change one attribute, update the page, and confirm only that part changed.

---

**See also:** [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough)
