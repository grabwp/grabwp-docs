---
title: "How a visitor reaches a tenant"
description: "What path and domain routing mean and what each needs from DNS and the web server."
sidebar_label: "How visitors reach a tenant"
sidebar_position: 2
tags: [routing, domains, plan-base, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** a visitor reaches a tenant by a path such as `example.com/site/abc123`, by the tenant's own domain, or by both. Path URLs need no DNS change but need web server rules. Domain URLs need DNS that points to your server and a server that accepts the domain.

## What it is

There are three routing modes: `path`, `domain` and `both`. The default is `both`.

- **Path routing:** the tenant opens at `example.com/{prefix}/{tenant}`. The default prefix is `site`. With Pro you can use a [path alias](/kb/glossary/urls-and-domains#path-alias) in place of the ID.
- **Domain routing:** GrabWP matches the tenant by the host name.
- **Both:** either works.

Which mode applies is decided in this order: a valid `GRABWP_TENANCY_ROUTING_MODE` constant in `wp-config.php`, then the mode stored with your tenants, then `both`.

With WaaS, the **Platform Domain** setting decides what customer sites look like. If it is empty, customer sites use path URLs and custom domains are not offered.

## Why it matters

Most "site not found" and 404 problems are a routing mismatch. Path routing on Nginx without the right rules gives errors. A domain that does not point to your server gives no response.

## How to check

1. Open **Tenancy > Settings > Routing** and read **Routing Mode**.
2. Open **Tenancy > Status** and read the web server rows. On Apache, a notice `Root .htaccess needs to be updated for tenant routing.` means the path rules are missing. On Nginx the page says `.htaccess` is not used.
3. For a WaaS platform, open **Waas > Settings > General** and read **Platform Domain**.

## What to do

Use path routing to start, since it needs no DNS. Use domain routing when each customer needs an address of their own. On Nginx, add the routing rules in your server block. Follow [Hosting and DNS setup](/grabwp-tenancy/hosting-dns-setup).

## Limits and versions

- Path prefix and path aliases need Pro.
- On Apache, GrabWP writes the path rules to the root `.htaccess` in a block named `GrabWP Tenancy`. Without `mod_rewrite` the Status page says query string routing (`?site=id`) will be used instead.
- Some themes do not work with path URLs. Domain routing avoids that.

## Related

- [Path URLs show 404 or a wrong page](/kb/troubleshooting/path-urls-return-404)
- [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working)
- [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)
- [Glossary: URLs and domains](/kb/glossary/urls-and-domains)
