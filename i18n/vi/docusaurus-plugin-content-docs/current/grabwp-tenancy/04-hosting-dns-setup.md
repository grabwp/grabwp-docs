---
title: "Thiết lập Domain & DNS"
description: "Kết nối domain tùy chỉnh hoặc dùng định tuyến theo path cho tenant site"
order: 5
section: base
---

# Thiết lập Domain & DNS

Bạn có hai cách để định tuyến khách truy cập đến tenant site. Định tuyến theo path không cần cấu hình gì. Domain tùy chỉnh thì cần cấu hình hosting và DNS.

## Tùy chọn A - Định tuyến theo path (Khuyến nghị để thiết lập nhanh)

Truy cập bất kỳ tenant site nào qua URL path trên domain hiện có của bạn, không cần đổi DNS, không cần cấu hình hosting:

```
https://yoursite.com/site/{tenant-id}
```

Ví dụ: `https://yoursite.com/site/abc123`

Tính năng này hoạt động tự động trên máy chủ **Apache** và **LiteSpeed** vì plugin sẽ cấu hình rewrite rules trong `.htaccess` khi kích hoạt.

### Cấu hình Nginx

Nginx không dùng `.htaccess`, vì vậy bạn cần thêm rule server block thủ công:

```nginx
location ~ ^/site/([a-z][a-z0-9]{5})(/|$) {
    rewrite ^/site/([a-z][a-z0-9]{5})/?(.*)$ /$2 break;
    try_files $uri $uri/ /index.php?site=$1&$args;
}
```

Thêm block này vào bên trong block WordPress `server {}` hiện tại của bạn, sau đó reload Nginx.

---

## Tùy chọn B - Định tuyến theo query string

Truy cập tenant site bằng cách thêm ID vào query parameter, phù hợp để kiểm thử hoặc khi bạn không thể chỉnh cấu hình máy chủ:

```
https://yoursite.com/?site={tenant-id}
```

Ví dụ: `https://yoursite.com/?site=abc123`

Không cần cấu hình máy chủ. Hoạt động trên mọi hosting. Không khuyến nghị dùng cho production vì URL không thân thiện.

---

## Tùy chọn C - Domain tùy chỉnh

Gán cho mỗi tenant site một domain riêng (ví dụ: `client.com` hoặc `client.yoursite.com`). Cần hai bước: cấu hình hosting và cấu hình DNS.

### Bước 1: Thêm domain trong hosting

Đăng nhập vào control panel hosting và thêm domain:

**Với subdomain** (ví dụ: `client.yoursite.com`):
- Tìm **Parked Domains** hoặc **Domain Aliases**
- Thêm subdomain trỏ đến thư mục WordPress chính của bạn

**Với domain ngoài** (ví dụ: `clientsite.com`):
- Tìm **Addon Domains**
- Đặt document root là thư mục WordPress chính của bạn
- Không tạo thư mục con mới

| Control Panel | Vị trí thêm |
|--------------|-------------|
| cPanel | Parked Domains (subdomain) hoặc Addon Domains (domain ngoài) |
| Plesk | Websites & Domains → Add Domain |
| DirectAdmin | Domain Management → Add New Domain |

### Bước 2: Cập nhật DNS

**Với subdomain**: thêm bản ghi A tại nhà cung cấp DNS:
- **Name:** subdomain (ví dụ: `client`)
- **Type:** A
- **Value:** địa chỉ IP của máy chủ

**Với domain ngoài**: cập nhật nameserver tại nhà đăng ký domain để trỏ về hosting của bạn, hoặc thêm bản ghi A nếu bạn quản lý DNS riêng.

### Bước 3: Chờ DNS cập nhật

Thay đổi DNS thường mất 5 đến 30 phút, đôi khi tới 24 giờ. Dùng [dnschecker.org](https://dnschecker.org) để xác nhận domain đã phân giải đúng tới máy chủ của bạn.

### Kiểm tra

Truy cập domain, bạn sẽ thấy màn hình WordPress của tenant site. Nếu bạn thấy trang mặc định của hosting, nghĩa là document root chưa trỏ về đúng thư mục WordPress.

## Quy tắc định dạng domain

- Định dạng hợp lệ: `example.com`, `sub.example.com`
- Không dùng địa chỉ IP hoặc `localhost`
- Chỉ dùng chữ cái, số và dấu gạch nối
