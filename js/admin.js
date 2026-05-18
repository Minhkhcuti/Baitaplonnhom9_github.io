let products = JSON.parse(localStorage.getItem("products")) || [

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
    }

];

function saveProducts(){

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

function renderAdminProducts(){

    const productList = document.getElementById(
        "admin-product-list"
    );

    if(!productList) return;

    let html = "";

    products.forEach(product => {

        html += `
        
        <tr>

            <td>
                ${product.id}
            </td>

            <td>

                <img 
                    src="${product.image}"
                    width="80">

            </td>

            <td>
                ${product.name}
            </td>

            <td>
                ${product.price.toLocaleString("vi-VN")} VND
            </td>

            <td>

                <button 
                    class="btn btn-danger"
                    onclick="deleteProduct(${product.id})">

                    Delete

                </button>

            </td>

        </tr>
        
        `;
    });

    productList.innerHTML = html;
}

const productForm = document.getElementById(
    "product-form"
);

if(productForm){

    productForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name = document.getElementById(
            "product-name"
        ).value;

        const price = document.getElementById(
            "product-price"
        ).value;

        const image = document.getElementById(
            "product-image"
        ).value;

        const newProduct = {

            id: Date.now(),

            name,

            price,

            image
        };

        products.push(newProduct);

        saveProducts();

        renderAdminProducts();

        $("#productModal").modal("hide");

        productForm.reset();
    });
}


function deleteProduct(id){

    products = products.filter(
        product => product.id !== id
    );

    saveProducts();

    renderAdminProducts();
}

renderAdminProducts();