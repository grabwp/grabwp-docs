---
title: "Go-live checklist"
description: "Check DNS, pages, plans, payments, emails and a full test signup on the production site before you send customers to it."
sidebar_label: "Go-live checklist"
tags: [settings, billing, plan-waas, for-operator]
last_verified_date: "2026-10-30"
---

**Short answer:** before you announce your service, walk through this list on the production site and do one free and one paid test signup in a private browser window. Each item links to the page that explains it.

**Needs:** Pro + WaaS

## Settings

- [ ] Customer site addresses work. With subdomains: **Platform Domain** is set under **Waas > Settings > General**, `*.yoursaas.com` resolves to your server, and HTTPS works on both the main domain and a customer subdomain. With path URLs: a customer site opens at `yoursaas.com/site/...`.
- [ ] **Signup Page**, **Dashboard Page**, **Templates Page** and **Pricing Page** are selected and their **View** links open the right page. See [Frontend pages](/sell-sites/frontend-pages).
- [ ] **Auth Mode** is the mode you intend (**WAAS Auth (Email signup)** for self-service).
- [ ] **Tenancy > Pro Settings**: **Database** and **Isolation** match what you want for new customer sites. See [Set up WaaS](/sell-sites/set-up-waas#step-4-check-the-pro-defaults-for-new-sites).
- [ ] The plans you sell are **Active** under **Waas > Settings > Plans**. The seeded **Basic** and **Pro** plans start inactive. See [Plans](/sell-sites/plans).
- [ ] At least one template is active under **Waas > Templates**. See [Templates](/sell-sites/templates).
- [ ] The payment provider you will charge with shows **Active** on **Billing Providers**, and paid plans have product or price IDs on **Payment Configuration** (or you saved them once so the provider could create them). See [Payments](/sell-sites/payments).
- [ ] Polar.sh: **API Base URL** is `https://api.polar.sh/v1`, not the sandbox URL.
- [ ] A server cron job runs WordPress scheduled jobs, so renewals, trial reminders and retries happen on time.

## Free plan signup

Use a private browser window.

1. Open the templates page and click **Get started** on a template, or open `/signup/` directly.
2. On **Create your account**, enter **Your Name** and **Email Address**.
3. Choose the Free plan and finish the form. **Payment Method** stays hidden when nothing in the order needs payment.
4. Under **Tenancy > All Tenants**, confirm the new site exists.
5. Open the new site at its address.

The customer does not type the site address; WaaS picks it. If the site never appears, open **Waas > Settings > Provisioning** and read the state of that signup. See [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning#provisioning).

## Paid plan signup

1. Open signup in a new private window.
2. Choose a paid plan and a billing cycle.
3. On **Payment Method**, complete checkout with the provider you enabled.
4. On **Billing Providers**, hover the help icon next to that provider's **Webhook URL** and check that it shows **Last webhook received** (not for WooCommerce, which has no webhook).
5. Confirm the site under **Tenancy > All Tenants** and its row under **Waas > Subscriptions**.

If a paid plan offers a built-in free trial, also test a trial signup: it should finish without payment and show **Trial (built-in)** on **Waas > Subscriptions**.

## Customer dashboard

1. Open the dashboard page while signed out. You should see **Sign in to your dashboard**.
2. Enter the signup email and click **Send verification code**.
3. Enter the code from the email and confirm the dashboard loads.

Test with an inbox you control and check the spam folder. Deliver mail through an SMTP plugin.

## Template gallery and pricing

1. The templates page shows active templates, thumbnails and tag filters.
2. Search and a tag filter both change the list.
3. The pricing page shows the active plans and the prices you saved.

## Clean up

1. Delete test sites from **Tenancy > All Tenants**.
2. Remove test subscriptions you do not want to keep.
3. If you tested Polar.sh against the sandbox, set **API Base URL** back to `https://api.polar.sh/v1` and use production credentials.

## Before you announce

| Item | Done |
|---|---|
| Wildcard DNS (subdomains only) | |
| Wildcard HTTPS (subdomains only) | |
| SMTP delivery tested | |
| Production payment credentials | |
| Server cron job | |
| Backups of the main site | |
| Terms and privacy pages, if you require them | |

## Related

- [Set up WaaS](/sell-sites/set-up-waas)
- [Payments](/sell-sites/payments)
- [Emails](/sell-sites/emails)
- [Client custom domains](/sell-sites/client-domains)
