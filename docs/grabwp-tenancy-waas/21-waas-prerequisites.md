---
title: "Prerequisites"
description: "What you need before setting up GrabWP WaaS"
order: 21
section: waas
---

# Prerequisites

What you need before setting up GrabWP WaaS.

## Required

### WordPress Hosting with Admin Access

You need a WordPress installation where you can:

- Install and activate plugins
- Access the file system (via FTP, SSH, or hosting file manager)
- Edit `wp-config.php` if needed

**Recommended:** A VPS or dedicated server (e.g., DigitalOcean, Vultr, Hetzner) gives you full control. Shared hosting works but may limit advanced features like custom domains and S3 storage.

### Domain Name

A domain pointed to your server (e.g., `yoursaas.com`). Tenant sites will be created as subdomains: `customer1.yoursaas.com`, `customer2.yoursaas.com`, etc.

### PHP 7.4+ and MySQL 5.7+

Check your versions:
- **PHP:** Go to **Tools → Site Health → Info → Server** in WordPress admin
- **MySQL:** Same location, under **Database**

### SSL Certificate

HTTPS is required for payment processing and tenant security. Most hosts offer free SSL via Let's Encrypt.

## Recommended

### SMTP Plugin

WordPress default email uses `wp_mail()` which often lands in spam. Install an SMTP plugin to ensure reliable email delivery for OTP codes and notifications.

Popular options:
- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/)
- [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/)

### Polar Account (for paid plans)

If you want to charge for plans, create a free account at [polar.sh](https://polar.sh). Polar handles payments, subscriptions, and invoicing. Setup details in [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing).

## Optional

### Cloudflare (for custom domains)

If you want customers to use their own domains (e.g., `mybusiness.com` instead of `mybusiness.yoursaas.com`), Cloudflare's **SaaS Custom Hostnames** feature is the easiest way.

- Free Cloudflare plan works for basic setup
- SaaS Custom Hostnames requires contacting Cloudflare to enable on your zone
- See [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains) for setup

### S3-Compatible Object Storage

Offload tenant media uploads to cloud storage instead of local disk. Useful for:
- Reducing server disk usage
- Serving media via CDN
- Easier backups and migration

Supported providers: AWS S3, Cloudflare R2, DigitalOcean Spaces, MinIO, any S3-compatible API.

See [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage) for setup.

### WooCommerce

Alternative billing provider if you prefer WooCommerce over Polar. Useful if you already run a WooCommerce store or need local payment gateways.

See [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce) for setup.

---

**Next:** [What You Will Build](/grabwp-tenancy-waas/waas-what-you-will-build)
