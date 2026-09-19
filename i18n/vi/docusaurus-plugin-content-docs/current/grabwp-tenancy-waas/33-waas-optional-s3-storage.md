---
title: "S3 Object Storage"
description: "Chuyển file upload của tenant sang Cloudflare R2, AWS S3, DigitalOcean Spaces, hoặc bất kỳ nhà cung cấp nào tương thích với S3"
order: 33
section: waas
---

# S3 Object Storage (Tùy chọn)

Đẩy các file media upload của tenant lên các dịch vụ lưu trữ đám mây tương thích với S3 thay vì lưu chúng trên ổ cứng local của server.

## Khi nào nên dùng S3

- **Dung lượng ổ cứng:** Server của bạn có không gian lưu trữ hạn chế và các tenant upload rất nhiều media
- **Phân phối CDN:** Phục vụ hình ảnh/file từ một mạng lưới CDN toàn cầu giúp tăng tốc độ tải trang
- **Khả năng mở rộng:** Tách biệt lưu trữ khỏi máy chủ xử lý, giúp bạn dễ dàng mở rộng từng phần độc lập
- **Backups:** Các nhà cung cấp lưu trữ đám mây tự động lo liệu việc đảm bảo tính dự phòng và độ bền vững cho dữ liệu của bạn

## Các nhà cung cấp được hỗ trợ

Bất kỳ API nào tương thích với S3 đều có thể hoạt động tốt:

| Nhà cung cấp | Ví dụ Endpoint | Ghi chú |
|----------|-----------------|-------|
| **Cloudflare R2** | `https://ACCOUNT_ID.r2.cloudflarestorage.com` | Không có phí băng thông ra (egress). Region: `auto` |
| **AWS S3** | `https://s3.us-east-1.amazonaws.com` | Nền tảng lâu đời nhất. Hỗ trợ rất nhiều region. |
| **DigitalOcean Spaces** | `https://nyc3.digitaloceanspaces.com` | Cấu trúc giá đơn giản. Tích hợp sẵn CDN. |
| **MinIO** | `https://minio.yourdomain.com` | Dùng để tự host (Self-hosted). Cần bật tuỳ chọn path-style. |
| **Backblaze B2** | `https://s3.us-west-002.backblazeb2.com` | Chi phí thấp. Có API tương thích S3. |

## Cấu hình

Truy cập vào **Tenancy → Pro Settings → Object Storage** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`).

1. Đặt **Storage Driver** thành **S3**
2. Điền các thông tin sau:

| Trường | Mô tả | Ví dụ |
|-------|-------------|---------|
| **S3 Endpoint URL** | URL endpoint đầy đủ của nhà cung cấp | `https://ACCOUNT.r2.cloudflarestorage.com` |
| **Bucket Name** | Tên của bucket mà bạn đã tạo | `grabwp-uploads` |
| **Region** | Region của AWS hoặc nhập `auto` cho R2 | `auto` |
| **Access Key ID** | ID của API key | |
| **Secret Access Key** | Mật khẩu API (được lưu trữ mã hóa) | |
| **CDN URL** (tùy chọn) | URL prefix công khai dùng để phân phối file | `https://cdn.yoursaas.com` |
| **Path-Style Endpoint** | Bật tuỳ chọn này cho MinIO hoặc một số nhà cung cấp khác | Tích chọn nếu cần |

3. Nhấp vào **Test Connection** để kiểm tra chứng chỉ API và quyền truy cập vào bucket
4. Nhấp vào **Save Settings**

## Hướng dẫn thiết lập cho từng nhà cung cấp

### Cloudflare R2

1. Đăng nhập vào [Cloudflare dashboard](https://dash.cloudflare.com/)
2. Chuyển đến **R2 Object Storage → Create Bucket**
3. Đặt tên cho bucket (ví dụ: `grabwp-uploads`)
4. Truy cập **R2 → Manage R2 API Tokens → Create API token**
5. Thiết lập quyền truy cập: **Object Read & Write**
6. Copy Access Key ID và Secret Access Key
7. Endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
8. Region: `auto`

> **Tài liệu Cloudflare R2:** [R2 documentation](https://developers.cloudflare.com/r2/)

### AWS S3

1. Tạo một bucket trong [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Tạo một user IAM với policy `AmazonS3FullAccess` (hoặc giới hạn quyền chỉ trong bucket của bạn)
3. Tạo Access Key trong phần chứng chỉ bảo mật của user IAM
4. Sử dụng endpoint theo region cho bucket của bạn

> **Tài liệu AWS S3:** [Getting started with S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)

### DigitalOcean Spaces

1. Tạo một Space trong [DigitalOcean](https://cloud.digitalocean.com/spaces)
2. Truy cập **API → Spaces Keys → Generate New Key**
3. Endpoint: `https://<REGION>.digitaloceanspaces.com`

> **Tài liệu DO Spaces:** [Spaces documentation](https://docs.digitalocean.com/products/spaces/)

## Chuyển đổi dữ liệu hàng loạt

Sau khi cấu hình S3, bạn có thể tiến hành migration (chuyển đổi) các file upload hiện tại của tenant:

1. Trong Pro Settings → Object Storage, nhấp vào **Migrate All Tenants to S3**
2. Chờ quá trình migration hoàn tất, bước này sẽ tải tất cả các file local của tenant lên S3
3. Kiểm tra lại một vài site tenant để đảm bảo hình ảnh vẫn load bình thường

Để chuyển dữ liệu ngược lại về lưu trữ local: nhấp vào **Migrate All Tenants to Local**.

> **Lưu ý:** Quá trình migration có thể mất một lúc tùy thuộc vào lượng dữ liệu bạn có. Màn hình sẽ hiển thị tiến độ và kết quả.

## Cấu hình CDN

Nếu bạn thiết lập **CDN URL**, các file sẽ được phân phối từ URL đó thay vì dùng URL pre-signed của S3.

Dành cho Cloudflare R2:
1. Chuyển đến mục R2 → chọn bucket của bạn → Settings → Public Access
2. Bật tính năng public access hoặc thêm một custom domain
3. Nhập URL public đó vào mục CDN URL trong Pro Settings

Nếu không có CDN URL, các file sẽ được phân phối bằng các URL pre-signed có giới hạn thời gian (cách này bảo mật hơn nhưng có thể chậm hơn đôi chút).

---

**Tiếp theo:** [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce)
