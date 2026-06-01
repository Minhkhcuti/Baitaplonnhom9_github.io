let users = JSON.parse(localStorage.getItem("users")) || [];


if(!users.find(user => user.email === "admin@gmail.com")){

    users.push({
        name: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        role: "admin"
    });

    localStorage.setItem("users", JSON.stringify(users));
}


const registerForm = document.getElementById("register-form");

if(registerForm){

    registerForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name = document.getElementById("register-name").value;

        const email = document.getElementById("register-email").value;

        const password = document.getElementById("register-password").value;

        const existingUser = users.find(user => user.email === email);

        if(existingUser){

            alert("Email already exists");

            return;
        }

        const newUser = {
            name,
            email,
            password,
            role: "user"
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        alert("Register successful");

        window.location.href = "../pages/login.html";
    });
}


const loginForm = document.getElementById("login-form");

if(loginForm){

    loginForm.addEventListener("submit", function(e){

        e.preventDefault();

        const email = document.getElementById("login-email").value;

        const password = document.getElementById("login-password").value;

        const user = users.find(user => 
            user.email === email &&
            user.password === password
        );

        if(!user){

            alert("Invalid email or password");

            return;
        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert("Login successful");

        if(user.role === "admin"){

            window.location.href = "../admin/admin.html";

        }else{

            window.location.href = "../index.html";
        }
    });
}