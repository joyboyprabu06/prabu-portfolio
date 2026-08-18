// ===============================
// PRABU J - CYBERPUNK PORTFOLIO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // --------------------------------
    // 1. CYBERPUNK PARTICLE BACKGROUND
    // --------------------------------

    const canvas = document.createElement("canvas");

    canvas.id = "cyberCanvas";

    document.body.prepend(canvas);

    const ctx = canvas.getContext("2d");

    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";

    let particles = [];
    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createParticles();
    }

    // --------------------------------
    // CREATE PARTICLES
    // --------------------------------

    function createParticles() {

        particles = [];

        const amount = window.innerWidth < 700 ? 45 : 85;

        for (let i = 0; i < amount; i++) {

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,

                size: Math.random() * 2 + 0.5,

                speedX: (Math.random() - 0.5) * 0.35,
                speedY: (Math.random() - 0.5) * 0.35,

                opacity: Math.random() * 0.7 + 0.2
            });

        }
    }

    // --------------------------------
    // DRAW PARTICLES
    // --------------------------------

    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for (let i = 0; i < particles.length; i++) {

            const p = particles[i];

            p.x += p.speedX;
            p.y += p.speedY;

            // Screen wrapping

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;

            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Particle

            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(0, 234, 255, ${p.opacity})`;

            ctx.shadowBlur = 10;
            ctx.shadowColor = "#00eaff";

            ctx.fill();

            ctx.shadowBlur = 0;

            // Connections

            for (let j = i + 1; j < particles.length; j++) {

                const p2 = particles[j];

                const dx = p.x - p2.x;
                const dy = p.y - p2.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {

                    const opacity =
                        0.12 * (1 - distance / 120);

                    ctx.beginPath();

                    ctx.moveTo(
                        p.x,
                        p.y
                    );

                    ctx.lineTo(
                        p2.x,
                        p2.y
                    );

                    ctx.strokeStyle =
                        `rgba(0, 234, 255, ${opacity})`;

                    ctx.lineWidth = 0.5;

                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }

    // --------------------------------
    // MOUSE MOVEMENT
    // --------------------------------

    window.addEventListener("mousemove", (event) => {

        mouse.x = event.clientX;
        mouse.y = event.clientY;

        particles.forEach(p => {

            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {

                const angle =
                    Math.atan2(dy, dx);

                const force =
                    (mouse.radius - distance)
                    / mouse.radius;

                p.x += Math.cos(angle) * force * 1.5;
                p.y += Math.sin(angle) * force * 1.5;
            }

        });

    });

    // --------------------------------
    // TOUCH EFFECT FOR MOBILE
    // --------------------------------

    window.addEventListener("touchmove", (event) => {

        const touch = event.touches[0];

        mouse.x = touch.clientX;
        mouse.y = touch.clientY;

    }, { passive: true });


    // --------------------------------
    // RESIZE
    // --------------------------------

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    drawParticles();


    // =================================
    // 2. PRABU J HOVER / TOUCH EFFECT
    // =================================

    const heroName =
        document.querySelector(".hero h1");

    if (heroName) {

        // Desktop hover

        heroName.addEventListener(
            "mouseenter",
            () => {

                heroName.classList.add(
                    "cyber-active"
                );

            }
        );

        heroName.addEventListener(
            "mouseleave",
            () => {

                heroName.classList.remove(
                    "cyber-active"
                );

            }
        );


        // Mobile tap

        heroName.addEventListener(
            "click",
            () => {

                heroName.classList.toggle(
                    "cyber-active"
                );

            }
        );

    }


    // =================================
    // 3. SCROLL REVEAL
    // =================================

    const sections =
        document.querySelectorAll("section");

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "section-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    sections.forEach(section => {

        section.classList.add(
            "section-hidden"
        );

        observer.observe(section);

    });


    // =================================
    // 4. NAVIGATION ACTIVE EFFECT
    // =================================

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.forEach(item => {
                    item.classList.remove(
                        "active-link"
                    );
                });

                link.classList.add(
                    "active-link"
                );

            }
        );

    });


    // =================================
    // 5. CONSOLE MESSAGE
    // =================================

    console.log(
        "%c PRABU J | DIGITAL MARKETING ",
        "color:#00eaff;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%c Welcome to my cyberpunk portfolio.",
        "color:#9ca6b6;font-size:13px;"
    );

});
