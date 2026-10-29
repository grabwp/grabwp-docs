---
title: 'Notice: "load.php is not included in wp-config.php."'
description: "Why the red load.php notice appears in wp-admin and how to add the GrabWP Tenancy loader block to wp-config.php."
sidebar_label: "load.php notice in wp-config.php"
sidebar_position: 1
tags: [troubleshooting, server, plan-base, for-operator, for-cs]
last_verified_version: "Base 1.1.14"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP Tenancy needs one loader block inside `wp-config.php` so it can detect which tenant a visitor is opening before WordPress starts. Open **Tenancy > Status** and click **⚡ Auto Fix** on the **1. wp-config.php Loader** card, or paste the snippet manually before the stop-editing line.

## Symptom

Every admin page shows a red notice with a **View Status** link:

- `load.php is not included in wp-config.php.`

If automatic installation could not find the standard marker in your file, you may also see:

- `Could not find the stop-editing marker in wp-config.php. Please add the line manually.`

## Cause

GrabWP checks whether the constant `GRABWP_TENANCY_LOADED` is defined when WordPress boots. If it is not defined, the loader block between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` is missing from `wp-config.php`, or it was placed after WordPress finishes loading.

| If you see | It means |
|---|---|
| `wp-config.php is not writable, manual install required` | File permissions on the server prevent WordPress from editing `wp-config.php`. |
| `Stop-editing marker not found, manual install required` | Your `wp-config.php` does not contain the standard `/* That's all, stop editing! */` comment line. |
| `In wp-config.php, reload to confirm` | The block is in the file, and a page reload is needed to run it on the next request. |

## Check

1. In the main site admin, go to **Tenancy > Status** and stay on the **Plugin General** tab.
2. Look at the **1. wp-config.php Loader** card under **Environment Checks**.
3. A working install shows **✓ Active** in green on that card.
4. If it shows **✗ Not loaded**, click **Fix steps and install code** on the card to see whether **⚡ Auto Fix** is available or why manual editing is required.

## Fix

If **⚡ Auto Fix** is shown on the **1. wp-config.php Loader** card, click it and reload the page.

If **⚡ Auto Fix** is not available, add the block manually:

1. On **Tenancy > Status**, open **Fix steps and install code** inside **1. wp-config.php Loader** and click **📋 Copy Code**.
2. Open your site's `wp-config.php` file in your hosting file manager or over SFTP.
3. Paste the block above the line that starts with `/* That's all, stop editing!` and before `require_once ABSPATH . 'wp-settings.php';`:

```php
# BEGIN GrabWP Tenancy
( $_grabwpl = __DIR__ . "/wp-content/plugins/grabwp-tenancy/load.php" ) && file_exists( $_grabwpl ) && require_once $_grabwpl;
# END GrabWP Tenancy
```

4. Save `wp-config.php` and reload **Tenancy > Status** to confirm the card shows **✓ Active**.

Do not place the block at the very bottom of `wp-config.php` after `wp-settings.php`, because WordPress will have already loaded the main site database before GrabWP can detect the tenant. For full setup instructions, see the [Installation guide](/grabwp-tenancy/installation-guide) and [What GrabWP changes on your server](/kb/concepts/what-grabwp-changes-on-your-server).

## Still stuck

If the card still shows **✗ Not loaded** after saving `wp-config.php`, check whether your host stores `wp-config.php` one folder above the WordPress web root and verify the exact file path shown on the **1. wp-config.php Loader** card. See [What to send when you ask for help](/kb/start-here/getting-help) for the details to include when contacting support.
