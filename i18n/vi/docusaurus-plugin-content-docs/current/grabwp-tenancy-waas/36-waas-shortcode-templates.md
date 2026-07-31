---
title: "Tham chiếu Shortcode: Trình duyệt mẫu"
description: "Toàn bộ thuộc tính của [grabwp_waas_templates] — lọc pool, pill tag, phân trang và tham số URL"
order: 36
section: waas
---

# `[grabwp_waas_templates]` — Tham chiếu Shortcode

Hiển thị thư viện trình duyệt mẫu, với tùy chọn lọc trước phía máy chủ và thanh công cụ lọc phía trình duyệt có thể cấu hình.

---

## Thuộc tính Shortcode

### `tags`
**Kiểu:** slug tag phân tách bằng dấu phẩy<br />
**Mặc định:** _(trống — hiển thị mọi mẫu đang hoạt động)_

Bộ lọc pool phía máy chủ. Chỉ những mẫu mang **ít nhất một** trong các tag được liệt kê mới được tải vào thư viện. Điều này thu hẹp pool thẻ trước khi bất kỳ xử lý nào khác diễn ra.

```
[grabwp_waas_templates tags="ecommerce,portfolio"]
```

---

### `filter-tags`
**Kiểu:** slug **nhóm tag** phân tách bằng dấu phẩy<br />
**Mặc định:** _(trống)_

Xác định tag nào xuất hiện dưới dạng **nút pill** ở hàng bộ lọc chính, và nhóm nào có danh sách thả xuống `<select>` phụ.

| Giá trị `filter-tags` | Hàng pill | Select phụ |
|---|---|---|
| _(trống)_ | Mọi tag trong pool | Không có (mọi thứ đều là pill) |
| `"industry"` | Tag từ nhóm `industry` | Mọi nhóm khác có ≥ 2 giá trị |
| `"industry,feature"` | Tag từ `industry` + `feature` | Mọi nhóm còn lại có ≥ 2 giá trị |

> **Lưu ý:** Một nhóm chỉ có thể là pill **hoặc** select — không bao giờ đồng thời cả hai.

```
[grabwp_waas_templates filter-tags="industry"]
```

---

### `tags-browser`
**Kiểu:** `yes` / `no`<br />
**Mặc định:** `yes`

Đặt thành `no` để ẩn toàn bộ thanh công cụ lọc (hàng pill + select + ô tìm kiếm). Hữu ích cho các trang hiển thị tập hợp được tuyển chọn, đã lọc trước mà không có bộ lọc dành cho người dùng.

```
[grabwp_waas_templates tags="portfolio" tags-browser="no"]
```

---

### `per-page`
**Kiểu:** số nguyên<br />
**Mặc định:** `12`

Số thẻ mẫu trên mỗi trang. Đặt thành `0` để tắt phân trang và hiển thị toàn bộ mẫu cùng lúc.

```
[grabwp_waas_templates per-page="9"]
[grabwp_waas_templates per-page="0"]
```

---

## Tham số URL

Được nhận diện khi tải trang. Bị bỏ qua khi `tags-browser="no"`.

### `template_tag`
**Kiểu:** slug tag

Chọn trước một pill tag khi tải trang, tương đương việc người dùng nhấp pill đó. Hoạt động cùng với mọi bộ lọc `tags=` phía máy chủ.

```
https://example.com/templates/?template_tag=ecommerce
```

Kết hợp với `tags=` để lọc trước pool **và** chọn trước một pill:

```
/templates/?template_tag=woocommerce
```
Shortcode: `[grabwp_waas_templates tags="ecommerce" filter-tags="industry"]`  
Kết quả: pool được lọc trước thành các mẫu ecommerce, sau đó pill `woocommerce` được tô sáng khi tải.

---

### `grabwp_waas_preview`
**Kiểu:** slug mẫu

Bỏ qua hoàn toàn quá trình render trang thông thường và phục vụ iframe xem trước cho mẫu đã cho. Tham số này được các nút "Preview" tự động thêm vào; không dùng cho shortcode.

```
https://example.com/?grabwp_waas_preview=el-restaurant-pro
```

---

## Bộ lọc phía trình duyệt (Thanh công cụ)

Mọi bộ lọc được áp dụng trong trình duyệt mà không tải lại trang. Chúng được kết hợp với nhau — mọi điều kiện đang hoạt động đều phải khớp.

| Bộ lọc | Phần tử UI | Đối chiếu với | Thuộc tính dữ liệu |
|---|---|---|---|
| Pill tag | Hàng nút | `data-tags` (slug tag phân tách bằng dấu cách) | `data-filter-dim="tag"` |
| Select nhóm | `<select>` cho mỗi nhóm tag | `data-tags` (bất kỳ tag nào trong nhóm) | `data-filter-select="tag-group"` |
| Select danh mục | `<select>` | `data-cat` | `data-filter-select="cat"` |
| Tìm kiếm văn bản | `<input type="search">` | `data-name` + `data-tags` | `id="grabwp-waas-tpl-search"` |

> Select danh mục chỉ xuất hiện khi không có pill tag **và** pool có hơn một danh mục riêng biệt.

> Select nhóm tự động xuất hiện với mọi nhóm tag có **≥ 2 giá trị riêng biệt** trong pool và **không** được liệt kê trong `filter-tags`.

---

## Công thức thường dùng

```
// Full browser — all templates, all tags as pills
[grabwp_waas_templates]

// Industry tag pills + theme/builder selects in secondary bar
[grabwp_waas_templates filter-tags="industry"]

// Pre-filtered to Elementor templates, 9 per page
[grabwp_waas_templates tags="elementor" per-page="9"]

// Curated showcase — no filters, no pagination
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]

// Page linked to with ?template_tag=restaurant pre-selected
[grabwp_waas_templates filter-tags="industry"]
// URL: /templates/?template_tag=restaurant
```

---

**Xem thêm:** [Hướng dẫn Block](/vi/grabwp-tenancy-waas/waas-block-walkthrough) — block Gutenberg tương đương với Inspector UI trực quan
