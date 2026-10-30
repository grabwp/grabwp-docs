---
title: 'Backup, restore or "Failed to save Pro settings"'
description: "How to fix Pro config write errors, broken symlinks, S3 storage driver switches and backup or restore warnings."
sidebar_label: "Backup, restore or save errors"
tags: [troubleshooting, backup, settings, plan-pro, for-operator, for-cs]
last_verified_version: "Pro 1.1.17, Restore 1.0.5"
last_verified_date: "2026-10-30"
---

**Short answer:** saving Pro settings and running backups both need write access to the GrabWP data folders on disk. Before switching a site's storage driver between local disk and S3, always click **Migrate uploads now** first so existing media files are copied over.
**Needs:** Pro

## Symptom

You see one of these errors or warnings while managing Pro settings, site settings, storage, or backups:

- `Failed to save Pro settings. Please check file permissions.`
- `Failed to save overrides. Check that the tenant config file is writable.`
- `Cannot read tenant database. Settings are unavailable.`
- `The Isolated MySQL password is not available any more.`
- `Saving a different driver does NOT move existing files.`
- On **Restore Tenant** (Pro):
  - `This will completely overwrite all data for this tenant (database, uploads, config). This action cannot be undone.`
- On **Tools > GrabWP Restore** (standalone plugin):
  - `Warning: Destructive Operation`
  - `This will REPLACE your entire WordPress site including the database, uploads, plugins, and themes. Your current admin credentials will be replaced by those from the backup.`
  - `The ZIP file must fit within your server upload_max_filesize and post_max_size limits.`

Or, when testing S3 under **Tenancy > Pro Settings > Storage**, the test returns `Connection failed.` or `Request failed.`.

## Cause

| If you see | It means |
|---|---|
| `Failed to save Pro settings. Please check file permissions.` | The web server user cannot write to the Pro configuration file (`config.php` in the Pro data directory). |
| `Failed to save overrides. Check that the tenant config file is writable.` | The web server user cannot write to the site's configuration file inside the data directory. |
| `Cannot read tenant database. Settings are unavailable.` | On the site **Settings** tab, GrabWP Pro could not connect to or read the site's database tables. |
| `The Isolated MySQL password is not available any more.` | The stored MySQL password could not be decrypted (for example, if WordPress security salts in `wp-config.php` were changed after credentials were saved). |
| Broken media after switching **Local Filesystem** and **S3-Compatible Object Storage** | Switching the storage driver changes where new uploads go, but does not move existing files unless you click **Migrate uploads now** first. |
| Upload fails on **Restore Tenant** or **Tools > GrabWP Restore** | The backup `.zip` file is larger than your PHP `upload_max_filesize` or `post_max_size` limit. |
| **Tools > GrabWP Restore** menu is missing | **GrabWP Restore** is a standalone plugin for single-site WordPress and deliberately hides its menu when WordPress Multisite is enabled. |
| S3 connection test fails | The endpoint URL, bucket name, region, or S3 API keys are incorrect or unreachable. |

## Check

1. Go to **Tenancy > Status** and check both the **Plugin General** and **Pro Plugin** tabs for any unwritable directory warnings or `Pro config directory inside uploads/` notices.
2. Check file ownership and permissions on `wp-content/grabwp-tenancy` and its subfolders so the web server user can create and update `config.php` and backup archives.
3. Before uploading a backup `.zip` on **Restore Tenant**, check the maximum upload size displayed on the **Upload Archive** tab (Max upload size limit).
4. If plugin or theme symlinks broke after moving paths on disk, go to **Tenancy > Pro Settings > Symlink**.

## Fix

### Fix "Failed to save Pro settings" or overrides

1. Ensure the data directory (`wp-content/grabwp-tenancy` and the Pro config folder) is owned by your web server user with `755` folder permissions and `644` file permissions.
2. Reload **Tenancy > Pro Settings** and save your changes again.

### Switch between Local Filesystem and S3 without breaking media

1. Open the site edit screen under **Tenancy > All Tenants**.
2. Click **Migrate uploads now** and wait for the file copy to finish before changing the storage driver between **Local Filesystem** and **S3-Compatible Object Storage**.
3. Save the site settings only after migration completes.

### Fix S3 connection failures

On **Tenancy > Pro Settings > Storage**, when **Test Connection** returns an error:

1. Recheck **S3 Endpoint URL**, **Bucket Name**, **Region**, and **Access Key ID**.
2. Re-enter the **Secret Access Key** (leaving the field blank keeps the previously saved secret).
3. If using MinIO or a self-hosted S3 service, enable **Path-Style Endpoint**.
4. Confirm your server firewall allows outbound connections to the S3 endpoint port.

### Repair broken symlinks

If site plugins or themes fail to load after a server path change, go to **Tenancy > Pro Settings > Symlink** and click **Fix All Tenant Broken Symlinks** (and **Sync All Tenant Domain Symlinks** if you use domain symlinks).

### Restore a site vs a standalone install

- To restore one site inside your platform, go to **Tenancy > All Tenants**, click **Restore** on that site row, and choose **From Existing Backup** or **Upload Archive**.
- Do not run **Tools > GrabWP Restore** on your main platform site unless you intend to overwrite the entire main WordPress installation. If a backup `.zip` exceeds the upload limit shown on the screen, increase `upload_max_filesize` and `post_max_size` in your PHP configuration first, or restore from the **From Existing Backup** tab if the archive is already on the server.

## Still stuck

If a backup or restore stops at one of the numbered steps (1 to 7 for backup, 1 to 8 for restore), record the step number and message shown on screen, then follow [What to send when you ask for help](/help/getting-help).

## Related

- [Backup and restore](/manage-sites/backup-and-restore)
- [Pro settings](/manage-sites/pro-settings)
- [S3 storage](/manage-sites/s3-storage)
- [What to send when you ask for help](/help/getting-help)
