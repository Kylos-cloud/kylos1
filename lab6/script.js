// ================================
// LOCOMOTIVE SCROLL + GSAP
// ================================
gsap.registerPlugin(ScrollTrigger);

// 1. Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 0.8,
});

// 2. Sync Locomotive Scroll with ScrollTrigger
locoScroll.on("scroll", ScrollTrigger.update);

// 3. Define the Scroller Proxy
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length
            ? locoScroll.scrollTo(value, 0, 0) // Scroll to value, 0 offset, 0 duration (instant)
            : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    // Pinning works differently on mobile/desktop depending on transforms
    pinType: document.querySelector("#main").style.transform
        ? "transform"
        : "fixed",
});

// 4. IMPORTANT: Tell ScrollTrigger to use "#main" for all triggers by default
// Without this, GSAP looks for window scroll, which never happens!
ScrollTrigger.defaults({
    scroller: "#main",
});

// 5. Refresh ScrollTrigger when Locomotive updates
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// 6. Refresh everything now that setup is complete
ScrollTrigger.refresh();

// ================================
// NAVBAR BACKGROUND ON SCROLL
// ================================
const nav = document.querySelector("nav");

locoScroll.on("scroll", (obj) => {
    if (obj.scroll.y > 50) {
        nav.classList.add("nav-dark");
    } else {
        nav.classList.remove("nav-dark");
    }
});

// ================================
// MOBILE MENU
// ================================
const menuBtn = document.querySelector(".ri-menu-line");
const closeBtn = document.querySelector(".ri-close-line");
const mobileMenu = document.querySelector(".subnav");

menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.add("active");
});

closeBtn?.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
});

// ESC key support
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        mobileMenu.classList.remove("active");
        if (storeMenu) storeMenu.classList.remove("active");
    }
});

// ================================
// STORE MENU (DESKTOP + MOBILE)
// ================================
const storeBtn = document.querySelector("#Store");
const storeMenu = document.querySelector(".nav3");
const navBottom = document.querySelector(".nav-bottom");

// Desktop hover
storeBtn?.addEventListener("mouseenter", () => {
    if (window.innerWidth > 768) {
        storeMenu.classList.add("active");
    }
});

storeMenu?.addEventListener("mouseleave", () => {
    storeMenu.classList.remove("active");
});

// Mobile click
storeBtn?.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        storeMenu.classList.toggle("active");
    }
});

navBottom?.addEventListener("click", () => {
    storeMenu.classList.remove("active");
});

// ================================
// SWIPER (APPLE STYLE)
// ================================
const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 800,
    slidesPerView: 1,
    centeredSlides: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    keyboard: {
        enabled: true,
    },
});

// ================================
// SLIDER HEIGHT (RESPONSIVE)
// ================================
function updateSliderHeight() {
    const slider = document.querySelector(".apple-slider");
    if (slider) slider.style.height = window.innerHeight + "px";
}

updateSliderHeight();
window.addEventListener("resize", updateSliderHeight);

console.log("🍎 Fixed Scroll Proxy JS Loaded");