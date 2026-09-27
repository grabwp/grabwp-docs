---
title: "GrabWP WaaS - Overview"
description: "Build a WordPress-as-a-Service platform with signup, templates, plans, and billing"
order: 20
section: waas
---

# GrabWP WaaS Documentation

**Build your own WordPress-as-a-Service platform.** Customers pick a template, choose a plan, and receive a WordPress site on a subdomain of your platform domain.

## How It Works

```
Visitor → Template gallery → Signup (account, plan, services, payment) → Site provisioned
                                                                              ↓
                                                                     Tenant dashboard
                                                          (domain, billing, account)
```

The default signup preset is editable. See [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

GrabWP WaaS runs on three plugins:

| Plugin | Role |
|--------|------|
| **GrabWP Tenancy** (base) | Multi-tenant engine: tenant list, create, settings, and status |
| **GrabWP Tenancy Pro** | Isolation defaults, databases, directories, storage, backups, license |
| **GrabWP Tenancy WaaS** | Plans, billing, templates, signup, dashboard, domains, subscriptions |

Billing providers that ship with WaaS are **Polar.sh** and **WooCommerce** (when WooCommerce is active). **Stripe**, **Sepay**, and **Xendit** are separate add-on plugins installed from **Waas → Settings → Add-ons**.

## Guide Overview

### Getting Started

1. [Prerequisites](/grabwp-tenancy-waas/waas-prerequisites)
2. [What You Will Build](/grabwp-tenancy-waas/waas-what-you-will-build)
3. [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins)

### Configuration

4. [Configure Pro Settings](/grabwp-tenancy-waas/waas-configure-pro-settings)
5. [Configure WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general)
6. [Create Plans](/grabwp-tenancy-waas/waas-create-plans)
7. [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing)
8. [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates)
9. [Set Up Frontend Pages](/grabwp-tenancy-waas/waas-setup-frontend-pages)

### Launch

10. [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist)

### Operations

11. [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains)
12. [Managing Subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions)

### Optional Integrations

13. [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage)
14. [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce)

### Reference

Deeper screens that are not part of the first-time path:

- [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow)
- [Appearance](/grabwp-tenancy-waas/waas-appearance)
- [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits)
- [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity)
- [Troubleshooting](/grabwp-tenancy-waas/waas-troubleshooting)
- [Shortcode Reference: Template Browser](/grabwp-tenancy-waas/waas-shortcode-templates)
- [Block Walkthrough: Template Browser](/grabwp-tenancy-waas/waas-block-walkthrough)

---

**Requirements:** WordPress 5.0+, PHP 7.4+
