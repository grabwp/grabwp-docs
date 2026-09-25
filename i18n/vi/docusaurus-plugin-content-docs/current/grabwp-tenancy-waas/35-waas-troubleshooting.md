---
title: "Xử lý sự cố"
description: "Sửa provisioning bị kẹt, webhook thanh toán, gallery template, kiểm tra tên miền, và email đăng ký"
order: 35
section: waas
---

# Xử lý sự cố

Dùng tab **Activity Log** và **Provisioning** trước khi đổi cấu hình server. Cả hai nằm trong **Waas → Settings**.

## Provisioning

**Truy cập Waas → Settings**, tab **Provisioning** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=provisioning`).

![Provisioning intent](../images/05-waas-settings-provisioning.png)

Bộ lọc mặc định là **All active states**. Giá trị khác: `checkout_pending`, `payment_confirmed`, `finalizing`, `tenant_created`, `clone_running`, `failed_retriable`. Bấm **Filter**.

| Cột | Ghi chú |
|-----|---------|
| **Intent ID** | ID provisioning |
| **Flow** | Ví dụ Signup hoặc Upgrade |
| **State** | Một trong các trạng thái trên, hoặc `failed_terminal` / `completed` khi được hiện |
| **Clone Progress** | Bước và tổng khi clone đang chạy |
| **Last Error** | Đoạn lỗi rút gọn |
| **Retries** | Số lần thử lại |
| **Updated** | Thời điểm cập nhật cuối |
| **Actions** | **Retry** (chỉ trạng thái `failed_retriable` và `clone_running`) và **Dismiss** |

**Dismiss** hỏi: **Mark this intent as dismissed (failed_terminal)?**

Nếu khách đã trả tiền mà site không xuất hiện:

1. Tìm intent và đọc **Last Error** cùng **State**.
2. Bấm **Retry** khi có biểu tượng đó.
3. Mở **Activity Log** cùng khoảng thời gian.
4. Xác nhận web server ghi được thư mục hiện ở **Waas Directory** trên tab **General**.

> **Tip:** Dashboard của tenant có thể hiện **Your site is being set up.** khi media và extension vẫn đang sao chép. Banner biến mất khi clone xong.

## Activity Log

**Truy cập Waas → Settings**, tab **Activity Log** (`page=grabwp-tenancy-waas-settings&tab=activity`). Chi tiết hơn: [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity).

![Activity Log](../images/05-waas-settings-activity.png)

Chọn sự kiện trong danh sách (mặc định **All events**) và bấm **Filter**. Các cột: **Date**, **Event**, **Actor**, **Tenant**, **Details**, **IP**.

Hết hạn subscription hiện các sự kiện như `subscription_expired` và `subscription_suspended_after_grace`. Actor `cron` nghĩa là job hằng ngày, không phải một người.

## Thanh toán

**Truy cập Waas → Settings**, tab **Billing Providers** (`page=grabwp-tenancy-waas-settings&tab=billing`). Xem [Thanh toán WooCommerce](/grabwp-tenancy-waas/waas-optional-woocommerce) cho thẻ WooCommerce.

Nhà cung cấp khai báo webhook sẽ hiện **Webhook URL** và nút **Copy**. Chú thích hiện **Last webhook received:** kèm thời gian, hoặc **No webhook events received yet.**

Đường dẫn là:

```text
https://your-site.example/wp-json/grabwp-waas/v1/webhooks/billing/<provider>
```

`<provider>` là slug trên thẻ (`polar`, `sepay`, `stripe`, `xendit`, v.v.). Dán đúng URL đó vào dashboard của nhà cung cấp, gồm `https`.

Nếu khách đã trả và subscription vẫn **Pending**:

1. Đưa chuột lên **Webhook URL** và xem webhook đã tới chưa.
2. So secret trên thẻ với dashboard của nhà cung cấp.
3. Xác nhận site truy cập được từ internet (không bị chặn bởi chế độ bảo trì hoặc HTTP basic auth).
4. Nếu webhook đã tới, xem **Provisioning** có `payment_confirmed` hoặc `failed_retriable` không.

WooCommerce không dùng URL webhook đó. Nếu checkout mở giỏ trống:

- Chạy **Create/Repair WooCommerce Anchor Product** trong **Repair tools** trên **General**.
- Xác nhận anchor product vẫn mua được. Lỗi **The WaaS anchor product is not available for purchase.** nghĩa là không mua được.
- Xóa plugin giỏ hoặc cache đang khôi phục giỏ WooCommerce cũ.

## Template

**Truy cập Waas → Templates** (`page=grabwp-tenancy-waas-templates`).

Nếu một template không có trong gallery:

1. Sửa template và kiểm tra **Active** / **Show in signup form**.
2. Xác nhận **Source Tenant** vẫn còn trong **Tenancy → All Tenants**.
3. Xem **Allowed Plans**. Bỏ chọn hết để mọi gói đều dùng được.
4. Đặt **Thumbnail** nếu thẻ trông trống. Thiếu ảnh thì dùng ảnh giữ chỗ, không ẩn thẻ.
5. Bỏ cache toàn trang trên trang template.

Liên kết xem trước dùng `?grabwp_waas_preview=<slug>` trên URL trang chủ. Nếu bản xem trước trắng, mở URL đó trực tiếp, xác nhận source tenant phản hồi, và đảm bảo cache không cắt query.

## Tên miền tùy chỉnh

**Truy cập Waas → Domains**. Các bước đầy đủ: [Quản lý tên miền tùy chỉnh](/grabwp-tenancy-waas/waas-managing-domains).

| Bạn thấy | Việc cần làm |
|----------|----------------|
| Cảnh báo: domain settings not configured | Đặt **Domain Mode** trên **General**. |
| **Unknown** | Chưa kiểm tra. Bấm dấu tích trong **Actions**. |
| **Pending**, did not respond | DNS hoặc web server chưa nhận hostname. Đợi, rồi **Verify** lại. |
| **Pending**, not serving this site | Hostname tới một site khác. Sửa server name hoặc Cloudflare hostname, rồi **Verify**. |
| **(stale)** | Lần kiểm tra cũ hơn 24 giờ. Chạy **Verify** lại. |
| Bộ lọc **Verified** trống | Chưa có tên miền nào qua kiểm tra. |

Hostname Direct IP còn cần chứng chỉ trên server này. Cloudflare SaaS cần **CNAME Target** và, để kiểm tra chứng chỉ tự động, **DCV Delegation**.

## Site tenant

1. Xác nhận hostname phân giải về server này.
2. Xác nhận tenant còn trong **Tenancy → All Tenants**.
3. Đọc PHP error log.
4. Với **WAAS Auth (Email signup)**, chủ site đăng nhập bằng login trên dashboard (mã email), không chỉ `wp-login.php`. **WordPress Auth (Login required)** dùng tài khoản WordPress thường.

Tenant giữ hostname nền tảng cho đến khi một tên miền tùy chỉnh đã xác minh được đặt làm primary.

## Email và đăng ký

OTP và thư khác dùng `wp_mail()` của WordPress. Nếu mã không tới:

1. Kiểm tra spam.
2. Gửi thư thử từ plugin SMTP.
3. Xác nhận miền người gửi có SPF và DKIM, và host cho phép cổng SMTP.

Trang đăng ký gửi header không cache vì HTML nhúng REST nonce. Cache vẫn lưu trang đó có thể sau này lỗi cookie hoặc nonce. Loại URL đăng ký khỏi full-page cache.

## S3

Trên **Tenancy → Pro Settings → Storage**, **Test Connection** phải nói **Connection successful!** Nếu là **Connection failed.** hoặc **Request failed.**:

1. Kiểm tra lại **S3 Endpoint URL**, **Bucket Name**, **Region**, và **Access Key ID**.
2. Nhập lại **Secret Access Key** (trường trống giữ secret cũ).
3. Với MinIO, bật **Path-Style Endpoint**.
4. Xác nhận server này mở được endpoint.

Xem [Lưu trữ đối tượng S3](/grabwp-tenancy-waas/waas-optional-s3-storage).

## WordPress debug log

Trong `wp-config.php`:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Thông báo ghi vào `wp-content/debug.log`. Tắt hiển thị trên site công khai để lỗi không in ra trình duyệt.

---

**Quay lại:** [Mục lục tài liệu WaaS](/grabwp-tenancy-waas/waas-overview)
