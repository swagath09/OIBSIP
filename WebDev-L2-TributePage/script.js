// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior: "smooth"

        });

    });

});


// ===============================
// Scroll Reveal Animation
// ===============================

const revealElements = document.querySelectorAll(

    ".timeline-card,.stat-card,.record-card,.innings-card,.award-card,.about-image,.about-content,.legacy-content"

);

function reveal() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


// ===============================
// Active Navbar
// ===============================

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 120) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".stat-card h2");

const speed = 120;

const animateCounters = () => {

    counters.forEach(counter => {

        const target = parseInt(counter.innerText.replace(/\D/g, ""));

        if (isNaN(target)) return;

        let count = 0;

        const update = () => {

            const increment = Math.ceil(target / speed);

            count += increment;

            if (count >= target) {

                counter.innerText = counter.dataset.original;

            }

            else {

                counter.innerText = count;

                requestAnimationFrame(update);

            }

        };

        update();

    });

};

counters.forEach(counter => {

    counter.dataset.original = counter.innerText;

});

let counterStarted = false;

window.addEventListener("scroll", () => {

    const stats = document.querySelector("#stats");

    const top = stats.getBoundingClientRect().top;

    if (top < window.innerHeight - 100 && !counterStarted) {

        animateCounters();

        counterStarted = true;

    }

});


// ===============================
// Navbar Background
// ===============================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "#08111f";

        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.4)";

    }

    else {

        header.style.background = "rgba(8,17,31,.85)";

        header.style.boxShadow = "none";

    }

});


// ===============================
// Hero Typing Effect
// ===============================

const subtitle = document.querySelector(".overlay h3");

const text = "The Test Maestro";

subtitle.innerHTML = "";

let index = 0;

function typing() {

    if (index < text.length) {

        subtitle.innerHTML += text.charAt(index);

        index++;

        setTimeout(typing, 90);

    }

}

typing();