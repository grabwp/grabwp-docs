---
title: "Notices about the MU-plugin or data directory"
description: "How to fix missing MU-plugin, missing data directory, file permission errors and legacy path structure notices."
sidebar_label: "MU-plugin or data directory notices"
sidebar_position: 2
tags: [troubleshooting, server, plan-base, for-operator, for-cs]
last_verified_version: "Base 1.1.14"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP needs a helper file at `wp-content/mu-plugins/mu-grabwp-tenancy.php` and a writable data folder at `wp-content/grabwp-tenancy`. Open **Tenancy > Status** to use **⚡ Auto Fix**, or grant write permissions to `wp-content` so GrabWP can create both items.

## Symptom

You see one or more of these notices on GrabWP admin pages or on **Tenancy > Status**:

- `MU-plugin is not installed. Tenant features may not work.`
- `Auto-install of MU-plugin will not work. Manual installation required.`
- `Data directory is missing.`
- `Plugin needs write access to create tenant directories and manage configuration files.`
- `Could not read tenants.php, so nothing was changed. Check the file and its permissions.`
- `You're using a legacy path structure. To comply with WordPress standards:`

## Cause

| If you see | It means |
|---|---|
| `MU-plugin is not installed. Tenant features may not work.` | The file `wp-content/mu-plugins/mu-grabwp-tenancy.php` is missing or outdated. |
| `Auto-install of MU-plugin will not work. Manual installation required.` | The `wp-content/mu-plugins` folder is not writable by the web server user. |
| `Data directory is missing.` | The folder where GrabWP keeps tenant files (`wp-content/grabwp-tenancy` by default) does not exist. |
| `Plugin needs write access to create tenant directories and manage configuration files.` | The data folder exists, but the web server user cannot write to it. |
| `Could not read tenants.php, so nothing was changed. Check the file and its permissions.` | GrabWP could not read `tenants.php` inside the data folder, so it refused to save changes to avoid losing existing tenant mappings. |
| `You're using a legacy path structure. To comply with WordPress standards:` or `Data directory inside uploads/` | Your install still uses an older folder location (`wp-content/grabwp` or `wp-content/uploads/grabwp-tenancy`) instead of `wp-content/grabwp-tenancy`. |

## Check

1. Open **Tenancy > Status** on the **Plugin General** tab.
2. Check the **2. MU-Plugin** card; a working install shows **✓ Installed**.
3. Open **System Information** on the same tab and check **Data Dir Writable** and **MU-Plugins Dir Writable**; both should show **✓ Yes**.
4. Switch to the **Base Plugin** tab on **Tenancy > Status** to see the active data directory path and whether any `Multiple tenants.php files detected` or `Data directory inside uploads/` warnings appear.

## Fix

### Missing or outdated MU-plugin

1. On **Tenancy > Status**, open **Fix steps and install code** inside the **2. MU-Plugin** card.
2. Click **⚡ Auto Fix** if the button is shown.
3. If the folder is not writable, click **📋 Copy Code**, create the folder `wp-content/mu-plugins` on your server if it does not exist, and save the copied code as `wp-content/mu-plugins/mu-grabwp-tenancy.php`.

### Missing or unwritable data directory

1. Ensure `wp-content/grabwp-tenancy` exists and is writable by the web server user (standard WordPress directory permissions are `755` and file permissions are `644`).
2. Confirm that `tenants.php` and `settings.php` inside `wp-content/grabwp-tenancy` are readable and writable by the web server user.
3. Reload **Tenancy > Status** and check that the **Data Directory .htaccess** card shows **✓ Protected**.

### Legacy path structure notice

If **Tenancy > Status** shows `You're using a legacy path structure. To comply with WordPress standards:`, follow the three steps shown on the notice during a maintenance window:

1. `1. Deactivate the plugin`
2. `2. Rename and move the entire %1$s folder to %2$s` (moving the old folder to `wp-content/grabwp-tenancy` so that only one `tenants.php` file exists on disk).
3. `3. Reactivate the plugin`

Do not leave copies of `tenants.php` in both the old and new locations, or the status checker will warn `Multiple tenants.php files detected`. For step-by-step checks, see [Troubleshooting](/grabwp-tenancy/troubleshooting) and [Where tenant data lives](/kb/concepts/where-tenant-data-lives).

## Still stuck

If notices remain after fixing permissions or moving the data folder, collect the **Plugin General** and **Base Plugin** tabs from **Tenancy > Status** and follow [What to send when you ask for help](/kb/start-here/getting-help).
Do not promise: if you moved the legacy folder from `wp-content/uploads/grabwp-tenancy` and the plugin still looks under the old path, a fix for that edge case is being worked on.
