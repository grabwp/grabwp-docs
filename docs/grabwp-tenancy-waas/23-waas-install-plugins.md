---
title: "Install Plugins"
description: "Install GrabWP Tenancy, Pro, and WaaS, then activate the Pro license"
order: 23
section: waas
---

# Install Plugins

GrabWP WaaS needs three plugins, activated in order. Each one depends on the plugin before it.

## Installation Order

```
1. GrabWP Tenancy (base)  ← must be active first
2. GrabWP Tenancy Pro     ← requires base
3. GrabWP Tenancy WaaS    ← requires base + pro
```

## Step 1: Install GrabWP Tenancy (Base)

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload `grabwp-tenancy.zip`
3. Click **Install Now**, then **Activate**
4. A **Tenancy** menu appears, with **All Tenants**, **Add New**, **Settings**, and **Status**

## Step 2: Install GrabWP Tenancy Pro

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload `grabwp-tenancy-pro.zip`
3. Click **Install Now**, then **Activate**
4. **Tenancy** gains **License** and **Pro Settings**

> **Note:** If activation fails with a dependency error, activate GrabWP Tenancy (base) first.

## Step 3: Activate the Pro License

Navigate to **Tenancy → License** (`/wp-admin/admin.php?page=grabwp-tenancy-license`).

![GrabWP Tenancy Pro License](../images/10-license.png)

1. Paste the **License key**
2. Click **Activate License**

The screen title is **GrabWP Tenancy Pro License**. Activate the license before you download add-ons. The download request sends that license, and the key is not shown on the Add-ons page.

## Step 4: Install GrabWP Tenancy WaaS

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload `grabwp-tenancy-waas.zip`
3. Click **Install Now**, then **Activate**
4. A **Waas** menu appears with:
   - **Dashboard**
   - **Subscriptions**
   - **Domains**
   - **Templates**
   - **Settings**

## Verify Installation

Go to **Tenancy → Status** (`/wp-admin/admin.php?page=grabwp-tenancy-status`).

![Tenancy Status](../images/grabwp-status.png)

Fix anything the status screen reports before you continue.

Your active plugins should include:

| Plugin | Status |
|--------|--------|
| GrabWP Tenancy | Active |
| GrabWP Tenancy Pro | Active |
| GrabWP Tenancy WaaS | Active |

## Install Billing Add-ons

**Polar.sh** is built into WaaS. **Stripe**, **Sepay**, and **Xendit** are separate plugins.

Navigate to **Waas → Settings → Add-ons** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=addons`).

![WaaS Add-ons tab](../images/waas-addons.png)

The catalog is grouped by category. **Billing Providers** also has a **Browse Add-ons** link that opens this tab.

1. Find the add-on card (for example **GrabWP Tenancy Stripe**)
2. Click **Download ZIP**
3. Install that ZIP with **Plugins → Add New → Upload Plugin**, then **Activate**

The page states: **After downloading, install via Plugins → Add New → Upload Plugin.**

| Badge | Meaning |
|-------|---------|
| **Available** | Compatible and ready to download |
| **Installed** | Present, not activated |
| **Active** | Installed and running |
| **Update Available** | A newer compatible version is available |
| **Requires WaaS Update** | This WaaS version is older than the add-on requires |

> **Note:** **Download ZIP** is shown for **Available** and **Update Available**. The download request uses the Pro license on the server. The license key is not printed in the page HTML.

WooCommerce is not an add-on. Install the WooCommerce plugin yourself if you want that provider. It is registered only while WooCommerce is active.

---

**Next:** [Configure Pro Settings](/grabwp-tenancy-waas/waas-configure-pro-settings)
