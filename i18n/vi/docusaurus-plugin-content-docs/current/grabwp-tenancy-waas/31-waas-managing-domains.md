---
title: "Quản lý tên miền riêng"
description: "Cho phép khách hàng sử dụng tên miền riêng qua Cloudflare SaaS hoặc chế độ IP trực tiếp"
order: 31
section: waas
---

# Quản lý tên miền riêng

Tên miền riêng cho phép khách hàng dùng tên miền của họ (ví dụ: `mybusiness.com`) thay vì subdomain (`mybusiness.yoursaas.com`). GrabWP WaaS hỗ trợ hai phương thức.

Điều hướng đến **WaaS → Domains** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-domains`).

![Quản trị tên miền](../images/waas-domains.png)

## Chế độ tên miền

Cấu hình chế độ trong **WaaS → Settings → General → Custom Domains**.

| Chế độ | Cách hoạt động | Phù hợp nhất với |
|------|-------------|----------|
| **Cloudflare SaaS** | Khách hàng thêm bản ghi CNAME trỏ tới fallback origin của bạn. Cloudflare xử lý SSL và định tuyến. | Nền tảng production, SSL tự động, khả năng mở rộng |
| **Direct IP** | Khách hàng thêm bản ghi A trỏ tới IP server của bạn. Bạn cấu hình tên miền trên server. | Thiết lập đơn giản, hosting không dùng Cloudflare |

## Custom Hostnames của Cloudflare SaaS

Đây là phương án được khuyến nghị cho môi trường production. Cloudflare tự động xử lý chứng chỉ SSL cho mọi tên miền riêng.

### Thiết lập một lần (phía bạn)

1. **Thêm tên miền của bạn vào Cloudflare** (nếu chưa thêm)
2. **Bật Cloudflare for SaaS** cho zone của bạn:
   - Liên hệ bộ phận hỗ trợ Cloudflare hoặc dùng dashboard → SSL/TLS → Custom Hostnames
   - Tính năng này có thể yêu cầu gói Cloudflare trả phí
3. **Đặt fallback origin:**
   - Trong dashboard Cloudflare → SSL/TLS → Custom Hostnames → Add Fallback Origin
   - Đặt thành subdomain nền tảng của bạn (ví dụ: `cdn.saas.yoursaas.com`)
   - Tạo bản ghi DNS A cho subdomain này trỏ tới server của bạn
4. **Cấu hình trong WaaS:**
   - Vào WaaS → Settings → General → Custom Domains
   - Đặt Domain Mode thành **Cloudflare SaaS**
   - Nhập CNAME Target của bạn (ví dụ: `cdn.saas.yoursaas.com`)

> **Tài liệu Cloudflare:** [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) — bao gồm thiết lập, SSL và tự động hóa API.

### Luồng cho từng khách hàng

Khi khách hàng muốn dùng tên miền riêng:

1. **Phía khách hàng:** Thêm bản ghi CNAME vào DNS của họ:
   ```
   mybusiness.com  →  CNAME  →  cdn.saas.yoursaas.com
   ```

2. **Phía bạn (admin):** Thêm tên miền trong WaaS → Domains hoặc khách hàng có thể thêm qua Dashboard tenant:
   - Nhấn **Add Domain**
   - Nhập tên miền riêng
   - Nhấn **Verify** — kiểm tra việc truyền DNS

3. **Cloudflare** tự động cấp chứng chỉ SSL cho tên miền riêng

4. Site tenant hiện có thể truy cập tại `mybusiness.com`

### Mẫu hướng dẫn cho khách hàng

Chia sẻ nội dung này với khách hàng khi họ yêu cầu tên miền riêng:

> **Để kết nối tên miền của bạn:**
> 1. Đăng nhập vào nhà đăng ký tên miền của bạn (GoDaddy, Namecheap, v.v.)
> 2. Vào cài đặt DNS
> 3. Thêm một bản ghi CNAME:
>    - **Name/Host:** `@` hoặc `www` (hoặc subdomain của bạn)
>    - **Value/Target:** `cdn.saas.yoursaas.com`
>    - **TTL:** Automatic hoặc 300
> 4. Chờ 5–10 phút để DNS được truyền
> 5. Vào Dashboard → Domains → Add Domain
> 6. Nhập tên miền của bạn và nhấn Verify

## Chế độ Direct IP

Đơn giản hơn nhưng đòi hỏi cấu hình server thủ công cho từng tên miền.

### Thiết lập

1. Trong WaaS → Settings → General → Custom Domains:
   - Đặt Domain Mode thành **Direct IP**
   - Nhập **Server Public IP** của bạn

2. Với mỗi tên miền riêng, bạn cần:
   - Thêm server block (Nginx) hoặc virtual host (Apache) cho tên miền
   - Trỏ nó tới bản cài đặt WordPress của bạn
   - Thiết lập SSL (ví dụ: qua Let's Encrypt / Certbot)

### Luồng cho từng khách hàng

1. **Khách hàng:** Thêm bản ghi A vào DNS của họ:
   ```
   mybusiness.com  →  A  →  203.0.113.50
   ```

2. **Bạn:** Thêm tên miền vào cấu hình web server:

   **Ví dụ Nginx:**
   ```nginx
   server {
       listen 80;
       server_name mybusiness.com;
       # ... same config as your main site
   }
   ```

   Sau đó chạy Certbot cho SSL:
   ```bash
   sudo certbot --nginx -d mybusiness.com
   ```

3. **Trang quản trị:** Thêm và xác minh tên miền trong WaaS → Domains

> **Lưu ý:** Direct IP yêu cầu thao tác server thủ công cho mỗi tên miền. Cloudflare SaaS được khuyến nghị nếu bạn dự kiến có nhiều tên miền riêng.

## Quản lý tên miền từ Dashboard tenant

Khách hàng cũng có thể quản lý tên miền từ Dashboard tenant của họ (trang `/dashboard/` của bạn):

- **Add Domain** — nhập tên miền riêng
- **Verify** — kiểm tra việc truyền DNS
- **Set Primary** — đặt một tên miền làm URL chính cho site của họ
- **Remove** — ngắt kết nối một tên miền riêng

## Xác minh tên miền

Sau khi thêm tên miền, quá trình xác minh kiểm tra:
- Bản ghi DNS tồn tại và trỏ đúng (CNAME hoặc bản ghi A)
- Tên miền phân giải tới server của bạn
- SSL hoạt động (với Cloudflare SaaS, việc này là tự động)

Quá trình xác minh có thể mất vài phút tùy vào việc truyền DNS.

---

**Tiếp theo:** [Quản lý gói đăng ký](/vi/grabwp-tenancy-waas/waas-managing-subscriptions)
