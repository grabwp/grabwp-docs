---
title: "Hướng dẫn Block: Trình duyệt mẫu"
description: "Cấu hình block Gutenberg GrabWP Template Browser bằng thanh bên Inspector trực quan"
order: 37
section: waas
---

# Template Browser — Hướng dẫn Block Gutenberg

Block `grabwp-waas/template-browser` cung cấp cho người biên tập site Inspector UI trực quan để cấu hình thư viện mẫu mà không cần thao tác với chuỗi shortcode. Shortcode gốc `[grabwp_waas_templates]` được giữ nguyên hoàn toàn và vẫn hoạt động như trước.

## Cách dùng Block

1. Mở bất kỳ trang nào trong trình biên tập block
2. Nhấp **+** (trình chèn block) rồi tìm **"GrabWP Template Browser"**
3. Chèn block — block hiển thị một placeholder mô tả trong khung biên tập
4. Cấu hình qua **Settings sidebar → Block settings** (biểu tượng bánh răng)
5. Lưu/xuất bản — frontend sẽ render thư viện mẫu đầy đủ

> **Lưu ý:** Block hiển thị placeholder trong trình biên tập. Thư viện trực tiếp chỉ được render ở frontend.

## Các điều khiển Inspector

Mở thanh bên block (biểu tượng bánh răng) để cấu hình:

| Điều khiển | Nhãn Inspector | Shortcode tương đương |
|---|---|---|
| Văn bản | **Limit by tags (pool filter)** | `tags="ecommerce,blog"` |
| Công tắc | **Show tag browser toolbar** | `tags-browser="no"` |
| Văn bản | **Pill filter groups** | `filter-tags="industry"` |
| Khoảng (0–60, bước 4) | **Cards per page** | `per-page="12"` |

## Ánh xạ thuộc tính Shortcode

| Thuộc tính shortcode | Thuộc tính block | Kiểu |
|---|---|---|
| `tags` | `tags` | chuỗi |
| `filter-tags` | `filterTags` | chuỗi |
| `tags-browser` (`yes`/`no`) | `tagsBrowser` | boolean |
| `per-page` | `perPage` | số nguyên |

## Cách hoạt động

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

> Không cần bước build (Node/npm). `index.js` là ES5/ES2015 thuần, sử dụng các package `wp.*` có sẵn toàn cục mà WordPress tự động tải trong trình biên tập block.

## Block và Shortcode

Cả hai cho ra frontend giống hệt nhau. Hãy chọn theo quy trình làm việc của bạn:

| | Shortcode | Block |
|---|---|---|
| **Cấu hình** | Chỉnh sửa chuỗi thuộc tính | Các điều khiển thanh bên trực quan |
| **Xem trước** | Hiển thị văn bản shortcode | Hiển thị placeholder |
| **Hỗ trợ giao diện** | Hoạt động ở mọi nơi | Cần giao diện tương thích block |
| **Phù hợp nhất cho** | Nhà phát triển, thiết lập sao chép-dán | Người biên tập site, quy trình trực quan |

---

**Xem thêm:** [Tham chiếu Shortcode](/vi/grabwp-tenancy-waas/waas-shortcode-templates) — toàn bộ thuộc tính shortcode và tham số URL
