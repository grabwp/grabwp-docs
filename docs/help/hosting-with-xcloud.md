---
title: "Notes for xCloud hosting"
description: "Setup steps tested by the GrabWP team for running GrabWP on an Ubuntu VPS managed by xCloud."
sidebar_label: "Hosting with xCloud"
tags: [server, isolation, routing, domains, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** all guidance on this page is tested by the GrabWP team, which runs the GrabWP demo on an Ubuntu VPS managed by xCloud. When setting up on xCloud, use the multisite toggle trick to configure wildcard subdomains, keep page caching off during setup, and set **Level of isolation for new sites** to **Advanced** or **Custom**.
**Needs:** Free

## What it is

The GrabWP team tests and runs demo environments using [xCloud](https://xcloud.host/) on Ubuntu VPS servers. The following configuration choices are tested and recommended for running GrabWP Tenancy, Pro, and WaaS on xCloud:

1. **Web stack:** start with an Ubuntu VPS on xCloud. Choose LiteSpeed if raw speed is your priority, or Nginx plus Apache for a standard stack. Pure Nginx on xCloud requires manual server rules for path routing (see [Path URLs (/site/...) show 404 or a wrong page](/help/path-urls-return-404)).
2. **Wildcard subdomain setup:** create your initial WordPress site in xCloud with WordPress Multisite enabled so xCloud configures the wildcard subdomain virtual host on the server. Once the site is created, disable Multisite in `wp-config.php`. GrabWP must run on a standard single-site WordPress installation.
3. **HTTPS and SSL:** use either xCloud's built-in SSL or disable SSL in xCloud and let Cloudflare proxy handle HTTPS. Do not enable both at the same time unless the proxy SSL mode is set to Full (Strict).
4. **Page caching:** keep server and plugin page caching disabled while installing and configuring GrabWP. Enable caching only after site provisioning is verified.
5. **Site content isolation:** after completing setup, go to **Tenancy > Pro Settings > Isolation** and set **Level of isolation for new sites** to **Advanced** (or **Custom** with isolated plugins and themes). Each site then receives its own `wp-content` directory.
6. **Transactional email:** configure an SMTP plugin before opening signups. Providers tested by the team include Mailgun and SendLayer.

## Why it matters

- GrabWP Tenancy is not designed for WordPress Multisite (**Tenancy > Status** warns `⚠ Yes. GrabWP Tenancy is not designed for Multisite` if Multisite is left active), but toggling Multisite on during initial creation in xCloud configures wildcard subdomain routing automatically in the server panel.
- On xCloud, isolating `wp-content` per site (**Advanced** or **Custom** under **Tenancy > Pro Settings > Isolation**) is also the recommended configuration to avoid issues where a shared `object-cache.php` drop-in interferes with the site auto-login token (`wp-login.php?grabwp_token_error=1`).

## How to check

1. Open **Tenancy > Status** on the main site and confirm **WordPress Multisite** says `No`, **Data Dir Writable** says `Yes`, and **MU-Plugins Dir Writable** says `Yes`.
2. Open **Tenancy > Pro Settings > Isolation** and confirm **Level of isolation for new sites** is set to **Advanced** (or **Custom** with **Give each new site its own themes** and **Give each new site its own plugins** enabled).
3. Remember that isolated sites start without themes (`Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.`).

## What to do

Follow the six steps above when launching a server on xCloud, then complete [Site addresses, domains and DNS](/manage-sites/domains-and-dns) and [Your first site](/manage-sites/first-site). If you use a different VPS management panel, share your server configuration and web stack when contacting support.

## Limits and versions

- On xCloud, always configure **Advanced** or **Custom** isolation under **Tenancy > Pro Settings > Isolation** to keep object cache data separated between client sites.
- Verified against Base 1.1.14, Pro 1.1.17, and WaaS 1.1.24.

## Related

- [Site dashboard icon sends me to the login page](/help/site-login-fails)
- [Hosting requirements](/help/hosting-requirements)
- [Web server guide](/help/web-server-guide)
- [Per-site plugins and themes](/manage-sites/plugins-and-themes)
- [Site addresses, domains and DNS](/manage-sites/domains-and-dns)
