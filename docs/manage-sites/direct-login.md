---
title: "Log in to a client site"
description: "How the Admin icon logs you in to a client site without a password, the 30 minute window, and what its error messages mean."
sidebar_label: "Log in to a client site"
tags: [plan-base, for-operator, for-cs]
last_verified_version: "Base 1.1.14"
last_verified_date: "2026-10-30"
---

**Short answer:** on **Tenancy > All Tenants**, click the **Admin** icon (dashboard icon) on a site's row. You land in that site's wp-admin, logged in, without typing a password. The link works for 30 minutes; after that, reload the list and click again.

**Needs:** Free

## How it works

When the list loads, the main site builds a signed login link for each site. The site checks the signature and the age of the link, then logs you in as its first administrator (the administrator account with the lowest user ID).

- The link is valid for 1800 seconds (30 minutes). A developer can change this with the `GRABWP_TENANCY_TOKEN_TTL` constant in `wp-config.php`.
- With Pro, the **WP Admin** tab on every per-site screen uses the same signed link.
- Right after you create a site, the **Open site admin (1-click)** button does the same.

Treat the link like a password. Do not paste it into chats or tickets.

## Steps

1. Open **Tenancy > All Tenants**.
2. Find the site (use **Search by ID or domain...** if the list is long).
3. Click the **Admin** icon. The site's wp-admin opens in a new tab.

## When it does not work

If the check fails, the site sends you to its login page with `grabwp_token_error=1` in the address and one of these messages:

| Message | What it means | What to do |
|---|---|---|
| `Invalid or expired admin access token.` | The link is older than 30 minutes, or its signature does not match. | Reload **Tenancy > All Tenants** and click **Admin** again. |
| `No admin user found for tenant access.` | The site has no administrator account to log in as. | Create an administrator for that site, or restore it from a backup. |
| `Tenant identification failed.` | The link was valid, but the address it opened did not match any site. | Check the site's domain or path address opens the right site, then try again. If it still fails, send the details listed in [What to send when you ask for help](/help/getting-help). |

If a fresh link fails every time, also check **Tenancy > Status** for warnings, then read [Site login fails](/help/site-login-fails).

## Limits

- Only main-site administrators see the **Admin** icon.
- The login uses an existing administrator of that site. It does not create one.

## Related

- [Create and manage sites](/manage-sites/create-and-manage-sites)
- [Site login fails](/help/site-login-fails)
- [Where things are in wp-admin](/manage-sites/wp-admin-map)
