---
title: "Discounts Add-on"
description: "Create and manage discount codes, campaign links, and recurring promotional offers for WaaS signups"
order: 43
section: waas
draft: true
---

# Discounts Add-on (WaaS)

> **Notice:** This document is an unpublished draft for the GrabWP Tenancy Discounts add-on.

GrabWP Tenancy Discounts adds promotional discount codes and campaign links to GrabWP WaaS signup flows. It is an optional add-on plugin (`grabwp-tenancy-discounts`) that requires GrabWP Tenancy WaaS 1.1.24 or later.

The add-on operates cleanly: it does not alter core WaaS database tables or core plugin files. Deactivating or removing the add-on safely restores default WaaS billing behavior.

## Turn on discounts

1. Install and activate the **GrabWP Tenancy Discounts** plugin.
2. In wp-admin, navigate to **Waas → Discounts** (`/wp-admin/admin.php?page=grabwp-tenancy-discounts`).
3. Expand the **Settings** accordion at the bottom of the page.
4. Check **Enable discounts** and click **Save settings**.

While **Enable discounts** is turned off, existing codes are preserved, but all front-end checkout calculations, pricing displays, and renewal invoices remain at standard pricing.

> **TODO (Screenshot):** Add current Round 6 capture of the Discounts list view and settings accordion (`admin.php?page=grabwp-tenancy-discounts#gwd-settings`). Placeholder awaiting post-Round-6 admin UI re-shoot.

## Discounts list and visible Actions column

The discounts dashboard at **Waas → Discounts** displays your active and scheduled promotions.

### List columns

| Column | Description |
|---|---|
| **Code** | The coupon identifier (displayed in uppercase monospace). Clicking opens the edit screen. |
| **Campaign** | Internal campaign label for tracking and reports. |
| **Discount** | The discount amount badge (for example `-20%` or `-$10.00`) and duration note. |
| **Status** | Promotional state: **Active**, **Paused**, **Scheduled**, **Ended**, or **Sold out**. |
| **Redemptions** | Used redemptions versus the maximum redemption limit. |
| **Discount given** | Total currency value discounted across all checkouts. |
| **Revenue** | Total revenue generated from orders using this code. |
| **Flows** | WaaS signup flows configured to auto-apply this code. |
| **Ends** | Expiration timestamp in site time, or **No end date**. |
| **Actions** | Dedicated, permanently visible action buttons. |

### Visible Actions column

Unlike standard WordPress tables that hide management links behind hover states, the Discounts list provides a permanently visible **Actions** column with accessible icon buttons:

- **Edit** (pencil icon): Opens the discount editing form.
- **Copy campaign link** (links icon): Copies a pre-tagged signup URL to your clipboard with immediate visual feedback.
- **Pause / Resume** (pause/play icon): Instantly toggles campaign activity via an inline request without entering the edit form.
- **Delete** (trash icon): Deletes the code rule. Deleting a rule does not interrupt existing subscribers currently receiving recurring discounts.

> **TODO (Screenshot):** Add current Round 6 capture of the list table showing the permanently visible Actions column with button hover states and copy link feedback.

## Create or edit a discount code

Click **Add New** (`/wp-admin/admin.php?page=grabwp-tenancy-discounts&action=new`) or click any existing code to edit.

The Add/Edit screen is organized into three clean in-page tabs, keeping the initial form compact (under 700px):

### 1. Discount tab

- **Code**: 3 to 32 characters (letters, numbers, hyphens, and underscores). Visitors can enter the code in any case; the system normalizes and stores it in uppercase.
- **Campaign name**: Internal campaign label for reports (never shown to customers).
- **Banner text**: Notification text shown in the signup banner and promo shortcode. Supports `{ends}` (end date) and `{remaining}` (uses remaining) placeholders. Clauses containing placeholders without values are automatically cleaned up.
- **Discount**: Choose **Percent** (1% to 99%) or **Fixed amount** (in platform primary currency). A 100% discount is not permitted: use the plan's built-in free trial instead.
- **Duration**: Controls how many billing cycles receive the discount (see Duration below).
- **Status**: Check **Active** to keep the campaign live; uncheck to pause.

### 2. Campaign tab

- **Starts**: Date and time in site time when the offer becomes valid.
- **Ends**: Expiration date and time in site time. Drives the banner countdown timer. Links automatically expire at this time.
- **Total uses**: Maximum global checkouts allowed (0 for unlimited).
- **Signup flows**: Check any signup flow to automatically attach this code to visitors on that flow (each flow auto-applies one active code).

### 3. Eligibility tab

- **Plans**: Select specific plans eligible for the code. Leave all unchecked to allow all plans.
- **Billing cycles**: Restrict to **Monthly**, **Yearly**, or leave both unchecked for all cycles.
- **Additional restrictions** (collapsible accordion):
  - **Templates**: Restrict to specific template slugs (one per line). Leave empty for all templates.
  - **Minimum first payment**: Minimum pre-discount order total required to apply the code.
  - **Uses per customer**: Maximum redemptions per customer email (default 1; 0 for unlimited). Addresses differing only by dots or `+tag` variants are treated as one customer.
  - **Allowed emails**: Restrict usage to exact email addresses or wildcard domains (for example `*@company.com`).
  - **New customers only**: Restricts usage to email addresses that have never held a platform subscription.

> **Important rules:**
> - Changes made to an existing code affect only future signups. Customers who have already subscribed retain their original discount terms.
> - Discount codes and free trials do not stack. When a discount code is applied, the plan's free trial is disabled for that checkout.

> **TODO (Screenshot):** Add current Round 6 capture of the Add/Edit discount interface showing the 3 in-page tabs, toggletips, and secondary accordions.

## Duration in plain language

The add-on provides three clear duration choices:

1. **First payment only** (`once`): The discount applies exclusively to the first payment at checkout (including plan price, template fee, and optional services). All renewal payments are billed at full price.
2. **Fixed number of payments (including first)** (`repeating`): The discount applies to a fixed number of billing cycles (between 2 and 36 payments). The initial checkout counts as payment 1. Subsequent renewals are discounted until the cycle count is completed, after which renewals revert to full price.
3. **Every payment until plan change or cancellation** (`forever`): The discount applies to the first payment and every subsequent renewal indefinitely.

> **Plan changes:** Changing plans on an active subscription immediately terminates any recurring discount. Subsequent renewal invoices are billed at the standard price of the new plan.

## Payment provider support and configuration

Different payment providers handle recurring discounts differently:

| Provider | First payment | Renewal payments | Setup required |
|---|---|---|---|
| **Stripe** | Yes | Yes (via synced Stripe coupon) | GrabWP Tenancy Stripe 1.1.6+ and secret key |
| **SePay** | Yes | Yes (on WaaS renewal invoices) | No vendor setup required |
| **WooCommerce** | Yes | Yes (on WaaS renewal invoices) | No vendor setup required |
| **Xendit** | Yes | No (First payment only) | No vendor setup required |
| **Polar** | No | No | Unsupported (Not available yet) |

### Stripe: Automatic coupon sync

- **Requirements:** Requires GrabWP Tenancy Stripe version 1.1.6 or later and the Stripe secret key configured under **Waas → Settings → Billing Providers → Stripe**.
- **Automatic synchronization:** The add-on automatically creates and manages coupons directly in your Stripe dashboard with identifiers like `gwaas-CODE-DURATION-AMOUNT`.
- **Duration mapping:**
  - First payment only: mapped to Stripe `duration=once`.
  - Every payment: mapped to Stripe `duration=forever`.
  - Fixed number of payments: mapped to Stripe `duration=repeating` with `duration_in_months` calculated based on billing interval (for example, 3 monthly payments = 3 months; 2 yearly payments = 13 months).
- **Checkout behavior:** The coupon is automatically attached to the Stripe Checkout Session. The customer sees the discounted price on Stripe's hosted checkout page, and Stripe's native promo code box is hidden.
- **Deactivation:** Existing Stripe coupons remain active on existing Stripe subscriptions until their period ends.

### SePay and WooCommerce: Renewal invoices

- WaaS manages renewals for SePay and WooCommerce through its own internal invoice engine.
- **Zero vendor setup:** No coupon configuration is needed inside SePay or WooCommerce.
- **Invoice discounting:** Each scheduled renewal invoice is generated with the discount subtracted and includes an itemized deduction note (for example `Discount BF26: -$10.00`).
- **Deactivation:** If the Discounts add-on is deactivated, subsequent renewal invoices are billed at full price.

### Xendit: First payment only

- Xendit supports discounts on the initial checkout payment.
- Because WaaS does not control recurring Xendit invoices, codes configured for recurring durations are not permitted when checking out with Xendit.

### Polar: Unsupported

- Polar is currently not supported for discount codes.
- Although Polar supports native coupons, WaaS validates completed checkout webhooks against the pre-discount order total, causing discounted checkouts to fail verification.
- When a customer applies a discount code, Polar is temporarily disabled as a payment option, and the customer is prompted to select a supported payment method.

### Provider minimum charges

A discount will never reduce the payable total below the payment gateway's minimum allowed transaction amount (defined in WaaS Currency Settings, such as 0.50 USD). If a discount exceeds this threshold, the discount is capped to ensure the charge meets the gateway minimum.

## Campaign links

You can share direct promotional links with customers:

- Append `?coupon=CODE` to any page URL (such as your homepage, landing page, or pricing table):
  `https://example.com/signup/?coupon=SAVE20`
- If the discount is restricted to a single plan, append the plan ID:
  `https://example.com/signup/?coupon=SAVE20&plan=pro`
- When a customer visits a campaign link, the code is stored in the visitor's browser for 7 days (or until the code expires).
- In **Waas → Discounts**, click the **Copy campaign link** icon in the Actions column to instantly copy the URL for any code.

## Shortcodes

- `[grabwp_waas_signup coupon="CODE"]`: Embeds the signup flow pre-loaded with the specified discount code.
- `[grabwp_waas_pricing coupon="CODE"]`: Displays plan pricing with struck-through original prices and discounted rates.
- `[grabwp_waas_promo code="CODE" cta="Get Started"]`: Displays a standalone promotional banner box with live countdown timer and call-to-action button.

---

> **Screenshot Handoff Note:** All screenshots for the GrabWP Tenancy Discounts add-on should be captured following the completion of Round 6 admin UI styling. Do not use legacy pre-Round-6 screenshots.
