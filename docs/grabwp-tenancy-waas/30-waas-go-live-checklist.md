---
title: "Go-Live Checklist"
description: "Check DNS, pages, plans, billing, and a full signup before customers arrive"
order: 30
section: waas
---

# Go-Live Checklist

Walk through this list on the production site before you send customers to signup.

## Settings

- [ ] **Platform Domain** is set under **Waas → Settings → General**, and `*.yoursaas.com` resolves to the server
- [ ] HTTPS works on the platform domain and on a tenant subdomain
- [ ] **Signup Page**, **Dashboard Page**, **Templates Page**, and **Pricing Page** are selected
- [ ] **Auth Mode** is the mode you intend (**WAAS Auth (Email signup)** for self-service)
- [ ] **Tenancy → Pro Settings**: **Database** and **Isolation** match what you want for new tenants
- [ ] At least one plan is **Active** under **Waas → Settings → Plans**
- [ ] At least one template is active under **Waas → Templates**
- [ ] The billing provider you will charge with shows **Active** on **Billing Providers**
- [ ] Paid plans have product or price IDs on **Payment Configuration**, or you have saved them so the provider can auto-create those IDs
- [ ] **API Base URL** for Polar.sh is `https://api.polar.sh/v1`, not the sandbox URL

## Free Plan Signup

Use a private browser window.

1. Open the templates page and start signup from a template, or open `/signup/` directly
2. On **Create your account**, enter **Your Name** and **Email Address**
3. Choose the **Free** plan
4. Finish the wizard. **Payment Method** stays hidden when nothing in the order needs payment
5. Under **Tenancy → All Tenants**, confirm the new tenant exists
6. Open the tenant on its platform subdomain (`something.yoursaas.com`)

The subdomain is generated for the customer. You do not type it on the account step.

If the site never appears, open **Waas → Settings → Provisioning** and check the intent.

## Paid Plan Signup

1. Open signup in a new private window
2. Choose the paid plan and a billing cycle
3. On **Payment Method**, complete checkout with the provider you enabled
4. On **Billing Providers**, open that provider and check the **Webhook URL** tip for **Last webhook received**
5. Confirm the tenant under **Tenancy → All Tenants** and the row under **Waas → Subscriptions**

## Dashboard

1. Open the dashboard page
2. You should see **Sign in to your dashboard**
3. Enter the signup email and click **Send verification code**
4. Enter the code from email and confirm the dashboard loads

> **Note:** Deliver OTP mail with an SMTP plugin. Test with an inbox you control, and check spam.

## Template Gallery and Pricing

1. The templates page shows active templates, thumbnails, and tag filters
2. Search and a tag filter both change the list
3. The pricing page shows active plans and the prices you saved

## Cleanup

1. Delete test tenants from **Tenancy → All Tenants**
2. Remove test subscriptions you do not want to keep
3. If you tested Polar.sh against the sandbox, set **API Base URL** back to `https://api.polar.sh/v1` and use production credentials

## Before You Announce

| Item | Done |
|------|------|
| Wildcard DNS | |
| Wildcard HTTPS | |
| SMTP delivery tested | |
| Production billing credentials | |
| Main site backups | |
| Terms and privacy pages, if you require them | |

---

**Next:** [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains)
