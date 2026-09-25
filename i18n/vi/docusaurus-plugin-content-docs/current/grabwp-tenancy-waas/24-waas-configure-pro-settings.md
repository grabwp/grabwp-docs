---
title: "Cấu hình Pro Settings"
description: "Đặt isolation, loại database và thư mục mặc định trước khi tạo site"
order: 24
section: waas
---

# Cấu hình Pro Settings

Pro Settings là mặc định khi tạo tenant mới. Từng tenant có thể ghi đè sau.

Vào **Tenancy → Pro Settings** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`).

Trang có các tab: **Isolation**, **Database**, **Directories**, **Symlink**, **Storage**, **Backup**, **Routing**.

Trong hướng dẫn này, đặt **Isolation** và **Database**, xác nhận **Directories**, và để các tab còn lại ở mặc định. Bấm **Save Pro Settings** sau khi sửa.

## Isolation

Mở tab **Isolation**.

![Pro Settings Isolation](../images/pro-settings.png)

**Content Isolation Defaults** quyết định tenant mới được bản sao riêng của phần nào.

| Thiết lập | Lựa chọn cho hướng dẫn | Việc nó làm |
|-----------|------------------------|-------------|
| **Content + Themes Isolation** | Bật | Mỗi tenant mới có thư mục `wp-content` và themes riêng |
| **Plugins Isolation** | Tắt với hầu hết cách dựng | Mỗi tenant mới có thư mục plugins riêng |
| **Uploads Isolation** | Bật | Mỗi tenant mới có thư mục uploads riêng |

> **Tip:** Để **Plugins Isolation** tắt trừ khi tenant cần bộ plugin khác nhau. Plugin dùng chung tốn ít đĩa hơn. Cài plugin và theme theo tenant làm sau, từ màn extensions của tenant đó.

## Database

Mở tab **Database**.

![Pro Settings Database](../images/11-pro-settings-database.png)

**Database Type** là loại được chọn sẵn khi bạn tạo tenant.

| Lựa chọn | Khi nào dùng |
|----------|----------------|
| **Shared Database (with table prefixes)** | Lúc bắt đầu. Tenant dùng chung một database MySQL, tách bằng table prefix. |
| **Isolated MySQL Database** | Mỗi tenant dùng database MySQL riêng. |
| **Isolated SQLite Database** | Mỗi tenant dùng một file SQLite. |

**Cho hướng dẫn này:** chọn **Shared Database (with table prefixes)**.

Nếu chọn **Isolated MySQL Database**, phần **Default MySQL Connection** hiện ra:

| Trường | Ghi chú |
|--------|---------|
| **MySQL Host** | Hostname, ví dụ `localhost` hoặc `localhost:3306` |
| **MySQL Database** | Tên database mặc định |
| **MySQL Username** | User database mặc định |

Các giá trị này được điền sẵn trên form tạo tenant. Mỗi tenant có thể ghi đè.

## Directories

Mở tab **Directories**.

![Pro Settings Directories](../images/grabwp-tenancy-pro-settings-dir.png)

**Directory Configuration** đổi nơi lưu dữ liệu tenant. Để trống để giữ mặc định.

| Trường | Vai trò |
|--------|---------|
| **Tenant Base Dir** | Gốc cho uploads và dữ liệu tenant |
| **Pro Config Dir** | Cấu hình từng tenant. File `config.php` toàn cục nằm ở gốc thư mục này. |
| **SQLite Database Dir** | File SQLite khi dùng **Isolated SQLite Database** |

Mỗi dòng có **Effective:** với đường dẫn đã phân giải. Nếu đường dẫn bị khóa, trường hiện **set in wp-config.php** và không sửa được ở đây.

## Tab có thể để sau

| Tab | Nội dung |
|-----|----------|
| **Symlink** | **Domain Symlink (Clean URLs)**. Cần `symlink()` và đoạn **Required server rules** trên tab đó. Bỏ qua cho đến khi bạn cần URL nội dung gọn. |
| **Storage** | **Default Storage Driver**: **Local Filesystem (default)** hoặc **S3-Compatible Object Storage**. Để local lúc này. Xem [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage). |
| **Backup** | Mặc định đưa backup ra ngoài. Để đến khi bạn cấu hình backup. |
| **Routing** | Tùy chọn path prefix. Hướng dẫn này dùng subdomain trên **Platform Domain**. Để **Routing** ở mặc định. |

## Lưu

Bấm **Save Pro Settings**.

## Kiểm tra

1. **Isolation** hiện đúng các checkbox bạn đã chọn
2. **Database** hiện **Shared Database (with table prefixes)**
3. **Directories** hiện đường dẫn **Effective:** cho mỗi dòng, không có lỗi kiểm tra

---

**Tiếp theo:** [Configure WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general)
