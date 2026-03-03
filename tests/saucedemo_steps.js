/* globals gauge */
"use strict";
const path = require("path");
const {
    openBrowser,
    closeBrowser,
    goto,
    write,
    clear,
    click,
    focus,
    into,
    textBox,
    button,
    text,
    $,
    screenshot,
    waitFor,
    dropDown,
    evaluate,
    currentURL,
    reload,
    deleteCookies,
    press,
} = require("taiko");
const assert = require("assert");

const BASE_URL = "https://www.saucedemo.com";
const headless =
    process.env.headless_chrome &&
    process.env.headless_chrome.toLowerCase() === "true";

// ═══════════════════════════════════════════════
// HOOKS — Quản lý vòng đời browser
// ═══════════════════════════════════════════════

beforeSuite(async () => {
    // Tạo Chrome profile tạm VÀ ghi sẵn Preferences để tắt triệt để Password Manager
    const fs = require("fs");
    const path = require("path");
    const tmpProfileDir = `/tmp/taiko-chrome-profile-${Date.now()}`;
    const defaultDir = path.join(tmpProfileDir, "Default");
    fs.mkdirSync(defaultDir, { recursive: true });

    // Ghi file Preferences tắt mọi tính năng lưu/cảnh báo mật khẩu
    const prefs = {
        credentials_enable_service: false,
        credentials_enable_autosignin: false,
        profile: {
            password_manager_enabled: false,
            password_manager_leak_detection: false,
        },
        safebrowsing: {
            enabled: false,
            enhanced: false,
        },
        password_manager: {
            leak_detection: false,
        },
    };
    fs.writeFileSync(
        path.join(defaultDir, "Preferences"),
        JSON.stringify(prefs)
    );

    await openBrowser({
        headless: headless,
        args: [
            "--no-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--disable-setuid-sandbox",
            `--user-data-dir=${tmpProfileDir}`,
            "--disable-save-password-bubble",
            "--password-store=basic",
            "--use-mock-keychain",
            "--disable-features=AutofillServerCommunication,PasswordLeakDetection,PasswordCheck,PasswordManagerOnboarding,SafeBrowsingEnhancedProtection",
            "--safebrowsing-disable-auto-update",
            "--disable-client-side-phishing-detection",
            "--no-default-browser-check",
            "--disable-popup-blocking",
        ],
    });
});

afterSuite(async () => {
    try {
        await closeBrowser();
    } catch (e) {
        // Browser có thể đã đóng
    }
});

// Screenshot tùy chỉnh khi test fail
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(
        process.env["gauge_screenshots_dir"],
        `screenshot-${process.hrtime.bigint()}.png`
    );
    await screenshot({ path: screenshotFilePath });
    return path.basename(screenshotFilePath);
};

// Helper: chờ element xuất hiện (tối đa timeout giây)
async function waitForElement(selector, timeoutMs = 50000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        try {
            const found = await $(selector).exists();
            if (found) return true;
        } catch (e) {
            // Retry
        }
        await waitFor(500);
    }
    throw new Error(`Element "${selector}" không xuất hiện sau ${timeoutMs}ms`);
}

// ═══════════════════════════════════════════════
// LOGIN STEPS
// ═══════════════════════════════════════════════

step("Mở trang SauceDemo", async () => {
    // Navigate with cache busting timestamp to ensure server hit
    const cacheBuster = `_=${Date.now()}`;
    await goto(`${BASE_URL}?${cacheBuster}`, { waitForNavigation: true });
    try { await deleteCookies(); } catch (e) { }
    // await waitForElement("#login-button");
});

step("Nhập username <username>", async (username) => {
    const usernameField = textBox({ id: "user-name" });
    await focus(usernameField);
    await clear(usernameField);
    await write(username, into(usernameField));
});

step("Nhập password <password>", async (password) => {
    const passwordField = textBox({ id: "password" });
    await focus(passwordField);
    await clear(passwordField);
    await write(password, into(passwordField));
});

step("Click nút Login", async () => {
    await click($("#login-button"));
    // Chờ phản hồi từ server
    await waitFor(1500);
});

step("Xác nhận đang ở trang sản phẩm", async () => {
    await waitForElement(".inventory_list");
    const url = await currentURL();
    assert.ok(
        url.includes("/inventory"),
        `Mong đợi URL chứa /inventory, nhưng thực tế là: ${url}`
    );
});

step("Xác nhận tiêu đề trang là <title>", async (title) => {
    assert.ok(
        await text(title, $(".title")).exists(),
        `Không tìm thấy tiêu đề: ${title}`
    );
});

step("Xác nhận thông báo lỗi <message>", async (message) => {
    await waitForElement("[data-test='error']");
    const errorText = await evaluate(() => {
        const el = document.querySelector("[data-test='error']");
        // Lấy text trực tiếp, loại bỏ text của button con
        const clone = el.cloneNode(true);
        const buttons = clone.querySelectorAll("button");
        buttons.forEach((b) => b.remove());
        return clone.textContent.trim();
    });
    assert.strictEqual(
        errorText,
        message,
        `Mong đợi lỗi: "${message}", nhưng thực tế: "${errorText}"`
    );
});

step(
    "Xác nhận kết quả đăng nhập là <expected_result>",
    async (expectedResult) => {
        if (expectedResult === "success") {
            await waitForElement(".inventory_list");
            const url = await currentURL();
            assert.ok(
                url.includes("/inventory"),
                `Đăng nhập thất bại: URL = ${url}`
            );
        } else {
            await waitForElement("[data-test='error']");
            assert.ok(true, "Hiển thị thông báo lỗi như mong đợi");
        }
    }
);

// ═══════════════════════════════════════════════
// SHOPPING STEPS
// ═══════════════════════════════════════════════

step("Thêm sản phẩm <productName> vào giỏ", async (productName) => {
    // SauceDemo dùng data-test attribute dạng: add-to-cart-sauce-labs-backpack
    const buttonId = `add-to-cart-${productName
        .toLowerCase()
        .replace(/ /g, "-")}`;
    await click($(`[data-test='${buttonId}']`));
});

step("Xóa sản phẩm <productName> khỏi giỏ", async (productName) => {
    const buttonId = `remove-${productName.toLowerCase().replace(/ /g, "-")}`;
    await click($(`[data-test='${buttonId}']`));
});

step("Xác nhận badge giỏ hàng hiển thị <count>", async (count) => {
    await waitForElement(".shopping_cart_badge");
    const badgeText = await evaluate(() =>
        document.querySelector(".shopping_cart_badge").textContent
    );
    assert.strictEqual(
        badgeText,
        count,
        `Mong đợi badge = ${count}, thực tế = ${badgeText}`
    );
});

step("Xác nhận giỏ hàng trống", async () => {
    await waitFor(500);
    const badgeExists = await $(".shopping_cart_badge").exists(0, 0);
    assert.ok(!badgeExists, "Giỏ hàng vẫn còn sản phẩm (badge vẫn hiển thị)");
});

step("Mở giỏ hàng", async () => {
    await click($(".shopping_cart_link"));
    await waitForElement(".cart_list");
});

// ═══════════════════════════════════════════════
// CHECKOUT STEPS
// ═══════════════════════════════════════════════

step("Click nút Checkout", async () => {
    await click($("#checkout"));
});

step(
    "Nhập thông tin giao hàng với tên <firstName> họ <lastName> và zip <zip>",
    async (firstName, lastName, zip) => {
        await write(firstName, into(textBox({ id: "first-name" })));
        await write(lastName, into(textBox({ id: "last-name" })));
        await write(zip, into(textBox({ id: "postal-code" })));
    }
);

step("Click nút Continue", async () => {
    await click($("#continue"));
});

step("Xác nhận trang tổng kết đơn hàng hiển thị", async () => {
    await waitForElement(".summary_info");
    assert.ok(
        await text("Payment Information").exists(),
        "Trang tổng kết đơn hàng không hiển thị"
    );
});

step("Click nút Finish", async () => {
    await click($("#finish"));
});

step("Xác nhận đặt hàng thành công", async () => {
    await waitForElement(".complete-header");
    assert.ok(
        await text("Thank you for your order!").exists(),
        'Không tìm thấy thông báo "Thank you for your order!"'
    );
});

// ═══════════════════════════════════════════════
// SORT STEPS
// ═══════════════════════════════════════════════

step("Sắp xếp sản phẩm theo <sortOption>", async (sortOption) => {
    await dropDown($(".product_sort_container")).select(sortOption);
    await waitFor(500);
});

step("Xác nhận sản phẩm đầu tiên có giá thấp nhất", async () => {
    const prices = await evaluate(() => {
        const priceElements = document.querySelectorAll(
            ".inventory_item_price"
        );
        return Array.from(priceElements).map((el) =>
            parseFloat(el.textContent.replace("$", ""))
        );
    });

    // Kiểm tra giá đã sắp xếp tăng dần
    for (let i = 0; i < prices.length - 1; i++) {
        assert.ok(
            prices[i] <= prices[i + 1],
            `Giá không đúng thứ tự: $${prices[i]} > $${prices[i + 1]}`
        );
    }
});

// ═══════════════════════════════════════════════
// NAVIGATION & LOGOUT
// ═══════════════════════════════════════════════

step("Đăng xuất khỏi SauceDemo", async () => {
    try {
        await click($("#react-burger-menu-btn"));
        await waitForElement("#logout_sidebar_link");
        await click($("#logout_sidebar_link"));
        await waitForElement("#login-button");
    } catch (e) {
        // Nếu không logout được (đang ở trang login), bỏ qua
        gauge.message(`Logout skipped: ${e.message}`);
    }
});
