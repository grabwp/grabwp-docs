---
title: "Cài đặt email và template"
description: "Đặt người nhận thông báo admin, footer email, số ngày nhắc trial, và sửa 18 template cho khách, admin và khách truy cập"
order: 42
section: waas
---

# Cài đặt email và template

Tab **Email** quyết định ai nhận thông báo admin, footer ở cuối mọi email, lúc nào gửi nhắc trial, và nội dung của từng template.

Bạn hãy truy cập vào **Waas → Settings → Email** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=email`).

![Cài đặt email](../images/05-waas-settings-email.png)

## Cài đặt email

| Trường | Ghi chú |
|---|---|
| **Admin notification recipients** | Danh sách email cách nhau bởi dấu phẩy. Địa chỉ không hợp lệ sẽ bị bỏ. Để trống thì dùng email admin của site. |
| **Footer text** | Hiện ở cuối mọi email, phía trên link về site này. |
| **Trial reminder days** | Các mốc số ngày trước khi trial tích hợp kết thúc để gửi **Free trial ending**, cách nhau bởi dấu phẩy. Mặc định `7,3,1`. Để trống thì không gửi. |

Bấm **Save Changes**.

## Template email

Bảng **Email templates** có ba cột: **Email**, **Recipient** và **Status**. **Email** hiện tên template và subject hiện tại. **Status** là **Enabled** hoặc **Disabled**, kèm **Customized** khi bạn đã sửa so với mặc định. Mặc định mọi template đều bật.

### Customer

| Email | Subject mặc định |
|---|---|
| **Welcome** | `Welcome to {site_name} -- Your site is being set up` |
| **Site setup complete** | `{site_name} -- Your site setup is complete` |
| **Renewal reminder** | `{site_name} -- Renew your plan to keep your site active` |
| **Plan expired (grace period)** | `{site_name} -- Your plan has expired` |
| **Site suspended** | `{site_name} -- Your site has been suspended` |
| **Invoice created** | `{site_name} -- Invoice {invoice_number} for your subscription renewal` |
| **Invoice paid** | `{site_name} -- Payment received, subscription renewed` |
| **Free trial started** | `{site_name} -- Your free trial has started` |
| **Free trial ending** | `{site_name} -- Your free trial ends in {days_left} day(s)` |
| **Free trial ended** | `{site_name} -- Your free trial has ended` |
| **Verification code** | `[{site_name}] Your verification code: {otp_code}` |

**Verification code** là bắt buộc cho signup và đăng nhập. Không tắt được, và body phải chứa `{otp_code}`.

### Admin

Gửi tới **Admin notification recipients**.

| Email | Subject mặc định |
|---|---|
| **New signup** | `[{site_name}] New site created: {tenant_domain}` |
| **Provisioning failed** | `[{site_name}] Site setup failed for {customer_email}` |
| **Payment received** | `[{site_name}] Payment received from {customer_email}` |
| **Payment failed** | `[{site_name}] Payment failed or overdue for {tenant_id}` |
| **Subscription cancelled** | `[{site_name}] Subscription cancelled for {tenant_id}` |
| **Tenant suspended** | `[{site_name}] Tenant suspended: {tenant_id}` |

### Site visitors

| Email | Subject mặc định |
|---|---|
| **Suspended site page** | `{tenant_domain} is temporarily unavailable` |

Đây là trang khách truy cập thấy trên site bị suspend, không phải email. Trang này luôn bật và không có nút **Send test email**.

## Sửa template

1. Bấm tên template ở cột **Email**.
2. Đặt **Enabled** (**Send this email**), **Subject** và **HTML body**. Header, màu và footer được thêm tự động. Bản plain-text được tạo từ HTML.
3. Bấm một nút trong **Tokens** để chèn token đó vào vị trí con trỏ trong subject hoặc body.
4. Bấm **Save template**.

**Preview** mở email đã render trong tab mới. **Send test email** gửi email tới địa chỉ email user của bạn. Cả hai dùng giá trị token mẫu cùng subject và body đang có trong form. **Reset to default** hiện ra khi template đã được sửa.

Bấm **All email templates** để quay lại danh sách.

**Kiểm tra:** sau khi bấm **Save template**, thông báo **Settings saved.** hiện trên màn hình sửa. Quay lại danh sách, dòng đó hiện **Customized** ở cột **Status**. **Send test email** hiện **Test email sent to** kèm địa chỉ của bạn.

---

**Liên quan:** [Cấu hình Signup Flow](/grabwp-tenancy-waas/waas-signup-flow)
