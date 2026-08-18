/* =========================================
   PRABU J — CINEMATIC PORTFOLIO JS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MOUSE PARALLAX
       ===================================== */

    const heroImage =
        document.querySelector(".hero-image img") ||
        document.querySelector(".profile-image img") ||
        document.querySelector(".profile img");

    document.addEventListener("mousemove", (e) => {

        if (!heroImage) return;

        const x = (window.innerWidth / 2 - e.clientX) / 35;
        const y = (window.innerHeight / 2 - e.clientY) / 35;

        heroImage.style.transform =
            `translate(${x}px, ${y}px) scale(1.02)`;
    });


    /* =====================================
       SCROLL REVEAL
       ===================================== */

    const revealElements =
        document.querySelectorAll(
            "section, .card, .project-card, .skill-card, .certificate-card"
        );

    revealElements.forEach(el => {
        el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(el => {
        observer.observe(el);
    });


    /* =====================================
       SKILL BAR ANIMATION
       ===================================== */

    const skillBars =
        document.querySelectorAll(".skill-progress");

    const skillObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const bar = entry.target;
                    const width =
                        bar.getAttribute("data-width") ||
                        bar.dataset.width;

                    if (width) {
                        bar.style.width = width;
                    }
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });


    /* =====================================
       ACTIVE NAVIGATION
       ===================================== */

    const sections =
        document.querySelectorAll("section");

    const navLinks =
        document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 200;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });

    });


    /* =====================================
       SMOOTH NAVIGATION
       ===================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", (e) => {

            const target =
                link.getAttribute("href");

            if (
                target &&
                target.startsWith("#")
            ) {

                const element =
                    document.querySelector(target);

                if (element) {

                    e.preventDefault();

                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =====================================
       TYPING EFFECT
       ===================================== */

    const typingElement =
        document.querySelector(".typing");

    if (typingElement) {

        const words = [
            "DIGITAL MARKETING",
            "SEO SPECIALIST",
            "GOOGLE ADS",
            "SOCIAL MEDIA MARKETING"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const word =
                words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    word.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === word.length) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1500
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    word.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 45 : 90
            );
        }

        typeEffect();
    }


    /* =====================================
       CURSOR GLOW
       ===================================== */

    const cursor =
        document.createElement("div");

    cursor.style.position = "fixed";
    cursor.style.width = "8px";
    cursor.style.height = "8px";
    cursor.style.borderRadius = "50%";
    cursor.style.background = "#168cff";
    cursor.style.boxShadow =
        "0 0 15px #168cff, 0 0 35px #168cff";
    cursor.style.pointerEvents = "none";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(cursor);

    document.addEventListener("mousemove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });


    /* =====================================
       CURRENT YEAR
       ===================================== */

    const year =
        document.querySelector("#year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }

});
