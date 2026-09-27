---
title: "Installing Pro"
description: "Install GrabWP Tenancy Pro and activate the license"
order: 11
section: pro
---

# Installing Pro

## Before you start

> **Required:** Install and activate the free **GrabWP Tenancy** plugin first. Pro does not run without it.

→ [Install the free plugin](/grabwp-tenancy/installation-guide)

## Download the ZIP

After purchase, Polar emails a **Customer Portal** link. Open it and download the Pro plugin ZIP.

If the email is missing, search for "Polar" or "GrabWP", including spam.

## Install

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload the ZIP, click **Install Now**, then **Activate Plugin**

## Activate the license

**Navigate to Tenancy → License** (`page=grabwp-tenancy-license`).

![GrabWP Tenancy Pro License](../images/10-license.png)

On a new install the screen says **Activate your license to unlock Pro features.**

1. Copy the key from the [Customer Portal](https://polar.sh/grabwp/portal). Keys begin with `GRABWPPRO-`.
2. Paste it into **License key**.
3. Click **Activate License**.

The button sends this site's domain and the license key to GrabWP / Polar for activation.

A licensed site shows **Customer**, **Email**, **License key** (masked), **Status**, and **Expires** (**No Expiry** when the key does not expire). **Revoke license** removes the activation from this site.

→ [License](/grabwp-tenancy-pro/pro-license)

## Confirm Pro is active

**Navigate to Tenancy → Status** (`page=grabwp-tenancy-status&tab=pro`).

![Status, Pro Plugin tab](../images/09-status-pro.png)

**Pro Plugin Information** should show **Status** as **Active** and the **Pro Version**.

The **Tenancy** menu then includes **License** and **Pro Settings**.

## What changes on the tenant list

**Navigate to Tenancy → All Tenants** (`page=grabwp-tenancy`).

![Tenant list with Pro columns and actions](../images/grabwp-tenancy-pro-tenant-list.png)

Extra columns: **Database**, **Storage**, **Isolation**.

Extra row actions (hover labels), before the trash icon:

| Label | Screen |
|-------|--------|
| Plugins & Themes | Extensions |
| Fix URLs | Fix URLs |
| Clone Tenant | Clone |
| Backup Tenant | Backup |
| Restore Tenant | Restore |

The **Main Site** row gains **Clone to Tenant**.

Opening a tenant (the **Settings** icon, title **Edit Tenant**) adds tabs: **Edit**, **Extensions**, **Clone**, **Fix URLs**, **Backup**, **Restore**, **Settings**, **Overrides**, **Homepage**, **WP Admin**.

**Create Tenant** and **Edit Tenant** gain **Content Isolation Options**, **Database Configuration**, and **Storage Driver** when S3 storage is configured.

**Navigate to Tenancy → Pro Settings** (`page=grabwp-tenancy-pro-settings`) for defaults. See [Pro Settings](/grabwp-tenancy-pro/pro-settings).

## Deactivating Pro

Deactivating Pro removes the Pro screens and Pro behavior. Tenant data is not deleted. Sites fall back to the free plugin (shared tables and isolated uploads).

**Verify:** **Tenancy → Status → Pro Plugin** shows **Active**, and a tenant row shows **Plugins & Themes**.
