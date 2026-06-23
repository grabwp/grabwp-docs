---
title: "GrabWP WaaS — Overview"
description: "Build your own WordPress-as-a-Service platform with self-service signup, templates, and billing"
order: 20
section: waas
---

# GrabWP WaaS Documentation

**Build your own WordPress-as-a-Service platform.** Let customers sign up, pick a template, choose a plan, and get a fully provisioned WordPress site — all self-service.

## How It Works

```
Visitor → Pick Template → Choose Plan → Pay → Site Provisioned
                                                    ↓
                                          Tenant Dashboard
                                     (custom domain, backups,
                                      billing, account settings)
```

GrabWP WaaS runs on top of three plugins:

| Plugin | Role |
|--------|------|
| **GrabWP Tenancy** (base) | Multi-tenant engine — routing, table-prefix isolation, tenant CRUD |
| **GrabWP Tenancy Pro** | Advanced isolation — dedicated databases, S3 storage, backups, cloning |
| **GrabWP Tenancy WaaS** | Self-service layer — plans, billing, templates, signup flow, tenant dashboard |

## Guide Overview

### Getting Started

1. [Prerequisites](/grabwp-tenancy-waas/waas-prerequisites) — what you need before installing
2. [What You Will Build](/grabwp-tenancy-waas/waas-what-you-will-build) — tutorial goals and architecture
3. [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins) — installation and activation

### Configuration

4. [Configure Pro Settings](/grabwp-tenancy-waas/waas-configure-pro-settings) — storage, databases, directories
5. [Configure WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general) — platform domain, auth, pages
6. [Create Plans](/grabwp-tenancy-waas/waas-create-plans) — free and paid plans
7. [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing) — Polar payment integration
8. [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates) — templates, tags, tag groups
9. [Set Up Frontend Pages](/grabwp-tenancy-waas/waas-setup-frontend-pages) — signup, dashboard, template browser

### Launch

10. [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist) — verify everything before opening to customers

### Operations

11. [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains) — Cloudflare SaaS and direct IP
12. [Managing Subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions) — subscription lifecycle and admin actions

### Optional Integrations

13. [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage) — offload media to S3-compatible storage
14. [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce) — use WooCommerce as billing provider

### Reference

15. [Troubleshooting](/grabwp-tenancy-waas/waas-troubleshooting) — common issues and fixes
- [Shortcode Reference: Template Browser](/grabwp-tenancy-waas/waas-shortcode-templates)
- [Block Walkthrough: Template Browser](/grabwp-tenancy-waas/waas-block-walkthrough)

---

**Requirements:** WordPress 5.0+, PHP 7.4+, MySQL 5.7+
