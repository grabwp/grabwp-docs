---
title: "Thiết lập mẫu giao diện"
description: "Tạo mẫu site với tag, giới hạn gói và ảnh thu nhỏ cho thư viện của khách hàng"
order: 28
section: waas
---

# Thiết lập mẫu giao diện

Mẫu giao diện là các thiết kế site dựng sẵn mà khách hàng chọn trong quá trình đăng ký. Mỗi mẫu là một bản chụp của một site tenant hiện có — theme, nội dung, cài đặt và mọi thứ.

Điều hướng đến **WaaS → Templates** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-templates`).

![Danh sách mẫu](../images/waas-templates-list.png)

## Cách mẫu hoạt động

```
1. Bạn tạo một site tenant và thiết kế nó
2. Bạn đăng ký tenant đó làm một mẫu
3. Khách hàng duyệt các mẫu trong quá trình đăng ký
4. Khi một khách hàng đăng ký, site mới của họ được nhân bản từ mẫu
```

Mẫu được lưu dưới dạng tham chiếu đến các site tenant hiện có, không phải bản sao riêng biệt. Tenant của mẫu phải luôn ở trạng thái active.

## Bước 1: Tạo một tenant cho mẫu của bạn

Trước khi tạo một mẫu, bạn cần một site tenant để dùng làm nguồn.

1. Vào **Tenancy → Add New**
2. Tạo một tenant mới (ví dụ: slug: `template-starter`, domain: `template-starter.yoursaas.com`)
3. Truy cập trang quản trị WordPress của tenant và thiết kế site:
   - Cài đặt và cấu hình một theme
   - Thêm nội dung demo (trang, bài viết, media)
   - Thiết lập menu, widget và nhận diện site
   - Cấu hình bất kỳ plugin nào bạn muốn đưa vào

> **Mẹo:** Dành thời gian làm cho site này trông thật chỉn chu — mỗi khách hàng chọn mẫu này sẽ bắt đầu với một bản sao y hệt.

## Bước 2: Tạo một mẫu

1. Vào **WaaS → Templates**
2. Nhấn **Add New Template**

![Form chỉnh sửa mẫu](../images/waas-template-edit.png)

Điền vào:

| Trường | Giá trị | Ghi chú |
|-------|-------|-------|
| **Source Tenant** | Chọn tenant bạn đã thiết kế | Chỉ hiển thị khi tạo, không thể chỉnh sửa sau đó |
| **Template Name** | `Starter Blog` | Tên hiển thị trong thư viện mẫu |
| **Slug** | `starter-blog` | Định danh an toàn cho URL. Chỉ chữ thường, số, dấu gạch ngang. |
| **Tags** | Chọn hoặc gõ tag | Để lọc trong thư viện. Xem thiết lập tag bên dưới. |
| **Allowed Plans** | Bỏ trống để dùng cho mọi gói | Đánh dấu các gói cụ thể để giới hạn mẫu này chỉ cho người dùng trả phí |
| **Price** | `0` | Tùy chọn — tính phí thêm cho mẫu cao cấp |
| **Active** | Đánh dấu | Mẫu xuất hiện trong thư viện |

3. Tải lên một **Thumbnail** — ảnh chụp màn hình hoặc bản mockup của mẫu. Kích thước khuyến nghị: 1280×960px.
4. Tùy chọn thêm một **Preview URL** — liên kết trực tiếp mà khách hàng có thể nhấn để xem mẫu hoạt động.
5. Nhấn **Save Template**

## Thiết lập Tag

Tag cho phép khách hàng lọc thư viện mẫu theo danh mục, ngành nghề hoặc tính năng.

### Tạo nhóm Tag

1. Vào **WaaS → Settings → Tags**
2. Nhấn **Add Tag Group**
3. Tạo các nhóm như:
   - `industry` — Restaurant, Portfolio, Blog, E-commerce
   - `builder` — Elementor, Gutenberg, Beaver Builder
   - `feature` — WooCommerce, Multilingual, Membership

### Tạo Tag

Trong mỗi nhóm, tạo các tag riêng lẻ:

1. Nhấn **Add Tag** bên trong một nhóm
2. Đặt **Name** (hiển thị) và **Slug** (định danh an toàn cho URL)
3. Lưu

### Gán Tag cho mẫu

Khi chỉnh sửa một mẫu, chọn tag từ danh sách thả xuống. Mẫu có thể có tag từ nhiều nhóm.

## Kiểm soát bộ lọc thư viện

Shortcode trình duyệt mẫu kiểm soát nhóm tag nào xuất hiện dưới dạng nút lọc (pill) hay danh sách thả xuống. Xem [Tham chiếu Shortcode](/vi/grabwp-tenancy-waas/waas-shortcode-templates) để biết mọi tùy chọn.

## Quy trình nhân bản mẫu

Khi một khách hàng chọn một mẫu và hoàn tất đăng ký, WaaS nhân bản tenant của mẫu:

1. **Validate** — kiểm tra tenant nguồn khỏe mạnh
2. **Export** — xuất database tenant nguồn
3. **Import** — nhập vào database tenant mới
4. **Copy uploads** — sao chép file media
5. **Symlink extensions** — liên kết plugin và theme
6. **Fix URLs** — cập nhật mọi URL sang domain tenant mới
7. **Cleanup** — hoàn tất và kích hoạt

Quy trình này thường mất 10–30 giây tùy vào kích thước mẫu.

---

**Tiếp theo:** [Thiết lập trang Frontend](/vi/grabwp-tenancy-waas/waas-setup-frontend-pages)
