---
title: "Cấu hình WaaS General Settings"
description: "Thiết lập domain nền tảng, chế độ xác thực, trang frontend, tên miền riêng và API key"
order: 25
section: waas
---

# Cấu hình WaaS General Settings

WaaS General Settings xác định danh tính nền tảng của bạn — domain, phương thức xác thực và các trang khách hàng tương tác.

Điều hướng đến **WaaS → Settings → General** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings`).

![WaaS General Settings](../images/waas-general-settings.png)

## Cài đặt nền tảng

### Platform Domain

Domain dùng cho các subdomain của tenant.

| Trường | Ví dụ | Ghi chú |
|-------|---------|-------|
| **Platform Domain** | `yoursaas.com` | Tenant nhận subdomain như `customer.yoursaas.com` |

Nhập domain gốc của bạn không kèm `http://` hay dấu gạch chéo cuối. DNS wildcard phải trỏ `*.yoursaas.com` về server của bạn.

> **Thiết lập DNS:** Thêm một bản ghi A wildcard trong DNS của bạn:
> ```
> *.yoursaas.com  →  A  →  YOUR_SERVER_IP
> ```
> Việc này đảm bảo mọi subdomain đều phân giải về server của bạn.

### WaaS Data Directory

Đây là nơi WaaS lưu trữ dữ liệu vận hành (mẫu, yêu cầu khởi tạo, v.v.).

| Trường | Mặc định |
|-------|---------|
| **WaaS Data Directory** | `grabwp-tenancy-waas` |

Đường dẫn này tương đối với thư mục uploads của WordPress. Giá trị mặc định thường phù hợp.

### Authentication Mode

Cách khách hàng xác thực trên nền tảng của bạn.

| Chế độ | Mô tả |
|------|-------------|
| **WaaS Auth** (khuyến nghị) | Tạo một user mới trong quá trình đăng ký. Khách hàng đăng nhập qua OTP (mật khẩu một lần gửi tới email). Không cần form đăng nhập WordPress. |
| **WP Auth** | Yêu cầu một tài khoản WordPress hiện có trước khi tạo site. Khách hàng dùng đăng nhập WordPress tiêu chuẩn. |

**Khuyến nghị:** Dùng **WaaS Auth** để có trải nghiệm SaaS tự phục vụ.

## Cấu hình trang

WaaS cần ba trang WordPress cho frontend khách hàng. Bạn có thể tạo chúng thủ công hoặc dùng nút tự động tạo.

### Tự động tạo trang

Nhấn nút **Create/Repair Signup and Dashboard Pages** ở cuối trang cài đặt. Việc này tự động tạo ba trang với các shortcode chính xác.

### Thiết lập thủ công

Nếu bạn muốn tự tạo trang:

1. Tạo một trang tên **Signup** với nội dung: `[grabwp_waas_signup]`
2. Tạo một trang tên **Dashboard** với nội dung: `[grabwp_waas_dashboard]`
3. Tạo một trang tên **Templates** với nội dung: `[grabwp_waas_templates]`

Sau đó chọn từng trang trong các danh sách thả xuống:

| Cài đặt | Trang | Nội dung |
|---------|------|---------|
| **Signup Page** | Signup | `[grabwp_waas_signup]` hoặc block Signup |
| **Dashboard Page** | Dashboard | `[grabwp_waas_dashboard]` hoặc block Dashboard |
| **Templates Page** | Templates | `[grabwp_waas_templates]` hoặc block Template Browser |

> **Mẹo:** Bạn cũng có thể dùng block Gutenberg thay cho shortcode. Xem [Thiết lập trang Frontend](/vi/grabwp-tenancy-waas/waas-setup-frontend-pages) để biết chi tiết.

## Cài đặt tên miền riêng

Cấu hình cách tên miền riêng của tenant hoạt động. Việc này quyết định hướng dẫn DNS hiển thị cho khách hàng của bạn.

| Cài đặt | Tùy chọn | Mô tả |
|---------|---------|-------------|
| **Domain Mode** | Cloudflare SaaS / Direct IP | Cách khách hàng kết nối tên miền của họ |
| **CNAME Target** | ví dụ: `cdn.saas.yoursaas.com` | (chế độ Cloudflare) Giá trị khách hàng đặt trong bản ghi CNAME |
| **Server Public IP** | ví dụ: `203.0.113.50` | (chế độ Direct IP) Giá trị khách hàng đặt trong bản ghi A |

**Cho hướng dẫn này:** Chọn một trong hai chế độ. Chi tiết tại [Quản lý tên miền riêng](/vi/grabwp-tenancy-waas/waas-managing-domains).

## Activity Log

| Cài đặt | Mặc định | Mô tả |
|---------|---------|-------------|
| **Retention (days)** | 90 | Thời gian giữ các mục nhật ký hoạt động (7–365 ngày) |
| **Grace Period (days)** | 7 | Số ngày trước khi tenant bị đình chỉ sau khi hủy subscription. 0 = đình chỉ ngay lập tức. |

## API Keys

API key cho phép các hệ thống bên ngoài tương tác với nền tảng WaaS của bạn qua REST API.

Để tạo một key:
1. Nhập một **Key Label** tùy chọn (ví dụ: "CI/CD pipeline")
2. Nhấn **Generate New API Key**
3. **Sao chép key ngay lập tức** — nó chỉ được hiển thị một lần

Các key hiện có được liệt kê cùng với nhãn, tiền tố và ngày tạo. Nhấn **Revoke** để vô hiệu hóa một key.

> **Lưu ý:** API key chỉ dành cho truy cập lập trình. Hầu hết thiết lập không cần chúng trừ khi bạn tích hợp với công cụ bên ngoài.

## Lưu cài đặt

Nhấn **Save Settings**. Xác minh thông báo thành công xuất hiện ở đầu trang.

---

**Tiếp theo:** [Tạo gói dịch vụ](/vi/grabwp-tenancy-waas/waas-create-plans)
