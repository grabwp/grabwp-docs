---
title: "Base, Pro or WaaS"
description: "Feature comparison of GrabWP Tenancy Base, Pro, WaaS and companion plugins."
sidebar_label: "Base, Pro or WaaS"
sidebar_position: 1
tags: [plan-base, plan-pro, plan-waas, addon, license, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** the free Base plugin creates and routes tenant sites using a shared database and separate upload folders. Pro adds isolated SQLite or MySQL databases, per-tenant plugins and themes, backups and S3 storage. WaaS adds self-service signup, plans, subscriptions, billing and a customer dashboard on top of Base and Pro.

## What it is

GrabWP is split into layers so you install only what your project needs. For current plan prices and license terms, see [GrabWP Pricing](https://grabwp.com/pricing).

| Feature | Base (free) | Pro | WaaS |
|---|---|---|---|
| Domain and path routing | Yes | Yes | Yes |
| Shared database with table prefix (`{tenant_id}_`) | Yes | Yes | Yes |
| Own uploads folder per tenant | Yes | Yes | Yes |
| Setup wizard and 6-step tenant clone | Yes | Yes | Yes |
| Direct login token (`grabwp_token`) | Yes | Yes | Yes |
| Global capabilities, performance and routing mode settings | Yes | Yes | Yes |
| **Isolated MySQL Database** and **Isolated SQLite Database** | No | Yes | Yes |
| Own plugins and themes per tenant (symlink or copy) | No | Yes | Yes |
| Configurable **Path Prefix** and **Path Alias Routing** | No | Yes | Yes |
| 7-step Pro clone, 7-step backup and 8-step restore | No | Yes | Yes |
| **Fix URLs** tool | No | Yes | Yes |
| Per-tenant **Settings** and **Overrides** | No | Yes | Yes |
| **S3-Compatible Object Storage**, **Backup Offload** and **Auto Backup** | No | Yes | Yes |
| **CDN** and **Domain Symlink (Clean URLs)** | No | Yes | Yes |
| Pro license screen (keys starting with `GRABWPPRO-`) | No | Yes | Needs Pro |
| Self-service signup, plans, benefits, services and templates | No | No | Yes |
| Customer dashboard, subscriptions, custom domains and activity log | No | No | Yes |
| 18 customizable email and page templates | No | No | Yes |
| Built-in free trial, **Grace Period (days)** and **Suspended site page** | No | No | Yes |
| REST API (`X-GrabWP-WaaS-API-Key`), blocks and shortcodes | No | No | Yes |
| Polar and WooCommerce billing | No | No | Built in |
| Stripe, SePay, Xendit and Discounts | No | No | Add-on plugins |
| **GrabWP Restore** standalone site restore | Companion plugin for any non-multisite WordPress | Companion plugin | Companion plugin |

## Why it matters

Each plugin depends on the layer below it:
- **GrabWP Tenancy Pro** (`grabwp-tenancy-pro`) requires **GrabWP Tenancy** (`grabwp-tenancy`).
- **GrabWP Tenancy WaaS** (`grabwp-tenancy-waas`) requires both **GrabWP Tenancy** and **GrabWP Tenancy Pro**.
- Payment and discount add-ons (`grabwp-tenancy-stripe`, `grabwp-tenancy-sepay`, `grabwp-tenancy-xendit`, `grabwp-tenancy-discounts`) require **GrabWP Tenancy WaaS**.

If you only run client sites yourself, Base or Base plus Pro is enough. If customers sign up and pay for sites on your platform, you need Base, Pro and WaaS.

## How to check

In wp-admin on the main site:
- Open **Plugins** to see which GrabWP plugins are active and check their version numbers.
- Open **Tenancy > Status** to inspect **Plugin General**, **Base Plugin** and **Pro Plugin** status tabs.
- If Pro is active, open **Tenancy > License** to verify your license status shows `active`.
- If WaaS is active, open **Waas > Settings > Add-ons** to check add-on versions. If an add-on needs a newer WaaS release, the tab shows `Requires WaaS Update`.

## What to do

Choose the plugin tier that matches your use case, check [GrabWP Pricing](https://grabwp.com/pricing), and follow the [Pro overview](/grabwp-tenancy-pro/pro-overview) or [WaaS overview](/grabwp-tenancy-waas/waas-overview) to install the plugins in order: Base first, then Pro, then WaaS.

## Limits and versions

- Verified against Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Stripe 1.1.7, SePay 1.1.5, Xendit 1.0.5, Discounts 1.0.0 and GrabWP Restore 1.0.5.
- Base, Pro and WaaS require WordPress 5.0 or newer and PHP 7.4 or newer.
- **GrabWP Restore** requires WordPress 6.2 or newer and PHP 7.4 or newer, and does not register its menu on WordPress Multisite.

## Related

- [How the plugins fit together](/kb/start-here/how-the-plugins-fit)
- [Hosting requirements](/kb/choose/hosting-requirements)
- [Payment providers](/kb/choose/payment-providers)
- [Pro overview](/grabwp-tenancy-pro/pro-overview)
