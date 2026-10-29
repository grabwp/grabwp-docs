---
title: "FAQ for platform operators"
description: "Short answers for platform operators running GrabWP: free trials, offline payments, Arabic and RTL, third-party plugin licenses and hosting."
sidebar_label: "For platform operators"
sidebar_position: 2
tags: [faq, billing, subscriptions, server, plan-pro, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Stripe 1.1.7"
last_verified_date: "2026-10-29"
---

**Short answer:** this page answers the most common setup and policy questions from operators building a platform with GrabWP Tenancy, Pro and WaaS. Each answer summarizes what the current versions support and links to the concept or setup guide that owns the details.

## How do I offer a free trial without asking for payment at signup?

You have two built-in ways in GrabWP WaaS (version 1.1.22 or newer):

- **Built-in free trial on a paid plan:** customers sign up and start their site without entering payment details, receive **Free trial ending** reminder emails (at `7,3,1` days by default), and can subscribe at any time without losing their remaining trial days. If the trial ends unpaid, the site is suspended automatically.
- **Zero-priced trial plan:** create a plan priced at zero with the same benefits as your paid plan. When the customer pays by bank transfer or offline method, open **Waas > Subscriptions** and use **Admin Actions** (**Change Plan** or **Extend Period**) to move them to the paid plan.

Polar and Stripe can also run provider-side trials (Stripe trials need **GrabWP Tenancy Stripe** 1.1.6 or newer and a trial length of at least 48 hours).

Read more: [Subscription lifecycle](/kb/concepts/subscription-lifecycle) | [Create plans](/grabwp-tenancy-waas/waas-create-plans) | [Managing subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions)

## Is there a built-in manual or offline bank transfer checkout where customers submit a transfer reference?

Not as an automated checkout gateway yet. Today, you can run offline payments either by using WooCommerce with its built-in bank transfer / cash on delivery methods, or by letting customers start on a built-in trial (or zero-priced plan) and using **Convert manually (paid offline, days)**, **Change Plan** or **Extend Period** under **Waas > Subscriptions** once you verify their payment.
Do not promise: native offline payment reference submission is not available yet.

Read more: [Payment providers](/kb/choose/payment-providers) | [Set up billing](/grabwp-tenancy-waas/waas-setup-billing)

## Which hosting stack is tested with GrabWP?

GrabWP runs on any server that meets the WordPress 5.0+, PHP 7.4+, writable `wp-content` and web server rewrite requirements. The team tests on Ubuntu VPS servers managed with xCloud (using either LiteSpeed or Nginx + Apache), with page caching turned off during setup, **Advanced** isolation enabled under **Tenancy > Pro Settings > Isolation**, and an SMTP plugin (with Mailgun or SendLayer) for transactional email.

Read more: [Hosting requirements](/kb/choose/hosting-requirements) | [Notes for xCloud hosting](/kb/choose/hosting-with-xcloud) | [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)

## Does GrabWP support Arabic (RTL) and other languages?

Yes. All GrabWP plugins ship with built-in translations for Arabic (`ar`), Vietnamese (`vi`), Spanish (`es`), Indonesian (`id`), French (`fr`) and Chinese (`zh`), and WaaS 1.1.20+ includes full right-to-left (RTL) layout support for Arabic on WaaS screens. You can use Polylang to localize plan, benefit and service names, and Loco Translate if you want to customize specific wording. On individual tenant sites, RTL display depends on the theme and CSS installed on that tenant.

Read more: [Configure general settings](/grabwp-tenancy-waas/waas-configure-general) | [Appearance settings](/grabwp-tenancy-waas/waas-appearance)

## Do third-party premium plugin licenses activated on the main site carry over to tenants?

No. Each tenant has its own isolated database tables and options, so a license key stored in the main site's options table is not shared with tenants. Whether you can use one third-party license across tenants depends on that vendor's licensing terms and domain checks. If the vendor allows it, you can activate the plugin on a template tenant and clone that template for new sites.

Read more: [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins) | [Pro extensions](/grabwp-tenancy-pro/pro-extensions)

## Can GrabWP Pro automatically create a new MySQL database for each new tenant?

Out of the box, **Isolated SQLite Database** (when PHP `pdo_sqlite` is enabled) and **Shared Database (with table prefixes)** work automatically for new tenants without manual database setup. **Isolated MySQL Database** currently requires entering MySQL database credentials per tenant. Automatic MySQL database creation using a master MySQL user with `CREATE DATABASE` privilege is not available yet.
Do not promise: automatic per-tenant MySQL database creation from a master database account is not available yet.

Read more: [Database options](/kb/concepts/database-options) | [Database isolation](/grabwp-tenancy-pro/pro-database-isolation)

## Why do suspended tenant sites still load instead of showing the unavailable page?

Blocking suspended, expired and cancelled sites with the HTTP 503 **Suspended site page** requires **GrabWP Tenancy** (Base) 1.1.12 or newer and **GrabWP Tenancy WaaS** 1.1.21 or newer. With an older Base plugin, WaaS continues to run but does not block traffic to suspended tenants. Update both plugins to the current versions (Base 1.1.14, WaaS 1.1.24).

Read more: [A customer site says "temporarily unavailable"](/kb/troubleshooting/site-shows-temporarily-unavailable) | [Go-live checklist](/grabwp-tenancy-waas/waas-go-live-checklist)
