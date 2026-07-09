const isLoggedIn = localStorage.getItem("loggedIn");

const user = JSON.parse(localStorage.getItem("user"));

if (isLoggedIn !== "true" || !user) {

    alert("Please login first.");

    window.location.href = "index.html";

}

document.getElementById("userName").textContent = user.name;

document.getElementById("displayName").textContent = user.name;

document.getElementById("displayEmail").textContent = user.email;

const loginTime = localStorage.getItem("loginTime");

document.getElementById("loginTime").textContent = loginTime || "Not Available";

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("loggedIn");

    localStorage.removeItem("loginTime");

    alert("Logged Out Successfully!");

    window.location.href = "index.html";

});

window.history.pushState(null, "", window.location.href);

window.onpopstate = function () {

    window.history.go(1);

};