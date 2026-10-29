---
title: "Statuses"
description: "Lookup tables for subscription statuses, suspension reasons, provisioning states, invoice and service statuses, Pro license states, discount statuses and clone/backup steps."
sidebar_label: "Statuses"
sidebar_position: 5
tags: [reference, subscriptions, billing, license, backup, plan-base, plan-pro, plan-waas, addon, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24, Discounts 1.0.0, Restore 1.0.5"
last_verified_date: "2026-10-29"
---

**Short answer:** this page lists the status badges and stored database values across GrabWP plugins, along with what each status does to a tenant site. It also lists the step sequences for clone, backup and restore operations.

## Subscription statuses (WaaS)

Stored in `grabwp_waas_subscriptions.status` (default `pending`). Free plans skip date-based expiry states.

| Badge label in UI | Stored value / condition | What happens to the tenant site |
|---|---|---|
| **Active** | `active` | Site stays on. |
| **Expiring Soon** | `active` with 7 days or fewer until period end | Site stays on. |
| **Cancelling** | `active` with `cancel_at_period_end` set (`Scheduled at period end` on the detail screen) | Site stays on until the current period ends. |
| **Trial** | `trial` | Site stays on during the trial window. |
| **Grace Period** | `warning` | Site stays on while grace days remain. |
| **Pending** | `pending` | Never suspends the site. |
| **Expired** | `expired` (or `active` after the period end date has passed) | Site is blocked at once with the **Suspended site page** (HTTP 503). |
| **Suspended** | `suspended` | Site is blocked at once with the **Suspended site page** (HTTP 503). |
| **Cancelled** | `cancelled` | Blocked after **Grace Period (days)**; if **Grace Period (days)** is `0` or the subscription is cancelled immediately, the site is blocked at once. |

## Subscription Admin Actions (WaaS)

Available on **Waas > Subscriptions** when viewing a subscription (`Subscription: {tenant_id}` under **Admin Actions**):
- **Extend Period**
- **Change Plan**
- **Grant Complimentary**
- **Suspend**
- **Reactivate**
- **Add Note**
- When the subscription is on a built-in trial: **Extend trial (add days)**, **End trial now**, **Convert manually (paid offline, days)**

## Suspension reasons (WaaS and Base)

Stored in the suspension flag file `{base}/suspended/{tenant_id}.php` (requires Base 1.1.12 or newer and WaaS 1.1.21 or newer):

| Stored reason value | When it is written |
|---|---|
| `admin` | Suspended manually by a platform administrator. |
| `cancelled` | Subscription was cancelled and its grace period ended (or was `0`). |
| `trial_ended` | A built-in free trial ended without being upgraded to a paid subscription. |
| `unpaid` | Renewal payment or period expired without payment. |

## Provisioning intent states (WaaS)

Stored in `grabwp_waas_provisioning_intents` (default `checkout_pending`). A chosen site name is reserved for 2 hours (`RESERVATION_TTL`). Retriable jobs retry up to 12 times (`MAX_RETRIES`), and the hourly `grabwp_waas_scan_stale_intents` cron job re-queues stuck intents.

| Stored state | Meaning in the signup lifecycle |
|---|---|
| `checkout_pending` | Signup started; waiting for checkout or payment confirmation. |
| `payment_confirmed` | Payment or free signup confirmed; ready to build the tenant. |
| `finalizing` | Provisioning runner is creating the user and tenant record. |
| `tenant_created` | Tenant record exists; ready for template cloning or completion. |
| `clone_running` | Starter template clone job is running. |
| `failed_retriable` | A provisioning step failed and will be retried (up to 12 attempts). |
| `completed` | Tenant site and subscription setup finished. |
| `failed_terminal` | Provisioning failed after reaching the retry limit or hitting an unrecoverable error. |

## Invoice statuses (WaaS)

| Stored value | Meaning |
|---|---|
| `pending` | Unpaid invoice awaiting payment. |
| `open` | Unpaid open renewal or checkout invoice. |
| `paid` | Payment received and recorded. |
| `voided` | Invoice cancelled or voided. |
| `expired` | Invoice passed its payment window without payment. |

## Add-on service contract statuses (WaaS)

| Stored value | Meaning |
|---|---|
| `active` | Service is active on the tenant subscription. |
| `past_due` | Recurring service renewal is overdue. |
| `cancelled` | Service was removed or cancelled. |

## Discount rule statuses (GrabWP Tenancy Discounts)

Shown in the **Status** column on **Waas > Discounts**:

| Badge label in UI | Engine constant value | Meaning |
|---|---|---|
| **Active** | `applied` | Discount code is active and within its schedule and redemption limit. |
| **Paused** | `paused` | Code is paused by an admin. |
| **Scheduled** | `not_started` | Start time is in the future. |
| **Ended** | `ended` | End time has passed. |
| **Sold out** | `sold_out` | Code reached its `max_redemptions` limit. |

## Pro license statuses (GrabWP Tenancy Pro)

Checked on **Tenancy > License** (keys start with `GRABWPPRO-`):
- **Local config status** (`license.status`): `active` or `inactive`.
- **License server statuses**: `granted`, `revoked`, `disabled`, `expired`.

## Clone, backup and restore step lists

| Operation | Plugin | Total steps | Step order |
|---|---|---|---|
| Base clone | GrabWP Tenancy | 6 steps | 1. Validate, 2. Export database, 3. Import database, 4. Fix URLs, 5. Copy uploads, 6. Clean up |
| Pro clone | GrabWP Tenancy Pro | 7 steps | 1. Validate, 2. Export database (skipped for SQLite fast clone), 3. Import database, 4. Link or copy extensions, 5. Fix URLs, 6. Copy uploads (can finish in the background for S3), 7. Clean up and rewrite template URLs |
| Pro backup | GrabWP Tenancy Pro | 7 steps | 1. Validate, 2. Export database, 3. Export content (own plugins and themes), 4. Export config, 5. Export uploads, 6. Package ZIP, 7. Clean up |
| Pro restore | GrabWP Tenancy Pro | 8 steps | 1. Validate archive, 2. Extract, 3. Verify contents, 4. Restore database, 5. Restore content, 6. Restore config, 7. Restore uploads, 8. Clean up |
| Standalone restore | GrabWP Restore | 7 steps | 1. Validate, 2. Extract, 3. Import database, 4. Restore uploads, 5. Restore plugins, 6. Restore themes, 7. Clean up |

## Changed in recent versions

| Version | Change |
|---|---|
| WaaS 1.1.22 | Added built-in free trial (`trial` status and `trial_ended` suspension reason) and trial admin actions on **Waas > Subscriptions**. |
| WaaS 1.1.21 | Added automatic site blocking (`{base}/suspended/{tenant_id}.php`, HTTP 503) for `suspended`, `expired` and `cancelled` subscriptions (with Base 1.1.12+). |
| Pro 1.1.13 | Step 6 of Pro clone can continue copying media in the background when S3 storage is involved. |

## Related

- [Subscription lifecycle](/kb/concepts/subscription-lifecycle)
- [How a signup becomes a site](/kb/concepts/how-signup-builds-a-site)
- [A customer site says "temporarily unavailable"](/kb/troubleshooting/site-shows-temporarily-unavailable)
- [Managing subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions)
