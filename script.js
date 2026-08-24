/* =========================================
   PRABU J — FUTURE 2100 SYSTEM
   LIVE BACKGROUND + PARTICLES + CURSOR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       CANVAS
    ===================================== */

    const canvas = document.getElementById("spaceCanvas");
    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let particles = [];

    const mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        targetX: window.innerWidth / 2,
        targetY: window.innerHeight / 2
    };


    function resizeCanvas() {

        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        createParticles();
    }

    window.addEventListener("resize", resizeCanvas);


    /* =====================================
       PARTICLES
    ===================================== */

    function createParticles() {

        particles = [];

        const amount = Math.min(
            180,
            Math.floor((width * height) / 9000)
        );

        for (let i = 0; i < amount; i++) {

            particles.push({

                x: Math.random() * width,
                y: Math.random() * height,

                size: Math.random() * 1.8 + .3,

                speedX: (Math.random() - .5) * .25,
                speedY: (Math.random() - .5) * .25,

                alpha: Math.random() * .7 + .1,

                hue: Math.random() > .5 ? 190 : 270

            });
        }
    }


    /* =====================================
       DRAW BACKGROUND
    ===================================== */

    function drawBackground() {

        ctx.clearRect(0, 0, width, height);

        /* deep gradient */

        const gradient = ctx.createRadialGradient(
            width * .5,
            height * .4,
            0,
            width * .5,
            height * .5,
            Math.max(width, height)
        );

        gradient.addColorStop(0, "#080b25");
        gradient.addColorStop(.45, "#050616");
        gradient.addColorStop(1, "#020208");

        ctx.fillStyle = gradient;

        ctx.fillRect(0, 0, width, height);


        /* grid */

        drawGrid();


        /* particles */

        particles.forEach((particle, index) => {

            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;

            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;


            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 180) {

                particle.x -= dx * .0008;
                particle.y -= dy * .0008;

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `hsla(${particle.hue},100%,70%,${particle.alpha})`;

            ctx.shadowBlur = 10;

            ctx.shadowColor =
                particle.hue === 190
                    ? "#00f6ff"
                    : "#8b3dff";

            ctx.fill();

            ctx.shadowBlur = 0;

        });


        drawConnections();
    }


    /* =====================================
       DIGITAL GRID
    ===================================== */

    function drawGrid() {

        const gridSize = 65;

        ctx.lineWidth = .35;

        for (let x = 0; x < width; x += gridSize) {

            ctx.beginPath();

            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);

            ctx.strokeStyle =
                "rgba(70,100,255,.055)";

            ctx.stroke();
        }

        for (let y = 0; y < height; y += gridSize) {

            ctx.beginPath();

            ctx.moveTo(0, y);
            ctx.lineTo(width, y);

            ctx.strokeStyle =
                "rgba(0,246,255,.045)";

            ctx.stroke();
        }

    }


    /* =====================================
       PARTICLE CONNECTIONS
    ===================================== */

    function drawConnections() {

        const maxDistance = 120;

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const a = particles[i];
                const b = particles[j];

                const dx = a.x - b.x;
                const dy = a.y - b.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {

                    const opacity =
                        (1 - distance / maxDistance) * .15;

                    ctx.beginPath();

                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);

                    ctx.strokeStyle =
                        `rgba(0,246,255,${opacity})`;

                    ctx.stroke();
                }
            }
        }
    }


    /* =====================================
       ANIMATION LOOP
    ===================================== */

    function animate() {

        mouse.x +=
            (mouse.targetX - mouse.x) * .08;

        mouse.y +=
            (mouse.targetY - mouse.y) * .08;

        drawBackground();

        requestAnimationFrame(animate);
    }


    /* =====================================
       MOUSE
    ===================================== */

    const cursorCore =
        document.querySelector(".cursor-core");

    const cursorRing =
        document.querySelector(".cursor-ring");


    window.addEventListener("mousemove", (event) => {

        mouse.targetX = event.clientX;
        mouse.targetY = event.clientY;


        if (cursorCore) {

            cursorCore.style.left =
                event.clientX + "px";

            cursorCore.style.top =
                event.clientY + "px";

        }


        if (cursorRing) {

            cursorRing.style.left =
                event.clientX + "px";

            cursorRing.style.top =
                event.clientY + "px";

        }

    });


    /* =====================================
       HOVER CURSOR
    ===================================== */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, .glass-panel, .cyber-btn"
        );


    interactiveElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            document.body.classList.add("cursor-hover");

        });

        element.addEventListener("mouseleave", () => {

            document.body.classList.remove("cursor-hover");

        });

    });


    /* =====================================
       3D TILT
    ===================================== */

    const cards =
        document.querySelectorAll(".glass-panel");


    cards.forEach(card => {

        card.addEventListener("mousemove", (event) => {

            if (window.innerWidth < 760) return;

            const rect =
                card.getBoundingClientRect();

            const centerX =
                rect.left + rect.width / 2;

            const centerY =
                rect.top + rect.height / 2;

            const rotateX =
                (event.clientY - centerY) / 25;

            const rotateY =
                (centerX - event.clientX) / 25;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================
       HERO PARALLAX
    ===================================== */

    const heroObject =
        document.querySelector(".hero-object");


    window.addEventListener("mousemove", (event) => {

        if (!heroObject) return;

        if (window.innerWidth < 760) return;

        const x =
            (event.clientX / window.innerWidth - .5);

        const y =
            (event.clientY / window.innerHeight - .5);


        heroObject.style.transform =
            `translate(${x * 18}px, ${y * 18}px)`;

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .skill-card, .project-card, .experience-card, .soft-card"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                    }

                });

            },
            {
                threshold: .08
            }
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        revealObserver.observe(element);

    });


    /* =====================================
       VISIBLE CLASS
    ===================================== */

    const revealStyle =
        document.createElement("style");

    revealStyle.textContent = `

        .section.visible,
        .skill-card.visible,
        .project-card.visible,
        .experience-card.visible,
        .soft-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

    `;

    document.head.appendChild(revealStyle);


    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                        });

                        const active =
                            document.querySelector(
                                `.nav-menu a[href="#${entry.target.id}"]`
                            );

                        if (active) {

                            active.classList.add("active");

                        }

                    }

                });

            },
            {
                rootMargin: "-40% 0px -50% 0px"
            }
        );


    sections.forEach(section => {

        navObserver.observe(section);

    });


    /* =====================================
       RANDOM DIGITAL GLITCH
    ===================================== */

    const heroTitle =
        document.querySelector(".hero-title");


    setInterval(() => {

        if (!heroTitle) return;

        heroTitle.style.transform =
            "translateX(-2px)";

        setTimeout(() => {

            heroTitle.style.transform =
                "translateX(2px)";

        }, 40);

        setTimeout(() => {

            heroTitle.style.transform =
                "translateX(0)";

        }, 80);

    }, 5000);


    /* =====================================
       START
    ===================================== */

    resizeCanvas();
    animate();

});
