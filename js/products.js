// ===============================
// PRODUCTS PAGE - PRO VERSION
// Bootstrap 4 + LocalStorage
// ===============================

const PRODUCT_KEY = "products";
const CART_KEY = "cart";

let products = [];
let filteredProducts = [];
let selectedProductId = null;

// -------------------------------
// Format VNĐ
// -------------------------------
function formatVND(price) {
    return price.toLocaleString("vi-VN") + " ₫";
}

// -------------------------------
// Toast đẹp
// -------------------------------
function showToast(message, type = "success") {
    const toast = document.getElementById("toastBox");

    toast.style.display = "block";
    toast.style.opacity = "1";
    toast.style.background = type === "success" ? "#111" : "#ff4d6d";
    toast.innerHTML = `<i class="fa-solid fa-circle-check mr-2"></i> ${message}`;

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.style.display = "none";
        }, 300);
    }, 1500);
}

// -------------------------------
// Lấy sản phẩm (nếu chưa có thì tạo mẫu)
// -------------------------------
function getProducts() {
    let data = localStorage.getItem(PRODUCT_KEY);

    if (!data) {
        let sampleProducts = [
    {
        id: 1,
        name: "Sữa Tắm Dưỡng Thể Olay",
        price: 320000,
        category: "Body Care",
        image: "images/products/nuoc.jpg",
        description: "Sữa tắm dưỡng ẩm giúp da mềm mịn và thơm lâu.",
        stock: 15,
        tag: "HOT"
    },
    {
        id: 2,
        name: "Nước Hoa Chanel No.5",
        price: 2450000,
        category: "Perfume",
        image: "images/products/nuochoa.jpg",
        description: "Nước hoa cao cấp với mùi hương sang trọng và quyến rũ.",
        stock: 8,
        tag: "NEW"
    },
    {
        id: 3,
        name: "Toner Pink AHA BHA",
        price: 280000,
        category: "Toner",
        image: "images/products/nuocrua.jpg",
        description: "Toner giúp làm sạch sâu, hỗ trợ giảm mụn và cân bằng da.",
        stock: 20,
        tag: "HOT"
    },
    {
        id: 4,
        name: "Serum Brings 70%",
        price: 450000,
        category: "Serum",
        image: "images/products/serum.jpg",
        description: "Serum dưỡng sáng và phục hồi da, giúp da căng bóng tự nhiên.",
        stock: 10,
        tag: "NEW"
    }
];

        localStorage.setItem(PRODUCT_KEY, JSON.stringify(sampleProducts));
        return sampleProducts;
    }

    return JSON.parse(data);
}

// -------------------------------
// Render sản phẩm
// -------------------------------
function renderProducts(list) {
    const productList = document.getElementById("productList");
    const emptyMessage = document.getElementById("emptyMessage");

    productList.innerHTML = "";

    if (list.length === 0) {
        emptyMessage.style.display = "block";
        return;
    } else {
        emptyMessage.style.display = "none";
    }

    list.forEach((p) => {
        let col = document.createElement("div");
        col.className = "col-lg-3 col-md-6 mb-4";

        let badgeHTML = "";
        if (p.tag === "HOT") {
            badgeHTML = `<span class="badge-custom badge-hot">HOT</span>`;
        } else if (p.tag === "NEW") {
            badgeHTML = `<span class="badge-custom badge-new">NEW</span>`;
        }

        col.innerHTML = `
            <div class="card product-card shadow-sm position-relative">
                ${badgeHTML}

                <img src="${p.image}" class="card-img-top product-image" alt="${p.name}"
                     onerror="this.src='https://via.placeholder.com/400x300?text=No+Image';">

                <button class="btn btn-dark btn-sm quick-view-btn" onclick="openDetail(${p.id})"
                        style="border-radius:50px;">
                    <i class="fa-solid fa-eye"></i> Quick View
                </button>

                <div class="card-body text-center">
                    <h6 class="font-weight-bold mb-1">${p.name}</h6>
                    <p class="text-muted mb-1" style="font-size:13px;">${p.category}</p>

                    <div class="rating mb-2">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <p class="product-price mb-2">${formatVND(p.price)}</p>

                    <p class="text-muted mb-2" style="font-size:13px;">
                        Tồn kho: <b>${p.stock}</b>
                    </p>

                    <button class="btn btn-outline-dark btn-sm add-cart-btn w-100"
                        onclick="addToCart(${p.id})">
                        <i class="fa fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                </div>
            </div>
        `;

        productList.appendChild(col);
    });
}

// -------------------------------
// Update cart count
// -------------------------------
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    let totalQuantity = 0;
    cart.forEach(item => totalQuantity += item.quantity);

    document.getElementById("cartCount").innerText = totalQuantity;
}

// -------------------------------
// Add to cart
// -------------------------------
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    let product = products.find(p => p.id === productId);

    if (!product) return;

    if (product.stock <= 0) {
        showToast("Sản phẩm đã hết hàng!", "error");
        return;
    }

    let exist = cart.find(item => item.id === productId);

    if (exist) {
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

// -------------------------------
// Open modal detail
// -------------------------------
function openDetail(productId) {
    let product = products.find(p => p.id === productId);
    if (!product) return;

    selectedProductId = productId;

    document.getElementById("modalName").innerText = product.name;
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalCategory").innerText = product.category;
    document.getElementById("modalPrice").innerText = formatVND(product.price);
    document.getElementById("modalDesc").innerText = product.description;
    document.getElementById("modalStock").innerText = product.stock;

    $("#productModal").modal("show");
}

// -------------------------------
// Buy now -> add cart -> go cart
// -------------------------------
function buyNow(productId) {
    addToCart(productId);
    window.location.href = "cart.html";
}

// -------------------------------
// Load categories
// -------------------------------
function loadCategories() {
    let categoryFilter = document.getElementById("categoryFilter");
    let categories = [...new Set(products.map(p => p.category))];

    categories.forEach(cat => {
        let option = document.createElement("option");
        option.value = cat;
        option.innerText = cat;
        categoryFilter.appendChild(option);
    });
}

// -------------------------------
// Filter + Search + Sort
// -------------------------------
function applyFilters() {
    let keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    let category = document.getElementById("categoryFilter").value;
    let sort = document.getElementById("sortFilter").value;

    filteredProducts = products.filter(p => {
        let matchKeyword = p.name.toLowerCase().includes(keyword);
        let matchCategory = (category === "all") ? true : (p.category === category);
        return matchKeyword && matchCategory;
    });

    if (sort === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    renderProducts(filteredProducts);
}

// -------------------------------
// INIT
// -------------------------------
document.addEventListener("DOMContentLoaded", function () {
    products = getProducts();
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