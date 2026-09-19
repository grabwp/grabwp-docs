---
title: "Hướng dẫn sử dụng block: Template Browser"
description: "Cấu hình Gutenberg block GrabWP Template Browser thông qua thanh bên Inspector trực quan"
order: 37
section: waas
---

# Template Browser: Hướng dẫn chi tiết Gutenberg block

Block `grabwp-waas/template-browser` cung cấp cho người quản lý nội dung một giao diện Inspector trực quan để cấu hình thư viện template mà không cần đụng đến các chuỗi shortcode. Shortcode `[grabwp_waas_templates]` gốc vẫn được giữ lại hoàn toàn và hoạt động y hệt như trước đây.

## Cách sử dụng block

1. Mở một trang bất kỳ trong trình soạn thảo block.
2. Bấm vào biểu tượng **+** (thêm block) và tìm kiếm **"GrabWP Template Browser"**.
3. Chèn block vào trang, bạn sẽ thấy một khối giữ chỗ (placeholder) có tính mô tả xuất hiện trên khung soạn thảo.
4. Tiến hành cấu hình thông qua phần **Settings sidebar → Block settings** (biểu tượng bánh răng).
5. Lưu hoặc xuất bản trang, phần frontend sẽ tự động hiển thị đầy đủ thư viện template.

> **Lưu ý:** Block chỉ hiển thị khối giữ chỗ trong trình soạn thảo. Thư viện thực tế chỉ được render trên frontend.

## Các điều khiển Inspector

Mở thanh bên của block (biểu tượng bánh răng) để tiến hành thiết lập:

| Loại điều khiển | Nhãn Inspector | Shortcode tương đương |
|---|---|---|
| Text | **Limit by tags (pool filter)** | `tags="ecommerce,blog"` |
| Toggle | **Show tag browser toolbar** | `tags-browser="no"` |
| Text | **Pill filter groups** | `filter-tags="industry"` |
| Range (0 đến 60, bước nhảy 4) | **Cards per page** | `per-page="12"` |

## Ánh xạ thuộc tính shortcode

| Thuộc tính shortcode | Thuộc tính block | Kiểu dữ liệu |
|---|---|---|
| `tags` | `tags` | string |
| `filter-tags` | `filterTags` | string |
| `tags-browser` (`yes`/`no`) | `tagsBrowser` | boolean |
| `per-page` | `perPage` | integer |

## Cách hệ thống hoạt động

```
block.json
  └─ render: "file:./render.php"     → PHP server render
  └─ editorScript: "file:./index.js" → Gutenberg editor UI

render.php
  └─ maps block attributes → shortcode atts array
  └─ calls GrabWP_Tenancy_WaaS_Templates_Shortcode::render($atts)
  └─ wraps in get_block_wrapper_attributes() div

GrabWP_Tenancy_WaaS_Blocks
  └─ register_block_type_from_metadata( blocks/template-browser/ )
  └─ enqueue_block_assets → loads CSS/JS only when block is present
```

> Không yêu cầu bước build (Node/npm). File `index.js` sử dụng mã ES5/ES2015 thuần túy cùng các gói `wp.*` ở phạm vi toàn cục mà WordPress tự động tải vào trong trình soạn thảo block.

## So sánh block và shortcode

Cả hai cách đều tạo ra kết quả frontend giống hệt nhau. Hãy lựa chọn dựa theo quy trình làm việc của bạn:

| | Shortcode | Block |
|---|---|---|
| **Cấu hình** | Sửa các chuỗi thuộc tính | Sử dụng các điều khiển trực quan ở thanh bên |
| **Xem trước** | Hiển thị mã shortcode | Hiển thị khối giữ chỗ (placeholder) |
| **Hỗ trợ theme** | Hoạt động ở mọi nơi | Yêu cầu theme tương thích với block |
| **Phù hợp nhất cho** | Developer, thao tác nhanh bằng cách copy và paste | Người quản lý nội dung, làm việc với giao diện trực quan |

---

**Xem thêm:** [Tham khảo shortcode](/grabwp-tenancy-waas/waas-shortcode-templates) (chi tiết tất cả các thuộc tính shortcode và tham số URL)
