---
title: "Dashboard, Activity Log và Provisioning"
description: "Xem doanh thu và số subscription, lọc activity log, rồi retry hoặc dismiss provisioning intent"
order: 41
section: waas
---

# Dashboard, Activity Log và Provisioning

Dùng dashboard WaaS để xem doanh thu và tổng subscription. Dùng **Activity Log** để xem sự kiện đã ghi. Dùng **Provisioning** khi một job signup hoặc upgrade cần chạy lại hoặc cần đóng.

## WaaS Dashboard

Bạn hãy truy cập vào **Waas → Dashboard** (`/wp-admin/admin.php?page=grabwp-tenancy-waas`).

![WaaS Dashboard](../images/01-waas-dashboard.png)

Heading của trang là **WaaS Dashboard**.

### Thẻ tổng hợp

| Thẻ | Ghi chú |
|---|---|
| **Monthly Recurring Revenue** | MRR hiện tại, hiện kèm số tiền có dấu đô la. |
| **Active Subscribers** | Số subscription đang active. |
| **New (30 days)** | Lượt signup trong 30 ngày qua. |
| **Churn Rate (30d)** | Tỷ lệ churn trong 30 ngày qua, tính bằng phần trăm. |

### Plan Distribution

Hiện khi có ít nhất một plan có subscriber. Các cột là **Plan** và **Subscribers**.

### Subscription Status

Hiện khi đã có subscription. Các cột là **Status** và **Count**. Mỗi status là một badge. Bấm badge để mở **Subscriptions** đã lọc theo status đó. Xem [Quản lý subscription](/grabwp-tenancy-waas/waas-managing-subscriptions).

### Recent Activity

Hiện khi có dòng log. Các cột là **Date**, **Event** và **Tenant**. **Event** là mã sự kiện. Panel này là danh sách ngắn. Log đầy đủ nằm ở **Activity Log**.

### Thao tác

- **View Subscriptions** mở danh sách subscription.
- **Manage Templates** mở thư viện template.
- **View Partners** được thêm khi plugin partner đang active.

**Kiểm tra:** bốn thẻ tổng hợp hiện ra, và **View Subscriptions** mở `page=grabwp-tenancy-waas-subscriptions`.

## Activity Log

Bạn hãy truy cập vào **Waas → Settings → Activity Log** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=activity`).

![Activity Log](../images/05-waas-settings-activity.png)

| Cột | Ghi chú |
|---|---|
| **Date** | Thời điểm lưu sự kiện. Sắp xếp được. |
| **Event** | Mã sự kiện. Sắp xếp được. |
| **Actor** | `cron`, loại actor khác, hoặc tên hiển thị của user WordPress khi có actor id. |
| **Tenant** | Id tenant, khi sự kiện có tenant. |
| **Details** | Tóm tắt JSON ngắn. Đưa chuột lên ô để xem payload đầy đủ hơn. |
| **IP** | IP của request, khi đã ghi. |

Lọc bằng dropdown sự kiện, rồi bấm **Filter**. **All events** bỏ lọc theo sự kiện. Các mục trong dropdown là:

- `tenant_created`
- `tenant_deleted`
- `tenant_updated`
- `token_generated`
- `api_request`
- `settings_changed`
- `subscription_created`
- `subscription_changed`
- `webhook_received`

Bảng còn có thể hiện mã sự kiện không nằm trong dropdown đó, ví dụ sự kiện renewal và reconcile. Các dòng đó vẫn hiện khi chọn **All events**.

Thời gian giữ dòng là **Retention (days)** trong **Waas → Settings → General**, mục **Retention and grace period** (từ 7 đến 365). Xem [Cấu hình WaaS General](/grabwp-tenancy-waas/waas-configure-general).

**Kiểm tra:** chọn `subscription_changed`, bấm **Filter**, và xác nhận cột **Event** chỉ còn mã đó. Chọn **All events** rồi bấm **Filter** để xem lại toàn bộ log.

## Provisioning

Bạn hãy truy cập vào **Waas → Settings → Provisioning** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=provisioning`).

![Provisioning intent](../images/05-waas-settings-provisioning.png)

Mỗi dòng là một provisioning intent: job tạo hoặc cập nhật tenant sau signup, upgrade, hoặc mua add-on.

| Cột | Ghi chú |
|---|---|
| **Intent ID** | Id của intent. |
| **Flow** | **Signup**, **Upgrade**, hoặc **Addon_purchase**. |
| **State** | Trạng thái hiện tại, hiện bằng badge. |
| **Clone Progress** | Bước clone và tổng, dạng `step / total`, khi clone đang chạy. |
| **Last Error** | Lỗi gần nhất, khi có. |
| **Retries** | Số lần retry đã ghi. |
| **Updated** | Lần cập nhật cuối. |
| **Actions** | **Retry** và **Dismiss**. |

Lọc bằng **All active states** hoặc một trong các state sau, rồi bấm **Filter**:

| State | Ý nghĩa trên màn hình này |
|---|---|
| `checkout_pending` | Checkout chưa xong. |
| `payment_confirmed` | Thanh toán đã xác nhận và provisioning tiếp tục. |
| `finalizing` | Job đang hoàn tất tenant. |
| `tenant_created` | Bản ghi tenant đã có và các bước sau vẫn đang chạy. |
| `clone_running` | Đang clone template. **Clone Progress** hiện số bước. |
| `failed_retriable` | Job lỗi và có thể xếp hàng chạy lại. |

Job đã hoàn tất không nằm trong danh sách đang hoạt động này. **Dismiss** chuyển intent sang `failed_terminal`.

### Retry

**Retry** (icon cập nhật) hiện khi state là `failed_retriable` hoặc `clone_running`.

1. Bấm **Retry** trên dòng đó.

**Kiểm tra:** thông báo **Intent re-queued for retry.** xuất hiện. Intent trở lại `failed_retriable`, **Retries** được đặt về 0, và job được xếp lịch chạy lại.

### Dismiss

1. Bấm **Dismiss** (icon đóng).
2. Xác nhận **Mark this intent as dismissed (failed_terminal)?**

**Kiểm tra:** thông báo **Intent dismissed.** xuất hiện và intent rời danh sách đang hoạt động.

---

**Liên quan:** [Quản lý subscription](/grabwp-tenancy-waas/waas-managing-subscriptions)
