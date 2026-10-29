---
title: "Pro settings"
description: "Every setting on Tenancy > Pro Settings in GrabWP Tenancy Pro, with its exact label, tab, default and notes."
sidebar_label: "Pro settings"
sidebar_position: 3
tags: [reference, settings, isolation, database, backup, routing, plan-pro, for-operator, for-cs]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** this page lists every setting on **Tenancy > Pro Settings**, stored in `{pro_base}/config.php` (default `wp-content/grabwp-tenancy-pro/config.php`). Defaults under **Isolation** and **Database** apply to new tenants created from that point on and do not change existing tenants.

| Label in wp-admin | Tab | Default | What it does | Notes |
|---|---|---|---|---|
| **Level of isolation for new sites** | **Isolation** | **Simple** | Sets which plugins, themes and uploads new tenants get: **Shared**, **Simple**, **Advanced** or **Custom**. | **Shared**: shared plugins, themes and uploads. **Simple**: own uploads, shared plugins and themes. **Advanced**: own plugins, themes and uploads. **Custom**: pick each option below. |
| **Give each new site its own themes** | **Isolation** (under **Custom**) | Off (`false`) | `Each new site gets its own wp-content folder with its own themes.` | Turning this on also isolates the tenant `wp-content` folder and shows `Isolated sites start without themes. Install one under Tenants > Plugins & Themes after creating the site.` |
| **Give each new site its own plugins** | **Isolation** (under **Custom**) | Off (`false`) | `Each new site installs and updates its own plugins.` | Stored as `content_isolation.isolate_plugins`. |
| **Give each new site its own uploads folder** | **Isolation** (under **Custom**) | On (`true`) | `Each new site keeps its images and files in its own folder.` | Stored as `content_isolation.isolate_uploads`. |
| **Database Type** | **Database** | **Isolated SQLite Database** (`sqlite_isolated`) if `pdo_sqlite` is loaded; otherwise **Shared Database (with table prefixes)** (`shared`) | Sets the pre-selected database type for new tenants: **Shared Database (with table prefixes)**, **Isolated MySQL Database** or **Isolated SQLite Database**. | Existing tenants keep their current database type. |
| **MySQL Host** | **Database** (under **Default MySQL Connection**) | Empty (`''`) | `Default MySQL server hostname (e.g., localhost, localhost:3306)` | Shown when **Isolated MySQL Database** is selected; pre-fills the tenant create form. |
| **MySQL Database** | **Database** (under **Default MySQL Connection**) | Empty (`''`) | `Default MySQL database name` | Shown when **Isolated MySQL Database** is selected. |
| **MySQL Username** | **Database** (under **Default MySQL Connection**) | Empty (`''`) | `Default MySQL username for database access` | Shown when **Isolated MySQL Database** is selected. |
| **Tenant Base Dir** | **Directories** | Empty (effective `wp-content/grabwp-tenancy`) | Overrides the directory where tenant content and `tenants.php` live. | Disabled in wp-admin if `GRABWP_TENANCY_DIRS_FROM_WPCONFIG` is defined. |
| **Pro Config Dir** | **Directories** | Empty (effective `wp-content/grabwp-tenancy-pro`) | Overrides the directory where Pro `config.php` and per-tenant config files live. | Disabled in wp-admin if `GRABWP_TENANCY_DIRS_FROM_WPCONFIG` is defined. |
| **SQLite Database Dir** | **Directories** | Empty (effective `wp-content/grabwp-tenancy-sqlite`) | Overrides the directory where isolated SQLite database files live. | Disabled in wp-admin if `GRABWP_TENANCY_DIRS_FROM_WPCONFIG` is defined. |
| **Enable Domain Symlink** (**Enable clean /wp-content/ URLs via domain symlinks**) | **Symlink** | Off (`false`) | Rewrites tenant asset URLs from `/wp-content/uploads/grabwp-tenancy/{tenant-id}/` to `/wp-content/`. | Requires PHP `symlink()` and web server rules (**Required server rules**). |
| **Domains Directory** | **Symlink** | Empty (uses default domains directory) | `Absolute path where domain symlinks are created.` | Maintenance buttons on this tab: **Fix All Tenant Broken Symlinks** and **Sync All Tenant Domain Symlinks**. |
| **Default Storage Driver** | **Storage** | **Local Filesystem (default)** (`local`) | Chooses **Local Filesystem (default)** (`local`) or **S3-Compatible Object Storage** (`s3`) for tenant uploads. | Bulk actions when S3 is configured: **Migrate All Tenants to S3** and **Migrate All Tenants to Local**. |
| **S3 Endpoint URL** | **Storage** (under **S3 storage credentials**) | Empty (`''`) | `Full endpoint URL for your S3-compatible provider.` | Shown when **S3-Compatible Object Storage** is selected. |
| **Bucket Name** | **Storage** (under **S3 storage credentials**) | Empty (`''`) | Bucket name for tenant uploads. | Placeholder `grabwp-uploads`. |
| **Region** | **Storage** (under **S3 storage credentials**) | `auto` | `Use "auto" for Cloudflare R2. Examples: us-east-1, eu-west-1.` | Stored as `storage.region`. |
| **Path-Style Endpoint** (**Enable path-style endpoint (required for MinIO)**) | **Storage** (under **S3 storage credentials**) | Off (`false`) | Uses path-style S3 URLs instead of virtual-hosted style. | Stored as `storage.use_path_style`. |
| **Access Key ID** | **Storage** (under **S3 storage credentials**) | Empty (`''`) | S3 access key ID. | Stored as `storage.access_key`. |
| **Secret Access Key** | **Storage** (under **S3 storage credentials**) | Empty (`''`) | S3 secret access key (encrypted on save). | Leave blank when saving to keep the existing secret key; test with **Test Connection**. |
| **CDN URL (optional)** | **Storage** (under **S3 storage credentials**) | Empty (`''`) | `Public URL prefix for serving files. If empty, pre-signed URLs are used.` | Stored as `storage.cdn_url`. |
| **Offload Driver** | **Backup** (under **Backup Offload**) | **Disabled** (`''`) | Chooses where backups are offloaded: **Disabled**, **Use Platform S3 Storage** (`current_s3`) or **Custom S3 Endpoint** (`custom_s3`). | **Google Drive (Coming Soon)** and **FTP / SFTP (Coming Soon)** are shown disabled under **Coming soon drivers**. |
| **Auto Offload** (**Automatically offload backups to remote storage after creation**) | **Backup** | Off (`false`) | Uploads each completed tenant backup to the configured offload driver automatically. | Stored in offload config (`auto_offload`). |
| **Delete Local Copy** (**Delete local backup file after successful offload**) | **Backup** | Off (`false`) | Removes the local ZIP file once remote offload succeeds. | Stored in offload config (`delete_local`). |
| **Backup Prefix** | **Backup** (under **Offload storage credentials**) | `grabwp-backups` | `S3 key prefix (folder path) for backup archives.` | Custom S3 also has **S3 Endpoint URL**, **Bucket Name**, **Region** (`auto`), **Access Key ID**, **Secret Access Key**, **Path-Style Endpoint** and **Test Connection**. |
| **Auto Backup** | **Backup** | **Disabled** (`disabled`) | Global switch (**Enabled** / **Disabled**) for scheduled tenant backups. | Uses cron hook `grabwp_tenancy_pro_auto_backup`. |
| **Default Schedule** | **Backup** (under **Schedule and retention**) | `manual` | Recurrence interval for scheduled backups (`manual`, `daily`, `weekly`, `fortnightly`, `monthly`). | Turning **Auto Backup** on while schedule is `manual` saves `weekly` so backups run. |
| **Backups to Keep** | **Backup** (under **Schedule and retention**) | `7` | `Older backups beyond this count are pruned after each successful run (local and remote).` | Range `1` to `30`. |
| **CDN** | **CDN** | **Disable** (`false`) | **Enable** or **Disable** under **CDN for core, plugin and theme files**. | Rewrites core, plugin and theme static assets on tenant front ends; never rewrites uploads. |
| **CDN hostname** | **CDN** | Empty (`''`) | Pull-zone hostname whose origin is the main site (placeholder `cdn.example.com`). | Stored as `cdn.host`. |

## Rules that change a value

- **PHP `pdo_sqlite` check:** `GrabWP_Tenancy_Pro_Config` sets `database.database_type` to `sqlite_isolated` by default, but if the PHP `pdo_sqlite` extension is not loaded, it falls back to `shared` (**Shared Database (with table prefixes)**).
- **Upgraded installs vs new installs:** Pro 1.1.16 switched new installs to **Isolated SQLite Database** and enabled **Path Alias Routing** by default while keeping existing installs on their previously saved defaults.
- **Directory constants in `wp-config.php`:** if `GRABWP_TENANCY_DIRS_FROM_WPCONFIG` is set (because directory constants were defined in `wp-config.php` before `load.php`), the **Tenant Base Dir**, **Pro Config Dir** and **SQLite Database Dir** inputs on the **Directories** tab are disabled and display `set in wp-config.php`.
- **Routing tab redirect:** when Base 1.1.13 or newer is active, the **Routing** tab on **Tenancy > Pro Settings** is hidden and `#tab-routing` redirects to **Tenancy > Settings > Routing**.

## Changed in recent versions

| Version | Change |
|---|---|
| Pro 1.1.17 | Added **Level of isolation for new sites** (**Shared**, **Simple**, **Advanced**, **Custom**) on **Tenancy > Pro Settings > Isolation**, and updated per-tenant **Overrides** choices. |
| Pro 1.1.16 | Changed new-install defaults to **Isolated SQLite Database** and **Path Alias Routing** enabled; moved routing fields to **Tenancy > Settings > Routing** when Base supports routing modes. |
| Pro 1.1.13 | Added the **CDN** tab (**CDN** and **CDN hostname**). |
| Pro 1.1.5 | Added **Auto Backup**, **Default Schedule**, **Backups to Keep** and **Schedule Assurance** on the **Backup** tab. |

## Related

- [Base settings](/kb/reference/base-settings)
- [Isolation levels](/kb/concepts/isolation-levels)
- [Database options](/kb/concepts/database-options)
- [Pro settings guide](/grabwp-tenancy-pro/pro-settings)
