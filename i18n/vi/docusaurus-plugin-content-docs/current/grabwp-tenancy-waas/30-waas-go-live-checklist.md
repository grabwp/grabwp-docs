---
title: "Danh sách trước khi ra mắt"
description: "Kiểm tra DNS, trang, plan, billing và một lượt signup đầy đủ trước khi có khách"
order: 30
section: waas
---

# Danh sách trước khi ra mắt

Đi qua danh sách này trên site production trước khi đưa khách tới signup.

## Settings

- [ ] **Platform Domain** đã đặt ở **Waas → Settings → General**, và `*.yoursaas.com` phân giải về server
- [ ] HTTPS chạy trên platform domain và trên một subdomain tenant
- [ ] Đã chọn **Signup Page**, **Dashboard Page**, **Templates Page** và **Pricing Page**
- [ ] **Auth Mode** đúng chế độ bạn muốn (**WAAS Auth (Email signup)** cho self-service)
- [ ] **Tenancy → Pro Settings**: **Database** và **Isolation** khớp cách bạn muốn cho tenant mới
- [ ] Ít nhất một plan **Active** ở **Waas → Settings → Plans**
- [ ] Ít nhất một template đang active ở **Waas → Templates**
- [ ] Provider bạn dùng để thu phí hiện **Active** trên **Billing Providers**
- [ ] Plan trả phí có product ID hoặc price ID trên **Payment Configuration**, hoặc bạn đã lưu để provider tự tạo các ID đó
- [ ] **API Base URL** của Polar.sh là `https://api.polar.sh/v1`, không phải URL sandbox

## Signup plan Free

Dùng cửa sổ trình duyệt riêng tư.

1. Mở trang templates và bắt đầu signup từ một template, hoặc mở thẳng `/signup/`
2. Ở **Create your account**, nhập **Your Name** và **Email Address**
3. Chọn plan **Free**
4. Hoàn tất wizard. **Payment Method** giữ ẩn khi đơn không cần thanh toán
5. Ở **Tenancy → All Tenants**, xác nhận tenant mới có mặt
6. Mở tenant trên subdomain platform (`something.yoursaas.com`)

Subdomain được tạo cho khách. Bạn không gõ nó ở bước account.

Nếu site không xuất hiện, mở **Waas → Settings → Provisioning** và xem intent.

## Signup plan trả phí

1. Mở signup trong cửa sổ riêng tư mới
2. Chọn plan trả phí và billing cycle
3. Ở **Payment Method**, hoàn tất checkout với provider bạn đã bật
4. Trên **Billing Providers**, mở provider đó và xem tip **Webhook URL** có **Last webhook received**
5. Xác nhận tenant ở **Tenancy → All Tenants** và dòng ở **Waas → Subscriptions**

## Dashboard

1. Mở trang dashboard
2. Bạn sẽ thấy **Sign in to your dashboard**
3. Nhập email lúc signup và bấm **Send verification code**
4. Nhập mã từ email và xác nhận dashboard mở

> **Note:** Gửi mail OTP bằng plugin SMTP. Thử với hộp thư bạn kiểm soát được, và xem cả spam.

## Template gallery và pricing

1. Trang templates hiện template đang active, thumbnail và bộ lọc tag
2. Tìm kiếm và một bộ lọc tag đều đổi danh sách
3. Trang pricing hiện plan đang active và giá bạn đã lưu

## Dọn sau khi thử

1. Xóa tenant thử từ **Tenancy → All Tenants**
2. Gỡ subscription thử mà bạn không muốn giữ
3. Nếu đã thử Polar.sh với sandbox, đặt **API Base URL** về `https://api.polar.sh/v1` và dùng credential production

## Trước khi thông báo

| Hạng mục | Xong |
|----------|------|
| Wildcard DNS | |
| Wildcard HTTPS | |
| Đã thử gửi SMTP | |
| Credential billing production | |
| Backup site chính | |
| Trang điều khoản và quyền riêng tư, nếu bạn yêu cầu | |

---

**Tiếp theo:** [Managing Custom Domains](/grabwp-tenancy-waas/waas-managing-domains)
