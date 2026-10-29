---
title: "Where things are in wp-admin"
description: "Complete menu, submenu, tab and tenant row action map for GrabWP Tenancy Base, Pro, WaaS, Discounts and GrabWP Restore."
sidebar_label: "Where things are in wp-admin"
sidebar_position: 7
tags: [reference, settings, plan-base, plan-pro, plan-waas, addon, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Discounts 1.0.0, Restore 1.0.5"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP adds two top-level menus in wp-admin on the main site: **Tenancy** (for Base and Pro) and **Waas** (for WaaS and Discounts), plus **Tools > GrabWP Restore** when the standalone restore plugin is active. Several per-tenant tools open from the tenant row or action tab bar rather than the main sidebar.

## Tenancy menu (Base and Pro)

All screens require the `manage_options` capability.

| Sidebar menu or entry point | Page title / slug | Tabs on that screen | Plugin |
|---|---|---|---|
| **Tenancy > All Tenants** | **GrabWP Tenancy** (`grabwp-tenancy`) | Tenant list table. With Pro active, each row includes a **Plugins & Themes** action link. | Base (extended by Pro) |
| **Tenancy > Add New** | **Add New Tenant** (`grabwp-tenancy-create`) | Form to create a tenant (includes isolation, database and storage sections when Pro is active). | Base (extended by Pro) |
| **Tenancy > Settings** | **GrabWP Tenancy Settings** (`grabwp-tenancy-settings`) | **Tenant Capabilities**, **Performance & Security**, **Routing** | Base (Pro adds **Path Prefix** and **Path Alias Routing** to **Routing**) |
| **Tenancy > Pro Settings** | **Pro Settings** (`grabwp-tenancy-pro-settings`) | **Isolation**, **Database**, **Directories**, **Symlink**, **Storage**, **Backup**, **CDN** (and **Routing** only on older Base versions) | Pro |
| **Tenancy > License** | **License** (`grabwp-tenancy-license`) | License activation, status and deactivation screen. | Pro |
| **Tenancy > Status** | **GrabWP Tenancy Status** (`grabwp-tenancy-status`) | **Plugin General**, **Base Plugin**, **Pro Plugin**, plus a setup wizard button in the header. | Base |
| **Tenancy > Upgrade to Pro** | **Upgrade to Pro** | Shown only when GrabWP Tenancy Pro is not active. | Base |

## Hidden per-tenant screens (reached from Tenancy > All Tenants)

When you edit or manage a single tenant under **Tenancy > All Tenants**, Pro renders a tenant action tab bar across the top of the screen:

| Tab or link on a tenant | Screen title / slug | Plugin and availability |
|---|---|---|
| **Edit** | **Edit Tenant** (`grabwp-tenancy-edit`) | Base and Pro |
| **Extensions** (or row link **Plugins & Themes**) | **Tenant Extensions** (`grabwp-tenancy-pro-extensions`) | Pro |
| **Clone** | **Clone Tenant** (`grabwp-tenancy-clone` in Base; `grabwp-tenancy-pro-clone` in Pro) | Base (6 steps) or Pro (7 steps) |
| **Fix URLs** | **Fix URLs** (`grabwp-tenancy-pro-fix-urls`) | Pro |
| **Backup** | **Backup Tenant** (`grabwp-tenancy-pro-backup`) | Pro |
| **Restore** | **Restore Tenant** (`grabwp-tenancy-pro-restore`) | Pro |
| **Settings** | **Tenant Settings** (`grabwp-tenancy-pro-tenant-settings`) | Pro |
| **Overrides** | **Tenant Overrides** (`grabwp-tenancy-pro-overrides`) | Pro (shown when Base supports per-tenant overrides, Base 1.1.6+) |

## Waas menu (WaaS and add-ons)

Note that the sidebar menu is spelled **Waas**, while the settings page heading is **WaaS Settings**.

| Sidebar menu or entry point | Page slug / location | Tabs or sub-screens | Plugin |
|---|---|---|---|
| **Waas > Dashboard** | `grabwp-tenancy-waas` | Platform overview and metrics. | WaaS |
| **Waas > Subscriptions** | `grabwp-tenancy-waas-subscriptions` | Subscription list; clicking a row opens the hidden **Subscription Detail** screen (`grabwp-tenancy-waas-subscription-detail`) with **Details**, **Active Services**, **History** and **Admin Actions**. | WaaS |
| **Waas > Domains** | `grabwp-tenancy-waas-domains` | Custom domains list and verification status across tenants. | WaaS |
| **Waas > Templates** | `grabwp-tenancy-waas-templates` | Starter templates list; also links to hidden screens for **Tags**, **Tag Groups** and **Bulk** template sync. | WaaS |
| **Waas > Settings** | `grabwp-tenancy-waas-settings` | **General**, **Appearance**, **Signup Flow**, **Email**, **Plans**, **Benefits**, **Services**, **Billing Providers**, **Activity Log**, **Provisioning**, **Add-ons** | WaaS (payment adapters add fields under **Billing Providers**) |
| **Waas > Discounts** | `grabwp-tenancy-discounts` | **Settings** accordion, discount codes table and **Recurring discounts in progress** table. | GrabWP Tenancy Discounts |

## Companion tools menu

| Sidebar menu | Page slug | Notes |
|---|---|---|
| **Tools > GrabWP Restore** | `grabwp-restore` | Standalone 7-step backup restore tool (`grabwp-restore`). Hidden on WordPress Multisite. |

## Changed in recent versions

| Version | Change |
|---|---|
| Base 1.1.13 / Pro 1.1.16 | Added the **Routing** tab under **Tenancy > Settings** and moved Pro's **Path Prefix** and **Path Alias Routing** controls there. |
| Discounts 1.0.0 | Added **Waas > Discounts** submenu. |
| Pro 1.1.8 | Added the per-tenant **Overrides** tab on the tenant action bar. |
| Pro 1.1.6 | Added **Tenancy > License** submenu. |

## Related

- [How the plugins fit together](/kb/start-here/how-the-plugins-fit)
- [Base settings](/kb/reference/base-settings)
- [Pro settings](/kb/reference/pro-settings)
- [WaaS settings](/kb/reference/waas-settings)
- [Quick start](/grabwp-tenancy/quick-start)
