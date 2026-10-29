---
title: "FAQ for site owners"
description: "Short answers for site owners who manage a tenant site: logging in, paused sites, custom domains, plugins and who to contact."
sidebar_label: "For site owners"
sidebar_position: 1
tags: [faq, subscriptions, domains, plan-waas, for-customer, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** if you created or rented a WordPress site on a platform powered by GrabWP, you manage your billing and domains from the platform's customer dashboard and edit your website content in your site's own `wp-admin`. Each answer below links to the guide with full steps.

## How do I log in to my site or my billing dashboard?

You have two places to sign in:

- **Platform customer dashboard** (`/dashboard/` on the provider's main website): manage your subscription, invoices, services and custom domains. If the platform uses **WAAS Auth (Email signup)**, you sign in with a one-time **Verification code** sent to your email.
- **Your site's WordPress admin** (`/wp-admin` on your site's address): edit pages, posts, menus and products. You can also open it using the login button inside your platform customer dashboard.

Read more: [Direct login to a tenant](/kb/concepts/direct-login) | [Customer dashboard and activity](/grabwp-tenancy-waas/waas-dashboard-activity)

## Why does my site say "`{tenant_domain}` is temporarily unavailable"?

Your site shows the HTTP 503 unavailable page when its subscription is **Suspended**, **Expired**, past the cancellation **Grace Period**, or when a **Trial** has ended without an upgrade. While your site is paused, you cannot open your site's `/wp-admin` to edit or export content, but you can still log in to the platform's customer dashboard (`/dashboard/`) to pay an open invoice or upgrade your plan. Once payment is processed, your site comes back online automatically.

Read more: [A customer site says "temporarily unavailable"](/kb/troubleshooting/site-shows-temporarily-unavailable) | [Subscription lifecycle](/kb/concepts/subscription-lifecycle)

## Can I connect my own custom domain?

Yes, if your platform runs in domain routing mode and your plan includes the custom domain benefit (`allow_custom_domain`). You can attach up to 2 custom domains per site from your customer dashboard (`Maximum 2 custom domains allowed.`). After pointing your domain's `CNAME` or `A` record as instructed in the dashboard, verify the domain before setting it as primary. Your default platform subdomain remains attached as a fallback (`Cannot remove your platform subdomain.`).

Read more: [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working) | [Managing domains](/grabwp-tenancy-waas/waas-managing-domains)

## Why can I not upload or install my own plugins and themes?

By default, platform operators turn on **Disable Install Plugins & Themes** (`DISALLOW_FILE_MODS`) so tenant sites stay secure and only run approved code. Ask your platform provider if you need a plugin or theme added to your site; the operator can activate approved extensions for your site or enable uploads for your account if their policy allows it.

Read more: [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins) | [Isolation levels](/kb/concepts/isolation-levels)

## Why does my site name say reserved or temporarily reserved during signup?

System words such as `www`, `mail`, `admin`, `api`, `cdn`, `ftp`, `smtp`, `imap`, `pop`, `ns1`, `ns2`, `dns`, `cpanel`, `webmail` and `app` are reserved (`This site name is reserved. Please choose another.`). If you started a checkout earlier with a name and closed the tab, that name is held for up to 2 hours (`This site name is temporarily reserved by another checkout. Please try another.`). Pick another name or wait for the 2 hour hold to expire.

Read more: [Signup stops or shows an error](/kb/troubleshooting/signup-problems) | [How a signup becomes a site](/kb/concepts/how-signup-builds-a-site)

## Can I own more than one site under one account?

Yes. Each site is an isolated tenant with its own subscription, database tables and uploads folder, and you can manage multiple sites from the same customer dashboard login.

Read more: [What a tenant is](/kb/concepts/tenant) | [Customer dashboard and activity](/grabwp-tenancy-waas/waas-dashboard-activity)

## Who do I contact if I need help with my site or billing?

Contact the support team of the platform where you signed up. When you write to them, include your site URL, the email address on your account and the exact error message shown on screen.

Read more: [What to send when you ask for help](/kb/start-here/getting-help)
