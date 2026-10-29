---
title: "Base settings"
description: "Every setting on Tenancy > Settings in GrabWP Tenancy Base, with its exact label, tab, default and WordPress constant."
sidebar_label: "Base settings"
sidebar_position: 2
tags: [reference, settings, routing, server, plan-base, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** this page lists every setting on **Tenancy > Settings** (page title **GrabWP Tenancy Settings**). Global capability and performance settings are stored in `{base}/settings.php`, while the routing mode is stored in `{base}/tenants.php`.

| Label in wp-admin | Tab | Default | What it does | Notes |
|---|---|---|---|---|
| **Disable Install Plugins & Themes** | **Tenant Capabilities** | On (`true`) | `Tenant admins cannot install, update or delete plugins and themes.` | Sets `DISALLOW_FILE_MODS=true` on tenant requests. |
| **Disable Plugin & Theme File Editor** | **Tenant Capabilities** | On (`true`) | `Tenant admins cannot use the built-in code editor for plugin and theme files.` | Sets `DISALLOW_FILE_EDIT=true` on tenant requests. |
| **Hide Plugins Menu** | **Tenant Capabilities** | Off (`false`) | `Removes the Plugins menu from tenant dashboards.` | Also removes the `plugins` node from the tenant admin bar. |
| **Hide Appearance Menu** | **Tenant Capabilities** | Off (`false`) | `Removes the Appearance menu (themes) from tenant dashboards.` | Also removes the `themes` node from the tenant admin bar. |
| **Hide GrabWP Plugins** | **Tenant Capabilities** | On (`true`) | `Hides every GrabWP plugin and the SQLite plugin from the tenant Plugins list, so tenants cannot turn them off by mistake.` | Hides Base, Pro, WaaS, add-ons and the SQLite integration plugin on tenants. |
| **Disable WP-Cron** | **Performance & Security** | On (`true`) | `Turns off the built-in task scheduler on tenant sites. Run a server cron job instead.` | Sets `DISABLE_WP_CRON=true` on tenant requests. |
| **Disable XML-RPC** | **Performance & Security** | On (`true`) | `Turns off the old remote publishing API, a common target of password-guessing attacks.` | Disables XML-RPC on tenant requests. |
| **Post Revisions to Keep** | **Performance & Security** | `3` | `How many older versions of each post to keep. 0 turns revisions off.` | Sets `WP_POST_REVISIONS` (`0` to `100`). |
| **Days Before Trash Is Emptied** | **Performance & Security** | `7` | `Deleted items stay in the Trash this many days. 0 deletes them right away.` | Sets `EMPTY_TRASH_DAYS` (`0` to `365`). |
| **Block External Requests** | **Performance & Security** | Off (`false`) | `Tenant sites cannot connect to other websites, except the allowed hosts below.` | Sets `WP_HTTP_BLOCK_EXTERNAL=true` on tenant requests. |
| **Allowed Hosts When Blocked** | **Performance & Security** | `*.wordpress.org,*.grabwp.com` | `Comma-separated host names tenant sites can still reach when external requests are blocked. Wildcards like *.wordpress.org work.` | Sets `WP_ACCESSIBLE_HOSTS`. |
| **Routing mode** | **Routing** | **Path and domain** (`both`) | Controls whether tenant sites open on **Path** (`path`), **Domain** (`domain`) or **Path and domain** (`both`). | Stored in `{base}/tenants.php`. In **Domain** mode, visiting a tenant's path URL redirects (301) to its domain. |
| **Path prefix** | **Routing** | `site` | Shows `/site/` in Base; editable as **Path Prefix** (`1` to `20` characters, lowercase letters, digits and hyphens) when Pro is active. | Stored in Pro `routing.path_prefix` or set via `GRABWP_TENANCY_PATH_PREFIX`. |
| **Path Alias Routing** (**Enable Path Alias Routing**) | **Routing** (with Pro active) | On (`true`) for new installs; off (`false`) for upgraded installs | `Allow tenants to have custom URL slugs instead of the 6-character tenant ID.` | Rendered on **Tenancy > Settings > Routing** when Pro 1.1.16+ and Base 1.1.13+ are active. |

## Rules that change a value

- **Preset constants in `wp-config.php`:** if a WordPress constant (`DISALLOW_FILE_MODS`, `DISALLOW_FILE_EDIT`, `DISABLE_WP_CRON`, `WP_POST_REVISIONS`, `EMPTY_TRASH_DAYS`, `WP_HTTP_BLOCK_EXTERNAL`, `WP_ACCESSIBLE_HOSTS`) is already defined in `wp-config.php` or an earlier plugin before GrabWP loads, that constant overrules **Tenancy > Settings** and any per-tenant override. Since Base 1.1.14, GrabWP shows a warning under the overruled setting.
- **Locked routing mode:** defining `GRABWP_TENANCY_ROUTING_MODE` in `wp-config.php` to `path`, `domain` or `both` locks **Routing mode** on **Tenancy > Settings > Routing** and shows `The routing mode is set by GRABWP_TENANCY_ROUTING_MODE in wp-config.php. Remove the constant to change it here.` If the constant has any other value, GrabWP ignores it and warns `GRABWP_TENANCY_ROUTING_MODE in wp-config.php is not a valid mode (path, domain or both), so it is ignored.`
- **Per-tenant overrides (Pro):** when GrabWP Tenancy Pro is active, an operator can override individual settings for a single tenant on the tenant **Overrides** tab (**Use global setting**, **Yes**, **No**, or a custom number/text value).

## Changed in recent versions

| Version | Change |
|---|---|
| Base 1.1.14 | Added preset-constant detection (`capture_preset_constants`) and warnings on **Tenancy > Settings** and **Tenancy > Status > Base Plugin**. **Hide GrabWP Plugins** now hides all GrabWP plugins and add-ons. |
| Base 1.1.13 | Added the **Routing** tab with **Routing mode** (**Path**, **Domain**, **Path and domain**). |
| Pro 1.1.16 | Moved **Path Prefix** and **Path Alias Routing** into **Tenancy > Settings > Routing** when Base 1.1.13+ is active. |
| Base 1.1.4 | Added the **Performance & Security** tab and `GRABWP_TENANCY_PATH_PREFIX` support. |
| Base 1.0.9 | Changed default of **Hide Plugins Menu** and **Hide Appearance Menu** from `true` to `false` on new installs. |

## Related

- [Pro settings](/kb/reference/pro-settings)
- [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins)
- [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant)
- [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron)
- [Quick start](/grabwp-tenancy/quick-start)
