---
title: "S3 Object Storage"
description: "Offload tenant media uploads to Cloudflare R2, AWS S3, DigitalOcean Spaces, or any S3-compatible provider"
order: 33
section: waas
---

# S3 Object Storage (Optional)

Offload tenant media uploads to S3-compatible cloud storage instead of storing them on your server's local disk.

## When to Use S3

- **Disk space:** Your server has limited storage and tenants upload lots of media
- **CDN delivery:** Serve images/files from a global CDN for faster load times
- **Scalability:** Decouple storage from compute - scale independently
- **Backups:** Cloud storage providers handle redundancy and durability

## Supported Providers

Any S3-compatible API works:

| Provider | Endpoint Example | Notes |
|----------|-----------------|-------|
| **Cloudflare R2** | `https://ACCOUNT_ID.r2.cloudflarestorage.com` | No egress fees. Region: `auto` |
| **AWS S3** | `https://s3.us-east-1.amazonaws.com` | Most mature. Many regions. |
| **DigitalOcean Spaces** | `https://nyc3.digitaloceanspaces.com` | Simple pricing. Built-in CDN. |
| **MinIO** | `https://minio.yourdomain.com` | Self-hosted. Enable path-style. |
| **Backblaze B2** | `https://s3.us-west-002.backblazeb2.com` | Low cost. S3-compatible API. |

## Configuration

Navigate to **Tenancy → Pro Settings → Object Storage** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`).

1. Set **Storage Driver** to **S3**
2. Fill in:

| Field | Description | Example |
|-------|-------------|---------|
| **S3 Endpoint URL** | Full endpoint URL for your provider | `https://ACCOUNT.r2.cloudflarestorage.com` |
| **Bucket Name** | Name of the bucket you created | `grabwp-uploads` |
| **Region** | AWS region or `auto` for R2 | `auto` |
| **Access Key ID** | API key ID | |
| **Secret Access Key** | API secret (stored encrypted) | |
| **CDN URL** (optional) | Public URL prefix for serving files | `https://cdn.yoursaas.com` |
| **Path-Style Endpoint** | Enable for MinIO and some providers | Check if needed |

3. Click **Test Connection** to verify credentials and bucket access
4. Click **Save Settings**

## Provider Setup Guides

### Cloudflare R2

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Go to **R2 Object Storage → Create Bucket**
3. Name it (e.g., `grabwp-uploads`)
4. Go to **R2 → Manage R2 API Tokens → Create API token**
5. Set permissions: **Object Read & Write**
6. Copy the Access Key ID and Secret Access Key
7. Endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
8. Region: `auto`

> **Cloudflare R2 docs:** [R2 documentation](https://developers.cloudflare.com/r2/)

### AWS S3

1. Create a bucket in the [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Create an IAM user with `AmazonS3FullAccess` policy (or scoped to your bucket)
3. Generate Access Key under the IAM user's security credentials
4. Use the regional endpoint for your bucket

> **AWS S3 docs:** [Getting started with S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

### DigitalOcean Spaces

1. Create a Space in [DigitalOcean](https://cloud.digitalocean.com/spaces)
2. Go to **API → Spaces Keys → Generate New Key**
3. Endpoint: `https://<REGION>.digitaloceanspaces.com`

> **DO Spaces docs:** [Spaces documentation](https://docs.digitalocean.com/products/spaces/)

## Bulk Migration

After configuring S3, migrate existing tenant uploads:

1. In Pro Settings → Object Storage, click **Migrate All Tenants to S3**
2. Wait for the migration to complete - this uploads all local tenant files to S3
3. Verify a few tenant sites to ensure images load correctly

To migrate back to local storage: click **Migrate All Tenants to Local**.

> **Note:** Migration can take a while depending on the amount of data. The page shows progress and results.

## CDN Configuration

If you set a **CDN URL**, files are served from that URL instead of using pre-signed S3 URLs.

For Cloudflare R2:
1. Go to R2 → your bucket → Settings → Public Access
2. Enable public access or add a custom domain
3. Enter the public URL as CDN URL in Pro Settings

Without a CDN URL, files are served using time-limited pre-signed URLs (secure but slightly slower).

---

**Next:** [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce)
