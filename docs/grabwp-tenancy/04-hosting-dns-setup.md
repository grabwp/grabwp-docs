---
title: "Domain & DNS Setup"
description: "Point a custom domain at a tenant site"
order: 4
section: tenancy
---

# Domain & DNS Setup

Each tenant site should be reached on its own domain, such as `client.com` or `client.yoursite.com`. The domain must resolve to this server, and the host must serve this WordPress directory for that domain.

Add the domain on the tenant first: **Tenancy → All Tenants**, then **Settings** on the row (`page=grabwp-tenancy-edit`). See [Managing Tenant Sites](/grabwp-tenancy/creating-tenants).

> **Note:** Until DNS is in place, the Edit screen shows a **Path URL** you can open as a temporary preview. Connect the domain before you share the site.

## Step 1: Add the domain in hosting

Point the domain at the same document root as the main WordPress install. Do not create a separate directory or a second WordPress install.

**Subdomain** (for example `client.yoursite.com`):

- Add it as a parked domain, alias, or subdomain whose document root is the main WordPress directory.

**External domain** (for example `clientsite.com`):

- Add it as an addon domain or a new domain.
- Set the document root to the main WordPress directory.

| Control panel | Where to add it |
|---------------|-----------------|
| cPanel | Parked Domains (subdomains) or Addon Domains (external) |
| Plesk | Websites & Domains → Add Domain |
| DirectAdmin | Domain Management → Add New Domain |

## Step 2: Update DNS

**Subdomain:** add an A record at your DNS provider.

| Field | Value |
|-------|--------|
| Name | The subdomain label (for example `client`) |
| Type | A |
| Value | This server's IP address |

**External domain:** at the registrar, point the domain at this host (nameservers or an A record), using the same IP.

## Step 3: Wait for propagation

DNS changes often apply in 5 to 30 minutes and can take up to 24 hours. Check the domain on [dnschecker.org](https://dnschecker.org).

## Domain format

The tenant form accepts `example.com` and `subdomain.example.com`.

- No `http://` and no `www` prefix (add `www.example.com` as its own domain if you need it)
- No IP addresses and no `localhost`
- Letters, numbers, and hyphens only
- Each domain can belong to only one tenant

**Verify:** Open the domain in a browser. You should see that tenant's WordPress site. A hosting default page means the document root is not this WordPress directory.
