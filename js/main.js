(() => {
    const cfg = window.VDO_CONFIG || {};
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];

    const body = document.body;

    // ==================================================
    // WEBSITE THEME
    // ==================================================

    body.dataset.theme = "dark";


    // ==================================================
    // NAVIGATION TOGGLE
    // ==================================================

    const nav = $(".nav-links");
    const toggle = $(".menu-toggle");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }


    // ==================================================
    // HEADER SCROLL EFFECT
    // ==================================================

    const header = $(".site-header");

    const onScroll = () => {
        if (header) {
            header.classList.toggle("scrolled", scrollY > 30);
        }
    };

    addEventListener("scroll", onScroll, {
        passive: true
    });

    onScroll();


    // ==================================================
    // ACTIVE NAVIGATION LINK
    // ==================================================

    $$("[data-nav]").forEach(a => {

        if (
            a.getAttribute("href") ===
            location.pathname.split("/").pop()
        ) {
            a.classList.add("active");
        }

    });


    // ==================================================
    // PERMANENT HERO STYLE
    // ==================================================

    const hero = $(".hero");

    if (hero) {

        hero.classList.remove(
            "hero-showreel",
            "hero-typography",
            "hero-cinematic"
        );

        hero.classList.add("hero-cinematic");

        const label = $("[data-brand]");

        if (label) {
            label.textContent =
                cfg.brandName || "V DO MARKETING";
        }

    }


    // ==================================================
    // REVEAL ANIMATIONS
    // ==================================================

    const revealEls = $$(
        ".reveal,.service-card,.feature,.work-tile,.step,.blog-card"
    );

    revealEls.forEach((el, i) => {

        if (!el.classList.contains("reveal")) {
            el.classList.add("reveal");
        }

        el.style.transitionDelay =
            (i % 6) * 65 + "ms";

    });


    if ("IntersectionObserver" in window) {

        const io =
            new IntersectionObserver(
                entries => {

                    entries.forEach(e => {

                        if (e.isIntersecting) {

                            e.target.classList.add(
                                "visible"
                            );

                            io.unobserve(
                                e.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealEls.forEach(el => {
            io.observe(el);
        });

    } else {

        revealEls.forEach(el => {
            el.classList.add("visible");
        });

    }


    // ==================================================
    // CURSOR GLOW EFFECT
    // ==================================================

    if (
        matchMedia("(pointer:fine)").matches &&
        !matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const g =
            document.createElement("div");

        g.className =
            "cursor-glow";

        g.style.pointerEvents =
            "none";

        g.style.left =
            "0px";

        g.style.top =
            "0px";

        g.style.willChange =
            "transform";

        body.append(g);


        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let glowX =
            mouseX;

        let glowY =
            mouseY;


        window.addEventListener(
            "pointermove",
            e => {

                mouseX =
                    e.clientX;

                mouseY =
                    e.clientY;

            },
            {
                passive: true
            }
        );


        const animateGlow =
            () => {

                glowX +=
                    (mouseX - glowX) *
                    0.72;

                glowY +=
                    (mouseY - glowY) *
                    0.72;


                g.style.transform =
                    `translate3d(${glowX}px, ${glowY}px, 0)
                     translate3d(-50%, -50%, 0)`;


                requestAnimationFrame(
                    animateGlow
                );

            };


        animateGlow();


        window.addEventListener(
            "pointerleave",
            () => {
                g.style.opacity =
                    "0";
            }
        );


        window.addEventListener(
            "pointerenter",
            () => {
                g.style.opacity =
                    "1";
            }
        );

    }


    // ==================================================
    // FAQ ACCORDION
    // ==================================================

    $$(".faq-q").forEach(q => {

        q.addEventListener(
            "click",
            () => {

                q.parentElement.classList.toggle(
                    "open"
                );

            }
        );

    });


    // ==================================================
    // CONTACT FORM
    // ==================================================

    const form =
        $("[data-contact-form]");

    if (form) {

        form.addEventListener(
            "submit",
            e => {

                e.preventDefault();

                const d =
                    new FormData(form);


                const subject =
                    encodeURIComponent(
                        "Website enquiry — " +
                        (
                            d.get("name") ||
                            "New enquiry"
                        )
                    );


                const msg =
                    encodeURIComponent(
                        "Name: " +
                        d.get("name") +

                        "\nEmail: " +
                        d.get("email") +

                        "\nCompany: " +
                        d.get("company") +

                        "\nService: " +
                        d.get("service") +

                        "\n\n" +
                        d.get("message")
                    );


                location.href =
                    "mailto:" +
                    (
                        cfg.email ||
                        "hello@example.com"
                    ) +
                    "?subject=" +
                    subject +
                    "&body=" +
                    msg;

            }
        );

    }


    // ==================================================
    // DYNAMIC CONTACT DETAILS
    // ==================================================

    $$("[data-email]").forEach(el => {

        el.textContent =
            cfg.email ||
            "hello@example.com";

        el.href =
            "mailto:" +
            (
                cfg.email ||
                "hello@example.com"
            );

    });


    $$("[data-phone]").forEach(el => {

        el.textContent =
            cfg.phone ||
            "Add phone number";

        el.href =
            "tel:" +
            (
                cfg.phone ||
                ""
            ).replace(
                /\s/g,
                ""
            );

    });


    // ==================================================
    // COPYRIGHT YEAR
    // ==================================================

    $$("[data-year]").forEach(el => {

        el.textContent =
            new Date().getFullYear();

    });


    // ==================================================
    // GSAP
    // ==================================================

    const reduce =
        matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !reduce &&
        window.gsap
    ) {

        gsap.registerPlugin(
            ScrollTrigger
        );


        if (window.Lenis) {

            const lenis =
                new Lenis({
                    duration: 1.15,
                    smoothWheel: true
                });


            lenis.on(
                "scroll",
                ScrollTrigger.update
            );


            gsap.ticker.add(t => {

                lenis.raf(
                    t * 1000
                );

            });


            gsap.ticker.lagSmoothing(
                0
            );

        }


        gsap.from(
            ".hero-copy>*",
            {
                y: 35,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power3.out",
                delay: 0.15
            }
        );


        gsap.from(
            ".hero-art .art-panel",
            {
                y: 40,
                opacity: 0,
                rotate: 0,
                duration: 1.2,
                stagger: 0.16,
                ease: "power3.out",
                delay: 0.45
            }
        );

    }

})();



/* ==========================================================
   V DO MIRROR HALL
   SMOOTH AUTO + MOUSE DRAG SLIDER
========================================================== */


(() => {

    const root =
        document.querySelector(
            "#vdo-mirror-portfolio"
        );

    if (!root) return;


    // ======================================================
    // ELEMENTS
    // ======================================================

    const cards =
        [
            ...root.querySelectorAll(
                ".vmp-card"
            )
        ];

    const gallery =
        root.querySelector(
            "#vmpGallery"
        );

    const title =
        root.querySelector(
            "#vmpTitle"
        );

    const category =
        root.querySelector(
            "#vmpCategory"
        );

    const count =
        root.querySelector(
            "#vmpCount"
        );

    const progress =
        root.querySelector(
            ".vmp-progress-fill"
        );

    const previous =
        root.querySelector(
            "#vmpPrev"
        );

    const next =
        root.querySelector(
            "#vmpNext"
        );


    if (
        !cards.length ||
        !gallery
    ) {
        return;
    }


    // ======================================================
    // SETTINGS
    // ======================================================

    let active = 0;

    let timer = null;

    let isHovering = false;

    let isDragging = false;

    let dragMoved = false;

    let suppressClick = false;

    let dragStartX = 0;

    let dragCurrentX = 0;

    let lastPointerX = 0;

    let velocity = 0;

    let dragOffset = 0;


    const interval =
        2500;


    const dragThreshold =
        55;


    const snapDuration =
        420;


    // ======================================================
    // CARD SPACING
    // ======================================================

    function getCardSpacing() {

        return window.innerWidth <= 700
            ? 145
            : 205;

    }


    // ======================================================
    // GET CIRCULAR OFFSET
    // ======================================================

    function getOffset(index) {

        let offset =
            index - active;


        if (
            offset >
            cards.length / 2
        ) {

            offset -=
                cards.length;

        }


        if (
            offset <
            -cards.length / 2
        ) {

            offset +=
                cards.length;

        }


        return offset;

    }


    // ======================================================
    // RENDER CARDS
    // ======================================================

    function render(
        extraOffset = 0
    ) {

        const spacing =
            getCardSpacing();


        const mobile =
            window.innerWidth <= 700;


        cards.forEach(
            (card, index) => {

                const baseOffset =
                    getOffset(
                        index
                    );


                /*
                 * This is the important part.
                 *
                 * During drag the entire carousel
                 * follows the mouse position.
                 */

                const visualOffset =
                    baseOffset +
                    (
                        extraOffset /
                        spacing
                    );


                const distance =
                    Math.abs(
                        visualOffset
                    );


                const x =
                    visualOffset *
                    spacing;


                const z =
                    -distance *
                    (
                        mobile
                            ? 75
                            : 105
                    );


                const rotate =
                    visualOffset *
                    -23;


                const scale =
                    Math.max(
                        0.68,
                        1 -
                        distance *
                        0.105
                    );


                const opacity =
                    distance > 3
                        ? 0
                        : Math.max(
                            0,
                            1 -
                            distance *
                            0.13
                        );


                const zIndex =
                    Math.round(
                        10 -
                        distance
                    );


                card.style.setProperty(
                    "--vmp-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--vmp-z",
                    `${z}px`
                );


                card.style.setProperty(
                    "--vmp-rotate",
                    `${rotate}deg`
                );


                card.style.setProperty(
                    "--vmp-scale",
                    scale
                );


                card.style.setProperty(
                    "--vmp-opacity",
                    opacity
                );


                card.style.setProperty(
                    "--vmp-zindex",
                    zIndex
                );


                card.style.setProperty(
                    "--vmp-brightness",
                    Math.abs(
                        visualOffset
                    ) < 0.5
                        ? "1"
                        : ".65"
                );


                if (
                    !isDragging
                ) {

                    card.classList.toggle(
                        "is-active",
                        baseOffset === 0
                    );


                    card.setAttribute(
                        "aria-current",
                        baseOffset === 0
                            ? "true"
                            : "false"
                    );

                }

            }
        );


        const selected =
            cards[active];


        if (title) {

            title.textContent =
                selected.dataset.title ||
                "Selected Project";

        }


        if (category) {

            category.textContent =
                selected.dataset.category ||
                "CREATIVE";

        }


        if (count) {

            count.innerHTML =
                `${String(active + 1).padStart(2, "0")}
                 <i>/ ${String(cards.length).padStart(2, "0")}</i>`;

        }

    }


    // ======================================================
    // PROGRESS BAR
    // ======================================================

    function animateProgress() {

        if (!progress) {
            return;
        }


        progress.style.transition =
            "none";

        progress.style.width =
            "0%";


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        if (
                            isHovering ||
                            isDragging ||
                            document.hidden
                        ) {
                            return;
                        }


                        progress.style.transition =
                            `width ${interval}ms linear`;


                        progress.style.width =
                            "100%";

                    }
                );

            }
        );

    }


    // ======================================================
    // STOP AUTO SLIDE
    // ======================================================

    function stopTimer() {

        clearInterval(
            timer
        );

        timer = null;


        if (progress) {

            progress.style.transition =
                "none";

            progress.style.width =
                "0%";

        }

    }


    // ======================================================
    // START AUTO SLIDE
    // ======================================================

    function startTimer() {

        stopTimer();


        if (
            isHovering ||
            isDragging ||
            document.hidden
        ) {
            return;
        }


        animateProgress();


        timer =
            setInterval(
                () => {

                    active =
                        (
                            active + 1
                        ) %
                        cards.length;


                    render();

                    playAllVideos();

                    animateProgress();

                },
                interval
            );

    }


    // ======================================================
    // GO TO CARD
    // ======================================================

    function goTo(
        index
    ) {

        active =
            (
                index +
                cards.length
            ) %
            cards.length;


        dragOffset = 0;


        render();

        playAllVideos();

        startTimer();

    }


    // ======================================================
    // PREVIOUS BUTTON
    // ======================================================

    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                goTo(
                    active - 1
                );

            }
        );

    }


    // ======================================================
    // NEXT BUTTON
    // ======================================================

    if (next) {

        next.addEventListener(
            "click",
            () => {

                goTo(
                    active + 1
                );

            }
        );

    }


    // ======================================================
    // MOUSE DOWN
    // ======================================================

    gallery.addEventListener(
        "pointerdown",
        e => {

            /*
             * Only left mouse button.
             */

            if (
                e.pointerType === "mouse" &&
                e.button !== 0
            ) {
                return;
            }


            isDragging =
                true;


            dragMoved =
                false;


            suppressClick =
                false;


            dragStartX =
                e.clientX;


            dragCurrentX =
                e.clientX;


            lastPointerX =
                e.clientX;


            dragOffset =
                0;


            velocity =
                0;


            stopTimer();


            gallery.style.cursor =
                "grabbing";


            /*
             * Remove transition during
             * direct mouse movement.
             */

            cards.forEach(
                card => {

                    card.style.transition =
                        "none";

                }
            );


            try {

                gallery.setPointerCapture(
                    e.pointerId
                );

            } catch (_) {}

        }
    );


    // ======================================================
    // MOUSE MOVE
    // ======================================================

    gallery.addEventListener(
        "pointermove",
        e => {

            if (
                !isDragging
            ) {
                return;
            }


            const currentX =
                e.clientX;


            const movement =
                currentX -
                lastPointerX;


            /*
             * Smooth velocity.
             */

            velocity =
                (
                    velocity * 0.65
                ) +
                (
                    movement * 0.35
                );


            lastPointerX =
                currentX;


            dragCurrentX =
                currentX;


            const totalMovement =
                dragCurrentX -
                dragStartX;


            if (
                Math.abs(
                    totalMovement
                ) > 6
            ) {

                dragMoved =
                    true;

                suppressClick =
                    true;

            }


            /*
             * The cards directly follow
             * the mouse.
             */

            dragOffset =
                totalMovement;


            render(
                dragOffset
            );

        },
        {
            passive: true
        }
    );


    // ======================================================
    // SMOOTH SNAP AFTER DRAG
    // ======================================================

    function smoothSnap(
        start,
        end,
        callback
    ) {

        const startTime =
            performance.now();


        function animate(
            now
        ) {

            const elapsed =
                now -
                startTime;


            const t =
                Math.min(
                    1,
                    elapsed /
                    snapDuration
                );


            /*
             * Smooth ease-out.
             */

            const eased =
                1 -
                Math.pow(
                    1 - t,
                    4
                );


            dragOffset =
                start +
                (
                    end -
                    start
                ) *
                eased;


            render(
                dragOffset
            );


            if (
                t < 1
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                dragOffset =
                    0;

                callback();

            }

        }


        requestAnimationFrame(
            animate
        );

    }


    // ======================================================
    // MOUSE UP
    // ======================================================

    function finishDrag(
        e
    ) {

        if (
            !isDragging
        ) {
            return;
        }


        const distance =
            dragCurrentX -
            dragStartX;


        const spacing =
            getCardSpacing();


        /*
         * Add a small amount of momentum.
         */

        const momentum =
            velocity * 8;


        let finalDistance =
            distance +
            momentum;


        /*
         * Prevent excessive movement.
         */

        finalDistance =
            Math.max(
                -300,
                Math.min(
                    300,
                    finalDistance
                )
            );


        /*
         * LEFT
         * -> NEXT CARD
         */

        if (
            finalDistance <
            -dragThreshold
        ) {

            const start =
                finalDistance;


            const end =
                -spacing;


            active =
                (
                    active + 1
                ) %
                cards.length;


            smoothSnap(
                start,
                end,
                () => {

                    isDragging =
                        false;

                    velocity =
                        0;

                    gallery.style.cursor =
                        "";

                    render();

                    playAllVideos();

                    startTimer();

                }
            );

        }


        /*
         * RIGHT
         * -> PREVIOUS CARD
         */

        else if (
            finalDistance >
            dragThreshold
        ) {

            const start =
                finalDistance;


            const end =
                spacing;


            active =
                (
                    active -
                    1 +
                    cards.length
                ) %
                cards.length;


            smoothSnap(
                start,
                end,
                () => {

                    isDragging =
                        false;

                    velocity =
                        0;

                    gallery.style.cursor =
                        "";

                    render();

                    playAllVideos();

                    startTimer();

                }
            );

        }


        /*
         * Not enough movement.
         * Return smoothly to current card.
         */

        else {

            const start =
                finalDistance;


            smoothSnap(
                start,
                0,
                () => {

                    isDragging =
                        false;

                    velocity =
                        0;

                    gallery.style.cursor =
                        "";

                    render();

                    startTimer();

                }
            );

        }


        if (e) {

            try {

                gallery.releasePointerCapture(
                    e.pointerId
                );

            } catch (_) {}

        }

    }


    gallery.addEventListener(
        "pointerup",
        finishDrag
    );


    gallery.addEventListener(
        "pointercancel",
        finishDrag
    );


    // ======================================================
    // CURSOR STYLE
    // ======================================================

    gallery.addEventListener(
        "mouseenter",
        () => {

            if (
                !isDragging
            ) {

                gallery.style.cursor =
                    "grab";

            }

        }
    );


    gallery.addEventListener(
        "mouseleave",
        () => {

            if (
                !isDragging
            ) {

                gallery.style.cursor =
                    "";

            }

        }
    );


    // ======================================================
    // PREVENT ACCIDENTAL LINK CLICK
    // ======================================================

    cards.forEach(
        card => {

            card.addEventListener(
                "click",
                e => {

                    if (
                        suppressClick
                    ) {

                        e.preventDefault();

                        e.stopPropagation();

                        suppressClick =
                            false;

                    }

                },
                true
            );

        }
    );


    // ======================================================
    // HOVER BEHAVIOUR
    // ======================================================

    cards.forEach(
        card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    isHovering =
                        true;

                    stopTimer();

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    isHovering =
                        false;


                    if (
                        !isDragging
                    ) {

                        startTimer();

                    }

                }
            );

        }
    );


    // ======================================================
    // PLAY ALL VIDEOS
    // ======================================================

    function playAllVideos() {

        cards.forEach(
            card => {

                const video =
                    card.querySelector(
                        "video"
                    );


                if (!video) {
                    return;
                }


                video.muted =
                    true;

                video.defaultMuted =
                    true;

                video.loop =
                    true;

                video.playsInline =
                    true;


                if (
                    video.paused
                ) {

                    const promise =
                        video.play();


                    if (
                        promise &&
                        promise.catch
                    ) {

                        promise.catch(
                            () => {}
                        );

                    }

                }

            }
        );

    }


    // ======================================================
    // VIDEO SETUP
    // ======================================================

    cards.forEach(
        card => {

            const video =
                card.querySelector(
                    "video"
                );


            if (!video) {
                return;
            }


            video.muted =
                true;

            video.defaultMuted =
                true;

            video.loop =
                true;

            video.playsInline =
                true;


            video.setAttribute(
                "muted",
                ""
            );

            video.setAttribute(
                "autoplay",
                ""
            );

            video.setAttribute(
                "playsinline",
                ""
            );

            video.setAttribute(
                "loop",
                ""
            );


            video.addEventListener(
                "loadeddata",
                () => {

                    const promise =
                        video.play();


                    if (
                        promise &&
                        promise.catch
                    ) {

                        promise.catch(
                            () => {}
                        );

                    }

                }
            );

        }
    );


    // ======================================================
    // RESIZE
    // ======================================================

    window.addEventListener(
        "resize",
        () => {

            if (
                !isDragging
            ) {

                render();

            }

        }
    );


    // ======================================================
    // TAB VISIBILITY
    // ======================================================

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                stopTimer();


                cards.forEach(
                    card => {

                        const video =
                            card.querySelector(
                                "video"
                            );


                        if (video) {
                            video.pause();
                        }

                    }
                );

            } else {

                playAllVideos();

                startTimer();

            }

        }
    );


    // ======================================================
    // INITIAL SETUP
    // ======================================================

    render();

    playAllVideos();

    startTimer();

})();