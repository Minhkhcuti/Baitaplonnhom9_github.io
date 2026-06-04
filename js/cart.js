
const CART_KEY = "cart";

let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

function formatVND(price) {
    return price.toLocaleString("vi-VN") + " ₫";
}

function updateCartCount() {
    const el = document.querySelector(".cart-count");
    if (!el) return;
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    el.innerText = total;
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCountSummary = document.getElementById("cart-count-summary");
    const checkoutBtn = document.querySelector(".checkout-btn");

    if (!cartItems) return;
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="fa-solid fa-cart-shopping" style="font-size:60px; color:#ddd;"></i>
                <h4 class="mt-4">Giỏ hàng trống</h4>
                <p class="text-muted">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                <a href="products.html" class="btn btn-dark mt-3 px-4" style="border-radius:50px;">
                    Mua sắm ngay
                </a>
            </div>`;

        if (cartTotal) cartTotal.innerText = formatVND(0);
        if (cartCountSummary) cartCountSummary.innerText = "0";
        if (checkoutBtn) {
            checkoutBtn.style.opacity = "0.5";
            checkoutBtn.style.pointerEvents = "none";
            checkoutBtn.title = "Giỏ hàng đang trống";
        }
        return;
    }
    if (checkoutBtn) {
        checkoutBtn.style.opacity = "1";
        checkoutBtn.style.pointerEvents = "auto";
        checkoutBtn.title = "";
    }

    let html = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        totalQty += item.quantity;

        html += `
        <div class="cart-item shadow-sm mb-4">
            <div class="row align-items-center">
                <div class="col-md-3">
                    <img src="${item.image}" class="img-fluid cart-image"
                         alt="${item.name}"
                         onerror="this.src='https://via.placeholder.com/200x200?text=No+Image';">
                </div>
                <div class="col-md-4">
                    <h5 class="mb-1">${item.name}</h5>
                    <p class="product-price mb-0">${formatVND(item.price)}</p>
                </div>
                <div class="col-md-3">
                    <div class="quantity-box d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-dark" onclick="decreaseQuantity(${item.id})">−</button>
                        <span class="mx-3 font-weight-bold">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-dark" onclick="increaseQuantity(${item.id})">+</button>
                    </div>
                    <small class="text-muted d-block mt-1">= ${formatVND(subtotal)}</small>
                </div>
                <div class="col-md-2 text-right">
                    <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${item.id})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>`;
    });

    cartItems.innerHTML = html;
    if (cartTotal) cartTotal.innerText = formatVND(total);
    if (cartCountSummary) cartCountSummary.innerText = totalQty;
}

function increaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (item) { item.quantity++; saveCart(); }
}

function decreaseQuantity(id) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart();
}

function removeItem(id) {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) return;
    cart = cart.filter(i => i.id !== id);
    saveCart();
}

updateCartCount();
renderCart();
