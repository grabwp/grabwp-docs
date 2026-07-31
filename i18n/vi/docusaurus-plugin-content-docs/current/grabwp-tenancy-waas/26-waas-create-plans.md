---
title: "Tạo gói dịch vụ"
description: "Định nghĩa gói miễn phí và trả phí với giá, tính năng và tích hợp nhà cung cấp thanh toán"
order: 26
section: waas
---

# Tạo gói dịch vụ

Gói dịch vụ xác định những lựa chọn khách hàng có thể đăng ký — dùng thử miễn phí, gói cơ bản hoặc gói cao cấp. Mỗi gói có giá, tính năng và có thể liên kết với một sản phẩm của nhà cung cấp thanh toán.

Điều hướng đến **WaaS → Settings → Plans** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=plans`).

![Danh sách gói](../images/waas-plans-list.png)

## Tổng quan về gói

Một bản cài đặt WaaS bắt đầu với một gói **free** mặc định. Bạn sẽ tạo các gói phù hợp với dịch vụ của mình. Trong hướng dẫn này, bạn sẽ thiết lập:

- **Free** — không thanh toán, tính năng giới hạn
- **Pro** — gói trả phí hàng tháng qua Polar

## Tạo gói Free

Nếu đã có gói free, nhấn **Edit** để cập nhật. Nếu chưa, nhấn **Add New Plan**.

![Form chỉnh sửa gói](../images/waas-plan-edit.png)

Điền vào:

| Trường | Giá trị | Ghi chú |
|-------|-------|-------|
| **Plan ID** | `free` | Slug chữ thường. Không thể thay đổi sau khi tạo. |
| **Name** | `Free` | Tên hiển thị cho khách hàng |
| **Description** | `Get started with a free WordPress site` | Hiển thị trên trang đăng ký |
| **Monthly Price** | `0` | Bằng 0 = gói miễn phí, không cần thanh toán |
| **Yearly Price** | `0` | Để nguyên bằng 0 |
| **Features** | Xem bên dưới | Mỗi tính năng một dòng |
| **Sort Order** | `0` | Số nhỏ hơn xuất hiện trước |
| **Active** | Đánh dấu | Gói khả dụng để đăng ký |

### Định dạng Features

Nhập mỗi tính năng trên một dòng trong ô văn bản Features. Các tính năng này được hiển thị dưới dạng danh sách trên trang giá/đăng ký.

```
1 WordPress site
500 MB storage
Community support
Basic themes
```

Nhấn **Save Plan**.

## Tạo gói trả phí (Pro)

Nhấn **Add New Plan** và điền vào:

| Trường | Giá trị | Ghi chú |
|-------|-------|-------|
| **Plan ID** | `pro` | |
| **Name** | `Pro` | |
| **Description** | `Everything you need to grow your business` | |
| **Monthly Price** | `9.99` | Giá theo đơn vị tiền tệ chính của bạn |
| **Yearly Price** | `99.99` | Tùy chọn — để trống nếu bạn chỉ cung cấp gói hàng tháng |
| **Polar Monthly Product ID** | _(đặt sau khi thiết lập Polar)_ | UUID từ Polar. Xem [Thiết lập thanh toán](/vi/grabwp-tenancy-waas/waas-setup-billing). |
| **Polar Yearly Product ID** | _(đặt sau khi thiết lập Polar)_ | UUID từ Polar, nếu cung cấp thanh toán hàng năm |
| **Features** | Xem bên dưới | |
| **Sort Order** | `1` | |
| **Active** | Đánh dấu | |

### Tính năng Pro

```
1 WordPress site
10 GB storage
Custom domain support
Priority support
Premium themes & plugins
Daily backups
```

Nhấn **Save Plan**.

## Giới hạn gói trên mẫu giao diện

Khi chỉnh sửa một mẫu, bạn có thể giới hạn nó cho các gói cụ thể. Ví dụ, một mẫu cao cấp có thể chỉ khả dụng trên gói Pro.

Xem [Thiết lập mẫu giao diện](/vi/grabwp-tenancy-waas/waas-setup-templates) để biết chi tiết.

## Sắp xếp lại thứ tự gói

Gói xuất hiện trên trang đăng ký theo **Sort Order** tăng dần (nhỏ nhất trước). Cập nhật trường **Sort Order** trên mỗi gói để kiểm soát thứ tự hiển thị.

---

**Tiếp theo:** [Thiết lập thanh toán](/vi/grabwp-tenancy-waas/waas-setup-billing)
