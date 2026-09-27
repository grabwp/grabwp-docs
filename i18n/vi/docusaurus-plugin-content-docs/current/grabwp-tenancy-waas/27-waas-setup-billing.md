---
title: "Thiết lập billing"
description: "Bật Polar.sh, đặt currency và nối product ID của plan"
order: 27
section: waas
---

# Thiết lập billing

Billing nối plan trả phí với payment provider. WaaS tự đăng ký **Polar.sh**. **WooCommerce** chỉ được đăng ký khi WooCommerce đang active. **Stripe**, **Sepay** và **Xendit** xuất hiện sau khi bạn cài các plugin add-on đó. Xem [Install Plugins](/grabwp-tenancy-waas/waas-install-plugins).

Trang này đi qua **Polar.sh**, rồi liệt kê những gì các thẻ khác cần. Chi tiết checkout WooCommerce ở [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce).

Vào **Waas → Settings → Billing Providers** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Billing Providers](../images/waas-billing-settings.png)

Dòng mở đầu là **Browse Add-ons** và **Enable providers below. The first enabled provider is the default fallback.**

Mỗi provider là một thẻ. Thẻ ở **Disabled** cho đến khi bạn chọn **Enable this provider**. **Polar.sh** hiện **Needs Config** đến khi **API Token** và **Webhook Secret** được lưu, rồi chuyển **Active**. Provider khác khi đã bật hiện **Active**. Provider dự phòng được gắn badge **Default**. Bấm **Save Billing Providers** khi đã điền trường. Thông báo thành công: **Billing provider settings saved.**

## Currency Settings

**Currency Settings** là thẻ dưới danh sách provider. Mở nó trước khi bật provider đòi một currency cụ thể.

| Trường | Ghi chú |
|--------|---------|
| **Primary Currency** | Hiện trên trang pricing. Giá plan được lưu bằng currency này. Nếu WooCommerce đang active, select này bị khóa theo store currency của WooCommerce. |
| **Secondary Currency** | Tùy chọn. **None (single currency)** giữ một currency. Đặt khi provider cần currency khác primary (Sepay đòi VND). |
| **Exchange Rate** | Bao nhiêu đơn vị secondary bằng 1 đơn vị primary. Áp dụng trước khi thu provider đòi secondary currency. Polar.sh và Stripe thu theo catalog currency của họ và không dùng tỷ giá này cho số tiền bị charge. |
| **Display formatting** | Accordion lồng: **Currency Position**, **Thousand Separator**, **Decimal Separator** |

Các lựa chọn **Currency Position**: **Left ($99.99)**, **Left with space ($ 99.99)**, **Right (99.99$)**, **Right with space (99.99 $)**.

> **Tip:** Provider đòi một currency (Sepay đòi VND) không bật được trừ khi currency đó là primary hoặc secondary. Lỗi bắt đầu bằng **Currency change blocked:**

## Bước 1: Tài khoản Polar.sh

1. Tạo tài khoản tại [polar.sh](https://polar.sh)
2. Tạo organization
3. Tạo API token trong phần cài đặt organization của Polar
4. Copy organization ID

Bạn không bắt buộc tạo sản phẩm Polar bằng tay. Lưu plan khi Polar đã cấu hình có thể tạo chúng. Bạn vẫn có thể dán UUID sản phẩm có sẵn.

## Bước 2: Bật Polar.sh

Trên thẻ **Polar.sh** (`polar`):

1. Chọn **Enable this provider**
2. Điền:

| Trường | Giá trị |
|--------|---------|
| **API Base URL** | `https://api.polar.sh/v1` cho production. Sandbox: `https://sandbox-api.polar.sh/v1` |
| **API Token** | API token của Polar. Dùng **Show** để hiện. |
| **Webhook Secret** | Secret Polar dùng để ký webhook |
| **Organization ID** | ID organization của Polar |

3. Copy **Webhook URL** bằng **Copy**. Dạng `https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar`
4. Trong Polar, thêm URL đó làm webhook endpoint và dán cùng secret vào **Webhook Secret**
5. Bấm **Save Billing Providers**

Help tip trên **Webhook URL** hiện **Last webhook received:** sau sự kiện đầu, hoặc **No webhook events received yet.**

Thẻ ở **Needs Config** đến khi **API Token** và **Webhook Secret** được lưu. Sau đó nó hiện **Active**.

## Bước 3: Nối plan

Vào **Waas → Settings → Plans**, sửa plan trả phí, mở **Payment Configuration**.

1. Để trống **Polar Monthly Product ID** và **Polar Yearly Product ID** để tự tạo, hoặc dán UUID
2. Hoặc bấm **Find existing** để chọn sản phẩm đã có trong Polar
3. Bấm **Save Plan**

**Resync** trên **Polar.sh Configuration** làm mới object catalog đã nối. Giá trị WaaS tạo được gắn badge **Auto-created**.

## Provider khác

Cài Stripe, Sepay hoặc Xendit từ **Add-ons** trước khi thẻ của chúng xuất hiện. Rồi bật thẻ bạn muốn. Provider được bật đầu tiên là fallback khi signup không chọn provider khác.

| Provider | Plugin | Trường trên thẻ |
|----------|--------|-----------------|
| **Polar.sh** | Gắn sẵn | **API Base URL**, **API Token**, **Webhook Secret**, **Organization ID**, **Webhook URL** |
| **Stripe** | GrabWP Tenancy Stripe | **Secret Key**, **Publishable Key**, **Webhook Signing Secret**, **Thin Signing Secret (v2 Events)** (tùy chọn), **Webhook URL** |
| **Sepay** | GrabWP Tenancy Sepay | **API URL**, **QR URL**, **API Key**, **Bank**, **Account Number**, **Account Holder**, **Payment Code Prefix**, **Webhook URL**. Đòi VND là primary hoặc secondary. |
| **Xendit** | GrabWP Tenancy Xendit | **Secret API Key**, **Webhook Verification Token**, **Charge Currency**, **Country**, **Webhook URL**. Không có product ID theo plan. |
| **WooCommerce** | Plugin WooCommerce, không phải add-on | **Anchor Product**. Để `0` để tự tạo ở lần checkout đầu, hoặc chạy **Create/Repair WooCommerce Anchor Product** trên **General**. |

Trường plan của Stripe (**Stripe Monthly Price ID**, **Stripe Yearly Price ID**) nằm ở tab **Payment Configuration** của plan, cùng cách để trống để tự tạo như Polar.

Webhook URL theo dạng `https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/{provider}` với `{provider}` là `polar`, `stripe`, `sepay` hoặc `xendit`. Dùng nút **Copy** trên thẻ, đừng gõ URL.

## Bước 4: Thử một lần thanh toán

1. Trỏ **API Base URL** tới `https://sandbox-api.polar.sh/v1` và dùng credential sandbox
2. Mở trang signup, chọn plan trả phí, và hoàn tất checkout Polar
3. Xác nhận tip **Webhook URL** có thời điểm nhận gần nhất
4. Xác nhận tenant có trong **Tenancy → All Tenants** và subscription có trong **Waas → Subscriptions**

Đổi **API Base URL** về `https://api.polar.sh/v1` và credential production trước khi ra mắt.

## Kiểm tra

1. Provider bạn sẽ dùng để thu phí hiện **Active**
2. **Currency Settings** gồm mọi currency provider đó đòi
3. **Payment Configuration** của plan trả phí có product ID hoặc price ID cho mỗi chu kỳ bạn bán, hoặc bạn đã lưu plan một lần để WaaS tự tạo chúng

---

**Tiếp theo:** [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates)
