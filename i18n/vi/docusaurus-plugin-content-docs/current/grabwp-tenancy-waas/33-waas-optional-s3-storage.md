---
title: "Lưu trữ đối tượng S3"
description: "Đưa upload của tenant lên Cloudflare R2, AWS S3, MinIO, Backblaze B2, hoặc endpoint tương thích S3 khác"
order: 33
section: waas
---

# Lưu trữ đối tượng S3 (tùy chọn)

Media của tenant có thể ở trên đĩa server, hoặc chuyển sang bucket tương thích S3. Đây là thiết lập Pro. Giữ **Local Filesystem (default)** cho đến khi bucket sẵn sàng.

**Truy cập Tenancy → Pro Settings** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`) và mở tab **Storage**.

![Object Storage trên Pro Settings](../images/11-pro-settings-storage.png)

Tiêu đề mục là **Object Storage (S3-Compatible)**. Chú thích liệt kê Cloudflare R2, AWS S3, MinIO, và Backblaze B2. Mọi endpoint nói API S3 đều nhập được vào **S3 Endpoint URL**.

## Bật S3

1. Dưới **Default Storage Driver**, chọn **S3-Compatible Object Storage**. **Local Filesystem (default)** giữ file trên đĩa.
2. Mở **S3 storage credentials** và điền các trường.
3. Bấm **Test Connection**.
4. Bấm **Save Pro Settings**.

| Trường | Ghi chú |
|--------|---------|
| **S3 Endpoint URL** | URL đầy đủ. Placeholder: `https://ACCOUNT_ID.r2.cloudflarestorage.com` |
| **Bucket Name** | Bucket đã tạo. Placeholder: `grabwp-uploads` |
| **Region** | `auto` cho Cloudflare R2. Ví dụ trong chú thích: `us-east-1`, `eu-west-1` |
| **Path-Style Endpoint** | **Enable path-style endpoint (required for MinIO)** |
| **Access Key ID** | API key |
| **Secret Access Key** | Để trống ở lần lưu sau để giữ secret đã lưu |
| **CDN URL (optional)** | Tiền tố công khai cho URL file. Để trống thì file dùng pre-signed URL |
| **Connection Test** | **Test Connection**. Chữ thành công: **Connection successful!** |

**Verify:** **Test Connection** báo **Connection successful!**, **Save Pro Settings** giữ **S3-Compatible Object Storage**, và upload mới trên site tenant tải từ bucket hoặc **CDN URL**.

## Giá trị theo nhà cung cấp

| Nhà cung cấp | Endpoint | Region |
|--------------|----------|--------|
| **Cloudflare R2** | `https://<ACCOUNT_ID>.r2.cloudflarestorage.com` | `auto` |
| **AWS S3** | Endpoint S3 theo region, ví dụ `https://s3.us-east-1.amazonaws.com` | Region của bucket |
| **MinIO** | URL MinIO của bạn | Region của bạn. Bật **Path-Style Endpoint**. |
| **Backblaze B2** | `https://s3.<region>.backblazeb2.com` | Region B2, ví dụ `us-west-002` |

> **Cloudflare R2:** [Tài liệu R2](https://developers.cloudflare.com/r2/)
>
> **AWS S3:** [Bắt đầu với S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

Với R2 phát công khai, bật public access hoặc custom domain trên bucket, rồi dán URL đó vào **CDN URL (optional)**.

## Bulk Migration

**Bulk Migration** hiện sau khi credential S3 đã lưu và kết nối đã cấu hình. Chú thích khuyên dùng WP-CLI cho site lớn.

1. Mở **Bulk Migration**.
2. Bấm **Migrate All Tenants to S3** hoặc **Migrate All Tenants to Local**.
3. Xác nhận **This will migrate uploads for ALL tenants. Continue?**
4. Đợi kết quả cạnh các nút.

Mục lồng **WP-CLI reference** hiện:

```bash
wp grabwp-pro storage migrate --all --to=s3
wp grabwp-pro storage migrate acme-corp --to=s3 --copy-only
```

`--dry-run` liệt kê file và không đổi chúng. `--copy-only` sao chép file và giữ bản gốc. Tenant vẫn chuyển sang driver đích.

**Verify:** Mở media library của một tenant và xác nhận ảnh cũ vẫn tải. Để chuyển về, bấm **Migrate All Tenants to Local**, hoặc chạy `wp grabwp-pro storage migrate --all --to=local`.

---

**Tiếp theo:** [Thanh toán WooCommerce](/grabwp-tenancy-waas/waas-optional-woocommerce)
