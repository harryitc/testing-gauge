# Tìm Kiếm và Lọc Sản Phẩm - CakeShop

Kiểm thử tính năng tìm kiếm, lọc và sắp xếp sản phẩm trên trang https://cake-shop-user.netlify.app/cakes

## TC01 - Tìm kiếm sản phẩm theo tên có kết quả
Tags: smoke, search, positive

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Tìm kiếm bánh với từ khóa "Bánh"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận danh sách bánh có kết quả

## TC02 - Tìm kiếm sản phẩm không có kết quả
Tags: search, negative

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Tìm kiếm bánh với từ khóa "xyzkhongtontai999"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận danh sách bánh không có kết quả

## TC03 - Sắp xếp sản phẩm theo giá tăng dần
Tags: sort

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Chọn sắp xếp "Giá tăng dần"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận sản phẩm được sắp xếp theo giá tăng dần

## TC04 - Sắp xếp sản phẩm theo giá giảm dần
Tags: sort

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Chọn sắp xếp "Giá giảm dần"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận sản phẩm được sắp xếp theo giá giảm dần

## TC05 - Lọc sản phẩm theo danh mục dịp lễ
Tags: filter

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Lưu số lượng sản phẩm hiện tại
* Chọn danh mục "Bánh Sinh Nhật"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận danh sách bánh có kết quả

## TC06 - Lọc sản phẩm theo hương vị
Tags: filter

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Chọn hương vị "Socola"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận danh sách bánh có kết quả

## TC07 - Xóa tất cả bộ lọc
Tags: filter

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Chọn hương vị "Matcha"
* Chờ kết quả tìm kiếm cập nhật
* Click xóa tất cả bộ lọc
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận danh sách bánh có kết quả

## TC08 - Kết hợp tìm kiếm với bộ lọc danh mục
Tags: search, filter

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Tìm kiếm bánh với từ khóa "Bánh"
* Chờ kết quả tìm kiếm cập nhật
* Chọn danh mục "Bánh Sinh Nhật"
* Chờ kết quả tìm kiếm cập nhật
* Xác nhận danh sách bánh có kết quả

## TC09 - Kiểm tra hiển thị số lượng kết quả tìm kiếm
Tags: search, ui

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Xác nhận hiển thị số lượng sản phẩm tìm thấy

## TC10 - Xem chi tiết sản phẩm từ danh sách
Tags: smoke, navigation

* Mở trang CakeShop tại "/cakes"
* Chờ trang danh mục bánh tải xong
* Click vào bánh đầu tiên trong danh sách
* Xác nhận đang ở trang chi tiết bánh
