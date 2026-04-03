/* globals gauge */
"use strict";

const {
    goto,
    write,
    clear,
    click,
    focus,
    into,
    textBox,
    button,
    text,
    link,
    $,
    waitFor,
    evaluate,
    currentURL,
    press,
    above,
    near,
    scrollTo,
    reload,
} = require("taiko");
const assert = require("assert");

// ═══════════════════════════════════════════════
// CẤU HÌNH
// ═══════════════════════════════════════════════
const CAKESHOP_URL = "https://cake-shop-user.netlify.app";

// Tài khoản test — cập nhật nếu cần
const TEST_EMAIL = "duc@gmail.com";
const TEST_PASSWORD = "123456";

// Biến lưu trạng thái giữa các step
let savedTotalPrice = 0;
let savedProductCount = 0;

// ═══════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════

async function waitForCakeShopElement(selector, timeoutMs = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            const found = await $(selector).exists(0, 0);
            if (found) return true;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
    throw new Error(`Element "${selector}" không xuất hiện sau ${timeoutMs}ms`);
}

async function waitForTextVisible(txt, timeoutMs = 15000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            if (await text(txt).exists(0, 0)) return true;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
    throw new Error(`Text "${txt}" không xuất hiện sau ${timeoutMs}ms`);
}

async function waitForNavigation(timeoutMs = 15000) {
    await waitFor(2000);
}

// Lấy giá trị text nội dung của element qua CSS selector
async function getTextContent(selector) {
    return await evaluate(
        (sel) => {
            const el = document.querySelector(sel);
            return el ? el.textContent.trim() : "";
        },
        { args: [selector] }
    );
}

// Kiểm tra toast message (Ant Design message component)
async function waitForToast(partialText, timeoutMs = 10000) {
    return await evaluate(
        (txt) => {
            const messages = document.querySelectorAll(
                "div.ant-message-notice-content, .ant-message-custom-content"
            );

            // TODO: bug?
            console.log(JSON.stringify(messages));

            for (const msg of messages) {
                if (msg.textContent.includes(txt)) return true;
            }
            return false;
        },
        { args: [partialText] }
    );

}

// Kiểm tra lỗi validation (Ant Design Form.Item)
async function findValidationError(errorMessage) {
    return await evaluate(
        (msg) => {
            const errors = document.querySelectorAll(
                "div.ant-form-item-explain-error, .ant-form-item-explain-error"
            );

            // TODO: bug?
            console.log(JSON.stringify(errors));

            for (const el of errors) {
                if (el.textContent.includes(msg)) return true;
            }
            return false;
        },
        { args: [errorMessage] }
    );
}

// ═══════════════════════════════════════════════
// NAVIGATION STEPS
// ═══════════════════════════════════════════════

step("Mở trang CakeShop tại <path>", async (path) => {
    const url = `${CAKESHOP_URL}${path}`;
    await goto(url, {
        waitForNavigation: true,
        navigationTimeout: 30000,
    });
    await waitFor(2000);
});

step("Chờ trang danh mục bánh tải xong", async () => {
    // Chờ tiêu đề "Danh Mục Bánh" hoặc cake card xuất hiện
    const start = Date.now();
    while (Date.now() - start < 20000) {
        try {
            const hasTitle = await text("Danh Mục Bánh").exists(0, 0);
            const hasCards = await $(".ant-card").exists(0, 0);
            if (hasTitle || hasCards) return;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
    // Nếu hết timeout, vẫn tiếp tục (có thể trang empty)
    gauge.message("Trang danh mục có thể chưa tải xong hoàn toàn");
});

step("Chờ trang giỏ hàng tải xong", async () => {
    await waitFor(3000);
    // Chờ cho table hoặc empty state xuất hiện
    const start = Date.now();
    while (Date.now() - start < 15000) {
        try {
            const hasTable = await $(".ant-table").exists(0, 0);
            const hasEmpty = await $(".ant-empty").exists(0, 0);
            if (hasTable || hasEmpty) return;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
});

step("Chờ trang checkout tải xong", async () => {
    await waitFor(3000);
    // Chờ form checkout hoặc warning xuất hiện
    const start = Date.now();
    while (Date.now() - start < 15000) {
        try {
            const hasForm = await text("Địa chỉ giao hàng").exists(0, 0);
            const hasWarning = await text("Giỏ hàng của bạn đang trống").exists(0, 0);
            if (hasForm || hasWarning) return;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
});

step("Chờ <seconds> giây", async (seconds) => {
    await waitFor(parseInt(seconds) * 1000);
});

step("Xác nhận URL chứa <path>", async (path) => {
    await waitFor(2000);
    const url = await currentURL();
    assert.ok(
        url.includes(path),
        `Mong đợi URL chứa "${path}", nhưng thực tế là: ${url}`
    );
});

// ═══════════════════════════════════════════════
// AUTH STEPS — ĐĂNG NHẬP
// ═══════════════════════════════════════════════

step("Nhập email <email>", async (email) => {
    const emailInput = $("input[placeholder='user@example.com']");
    await focus(emailInput);
    await clear(emailInput);
    await write(email, into(emailInput));
});

step("Nhập mật khẩu <password>", async (password) => {
    // Ant Design Input.Password renders input inside .ant-input-password
    const passInput = $("input[type='password']");
    const exists = await passInput.exists(0, 0);
    if (exists) {
        await focus(passInput);
        await clear(passInput);
        await write(password, into(passInput));
    } else {
        // Fallback: tìm input bên trong wrapper
        const wrapper = $(".ant-input-password input");
        await focus(wrapper);
        await clear(wrapper);
        await write(password, into(wrapper));
    }
});

step("Click nút Đăng Nhập", async () => {
    await click(button("Đăng Nhập"));
    await waitFor(2000);
});

step("Xác nhận đăng nhập thành công và chuyển đến trang cakes", async () => {
    // Chờ redirect sang /cakes hoặc trang chính
    const start = Date.now();
    while (Date.now() - start < 15000) {
        const url = await currentURL();
        if (url.includes("/cakes") || (!url.includes("/login"))) {
            // Kiểm tra thêm: đã rời khỏi trang login
            if (!url.includes("/login")) {
                return;
            }
        }
        await waitFor(1000);
    }
    const finalUrl = await currentURL();
    assert.ok(
        !finalUrl.includes("/login"),
        `Vẫn ở trang login. URL: ${finalUrl}`
    );
});

step("Xác nhận hiển thị toast lỗi đăng nhập", async () => {
    // Toast lỗi từ server — Ant Design message.error
    const start = Date.now();
    while (Date.now() - start < 10000) {
        try {
            const hasError = await evaluate(() => {
                const msgs = document.querySelectorAll(
                    ".ant-message-error, .ant-message-custom-content"
                );
                return msgs.length > 0;
            });
            if (hasError) return;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
    // Nếu không thấy toast, kiểm tra vẫn ở trang login (nghĩa là login thất bại)
    const url = await currentURL();
    assert.ok(
        url.includes("/login"),
        `Mong đợi hiển thị lỗi hoặc vẫn ở trang login, nhưng URL là: ${url}`
    );
});

// ═══════════════════════════════════════════════
// AUTH STEPS — ĐĂNG KÝ
// ═══════════════════════════════════════════════

step("Nhập email đăng ký ngẫu nhiên", async () => {
    const randomEmail = `testuser_${Date.now()}@example.com`;
    gauge.message(`Email đăng ký: ${randomEmail}`);
    const emailInput = $("input[placeholder='user@example.com']");
    await focus(emailInput);
    await clear(emailInput);
    await write(randomEmail, into(emailInput));
});

step("Click nút Đăng Ký", async () => {
    await click(button("Đăng Ký"));
    await waitFor(2000);
});

step("Xác nhận đăng ký thành công và chuyển đến trang cakes", async () => {
    const start = Date.now();
    while (Date.now() - start < 15000) {
        const url = await currentURL();
        if (url.includes("/cakes") || !url.includes("/register")) {
            if (!url.includes("/register")) return;
        }
        await waitFor(1000);
    }
    const finalUrl = await currentURL();
    assert.ok(
        !finalUrl.includes("/register"),
        `Vẫn ở trang đăng ký. URL: ${finalUrl}`
    );
});

step("Xác nhận hiển thị toast lỗi đăng ký", async () => {
    const start = Date.now();
    while (Date.now() - start < 10000) {
        try {
            const hasError = await evaluate(() => {
                const msgs = document.querySelectorAll(
                    ".ant-message-error, .ant-message-custom-content"
                );
                return msgs.length > 0;
            });
            if (hasError) return;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
    const url = await currentURL();
    assert.ok(
        url.includes("/register"),
        `Mong đợi lỗi hoặc vẫn ở trang đăng ký, nhưng URL là: ${url}`
    );
});

// ═══════════════════════════════════════════════
// VALIDATION & UI VERIFICATION STEPS
// ═══════════════════════════════════════════════

step("Xác nhận hiển thị lỗi validation <message>", async (message) => {
    await waitFor(1000);
    const found = await findValidationError(message);
    assert.ok(found, `Không tìm thấy lỗi validation: "${message}"`);
});

step("Click link <linkText>", async (linkText) => {
    await click(link(linkText));
    await waitFor(2000);
});

step("Xác nhận trang có tiêu đề <title>", async (title) => {
    await waitFor(1500);
    const found = await text(title).exists(0, 0);
    assert.ok(found, `Không tìm thấy tiêu đề: "${title}"`);
});

step("Xác nhận hiển thị toast <message>", async (message) => {
    await waitForToast(message);
});

// ═══════════════════════════════════════════════
// SEARCH & FILTER STEPS
// ═══════════════════════════════════════════════

step("Tìm kiếm bánh với từ khóa <keyword>", async (keyword) => {
    const searchInput = $("input[placeholder='Tìm theo tên bánh...']");
    await focus(searchInput);
    await clear(searchInput);
    await write(keyword, into(searchInput));
});

step("Chờ kết quả tìm kiếm cập nhật", async () => {
    // Debounce 500ms + API call time
    await waitFor(3000);
});

step("Chọn sắp xếp <option>", async (option) => {
    // Ant Design Select - click trigger rồi chọn option
    const selectTrigger = $(".sort-select");
    await click(selectTrigger);
    await waitFor(500);
    // Click option trong dropdown
    await evaluate(
        (optText) => {
            const options = document.querySelectorAll(
                ".ant-select-dropdown .ant-select-item-option"
            );
            for (const opt of options) {
                if (opt.textContent.includes(optText)) {
                    opt.click();
                    return true;
                }
            }
            return false;
        },
        { args: [option] }
    );
    await waitFor(500);
});

step("Chọn danh mục <category>", async (category) => {
    // Click checkbox theo tên danh mục
    const categoryLabel = text(category);
    if (await categoryLabel.exists(0, 0)) {
        await click(categoryLabel);
    } else {
        // Fallback: tìm trong sidebar checkboxes
        await evaluate(
            (catName) => {
                const labels = document.querySelectorAll(
                    ".ant-checkbox-wrapper span:last-child"
                );
                for (const label of labels) {
                    if (label.textContent.trim() === catName) {
                        label.closest(".ant-checkbox-wrapper").click();
                        return true;
                    }
                }
                return false;
            },
            { args: [category] }
        );
    }
    await waitFor(500);
});

step("Chọn hương vị <flavor>", async (flavor) => {
    // Flavor buttons are custom styled buttons, not checkboxes
    await evaluate(
        (flavorName) => {
            const buttons = document.querySelectorAll(
                "button.rounded-xl"
            );
            for (const btn of buttons) {
                if (btn.textContent.trim() === flavorName) {
                    btn.click();
                    return true;
                }
            }
            return false;
        },
        { args: [flavor] }
    );
    await waitFor(500);
});

step("Click xóa tất cả bộ lọc", async () => {
    const clearBtn = text("Xóa tất cả");
    if (await clearBtn.exists(0, 0)) {
        await click(clearBtn);
    } else {
        await evaluate(() => {
            const btns = document.querySelectorAll("button");
            for (const btn of btns) {
                if (btn.textContent.includes("Xóa tất cả")) {
                    btn.click();
                    return;
                }
            }
        });
    }
    await waitFor(500);
});

step("Xác nhận danh sách bánh có kết quả", async () => {
    await waitFor(1000);
    const hasCards = await $(".ant-card").exists(0, 0);
    assert.ok(hasCards, "Không tìm thấy sản phẩm nào trong danh sách");
});

step("Xác nhận danh sách bánh không có kết quả", async () => {
    await waitFor(1000);
    const hasEmpty = await $(".ant-empty").exists(0, 0);
    const hasNoCards = !(await $(".ant-card").exists(0, 0));
    assert.ok(
        hasEmpty || hasNoCards,
        "Danh sách vẫn hiển thị sản phẩm, mong đợi không có kết quả"
    );
});

step("Lưu số lượng sản phẩm hiện tại", async () => {
    savedProductCount = await evaluate(() => {
        return document.querySelectorAll(".ant-card").length;
    });
    gauge.message(`Số sản phẩm hiện tại: ${savedProductCount}`);
});

step("Xác nhận hiển thị số lượng sản phẩm tìm thấy", async () => {
    // Tìm text "Tìm thấy X chiếc bánh"
    const found = await evaluate(() => {
        const el = document.body.innerText;
        return el.includes("chiếc bánh") || el.includes("Tìm thấy");
    });
    assert.ok(found, "Không tìm thấy thông tin số lượng sản phẩm");
});

step("Xác nhận sản phẩm được sắp xếp theo giá tăng dần", async () => {
    const prices = await evaluate(() => {
        const priceElements = document.querySelectorAll(
            ".ant-card .text-indigo-600"
        );
        return Array.from(priceElements)
            .map((el) => {
                const text = el.textContent.replace(/[^\d]/g, "");
                return parseInt(text) || 0;
            })
            .filter((p) => p > 0);
    });
    if (prices.length >= 2) {
        for (let i = 0; i < prices.length - 1; i++) {
            assert.ok(
                prices[i] <= prices[i + 1],
                `Giá không tăng dần: ${prices[i]} > ${prices[i + 1]}`
            );
        }
    }
    gauge.message(`Prices: ${JSON.stringify(prices)}`);
});

step("Xác nhận sản phẩm được sắp xếp theo giá giảm dần", async () => {
    const prices = await evaluate(() => {
        const priceElements = document.querySelectorAll(
            ".ant-card .text-indigo-600"
        );
        return Array.from(priceElements)
            .map((el) => {
                const text = el.textContent.replace(/[^\d]/g, "");
                return parseInt(text) || 0;
            })
            .filter((p) => p > 0);
    });
    if (prices.length >= 2) {
        for (let i = 0; i < prices.length - 1; i++) {
            assert.ok(
                prices[i] >= prices[i + 1],
                `Giá không giảm dần: ${prices[i]} < ${prices[i + 1]}`
            );
        }
    }
    gauge.message(`Prices: ${JSON.stringify(prices)}`);
});

step("Click vào bánh đầu tiên trong danh sách", async () => {
    // Click vào card đầu tiên
    await evaluate(() => {
        const firstCard = document.querySelector(".ant-card");
        if (firstCard) {
            const linkEl = firstCard.closest("a");
            if (linkEl) {
                linkEl.click();
            } else {
                firstCard.click();
            }
        }
    });
    await waitFor(3000);
});

step("Xác nhận đang ở trang chi tiết bánh", async () => {
    const url = await currentURL();
    assert.ok(
        url.includes("/cakes/"),
        `Mong đợi URL chứa /cakes/<id>, nhưng thực tế là: ${url}`
    );
});

// ═══════════════════════════════════════════════
// CART STEPS
// ═══════════════════════════════════════════════

step("Thêm bánh đầu tiên vào giỏ từ danh sách", async () => {
    // Click nút add-to-cart (icon giỏ hàng) trên card đầu tiên
    await evaluate(() => {
        const addBtns = document.querySelectorAll(
            ".ant-card .ant-btn-primary.ant-btn-circle"
        );
        if (addBtns.length > 0) {
            addBtns[0].click();
            return true;
        }
        // Fallback: tìm nút có icon ShoppingCartOutlined
        const cartBtns = document.querySelectorAll(
            ".ant-card button"
        );
        for (const btn of cartBtns) {
            if (btn.querySelector(".anticon-shopping-cart")) {
                btn.click();
                return true;
            }
        }
        return false;
    });
    await waitFor(2000);
});

step("Thêm bánh thứ hai vào giỏ từ danh sách", async () => {
    await evaluate(() => {
        const addBtns = document.querySelectorAll(
            ".ant-card .ant-btn-primary.ant-btn-circle"
        );
        if (addBtns.length > 1) {
            addBtns[1].click();
            return true;
        }
        return false;
    });
    await waitFor(2000);
});

step("Thêm bánh vào giỏ từ trang chi tiết", async () => {
    // Click nút "Thêm vào giỏ" trên trang detail
    const addBtn = button("Thêm vào giỏ");
    if (await addBtn.exists(0, 0)) {
        await click(addBtn);
    } else {
        // Fallback
        await evaluate(() => {
            const btns = document.querySelectorAll("button");
            for (const btn of btns) {
                if (btn.textContent.includes("Thêm vào giỏ")) {
                    btn.click();
                    return true;
                }
            }
            return false;
        });
    }
    await waitFor(2000);
});

step("Tăng số lượng sản phẩm đầu tiên trong giỏ", async () => {
    // Click nút "+" trong QuantityControl
    await evaluate(() => {
        const plusBtns = document.querySelectorAll(
            ".ant-table-row .anticon-plus"
        );
        if (plusBtns.length > 0) {
            plusBtns[0].closest("button").click();
            return true;
        }
        return false;
    });
    await waitFor(1000);
});

step("Giảm số lượng sản phẩm đầu tiên trong giỏ", async () => {
    // Click nút "-" trong QuantityControl
    await evaluate(() => {
        const minusBtns = document.querySelectorAll(
            ".ant-table-row .anticon-minus"
        );
        if (minusBtns.length > 0) {
            const btn = minusBtns[0].closest("button");
            if (!btn.disabled) {
                btn.click();
                return true;
            }
        }
        return false;
    });
    await waitFor(1000);
});

step("Xóa sản phẩm đầu tiên trong giỏ hàng", async () => {
    // Click nút delete (icon thùng rác)
    await evaluate(() => {
        const deleteBtns = document.querySelectorAll(
            ".ant-table-row .anticon-delete"
        );
        if (deleteBtns.length > 0) {
            deleteBtns[0].closest("button").click();
            return true;
        }
        return false;
    });
    await waitFor(1000);
    // Confirm Popconfirm
    const confirmBtn = button("Xóa");
    if (await confirmBtn.exists(0, 0)) {
        await click(confirmBtn);
    } else {
        await evaluate(() => {
            const btns = document.querySelectorAll(
                ".ant-popconfirm .ant-btn-primary, .ant-popover .ant-btn-primary"
            );
            if (btns.length > 0) btns[0].click();
        });
    }
    await waitFor(2000);
});

step("Xóa toàn bộ giỏ hàng qua API", async () => {
    // Xóa cart bằng cách clear localStorage cart và gọi API
    await evaluate(() => {
        localStorage.removeItem("cake_shop_cart");
    });
    // Nếu đã đăng nhập, cần xóa qua API
    await evaluate(async () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const res = await fetch("/api/cart", {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (e) { /* ignore */ }
        }
    });
    await waitFor(1000);
});

step("Lưu tổng tiền giỏ hàng hiện tại", async () => {
    savedTotalPrice = await evaluate(() => {
        // Tìm text có format tiền VND trong phần tổng cộng
        const totalElements = document.querySelectorAll(
            ".text-indigo-600.font-black, .text-3xl.font-black"
        );
        for (const el of totalElements) {
            const text = el.textContent.replace(/[^\d]/g, "");
            const val = parseInt(text);
            if (val > 0) return val;
        }
        return 0;
    });
    gauge.message(`Tổng tiền hiện tại: ${savedTotalPrice}`);
});

step("Xác nhận tổng tiền giỏ hàng đã thay đổi", async () => {
    const currentTotal = await evaluate(() => {
        const totalElements = document.querySelectorAll(
            ".text-indigo-600.font-black, .text-3xl.font-black"
        );
        for (const el of totalElements) {
            const text = el.textContent.replace(/[^\d]/g, "");
            const val = parseInt(text);
            if (val > 0) return val;
        }
        return 0;
    });
    gauge.message(`Tổng tiền trước: ${savedTotalPrice}, sau: ${currentTotal}`);
    assert.notStrictEqual(
        currentTotal,
        savedTotalPrice,
        `Tổng tiền không thay đổi: trước = ${savedTotalPrice}, sau = ${currentTotal}`
    );
});

step("Xác nhận giỏ hàng hiển thị trống", async () => {
    await waitFor(1000);
    const isEmpty = await evaluate(() => {
        const body = document.body.innerText;
        return (
            body.includes("Giỏ hàng của bạn đang trống") ||
            body.includes("đang trống") ||
            document.querySelector(".ant-empty") !== null
        );
    });
    assert.ok(isEmpty, "Giỏ hàng không hiển thị trạng thái trống");
});

step("Xác nhận giỏ hàng có ít nhất <count> sản phẩm", async (count) => {
    const itemCount = await evaluate(() => {
        return document.querySelectorAll(".ant-table-row").length;
    });
    assert.ok(
        itemCount >= parseInt(count),
        `Mong đợi ít nhất ${count} sản phẩm, nhưng chỉ có ${itemCount}`
    );
});

step("Xác nhận badge giỏ hàng trên header có giá trị", async () => {
    const badgeValue = await evaluate(() => {
        const badge = document.querySelector(
            ".ant-badge .ant-badge-count, .ant-scroll-number-only-unit"
        );
        if (badge) {
            const num = parseInt(badge.textContent);
            return isNaN(num) ? 0 : num;
        }
        return 0;
    });
    assert.ok(
        badgeValue > 0,
        `Badge giỏ hàng không hiển thị hoặc bằng 0. Giá trị: ${badgeValue}`
    );
});

step("Click nút quay lại mua sắm", async () => {
    const btn = button("Quay lại mua sắm");
    if (await btn.exists(0, 0)) {
        await click(btn);
    } else {
        await evaluate(() => {
            const btns = document.querySelectorAll("button");
            for (const b of btns) {
                if (b.textContent.includes("Quay lại mua sắm")) {
                    b.click();
                    return;
                }
            }
        });
    }
    await waitFor(2000);
});

step("Click nút tiến hành đặt hàng", async () => {
    const btn = button("Tiến hành Đặt hàng");
    if (await btn.exists(0, 0)) {
        await click(btn);
    } else {
        await evaluate(() => {
            const btns = document.querySelectorAll("button");
            for (const b of btns) {
                if (b.textContent.includes("Tiến hành Đặt hàng")) {
                    b.click();
                    return;
                }
            }
        });
    }
    await waitFor(2000);
});

// ═══════════════════════════════════════════════
// CHECKOUT STEPS
// ═══════════════════════════════════════════════

step("Nhập địa chỉ giao hàng <address>", async (address) => {
    const addrInput = $("textarea[placeholder='Nhập địa chỉ nhận bánh chi tiết...']");
    if (await addrInput.exists(0, 0)) {
        await focus(addrInput);
        await clear(addrInput);
        await write(address, into(addrInput));
    } else {
        // Fallback: tìm textarea trong form
        const textarea = $("textarea");
        await focus(textarea);
        await clear(textarea);
        await write(address, into(textarea));
    }
});

step("Xóa địa chỉ giao hàng hiện tại", async () => {
    const addrInput = $("textarea[placeholder='Nhập địa chỉ nhận bánh chi tiết...']");
    if (await addrInput.exists(0, 0)) {
        await focus(addrInput);
        await clear(addrInput);
    } else {
        const textarea = $("textarea");
        await focus(textarea);
        await clear(textarea);
    }
    // Đảm bảo field trống
    await evaluate(() => {
        const ta = document.querySelector("textarea");
        if (ta) {
            // Trigger React onChange
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLTextAreaElement.prototype, "value"
            ).set;
            nativeInputValueSetter.call(ta, "");
            ta.dispatchEvent(new Event("input", { bubbles: true }));
            ta.dispatchEvent(new Event("change", { bubbles: true }));
        }
    });
});

step("Nhập mã giảm giá <code>", async (code) => {
    const couponInput = $("input[placeholder='Mã giảm giá (nếu có)']");
    await focus(couponInput);
    await clear(couponInput);
    await write(code, into(couponInput));
});

step("Click áp dụng mã giảm giá", async () => {
    await evaluate(() => {
        const btns = document.querySelectorAll("button");
        for (const btn of btns) {
            if (btn.textContent.includes("Áp dụng") && !btn.textContent.includes("Gỡ")) {
                btn.click();
                return;
            }
        }
    });
    await waitFor(2000);
});

step("Click gỡ bỏ mã giảm giá", async () => {
    await evaluate(() => {
        const btns = document.querySelectorAll("button");
        for (const btn of btns) {
            if (btn.textContent.includes("Gỡ bỏ")) {
                btn.click();
                return;
            }
        }
    });
    await waitFor(1000);
});

step("Click đặt hàng ngay", async () => {
    const orderBtn = button("Đặt hàng ngay");
    if (await orderBtn.exists(0, 0)) {
        await click(orderBtn);
    } else {
        await evaluate(() => {
            const btns = document.querySelectorAll("button");
            for (const btn of btns) {
                if (btn.textContent.includes("Đặt hàng ngay")) {
                    btn.click();
                    return;
                }
            }
        });
    }
    await waitFor(3000);
});

step("Xác nhận đặt hàng thành công chuyển đến trang đơn hàng", async () => {
    const start = Date.now();
    while (Date.now() - start < 15000) {
        const url = await currentURL();
        if (url.includes("/orders")) return;
        // Kiểm tra toast thành công
        try {
            const hasSuccess = await evaluate(() => {
                const msgs = document.querySelectorAll(
                    ".ant-message-success, .ant-message-custom-content"
                );
                return msgs.length > 0;
            });
            if (hasSuccess) {
                await waitFor(2000);
                const url2 = await currentURL();
                if (url2.includes("/orders")) return;
            }
        } catch (e) { /* retry */ }
        await waitFor(1000);
    }
    const finalUrl = await currentURL();
    assert.ok(
        finalUrl.includes("/orders"),
        `Mong đợi chuyển đến /orders, nhưng URL là: ${finalUrl}`
    );
});

step("Click quay lại giỏ hàng", async () => {
    const backBtn = text("Quay lại giỏ hàng");
    if (await backBtn.exists(0, 0)) {
        await click(backBtn);
    } else {
        await evaluate(() => {
            const btns = document.querySelectorAll("button");
            for (const btn of btns) {
                if (btn.textContent.includes("Quay lại giỏ hàng")) {
                    btn.click();
                    return;
                }
            }
        });
    }
    await waitFor(2000);
});

step("Xác nhận trang checkout hiển thị danh sách sản phẩm", async () => {
    // Kiểm tra có hiển thị ít nhất 1 sản phẩm trong phần tóm tắt
    const hasItems = await evaluate(() => {
        const imgs = document.querySelectorAll(
            "img.rounded.object-cover"
        );
        return imgs.length > 0;
    });
    assert.ok(hasItems, "Trang checkout không hiển thị sản phẩm nào");
});

step("Xác nhận hiển thị tổng tiền thanh toán", async () => {
    const hasTotal = await evaluate(() => {
        const body = document.body.innerText;
        return body.includes("Tổng thanh toán") || body.includes("Tạm tính");
    });
    assert.ok(hasTotal, "Không tìm thấy thông tin tổng tiền thanh toán");
});

step("Xác nhận trang checkout hiển thị giỏ hàng trống", async () => {
    const isEmpty = await evaluate(() => {
        const body = document.body.innerText;
        return (
            body.includes("Giỏ hàng của bạn đang trống") ||
            body.includes("đang trống") ||
            document.querySelector(".ant-result") !== null
        );
    });
    assert.ok(isEmpty, "Trang checkout không hiển thị trạng thái giỏ trống");
});

step("Xác nhận mã giảm giá được áp dụng hoặc báo lỗi", async () => {
    // Mã giảm giá có thể hợp lệ hoặc không — test chỉ kiểm tra có phản hồi
    const hasResponse = await evaluate(() => {
        const body = document.body.innerText;
        return (
            body.includes("Giảm giá") ||
            body.includes("Gỡ bỏ") ||
            document.querySelectorAll(".ant-message-notice-content").length > 0
        );
    });
    assert.ok(hasResponse, "Không nhận được phản hồi khi áp dụng mã giảm giá");
});

step("Xác nhận hiển thị toast lỗi mã giảm giá", async () => {
    const start = Date.now();
    while (Date.now() - start < 8000) {
        try {
            const hasError = await evaluate(() => {
                const msgs = document.querySelectorAll(
                    ".ant-message-error, .ant-message-custom-content"
                );
                return msgs.length > 0;
            });
            if (hasError) return;
        } catch (e) { /* retry */ }
        await waitFor(500);
    }
    // Nếu không thấy toast error, kiểm tra coupon không được áp dụng (nút "Áp dụng" vẫn hiện)
    const stillHasApply = await evaluate(() => {
        const btns = document.querySelectorAll("button");
        for (const b of btns) {
            if (b.textContent.includes("Áp dụng")) return true;
        }
        return false;
    });
    assert.ok(
        stillHasApply,
        "Mong đợi toast lỗi hoặc mã giảm giá không được áp dụng"
    );
});

step("Xác nhận mã giảm giá đã được gỡ bỏ", async () => {
    // Sau khi gỡ bỏ, nút "Áp dụng" phải xuất hiện lại
    const hasApplyBtn = await evaluate(() => {
        const btns = document.querySelectorAll("button");
        for (const b of btns) {
            if (
                b.textContent.includes("Áp dụng") &&
                !b.textContent.includes("Gỡ")
            ) {
                return true;
            }
        }
        return false;
    });
    assert.ok(hasApplyBtn, "Nút 'Áp dụng' không xuất hiện — mã giảm giá chưa được gỡ");
});

// ═══════════════════════════════════════════════
// ĐĂNG XUẤT
// ═══════════════════════════════════════════════

step("Đăng xuất CakeShop", async () => {
    try {
        // Click avatar dropdown
        const avatar = $(".ant-avatar");
        if (await avatar.exists(0, 0)) {
            await click(avatar);
            await waitFor(1000);
            // Click "Đăng xuất"
            const logoutItem = text("Đăng xuất");
            if (await logoutItem.exists(0, 0)) {
                await click(logoutItem);
                await waitFor(2000);
            }
        }
    } catch (e) {
        gauge.message(`Logout skipped: ${e.message}`);
    }
    // Xóa token khỏi localStorage
    await evaluate(() => {
        localStorage.removeItem("access_token");
    });
});
