---
title: "Bắt đầu nhanh"
description: "Thiết lập tenant site đầu tiên chỉ trong vài phút"
order: 2
section: base
---

# Bắt đầu nhanh

## Yêu cầu

- WordPress 5.0 trở lên
- PHP 7.4 trở lên
- Quyền truy cập quản trị WordPress

## Bước 1: Cài đặt plugin

1. Vào **Plugins → Add New** trong trang quản trị WordPress
2. Tìm **GrabWP Tenancy**
3. Nhấn **Install Now**, sau đó **Activate**

Plugin sẽ tự động thiết lập mọi thành phần cần thiết khi kích hoạt, không cần chỉnh sửa file thủ công.

> **Mẹo:** Sau khi kích hoạt, vào **GrabWP Tenancy → Status** để xác nhận mọi thành phần đã được cài đúng. Nếu có cảnh báo, hãy nhấn **Auto Fix**.

## Bước 2: Tạo tenant site đầu tiên

1. Vào **GrabWP Tenancy → Tenants**
2. Nhấn **Add New**
3. Chọn nhập domain ngay hoặc cấu hình sau
4. Nhấn **Create**

Plugin sẽ gán một ID gồm 6 ký tự duy nhất (ví dụ: `abc123`) và tự động tạo bảng cơ sở dữ liệu cùng thư mục upload cho site.

## Bước 3: Truy cập site mới

Bạn có hai cách để truy cập tenant site:

### Tùy chọn A - Định tuyến theo path (không cần DNS)

Truy cập site ngay bằng URL theo đường dẫn:

```
https://yoursite.com/site/{tenant-id}
```

Ví dụ: `https://yoursite.com/site/abc123`

Không cần cấu hình domain, không cần thay đổi DNS. Hoạt động ngay trên Apache/LiteSpeed. Với Nginx, xem [Hướng dẫn Domain & DNS](/grabwp-tenancy/hosting-dns-setup).

### Tùy chọn B - Domain tùy chỉnh

Trỏ một domain riêng (ví dụ: `client1.com`) đến tenant site. Cần cấu hình hosting và DNS.

→ [Hướng dẫn Domain & DNS](/grabwp-tenancy/hosting-dns-setup)

## Bước 4: Truy cập trang quản trị tenant

Trong danh sách tenant (**GrabWP Tenancy → Tenants**), mỗi dòng có các biểu tượng thao tác. Nhấn **biểu tượng Admin** (dashboard) để mở trang quản trị WordPress của tenant. Với tenant dùng domain riêng, token bảo mật sẽ được tự động chèn để bạn đăng nhập ngay lập tức.
