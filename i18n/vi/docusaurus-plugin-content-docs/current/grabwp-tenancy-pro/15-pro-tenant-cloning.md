---
title: "Clone tenant"
description: "Sao chép một tenant hoặc site chính sang tenant khác"
order: 15
section: pro
---

# Clone tenant

Clone sao chép database, extension, và upload của tenant nguồn vào tenant đích, rồi cập nhật URL của site. Bạn có thể clone vào tenant đã có, hoặc tạo tenant đích trong cùng quy trình.

Dữ liệu hiện tại của đích bị thay thế.

## Mở Clone

**Vào Tenancy → All Tenants**, rồi **Clone Tenant** trên dòng nguồn (`page=grabwp-tenancy-pro-clone`).

Trên dòng **Main Site** có ngôi sao, thao tác là **Clone to Tenant**. Tiêu đề trang lúc đó là **Clone Main Site**. Với nguồn khác, tiêu đề là **Clone Tenant:** cộng tenant ID.

![Clone Tenant](../images/grabwp-tenancy-pro-tenant-clone.png)

Trang hiện **Source database type:** **Shared MySQL**, **Isolated MySQL**, hoặc **Isolated SQLite**.

Trong **Choose clone target:**

| Lựa chọn | Điều xảy ra |
|--------|----------------|
| Clone to existing site | Chọn **Target Tenant**. Danh sách tải các tenant hợp lệ. Khi trống: **No eligible tenants found**. |
| Clone to new site | Chuyển sang **Add New Tenant**. Thông báo nói bạn sẽ được chuyển để clone nguồn vào tenant mới. Nút là **Create Tenant & Clone**. |

Với đích đã có, phần tóm tắt hiện **Tenant ID**, **Domains**, **Database Type**, và **Uploads**.

> **Warning:** **This will overwrite all data in the target tenant (database, uploads, extensions). This action cannot be undone.**

Nhấn **Clone Tenant**. Xác nhận **Are you sure? All data in the target tenant will be overwritten.**

Giữ tab trình duyệt mở. Các bước:

| Bước | Việc xảy ra |
|------|----------------|
| 1. Validating source & target tenants | Kiểm tra cả hai phía |
| 2. Exporting source database | Xuất database nguồn |
| 3. Importing database into target tenant | Nhập vào đích, kể cả khi khác kiểu database |
| 4. Symlinking extensions | Liên kết plugin và theme khi isolation cho phép |
| 5. Updating site URLs | Viết lại URL đã lưu cho đích |
| 6. Copying uploads | Sao chép upload (đổi nếu storage driver khác) |
| 7. Cleaning up | Xóa file tạm |

Thành công: **Clone complete!** và **The source tenant data has been cloned into the target tenant.** Liên kết: **Edit tenant**, **Homepage**, **Dashboard**.

**Cancel** hoặc **Back to Tenants** thoát mà không clone.

## Sau khi clone

- Mở **Homepage** và kiểm tra theme, plugin, và nội dung.
- Nếu URL media vẫn trỏ domain nguồn, mở **Fix URLs** trên đích. Xem [Fix URLs](/grabwp-tenancy-pro/pro-fix-urls).
- Đích giữ database riêng. Sửa sau này trên một site không đổi site kia.

**Verify:** Dòng đích trên **All Tenants** vẫn có tenant ID và domain riêng, và **Homepage** hiện nội dung đã clone.
