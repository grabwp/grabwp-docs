---
title: "Cài Pro"
description: "Cài GrabWP Tenancy Pro và kích hoạt license"
order: 11
section: pro
---

# Cài Pro

## Trước khi bắt đầu

> **Required:** Cài và kích hoạt plugin miễn phí **GrabWP Tenancy** trước. Pro không chạy nếu thiếu plugin đó.

→ [Cài plugin miễn phí](/grabwp-tenancy/installation-guide)

## Tải ZIP

Sau khi mua, Polar gửi email có liên kết **Customer Portal**. Mở liên kết và tải ZIP plugin Pro.

Nếu không thấy email, tìm "Polar" hoặc "GrabWP", kể cả thư spam.

## Cài

1. Vào **Plugins → Add New → Upload Plugin**
2. Tải ZIP, nhấn **Install Now**, rồi **Activate Plugin**

## Kích hoạt license

**Vào Tenancy → License** (`page=grabwp-tenancy-license`).

![GrabWP Tenancy Pro License](../images/10-license.png)

Bản cài mới hiện **Activate your license to unlock Pro features.**

1. Sao chép key từ [Customer Portal](https://polar.sh/grabwp/portal). Key bắt đầu bằng `GRABWPPRO-`.
2. Dán vào **License key**.
3. Nhấn **Activate License**.

Nút này gửi domain của site và license key tới GrabWP / Polar để kích hoạt.

Site đã có license hiện **Customer**, **Email**, **License key** (đã che), **Status**, và **Expires** (**No Expiry** khi key không hết hạn). **Revoke license** gỡ kích hoạt khỏi site này.

→ [License](/grabwp-tenancy-pro/pro-license)

## Xác nhận Pro đang bật

**Vào Tenancy → Status** (`page=grabwp-tenancy-status&tab=pro`).

![Status, tab Pro Plugin](../images/09-status-pro.png)

**Pro Plugin Information** phải hiện **Status** là **Active** và **Pro Version**.

Menu **Tenancy** lúc đó có **License** và **Pro Settings**.

## Danh sách tenant thay đổi thế nào

**Vào Tenancy → All Tenants** (`page=grabwp-tenancy`).

![Danh sách tenant với cột và thao tác Pro](../images/grabwp-tenancy-pro-tenant-list.png)

Cột thêm: **Database**, **Storage**, **Isolation**.

Thao tác thêm trên dòng (nhãn khi di chuột), trước icon thùng rác:

| Nhãn | Màn hình |
|-------|--------|
| Plugins & Themes | Extensions |
| Fix URLs | Fix URLs |
| Clone Tenant | Clone |
| Backup Tenant | Backup |
| Restore Tenant | Restore |

Dòng **Main Site** có thêm **Clone to Tenant**.

Mở một tenant (icon **Settings**, tiêu đề **Edit Tenant**) thêm các tab: **Edit**, **Extensions**, **Clone**, **Fix URLs**, **Backup**, **Restore**, **Settings**, **Overrides**, **Homepage**, **WP Admin**.

**Create Tenant** và **Edit Tenant** có thêm **Content Isolation Options**, **Database Configuration**, và **Storage Driver** khi đã cấu hình lưu trữ S3.

**Vào Tenancy → Pro Settings** (`page=grabwp-tenancy-pro-settings`) để đặt mặc định. Xem [Pro Settings](/grabwp-tenancy-pro/pro-settings).

## Tắt Pro

Deactivate Pro gỡ các màn Pro và hành vi Pro. Dữ liệu tenant không bị xóa. Site quay về plugin miễn phí (bảng dùng chung và upload tách biệt).

**Verify:** **Tenancy → Status → Pro Plugin** hiện **Active**, và một dòng tenant có **Plugins & Themes**.
