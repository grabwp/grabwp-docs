---
title: "Thanh toán WooCommerce"
description: "Dùng WooCommerce làm nhà cung cấp thanh toán thay thế cho các cổng thanh toán địa phương"
order: 34
section: waas
---

# Thanh toán WooCommerce (Tùy chọn)

Dùng WooCommerce làm nhà cung cấp thanh toán thay cho (hoặc cùng với) Polar. Đây là lựa chọn hữu ích nếu bạn đã vận hành một cửa hàng WooCommerce, cần các cổng thanh toán địa phương (ví dụ: Stripe, PayPal, chuyển khoản ngân hàng nội địa) hoặc muốn quản lý thanh toán trong WordPress.

## Khi nào nên dùng WooCommerce

| Trường hợp sử dụng | Nhà cung cấp đề xuất |
|----------|---------------------|
| Thanh toán subscription đơn giản, quốc tế | **Polar** |
| Đã có cửa hàng WooCommerce, cần cổng thanh toán địa phương | **WooCommerce** |
| Chuyển khoản ngân hàng Việt Nam (VietQR) | **SePay** (plugin riêng) |
| Nhiều lựa chọn thanh toán cho khách hàng | **Cả hai** — bật nhiều nhà cung cấp |

## Tổng quan thiết lập

### Bước 1: Cài đặt WooCommerce

1. Đi đến **Plugins → Add New**
2. Tìm **WooCommerce**
3. Cài đặt và kích hoạt
4. Hoàn tất trình hướng dẫn thiết lập WooCommerce (cấu hình tiền tệ, phương thức thanh toán, v.v.)

> **Tài liệu WooCommerce:** [Bắt đầu](https://woocommerce.com/document/woocommerce-getting-started/)

### Bước 2: Cấu hình cổng thanh toán

Trong **WooCommerce → Settings → Payments**, hãy bật các cổng thanh toán bạn muốn cung cấp:

- Stripe
- PayPal
- Chuyển khoản ngân hàng
- Bất kỳ cổng nào khác tương thích với WooCommerce

> Mỗi cổng có cách thiết lập riêng. Xem [tài liệu cổng thanh toán WooCommerce](https://woocommerce.com/product-category/woocommerce-extensions/payment-gateways/).

### Bước 3: Tạo Anchor Product

WaaS sử dụng một **anchor product** dùng chung — sản phẩm WooCommerce ẩn được dùng để định giá động khi thanh toán. Bạn không cần tạo sản phẩm riêng cho từng gói.

1. Đi đến **WaaS → Settings → General**
2. Nhấp nút **Create/Repair WooCommerce Anchor Product**
3. Một sản phẩm ẩn sẽ được tạo tự động

Hoặc đặt thủ công ID anchor product trong trường **WooCommerce Anchor Product**.

### Bước 4: Bật WooCommerce làm nhà cung cấp thanh toán

1. Đi đến **WaaS → Settings → Billing**
2. Tìm thẻ nhà cung cấp **WooCommerce**
3. Chọn **Enable this provider**
4. Lưu cài đặt

### Bước 5: Cấu hình tiền tệ

Nếu WooCommerce được bật, **Primary Currency** sẽ bị khóa theo tiền tệ của cửa hàng WooCommerce. Để thay đổi, đi đến **WooCommerce → Settings → General → Currency**.

## Cách hoạt động

Không giống Polar (dùng trang thanh toán bên ngoài), thao tác thanh toán WooCommerce diễn ra ngay trên site của bạn:

1. Khách hàng chọn gói trả phí khi đăng ký
2. WaaS tạo giỏ hàng WooCommerce với giá của gói
3. Khách hàng được chuyển hướng đến trang thanh toán WooCommerce
4. Khách hàng hoàn tất thanh toán qua cổng bạn đã cấu hình
5. Khi đơn hàng hoàn tất, WaaS tự động khởi tạo site

Không cần webhook — WooCommerce sử dụng các action hook nội bộ của WordPress.

## WooCommerce Subscriptions (Tùy chọn)

Để thanh toán định kỳ (gia hạn tự động), hãy cài plugin [WooCommerce Subscriptions](https://woocommerce.com/products/woocommerce-subscriptions/). Nếu không có plugin này, WooCommerce chỉ xử lý thanh toán một lần và bạn phải quản lý việc gia hạn subscription thủ công.

## Hạn chế so với Polar

| Tính năng | Polar | WooCommerce |
|---------|-------|-------------|
| Trang thanh toán được lưu trữ bên ngoài | Có | Không (trên site) |
| Quản lý subscription tự động | Có | Cần plugin WC Subscriptions |
| Đồng bộ trạng thái dựa trên webhook | Có | Dùng WP hooks (chỉ nội bộ) |
| Độ phức tạp khi thiết lập | Thấp | Trung bình (nhiều cấu hình hơn) |
| Linh hoạt về cổng thanh toán | Hạn chế (các cổng của Polar) | Cao (mọi cổng tương thích WC) |

---

**Tiếp theo:** [Xử lý sự cố](/vi/grabwp-tenancy-waas/waas-troubleshooting)
