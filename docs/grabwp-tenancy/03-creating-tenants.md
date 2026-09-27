---
title: "Managing Tenant Sites"
description: "Create, edit, and delete tenant sites"
order: 3
section: tenancy
---

# Managing Tenant Sites

Each tenant is a separate WordPress site on this installation. Give every tenant its own domain.

## Open the tenant list

**Navigate to Tenancy → All Tenants** (`page=grabwp-tenancy`).

![All Tenants](../images/grabwp-tenancy-pro-tenant-list.png)

The page title is **GrabWP Tenancy**. The intro line is **Manage your multi-tenant WordPress sites.**

| Column | Notes |
|--------|--------|
| Tenant ID | 6-character ID. The main install is the starred **Main Site** row. |
| Domains | Domains mapped to that tenant. **Path access only** means no domain is assigned yet. **No domains assigned** means the mapping is empty. |
| Actions | Icon links. Hover for the label. |

Pro adds **Database**, **Storage**, and **Isolation** columns. Isolation abbreviations: **WPC** (WP Content), **Th** (Themes), **Plg** (Plugins), **Up** (Uploads).

Search with **Search by ID or domain...** and **Search**.

### Row actions

| Label | What it does |
|-------|----------------|
| Visit Site | Opens the site front end. |
| Admin | Opens the tenant WordPress admin. The link includes a short-lived access token (30 minutes by default). |
| Settings | Opens **Edit Tenant**. |
| Delete | Trash icon. Asks you to type the tenant ID. |

The **Main Site** row only has **Visit Site**. Pro adds **Clone to Tenant** on that row.

With Pro active, tenant rows also include **Plugins & Themes**, **Fix URLs**, **Clone Tenant**, **Backup Tenant**, and **Restore Tenant**, inserted before the trash icon. Those screens are documented in the Pro section.

An empty list shows **No Tenants Found** and **Create Your First Tenant**.

## Create a tenant

**Navigate to Tenancy → Add New** (`page=grabwp-tenancy-create`), or click **Add New** on the list.

![Add New Tenant](../images/grabwp-tenancy-pro-tenant-add.png)

1. Under **Domain Setup**, keep **I have a domain** selected.
2. Enter the domain. Placeholder: **Enter domain (e.g. mysite.com)**. Use **Clear** or **Remove** on a row. Do not include `http://` or `www`.
3. Click **Create Tenant**.

**Cancel** returns to **All Tenants**.

> **Note:** **I'll set up a domain later** creates the tenant with no public domain. The list shows **Path access only**. The Edit screen has a **Path URL** and a **Copy** button you can use as a temporary preview until the domain is connected. Add the domain and complete [Domain & DNS Setup](/grabwp-tenancy/hosting-dns-setup) before visitors use the site.

Pro adds **Content Isolation Options**, **Database Configuration**, and **Storage Driver** (only after S3 is configured) to this form. See [Database & Content Isolation](/grabwp-tenancy-pro/pro-database-isolation).

**Verify:** The new ID appears on **All Tenants** with the domain you entered.

## Edit domains

Click **Settings** on the row, or open `page=grabwp-tenancy-edit` with that tenant.

![Edit Tenant](../images/grabwp-tenancy-pro-tenant-edit.png)

The title is **Edit Tenant:** plus the tenant ID. With Pro, tabs across the top are **Edit**, **Extensions**, **Clone**, **Fix URLs**, **Backup**, **Restore**, **Settings**, **Overrides** (when supported), **Homepage**, and **WP Admin**.

| Field | Notes |
|-------|--------|
| Tenant ID | Read-only. |
| Path URL | Temporary preview address, with **Copy**. Shown until a path alias replaces it. |
| Domains | One field per domain. **Remove** deletes a row. **Add New Domain** adds one. |

Domain help text: **Valid format: example.com, subdomain.example.com (no http:// or www)**.

Click **Update Tenant**. Success notice: **Tenant updated successfully.**

A site can answer on more than one domain (for example `www` and the apex). Add each one here, then point each domain at this WordPress directory in hosting and DNS.

> **Note:** Use the domain you added here for visitors. **Path URL** is only a preview before that domain is connected.

## Delete a tenant

> **Warning:** Deletion removes that tenant's database tables and uploads. This cannot be undone.

1. Click the trash icon on the row.
2. When prompted **To confirm deletion, type the tenant ID:**, enter the ID exactly.
3. A mismatch shows **Incorrect tenant ID. Deletion cancelled.**

**Verify:** After an edit, the **Domains** column matches what you saved. After a delete, the ID is gone from the list.
