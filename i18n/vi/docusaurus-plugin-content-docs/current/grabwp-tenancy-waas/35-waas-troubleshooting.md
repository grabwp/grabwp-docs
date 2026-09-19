---
title: "Xử lý sự cố"
description: "Khắc phục các sự cố WaaS phổ biến - lỗi provisioning, vấn đề webhook, lỗi template, xác minh custom domain và gửi email"
order: 35
section: waas
---

# Xử lý sự cố

Các vấn đề phổ biến và cách khắc phục.

## Provisioning

### Quá trình provisioning thất bại hoặc bị treo

**Triệu chứng:** Người dùng đăng ký và thanh toán thành công nhưng trang không bao giờ được tạo, hoặc biểu tượng tải chạy mãi không dừng.

**Cách kiểm tra:**
1. Vào **WaaS → Settings → Provisioning** - tìm các tác vụ đang bị kẹt.
2. Kiểm tra **Activity Log** (WaaS → Settings → tab Activity) để xem chi tiết lỗi.
3. Xác minh quyền thư mục:
   ```bash
   # Thư mục dữ liệu WaaS phải có quyền ghi bởi web server
   ls -la wp-content/uploads/grabwp-tenancy-waas/
   ```
4. Kiểm tra PHP error log để xem có lỗi nghiêm trọng (fatal error) trong quá trình provisioning không.

**Nguyên nhân phổ biến:**
- Hết dung lượng ổ cứng.
- Vấn đề quyền file (web server không thể tạo thư mục).
- Giới hạn bộ nhớ PHP quá thấp - hãy tăng `memory_limit` trong `php.ini`.
- Thời gian thực thi tối đa của PHP - hãy tăng `max_execution_time` cho các tác vụ provisioning chạy lâu.

### Tác vụ provisioning bị kẹt ở trạng thái "pending"

1. Vào WaaS → Settings → Provisioning
2. Tìm tác vụ đang bị kẹt
3. Nhấp vào **Retry** để đưa vào hàng đợi chạy lại, hoặc **Dismiss** để loại bỏ tác vụ này.

## Thanh toán và billing

### Không nhận được webhook của Polar

**Triệu chứng:** Khách hàng đã thanh toán nhưng subscription vẫn ở trạng thái pending. Thời gian "Last webhook received" không cập nhật.

**Cách kiểm tra:**
1. Xác minh URL webhook trong dashboard Polar khớp chính xác:
   ```
   https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar
   ```
2. Đảm bảo trang web của bạn có thể truy cập được từ internet (không phải localhost).
3. Xác minh webhook secret khớp giữa Polar và cài đặt WaaS.
4. Kiểm tra dashboard Polar → Webhooks → Delivery log để xem các lần gửi thất bại.

**Nguyên nhân phổ biến:**
- Sai URL webhook (gõ nhầm, dùng HTTP thay vì HTTPS).
- Tường lửa chặn webhook đến.
- Sai webhook secret - hãy copy-paste cẩn thận, bắt buộc phải có tiền tố `whsec_`.
- Trang web đang bật basic auth hoặc chế độ bảo trì (maintenance mode).

### Thanh toán thành công nhưng chưa tạo trang

1. Kiểm tra xem đã nhận được webhook chưa (WaaS → Settings → Billing → thời gian nhận webhook cuối cùng).
2. Nếu đã nhận webhook: kiểm tra hàng đợi provisioning (WaaS → Settings → Provisioning).
3. Nếu chưa nhận webhook: xem phần "Không nhận được webhook của Polar" ở trên.
4. Kiểm tra Activity Log để xem có lỗi không.

### Trang checkout WooCommerce chuyển hướng về giỏ hàng trống

- Xác minh **Anchor Product** đã được tạo và publish (ngay cả khi bị ẩn).
- Nhấp vào **Create/Repair WooCommerce Anchor Product** trong WaaS → Settings → General.
- Xóa cache của bất kỳ plugin WooCommerce cache nào.

## Templates

### Templates không hiển thị trong gallery

**Cách kiểm tra:**
1. Template đã được đánh dấu là **Active** chưa? (WaaS → Templates → Edit)
2. Tenant gốc (source tenant) còn hoạt động không? (Tenancy → All Tenants)
3. Template có bị giới hạn ở các plan cụ thể không? Hãy kiểm tra **Allowed Plans** trên template.
4. Template có **thumbnail** (ảnh đại diện) chưa? Templates không có thumbnails có thể trông như bị lỗi.
5. Xóa page cache trên trang hiển thị templates.

### Bản xem trước của template không tải được

- URL xem trước sử dụng `?grabwp_waas_preview=<slug>` - đảm bảo server hoặc hệ thống cache của bạn không chặn tham số này.
- Kiểm tra xem trang tenant gốc có truy cập được không.
- Xác minh không có lỗi PHP nào trên trang tenant.

## Custom domains

### Xác minh domain thất bại

**Cách kiểm tra:**
1. Quá trình cập nhật DNS có thể mất đến 48 giờ (thường từ 5-30 phút).
2. Dùng công cụ kiểm tra DNS để xác minh bản ghi đã nhận:
   ```bash
   dig mybusiness.com CNAME    # Cho chế độ Cloudflare SaaS
   dig mybusiness.com A        # Cho chế độ Direct IP
   ```
3. Đảm bảo giá trị bản ghi chính xác:
   - Chế độ CNAME: phải trỏ chính xác đến CNAME Target của bạn.
   - Chế độ Direct IP: phải trỏ chính xác đến IP server của bạn.

### Custom domain trỏ sai trang hoặc lỗi SSL

**Cloudflare SaaS:**
- Kiểm tra fallback origin đã được cấu hình đúng trong Cloudflare chưa.
- Xác minh custom hostname đã được thêm vào dashboard Cloudflare.
- Quá trình cấp phát SSL có thể mất vài phút.

**Direct IP:**
- Đảm bảo web server (Nginx/Apache) của bạn có server block cho custom domain.
- Chạy Certbot hoặc công cụ tương đương để cài SSL cho domain mới.
- Tải lại/khởi động lại web server sau khi thay đổi cấu hình.

## Trang tenant

### Trang tenant không tải được (lỗi 404 hoặc trang trắng)

1. Kiểm tra domain/subdomain DNS đã trỏ đúng chưa.
2. Xác minh tenant tồn tại trong **Tenancy → All Tenants**.
3. Kiểm tra các bảng database của tenant có tồn tại không.
4. Tìm lỗi PHP trong error log.
5. Xác minh wildcard DNS đã được cấu hình: `*.yoursaas.com → IP server của bạn`.

### Không thể truy cập vào admin của tenant

- Thử truy cập qua `tenant-slug.yoursaas.com/wp-admin/`.
- Nếu đăng nhập thất bại, user của tenant có thể chưa được tạo - hãy kiểm tra log provisioning.
- Ở chế độ WaaS Auth: tenants đăng nhập qua mã OTP trên dashboard, không qua `wp-login.php`.

## Email

### Không nhận được mã OTP

1. Kiểm tra thư mục spam/junk.
2. Xác minh plugin SMTP đã được cấu hình và hoạt động.
3. Gửi email test từ **WP Mail SMTP → Email Test** (hoặc tính năng test của plugin SMTP bạn dùng).
4. Trong môi trường dev: kiểm tra Mailpit tại `http://yourserver:8025/`.

**Nguyên nhân phổ biến:**
- Chưa cài plugin SMTP (hàm `wp_mail()` mặc định thường bị các mail server từ chối).
- Sai thông tin đăng nhập SMTP.
- Port bị nhà cung cấp hosting chặn (port 25/465/587).
- Domain của email gửi đi không có bản ghi SPF/DKIM.

## Quyền file

### Lỗi "Permission denied"

User của web server (thường là `www-data` hoặc `nginx`) cần quyền ghi vào:

```bash
chown -R www-data:www-data wp-content/grabwp-tenancy/
chown -R www-data:www-data wp-content/grabwp-tenancy-pro/
chown -R www-data:www-data wp-content/uploads/grabwp-tenancy-waas/
chown -R www-data:www-data wp-content/uploads/
```

### Kiểm tra kết nối S3 thất bại

1. Kiểm tra kỹ endpoint URL, tên bucket, region.
2. Xác minh access key và secret key chính xác.
3. Đối với MinIO: bật tùy chọn **Path-Style Endpoint**.
4. Kiểm tra bucket có tồn tại và credentials có quyền đọc/ghi không.
5. Xác minh kết nối mạng - server của bạn phải có thể kết nối đến endpoint S3.

## Hiệu suất

### Provisioning chậm

- Tăng `memory_limit` của PHP lên ít nhất 256M.
- Tăng `max_execution_time` lên ít nhất 120 giây.
- Đối với các tenants dùng SQLite: đảm bảo bạn dùng ổ cứng SSD.
- Đối với lưu trữ S3: việc upload file provisioning lên S3 sẽ chậm hơn so với lưu cục bộ - đây là điều bình thường.

### Admin dashboard chậm

- Bảng danh sách subscriptions và domains cần query database - hãy đảm bảo các index hoạt động tốt.
- Nếu bạn có hàng trăm tenants, hãy cân nhắc tinh chỉnh hiệu suất MySQL.
- Xóa object cache nếu bạn đang dùng plugin cache.

## Nhận hỗ trợ

Nếu bạn đã thử các cách trên mà vẫn gặp sự cố:

1. **Kiểm tra Activity Log** - WaaS → Settings → Activity để xem chi tiết lỗi.
2. **Kiểm tra PHP error log** - thường ở `/var/log/php-fpm/error.log` hoặc trong control panel hosting của bạn.
3. **Kiểm tra WordPress debug log** - bật `WP_DEBUG_LOG` trong `wp-config.php`:
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```
   Các log sẽ được ghi vào file `wp-content/debug.log`.

---

**Quay lại:** [Danh mục tài liệu WaaS](/grabwp-tenancy-waas/waas-overview)
