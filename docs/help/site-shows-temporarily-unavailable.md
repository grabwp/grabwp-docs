---
title: 'A customer site says "temporarily unavailable"'
description: "Why a site displays the temporarily unavailable page (HTTP 503) and how to restore access."
sidebar_label: 'Site says "temporarily unavailable"'
tags: [troubleshooting, subscriptions, plan-base, plan-waas, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, WaaS 1.1.24"
last_verified_date: "2026-10-30"
---

**Short answer:** when a subscription is suspended, expired, or past its cancellation grace period, GrabWP WaaS replaces the site with a 503 unavailable page. A site owner can renew from the customer dashboard on the main platform site, or an operator can restore the site under **Waas > Subscriptions**.
**Needs:** Pro + WaaS

## Symptom

Visiting a customer site (either the front end or the site's own `wp-admin`) returns an HTTP 503 page with the default heading:

- `{tenant_domain} is temporarily unavailable`

Depending on why the site was paused, the page may also display:

- `This site has been suspended by the service provider.`

## Cause

When a subscription enters a blocked state, GrabWP WaaS writes a suspension flag file at `wp-content/grabwp-tenancy/suspended/{tenant_id}.php`. Blocking a suspended site requires GrabWP Tenancy Base 1.1.12 or newer and GrabWP Tenancy WaaS 1.1.21 or newer.

| Suspension reason in the flag file | What caused it |
|---|---|
| `unpaid` | A paid subscription expired without renewal payment. |
| `trial_ended` | A built-in free trial ended without the customer upgrading to a paid plan. |
| `cancelled` | A cancelled subscription passed the **Grace Period (days)** setting (default 7 days), or was cancelled immediately. |
| `admin` | A platform administrator manually suspended the subscription in wp-admin. |

While the site is suspended, the site owner cannot log in to the site's own `wp-admin` dashboard to edit pages or export data, because all requests to the site address serve the unavailable page. However, the WaaS customer dashboard on the main platform site remains accessible so the customer can pay, renew, or purchase services.

## Check

### For site owners

1. Log in to the customer dashboard on the main platform site (for example, `/dashboard/`).
2. Check the status badge next to your site (**Suspended**, **Expired**, **Cancelled**, or **Trial**).
3. If an invoice is open, review the payment link.

### For platform operators

1. In the main site admin, go to **Waas > Subscriptions** and click the subscription to open **Subscription: `{tenant_id}`**.

![Subscription Detail](../images/waas-subscription-detail.png)

2. Check the **Status**, **Period End**, and **Built-in trial** rows under **Details**.
3. Scroll to the **History** table to see the recorded events and actors.
4. Check **Waas > Settings > Activity Log** to review events such as `subscription_expired` or `subscription_suspended_after_grace`.

## Fix

### For site owners

1. Log in to your customer dashboard on the main platform website (not your individual site `/wp-admin`).
2. Pay the open renewal invoice or upgrade your expired trial plan.
3. Once payment confirms, GrabWP removes the suspension flag file automatically and your site comes back online.

### For platform operators

1. In the main site admin, go to **Waas > Subscriptions** and open the subscription.
2. In the **Admin Actions** box on the right, select an action under **Action**:
   - **Reactivate** to lift a suspension immediately.
   - **Extend Period** (and enter the number of **Days**) to grant extra time on an expired subscription.
   - **Extend trial (add days)** or **Convert manually (paid offline, days)** if the subscription is on a built-in trial.
   - **Change Plan** to switch the site to another active plan.
3. Enter a note in **Reason (required)** and click **Apply**.
4. You will see `Action completed successfully.`, and the suspension flag file is deleted so the site opens normally.

To customize the text and HTML shown on the 503 page, go to **Waas > Settings > Email** and edit the **Suspended site page** template.

## Still stuck

If the subscription status shows **Active** under **Waas > Subscriptions** but the site still returns the unavailable page:

1. Check whether `wp-content/grabwp-tenancy/suspended/{tenant_id}.php` is writable so WaaS can remove it.
2. Confirm the hostname resolves to this server and the site exists under **Tenancy > All Tenants**.
3. Follow [What to send when you ask for help](/help/getting-help).

## Related

- [Free trials and subscriptions](/sell-sites/trials-and-subscriptions)
- [Statuses](/sell-sites/statuses)
- [Emails](/sell-sites/emails)
- [What to send when you ask for help](/help/getting-help)
