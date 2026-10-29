---
title: "Glossary: selling and billing"
description: "Plain meaning of the terms about plans, signup, trials, billing and the WaaS settings."
sidebar_label: "Selling and billing"
sidebar_position: 4
tags: [glossary, billing, subscriptions, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** this page explains the words used when you sell tenant sites with WaaS: plans, benefits, trials, billing providers and how a signup becomes a site. The menu is named **Waas** in wp-admin.

## Activity log

**Plain meaning:** a record of events on the platform.
**Where you see it:** **Waas > Settings > Activity Log**. The setting **Retention (days)** ranges from 7 to 365 and defaults to 90.
**Why it matters:** old entries are deleted by a daily job, so it is not a permanent archive.
**More:** [Dashboard and activity](/grabwp-tenancy-waas/waas-dashboard-activity)

## Anchor product

**Plain meaning:** a WooCommerce product that WaaS uses for its own checkout when WooCommerce is the billing provider.
**Where you see it:** **Waas > Settings > General**, button **Create/Repair WooCommerce Anchor Product**.
**Why it matters:** if checkout fails with WooCommerce billing, use the repair button. The notice `WooCommerce anchor product is ready.` confirms it.
**More:** [Optional WooCommerce](/grabwp-tenancy-waas/waas-optional-woocommerce)

## Auth Mode

**Plain meaning:** how customers log in to the WaaS dashboard. The choices are **WAAS Auth (Email signup)**, the default, and **WordPress Auth (Login required)**.
**Where you see it:** **Waas > Settings > General**, field **Auth Mode**.
**Why it matters:** with WAAS Auth a customer signs up with an email and gets a verification code by email, so email delivery must work.
**More:** [Configure General settings](/grabwp-tenancy-waas/waas-configure-general)

## Benefit

**Plain meaning:** a feature switch or limit that a plan gives a customer. An example is `allow_custom_domain`.
**Where you see it:** **Waas > Settings > Benefits** and on each plan.
**Why it matters:** a customer cannot use a feature, such as a custom domain, if the plan lacks the benefit.
**More:** [Services and benefits](/grabwp-tenancy-waas/waas-services-benefits)

## Billing provider

**Plain meaning:** the payment service that charges customers. Polar and WooCommerce are built into WaaS. Stripe, SePay and Xendit are add-on plugins.
**Where you see it:** **Waas > Settings > Billing Providers**.
**Why it matters:** each provider has its own keys and rules. SePay needs VND as the primary or secondary currency.
**More:** [Payment providers](/kb/choose/payment-providers) | [Set up billing](/grabwp-tenancy-waas/waas-setup-billing)

## Built-in trial

**Plain meaning:** a free trial that WaaS runs itself, without a payment provider. The default is 14 days. A plan can set 1 to 365 days.
**Where you see it:** the plan settings. Reminder emails go out at 7, 3 and 1 days by default.
**Why it matters:** when the trial ends unpaid, the site is blocked with the suspended site page. A provider trial can run up to 730 days.
**More:** [Subscription lifecycle](/kb/concepts/subscription-lifecycle)

## Currencies (primary and secondary)

**Plain meaning:** the money units your prices use. The primary currency defaults to `USD`. The secondary currency is empty by default.
**Where you see it:** **Waas > Settings > Billing Providers**. The default exchange rate is 25500.
**Why it matters:** SePay refuses checkout with `Sepay requires VND currency. Please set VND as primary or secondary currency in WaaS settings first.`
**More:** [Payment provider errors](/kb/troubleshooting/payment-provider-errors)

## Discount rule

**Plain meaning:** a promotion from the Discounts add-on. Duration choices are **First payment only**, **Fixed number of payments (including first)** and **Every payment until plan change or cancellation**.
**Where you see it:** **Waas > Discounts**. The shortcode `[grabwp_waas_promo]` shows promotions on a page.
**Why it matters:** when discounts are off, codes are kept but ignored.
**More:** [How the plugins fit together](/kb/start-here/how-the-plugins-fit)

## Grace period

**Plain meaning:** the days a customer keeps their site after a subscription is cancelled. The default is 7. Zero means the site is blocked at once.
**Where you see it:** **Waas > Settings > General**, field **Grace Period (days)**. The badge **Grace Period** appears on the subscription.
**Why it matters:** it only applies to cancelled subscriptions.
**More:** [Subscription lifecycle](/kb/concepts/subscription-lifecycle)

## Plan

**Plain meaning:** what you sell: a price plus a set of benefits.
**Where you see it:** **Waas > Settings > Plans**.
**Why it matters:** a customer's plan decides which features and templates they can use.
**More:** [Create plans](/grabwp-tenancy-waas/waas-create-plans)

## Provisioning

**Plain meaning:** the steps that build a customer site after signup and payment.
**Where you see it:** **Waas > Settings > Provisioning**.
**Why it matters:** provisioning can stop partway. Stuck jobs are re-queued by an hourly job and each signup is retried up to 12 times.
**More:** [How a signup becomes a site](/kb/concepts/how-signup-builds-a-site)

## Provisioning intent

**Plain meaning:** one record per signup that tracks its progress, from `checkout_pending` to `completed` or `failed_terminal`.
**Where you see it:** the **Provisioning** tab shows it as progress.
**Why it matters:** a chosen site name is held for 2 hours while the intent waits for payment.
**More:** [Statuses](/kb/reference/statuses)

## REST API key

**Plain meaning:** a key that lets another program call the WaaS REST API. It is sent in the header `X-GrabWP-WaaS-API-Key`.
**Where you see it:** **Waas > Settings > General**, **API Keys**, button **Generate New API Key**.
**Why it matters:** the key is shown once: `New API key generated. Copy it now - it will not be shown again:`. Store it safely.
**More:** [Configure General settings](/grabwp-tenancy-waas/waas-configure-general)

## Service

**Plain meaning:** an extra a customer can buy on top of a plan.
**Where you see it:** **Waas > Settings > Services**.
**Why it matters:** a service has its own contract status: `active`, `past_due` or `cancelled`.
**More:** [Services and benefits](/grabwp-tenancy-waas/waas-services-benefits)

## Template

**Plain meaning:** a ready-made site that a new customer site is copied from.
**Where you see it:** **Waas > Templates**.
**Why it matters:** a template can be limited to some plans. If it is, signup shows `This template is not available for the selected plan. Please choose a different template or upgrade your plan.`
**More:** [Set up templates](/grabwp-tenancy-waas/waas-setup-templates)

## WaaS

**Plain meaning:** Website as a Service: the plugin that lets you sell tenant sites.
**Where you see it:** the **Waas** menu. The product name is WaaS, the menu label is **Waas**.
**Why it matters:** it needs Base and Pro active.
**More:** [WaaS overview](/grabwp-tenancy-waas/waas-overview)
