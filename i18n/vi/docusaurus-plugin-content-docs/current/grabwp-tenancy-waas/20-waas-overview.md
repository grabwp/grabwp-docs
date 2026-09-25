---
title: "GrabWP WaaS - Tổng quan"
description: "Xây nền tảng WordPress-as-a-Service với signup, template, plan và billing"
order: 20
section: waas
---

# Tài liệu GrabWP WaaS

**Xây nền tảng WordPress-as-a-Service của riêng bạn.** Khách chọn template, chọn plan, rồi nhận một site WordPress trên subdomain của platform domain.

## Cách hoạt động

```
Visitor → Template gallery → Signup (account, plan, services, payment) → Site provisioned
                                                                              ↓
                                                                     Tenant dashboard
                                                          (domain, billing, account)
```

Preset signup mặc định có thể chỉnh. Xem [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

GrabWP WaaS chạy trên ba plugin:

| Plugin | Vai trò |
|--------|---------|
| **GrabWP Tenancy** (base) | Engine multi-tenant: danh sách tenant, tạo mới, settings và status |
| **GrabWP Tenancy Pro** | Mặc định isolation, database, thư mục, storage, backup, license |
| **GrabWP Tenancy WaaS** | Plan, billing, template, signup, dashboard, domain, subscription |

Provider có sẵn trong WaaS là **Polar.sh** và **WooCommerce** (khi WooCommerce đang active). **Stripe**, **Sepay** và **Xendit** là plugin add-on riêng, cài từ **Waas → Settings → Add-ons**.

## Tổng quan hướng dẫn

### Bắt đầu

1. [Prerequisites](/grabwp-tenancy-waas/waas-prerequisites)
2. [What You Will Build](/grabwp-tenancy-waas/waas-what-you-will-build)
3. [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins)

### Cấu hình

4. [Configure Pro Settings](/grabwp-tenancy-waas/waas-configure-pro-settings)
5. [Configure WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general)
6. [Create Plans](/grabwp-tenancy-waas/waas-create-plans)
7. [Set Up Billing](/grabwp-tenancy-waas/waas-setup-billing)
8. [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates)
9. [Set Up Frontend Pages](/grabwp-tenancy-waas/waas-setup-frontend-pages)

### Ra mắt

10. [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist)

### Vận hành

11. [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains)
12. [Managing Subscriptions](/grabwp-tenancy-waas/waas-managing-subscriptions)

### Tích hợp tùy chọn

13. [S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage)
14. [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce)

### Tham chiếu

Các màn hình sâu hơn, không thuộc đường cài lần đầu:

- [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow)
- [Appearance](/grabwp-tenancy-waas/waas-appearance)
- [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits)
- [Dashboard and Activity](/grabwp-tenancy-waas/waas-dashboard-activity)
- [Troubleshooting](/grabwp-tenancy-waas/waas-troubleshooting)
- [Shortcode Reference: Template Browser](/grabwp-tenancy-waas/waas-shortcode-templates)
- [Block Walkthrough: Template Browser](/grabwp-tenancy-waas/waas-block-walkthrough)

---

**Yêu cầu:** WordPress 5.0+, PHP 7.4+
