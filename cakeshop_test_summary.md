# 🧪 CakeShop Automation Test - Tổng Kết

## Cấu trúc file đã tạo

```
testing-gauge/
├── specs/cakeshop/
│   ├── concepts/
│   │   └── cakeshop.cpt          # Concepts tái sử dụng (đăng nhập, chuẩn bị giỏ hàng)
│   ├── login.spec                 # 10 test cases đăng nhập
│   ├── register.spec              # 10 test cases đăng ký
│   ├── search_filter.spec         # 10 test cases tìm kiếm & lọc
│   ├── cart.spec                  # 10 test cases giỏ hàng
│   └── checkout.spec              # 10 test cases thanh toán
└── tests/
    └── cakeshop_steps.js          # Step implementation (Taiko)
```

## Tổng quan 50 Test Cases

### 1. Đăng Nhập (`login.spec`) - 10 TCs
| # | Mô tả | Tags |
|---|--------|------|
| TC01 | Đăng nhập thành công với tài khoản hợp lệ | smoke, login, positive |
| TC02 | Thất bại khi không nhập email | login, negative |
| TC03 | Thất bại khi không nhập mật khẩu | login, negative |
| TC04 | Thất bại khi không nhập cả email và mật khẩu | login, negative |
| TC05 | Thất bại với email sai định dạng | login, negative |
| TC06 | Thất bại với mật khẩu dưới 6 ký tự | login, negative |
| TC07 | Thất bại với email không tồn tại (server error) | login, negative |
| TC08 | Thất bại với mật khẩu sai (server error) | login, negative |
| TC09 | Điều hướng đến trang đăng ký | login, navigation |
| TC10 | Điều hướng đến trang quên mật khẩu | login, navigation |

### 2. Đăng Ký (`register.spec`) - 10 TCs
| # | Mô tả | Tags |
|---|--------|------|
| TC01 | Đăng ký thành công với email ngẫu nhiên | smoke, register, positive |
| TC02 | Thất bại khi không nhập email | register, negative |
| TC03 | Thất bại khi không nhập mật khẩu | register, negative |
| TC04 | Thất bại khi không nhập email và mật khẩu | register, negative |
| TC05 | Thất bại với email sai định dạng | register, negative |
| TC06 | Thất bại với mật khẩu dưới 6 ký tự | register, negative |
| TC07 | Thất bại với email đã tồn tại | register, negative |
| TC08 | Kiểm tra tiêu đề trang đăng ký | register, ui |
| TC09 | Điều hướng đến trang đăng nhập | register, navigation |
| TC10 | Đăng ký thành công + xác nhận redirect | register, positive |

### 3. Tìm Kiếm & Lọc (`search_filter.spec`) - 10 TCs
| # | Mô tả | Tags |
|---|--------|------|
| TC01 | Tìm kiếm theo tên - có kết quả | smoke, search, positive |
| TC02 | Tìm kiếm - không có kết quả | search, negative |
| TC03 | Sắp xếp theo giá tăng dần | sort |
| TC04 | Sắp xếp theo giá giảm dần | sort |
| TC05 | Lọc theo danh mục dịp lễ | filter |
| TC06 | Lọc theo hương vị | filter |
| TC07 | Xóa tất cả bộ lọc | filter |
| TC08 | Kết hợp tìm kiếm + lọc danh mục | search, filter |
| TC09 | Kiểm tra hiển thị số lượng kết quả | search, ui |
| TC10 | Xem chi tiết sản phẩm từ danh sách | smoke, navigation |

### 4. Giỏ Hàng (`cart.spec`) - 10 TCs
| # | Mô tả | Tags |
|---|--------|------|
| TC01 | Thêm sản phẩm từ danh sách | smoke, cart, positive |
| TC02 | Thêm sản phẩm từ trang chi tiết | cart, positive |
| TC03 | Tăng số lượng sản phẩm | cart |
| TC04 | Giảm số lượng sản phẩm | cart |
| TC05 | Xóa sản phẩm khỏi giỏ | cart |
| TC06 | Kiểm tra cập nhật tổng tiền | cart |
| TC07 | Giỏ hàng trống hiển thị thông báo | cart, ui |
| TC08 | Thêm nhiều sản phẩm khác nhau | cart |
| TC09 | Kiểm tra badge giỏ hàng trên header | cart, ui |
| TC10 | Click "Quay lại mua sắm" | cart, navigation |

### 5. Thanh Toán (`checkout.spec`) - 10 TCs
| # | Mô tả | Tags |
|---|--------|------|
| TC01 | Đặt hàng thành công | smoke, checkout, positive |
| TC02 | Thất bại khi không nhập địa chỉ | checkout, negative |
| TC03 | Áp dụng mã giảm giá hợp lệ | checkout, coupon |
| TC04 | Áp dụng mã giảm giá không hợp lệ | checkout, coupon, negative |
| TC05 | Hiển thị danh sách sản phẩm trong tóm tắt | checkout, ui |
| TC06 | Quay lại giỏ hàng | checkout, navigation |
| TC07 | Checkout khi giỏ trống | checkout, negative |
| TC08 | Hiển thị tổng tiền thanh toán | checkout, ui |
| TC09 | Gỡ bỏ mã giảm giá | checkout, coupon |
| TC10 | Chỉnh sửa địa chỉ + đặt hàng thành công | checkout, positive |

## Cách chạy test

```bash
# Chạy tất cả CakeShop specs
gauge run specs/cakeshop/

# Chạy theo từng chức năng
gauge run specs/cakeshop/login.spec
gauge run specs/cakeshop/register.spec
gauge run specs/cakeshop/search_filter.spec
gauge run specs/cakeshop/cart.spec
gauge run specs/cakeshop/checkout.spec

# Chạy theo tag
gauge run --tags "smoke" specs/cakeshop/
gauge run --tags "login & negative" specs/cakeshop/
```

> [!IMPORTANT]
> **Tài khoản test**: Các spec sử dụng email `duc@gmail.com` và mật khẩu `123456`. Hãy cập nhật trong file spec nếu tài khoản test khác.

> [!WARNING]
> **Mã giảm giá**: TC03 và TC09 của checkout dùng mã `WELCOME10` — nếu mã này không tồn tại trong hệ thống, test sẽ xử lý gracefully (kiểm tra có phản hồi).

> [!NOTE]
> **Concepts tái sử dụng**: File `cakeshop.cpt` định nghĩa 2 concept:
> - `Đăng nhập CakeShop với email <email> và mật khẩu <password>` — dùng trong cart/checkout specs
> - `Chuẩn bị giỏ hàng CakeShop có sản phẩm` — tự động thêm 1 sản phẩm vào giỏ
