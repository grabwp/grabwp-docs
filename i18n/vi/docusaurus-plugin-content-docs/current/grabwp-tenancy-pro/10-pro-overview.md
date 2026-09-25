---
title: "Tổng quan Pro"
description: "Những gì GrabWP Tenancy Pro thêm vào plugin miễn phí"
order: 10
section: pro
---

# GrabWP Tenancy Pro

Pro mở rộng plugin miễn phí để mỗi tenant có thể có database, plugin, theme, upload, backup, và domain symlink riêng. Plugin miễn phí phải được cài và kích hoạt trước.

## Pro thêm gì

### Database riêng cho mỗi site

Tenant mới có thể dùng **Shared Database (with table prefixes)**, **Isolated MySQL Database**, hoặc **Isolated SQLite Database**. SQLite đi kèm trong Pro. Bạn không cài plugin SQLite riêng.

→ [Database & Content Isolation](/grabwp-tenancy-pro/pro-database-isolation)

### Cô lập content, plugin và upload

**Content + Themes Isolation**, **Plugins Isolation**, và **Uploads Isolation** cấp thư mục riêng cho tenant. Mặc định cho tenant mới đặt trong **Pro Settings**.

### Plugin và theme theo site

Màn **Extensions** cài, gỡ, kích hoạt, và tắt plugin cùng theme cho một tenant, dưới dạng symlink hoặc bản sao riêng.

→ [Plugin và theme theo site](/grabwp-tenancy-pro/pro-extensions)

### Backup và restore

Sao lưu một tenant (database, isolated content, Pro config, và upload) rồi khôi phục sau. Bạn có thể lên lịch backup và offload archive sang lưu trữ tương thích S3.

→ [Backup & Restore](/grabwp-tenancy-pro/pro-backup-restore)

### Clone tenant

Sao chép một tenant, hoặc **Main Site**, vào một tenant có sẵn hoặc một tenant mới.

→ [Clone tenant](/grabwp-tenancy-pro/pro-tenant-cloning)

### Fix URLs

Thay URL cũ trong database của một tenant sau khi đổi domain hoặc clone.

→ [Fix URLs](/grabwp-tenancy-pro/pro-fix-urls)

### Domain symlink và storage

**Pro Settings** gồm domain symlink cho URL `/wp-content/` gọn, lưu trữ upload tương thích S3, và offload backup.

→ [Pro Settings](/grabwp-tenancy-pro/pro-settings)

### License

Kích hoạt, xem, hoặc thu hồi license tại **Tenancy → License**.

→ [License](/grabwp-tenancy-pro/pro-license)

## Yêu cầu

- **GrabWP Tenancy** (miễn phí) đã cài và đang bật
- WordPress 5.0 trở lên (tested up to 7.1)
- PHP 7.4 trở lên

## Bản miễn phí và Pro

| Tính năng | Miễn phí | Pro |
|---------|:----:|:---:|
| Nhiều site từ một cài đặt | ✓ | ✓ |
| Domain riêng cho mỗi site | ✓ | ✓ |
| Upload tách biệt cho mỗi site | ✓ | ✓ |
| Cơ sở dữ liệu MySQL dùng chung | ✓ | ✓ |
| Mở admin từ danh sách tenant | ✓ | ✓ |
| Database riêng cho mỗi site (MySQL hoặc SQLite) | - | ✓ |
| Plugin và theme riêng theo site | - | ✓ |
| Cô lập content, plugin và upload | - | ✓ |
| Backup và restore theo site | - | ✓ |
| Backup theo lịch | - | ✓ |
| Clone tenant | - | ✓ |
| Fix URLs | - | ✓ |
| Lưu trữ tương thích S3 và offload backup | - | ✓ |
| Domain symlink | - | ✓ |

## Lấy Pro

Sau khi mua, Polar gửi email xác nhận có liên kết **Customer Portal**. Tải ZIP Pro từ portal đó, rồi [cài Pro](/grabwp-tenancy-pro/pro-installation).

Màn license cũng liên kết tới [Customer Portal](https://polar.sh/grabwp/portal) và [grabwp.com](https://grabwp.com/).
