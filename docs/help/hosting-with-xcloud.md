---
title: "Notes for xCloud hosting"
description: "Setup steps tested by the GrabWP team for running GrabWP on an Ubuntu VPS managed by xCloud."
sidebar_label: "Hosting with xCloud"
tags: [server, isolation, routing, domains, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.15, Pro 1.1.18, WaaS 1.1.25"
last_verified_date: "2026-11-03"
---

**Short answer:** all guidance on this page is tested by the GrabWP team, which runs the GrabWP demo on an Ubuntu VPS managed by xCloud. When setting up on xCloud, use the multisite toggle trick to configure wildcard subdomains, then let the **Hosting setup** card on **Tenancy > Status** remove the leftover Multisite settings. Keep page caching off during setup, and run Base 1.1.15 or later, which fixes path permalinks on OpenLiteSpeed and the shared object cache login loop.
**Needs:** Free

## What it is

The GrabWP team tests and runs demo environments using [xCloud](https://xcloud.host/) on Ubuntu VPS servers. The following configuration choices are tested and recommended for running GrabWP Tenancy, Pro, and WaaS on xCloud:

1. **Web stack:** start with an Ubuntu VPS on xCloud. Choose LiteSpeed if raw speed is your priority, or Nginx plus Apache for a standard stack. Pure Nginx on xCloud requires manual server rules for path routing (see [Path URLs (/site/...) show 404 or a wrong page](/help/path-urls-return-404)).
2. **Wildcard subdomain setup:** create your initial WordPress site in xCloud with WordPress Multisite enabled so xCloud configures the wildcard subdomain virtual host on the server. Once the site is created, remove the Multisite settings from `wp-config.php`. GrabWP must run on a standard single-site WordPress installation. See [Remove the Multisite settings after the wildcard is ready](#remove-the-multisite-settings-after-the-wildcard-is-ready).
3. **HTTPS and SSL:** use either xCloud's built-in SSL or disable SSL in xCloud and let Cloudflare proxy handle HTTPS. Do not enable both at the same time unless the proxy SSL mode is set to Full (Strict). Behind Cloudflare, check the **HTTPS behind a proxy** row of the **Hosting setup** card (see [Hosting setup checks](/help/hosting-requirements#hosting-setup-checks)).
4. **Page caching:** keep server and plugin page caching disabled while installing and configuring GrabWP. Enable caching only after site provisioning is verified.
5. **Site content isolation:** choose the level that fits your sites under **Tenancy > Pro Settings > Isolation**. Before Base 1.1.15, **Advanced** (or **Custom** with isolated plugins and themes) was needed on xCloud to avoid the object cache login loop described below. From Base 1.1.15 that is no longer required.
6. **Transactional email:** configure an SMTP plugin before opening signups. Providers tested by the team include Mailgun and SendLayer.

## Remove the Multisite settings after the wildcard is ready

When the **Multisite and wp-config.php** row or the **Subdomains (wildcard)** row of the **Hosting setup** card needs attention, the card shows **Using xCloud?** with these steps:

1. In xCloud, create the WordPress site as Multisite with subdomains. xCloud sets up wildcard subdomain hosting only for such sites.
2. Wait until the **Subdomains (wildcard)** row passes: **DNS**, **address** and **certificate**.
3. Remove every native Multisite line from `wp-config.php`. Click **Remove these settings** on the card, or remove the lines by hand. Old Multisite rules in `.htaccess` can stay.
4. If the network already has more than one site, do not convert it. Back up or move those sites first.

Details, including **Undo settings removal**, are on [Settings in wp-config.php that stop GrabWP](/help/hosting-requirements#settings-in-wp-configphp-that-stop-grabwp).

## Why it matters

- GrabWP Tenancy is not designed for WordPress Multisite. If Multisite is left active, the **WordPress Multisite** row in **System Information** on **Tenancy > Status** shows **Yes** with the note `GrabWP Tenancy is not designed for Multisite.` Toggling Multisite on during initial creation in xCloud still configures wildcard subdomain routing automatically in the server panel.
- The LiteSpeed stack on xCloud is OpenLiteSpeed, which runs `.htaccess` rules only once per request. Before Base 1.1.15, pretty permalinks, REST and feed URLs of path sites (`/site/{tenant_id}/...`) returned 404 there. Base 1.1.15 routes them in one rewrite pass.
- xCloud's xSpeed object cache drop-in builds cache keys from one fixed salt. Before Base 1.1.15, client sites that shared the main site's `wp-content` also shared that `object-cache.php` drop-in, read the main site's cached options and users, and the auto-login link ended at `wp-login.php?grabwp_token_error=1`. From Base 1.1.15, a client site keeps the shared drop-in only when its cache keys stay separate (xSpeed gets a per-site salt, Redis Object Cache uses the site's own table prefix). Otherwise the site runs without it.

## How to check

1. Open **Tenancy > Status** on the main site. The **Hosting setup** card should say **✓ Ready**.
2. Open **System Information** and confirm **WordPress Multisite** says `No`, **Data Dir Writable** says `Yes`, and **MU-Plugins Dir Writable** says `Yes`.
3. If you use path addresses, check that **3. Root .htaccess Rewrite Rules** shows **✓ Installed**. A block written before Base 1.1.15 shows **⚠ Invalid content**.
4. If you use **Advanced** isolation, remember that isolated sites start without themes (`Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.`).

## What to do

1. Update GrabWP Tenancy to 1.1.15 or later.
2. On **Tenancy > Status**, open **Fix steps and install code** on **3. Root .htaccess Rewrite Rules** and click **Auto Fix** once to upgrade the old `.htaccess` block.
3. Follow the six steps above when launching a server on xCloud, then complete [Site addresses, domains and DNS](/manage-sites/domains-and-dns) and [Your first site](/manage-sites/first-site).

If you use a different VPS management panel, click **Copy diagnostics** under **Support diagnostics** on **Tenancy > Status** and paste it when contacting support.

## Limits and versions

- The OpenLiteSpeed path fix and the object cache change need Base 1.1.15 or later. On older versions, use **Advanced** or **Custom** isolation under **Tenancy > Pro Settings > Isolation** to keep the object cache separate per site.
- Verified against Base 1.1.15, Pro 1.1.18, and WaaS 1.1.25.

## Related

- [Site dashboard icon sends me to the login page](/help/site-login-fails)
- [Hosting requirements](/help/hosting-requirements)
- [Web server guide](/help/web-server-guide)
- [Per-site plugins and themes](/manage-sites/plugins-and-themes)
- [Site addresses, domains and DNS](/manage-sites/domains-and-dns)
