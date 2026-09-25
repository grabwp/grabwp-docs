---
title: "Database & Content Isolation"
description: "Choose a database type and isolation options per tenant"
order: 12
section: pro
---

# Database & Content Isolation

Set defaults for new tenants under **Pro Settings**, then adjust a single tenant on **Add New** or **Edit**.

## Set defaults

**Navigate to Tenancy → Pro Settings** (`page=grabwp-tenancy-pro-settings`).

### Isolation

![Pro Settings, Isolation](../images/grabwp-tenancy-pro-settings-isolation.png)

**Content Isolation Defaults** apply when you create a tenant.

| Field | Notes |
|-------|--------|
| Content + Themes Isolation | **Enable content and themes isolation by default for new tenants**. Own `wp-content` and themes directories. |
| Plugins Isolation | **Enable plugins isolation by default for new tenants**. Own plugins directory. |
| Uploads Isolation | **Enable uploads isolation by default for new tenants**. Own uploads directory. |

### Database

![Pro Settings, Database](../images/11-pro-settings-database.png)

**Database Defaults** sets **Database Type** for the next tenant:

| Option | Notes |
|--------|--------|
| Shared Database (with table prefixes) | Same MySQL database as the main site, unique table prefix. |
| Isolated MySQL Database | Separate MySQL database. Shows **Default MySQL Connection**. |
| Isolated SQLite Database | SQLite file for that tenant. The library is bundled with Pro. |

**Default MySQL Connection** (only for **Isolated MySQL Database**): **MySQL Host**, **MySQL Database**, **MySQL Username**. These values are pre-filled on **Add New Tenant**. The password is entered per tenant, not stored as a global default on this screen.

Click **Save Pro Settings**.

Directory paths for tenant files, including **SQLite Database Dir**, are on the **Directories** tab. See [Pro Settings](/grabwp-tenancy-pro/pro-settings).

## Set options for one tenant

**Navigate to Tenancy → Add New** (`page=grabwp-tenancy-create`) or open **Edit** for an existing tenant (`page=grabwp-tenancy-edit`).

![Edit Tenant, isolation and database](../images/grabwp-tenancy-pro-tenant-edit.png)

### Content Isolation Options

| Checkbox | When enabled |
|----------|----------------|
| Content + Themes Isolation | Own content directory and themes directory. Themes must be installed afterward (Extensions). |
| Plugins Isolation | Own plugins directory. Plugins must be installed afterward. |
| Uploads Isolation | Own uploads directory. |

Unchecked options use the main WordPress paths.

### Database Configuration

| Option | Notes |
|--------|--------|
| Shared Database (with table prefixes) | Shared MySQL, prefix isolation. |
| Isolated MySQL Database | Shows **MySQL Host**, **Database Name**, **Username**, **Password**, and **Test Connection**. On edit, leave **Password** blank to keep the current password. |
| Isolated SQLite Database | SQLite file. Help text: **Uses SQLite database file for lightweight, portable storage.** |

Click **Test Connection** before **Create Tenant** or **Update Tenant** when using isolated MySQL.

### Storage Driver

**Storage Driver** appears only after S3 is configured under **Pro Settings → Storage**.

| Option | Notes |
|--------|--------|
| Local Filesystem | Uploads stay on this server. |
| S3-Compatible Object Storage | New uploads go to the configured bucket. |

On an existing tenant, **Saving a different driver does NOT move existing files.** Click **Migrate uploads now** to copy files before you switch. Switching S3 to local without migrating breaks existing media.

**Verify:** On **All Tenants**, the **Database** badge matches the type you saved (**Shared MySQL**, **Isolated MySQL**, or **Isolated SQLite**), and **Isolation** shows the short labels you enabled (**WPC**, **Th**, **Plg**, **Up**).

Per-tenant copies of the global **Settings** checkboxes are on [Tenant Settings & Overrides](/grabwp-tenancy-pro/pro-tenant-settings).
