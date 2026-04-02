# Giỏ Hàng - CakeShop

Kiểm thử tính năng giỏ hàng trên trang https://cake-shop-user.netlify.app

## TC01 - Thêm sản phẩm vào giỏ hàng từ trang danh sách
Tags: smoke, cart, positive

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Thêm bánh đầu tiên vào giỏ từ danh sách
* Xác nhận hiển thị toast "Đã thêm vào giỏ hàng!"

## TC02 - Thêm sản phẩm vào giỏ hàng từ trang chi tiết
Tags: cart, positive

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Click vào bánh đầu tiên trong danh sách
* Xác nhận đang ở trang chi tiết bánh
* Thêm bánh vào giỏ từ trang chi tiết
* Xác nhận hiển thị toast "Đã thêm vào giỏ hàng!"

## TC03 - Tăng số lượng sản phẩm trong giỏ hàng
Tags: cart

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/cart"
* Chờ trang giỏ hàng tải xong
* Lưu tổng tiền giỏ hàng hiện tại
* Tăng số lượng sản phẩm đầu tiên trong giỏ
* Chờ "2" giây
* Xác nhận tổng tiền giỏ hàng đã thay đổi

## TC04 - Giảm số lượng sản phẩm trong giỏ hàng
Tags: cart

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/cart"
* Chờ trang giỏ hàng tải xong
* Tăng số lượng sản phẩm đầu tiên trong giỏ
* Chờ "2" giây
* Lưu tổng tiền giỏ hàng hiện tại
* Giảm số lượng sản phẩm đầu tiên trong giỏ
* Chờ "2" giây
* Xác nhận tổng tiền giỏ hàng đã thay đổi

## TC05 - Xóa sản phẩm khỏi giỏ hàng
Tags: cart

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/cart"
* Chờ trang giỏ hàng tải xong
* Xóa sản phẩm đầu tiên trong giỏ hàng
* Chờ "2" giây

## TC06 - Kiểm tra cập nhật tổng tiền khi thay đổi số lượng
Tags: cart

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/cart"
* Chờ trang giỏ hàng tải xong
* Lưu tổng tiền giỏ hàng hiện tại
* Tăng số lượng sản phẩm đầu tiên trong giỏ
* Chờ "2" giây
* Xác nhận tổng tiền giỏ hàng đã thay đổi

## TC07 - Giỏ hàng trống hiển thị thông báo phù hợp
Tags: cart, ui

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Xóa toàn bộ giỏ hàng qua API
* Mở trang CakeShop tại "/cart"
* Chờ "2" giây
* Xác nhận giỏ hàng hiển thị trống

## TC08 - Thêm nhiều sản phẩm khác nhau vào giỏ hàng
Tags: cart

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Thêm bánh đầu tiên vào giỏ từ danh sách
* Chờ "2" giây
* Thêm bánh thứ hai vào giỏ từ danh sách
* Chờ "2" giây
* Mở trang CakeShop tại "/cart"
* Chờ trang giỏ hàng tải xong
* Xác nhận giỏ hàng có ít nhất "2" sản phẩm

## TC09 - Kiểm tra badge số lượng giỏ hàng trên header
Tags: cart, ui

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Chuẩn bị giỏ hàng CakeShop có sản phẩm
* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Xác nhận badge giỏ hàng trên header có giá trị

## TC10 - Click Quay lại mua sắm từ giỏ hàng trống
Tags: cart, navigation

* Đăng nhập CakeShop với email "duc@gmail.com" và mật khẩu "123456"
* Xóa toàn bộ giỏ hàng qua API
* Mở trang CakeShop tại "/cart"
* Chờ "2" giây
* Xác nhận giỏ hàng hiển thị trống
* Click nút quay lại mua sắm
* Xác nhận URL chứa "/cakes"
