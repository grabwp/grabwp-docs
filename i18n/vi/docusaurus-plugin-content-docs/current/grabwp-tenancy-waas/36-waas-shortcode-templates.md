---
title: "Tham chiếu shortcode: Trình duyệt template"
description: "Tất cả các attributes cho [grabwp_waas_templates] (lọc pool, tag pills, phân trang, và URL parameters)"
order: 36
section: waas
---

# `[grabwp_waas_templates]` - Tham chiếu shortcode

Hiển thị thư viện trình duyệt template với tùy chọn lọc trước từ phía server và thanh công cụ lọc có thể tùy chỉnh từ phía client.

---

## Các attributes của shortcode

### `tags`
**Loại:** tag slugs phân cách bằng dấu phẩy  
**Mặc định:** _(trống, hiển thị tất cả các templates đang hoạt động)_

Bộ lọc pool ở phía server. Chỉ những templates có chứa **ít nhất một** trong các tags được liệt kê mới được tải vào thư viện. Giúp thu hẹp danh sách các template cards trước khi có bất kỳ thao tác nào khác được chạy.

```
[grabwp_waas_templates tags="ecommerce,portfolio"]
```

---

### `filter-tags`
**Loại:** **tag group** slugs phân cách bằng dấu phẩy  
**Mặc định:** _(trống)_

Kiểm soát tags nào sẽ hiển thị dưới dạng **nút pill** ở hàng lọc chính, và nhóm nào sẽ được đưa vào các dropdown `<select>` phụ.

| Giá trị `filter-tags` | Hàng pill | Selects phụ |
|---|---|---|
| _(trống)_ | Tất cả pool tags | Không có (tất cả đều ở dạng pills) |
| `"industry"` | Các tags từ nhóm `industry` | Tất cả các nhóm khác có ≥ 2 giá trị |
| `"industry,feature"` | Các tags từ `industry` và `feature` | Tất cả các nhóm còn lại có ≥ 2 giá trị |

> **Lưu ý:** Một nhóm chỉ có thể hiển thị dưới dạng pills **hoặc** select, không bao giờ là cả hai.

```
[grabwp_waas_templates filter-tags="industry"]
```

---

### `tags-browser`
**Loại:** `yes` / `no`  
**Mặc định:** `yes`

Thiết lập thành `no` để ẩn toàn bộ thanh công cụ lọc bao gồm hàng pill, selects và ô tìm kiếm. Hữu ích cho các trang hiển thị một danh sách giới hạn đã được lọc trước, không cần các bộ lọc từ phía người dùng.

```
[grabwp_waas_templates tags="portfolio" tags-browser="no"]
```

---

### `per-page`
**Loại:** số nguyên (integer)  
**Mặc định:** `12`

Số lượng template cards trên mỗi trang. Đặt thành `0` để tắt tính năng phân trang và hiển thị tất cả templates cùng một lúc.

```
[grabwp_waas_templates per-page="9"]
[grabwp_waas_templates per-page="0"]
```

---

## URL parameters

Được nhận diện khi tải trang. Bị bỏ qua khi sử dụng `tags-browser="no"`.

### `template_tag`
**Loại:** tag slug

Chọn trước một tag pill khi tải trang, tương đương với việc người dùng nhấp vào pill đó. Tham số này hoạt động song song với bất kỳ bộ lọc `tags=` nào ở phía server.

```
https://example.com/templates/?template_tag=ecommerce
```

Bạn có thể kết hợp với `tags=` để lọc trước pool **và** chọn trước một pill:

```
/templates/?template_tag=woocommerce
```
Shortcode: `[grabwp_waas_templates tags="ecommerce" filter-tags="industry"]`  
Kết quả: pool được lọc trước để chỉ hiển thị các templates ecommerce, sau đó pill `woocommerce` sẽ được tự động chọn khi tải trang.

---

### `grabwp_waas_preview`
**Loại:** template slug

Bỏ qua hoàn toàn quá trình render trang bình thường và tải thẳng iframe xem trước cho template được chỉ định. Tham số này được tự động thêm vào bởi các nút "Preview", không dùng cho shortcode.

```
https://example.com/?grabwp_waas_preview=el-restaurant-pro
```

---

## Bộ lọc phía client (Toolbar)

Tất cả các bộ lọc được áp dụng trực tiếp trong trình duyệt mà không cần tải lại trang. Chúng hoạt động theo nguyên tắc cộng gộp, nghĩa là tất cả các điều kiện đang kích hoạt đều phải khớp.

| Bộ lọc | Phần tử UI | Khớp với | Data attribute |
|---|---|---|---|
| Tag pill | Hàng nút | `data-tags` (tag slugs cách nhau bằng khoảng trắng) | `data-filter-dim="tag"` |
| Group select | `<select>` cho mỗi nhóm tag | `data-tags` (bất kỳ tag nào trong nhóm) | `data-filter-select="tag-group"` |
| Category select | `<select>` | `data-cat` | `data-filter-select="cat"` |
| Tìm kiếm văn bản | `<input type="search">` | `data-name` và `data-tags` | `id="grabwp-waas-tpl-search"` |

> Category select chỉ xuất hiện khi không có tag pills **và** có nhiều hơn một danh mục (category) khác nhau tồn tại trong pool.

> Group selects tự động xuất hiện cho bất kỳ nhóm tag nào có **≥ 2 giá trị khác biệt** tồn tại trong pool và **không** được liệt kê trong `filter-tags`.

---

## Các trường hợp sử dụng phổ biến

```
// Full browser - all templates, all tags as pills
[grabwp_waas_templates]

// Industry tag pills + theme/builder selects in secondary bar
[grabwp_waas_templates filter-tags="industry"]

// Pre-filtered to Elementor templates, 9 per page
[grabwp_waas_templates tags="elementor" per-page="9"]

// Curated showcase - no filters, no pagination
[grabwp_waas_templates tags="featured" tags-browser="no" per-page="0"]

// Page linked to with ?template_tag=restaurant pre-selected
[grabwp_waas_templates filter-tags="industry"]
// URL: /templates/?template_tag=restaurant
```

---

**Xem thêm:** [Hướng dẫn về block](/grabwp-tenancy-waas/waas-block-walkthrough) (phiên bản Gutenberg block tương đương với giao diện Inspector trực quan)
