---
title: "Cài đặt"
description: "Cài GrabWP Tenancy và kiểm tra Status cùng Settings"
order: 2
section: tenancy
---

# Cài đặt

## Yêu cầu

- WordPress 5.0 trở lên (tested up to 7.1)
- PHP 7.4 trở lên
- Quyền quản trị WordPress (`manage_options`)

## Cài từ wp-admin

1. Vào **Plugins → Add New**
2. Tìm **GrabWP Tenancy**
3. Nhấn **Install Now**, rồi **Activate**

Khi kích hoạt, plugin cài must-use plugin, loader trong `wp-config.php`, và rewrite rules. Bạn không sửa các file đó bằng tay cho lần cài thông thường.

## Cài từ ZIP

1. Tải ZIP từ [wordpress.org/plugins/grabwp-tenancy](https://wordpress.org/plugins/grabwp-tenancy/)
2. Vào **Plugins → Add New → Upload Plugin**
3. Tải ZIP, nhấn **Install Now**, rồi **Activate Plugin**

## Kiểm tra trên Status

**Vào Tenancy → Status** (`page=grabwp-tenancy-status`).

Tiêu đề trang là **GrabWP Tenancy Status**. Có ba tab: **Plugin General**, **Base Plugin**, và **Pro Plugin**.

![GrabWP Tenancy Status](../images/grabwp-status.png)

### Plugin General

`page=grabwp-tenancy-status&tab=general`

**Environment Checks** liệt kê những phần được cài lúc kích hoạt. Mỗi dòng có thể mở ra **Fix steps and install code**, **Copy Code**, và **Auto Fix** khi file ghi được.

| Kiểm tra | Trạng thái ổn |
|-------|----------------|
| wp-config.php Loader | Active |
| MU-Plugin | Installed |
| Root .htaccess Rewrite Rules | Installed |
| Data Directory .htaccess | Protected |

**Auto Fix** ghi phần còn thiếu khi WordPress ghi được file. Nếu file không ghi được, dòng đó báo phải cài tay. Dùng **Copy Code** và làm theo các bước trên dòng đó.

### Base Plugin

`page=grabwp-tenancy-status&tab=base`

![Status, tab Base Plugin](../images/09-status-base.png)

**File Structure** báo base directory, file tenant mappings, file settings, và mẫu đường dẫn upload của tenant. **Tenant Capabilities** trên tab này phản ánh các checkbox trong Settings và có liên kết tới **Settings**.

### Pro Plugin

`page=grabwp-tenancy-status&tab=pro`

![Status, tab Pro Plugin](../images/09-status-pro.png)

Khi Pro đang bật, tab này hiện **Pro Version**, **Status** (**Active**), các cờ content isolation mặc định, và kiểu database mặc định. Khi chưa có Pro, tab này có **Upgrade to Pro**.

**Verify:** Trên **Plugin General**, dòng loader và MU-plugin ở trạng thái xanh (active hoặc installed) trước khi bạn tạo tenant.

## Settings

**Vào Tenancy → Settings** (`page=grabwp-tenancy-settings`).

Tiêu đề trang là **GrabWP Tenancy Settings**. Các giá trị này áp dụng cho mọi tenant. Pro có thể ghi đè cho một tenant. Xem [Tenant Settings & Overrides](/grabwp-tenancy-pro/pro-tenant-settings).

### Tenant Capabilities

![Settings, Tenant Capabilities](../images/tenancy-settings-capabilities.png)

| Trường | Ghi chú |
|-------|--------|
| Install Plugins & Themes | **Disallow file mods**. Chặn tenant admin cài, cập nhật, hoặc xóa plugin và theme. |
| Edit Plugins & Themes | **Disallow file edit**. Ẩn trình sửa file plugin và theme. |
| Hide Plugin Management | **Hide Plugins menu** trên admin của tenant. |
| Hide Theme Management | **Hide Appearance menu** trên admin của tenant. |
| Hide GrabWP Plugins | **Hide from plugin list** trên site tenant. |

### Performance & Security

![Settings, Performance & Security](../images/tenancy-settings-perf.png)

| Trường | Ghi chú |
|-------|--------|
| Disable WP-Cron | **Disable WP-Cron** trên site tenant. Bật mục này thì dùng system cron. |
| Disable XML-RPC | **Disable XML-RPC** trên site tenant. |
| Post Revisions | Số revision tối đa được giữ. |
| Empty Trash Days | Số ngày trước khi bài trong thùng rác bị xóa. `0` tắt trash. |
| Block External HTTP | **Block external HTTP** từ site tenant. |
| Accessible Hosts | Danh sách host vẫn được phép khi external HTTP bị chặn, cách nhau bởi dấu phẩy. Hỗ trợ wildcard. |

### Routing

![Settings, Routing](../images/08-tenancy-settings-routing.png)

**Routing mode** quyết định mỗi site mở ở địa chỉ nào:

| Chế độ | Cách hoạt động |
|------|----------|
| Path | Mọi site mở ở một path URL, ví dụ `/site/my-shop/`. Dùng được ngay, không cần DNS. Domain bạn thêm vẫn được giữ nhưng không dùng cho link. |
| Domain | Mọi site mở trên domain riêng. Khách mở path URL sẽ được chuyển hướng (301) sang domain. Site nào cũng cần có domain. |
| Path and domain | Site có domain mở trên domain đó. Site chưa có domain mở ở path URL. Cả hai địa chỉ đều dùng được. Đây là chế độ đang chạy cho đến khi bạn lưu một chế độ. |

Khi đổi chế độ, màn hình **Change routing mode** hiện ra, liệt kê **Sites whose address changes** và **What else happens**. Xác nhận bằng nút **Switch to** chế độ mới, hoặc bấm **Cancel**. Không chuyển sang **Domain** được cho đến khi mọi site đều có domain. Màn hình liệt kê các site còn thiếu domain, mỗi site có link **Add a domain**. Nếu `GRABWP_TENANCY_ROUTING_MODE` được đặt trong `wp-config.php`, các radio sẽ bị khóa.

Các dòng về path bị ẩn ở chế độ **Domain**. Không có Pro, tab chỉ hiện **Path prefix** hiện tại. Có Pro thì có thêm:

| Trường | Ghi chú |
|-------|--------|
| Path Prefix | Slug trong path URL. Chữ thường, số, và dấu gạch ngang, 1 đến 20 ký tự. Mặc định `site`. Lưu prefix mới sẽ flush rewrite rules và cập nhật `.htaccess`. Bookmark dùng prefix cũ sẽ hết tác dụng. |
| Path Alias Routing | **Enable Path Alias Routing**. Cho site dùng slug dễ đọc thay cho tenant ID 6 ký tự. Màn hình Edit của tenant khi đó hiện **Path Alias** (3 đến 30 ký tự) và **Copy URL** thay cho dòng **Path URL** thường. |

Nhấn **Save Settings**.

**Verify:** **Routing mode** đã chọn vẫn được tick sau khi trang tải lại, và tenant mở đúng địa chỉ mà chế độ đó mô tả.

## Gỡ cài đặt

Deactivate plugin sẽ gỡ must-use plugin, loader trong `wp-config.php`, và rewrite rules ở thư mục gốc.

Bảng cơ sở dữ liệu và upload của tenant không bị xóa. Activate lại thì các tenant hiện có vẫn dùng được.
