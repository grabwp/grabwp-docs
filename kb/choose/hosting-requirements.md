---
title: "Hosting requirements"
description: "WordPress and PHP minimums, writable directories, PHP extensions, server cron and email setup for GrabWP."
sidebar_label: "Hosting requirements"
sidebar_position: 2
tags: [server, database, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP needs WordPress 5.0 or newer (WordPress 6.2 or newer for GrabWP Restore), PHP 7.4 or newer, and a single-site WordPress install (not WordPress Multisite). You also need write access to `wp-config.php`, `wp-content/mu-plugins` and `wp-content/grabwp-tenancy`, plus a server cron job and transactional email for WaaS.

## What it is

GrabWP runs inside a standard single-site WordPress installation and uses server files, PHP extensions, scheduled tasks and outgoing email to create and manage tenants:

| Requirement | Minimum or needed setting | What uses it |
|---|---|---|
| WordPress version | 5.0 or newer (tested up to 7.1); 6.2 or newer for **GrabWP Restore** | Base, Pro, WaaS, add-ons |
| PHP version | 7.4 or newer | All GrabWP plugins |
| WordPress Multisite | Off (`No` on **Tenancy > Status**) | GrabWP is not designed for WordPress Multisite |
| Writable paths | `wp-config.php`, `wp-content/mu-plugins/`, `wp-content/grabwp-tenancy/` (and `wp-content/grabwp-tenancy-pro/`, `wp-content/grabwp-tenancy-sqlite/` for Pro) | Early loader block, `mu-grabwp-tenancy.php`, `tenants.php`, `settings.php`, tenant folders |
| PHP `pdo_sqlite` extension | Needed for **Isolated SQLite Database** | Pro SQLite tenant databases; without `pdo_sqlite`, new Pro installs default to **Shared Database (with table prefixes)** |
| PHP `symlink()` function | Needed for symlink extension installs and **Domain Symlink (Clean URLs)** | Pro symlink install method (default) and domain symlinks |
| MySQL privileges | Per-tenant database credentials entered by the operator | Pro **Isolated MySQL Database** |
| Server cron job | System cron running due WordPress cron events | Tenant tasks, Pro **Auto Backup** and WaaS renewal, invoice and provisioning checks |
| Transactional email (SMTP) | Working outgoing mail on the main site | WaaS **Verification code** (OTP), welcome, trial, invoice and renewal emails |

## Why it matters

- If `wp-content/grabwp-tenancy` or `wp-content/mu-plugins` is not writable, GrabWP shows `Plugin needs write access to create tenant directories and manage configuration files.` or `Auto-install of MU-plugin will not work. Manual installation required.` on **Tenancy > Status**.
- If WordPress Multisite is enabled on the main site, **Tenancy > Status** warns `⚠ Yes. GrabWP Tenancy is not designed for Multisite`.
- By default, **Disable WP-Cron** (`DISABLE_WP_CRON`) is turned on for tenant sites, so a server cron job is required if you rely on scheduled tasks.
- Without working transactional email, customers in **WAAS Auth (Email signup)** mode will not receive their **Verification code** email to complete signup.

## How to check

1. In wp-admin, go to **Tenancy > Status** and check the **Plugin General** tab.
2. Confirm **PHP Version**, **Web Server**, **WordPress Multisite** (`No`), **Data Dir Writable** (`✓ Yes`) and **MU-Plugins Dir Writable** (`✓ Yes`).
3. If you use Pro, check **Tenancy > Pro Settings > Symlink** to confirm `✓ symlink() is available`, and **Tenancy > Pro Settings > Backup > Schedule Assurance** to check **WP-Cron Status**.

## What to do

Before launching your platform:
1. Start on a VPS or hosting account where you control folder permissions, cron jobs and domain routing. The GrabWP team tests on [xCloud](https://xcloud.host/) (see [Notes for xCloud hosting](/kb/choose/hosting-with-xcloud)); other hosts such as Hetzner have not been tested by the GrabWP team.
2. Keep page caching off while installing and testing GrabWP, and only add caching after tenant provisioning works.
3. Configure an SMTP plugin on the main site and send a test email from **Waas > Settings > Email** before opening signups.
4. Follow the [WaaS prerequisites](/grabwp-tenancy-waas/waas-prerequisites) and [Installation guide](/grabwp-tenancy/installation-guide).

## Limits and versions

- Automatic creation of a new MySQL database per tenant from a master MySQL account is not available yet; today **Isolated SQLite Database** works automatically when `pdo_sqlite` is loaded, and **Isolated MySQL Database** uses credentials entered per tenant.
- Verified against Base 1.1.14, Pro 1.1.17 and WaaS 1.1.24.

## Related

- [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)
- [Notes for xCloud hosting](/kb/choose/hosting-with-xcloud)
- [Database options](/kb/concepts/database-options)
- [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron)
- [WaaS prerequisites](/grabwp-tenancy-waas/waas-prerequisites)
