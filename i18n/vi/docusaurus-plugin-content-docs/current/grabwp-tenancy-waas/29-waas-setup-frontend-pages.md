---
title: "Thiết lập trang frontend"
description: "Tạo trang Signup, Dashboard, Templates và Pricing bằng shortcode hoặc block"
order: 29
section: waas
---

# Thiết lập trang frontend

WaaS cần bốn trang: **Signup**, **Dashboard**, **Templates** và **Pricing**. Mỗi trang dùng shortcode hoặc block. Block **WaaS Login** là tùy chọn, tách riêng.

## Cách nhanh

1. Vào **Waas → Settings → General** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=general`)
2. Mở **Repair tools**
3. Bấm **Create/Repair Signup and Dashboard Pages**

Thao tác đó tạo hoặc dùng lại cả bốn trang và lưu ID. Thông báo là **Signup and Dashboard pages checked.**

Xác nhận các dropdown, rồi bấm **Save Changes**.

![Các trang trên General settings](../images/waas-pages-config.png)

| Thiết lập | Slug mặc định | Nội dung |
|-----------|---------------|----------|
| **Signup Page** | `/signup/` | `[grabwp_waas_signup]` hoặc block **WaaS Signup** |
| **Dashboard Page** | `/dashboard/` | `[grabwp_waas_dashboard]` hoặc block **WaaS Dashboard** |
| **Templates Page** | `/templates/` | `[grabwp_waas_templates]` hoặc block **WaaS Template Browser** |
| **Pricing Page** | `/pricing/` | `[grabwp_waas_pricing]` hoặc block **WaaS Pricing** |

## Shortcode

### Signup

```
[grabwp_waas_signup]
```

Render preset signup từ **Waas → Settings → Signup Flow**. Preset **Default** gồm account, plan, billing cycle, optional services và payment. Đổi bước ở [Signup Flow](/grabwp-tenancy-waas/waas-signup-flow).

### Dashboard

```
[grabwp_waas_dashboard]
```

Khách chưa đăng nhập với **WAAS Auth (Email signup)** thấy **Sign in to your dashboard**, ô **Email address** và **Send verification code**.

### Templates

```
[grabwp_waas_templates]
```

Gallery có thumbnail, bộ lọc tag, tìm kiếm và phân trang. Thuộc tính:

| Thuộc tính | Ghi chú |
|------------|---------|
| `tags` | Slug tag, cách nhau bằng dấu phẩy. Chỉ tải template có ít nhất một tag trong danh sách. |
| `filter-tags` | Slug tag group, cách nhau bằng dấu phẩy, hiện dạng nút pill. Group khác dùng dropdown. |
| `tags-browser` | `no` ẩn thanh lọc. |
| `per-page` | Số thẻ mỗi trang. Mặc định `12`. `0` hiện tất cả, không phân trang. |
| `columns` | Số thẻ mỗi hàng, từ 1 đến 6. Mặc định `4`. |

```
[grabwp_waas_templates per-page="9" filter-tags="industry"]

[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]
```

Tham chiếu thuộc tính: [Shortcode Reference](/grabwp-tenancy-waas/waas-shortcode-templates).

### Pricing

```
[grabwp_waas_pricing]
```

Thẻ plan từ các plan đang active, với giá tháng và giá năm.

### Login (tùy chọn)

```
[grabwp_waas_login]
```

Thẻ đăng nhập đứng riêng. Trang dashboard đã có phần đăng nhập, nên chỉ cần shortcode này trên một trang khác.

## Block

Trong block inserter, tìm các tiêu đề dưới đây. Block hiện placeholder trong editor. Kết quả thật nằm ở frontend.

| Block | Thay cho |
|-------|----------|
| **WaaS Signup** | `[grabwp_waas_signup]` |
| **WaaS Dashboard** | `[grabwp_waas_dashboard]` |
| **WaaS Template Browser** | `[grabwp_waas_templates]` |
| **WaaS Pricing** | `[grabwp_waas_pricing]` |
| **WaaS Login** | `[grabwp_waas_login]` |

Control sidebar của **WaaS Template Browser**:

| Control | Việc nó làm |
|---------|-------------|
| **Limit by tags (pool filter)** | Giống `tags` |
| **Show tag browser toolbar** | Giống `tags-browser` |
| **Pill filter groups (filter-tags)** | Giống `filter-tags` |
| **Columns** | Số thẻ mỗi hàng |
| **Cards per page** | Giống `per-page` |

Chi tiết block: [Block Walkthrough](/grabwp-tenancy-waas/waas-block-walkthrough).

## Gắn các trang

1. Vào **Waas → Settings → General**
2. Đặt **Signup Page**, **Dashboard Page**, **Templates Page** và **Pricing Page**
3. Bấm **Save Changes**

## Kiểm tra

1. **Signup** hiện bước account (tên và email) khi bạn đã đăng xuất và **Auth Mode** là **WAAS Auth (Email signup)**
2. **Templates** liệt kê template đang active
3. **Pricing** liệt kê plan đang active
4. **Dashboard** hiện **Sign in to your dashboard** khi bạn đã đăng xuất

---

**Tiếp theo:** [Go-Live Checklist](/grabwp-tenancy-waas/waas-go-live-checklist)
