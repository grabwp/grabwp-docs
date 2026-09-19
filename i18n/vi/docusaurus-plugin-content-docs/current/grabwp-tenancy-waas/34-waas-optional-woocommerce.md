---
title: "Thanh toán WooCommerce"
description: "Sử dụng WooCommerce làm nhà cung cấp thanh toán thay thế cho các cổng thanh toán địa phương"
order: 34
section: waas
---

# Thanh toán WooCommerce (Tùy chọn)

Sử dụng WooCommerce làm nhà cung cấp thanh toán thay thế (hoặc song song với) Polar. Điều này rất hữu ích nếu bạn đang có sẵn một cửa hàng WooCommerce, cần các cổng thanh toán địa phương (như Stripe, PayPal, chuyển khoản ngân hàng trong nước), hoặc muốn quản lý phần thanh toán ngay trong WordPress.

## Khi nào nên dùng WooCommerce

| Trường hợp sử dụng | Nhà cung cấp đề xuất |
|----------|---------------------|
| Thanh toán subscription đơn giản, quốc tế | **Polar** |
| Đã có cửa hàng WooCommerce, cần cổng thanh toán địa phương | **WooCommerce** |
| Chuyển khoản ngân hàng Việt Nam (VietQR) | **SePay** (plugin riêng lẻ) |
| Nhiều tùy chọn thanh toán cho khách hàng | **Cả hai** (bật nhiều nhà cung cấp) |

## Tổng quan cài đặt

### Bước 1: Cài đặt WooCommerce

1. Vào **Plugins → Add New**
2. Tìm kiếm **WooCommerce**
3. Cài đặt và kích hoạt plugin
4. Hoàn thành trình hướng dẫn thiết lập WooCommerce (cấu hình tiền tệ, phương thức thanh toán, v.v.)

> **Tài liệu WooCommerce:** [Bắt đầu](https://woocommerce.com/document/woocommerce-getting-started/)

### Bước 2: Cấu hình cổng thanh toán

Trong **WooCommerce → Settings → Payments**, hãy bật các cổng thanh toán mà bạn muốn cung cấp:

- Stripe
- PayPal
- Chuyển khoản ngân hàng
- Bất kỳ cổng thanh toán nào tương thích với WooCommerce

> Mỗi cổng thanh toán có cách cài đặt riêng. Xem thêm [tài liệu cổng thanh toán của WooCommerce](https://woocommerce.com/product-category/woocommerce-extensions/payment-gateways/).

### Bước 3: Tạo sản phẩm anchor

WaaS sử dụng một **sản phẩm anchor** dùng chung (một sản phẩm WooCommerce ẩn) để định giá động tại trang checkout. Bạn không cần tạo các sản phẩm riêng biệt cho từng plan.

1. Vào **WaaS → Settings → General**
2. Bấm nút **Create/Repair WooCommerce Anchor Product**
3. Một sản phẩm ẩn sẽ được tạo tự động

Hoặc bạn có thể nhập thủ công ID của sản phẩm vào trường **WooCommerce Anchor Product**.

### Bước 4: Bật WooCommerce làm nhà cung cấp thanh toán

1. Vào **WaaS → Settings → Billing**
2. Tìm thẻ nhà cung cấp **WooCommerce**
3. Đánh dấu vào hộp kiểm **Enable this provider**
4. Lưu cài đặt

### Bước 5: Cấu hình tiền tệ

Nếu bạn bật WooCommerce, mục **Primary Currency** sẽ bị khóa theo loại tiền tệ trong cửa hàng WooCommerce của bạn. Để thay đổi loại tiền tệ này, hãy vào **WooCommerce → Settings → General → Currency**.

## Cách hoạt động

Khác với Polar (sử dụng trang checkout bên ngoài), quá trình thanh toán của WooCommerce diễn ra ngay trên trang web của bạn:

1. Khách hàng chọn một plan trả phí khi đăng ký
2. WaaS tạo một giỏ hàng WooCommerce với mức giá của plan đó
3. Khách hàng được chuyển hướng đến trang checkout của WooCommerce
4. Khách hàng hoàn tất thanh toán bằng cổng thanh toán bạn đã cấu hình
5. Khi đơn hàng hoàn tất, WaaS sẽ tự động cấp phát (provisioning) trang web

Không cần dùng webhook, vì WooCommerce sử dụng các action hook nội bộ của WordPress.

## WooCommerce Subscriptions (Tùy chọn)

Để thanh toán định kỳ (tự động gia hạn), hãy cài đặt plugin [WooCommerce Subscriptions](https://woocommerce.com/products/woocommerce-subscriptions/). Nếu không có plugin này, WooCommerce chỉ xử lý các khoản thanh toán một lần và bạn sẽ phải quản lý việc gia hạn subscription theo cách thủ công.

## Giới hạn so với Polar

| Tính năng | Polar | WooCommerce |
|---------|-------|-------------|
| Trang checkout bên ngoài | Có | Không (trên trang web của bạn) |
| Quản lý subscription tự động | Có | Yêu cầu plugin WC Subscriptions |
| Đồng bộ trạng thái qua webhook | Có | Dùng WP hook (chỉ nội bộ) |
| Độ phức tạp khi cài đặt | Thấp | Trung bình (cần cấu hình nhiều hơn) |
| Sự linh hoạt của cổng thanh toán | Giới hạn (các cổng của Polar) | Cao (mọi cổng tương thích với WC) |

---

**Tiếp theo:** [Khắc phục sự cố](/grabwp-tenancy-waas/waas-troubleshooting)
