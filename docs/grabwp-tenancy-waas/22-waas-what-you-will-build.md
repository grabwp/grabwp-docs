---
title: "What You Will Build"
description: "Tutorial goals, architecture, and the customer signup path"
order: 22
section: waas
---

# What You Will Build

By the end of this guide you will have a working WordPress-as-a-Service platform: visitors choose a template, sign up, pick a plan, and receive a WordPress site on your platform domain.

## Tutorial Goals

| Component | What you will set up |
|-----------|---------------------|
| **Plans** | The seeded **Free** plan (no charge) plus at least one paid plan |
| **Billing** | **Polar.sh** enabled on **Billing Providers**, with currency set |
| **Templates** | At least one template, tagged, and shown in the gallery |
| **Frontend** | Signup, Dashboard, Templates, and Pricing pages |
| **Flow** | Template gallery, then the default signup preset, then a provisioned site |

A fresh install seeds three plans: **Free**, **Basic**, and **Pro**. Edit them instead of starting from an empty list. The **free** plan cannot be deleted.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 YOUR MAIN SITE                  │
│                                                 │
│  Plans    Templates (tags, groups, bulk)        │
│  Billing providers    Signup presets            │
│                                                 │
│  Public pages                                   │
│  /signup  /templates  /pricing  /dashboard      │
└─────────────────────────────────────────────────┘
                      │
              Provisioning
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
  tenant A         tenant B         tenant C
  a.yoursaas.com   b.yoursaas.com   custom domain
```

Tenant addresses in this guide are subdomains of **Platform Domain**. Custom domains are optional and configured later.

## Customer Signup Path

The built-in **Default** signup preset uses these steps:

1. **Create your account** (name and email, when **Auth Mode** is **WAAS Auth (Email signup)**)
2. **Choose a plan** and **Billing Cycle**
3. **Optional Services**
4. **Payment Method** (hidden when nothing in the order needs payment)

The site subdomain is generated during provisioning. Customers do not type a slug on the account step.

Template choice happens in the template gallery. Opening signup from a template passes that template into the wizard. Reorder, hide, or relabel steps under **Waas → Settings → Signup Flow**. Full reference: [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

After provisioning, the customer signs in on the dashboard page. With **WAAS Auth (Email signup)**, the dashboard asks for an email and **Send verification code**.

## What Each Plugin Does

### GrabWP Tenancy (Base)

Tenant list, create, settings, and status. The admin menu is **Tenancy**, with **All Tenants**, **Add New**, **Settings**, and **Status**.

### GrabWP Tenancy Pro

Adds **Pro Settings** and **License** under **Tenancy**.

**Pro Settings** tabs:

- **Isolation**, **Database**, **Directories**
- **Symlink**, **Storage**, **Backup**
- **CDN**

Leave **CDN** disabled. This guide uses domain-based tenant addresses. Routing is under **Tenancy → Settings → Routing**. Leave **Routing mode** at its default.

Per-tenant tools (extensions, clone, backup, restore) open from a tenant row. They are not top-level sidebar items.

### GrabWP Tenancy WaaS

The self-service layer. The admin menu is **Waas**:

- **Dashboard**, **Subscriptions**, **Domains**, **Templates**, **Settings**

**WaaS Settings** tabs:

| Tab | Use in this guide |
|-----|-------------------|
| **General** | Platform domain, pages, auth, custom-domain mode |
| **Appearance** | Frontend colors. See [Appearance](/grabwp-tenancy-waas/waas-appearance) |
| **Signup Flow** | Step order and labels. See [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow) |
| **Email** | Admin recipients, footer, and email templates. See [Email](/grabwp-tenancy-waas/waas-email) |
| **Plans** | Free and paid plans |
| **Benefits** | Quotas and flags attached to plans. See [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits) |
| **Services** | Optional purchases. Same reference page |
| **Billing Providers** | Polar.sh and add-on providers |
| **Activity Log** | Event list. See [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity) |
| **Provisioning** | Signup intents, including retry |
| **Add-ons** | Download Stripe, Sepay, and Xendit |

**Templates** has its own sub-navigation: **Templates**, **Tags**, **Tag Groups**, **Bulk**.

---

**Next:** [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins)
