---
title: "Tham chiếu shortcode"
description: "Thuộc tính của shortcode template browser, bảng giá, luồng đăng ký, login, và dashboard"
order: 36
section: waas
---

# Tham chiếu shortcode

Đặt các shortcode này trên các trang đã chọn trong **Waas → Settings → General** (signup, dashboard, templates, và pricing). Cùng nội dung có dạng block. Xem [Hướng dẫn block](/grabwp-tenancy-waas/waas-block-walkthrough).

| Shortcode | Trang |
|-----------|-------|
| `[grabwp_waas_templates]` | Gallery template |
| `[grabwp_waas_pricing]` | Thẻ gói và bảng so sánh |
| `[grabwp_waas_signup]` | Trình đăng ký |
| `[grabwp_waas_login]` | Form đăng nhập |
| `[grabwp_waas_dashboard]` | Dashboard của tenant |

`[grabwp_waas_login]` và `[grabwp_waas_dashboard]` không có thuộc tính.

## `[grabwp_waas_templates]`

Hiển thị template đang active. Thẻ dẫn tới trang đăng ký với `?template=<slug>`. Nhãn nút phủ là **Get started**.

| Thuộc tính | Mặc định | Ghi chú |
|------------|----------|---------|
| `tags` | trống | Slug tag, cách nhau bởi dấu phẩy. Pool giữ template có **ít nhất một** tag trong danh sách. |
| `filter-tags` | trống | Slug **tag group**, cách nhau bởi dấu phẩy. Các group đó thành nút pill, gồm **All Tags**. Để trống thì không có pill. |
| `tags-browser` | `yes` | `no` ẩn pill, dropdown group, và ô tìm. |
| `per-page` | `12` | Số thẻ mỗi trang. `0` tải toàn bộ và tắt phân trang. |
| `columns` | `4` | Số thẻ mỗi hàng. Kẹp trong 1-6. |

`filter-tags` và dropdown:

- Group có trong `filter-tags` chỉ là pill.
- Group khác có **nhiều hơn một** tag trong pool hiện tại thành `<select>`. Mục đầu là **All &lt;nhãn group&gt;**.
- Một group không vừa là hàng pill vừa là dropdown.
- Placeholder ô tìm là **Type to search templates...**.

Pill, dropdown, và ô tìm gọi API template. Chúng cộng lại: tag của pool và tag bạn chọn phải khớp hết (`tags_match=all` khi có cả hai).

```text
[grabwp_waas_templates]
[grabwp_waas_templates filter-tags="industry"]
[grabwp_waas_templates tags="elementor" per-page="9" columns="3"]
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

### Tham số URL

| Tham số | Ghi chú |
|---------|---------|
| `template_tag` | Slug tag để chọn sẵn. Bỏ qua khi `tags-browser="no"`. Tag phải có trong pool. Ví dụ: `/templates/?template_tag=restaurant` |
| `grabwp_waas_preview` | Slug template. Thay trang thường bằng bản xem trước. Nút xem trước tự thêm tham số này. Đừng đặt nó trên shortcode. Ví dụ: `/?grabwp_waas_preview=el-restaurant-pro` |

> **Note:** Gallery không có dropdown category. Lọc bằng tag group.

## `[grabwp_waas_pricing]`

Vẽ thẻ gói từ `templates/pricing-table.php` và, khi bật, bảng so sánh từ `templates/pricing-comparison.php`. Tiêu đề so sánh là **Compare plans**. Tiêu đề cột đầu là **Benefit**.

Dữ liệu lấy từ plan đang active và danh mục benefit. Nút trên thẻ tới trang đăng ký với `plan` và `billing_cycle`. Nếu không có plan, trang hiện **No plans are available yet.**

| Thuộc tính | Mặc định | Ghi chú |
|------------|----------|---------|
| `highlighted` | trống | Plan ID gắn **Most popular**. Trống, hoặc ID không có, chọn một gói trả phí ở giữa danh sách. |
| `plans` | trống | Plan ID cách nhau bởi dấu phẩy. Trống thì hiện mọi plan active. |
| `default-cycle` | `monthly` | `monthly` hoặc `yearly`. Giá trị khác thành `monthly`. |
| `cta-label` | trống | Chữ trên nút. Trống thì gói miễn phí dùng **Start for free**, gói trả phí dùng **Get started**. |
| `show-cards` | `yes` | `no` ẩn các thẻ. |
| `show-comparison` | `yes` | `no` ẩn bảng so sánh. |

Công tắc **Monthly** / **Yearly** hiện khi ít nhất một gói có giá năm. Nút năm có thể hiện **Save N%**.

```text
[grabwp_waas_pricing]
[grabwp_waas_pricing highlighted="pro" default-cycle="yearly"]
[grabwp_waas_pricing plans="free,pro" show-comparison="no"]
[grabwp_waas_pricing show-cards="no" show-comparison="yes"]
```

Hàng benefit và màu cấu hình trong [Services and Benefits](/grabwp-tenancy-waas/waas-services-benefits) và [Appearance](/grabwp-tenancy-waas/waas-appearance).

## `[grabwp_waas_signup]`

Vẽ trình đăng ký. Preset có tên lưu trong **Waas → Settings → Signup Flow**. Xem [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

Slug preset có sẵn là `default` (nhãn **Default**). Các group của nó: account, rồi plan + billing cycle (nhãn group **Plans**), rồi add-on, rồi payment. `flow` trống, `default`, hoặc slug không tồn tại đều dùng preset đó.

| Thuộc tính | Mặc định | Ghi chú |
|------------|----------|---------|
| `flow` | trống | Slug preset. Slug không có thì về **Default**. |
| `label-account` | trống | Thay **Create your account** |
| `label-plan` | trống | Thay **Choose a plan** |
| `label-addons` | trống | Thay **Optional Services** |
| `label-cycle` | trống | Thay **Billing Cycle** |
| `label-payment` | trống | Thay **Payment Method** |
| `label-otp` | trống | Thay **Verify your email** |
| `hide-labels` | tắt | Ẩn mô tả ngắn dưới tiêu đề mỗi bước. Giá trị đúng: `1`, `yes`, `true`, `on`. |
| `hide-titles` | tắt | Ẩn tiêu đề đầu mỗi bước. |
| `hide-thumbnail` | tắt | Ẩn thumbnail của template. |

Thuộc tính nhãn để trống thì giữ nhãn preset, rồi nhãn có sẵn ở trên.

```text
[grabwp_waas_signup]
[grabwp_waas_signup flow="checkout-first"]
[grabwp_waas_signup flow="default" hide-titles="yes" label-plan="Pick a plan"]
```

> **Note:** Trang đăng ký từ chối cache toàn trang (`DONOTCACHEPAGE` và header no-cache) vì HTML có REST nonce. Vẫn nên loại trang này khỏi plugin cache.

Khi chưa chọn sẵn template, form nhúng template browser để khách chọn.

## `[grabwp_waas_login]` và `[grabwp_waas_dashboard]`

```text
[grabwp_waas_login]
[grabwp_waas_dashboard]
```

**Login** theo **Auth Mode** trên **General**: **WAAS Auth (Email signup)** hoặc **WordPress Auth (Login required)**. Khách đã đăng nhập có thể đi tiếp tới URL dashboard.

**Dashboard** là màn hình chủ tenant (site, gói, benefit như tên miền, backup). Khách chưa đăng nhập với **WAAS Auth** thấy form login thay vì dashboard. `?tenant=<id>` chọn site mà user hiện tại sở hữu.

**Verify:** Xem trang khi chưa đăng nhập. Gallery, bảng giá, các bước đăng ký, hoặc form login khớp thuộc tính. Đổi một thuộc tính, cập nhật trang, và xác nhận chỉ phần đó đổi.

---

**Xem thêm:** [Hướng dẫn block](/grabwp-tenancy-waas/waas-block-walkthrough)
