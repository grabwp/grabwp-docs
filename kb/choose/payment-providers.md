---
title: "Payment providers"
description: "Compare built-in billing providers (Polar, WooCommerce), payment add-ons (Stripe, SePay, Xendit) and manual trials in GrabWP WaaS."
sidebar_label: "Payment providers"
sidebar_position: 5
tags: [billing, subscriptions, plan-waas, addon, for-operator, for-cs]
last_verified_version: "WaaS 1.1.24, Stripe 1.1.7, SePay 1.1.5, Xendit 1.0.5, Discounts 1.0.0"
last_verified_date: "2026-10-29"
---

**Short answer:** GrabWP Tenancy WaaS includes Polar and WooCommerce billing adapters out of the box, and supports Stripe, SePay and Xendit through separate add-on plugins. You can also run a built-in free trial or a zero-priced manual trial plan without connecting any payment gateway.

## What it is

All billing providers are managed under **Waas > Settings > Billing Providers**, where the first enabled provider becomes the default fallback:

| Provider | How it ships | How it bills and confirms payments | Currency and setup notes |
|---|---|---|---|
| **Polar** (`polar`) | Built into WaaS | Hosted or embedded checkout; webhook at `/wp-json/grabwp-waas/v1/webhooks/billing/polar` (`webhook-signature` header) | Fields: **API Base URL** (default `https://api.polar.sh/v1`), **API Token**, **Webhook Secret**, **Organization ID**. Can run provider-side trials. |
| **WooCommerce** (`woocommerce`) | Built into WaaS | Uses WooCommerce checkout, subscriptions and internal hooks (no external webhook route) | Uses an anchor product (**Create/Repair WooCommerce Anchor Product** in **Waas > Settings > General**). Locks **Primary Currency** to the WooCommerce store currency. |
| **Stripe** (`stripe`) | Add-on plugin (`grabwp-tenancy-stripe` 1.1.7) | Stripe Checkout and subscriptions; webhook at `/wp-json/grabwp-waas/v1/webhooks/billing/stripe` (`Stripe-Signature` header) | Fields: **Secret Key**, **Publishable Key**, **Webhook Signing Secret**, **Thin Signing Secret (v2 Events)**. Can run provider-side trials (requires at least 48 hours). |
| **Sepay** (`sepay`) | Add-on plugin (`grabwp-tenancy-sepay` 1.1.5) | Vietnamese bank transfer via QR code (VietQR); auto-confirmed via SePay webhook (`/wp-json/grabwp-waas/v1/webhooks/billing/sepay`) | Requires `VND` as **Primary Currency** or **Secondary Currency**. Fields: **API URL** (`https://my.sepay.vn`), **QR URL** (`https://qr.sepay.vn/img`), **API Key**, **Bank**, **Account Number**, **Account Holder**, **Payment Code Prefix** (`DH`). Non-recurring: customers receive renewal reminders. |
| **Xendit** (`xendit`) | Add-on plugin (`grabwp-tenancy-xendit` 1.0.5) | Checkout and recurring plans; webhook at `/wp-json/grabwp-waas/v1/webhooks/billing/xendit` | Fields: **Secret API Key**, **Webhook Verification Token**, **Charge Currency** (`IDR`, `PHP`, `VND`, `THB`, `SGD`, `MYR`, `USD`). See known issues before enabling for repeat purchases. |
| Built-in free trial or manual zero-priced plan | Built into WaaS | Customers sign up without paying; admin can use **Extend Period** or **Change Plan** under **Waas > Subscriptions** | No payment gateway required during trial. Native offline payment reference submission is not available yet. |

## Why it matters

- Choosing a provider affects how renewals work: Polar, Stripe, Xendit and WooCommerce Subscriptions can auto-renew, while non-recurring methods such as SePay or manual bank transfers rely on renewal invoices and reminder emails.
- Currency rules are enforced per provider: if **Sepay** is active without `VND` configured as **Primary Currency** or **Secondary Currency**, checkout is refused with `Sepay requires VND currency. Please set VND as primary or secondary currency in WaaS settings first.`
- With **GrabWP Tenancy Discounts** (`grabwp-tenancy-discounts` 1.0.0), discount codes apply at WaaS signup; Polar's own checkout discount field and WooCommerce cart coupons are hidden during WaaS checkout so provider coupons cannot cause price mismatches.

## How to check

1. In wp-admin, open **Waas > Settings > Billing Providers**.
2. Check each provider card badge (`Active`, `Needs Config` or `Disabled`) and verify which card has the `Default` badge.
3. Expand **Currency Settings** on the same screen to verify **Primary Currency** (default `USD`), **Secondary Currency** (default `None (single currency)`) and **Exchange Rate** (default `25500`).
4. For webhook-based providers, hover the help icon next to **Webhook URL** to see `Last webhook received: ...` or `No webhook events received yet.`

## What to do

Follow [Setup billing](/grabwp-tenancy-waas/waas-setup-billing) or [Optional WooCommerce setup](/grabwp-tenancy-waas/waas-optional-woocommerce) to connect your chosen payment provider. If you want to accept bank transfers without an automated gateway today, create a free trial or zero-priced plan and use **Admin Actions** (**Extend Period** or **Change Plan**) on **Waas > Subscriptions** after receiving payment.

## Limits and versions

- Do not promise: native offline or manual payment submission (where a customer enters a transfer reference and an admin marks it paid) is not available yet.
- Do not promise: the Xendit add-on has reported open issues with repeat subscriptions (`The reference_id entered has been used before`), buying a one-time Service (`Invalid parameter(s): billing_cycle`) and extending yearly plans; the team is working on a fix with no release date.
- Verified against WaaS 1.1.24, Stripe 1.1.7, SePay 1.1.5, Xendit 1.0.5 and Discounts 1.0.0.

## Related

- [Payment provider errors](/kb/troubleshooting/payment-provider-errors)
- [Subscription lifecycle](/kb/concepts/subscription-lifecycle)
- [WaaS settings](/kb/reference/waas-settings)
- [Setup billing](/grabwp-tenancy-waas/waas-setup-billing)
