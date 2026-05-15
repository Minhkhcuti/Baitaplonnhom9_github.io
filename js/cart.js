let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(id){

    const product = products.find(item => item.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if(existingProduct){

        existingProduct.quantity += 1;

    }else{

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast();
}


function updateCartCount(){

    const cartCount = document.querySelector(".cart-count");

    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    cartCount.innerText = totalQuantity;
}


function showToast(){

    $(".toast-box").fadeIn();

    setTimeout(() => {

        $(".toast-box").fadeOut();

    }, 2000);
}

updateCartCount();
function renderCart(){

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    if(!cartItems) return;

    let html = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        html += `
        
        <div class="cart-item shadow-sm mb-4">

            <div class="row align-items-center">

                <div class="col-md-3">

                    <img src="${item.image}"
                        class="img-fluid cart-image">

                </div>

                <div class="col-md-3">

                    <h5>${item.name}</h5>

                    <p class="text-danger">
                        $${item.price}
                    </p>

                </div>

                <div class="col-md-3">

                    <div class="quantity-box">

                        <button 
                            class="btn btn-sm btn-dark"
                            onclick="decreaseQuantity(${item.id})">

                            -

                        </button>

                        <span class="mx-3">
                            ${item.quantity}
                        </span>

                        <button 
                            class="btn btn-sm btn-dark"
                            onclick="increaseQuantity(${item.id})">

                            +

                        </button>

                    </div>

                </div>

                <div class="col-md-3 text-right">

                    <button 
                        class="btn btn-danger"
                        onclick="removeItem(${item.id})">

                        Remove

                    </button>

                </div>

            </div>

        </div>
        
        `;
    });

    cartItems.innerHTML = html;

    cartTotal.innerText = `$${total}`;
}


function increaseQuantity(id){

    const product = cart.find(item => item.id === id);

    product.quantity++;

    saveCart();
}


function decreaseQuantity(id){

    const product = cart.find(item => item.id === id);

    if(product.quantity > 1){

        product.quantity--;

    }

    saveCart();
}


function removeItem(id){

    cart = cart.filter(item => item.id !== id);

    saveCart();
}


function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    renderCart();
}

renderCart();