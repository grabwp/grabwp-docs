---
title: "Tổng quan"
description: "Chạy nhiều website WordPress từ một cài đặt duy nhất"
order: 1
section: base
slug: /
---

# GrabWP Tenancy - Tổng quan

GrabWP Tenancy cho phép bạn vận hành nhiều website WordPress tách biệt từ một cài đặt WordPress duy nhất. Mỗi website có domain, nội dung, người dùng và thiết lập riêng, được cô lập hoàn toàn với các website khác.

## Bạn Nhận Được Gì (Miễn Phí)

- **Nhiều website, một cài đặt** - không cần nhiều bộ cài WordPress riêng biệt
- **Định tuyến linh hoạt** - theo domain, theo đường dẫn (`/site/{id}`), hoặc theo query string (`?site={id}`)
- **Nội dung tách biệt** - bài viết, trang, media và người dùng được tách riêng cho từng site
- **Cơ sở dữ liệu dùng chung** - tất cả site dùng chung một cơ sở dữ liệu MySQL với tiền tố bảng riêng
- **Bảng điều khiển quản trị** - quản lý toàn bộ tenant site từ một nơi
- **Truy cập một lần nhấp** - tạo token bảo mật để đăng nhập ngay vào bất kỳ tenant site nào

## Cách Hoạt Động

Khi khách truy cập vào `client1.com`, plugin sẽ nhận diện domain và tải đúng dữ liệu của site từ cơ sở dữ liệu, tất cả đều dùng chung một bộ file WordPress trên máy chủ của bạn.

## Phù Hợp Với Ai?

- **Agency** quản lý nhiều website khách hàng trên một máy chủ
- **Nhà phát triển SaaS** cần site tách biệt cho từng người dùng
- **Lập trình viên** chạy môi trường dev / staging / production từ một cài đặt
- **Doanh nghiệp đa thương hiệu** có website riêng cho từng thương hiệu

## Bản Miễn Phí vs Pro

| Tính năng | Miễn phí | Pro |
|---------|:----:|:---:|
| Nhiều website từ một cài đặt | ✓ | ✓ |
| Định tuyến theo domain / path / query string | ✓ | ✓ |
| Upload tách biệt cho từng site | ✓ | ✓ |
| Cơ sở dữ liệu MySQL dùng chung | ✓ | ✓ |
| Token truy cập admin | ✓ | ✓ |
| Cơ sở dữ liệu riêng cho từng site (MySQL hoặc SQLite) | - | ✓ |
| Plugin & theme riêng theo site | - | ✓ |
| Kiểm soát cô lập nội dung | - | ✓ |
| Sao lưu & khôi phục theo site | - | ✓ |
| Nhân bản tenant | - | ✓ |
| Quản lý domain symlink | - | ✓ |

→ [Tìm hiểu tính năng Pro](/grabwp-tenancy-pro/pro-overview)
