---
title: "Emails, shortcodes and blocks"
description: "Lookup tables for the 18 WaaS email and page templates, 6 shortcodes, 5 Gutenberg blocks, webhook endpoints and scheduled cron hooks."
sidebar_label: "Emails, shortcodes and blocks"
sidebar_position: 6
tags: [reference, settings, billing, subscriptions, backup, plan-base, plan-pro, plan-waas, addon, for-operator]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Discounts 1.0.0, Restore 1.0.5"
last_verified_date: "2026-10-29"
---

**Short answer:** this page lists the 18 templates on **Waas > Settings > Email** (11 customer emails, 6 admin notifications and 1 suspended site page), the 6 shortcodes, the 5 Gutenberg blocks, the billing webhook routes and the scheduled WP-Cron hooks.

## Email and page templates (18 templates)

Edited under **Waas > Settings > Email**. Templates marked **Required** cannot be turned off. Default trial reminder days are `7,3,1`.

| Label in wp-admin | Template key | Audience | Required | Default subject / title | Available tokens (wrapped in `{...}`) |
|---|---|---|---|---|---|
| **Welcome** | `welcome` | Customer | No | `Welcome to {site_name} -- Your site is being set up` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `tenant_domain`, `site_url`, `admin_url`, `login_password` |
| **Site setup complete** | `provisioning_complete` | Customer | No | `{site_name} -- Your site setup is complete` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `tenant_domain`, `site_url` |
| **Renewal reminder** | `renewal_reminder` | Customer | No | `{site_name} -- Renew your plan to keep your site active` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `plan_name`, `days_remaining`, `due_date` |
| **Plan expired (grace period)** | `grace_period_warning` | Customer | No | `{site_name} -- Your plan has expired` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `plan_name`, `due_date`, `grace_days` |
| **Site suspended** | `suspension_notice` | Customer | No | `{site_name} -- Your site has been suspended` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `plan_name` |
| **Invoice created** | `invoice_created` | Customer | No | `{site_name} -- Invoice {invoice_number} for your subscription renewal` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `plan_name`, `invoice_number`, `amount`, `due_date`, `payment_url` |
| **Invoice paid** | `invoice_paid` | Customer | No | `{site_name} -- Payment received, subscription renewed` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `plan_name`, `invoice_number`, `due_date` |
| **Free trial started** | `trial_started` | Customer | No | `{site_name} -- Your free trial has started` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `tenant_domain`, `plan_name`, `trial_end_date`, `days_left`, `upgrade_url` |
| **Free trial ending** | `trial_ending` | Customer | No | `{site_name} -- Your free trial ends in {days_left} day(s)` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `tenant_domain`, `plan_name`, `trial_end_date`, `days_left`, `upgrade_url` |
| **Free trial ended** | `trial_ended` | Customer | No | `{site_name} -- Your free trial has ended` | `site_name`, `customer_name`, `customer_email`, `dashboard_url`, `login_url`, `tenant_id`, `tenant_domain`, `plan_name`, `trial_end_date`, `days_left`, `upgrade_url` |
| **Verification code** | `otp` | Customer | Yes | `[{site_name}] Your verification code: {otp_code}` | `site_name`, `customer_name`, `customer_email`, `otp_code`, `expires_minutes` |
| **New signup** | `new_signup` | Admin | No | `[{site_name}] New site created: {tenant_domain}` | `site_name`, `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name`, `admin_url` |
| **Provisioning failed** | `provisioning_failed` | Admin | No | `[{site_name}] Site setup failed for {customer_email}` | `site_name`, `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name`, `admin_url`, `error_message` |
| **Payment received** | `payment_received` | Admin | No | `[{site_name}] Payment received from {customer_email}` | `site_name`, `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name`, `admin_url`, `invoice_number`, `amount` |
| **Payment failed** | `payment_failed` | Admin | No | `[{site_name}] Payment failed or overdue for {tenant_id}` | `site_name`, `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name`, `admin_url` |
| **Subscription cancelled** | `subscription_cancelled` | Admin | No | `[{site_name}] Subscription cancelled for {tenant_id}` | `site_name`, `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name`, `admin_url` |
| **Tenant suspended** | `tenant_suspended` | Admin | No | `[{site_name}] Tenant suspended: {tenant_id}` | `site_name`, `tenant_id`, `tenant_domain`, `site_url`, `customer_name`, `customer_email`, `plan_name`, `admin_url` |
| **Suspended site page** | `suspended_page` | Page (HTTP 503) | Yes | `{tenant_domain} is temporarily unavailable` | `tenant_domain`, `suspension_message`, `dashboard_url` |

## Shortcodes (6 shortcodes)

| Shortcode | Plugin | Default page | What it renders |
|---|---|---|---|
| `[grabwp_waas_signup]` | GrabWP Tenancy WaaS | `/signup/` | Multi-step customer signup wizard with template, plan and checkout steps. |
| `[grabwp_waas_dashboard]` | GrabWP Tenancy WaaS | `/dashboard/` | Customer self-service dashboard for sites, domains, billing and account settings. |
| `[grabwp_waas_pricing]` | GrabWP Tenancy WaaS | `/pricing/` | Plan pricing cards, monthly/yearly toggle and benefit comparison table. |
| `[grabwp_waas_templates]` | GrabWP Tenancy WaaS | `/templates/` | Starter template catalog with search and tag filters. |
| `[grabwp_waas_login]` | GrabWP Tenancy WaaS | Custom page | Standalone customer login form. |
| `[grabwp_waas_promo]` | GrabWP Tenancy Discounts | Custom page | Promotional discount banner or code display. |

## Gutenberg blocks (5 blocks)

All 5 blocks are in the `grabwp-waas` block category and ship with GrabWP Tenancy WaaS:

| Block title in editor | Block name (`block.json`) | Matching shortcode | Description |
|---|---|---|---|
| **WaaS Signup** | `grabwp-waas/signup` | `[grabwp_waas_signup]` | `Multi-step signup wizard with template selection, plan choice, and checkout.` |
| **WaaS Dashboard** | `grabwp-waas/dashboard` | `[grabwp_waas_dashboard]` | `Tenant owner dashboard with site management, billing, and settings.` |
| **WaaS Pricing** | `grabwp-waas/pricing` | `[grabwp_waas_pricing]` | `Pricing table with plan cards, benefits, monthly/yearly toggle, and comparison. Equivalent to the [grabwp_waas_pricing] shortcode.` |
| **WaaS Template Browser** | `grabwp-waas/template-browser` | `[grabwp_waas_templates]` | `Displays the WaaS template gallery with tag filters and pagination. Equivalent to the [grabwp_waas_templates] shortcode.` |
| **WaaS Login** | `grabwp-waas/login` | `[grabwp_waas_login]` | `Standalone login form for tenant owners. Equivalent to the [grabwp_waas_login] shortcode.` |

## Billing webhook endpoints

| Route | Used by | Notes |
|---|---|---|
| `/wp-json/grabwp-waas/v1/webhooks/billing/{provider}` | Polar (`polar`), Stripe (`stripe`), SePay (`sepay`), Xendit (`xendit`) | Standard billing webhook route shown in **Waas > Settings > Billing Providers**. |
| `/wp-json/grabwp-waas/v1/webhooks/polar` | Polar | Legacy Polar webhook route (still accepted). |

## Scheduled WP-Cron hooks

| Cron hook | Schedule | Plugin | What it does |
|---|---|---|---|
| `grabwp_waas_purge_activity_log` | `daily` | GrabWP Tenancy WaaS | Prunes activity log rows older than **Retention (days)**. |
| `grabwp_waas_check_expired_subscriptions` | `daily` (and once after install) | GrabWP Tenancy WaaS | Checks expired subscriptions and updates tenant suspension flags. |
| `grabwp_waas_purge_stale_pending_admins` | `daily` | GrabWP Tenancy WaaS | Cleans up expired pending admin accounts. |
| `grabwp_waas_sync_polar_subscriptions` | `twicedaily` | GrabWP Tenancy WaaS | Syncs subscription status with Polar. |
| `grabwp_waas_subscription_reconcile` | `twicedaily` | GrabWP Tenancy WaaS | Reconciles subscription states across billing providers. |
| `grabwp_waas_generate_renewal_invoices` | `twicedaily` | GrabWP Tenancy WaaS | Generates renewal invoices and sends renewal reminder emails. |
| `grabwp_waas_refresh_storage_usage` | `daily` | GrabWP Tenancy WaaS | Refreshes tenant disk and S3 storage usage numbers. |
| `grabwp_waas_scan_stale_intents` | `hourly` | GrabWP Tenancy WaaS | Scans and re-queues stuck provisioning intents. |
| `grabwp_waas_resume_provisioning_intent` | Single event | GrabWP Tenancy WaaS | Runs or resumes a single provisioning intent in the background. |
| `grabwp_waas_tenant_suspend_after_grace` | Single event | GrabWP Tenancy WaaS | Suspends a cancelled tenant when its grace period ends. |
| `grabwp_tenancy_pro_auto_backup` | Per tenant (chosen schedule) | GrabWP Tenancy Pro | Runs scheduled tenant backups and prunes old archives. |
| `grabwp_pro_clone_media_copy` | Single event | GrabWP Tenancy Pro | Copies S3 media files in the background after a template clone. |
| `grabwp_restore_cleanup_temp` | `hourly` | GrabWP Restore | Removes temporary extraction files created by GrabWP Restore. |

## Changed in recent versions

| Version | Change |
|---|---|
| WaaS 1.1.22 | Added **Free trial started** (`trial_started`), **Free trial ending** (`trial_ending`) and **Free trial ended** (`trial_ended`) email templates. |
| WaaS 1.1.21 | Added **Suspended site page** (`suspended_page`) under **Waas > Settings > Email**. |
| WaaS 1.1.16 | Added the **Email** tab on **Waas > Settings** with customizable customer and admin email templates. |
| Discounts 1.0.0 | Added the `[grabwp_waas_promo]` shortcode. |

## Related

- [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron)
- [Emails or renewal checks do not run](/kb/troubleshooting/emails-or-renewals-not-running)
- [Shortcode templates](/grabwp-tenancy-waas/waas-shortcode-templates)
- [Block walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough)
- [Email settings](/grabwp-tenancy-waas/waas-email)
