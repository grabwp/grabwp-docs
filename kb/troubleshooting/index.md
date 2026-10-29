---
title: "Troubleshooting"
description: "Fixes organised by what you see in wp-admin or on a tenant site: notices, error messages, login redirects and stuck signups."
sidebar_label: "Overview"
sidebar_position: 0
tags: [troubleshooting, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** find the notice, error text or page behaviour you see below to open its cause, check steps and fix. Each guide starts with the smallest safe action and lists what to send if you still need help.

## Pages in this section

- [Notice: "load.php is not included in wp-config.php."](/kb/troubleshooting/red-notice-load-php): why the early loader block is missing and how to add it.
- [Notices about the MU-plugin or data directory](/kb/troubleshooting/mu-plugin-or-data-directory-notice): how to fix missing files, folder permissions and legacy path warnings.
- [Path URLs (/site/...) show 404 or a wrong page](/kb/troubleshooting/path-urls-return-404): rewrite rules for Apache, LiteSpeed and Nginx, plus theme routing limits.
- [Tenant dashboard icon sends me to the login page](/kb/troubleshooting/tenant-dashboard-login-fails): direct login token errors, the 30 minute window and object cache workarounds.
- [A custom domain does not work](/kb/troubleshooting/custom-domain-not-working): domain verification messages, plan benefits, DNS records and server aliases.
- [Signup stops or shows an error](/kb/troubleshooting/signup-problems): signup form validation messages, reserved site names and stuck provisioning jobs.
- [A customer site says "temporarily unavailable"](/kb/troubleshooting/site-shows-temporarily-unavailable): why a site is suspended and how an operator or customer restores it.
- [Emails or renewal checks do not run](/kb/troubleshooting/emails-or-renewals-not-running): server cron setup when WP-Cron is off and SMTP mail configuration.
- [Payment provider errors](/kb/troubleshooting/payment-provider-errors): Stripe secret key, SePay VND currency rule and known Xendit errors.
- [Pro license messages](/kb/troubleshooting/pro-license-messages): what each license validation message means on the **License** screen.
- [A tenant cannot install or find plugins and themes](/kb/troubleshooting/tenant-cannot-install-plugins): default file modification rules, isolated themes and third-party plugin licenses.
- [Backup, restore or "Failed to save Pro settings"](/kb/troubleshooting/backup-restore-and-save-problems): config folder write permissions, S3 storage migration and destructive restore warnings.
