---
title: "Tổng quan"
description: "Chạy nhiều website WordPress từ một cài đặt"
order: 1
section: tenancy
slug: /
---

# GrabWP Tenancy - Tổng quan

GrabWP Tenancy cho phép bạn chạy nhiều website WordPress tách biệt từ một cài đặt WordPress. Mỗi site có domain, nội dung, người dùng và thiết lập riêng.

Khách truy cập vào tenant site bằng domain của site đó (ví dụ `client1.com`). Plugin khớp domain và tải dữ liệu của site từ cùng bộ file WordPress trên máy chủ.

## Bạn nhận được gì (miễn phí)

- **Nhiều site, một cài đặt**: không cần một bộ WordPress riêng cho mỗi site
- **Domain riêng cho mỗi site**: gán một hoặc nhiều domain cho mỗi tenant
- **Nội dung tách biệt**: bài viết, trang, media và người dùng nằm riêng theo site
- **Cơ sở dữ liệu dùng chung**: mọi site dùng một cơ sở dữ liệu MySQL, mỗi site có table prefix riêng
- **Theme và plugin dùng chung**: mọi tenant dùng theme và plugin đã cài trên site chính
- **Một menu quản trị**: quản lý mọi tenant từ **Tenancy** trong wp-admin
- **Truy cập admin**: mở WordPress admin của tenant từ danh sách tenant

## Phù hợp với ai

- **Agency** quản lý website khách hàng trên một máy chủ
- **Người xây SaaS** cần một site riêng cho mỗi khách
- **Lập trình viên** chạy nhiều site từ một cài đặt
- **Doanh nghiệp nhiều thương hiệu** có một site cho mỗi thương hiệu

## Bản miễn phí và Pro

| Tính năng | Miễn phí | Pro |
|---------|:----:|:---:|
| Nhiều site từ một cài đặt | ✓ | ✓ |
| Domain riêng cho mỗi site | ✓ | ✓ |
| Upload tách biệt cho mỗi site | ✓ | ✓ |
| Cơ sở dữ liệu MySQL dùng chung | ✓ | ✓ |
| Mở admin từ danh sách tenant | ✓ | ✓ |
| Cơ sở dữ liệu riêng cho mỗi site (MySQL hoặc SQLite) | - | ✓ |
| Plugin và theme riêng theo site | - | ✓ |
| Cô lập content, plugin và upload | - | ✓ |
| Backup và restore theo site | - | ✓ |
| Backup theo lịch | - | ✓ |
| Clone tenant | - | ✓ |
| Fix URLs | - | ✓ |
| Lưu trữ tương thích S3 và offload backup | - | ✓ |
| Domain symlink | - | ✓ |

→ [Tìm hiểu Pro](/grabwp-tenancy-pro/pro-overview)

→ [Bắt đầu](/grabwp-tenancy/quick-start)
