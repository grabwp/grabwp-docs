---
title: "Bạn sẽ xây dựng gì"
description: "Mục tiêu bài hướng dẫn, kiến trúc hệ thống và luồng đăng ký của khách hàng cho nền tảng WaaS của bạn"
order: 22
section: waas
---

# Bạn sẽ xây dựng gì

Kết thúc bài hướng dẫn này, bạn sẽ có một nền tảng WordPress-as-a-Service hoạt động hoàn chỉnh, nơi khách truy cập có thể tự đăng ký, chọn template cho website, chọn plan và nhận được một trang WordPress đã hoàn tất provisioning.

## Mục tiêu bài hướng dẫn

| Thành phần | Những gì bạn sẽ thiết lập |
|-----------|---------------------|
| **Plans** | 1 plan miễn phí (tính năng cơ bản, không cần thanh toán) + 1 plan trả phí (thanh toán hàng tháng qua Polar) |
| **Billing** | Polar làm cổng thanh toán chính |
| **Templates** | Ít nhất 1 template để khách hàng có thể lựa chọn |
| **Frontend** | Trang đăng ký, thư viện template, dashboard của tenant |
| **Luồng hoạt động** | Từ đầu đến cuối: khách truy cập → chọn template → chọn plan → thanh toán (nếu là plan trả phí) → khởi tạo website |

## Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────┐
│              WEBSITE CHÍNH CỦA BẠN              │
│            (yoursaas.com/wp-admin)              │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Plans   │  │Templates │  │   Billing    │  │
│  │Free / Pro│  │ Gallery  │  │(Polar/WC/..) │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │             CÁC TRANG PUBLIC             │   │
│  │  /signup  /templates  /dashboard         │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
                      │
            Hệ thống Provisioning
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
┌─────────┐    ┌─────────┐    ┌─────────────┐
│ Tenant A │    │ Tenant B │    │  Tenant C   │
│ (free)   │    │  (pro)   │    │   (pro)     │
│ a.you.com│    │ b.you.com│    │ custom.com  │
└─────────┘    └─────────┘    └─────────────┘
```

## Luồng đăng ký của khách hàng

Dưới đây là trải nghiệm thực tế của khách hàng:

1. **Truy cập trang đăng ký** - xem các plan và mức giá
2. **Chọn template** - duyệt qua thư viện template cùng với các tag và bộ lọc
3. **Chọn plan** - plan miễn phí hoặc trả phí
4. **Nhập thông tin website** - subdomain và email
5. **Thanh toán** (nếu là plan trả phí) - chuyển hướng đến trang checkout của Polar
6. **Hoàn tất provisioning** - khách hàng nhận được URL trang WordPress của họ
7. **Truy cập dashboard** - quản lý website, billing, tên miền riêng và backup

## Nhiệm vụ của từng plugin

### GrabWP Tenancy (Base)

Đây là nền tảng cốt lõi. Plugin này xử lý việc định tuyến tenant (subdomain → đúng bảng database), cách ly dữ liệu bằng table prefix và quản lý tenant cơ bản. Tất cả các tenant dùng chung một database MySQL nhưng có các bảng dữ liệu hoàn toàn cách ly với nhau.

### GrabWP Tenancy Pro

Bổ sung các tính năng cách ly và quản lý nâng cao:
- **Database riêng biệt** - mỗi tenant được cấp một database MySQL hoặc file SQLite độc lập
- **Cách ly nội dung** - thư mục theme, plugin và uploads riêng biệt cho từng tenant
- **Lưu trữ S3** - offload các file uploads lên lưu trữ đám mây
- **Backup & restore** - tính năng backup và restore cho từng tenant
- **Nhân bản tenant** - tạo các template bằng cách nhân bản (clone) từ các tenant có sẵn

### GrabWP Tenancy WaaS

Lớp tự phục vụ (self-service) giúp biến WordPress thành một nền tảng SaaS thực thụ:
- **Plans** - cấu hình các plan miễn phí và trả phí cùng với tính năng và bảng giá đi kèm
- **Billing** - tích hợp Polar và WooCommerce để xử lý thanh toán
- **Templates** - thư viện template hỗ trợ tag, nhóm và giới hạn theo plan
- **Luồng đăng ký** - toàn bộ quy trình provisioning từ lúc đăng ký đến khi bàn giao website
- **Dashboard của tenant** - giao diện dashboard dành cho khách hàng để quản lý website
- **Custom domains** - cho phép khách hàng sử dụng tên miền riêng của họ
- **Subscriptions** - quản lý vòng đời subscription cùng với thời gian ân hạn (grace period)

---

**Tiếp theo:** [Cài đặt plugins](/grabwp-tenancy-waas/waas-install-plugins)
