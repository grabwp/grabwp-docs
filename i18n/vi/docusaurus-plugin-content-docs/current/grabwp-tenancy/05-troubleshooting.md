---
title: "Khắc phục sự cố"
description: "Các vấn đề thường gặp và cách xử lý"
order: 6
section: base
---

# Khắc phục sự cố

## Trước tiên: kiểm tra trang Status

Vào **GrabWP Tenancy → Status**. Trang này sẽ tự động kiểm tra tất cả thành phần của plugin và cung cấp nút **Auto Fix** cho hầu hết các lỗi phổ biến.

---

## Sự cố plugin

### Menu "Tenancy" không xuất hiện trong trang quản trị WordPress
Vào **GrabWP Tenancy → Status** và kiểm tra các dòng **wp-config.php Loader** và **MU-Plugin**. Dùng **Auto Fix** nếu một trong hai hiển thị cảnh báo hoặc lỗi.

### Gặp lỗi sau khi kích hoạt
Dùng trang Status để kiểm tra tất cả thành phần. Nếu lỗi vẫn còn, hãy tắt plugin. Website sẽ quay lại trạng thái trước đó và không có dữ liệu tenant nào bị xóa.

---

## Sự cố domain

### Site không tải hoặc hiển thị sai trang
- Xác nhận domain đã được thêm trong control panel hosting
- Xác nhận DNS đang trỏ về máy chủ của bạn bằng [dnschecker.org](https://dnschecker.org)
- Chờ DNS cập nhật, có thể mất đến 24 giờ
- Xóa cache trình duyệt và thử lại ở chế độ ẩn danh

### Lỗi "Domain already in use"
Mỗi domain chỉ có thể được gán cho một tenant site. Hãy kiểm tra danh sách tenant, gỡ domain khỏi site đang dùng nó rồi gán lại.

### Lỗi "Invalid domain format"
Hãy dùng định dạng chuẩn: `example.com` hoặc `sub.example.com`. Không dùng địa chỉ IP, `localhost` hoặc ký tự đặc biệt.

---

## Sự cố nội dung

### Tenant site hiển thị nội dung của site chính
1. Tắt plugin rồi kích hoạt lại
2. Kiểm tra trang Status xem có lỗi nào không
3. Xóa toàn bộ cache: trình duyệt, plugin cache của WordPress và cache hosting/CDN

### Upload media thất bại
Kiểm tra **GrabWP Tenancy → Status → Base Plugin Status**. Thư mục upload phải được liệt kê tại đó. Đồng thời xác nhận WordPress có quyền ghi vào thư mục `wp-content/uploads/`.

---

## Sự cố truy cập

### Không đăng nhập được vào tenant site
Tạo token truy cập mới tại **GrabWP Tenancy → Tenants → Get Token**. Token hết hạn sau 24 giờ.

### Quên mật khẩu admin của tenant
Dùng liên kết "Forgot Password" trên trang đăng nhập của tenant site (`yourdomain.com/wp-login.php`).

---

## Nhận hỗ trợ

Khi liên hệ hỗ trợ, hãy gửi kèm:
- Phiên bản WordPress
- Phiên bản PHP
- Thông báo lỗi trong trang Status
- Các bước bạn đã thử

**Kênh hỗ trợ:**
- [Diễn đàn hỗ trợ WordPress](https://wordpress.org/support/plugin/grabwp-tenancy/)
- Email: hello@grabwp.com
