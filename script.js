/* =========================================================
   PRABU J — FUTURISTIC LIVE PORTFOLIO ENGINE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LIVE DIGITAL SPACE CANVAS
       ===================================================== */

    const canvas = document.createElement("canvas");
    canvas.id = "digital-space";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let dpr;

    let mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

    let smoothMouse = {
        x: mouse.x,
        y: mouse.y
    };

    const particles = [];
    const particleCount =
        window.innerWidth < 700 ? 55 : 105;


    function resizeCanvas() {

        dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }


    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);


    /* =====================================================
       PARTICLE CREATION
       ===================================================== */

    class Particle {

        constructor() {

            this.x = Math.random() * width;
            this.y = Math.random() * height;

            this.vx =
                (Math.random() - 0.5) * 0.18;

            this.vy =
                (Math.random() - 0.5) * 0.18;

            this.radius =
                Math.random() * 1.4 + 0.3;

            this.alpha =
                Math.random() * 0.55 + 0.15;

            this.phase =
                Math.random() * Math.PI * 2;
        }


        update() {

            this.phase += 0.005;

            this.x +=
                this.vx +
                Math.sin(this.phase) * 0.06;

            this.y +=
                this.vy +
                Math.cos(this.phase * .7) * 0.04;


            /* Mouse influence */

            const dx = smoothMouse.x - this.x;
            const dy = smoothMouse.y - this.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < 180) {

                const force =
                    (180 - distance) / 180;

                this.x -=
                    (dx / distance) *
                    force *
                    0.45;

                this.y -=
                    (dy / distance) *
                    force *
                    0.45;
            }


            /* Screen wrapping */

            if (this.x < -20) this.x = width + 20;
            if (this.x > width + 20) this.x = -20;

            if (this.y < -20) this.y = height + 20;
            if (this.y > height + 20) this.y = -20;
        }


        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0,234,255,${this.alpha})`;

            ctx.fill();
        }
    }


    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }


    /* =====================================================
       CONNECTION LINES
       ===================================================== */

    function drawConnections() {

        const maxDistance =
            window.innerWidth < 700 ? 90 : 125;

        for (let i = 0; i < particles.length; i++) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const a = particles[i];
                const b = particles[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {

                    const opacity =
                        (1 - distance / maxDistance) * 0.12;

                    ctx.beginPath();

                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);

                    ctx.strokeStyle =
                        `rgba(0,234,255,${opacity})`;

                    ctx.lineWidth = .5;

                    ctx.stroke();
                }
            }
        }
    }


    /* =====================================================
       CURSOR SNOWFLAKE
       ===================================================== */

    const cursor = document.createElement("div");

    cursor.className = "snow-cursor";
    cursor.textContent = "❄";

    document.body.appendChild(cursor);


    let cursorX = mouse.x;
    let cursorY = mouse.y;


    window.addEventListener("mousemove", (event) => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        createTrail(
            event.clientX,
            event.clientY
        );
    });


    function animateCursor() {

        cursorX +=
            (mouse.x - cursorX) * .18;

        cursorY +=
            (mouse.y - cursorY) * .18;

        cursor.style.transform =
            `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }


    animateCursor();


    /* =====================================================
       CURSOR TRAIL
       ===================================================== */

    let lastTrail = 0;

    function createTrail(x, y) {

        const now = Date.now();

        if (now - lastTrail < 35) {
            return;
        }

        lastTrail = now;

        const trail =
            document.createElement("span");

        trail.className = "cursor-trail";

        trail.style.left = x + "px";
        trail.style.top = y + "px";

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 650);
    }


    /* =====================================================
       MAIN CANVAS LOOP
       ===================================================== */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        smoothMouse.x +=
            (mouse.x - smoothMouse.x) * .035;

        smoothMouse.y +=
            (mouse.y - smoothMouse.y) * .035;


        /* Ambient glow around mouse */

        const glow =
            ctx.createRadialGradient(
                smoothMouse.x,
                smoothMouse.y,
                0,
                smoothMouse.x,
                smoothMouse.y,
                220
            );

        glow.addColorStop(
            0,
            "rgba(0,234,255,.045)"
        );

        glow.addColorStop(
            .5,
            "rgba(0,234,255,.015)"
        );

        glow.addColorStop(
            1,
            "rgba(0,234,255,0)"
        );

        ctx.fillStyle = glow;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });


        drawConnections();


        requestAnimationFrame(animate);
    }


    animate();


    /* =====================================================
       NAVIGATION SCROLL EFFECT
       ===================================================== */

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });


    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        });


    /* =====================================================
       HOVER EFFECT
       ===================================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .card, .skill-tag"
        );


    interactiveElements.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursor.classList.add("hover");

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursor.classList.remove("hover");

            }
        );

    });


    /* =====================================================
       CARD MOUSE LIGHT
       ===================================================== */

    document
        .querySelectorAll(".card")
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    card.style.background = `
                        radial-gradient(
                            350px circle at ${x}px ${y}px,
                            rgba(0,234,255,.07),
                            rgba(255,255,255,.025) 45%,
                            rgba(255,255,255,.012)
                        )
                    `;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.background = "";

                }
            );

        });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        "section > .container, .timeline-item, .card, .resume-box"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: .08
            }
        );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* =====================================================
       ACTIVE NAV LINK
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-links a");


    function updateActiveNavigation() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            if (
                window.scrollY >= sectionTop
            ) {
                current = section.id;
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {
                link.classList.add("active");
            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =====================================================
       MAGNETIC BUTTON EFFECT
       ===================================================== */

    document
        .querySelectorAll(".btn")
        .forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        `translate(${x * .08}px, ${y * .08}px)`;
                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

                }
            );

        });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                cursor.classList.remove(
                    "hover"
                );

            }

        }
    );

});
