---
title: "Apache, LiteSpeed and Nginx"
description: "How Apache, LiteSpeed and Nginx handle path routing, .htaccess rules and domain symlinks in GrabWP."
sidebar_label: "Web server guide"
tags: [server, routing, domains, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-30"
---

**Short answer:** Apache and LiteSpeed read `.htaccess` files, so GrabWP can write path routing rules automatically. Nginx does not use `.htaccess` files, so you must add routing rules and any Pro domain symlink rules to your Nginx server block manually.
**Needs:** Free

## What it is

Your web server passes incoming visitor requests to WordPress so GrabWP can identify the site by domain or by URL path (`/{prefix}/{tenant}/`).

| Web server | `.htaccess` support | Path routing setup | Pro **Domain Symlink (Clean URLs)** rule location |
|---|---|---|---|
| Apache | Yes (requires `mod_rewrite`) | Automatic in root `.htaccess` between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` | `wp-content/uploads/.htaccess` |
| LiteSpeed | Yes (requires `mod_rewrite`) | Automatic in root `.htaccess` between `# BEGIN GrabWP Tenancy` and `# END GrabWP Tenancy` | `wp-content/uploads/.htaccess` |
| Nginx | No | Manual server block rule required | Manual `location ^~ /wp-content/` block in the Nginx server block |

## Why it matters

- On Apache or LiteSpeed, if the `# BEGIN GrabWP Tenancy` block in the root `.htaccess` file is missing or appears after `# BEGIN WordPress`, wp-admin shows `Root .htaccess needs to be updated for tenant routing.`
- On Apache without `mod_rewrite`, **Tenancy > Status** shows `Path routing requires mod_rewrite. Query string routing (?site=id) will be used as fallback.`
- On Nginx, **Tenancy > Status** shows `ℹ .htaccess files are not used by Nginx. Configure tenant routing in your server block instead.` Without manual Nginx rules, path URLs such as `/site/abc123` return a 404 page.

## How to check

1. Open **Tenancy > Status** in wp-admin and inspect the **Web Server** row on the **Plugin General** tab.
2. On Apache or LiteSpeed, check the **mod_rewrite** row and switch to the **Base Plugin** tab to confirm `.htaccess` status.
3. If you enable **Domain Symlink (Clean URLs)** in Pro, open **Tenancy > Pro Settings > Symlink** and expand **Required server rules** to copy the exact snippet for your server.

## What to do

- If you see `Root .htaccess needs to be updated for tenant routing.` on Apache or LiteSpeed, open **Tenancy > Status** and run the fix action or place the `# BEGIN GrabWP Tenancy` block above `# BEGIN WordPress`.
- If you run Nginx, add the site routing rules to your Nginx server block as shown in [Site addresses, domains and DNS](/manage-sites/domains-and-dns).
- If you enable **Domain Symlink (Clean URLs)** under **Tenancy > Pro Settings > Symlink**, copy the Nginx or LiteSpeed/Apache rule shown under **Required server rules** and reload your web server.

## Limits and versions

- Verified against Base 1.1.14 and Pro 1.1.17.
- Beginning in Base 1.1.9, GrabWP locks shared root files (`wp-config.php`, `.htaccess`, `.user.ini`, `web.config`) to read-only (`0444`) by default so site plugins cannot overwrite them; use **Tenancy > Status** to unlock shared files temporarily if a main-site plugin needs to edit `.htaccess`.

## Related

- [Path URLs (/site/...) show 404 or a wrong page](/help/path-urls-return-404)
- [Site addresses, domains and DNS](/manage-sites/domains-and-dns)
- [Hosting requirements](/help/hosting-requirements)
