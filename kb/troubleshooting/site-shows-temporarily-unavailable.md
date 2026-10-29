---
title: 'A customer site says "temporarily unavailable"'
description: "Why a tenant site displays the temporarily unavailable page (HTTP 503) and how to restore access."
sidebar_label: 'Site says "temporarily unavailable"'
sidebar_position: 7
tags: [troubleshooting, subscriptions, plan-base, plan-waas, for-customer, for-operator, for-cs]
last_verified_version: "Base 1.1.14, WaaS 1.1.24"
last_verified_date: "2026-10-29"
---

**Short answer:** when a subscription is suspended, expired or past its cancellation grace period, GrabWP WaaS replaces the tenant site with a 503 unavailable page. A site owner can renew from the customer dashboard on the main site, or an operator can restore the site under **Waas > Subscriptions**.

## Symptom

Visiting the tenant site (either the front end or the tenant's own `wp-admin`) returns an HTTP 503 page with the default heading:

- `{tenant_domain} is temporarily unavailable`

Depending on how the site was suspended, the page may also display:

- `This site has been suspended by the service provider.`

## Cause

When a subscription enters a blocked state, GrabWP WaaS writes a suspension flag file at `wp-content/grabwp-tenancy/suspended/{tenant_id}.php`. Blocking a suspended site requires GrabWP Tenancy Base 1.1.12 or newer and GrabWP Tenancy WaaS 1.1.21 or newer.

| Suspension reason in the flag file | What caused it |
|---|---|
| `unpaid` | A paid subscription expired without renewal payment. |
| `trial_ended` | A built-in free trial ended without the customer upgrading to a paid subscription. |
| `cancelled` | A cancelled subscription passed the **Grace Period (days)** setting (default 7 days), or was cancelled immediately. |
| `admin` | A platform administrator manually suspended the subscription in wp-admin. |

While the site is suspended, the customer cannot log in to the tenant's own `wp-admin` dashboard to edit pages or export data, because all requests to the tenant hostname or path serve the unavailable page. However, the WaaS customer dashboard on the main platform site remains open so the customer can pay, renew or purchase extra services.

## Check

1. If you are a site owner, log in to the customer dashboard on the main platform site and check the status badge next to your site (**Suspended**, **Expired**, **Cancelled** or **Trial**).
2. If you are the platform operator, go to **Waas > Subscriptions** in the main site admin and click the tenant's subscription to open **Subscription: `{tenant_id}`**.
3. Check the **Status**, **Period End** and **Built-in trial** rows under **Details**, and scroll to **History** to see the recorded action and reason.

## Fix

### For site owners

1. Log in to the customer dashboard on the main platform website (not your tenant site's `/wp-admin`).
2. Pay the open renewal invoice or upgrade your expired trial plan.
3. Once payment is confirmed, GrabWP removes the suspension flag file automatically and your site comes back online.

### For platform operators

1. In the main site admin, go to **Waas > Subscriptions** and open the tenant's subscription.
2. In the **Admin Actions** box on the right, choose the appropriate action under **Action**:
   - **Reactivate** to lift a suspension right away.
   - **Extend Period** (and enter the number of **Days**) to grant more time on an expired subscription.
   - **Extend trial (add days)** or **Convert manually (paid offline, days)** if the subscription is on a built-in trial.
   - **Change Plan** to move the tenant to another active plan.
3. Enter a note in **Reason (required)** and click **Apply**.
4. You will see `Action completed successfully.`, and the suspension flag file is removed so the tenant site opens again.

To customize the HTML shown on the 503 page, go to **Waas > Settings > Email** and edit the **Suspended site page** template. For more details, see [Subscription lifecycle](/kb/concepts/subscription-lifecycle) and [Managing subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions).

## Still stuck

If the subscription status is **Active** in **Waas > Subscriptions** but the tenant still shows the unavailable page, check whether `wp-content/grabwp-tenancy/suspended/{tenant_id}.php` is writable so WaaS can delete it, then follow [What to send when you ask for help](/kb/start-here/getting-help).
