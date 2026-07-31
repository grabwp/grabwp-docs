---
title: "Lưu trữ đối tượng S3"
description: "Chuyển dữ liệu tải lên media của tenant sang Cloudflare R2, AWS S3, DigitalOcean Spaces hoặc bất kỳ nhà cung cấp tương thích S3 nào"
order: 33
section: waas
---

# Lưu trữ đối tượng S3 (Tùy chọn)

Chuyển dữ liệu tải lên media của tenant sang dịch vụ lưu trữ đám mây tương thích S3 thay vì lưu trên ổ đĩa cục bộ của máy chủ.

## Khi nào nên dùng S3

- **Dung lượng đĩa:** Máy chủ của bạn có dung lượng lưu trữ hạn chế và tenant tải lên nhiều media
- **Phân phối qua CDN:** Phục vụ hình ảnh/tệp từ CDN toàn cầu để cải thiện thời gian tải
- **Khả năng mở rộng:** Tách riêng lưu trữ khỏi hạ tầng tính toán — mở rộng độc lập
- **Sao lưu:** Nhà cung cấp lưu trữ đám mây đảm trách tính dư thừa và độ bền dữ liệu

## Nhà cung cấp được hỗ trợ

Mọi API tương thích S3 đều hoạt động:

| Nhà cung cấp | Ví dụ endpoint | Ghi chú |
|----------|-----------------|-------|
| **Cloudflare R2** | `https://ACCOUNT_ID.r2.cloudflarestorage.com` | Không tính phí egress. Region: `auto` |
| **AWS S3** | `https://s3.us-east-1.amazonaws.com` | Hoàn thiện nhất. Nhiều region. |
| **DigitalOcean Spaces** | `https://nyc3.digitaloceanspaces.com` | Giá đơn giản. CDN tích hợp. |
| **MinIO** | `https://minio.yourdomain.com` | Tự lưu trữ. Bật path-style. |
| **Backblaze B2** | `https://s3.us-west-002.backblazeb2.com` | Chi phí thấp. API tương thích S3. |

## Cấu hình

Đi đến **Tenancy → Pro Settings → Object Storage** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`).

1. Đặt **Storage Driver** thành **S3**
2. Điền các trường:

| Trường | Mô tả | Ví dụ |
|-------|-------------|---------|
| **S3 Endpoint URL** | URL endpoint đầy đủ của nhà cung cấp | `https://ACCOUNT.r2.cloudflarestorage.com` |
| **Bucket Name** | Tên bucket bạn đã tạo | `grabwp-uploads` |
| **Region** | AWS region hoặc `auto` cho R2 | `auto` |
| **Access Key ID** | ID khóa API | |
| **Secret Access Key** | Bí mật API (được lưu mã hóa) | |
| **CDN URL** (tùy chọn) | Tiền tố URL công khai để phục vụ tệp | `https://cdn.yoursaas.com` |
| **Path-Style Endpoint** | Bật cho MinIO và một số nhà cung cấp | Chọn nếu cần |

3. Nhấp **Test Connection** để xác minh thông tin xác thực và quyền truy cập bucket
4. Nhấp **Save Settings**

## Hướng dẫn thiết lập nhà cung cấp

### Cloudflare R2

1. Đăng nhập [bảng điều khiển Cloudflare](https://dash.cloudflare.com/)
2. Đi đến **R2 Object Storage → Create Bucket**
3. Đặt tên (ví dụ: `grabwp-uploads`)
4. Đi đến **R2 → Manage R2 API Tokens → Create API token**
5. Đặt quyền: **Object Read & Write**
6. Sao chép Access Key ID và Secret Access Key
7. Endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
8. Region: `auto`

> **Tài liệu Cloudflare R2:** [Tài liệu R2](https://developers.cloudflare.com/r2/)

### AWS S3

1. Tạo bucket trong [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Tạo người dùng IAM với policy `AmazonS3FullAccess` (hoặc giới hạn phạm vi theo bucket của bạn)
3. Tạo Access Key trong thông tin xác thực bảo mật của người dùng IAM
4. Sử dụng endpoint khu vực cho bucket của bạn

> **Tài liệu AWS S3:** [Bắt đầu với S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

### DigitalOcean Spaces

1. Tạo một Space trong [DigitalOcean](https://cloud.digitalocean.com/spaces)
2. Đi đến **API → Spaces Keys → Generate New Key**
3. Endpoint: `https://<REGION>.digitaloceanspaces.com`

> **Tài liệu DO Spaces:** [Tài liệu Spaces](https://docs.digitalocean.com/products/spaces/)

## Di chuyển hàng loạt

Sau khi cấu hình S3, hãy di chuyển các tệp tải lên hiện có của tenant:

1. Trong Pro Settings → Object Storage, nhấp **Migrate All Tenants to S3**
2. Chờ quá trình di chuyển hoàn tất — thao tác này tải toàn bộ tệp tenant cục bộ lên S3
3. Kiểm tra một vài site tenant để bảo đảm hình ảnh tải đúng

Để di chuyển trở lại lưu trữ cục bộ: nhấp **Migrate All Tenants to Local**.

> **Lưu ý:** Quá trình di chuyển có thể mất một lúc, tùy vào lượng dữ liệu. Trang sẽ hiển thị tiến trình và kết quả.

## Cấu hình CDN

Nếu bạn đặt **CDN URL**, các tệp sẽ được phục vụ từ URL đó thay vì dùng URL S3 được ký trước.

Đối với Cloudflare R2:
1. Đi đến R2 → bucket của bạn → Settings → Public Access
2. Bật quyền truy cập công khai hoặc thêm tên miền tùy chỉnh
3. Nhập URL công khai làm CDN URL trong Pro Settings

Không có CDN URL, các tệp được phục vụ qua URL được ký trước có thời hạn (an toàn nhưng chậm hơn một chút).

---

**Tiếp theo:** [Thanh toán WooCommerce](/vi/grabwp-tenancy-waas/waas-optional-woocommerce)
