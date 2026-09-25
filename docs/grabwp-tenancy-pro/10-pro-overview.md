---
title: "Pro Overview"
description: "What GrabWP Tenancy Pro adds to the free plugin"
order: 10
section: pro
---

# GrabWP Tenancy Pro

Pro extends the free plugin so each tenant can have its own database, plugins, themes, uploads, backups, and domain symlink. The free plugin must be installed and active first.

## What Pro adds

### Dedicated database per site

New tenants can use a **Shared Database (with table prefixes)**, an **Isolated MySQL Database**, or an **Isolated SQLite Database**. SQLite ships inside Pro. You do not install a separate SQLite plugin.

→ [Database & Content Isolation](/grabwp-tenancy-pro/pro-database-isolation)

### Content, plugins, and uploads isolation

**Content + Themes Isolation**, **Plugins Isolation**, and **Uploads Isolation** give a tenant its own directories. Defaults for new tenants are set under **Pro Settings**.

### Per-site plugins and themes

The **Extensions** screen installs, removes, activates, and deactivates plugins and themes for one tenant, as a symlink or as an own copy.

→ [Per-Site Plugins & Themes](/grabwp-tenancy-pro/pro-extensions)

### Backup and restore

Back up one tenant (database, isolated content, Pro config, and uploads) and restore it later. You can schedule backups and offload archives to S3-compatible storage.

→ [Backup & Restore](/grabwp-tenancy-pro/pro-backup-restore)

### Tenant cloning

Copy a tenant, or the **Main Site**, into an existing tenant or into a new one.

→ [Tenant Cloning](/grabwp-tenancy-pro/pro-tenant-cloning)

### Fix URLs

Replace an old site URL in one tenant's database after a domain change or a clone.

→ [Fix URLs](/grabwp-tenancy-pro/pro-fix-urls)

### Domain symlink and storage

**Pro Settings** includes domain symlinks for clean `/wp-content/` URLs, S3-compatible upload storage, and backup offload.

→ [Pro Settings](/grabwp-tenancy-pro/pro-settings)

### License

Activate, review, or revoke the license on **Tenancy → License**.

→ [License](/grabwp-tenancy-pro/pro-license)

## Requirements

- **GrabWP Tenancy** (free) installed and active
- WordPress 5.0 or later (tested up to 7.1)
- PHP 7.4 or later

## Free vs Pro

| Feature | Free | Pro |
|---------|:----:|:---:|
| Multiple sites from one install | ✓ | ✓ |
| Custom domain per site | ✓ | ✓ |
| Isolated uploads per site | ✓ | ✓ |
| Shared MySQL database | ✓ | ✓ |
| Admin access from the tenant list | ✓ | ✓ |
| Dedicated database per site (MySQL or SQLite) | - | ✓ |
| Per-site plugins and themes | - | ✓ |
| Content, plugins, and uploads isolation | - | ✓ |
| Backup and restore per site | - | ✓ |
| Scheduled backups | - | ✓ |
| Tenant cloning | - | ✓ |
| Fix URLs | - | ✓ |
| S3-compatible storage and backup offload | - | ✓ |
| Domain symlink | - | ✓ |

## Get Pro

After purchase, Polar sends a confirmation email with a **Customer Portal** link. Download the Pro ZIP from that portal, then [install Pro](/grabwp-tenancy-pro/pro-installation).

The license screen also links to the [Customer Portal](https://polar.sh/grabwp/portal) and to [grabwp.com](https://grabwp.com/).
