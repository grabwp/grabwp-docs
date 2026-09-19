---
title: "Checklist trước khi ra mắt"
description: "Kiểm tra DNS, SSL, billing, templates và toàn bộ quá trình signup trước khi mở cho khách hàng"
order: 30
section: waas
---

# Checklist trước khi ra mắt

Trước khi mở nền tảng WaaS cho khách hàng thật, hãy kiểm tra theo checklist này để đảm bảo mọi thứ hoạt động trơn tru từ đầu đến cuối.

## Kiểm tra cài đặt

- [ ] **Platform Domain** đã được thiết lập và wildcard DNS (`*.yoursaas.com`) trỏ về server của bạn
- [ ] **SSL certificate** đã bao gồm các subdomain dạng wildcard (`*.yoursaas.com`)
- [ ] Các trang **Signup, Dashboard, Templates** đã được tạo và liên kết trong WaaS → Settings → General
- [ ] **Ít nhất một plan** đang hoạt động (WaaS → Settings → Plans)
- [ ] **Ít nhất một template** đang hoạt động (WaaS → Templates)
- [ ] **Billing provider** đã được bật và trạng thái hiển thị "Active" (cho các plan trả phí)
- [ ] **Auth mode** đã được thiết lập (khuyên dùng WaaS Auth cho self-service)

## Kiểm tra luồng signup

Hãy đi qua toàn bộ trải nghiệm của khách hàng:

### Đăng ký plan miễn phí

1. Mở trang signup của bạn (ví dụ: `https://yoursaas.com/signup/`) trong cửa sổ ẩn danh (incognito/private)
2. Chọn plan **Free**
3. Chọn một template
4. Nhập site slug (ví dụ: `test-free`) và địa chỉ email
5. Hoàn tất xác thực OTP (kiểm tra email của bạn hoặc Mailpit ở môi trường dev)
6. Đợi quá trình provisioning hoàn tất
7. Kiểm tra xem tenant site có tải đúng ở `test-free.yoursaas.com` không

### Đăng ký plan trả phí

1. Mở trang signup trong một cửa sổ ẩn danh mới
2. Chọn plan **Pro**
3. Chọn một template
4. Nhập site slug và email
5. Hoàn tất thanh toán qua trang checkout của Polar
6. Kiểm tra xem webhook đã nhận được chưa (kiểm tra trong WaaS → Settings → Billing → "Last webhook received")
7. Kiểm tra xem tenant site đã được provision thành công chưa

### Truy cập dashboard

1. Vào trang dashboard của bạn (ví dụ: `https://yoursaas.com/dashboard/`)
2. Đăng nhập bằng email đã dùng khi signup
3. Kiểm tra xem bạn có thấy các phần sau không:
   - Site overview kèm link vào trang admin của tenant
   - Thông tin subscription
   - Phần quản lý tên miền (domain)
   - Thiết lập tài khoản (account settings)

## Gửi email

- [ ] Gửi thành công email OTP (nhớ kiểm tra thư mục spam)
- [ ] Sử dụng một SMTP plugin thực thụ trên production (không dùng mặc định của `wp_mail()`)
- [ ] Test thử với một địa chỉ email bình thường (không phải email dev)

> **Môi trường dev:** Sử dụng Mailpit (`http://yourserver:8025/`) để bắt tất cả các email thay vì gửi thật.

## Thư viện template

1. Truy cập vào trang templates
2. Kiểm tra xem tất cả các template đang active có hiển thị ảnh thumbnail không
3. Test xem bộ lọc tag có hoạt động đúng không
4. Test tính năng tìm kiếm
5. Click "Preview" trên một template để kiểm tra xem bản preview có load đúng không

## Hiệu suất

- [ ] Trang signup load dưới 3 giây
- [ ] Thư viện template hiển thị mượt mà với số lượng template bạn có
- [ ] Quá trình provisioning hoàn tất trong thời gian hợp lý (thường là 10-30 giây)

## Bảo mật

- [ ] HTTPS hoạt động trên site chính
- [ ] HTTPS hoạt động trên các subdomain của tenant
- [ ] Các trang admin không cho phép người dùng không có quyền admin truy cập
- [ ] API keys được tạo và lưu giữ an toàn (không bị lộ ra frontend)
- [ ] File `wp-config.php` không thể bị truy cập công khai

## Dọn dẹp

Sau khi test xong:

1. Xóa các tenant site test đã tạo trong quá trình kiểm tra (Tenancy → All Tenants → Delete)
2. Kiểm tra xem các test subscription đã được dọn sạch chưa
3. Nếu dùng Polar sandbox để test, hãy chuyển sang production API URL và tạo các product thật

## Sẵn sàng lên production

| Hạng mục | Trạng thái |
|------|--------|
| Cấu hình wildcard DNS | |
| Kích hoạt wildcard SSL | |
| Cấu hình SMTP email | |
| Production key của Polar (không dùng sandbox) | |
| Chiến lược backup cho main site | |
| Giám sát/kiểm tra uptime | |
| Đã tạo trang Điều khoản dịch vụ (Terms of Service) | |
| Đã tạo trang Chính sách bảo mật (Privacy Policy) | |

---

**Tiếp theo:** [Quản lý custom domains](/grabwp-tenancy-waas/waas-managing-domains)
