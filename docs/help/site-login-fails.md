---
title: "Site dashboard icon sends me to the login page"
description: "Why clicking the site wp-admin link redirects to wp-login.php?grabwp_token_error=1 and how to fix token or object cache issues."
sidebar_label: "Site login fails"
tags: [troubleshooting, isolation, server, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-30"
---

**Short answer:** the dashboard login icon uses a signed token that expires after 30 minutes, so first refresh **Tenancy > All Tenants** and click the link again. If a fresh link still redirects to `wp-login.php?grabwp_token_error=1` on a host with object caching, switch site isolation to **Advanced** or **Custom** under **Tenancy > Pro Settings > Isolation**.
**Needs:** Free

## Symptom

Clicking the dashboard icon to log in to a client site sends your browser to the site login screen with `?grabwp_token_error=1` in the URL instead of logging you in to `wp-admin`.

In the GrabWP log, one of these three messages is recorded:

- `Invalid or expired admin access token.`
- `Tenant identification failed.`
- `No admin user found for tenant access.`

## Cause

| If you see | It means |
|---|---|
| `Invalid or expired admin access token.` | The `grabwp_token` URL was generated more than 30 minutes ago (1800 seconds, unless `GRABWP_TENANCY_TOKEN_TTL` is set), or the signature did not match. |
| `Tenant identification failed.` | WordPress opened the request without resolving a site ID, usually because the `load.php` block in `wp-config.php` or the routing rule did not match the URL. |
| `No admin user found for tenant access.` | GrabWP connected to the site database, but no administrator account was found in the site's user table. |
| Redirect to `wp-login.php?grabwp_token_error=1` on a new site when **Tenancy > Status** is all green | On some hosts with object caching, a shared `object-cache.php` drop-in shares cached options and users across sites that share `wp-content`, which prevents the new site tables from initializing cleanly. |

## Check

1. Go to **Tenancy > All Tenants**, reload the page in your browser, and click the site dashboard icon right away to rule out an expired 30 minute token.
2. Open **Tenancy > Status** and verify that **1. wp-config.php Loader** shows **Active** and **2. MU-Plugin** shows **Installed**.
3. If GrabWP Pro is active, go to **Tenancy > Pro Settings > Isolation** and check what **Level of isolation for new sites** is selected.
4. Check whether your hosting environment places a shared `object-cache.php` file in `wp-content`.

## Fix

### If the token expired

Reload **Tenancy > All Tenants** (or **Waas > Subscriptions**) so WordPress generates a fresh `grabwp_token` and `grabwp_hash` link, then click the dashboard icon within 30 minutes.

### If you forgot the site admin password

If you need to log in directly through `wp-login.php` without using the dashboard token link, use **Lost your password?** on that site's login screen (`https://your-site-domain/wp-login.php`).

### If your host uses a shared object cache

When using a host with object caching where shared `wp-content` causes new sites to fail auto-login:

1. In the main site admin, go to **Tenancy > Pro Settings** and open the **Isolation** tab.
2. Change **Level of isolation for new sites** from **Simple** or **Shared** to **Advanced** (or choose **Custom** with isolated directories).
3. Save your changes and create a new test site to confirm direct login works.
4. For sites created while affected, open the site URL directly and complete the WordPress installer if prompted, or recreate the site after enabling **Advanced** isolation.

:::info If you sell sites
When selling sites with WaaS, customers can log in to their dashboard via one-time email code under **WAAS Auth (Email signup)** mode, or via standard credentials under **WordPress Auth (Login required)** mode. See [Set up WaaS](/sell-sites/set-up-waas).
:::

## Still stuck

If refreshing the site list and isolating `wp-content` do not resolve the redirect, send your **Tenancy > Status** output and the exact URL parameters shown on the login screen. See [What to send when you ask for help](/help/getting-help).

## Related

- [Log in to a client site](/manage-sites/direct-login)
- [Per-site plugins and themes](/manage-sites/plugins-and-themes)
- [Hosting with xCloud](/help/hosting-with-xcloud)
- [What to send when you ask for help](/help/getting-help)
