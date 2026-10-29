---
title: "What GrabWP is"
description: "One WordPress install serves many separate sites. What the Base, Pro and WaaS plugins add."
sidebar_label: "What GrabWP is"
sidebar_position: 1
tags: [plan-base, plan-pro, plan-waas, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP lets one WordPress install serve many separate sites, called tenants. The free Base plugin creates and routes tenants. Pro adds a database per tenant, plugins and themes per tenant, and backup. WaaS sells tenant sites with signup, plans and billing.

## What it is

You install GrabWP on one WordPress site, the [main site](/kb/glossary/sites-and-data#main-site). Each [tenant](/kb/concepts/tenant) is a separate site with its own content and uploads, served by that same install. A visitor reaches a tenant by a path such as `example.com/site/abc123` or by a domain name. See [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant).

There are three levels:

| Plugin | What it adds |
|---|---|
| Base (GrabWP Tenancy, free) | Tenants with a table prefix in a shared database, a separate uploads folder per tenant, path and domain routing, basic tenant admin. |
| Pro (GrabWP Tenancy Pro) | A dedicated MySQL or SQLite database per tenant, own plugins and themes per tenant, backup and restore, clone, Fix URLs, S3 storage, CDN, license. |
| WaaS (GrabWP Tenancy WaaS) | Selling sites: signup, plans, billing, customer dashboard, subscriptions, suspension. |

Pro needs Base. WaaS needs Base and Pro. See [How the plugins fit together](/kb/start-here/how-the-plugins-fit).

## Why it matters

The level you install decides which screens you see and which problems you can hit. A site owner who asks "why can I not install a plugin on my site" is usually on a tenant, where plugin installs are blocked by default.

## How to check

In wp-admin, open **Plugins** and look for the GrabWP plugins and their versions. The **Tenancy** menu appears with Base. The **Waas** menu appears with WaaS.

## What to do

Pick your level with [Base, Pro or WaaS](/kb/choose/free-pro-waas), then follow [Getting Started](/grabwp-tenancy/quick-start). Run the [First day checklist](/kb/start-here/first-day-checklist) after install.

## Limits and versions

- Base, Pro and WaaS need WordPress 5.0 or newer and PHP 7.4 or newer.
- GrabWP is not designed for WordPress Multisite. The **Status** page shows a warning if Multisite is on.

## Related

- [Glossary: sites and data](/kb/glossary/sites-and-data)
- [WaaS overview](/grabwp-tenancy-waas/waas-overview)
