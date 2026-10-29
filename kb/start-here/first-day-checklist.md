---
title: "First day checklist"
description: "Install order and what to check on the Status page after installing GrabWP."
sidebar_label: "First day checklist"
sidebar_position: 3
tags: [server, plan-base, for-operator]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** install Base first, then Pro and WaaS if you use them. Then open **Tenancy > Status** and make sure there is no red notice about `load.php`, the MU-plugin or the data directory.

## What it is

A short list to run once after install. A healthy install has no GrabWP notice at the top of wp-admin and no warning on the **Status** page.

## Why it matters

Most first-week problems come from three things GrabWP needs on the server: a block in `wp-config.php`, a small must-use file, and a writable data folder. The **Status** page shows all three. See [What GrabWP changes on your server](/kb/concepts/what-grabwp-changes-on-your-server).

## How to check

1. Install and activate plugins in this order: Base, Pro, WaaS, then add-ons. Follow the [Installation guide](/grabwp-tenancy/installation-guide).
2. Open **Tenancy > Status**. The tabs are **Plugin General**, **Base Plugin** and **Pro Plugin**. Start on **Plugin General**.
3. Check that no red notice shows at the top of wp-admin. If you see `load.php is not included in wp-config.php.`, go to [the load.php notice](/kb/troubleshooting/red-notice-load-php).
4. Check the rows for the MU-plugin folder and the data directory. If you see `MU-plugin is not installed. Tenant features may not work.` or `Data directory is missing.`, go to [MU-plugin or data directory notices](/kb/troubleshooting/mu-plugin-or-data-directory-notice).
5. Look at the web server row. On Nginx the page says `ℹ .htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` Read [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide).
6. Create one test tenant on **Tenancy > Add New** and open it. See [Creating tenants](/grabwp-tenancy/creating-tenants).

## What to do

Fix any notice before you create customer sites. If you run WaaS, also work through the [Go live checklist](/grabwp-tenancy-waas/waas-go-live-checklist). The **Status** page also has a button to run the setup wizard again.

## Limits and versions

- The checks above use Base 1.1.14. Older versions can show other notice texts.
- Server cron is not part of install, but you need it if you use WaaS. See [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron).

## Related

- [Hosting requirements](/kb/choose/hosting-requirements)
- [What to send when you ask for help](/kb/start-here/getting-help)
