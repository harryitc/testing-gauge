# Shopping Flow - SauceDemo

Kiểm thử luồng mua hàng hoàn chỉnh trên SauceDemo

Tags: shopping

Đăng nhập trước mỗi scenario
* Đăng nhập SauceDemo với "standard_user" và "secret_sauce"

## Thêm sản phẩm vào giỏ hàng
Tags: smoke, cart

* Thêm sản phẩm "Sauce Labs Backpack" vào giỏ
* Xác nhận badge giỏ hàng hiển thị "1"
* Thêm sản phẩm "Sauce Labs Bike Light" vào giỏ
* Xác nhận badge giỏ hàng hiển thị "2"

## Xóa sản phẩm khỏi giỏ hàng
Tags: cart

* Thêm sản phẩm "Sauce Labs Backpack" vào giỏ
* Xác nhận badge giỏ hàng hiển thị "1"
* Xóa sản phẩm "Sauce Labs Backpack" khỏi giỏ
* Xác nhận giỏ hàng trống

## Checkout thành công
Tags: smoke, checkout

* Thêm sản phẩm "Sauce Labs Backpack" vào giỏ
* Mở giỏ hàng
* Click nút Checkout
* Nhập thông tin giao hàng với tên "Harry" họ "Nguyen" và zip "70000"
* Click nút Continue
* Xác nhận trang tổng kết đơn hàng hiển thị
* Click nút Finish
* Xác nhận đặt hàng thành công

## Sắp xếp sản phẩm theo giá tăng dần
Tags: sort

* Sắp xếp sản phẩm theo "Price (low to high)"
* Xác nhận sản phẩm đầu tiên có giá thấp nhất

___
Dọn dẹp sau mỗi scenario
* Đăng xuất khỏi SauceDemo
