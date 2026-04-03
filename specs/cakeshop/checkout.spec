# Thanh Toán - CakeShop

Kiểm thử tính năng thanh toán đơn hàng trên trang https://cake-shop-user.netlify.app

## TC01 - Đặt hàng thành công với địa chỉ hợp lệ
Tags: smoke, checkout, positive

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Nhập địa chỉ giao hàng "123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
* Click đặt hàng ngay
* Xác nhận đặt hàng thành công chuyển đến trang đơn hàng

## TC02 - Đặt hàng thất bại khi không nhập địa chỉ
Tags: checkout, negative

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Xóa địa chỉ giao hàng hiện tại
* Click đặt hàng ngay
* Xác nhận hiển thị lỗi validation "Vui lòng nhập địa chỉ giao hàng cụ thể"

## TC03 - Áp dụng mã giảm giá hợp lệ
Tags: checkout, coupon

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Nhập mã giảm giá "CATSPECIAL7WG6"
* Click áp dụng mã giảm giá
* Chờ "2" giây
* Xác nhận mã giảm giá được áp dụng hoặc báo lỗi

## TC04 - Áp dụng mã giảm giá không hợp lệ
Tags: checkout, coupon, negative

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Nhập mã giảm giá "INVALID_CODE_XYZ"
* Click áp dụng mã giảm giá
* Chờ "2" giây
* Xác nhận hiển thị toast lỗi mã giảm giá

## TC05 - Kiểm tra hiển thị danh sách sản phẩm trong tóm tắt đơn hàng
Tags: checkout, ui

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Xác nhận trang checkout hiển thị danh sách sản phẩm

## TC06 - Quay lại giỏ hàng từ trang checkout
Tags: checkout, navigation

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Click quay lại giỏ hàng
* Xác nhận URL chứa "/cart"

## TC07 - Checkout khi giỏ hàng trống hiển thị cảnh báo
Tags: checkout, negative

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Xóa toàn bộ giỏ hàng qua API
* Mở trang CakeShop tại "/checkout"
* Chờ "3" giây
* Xác nhận trang checkout hiển thị giỏ hàng trống

## TC08 - Kiểm tra hiển thị tổng tiền thanh toán
Tags: checkout, ui

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Xác nhận hiển thị tổng tiền thanh toán

## TC09 - Gỡ bỏ mã giảm giá đã áp dụng
Tags: checkout, coupon

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Nhập mã giảm giá "CATSPECIAL7WG6"
* Click áp dụng mã giảm giá
* Chờ "2" giây
* Click gỡ bỏ mã giảm giá
* Chờ "1" giây
* Xác nhận mã giảm giá đã được gỡ bỏ

## TC10 - Chỉnh sửa địa chỉ giao hàng và đặt hàng thành công
Tags: checkout, positive

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/checkout"
* Chờ trang checkout tải xong
* Xóa địa chỉ giao hàng hiện tại
* Nhập địa chỉ giao hàng "456 Đường Lê Lợi, Quận 3, TP.HCM"
* Click đặt hàng ngay
* Xác nhận đặt hàng thành công chuyển đến trang đơn hàng
