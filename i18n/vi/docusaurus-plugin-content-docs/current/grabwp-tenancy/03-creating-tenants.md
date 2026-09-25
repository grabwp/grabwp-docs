---
title: "Quản lý tenant site"
description: "Tạo, sửa và xóa tenant site"
order: 3
section: tenancy
---

# Quản lý tenant site

Mỗi tenant là một site WordPress riêng trên cài đặt này. Hãy gán cho mỗi tenant một domain riêng.

## Mở danh sách tenant

**Vào Tenancy → All Tenants** (`page=grabwp-tenancy`).

![All Tenants](../images/grabwp-tenancy-pro-tenant-list.png)

Tiêu đề trang là **GrabWP Tenancy**. Dòng giới thiệu là **Manage your multi-tenant WordPress sites.**

| Cột | Ghi chú |
|--------|--------|
| Tenant ID | ID 6 ký tự. Bản cài chính là dòng **Main Site** có ngôi sao. |
| Domains | Domain gắn với tenant đó. **Path access only** nghĩa là chưa có domain. **No domains assigned** nghĩa là mapping trống. |
| Actions | Liên kết dạng icon. Di chuột để thấy nhãn. |

Pro thêm cột **Database**, **Storage**, và **Isolation**. Chữ viết tắt isolation: **WPC** (WP Content), **Th** (Themes), **Plg** (Plugins), **Up** (Uploads).

Tìm bằng **Search by ID or domain...** và **Search**.

### Thao tác trên dòng

| Nhãn | Việc nó làm |
|-------|----------------|
| Visit Site | Mở trang front end. |
| Admin | Mở WordPress admin của tenant. Liên kết kèm access token sống ngắn (mặc định 30 phút). |
| Settings | Mở **Edit Tenant**. |
| Delete | Icon thùng rác. Yêu cầu gõ tenant ID. |

Dòng **Main Site** chỉ có **Visit Site**. Pro thêm **Clone to Tenant** trên dòng đó.

Khi Pro đang bật, dòng tenant còn có **Plugins & Themes**, **Fix URLs**, **Clone Tenant**, **Backup Tenant**, và **Restore Tenant**, chèn trước icon thùng rác. Các màn đó nằm trong phần Pro.

Danh sách trống hiện **No Tenants Found** và **Create Your First Tenant**.

## Tạo tenant

**Vào Tenancy → Add New** (`page=grabwp-tenancy-create`), hoặc nhấn **Add New** trên danh sách.

![Add New Tenant](../images/grabwp-tenancy-pro-tenant-add.png)

1. Trong **Domain Setup**, giữ **I have a domain**.
2. Nhập domain. Placeholder: **Enter domain (e.g. mysite.com)**. Dùng **Clear** hoặc **Remove** trên một dòng. Không kèm `http://` hay `www`.
3. Nhấn **Create Tenant**.

**Cancel** quay lại **All Tenants**.

> **Note:** **I'll set up a domain later** tạo tenant khi chưa có domain công khai. Danh sách hiện **Path access only**. Màn Edit có **Path URL** và nút **Copy** để xem trước tạm thời cho đến khi domain được gắn. Thêm domain và làm [Domain & DNS Setup](/grabwp-tenancy/hosting-dns-setup) trước khi khách dùng site.

Pro thêm **Content Isolation Options**, **Database Configuration**, và **Storage Driver** (chỉ sau khi S3 đã được cấu hình) vào form này. Xem [Database & Content Isolation](/grabwp-tenancy-pro/pro-database-isolation).

**Verify:** ID mới xuất hiện trên **All Tenants** cùng domain bạn đã nhập.

## Sửa domain

Nhấn **Settings** trên dòng, hoặc mở `page=grabwp-tenancy-edit` với tenant đó.

![Edit Tenant](../images/grabwp-tenancy-pro-tenant-edit.png)

Tiêu đề là **Edit Tenant:** cộng tenant ID. Với Pro, các tab phía trên là **Edit**, **Extensions**, **Clone**, **Fix URLs**, **Backup**, **Restore**, **Settings**, **Overrides** (khi được hỗ trợ), **Homepage**, và **WP Admin**.

| Trường | Ghi chú |
|-------|--------|
| Tenant ID | Chỉ đọc. |
| Path URL | Địa chỉ xem trước tạm thời, có **Copy**. Hiện cho đến khi path alias thay thế. |
| Domains | Một ô cho mỗi domain. **Remove** xóa một dòng. **Add New Domain** thêm một dòng. |

Chữ trợ giúp domain: **Valid format: example.com, subdomain.example.com (no http:// or www)**.

Nhấn **Update Tenant**. Thông báo thành công: **Tenant updated successfully.**

Một site có thể trả lời trên nhiều domain (ví dụ `www` và apex). Thêm từng domain ở đây, rồi trỏ mỗi domain về thư mục WordPress này trong hosting và DNS.

> **Note:** Khách nên dùng domain bạn thêm ở đây. **Path URL** chỉ là bản xem trước trước khi domain được gắn.

## Xóa tenant

> **Warning:** Xóa sẽ gỡ bảng cơ sở dữ liệu và upload của tenant đó. Không hoàn tác được.

1. Nhấn icon thùng rác trên dòng.
2. Khi được hỏi **To confirm deletion, type the tenant ID:**, nhập đúng ID.
3. Nhập sai sẽ hiện **Incorrect tenant ID. Deletion cancelled.**

**Verify:** Sau khi sửa, cột **Domains** khớp những gì bạn đã lưu. Sau khi xóa, ID không còn trên danh sách.
