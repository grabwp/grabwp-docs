---
title: "How WaaS works"
description: "What GrabWP WaaS adds to your WordPress site, the five parts of a website service, and what happens between a signup and a finished customer site."
sidebar_label: "How WaaS works"
tags: [plan-waas, subscriptions, for-operator, for-cs]
last_verified_date: "2026-10-30"
---

**Short answer:** with GrabWP WaaS, customers sign up on your site and get their own WordPress website, made as a copy of a template you prepare. You decide the plans, the prices and the payment provider. Each customer manages their site, plan and billing from a customer dashboard.

**Needs:** Pro + WaaS

## The five parts of a website service

The setup wizard explains WaaS with these five parts. Every other page in this section is about one of them.

| Part | What it is |
|---|---|
| **Template** | A ready-made site you design once. You build it in the Starter site step. |
| **Plan** | What a customer gets and pays: price per month or year, limits such as storage and backups, an optional free trial. |
| **Signup** | On your signup page a customer picks a template and a plan, and creates an account. |
| **Subscription** | Their plan, free or billed by the payment provider you connect. |
| **Their own site** | A copy of the template, created for them. They manage it from their customer dashboard. |

## What the customer sees

```
Template gallery  >  Signup (account, plan, services, payment)  >  Site is built
                                                                        |
                                                              Customer dashboard
                                                       (site, domains, plan, billing)
```

1. The visitor opens your template gallery and clicks **Get started** on a template.
2. The signup form asks for their name and email (**Create your account**), then a plan (**Choose a plan**) and **Billing Cycle**, then extras (**Optional Services**), then **Payment Method**. The payment step is skipped when nothing in the order needs payment.
3. WaaS builds the site. The customer does not type a site address: WaaS picks a neutral one for them. They can connect their own domain later if their plan allows it.
4. The customer signs in to the dashboard with their email. With the default sign-in mode, they get a code by email (**Send verification code**).

You can reorder, hide or relabel the signup steps. See [Signup flow](/sell-sites/signup-flow).

## What runs on your server

Everything lives in one WordPress install: your main site holds the plans, templates, signup pages and billing. Each customer site is a tenant of that install.

```
+--------------------------------------------------+
|                  YOUR MAIN SITE                  |
|  Plans   Templates (tags, groups, bulk)          |
|  Billing providers   Signup flow presets         |
|  Public pages: /signup /templates /pricing       |
|                /dashboard                        |
+--------------------------------------------------+
                        |
                  Provisioning
                        |
        +---------------+---------------+
        v               v               v
    tenant A        tenant B        tenant C
  (subdomain)     (path URL)     (custom domain)
```

Customer sites get either a subdomain of your **Platform Domain** (for example `shop.yoursaas.com`, needs wildcard DNS and SSL) or a path URL on your main site (for example `yoursaas.com/site/site-name/`, no DNS needed). This depends on the routing mode you pick in the setup wizard. See [Set up WaaS](/sell-sites/set-up-waas).

## The three plugins

WaaS needs all three plugins, activated in this order. Each one depends on the one before it.

| Plugin | Role |
|---|---|
| **GrabWP Tenancy** (Free) | The multi-site engine: tenant list, create, settings, status, setup wizard. Menu: **Tenancy**. |
| **GrabWP Tenancy Pro** | Database and isolation defaults, backups, storage, license. Adds **Pro Settings** and **License** under **Tenancy**. |
| **GrabWP Tenancy WaaS** | Plans, billing, templates, signup, customer dashboard, domains, subscriptions, emails. Menu: **Waas**. |

Payment providers: **Polar.sh** and **WooCommerce** are built into WaaS (WooCommerce appears only while the WooCommerce plugin is active). **Stripe**, **Sepay** and **Xendit** are separate add-on plugins. See [Payments](/sell-sites/payments).

## Where things are in wp-admin

The WaaS menu is labeled **Waas**. Its items are **Dashboard**, **Subscriptions**, **Domains**, **Templates** and **Settings**. The **Settings** screen (title **WaaS Settings**) has these tabs:

| Tab | Page in this section |
|---|---|
| **General** | [Set up WaaS](/sell-sites/set-up-waas) and [WaaS settings](/sell-sites/waas-settings) |
| **Appearance** | [Appearance](/sell-sites/appearance) |
| **Signup Flow** | [Signup flow](/sell-sites/signup-flow) |
| **Email** | [Emails](/sell-sites/emails) |
| **Plans** | [Plans](/sell-sites/plans) |
| **Benefits** and **Services** | [Benefits, services and add-ons](/sell-sites/benefits-and-add-ons) |
| **Billing Providers** | [Payments](/sell-sites/payments) |
| **Activity Log** and **Provisioning** | [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning) |
| **Add-ons** | [Benefits, services and add-ons](/sell-sites/benefits-and-add-ons#add-ons-tab) |

**Templates** has its own sub-navigation: **Templates**, **Tags**, **Tag Groups**, **Bulk**. See [Templates](/sell-sites/templates).

## How a signup becomes a site

Each signup gets one provisioning record (a provisioning intent) that tracks its progress. In order:

1. `checkout_pending`: the customer chose a plan and is paying.
2. `payment_confirmed`: payment arrived, or the order needed no payment.
3. `finalizing`: the customer account and site record are being prepared.
4. `tenant_created`: the site exists.
5. `clone_running`: the chosen template is being copied into the new site.
6. `completed`: the site is ready.

Two other states exist: `failed_retriable` (will be tried again) and `failed_terminal` (stopped).

When a customer says "I paid and have no site", this state tells you where it stopped. Open **Waas > Settings > Provisioning** to see it. An hourly job re-queues stuck signups, up to 12 retries. You can also retry by hand. See [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning#provisioning).

While a checkout is open, its site address is held for 2 hours, so no other signup can take it.

## Limits

- Retries, renewals, trial reminders and suspensions run as WordPress scheduled jobs (WP-Cron). They only run when cron runs, so set up a server cron job for a reliable schedule.
- Copying a template is a clone of an existing site. The template site must stay in place.

## Related

- [Set up WaaS](/sell-sites/set-up-waas)
- [Go-live checklist](/sell-sites/go-live-checklist)
- [Statuses](/sell-sites/statuses)
- [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)
