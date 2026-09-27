---
title: "Create Plans"
description: "Edit seeded plans and set price, benefits, display, and payment IDs"
order: 26
section: waas
---

# Create Plans

Plans are what customers choose during signup. A new install seeds **Free**, **Basic**, and **Pro** when the plans table is empty. Edit those rows to match what you sell. The **free** plan cannot be deleted.

Navigate to **Waas → Settings → Plans** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=plans`).

![Plans list](../images/waas-plans-list.png)

The list columns are **Plan**, **ID**, **Monthly Price**, **Polar Products**, **Status**, **Order**, and **Actions**. Click **Add New** to create another plan. The pencil opens **Edit Plan**. The trash icon deletes a plan other than **free**.

## Plan Form Tabs

**Add Plan** and **Edit Plan** use four tabs:

| Tab | What you set |
|-----|----------------|
| **Name and price** | **Plan ID**, **Name**, **Monthly Price**, **Yearly Price** |
| **Benefits & Services** | Per-plan benefit values and which services can be purchased |
| **Display & Availability** | **Description**, **Features**, **Sort Order**, **Active** |
| **Payment Configuration** | Provider product or price IDs |

Click **Create Plan** on a new plan, or **Save Plan** when editing. **Cancel** returns to the list. Success notice: **Plan saved.**

## Name and price

![Plan name and price](../images/waas-plan-edit.png)

| Field | Notes |
|-------|-------|
| **Plan ID** | Lowercase letters, numbers, and hyphens. Example: `basic` or `pro`. Read-only after the plan is created. |
| **Name** | Label shown to customers |
| **Monthly Price** | Stored in the primary currency. `0` means that cycle is not charged. |
| **Yearly Price** | Same rules as monthly |

If a secondary currency is configured, a converted amount is shown next to the price for reference. Set currency in [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing).

**For this tutorial:**

1. Edit **Free**. Keep both prices at `0`.
2. Edit **Basic** or **Pro** and set the monthly and yearly prices you will charge.
3. Leave **Payment Configuration** empty until Polar.sh is enabled. Saving a paid plan after Polar is configured fills the product IDs.

## Benefits and services

Open **Benefits & Services**.

![Plan benefits and services](../images/05b-waas-plans-edit-benefits.png)

| Section | Notes |
|---------|-------|
| **Benefits** | Columns **Benefit**, **Type**, **Value**. Flags use an **Enabled** checkbox. Quotas take a number. Custom benefits use the editor. |
| **Available Services** | Check the services customers may buy on this plan. Leave all unchecked to allow every active service. |

If there are no services yet, the form links to **Create a service**. Define the catalog first in [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits), then return here to set values.

The help text under benefits: **Set per-plan benefit values. For flags, check to enable, for quotas, enter a number. For custom benefits, use the editor.**

## Display and availability

Open **Display & Availability**.

![Plan display and availability](../images/05b-waas-plans-edit-display.png)

| Field | Notes |
|-------|-------|
| **Description** | Shown with the plan |
| **Features** | One feature per line |
| **Sort Order** | Lower numbers appear first |
| **Active** | Checkbox label: **Plan is available for signup and upgrade** |

Inactive plans stay in the admin list with status **Inactive** and are not offered at signup.

## Payment configuration

Open **Payment Configuration** after a billing provider is enabled. You can save the plan once now, then return after [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing).

![Plan payment configuration](../images/05b-waas-plans-edit-payment.png)

Providers that need catalog IDs show a heading such as **Polar.sh Configuration** or **Stripe Configuration**, with **Resync**.

| Field | Notes |
|-------|-------|
| **Polar Monthly Product ID** | Leave blank to auto-create when Polar.sh is configured, or paste a product UUID |
| **Polar Yearly Product ID** | Same, for the yearly cycle |
| **Stripe Monthly Price ID** | Shown when the Stripe add-on is active. Same auto-create behavior. |
| **Stripe Yearly Price ID** | Same, for the yearly cycle |

Under each ID, **Find existing** searches the provider catalog. A filled auto-created value is badged **Auto-created**. A value you typed is badged **Manual**.

**WooCommerce Checkout** does not store a product ID on the plan. The note on the form: **WooCommerce checkouts now use the shared anchor product configured on the WaaS Settings screen. Plans no longer store dedicated WooCommerce product IDs.**

Xendit does not add product ID fields. The charged amount is calculated from the plan price.

## Restrict a Template to Plans

On a template, **Allowed Plans** can limit who sees it. See [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates).

## Verify

1. **Free** is **Active**, both prices are `0`, and it has no delete action
2. At least one paid plan is **Active** with a monthly or yearly price above `0`
3. **Sort Order** matches the order you want on the pricing page

---

**Next:** [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing)
