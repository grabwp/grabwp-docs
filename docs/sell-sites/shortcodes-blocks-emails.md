---
title: "Shortcodes, blocks and emails"
description: "Lookup tables for the WaaS shortcodes and their attributes, the five blocks, the 18 email and page templates with their tokens, the webhook routes and the scheduled jobs."
sidebar_label: "Shortcodes, blocks and emails"
tags: [reference, settings, billing, subscriptions, plan-waas, addon, for-operator]
last_verified_date: "2026-10-30"
---

**Short answer:** this is the lookup page for the WaaS building blocks: six shortcodes with every attribute, five editor blocks, the 18 templates on **Waas > Settings > Email** with their default subjects and tokens, the billing webhook routes and the scheduled jobs. For step-by-step setup, start at [Frontend pages](/sell-sites/frontend-pages) or [Emails](/sell-sites/emails).

**Needs:** Pro + WaaS

## Shortcodes

| Shortcode | Plugin | Default page | What it shows |
|---|---|---|---|
| `[grabwp_waas_signup]` | GrabWP Tenancy WaaS | `/signup/` | The signup steps: template, plan, services and checkout. |
| `[grabwp_waas_dashboard]` | GrabWP Tenancy WaaS | `/dashboard/` | The customer dashboard: sites, domains, billing and account. |
| `[grabwp_waas_pricing]` | GrabWP Tenancy WaaS | `/pricing/` | Plan cards, the monthly and yearly toggle, and the comparison table. |
| `[grabwp_waas_templates]` | GrabWP Tenancy WaaS | `/templates/` | The template gallery with search and tag filters. |
| `[grabwp_waas_login]` | GrabWP Tenancy WaaS | Any page | A standalone customer sign-in form. |
| `[grabwp_waas_promo]` | GrabWP Tenancy Discounts | Any page | A promotion banner or discount code. |

`[grabwp_waas_login]` and `[grabwp_waas_dashboard]` take no attributes.

### Template gallery: `[grabwp_waas_templates]`

Shows active templates. Each card's **Get started** button opens signup with that template (`?template=` followed by the template slug).

| Attribute | Default | Notes |
|---|---|---|
| `tags` | empty | Tag slugs, separated by commas. Only templates with at least one of these tags are shown. |
| `filter-tags` | empty | Tag group slugs, separated by commas. Those groups show as pill buttons, with **All Tags**. Empty means no pills. |
| `tags-browser` | `yes` | `no` hides the pills, the group dropdowns and the search box. |
| `per-page` | `12` | Cards per page. `0` shows all and turns off paging. |
| `columns` | `4` | Cards per row, 1 to 6. |

How filters behave:

- A group listed in `filter-tags` shows as pills only.
- Any other group with more than one tag among the shown templates becomes a dropdown whose first option is "All" plus the group name.
- The search box placeholder is **Type to search templates...**.
- Pool tags and the tags a visitor picks must all match.
- There is no category dropdown. Filter with tag groups.

```text
[grabwp_waas_templates]
[grabwp_waas_templates filter-tags="industry"]
[grabwp_waas_templates tags="elementor" per-page="9" columns="3"]
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

| URL parameter | Notes |
|---|---|
| `template_tag` | A tag slug to pre-select, for example `/templates/?template_tag=restaurant`. Ignored when `tags-browser="no"`. The tag must be among the shown templates. |
| `grabwp_waas_preview` | A template slug. Shows the template preview instead of the page, for example `/?grabwp_waas_preview=el-restaurant-pro`. Preview buttons add it; do not put it on the shortcode. |

### Pricing table: `[grabwp_waas_pricing]`

Shows plan cards from your active plans and, if turned on, a **Compare plans** table whose first column is **Benefit**. Card buttons open signup with the plan and billing cycle. With no plans, the page says **No plans are available yet.**

| Attribute | Default | Notes |
|---|---|---|
| `highlighted` | empty | The plan ID marked **Most popular**. Blank or unknown picks a paid plan in the middle of the list. |
| `plans` | empty | Plan IDs, separated by commas. Blank shows every active plan. |
| `default-cycle` | `monthly` | `monthly` or `yearly`. Anything else becomes `monthly`. |
| `cta-label` | empty | The button text. Blank uses **Start for free** on a free plan and **Get started** on a paid one. |
| `show-cards` | `yes` | `no` hides the cards. |
| `show-comparison` | `yes` | `no` hides the comparison table. |

The **Monthly** and **Yearly** toggle shows when at least one plan has a yearly price. The yearly button can show a saving in percent.

```text
[grabwp_waas_pricing]
[grabwp_waas_pricing highlighted="pro" default-cycle="yearly"]
[grabwp_waas_pricing plans="free,pro" show-comparison="no"]
[grabwp_waas_pricing show-cards="no" show-comparison="yes"]
```

### Signup: `[grabwp_waas_signup]`

Shows the signup steps from a preset on **Waas > Settings > Signup Flow** (see [Signup flow](/sell-sites/signup-flow)). The built-in preset is `default` (**Default**). An empty `flow`, `default` or an unknown slug uses it.

| Attribute | Default | Notes |
|---|---|---|
| `flow` | empty | The preset slug. |
| `label-account` | empty | Replaces **Create your account**. |
| `label-plan` | empty | Replaces **Choose a plan**. |
| `label-addons` | empty | Replaces **Optional Services**. |
| `label-cycle` | empty | Replaces **Billing Cycle**. |
| `label-payment` | empty | Replaces **Payment Method**. |
| `label-otp` | empty | Replaces **Verify your email**. |
| `hide-labels` | off | Hides the short description under each step heading. On values: `1`, `yes`, `true`, `on`. |
| `hide-titles` | off | Hides the heading of each step. |
| `hide-thumbnail` | off | Hides the template thumbnail. |

A blank label keeps the preset's label, then the built-in one.

```text
[grabwp_waas_signup]
[grabwp_waas_signup flow="checkout-first"]
[grabwp_waas_signup flow="default" hide-titles="yes" label-plan="Pick a plan"]
```

- With no template chosen yet, the form shows a template browser so the visitor can pick one.
- The signup page tells caches not to store it, because each visit needs a fresh security token. Exclude it from your cache plugin anyway.

### Login and dashboard

- `[grabwp_waas_login]` follows **Auth Mode** on **Waas > Settings > General**. A signed-in visitor can go on to the dashboard.
- `[grabwp_waas_dashboard]` is the customer's screen for their sites, plan and benefits such as domains and backups. Signed-out visitors with **WAAS Auth (Email signup)** see the sign-in form instead. Adding `?tenant=` with a site ID picks one of the customer's own sites.

## Blocks

All five are in the `grabwp-waas` category. Their controls are listed on [Frontend pages](/sell-sites/frontend-pages#use-the-blocks).

| Block title | Block name | Same as |
|---|---|---|
| **WaaS Signup** | `grabwp-waas/signup` | `[grabwp_waas_signup]` |
| **WaaS Dashboard** | `grabwp-waas/dashboard` | `[grabwp_waas_dashboard]` |
| **WaaS Pricing** | `grabwp-waas/pricing` | `[grabwp_waas_pricing]` |
| **WaaS Template Browser** | `grabwp-waas/template-browser` | `[grabwp_waas_templates]` |
| **WaaS Login** | `grabwp-waas/login` | `[grabwp_waas_login]` |

## Email templates

Edited under **Waas > Settings > Email** (see [Emails](/sell-sites/emails)). Required templates cannot be turned off. `site_name` works in every email; the table lists the other tokens. Write a token in braces, for example `{customer_name}`.

Every customer email except **Verification code** also accepts `customer_name`, `customer_email`, `dashboard_url` and `login_url`. Every admin email accepts `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name` and `admin_url`.

**Customer emails**

| Label | Key | Default subject | Extra tokens |
|---|---|---|---|
| **Welcome** | `welcome` | `Welcome to {site_name} -- Your site is being set up` | `tenant_id`, `tenant_domain`, `site_url`, `admin_url`, `login_password` |
| **Site setup complete** | `provisioning_complete` | `{site_name} -- Your site setup is complete` | `tenant_id`, `tenant_domain`, `site_url` |
| **Renewal reminder** | `renewal_reminder` | `{site_name} -- Renew your plan to keep your site active` | `tenant_id`, `plan_name`, `days_remaining`, `due_date` |
| **Plan expired (grace period)** | `grace_period_warning` | `{site_name} -- Your plan has expired` | `tenant_id`, `plan_name`, `due_date`, `grace_days` |
| **Site suspended** | `suspension_notice` | `{site_name} -- Your site has been suspended` | `tenant_id`, `plan_name` |
| **Invoice created** | `invoice_created` | `{site_name} -- Invoice {invoice_number} for your subscription renewal` | `tenant_id`, `plan_name`, `invoice_number`, `amount`, `due_date`, `payment_url` |
| **Invoice paid** | `invoice_paid` | `{site_name} -- Payment received, subscription renewed` | `tenant_id`, `plan_name`, `invoice_number`, `due_date` |
| **Free trial started** | `trial_started` | `{site_name} -- Your free trial has started` | `tenant_id`, `tenant_domain`, `plan_name`, `trial_end_date`, `days_left`, `upgrade_url` |
| **Free trial ending** | `trial_ending` | `{site_name} -- Your free trial ends in {days_left} day(s)` | Same as **Free trial started** |
| **Free trial ended** | `trial_ended` | `{site_name} -- Your free trial has ended` | Same as **Free trial started** |
| **Verification code** (required) | `otp` | `[{site_name}] Your verification code: {otp_code}` | Only `customer_name`, `customer_email`, `otp_code`, `expires_minutes` |

**Admin emails**

| Label | Key | Default subject | Extra tokens |
|---|---|---|---|
| **New signup** | `new_signup` | `[{site_name}] New site created: {tenant_domain}` | None |
| **Provisioning failed** | `provisioning_failed` | `[{site_name}] Site setup failed for {customer_email}` | `error_message` |
| **Payment received** | `payment_received` | `[{site_name}] Payment received from {customer_email}` | `invoice_number`, `amount` |
| **Payment failed** | `payment_failed` | `[{site_name}] Payment failed or overdue for {tenant_id}` | None |
| **Subscription cancelled** | `subscription_cancelled` | `[{site_name}] Subscription cancelled for {tenant_id}` | None |
| **Tenant suspended** | `tenant_suspended` | `[{site_name}] Tenant suspended: {tenant_id}` | None |

**Page**

| Label | Key | Title | Tokens |
|---|---|---|---|
| **Suspended site page** (required, HTTP 503) | `suspended_page` | `{tenant_domain} is temporarily unavailable` | `tenant_domain`, `suspension_message`, `dashboard_url` |

The trial emails exist since WaaS 1.1.22 and the suspended site page since WaaS 1.1.21.

## Billing webhook routes

| Route | Used by | Notes |
|---|---|---|
| `/wp-json/grabwp-waas/v1/webhooks/billing/` plus the provider ID | Polar.sh (`polar`), Stripe (`stripe`), Sepay (`sepay`), Xendit (`xendit`) | The address shown as **Webhook URL** on **Waas > Settings > Billing Providers**. |
| `/wp-json/grabwp-waas/v1/webhooks/polar` | Polar.sh | Older Polar route, still accepted. |

WooCommerce uses no webhook route.

## Scheduled jobs

These run through WordPress scheduled jobs (WP-Cron), so they need a working cron on your server.

| Hook | Runs | What it does |
|---|---|---|
| `grabwp_waas_purge_activity_log` | Daily | Removes activity log rows older than **Retention (days)**. |
| `grabwp_waas_check_expired_subscriptions` | Daily | Renewal reminders, grace and suspension changes, built-in trial reminders and trial ends. |
| `grabwp_waas_purge_stale_pending_admins` | Daily | Cleans up expired pending admin accounts. |
| `grabwp_waas_sync_polar_subscriptions` | Twice a day | Syncs subscription status with Polar.sh. |
| `grabwp_waas_subscription_reconcile` | Twice a day | Reconciles subscription states with the payment providers. |
| `grabwp_waas_generate_renewal_invoices` | Twice a day | Creates renewal invoices and sends their emails. |
| `grabwp_waas_refresh_storage_usage` | Daily | Refreshes site storage usage numbers. |
| `grabwp_waas_scan_stale_intents` | Hourly | Re-queues stuck site builds. |
| `grabwp_waas_resume_provisioning_intent` | One-off | Runs or resumes one site build in the background. |
| `grabwp_waas_tenant_suspend_after_grace` | One-off | Suspends a cancelled site when its grace period ends. |

## Related

- [Frontend pages](/sell-sites/frontend-pages)
- [Emails](/sell-sites/emails)
- [Payments](/sell-sites/payments)
- [Statuses](/sell-sites/statuses)
