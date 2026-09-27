---
title: "Domain và DNS"
description: "Trỏ domain riêng về tenant site"
order: 4
section: tenancy
---

# Domain và DNS

Mỗi tenant site nên được mở bằng domain riêng, chẳng hạn `client.com` hoặc `client.yoursite.com`. Domain phải trỏ về máy chủ này, và host phải phục vụ đúng thư mục WordPress này cho domain đó.

Thêm domain cho tenant trước: **Tenancy → All Tenants**, rồi **Settings** trên dòng (`page=grabwp-tenancy-edit`). Xem [Quản lý tenant site](/grabwp-tenancy/creating-tenants).

> **Note:** Trước khi DNS xong, màn Edit hiện **Path URL** để bạn mở xem trước tạm thời. Hãy gắn domain trước khi chia sẻ site.

## Bước 1: Thêm domain trong hosting

Trỏ domain về cùng document root với bản WordPress chính. Đừng tạo thư mục riêng hay một bản WordPress thứ hai.

**Subdomain** (ví dụ `client.yoursite.com`):

- Thêm dưới dạng parked domain, alias, hoặc subdomain có document root là thư mục WordPress chính.

**Domain bên ngoài** (ví dụ `clientsite.com`):

- Thêm dưới dạng addon domain hoặc domain mới.
- Đặt document root là thư mục WordPress chính.

| Control panel | Nơi thêm |
|---------------|-----------------|
| cPanel | Parked Domains (subdomain) hoặc Addon Domains (domain ngoài) |
| Plesk | Websites & Domains → Add Domain |
| DirectAdmin | Domain Management → Add New Domain |

## Bước 2: Cập nhật DNS

**Subdomain:** thêm bản ghi A tại nhà cung cấp DNS.

| Trường | Giá trị |
|-------|--------|
| Name | Nhãn subdomain (ví dụ `client`) |
| Type | A |
| Value | Địa chỉ IP của máy chủ này |

**Domain bên ngoài:** tại nhà đăng ký, trỏ domain về host này (nameserver hoặc bản ghi A), cùng địa chỉ IP.

## Bước 3: Chờ phân giải

Thay đổi DNS thường có hiệu lực trong 5 đến 30 phút và có thể mất tới 24 giờ. Kiểm tra domain trên [dnschecker.org](https://dnschecker.org).

## Định dạng domain

Form tenant nhận `example.com` và `subdomain.example.com`.

- Không `http://` và không tiền tố `www` (thêm `www.example.com` thành một domain riêng nếu bạn cần)
- Không địa chỉ IP và không `localhost`
- Chỉ chữ, số, và dấu gạch ngang
- Mỗi domain chỉ thuộc một tenant

**Verify:** Mở domain trên trình duyệt. Bạn phải thấy site WordPress của tenant đó. Trang mặc định của hosting nghĩa là document root không phải thư mục WordPress này.
