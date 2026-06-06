(function guardAdmin() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser || currentUser.role !== "admin") {
    alert(
      "Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản Admin.",
    );
    window.location.href = "../pages/login.html";
  }
})();

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Son Kem Lì 3CE Velvet Lip Tint",
    price: 320000,
    category: "Lipstick",
    stock: 25,
    tag: "HOT",
    description: "Son kem lì mềm môi, lên màu chuẩn và lâu trôi.",
    image: "../images/products/son1.jpg",
  },
  {
    id: 2,
    name: "Son Dior Addict Lip Glow",
    price: 890000,
    category: "Lipstick",
    stock: 12,
    tag: "NEW",
    description: "Son dưỡng có màu tự nhiên, giúp môi mềm mịn và căng bóng.",
    image: "../images/products/son2.jpg",
  },
  {
    id: 3,
    name: "Nước Hoa Nữ Chanel No.5",
    price: 2450000,
    category: "Perfume",
    stock: 8,
    tag: "HOT",
    description: "Nước hoa nữ cao cấp với mùi hương sang trọng và quyến rũ.",
    image: "../images/products/nuochoa1.jpg",
  },
  {
    id: 4,
    name: "Nước Hoa Nữ Dior Miss Dior",
    price: 2650000,
    category: "Perfume",
    stock: 6,
    tag: "NEW",
    description:
      "Nước hoa nữ cao cấp, ngọt ngào và thanh lịch, phù hợp đi chơi và dự tiệc.",
    image: "../images/products/nuochoa2.jpg",
  },
  {
    id: 5,
    name: "Sữa Rửa Mặt CeraVe Foaming Cleanser",
    price: 280000,
    category: "Cleanser",
    stock: 20,
    tag: "HOT",
    description: "Sữa rửa mặt làm sạch sâu, không gây khô da, phù hợp da dầu.",
    image: "../images/products/srm2.jpg",
  },
  {
    id: 6,
    name: "Sữa Rửa Mặt Senka Perfect Whip",
    price: 150000,
    category: "Cleanser",
    stock: 30,
    tag: "NEW",
    description: "Bọt mịn, làm sạch nhẹ nhàng, phù hợp da dầu và hỗn hợp.",
    image: "../images/products/srm1.jpg",
  },
  {
    id: 7,
    name: "Serum Glow Recipe Watermelon Pink Glow",
    price: 850000,
    category: "Serum",
    stock: 12,
    tag: "HOT",
    description:
      "Serum màu hồng giúp cấp ẩm, làm sáng da và tạo hiệu ứng căng bóng tự nhiên.",
    image: "../images/products/serum2.jpg",
  },
  {
    id: 8,
    name: "Anua Peach 70 Niacin Serum",
    price: 920000,
    category: "Serum",
    stock: 10,
    tag: "NEW",
    description:
      "Serum dưỡng sáng, giúp da đều màu và căng bóng, phù hợp da nhạy cảm.",
    image: "../images/products/serum1.jpg",
  },
];

const stored = JSON.parse(localStorage.getItem("products"));
let products = stored && stored.length > 0 ? stored : DEFAULT_PRODUCTS;
if (!stored || stored.length === 0) {
  localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
}

let editingId = null;
function formatVND(price) {
  return Number(price).toLocaleString("vi-VN") + " ₫";
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderAdminProducts() {
  const list = document.getElementById("admin-product-list");
  if (!list) return;

  if (products.length === 0) {
    list.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">Chưa có sản phẩm nào</td></tr>`;
    return;
  }

  list.innerHTML = products
    .map(
      (p) => `
        <tr>
            <td>${p.id}</td>
            <td>
                <img src="${p.image}" width="70" height="60" style="object-fit:cover; border-radius:6px;"
                     onerror="this.src='https://via.placeholder.com/70x60?text=?';" alt="${p.name}">
            </td>
            <td><b>${p.name}</b><br><small class="text-muted">${p.category || ""}</small></td>
            <td>${formatVND(p.price)}</td>
            <td>
                <span class="badge ${p.stock > 0 ? "badge-success" : "badge-danger"}">
                    ${p.stock > 0 ? p.stock : "Hết hàng"}
                </span>
            </td>
            <td>
                <button class="btn btn-warning btn-sm mr-1" onclick="openEditModal(${p.id})">
                    <i class="fa-solid fa-pen"></i> Sửa
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">
                    <i class="fa-solid fa-trash"></i> Xóa
                </button>
            </td>
        </tr>
    `,
    )
    .join("");
}

function openAddModal() {
  editingId = null;
  document.getElementById("modalTitle").innerText = "Thêm sản phẩm mới";
  document.getElementById("product-form").reset();
  $("#productModal").modal("show");
}

function openEditModal(id) {
  const p = products.find((p) => p.id === id);
  if (!p) return;
  editingId = id;

  document.getElementById("modalTitle").innerText = "Sửa sản phẩm";
  document.getElementById("product-name").value = p.name;
  document.getElementById("product-price").value = p.price;
  document.getElementById("product-category").value = p.category || "";
  document.getElementById("product-stock").value = p.stock || 0;
  document.getElementById("product-image").value = p.image;
  const descEl = document.getElementById("product-desc");
  if (descEl) descEl.value = p.description || "";

  $("#productModal").modal("show");
}

const productForm = document.getElementById("product-form");

if (productForm) {
  productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("product-name").value.trim();
    const price = parseInt(document.getElementById("product-price").value);
    const category = document.getElementById("product-category").value.trim();
    const stock = parseInt(document.getElementById("product-stock").value) || 0;
    const image = document.getElementById("product-image").value.trim();
    const descEl = document.getElementById("product-desc");
    const description = descEl ? descEl.value.trim() : "";

    if (!name || !price || !image) {
      alert("Vui lòng điền đầy đủ: Tên, Giá và Ảnh sản phẩm.");
      return;
    }

    if (editingId !== null) {
      const idx = products.findIndex((p) => p.id === editingId);
      if (idx !== -1) {
        products[idx] = {
          ...products[idx],
          name,
          price,
          category,
          stock,
          image,
          description,
        };
      }
    } else {
      const newId =
        products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
      products.push({
        id: newId,
        name,
        price,
        category,
        stock,
        image,
        description,
        tag: "",
      });
    }

    saveProducts();
    renderAdminProducts();
    $("#productModal").modal("hide");
    productForm.reset();
    editingId = null;
  });
}

function deleteProduct(id) {
  const p = products.find((p) => p.id === id);
  if (!p) return;
  if (!confirm(`Bạn có chắc muốn xóa sản phẩm "${p.name}"?`)) return;

  products = products.filter((p) => p.id !== id);
  saveProducts();
  renderAdminProducts();
}

function logout() {
  if (!confirm("Bạn có muốn đăng xuất?")) return;
  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
}

renderAdminProducts();
