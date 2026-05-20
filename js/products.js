// ==========================================================================
// PRODUCTS PAGE - PRO LOGIC ONLY
// Bootstrap 4 + LocalStorage (Đồng bộ tuyệt đối cấu trúc HTML mới)
// ==========================================================================

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
                name: "Son Kem Lì 3CE Velvet Lip Tint",
                price: 320000,
                category: "Lipstick",
                image: "images/products/son1.jpg",
                description: "Son kem lì mềm môi, lên màu chuẩn và lâu trôi.",
                stock: 25,
                tag: "HOT"
            },
            {
                id: 2,
                name: "Son Dior Addict Lip Glow",
                price: 890000,
                category: "Lipstick",
                image: "images/products/son2.jpg",
                description: "Son dưỡng có màu tự nhiên, giúp môi mềm mịn và căng bóng.",
                stock: 12,
                tag: "NEW"
            },
            {
                id: 3,
                name: "Nước Hoa Nữ Chanel No.5",
                price: 2450000,
                category: "Perfume",
                image: "images/products/nuochoa1.jpg",
                description: "Nước hoa nữ cao cấp với mùi hương sang trọng và quyến rũ.",
                stock: 8,
                tag: "HOT"
            },
            {
                id: 4,
                name: "Nước Hoa Nữ Dior Miss Dior",
                price: 2650000,
                category: "Perfume",
                image: "images/products/nuochoa2.jpg",
                description: "Nước hoa nữ cao cấp, ngọt ngào và thanh lịch, phù hợp đi chơi và dự tiệc.",
                stock: 6,
                tag: "NEW"
            },
            {
                id: 5,
                name: "Sữa Rửa Mặt CeraVe Foaming Cleanser",
                price: 280000,
                category: "Cleanser",
                image: "images/products/srm2.jpg",
                description: "Sữa rửa mặt làm sạch sâu, không gây khô da, phù hợp da dầu.",
                stock: 20,
                tag: "HOT"
            },
            {
                id: 6,
                name: "Sữa Rửa Mặt Senka Perfect Whip",
                price: 150000,
                category: "Cleanser",
                image: "images/products/srm1.jpg",
                description: "Bọt mịn, làm sạch nhẹ nhàng, phù hợp da dầu và hỗn hợp.",
                stock: 30,
                tag: "NEW"
            },
            {
                id: 7,
                name: "Serum Glow Recipe Watermelon Pink Glow",
                price: 850000,
                category: "Serum",
                image: "images/products/serum2.jpg",
                description: "Serum màu hồng giúp cấp ẩm, làm sáng da và tạo hiệu ứng căng bóng tự nhiên.",
                stock: 12,
                tag: "HOT"
            },
            {
                id: 8,
                name: "Anua Peach 70 Niacin Serum",
                price: 920000,
                category: "Serum",
                image: "images/products/serum1.jpg",
                description: "Serum phục hồi da, cấp ẩm sâu và giúp da căng mịn, phù hợp da nhạy cảm.",
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
            <div class="card product-card position-relative">
                ${badgeHTML}

                <div class="product-image-wrapper">
                    <img src="${p.image}" class="card-img-top product-image" alt="${p.name}"
                         onerror="this.src='https://via.placeholder.com/400x300?text=No+Image';">
                    
                    <button class="btn quick-view-btn" onclick="openDetail(${p.id})">
                        <i class="fa-solid fa-eye mr-1"></i> Quick View
                    </button>
                </div>

                <div class="card-body text-center">
                    <p class="product-cat">${p.category}</p>
                    <h6 class="product-title">${p.name}</h6>

                    <div class="rating mb-2">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </div>

                    <p class="product-price mb-2">${formatVND(p.price)}</p>

                    <p class="stock-text mb-3">
                        Tồn kho: <b>${p.stock}</b>
                    </p>

                    <button class="btn add-cart-btn w-100" onclick="addToCart(${p.id})">
                        <i class="fa fa-cart-plus mr-1"></i> Thêm vào giỏ
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