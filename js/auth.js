let users = JSON.parse(localStorage.getItem("users")) || [];

function showFormError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add("is-invalid");
    let fb = field.nextElementSibling;
    if (!fb || !fb.classList.contains("invalid-feedback")) {
        fb = document.createElement("div");
        fb.className = "invalid-feedback";
        field.parentNode.appendChild(fb);
    }
    fb.innerText = message;
}

function showFormSuccess(formEl, message) {
    formEl.innerHTML = `
        <div class="text-center py-4">
            <i class="fa-solid fa-circle-check" style="font-size:48px; color:#28a745;"></i>
            <h5 class="mt-3">${message}</h5>
        </div>`;
}

function showInlineAlert(container, message, type = "danger") {
    let alert = container.querySelector(".auth-alert");
    if (!alert) {
        alert = document.createElement("div");
        alert.className = `alert auth-alert alert-${type} mt-3`;
        container.prepend(alert);
    }
    alert.className = `alert auth-alert alert-${type} mt-3`;
    alert.innerText = message;
}

function clearErrors(form) {
    form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
    const alert = form.querySelector(".auth-alert");
    if (alert) alert.remove();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors(registerForm);

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        let hasError = false;

        if (!name || name.length < 2) {
            showFormError("register-name", "Tên phải có ít nhất 2 ký tự");
            hasError = true;
        }
        if (!email || !validateEmail(email)) {
            showFormError("register-email", "Email không hợp lệ");
            hasError = true;
        }
        if (!password || password.length < 6) {
            showFormError("register-password", "Mật khẩu phải có ít nhất 6 ký tự");
            hasError = true;
        }
        if (hasError) return;
        const currentUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (currentUsers.find(u => u.email === email)) {
            showFormError("register-email", "Email này đã được đăng ký");
            return;
        }

        currentUsers.push({ name, email, password, role: "user" });
        localStorage.setItem("users", JSON.stringify(currentUsers));

        showFormSuccess(registerForm, "Đăng ký thành công! Đang chuyển đến trang đăng nhập...");
        setTimeout(() => { window.location.href = "login.html"; }, 1500);
    });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors(loginForm);

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if (!email || !validateEmail(email)) {
            showFormError("login-email", "Email không hợp lệ");
            return;
        }
        if (!password) {
            showFormError("login-password", "Vui lòng nhập mật khẩu");
            return;
        }

        const currentUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = currentUsers.find(u => u.email === email && u.password === password);

        if (!user) {
            showInlineAlert(loginForm, "Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        if (user.role === "admin") {
            window.location.href = "../admin/admin.html";
        } else {
            window.location.href = "../index.html";
        }
    });
}
