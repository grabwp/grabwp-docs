---
title: "WaaS settings"
description: "Every setting on Waas > Settings (General and Billing Providers tabs) with its exact label, default and behavior."
sidebar_label: "WaaS settings"
sidebar_position: 4
tags: [reference, settings, domains, billing, subscriptions, plan-waas, addon, for-operator, for-cs]
last_verified_version: "WaaS 1.1.24, Stripe 1.1.7, SePay 1.1.5, Xendit 1.0.5"
last_verified_date: "2026-10-29"
---

**Short answer:** this page lists the settings on **Waas > Settings** (page title **WaaS Settings**), stored in the `grabwp_waas_settings` WordPress option. The screen has 11 tabs: **General**, **Appearance**, **Signup Flow**, **Email**, **Plans**, **Benefits**, **Services**, **Billing Providers**, **Activity Log**, **Provisioning** and **Add-ons**.

## General tab settings

| Label in wp-admin | Section on **General** | Default | What it does | Notes |
|---|---|---|---|---|
| **Platform Domain** | **Platform** | Empty (`''`) | `Primary domain for tenant subdomains (e.g. example.com to slug.example.com).` | When routing mode is **Path and domain** (`both`), `Leave empty to give customer sites path URLs.` Hidden when routing mode is **Path** (`path`). |
| **WaaS Directory** | **Platform** | Empty (`''`, placeholder `grabwp-tenancy-waas`) | `Relative to uploads directory, or absolute path.` | Displays the resolved directory path next to the input. |
| **Signup Page** | **Platform** | `0` (`Select a page`, fallback `/signup/`) | `Default page is published at /signup/ and contains [grabwp_waas_signup].` | Includes a **View** link to open the page. |
| **Dashboard Page** | **Platform** | `0` (`Select a page`, fallback `/dashboard/`) | `Default page is published at /dashboard/ and contains [grabwp_waas_dashboard].` | Includes a **View** link to open the page. |
| **Templates Page** | **Platform** | `0` (`Select a page`, fallback `/templates/`) | `Default page is published at /templates/ and contains [grabwp_waas_templates].` | Includes a **View** link to open the page. |
| **Pricing Page** | **Platform** | `0` (`Select a page`, fallback `/pricing/`) | `Default page is published at /pricing/ and contains [grabwp_waas_pricing].` | Includes a **View** link to open the page. |
| **Auth Mode** | **Authentication** | **WAAS Auth (Email signup)** (`waas_auth`) | Chooses **WAAS Auth (Email signup)** (`waas_auth`) or **WordPress Auth (Login required)** (`wp_auth`). | `WAAS Auth: Creates user during signup. WP Auth: Requires existing WordPress login before creating site.` |
| **Domain Mode** | **Custom Domains** | **Cloudflare SaaS (CNAME)** (`cloudflare_saas`) | Chooses **Cloudflare SaaS (CNAME)** (`cloudflare_saas`) or **Direct IP (A record)** (`direct_ip`). | `How tenants connect custom domains. Determines DNS record instructions shown to tenants.` Hidden in path routing mode. |
| **CNAME Target** | **Custom Domains** | Empty (`''`) | `Cloudflare custom hostname fallback origin. Tenants point CNAME to this value.` | Shown when **Domain Mode** is **Cloudflare SaaS (CNAME)**. Placeholder `cdn.saas.example.com`. |
| **DCV Delegation** | **Custom Domains** | Empty (`''`) | `DCV Delegation CNAME record value from Cloudflare. Enables automatic SSL certificate validation for custom hostnames.` | Shown when **Domain Mode** is **Cloudflare SaaS (CNAME)**. Placeholder `acme123.dcv.cloudflare.com`. |
| **Server Public IP** | **Custom Domains** | Empty (`''`) | `Public IP address of this server. Tenants point A record to this value.` | Shown when **Domain Mode** is **Direct IP (A record)**. Placeholder `203.0.113.50`. |
| **Retention (days)** | **Retention and grace period** | `90` | Days to retain rows in the activity log before daily cleanup (`grabwp_waas_purge_activity_log`). | Range `7` to `365`. |
| **Grace Period (days)** | **Retention and grace period** | `7` | `Days before tenant is suspended after subscription cancellation. 0 = immediate.` | Range `0` to `90`. |
| **Create/Repair WooCommerce Anchor Product** | **Repair tools** | Button | Creates or repairs the WooCommerce anchor product used for WaaS checkouts. | Shows notice `WooCommerce anchor product is ready.` |
| **Create/Repair Signup and Dashboard Pages** | **Repair tools** | Button | Checks and recreates missing default WaaS frontend pages. | Shows notice `Signup and Dashboard pages checked.` |
| **API Keys** | **API Keys** | None | Generates and revokes REST API keys sent in the `X-GrabWP-WaaS-API-Key` HTTP header. | Shows `New API key generated. Copy it now - it will not be shown again:` once upon creation. |

## Billing Providers and Currency Settings tab

| Label in wp-admin | Section on **Billing Providers** | Default | What it does | Notes |
|---|---|---|---|---|
| **Enable this provider** | Each provider card | Off (`false`) | Enables the billing provider; the first enabled provider is the default fallback. | Cards show status badges `Active`, `Needs Config` or `Disabled`, plus `Default`. |
| **API Base URL** | **Polar** (`polar`) | `https://api.polar.sh/v1` | `Production: https://api.polar.sh/v1 \| Sandbox: https://sandbox-api.polar.sh/v1` | Built-in provider. |
| **API Token** | **Polar** (`polar`) | Empty (`''`) | Polar API token. | Required when Polar is enabled. |
| **Webhook Secret** | **Polar** (`polar`) | Empty (`''`) | Polar webhook signing secret. | Required when Polar is enabled. |
| **Organization ID** | **Polar** (`polar`) | Empty (`''`) | Polar organization ID. | Built-in provider field. |
| **Secret Key** | **Stripe** (`stripe`) | Empty (`''`) | `Stripe secret key (sk_live_... or sk_test_...). Never share this key publicly.` | Added by GrabWP Tenancy Stripe add-on. |
| **Publishable Key** | **Stripe** (`stripe`) | Empty (`''`) | `Stripe publishable key (pk_live_... or pk_test_...).` | Added by GrabWP Tenancy Stripe add-on. |
| **Webhook Signing Secret** | **Stripe** (`stripe`) | Empty (`''`) | `Stripe webhook endpoint signing secret (whsec_...). Required for signature verification.` | Added by GrabWP Tenancy Stripe add-on. |
| **Thin Signing Secret (v2 Events)** | **Stripe** (`stripe`) | Empty (`''`) | `Signing secret for the v2 event destination (whsec_...).` | Optional field in GrabWP Tenancy Stripe add-on. |
| **API URL** | **Sepay** (`sepay`) | `https://my.sepay.vn` | `Sepay API base URL. Default: https://my.sepay.vn` | Added by GrabWP Tenancy SePay add-on. |
| **QR URL** | **Sepay** (`sepay`) | `https://qr.sepay.vn/img` | `VietQR image generation URL. Default: https://qr.sepay.vn/img` | Added by GrabWP Tenancy SePay add-on. |
| **API Key** | **Sepay** (`sepay`) | Empty (`''`) | `API key for webhook authentication. Must be at least 10 alphanumeric characters.` | Added by GrabWP Tenancy SePay add-on. |
| **Bank** | **Sepay** (`sepay`) | `-- Select Bank --` (`''`) | `Select your bank for receiving payments.` | Added by GrabWP Tenancy SePay add-on. |
| **Account Number** | **Sepay** (`sepay`) | Empty (`''`) | `Your bank account number. A Sepay virtual account (VA) number is also accepted.` | Added by GrabWP Tenancy SePay add-on. |
| **Account Holder** | **Sepay** (`sepay`) | Empty (`''`) | `Name of the account holder.` | Added by GrabWP Tenancy SePay add-on. |
| **Payment Code Prefix** | **Sepay** (`sepay`) | `DH` | Prefix prepended to SePay payment transfer codes. | Added by GrabWP Tenancy SePay add-on. |
| **Secret API Key** | **Xendit** (`xendit`) | Empty (`''`) | `Xendit secret API key (starts with xnd_).` | Added by GrabWP Tenancy Xendit add-on. |
| **Webhook Verification Token** | **Xendit** (`xendit`) | Empty (`''`) | `Callback verification token from Xendit Dashboard webhook settings.` | Added by GrabWP Tenancy Xendit add-on. |
| **Charge Currency** | **Xendit** (`xendit`) | `IDR` | Currency sent to Xendit (`IDR`, `PHP`, `VND`, `THB`, `SGD`, `MYR`, `USD`). | Added by GrabWP Tenancy Xendit add-on. |
| **Primary Currency** | **Currency Settings** | `USD` | `The currency shown to customers on pricing pages and invoices. Plan prices are stored in this currency.` | Locked to the WooCommerce store currency when WooCommerce is active and locked. |
| **Secondary Currency** | **Currency Settings** | **None (single currency)** (`''`) | `Optional. Set this when a billing provider requires a different currency than primary (e.g. Sepay requires VND). Leave as None for a single-currency site.` | Stored as `currency_secondary`. |
| **Exchange Rate** | **Currency Settings** | `25500` | `How many secondary units equal 1 primary unit.` | Applied before charging providers that require the secondary currency. |
| **Currency Position** | **Currency Settings > Display formatting** | **Left ($99.99)** (`before`) | Choices: **Left ($99.99)** (`before`), **Left with space ($ 99.99)** (`before_space`), **Right (99.99$)** (`after`), **Right with space (99.99 $)** (`after_space`). | Controls where the currency symbol is placed. |
| **Thousand Separator** | **Currency Settings > Display formatting** | `,` | `Character used to group thousands. Leave empty for no separator.` | Max 1 character. |
| **Decimal Separator** | **Currency Settings > Display formatting** | `.` | `Character used between whole and fractional amounts.` | Max 1 character. |

## Rules that change a value

- **Path routing mode hides domain fields:** when **Routing mode** in **Tenancy > Settings > Routing** is set to **Path** (`path`), the **Platform Domain** row and the **Custom Domains** section on **Waas > Settings > General** are hidden and the page displays `Path mode: customer sites open at ... No DNS needed.`
- **Draft frontend pages fall back to default URLs:** a page selected in **Signup Page**, **Dashboard Page**, **Templates Page** or **Pricing Page** is used only while that WordPress page is published; if it is moved to draft, WaaS falls back to `/signup/`, `/dashboard/`, `/templates/` or `/pricing/`.
- **WooCommerce currency lock:** when WooCommerce is active and locked, **Primary Currency** is disabled and shows `Locked to WooCommerce store currency (%s). Change in WooCommerce settings.`

## Changed in recent versions

| Version | Change |
|---|---|
| WaaS 1.1.22 | New installs start with `USD` as the only currency (`currency_secondary` empty) and Polar disabled until configured. |
| WaaS 1.1.21 | Added **Suspended site page** template under **Waas > Settings > Email** to block suspended, expired and cancelled sites (requires Base 1.1.12+). |
| WaaS 1.1.16 | Added the **Email** tab with customer and admin email templates. |

## Related

- [Payment providers](/kb/choose/payment-providers)
- [Emails, shortcodes and blocks](/kb/reference/emails-shortcodes-and-blocks)
- [Statuses](/kb/reference/statuses)
- [Configure general settings](/grabwp-tenancy-waas/waas-configure-general)
