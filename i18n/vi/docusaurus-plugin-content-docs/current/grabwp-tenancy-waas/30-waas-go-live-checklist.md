---
title: "Danh sách kiểm tra Go-Live"
description: "Xác minh DNS, SSL, thanh toán, mẫu giao diện và toàn bộ luồng đăng ký trước khi mở cho khách hàng"
order: 30
section: waas
---

# Danh sách kiểm tra Go-Live

Trước khi mở nền tảng WaaS cho khách hàng thực, hãy thực hiện danh sách kiểm tra này để xác minh mọi thứ hoạt động xuyên suốt từ đầu đến cuối.

## Xác minh cài đặt

- [ ] **Platform Domain** đã được đặt và DNS wildcard (`*.yoursaas.com`) phân giải tới server của bạn
- [ ] **Chứng chỉ SSL** bao phủ các subdomain wildcard (`*.yoursaas.com`)
- [ ] Các trang **Signup, Dashboard, Templates** đã được tạo và liên kết trong WaaS → Settings → General
- [ ] Có **ít nhất một gói dịch vụ** đang active (WaaS → Settings → Plans)
- [ ] Có **ít nhất một mẫu giao diện** đang active (WaaS → Templates)
- [ ] **Nhà cung cấp thanh toán** được bật và trạng thái hiển thị "Active" (đối với gói trả phí)
- [ ] **Chế độ xác thực** đã được đặt (nên dùng WaaS Auth cho mô hình tự phục vụ)

## Kiểm thử luồng đăng ký

Thực hiện toàn bộ trải nghiệm của khách hàng:

### Đăng ký gói miễn phí

1. Mở trang đăng ký của bạn (ví dụ: `https://yoursaas.com/signup/`) trong cửa sổ trình duyệt ẩn danh/riêng tư
2. Chọn gói **Free**
3. Chọn một mẫu giao diện
4. Nhập slug site (ví dụ: `test-free`) và địa chỉ email
5. Hoàn tất xác minh OTP (kiểm tra email hoặc Mailpit trong môi trường dev)
6. Chờ quá trình khởi tạo hoàn tất
7. Xác minh site tenant tải tại `test-free.yoursaas.com`

### Đăng ký gói trả phí

1. Mở trang đăng ký trong một cửa sổ ẩn danh mới
2. Chọn gói **Pro**
3. Chọn một mẫu giao diện
4. Nhập slug site và email
5. Hoàn tất thanh toán qua Polar checkout
6. Xác minh webhook đã được nhận (kiểm tra WaaS → Settings → Billing → "Last webhook received")
7. Xác minh site tenant đã được khởi tạo

### Truy cập Dashboard

1. Vào trang Dashboard của bạn (ví dụ: `https://yoursaas.com/dashboard/`)
2. Đăng nhập bằng email đã dùng khi đăng ký
3. Xác minh bạn có thể thấy:
   - Tổng quan site kèm liên kết tới trang quản trị tenant
   - Chi tiết subscription
   - Phần quản lý tên miền
   - Cài đặt tài khoản

## Gửi email

- [ ] Email OTP được gửi đến (kiểm tra thư mục spam)
- [ ] Dùng plugin SMTP thực tế trong môi trường production (không dùng mặc định `wp_mail()`)
- [ ] Kiểm thử với một địa chỉ email không thuộc môi trường dev

> **Môi trường dev:** Dùng Mailpit (`http://yourserver:8025/`) để nhận tất cả email mà không gửi thật.

## Thư viện mẫu giao diện

1. Truy cập trang Templates
2. Xác minh tất cả mẫu đang active hiển thị cùng ảnh thu nhỏ
3. Kiểm thử các bộ lọc tag hoạt động chính xác
4. Kiểm thử chức năng tìm kiếm
5. Nhấn "Preview" trên một mẫu — xác minh bản xem trước tải được

## Hiệu năng

- [ ] Trang Signup tải trong chưa đến 3 giây
- [ ] Thư viện mẫu xử lý mượt mà số lượng mẫu của bạn
- [ ] Quá trình khởi tạo hoàn tất trong thời gian hợp lý (thường là 10–30 giây)

## Bảo mật

- [ ] HTTPS hoạt động trên site chính
- [ ] HTTPS hoạt động trên các subdomain tenant
- [ ] Các trang quản trị không thể truy cập bởi người không phải admin
- [ ] API key được tạo và lưu trữ an toàn (không lộ ở frontend)
- [ ] Không thể truy cập công khai `wp-config.php`

## Dọn dẹp

Sau khi kiểm thử:

1. Xóa các site tenant thử nghiệm đã tạo trong lúc kiểm thử (Tenancy → All Tenants → Delete)
2. Xác minh các subscription thử nghiệm đã được dọn dẹp
3. Nếu dùng Polar sandbox để kiểm thử, hãy chuyển sang URL API production và tạo sản phẩm thực

## Sẵn sàng cho production

| Hạng mục | Trạng thái |
|------|--------|
| Đã cấu hình DNS wildcard | |
| SSL wildcard đang active | |
| Đã cấu hình email SMTP | |
| Polar production keys (không phải sandbox) | |
| Chiến lược sao lưu cho site chính | |
| Giám sát/kiểm tra uptime | |
| Đã tạo trang Điều khoản dịch vụ | |
| Đã tạo trang Chính sách quyền riêng tư | |

---

**Tiếp theo:** [Quản lý tên miền riêng](/vi/grabwp-tenancy-waas/waas-managing-domains)
