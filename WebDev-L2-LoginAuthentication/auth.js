const togglePasswords = document.querySelectorAll(".togglePassword");

togglePasswords.forEach(icon => {

    icon.addEventListener("click", () => {

        const input = icon.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            icon.classList.replace("fa-eye", "fa-eye-slash");

        }

        else {

            input.type = "password";

            icon.classList.replace("fa-eye-slash", "fa-eye");

        }

    });

});

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const name = document.getElementById("fullName").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const password = document.getElementById("registerPassword").value;

        const confirmPassword = document.getElementById("confirmPassword").value;

        if (name === "" || email === "" || password === "" || confirmPassword === "") {

            alert("Please fill all fields.");

            return;

        }

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        const existingUser = JSON.parse(localStorage.getItem("user"));

        if (existingUser && existingUser.email === email) {

            alert("Account already exists. Please login.");

            window.location.href = "index.html";

            return;

        }

        const user = {

            name,

            email,

            password

        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration Successful! Please login.");

        registerForm.reset();

        window.location.href = "index.html";

    });

}

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {

            alert("No account found. Please register first.");

            window.location.href = "register.html";

            return;

        }

        if (

            email === storedUser.email &&

            password === storedUser.password

        ) {

            localStorage.setItem("loggedIn", "true");

            localStorage.setItem("loginTime", new Date().toLocaleString());

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        }

        else {

            alert("Invalid Email or Password.");

        }

    });

}

const emailInputs = document.querySelectorAll("input[type='email']");

emailInputs.forEach(input => {

    input.addEventListener("blur", () => {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (

            input.value !== "" &&

            !emailPattern.test(input.value)

        ) {

            alert("Please enter a valid email.");

            input.focus();

        }

    });

});

const passwordInput = document.getElementById("registerPassword");

if (passwordInput) {

    passwordInput.addEventListener("keyup", () => {

        if (passwordInput.value.length < 6) {

            passwordInput.style.borderColor = "red";

        }

        else {

            passwordInput.style.borderColor = "green";

        }

    });

}