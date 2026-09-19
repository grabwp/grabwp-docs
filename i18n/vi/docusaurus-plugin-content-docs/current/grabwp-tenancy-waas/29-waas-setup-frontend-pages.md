---
title: "Thiết lập các trang frontend"
description: "Tạo các trang signup, dashboard, và duyệt template bằng shortcode hoặc block Gutenberg"
order: 29
section: waas
---

# Thiết lập các trang frontend

Nền tảng WaaS của bạn cần ba trang hiển thị cho khách hàng: **Signup**, **Dashboard**, và **Templates**. Mỗi trang có thể sử dụng shortcode hoặc block Gutenberg.

## Thiết lập nhanh (tạo tự động)

Cách nhanh nhất: vào **WaaS → Settings → General** và nhấp vào nút **Create/Repair Signup and Dashboard Pages**. Thao tác này sẽ tạo cả ba trang với đúng các shortcode cần thiết.

Sau đó, chọn từng trang trong dropdown tương ứng và lưu cài đặt.

## Thiết lập thủ công

### Cách A: Sử dụng shortcode

Tạo ba trang WordPress với các shortcode sau:

#### 1. Trang Signup

Tạo một trang mới (ví dụ, tiêu đề: "Signup", slug: `/signup/`).

Thêm shortcode này vào nội dung trang:

```
[grabwp_waas_signup]
```

Shortcode này sẽ render toàn bộ quy trình đăng ký:
- Chọn plan
- Bộ chọn template (nếu có template)
- Form điền thông tin site (subdomain, email)
- Chuyển hướng thanh toán (cho các plan trả phí)
- Trạng thái provisioning

#### 2. Trang Dashboard

Tạo một trang mới (ví dụ, tiêu đề: "Dashboard", slug: `/dashboard/`).

```
[grabwp_waas_dashboard]
```

Shortcode này render dashboard cho chủ sở hữu tenant:
- Tổng quan về site và các liên kết nhanh
- Trạng thái subscription và thanh toán
- Quản lý custom domain
- Backup và restore
- Cài đặt tài khoản (email, mật khẩu)

#### 3. Trang Templates

Tạo một trang mới (ví dụ, tiêu đề: "Templates", slug: `/templates/`).

```
[grabwp_waas_templates]
```

Shortcode này render thư viện template bao gồm:
- Các thẻ template với thumbnail và mô tả
- Lọc theo tag (dạng pill hoặc dropdown)
- Tìm kiếm
- Phân trang
- Nút xem trước và "Sử dụng template này"

> **Tuỳ biến trình duyệt template** với các thuộc tính shortcode. Xem [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates) để biết tất cả tuỳ chọn.

Các cấu hình phổ biến:

```
// Show all templates, default filters
[grabwp_waas_templates]

// Show 9 templates per page, industry tags as pills
[grabwp_waas_templates per-page="9" filter-tags="industry"]

// Curated gallery, no filters, no pagination
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

### Cách B: Sử dụng block Gutenberg

Nếu bạn thích dùng block editor hơn, hãy sử dụng các block Gutenberg thay cho shortcode.

#### 1. Block Signup

1. Chỉnh sửa trang Signup của bạn
2. Nhấp vào **+** (block inserter) và tìm kiếm **"WaaS Signup"**
3. Chèn block này vào trang
4. Lưu trang

#### 2. Block Dashboard

1. Chỉnh sửa trang Dashboard của bạn
2. Tìm kiếm **"WaaS Dashboard"**
3. Chèn block vào trang (hỗ trợ căn lề wide và full-width)
4. Lưu lại

#### 3. Block duyệt template

1. Chỉnh sửa trang Templates của bạn
2. Tìm kiếm **"GrabWP Template Browser"**
3. Chèn block
4. Cấu hình qua **Settings sidebar** (nhấp vào biểu tượng bánh răng):

| Điều khiển | Chức năng |
|---------|-------------|
| **Limit by tags** | Lọc từ phía server (chỉ tải các template có các tag này) |
| **Show tag browser toolbar** | Bật/tắt thanh công cụ lọc |
| **Pill filter groups** | Chọn nhóm tag nào hiển thị dạng nút pill thay vì dropdown |
| **Cards per page** | Số lượng template trên mỗi trang (0 = hiển thị tất cả) |

5. Lưu trang

> **Lưu ý:** Các block chỉ hiển thị dạng placeholder trong editor. Toàn bộ thư viện sẽ chỉ render ở frontend.

Xem [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough) để biết chi tiết cách dùng block.

## Liên kết các trang trong phần cài đặt WaaS

Sau khi tạo trang, bạn cần kết nối chúng:

1. Vào **WaaS → Settings → General**
2. Cài đặt từng dropdown:
   - **Signup Page** → trang Signup của bạn
   - **Dashboard Page** → trang Dashboard của bạn
   - **Templates Page** → trang Templates của bạn
3. Nhấp vào **Save Settings**

![Cấu hình các trang](../images/waas-pages-config.png)

## So sánh shortcode và block

| Tính năng | Shortcode | Block |
|---------|-----------|-------|
| **Độ dễ sử dụng** | Dán đoạn text shortcode | Chèn từ visual editor |
| **Cấu hình** | Dùng thuộc tính trong chuỗi shortcode | Dùng các tùy chọn ở sidebar Inspector |
| **Xem trước trong editor** | Hiển thị text shortcode | Hiển thị placeholder |
| **Kết quả frontend** | Giống hệt nhau | Giống hệt nhau |
| **Tương thích theme** | Hoạt động ở mọi nơi | Cần theme hỗ trợ block |

Cả hai cách đều tạo ra kết quả frontend giống nhau. Hãy chọn cách nào bạn thấy thoải mái hơn.

## Kiểm tra các trang

Sau khi thiết lập, hãy truy cập từng trang trên frontend:

1. **Trang Signup**: hiển thị phần chọn plan và form đăng ký
2. **Trang Templates**: hiển thị thư viện template với các template của bạn
3. **Trang Dashboard**: hiển thị form đăng nhập/OTP (khi chưa đăng nhập) hoặc dashboard (khi đã đăng nhập)

---

**Tiếp theo:** [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist)
