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
- Access the file system (FTP, SSH, or the hosting file manager)
- Edit `wp-config.php` if you lock directory paths there

**Recommended:** A VPS or dedicated server gives you control of DNS, SSL, and PHP functions such as `symlink()`. Shared hosting can run the base setup.

### Domain Name

A domain pointed at your server (for example `yoursaas.com`). Tenant sites are created as subdomains of the **Platform Domain**, such as `customer1.yoursaas.com`.

Wildcard DNS must resolve `*.yoursaas.com` to the server. You set the domain later in [Configure WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general).

### PHP 7.4+ and WordPress 5.0+

GrabWP Tenancy, Pro, and WaaS each require WordPress 5.0+ and PHP 7.4+.

Check versions in **Tools → Site Health → Info → Server**.

### SSL Certificate

HTTPS is required for payment providers and for tenant sites. Cover the platform domain and `*.yoursaas.com`. Most hosts offer Let's Encrypt.

## Recommended

### SMTP Plugin

WordPress `wp_mail()` often lands in spam. Install an SMTP plugin so signup and dashboard login emails are delivered.

Popular options:

- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/)
- [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/)

### Polar.sh Account (for paid plans)

**Polar.sh** is the billing provider built into WaaS. Create an organization at [polar.sh](https://polar.sh) if you will charge for plans. Setup is in [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing).

You can also charge with WooCommerce, or with the Stripe, Sepay, and Xendit add-on plugins.

### Pro License

**Tenancy → License** is where you activate GrabWP Tenancy Pro. Add-on ZIP downloads from **Waas → Settings → Add-ons** use that license.

## Optional

### Cloudflare (for custom domains)

Customers can attach their own domains (for example `mybusiness.com`) in addition to the platform subdomain. **Cloudflare SaaS (CNAME)** is one of the two **Domain Mode** choices. See [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains).

### S3-Compatible Object Storage

Offload tenant media from local disk. Supported from **Tenancy → Pro Settings → Storage**: any S3-compatible API (AWS S3, Cloudflare R2, DigitalOcean Spaces, MinIO). See [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage).

### WooCommerce

WooCommerce appears as a billing provider when the WooCommerce plugin is active. See [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce).

---

**Next:** [What You Will Build](/grabwp-tenancy-waas/waas-what-you-will-build)
