---
title: "Hosting requirements"
description: "WordPress and PHP minimums, writable directories, PHP extensions, server cron and email setup for GrabWP."
sidebar_label: "Hosting requirements"
tags: [server, database, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.15, Pro 1.1.18, WaaS 1.1.25"
last_verified_date: "2026-11-03"
---

**Short answer:** GrabWP needs WordPress 5.0 or newer (WordPress 6.2 or newer for GrabWP Restore), PHP 7.4 or newer, and a standard single-site WordPress install (not WordPress Multisite). You also need write access to `wp-config.php`, `wp-content/mu-plugins`, and `wp-content/grabwp-tenancy`, plus a server cron job and transactional email for WaaS.
**Needs:** Free

## What it is

GrabWP runs inside a standard single-site WordPress installation and uses server files, PHP extensions, scheduled tasks, and outgoing email to create and manage client sites:

| Requirement | Minimum or needed setting | What uses it |
|---|---|---|
| WordPress version | 5.0 or newer (tested up to 7.1); 6.2 or newer for **GrabWP Restore** | Base, Pro, WaaS, and all add-ons |
| PHP version | 7.4 or newer | All GrabWP plugins |
| WordPress Multisite | Off (`No` on **Tenancy > Status**) | GrabWP is not designed for WordPress Multisite |
| Writable paths | `wp-config.php`, `wp-content/mu-plugins/`, `wp-content/grabwp-tenancy/` (and `wp-content/grabwp-tenancy-pro/`, `wp-content/grabwp-tenancy-sqlite/` for Pro) | Early loader block, `mu-grabwp-tenancy.php`, `tenants.php`, `settings.php`, and site folders |
| PHP `pdo_sqlite` extension | Needed for **Isolated SQLite Database** | Pro SQLite site databases; without `pdo_sqlite`, new Pro installs default to **Shared Database (with table prefixes)** |
| PHP `symlink()` function | Needed for symlink extension installs and **Domain Symlink (Clean URLs)** | Pro symlink install method (default) and domain symlinks |
| MySQL privileges | Per-site database credentials entered by the operator | Pro **Isolated MySQL Database** |
| Server cron job | System cron calling `wp-cron.php` regularly | Scheduled site tasks, Pro **Auto Backup**, and WaaS renewal, invoice, and provisioning checks |
| Transactional email (SMTP) | Working outgoing mail on the main site | WaaS **Verification code** (OTP), welcome, trial, invoice, and renewal emails |

## Why it matters

- If `wp-content/grabwp-tenancy` or `wp-content/mu-plugins` is not writable, GrabWP displays `Plugin needs write access to create tenant directories and manage configuration files.` or `Auto-install of MU-plugin will not work. Manual installation required.` on **Tenancy > Status**.
- If WordPress Multisite is active on the main site, the **WordPress Multisite** row in **System Information** on **Tenancy > Status** shows **Yes** with the note `GrabWP Tenancy is not designed for Multisite.`, and the **Hosting setup** card says `This site still runs as WordPress Multisite. GrabWP needs regular WordPress. Remove every line below.`
- Some lines in `wp-config.php` stop GrabWP from giving each site its own address and login. See [Settings in wp-config.php that stop GrabWP](#settings-in-wp-configphp-that-stop-grabwp).
- By default, **Disable WP-Cron** (`DISABLE_WP_CRON`) is turned on for client sites, so a server cron job is required for scheduled tasks to run.
- Without reliable transactional email, customers in **WAAS Auth (Email signup)** mode will not receive their **Verification code** email to complete signup.

## How to check

1. In wp-admin, go to **Tenancy > Status** and check the **Plugin General** tab.
2. Read the **Hosting setup** card. It says **✓ Ready** when all four rows pass. See [Hosting setup checks](#hosting-setup-checks).
3. Open **System Information** and confirm **PHP Version**, **Web Server**, **WordPress Multisite** (`No`), **Data Dir Writable** (`Yes`), and **MU-Plugins Dir Writable** (`Yes`).
4. If you use Pro, check **Tenancy > Pro Settings > Symlink** to confirm `symlink() is available`, and **Tenancy > Pro Settings > Backup > Schedule Assurance** to check **WP-Cron Status**.

## What to do

Before launching your platform:

1. Start on a VPS or hosting account where you control folder permissions, cron jobs, and domain routing. The GrabWP team tests on [xCloud](https://xcloud.host/) (see [Hosting with xCloud](/help/hosting-with-xcloud)).
2. Keep page caching off while installing and testing GrabWP, and only re-enable caching after site provisioning is verified.
3. Configure an SMTP plugin on the main site and send a test email from **Waas > Settings > Email** before opening public signups.
4. Follow [Set up WaaS](/sell-sites/set-up-waas) and [Install GrabWP](/manage-sites/install).

## Hosting setup checks

The **Hosting setup** card is on **Tenancy > Status > Plugin General** and in the setup wizard's **Server check** (Welcome step). It appears only on the main site. Each row has a mark: ✓ passes, ✗ needs attention, ○ not needed. Click **Check again** after you change something at your host.

{/* TODO screenshot: the Hosting setup card on Tenancy > Status (Base 1.1.15 or later). No such shot exists in the admin screenshot library yet. */}

| Row | Passes when | What you can do |
|---|---|---|
| **Multisite and wp-config.php** | `This site runs as regular WordPress.` | See [Settings in wp-config.php that stop GrabWP](#settings-in-wp-configphp-that-stop-grabwp). |
| **Secure address** | `WordPress uses https.` | If the site already works on https but WordPress still uses http, click **Switch to https**. It changes the **WordPress Address** and **Site Address** only. Links inside posts are not changed. Click **Undo** to go back to http. If the row says the address does not answer on https or the certificate is not valid, turn on SSL at your host or CDN first. |
| **HTTPS behind a proxy** | `WordPress sees https from your proxy or CDN.` | If your proxy or CDN serves https but WordPress is not told, click **Add HTTPS detection**. GrabWP adds a small HTTPS detection block to `wp-config.php` and keeps a backup in the GrabWP data folder. **Remove HTTPS detection** takes it out again. If GrabWP cannot write the file, open **Code to add by hand** and click **Copy code**. The row also warns when HTTPS code in `wp-config.php` runs after the GrabWP loader, so new sites can miss https. `No proxy or CDN reports https for this visit.` means there is nothing to fix here. |
| **Subdomains (wildcard)** | `New sites at *.your-domain work.` | The row tests three things: **DNS**, **address** and **certificate**. Add a wildcard DNS record at your DNS host, point it at this site at your host, and get a certificate that covers `*.your-domain`. With path addresses the row says `Not needed: sites use path addresses.` |

When the Multisite or Subdomains row needs attention, the card also shows **Using xCloud?** with the steps from [Hosting with xCloud](/help/hosting-with-xcloud).

## Settings in wp-config.php that stop GrabWP

Your `wp-config.php` file may still contain lines left over from WordPress Multisite or from your host. GrabWP sets these values for each of your sites, so if `wp-config.php` sets them first, your sites can open the main site or fail to log in. It does not matter what value the line has.

GrabWP looks for these names:

- The WordPress Multisite settings: `MULTISITE`, `SUBDOMAIN_INSTALL`, `VHOST`, `DOMAIN_CURRENT_SITE`, `PATH_CURRENT_SITE`, `SITE_ID_CURRENT_SITE`, `BLOG_ID_CURRENT_SITE`, `SUNRISE`, `NOBLOGREDIRECT` and `WP_ALLOW_MULTISITE`
- `WP_HOME` and `WP_SITEURL`
- `COOKIE_DOMAIN`, `COOKIEPATH`, `SITECOOKIEPATH` and `ADMIN_COOKIE_PATH`
- A `$base` line

`WP_ALLOW_MULTISITE` on its own only shows the Network Setup screen, so the row then says `Regular WordPress. WP_ALLOW_MULTISITE is optional cleanup.`

**Where you see the warning:** in the **Multisite and wp-config.php** row of the **Hosting setup** card on **Tenancy > Status**, and in the **Server check** of the setup wizard. The row says `wp-config.php has settings that stop GrabWP. Remove every line below.` and **Lines to remove by hand** lists each line it found, with its line number in `wp-config.php`. A setting made outside `wp-config.php` (for example by a host must-use plugin) is listed by name: ask your host to remove it.

**What Remove these settings does:** when you click **Remove these settings** and confirm, GrabWP:

1. Saves a backup copy of `wp-config.php` in the GrabWP data folder.
2. Removes the lines it found. If `WP_HOME` or `WP_SITEURL` holds a plain web address, GrabWP first saves that address in WordPress, so your main site keeps the same address.
3. Opens your main site to check that it still works. If it does not, GrabWP puts the old `wp-config.php` back right away.

You may need to log in again, then activate plugins that were network activated. If something looks wrong afterwards, click **Undo settings removal** to put back the old `wp-config.php` and the old main site address. Undo refuses to run if `wp-config.php` was changed since the removal; the old copy stays in the GrabWP data folder.

GrabWP does not change `.htaccess`. Old Multisite rules there do not affect GrabWP, which uses its own `GrabWP Tenancy` block, so they can stay.

**When you must remove lines yourself:** GrabWP will not fix the file for you if a line sits inside a condition (an `if` block, marked `(inside a condition, check it)`), is written in an unusual way, or if the same name is still used somewhere else in the file. The card then says `Some of these lines are inside a condition or still used by other code, so GrabWP cannot remove them for you.` Make a backup of `wp-config.php`, delete the listed lines with your host's file manager or ask your host to do it, then click **Check again**.

GrabWP also refuses to fix a real WordPress Multisite network that has more than one site (`This is a Multisite network with %d sites. Do not convert it: back up or move those sites first.`). Move off Multisite first.

## Limits and versions

- Automatic creation of a new MySQL database per site from a master MySQL account is not supported; today **Isolated SQLite Database** provisions automatically when `pdo_sqlite` is loaded, and **Isolated MySQL Database** uses database credentials entered per site.
- The **Hosting setup** card, **Remove these settings** and **Undo settings removal** need Base 1.1.15 or later.
- Verified against Base 1.1.15, Pro 1.1.18, and WaaS 1.1.25.

## Related

- [Web server guide](/help/web-server-guide)
- [Hosting with xCloud](/help/hosting-with-xcloud)
- [Database options](/manage-sites/database-options)
- [Scheduled jobs and server cron](/manage-sites/scheduled-jobs)
- [Set up WaaS](/sell-sites/set-up-waas)
