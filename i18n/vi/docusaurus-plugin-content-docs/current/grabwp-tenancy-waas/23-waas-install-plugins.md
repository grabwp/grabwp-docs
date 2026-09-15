---
title: "Install Plugins"
description: "Install GrabWP Tenancy, Pro, and WaaS plugins in the correct order"
order: 23
section: waas
---

# Install Plugins

GrabWP WaaS requires three plugins installed in a specific order. Each plugin depends on the one before it.

## Installation Order

```
1. GrabWP Tenancy (base)  ← must be active first
2. GrabWP Tenancy Pro     ← requires base
3. GrabWP Tenancy WaaS    ← requires base + pro
```

## Step 1: Install GrabWP Tenancy (Base)

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload `grabwp-tenancy.zip`
3. Click **Install Now**, then **Activate**
4. You should see a new **Tenancy** menu in the admin sidebar

## Step 2: Install GrabWP Tenancy Pro

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload `grabwp-tenancy-pro.zip`
3. Click **Install Now**, then **Activate**
4. The **Tenancy** menu now shows additional items: **Pro Settings**, **Tenant Extensions**

> **Note:** If activation fails with a dependency error, make sure GrabWP Tenancy (base) is activated first.

## Step 3: Install GrabWP Tenancy WaaS

1. Go to **Plugins → Add New → Upload Plugin**
2. Upload `grabwp-tenancy-waas.zip`
3. Click **Install Now**, then **Activate**
4. A new **WaaS** menu appears in the admin sidebar with:
   - Dashboard
   - Subscriptions
   - Domains
   - Templates
   - Settings

## Verify Installation

After activating all three plugins, go to **Tenancy → Status**. This page runs system checks and reports any issues:

- File system permissions
- Required PHP extensions
- Database compatibility
- Plugin version compatibility

Fix any reported issues before proceeding.

## Plugin List

Your active plugins should include:

| Plugin | Status |
|--------|--------|
| GrabWP Tenancy | Active |
| GrabWP Tenancy Pro | Active |
| GrabWP Tenancy WaaS | Active |

## Khám phá Add-ons chính thức

Cách khuyến nghị để lấy các add-on chính thức của GrabWP (nhà cung cấp thanh toán Stripe, Sepay, Xendit, và các add-on khác) là tab **Add-ons** trong WaaS Settings, thay vì tự tìm file ZIP. Vào **WaaS → Settings → Add-ons** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=addons`). Catalog được nhóm theo danh mục, hỗ trợ song ngữ, và được cache trong sáu giờ (có bản dự phòng last-known-good nếu máy chủ catalog không truy cập được). Các add-on tương thích tải về bằng một cú nhấp ZIP từ admin; license key và URL site được gắn phía máy chủ, không bao giờ lộ trong HTML trang. Màn hình Billing Providers cũng có liên kết **Browse Add-ons** dẫn tới tab này.

![WaaS Add-ons tab](../images/waas-addons.png)

| Huy hiệu | Ý nghĩa |
|-------|---------|
| **Available** | Tương thích và sẵn sàng tải về |
| **Installed** | Đã tải về nhưng chưa kích hoạt |
| **Active** | Đã cài và đang chạy |
| **Update Available** | Có phiên bản tương thích mới hơn |
| **Requires WaaS Update** | Phiên bản WaaS của bạn quá cũ cho add-on này |

## Optional: Install SePay Plugin

If you plan to accept Vietnamese bank transfer payments (VietQR), also install:

1. Upload `grabwp-tenancy-sepay.zip`
2. Activate

This adds SePay as a billing provider option in WaaS settings.

---

**Next:** [Configure Pro Settings](/grabwp-tenancy-waas/waas-configure-pro-settings)
