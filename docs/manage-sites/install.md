---
title: "Install GrabWP (Free and Pro)"
description: "Install the free GrabWP Tenancy plugin and GrabWP Tenancy Pro, run the setup wizard and check the Status page."
sidebar_label: "Install GrabWP"
tags: [server, license, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-30"
---

**Short answer:** install the free **GrabWP Tenancy** plugin from **Plugins > Add New**, then upload **GrabWP Tenancy Pro** if you bought it. A setup wizard opens and checks your server. When **Tenancy > Status** shows no warnings, you are ready to create sites.

**Needs:** Free (Pro is optional and needs the free plugin)

## Before you start

- WordPress 5.0 or later (tested up to 7.1).
- PHP 7.4 or later.
- An administrator account on the main site (the `manage_options` capability).
- A normal WordPress install. GrabWP is not built for WordPress Multisite and you do not need to turn Multisite on.

Not sure your hosting fits? Read [Hosting requirements](/help/hosting-requirements).

Install in this order: the free plugin, then Pro, then WaaS and any add-ons if you sell sites.

## Install the free plugin

1. Go to **Plugins > Add New**.
2. Search for **GrabWP Tenancy**.
3. Click **Install Now**, then **Activate**.

You can also download the ZIP from [wordpress.org/plugins/grabwp-tenancy](https://wordpress.org/plugins/grabwp-tenancy/) and upload it under **Plugins > Add New > Upload Plugin**.

## Install Pro

Pro does not run without the free plugin, so install that first.

1. After purchase you get an email with a **Customer Portal** link. Open it and download the Pro ZIP. If the email is missing, search your mail (and spam) for "Polar" or "GrabWP".
2. Go to **Plugins > Add New > Upload Plugin**.
3. Upload the ZIP, click **Install Now**, then **Activate Plugin**.
4. Activate your license key on **Tenancy > License**. See [Pro license](/manage-sites/licence).

Until the license is active, Pro blocks creating and editing sites with the message `Please activate your GrabWP Tenancy Pro license before managing tenants.`

## The setup wizard

When you activate a GrabWP plugin on its own from wp-admin, the **GrabWP setup** wizard opens once. Every step has a working default, and **Skip this step** and **Exit setup** are always there.

| Step | What it does |
|---|---|
| **Welcome** | Explains what GrabWP does and runs a **Server check**. Click **Fix automatically** if something is missing, then **Check again**. |
| **Routing** | Choose how visitors reach your sites: by path, by domain, or both. See [Domains and DNS](/manage-sites/domains-and-dns). |
| **License** (Pro) | Paste your Pro key. No key yet? Skip it and activate later on **Tenancy > License**. |
| **Site defaults** (Pro) | Pick **Use the simple setup** or **Choose each setting** for the database, plugins and themes, and uploads of new sites. |
| **First site** | Creates your first site, with WordPress already installed. |
| **Done** | Shows the new site, its login details and an **Open site admin (1-click)** button. |

The server check also tests **Site can reach itself (loopback)**. If it shows **Failed**, GrabWP cannot install WordPress into new sites for you, and you finish each install in the browser instead.

To open the wizard again later, use **Run setup wizard** on **Tenancy > Status**.

## Check the Status page

Open **Tenancy > Status**. The page title is **GrabWP Tenancy Status** and it has three tabs: **Plugin General**, **Base Plugin** and **Pro Plugin**.

![GrabWP Tenancy Status](../images/grabwp-status.png)

### Plugin General

These cards show the pieces GrabWP adds to your server. Expand a card for **Fix steps and install code**, **Copy Code** and **Auto Fix**.

| Card | Healthy state | What it is |
|---|---|---|
| **1. wp-config.php Loader** | **✓ Active** | A short block between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` in `wp-config.php`. It loads GrabWP early so it can tell which site a visitor asked for. |
| **2. MU-Plugin** | **✓ Installed** | A must-use plugin file, `mu-grabwp-tenancy.php`, in the mu-plugins folder. |
| **3. Root .htaccess Rewrite Rules** | **✓ Installed** | A block named `GrabWP Tenancy` in the root `.htaccess`, placed before `# BEGIN WordPress`. Apache and LiteSpeed only; it makes path addresses work. |
| **Data Directory .htaccess** | **✓ Protected** | Blocks direct web access to the data folder, `wp-content/grabwp-tenancy`. |
| **index.php Protection** | **✓ Present** | A blank `index.php` so the data folder cannot be listed. |
| **Shared Files Lock** | **Locked** | Makes `wp-config.php`, `.htaccess`, `.user.ini` and `web.config` read-only so plugins on client sites cannot rewrite them. |

**Auto Fix** writes the missing piece when WordPress can write the file. If not, the card says a manual install is required: click **Copy Code** and follow the steps on the card.

If a cache plugin on the main site needs to write one of the locked files, click **Unlock shared files**, let it save, then click **Lock shared files** again.

On Nginx the page says `.htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` See [Apache, LiteSpeed and Nginx](/help/web-server-guide).

### Base Plugin

![Status, Base Plugin tab](../images/09-status-base.png)

**File Structure** shows the data folder, the tenant mappings file (`tenants.php`), the settings file and where site uploads go. The capability and performance values from **Tenancy > Settings** are repeated here.

### Pro Plugin

![Status, Pro Plugin tab](../images/09-status-pro.png)

With Pro active, **Pro Plugin Information** shows **Pro Version** and **Status** as **✓ Active**, plus the defaults for new sites. Without Pro, this tab offers **Upgrade to Pro**.

## What Pro adds to wp-admin

- **Tenancy > Pro Settings** and **Tenancy > License** in the menu.
- Extra columns on **Tenancy > All Tenants**: **Database**, **Storage**, **Isolation**.
- Extra row icons: **Plugins & Themes**, **Fix URLs**, **Backup Tenant**, **Restore Tenant**, and a Pro version of **Clone Tenant**.
- A tab bar on each site: **Edit**, **Extensions**, **Clone**, **Fix URLs**, **Backup**, **Restore**, **Settings**, **Overrides**, **Homepage**, **WP Admin**.

See [Where things are in wp-admin](/manage-sites/wp-admin-map) for the full map.

## Warnings you may see

| You see | Go to |
|---|---|
| `load.php is not included in wp-config.php.` (red, on every admin page) | [The load.php notice](/help/red-notice-load-php) |
| `MU-plugin is not installed. Tenant features may not work.` | [MU-plugin or data directory notices](/help/mu-plugin-or-data-directory-notice) |
| `Data directory is missing.` | [MU-plugin or data directory notices](/help/mu-plugin-or-data-directory-notice) |
| `Root .htaccess needs to be updated for tenant routing.` | [Path URLs return 404](/help/path-urls-return-404) |
| `Could not find the stop-editing marker in wp-config.php. Please add the line manually.` | [The load.php notice](/help/red-notice-load-php) |

A hosting move or a tool that rewrites `wp-config.php` can remove the loader block. Check **Tenancy > Status** after any migration.

## Deactivating or uninstalling

- Deactivating the free plugin removes the loader block, the MU-plugin and the `.htaccess` block, and unlocks the shared files. Site databases and uploads are **not** deleted. Activate it again and your sites come back.
- Deactivating Pro removes the Pro screens and clears all scheduled auto backups. Site data is not deleted.

## Related

- [Your first site](/manage-sites/first-site)
- [Pro license](/manage-sites/licence)
- [Free settings](/manage-sites/free-settings)
- [Where site data lives](/manage-sites/where-site-data-lives)
- [What to send when you ask for help](/help/getting-help)
