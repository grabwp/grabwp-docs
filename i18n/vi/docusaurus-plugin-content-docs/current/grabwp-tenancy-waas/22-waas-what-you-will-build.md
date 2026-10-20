---
title: "Những gì bạn sẽ dựng"
description: "Mục tiêu hướng dẫn, kiến trúc và đường signup của khách"
order: 22
section: waas
---

# Những gì bạn sẽ dựng

Cuối hướng dẫn này bạn có một nền tảng WordPress-as-a-Service: khách chọn template, đăng ký, chọn plan, rồi nhận site WordPress trên platform domain.

## Mục tiêu

| Thành phần | Việc bạn thiết lập |
|------------|-------------------|
| **Plans** | Plan **Free** được seed sẵn (không thu phí) và ít nhất một plan trả phí |
| **Billing** | **Polar.sh** bật trên **Billing Providers**, kèm currency |
| **Templates** | Ít nhất một template, có tag, và hiện trong gallery |
| **Frontend** | Các trang Signup, Dashboard, Templates và Pricing |
| **Flow** | Template gallery, rồi preset signup mặc định, rồi một site đã provision |

Cài mới seed ba plan: **Free**, **Basic** và **Pro**. Hãy sửa chúng, đừng chờ một danh sách trống. Plan **free** không xóa được.

## Kiến trúc

```
┌─────────────────────────────────────────────────┐
│                 YOUR MAIN SITE                  │
│                                                 │
│  Plans    Templates (tags, groups, bulk)        │
│  Billing providers    Signup presets            │
│                                                 │
│  Public pages                                   │
│  /signup  /templates  /pricing  /dashboard      │
└─────────────────────────────────────────────────┘
                      │
              Provisioning
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
  tenant A         tenant B         tenant C
  a.yoursaas.com   b.yoursaas.com   custom domain
```

Địa chỉ tenant trong hướng dẫn này là subdomain của **Platform Domain**. Custom domain là tùy chọn, cấu hình sau.

## Đường signup của khách

Preset **Default** dùng các bước:

1. **Create your account** (tên và email, khi **Auth Mode** là **WAAS Auth (Email signup)**)
2. **Choose a plan** và **Billing Cycle**
3. **Optional Services**
4. **Payment Method** (ẩn khi đơn không cần thanh toán)

Subdomain của site được tạo lúc provisioning. Khách không nhập slug ở bước account.

Việc chọn template nằm ở template gallery. Mở signup từ một template sẽ đưa template đó vào wizard. Đổi thứ tự, ẩn hoặc đổi nhãn bước tại **Waas → Settings → Signup Flow**. Tham chiếu đầy đủ: [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

Sau khi provision, khách đăng nhập trên trang dashboard. Với **WAAS Auth (Email signup)**, dashboard hỏi email và nút **Send verification code**.

## Mỗi plugin làm gì

### GrabWP Tenancy (base)

Danh sách tenant, tạo mới, settings và status. Menu admin là **Tenancy**, gồm **All Tenants**, **Add New**, **Settings** và **Status**.

### GrabWP Tenancy Pro

Thêm **Pro Settings** và **License** dưới **Tenancy**.

Các tab **Pro Settings**:

- **Isolation**, **Database**, **Directories**
- **Symlink**, **Storage**, **Backup**
- **CDN**

Để **CDN** ở trạng thái tắt. Hướng dẫn này dùng địa chỉ tenant theo domain. Routing nằm ở **Tenancy → Settings → Routing**. Để **Routing mode** ở mặc định.

Công cụ theo từng tenant (extensions, clone, backup, restore) mở từ dòng tenant. Chúng không phải mục sidebar cấp cao.

### GrabWP Tenancy WaaS

Lớp self-service. Menu admin là **Waas**:

- **Dashboard**, **Subscriptions**, **Domains**, **Templates**, **Settings**

Các tab **WaaS Settings**:

| Tab | Dùng trong hướng dẫn này |
|-----|--------------------------|
| **General** | Platform domain, trang, auth, chế độ custom domain |
| **Appearance** | Màu frontend. Xem [Appearance](/grabwp-tenancy-waas/waas-appearance) |
| **Signup Flow** | Thứ tự và nhãn bước. Xem [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow) |
| **Email** | Người nhận thông báo admin, footer và template email. Xem [Email](/grabwp-tenancy-waas/waas-email) |
| **Plans** | Plan miễn phí và trả phí |
| **Benefits** | Quota và flag gắn vào plan. Xem [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits) |
| **Services** | Mua thêm tùy chọn. Cùng trang tham chiếu trên |
| **Billing Providers** | Polar.sh và provider add-on |
| **Activity Log** | Danh sách sự kiện. Xem [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity) |
| **Provisioning** | Signup intent, kể cả retry |
| **Add-ons** | Tải Stripe, Sepay và Xendit |

**Templates** có thanh phụ: **Templates**, **Tags**, **Tag Groups**, **Bulk**.

---

**Tiếp theo:** [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins)
