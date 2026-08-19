/* =========================================================
   PRABU.J — FUTURISTIC LIVE INTERFACE
========================================================= */


/* =========================================================
   CANVAS — LIVE PARTICLE / DIGITAL SPACE
========================================================= */

const canvas =
    document.getElementById("spaceCanvas");

const ctx =
    canvas.getContext("2d");


let particles = [];

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};


function resizeCanvas() {

    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================================
   PARTICLES
========================================================= */

function createParticles() {

    particles = [];

    const amount =
        Math.min(
            140,
            Math.floor(
                window.innerWidth / 9
            )
        );


    for (let i = 0; i < amount; i++) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() * 1.7 + 0.3,

            speed:
                Math.random() * 0.25 + 0.05,

            drift:
                Math.random() * 0.5 - 0.25,

            alpha:
                Math.random() * 0.5 + 0.15

        });

    }

}


createParticles();


function drawParticles() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    particles.forEach((particle) => {

        particle.y -= particle.speed;

        particle.x += particle.drift;


        if (particle.y < -10) {

            particle.y =
                window.innerHeight + 10;

        }


        if (particle.x < -10) {

            particle.x =
                window.innerWidth + 10;

        }


        if (particle.x >
            window.innerWidth + 10) {

            particle.x = -10;

        }


        const distanceX =
            particle.x - mouse.x;

        const distanceY =
            particle.y - mouse.y;

        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        let glow =
            particle.alpha;


        if (distance < 180) {

            glow +=
                (180 - distance) /
                600;

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
            `rgba(0,234,255,${glow})`;


        ctx.fill();

    });


    requestAnimationFrame(
        drawParticles
    );

}


drawParticles();


/* =========================================================
   MOUSE TRACKING
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        mouse.x =
            event.clientX;

        mouse.y =
            event.clientY;

    }
);


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


let cursorX =
    window.innerWidth / 2;

let cursorY =
    window.innerHeight / 2;

let currentX =
    cursorX;

let currentY =
    cursorY;


document.addEventListener(
    "mousemove",
    (event) => {

        cursorX =
            event.clientX;

        cursorY =
            event.clientY;

    }
);


function animateCursor() {

    currentX +=
        (cursorX - currentX) *
        0.12;

    currentY +=
        (cursorY - currentY) *
        0.12;


    cursorGlow.style.left =
        currentX + "px";

    cursorGlow.style.top =
        currentY + "px";


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================================================
   3D TILT EFFECT
========================================================= */

const cards =
    document.querySelectorAll(
        ".glass-panel"
    );


cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                centerY) *
                -2.5;


            const rotateY =
                ((x - centerX) /
                centerX) *
                2.5;


            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-7px)`;

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


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   NAV ACTIVE SECTION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


window.addEventListener(
    "scroll",
    () => {

        let currentSection = "";


        sections.forEach(
            (section) => {

                const sectionTop =
                    section.offsetTop - 180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navItems.forEach(
            (link) => {

                link.style.color =
                    "rgba(255,255,255,0.65)";


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    "#" + currentSection
                ) {

                    link.style.color =
                        "#00eaff";

                }

            }
        );

    }
);


/* =========================================================
   MAGNETIC BUTTON EFFECT
========================================================= */

const buttons =
    document.querySelectorAll(
        ".neon-button"
    );


buttons.forEach(
    (button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

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
                    `translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   REDUCE MOTION ACCESSIBILITY
========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


if (
    prefersReducedMotion.matches
) {

    document.documentElement.style
        .scrollBehavior = "auto";

}
