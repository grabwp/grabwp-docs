---
title: "Thanh toán WooCommerce"
description: "Bật nhà cung cấp WooCommerce, đặt anchor product, và thanh toán trên site của bạn"
order: 34
section: waas
---

# Thanh toán WooCommerce (tùy chọn)

WooCommerce là một nhà cung cấp thanh toán trong WaaS. Thẻ **WooCommerce** chỉ được đăng ký khi plugin WooCommerce đang bật. Các thẻ khác (Polar, Sepay, Stripe, Xendit, và add-on đã bật) ở cùng màn hình. Nhà cung cấp được bật đầu tiên là fallback mặc định.

Checkout chạy trên trang checkout WooCommerce của bạn. WaaS gắn giá gói vào một sản phẩm ẩn dùng chung (anchor product). Plan không lưu WooCommerce product ID riêng.

## Cài WooCommerce

1. Vào **Plugins → Add New**.
2. Cài và kích hoạt **WooCommerce**.
3. Hoàn tất trình hướng dẫn WooCommerce, gồm đơn vị tiền của cửa hàng.

> **Tài liệu WooCommerce:** [Bắt đầu](https://woocommerce.com/document/woocommerce-getting-started/)

Trong **WooCommerce → Settings → Payments**, bật cổng bạn muốn (Stripe, PayPal, chuyển khoản, hoặc cổng WooCommerce khác).

## Bật nhà cung cấp

**Truy cập Waas → Settings**, tab **Billing Providers** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Billing Providers](../images/waas-billing-settings.png)

Dòng giới thiệu là **Browse Add-ons** và **Enable providers below. The first enabled provider is the default fallback.**

1. Mở thẻ **WooCommerce**. Thẻ không có cho đến khi WooCommerce đang bật. Mô tả: **WordPress-native checkout powered by WooCommerce.**
2. Chọn **Enable this provider**.
3. Đặt **Anchor Product** nếu bạn đã có ID sản phẩm ẩn. Chú thích: sản phẩm WooCommerce ẩn dùng chung cho checkout giá động. Để `0` để tự tạo ở lần checkout đầu.
4. Bấm **Save Billing Providers**.

Thẻ không có **Webhook URL**. WooCommerce cập nhật WaaS qua hook đơn hàng WordPress, không qua route webhook thanh toán.

> **Note:** Một nhà cung cấp có thể hiện **Active**, **Disabled**, hoặc **Needs Config** (Polar, khi thiếu API token hoặc webhook secret). WooCommerce hiện **Active** sau khi được bật.

## Tạo hoặc sửa anchor product

**Truy cập Waas → Settings**, tab **General** (`page=grabwp-tenancy-waas-settings&tab=general`). Mở **Repair tools**.

1. Bấm **Create/Repair WooCommerce Anchor Product**.
2. Khi thành công, thông báo là **WooCommerce anchor product is ready.** kèm product ID.

Bạn có thể dán ID đó vào **Anchor Product** trên thẻ WooCommerce, hoặc để `0` để lần checkout sau tự tạo.

Anchor product phải còn mua được. Nếu không, checkout lỗi với **The WaaS anchor product is not available for purchase.**

## Tiền tệ

Trên **Billing Providers**, mở **Currency Settings**. Khi nhà cung cấp WooCommerce đang bật, **Primary Currency** bị khóa. Chú thích nói **Locked to WooCommerce store currency** và bảo đổi trong thiết lập WooCommerce (**WooCommerce → Settings → General**).

## Khách làm gì

1. Khách chọn gói trả phí lúc đăng ký.
2. WaaS thêm anchor product vào giỏ WooCommerce với giá gói và dữ liệu đăng ký.
3. Khách được chuyển tới URL checkout WooCommerce.
4. Sau khi đơn được thanh toán, WaaS tiếp tục cấp site từ đơn đó.

Nhà cung cấp này không cần webhook kiểu Polar.

## WooCommerce Subscriptions

Đọc một WooCommerce subscription ID cần plugin WooCommerce Subscriptions. Không có plugin đó, `get_subscription` trả **WooCommerce Subscriptions is not active.** Đơn checkout vẫn chạy. Đồng bộ trạng thái gia hạn từ WooCommerce Subscriptions thì không.

Cài [WooCommerce Subscriptions](https://woocommerce.com/products/woocommerce-subscriptions/) khi bạn muốn WooCommerce giữ lịch gia hạn. Nếu không, coi checkout WooCommerce là bước thanh toán và quản lý gia hạn bằng [thao tác admin subscription](/grabwp-tenancy-waas/waas-managing-subscriptions) hoặc nhà cung cấp khác.

**Verify:** **WooCommerce** hiện **Active**, một lượt đăng ký thử với gói trả phí vào checkout WooCommerce đúng tổng tiền gói, và đơn hoàn tất tạo hoặc cập nhật subscription của tenant.

---

**Tiếp theo:** [Xử lý sự cố](/grabwp-tenancy-waas/waas-troubleshooting)
