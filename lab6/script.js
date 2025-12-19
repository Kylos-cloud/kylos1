const menuBtn = document.querySelector(".ri-menu-line");
const closeBtn = document.querySelector(".ri-close-line");
const mobileMenu = document.querySelector(".subnav");
const navBottom = document.querySelector(".nav-bottom");
const navItems = document.querySelector('.nav-items');

const storeBtn = document.getElementById("Store");
const storeMenu = document.querySelector(".nav3");

let isOpen = false;

function openMenu() {
    if (isOpen) return;
    storeMenu.classList.add("active");
    storeMenu.classList.add("nav-up");
    nav2.classList.add("nav-hidden");
    isOpen = true;
}

function closeMenu() {
    if (!isOpen) return;
    storeMenu.classList.remove("active");
    storeMenu.classList.remove("nav-up");
    nav2.classList.remove("nav-hidden");
    isOpen = false;
}


storeBtn.addEventListener("mouseenter", openMenu);

storeMenu.addEventListener("mouseenter", openMenu);

storeBtn.addEventListener("mouseleave", (e) => {
    if (!storeMenu.contains(e.relatedTarget)) {
        closeMenu();
    }
});

storeMenu.addEventListener("mouseleave", (e) => {
    if (!storeBtn.contains(e.relatedTarget)) {
        closeMenu();
    }
});

let lastScrollY = window.scrollY;
const nav = document.querySelector("nav");
const nav2 = document.querySelector(".nav2");

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 80) {
        nav.classList.add("nav-hidden");
        nav2.classList.add("nav-hidden");
    }
    else {
        nav.classList.remove("nav-hidden");
        nav2.classList.remove("nav-hidden");
    }

    lastScrollY = currentScrollY;
});

const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 800,

    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

