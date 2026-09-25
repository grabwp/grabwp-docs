---
title: "Điều kiện trước khi cài"
description: "Những gì cần có trước khi thiết lập GrabWP WaaS"
order: 21
section: waas
---

# Điều kiện trước khi cài

Những gì cần có trước khi thiết lập GrabWP WaaS.

## Bắt buộc

### WordPress có quyền admin

Bạn cần một site WordPress nơi bạn có thể:

- Cài và kích hoạt plugin
- Truy cập file system (FTP, SSH, hoặc file manager của host)
- Sửa `wp-config.php` nếu bạn khóa đường dẫn thư mục ở đó

**Nên dùng:** VPS hoặc dedicated server để tự quản DNS, SSL và hàm PHP như `symlink()`. Shared hosting vẫn chạy được phần cài cơ bản.

### Tên miền

Một domain trỏ về server (ví dụ `yoursaas.com`). Site tenant được tạo dạng subdomain của **Platform Domain**, chẳng hạn `customer1.yoursaas.com`.

Wildcard DNS phải phân giải `*.yoursaas.com` về server. Bạn nhập domain sau, ở [Configure WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general).

### PHP 7.4+ và WordPress 5.0+

GrabWP Tenancy, Pro và WaaS đều yêu cầu WordPress 5.0+ và PHP 7.4+.

Kiểm tra phiên bản tại **Tools → Site Health → Info → Server**.

### Chứng chỉ SSL

HTTPS cần cho payment provider và cho site tenant. Chứng chỉ phải phủ platform domain và `*.yoursaas.com`. Nhiều host có Let's Encrypt.

## Nên có

### Plugin SMTP

`wp_mail()` của WordPress dễ vào spam. Cài plugin SMTP để email signup và đăng nhập dashboard được gửi tới.

Một số lựa chọn:

- [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/)
- [FluentSMTP](https://wordpress.org/plugins/fluent-smtp/)

### Tài khoản Polar.sh (cho plan trả phí)

**Polar.sh** là billing provider gắn sẵn trong WaaS. Tạo organization tại [polar.sh](https://polar.sh) nếu bạn thu phí plan. Các bước nằm ở [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing).

Bạn cũng có thể thu phí bằng WooCommerce, hoặc bằng add-on Stripe, Sepay và Xendit.

### Pro license

**Tenancy → License** là nơi kích hoạt GrabWP Tenancy Pro. Lượt tải ZIP add-on từ **Waas → Settings → Add-ons** dùng license đó.

## Tùy chọn

### Cloudflare (cho custom domain)

Khách có thể gắn domain riêng (ví dụ `mybusiness.com`) bên cạnh subdomain của platform. **Cloudflare SaaS (CNAME)** là một trong hai lựa chọn **Domain Mode**. Xem [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains).

### Object storage tương thích S3

Đưa media của tenant ra khỏi đĩa local. Cấu hình tại **Tenancy → Pro Settings → Storage**: mọi API tương thích S3 (AWS S3, Cloudflare R2, DigitalOcean Spaces, MinIO). Xem [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage).

### WooCommerce

WooCommerce hiện thành billing provider khi plugin WooCommerce đang active. Xem [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce).

---

**Tiếp theo:** [What You Will Build](/grabwp-tenancy-waas/waas-what-you-will-build)
