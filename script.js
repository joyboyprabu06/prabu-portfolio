/* =========================================================
   PRABU J — FUTURE 2100 CYBER-FUNK ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CREATE PARTICLE CANVAS
    ===================================================== */

    const canvas = document.createElement("canvas");

    canvas.id = "particleCanvas";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let particles = [];

    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createParticles();
    }

    /* =====================================================
       PARTICLES
    ===================================================== */

    function createParticles() {

        particles = [];

        const amount =
            Math.min(
                130,
                Math.floor(window.innerWidth / 10)
            );

        for (let i = 0; i < amount; i++) {

            particles.push({

                x: Math.random() * canvas.width,

                y: Math.random() * canvas.height,

                size:
                    Math.random() * 2 +
                    0.4,

                speed:
                    Math.random() * 0.5 +
                    0.15,

                drift:
                    Math.random() * 0.5 -
                    0.25,

                alpha:
                    Math.random() * 0.6 +
                    0.15,

                phase:
                    Math.random() * Math.PI * 2
            });
        }
    }

    /* =====================================================
       DRAW PARTICLES
    ===================================================== */

    function drawParticles(time) {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(p => {

            p.y -= p.speed;

            p.x +=
                p.drift +
                Math.sin(
                    time * 0.001 +
                    p.phase
                ) * 0.12;

            if (p.y < -10) {

                p.y =
                    canvas.height + 10;

                p.x =
                    Math.random() *
                    canvas.width;
            }

            if (p.x < -10)
                p.x = canvas.width + 10;

            if (p.x > canvas.width + 10)
                p.x = -10;

            const distance =
                Math.sqrt(
                    Math.pow(p.x - mouse.x, 2) +
                    Math.pow(p.y - mouse.y, 2)
                );

            const mouseGlow =
                Math.max(
                    0,
                    1 - distance / 250
                );

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size + mouseGlow * 1.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    ${0},
                    ${210 + mouseGlow * 45},
                    ${255},
                    ${p.alpha + mouseGlow * .5}
                )`;

            ctx.shadowBlur =
                10 + mouseGlow * 15;

            ctx.shadowColor =
                "#00f6ff";

            ctx.fill();
        });

        ctx.shadowBlur = 0;

        requestAnimationFrame(drawParticles);
    }

    /* =====================================================
       MOUSE TRACKING
    ===================================================== */

    window.addEventListener("mousemove", e => {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

        updateParallax(
            e.clientX,
            e.clientY
        );
    });

    /* =====================================================
       3D CHARACTER PARALLAX
    ===================================================== */

    const character =
        document.querySelector(
            ".hero-character"
        );

    function updateParallax(x, y) {

        if (!character)
            return;

        const centerX =
            window.innerWidth / 2;

        const centerY =
            window.innerHeight / 2;

        const moveX =
            (x - centerX) /
            centerX;

        const moveY =
            (y - centerY) /
            centerY;

        character.style.transform =
            `
            translate3d(
                ${moveX * 12}px,
                ${moveY * 8}px,
                0
            )
            rotateY(${moveX * 5}deg)
            rotateX(${moveY * -3}deg)
            `;
    }

    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "cursor-glow";

    document.body.appendChild(
        cursorGlow
    );

    let cursorX =
        window.innerWidth / 2;

    let cursorY =
        window.innerHeight / 2;

    let glowX = cursorX;
    let glowY = cursorY;

    window.addEventListener(
        "mousemove",
        e => {

            cursorX =
                e.clientX;

            cursorY =
                e.clientY;
        }
    );

    function animateCursor() {

        glowX +=
            (cursorX - glowX) *
            0.08;

        glowY +=
            (cursorY - glowY) *
            0.08;

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

        requestAnimationFrame(
            animateCursor
        );
    }

    /* =====================================================
       SCANLINE
    ===================================================== */

    const scanline =
        document.createElement("div");

    scanline.className =
        "scanline";

    document.body.appendChild(
        scanline
    );

    /* =====================================================
       3D CARD TILT
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".card, .project-card, .service-card, .skill-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            e => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX -
                    rect.left;

                const y =
                    e.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) /
                    15;

                const rotateY =
                    (centerX - x) /
                    15;

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-8px)
                    scale(1.01)
                    `;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "section, .card, .project-card, .service-card, .skill-card"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(el => {

        el.style.opacity = "0";

        el.style.transform =
            "translateY(35px)";

        el.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(el);
    });

    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "nav a[href^='#'], .navbar a[href^='#']"
        );

    window.addEventListener(
        "scroll",
        () => {

            let current = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 180;

                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.getAttribute(
                            "id"
                        );
                }
            });

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

                if (
                    link.getAttribute("href") ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );
                }
            });
        }
    );

    /* =====================================================
       FUTURISTIC NUMBER GLITCH
    ===================================================== */

    const glitchElements =
        document.querySelectorAll(
            "[data-glitch]"
        );

    glitchElements.forEach(element => {

        const original =
            element.textContent;

        element.addEventListener(
            "mouseenter",
            () => {

                let iteration = 0;

                const chars =
                    "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";

                const interval =
                    setInterval(() => {

                        element.textContent =
                            original
                                .split("")
                                .map(
                                    (letter, index) => {

                                        if (
                                            index <
                                            iteration
                                        ) {
                                            return original[
                                                index
                                            ];
                                        }

                                        return chars[
                                            Math.floor(
                                                Math.random() *
                                                chars.length
                                            )
                                        ];
                                    }
                                )
                                .join("");

                        iteration += 1 / 2;

                        if (
                            iteration >=
                            original.length
                        ) {

                            clearInterval(
                                interval
                            );

                            element.textContent =
                                original;
                        }

                    }, 35);
            }
        );
    });

    /* =====================================================
       INITIALIZE
    ===================================================== */

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    requestAnimationFrame(
        drawParticles
    );

    animateCursor();

});
