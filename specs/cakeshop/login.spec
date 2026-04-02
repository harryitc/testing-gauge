# Đăng Nhập - CakeShop

Kiểm thử tính năng đăng nhập trên trang https://cake-shop-user.netlify.app

## TC01 - Đăng nhập thành công với tài khoản hợp lệ
Tags: smoke, login, positive

* Mở trang CakeShop tại "/login"
* Nhập email "duc@gmail.com"
* Nhập mật khẩu "123456"
* Click nút Đăng Nhập
* Xác nhận đăng nhập thành công và chuyển đến trang cakes

## TC02 - Đăng nhập thất bại khi không nhập email
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Nhập mật khẩu "123456"
* Click nút Đăng Nhập
* Xác nhận hiển thị lỗi validation "Vui lòng nhập email"

## TC03 - Đăng nhập thất bại khi không nhập mật khẩu
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Nhập email "duc@gmail.com"
* Click nút Đăng Nhập
* Xác nhận hiển thị lỗi validation "Mật khẩu phải có ít nhất 6 ký tự"

## TC04 - Đăng nhập thất bại khi không nhập email và mật khẩu
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Click nút Đăng Nhập
* Xác nhận hiển thị lỗi validation "Vui lòng nhập email"

## TC05 - Đăng nhập thất bại với email sai định dạng
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Nhập email "invalid-email"
* Nhập mật khẩu "123456"
* Click nút Đăng Nhập
* Xác nhận hiển thị lỗi validation "Email không đúng định dạng"

## TC06 - Đăng nhập thất bại với mật khẩu dưới 6 ký tự
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Nhập email "duc@gmail.com"
* Nhập mật khẩu "123"
* Click nút Đăng Nhập
* Xác nhận hiển thị lỗi validation "Mật khẩu phải có ít nhất 6 ký tự"

## TC07 - Đăng nhập thất bại với email không tồn tại
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Nhập email "khongtontai_999@gmail.com"
* Nhập mật khẩu "123456"
* Click nút Đăng Nhập
* Xác nhận hiển thị toast lỗi đăng nhập

## TC08 - Đăng nhập thất bại với mật khẩu sai
Tags: login, negative

* Mở trang CakeShop tại "/login"
* Nhập email "duc@gmail.com"
* Nhập mật khẩu "saimatkhau999"
* Click nút Đăng Nhập
* Xác nhận hiển thị toast lỗi đăng nhập

## TC09 - Điều hướng đến trang đăng ký từ link Đăng ký ngay
Tags: login, navigation

* Mở trang CakeShop tại "/login"
* Click link "Đăng ký ngay"
* Xác nhận URL chứa "/register"

## TC10 - Điều hướng đến trang quên mật khẩu
Tags: login, navigation

* Mở trang CakeShop tại "/login"
* Click link "Quên mật khẩu?"
* Xác nhận URL chứa "/forgot-password"
