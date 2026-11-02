---
title: "A site cannot install or find plugins and themes"
description: "Why site admins cannot upload plugins and themes by default, why isolated sites start without themes, and how to manage extensions."
sidebar_label: "Cannot install plugins"
tags: [troubleshooting, isolation, settings, plan-base, plan-pro, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.15, Pro 1.1.18"
last_verified_date: "2026-11-03"
---

**Short answer:** by default, GrabWP blocks site admins from installing, updating, or deleting plugins and themes (`DISALLOW_FILE_MODS`) so client sites cannot upload arbitrary PHP code. A platform operator can manage extensions for a site from the main site under **Tenancy > All Tenants** (**Plugins & Themes**), or allow file modifications globally or per site.
**Needs:** Free

## Symptom

A site owner or operator notices one of these behaviours on a client site:

- In the site's `wp-admin`, **Plugins > Add New** and **Appearance > Themes > Add New** are missing, or the **Plugins** and **Appearance** menus are hidden completely.
- A newly created isolated site has no active theme until one is installed, matching the hint on **Tenancy > Pro Settings > Isolation**:
  - `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.`
- A third-party premium plugin that is licensed on the main site asks for a license key again inside a client site.

## Cause

| What you see | Why it happens |
|---|---|
| No **Add New** button under **Plugins** or **Appearance** in site admin | **Disable Install Plugins & Themes** (`disallow_file_mods`, which sets `DISALLOW_FILE_MODS`) is turned on by default under **Tenancy > Settings > Tenant Capabilities**. |
| **Plugins** or **Appearance** menu is completely absent in site admin | **Hide Plugins Menu** (`hide_plugin_management`) or **Hide Appearance Menu** (`hide_theme_management`) is turned on in **Tenancy > Settings > Tenant Capabilities** or in the site's **Overrides** tab. |
| **Appearance** shows **Customize**, **Menus** and **Widgets** but no **Themes**, and opening the Themes screen says `Themes are managed by your host.` | **Hide Themes Screen** (`hide_theme_switching`, Base 1.1.15 or later) is turned on. Site admins keep customizing their current theme but cannot browse, install or switch themes. |
| GrabWP and SQLite plugins do not appear in the site's plugin list | **Hide GrabWP Plugins** (`hide_grabwp_plugins`) is turned on by default so site admins cannot see or deactivate platform plugins. |
| New isolated site has no themes installed | When **Level of isolation for new sites** is set to **Advanced** (or **Custom** with **Give each new site its own themes**), the site gets its own empty themes folder and starts without themes unless cloned from a template. |
| Changing **Tenancy > Settings** has no effect on a site | `DISALLOW_FILE_MODS` or `DISALLOW_FILE_EDIT` is already defined in `wp-config.php` before GrabWP loads, which overrules the settings screen. |
| Third-party premium plugin is unlicensed on the site | Each site has its own isolated database tables and options, so a license activation saved in the main site's database is not shared with other sites. |

## Check

1. In the main site admin, go to **Tenancy > Settings > Tenant Capabilities** and check the switches for **Disable Install Plugins & Themes**, **Disable Plugin & Theme File Editor**, **Hide Plugins Menu**, **Hide Appearance Menu** and **Hide Themes Screen**. The **Tenant file safety** card on **Tenancy > Status** sums up whether site admins can add code (see [Tenant file safety warning](#tenant-file-safety-warning)).
2. If GrabWP Pro is active, go to **Tenancy > All Tenants**, hover over the site, and open its **Overrides** tab to check whether this site overrides the global **Disable Install Plugins & Themes** setting or displays a constant pin notice from `wp-config.php`.
3. Open the site's **Extensions** tab (click **Plugins & Themes** on the site row under **Tenancy > All Tenants**) to see which plugins and themes are installed for that site.

## Fix

### Install plugins or themes from the main site admin

The safest way to give a site a plugin or theme is from the main site admin:

1. Go to **Tenancy > All Tenants**.
2. Click **Plugins & Themes** on the site row (which opens the **Extensions** tab).
3. Activate, sync, or install the required plugins and themes for that site from the main site.

### Allow a trusted site to install its own plugins and themes

Only turn off **Disable Install Plugins & Themes** for site owners you trust completely, because anyone who can upload a WordPress plugin or theme can execute PHP code on your server.

- **For one site only (Pro):** go to **Tenancy > All Tenants**, open the site's **Overrides** tab, set **Disable Install Plugins & Themes** to **No**, and click **Save Overrides**.
- **For all sites:** go to **Tenancy > Settings > Tenant Capabilities**, turn off **Disable Install Plugins & Themes**, and save changes.
- If a warning says the constant is already defined in `wp-config.php`, remove the manual `define( 'DISALLOW_FILE_MODS', true );` line from `wp-config.php` so GrabWP can manage it.

### Third-party premium plugin licenses on client sites

Whether one third-party plugin license covers multiple sites depends on that vendor's licensing terms and domain checks. If the vendor allows multi-site or template use and does not lock activation to a single hostname, activate the plugin on a template site and clone that template when provisioning new sites.

## Tenant file safety warning

Since Base 1.1.15, **Tenancy > Status > Plugin General** and the setup wizard's **Server check** include a **Tenant file safety** card. It shows **OK** with `Tenant admins cannot install or edit plugin and theme code.` while both protections are on.

It shows **Unsafe** with `Tenant admins can install or edit plugin and theme code. That code runs on this server and can read the secret keys every site shares.` when any of these is true, and lists each cause:

| Cause | What the card says to do |
|---|---|
| **Disable Install Plugins & Themes** or **Disable Plugin & Theme File Editor** is off on **Tenancy > Settings > Tenant Capabilities** | `Turn on %s in Settings.` Click **Open Settings**. |
| Code that loads before GrabWP, usually `wp-config.php`, sets `DISALLOW_FILE_MODS` or `DISALLOW_FILE_EDIT` to `false` | Change the value to `true` or remove that line. |
| A Pro per-site override turns one of the protections off for a site | In that site's **Overrides** screen, choose **Yes** or **Use global setting**. This line needs Pro 1.1.18 or later together with Base 1.1.15. |

{/* TODO screenshot: the Tenant file safety card in its Unsafe state on Tenancy > Status (Base 1.1.15 or later). No such shot exists in the admin screenshot library yet. */}

The card is a warning only. If you turned a protection off on purpose for a site you trust completely, you can leave it.

## Still stuck

If you turned off **Disable Install Plugins & Themes** and verified `wp-config.php`, but the site admin still cannot install plugins, send screenshots of **Tenancy > Settings > Tenant Capabilities** and the site's **Overrides** tab. See [What to send when you ask for help](/help/getting-help).

## Related

- [Per-site plugins and themes](/manage-sites/plugins-and-themes)
- [Free settings](/manage-sites/free-settings)
- [Site settings and overrides](/manage-sites/site-settings)
- [What to send when you ask for help](/help/getting-help)
