const products = [

    {
        id: 1,
        name: "Nước hoa",
        price: 250000,
        image: "images/products/nuochoa.jpg"
    },

    {
        id: 2,
        name: "Nước rửa mặt",
        price: 400000,
        image: "images/products/nuoc.jpg"
    },

    {
        id: 3,
        name: "Tẩy trang",
        price: 600000,
        image: "images/products/nuocrua.jpg"
    },

    {
        id: 4,
        name: "Serum",
        price: 800000,
        image: "images/products/serum.jpg"
    }

];

const productList = document.getElementById("product-list");

function renderProducts(){

    let html = "";

    products.forEach(product => {

        html += `
        
        <div class="col-md-3 mb-4">

            <div class="card product-card h-100 shadow-sm">

                <img src="${product.image}"
                    class="card-img-top product-image">

                <div class="card-body text-center">

                    <h5 class="card-title">
                        ${product.name}
                    </h5>

                    <p class="product-price">
                        ${product.price.toLocaleString("vi-VN")} VNĐ
                    </p>

                   <button 
    class="btn btn-dark add-cart-btn"
    onclick="addToCart(${product.id})">

    Add To Cart

</button>

                </div>

            </div>

        </div>
        
        `;
    });

    productList.innerHTML = html;
}

renderProducts();