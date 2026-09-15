---
title: "Set Up Billing"
description: "Connect Polar as a payment provider for subscription billing"
order: 27
section: waas
---

# Set Up Billing

Billing connects your plans to a payment provider so customers can pay for subscriptions. GrabWP WaaS supports **Polar** (primary) and **WooCommerce** (alternative).

This guide covers Polar. For WooCommerce, see [WooCommerce Billing](/grabwp-tenancy-waas/waas-optional-woocommerce).

Navigate to **WaaS → Settings → Billing** (`/wp-admin/admin.php?page=grabwp-tenancy-waas-settings&tab=billing`).

![Billing settings](../images/waas-billing-settings.png)

## Cài đặt tiền tệ

Phía trên các thẻ nhà cung cấp, phần **Currency Settings** kiểm soát cách giá gói được lưu, hiển thị và quy đổi khi nhà cung cấp thanh toán cần một loại tiền khác.

![Currency settings](../images/waas-currency-settings.png)

| Trường | Mô tả |
|-------|-------------|
| **Primary Currency** | Loại tiền hiển thị cho khách trên trang giá và hóa đơn. Giá gói được lưu bằng loại tiền này. Mặc định: USD. |
| **Secondary Currency** | Tùy chọn. Đặt khi nhà cung cấp thanh toán yêu cầu loại tiền khác với primary (ví dụ Sepay yêu cầu VND). Chọn **None (single currency)** cho site dùng một loại tiền. |
| **Exchange Rate** | Bao nhiêu đơn vị secondary tương đương 1 đơn vị primary. WaaS áp dụng tỷ giá này trước khi thu phí qua nhà cung cấp yêu cầu secondary currency (ví dụ Sepay). Polar và Stripe thu theo loại tiền catalog của riêng họ và không dùng tỷ giá này cho số tiền bị charge. |
| **Currency Position** | Định dạng hiển thị: Left (`$99.99`), Left with space, Right, hoặc Right with space. |
| **Decimal Separator** | Ký tự ngăn cách phần nguyên và phần thập phân. |
| **Thousand Separator** | Ký tự nhóm hàng nghìn. |

> **Tip:** Để **Secondary Currency** là **None (single currency)** khi dùng chế độ một loại tiền (không quy đổi). Khi đã đặt secondary currency, giá gói và mẫu lưu bằng primary currency sẽ được quy đổi sang loại tiền charge của nhà cung cấp trước khi tạo sản phẩm Polar combo/one-time, và loại tiền đã quy đổi được ghi lại để gia hạn thu đúng số tiền. Nếu loại tiền đích nằm ngoài cặp đã cấu hình, quy đổi trả lỗi thay vì lặng lẽ thu số tiền chưa quy đổi. Nhà cung cấp yêu cầu một loại tiền cụ thể (ví dụ Sepay yêu cầu VND) sẽ bị chặn lúc lưu trừ khi loại tiền đó được đặt làm primary hoặc secondary.

## Step 1: Create a Polar Account

1. Go to [polar.sh](https://polar.sh) and create an account
2. Create an **Organization** if you don't have one
3. Note your organization dashboard URL - you'll need it

## Step 2: Create Products in Polar

For each paid plan, create a matching product in Polar.

1. In Polar dashboard, go to **Products**
2. Click **Create Product**
3. Set up your product:

| Field | Value |
|-------|-------|
| **Name** | Same as your plan name (e.g., "Pro Monthly") |
| **Type** | Subscription |
| **Price** | Must match your plan price (e.g., $9.99/month) |
| **Billing Interval** | Monthly (or Yearly for yearly products) |

4. After creating the product, copy its **Product ID** (UUID) from the product settings page

> **Create separate products for monthly and yearly billing.** For example: "Pro Monthly" ($9.99/month) and "Pro Yearly" ($99.99/year).

## Step 3: Configure Polar in WaaS

On the Billing Providers tab:

1. Find the **Polar** provider card
2. Check **Enable this provider**
3. Fill in:

| Field | Description |
|-------|-------------|
| **API URL** | `https://api.polar.sh` (production) or `https://sandbox-api.polar.sh` (testing) |
| **Access Token** | Your Polar API token - generate in Polar → Settings → API |
| **Webhook Secret** | Secret string to verify webhook authenticity |

4. Click **Save Settings**

## Step 4: Set Up Webhook

WaaS needs to receive payment events from Polar to activate subscriptions.

1. In Polar dashboard, go to **Webhooks**
2. Click **Add Endpoint**
3. Set the URL to:
   ```
   https://yoursaas.com/wp-json/grabwp-waas/v1/webhooks/billing/polar
   ```
4. Select events to send:
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`
   - `order.created`
5. Copy the **Webhook Secret** and paste it into WaaS → Settings → Billing → Polar → Webhook Secret
6. Save both Polar and WaaS settings

> **Test webhooks:** Use the Polar dashboard → Webhooks → Delivery log to verify events are being received. Check WaaS → Settings → Billing → "Last webhook received" timestamp.

## Step 5: Link Products to Plans

Go back to **WaaS → Settings → Plans** and edit your paid plan:

1. Paste the **Polar Monthly Product ID** into the matching field
2. Paste the **Polar Yearly Product ID** if you created a yearly product
3. Save the plan

## Step 6: Test a Payment

Before going live, test the full payment flow:

1. Set Polar API URL to the **sandbox** endpoint: `https://sandbox-api.polar.sh`
2. Create sandbox products in the Polar sandbox dashboard
3. Go through the signup flow on your site, select the paid plan
4. Complete payment using Polar's sandbox test cards
5. Verify the tenant site is provisioned and subscription is active in WaaS → Subscriptions

Once verified, switch back to the production API URL and production products.

---

**Next:** [Set Up Templates](/grabwp-tenancy-waas/waas-setup-templates)
