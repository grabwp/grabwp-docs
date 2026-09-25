---
title: "Managing Subscriptions"
description: "Search the subscription list, open a tenant, and extend, change, suspend, or assign services"
order: 32
section: waas
---

# Managing Subscriptions

Each tenant has one subscription row: plan, status, billing provider, and renewal date. Admins change that row from **Subscriptions**. Customers cancel or keep a subscription from their own dashboard.

**Navigate to Waas → Subscriptions** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-subscriptions`).

![Subscriptions list](../images/waas-subscriptions.png)

## List

| Column | Notes |
|--------|-------|
| **Tenant** | Tenant ID. Opens the detail screen. |
| **Owner** | WordPress user. Opens the user profile. |
| **Plan** | Plan ID, capitalized |
| **Status** | Badge from the stored status: **Active**, **Pending**, **Trial**, **Warning**, **Suspended**, **Cancelled**. **Warning** also shows **Expired N days ago**. |
| **Provider** | Billing provider name |
| **Created** | Date. Sortable. Default sort is newest first. |
| **Renewal** | `current_period_end` date. Empty when the row has no period end. |
| **Actions** | **Edit** (detail), **View Tenant** (tenant editor, new tab). **Reactivate** appears when status is **Suspended** or **Cancelled**. |

**Plan** and **Status** are sortable. The search box placeholder is **Search subscriptions…**. Click **Search**. The list is 10 rows per page.

## Statuses

The list prints the stored status. The detail screen uses a badge that can differ when a date or a scheduled cancel applies.

| Stored status | Detail badge | Meaning |
|---------------|--------------|---------|
| `pending` | **Pending** | Signup started. Site may not be ready. |
| `active` | **Active** | Paid or free access is current. |
| `active`, renewal within 7 days | **Expiring Soon** | Still active. Detail badge only. Free plans stay **Active**. |
| `active` and cancel at period end | **Cancelling** | Access continues until **Period End**. |
| `trial` | **Trial** | Trial access. |
| `warning` | **Grace Period** | Period end has passed. The site is still in the grace window. |
| `suspended` | **Suspended** | Grace window is over, or an admin suspended the row. |
| `cancelled` | **Cancelled** | Subscription is cancelled. |

## Open a subscription

Click the tenant ID or the pencil icon (**Edit**).

The detail screen is `page=grabwp-tenancy-waas-subscription-detail&tenant_id=<id>`.

![Subscription detail](../images/waas-subscription-detail.png)

### Details

| Field | Notes |
|-------|-------|
| **Status** | Badge from the table above |
| **Plan** | Plan name |
| **Provider** | Provider display name |
| **Billing Cycle** | **Monthly** or **Yearly** |
| **Period End** | Date, then the number of days, **Today**, or **Expired** |
| **Created** | Timestamp |
| **Provider Subscription ID** | Shown when the provider stored an ID |
| **Cancellation** | **Scheduled at period end** when cancel is queued |

**Quick Links:** **Back to Subscriptions**, and **Edit Tenant** when Tenancy is active.

## Admin Actions

The sidebar form is **Admin Actions**. Choose an action, fill the fields that appear, and click **Apply**. **Apply** stays disabled until an action is selected. Every action except **Add Note** requires **Reason (required)**.

| Action | Fields |
|--------|--------|
| **Extend Period** | **Days** (1-365, default 30) and **Reason (required)** |
| **Change Plan** | **Plan** (active plans) and **Reason (required)** |
| **Grant Complimentary** | **Days**, **Plan**, and **Reason (required)** |
| **Suspend** | **Reason (required)** |
| **Reactivate** | **Reason (required)** |
| **Add Note** | **Note** only. No reason field. |

> **Note:** **Change Plan** updates the WaaS subscription immediately. Update the matching subscription in the billing provider separately when the provider still bills the old plan.

A successful save shows **Action completed successfully.**

## Active Services

**Active Services** lists add-on services on this tenant. Manage the catalog under [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits).

| Column | Notes |
|--------|-------|
| **Service** | Service name |
| **Charge Type** | Stored type: `one_time`, `recurring`, or `non_recurring` |
| **Qty** | Quantity |
| **Unit Price** | Price in the WaaS currency |
| **Status** | Item status, capitalized |
| **Purchased At** | Created timestamp |
| **Actions** | **Remove** while the item is active. Confirm: **Remove this service?** |

To attach a service: choose **Select a service to assign...**, set **Qty:** (minimum 1), and click **Assign Service**.

If the tenant has none, the box says **No active services.**

## History

**History** records admin actions. Empty state: **No admin actions recorded yet.**

| Column | Notes |
|--------|-------|
| **Date** | `Y-m-d H:i` |
| **Action** | Action name with underscores turned into words |
| **Admin** | Display name, or the user ID |
| **Details** | Value stored after the change |
| **Reason** | Text you entered |

## Grace period

**Navigate to Waas → Settings**, **General** tab (`page=grabwp-tenancy-waas-settings&tab=general`). Open **Retention and grace period**.

| Field | Notes |
|-------|-------|
| **Grace Period (days)** | 0-90. Help text: days before the tenant is suspended after cancellation. **0** means immediate. Default when unset is 7. |

A daily job does three things:

1. Sends a renewal reminder when an **Active** period ends within 3 days.
2. Moves **Active** rows past **Period End** to `warning` (**Grace Period** on the detail screen) and can email a grace warning.
3. Moves `warning` rows that are still past period end after the grace days to **Suspended**, and can email a suspension notice.

The job does not cancel a suspended row on its own.

## Customer actions

On the tenant dashboard, **Subscription Actions** can include:

- **Cancel Subscription**. The dialog title is **Cancel Subscription**. The customer picks a reason, clicks **Continue**, then **Confirm Cancellation**. Default copy says access lasts until the next renewal date. **Cancel immediately (lose access now)** ends access now. **Keep Subscription** closes the dialog.
- **Keep Subscription Active** when a cancel is already scheduled. Confirm: **Keep subscription**.
- Upgrade choices when a higher plan is available.

Some providers tell the customer to use the provider portal instead of these buttons.

**Verify:** After **Apply**, the detail badge and **History** row match the action, and the list **Status** or **Renewal** column matches.

---

**Next:** [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage)
