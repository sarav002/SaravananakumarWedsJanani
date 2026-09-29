/* =========================================================
   WEDDING WEBSITE
   S. Saravanakumar & S. Janani
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        });

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });
    }


    /* =====================================================
       COUNTDOWN
       Target:
       1 November 2026, 6:00 AM IST

       India Standard Time = UTC+05:30
       ===================================================== */

    const targetDate = new Date(
        "2026-11-01T06:00:00+05:30"
    ).getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    const countdownElement = document.getElementById("countdown");
    const weddingDayMessage =
        document.getElementById("weddingDayMessage");


    function updateCountdown() {

        const now = Date.now();

        const difference = targetDate - now;


        /* Wedding day has arrived */
        if (difference <= 0) {

            if (countdownElement) {
                countdownElement.style.display = "none";
            }

            if (weddingDayMessage) {
                weddingDayMessage.classList.add("active");
            }

            return;
        }


        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


        if (daysElement) {
            daysElement.textContent =
                String(days).padStart(2, "0");
        }

        if (hoursElement) {
            hoursElement.textContent =
                String(hours).padStart(2, "0");
        }

        if (minutesElement) {
            minutesElement.textContent =
                String(minutes).padStart(2, "0");
        }

        if (secondsElement) {
            secondsElement.textContent =
                String(seconds).padStart(2, "0");
        }
    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

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
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }

    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    const updateActiveNavigation = () => {

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 120) {
                currentSection = section.id;
            }

        });


        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();

    window.addEventListener(
        "resize",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            navMenu &&
            menuToggle &&
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.focus();

        }

    });

});
