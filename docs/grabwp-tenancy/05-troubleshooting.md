---
title: "Troubleshooting"
description: "Common issues and how to fix them"
order: 5
section: tenancy
---

# Troubleshooting

## Check Status first

**Navigate to Tenancy → Status** (`page=grabwp-tenancy-status`).

![GrabWP Tenancy Status](../images/grabwp-status.png)

Open **Plugin General** (`tab=general`). Use **Auto Fix** on any row that is not healthy, when the button is available. If the file is not writable, expand **Fix steps and install code** and use **Copy Code**.

| Tab | Use it for |
|-----|------------|
| Plugin General | Loader, MU-plugin, rewrite rules, data directory protection |
| Base Plugin | Directories, mappings file, settings file, capability flags |
| Pro Plugin | Whether Pro is **Active**, plus default isolation and database type |

Details: [Installation](/grabwp-tenancy/installation-guide).

## Plugin issues

### The Tenancy menu is missing

On **Plugin General**, check **wp-config.php Loader** and **MU-Plugin**. Click **Auto Fix** if either is not active or installed. You need the `manage_options` capability to see **Tenancy**.

### Errors after activation

Read **Plugin General**. Deactivating the plugin removes the loader, the must-use plugin, and the root rewrite rules. Tenant tables and uploads are not deleted. Activating again brings the tenants back.

## Domain issues

### The domain shows the wrong site or a host default page

- The domain is on the tenant: **Tenancy → All Tenants**, **Domains** column, or **Settings** on the row.
- Hosting uses this WordPress directory as the document root. See [Domain & DNS Setup](/grabwp-tenancy/hosting-dns-setup).
- DNS points at this server ([dnschecker.org](https://dnschecker.org)).
- Wait for propagation, then retry in a private window.

### Domain(s) already in use

The error is **Domain(s) already in use** (or **Domain(s) already in use by other tenants** on edit). Each domain belongs to one tenant. Remove it from the other tenant, then assign it again.

### Invalid domain format

The error is **Invalid domain format(s)**. Use `example.com` or `subdomain.example.com`. Do not use an IP address, `localhost`, `http://`, or a `www` prefix in the field.

### Domains column says Path access only

The tenant was created with **I'll set up a domain later**. Open **Settings** on the row, add a domain, click **Update Tenant**, then complete DNS. The **Path URL** on Edit is only a temporary preview.

## Content issues

### A tenant shows the main site's content

1. Deactivate and activate GrabWP Tenancy.
2. Recheck **Plugin General**.
3. Clear the browser cache, any WordPress cache plugin, and the host or CDN cache.

### Media uploads fail

Open **Tenancy → Status → Base Plugin** and confirm the base directory exists and is writable. WordPress must be able to write under the tenant uploads path shown there.

## Access issues

### The tenant admin link fails

On **All Tenants**, click **Admin** again. The link carries an access token that lasts 30 minutes by default. An expired or altered link shows **Invalid or expired admin access token.**

### Forgot the tenant admin password

Use **Lost your password?** on that tenant's login screen (`https://the-tenant-domain/wp-login.php`).

## Getting help

Include the WordPress version, PHP version, the Status tab that shows the error, and what you already tried.

- [WordPress.org support forum](https://wordpress.org/support/plugin/grabwp-tenancy/)
- Email: hello@grabwp.com
