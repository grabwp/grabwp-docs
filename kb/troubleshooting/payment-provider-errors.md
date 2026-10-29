---
title: "Payment provider errors"
description: "How to fix Stripe secret key errors, SePay VND currency requirements, WooCommerce anchor product issues and known Xendit errors."
sidebar_label: "Payment provider errors"
sidebar_position: 9
tags: [troubleshooting, billing, plan-waas, addon, for-operator, for-cs]
last_verified_version: "WaaS 1.1.24, Stripe 1.1.7, SePay 1.1.5, Xendit 1.0.5"
last_verified_date: "2026-10-29"
---

**Short answer:** most checkout errors happen when a provider add-on is missing its API key, required currency or webhook setup under **Waas > Settings > Billing Providers**. Check the exact error message below to update the currency, secret key or WooCommerce anchor product.

## Symptom

You or your customers see one of these messages in wp-admin or at checkout:

- `Stripe secret key is not configured.`
- `SePay is active. Add VND as primary or secondary currency in WaaS > Settings > Billing Providers before customers can pay with SePay.`
- `Sepay requires VND currency. Please set VND as primary or secondary currency in WaaS settings first.`
- `The reference_id entered has been used before` (Xendit checkout)
- `Invalid parameter(s): billing_cycle` (Xendit checkout)
- `Discounts are off. Codes are kept, but checkouts, quotes and pages ignore them until you turn discounts on below.`

## Cause

| If you see | It means |
|---|---|
| `Stripe secret key is not configured.` | The GrabWP Tenancy Stripe add-on is active, but the secret key field is empty under **Waas > Settings > Billing Providers**. |
| `SePay is active. Add VND as primary or secondary currency in WaaS > Settings > Billing Providers before customers can pay with SePay.` | SePay only processes Vietnamese Dong (`VND`), and neither your primary nor secondary currency is set to `VND`. |
| `Sepay requires VND currency. Please set VND as primary or secondary currency in WaaS settings first.` | A customer attempted a SePay checkout while `VND` was not configured in currency settings. |
| SePay bank transfer succeeds, but the subscription stays pending | Your SePay plugin is older than 1.1.2 (which added `subAccount` virtual-account matching), or the webhook API key does not match (`API key for webhook authentication. Must be at least 10 alphanumeric characters.`). |
| `The reference_id entered has been used before` or `Invalid parameter(s): billing_cycle` on Xendit | Known issues in the Xendit add-on when a returning customer buys again, extends a yearly plan or buys a one-time service while holding an active Xendit subscription. |
| WooCommerce checkout fails to add the WaaS plan to cart | The internal WooCommerce anchor product was deleted or trashed. |

## Check

1. Go to **Waas > Settings > Billing Providers** and check which payment providers are enabled.
2. For Stripe, confirm both the publishable and secret keys are saved and the webhook endpoint `/wp-json/grabwp-waas/v1/webhooks/billing/stripe` is registered in your Stripe dashboard.
3. For SePay, check the currency section on **Waas > Settings > Billing Providers** to verify that `VND` is set as either the primary or secondary currency, and confirm on **Plugins** that **GrabWP Tenancy SePay** is version 1.1.2 or newer (current is 1.1.5).
4. For WooCommerce, go to **Waas > Settings > General**, open **Repair tools**, and check the WooCommerce anchor product status.
5. For promo codes not applying at checkout, go to **Waas > Discounts** and check whether the `Discounts are off.` notice is shown at the top.

## Fix

### Stripe: missing secret key

1. Go to **Waas > Settings > Billing Providers**.
2. Enter your Stripe secret key (`sk_live_...` or `sk_test_...`) and webhook signing secret, then save changes.
3. If you use Stripe trials on plans, ensure **GrabWP Tenancy Stripe** is version 1.1.6 or newer (current is 1.1.7) and the trial length is at least 48 hours.

### SePay: currency or webhook mismatch

1. Go to **Waas > Settings > Billing Providers** and set either the primary currency or secondary currency to `VND` (with an exchange rate if `VND` is secondary), then save changes.
2. Make sure your SePay webhook URL points to `/wp-json/grabwp-waas/v1/webhooks/billing/sepay` and the webhook API key is at least 10 alphanumeric characters.
3. Update **GrabWP Tenancy SePay** to version 1.1.5 so both `accountNumber` and virtual-account `subAccount` webhook payloads match.

### WooCommerce: missing anchor product

1. Go to **Waas > Settings > General** and expand **Repair tools**.
2. Click **Create/Repair WooCommerce Anchor Product**.
3. Confirm the green notice `WooCommerce anchor product is ready.` appears.

### Xendit: repeat subscription or one-time service error

The Xendit errors `The reference_id entered has been used before` and `Invalid parameter(s): billing_cycle` (when a customer with an existing Xendit subscription buys again, extends a yearly plan or purchases a one-time service from the dashboard) are reported issues that the team is working on. As a workaround, the platform admin can assign the service or extend the subscription period manually under **Waas > Subscriptions** using **Assign Service** or **Extend Period**.

For full setup steps, see [Set up billing](/grabwp-tenancy-waas/waas-setup-billing) and [Payment providers](/kb/choose/payment-providers).

## Still stuck

If payments succeed in your gateway dashboard but subscriptions do not update in WaaS, check **Waas > Settings > Activity Log** and follow [What to send when you ask for help](/kb/start-here/getting-help).
Do not promise: a release date for the Xendit repeat-purchase and one-time service fixes; a fix is being worked on.
