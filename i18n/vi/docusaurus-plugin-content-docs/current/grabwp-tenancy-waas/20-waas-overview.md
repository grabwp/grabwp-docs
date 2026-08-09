---
title: "GrabWP WaaS — Tổng quan"
description: "Xây dựng nền tảng WordPress-as-a-Service với đăng ký tự động, mẫu giao diện và thanh toán"
order: 20
section: waas
---

# Tài liệu GrabWP WaaS

**Xây dựng nền tảng WordPress-as-a-Service của riêng bạn.** Cho phép khách hàng đăng ký, chọn mẫu giao diện, chọn gói dịch vụ và nhận một trang WordPress được cung cấp đầy đủ — tất cả đều tự phục vụ.

## Cách hoạt động

```
Khách truy cập → Chọn mẫu → Chọn gói → Thanh toán → Site được khởi tạo
                                                           ↓
                                                  Bảng điều khiển
                                             (tên miền riêng, sao lưu,
                                              thanh toán, cài đặt tài khoản)
```

GrabWP WaaS hoạt động dựa trên ba plugin:

| Plugin | Vai trò |
|--------|---------|
| **GrabWP Tenancy** (nền tảng) | Engine đa tenant — định tuyến, cô lập bằng table-prefix, quản lý tenant |
| **GrabWP Tenancy Pro** | Cô lập nâng cao — database riêng, lưu trữ S3, sao lưu, nhân bản |
| **GrabWP Tenancy WaaS** | Lớp tự phục vụ — gói dịch vụ, thanh toán, mẫu giao diện, luồng đăng ký, bảng điều khiển tenant |

## Tổng quan hướng dẫn

### Bắt đầu

1. [Yêu cầu tiên quyết](/grabwp-tenancy-waas/waas-prerequisites) — những gì bạn cần trước khi cài đặt
2. [Bạn sẽ xây dựng gì](/grabwp-tenancy-waas/waas-what-you-will-build) — mục tiêu và kiến trúc hướng dẫn
3. [Cài đặt Plugin](/grabwp-tenancy-waas/waas-install-plugins) — cài đặt và kích hoạt

### Cấu hình

4. [Cấu hình Pro Settings](/grabwp-tenancy-waas/waas-configure-pro-settings) — lưu trữ, database, thư mục
5. [Cấu hình WaaS General Settings](/grabwp-tenancy-waas/waas-configure-general) — domain nền tảng, xác thực, trang
6. [Tạo gói dịch vụ](/grabwp-tenancy-waas/waas-create-plans) — gói miễn phí và trả phí
7. [Thiết lập thanh toán](/grabwp-tenancy-waas/waas-setup-billing) — tích hợp thanh toán Polar
8. [Thiết lập mẫu giao diện](/grabwp-tenancy-waas/waas-setup-templates) — mẫu, tag, nhóm tag
9. [Thiết lập trang Frontend](/grabwp-tenancy-waas/waas-setup-frontend-pages) — đăng ký, bảng điều khiển, trình duyệt mẫu

### Ra mắt

10. [Danh sách kiểm tra Go-Live](/grabwp-tenancy-waas/waas-go-live-checklist) — xác minh mọi thứ trước khi mở cho khách hàng

### Vận hành

11. [Quản lý tên miền riêng](/grabwp-tenancy-waas/waas-managing-domains) — Cloudflare SaaS và trỏ IP trực tiếp
12. [Quản lý gói đăng ký](/grabwp-tenancy-waas/waas-managing-subscriptions) — vòng đời subscription và thao tác quản trị

### Tích hợp tùy chọn

13. [Lưu trữ S3 Object Storage](/grabwp-tenancy-waas/waas-optional-s3-storage) — chuyển media sang lưu trữ tương thích S3
14. [Thanh toán WooCommerce](/grabwp-tenancy-waas/waas-optional-woocommerce) — sử dụng WooCommerce làm nhà cung cấp thanh toán

### Tham khảo

15. [Xử lý sự cố](/grabwp-tenancy-waas/waas-troubleshooting) — các vấn đề thường gặp và cách khắc phục
- [Tham chiếu Shortcode: Trình duyệt mẫu](/grabwp-tenancy-waas/waas-shortcode-templates)
- [Hướng dẫn Block: Trình duyệt mẫu](/grabwp-tenancy-waas/waas-block-walkthrough)

---

**Yêu cầu hệ thống:** WordPress 5.0+, PHP 7.4+, MySQL 5.7+
