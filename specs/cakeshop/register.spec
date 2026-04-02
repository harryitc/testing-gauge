# Đăng Ký - CakeShop

Kiểm thử tính năng đăng ký tài khoản trên trang https://cake-shop-user.netlify.app

## TC01 - Đăng ký thành công với thông tin hợp lệ
Tags: smoke, register, positive

* Mở trang CakeShop tại "/register"
* Nhập email đăng ký ngẫu nhiên
* Nhập mật khẩu "Test@123456"
* Click nút Đăng Ký
* Xác nhận đăng ký thành công và chuyển đến trang cakes

## TC02 - Đăng ký thất bại khi không nhập email
Tags: register, negative

* Mở trang CakeShop tại "/register"
* Nhập mật khẩu "Test@123456"
* Click nút Đăng Ký
* Xác nhận hiển thị lỗi validation "Vui lòng nhập email"

## TC03 - Đăng ký thất bại khi không nhập mật khẩu
Tags: register, negative

* Mở trang CakeShop tại "/register"
* Nhập email "newuser@example.com"
* Click nút Đăng Ký
* Xác nhận hiển thị lỗi validation "Mật khẩu phải có ít nhất 6 ký tự"

## TC04 - Đăng ký thất bại khi không nhập email và mật khẩu
Tags: register, negative

* Mở trang CakeShop tại "/register"
* Click nút Đăng Ký
* Xác nhận hiển thị lỗi validation "Vui lòng nhập email"

## TC05 - Đăng ký thất bại với email sai định dạng
Tags: register, negative

* Mở trang CakeShop tại "/register"
* Nhập email "invalid-email-format"
* Nhập mật khẩu "Test@123456"
* Click nút Đăng Ký
* Xác nhận hiển thị lỗi validation "Email không đúng định dạng"

## TC06 - Đăng ký thất bại với mật khẩu dưới 6 ký tự
Tags: register, negative

* Mở trang CakeShop tại "/register"
* Nhập email "newuser@example.com"
* Nhập mật khẩu "123"
* Click nút Đăng Ký
* Xác nhận hiển thị lỗi validation "Mật khẩu phải có ít nhất 6 ký tự"

## TC07 - Đăng ký thất bại với email đã tồn tại
Tags: register, negative

* Mở trang CakeShop tại "/register"
* Nhập email "duc@gmail.com"
* Nhập mật khẩu "Test@123456"
* Click nút Đăng Ký
* Xác nhận hiển thị toast lỗi đăng ký

## TC08 - Kiểm tra tiêu đề trang đăng ký
Tags: register, ui

* Mở trang CakeShop tại "/register"
* Xác nhận trang có tiêu đề "Tạo Tài Khoản"

## TC09 - Điều hướng đến trang đăng nhập từ link Đăng nhập ngay
Tags: register, navigation

* Mở trang CakeShop tại "/register"
* Click link "Đăng nhập ngay"
* Xác nhận URL chứa "/login"

## TC10 - Đăng ký thành công và xác nhận redirect về trang cakes
Tags: register, positive

* Mở trang CakeShop tại "/register"
* Nhập email đăng ký ngẫu nhiên
* Nhập mật khẩu "Abc@123456"
* Click nút Đăng Ký
* Xác nhận đăng ký thành công và chuyển đến trang cakes
* Xác nhận URL chứa "/cakes"
