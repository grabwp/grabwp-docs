---
title: "Xử lý sự cố"
description: "Các lỗi thường gặp và cách xử lý"
order: 5
section: tenancy
---

# Xử lý sự cố

## Xem Status trước

**Vào Tenancy → Status** (`page=grabwp-tenancy-status`).

![GrabWP Tenancy Status](../images/grabwp-status.png)

Mở **Plugin General** (`tab=general`). Dùng **Auto Fix** trên dòng chưa ổn, khi nút có sẵn. Nếu file không ghi được, mở **Fix steps and install code** và dùng **Copy Code**.

| Tab | Dùng khi |
|-----|------------|
| Plugin General | Loader, MU-plugin, rewrite rules, bảo vệ thư mục dữ liệu |
| Base Plugin | Thư mục, file mappings, file settings, cờ capability |
| Pro Plugin | Pro có **Active** hay không, cùng isolation và kiểu database mặc định |

Chi tiết: [Cài đặt](/grabwp-tenancy/installation-guide).

## Lỗi plugin

### Không thấy menu Tenancy

Trên **Plugin General**, kiểm tra **wp-config.php Loader** và **MU-Plugin**. Nhấn **Auto Fix** nếu một trong hai chưa active hoặc installed. Bạn cần capability `manage_options` để thấy **Tenancy**.

### Lỗi sau khi kích hoạt

Đọc **Plugin General**. Deactivate plugin sẽ gỡ loader, must-use plugin, và rewrite rules ở thư mục gốc. Bảng và upload của tenant không bị xóa. Activate lại thì tenant trở lại.

## Lỗi domain

### Domain hiện sai site hoặc trang mặc định của host

- Domain đã gắn trên tenant: **Tenancy → All Tenants**, cột **Domains**, hoặc **Settings** trên dòng.
- Hosting dùng thư mục WordPress này làm document root. Xem [Domain và DNS](/grabwp-tenancy/hosting-dns-setup).
- DNS trỏ về máy chủ này ([dnschecker.org](https://dnschecker.org)).
- Chờ phân giải, rồi thử lại trong cửa sổ riêng tư.

### Domain(s) already in use

Lỗi là **Domain(s) already in use** (hoặc **Domain(s) already in use by other tenants** khi sửa). Mỗi domain chỉ thuộc một tenant. Gỡ domain khỏi tenant kia, rồi gán lại.

### Invalid domain format

Lỗi là **Invalid domain format(s)**. Dùng `example.com` hoặc `subdomain.example.com`. Đừng dùng địa chỉ IP, `localhost`, `http://`, hoặc tiền tố `www` trong ô.

### Cột Domains hiện Path access only

Tenant được tạo với **I'll set up a domain later**. Mở **Settings** trên dòng, thêm domain, nhấn **Update Tenant**, rồi hoàn tất DNS. **Path URL** trên Edit chỉ là bản xem trước tạm thời.

## Lỗi nội dung

### Tenant hiện nội dung của site chính

1. Deactivate rồi activate GrabWP Tenancy.
2. Kiểm tra lại **Plugin General**.
3. Xóa cache trình duyệt, cache plugin WordPress, và cache của host hoặc CDN.

### Upload media thất bại

Mở **Tenancy → Status → Base Plugin** và xác nhận base directory tồn tại và ghi được. WordPress phải ghi được đường dẫn upload của tenant hiện ở đó.

## Lỗi truy cập

### Liên kết admin của tenant lỗi

Trên **All Tenants**, nhấn **Admin** lần nữa. Liên kết mang access token có hiệu lực 30 phút theo mặc định. Liên kết hết hạn hoặc bị sửa hiện **Invalid or expired admin access token.**

### Quên mật khẩu admin của tenant

Dùng **Lost your password?** trên màn đăng nhập của tenant đó (`https://the-tenant-domain/wp-login.php`).

## Nhờ hỗ trợ

Kèm phiên bản WordPress, phiên bản PHP, tab Status đang hiện lỗi, và những gì bạn đã thử.

- [Diễn đàn hỗ trợ WordPress.org](https://wordpress.org/support/plugin/grabwp-tenancy/)
- Email: hello@grabwp.com
