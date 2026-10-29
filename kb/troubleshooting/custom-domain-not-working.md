---
title: "A custom domain does not work"
description: "What the custom domain verification messages mean in GrabWP WaaS and how to fix DNS, web server aliases and plan benefits."
sidebar_label: "Custom domain does not work"
sidebar_position: 5
tags: [troubleshooting, domains, routing, plan-waas, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** a custom domain must both point to your server in DNS and be accepted as a domain alias by your web server or Cloudflare for SaaS setup. Check the exact verification message in the customer dashboard to see whether the block is in the plan settings, DNS records or the web server.

## Symptom

When a site owner adds, verifies or sets a primary custom domain in the customer dashboard, one of these messages appears:

- `Domain did not respond. Point DNS and add it on the server, then try again.`
- `Domain is reachable but is not serving this site yet.`
- `Domain is not mapped to a tenant.`
- `Verify this domain before setting it as primary.`
- `Custom domains are not available while sites use path URLs.`
- `Custom domains are not available for your current plan.`
- `Maximum 2 custom domains allowed.`
- `Cannot remove your platform subdomain.`

## Cause

| If you see | It means |
|---|---|
| `Domain did not respond. Point DNS and add it on the server, then try again.` | The HTTP verification check could not reach the domain over the network (DNS is not pointing to the server yet, or SSL/firewall blocked the request). |
| `Domain is reachable but is not serving this site yet.` | The domain resolved and answered over HTTP, but the web server served a default host page or another site instead of routing the hostname to this WordPress install. |
| `Domain is not mapped to a tenant.` | The domain is not saved in `tenants.php` for this tenant yet. |
| `Verify this domain before setting it as primary.` | A domain must pass the HTTP verification check before it can become the tenant's primary address. |
| `Custom domains are not available while sites use path URLs.` | The platform is running in path routing mode (`path`), which does not use per-tenant hostnames. |
| `Custom domains are not available for your current plan.` | The customer's current plan does not have the `allow_custom_domain` benefit enabled. |
| `Maximum 2 custom domains allowed.` | The tenant already has 2 custom domains attached, which is the per-tenant limit. |
| `Cannot remove your platform subdomain.` | The default platform subdomain remains attached as a fallback and cannot be deleted by the customer. |

## Check

1. In the main site admin, go to **Tenancy > Settings > Routing** and confirm **Routing Mode** is set to `domain` or `both` (not `path`).
2. Go to **Waas > Settings > General** and confirm **Platform Domain** is filled in and **Domain Mode** is set to **Cloudflare SaaS (CNAME)** or **Direct IP (A record)** with a matching **CNAME Target** or **Server Public IP**.
3. Go to **Waas > Settings > Plans**, edit the customer's plan, and confirm the custom domain benefit (`allow_custom_domain`) is turned on.
4. Go to **Waas > Domains** (or **Tenancy > All Tenants**) to see whether the custom domain is listed on the tenant and whether its status shows verified.
5. Check the domain's live DNS records to confirm the `CNAME` or `A` record matches the target shown in the customer dashboard.

## Fix

### If the custom domain section is blocked or unavailable

1. For `Custom domains are not available while sites use path URLs.`, switch **Routing Mode** to `both` or `domain` under **Tenancy > Settings > Routing** and set a **Platform Domain** under **Waas > Settings > General**.
2. For `Custom domains are not available for your current plan.`, enable `allow_custom_domain` on the plan under **Waas > Settings > Plans**, or ask the customer to upgrade to a plan that includes custom domains.
3. For `Maximum 2 custom domains allowed.`, remove one of the existing custom domains before adding a new one.

### If verification fails

1. Have the site owner point their domain's DNS (`CNAME` or `A` record, depending on your **Domain Mode**) to the target shown in their dashboard.
2. Add the custom domain as an alias (parked domain) on your web server or hosting panel, or complete the custom hostname check in Cloudflare for SaaS so the web server sends traffic for that hostname to your main WordPress root directory.
3. Once DNS propagates and the web server serves the main WordPress root for that hostname, click verify again in the dashboard and then set the domain as primary.

For full setup steps, see [Managing domains](/grabwp-tenancy-waas/waas-managing-domains) and [How a visitor reaches a tenant](/kb/concepts/how-visitors-reach-a-tenant).

## Still stuck

If DNS points to the server and the domain alias is added on the server panel but verification still fails, send the exact error message, the **Domain Mode** setting from **Waas > Settings > General**, and the tenant's domain list. See [What to send when you ask for help](/kb/start-here/getting-help).
Do not promise: fully automatic custom domain parking on the hosting panel without adding the domain alias or using an external DNS and hosting integration.
