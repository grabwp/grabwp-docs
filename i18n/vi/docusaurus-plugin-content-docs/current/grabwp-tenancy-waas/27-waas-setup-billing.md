---
title: "Thiết lập billing"
description: "Kết nối Polar làm nhà cung cấp thanh toán cho subscription"
order: 27
section: waas
---

# Thiết lập billing

Billing giúp kết nối các plan của bạn với một nhà cung cấp thanh toán để khách hàng có thể trả phí cho subscription của họ. GrabWP WaaS hỗ trợ **Polar** (ưu tiên) và **WooCommerce** (thay thế).

Hướng dẫn này sẽ đi sâu vào Polar. Nếu bạn dùng WooCommerce, hãy xem [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce).

Bạn hãy truy cập vào **WaaS → Settings → Billing** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Cài đặt billing](../images/waas-billing-settings.png)

## Cài đặt tiền tệ

Phía trên danh sách các nhà cung cấp, phần **Currency Settings** giúp bạn quản lý cách lưu trữ, hiển thị giá của các plan và quy đổi ngoại tệ khi nhà cung cấp thanh toán yêu cầu.

![Cài đặt tiền tệ](../images/waas-currency-settings.png)

| Field | Description |
|-------|-------------|
| **Primary Currency** | Loại tiền tệ hiển thị cho khách hàng trên trang bảng giá và hóa đơn. Giá của plan sẽ được lưu bằng loại tiền tệ này. Mặc định là USD. |
| **Secondary Currency** | Tuỳ chọn. Cấu hình phần này khi nhà cung cấp thanh toán bắt buộc dùng loại tiền tệ khác với primary (ví dụ: SePay yêu cầu VND). Chọn **None (single currency)** nếu trang của bạn chỉ dùng một loại tiền tệ duy nhất. |
| **Exchange Rate** | Tỷ giá quy đổi (số lượng secondary tương ứng với 1 primary). WaaS sẽ áp dụng tỷ giá này trước khi gửi yêu cầu charge tiền tới các nhà cung cấp yêu cầu ngoại tệ phụ (chẳng hạn như SePay). Polar và Stripe charge theo loại tiền tệ riêng của họ và không sử dụng tỷ giá này. |
| **Currency Position** | Vị trí hiển thị ký hiệu tiền tệ: Trái (`$99.99`), Trái có dấu cách, Phải, hoặc Phải có dấu cách. |
| **Decimal Separator** | Ký tự dùng để phân cách phần thập phân. |
| **Thousand Separator** | Ký tự dùng để phân cách phần nghìn. |

> **Mẹo:** Hãy để **Secondary Currency** là **None (single currency)** để sử dụng chế độ một tiền tệ (không cần quy đổi). Khi bạn thiết lập một secondary currency, giá plan và template được lưu theo primary currency sẽ được chuyển đổi sang loại tiền tệ thanh toán của nhà cung cấp trước khi Polar tạo các sản phẩm combo/one-time, và loại tiền tệ đã quy đổi sẽ được ghi nhận lại để các lần gia hạn tính phí đúng số tiền. Nếu loại tiền tệ đích không nằm trong cặp tiền tệ đã cấu hình, quá trình quy đổi sẽ trả về lỗi thay vì âm thầm trừ khoản tiền chưa quy đổi. Một nhà cung cấp yêu cầu loại tiền cụ thể (ví dụ SePay yêu cầu VND) sẽ bị chặn lại lúc lưu cài đặt trừ khi loại tiền tệ đó đã được đặt làm primary hoặc secondary.

## Bước 1: Tạo tài khoản Polar

1. Vào trang [polar.sh](https://polar.sh) và tạo một tài khoản.
2. Tạo một **Organization** nếu bạn chưa có.
3. Hãy lưu lại URL dashboard của organization vì bạn sẽ cần dùng đến nó.

## Bước 2: Tạo các sản phẩm trên Polar

Với mỗi plan trả phí, hãy tạo một sản phẩm tương ứng trên Polar.

1. Trong dashboard của Polar, hãy truy cập vào **Products**.
2. Bấm vào **Create Product**.
3. Cấu hình sản phẩm của bạn:

| Field | Value |
|-------|-------|
| **Name** | Đặt tên giống hệt với tên plan của bạn (ví dụ: "Pro Monthly"). |
| **Type** | Subscription. |
| **Price** | Phải khớp chính xác với giá plan của bạn (ví dụ: $9.99/tháng). |
| **Billing Interval** | Monthly (hoặc Yearly đối với các sản phẩm theo năm). |

4. Sau khi tạo sản phẩm xong, hãy copy **Product ID** (UUID) của nó từ trang cài đặt sản phẩm.

> **Tạo các sản phẩm riêng biệt cho kỳ thanh toán hàng tháng và hàng năm.** Ví dụ: "Pro Monthly" ($9.99/tháng) và "Pro Yearly" ($99.99/năm).

## Bước 3: Cấu hình Polar trong WaaS

Trên tab Billing Providers:

1. Tìm thẻ nhà cung cấp **Polar**.
2. Tích vào **Enable this provider**.
3. Điền các thông tin sau:

| Field | Description |
|-------|-------------|
| **API URL** | `https://api.polar.sh` (môi trường production) hoặc `https://sandbox-api.polar.sh` (môi trường thử nghiệm). |
| **Access Token** | API token của bạn từ Polar, bạn có thể tạo mã này trong Polar → Settings → API. |
| **Webhook Secret** | Chuỗi bảo mật dùng để xác thực tính hợp lệ của webhook. |

4. Bấm vào **Save Settings**.

## Bước 4: Thiết lập webhook

WaaS cần nhận các sự kiện thanh toán từ Polar để có thể kích hoạt các subscription.

1. Trong dashboard của Polar, hãy vào mục **Webhooks**.
2. Bấm vào **Add Endpoint**.
3. Nhập URL với định dạng như sau:
   ```
   https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar
   ```
4. Chọn các sự kiện cần gửi:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `order.created`
5. Copy **Webhook Secret** và dán vào mục WaaS → Settings → Billing → Polar → Webhook Secret.
6. Lưu cả cài đặt trên Polar và trong WaaS.

> **Kiểm tra webhook:** Hãy vào Polar dashboard → Webhooks → Delivery log để xác nhận xem các sự kiện đã được gửi đi chưa. Bạn cũng có thể kiểm tra thời gian nhận webhook gần nhất tại dòng "Last webhook received" trong WaaS → Settings → Billing.

## Bước 5: Liên kết sản phẩm với plan

Quay lại phần **WaaS → Settings → Plans** và chỉnh sửa plan trả phí của bạn:

1. Dán **Polar Monthly Product ID** vào trường tương ứng.
2. Dán **Polar Yearly Product ID** nếu bạn đã tạo một sản phẩm tính phí theo năm.
3. Bấm lưu plan.

## Bước 6: Thử nghiệm thanh toán

Trước khi ra mắt chính thức, bạn nên kiểm tra lại toàn bộ luồng thanh toán:

1. Đặt API URL của Polar thành endpoint **sandbox**: `https://sandbox-api.polar.sh`.
2. Tạo các sản phẩm sandbox trong bảng điều khiển sandbox của Polar.
3. Thử đăng ký tài khoản trên trang của bạn và chọn một plan trả phí.
4. Hoàn tất thanh toán bằng các thẻ thử nghiệm (test cards) của Polar.
5. Kiểm tra xem tenant site đã được tạo (provisioning) thành công và subscription có chuyển sang trạng thái hoạt động trong WaaS → Subscriptions chưa.

Sau khi mọi thứ hoạt động trơn tru, hãy chuyển API URL và các sản phẩm về lại môi trường production.

---

**Tiếp theo:** [Thiết lập templates](/grabwp-tenancy-waas/waas-setup-templates)
