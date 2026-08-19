/* =====================================================
   PRABU J PORTFOLIO JAVASCRIPT
===================================================== */


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}


/* ================= CLOSE MOBILE MENU ================= */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(
    ".about-card, .about-stat, .experience-card, .skill-card, .project-card, .education-card, .contact-item"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= NAVBAR SCROLL ================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(5,5,5,0.95)";

    } else {

        navbar.style.background = "rgba(8,8,8,0.82)";

    }

});


/* ================= ACTIVE NAV LINK ================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

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


/* ================= HERO IMAGE PARALLAX ================= */

const profileImage = document.querySelector(".profile-image");

window.addEventListener("mousemove", (event) => {

    if (!profileImage || window.innerWidth < 800) return;

    const x = (window.innerWidth / 2 - event.clientX) / 80;
    const y = (window.innerHeight / 2 - event.clientY) / 80;

    profileImage.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* ================= CURRENT YEAR ================= */

const footerText = document.querySelector(".footer p");

if (footerText) {

    footerText.innerHTML =
        `©️ ${new Date().getFullYear()} PRABU J. All rights reserved.`;

}
