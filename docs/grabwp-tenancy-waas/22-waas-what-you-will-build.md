---
title: "What You Will Build"
description: "Tutorial goals, architecture, and customer signup flow for your WaaS platform"
order: 22
section: waas
---

# What You Will Build

By the end of this guide, you will have a working WordPress-as-a-Service platform where visitors can self-service sign up, pick a site template, choose a plan, and receive a fully provisioned WordPress site.

## Tutorial Goals

| Component | What you will set up |
|-----------|---------------------|
| **Plans** | 1 free plan (basic features, no payment required) + 1 paid plan (monthly via Polar) |
| **Billing** | Polar as primary payment provider |
| **Templates** | At least 1 site template customers can choose from |
| **Frontend** | Signup page, template browser, tenant dashboard |
| **Flow** | End-to-end: visitor → select template → pick plan → pay (if paid) → site created |

## Architecture

```
┌─────────────────────────────────────────────────┐
│                 YOUR MAIN SITE                  │
│            (yoursaas.com/wp-admin)              │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Plans   │  │Templates │  │   Billing    │  │
│  │Free / Pro│  │ Gallery  │  │(Polar/WC/..) │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │           PUBLIC PAGES                   │   │
│  │  /signup  /templates  /dashboard         │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      │
          Provisioning Engine
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
┌─────────┐    ┌─────────┐    ┌─────────────┐
│ Tenant A │    │ Tenant B │    │  Tenant C   │
│ (free)   │    │  (pro)   │    │   (pro)     │
│ a.you.com│    │ b.you.com│    │ custom.com  │
└─────────┘    └─────────┘    └─────────────┘
```

## Customer Signup Flow

Here is what your customers experience:

1. **Visit signup page** - sees available plans and pricing
2. **Pick a template** - browses the template gallery with tags/filters
3. **Choose a plan** - free or paid
4. **Enter site details** - subdomain slug, email
5. **Pay** (if paid plan) - redirected to Polar checkout
6. **Site provisioned** - customer receives their WordPress site URL
7. **Access dashboard** - manage site, billing, custom domain, backups

## What Each Plugin Does

### GrabWP Tenancy (Base)

The foundation. Handles tenant routing (subdomain → correct database tables), table-prefix isolation, and basic tenant management. Every tenant shares the same MySQL database but has isolated tables.

### GrabWP Tenancy Pro

Adds advanced isolation and management:
- **Dedicated databases** - each tenant gets its own MySQL database or SQLite file
- **Content isolation** - separate themes, plugins, uploads directories per tenant
- **S3 storage** - offload uploads to cloud storage
- **Backup & restore** - per-tenant backup and restore
- **Tenant cloning** - create templates by cloning existing tenants

### GrabWP Tenancy WaaS

The self-service layer that turns your WordPress into a SaaS platform:
- **Plans** - define free and paid tiers with features and pricing
- **Billing** - Polar and WooCommerce integration for payments
- **Templates** - template gallery with tags, groups, and plan restrictions
- **Signup flow** - complete provisioning pipeline from signup to site delivery
- **Tenant dashboard** - customer-facing dashboard for site management
- **Custom domains** - let customers use their own domains
- **Subscriptions** - lifecycle management with grace periods

---

**Next:** [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins)
