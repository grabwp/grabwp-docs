---
title: "How the plugins fit together"
description: "Which GrabWP plugin needs which, what the add-ons do and where each one shows up in wp-admin."
sidebar_label: "How the plugins fit together"
sidebar_position: 2
tags: [plan-base, plan-pro, plan-waas, addon, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Stripe 1.1.7"
last_verified_date: "2026-10-29"
---

**Short answer:** Base is the foundation. Pro needs Base, and WaaS needs Base and Pro. Payment add-ons need WaaS. The menus are **Tenancy** for Base and Pro, and **Waas** for WaaS.

## What it is

| Plugin | Needs | Version checked |
|---|---|---|
| GrabWP Tenancy (Base) | nothing | 1.1.14 |
| GrabWP Tenancy Pro | Base | 1.1.17 |
| GrabWP Tenancy WaaS | Base and Pro | 1.1.24 |
| GrabWP Tenancy Stripe | WaaS | 1.1.7 |
| GrabWP Tenancy SePay | WaaS | 1.1.5 |
| GrabWP Tenancy Xendit | WaaS | 1.0.5 |
| GrabWP Tenancy Discounts | WaaS | 1.0.0 |
| GrabWP Restore | nothing declared | 1.0.5 |

"Needs" is the `Requires Plugins` header: WordPress will not activate a plugin until the plugins it needs are active.

What the add-ons do:

- **Stripe, SePay and Xendit** are payment providers. They add fields on **Waas > Settings > Billing Providers** and have no menu of their own. Polar and WooCommerce billing are built into WaaS.
- **Discounts** adds a **Discounts** page under **Waas**.
- **GrabWP Restore** is a separate plugin for restoring a backup on any WordPress site that is not Multisite. It appears as **Tools > GrabWP Restore**.

## Why it matters

If a menu is missing, a plugin is missing or inactive. For example, there is no **Waas** menu without WaaS, and the **Upgrade to Pro** item under **Tenancy** only appears while Pro is not active.

## How to check

Menu map:

- **Tenancy**: **All Tenants**, **Add New**, **Settings**, **Status**. With Pro active, **Pro Settings** and **License** are added.
- **Tenancy > Settings** tabs: **Tenant Capabilities**, **Performance & Security**, **Routing**.
- **Tenancy > Status** tabs: **Plugin General**, **Base Plugin**, **Pro Plugin**.
- **Waas**: **Dashboard**, **Subscriptions**, **Domains**, **Templates**, **Settings**.
- **Waas > Settings** tabs: **General**, **Appearance**, **Signup Flow**, **Email**, **Plans**, **Benefits**, **Services**, **Billing Providers**, **Activity Log**, **Provisioning**, **Add-ons**.

Some pages have no menu item. You reach them from a tenant row on **Tenancy > All Tenants**: edit, extensions (the row action is titled **Plugins & Themes**), clone, Fix URLs, backup, restore and per-tenant settings.

## What to do

Install in this order: Base, Pro, WaaS, then any add-on. See the [First day checklist](/kb/start-here/first-day-checklist) and the [WaaS overview](/grabwp-tenancy-waas/waas-overview).

## Limits and versions

- The **Add-ons** tab under **Waas > Settings** shows `Requires WaaS Update` when an add-on needs a newer WaaS.
- GrabWP Restore does not add its menu on WordPress Multisite.

## Related

- [What GrabWP is](/kb/start-here/what-is-grabwp)
- [Base, Pro or WaaS](/kb/choose/free-pro-waas)
- [Where things are in wp-admin](/kb/reference/menu-map)
