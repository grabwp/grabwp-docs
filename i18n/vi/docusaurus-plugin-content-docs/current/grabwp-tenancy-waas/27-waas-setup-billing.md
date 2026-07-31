---
title: "Thiết lập thanh toán"
description: "Kết nối Polar làm nhà cung cấp thanh toán cho việc thanh toán subscription"
order: 27
section: waas
---

# Thiết lập thanh toán

Thiết lập thanh toán kết nối các gói dịch vụ của bạn với nhà cung cấp thanh toán để khách hàng có thể thanh toán cho gói đăng ký. GrabWP WaaS hỗ trợ **Polar** (chính) và **WooCommerce** (thay thế).

Hướng dẫn này trình bày về Polar. Với WooCommerce, xem [Thanh toán WooCommerce](/vi/grabwp-tenancy-waas/waas-optional-woocommerce).

Điều hướng đến **WaaS → Settings → Billing** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Cài đặt thanh toán](../images/waas-billing-settings.png)

## Bước 1: Tạo tài khoản Polar

1. Vào [polar.sh](https://polar.sh) và tạo một tài khoản
2. Tạo một **Organization** nếu bạn chưa có
3. Ghi lại URL bảng điều khiển organization của bạn — bạn sẽ cần đến nó

## Bước 2: Tạo sản phẩm trong Polar

Với mỗi gói trả phí, tạo một sản phẩm tương ứng trong Polar.

1. Trong bảng điều khiển Polar, vào **Products**
2. Nhấn **Create Product**
3. Thiết lập sản phẩm của bạn:

| Trường | Giá trị |
|-------|-------|
| **Name** | Giống tên gói của bạn (ví dụ: "Pro Monthly") |
| **Type** | Subscription |
| **Price** | Phải khớp với giá gói của bạn (ví dụ: $9.99/tháng) |
| **Billing Interval** | Monthly (hoặc Yearly cho sản phẩm hàng năm) |

4. Sau khi tạo sản phẩm, sao chép **Product ID** (UUID) của nó từ trang cài đặt sản phẩm

> **Tạo các sản phẩm riêng cho thanh toán hàng tháng và hàng năm.** Ví dụ: "Pro Monthly" ($9.99/tháng) và "Pro Yearly" ($99.99/năm).

## Bước 3: Cấu hình Polar trong WaaS

Trên tab Billing Providers:

1. Tìm thẻ nhà cung cấp **Polar**
2. Đánh dấu **Enable this provider**
3. Điền vào:

| Trường | Mô tả |
|-------|-------------|
| **API URL** | `https://api.polar.sh` (sản xuất) hoặc `https://sandbox-api.polar.sh` (thử nghiệm) |
| **Access Token** | Token API Polar của bạn — tạo trong Polar → Settings → API |
| **Webhook Secret** | Chuỗi bí mật để xác minh tính xác thực của webhook |

4. Nhấn **Save Settings**

## Bước 4: Thiết lập Webhook

WaaS cần nhận các sự kiện thanh toán từ Polar để kích hoạt gói đăng ký.

1. Trong bảng điều khiển Polar, vào **Webhooks**
2. Nhấn **Add Endpoint**
3. Đặt URL thành:
   ```
   https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar
   ```
4. Chọn các sự kiện để gửi:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `order.created`
5. Sao chép **Webhook Secret** và dán vào WaaS → Settings → Billing → Polar → Webhook Secret
6. Lưu cả cài đặt Polar và WaaS

> **Kiểm thử webhook:** Dùng bảng điều khiển Polar → Webhooks → Delivery log để xác minh các sự kiện đang được nhận. Kiểm tra dấu thời gian "Last webhook received" tại WaaS → Settings → Billing.

## Bước 5: Liên kết sản phẩm với gói

Quay lại **WaaS → Settings → Plans** và chỉnh sửa gói trả phí của bạn:

1. Dán **Polar Monthly Product ID** vào trường tương ứng
2. Dán **Polar Yearly Product ID** nếu bạn đã tạo sản phẩm hàng năm
3. Lưu gói

## Bước 6: Kiểm thử một giao dịch thanh toán

Trước khi ra mắt, hãy kiểm thử toàn bộ luồng thanh toán:

1. Đặt API URL của Polar thành endpoint **sandbox**: `https://sandbox-api.polar.sh`
2. Tạo sản phẩm sandbox trong bảng điều khiển sandbox của Polar
3. Thực hiện quy trình đăng ký trên site của bạn và chọn gói trả phí
4. Hoàn tất thanh toán bằng thẻ thử nghiệm sandbox của Polar
5. Xác minh site tenant đã được khởi tạo và gói đăng ký ở trạng thái active trong WaaS → Subscriptions

Sau khi xác minh, chuyển lại về API URL sản xuất và các sản phẩm sản xuất.

---

**Tiếp theo:** [Thiết lập mẫu giao diện](/vi/grabwp-tenancy-waas/waas-setup-templates)
