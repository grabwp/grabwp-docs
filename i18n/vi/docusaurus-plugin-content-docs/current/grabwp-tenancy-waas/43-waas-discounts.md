---
title: "Add-on Discounts"
description: "Tạo và quản lý mã giảm giá, link chiến dịch và ưu đãi định kỳ cho quy trình đăng ký WaaS"
order: 43
section: waas
draft: true
---

# Add-on Discounts (WaaS)

> **Thông báo:** Tài liệu này là bản thảo chưa xuất bản (unpublished draft) cho add-on GrabWP Tenancy Discounts.

GrabWP Tenancy Discounts bổ sung tính năng mã giảm giá và link chiến dịch khuyến mại vào luồng đăng ký của GrabWP WaaS. Đây là plugin add-on tùy chọn (`grabwp-tenancy-discounts`) yêu cầu GrabWP Tenancy WaaS từ phiên bản 1.1.24 trở lên.

### Kiến trúc và cô lập cơ sở dữ liệu

Add-on duy trì khả năng cô lập dữ liệu chặt chẽ:

- **Bảng cơ sở dữ liệu riêng:** Add-on tạo và sở hữu bảng dữ liệu riêng `{$wpdb->prefix}grabwp_discount_redemptions`, dùng để lưu trữ các bản ghi áp dụng mã giảm giá, số tiền ban đầu và sau giảm, khóa email khách hàng cùng số kỳ gia hạn ưu đãi còn lại.
- **Không thay đổi dữ liệu cốt lõi:** Add-on không sửa đổi bất kỳ bảng cơ sở dữ liệu cốt lõi nào của WordPress hay WaaS (như subscriptions, plans hoặc tenants) và không chỉnh sửa các file mã nguồn cốt lõi.
- **Tùy chọn cấu hình riêng:** Các quy tắc khuyến mại và cài đặt add-on được lưu trong các option riêng biệt (`grabwp_waas_discount_codes` và `grabwp_discounts_settings`), trong khi giới hạn tần suất sử dụng transient cache (`_transient_gwd_rl_*`).
- **Vòng đời rõ ràng:** Khi hủy kích hoạt (deactivate), bảng dữ liệu và cài đặt vẫn được giữ nguyên nhưng hệ thống sẽ bỏ qua mã giảm giá và khôi phục hành vi thanh toán mặc định của WaaS. Khi gỡ cài đặt hoàn toàn (Delete trong trang Plugins), hệ thống sẽ tự động xóa bảng `{$wpdb->prefix}grabwp_discount_redemptions` và dọn sạch các option cùng transient liên quan.

> **Chính sách ảnh chụp màn hình (Screenshot Policy):** Toàn bộ ảnh chụp màn hình cho add-on Discounts được hoãn lại để chụp sau Round 6 nhằm đảm bảo phản ánh chính xác các nâng cấp UX quản trị của Round 6 (giao diện tab dưới 700px, cột Actions cố định, toggletip WP 7.1, và bản địa hóa hoàn chỉnh). Tuyệt đối không sử dụng ảnh chụp cũ trước Round 6. Các thẻ giữ chỗ (`TODO (Screenshot)`) mô tả chi tiết phạm vi cần chụp.

## Bật tính năng giảm giá

1. Cài đặt và kích hoạt plugin **GrabWP Tenancy Discounts**.
2. Trong wp-admin, truy cập vào **Waas → Discounts** (`/wp-admin/admin.php?page=grabwp-tenancy-discounts`).
3. Mở rộng phần accordion **Settings** ở đầu trang (mở sẵn theo mặc định khi tính năng giảm giá đang tắt).
4. Tích chọn **Enable discounts** và bấm **Save settings**.

Accordion **Settings** đồng thời cung cấp các tùy chọn giới hạn tần suất và chống lạm dụng:

- **Wrong codes per visitor** (mặc định `10`): Số lần thử mã không hợp lệ tối đa từ một địa chỉ IP trong khung thời gian quy định trước khi tạm khóa thử mã.
- **Refused emails** (mặc định `5`): Số lần đăng ký thất bại tối đa đối với một địa chỉ email (do không hợp lệ hoặc đã dùng hết lượt) trước khi chặn email đó.
- **Limit window (minutes)** (mặc định `15`): Khung thời gian (tính bằng phút) áp dụng cho các giới hạn theo IP và email.

Khi tùy chọn **Enable discounts** bị tắt, các mã đã tạo vẫn được lưu trữ, nhưng mọi tính toán thanh toán ở trang đăng ký và các hóa đơn gia hạn sẽ giữ nguyên giá gốc tiêu chuẩn.

> **TODO (Screenshot):** Bổ sung ảnh chụp giao diện danh sách mã giảm giá và accordion cài đặt mở rộng theo chuẩn Round 6 (`admin.php?page=grabwp-tenancy-discounts`). Đang chờ chụp lại UI sau Round 6.

## Danh sách mã giảm giá và cột Actions cố định

Trang tổng quan tại **Waas → Discounts** hiển thị các chiến dịch giảm giá đang hoạt động và đã lên lịch.

### Các cột trong danh sách

| Cột | Ý nghĩa |
|---|---|
| **Code** | Mã giảm giá (hiển thị chữ in hoa dạng monospace). Bấm vào mã để mở màn hình chỉnh sửa. |
| **Campaign** | Tên chiến dịch nội bộ để theo dõi và xem báo cáo. |
| **Discount** | Huy hiệu giá trị giảm giá (ví dụ `-20%` hoặc `-$10.00`) kèm ghi chú thời hạn. |
| **Status** | Trạng thái khuyến mại: **Active**, **Paused**, **Scheduled**, **Ended**, hoặc **Sold out**. |
| **Redemptions** | Số lượt đã sử dụng trên tổng giới hạn cho phép. |
| **Discount given** | Tổng số tiền đã giảm trên toàn bộ các đơn hàng. |
| **Revenue** | Doanh thu thu về từ các đơn hàng áp dụng mã này. |
| **Flows** | Các luồng đăng ký WaaS được cấu hình tự động áp dụng mã. |
| **Ends** | Thời gian hết hạn theo giờ hệ thống, hoặc **No end date**. |
| **Actions** | Cột chứa các nút thao tác cố định, dễ bấm. |

### Cột Actions hiển thị cố định

Khác với các bảng quản trị WordPress truyền thống thường ẩn liên kết thao tác dưới dạng hover, danh sách Discounts trang bị một cột **Actions** hiển thị liên tục cùng các nút biểu tượng hỗ trợ tiếp cận:

- **Edit** (biểu tượng bút chì): Mở biểu mẫu chỉnh sửa mã giảm giá.
- **Copy campaign link** (biểu tượng liên kết): Sao chép đường dẫn đăng ký gắn sẵn mã vào clipboard với phản hồi trực quan tức thì.
- **Pause / Resume** (biểu tượng tạm dừng/tiếp tục): Chuyển đổi nhanh trạng thái hoạt động của chiến dịch thông qua yêu cầu nội dòng (inline request) mà không cần vào trang chỉnh sửa.
- **Delete** (biểu tượng thùng rác): Xóa quy tắc mã giảm giá. Việc xóa mã không làm gián đoạn các đăng ký định kỳ đang trong thời gian hưởng ưu đãi trước đó.

> **TODO (Screenshot):** Bổ sung ảnh chụp bảng danh sách hiển thị cột Actions cố định, trạng thái hover và phản hồi khi sao chép liên kết.

### Các khoản giảm giá định kỳ đang áp dụng (Recurring discounts in progress)

Phía dưới bảng danh sách mã giảm giá, trang hiển thị bảng **Recurring discounts in progress** theo dõi các gói thuê bao đang trong thời hạn giảm giá trên các cổng thanh toán dùng hóa đơn nội bộ (SePay và WooCommerce):

- **Tenant**: Mã định danh tenant (nhấp vào để chuyển đến màn hình chi tiết thuê bao).
- **Code**: Mã giảm giá được áp dụng cho thuê bao này.
- **Plan**: Tên gói dịch vụ đang hoạt động.
- **Payment**: Cổng thanh toán xử lý (như SePay hoặc WooCommerce).
- **Discounted renewals left**: Số kỳ gia hạn còn lại tiếp tục được giảm giá trên hóa đơn trước khi quay về giá gốc.
- **Redeemed**: Ngày và giờ hoàn tất đăng ký đơn hàng ban đầu.

## Tạo hoặc chỉnh sửa mã giảm giá

Bấm **Add New** (`/wp-admin/admin.php?page=grabwp-tenancy-discounts&action=new`) hoặc bấm vào bất kỳ mã nào trong danh sách để chỉnh sửa.

Biểu mẫu tạo và chỉnh sửa được phân chia thành 3 tab gọn gàng trên cùng một trang, giữ cho chiều cao khởi tạo ban đầu dưới 700px:

### 1. Tab Discount

- **Code**: Từ 3 đến 32 ký tự (chữ cái, chữ số, dấu gạch nối và dấu gạch dưới). Khách hàng có thể nhập chữ hoa hoặc chữ thường; hệ thống tự động chuẩn hóa và lưu trữ ở dạng chữ in hoa.
- **Campaign name**: Tên chiến dịch nội bộ dành cho báo cáo quản trị (không hiển thị cho khách hàng).
- **Banner text**: Nội dung hiển thị trên banner trang đăng ký và shortcode quảng bá. Hỗ trợ các thẻ `{ends}` (ngày kết thúc) và `{remaining}` (số lượt còn lại). Các câu có thẻ này sẽ được tự động rút gọn nếu mã không đặt giới hạn.
- **Discount**: Chọn **Percent** (giảm 1% đến 99%) hoặc **Fixed amount** (số tiền cố định theo đơn vị tiền tệ chính). Giảm giá 100% không được hỗ trợ: bạn hãy dùng tính năng dùng thử miễn phí (free trial) của gói dịch vụ.
- **Duration**: Quy định số kỳ thanh toán được giảm giá (xem phần Thời hạn chi tiết bên dưới).
- **Status**: Tích chọn **Active** để chiến dịch hoạt động; bỏ tích để tạm dừng.

### 2. Tab Campaign

- **Starts**: Ngày và giờ offer bắt đầu có hiệu lực (theo giờ site).
- **Ends**: Ngày và giờ hết hạn khuyến mại. Điều khiển đồng hồ đếm ngược trên banner. Liên kết chiến dịch sẽ tự động vô hiệu hóa sau thời điểm này.
- **Total uses**: Tổng số lượt đăng ký tối đa trên toàn hệ thống (đặt 0 nếu không giới hạn).
- **Signup flows**: Tích chọn luồng đăng ký để tự động áp dụng mã cho khách hàng trên luồng đó (mỗi luồng chỉ tự động áp dụng một mã đang hoạt động).

### 3. Tab Eligibility

- **Plans**: Chọn các gói dịch vụ được áp dụng mã. Để trống toàn bộ để áp dụng cho mọi gói.
- **Billing cycles**: Giới hạn theo chu kỳ **Monthly**, **Yearly**, hoặc để trống cả hai để áp dụng cho mọi chu kỳ.
- **Additional restrictions** (accordion mở rộng):
  - **Templates**: Giới hạn theo slug của mẫu giao diện (mỗi dòng một slug). Để trống để áp dụng cho mọi template.
  - **Minimum first payment**: Số tiền đơn hàng tối thiểu trước khi giảm giá để đủ điều kiện áp dụng mã.
  - **Uses per customer**: Số lượt dùng tối đa trên mỗi email khách hàng (mặc định là 1; 0 là không giới hạn). Các địa chỉ email chỉ khác nhau bởi dấu chấm hoặc phần mở rộng `+tag` được tính là cùng một khách hàng.
  - **Allowed emails**: Giới hạn theo danh sách email cụ thể hoặc tên miền đại diện (ví dụ `*@congty.com`).
  - **New customers only**: Chỉ áp dụng cho các địa chỉ email chưa từng đăng ký dịch vụ trên nền tảng.

> **Quy tắc quan trọng:**
> - Thay đổi trên mã giảm giá chỉ có hiệu lực với các đơn đăng ký mới trong tương lai. Khách hàng đã đăng ký trước đó vẫn giữ nguyên các điều khoản ưu đãi ban đầu.
> - Mã giảm giá và thời gian dùng thử miễn phí không cộng dồn. Khi mã giảm giá được áp dụng, thời gian dùng thử của gói sẽ bị tắt trong lần thanh toán đó.

> **TODO (Screenshot):** Bổ sung ảnh chụp giao diện tạo/sửa mã giảm giá hiển thị 3 tab trong trang, các gợi ý trợ giúp (toggletips) và accordion mở rộng.

## Thời hạn (Duration) giải thích dễ hiểu

Add-on hỗ trợ 3 tùy chọn thời hạn rõ ràng:

1. **First payment only** (`once`): Giảm giá chỉ áp dụng cho lần thanh toán đầu tiên lúc đăng ký (bao gồm tiền gói, phí mẫu giao diện và các dịch vụ bổ sung). Mọi kỳ gia hạn tiếp theo được tính theo giá gốc đầy đủ.
2. **Fixed number of payments (including first)** (`repeating`): Giảm giá áp dụng cho một số kỳ thanh toán cố định (từ 2 đến 36 kỳ). Lần thanh toán đầu tiên được tính là kỳ số 1. Các kỳ gia hạn sau đó tiếp tục được giảm cho đến khi hết số kỳ quy định, sau đó quay về giá gốc.
3. **Every payment until plan change or cancellation** (`forever`): Giảm giá áp dụng cho lần thanh toán đầu tiên và toàn bộ các kỳ gia hạn tiếp theo cho đến khi khách hàng hủy hoặc đổi gói.

> **Thay đổi gói dịch vụ:** Việc nâng cấp hoặc hạ cấp gói trên một đăng ký đang hoạt động sẽ ngay lập tức chấm dứt ưu đãi giảm giá định kỳ. Các hóa đơn gia hạn tiếp theo sẽ tính theo biểu giá tiêu chuẩn của gói mới.

## Hỗ trợ và cấu hình cổng thanh toán

Mỗi cổng thanh toán xử lý ưu đãi định kỳ theo các cơ chế khác nhau:

| Cổng thanh toán | Lần thanh toán đầu | Kỳ gia hạn sau | Cấu hình yêu cầu |
|---|---|---|---|
| **Stripe** | Có | Có (đồng bộ coupon trên Stripe) | GrabWP Tenancy Stripe 1.1.6+ và secret key |
| **SePay** | Có | Có (trên hóa đơn gia hạn của WaaS) | Không cần cấu hình thêm trên cổng |
| **WooCommerce** | Có | Có (trên hóa đơn gia hạn của WaaS) | Không cần cấu hình thêm trên cổng |
| **Xendit** | Có | Không (chỉ hỗ trợ thanh toán lần đầu) | Không cần cấu hình thêm trên cổng |
| **Polar** | Không | Không | Chưa hỗ trợ (Not available yet) |

### Stripe: Tự động đồng bộ coupon

- **Yêu cầu:** Cần cài đặt GrabWP Tenancy Stripe phiên bản 1.1.6 trở lên và điền Stripe secret key tại **Waas → Settings → Billing Providers → Stripe**.
- **Đồng bộ tự động:** Add-on tự động tạo và quản lý coupon trực tiếp trong tài khoản Stripe của bạn với tiền tố dạng `gwaas-CODE-DURATION-AMOUNT`.
- **Ánh xạ thời hạn:**
  - Lần đầu: ánh xạ sang Stripe `duration=once`.
  - Mọi kỳ thanh toán: ánh xạ sang Stripe `duration=forever`.
  - Số kỳ cố định: ánh xạ sang Stripe `duration=repeating` với `duration_in_months` được tính toán tự động dựa theo chu kỳ thanh toán (ví dụ: 3 kỳ thanh toán tháng = 3 tháng; 2 kỳ thanh toán năm = 13 tháng).
- **Hành vi checkout:** Coupon được gắn trực tiếp vào Stripe Checkout Session. Khách hàng nhìn thấy giá sau giảm ngay trên trang thanh toán của Stripe, và ô nhập mã khuyến mại mặc định của Stripe được ẩn đi.
- **Hủy kích hoạt:** Các coupon Stripe đang chạy trên các gói thuê bao hiện có vẫn tiếp tục hoạt động cho đến hết thời hạn.

### SePay và WooCommerce: Hóa đơn gia hạn

- WaaS tự quản lý việc gia hạn của SePay và WooCommerce thông qua hệ thống hóa đơn nội bộ.
- **Không cần cấu hình cổng:** Bạn không cần phải tạo mã giảm giá hay thiết lập cấu hình nào bên trong SePay hoặc WooCommerce.
- **Giảm trừ trực tiếp trên hóa đơn:** Mỗi hóa đơn gia hạn định kỳ được tạo tự động với số tiền đã trừ ưu đãi kèm dòng ghi chú rõ ràng (ví dụ: `Discount BF26: -$10.00`).
- **Hủy kích hoạt:** Nếu add-on Discounts bị hủy kích hoạt, các hóa đơn gia hạn sau đó sẽ tính theo giá gốc đầy đủ.

### Xendit: Chỉ áp dụng lần đầu

- Xendit hỗ trợ giảm giá cho khoản thanh toán ban đầu khi đăng ký.
- Vì WaaS không can thiệp được vào các đợt thu định kỳ của Xendit, các mã giảm giá được cấu hình thời hạn định kỳ (repeating hoặc forever) sẽ bị từ chối khi khách chọn thanh toán bằng Xendit.

### Polar: Chưa hỗ trợ

- Hiện tại Polar chưa được hỗ trợ cho mã giảm giá.
- Mặc dù Polar có cơ chế giảm giá nội bộ, WaaS hiện vẫn đối soát số tiền webhook thanh toán thành công với tổng số tiền trước giảm giá, dẫn tới việc xác thực đơn hàng bị lỗi.
- Khi khách hàng áp dụng mã giảm giá, phương thức Polar sẽ tạm thời bị vô hiệu hóa kèm thông báo chuyển sang phương thức thanh toán được hỗ trợ khác.

### Mức phí tối thiểu của cổng thanh toán

Mã giảm giá sẽ không bao giờ làm giảm số tiền phải thanh toán xuống dưới mức tối thiểu do cổng quy định (được thiết lập trong WaaS Currency Settings, ví dụ 0.50 USD). Nếu mức giảm vượt quá giới hạn này, số tiền ưu đãi sẽ được tự động điều chỉnh tăng lên mức tối thiểu cho phép.

## Liên kết chiến dịch (Campaign links)

Bạn có thể chia sẻ liên kết khuyến mại trực tiếp cho khách hàng:

- Gắn tham số `?coupon=CODE` vào bất kỳ đường dẫn nào trên website (như trang chủ, landing page hoặc bảng giá):
  `https://example.com/signup/?coupon=SAVE20`
- Nếu mã chỉ áp dụng cho một gói duy nhất, gắn thêm ID của gói:
  `https://example.com/signup/?coupon=SAVE20&plan=pro`
- Khi khách hàng nhấp vào link chiến dịch, mã sẽ được lưu trong trình duyệt của họ trong vòng 7 ngày (hoặc đến khi mã hết hạn).
- Trong **Waas → Discounts**, bấm biểu tượng **Copy campaign link** ở cột Actions để sao chép liên kết cho bất kỳ mã nào.

## Mã rút gọn (Shortcodes)

- `[grabwp_waas_signup coupon="CODE"]`: Hiển thị biểu mẫu đăng ký được điền sẵn mã ưu đãi.
- `[grabwp_waas_pricing coupon="CODE"]`: Hiển thị bảng giá với giá gốc bị gạch ngang và giá ưu đãi mới.
- `[grabwp_waas_templates coupon="CODE"]`: Hiển thị danh sách mẫu giao diện với giá gói ưu đãi và chuyển tiếp mã sang trang đăng ký.
- `[grabwp_waas_promo code="CODE" cta="Bắt đầu ngay"]`: Hiển thị hộp banner quảng bá độc lập kèm đồng hồ đếm ngược và nút kêu gọi hành động.

---

> **Ghi chú chuyển giao ảnh chụp (Screenshot Handoff):** Toàn bộ ảnh chụp màn hình cho add-on GrabWP Tenancy Discounts cần được chụp lại sau khi hoàn thiện giao diện quản trị theo chuẩn Round 6. Tuyệt đối không dùng các ảnh chụp cũ trước Round 6.
