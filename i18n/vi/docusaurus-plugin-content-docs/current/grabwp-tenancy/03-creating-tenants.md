---
title: "Quản lý tenant site"
description: "Tạo, chỉnh sửa và xóa tenant site"
order: 4
section: base
---

# Quản lý tenant site

## Tạo site mới

1. Vào **GrabWP Tenancy → Tenants**
2. Nhấn **Add New**
3. Chọn **"I have a domain"** để nhập domain ngay, hoặc **"I'll set up a domain later"** để dùng định tuyến theo path ngay lập tức
4. Nhấn **Create**

![Add New Tenant — thêm domain ngay hoặc sau](../images/grabwp-tenancy-pro-tenant-add.png)

Hệ thống sẽ gán một ID gồm 6 ký tự duy nhất (ví dụ: `abc123`) và tự động tạo bảng cơ sở dữ liệu cùng thư mục upload.

## Truy cập tenant site

Sau khi tạo, tìm site trong danh sách tenant. Mỗi dòng hiển thị các biểu tượng thao tác:

![Danh sách tenant với các thao tác theo dòng (visit, admin, edit, delete)](../images/grabwp-tenancy-pro-tenant-list.png)

| Biểu tượng | Thao tác |
|------|--------|
| Home | Mở site (giao diện người dùng) |
| Dashboard | Mở trang quản trị WordPress của tenant |
| Edit | Chỉnh sửa cài đặt domain |
| Trash | Xóa site |

Với tenant dùng domain riêng, khi nhấn **biểu tượng Dashboard**, trang quản trị của tenant sẽ mở kèm token bảo mật được chèn tự động, không cần nhập mật khẩu. Với tenant chỉ dùng path, hệ thống sẽ mở trực tiếp URL quản trị theo path.

## Truy cập bằng URL theo path

Mọi tenant site đều có thể truy cập bằng URL theo path, không cần domain:

```
https://yoursite.com/site/{tenant-id}
```

ID tenant được hiển thị trong trang Edit tại mục **Path URL**.

## Chỉnh sửa tenant site

Nhấn **biểu tượng Edit** để:
- Xem URL theo path (kèm nút copy)
- Thêm hoặc xóa domain tùy chỉnh

![Chỉnh sửa tenant — URL theo path và các domain](../images/grabwp-tenancy-pro-tenant-edit.png)

## Thêm nhiều domain hơn

Một site có thể phản hồi trên nhiều domain khác nhau (ví dụ: `www.site.com` và `site.com`):

1. Nhấn **Edit** trên site
2. Thêm các domain bổ sung
3. Lưu lại, sau đó cấu hình các domain mới trong control panel hosting của bạn

## Xóa site

> ⚠ **Cảnh báo:** Xóa site sẽ xóa vĩnh viễn toàn bộ dữ liệu của site. Các bảng cơ sở dữ liệu và file upload không thể khôi phục.

1. Nhấn **biểu tượng Trash** trên site
2. Hệ thống sẽ yêu cầu bạn nhập ID của site để xác nhận
3. Nhập chính xác ID, việc xóa chỉ tiếp tục nếu ID khớp

## Lưu ý về quản trị tenant

- Để đặt lại mật khẩu admin của tenant: dùng liên kết "Forgot Password" trên trang đăng nhập của tenant site
- Nếu tenant cần tự quản lý cài đặt plugin của họ: họ có thể kích hoạt plugin GrabWP Tenancy từ trang Plugins của riêng họ
