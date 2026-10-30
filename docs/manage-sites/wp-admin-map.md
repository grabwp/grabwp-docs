---
title: "Where things are in wp-admin"
description: "Map of every GrabWP menu, tab, per-site screen and row icon in the main site's wp-admin."
sidebar_label: "Where things are"
tags: [reference, settings, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** everything for managing sites is under the **Tenancy** menu on the main site. Per-site tools open from the icons on each row of **Tenancy > All Tenants**, or from the tab bar at the top of a site's screens. Selling tools are under a separate **Waas** menu.

**Needs:** Free (Pro adds the items marked Pro)

All GrabWP screens need an administrator on the main site (`manage_options`). Client sites do not show these menus.

## Tenancy menu

| Menu item | Page title | What you do there | Needs |
|---|---|---|---|
| **Tenancy > All Tenants** | **GrabWP Tenancy** | List of all sites, search, row icons. | Free |
| **Tenancy > Add New** | **Add New Tenant** | Create a site. Pro adds isolation, database and storage fields. | Free |
| **Tenancy > Settings** | **GrabWP Tenancy Settings** | Rules for all sites, in three tabs: **Tenant Capabilities**, **Performance & Security**, **Routing**. Pro adds **Path Prefix** and **Path Alias Routing** to **Routing**. | Free |
| **Tenancy > Pro Settings** | **Pro Settings** | Defaults for new sites and platform options, in tabs: **Isolation**, **Database**, **Directories**, **Symlink**, **Storage**, **Backup**, **CDN**. | Pro |
| **Tenancy > License** | **GrabWP Tenancy Pro License** | Activate or revoke your Pro key. | Pro |
| **Tenancy > Status** | **GrabWP Tenancy Status** | Server checks in three tabs: **Plugin General**, **Base Plugin**, **Pro Plugin**. Also **Run setup wizard**. | Free |
| **Tenancy > Upgrade to Pro** | **Upgrade to Pro** | Shown only while Pro is not active. | Free |

## Row icons on All Tenants

Hover an icon to see its name.

| Icon name | Opens | Needs |
|---|---|---|
| **Visit Site** | The site's front end. | Free |
| **Admin** | The site's wp-admin, logged in. See [Log in to a client site](/manage-sites/direct-login). | Free |
| **Settings** | **Edit Tenant** (domains and, with Pro, isolation and database). | Free |
| **Plugins & Themes** | The site's **Extensions** screen. | Pro |
| **Fix URLs** | Replace an old address in the site's database. | Pro |
| **Clone Tenant** | Copy this site into another site. | Free (Pro version adds more) |
| **Backup Tenant** | Back up this site. | Pro |
| **Restore Tenant** | Restore this site from a backup. | Pro |
| Trash icon | Delete the site. | Free |

The starred **Main Site** row only has **Visit Site** and a clone icon (**Clone Tenant** on Free, **Clone to Tenant** with Pro).

## Tab bar on a site (Pro)

With Pro, every per-site screen has this tab bar at the top:

| Tab | Screen | Guide |
|---|---|---|
| **Edit** | **Edit Tenant** | [Create and manage sites](/manage-sites/create-and-manage-sites) |
| **Extensions** | **Extensions:** plus the site ID | [Per-site plugins and themes](/manage-sites/plugins-and-themes) |
| **Clone** | **Clone Tenant:** plus the site ID | [Clone a site](/manage-sites/clone-a-site) |
| **Fix URLs** | **Fix URLs:** plus the site ID | [Fix URLs](/manage-sites/fix-urls) |
| **Backup** | **Backup Tenant:** plus the site ID | [Backup and restore](/manage-sites/backup-and-restore) |
| **Restore** | **Restore Tenant:** plus the site ID | [Backup and restore](/manage-sites/backup-and-restore) |
| **Settings** | **Settings:** plus the site ID | [Site settings and overrides](/manage-sites/site-settings) |
| **Overrides** | **Overrides:** plus the site ID | [Site settings and overrides](/manage-sites/site-settings) |
| **Homepage** | Opens the site front end in a new tab. | |
| **WP Admin** | Opens the site's wp-admin in a new tab. | |

**Overrides** shows only when the free plugin is new enough to support per-site overrides. If it is too old, the screen says `Per-tenant settings overrides require a newer GrabWP Tenancy base plugin.`

## Waas menu (selling sites)

When GrabWP Tenancy WaaS is active, a second top-level menu appears. It is spelled **Waas** in the sidebar, while the settings page title is **WaaS Settings**. Its items are **Dashboard**, **Subscriptions**, **Domains**, **Templates** and **Settings**. See [How WaaS works](/sell-sites/how-waas-works) and [WaaS settings](/sell-sites/waas-settings).

## Related

- [Free settings](/manage-sites/free-settings)
- [Pro settings](/manage-sites/pro-settings)
- [Install GrabWP](/manage-sites/install)
