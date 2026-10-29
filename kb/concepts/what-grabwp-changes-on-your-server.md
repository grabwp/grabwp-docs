---
title: "What GrabWP changes on your server"
description: "The wp-config.php block, the MU-plugin, the .htaccess block and the data folders, and where to see each on the Status page."
sidebar_label: "What GrabWP changes on your server"
sidebar_position: 6
tags: [server, plan-base, for-operator, for-cs]
last_verified_version: "Base 1.1.14"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP adds a block to `wp-config.php`, a must-use plugin file, a rewrite block in `.htaccess` on Apache, and a data folder. It tries to do this by itself, and the **Status** page tells you when a step needs your hand.

## What it is

| Change | Where | When |
|---|---|---|
| Block between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` | `wp-config.php`, before the "stop editing" line | Install or setup wizard |
| `mu-grabwp-tenancy.php` | the mu-plugins folder | Install |
| Block named `GrabWP Tenancy` | root `.htaccess` | Apache, for path URLs |
| Data folder `wp-content/grabwp-tenancy` | `wp-content` | Install |

The `wp-config.php` block loads GrabWP early. It is one line that requires `wp-content/plugins/grabwp-tenancy/load.php` if the file exists.

## Why it matters

Without the `wp-config.php` block GrabWP cannot recognise tenants. Without the MU-plugin, tenant features may not work. Without the `.htaccess` block, path URLs can fail on Apache. A hosting move that replaces `wp-config.php` removes the block.

## How to check

Open **Tenancy > Status**.

| You see | It means |
|---|---|
| `load.php is not included in wp-config.php.` (red, every admin page) | The `wp-config.php` block is missing. |
| `MU-plugin is not installed. Tenant features may not work.` | The MU-plugin file is missing. |
| Row **MU-Plugins Dir Writable** shows a warning and `Auto-install of MU-plugin will not work. Manual installation required.` | GrabWP cannot write to the mu-plugins folder. |
| `Data directory is missing.` | The data folder does not exist. |
| `Plugin needs write access to create tenant directories and manage configuration files.` | The data folder is not writable. |
| `Root .htaccess needs to be updated for tenant routing.` | The Apache rewrite block is missing or out of order. |
| `Could not find the stop-editing marker in wp-config.php. Please add the line manually.` | GrabWP could not edit `wp-config.php`. |

## What to do

Go to the matching troubleshooting page: [the load.php notice](/kb/troubleshooting/red-notice-load-php) or [MU-plugin and data directory notices](/kb/troubleshooting/mu-plugin-or-data-directory-notice). The **Status** page has a button to run the setup wizard again. Follow the [Installation guide](/grabwp-tenancy/installation-guide).

## Limits and versions

- `.htaccess` rules apply to Apache. Nginx and LiteSpeed setups are described in [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide).
- On Multisite the **Status** page says `⚠ Yes. GrabWP Tenancy is not designed for Multisite`.

## Related

- [Where tenant data lives](/kb/concepts/where-tenant-data-lives)
- [Glossary: server and setup](/kb/glossary/server-and-setup)
