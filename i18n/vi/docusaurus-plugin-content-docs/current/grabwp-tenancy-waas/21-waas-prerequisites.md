---
title: "Yêu cầu tiên quyết"
description: "Những gì bạn cần chuẩn bị trước khi thiết lập GrabWP WaaS"
order: 21
section: waas
---

# Yêu cầu tiên quyết

Những gì bạn cần chuẩn bị trước khi thiết lập GrabWP WaaS.

## Bắt buộc

### Hosting WordPress có quyền Admin

Bạn cần một bản cài WordPress cho phép:

- Cài đặt và kích hoạt plugin
- Truy cập hệ thống file (qua FTP, SSH, hoặc trình quản lý file của hosting)
- Chỉnh sửa `wp-config.php` khi cần

**Khuyến nghị:** VPS hoặc máy chủ riêng (ví dụ: DigitalOcean, Vultr, Hetzner) cho bạn toàn quyền kiểm soát. Shared hosting vẫn dùng được nhưng có thể hạn chế các tính năng nâng cao như tên miền riêng và lưu trữ S3.

### Tên miền

Một tên miền đã trỏ về server của bạn (ví dụ: `yoursaas.com`). Các site tenant sẽ được tạo dưới dạng subdomain: `customer1.yoursaas.com`, `customer2.yoursaas.com`, v.v.

### PHP 7.4+ và MySQL 5.7+

Kiểm tra phiên bản:
- **PHP:** Vào **Công cụ → Site Health → Thông tin → Server** trong trang quản trị WordPress
- **MySQL:** Cùng vị trí, mục **Database**

### Chứng chỉ SSL

HTTPS là bắt buộc để xử lý thanh toán và bảo mật tenant. Hầu hết hosting cung cấp SSL miễn phí qua Let's Encrypt.

## Khuyến nghị

### Plugin SMTP

Email mặc định của WordPress dùng `wp_mail()` thường rơi vào thư mục spam. Cài plugin SMTP để đảm bảo gửi email ổn định cho mã OTP và thông báo.

Các lựa chọn phổ biến:
- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/)
- [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/)

### Tài khoản Polar (cho gói trả phí)

Nếu bạn muốn thu phí cho các gói dịch vụ, tạo tài khoản miễn phí tại [polar.sh](https://polar.sh). Polar xử lý thanh toán, đăng ký gói và hóa đơn. Chi tiết thiết lập tại [Thiết lập thanh toán](/vi/grabwp-tenancy-waas/waas-setup-billing).

## Tùy chọn

### Cloudflare (cho tên miền riêng)

Nếu bạn muốn khách hàng sử dụng tên miền riêng (ví dụ: `mybusiness.com` thay vì `mybusiness.yoursaas.com`), tính năng **SaaS Custom Hostnames** của Cloudflare là cách dễ nhất.

- Gói Cloudflare miễn phí đủ cho thiết lập cơ bản
- SaaS Custom Hostnames yêu cầu liên hệ Cloudflare để bật trên zone của bạn
- Xem [Quản lý tên miền riêng](/vi/grabwp-tenancy-waas/waas-managing-domains) để thiết lập

### Lưu trữ Object Storage tương thích S3

Chuyển file media của tenant lên cloud storage thay vì lưu trên ổ đĩa server. Hữu ích cho:
- Giảm dung lượng ổ đĩa server
- Phân phối media qua CDN
- Sao lưu và di chuyển dễ dàng hơn

Nhà cung cấp hỗ trợ: AWS S3, Cloudflare R2, DigitalOcean Spaces, MinIO, bất kỳ API tương thích S3.

Xem [Lưu trữ S3 Object Storage](/vi/grabwp-tenancy-waas/waas-optional-s3-storage) để thiết lập.

### WooCommerce

Nhà cung cấp thanh toán thay thế nếu bạn thích WooCommerce hơn Polar. Hữu ích nếu bạn đã có cửa hàng WooCommerce hoặc cần cổng thanh toán nội địa.

Xem [Thanh toán WooCommerce](/vi/grabwp-tenancy-waas/waas-optional-woocommerce) để thiết lập.

---

**Tiếp theo:** [Bạn sẽ xây dựng gì](/vi/grabwp-tenancy-waas/waas-what-you-will-build)
