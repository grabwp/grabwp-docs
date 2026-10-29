---
title: "Help for your clients"
description: "Answers for site owners about logging in, paused sites, custom domains, plugins and contacting support."
sidebar_label: "For your clients"
tags: [faq, subscriptions, domains, plan-waas, for-customer, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** if you created or rented a WordPress site on a platform powered by GrabWP, you manage your billing and domains from the platform customer dashboard and edit your website content in your site's own `wp-admin`. Each answer below explains how it works.
**Needs:** Pro + WaaS

## How do I log in to my site or my billing dashboard?

You have two separate places to sign in:

- **Platform customer dashboard** (`/dashboard/` on the provider's main website): manage your subscription, invoices, services, and custom domains. If the platform uses **WAAS Auth (Email signup)**, you sign in with a one-time **Verification code** sent to your email.
- **Your site's WordPress admin** (`/wp-admin` on your site address): edit pages, posts, menus, and products. You can also open it directly using the login button inside your platform customer dashboard.

Read more: [Log in to a client site](/manage-sites/direct-login) | [Dashboard and provisioning](/sell-sites/dashboard-and-provisioning)

## Why does my site say "`{tenant_domain}` is temporarily unavailable"?

Your site displays the HTTP 503 unavailable page when its subscription is **Suspended**, **Expired**, past the cancellation **Grace Period**, or when a **Trial** has ended without an upgrade.

While your site is paused, you cannot open your site `/wp-admin` to edit content, but you can still log in to the platform customer dashboard (`/dashboard/`) to pay an open invoice or upgrade your plan. Once payment is confirmed, your site comes back online automatically.

Read more: [A customer site says "temporarily unavailable"](/help/site-shows-temporarily-unavailable) | [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)

## Can I connect my own custom domain?

Yes, if your platform runs in domain routing mode and your plan includes the custom domain benefit (`allow_custom_domain`).

You can attach up to 2 custom domains per site from your customer dashboard (`Maximum 2 custom domains allowed.`). After pointing your domain `CNAME` or `A` record as instructed in the dashboard, verify the domain before setting it as primary. Your default platform subdomain remains attached as a permanent fallback (`Cannot remove your platform subdomain.`).

Read more: [A custom domain does not work](/help/custom-domain-not-working) | [Client custom domains](/sell-sites/client-domains)

## Why can I not upload or install my own plugins and themes?

By default, platform operators turn on **Disable Install Plugins & Themes** (`DISALLOW_FILE_MODS`) so client sites remain secure, stable, and only run approved software.

Ask your platform provider if you need a specific plugin or theme added to your site. The operator can activate approved extensions for your site or enable uploads for your account if their policy permits it.

Read more: [A site cannot install or find plugins and themes](/help/client-cannot-install-plugins) | [Per-site plugins and themes](/manage-sites/plugins-and-themes)

## Why does my site name say reserved or temporarily reserved during signup?

System words such as `www`, `mail`, `admin`, `api`, `cdn`, `ftp`, `smtp`, `imap`, `pop`, `ns1`, `ns2`, `dns`, `cpanel`, `webmail`, and `app` are reserved (`This site name is reserved. Please choose another.`).

If you started a checkout earlier with a name and closed the tab, that name is held for up to 2 hours (`This site name is temporarily reserved by another checkout. Please try another.`). Choose another name or wait for the 2 hour hold to expire.

Read more: [Signup stops or shows an error](/help/signup-problems) | [How WaaS works](/sell-sites/how-waas-works)

## Can I own more than one site under one account?

Yes. Each site is an isolated site with its own subscription, database tables, and uploads folder. You can manage multiple sites from the same customer dashboard login.

Read more: [Create and manage sites](/manage-sites/create-and-manage-sites) | [Dashboard and provisioning](/sell-sites/dashboard-and-provisioning)

## Who do I contact if I need help with my site or billing?

Contact the support team of the platform where you signed up. When you write to them, include your site URL, the email address on your account, and the exact error message shown on screen.

Read more: [What to send when you ask for help](/help/getting-help)
