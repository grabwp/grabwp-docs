---
title: "Hướng dẫn block"
description: "Chèn block WaaS Pricing, Signup, Template Browser, Login, và Dashboard rồi đặt các control trong inspector"
order: 37
section: waas
---

# Hướng dẫn block

Năm block trong category **grabwp-waas** tương ứng shortcode. Tìm trong bộ chèn block theo tiêu đề. Trình soạn hiện placeholder. Markup thật render ở front end. Tên thuộc tính và mặc định giống [Tham chiếu shortcode](/grabwp-tenancy-waas/waas-shortcode-templates).

| Tiêu đề trong bộ chèn | Tên block | Shortcode |
|-----------------------|-----------|-----------|
| **WaaS Template Browser** | `grabwp-waas/template-browser` | `[grabwp_waas_templates]` |
| **WaaS Pricing** | `grabwp-waas/pricing` | `[grabwp_waas_pricing]` |
| **WaaS Signup** | `grabwp-waas/signup` | `[grabwp_waas_signup]` |
| **WaaS Login** | `grabwp-waas/login` | `[grabwp_waas_login]` |
| **WaaS Dashboard** | `grabwp-waas/dashboard` | `[grabwp_waas_dashboard]` |

Cả năm đều hỗ trợ căn wide và full, cộng margin và padding. Tắt sửa HTML. Login và Dashboard không có thiết lập thêm.

## Chèn block

1. Sửa trang trong trình soạn block.
2. Bấm **+** và tìm tiêu đề, ví dụ **WaaS Pricing**.
3. Chèn block.
4. Mở **Settings → Block** (biểu tượng bánh răng) và đặt các control bên dưới.
5. Cập nhật trang và xem ở front end.

**Verify:** Front end khớp một trang dùng shortcode tương đương với cùng giá trị.

## WaaS Template Browser

Tiêu đề placeholder: **WaaS Template Browser**. Nó liệt kê bộ lọc pool, nhóm pill, thanh công cụ, số thẻ mỗi trang, và số cột.

| Nhãn inspector | Panel | Shortcode |
|----------------|-------|-----------|
| **Limit by tags (pool filter)** | **Template Pool** | `tags` |
| **Show tag browser toolbar** | **Filter Toolbar** | `tags-browser` (`yes` khi bật) |
| **Pill filter groups (filter-tags)** | **Filter Toolbar** (chỉ khi thanh công cụ đang bật) | `filter-tags` |
| **Columns** | **Layout** | `columns` (1-6, đặt lại 4) |
| **Cards per page** | **Pagination** | `per-page` (0-60, đặt lại 12). `0` hiện mọi template. |

Để trống **Pill filter groups** thì chỉ có dropdown (không hàng pill). Group bạn liệt kê thành pill. Chú thích inspector nói dropdown cho group có hơn hai tag. Gallery thật hiện dropdown khi group có hơn một tag trong pool.

## WaaS Pricing

Tiêu đề placeholder: **WaaS Pricing**. Nội dung: **Plan cards, benefits, billing toggle, and comparison.** Nó ghi có kèm bảng so sánh hay không.

| Nhãn inspector | Panel | Shortcode |
|----------------|-------|-----------|
| **Highlighted plan ID** | **Pricing table** | `highlighted` |
| **Plan IDs** | **Pricing table** | `plans` |
| **Default billing cycle** | **Pricing table** | `default-cycle`: **Monthly** hoặc **Yearly** |
| **CTA label** | **Pricing table** | `cta-label`. Trống thì dùng **Start for free** / **Get started**. |
| **Show plan cards** | **Layout** | `show-cards` |
| **Show comparison table** | **Layout** | `show-comparison` |

Chú thích **Highlighted plan ID**: để trống để tự chọn gói trả phí ở giữa làm **Most popular**.

Chú thích **Plan IDs**: plan ID cách nhau bởi dấu phẩy. Để trống để hiện mọi plan active.

Thẻ lấy từ template bảng giá. Phần so sánh là template pricing comparison (**Compare plans**). Tắt một trong hai công tắc để ẩn phần đó.

## WaaS Signup

Tiêu đề placeholder: **WaaS Signup**. Nó hiện **Flow:** và nhãn preset, rồi **Preview on the frontend.**

Preset là các flow có tên trong **Waas → Settings → Signup Flow**. Xem [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow). Nếu danh sách không tải được, control về **Default**.

| Nhãn inspector | Panel | Shortcode |
|----------------|-------|-----------|
| **Flow preset** | **Signup flow** | `flow`. **Default** lưu dưới dạng slug trống. |
| **Hide step descriptions** | **Display** | `hide-labels` |
| **Hide step titles** | **Display** | `hide-titles` |
| **Hide template thumbnail** | **Display** | `hide-thumbnail` |
| **Account** | **Step labels** | `label-account` |
| **Plan** | **Step labels** | `label-plan` |
| **Add-ons** | **Step labels** | `label-addons` |
| **Billing cycle** | **Step labels** | `label-cycle` |
| **Payment** | **Step labels** | `label-payment` |
| **Email verification** | **Step labels** | `label-otp` |

Mỗi dòng chú thích nhãn bước bảo để trống để dùng nhãn preset hoặc nhãn mặc định. Chú thích **Flow preset**: slug không có thì về **Default**.

Nhãn bước có sẵn, trước khi preset ghi đè:

| Bước | Nhãn |
|------|------|
| Account | **Create your account** |
| Plan | **Choose a plan** |
| Add-ons | **Optional Services** |
| Billing cycle | **Billing Cycle** |
| Payment | **Payment Method** |
| Email verification | **Verify your email** |

## WaaS Login và WaaS Dashboard

Placeholder **WaaS Login**: **Displays the tenant owner login form. Preview on the frontend.**

Placeholder **WaaS Dashboard**: **Displays the tenant dashboard. Preview on the frontend.**

Không có trường inspector. Hành vi khớp `[grabwp_waas_login]` và `[grabwp_waas_dashboard]`.

---

**Xem thêm:** [Tham chiếu shortcode](/grabwp-tenancy-waas/waas-shortcode-templates)
