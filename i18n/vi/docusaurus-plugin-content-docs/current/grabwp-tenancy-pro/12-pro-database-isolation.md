---
title: "Database và cô lập nội dung"
description: "Chọn kiểu database và tùy chọn isolation cho từng tenant"
order: 12
section: pro
---

# Database và cô lập nội dung

Đặt mặc định cho tenant mới trong **Pro Settings**, rồi chỉnh một tenant trên **Add New** hoặc **Edit**.

## Đặt mặc định

**Vào Tenancy → Pro Settings** (`page=grabwp-tenancy-pro-settings`).

### Isolation

![Pro Settings, Isolation](../images/grabwp-tenancy-pro-settings-isolation.png)

**Content Isolation Defaults** áp dụng khi bạn tạo tenant.

| Trường | Ghi chú |
|-------|--------|
| Content + Themes Isolation | **Enable content and themes isolation by default for new tenants**. Thư mục `wp-content` và themes riêng. |
| Plugins Isolation | **Enable plugins isolation by default for new tenants**. Thư mục plugins riêng. |
| Uploads Isolation | **Enable uploads isolation by default for new tenants**. Thư mục uploads riêng. |

### Database

![Pro Settings, Database](../images/11-pro-settings-database.png)

**Database Defaults** đặt **Database Type** cho tenant tiếp theo:

| Tùy chọn | Ghi chú |
|--------|--------|
| Shared Database (with table prefixes) | Cùng database MySQL với site chính, table prefix riêng. |
| Isolated MySQL Database | Database MySQL riêng. Hiện **Default MySQL Connection**. |
| Isolated SQLite Database | File SQLite cho tenant đó. Thư viện đi kèm Pro. |

**Default MySQL Connection** (chỉ khi chọn **Isolated MySQL Database**): **MySQL Host**, **MySQL Database**, **MySQL Username**. Các giá trị này được điền sẵn trên **Add New Tenant**. Mật khẩu nhập theo từng tenant, không lưu làm mặc định toàn cục trên màn này.

Nhấn **Save Pro Settings**.

Đường dẫn thư mục cho file tenant, gồm **SQLite Database Dir**, nằm ở tab **Directories**. Xem [Pro Settings](/grabwp-tenancy-pro/pro-settings).

## Đặt tùy chọn cho một tenant

**Vào Tenancy → Add New** (`page=grabwp-tenancy-create`) hoặc mở **Edit** của tenant có sẵn (`page=grabwp-tenancy-edit`).

![Edit Tenant, isolation và database](../images/grabwp-tenancy-pro-tenant-edit.png)

### Content Isolation Options

| Checkbox | Khi bật |
|----------|----------------|
| Content + Themes Isolation | Thư mục content và themes riêng. Theme phải được cài sau (Extensions). |
| Plugins Isolation | Thư mục plugins riêng. Plugin phải được cài sau. |
| Uploads Isolation | Thư mục uploads riêng. |

Mục không chọn sẽ dùng đường dẫn WordPress chính.

### Database Configuration

| Tùy chọn | Ghi chú |
|--------|--------|
| Shared Database (with table prefixes) | MySQL dùng chung, cô lập bằng prefix. |
| Isolated MySQL Database | Hiện **MySQL Host**, **Database Name**, **Username**, **Password**, và **Test Connection**. Khi sửa, để trống **Password** để giữ mật khẩu hiện tại. |
| Isolated SQLite Database | File SQLite. Chữ trợ giúp: **Uses SQLite database file for lightweight, portable storage.** |

Nhấn **Test Connection** trước **Create Tenant** hoặc **Update Tenant** khi dùng MySQL tách biệt.

### Storage Driver

**Storage Driver** chỉ hiện sau khi S3 được cấu hình trong **Pro Settings → Storage**.

| Tùy chọn | Ghi chú |
|--------|--------|
| Local Filesystem | Upload nằm trên máy chủ này. |
| S3-Compatible Object Storage | Upload mới vào bucket đã cấu hình. |

Với tenant có sẵn, **Saving a different driver does NOT move existing files.** Nhấn **Migrate uploads now** để sao chép file trước khi đổi. Chuyển từ S3 sang local mà không migrate sẽ làm hỏng media hiện có.

**Verify:** Trên **All Tenants**, huy hiệu **Database** khớp kiểu bạn đã lưu (**Shared MySQL**, **Isolated MySQL**, hoặc **Isolated SQLite**), và **Isolation** hiện các nhãn ngắn bạn đã bật (**WPC**, **Th**, **Plg**, **Up**).

Bản sao theo tenant của các checkbox **Settings** toàn cục nằm ở [Tenant Settings & Overrides](/grabwp-tenancy-pro/pro-tenant-settings).
