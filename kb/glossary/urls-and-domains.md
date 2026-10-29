---
title: "Glossary: URLs and domains"
description: "Plain meaning of the terms about routing, path URLs, custom domains and verification."
sidebar_label: "URLs and domains"
sidebar_position: 2
tags: [glossary, routing, domains, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** this page explains the words used for how a visitor reaches a tenant: path URLs, domains, platform domain and domain checks.

## CNAME Target

**Plain meaning:** the value your customers point their domain to when Domain Mode is **Cloudflare SaaS (CNAME)**. It is the Cloudflare custom hostname fallback origin.
**Where you see it:** **Waas > Settings > General**, in the **Custom Domains** section.
**Why it matters:** customers see this value in their DNS instructions. A wrong value sends their domain to the wrong place.
**More:** [Domain Mode](#domain-mode) | [Managing domains](/grabwp-tenancy-waas/waas-managing-domains)

## Custom domain

**Plain meaning:** a customer's own domain name on their tenant.
**Where you see it:** the customer dashboard and **Waas > Domains**.
**Why it matters:** the customer's plan needs the benefit `allow_custom_domain`. A site can have at most 2 custom domains. Custom domains are not offered while sites use path URLs.
**More:** [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) | [Managing domains](/grabwp-tenancy-waas/waas-managing-domains)

## DCV Delegation

**Plain meaning:** a record value from Cloudflare that lets certificates for custom hostnames be validated automatically.
**Where you see it:** **Waas > Settings > General**, **Custom Domains**, shown when Domain Mode is **Cloudflare SaaS (CNAME)**.
**Why it matters:** it is part of the Cloudflare setup for custom domains.
**More:** [Domain Mode](#domain-mode)

## Domain Mode

**Plain meaning:** how customers connect a custom domain. The choices are **Cloudflare SaaS (CNAME)** and **Direct IP (A record)**. The default is Cloudflare SaaS.
**Where you see it:** **Waas > Settings > General**, **Custom Domains**.
**Why it matters:** it decides which DNS record the customer is told to create. With Direct IP you also fill in **Server Public IP**.
**More:** [Managing domains](/grabwp-tenancy-waas/waas-managing-domains)

## Domain routing

**Plain meaning:** GrabWP finds the tenant by the host name in the address.
**Where you see it:** **Tenancy > Settings > Routing**, **Routing Mode**.
**Why it matters:** the domain must reach your server, and the server must accept it.
**More:** [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant)

## Domain verification

**Plain meaning:** a check that a custom domain reaches the right tenant.
**Where you see it:** the customer dashboard and **Waas > Domains**.
**Why it matters:** a domain can only become primary after it is verified. The three results are `Domain is not mapped to a tenant.`, `Domain is reachable but is not serving this site yet.` and `Domain did not respond. Point DNS and add it on the server, then try again.`
**More:** [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working)

## Path alias

**Plain meaning:** a readable name used in the path URL instead of the 6 character tenant ID. It uses lowercase letters, digits and single hyphens.
**Where you see it:** **Tenancy > Settings > Routing** (the field is drawn by Pro).
**Why it matters:** `example.com/site/my-shop` is easier to share than `example.com/site/abc123`. It is on by default for new installs and off for installs upgraded from before the defaults changed.
**More:** [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant)

## Path routing

**Plain meaning:** a tenant opens at `example.com/{prefix}/{tenant}`. The default prefix is `site`.
**Where you see it:** **Tenancy > Settings > Routing**, **Routing Mode**.
**Why it matters:** it needs no DNS change. On Apache, GrabWP writes a rewrite block to the root `.htaccess`. On Nginx you add the rules yourself.
**More:** [Path URLs show 404](/kb/troubleshooting/path-urls-return-404) | [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)

## Platform domain

**Plain meaning:** the domain under which WaaS customer sites are created, for example `example.com`. Leave it empty and customer sites use path URLs.
**Where you see it:** **Waas > Settings > General**, field **Platform Domain**.
**Why it matters:** with it empty the page says `Path mode: customer sites open at %s. No DNS needed.` and custom domains are hidden.
**More:** [Configure General settings](/grabwp-tenancy-waas/waas-configure-general)

## Routing mode

**Plain meaning:** the rule for how visitors reach tenants: `path`, `domain` or `both`.
**Where you see it:** **Tenancy > Settings > Routing**, **Routing Mode**. The default is `both`.
**Why it matters:** the mode saved with your tenants decides. A valid `GRABWP_TENANCY_ROUTING_MODE` constant in `wp-config.php` overrules it.
**More:** [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant)
