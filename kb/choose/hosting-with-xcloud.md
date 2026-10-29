---
title: "Notes for xCloud hosting"
description: "Setup steps tested by the GrabWP team for running GrabWP on an Ubuntu VPS managed by xCloud."
sidebar_label: "Notes for xCloud hosting"
sidebar_position: 4
tags: [server, isolation, routing, domains, plan-base, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** all guidance on this page is tested by the GrabWP team, which runs the GrabWP demo on an Ubuntu VPS managed by xCloud. When setting up on xCloud, use the multisite toggle trick to configure wildcard subdomains, keep page caching off during setup and set **Level of isolation for new sites** to **Advanced** or **Custom**.

## What it is

The GrabWP team uses [xCloud](https://xcloud.host/) on an Ubuntu VPS. The following configuration choices are tested by the GrabWP team for running GrabWP Tenancy, Pro and WaaS on xCloud:

1. **Web stack:** start with an Ubuntu VPS on xCloud. Choose LiteSpeed if speed is your main priority, or Nginx plus Apache for a familiar stack. (Pure Nginx on xCloud needs manual server rules for path routing; see [Path URLs (/site/...) show 404 or a wrong page](/kb/troubleshooting/path-urls-return-404).)
2. **Wildcard subdomain setup:** create your first WordPress site in xCloud with WordPress Multisite enabled so xCloud configures the wildcard subdomain on the server. Once the site is created, turn Multisite off in `wp-config.php`. GrabWP's main site must not stay a WordPress Multisite.
3. **HTTPS and SSL:** either use xCloud's built-in SSL or turn SSL off in xCloud and let a Cloudflare proxy handle HTTPS. Do not enable both at the same time unless you have configured the proxy SSL mode to match.
4. **Page caching:** keep page caching off while installing and testing GrabWP. Turn on and test caching only after tenant provisioning works.
5. **Tenant content isolation:** after running the setup wizard, go to **Tenancy > Pro Settings > Isolation** and set **Level of isolation for new sites** to **Advanced** (or **Custom** with isolated content). Each tenant then gets its own `wp-content` directory and installs its own plugins and themes.
6. **Transactional email:** configure an SMTP plugin before launch. Setups tested by the GrabWP team include Mailgun and SendLayer over SMTP.

## Why it matters

- GrabWP Tenancy does not run on WordPress Multisite (**Tenancy > Status** shows `⚠ Yes. GrabWP Tenancy is not designed for Multisite` if Multisite is left on), but toggling Multisite on during initial site creation in xCloud is a shortcut to get wildcard subdomain routing configured by the panel.
- On xCloud, isolating `wp-content` per tenant (**Advanced** or **Custom** under **Tenancy > Pro Settings > Isolation**) is also the required workaround for an open issue where clicking the tenant dashboard login icon redirects to `wp-login.php?grabwp_token_error=1`.

## How to check

1. Open **Tenancy > Status** on the main site and confirm **WordPress Multisite** says `No`, **Data Dir Writable** says `✓ Yes` and **MU-Plugins Dir Writable** says `✓ Yes`.
2. Open **Tenancy > Pro Settings > Isolation** and confirm **Level of isolation for new sites** is set to **Advanced** (or **Custom** with **Give each new site its own themes** and **Give each new site its own plugins** checked).
3. Remember that isolated sites start without themes (`Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.`).

## What to do

Follow the steps above when creating your server on xCloud, then complete the [Hosting and DNS setup](/grabwp-tenancy/hosting-dns-setup) and the [First day checklist](/kb/start-here/first-day-checklist). If you use a different VPS provider that has not been tested by the GrabWP team, share your server panel and web stack details when asking support for help.

## Limits and versions

- Do not promise: a fix in the Base plugin for the xCloud shared object-cache login token error (`wp-login.php?grabwp_token_error=1`) is in review with no release date; until it ships, use **Advanced** or **Custom** isolation on xCloud.
- Verified against Base 1.1.14, Pro 1.1.17 and WaaS 1.1.24.

## Related

- [Tenant dashboard icon sends me to the login page](/kb/troubleshooting/tenant-dashboard-login-fails)
- [Hosting requirements](/kb/choose/hosting-requirements)
- [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)
- [Isolation levels](/kb/concepts/isolation-levels)
- [Hosting and DNS setup](/grabwp-tenancy/hosting-dns-setup)
