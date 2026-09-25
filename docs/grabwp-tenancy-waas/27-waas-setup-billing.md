---
title: "Set Up Billing"
description: "Enable Polar.sh, set currency, and connect plan product IDs"
order: 27
section: waas
---

# Set Up Billing

Billing connects paid plans to a payment provider. WaaS registers **Polar.sh** itself. **WooCommerce** is registered only while WooCommerce is active. **Stripe**, **Sepay**, and **Xendit** appear after you install those add-on plugins. See [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins).

This page walks through **Polar.sh**, then lists what the other cards need. WooCommerce checkout details are in [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce).

Navigate to **Waas → Settings → Billing Providers** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Billing Providers](../images/waas-billing-settings.png)

The intro line is **Browse Add-ons** and **Enable providers below. The first enabled provider is the default fallback.**

Each provider is a card. A card is **Disabled** until you check **Enable this provider**. **Polar.sh** shows **Needs Config** until **API Token** and **Webhook Secret** are saved, then **Active**. Other enabled providers show **Active**. The fallback provider is badged **Default**. Click **Save Billing Providers** when the fields are filled. Success notice: **Billing provider settings saved.**

## Currency Settings

**Currency Settings** is the card under the provider list. Open it before you enable a provider that requires a specific currency.

| Field | Notes |
|-------|-------|
| **Primary Currency** | Shown on pricing pages. Plan prices are stored in this currency. If WooCommerce is active, this select is locked to the WooCommerce store currency. |
| **Secondary Currency** | Optional. **None (single currency)** keeps a single currency. Set this when a provider needs a different currency than primary (Sepay requires VND). |
| **Exchange Rate** | How many secondary units equal 1 primary unit. Applied before charging a provider that requires the secondary currency. Polar.sh and Stripe charge their catalog currency and do not use this rate for the charged amount. |
| **Display formatting** | Nested accordion: **Currency Position**, **Thousand Separator**, **Decimal Separator** |

**Currency Position** options: **Left ($99.99)**, **Left with space ($ 99.99)**, **Right (99.99$)**, **Right with space (99.99 $)**.

> **Tip:** A provider that requires a currency (Sepay requires VND) cannot be enabled unless that currency is primary or secondary. The error starts with **Currency change blocked:**

## Step 1: Polar.sh Account

1. Create an account at [polar.sh](https://polar.sh)
2. Create an organization
3. Create an API token in the Polar organization settings
4. Copy the organization ID

You do not have to create Polar products by hand. Saving a plan with Polar configured can create them. You can still paste an existing product UUID.

## Step 2: Enable Polar.sh

On the **Polar.sh** card (`polar`):

1. Check **Enable this provider**
2. Fill in:

| Field | Value |
|-------|-------|
| **API Base URL** | `https://api.polar.sh/v1` for production. Sandbox: `https://sandbox-api.polar.sh/v1` |
| **API Token** | Polar API token. Use **Show** to reveal it. |
| **Webhook Secret** | Secret Polar uses to sign webhooks |
| **Organization ID** | Polar organization ID |

3. Copy **Webhook URL** with **Copy**. It looks like `https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar`
4. In Polar, add that URL as a webhook endpoint and paste the same secret into **Webhook Secret**
5. Click **Save Billing Providers**

The help tip on **Webhook URL** shows **Last webhook received:** after the first event, or **No webhook events received yet.**

The card stays **Needs Config** until **API Token** and **Webhook Secret** are saved. After that it shows **Active**.

## Step 3: Link Plans

Go to **Waas → Settings → Plans**, edit the paid plan, and open **Payment Configuration**.

1. Leave **Polar Monthly Product ID** and **Polar Yearly Product ID** blank to auto-create, or paste UUIDs
2. Or click **Find existing** to pick a product already in Polar
3. Click **Save Plan**

**Resync** on **Polar.sh Configuration** refreshes the linked catalog objects. A value WaaS created is badged **Auto-created**.

## Other Providers

Install Stripe, Sepay, or Xendit from **Add-ons** before their cards appear. Then enable the card you want. The first enabled provider is the fallback used when signup does not pick another one.

| Provider | Plugin | Fields on the card |
|----------|--------|--------------------|
| **Polar.sh** | Built in | **API Base URL**, **API Token**, **Webhook Secret**, **Organization ID**, **Webhook URL** |
| **Stripe** | GrabWP Tenancy Stripe | **Secret Key**, **Publishable Key**, **Webhook Signing Secret**, **Thin Signing Secret (v2 Events)** (optional), **Webhook URL** |
| **Sepay** | GrabWP Tenancy Sepay | **API URL**, **QR URL**, **API Key**, **Bank**, **Account Number**, **Account Holder**, **Payment Code Prefix**, **Webhook URL**. Requires VND as primary or secondary. |
| **Xendit** | GrabWP Tenancy Xendit | **Secret API Key**, **Webhook Verification Token**, **Charge Currency**, **Country**, **Webhook URL**. No per-plan product IDs. |
| **WooCommerce** | WooCommerce plugin, not an add-on | **Anchor Product**. Leave `0` to auto-create on first checkout, or run **Create/Repair WooCommerce Anchor Product** on **General**. |

Stripe plan fields (**Stripe Monthly Price ID**, **Stripe Yearly Price ID**) are on the plan's **Payment Configuration** tab, with the same leave-blank-to-auto-create behavior as Polar.

Webhook URLs follow `https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/{provider}` where `{provider}` is `polar`, `stripe`, `sepay`, or `xendit`. Use the **Copy** button on the card rather than typing the URL.

## Step 4: Test a Payment

1. Point **API Base URL** at `https://sandbox-api.polar.sh/v1` and use sandbox credentials
2. Open the signup page, choose the paid plan, and finish Polar checkout
3. Confirm the **Webhook URL** tip shows a last-received time
4. Confirm the tenant exists under **Tenancy → All Tenants** and the subscription appears under **Waas → Subscriptions**

Switch **API Base URL** back to `https://api.polar.sh/v1` and production credentials before launch.

## Verify

1. The provider you will charge with shows **Active**
2. **Currency Settings** includes every currency that provider requires
3. The paid plan's **Payment Configuration** has a product or price ID for each cycle you sell, or you have saved the plan once so WaaS can auto-create them

---

**Next:** [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates)
