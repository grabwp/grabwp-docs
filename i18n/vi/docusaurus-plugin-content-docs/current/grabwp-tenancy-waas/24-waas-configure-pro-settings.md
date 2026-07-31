---
title: "Cấu hình Pro Settings"
description: "Thiết lập cô lập tenant, loại database, đường dẫn thư mục và mặc định lưu trữ S3"
order: 24
section: waas
---

# Cấu hình Pro Settings

Pro Settings kiểm soát cách cô lập các site tenant và nơi lưu trữ dữ liệu của chúng. Đây là các giá trị **mặc định** — từng tenant có thể ghi đè sau này.

Điều hướng đến **Tenancy → Pro Settings** (`/wp-admin/admin.php?page=grabwp-tenancy-pro-settings`).

![Trang Pro Settings](../images/pro-settings.png)

## Mặc định cô lập nội dung

Các cài đặt này xác định những gì được cô lập cho mỗi tenant mới.

| Cài đặt | Khuyến nghị | Chức năng |
|---------|-------------|-------------|
| **Content + Themes Isolation** | Bật | Mỗi tenant có thư mục `wp-content` và theme riêng |
| **Plugins Isolation** | Tắt (cho hầu hết thiết lập) | Mỗi tenant có thư mục plugins riêng. Tăng dung lượng ổ đĩa. |
| **Uploads Isolation** | Bật | Mỗi tenant có thư mục uploads riêng (file media) |

> **Mẹo:** Giữ Plugins Isolation ở trạng thái tắt trừ khi các tenant cần bộ plugin khác nhau. Khi tắt, tất cả tenant chia sẻ cùng bộ plugin (được kiểm soát qua Tenant Extensions), giúp tiết kiệm dung lượng ổ đĩa.

## Mặc định database

Chọn cách cấu trúc database của tenant.

| Tùy chọn | Phù hợp nhất cho | Mô tả |
|--------|----------|-------------|
| **Shared** | Bắt đầu, quy mô nhỏ | Tất cả tenant chia sẻ một database MySQL với cô lập bằng table-prefix. Thiết lập đơn giản nhất. |
| **MySQL Isolated** | Sản xuất, tuân thủ | Mỗi tenant có một database MySQL riêng. Cô lập tốt hơn nhưng cần nhiều tài nguyên database hơn. |
| **SQLite Isolated** | Tenant nhẹ | Mỗi tenant có một file SQLite. Không cần thiết lập MySQL thêm. Cần plugin [SQLite Database Integration](https://wordpress.org/plugins/sqlite-database-integration/). |

**Cho hướng dẫn này:** Bắt đầu với **Shared**. Sau này, bạn có thể chuyển tenant sang database cô lập.

### Cài đặt MySQL Isolated (nếu chọn)

Nếu bạn chọn MySQL Isolated, hãy cấu hình thông tin đăng nhập mặc định:

| Trường | Mô tả |
|-------|-------------|
| **MySQL Host** | Máy chủ database (ví dụ: `localhost` hoặc `localhost:3306`) |
| **MySQL Database** | Tên database mặc định cho tenant mới |
| **MySQL Username** | User database có quyền CREATE TABLE |

> **Lưu ý:** Đây là các giá trị mặc định. Bạn có thể đặt thông tin đăng nhập riêng cho từng tenant khi tạo tenant.

## Cấu hình thư mục

Đây là nơi GrabWP lưu trữ dữ liệu tenant trên ổ đĩa.

| Trường | Mặc định | Mô tả |
|-------|---------|-------------|
| **Tenant Base Dir** | `wp-content/grabwp-tenancy` | Thư mục gốc cho uploads và dữ liệu tenant |
| **Pro Config Dir** | `wp-content/grabwp-tenancy-pro` | File cấu hình cho mỗi tenant |
| **SQLite Database Dir** | `wp-content/grabwp-tenancy-sqlite` | File database SQLite (nếu dùng cô lập SQLite) |

**Thông thường, các giá trị mặc định là phù hợp.** Chỉ thay đổi nếu bạn cần đặt dữ liệu tenant trên một phân vùng hoặc điểm mount khác.

> Bạn cũng có thể khóa các đường dẫn này qua hằng số trong `wp-config.php`. Nếu một hằng số được đặt, trường sẽ hiển thị "set in wp-config.php" và không thể thay đổi từ giao diện.

## Domain Symlink

Bật URL sạch cho các thư mục nội dung của tenant. Thay vì phục vụ tài nguyên tenant từ đường dẫn như `/wp-content/grabwp-tenancy/tenant-123/uploads/`, symlink cho phép chúng xuất hiện dưới đường dẫn tên miền của chính tenant.

| Trường | Mô tả |
|-------|-------------|
| **Enable Domain Symlink** | Bật URL sạch dựa trên symlink. Cần hàm PHP `symlink()`. |
| **Domains Directory** | Đường dẫn tuyệt đối nơi tạo các domain symlink |

> **Cần cấu hình Nginx.** Trang cài đặt hiển thị một khối cấu hình Nginx sẵn sàng để sao chép-dán. Thêm nó vào cấu hình server của bạn và tải lại Nginx.

**Cho hướng dẫn này:** Bạn có thể bỏ qua bước này lúc đầu và bật sau khi thiết lập tên miền riêng.

## Object Storage (S3)

Chuyển media của tenant sang lưu trữ tương thích S3. Phần này được đề cập chi tiết trong [Lưu trữ S3 Object Storage](/vi/grabwp-tenancy-waas/waas-optional-s3-storage).

| Trường | Mô tả |
|-------|-------------|
| **Storage Driver** | `Local` (mặc định) hoặc `S3` |

**Cho hướng dẫn này:** Để nguyên là **Local**. Cấu hình S3 sau nếu cần.

## Lưu cài đặt

Nhấn **Save Settings** ở cuối trang. Một thông báo thành công sẽ xác nhận việc lưu.

---

**Tiếp theo:** [Cấu hình WaaS General Settings](/vi/grabwp-tenancy-waas/waas-configure-general)
