---
title: "Cấu hình WaaS General"
description: "Đặt platform domain, auth mode, trang frontend và chế độ custom domain"
order: 25
section: waas
---

# Cấu hình WaaS General

**General** là nơi đặt platform domain, các trang khách dùng, cách họ đăng nhập, và custom domain trỏ về server thế nào.

Vào **Waas → Settings → General** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=general`).

![WaaS General Settings](../images/waas-general-settings.png)

Màn hình settings có tiêu đề **WaaS Settings**. Các tab, theo thứ tự:

| Tab | Trong hướng dẫn này |
|-----|---------------------|
| **General** | Trang này |
| **Appearance** | Màu, tùy chọn. [Appearance](/grabwp-tenancy-waas/waas-appearance) |
| **Signup Flow** | Đổi bước, tùy chọn. [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow) |
| **Plans** | Bước sau, ở [Create Plans](/grabwp-tenancy-waas/waas-create-plans) |
| **Benefits** và **Services** | [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits) |
| **Billing Providers** | [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing) |
| **Activity Log** | Danh sách sự kiện. [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity) |
| **Provisioning** | Signup intent. Mở nếu signup thử không xong. |
| **Add-ons** | Đã nói ở [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins) |

## Platform

| Trường | Ví dụ | Ghi chú |
|--------|-------|---------|
| **Platform Domain** | `yoursaas.com` | Không `http://` và không dấu `/` cuối. Tenant được tạo dạng `slug.yoursaas.com`. |
| **WaaS Directory** | `grabwp-tenancy-waas` | Tương đối với thư mục uploads, hoặc đường dẫn tuyệt đối. Đường dẫn đã phân giải hiện dưới ô. |
| **Signup Page** | Signup | Trang chứa `[grabwp_waas_signup]`. Slug mặc định `/signup/`. |
| **Dashboard Page** | Dashboard | Trang chứa `[grabwp_waas_dashboard]`. Slug mặc định `/dashboard/`. |
| **Templates Page** | Templates | Trang chứa `[grabwp_waas_templates]`. Slug mặc định `/templates/`. |
| **Pricing Page** | Pricing | Trang chứa `[grabwp_waas_pricing]`. Slug mặc định `/pricing/`. |

Mỗi dropdown có link **View**. Lựa chọn trống là **Select a page**.

> **DNS:** Thêm bản ghi wildcard để mọi subdomain tới server này:
>
> ```
> *.yoursaas.com  →  A  →  YOUR_SERVER_IP
> ```

Cách tạo trang nằm ở [Set Up Frontend Pages](/grabwp-tenancy-waas/waas-setup-frontend-pages). Bạn có thể chọn trang ngay nếu chúng đã có, hoặc quay lại sau khi nút repair tạo chúng.

## Authentication

| Trường | Lựa chọn |
|--------|----------|
| **Auth Mode** | **WAAS Auth (Email signup)** hoặc **WordPress Auth (Login required)** |

**WAAS Auth (Email signup)** tạo user trong lúc signup. Dashboard sau đó đăng nhập khách bằng mã xác minh email.

**WordPress Auth (Login required)** đòi đăng nhập WordPress có sẵn trước khi tạo site.

**Cho hướng dẫn này:** chọn **WAAS Auth (Email signup)**.

## Custom Domains

| Trường | Lựa chọn | Ghi chú |
|--------|----------|---------|
| **Domain Mode** | **Cloudflare SaaS (CNAME)** hoặc **Direct IP (A record)** | Quyết định hướng dẫn DNS hiện cho khách |
| **CNAME Target** | ví dụ `cdn.saas.example.com` | Hiện ở chế độ Cloudflare |
| **DCV Delegation** | Giá trị CNAME DCV của Cloudflare | Hiện ở chế độ Cloudflare. Dùng để xác thực chứng chỉ cho custom hostname. |
| **Server Public IP** | ví dụ `203.0.113.50` | Hiện ở chế độ Direct IP |

Chọn đúng chế độ bạn sẽ dùng. Chi tiết ở [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains). Có thể để trống target đến bước đó nếu bạn chưa nhận custom domain.

## Retention and grace period

Mở accordion **Retention and grace period** trên tab này. Các trường này không nằm ở tab **Activity Log**. Tab đó là danh sách sự kiện.

| Trường | Giới hạn | Ghi chú |
|--------|----------|---------|
| **Retention (days)** | 7 đến 365 | Thời gian giữ mục activity log |
| **Grace Period (days)** | 0 đến 90 | Số ngày sau khi hủy subscription rồi mới suspend tenant. `0` là suspend ngay. |

## Lưu

Bấm **Save Changes**. Thông báo **Settings saved.** xác nhận đã lưu.

## Repair tools

Mở accordion **Repair tools**. Đây là form riêng. Chúng không nằm trong **Save Changes**.

| Nút | Việc nó làm |
|-----|-------------|
| **Create/Repair Signup and Dashboard Pages** | Tạo hoặc dùng lại các trang Signup, Dashboard, Templates và Pricing, rồi lưu ID. Thông báo thành công: **Signup and Dashboard pages checked.** |
| **Create/Repair WooCommerce Anchor Product** | Tạo sản phẩm WooCommerce dùng chung cho checkout WaaS. Dùng khi bật billing WooCommerce. Thông báo thành công: **WooCommerce anchor product is ready.** |

## API Keys

Chỉ mở accordion **API Keys** nếu hệ thống bên ngoài gọi REST API với header `X-GrabWP-WaaS-API-Key`.

1. Nhập nhãn tùy chọn. Placeholder là **Key label (optional)**.
2. Bấm **Generate New API Key**
3. Copy key từ thông báo cảnh báo. Key không hiện lại.

Key đã có liệt kê **Label**, **Prefix** và **Created**. **Revoke** hỏi **Revoke this key?**

## Kiểm tra

1. **Platform Domain** khớp domain trong wildcard DNS
2. **Auth Mode** là **WAAS Auth (Email signup)**
3. Sau nút repair, cả bốn dropdown trỏ đúng trang, và mỗi link **View** mở được trang đó

---

**Tiếp theo:** [Create Plans](/grabwp-tenancy-waas/waas-create-plans)
