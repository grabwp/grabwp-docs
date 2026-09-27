---
title: "WooCommerce Billing"
description: "Enable the WooCommerce billing provider, set the anchor product, and check out on your own site"
order: 34
section: waas
---

# WooCommerce Billing (Optional)

WooCommerce is a billing provider inside WaaS. The **WooCommerce** card is registered only while the WooCommerce plugin is active. Other cards (Polar, Sepay, Stripe, Xendit, and any other enabled add-on) stay on the same screen. The first enabled provider is the default fallback.

Checkout runs on your WooCommerce checkout page. WaaS puts the plan price on one shared hidden product (the anchor product). Plans do not store their own WooCommerce product IDs.

## Install WooCommerce

1. Go to **Plugins → Add New**.
2. Install and activate **WooCommerce**.
3. Finish the WooCommerce setup wizard, including store currency.

> **WooCommerce docs:** [Getting started](https://woocommerce.com/document/woocommerce-getting-started/)

In **WooCommerce → Settings → Payments**, enable the gateways you want (Stripe, PayPal, bank transfer, or another WooCommerce gateway).

## Enable the provider

**Navigate to Waas → Settings**, tab **Billing Providers** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Billing Providers](../images/waas-billing-settings.png)

The intro line is **Browse Add-ons** and **Enable providers below. The first enabled provider is the default fallback.**

1. Open the **WooCommerce** card. It is absent until WooCommerce is active. Description: **WordPress-native checkout powered by WooCommerce.**
2. Check **Enable this provider**.
3. Set **Anchor Product** if you already have the hidden product ID. Help text: shared hidden WooCommerce product used for dynamic pricing checkout. Leave `0` to auto-create on first checkout.
4. Click **Save Billing Providers**.

The card has no **Webhook URL**. WooCommerce updates WaaS through WordPress order hooks, not the billing webhook route.

> **Note:** A provider can show **Active**, **Disabled**, or **Needs Config** (Polar, when the API token or webhook secret is empty). WooCommerce shows **Active** once it is enabled.

## Create or repair the anchor product

**Navigate to Waas → Settings**, **General** tab (`page=grabwp-tenancy-waas-settings&tab=general`). Open **Repair tools**.

1. Click **Create/Repair WooCommerce Anchor Product**.
2. On success the notice is **WooCommerce anchor product is ready.** followed by the product ID.

You can paste that ID into **Anchor Product** on the WooCommerce card, or leave `0` so the next checkout creates it.

The anchor product must stay purchasable. If it is not, checkout fails with **The WaaS anchor product is not available for purchase.**

## Currency

On **Billing Providers**, open **Currency Settings**. When the WooCommerce provider is enabled, **Primary Currency** is locked. The help tip says **Locked to WooCommerce store currency** and tells you to change it in WooCommerce settings (**WooCommerce → Settings → General**).

## What the customer does

1. The customer picks a paid plan on signup.
2. WaaS adds the anchor product to the WooCommerce cart with the plan price and signup data.
3. The customer is sent to the WooCommerce checkout URL.
4. After the order is paid, WaaS continues provisioning from the order.

No Polar-style webhook is required for this provider.

## WooCommerce Subscriptions

Reading a WooCommerce subscription ID needs the WooCommerce Subscriptions plugin. Without it, `get_subscription` returns **WooCommerce Subscriptions is not active.** Checkout orders still work. Recurring status sync from WooCommerce Subscriptions does not.

Install [WooCommerce Subscriptions](https://woocommerce.com/products/woocommerce-subscriptions/) when you want WooCommerce to own the renewal schedule. Otherwise treat WooCommerce checkout as the payment step and manage renewals with [subscription admin actions](/grabwp-tenancy-waas/waas-managing-subscriptions) or another billing provider.

**Verify:** **WooCommerce** shows **Active**, a test signup for a paid plan lands on WooCommerce checkout with the plan total, and a completed order creates or updates the tenant subscription.

---

**Next:** [Troubleshooting](/grabwp-tenancy-waas/waas-troubleshooting)
