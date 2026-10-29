---
title: "Glossary: backup, clone and tools"
description: "Plain meaning of the terms about clone, backup, restore, storage, CDN and per-tenant tools."
sidebar_label: "Backup, clone and tools"
sidebar_position: 5
tags: [glossary, backup, plan-pro, for-operator]
last_verified_version: "Base 1.1.14, Pro 1.1.17"
last_verified_date: "2026-10-29"
---

**Short answer:** this page explains the words used for copying, saving and restoring tenant sites, and for the Pro tools on **Tenancy > Pro Settings**.

## Asset CDN

**Plain meaning:** serving tenant files from a CDN host you choose.
**Where you see it:** **Tenancy > Pro Settings > CDN**. It is off by default.
**Why it matters:** a wrong host breaks images and styles on tenant sites.
**More:** [Pro settings](/kb/reference/pro-settings)

## Auto backup

**Plain meaning:** scheduled backups of tenants.
**Where you see it:** **Tenancy > Pro Settings > Backup**. It is disabled by default. The schedule choices are manual, daily, weekly, fortnightly and monthly. The default keeps 7 backups, and you can keep 1 to 30.
**Why it matters:** it runs as a scheduled job, so it needs a working server cron job.
**More:** [Backup and restore](/grabwp-tenancy-pro/pro-backup-restore) | [Scheduled jobs and WP-Cron](/kb/concepts/scheduled-jobs-and-wp-cron)

## Backup

**Plain meaning:** a ZIP file of one tenant: database, own plugins and themes, config and uploads. Backup has 7 steps.
**Where you see it:** the **Backup** tab of a tenant. Needs Pro.
**Why it matters:** it is the safe way back after a mistake.
**More:** [Backup and restore](/grabwp-tenancy-pro/pro-backup-restore)

## Backup offload

**Plain meaning:** sending backups to remote storage.
**Where you see it:** **Tenancy > Pro Settings > Backup**, **Offload Driver**: **Disabled**, **Use Platform S3 Storage** or **Custom S3 Endpoint**. **Google Drive (Coming Soon)** and **FTP / SFTP (Coming Soon)** are shown but not available.
**Why it matters:** options **Auto Offload** and **Delete Local Copy** control whether the local copy stays.
**More:** [Backup and restore](/grabwp-tenancy-pro/pro-backup-restore)

## Clone

**Plain meaning:** copy a tenant, or the main site, into a new tenant. Base clone has 6 steps. Pro clone has 7.
**Where you see it:** the **Clone** tab of a tenant.
**Why it matters:** a clone is how templates become customer sites.
**More:** [Tenant cloning](/grabwp-tenancy-pro/pro-tenant-cloning)

## Domain symlink

**Plain meaning:** a Pro option called **Domain Symlink (Clean URLs)** that shortens tenant asset URLs from `/wp-content/uploads/grabwp-tenancy/{tenant-id}/` to `/wp-content/`.
**Where you see it:** **Tenancy > Pro Settings > Symlink**. Buttons: **Fix All Tenant Broken Symlinks** and **Sync All Tenant Domain Symlinks**.
**Why it matters:** it needs the PHP function `symlink()` and matching web server rules. If `symlink()` is off, the page says `symlink() is not available on this server.`
**More:** [Apache, LiteSpeed and Nginx](/kb/choose/web-server-guide)

## Fix URLs

**Plain meaning:** a tool that rewrites the old address inside a tenant's data to its current address.
**Where you see it:** the **Fix URLs** tab of a tenant. Needs Pro.
**Why it matters:** use it when a tenant shows broken links or images after a move or clone.
**More:** [Fix URLs](/grabwp-tenancy-pro/pro-fix-urls)

## GrabWP Restore

**Plain meaning:** a separate plugin that restores a backup on a WordPress site. It replaces the whole site.
**Where you see it:** **Tools > GrabWP Restore**. Not shown on Multisite.
**Why it matters:** it warns `Warning: Destructive Operation`. Your current admin login is replaced by the one in the backup.
**More:** [How the plugins fit together](/kb/start-here/how-the-plugins-fit)

## Per-tenant overrides

**Plain meaning:** a tenant setting that differs from the global one. For each on/off setting you choose **Use global setting**, **Yes** or **No**.
**Where you see it:** the **Overrides** tab of a tenant, shown only when your Base version supports it.
**Why it matters:** **Use global setting** keeps following later global changes. **Yes** and **No** do not. A constant defined before GrabWP can overrule both.
**More:** [Tenant settings](/grabwp-tenancy-pro/pro-tenant-settings)

## Restore

**Plain meaning:** put a tenant back from a backup. Restore has 8 steps.
**Where you see it:** the **Restore** tab of a tenant. Needs Pro.
**Why it matters:** it replaces the tenant's current data.
**More:** [Backup and restore](/grabwp-tenancy-pro/pro-backup-restore)

## Storage driver

**Plain meaning:** where tenant uploads are kept: `local` on this server or `s3` in remote storage. The default is `local`.
**Where you see it:** **Tenancy > Pro Settings > Storage**, button **Migrate uploads now**.
**Why it matters:** switching from S3 back to local without migrating breaks media.
**More:** [Pro settings](/kb/reference/pro-settings)
