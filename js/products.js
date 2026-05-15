const products = [

    {
        id: 1,
        name: "Luxury Lipstick",
        price: 25,
        image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?q=80&w=1200&auto=format&fit=crop"
    },

    {
        id: 2,
        name: "Glow Foundation",
        price: 40,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
    },

    {
        id: 3,
        name: "Skin Care Set",
        price: 60,
        image: "https://images.unsplash.com/photo-1556228578-dd3e4f0f4c36?q=80&w=1200&auto=format&fit=crop"
    },

    {
        id: 4,
        name: "Perfume Premium",
        price: 80,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop"
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
                        $${product.price}
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