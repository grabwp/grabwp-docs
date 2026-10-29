---
title: "Path URLs (/site/...) show 404 or a wrong page"
description: "Why path-based tenant URLs return 404 or open the main site, and how to configure Apache, LiteSpeed or Nginx."
sidebar_label: "Path URLs show 404"
sidebar_position: 3
tags: [troubleshooting, routing, server, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** path URLs such as `example.com/site/abc123` need web server rewrite rules before WordPress loads its own permalinks. On Apache or LiteSpeed, use **⚡ Auto Fix** on **Tenancy > Status**; on Nginx, add the rewrite rules to your server block configuration.

## Symptom

Opening a tenant by its path URL (such as `/site/{tenant_id}` or `/site/{tenant_id}/wp-admin`) shows a 404 page or loads the main site instead of the tenant.

In wp-admin you may also see one of these messages:

- `Root .htaccess needs to be updated for tenant routing.`
- `ℹ .htaccess files are not used by Nginx. Configure tenant routing in your server block instead.`
- `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.`

## Cause

| If you see | It means |
|---|---|
| `Root .htaccess needs to be updated for tenant routing.` | On Apache or LiteSpeed, the `# BEGIN GrabWP Tenancy` block in the root `.htaccess` file is missing, uses an old path prefix, or sits below `# BEGIN WordPress`. |
| `ℹ .htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` | Nginx ignores `.htaccess` files and needs rewrite rules added to the Nginx server block. |
| `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.` | Apache does not have `mod_rewrite` enabled, so `/site/...` paths cannot be rewritten. |
| **Routing Mode** is set to `domain` | Path routing is turned off in **Tenancy > Settings > Routing** or pinned by `GRABWP_TENANCY_ROUTING_MODE` in `wp-config.php`. |
| Front end works with default theme, breaks with a specific theme | Some custom or third-party themes hardcode root path assumptions and do not work with path routing. |

## Check

1. Go to **Tenancy > Settings > Routing** and check that **Routing Mode** is set to `path` or `both`.
2. Go to **Tenancy > Status** on the **Plugin General** tab and open **System Information** to see what **Web Server** reports (Apache, LiteSpeed or Nginx).
3. On Apache or LiteSpeed, check the **3. Root .htaccess Rewrite Rules** card on **Tenancy > Status**; it should show **✓ Installed**.
4. If the card shows **⚠ Wrong position**, **⚠ Invalid content**, **⚠ Missing block** or **✗ No .htaccess**, open **Fix steps and install code** on that card.

## Fix

### On Apache or LiteSpeed

1. On **Tenancy > Status**, open **Fix steps and install code** under **3. Root .htaccess Rewrite Rules** and click **⚡ Auto Fix**.
2. If `.htaccess` is not writable, click **📋 Copy Code** and paste the `# BEGIN GrabWP Tenancy` block at the very top of your root `.htaccess` file, before `# BEGIN WordPress`.
3. Reload **Tenancy > Status** to confirm the card shows **✓ Installed**.

### On Nginx

Nginx does not read `.htaccess`. Add the GrabWP path rewrite rules for your path prefix (default `site`) to your Nginx server configuration and reload Nginx. See [Hosting and DNS setup](/grabwp-tenancy/hosting-dns-setup) and [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide) for the server configuration steps.

### If a specific theme breaks on path URLs

Test the tenant with a standard WordPress default theme. If the site works with the default theme but fails with your custom theme under `/site/{tenant_id}`, use domain routing (subdomains or custom domains) for tenants that run that theme.

## Still stuck

If path URLs still return 404 after updating your web server rules, gather your **Web Server** row from **Tenancy > Status** and your `.htaccess` or Nginx block, then follow [What to send when you ask for help](/kb/start-here/getting-help).
Do not promise: path routing compatibility with every third-party theme, or automatic Nginx configuration on managed Nginx panels where a fix is being worked on.
