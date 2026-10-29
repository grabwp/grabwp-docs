---
title: "What to send when you ask for help"
description: "The facts support needs to answer quickly: versions, Status page, web server and the exact error text."
sidebar_label: "What to send"
tags: [troubleshooting, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** send the exact text you see, the versions of the GrabWP plugins, what the **Status** page shows, and your web server. With these, support can usually name the cause in one reply.
**Needs:** Free

## Check Status first

Start by checking your environment health under **Tenancy > Status** (`page=grabwp-tenancy-status`).

![GrabWP Tenancy Status](../images/grabwp-status.png)

Open the **Plugin General** tab (`tab=general`). Use **Auto Fix** on any row that is not healthy, when the button is available. If a file is not writable, expand **Fix steps and install code** and click **Copy Code**.

| Tab | Use it for |
|---|---|
| **Plugin General** | Loader, MU-plugin, rewrite rules, and data directory protection |
| **Base Plugin** | Directories, mappings file, settings file, and capability flags |
| **Pro Plugin** | Whether Pro is **Active**, plus default isolation and database type |

## What to collect before you ask for help

Collect these five facts before contacting support:

1. **The exact text.** Copy the notice or error message into your message. Do not retype it from memory. A screenshot of the full screen also helps.
2. **Plugin versions.** In wp-admin, open **Plugins** and note the version of each GrabWP plugin (Base, Pro, WaaS, and any payment add-ons).
3. **Status page.** Open **Tenancy > Status**. Check what each tab shows (**Plugin General**, **Base Plugin**, **Pro Plugin**), especially any warning or error rows.
4. **Web server.** Apache, LiteSpeed, or Nginx, along with the hosting panel if you use one. The **Plugin General** tab displays the detected server.
5. **What you did just before.** For example: "changed isolation level", "switched storage driver", or "added a custom domain".

For a problem with a specific site, also include the site URL and whether it uses a path URL or a custom domain.

## What to send

Send all five facts together in your first message.

Never send passwords, API keys, license keys, or payment secrets. If a tool asks for a license key, enter it directly on the **License** page yourself.

## Other setup problems

### The Tenancy menu is missing

You need the `manage_options` capability (administrator role) to see the **Tenancy** menu. If you are an administrator and the menu is missing, check **Plugin General** on **Tenancy > Status** to verify the loader and MU-plugin.

### Errors after activation or reactivation

Deactivating the plugin removes the loader, the must-use plugin, and the root rewrite rules. Site database tables and uploads are never deleted when you deactivate. Activating the plugin again brings your sites back.

### A site shows the main site's content

If opening a site loads the main platform site instead:

1. Deactivate and reactivate GrabWP Tenancy under **Plugins**.
2. Recheck **Tenancy > Status** on the **Plugin General** tab.
3. Clear your browser cache, any WordPress caching plugins, and your host or CDN cache.

### Forgot the site admin password

If an administrator password is lost on an individual site, go to that site's login screen (`https://your-site-domain/wp-login.php`) and click **Lost your password?**.

## Limits and support channels

Where to send your request depends on your plan and hosting setup:

- For the free plugin, use the [WordPress.org support forum](https://wordpress.org/support/plugin/grabwp-tenancy/).
- If you use GrabWP Pro or WaaS, contact GrabWP support with your collected facts.
- If you rent a site on a platform run by someone else, contact that platform operator directly.

## Related

- [Notices and error messages](/help/notices-and-errors)
- [Notice: load.php is not included in wp-config.php](/help/red-notice-load-php)
- [Notices about the MU-plugin or data directory](/help/mu-plugin-or-data-directory-notice)
- [Path URLs (/site/...) show 404 or a wrong page](/help/path-urls-return-404)
- [Site dashboard icon sends me to the login page](/help/site-login-fails)
- [Install GrabWP](/manage-sites/install)
