let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

let orders = JSON.parse(
    localStorage.getItem("orders")
) || [];

const checkoutItems = document.getElementById(
    "checkout-items"
);

const checkoutTotal = document.getElementById(
    "checkout-total"
);

function renderCheckout(){

    let html = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;

        html += `
        
        <div class="d-flex justify-content-between mb-3">

            <span>
                ${item.name}
                x${item.quantity}
            </span>

            <span>
                $${item.price * item.quantity}
            </span>

        </div>
        
        `;
    });

    checkoutItems.innerHTML = html;

    checkoutTotal.innerText = `$${total}`;
}

renderCheckout();

const checkoutForm = document.getElementById(
    "checkout-form"
);

checkoutForm.addEventListener("submit", function(e){

    e.preventDefault();

    const name = document.getElementById(
        "checkout-name"
    ).value;

    const email = document.getElementById(
        "checkout-email"
    ).value;

    const phone = document.getElementById(
        "checkout-phone"
    ).value;

    const address = document.getElementById(
        "checkout-address"
    ).value;

    if(
        !name ||
        !email ||
        !phone ||
        !address
    ){

        alert("Please fill all fields");

        return;
    }

    const newOrder = {

        id: Date.now(),

        customer: {
            name,
            email,
            phone,
            address
        },

        items: cart,

        date: new Date().toLocaleString()
    };

    orders.push(newOrder);

    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );

    localStorage.removeItem("cart");

    alert("Order placed successfully");

    window.location.href = "../index.html";
});