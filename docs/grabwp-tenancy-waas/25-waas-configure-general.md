---
title: "Configure WaaS General Settings"
description: "Set the platform domain, auth mode, frontend pages, and custom-domain mode"
order: 25
section: waas
---

# Configure WaaS General Settings

**General** is where you set the platform domain, which pages customers use, how they sign in, and how custom domains should point at your server.

Navigate to **Waas → Settings → General** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=general`).

![WaaS General Settings](../images/waas-general-settings.png)

The settings screen is **WaaS Settings**. Tabs, in order:

| Tab | This guide |
|-----|------------|
| **General** | This page |
| **Appearance** | Optional colors. [Appearance](/grabwp-tenancy-waas/waas-appearance) |
| **Signup Flow** | Optional step changes. [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow) |
| **Plans** | Next, in [Create Plans](/grabwp-tenancy-waas/waas-create-plans) |
| **Benefits** and **Services** | [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits) |
| **Billing Providers** | [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing) |
| **Activity Log** | Event list. [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity) |
| **Provisioning** | Signup intents. Open it if a test signup does not finish. |
| **Add-ons** | Covered in [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins) |

## Platform

| Field | Example | Notes |
|-------|---------|-------|
| **Platform Domain** | `yoursaas.com` | No `http://` and no trailing slash. Tenants are created as `slug.yoursaas.com`. |
| **WaaS Directory** | `grabwp-tenancy-waas` | Relative to the uploads directory, or an absolute path. The resolved path is shown under the field. |
| **Signup Page** | Signup | Page that contains `[grabwp_waas_signup]`. Default slug `/signup/`. |
| **Dashboard Page** | Dashboard | Page that contains `[grabwp_waas_dashboard]`. Default slug `/dashboard/`. |
| **Templates Page** | Templates | Page that contains `[grabwp_waas_templates]`. Default slug `/templates/`. |
| **Pricing Page** | Pricing | Page that contains `[grabwp_waas_pricing]`. Default slug `/pricing/`. |

Each page dropdown has a **View** link. The empty option is **Select a page**.

> **DNS:** Add a wildcard record so every subdomain reaches this server:
>
> ```
> *.yoursaas.com  →  A  →  YOUR_SERVER_IP
> ```

Page creation is in [Set Up Frontend Pages](/grabwp-tenancy-waas/waas-setup-frontend-pages). You can select the pages now if they already exist, or come back after the repair button creates them.

## Authentication

| Field | Options |
|-------|---------|
| **Auth Mode** | **WAAS Auth (Email signup)** or **WordPress Auth (Login required)** |

**WAAS Auth (Email signup)** creates the user during signup. The dashboard then signs the customer in with an email verification code.

**WordPress Auth (Login required)** requires an existing WordPress login before a site is created.

**For this tutorial:** choose **WAAS Auth (Email signup)**.

## Custom Domains

| Field | Options | Notes |
|-------|---------|-------|
| **Domain Mode** | **Cloudflare SaaS (CNAME)** or **Direct IP (A record)** | Controls the DNS instructions shown to customers |
| **CNAME Target** | for example `cdn.saas.example.com` | Shown for Cloudflare mode |
| **DCV Delegation** | Cloudflare DCV CNAME value | Shown for Cloudflare mode. Used for certificate validation on custom hostnames. |
| **Server Public IP** | for example `203.0.113.50` | Shown for Direct IP mode |

Pick the mode you will actually use. Details are in [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains). You can leave the targets empty until that step if you are not accepting custom domains yet.

## Retention and grace period

Open the **Retention and grace period** accordion on this tab. These fields are not on the **Activity Log** tab. That tab is the event list.

| Field | Limits | Notes |
|-------|--------|-------|
| **Retention (days)** | 7 to 365 | How long activity log entries are kept |
| **Grace Period (days)** | 0 to 90 | Days after subscription cancellation before the tenant is suspended. `0` suspends immediately. |

## Save

Click **Save Changes**. The notice **Settings saved.** confirms the save.

## Repair tools

Open the **Repair tools** accordion. These actions are separate forms. They are not part of **Save Changes**.

| Button | What it does |
|--------|----------------|
| **Create/Repair Signup and Dashboard Pages** | Creates or reuses Signup, Dashboard, Templates, and Pricing pages and stores their IDs. Success notice: **Signup and Dashboard pages checked.** |
| **Create/Repair WooCommerce Anchor Product** | Creates the shared WooCommerce product used for WaaS checkout. Use this when WooCommerce billing is enabled. Success notice: **WooCommerce anchor product is ready.** |

## API Keys

Open the **API Keys** accordion only if an external system will call the REST API with the `X-GrabWP-WaaS-API-Key` header.

1. Enter an optional label. The placeholder is **Key label (optional)**.
2. Click **Generate New API Key**
3. Copy the key from the warning notice. It is not shown again.

Existing keys list **Label**, **Prefix**, and **Created**. **Revoke** asks **Revoke this key?**

## Verify

1. **Platform Domain** matches the domain in your wildcard DNS
2. **Auth Mode** is **WAAS Auth (Email signup)**
3. After the repair button, all four page dropdowns point at a page, and each **View** link opens it

---

**Next:** [Create Plans](/grabwp-tenancy-waas/waas-create-plans)
