---
title: "S3 Object Storage"
description: "Store tenant uploads on Cloudflare R2, AWS S3, MinIO, Backblaze B2, or another S3-compatible endpoint"
order: 33
section: waas
---

# S3 Object Storage (Optional)

Tenant media can stay on the server disk, or move to an S3-compatible bucket. This is a Pro setting. Leave it on **Local Filesystem (default)** until a bucket is ready.

**Navigate to Tenancy → Pro Settings** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`) and open the **Storage** tab.

![Object Storage on Pro Settings](../images/11-pro-settings-storage.png)

The section title is **Object Storage (S3-Compatible)**. The help tip lists Cloudflare R2, AWS S3, MinIO, and Backblaze B2. Any endpoint that speaks the S3 API can be entered in **S3 Endpoint URL**.

## Turn on S3

1. Under **Default Storage Driver**, select **S3-Compatible Object Storage**. **Local Filesystem (default)** keeps files on disk.
2. Open **S3 storage credentials** and fill the fields.
3. Click **Test Connection**.
4. Click **Save Pro Settings**.

| Field | Notes |
|-------|-------|
| **S3 Endpoint URL** | Full URL. Placeholder: `https://ACCOUNT_ID.r2.cloudflarestorage.com` |
| **Bucket Name** | Bucket you already created. Placeholder: `grabwp-uploads` |
| **Region** | `auto` for Cloudflare R2. Examples in the help tip: `us-east-1`, `eu-west-1` |
| **Path-Style Endpoint** | **Enable path-style endpoint (required for MinIO)** |
| **Access Key ID** | API key |
| **Secret Access Key** | Leave blank on later saves to keep the stored secret |
| **CDN URL (optional)** | Public prefix for file URLs. If empty, files use pre-signed URLs |
| **Connection Test** | **Test Connection**. Success text: **Connection successful!** |

**Verify:** **Test Connection** reports **Connection successful!**, **Save Pro Settings** keeps **S3-Compatible Object Storage** selected, and a new upload on a tenant site loads from the bucket or **CDN URL**.

## Provider values

| Provider | Endpoint | Region |
|----------|----------|--------|
| **Cloudflare R2** | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` | `auto` |
| **AWS S3** | Regional S3 endpoint, for example `https://s3.us-east-1.amazonaws.com` | Bucket region |
| **MinIO** | Your MinIO URL | Your region. Check **Path-Style Endpoint**. |
| **Backblaze B2** | `https://s3.<region>.backblazeb2.com` | B2 region, for example `us-west-002` |

> **Cloudflare R2:** [R2 documentation](https://developers.cloudflare.com/r2/)
>
> **AWS S3:** [Getting started with S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

For R2 public delivery, enable public access or a custom domain on the bucket, then paste that URL into **CDN URL (optional)**.

## Bulk Migration

**Bulk Migration** appears after S3 credentials are saved and the connection is configured. The help tip says to prefer WP-CLI for large sites.

1. Open **Bulk Migration**.
2. Click **Migrate All Tenants to S3** or **Migrate All Tenants to Local**.
3. Confirm **This will migrate uploads for ALL tenants. Continue?**
4. Wait for the result next to the buttons.

The nested **WP-CLI reference** shows:

```bash
wp grabwp-pro storage migrate --all --to=s3
wp grabwp-pro storage migrate acme-corp --to=s3 --copy-only
```

`--dry-run` lists files and does not change them. `--copy-only` copies files and keeps the originals. The tenant still switches to the target driver.

**Verify:** Open a tenant media library and confirm existing images load. To move back, click **Migrate All Tenants to Local**, or run `wp grabwp-pro storage migrate --all --to=local`.

---

**Next:** [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce)
