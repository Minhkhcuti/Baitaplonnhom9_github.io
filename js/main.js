const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function () {
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function updateCartCount() {
    const el = document.querySelector(".cart-count");
    if (!el) return;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    el.innerText = total;
}

updateCartCount();
(function initAdmin() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (!users.find(u => u.email === "admin@gmail.com")) {
        users.push({ name: "Admin", email: "admin@gmail.com", password: "admin123", role: "admin" });
        localStorage.setItem("users", JSON.stringify(users));
    }
})();
