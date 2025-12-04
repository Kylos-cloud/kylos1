// Locomotive Scroll with GSAP ScrollTrigger
function loco(){
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        smoothMobile: false,
        multiplier: 0.8,
    });
    
    // Sync Locomotive Scroll with ScrollTrigger
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length 
                ? locoScroll.scrollTo(value, 0, 0) 
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0, 
                left: 0, 
                width: window.innerWidth, 
                height: window.innerHeight
            };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
loco();

// Swiper Slider Configuration
var swiper = new Swiper(".mySwiper", {
    slidesPerView: "1.2",
    centeredSlides: true,
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: true,
    loop: true,
    breakpoints: {
        640: {
            slidesPerView: 1.5,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 20,
        },
    }
});

// Mobile Menu Toggle
var menu = document.querySelector(".ri-menu-line");
var close = document.querySelector(".ri-close-line");
var navbar = document.querySelector(".subnav");

if (menu) {
    menu.addEventListener("click", function(){
        navbar.style.display = "flex";
        setTimeout(() => {
            navbar.style.top = "0%";
        }, 10);
    });
}

if (close) {
    close.addEventListener("click", function(){
        navbar.style.top = "-109%";
        setTimeout(() => {
            navbar.style.display = "none";
        }, 400);
    });
}

// Store Menu Hover/Click
var Store = document.querySelector("#Store");
var hovermenu = document.querySelector(".nav3");
var navBottom = document.querySelector(".nav-bottom");
var isMenuOpen = false;

if (Store && hovermenu) {
    // Desktop: Hover behavior
    Store.addEventListener("mouseenter", function(){
        hovermenu.style.top = "44px";
        hovermenu.style.pointerEvents = "all";
        isMenuOpen = true;
    });

    hovermenu.addEventListener("mouseenter", function(){
        isMenuOpen = true;
    });

    hovermenu.addEventListener("mouseleave", function(){
        hovermenu.style.top = "-100%";
        hovermenu.style.pointerEvents = "none";
        isMenuOpen = false;
    });

    Store.addEventListener("mouseleave", function(){
        setTimeout(() => {
            if (!isMenuOpen) {
                hovermenu.style.top = "-100%";
                hovermenu.style.pointerEvents = "none";
            }
        }, 100);
    });

    // Mobile/Tablet: Click behavior
    Store.addEventListener("click", function(e){
        e.preventDefault();
        if (window.innerWidth <= 768) {
            if (hovermenu.style.top === "44px") {
                hovermenu.style.top = "-100%";
                hovermenu.style.pointerEvents = "none";
            } else {
                hovermenu.style.top = "44px";
                hovermenu.style.pointerEvents = "all";
            }
        }
    });

    // Close menu when clicking the blurred bottom area
    if (navBottom) {
        navBottom.addEventListener("click", function(){
            hovermenu.style.top = "-100%";
            hovermenu.style.pointerEvents = "none";
        });
    }
}

// Close menus with Escape key
document.addEventListener("keydown", function(e){
    if (e.key === "Escape") {
        // Close store menu
        if (hovermenu) {
            hovermenu.style.top = "-100%";
            hovermenu.style.pointerEvents = "none";
        }
        // Close mobile menu
        if (navbar) {
            navbar.style.top = "-109%";
            setTimeout(() => {
                navbar.style.display = "none";
            }, 400);
        }
    }
});

// Navbar scroll effect
var nav = document.querySelector("nav");
var lastScroll = 0;

window.addEventListener("scroll", function(){
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.92)";
    } else {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }
    
    lastScroll = currentScroll;
});

// GSAP Scroll Animations (Optional)
// Animate hero sections on scroll
gsap.utils.toArray('.hero-section').forEach((section, i) => {
    const text = section.querySelector('.hero-section-p');
    
    if (text) {
        gsap.from(text, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                scroller: "#main",
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse"
            }
        });
    }
});

// Log success
console.log("🍎 Apple Clone JavaScript loaded successfully!");