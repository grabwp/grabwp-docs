---
title: "Path URLs (/site/...) show 404 or a wrong page"
description: "Why path-based site URLs return 404 or open the main site, and how to configure Apache, LiteSpeed or Nginx."
sidebar_label: "Path URLs show 404"
tags: [troubleshooting, routing, server, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.15, Pro 1.1.18"
last_verified_date: "2026-11-03"
---

**Short answer:** path URLs such as `example.com/site/abc123` need web server rewrite rules before WordPress loads its own permalinks. On Apache or LiteSpeed, use **Auto Fix** on **Tenancy > Status**; on Nginx, add the rewrite rules to your server block configuration.
**Needs:** Free

## Symptom

Opening a site by its path URL (such as `/site/{tenant_id}` or `/site/{tenant_id}/wp-admin`) returns a 404 page or loads the main platform site instead.

In wp-admin, you may also see one of these messages:

- `Root .htaccess needs to be updated for tenant routing.`
- `.htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` (note under **Web Server** in **System Information**)
- `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.` (note under **mod_rewrite** in **System Information**)

Or, on **Tenancy > All Tenants**, the **Domains** column says "Path access only".

## Cause

| If you see | It means |
|---|---|
| `Root .htaccess needs to be updated for tenant routing.` | On Apache or LiteSpeed, the `# BEGIN GrabWP Tenancy` block in the root `.htaccess` file is missing, uses an old path prefix, was written by a version older than Base 1.1.15, or sits below `# BEGIN WordPress`. |
| The site home page at `/site/{tenant_id}/` works, but its posts, pages, REST or feed URLs return 404 on OpenLiteSpeed (for example on xCloud) | Before Base 1.1.15, path rules needed `.htaccess` to run twice, and OpenLiteSpeed runs it once. Base 1.1.15 routes these URLs in one pass, but the old block stays until you upgrade it (the card shows **⚠ Invalid content**). |
| `.htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` | Nginx ignores `.htaccess` files and needs rewrite rules added to the Nginx server block. |
| `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.` | Apache does not have `mod_rewrite` enabled, so `/site/...` paths cannot be rewritten. |
| **Routing Mode** is set to `domain` | Path routing is turned off in **Tenancy > Settings > Routing** or pinned by `GRABWP_TENANCY_ROUTING_MODE` in `wp-config.php`. |
| **Domains** column says "Path access only" | The site was created without a domain. The path URL on Edit is only a preview until a domain is attached. |
| Front end works with default theme, breaks with a specific theme | Some custom or third-party themes hardcode root path assumptions and do not support path routing. |

## Check

1. Go to **Tenancy > Settings > Routing** and check that **Routing Mode** is set to `path` or `both`.
2. Go to **Tenancy > Status** on the **Plugin General** tab and open **System Information** to see what **Web Server** reports (Apache, LiteSpeed, or Nginx).
3. On Apache or LiteSpeed, check the **3. Root .htaccess Rewrite Rules** card on **Tenancy > Status**; it should show **Installed**.
4. If the card shows **Wrong position**, **Invalid content**, **Missing block**, or **No .htaccess**, open **Fix steps and install code** on that card.

## Fix

### On Apache or LiteSpeed

1. On **Tenancy > Status**, open **Fix steps and install code** under **3. Root .htaccess Rewrite Rules** and click **Auto Fix**.
2. If `.htaccess` is not writable, click **Copy Code** and paste the `# BEGIN GrabWP Tenancy` block at the very top of your root `.htaccess` file, before `# BEGIN WordPress`.
3. Reload **Tenancy > Status** to confirm the card shows **Installed**.

On OpenLiteSpeed, update GrabWP Tenancy to 1.1.15 or later first, then run **Auto Fix** once so the old block is replaced by the one-pass rules.

### On Nginx

Nginx does not read `.htaccess`. Add the GrabWP path rewrite rules for your path prefix (default `site`) to your Nginx server block configuration and reload Nginx. See [Site addresses, domains and DNS](/manage-sites/domains-and-dns) and [Web server guide](/help/web-server-guide) for server configuration snippets.

### Assigning a domain when "Path access only" is shown

If a site shows "Path access only" in the **Domains** column:

1. Open **Tenancy > All Tenants** and click **Settings** on the site row (or **Edit** in Base).
2. Enter the desired domain name in the domain field.
3. Click **Update Tenant**.
4. Complete your DNS records to point that domain to the server.

### If a specific theme breaks on path URLs

Test the site with a standard WordPress default theme. If the site works with the default theme but fails with your custom theme under `/site/{tenant_id}`, use domain routing (subdomains or custom domains) for sites that run that theme.

## Still stuck

If path URLs still return 404 after updating your web server rules, click **Copy diagnostics** under **Support diagnostics** on **Tenancy > Status** and send it with your `.htaccess` or Nginx configuration block. See [What to send when you ask for help](/help/getting-help).

## Related

- [Web server guide](/help/web-server-guide)
- [Site addresses, domains and DNS](/manage-sites/domains-and-dns)
- [Free settings](/manage-sites/free-settings)
- [What to send when you ask for help](/help/getting-help)
