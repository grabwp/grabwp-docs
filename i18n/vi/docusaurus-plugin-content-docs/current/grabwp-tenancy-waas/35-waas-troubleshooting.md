---
title: "Xử lý sự cố"
description: "Khắc phục các sự cố WaaS thường gặp — lỗi khởi tạo, vấn đề webhook, lỗi mẫu, xác minh tên miền và gửi email"
order: 35
section: waas
---

# Xử lý sự cố

Các vấn đề thường gặp và cách khắc phục.

## Khởi tạo

### Khởi tạo site thất bại hoặc bị treo

**Dấu hiệu:** Đăng ký đã thanh toán xong nhưng site không được tạo, hoặc biểu tượng xoay chạy mãi.

**Kiểm tra:**
1. Đi đến **WaaS → Settings → Provisioning** — tìm các intent bị kẹt
2. Kiểm tra **Activity Log** (WaaS → Settings → tab Activity) để xem chi tiết lỗi
3. Xác minh quyền hệ thống tệp:
   ```bash
   # The WaaS data directory must be writable by the web server
   ls -la wp-content/uploads/grabwp-tenancy-waas/
   ```
4. Kiểm tra nhật ký lỗi PHP để tìm lỗi nghiêm trọng trong quá trình khởi tạo

**Nguyên nhân phổ biến:**
- Không đủ dung lượng đĩa
- Vấn đề về quyền tệp (web server không thể tạo thư mục)
- Giới hạn bộ nhớ PHP quá thấp — tăng `memory_limit` trong `php.ini`
- Thời gian thực thi tối đa của PHP — tăng `max_execution_time` cho tác vụ khởi tạo dài

### Intent khởi tạo bị kẹt ở "pending"

1. Đi đến WaaS → Settings → Provisioning
2. Tìm intent bị kẹt
3. Nhấp **Retry** để đưa vào hàng đợi lại, hoặc **Dismiss** để loại bỏ

## Thanh toán & Lập hóa đơn

### Không nhận được webhook Polar

**Dấu hiệu:** Khách hàng đã thanh toán nhưng subscription vẫn ở trạng thái chờ. Dấu thời gian "Last webhook received" không cập nhật.

**Kiểm tra:**
1. Xác minh URL webhook trong bảng điều khiển Polar khớp chính xác:
   ```
   https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar
   ```
2. Kiểm tra site của bạn có thể truy cập từ Internet (không phải localhost)
3. Xác minh secret webhook khớp giữa Polar và cài đặt WaaS
4. Kiểm tra Polar dashboard → Webhooks → Delivery log để tìm các lần gửi thất bại

**Nguyên nhân phổ biến:**
- URL webhook sai (lỗi chính tả, HTTP thay vì HTTPS)
- Tường lửa chặn webhook đến
- Secret webhook không khớp — sao chép-dán cẩn thận, tiền tố `whsec_` là bắt buộc
- Site nằm sau basic auth hoặc chế độ bảo trì

### Thanh toán thành công nhưng site không được khởi tạo

1. Kiểm tra webhook đã được nhận chưa (WaaS → Settings → Billing → dấu thời gian webhook gần nhất)
2. Nếu đã nhận webhook: kiểm tra hàng đợi khởi tạo (WaaS → Settings → Provisioning)
3. Nếu chưa nhận webhook: xem phần "Không nhận được webhook Polar" ở trên
4. Kiểm tra Activity Log để tìm lỗi

### Trang thanh toán WooCommerce chuyển đến giỏ hàng trống

- Xác minh **Anchor Product** tồn tại và đã được xuất bản (ngay cả khi ẩn)
- Nhấp **Create/Repair WooCommerce Anchor Product** trong WaaS → Settings → General
- Xóa mọi plugin cache WooCommerce

## Mẫu giao diện

### Mẫu không xuất hiện trong thư viện

**Kiểm tra:**
1. Mẫu có được đánh dấu **Active** không? (WaaS → Templates → Edit)
2. Tenant nguồn còn hoạt động không? (Tenancy → All Tenants)
3. Mẫu có bị giới hạn cho các gói cụ thể không? Kiểm tra **Allowed Plans** trên mẫu
4. Mẫu có **thumbnail** không? Mẫu không có thumbnail có thể hiển thị lỗi
5. Xóa cache trang trên trang mẫu

### Xem trước mẫu không tải

- URL xem trước dùng `?grabwp_waas_preview=<slug>` — hãy bảo đảm máy chủ/lớp cache không chặn tham số này
- Kiểm tra site tenant nguồn có thể truy cập
- Xác minh không có lỗi PHP trong site tenant

## Tên miền tùy chỉnh

### Xác minh tên miền thất bại

**Kiểm tra:**
1. DNS có thể mất đến 48 giờ để lan truyền (thường là 5–30 phút)
2. Dùng công cụ kiểm tra DNS để xác minh bản ghi có hiển thị:
   ```bash
   dig mybusiness.com CNAME    # For Cloudflare SaaS mode
   dig mybusiness.com A        # For Direct IP mode
   ```
3. Bảo đảm giá trị bản ghi chính xác:
   - Chế độ CNAME: phải trỏ chính xác đến CNAME Target của bạn
   - Chế độ Direct IP: phải trỏ chính xác đến IP máy chủ của bạn

### Tên miền tùy chỉnh hiển thị sai site hoặc lỗi SSL

**Cloudflare SaaS:**
- Kiểm tra fallback origin đã được cấu hình đúng trong Cloudflare
- Xác minh custom hostname đã được thêm trong bảng điều khiển Cloudflare
- Việc cấp SSL có thể mất vài phút

**Direct IP:**
- Bảo đảm web server (Nginx/Apache) có server block cho tên miền tùy chỉnh
- Chạy Certbot hoặc công cụ tương đương để cấp SSL cho tên miền mới
- Tải lại/khởi động lại web server sau khi thay đổi cấu hình

## Site tenant

### Site tenant không tải (404 hoặc trang trống)

1. Kiểm tra DNS tên miền/tên miền phụ phân giải đúng
2. Xác minh tenant tồn tại trong **Tenancy → All Tenants**
3. Kiểm tra các bảng database của tenant tồn tại
4. Tìm lỗi PHP trong nhật ký lỗi
5. Xác minh DNS wildcard được cấu hình: `*.yoursaas.com → your server IP`

### Không thể truy cập trang quản trị tenant

- Thử truy cập qua `tenant-slug.yoursaas.com/wp-admin/`
- Nếu đăng nhập thất bại, người dùng tenant có thể chưa được tạo — kiểm tra nhật ký khởi tạo
- Với chế độ WaaS Auth: tenant đăng nhập bằng OTP trên bảng điều khiển, không phải wp-login.php

## Email

### Không nhận được mã OTP

1. Kiểm tra thư mục spam/rác
2. Xác minh plugin SMTP đã được cấu hình và hoạt động
3. Gửi email thử từ **WP Mail SMTP → Email Test** (hoặc chức năng kiểm tra của plugin SMTP bạn dùng)
4. Trong môi trường phát triển: kiểm tra Mailpit tại `http://yourserver:8025/`

**Nguyên nhân phổ biến:**
- Chưa cài plugin SMTP (`wp_mail()` mặc định thường bị máy chủ email từ chối)
- Thông tin xác thực SMTP không đúng
- Cổng bị nhà cung cấp hosting chặn (cổng 25/465/587)
- Tên miền email người gửi không có bản ghi SPF/DKIM

## Quyền tệp

### Lỗi "Permission denied"

Người dùng web server (thường là `www-data` hoặc `nginx`) cần quyền ghi vào:

```bash
chown -R www-data:www-data wp-content/grabwp-tenancy/
chown -R www-data:www-data wp-content/grabwp-tenancy-pro/
chown -R www-data:www-data wp-content/uploads/grabwp-tenancy-waas/
chown -R www-data:www-data wp-content/uploads/
```

### Kiểm tra kết nối S3 thất bại

1. Kiểm tra lại URL endpoint, tên bucket, region
2. Xác minh access key và secret key chính xác
3. Với MinIO: bật hộp chọn **Path-Style Endpoint**
4. Kiểm tra bucket tồn tại và thông tin xác thực có quyền đọc/ghi
5. Xác minh kết nối mạng — máy chủ của bạn phải truy cập được endpoint S3

## Hiệu năng

### Khởi tạo chậm

- Tăng PHP `memory_limit` lên ít nhất 256M
- Tăng `max_execution_time` lên ít nhất 120 giây
- Với tenant SQLite: bảo đảm dùng lưu trữ SSD
- Với lưu trữ S3: tải tệp lên trong quá trình khởi tạo chậm hơn lưu trữ cục bộ — đây là hành vi dự kiến

### Bảng điều khiển quản trị chậm

- Các bảng danh sách subscription và tên miền truy vấn database — bảo đảm index còn nguyên vẹn
- Nếu có hàng trăm tenant, hãy cân nhắc tinh chỉnh hiệu năng MySQL
- Xóa object cache nếu bạn dùng plugin cache

## Nhận hỗ trợ

Nếu đã thử các cách trên nhưng vẫn gặp sự cố:

1. **Kiểm tra Activity Log** — WaaS → Settings → Activity để xem bản ghi lỗi chi tiết
2. **Kiểm tra nhật ký lỗi PHP** — thường ở `/var/log/php-fpm/error.log` hoặc trong bảng điều khiển hosting
3. **Kiểm tra nhật ký gỡ lỗi WordPress** — bật `WP_DEBUG_LOG` trong `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```
   Nhật ký được ghi vào `wp-content/debug.log`

---

**Quay lại:** [Chỉ mục tài liệu WaaS](/vi/grabwp-tenancy-waas/waas-overview)
