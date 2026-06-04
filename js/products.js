const CART_KEY = "cart";

let products = [];
let filteredProducts = [];
let selectedProductId = null;

function formatVND(price) {
    return price.toLocaleString("vi-VN") + " ₫";
}

function showToast(message, type = "success") {
    const toast = document.getElementById("toastBox");
    if (!toast) return;

    toast.style.display = "block";
    toast.style.opacity = "1";
    toast.style.background = type === "success" ? "#111" : "#ff4d6d";
    toast.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> ${message}`;

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => { toast.style.display = "none"; }, 300);
    }, 1800);
}

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (!el) return;
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    el.innerText = total;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (product.stock <= 0) {
        showToast("Sản phẩm đã hết hàng!", "error");
        return;
    }

    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const exist = cart.find(item => item.id === productId);

    if (exist) {
        // SỬA LỖI: Kiểm tra xem số lượng định thêm có vượt số lượng tồn kho hay không
        if (exist.quantity + 1 > product.stock) {
            showToast(`Số lượng trong giỏ đã đạt mức tối đa của kho (${product.stock})!`, "error");
            return;
        }
        exist.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    showToast("Đã thêm vào giỏ hàng!");
}

function buyNow(productId) {
    // SỬA LỖI: Chỉ chuyển hướng khi thêm thành công và không vượt kho
    const product = products.find(p => p.id === productId);
    if (!product || product.stock <= 0) {
        showToast("Sản phẩm không có sẵn!", "error");
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const exist = cart.find(item => item.id === productId);
    if (exist && exist.quantity + 1 > product.stock) {
        showToast(`Số lượng trong giỏ đã đạt mức tối đa của kho (${product.stock})!`, "error");
        return;
    }

    addToCart(productId);
    window.location.href = "cart.html";
}

function getProductsFromHTML() {
    const items = document.querySelectorAll("#productsData .product-item");
    return Array.from(items).map(item => ({
        id: parseInt(item.dataset.id),
        name: item.dataset.name,
        price: parseInt(item.dataset.price),
        category: item.dataset.category,
        image: item.dataset.image,
        description: item.dataset.desc,
        stock: parseInt(item.dataset.stock),
        tag: item.dataset.tag
    }));
}

function renderProducts(list) {
    const productList = document.getElementById("productList");
    const emptyMessage = document.getElementById("emptyMessage");
    if (!productList) return;

    productList.innerHTML = "";

    if (list.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }
    emptyMessage.style.display = "none";

    list.forEach(p => {
        const col = document.createElement("div");
        col.className = "col-lg-3 col-md-6 mb-4";

        let badgeHTML = "";
        if (p.tag === "HOT") badgeHTML = `<span class="badge-custom badge-hot">HOT</span>`;
        else if (p.tag === "NEW") badgeHTML = `<span class="badge-custom badge-new">NEW</span>`;

        const stockBadge = p.stock <= 0
            ? `<span class="badge badge-danger">Hết hàng</span>`
            : `<small class="text-muted">Còn: <b>${p.stock}</b></small>`;

        const addBtn = p.stock <= 0
            ? `<button class="btn btn-secondary btn-sm w-100" disabled>Hết hàng</button>`
            : `<button class="btn btn-outline-dark btn-sm w-100" onclick="addToCart(${p.id})">
                   <i class="fa fa-cart-plus"></i> Thêm vào giỏ
               </button>`;

        col.innerHTML = `
            <div class="card product-card position-relative">
                ${badgeHTML}
                <img src="${p.image}" class="card-img-top product-image" alt="${p.name}"
                     onerror="this.src='https://via.placeholder.com/400x300?text=No+Image';"
                     style="cursor:pointer;" onclick="window.location.href='productdetail.html?id=${p.id}'">
                <button class="btn btn-light btn-sm quick-view-btn" onclick="openDetail(${p.id})">
                    <i class="fa-solid fa-eye"></i> Quick View
                </button>
                <div class="card-body text-center">
                    <h6 class="font-weight-bold mb-1" style="cursor:pointer; color:#111;"
                        onclick="window.location.href='productdetail.html?id=${p.id}'">${p.name}</h6>
                    <p class="text-muted mb-1" style="font-size:13px;">${p.category}</p>
                    <div class="rating mb-2">
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>
                    <p class="product-price mb-1">${formatVND(p.price)}</p>
                    <div class="mb-2">${stockBadge}</div>
                    ${addBtn}
                    <a href="productdetail.html?id=${p.id}" class="d-block mt-2 small text-secondary font-weight-bold">
                        Xem chi tiết <i class="fa-solid fa-angle-right" style="font-size:10px;"></i>
                    </a>
                </div>
            </div>`;

        productList.appendChild(col);
    });
}

function openDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedProductId = productId;
    document.getElementById("modalName").innerText = product.name;
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalCategory").innerText = product.category;
    document.getElementById("modalPrice").innerText = formatVND(product.price);
    document.getElementById("modalDesc").innerText = product.description;
    
    const stockEl = document.getElementById("modalStock");
    const modalBuyBtn = document.getElementById("btnBuyNow");
    const modalAddBtn = document.getElementById("btnAddCart");

    if (product.stock > 0) {
        stockEl.innerText = product.stock;
        stockEl.style.color = "#28a745";
        modalBuyBtn.disabled = false;
        modalAddBtn.disabled = false;
    } else {
        stockEl.innerText = "Hết hàng";
        stockEl.style.color = "#ff4d6d";
        modalBuyBtn.disabled = true;
        modalAddBtn.disabled = true;
    }

    $("#productModal").modal("show");
}

function loadCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    if (!categoryFilter) return;
    categoryFilter.innerHTML = `<option value="all">Tất cả danh mục</option>`;
    [...new Set(products.map(p => p.category))].forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.innerText = cat;
        categoryFilter.appendChild(opt);
    });
}

function applyFilters() {
    const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    const category = document.getElementById("categoryFilter").value;
    const sort = document.getElementById("sortFilter").value;

    filteredProducts = products.filter(p => {
        const matchKeyword = p.name.toLowerCase().includes(keyword);
        const matchCategory = category === "all" || p.category === category;
        return matchKeyword && matchCategory;
    });

    if (sort === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        // SỬA LỖI: Đưa về thứ tự mặc định theo ID ban đầu khi chọn "Sắp xếp theo giá" mặc định
        filteredProducts.sort((a, b) => a.id - b.id);
    }

    renderProducts(filteredProducts);
}

document.addEventListener("DOMContentLoaded", function () {
    products = getProductsFromHTML();
    filteredProducts = [...products];

    renderProducts(filteredProducts);
    loadCategories();
    updateCartCount();

    document.getElementById("searchInput").addEventListener("input", applyFilters);
    document.getElementById("categoryFilter").addEventListener("change", applyFilters);
    document.getElementById("sortFilter").addEventListener("change", applyFilters);

    document.getElementById("btnAddCart").addEventListener("click", function () {
        if (selectedProductId != null) {
            addToCart(selectedProductId);
            $("#productModal").modal("hide");
        }
    });

    document.getElementById("btnBuyNow").addEventListener("click", function () {
        if (selectedProductId != null) {
            buyNow(selectedProductId);
        }
    });
});