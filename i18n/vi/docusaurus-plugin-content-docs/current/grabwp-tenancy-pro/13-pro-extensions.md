---
title: "Plugin và theme theo site"
description: "Cài và kích hoạt plugin, theme cho một tenant"
order: 13
section: pro
---

# Plugin và theme theo site

Mỗi tenant có thể có plugin và theme riêng khi isolation được bật cho site đó.

## Bật isolation

1. Mở tenant: **Tenancy → All Tenants**, rồi **Settings** trên dòng (`page=grabwp-tenancy-edit`).
2. Bật **Plugins Isolation** và/hoặc **Content + Themes Isolation**.
3. Nhấn **Update Tenant**.

Không có **Plugins Isolation**, bảng Plugins hiện **Plugins Isolation is disabled for this tenant. Enable it in the tenant edit form to manage plugins here.** Không có **Content + Themes Isolation**, bảng Themes hiện **Content + Themes Isolation is disabled for this tenant. Enable it in the tenant edit form to manage themes here.**

## Mở Extensions

**Vào Tenancy → All Tenants**, rồi **Plugins & Themes** trên dòng (`page=grabwp-tenancy-pro-extensions`).

Bạn cũng có thể mở tab **Extensions** trên tenant.

![Extensions, Plugins](../images/grabwp-tenancy-pro-tenant-extension.png)

Tiêu đề là **Extensions:** cộng tenant ID. Dòng dưới các tab hiện **Primary Domain** và **Install Method**.

| Install Method | Ghi chú |
|----------------|--------|
| Symlink | Tenant trỏ tới file plugin hoặc theme của site chính. Cập nhật trên site chính áp dụng cho tenant. Tốn ít dung lượng hơn. |
| Own Copy | File được sao chép vào thư mục tenant. Tenant không theo bản cập nhật sau trên site chính cho đến khi bạn nhấn **Sync**. |

Đổi **Install Method** sẽ lưu ngay (**Saved!**) và tải lại trang. Việc này không chuyển các extension đã cài. Dùng **Convert to Copy** hoặc **Convert to Symlink** trên một dòng để đổi extension đó. Nút convert hiện ra tùy method bạn đã chọn.

**Install All from Config** hiện khi `extensions.php` liệt kê plugin hoặc theme chưa được cài. **Fix All Broken Symlinks** hiện khi đích của một symlink bị thiếu.

### Plugins và Themes

Tab: **Plugins** và **Themes**.

![Extensions, Themes](../images/grabwp-tenancy-pro-tenant-extension-themes.png)

Cột: **Plugin** (hoặc **Theme**), **Source**, **Status**, **Activation**, **Actions**.

Huy hiệu nguồn: **Main**, **Supported**, **Custom**, **Unknown**. Nút lọc **All**, **Main**, **Supported**, và **Custom** chỉ hiện khi nguồn đó tồn tại. **Installed** lọc bảng và được nhớ lại. Placeholder ô tìm là **Filter plugins...** hoặc **Filter themes...**.

| Status | Thao tác |
|--------|---------|
| Not installed | **Install** |
| Symlink | **Remove**, và **Convert to Copy** khi Install Method là **Own Copy** |
| Own Copy | **Remove**, **Sync**, và **Convert to Symlink** khi Install Method là **Symlink** |
| Broken Symlink | **Fix Symlink**, **Remove broken link** |

Khi đọc được database của tenant, dòng đã cài còn có **Activate** hoặc **Deactivate**. Huy hiệu kích hoạt là **Active** và **Inactive**. Nếu không đọc được database, phần kích hoạt hiện **?**.

Install, remove, sync, convert, activate, và deactivate cập nhật đúng dòng đó. Tab và vị trí cuộn được giữ.

### Orphaned Extensions

Nếu một plugin hoặc theme nằm trong thư mục tenant nhưng không có trong thư mục nguồn, **Orphaned Extensions** liệt kê nó. Thao tác gồm **Copy to Main Site** và **Remove** (hoặc **Remove broken link**).

**Verify:** Sau **Install** và **Activate**, dòng hiện **Active**, và plugin hoặc theme có trong wp-admin của tenant đó (tab **WP Admin**).
