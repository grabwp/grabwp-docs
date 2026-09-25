---
title: "Per-Site Plugins & Themes"
description: "Install and activate plugins and themes for one tenant"
order: 13
section: pro
---

# Per-Site Plugins & Themes

Each tenant can have its own plugins and themes when isolation is enabled for that site.

## Turn isolation on

1. Open the tenant: **Tenancy → All Tenants**, then **Settings** on the row (`page=grabwp-tenancy-edit`).
2. Enable **Plugins Isolation** and/or **Content + Themes Isolation**.
3. Click **Update Tenant**.

Without **Plugins Isolation**, the Plugins table shows **Plugins Isolation is disabled for this tenant. Enable it in the tenant edit form to manage plugins here.** Without **Content + Themes Isolation**, the Themes table shows **Content + Themes Isolation is disabled for this tenant. Enable it in the tenant edit form to manage themes here.**

## Open Extensions

**Navigate to Tenancy → All Tenants**, then **Plugins & Themes** on the row (`page=grabwp-tenancy-pro-extensions`).

You can also open the **Extensions** tab on the tenant.

![Extensions, Plugins](../images/grabwp-tenancy-pro-tenant-extension.png)

The title is **Extensions:** plus the tenant ID. The line under the tabs shows **Primary Domain** and **Install Method**.

| Install Method | Notes |
|----------------|--------|
| Symlink | The tenant points at the main site's plugin or theme files. Updates on the main site apply to the tenant. Uses less disk. |
| Own Copy | Files are copied into the tenant directory. The tenant does not follow later main-site updates until you click **Sync**. |

Changing **Install Method** saves immediately (**Saved!**) and reloads the page. It does not convert extensions that are already installed. Use **Convert to Copy** or **Convert to Symlink** on a row to change that extension. The convert button that appears depends on the method you selected.

**Install All from Config** appears when `extensions.php` lists plugins or themes that are not installed yet. **Fix All Broken Symlinks** appears when a symlink target is missing.

### Plugins and Themes

Tabs: **Plugins** and **Themes**.

![Extensions, Themes](../images/grabwp-tenancy-pro-tenant-extension-themes.png)

Columns: **Plugin** (or theme name), **Source**, **Status**, **Activation**, **Actions**.

Source badges: **Main**, **Supported**, **Custom**, **Unknown**. Filter buttons **All**, **Main**, **Supported**, and **Custom** show up only when that source exists. **Installed** filters the table and is remembered. The search box placeholder is **Filter plugins...** or **Filter themes...**.

| Status | Actions |
|--------|---------|
| Not installed | **Install** |
| Symlink | **Remove**, and **Convert to Copy** when Install Method is **Own Copy** |
| Own Copy | **Remove**, **Sync**, and **Convert to Symlink** when Install Method is **Symlink** |
| Broken Symlink | **Fix Symlink**, **Remove broken link** |

When the tenant database can be read, an installed row also has **Activate** or **Deactivate**. Activation badges are **Active** and **Inactive**. If the database cannot be read, activation shows **?**.

Install, remove, sync, convert, activate, and deactivate update that row in place. The tab and scroll position stay put.

### Orphaned Extensions

If a plugin or theme exists in the tenant directory but not in a source directory, **Orphaned Extensions** lists it. Actions include **Copy to Main Site** and remove.

**Verify:** After **Install** and **Activate**, the row shows **Active**, and the plugin or theme is available in that tenant's wp-admin (**WP Admin** tab).
