// ================================
// GLOBAL ELEMENTS (MUST BE FIRST)
// ================================
const nav = document.querySelector("nav");
const menuBtn = document.querySelector(".ri-menu-line");
const closeBtn = document.querySelector(".ri-close-line");
const mobileMenu = document.querySelector(".subnav");
const storeBtn = document.querySelector("#Store");
const storeMenu = document.querySelector(".nav3");
const navBottom = document.querySelector(".nav-bottom");

// ================================
// LOCOMOTIVE SCROLL + GSAP
// ================================
gsap.registerPlugin(ScrollTrigger);

const scrollContainer = document.querySelector("#main");

// Initialize Locomotive Scroll
const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 0.8,
    smartphone: { smooth: true },
    tablet: { smooth: true },
});

// GSAP <-> Locomotive bridge
ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
        if (arguments.length) {
            locoScroll.scrollTo(value, { duration: 0, disableLerp: true });
        } else {
            return locoScroll.scroll.instance.scroll.y;
        }
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    pinType:
        getComputedStyle(scrollContainer).transform !== "none"
            ? "transform"
            : "fixed",
});

// Use #main as default scroller
ScrollTrigger.defaults({
    scroller: scrollContainer,
});

// Scroll events
locoScroll.on("scroll", (obj) => {
    ScrollTrigger.update();
    nav?.classList.toggle("nav-dark", obj.scroll.y > 50);
});

// Keep everything in sync
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
