---
title: "WooCommerce Billing"
description: "Use WooCommerce as an alternative billing provider for local payment gateways"
order: 34
section: waas
---

# WooCommerce Billing (Optional)

Use WooCommerce as a billing provider instead of (or alongside) Polar. This is useful if you already run a WooCommerce store, need local payment gateways (e.g., Stripe, PayPal, local bank transfers), or prefer to manage billing within WordPress.

## When to Use WooCommerce

| Use case | Recommended provider |
|----------|---------------------|
| Simple subscription billing, international | **Polar** |
| Existing WooCommerce store, need local gateways | **WooCommerce** |
| Vietnamese bank transfers (VietQR) | **SePay** (separate plugin) |
| Multiple payment options for customers | **Both** - enable multiple providers |

## Setup Overview

### Step 1: Install WooCommerce

1. Go to **Plugins → Add New**
2. Search for **WooCommerce**
3. Install and activate
4. Complete the WooCommerce setup wizard (configure currency, payment methods, etc.)

> **WooCommerce docs:** [Getting started](https://woocommerce.com/document/woocommerce-getting-started/)

### Step 2: Configure Payment Gateways

In **WooCommerce → Settings → Payments**, enable the payment gateways you want to offer:

- Stripe
- PayPal
- Bank transfer
- Any other WooCommerce-compatible gateway

> Each gateway has its own setup. See [WooCommerce payment gateway docs](https://woocommerce.com/product-category/woocommerce-extensions/payment-gateways/).

### Step 3: Create Anchor Product

WaaS uses a shared **anchor product** - a hidden WooCommerce product used for dynamic pricing at checkout. You don't need separate products per plan.

1. Go to **WaaS → Settings → General**
2. Click the **Create/Repair WooCommerce Anchor Product** button
3. A hidden product is created automatically

Or set the anchor product ID manually in the **WooCommerce Anchor Product** field.

### Step 4: Enable WooCommerce as Billing Provider

1. Go to **WaaS → Settings → Billing**
2. Find the **WooCommerce** provider card
3. Check **Enable this provider**
4. Save settings

### Step 5: Configure Currency

If WooCommerce is enabled, the **Primary Currency** is locked to your WooCommerce store currency. To change it, go to **WooCommerce → Settings → General → Currency**.

## How It Works

Unlike Polar (which uses external checkout), WooCommerce checkout happens on your own site:

1. Customer selects a paid plan during signup
2. WaaS creates a WooCommerce cart with the plan price
3. Customer is redirected to WooCommerce checkout
4. Customer completes payment using your configured gateway
5. On order completion, WaaS automatically provisions the site

No webhooks needed - WooCommerce uses WordPress action hooks internally.

## WooCommerce Subscriptions (Optional)

For recurring billing (automatic renewals), install the [WooCommerce Subscriptions](https://woocommerce.com/products/woocommerce-subscriptions/) plugin. Without it, WooCommerce handles one-time payments only and subscription renewals must be managed manually.

## Limitations vs Polar

| Feature | Polar | WooCommerce |
|---------|-------|-------------|
| External hosted checkout | Yes | No (on-site) |
| Automatic subscription management | Yes | Requires WC Subscriptions plugin |
| Webhook-based status sync | Yes | Uses WP hooks (internal only) |
| Setup complexity | Low | Medium (more configuration) |
| Payment gateway flexibility | Limited (Polar's gateways) | High (any WC-compatible gateway) |

---

**Next:** [Troubleshooting](/grabwp-tenancy-waas/waas-troubleshooting)
