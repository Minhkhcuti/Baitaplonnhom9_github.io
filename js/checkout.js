// ============================================================
// checkout.js — Logic trang Thanh toán (checkout.html)
// ============================================================

const CART_KEY = "cart";

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];


// ---------- Tiện ích ----------

function formatVND(price) {
    return price.toLocaleString("vi-VN") + " ₫";
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("is-invalid");
    let feedback = field.nextElementSibling;
    if (!feedback || !feedback.classList.contains("invalid-feedback")) {
        feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        field.parentNode.appendChild(feedback);
    }
    feedback.innerText = message;
}

function clearErrors() {
    document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^(0|\+84)[0-9]{9,10}$/.test(phone.replace(/\s/g, ""));
}


// ---------- Render tóm tắt đơn hàng ----------

function renderCheckout() {
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");
    const placeOrderBtn = document.getElementById("place-order-btn");

    if (!checkoutItems) return;

    // Guard: giỏ rỗng
    if (cart.length === 0) {
        checkoutItems.innerHTML = `
            <div class="text-center py-4">
                <p class="text-muted">Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi đặt hàng.</p>
                <a href="products.html" class="btn btn-dark btn-sm">Mua sắm ngay</a>
            </div>`;
        if (checkoutTotal) checkoutTotal.innerText = formatVND(0);
        if (placeOrderBtn) {
            placeOrderBtn.disabled = true;
            placeOrderBtn.innerText = "Giỏ hàng trống";
        }
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        const subtotal = Number(item.price) * Number(item.quantity);
        total += subtotal;
        html += `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center">
                <img src="${item.image}" width="50" height="50"
                     style="object-fit:cover; border-radius:8px; margin-right:12px;"
                     alt="${item.name}"
                     onerror="this.src='https://via.placeholder.com/50?text=?';">
                <div>
                    <div style="font-size:14px; font-weight:500;">${item.name}</div>
                    <small class="text-muted">x${item.quantity}</small>
                </div>
            </div>
            <span class="font-weight-bold" style="color:#ff4d6d;">${formatVND(subtotal)}</span>
        </div>`;
    });

    checkoutItems.innerHTML = html;
    if (checkoutTotal) checkoutTotal.innerText = formatVND(total);
}


// ---------- Xử lý form ----------

const checkoutForm = document.getElementById("checkout-form");

if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById("checkout-name").value.trim();
        const email = document.getElementById("checkout-email").value.trim();
        const phone = document.getElementById("checkout-phone").value.trim();
        const address = document.getElementById("checkout-address").value.trim();

        let hasError = false;

        if (!name || name.length < 2) {
            showError("checkout-name", "Vui lòng nhập họ tên (ít nhất 2 ký tự)");
            hasError = true;
        }
        if (!email || !validateEmail(email)) {
            showError("checkout-email", "Email không hợp lệ (VD: abc@gmail.com)");
            hasError = true;
        }
        if (!phone || !validatePhone(phone)) {
            showError("checkout-phone", "Số điện thoại không hợp lệ (VD: 0912345678)");
            hasError = true;
        }
        if (!address || address.length < 10) {
            showError("checkout-address", "Vui lòng nhập địa chỉ đầy đủ (ít nhất 10 ký tự)");
            hasError = true;
        }
        if (cart.length === 0) {
            alert("Giỏ hàng trống, không thể đặt hàng!");
            return;
        }

        if (hasError) return;

        const total = cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

        const newOrder = {
            id: Date.now(),
            customer: { name, email, phone, address },
            items: cart,
            total: total,
            date: new Date().toLocaleString("vi-VN"),
            status: "Đang xử lý"
        };

        orders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem(CART_KEY);

        // Thông báo thành công thay vì alert cũ
        checkoutForm.innerHTML = `
            <div class="text-center py-5">
                <i class="fa-solid fa-circle-check" style="font-size:60px; color:#28a745;"></i>
                <h3 class="mt-4">Đặt hàng thành công!</h3>
                <p class="text-muted">Cảm ơn bạn đã mua hàng. Mã đơn: <b>#${newOrder.id}</b></p>
                <p class="text-muted">Tổng tiền: <b style="color:#ff4d6d;">${formatVND(total)}</b></p>
                <a href="../index.html" class="btn btn-dark mt-3 px-4" style="border-radius:50px;">
                    Về trang chủ
                </a>
                <a href="orders.html" class="btn btn-outline-dark mt-3 ml-2 px-4" style="border-radius:50px;">
                    Xem đơn hàng
                </a>
            </div>`;
    });
}


// ---------- Khởi tạo ----------

renderCheckout();