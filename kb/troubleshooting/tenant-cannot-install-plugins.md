---
title: "A tenant cannot install or find plugins and themes"
description: "Why tenant admins cannot upload or install plugins and themes by default, why isolated sites start without themes, and how third-party plugin licenses work."
sidebar_label: "Tenant cannot install plugins or themes"
sidebar_position: 11
tags: [troubleshooting, isolation, settings, plan-base, plan-pro, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** by default, GrabWP blocks tenant admins from installing, updating or deleting plugins and themes (`DISALLOW_FILE_MODS`) so a tenant cannot upload arbitrary PHP code to your server. A platform operator can manage plugins for the tenant from the main site under **Tenancy > All Tenants** (**Plugins & Themes**), or allow file modifications globally or for one trusted tenant.

## Symptom

A site owner or operator notices one of these behaviours on a tenant site:

- In the tenant's `wp-admin`, **Plugins > Add New** and **Appearance > Themes > Add New** are missing, or the **Plugins** and **Appearance** menus are hidden completely.
- A newly created isolated tenant has no active theme until one is installed, matching the hint on **Tenancy > Pro Settings > Isolation**:
  - `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.`
- A third-party premium plugin that is licensed on the main site asks for a license key again inside a tenant site.

## Cause

| What you see | Why it happens |
|---|---|
| No **Add New** button under **Plugins** or **Appearance** in tenant admin | **Disable Install Plugins & Themes** (`disallow_file_mods`, which sets `DISALLOW_FILE_MODS`) is turned on by default under **Tenancy > Settings > Tenant Capabilities**. |
| **Plugins** or **Appearance** menu is completely absent in tenant admin | **Hide Plugins Menu** (`hide_plugin_management`) or **Hide Appearance Menu** (`hide_theme_management`) is turned on in **Tenancy > Settings > Tenant Capabilities** or in the tenant's **Overrides** tab. |
| GrabWP and SQLite plugins do not appear in the tenant's plugin list | **Hide GrabWP Plugins** (`hide_grabwp_plugins`) is turned on by default so tenant admins cannot see or deactivate platform plugins. |
| New isolated tenant has no themes installed | When **Level of isolation for new sites** is set to **Advanced** (or **Custom** with **Give each new site its own themes**), the tenant gets its own empty themes folder and starts without themes unless cloned from a template. |
| Changing **Tenancy > Settings** has no effect on a tenant | `DISALLOW_FILE_MODS` or `DISALLOW_FILE_EDIT` is already defined in `wp-config.php` before GrabWP loads, which overrules the settings screen. |
| Third-party premium plugin is unlicensed on the tenant | Each tenant has its own isolated database tables and options, so a license activation saved in the main site's database is not shared with tenants. |

## Check

1. In the main site admin, go to **Tenancy > Settings > Tenant Capabilities** and check the switches for **Disable Install Plugins & Themes**, **Disable Plugin & Theme File Editor**, **Hide Plugins Menu** and **Hide Appearance Menu**.
2. If GrabWP Pro is active, go to **Tenancy > All Tenants**, hover over the tenant, and open its **Overrides** tab to check whether this tenant overrides the global **Disable Install Plugins & Themes** setting or displays a constant pin notice from `wp-config.php`.
3. Open the tenant's **Extensions** tab (click **Plugins & Themes** on the tenant row under **Tenancy > All Tenants**) to see which plugins and themes are installed for that tenant.

## Fix

### Install plugins or themes for a tenant without opening file uploads

The safest way to give a tenant a plugin or theme is from the main site admin:

1. Go to **Tenancy > All Tenants**.
2. Click **Plugins & Themes** on the tenant row (which opens the **Extensions** tab).
3. Activate, sync or install the required plugins and themes for that tenant from the main site.

### Allow a trusted tenant to install its own plugins and themes

Only turn off **Disable Install Plugins & Themes** for tenants you trust completely, because any user who can upload a WordPress plugin or theme can run arbitrary PHP code on your server.

- **For one tenant only (Pro):** go to **Tenancy > All Tenants**, open the tenant's **Overrides** tab, set **Disable Install Plugins & Themes** to **No**, and click **Save Overrides**.
- **For all tenants:** go to **Tenancy > Settings > Tenant Capabilities**, turn off **Disable Install Plugins & Themes**, and save changes.
- If a warning says the constant is already defined in `wp-config.php`, remove the manual `define( 'DISALLOW_FILE_MODS', true );` line from `wp-config.php` so GrabWP can control it.

### Third-party premium plugin licenses on tenants

Whether one third-party plugin license covers multiple tenants depends on that vendor's licensing terms and domain checks. Check with the plugin vendor first. If the vendor allows multi-site or template use and does not lock activation to a single hostname, you can activate the plugin on a template tenant and clone that template for new sites.

For full details on managing tenant plugins and themes, see [Pro extensions](/grabwp-tenancy-pro/pro-extensions), [Tenant settings](/grabwp-tenancy-pro/pro-tenant-settings) and [Isolation levels](/kb/concepts/isolation-levels).

## Still stuck

If you turned off **Disable Install Plugins & Themes** and checked `wp-config.php`, but the tenant admin still cannot install plugins, send screenshots of **Tenancy > Settings > Tenant Capabilities** and the tenant's **Overrides** tab. See [What to send when you ask for help](/kb/start-here/getting-help).
Do not promise: that a single third-party plugin license key will cover every tenant site, or that defining a vendor constant in `wp-config.php` works across tenants (unverified).
