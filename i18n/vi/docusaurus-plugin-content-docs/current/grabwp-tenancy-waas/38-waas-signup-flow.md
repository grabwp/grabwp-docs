---
title: "Cấu hình Signup Flow"
description: "Tạo preset signup để điều khiển thứ tự bước, nhóm bước, trạng thái hiển thị, nhãn và nội dung thẻ"
order: 38
section: waas
---

# Cấu hình Signup Flow

Preset signup flow quyết định khách thấy những bước nào, thứ tự các bước, và bước nào nằm chung một màn hình. Shortcode signup và block **WaaS Signup** đều tải preset theo slug.

Bạn hãy truy cập vào **Waas → Settings → Signup Flow** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=signup_flow`).

![Tab Signup Flow với panel Create preset](../images/05-waas-settings-signup-flow.png)

Các preset có tên điều khiển thứ tự bước, việc gộp bước, mức hiển thị và nhãn. Preset **Default** có sẵn không thể ghi đè.

## Tải một preset

1. Chọn preset trong **Preset**.
2. Bấm **Load**.

Đổi preset không lưu gì cả. **Load** chỉ mở preset đó.

## Preset Default có sẵn

Mở **Edit preset** khi đang tải **Default**.

![Edit preset của flow Default](../images/05-waas-settings-signup-flow-edit.png)

**Default** chỉ đọc. Các trường bị khóa, và không có **Save preset** hay **Delete preset**. Hãy tạo preset riêng khi bạn cần thứ tự hoặc nhãn khác.

**Default** dùng các nhóm sau:

| Group heading | Các bước trên màn hình đó |
|---|---|
| _(không có)_ | **Create your account** (`account`) |
| Plans | **Choose a plan** (`plan`) và **Billing Cycle** (`cycle`) |
| _(không có)_ | **Optional Services** (`addons`) |
| _(không có)_ | **Payment Method** (`payment`) |

Các bước trong cùng một nhóm hiện thành một màn hình signup, dưới một heading, với một bộ nút điều hướng.

> **Lưu ý:** **Verify your email** (`otp`) và **Create your website** (`free`) không phải thẻ trong builder. Form tự thêm chúng khi cần: xác minh email khi **WaaS Auth** bật và khách chưa đăng nhập, và bước tạo site miễn phí khi không có plan và bước account không hiện.

## Tạo preset

1. Tải preset bạn muốn sao chép (**Default**, hoặc preset đã lưu).
2. Mở **Create preset**.
3. Nhập **New slug** (chữ thường, số và dấu gạch ngang).
4. Nhập **New label** (tên hiện trong dropdown **Preset** và trong block inspector).
5. Bấm **Create from** kèm nhãn của preset đang tải (ví dụ **Create from Default**).

**Kiểm tra:** thông báo **Signup flow preset saved.** xuất hiện, và preset mới có trong **Preset**.

## Sửa preset

1. **Load** preset bạn đã tạo.
2. Mở **Edit preset**.
3. Đổi **Preset label** nếu muốn tên hiển thị khác.
4. Kéo bước bằng tay cầm để sắp xếp hoặc chuyển sang nhóm khác. Bước chưa đặt nằm ở palette. Kéo một bước vào nhóm để đặt nó.
5. Bấm **Add group** để thêm nhóm trống, rồi kéo bước vào. Dùng ô chữ của nhóm (placeholder **Group heading**) khi màn hình đó cần heading.
6. Bấm **Remove group** để bỏ một nhóm. Nhóm phải còn ít nhất một bước trước khi lưu.
7. Bấm **Save preset**.

**Kiểm tra:** thông báo **Signup flow preset saved.** xuất hiện. Tải lại preset và xác nhận nhóm cùng nhãn vẫn đúng.

Để xóa preset tự tạo, mở preset đó và bấm **Delete preset**. **Kiểm tra:** thông báo **Signup flow preset deleted.** xuất hiện. **Default** không xóa được.

> **Mẹo:** Khi tắt JavaScript, cùng màn hình đó dùng **Up**, **Down**, **Remove**, **Add step** và **Add as new group** thay cho kéo thả.

## Điều khiển trên mỗi bước

Mỗi bước đã đặt hiện tên mặc định, id, và các điều khiển sau:

| Điều khiển | Ghi chú |
|---|---|
| **Default** | Giá trị điền sẵn trên form signup. **None** là chưa đặt. **Optional Services** chọn được nhiều service. Chọn một giá trị thì **Choose a plan** mới có **Hidden**. |
| **Details** | Có trên **Choose a plan** và **Optional Services**. Chọn nội dung dưới tên và giá của mỗi thẻ: **Description**, **Features** (chỉ plan), hoặc **Benefits**. |
| **State** | **Required**, **Optional**, hoặc **Hidden**. |
| **Label** | Heading của bước. Giữ nguyên placeholder để dùng chữ có sẵn. |

| State | Khách nhận được gì |
|---|---|
| **Required** | Bước ở lại trên form cho đến khi hoàn tất. |
| **Optional** | Bước có thể bỏ qua khi đã có giá trị, kể cả **Default**. |
| **Hidden** | Bước không xuất hiện trên form. **Choose a plan** chỉ có **Hidden** sau khi bạn đặt **Default**. **Billing Cycle**, **Payment Method** và **Optional Services** có **Hidden** ngay. |

## Các bước có thể đặt

| Bước | Id | Ghi chú |
|---|---|---|
| **Create your account** | `account` | Hiện với khách chưa đăng nhập khi chế độ xác thực là **WaaS Auth**. |
| **Choose a plan** | `plan` | Tự sang bước sau khi khách chọn một plan. |
| **Optional Services** | `addons` | Phải đứng sau **Choose a plan**. Không tự sang bước. |
| **Billing Cycle** | `cycle` | **Monthly** hoặc **Yearly**. Form bỏ qua khi đơn hàng không có mục gia hạn. |
| **Payment Method** | `payment` | Phải đứng sau **Choose a plan**. Form bỏ qua khi đơn hàng không có khoản phải trả. |

Lưu sẽ thất bại khi thiếu dependency hoặc sai thứ tự, khi một nhóm trống, khi một bước bị liệt kê hai lần, hoặc khi **Choose a plan** là **Hidden** mà chưa có **Default**.

## Dùng preset trên trang signup

Đặt slug của preset lên trang đã có form signup. Xem [Thiết lập trang frontend](/grabwp-tenancy-waas/waas-setup-frontend-pages) nếu trang đó chưa được tạo.

### Shortcode

```
[grabwp_waas_signup flow="quick-checkout"]
```

`flow` phải trùng slug của preset. `flow` để trống, `default`, hoặc slug không tồn tại sẽ dùng **Default**.

| Thuộc tính | Ghi chú |
|---|---|
| `flow` | Slug của preset. |
| `hide-titles` | `1`, `true`, `yes`, hoặc `on` ẩn heading trên đầu mỗi bước. |
| `hide-labels` | Cùng các giá trị đó. Ẩn đoạn mô tả ngắn dưới heading của mỗi bước. |
| `hide-thumbnail` | Cùng các giá trị đó. Ẩn thumbnail của template. |
| `label-account` | Thay heading bước account. Để trống để giữ nhãn của preset hoặc nhãn có sẵn. |
| `label-plan` | Heading bước plan. |
| `label-addons` | Heading Optional Services. |
| `label-cycle` | Heading Billing Cycle. |
| `label-payment` | Heading Payment Method. |
| `label-otp` | Heading xác minh email. |

```
[grabwp_waas_signup flow="quick-checkout" hide-titles="1" hide-labels="1" hide-thumbnail="1"]
```

### Block

1. Sửa trang signup.
2. Chèn block **WaaS Signup** (`grabwp-waas/signup`). Trình soạn thảo hiện placeholder. Wizard chỉ render ở frontend.
3. Trong sidebar của block, mở **Signup flow** và đặt **Flow preset**.
4. Mở **Display** và bật **Hide step descriptions**, **Hide step titles**, hoặc **Hide template thumbnail** nếu cần.
5. Mở **Step labels** để ghi đè **Account**, **Plan**, **Add-ons**, **Billing cycle**, **Payment**, hoặc **Email verification**. Để trống một ô để giữ nhãn của preset hoặc nhãn có sẵn.
6. Cập nhật trang.

**Kiểm tra:** mở trang signup trong cửa sổ riêng tư. Các bước, heading và nội dung thẻ khớp preset. Bước **Hidden** không hiện, và **Default** của bước đó là giá trị được gửi đi.

---

**Tiếp theo:** [Giao diện](/grabwp-tenancy-waas/waas-appearance)
