---
title: "Subscription lifecycle"
description: "The statuses customers and admins see, and what happens to the site in each: trial, grace period and suspension."
sidebar_label: "Subscription lifecycle"
sidebar_position: 9
tags: [subscriptions, plan-waas, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** a subscription shows a badge such as **Trial**, **Active**, **Grace Period** or **Suspended**. The site stays on while the subscription is active, in trial or in grace. It is blocked at once when suspended or expired, and after the grace period when cancelled.

## What it is

Badges in the admin and the customer dashboard:

| Badge | When |
|---|---|
| **Pending** | Not paid or started yet. A pending subscription never blocks the site. |
| **Trial** | In a free trial. |
| **Active** | Paid and current. |
| **Expiring Soon** | Active, with 7 days or fewer to the period end. |
| **Cancelling** | Active, set to end at the period end. |
| **Grace Period** | The subscription is in its grace period and the site is still online. |
| **Expired** | The period end has passed. |
| **Cancelled** | Cancelled by the customer or admin. |
| **Suspended** | Blocked by the platform admin or by a rule. |

Free plans skip the date based badges.

What each does to the site:

| Status | Site |
|---|---|
| Active, Trial, Grace Period | stays on |
| Pending | stays as it is, never blocked |
| Suspended, Expired | blocked at once |
| Cancelled | blocked after the grace period. With **Grace Period (days)** at 0, or when the customer cancels immediately, blocked at once |

A blocked site shows the suspended site page. The recorded reason is one of `admin`, `cancelled`, `trial_ended` or `unpaid`.

## Why it matters

A customer who sees the temporarily unavailable page needs to know why. The badge and the reason tell you. A built-in trial that ends unpaid blocks the site with reason `trial_ended`.

## How to check

Open **Waas > Subscriptions** and the subscription detail. **Waas > Settings > General** has **Grace Period (days)**, default 7. The built-in trial defaults to 14 days, with reminder emails at 7, 3 and 1 days.

## What to do

To restore a blocked site, restore or extend the subscription. On the subscription detail, the admin actions **Change Plan** and **Extend Period** are available. Steps are in [Managing subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions).

Do not promise: manual or offline payments recorded by the customer are not available yet.

## Limits and versions

- Blocking needs Base 1.1.12 or newer and WaaS 1.1.21 or newer. With an older Base, WaaS runs but does not block suspended sites.
- While a site is suspended, the customer cannot log in to the tenant. The WaaS dashboard on the main site stays open so they can renew.
- Renewal checks are scheduled jobs and need a working cron. See [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron).

## Related

- [A customer site says "temporarily unavailable"](/kb/troubleshooting/site-shows-temporarily-unavailable)
- [Statuses](/kb/reference/statuses)
- [Glossary: selling and billing](/kb/glossary/selling-and-billing)
