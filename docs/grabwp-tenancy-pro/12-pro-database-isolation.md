---
title: "Database & Content Isolation"
description: "Configure per-site database and content isolation"
order: 12
section: pro
---

# Database & Content Isolation

Pro lets you configure how each tenant site's data is isolated from others.

## Database Options

Go to **GrabWP Tenancy → Tenants → Edit** the site. The Pro fields appear in the edit form below the domain settings.

![Edit tenant — database type and isolation options](../images/grabwp-tenancy-pro-tenant-edit.png)

### Shared Database (Default)
All sites share one MySQL database with unique table prefixes — same as the free plugin. Simplest setup, lowest overhead.

### Isolated MySQL Database
Each site connects to its own MySQL database. Complete database-level isolation.

To configure:
1. Open **Edit** for the site
2. Under **Database Type**, select **Isolated MySQL Database**
3. Enter the database credentials (host, name, user, password)
4. Save

### Isolated SQLite Database
Each site uses a SQLite file instead of MySQL.

To configure:
1. Open **Edit** for the site
2. Under **Database Type**, select **Isolated SQLite Database**
3. Save — a SQLite file is created automatically

## Content Isolation

Control what is isolated within each tenant site. In the **Edit** form for the site:

| Setting | What it controls |
|---------|-----------------|
| Content + Themes Isolation | Tenant gets its own wp-content and themes directories |
| Plugins Isolation | Tenant gets its own plugins directory |
| Uploads Isolation | Tenant gets its own uploads directory |

Toggle each setting per site as needed.

## Setting Defaults for New Sites

Go to **GrabWP Tenancy → Pro Settings** to set default isolation options. All newly created sites inherit these defaults — you can override them per site at any time.

Default directory and upload paths are configured on the same Pro Settings screen (see [Installing Pro](/grabwp-tenancy-pro/pro-installation)). Use the toggles below for default **content**, **plugins**, and **uploads** isolation for new sites:

![Pro Settings — default content and plugins isolation](../images/grabwp-tenancy-pro-settings-isolation.png)
