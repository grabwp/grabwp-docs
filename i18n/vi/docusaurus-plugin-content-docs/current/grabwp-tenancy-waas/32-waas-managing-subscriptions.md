---
title: "Quản lý gói đăng ký"
description: "Xem, gia hạn, thay đổi, tạm ngưng và kiểm tra subscription của tenant với vai trò admin"
order: 32
section: waas
---

# Quản lý gói đăng ký

Subscription theo dõi trạng thái thanh toán và gói dịch vụ của từng tenant. Với vai trò admin, bạn có thể xem, điều chỉnh và quản lý toàn bộ vòng đời subscription.

Điều hướng đến **WaaS → Subscriptions** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-subscriptions`).

![Danh sách subscription](../images/waas-subscriptions.png)

## Trạng thái subscription

| Trạng thái | Ý nghĩa | Site tenant |
|--------|---------|-------------|
| **Pending** | Đã bắt đầu đăng ký, đang chờ thanh toán hoặc khởi tạo | Chưa thể truy cập |
| **Active** | Đã xác nhận thanh toán, site đã được khởi tạo | Có thể truy cập đầy đủ |
| **Suspended** | Subscription bị hủy hoặc hết hạn (trong thời gian gia hạn) | Bị giới hạn hoặc khóa |
| **Cancelled** | Đã hủy vĩnh viễn | Có thể bị vô hiệu hóa |

### Vòng đời

```
Pending → Active → (renewal) → Active
                 → (cancel)  → Suspended (grace period) → Cancelled
                 → (expire)  → Suspended (grace period) → Cancelled
```

## Xem subscription

Danh sách subscription hiển thị tất cả subscription với:

| Cột | Mô tả |
|--------|-------------|
| Tenant | Slug / domain site tenant |
| Plan | Tên gói dịch vụ (Free, Pro, v.v.) |
| Status | Huy hiệu trạng thái hiện tại |
| Provider | Nhà cung cấp thanh toán (Polar, WooCommerce, v.v.) |
| Billing Cycle | Hàng tháng / Hàng năm |
| Period End | Thời điểm chu kỳ thanh toán hiện tại kết thúc |
| Created | Ngày tạo subscription |

Nhấn vào một subscription để xem chi tiết.

## Chế độ xem chi tiết subscription

![Chi tiết subscription](../images/waas-subscription-detail.png)

Trang chi tiết hiển thị:

- **Huy hiệu trạng thái** — trạng thái hiện tại kèm chỉ báo màu sắc
- **Plan** — gói dịch vụ mà tenant đang dùng
- **Provider** — nhà cung cấp thanh toán xử lý các khoản thanh toán
- **Billing Cycle** — Hàng tháng hoặc Hàng năm
- **Period End** — thời điểm kỳ hiện tại kết thúc / ngày gia hạn
- **Provider Subscription ID** — ID tham chiếu trong nhà cung cấp thanh toán
- **Trạng thái hủy** — liệu việc hủy có được lên lịch vào cuối kỳ hay không

## Thao tác của admin

Dùng danh sách thả xuống thao tác trên trang chi tiết subscription để quản lý subscription:

### Extend Period

Gia hạn chu kỳ thanh toán hiện tại thêm một số ngày. Hữu ích khi cần cho khách hàng gặp vấn đề thêm thời gian.

- **Days:** 1–365 (mặc định: 30)
- **Reason:** Bắt buộc — ghi rõ lý do gia hạn

### Change Plan

Chuyển một tenant sang gói dịch vụ khác.

- **Plan:** Chọn từ các gói đang active
- **Reason:** Bắt buộc

> **Lưu ý:** Thao tác này thay đổi gói ngay lập tức. Nếu chuyển từ miễn phí sang trả phí (hoặc ngược lại), hãy đảm bảo subscription ở nhà cung cấp thanh toán cũng được cập nhật riêng.

### Grant Complimentary

Cấp cho tenant quyền dùng miễn phí một gói trong thời gian nhất định. Hữu ích cho khuyến mãi, đối tác hoặc hỗ trợ khách hàng.

- **Plan:** Chọn gói cần cấp
- **Days:** 1–365 (mặc định: 30)
- **Reason:** Bắt buộc

### Suspend

Tạm ngưng subscription của tenant. Site tenant sẽ bị hạn chế.

- **Reason:** Bắt buộc

### Reactivate

Kích hoạt lại một subscription bị tạm ngưng. Site tenant sẽ có thể truy cập đầy đủ trở lại.

- **Reason:** Bắt buộc

### Add Note

Thêm ghi chú nội bộ vào nhật ký kiểm tra của subscription. Tenant không nhìn thấy ghi chú này.

- **Note:** Bình luận dạng văn bản tự do

## Lịch sử kiểm tra

Mọi thao tác trên một subscription đều được ghi vào nhật ký kiểm tra ở cuối trang chi tiết:

| Cột | Mô tả |
|--------|-------------|
| **Date** | Thời điểm thao tác diễn ra |
| **Action** | Điều đã xảy ra (ví dụ: "Extend Period", "Change Plan") |
| **Admin** | Người thực hiện thao tác |
| **Details** | Chi tiết cụ thể (gói mới, số ngày gia hạn, v.v.) |
| **Reason** | Lý do thực hiện thao tác |

## Thời gian gia hạn

Khi một subscription bị hủy hoặc hết hạn, sẽ có một thời gian gia hạn trước khi site tenant bị tạm ngưng.

Cấu hình thời gian gia hạn trong **WaaS → Settings → General → Grace Period (days)**.

| Cài đặt | Mặc định | Mô tả |
|---------|---------|-------------|
| **Grace Period** | 7 ngày | 0 = tạm ngưng ngay khi hủy |

Trong thời gian gia hạn:
- Site tenant vẫn có thể truy cập
- Chủ tenant thấy thông báo về việc sắp bị tạm ngưng
- Có thể khôi phục thanh toán (ví dụ: cập nhật phương thức thanh toán trong Polar)

## Xử lý hết hạn tự động

Một cron job hằng ngày kiểm tra các subscription hết hạn:

1. Subscription đã qua ngày kết thúc kỳ → được đánh dấu là hết hạn
2. Subscription hết hạn đã qua thời gian gia hạn → bị tạm ngưng
3. Subscription bị tạm ngưng đã qua một thời hạn tiếp theo → bị hủy (nếu được cấu hình)

## Tự phục vụ cho khách hàng

Tenant có thể quản lý subscription của chính họ từ trang Dashboard:

- **Cancel subscription** — lên lịch hủy vào cuối kỳ
- **Revert cancellation** — nếu họ đổi ý trước khi kỳ kết thúc
- **Upgrade plan** — chuyển hướng tới checkout của gói cao hơn

---

**Tiếp theo:** [Lưu trữ S3 Object Storage](/vi/grabwp-tenancy-waas/waas-optional-s3-storage)
