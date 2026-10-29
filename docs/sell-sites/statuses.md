---
title: "Statuses"
description: "Lookup tables for subscription statuses and what they do to a site, suspension reasons, site build states, invoice, service, discount and license statuses, and clone and backup steps."
sidebar_label: "Statuses"
tags: [reference, subscriptions, billing, license, backup, plan-waas, plan-pro, addon, for-operator, for-cs]
last_verified_date: "2026-10-30"
---

**Short answer:** this page lists every status you meet when selling sites: the subscription badges and what each does to the customer's site, why a site was paused, where a site build is, and the invoice, service, discount and license statuses. Use it to answer "why does my customer see this?".

**Needs:** Pro + WaaS

## Subscription statuses

The **Waas > Subscriptions** list shows the stored status. The detail screen and the customer dashboard can show a more specific badge based on dates. Free plans skip the date-based badges.

| Badge | Stored value | What happens to the site |
|---|---|---|
| **Active** | `active` | Stays online. |
| **Expiring Soon** | `active`, 7 days or fewer to the period end (detail badge only) | Stays online. |
| **Cancelling** | `active`, set to end at the period end (**Scheduled at period end** on the detail screen) | Stays online until the period ends. |
| **Trial** | `trial` | Stays online during the trial. Built-in trials show **Trial (built-in)** in the list. |
| **Grace Period** | `warning` | Stays online while grace days remain. The list also shows "Expired N days ago". |
| **Pending** | `pending` | Never pauses the site. |
| **Expired** | `expired`, or `active` past its period end | Paused at once (HTTP 503 page). |
| **Suspended** | `suspended` | Paused at once (HTTP 503 page). |
| **Cancelled** | `cancelled` | Paused after **Grace Period (days)**. With `0`, or when the customer cancels immediately, paused at once. |

The lifecycle and the daily job are explained on [Free trials and subscriptions](/sell-sites/trials-and-subscriptions).

## Admin actions on a subscription

On the subscription detail, under **Admin Actions**: **Extend Period**, **Change Plan**, **Grant Complimentary**, **Suspend**, **Reactivate** and **Add Note**. On a built-in trial also **Extend trial (add days)**, **End trial now** and **Convert manually (paid offline, days)**.

## Suspension reasons

When a site is paused, WaaS records why. Pausing needs GrabWP Tenancy 1.1.12 or newer and WaaS 1.1.21 or newer.

| Reason | When |
|---|---|
| `admin` | You suspended it by hand. |
| `cancelled` | The subscription was cancelled and the grace period ended (or was `0`). |
| `trial_ended` | A built-in free trial ended without a paid subscription. |
| `unpaid` | The period ended without payment. |

The visitor sees the **Suspended site page** with a message that matches the reason. You can edit that page under **Waas > Settings > Email**.

## Site build (provisioning) states

Shown on **Waas > Settings > Provisioning**. The new site's address is held for 2 hours while checkout runs. A failed build retries up to 12 times, and an hourly job re-queues stuck builds.

| State | Meaning |
|---|---|
| `checkout_pending` | Signup started, waiting for checkout or payment. |
| `payment_confirmed` | Payment (or a free signup) is confirmed, ready to build. |
| `finalizing` | Creating the customer account and the site record. |
| `tenant_created` | The site record exists, ready to copy the template or finish. |
| `clone_running` | The template is being copied. |
| `failed_retriable` | A step failed and will be retried. |
| `completed` | The site and subscription are ready. Not shown in the active list. |
| `failed_terminal` | The build gave up after the retry limit or an error it cannot recover from, or you dismissed it. |

How to retry or dismiss is on [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning#provisioning).

## Invoice statuses

| Value | Meaning |
|---|---|
| `pending` | Waiting for payment. |
| `open` | An unpaid renewal or checkout invoice. |
| `paid` | Paid and recorded. |
| `voided` | Cancelled. |
| `expired` | The payment window passed without payment. |

## Service contract statuses

| Value | Meaning |
|---|---|
| `active` | The service is active on the site. |
| `past_due` | A recurring service renewal is overdue. |
| `cancelled` | The service was removed or cancelled. |

## Discount code statuses

With the GrabWP Tenancy Discounts add-on, the **Status** column on **Waas > Discounts** shows:

| Badge | Meaning |
|---|---|
| **Active** | The code works: it is within its dates and its use limit. |
| **Paused** | You paused it. |
| **Scheduled** | Its start time is in the future. |
| **Ended** | Its end time has passed. |
| **Sold out** | It reached its use limit. |

## Pro license statuses

On **Tenancy > License** (keys start with `GRABWPPRO-`):

- On your site: `active` or `inactive`.
- From the license server: `granted`, `revoked`, `disabled` or `expired`.

An active license is needed to download and update the payment add-ons.

## Clone and backup steps

A signup copies the template site with the clone steps below. The progress bar on **Waas > Settings > Provisioning** counts these steps.

| Operation | Plugin | Steps |
|---|---|---|
| Clone | GrabWP Tenancy | 1. Validate, 2. Export database, 3. Import database, 4. Fix URLs, 5. Copy uploads, 6. Clean up |
| Clone | GrabWP Tenancy Pro | 1. Validate, 2. Export database (skipped for a fast SQLite clone), 3. Import database, 4. Link or copy plugins and themes, 5. Fix URLs, 6. Copy uploads (can finish in the background with S3 storage), 7. Clean up and rewrite template URLs |
| Backup | GrabWP Tenancy Pro | 1. Validate, 2. Export database, 3. Export the site's own plugins and themes, 4. Export config, 5. Export uploads, 6. Package ZIP, 7. Clean up |
| Restore | GrabWP Tenancy Pro | 1. Validate archive, 2. Extract, 3. Verify contents, 4. Restore database, 5. Restore plugins and themes, 6. Restore config, 7. Restore uploads, 8. Clean up |

## Related

- [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)
- [How WaaS works](/sell-sites/how-waas-works)
- [Dashboard, activity log and provisioning](/sell-sites/dashboard-and-provisioning)
- [Shortcodes, blocks and emails](/sell-sites/shortcodes-blocks-emails)
