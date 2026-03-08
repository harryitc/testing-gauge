# Login Feature - SauceDemo

Kiểm thử tính năng đăng nhập trên trang https://www.saucedemo.com

## Đăng nhập thành công với tài khoản hợp lệ
Tags: smoke, login, positive

* Mở trang SauceDemo
* Nhập username "standard_user"
* Nhập password "secret_sauce"
* Click nút Login
* Xác nhận đang ở trang sản phẩm
* Xác nhận tiêu đề trang là "Products"

## Đăng nhập thất bại - sai mật khẩu
Tags: login, negative

* Mở trang SauceDemo
* Nhập username "standard_user"
* Nhập password "wrong_password"
* Click nút Login
* Xác nhận thông báo lỗi "Epic sadface: Username and password do not match any user in this service"

## Đăng nhập thất bại - tài khoản bị khóa
Tags: login, negative

* Mở trang SauceDemo
* Nhập username "locked_out_user"
* Nhập password "secret_sauce"
* Click nút Login
* Xác nhận thông báo lỗi "Epic sadface: Sorry, this user has been locked out."

## Đăng nhập thất bại - không nhập thông tin
Tags: login, negative

* Mở trang SauceDemo
* Click nút Login
* Xác nhận thông báo lỗi "Epic sadface: Username is required"

## Đăng nhập với nhiều loại tài khoản

   |username         |password     |expected_result |
   |-----------------|-------------|----------------|
   |standard_user    |secret_sauce |success         |
   |problem_user     |secret_sauce |success         |
   |performance_glitch_user |secret_sauce |success  |

* Mở trang SauceDemo
* Nhập username <username>
* Nhập password <password>
* Click nút Login
* Xác nhận kết quả đăng nhập là <expected_result>
