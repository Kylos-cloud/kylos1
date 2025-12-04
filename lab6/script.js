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

// Apple Style Swiper Slider - Full Screen
var swiper = new Swiper(".mySwiper", {
    // Apple-style parameters
    direction: 'horizontal',
    loop: true,
    speed: 800,
    grabCursor: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
    
    // Autoplay
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    
    // Navigation
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    // Pagination
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        },
    },
    
    // Effects
    effect: 'slide',
    keyboard: {
        enabled: true,
    },
    
    // Touch interactions
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    
    // Responsive breakpoints
    breakpoints: {
        // Mobile
        320: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        // Tablet
        768: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        // Desktop
        1024: {
            slidesPerView: 1,
            spaceBetween: 0,
        }
    },
    
    // Callbacks
    on: {
        init: function () {
            console.log("🍎 Apple Slider initialized");
        },
        slideChange: function () {
            console.log("Slide changed to: ", this.activeIndex);
        }
    }
});

// Custom navigation button styling
function styleSwiperButtons() {
    const nextBtn = document.querySelector('.swiper-button-next');
    const prevBtn = document.querySelector('.swiper-button-prev');
    
    if (nextBtn && prevBtn) {
        // Apple-style navigation buttons
        [nextBtn, prevBtn].forEach(btn => {
            btn.style.width = '44px';
            btn.style.height = '44px';
            btn.style.borderRadius = '50%';
            btn.style.background = 'rgba(0, 0, 0, 0.3)';
            btn.style.backdropFilter = 'saturate(180%) blur(20px)';
            btn.style.transition = 'all 0.3s ease';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            
            // Hover effect
            btn.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(0, 0, 0, 0.5)';
                this.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(0, 0, 0, 0.3)';
                this.style.transform = 'scale(1)';
            });
        });
        
        // Position buttons
        nextBtn.style.right = '20px';
        prevBtn.style.left = '20px';
    }
}

// Initialize button styling when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    styleSwiperButtons();
    
    // Re-style buttons after Swiper initialization
    setTimeout(styleSwiperButtons, 100);
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

// GSAP Scroll Animations for Apple-style slider
gsap.utils.toArray('.apple-slide').forEach((slide, i) => {
    const content = slide.querySelector('.slide-content');
    
    if (content) {
        // Initial animation when slide becomes active
        gsap.from(content, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
        });
        
        // Animation on scroll (if you want additional effects)
        gsap.from(content, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: slide,
                scroller: "#main",
                start: "top 80%",
                end: "top 30%",
                toggleActions: "play none none reverse",
                // Only trigger once
                once: true
            }
        });
    }
});

// Pause autoplay when hovering over slider
const sliderContainer = document.querySelector('.apple-slider');
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', function() {
        if (swiper.autoplay.running) {
            swiper.autoplay.stop();
            console.log("Autoplay paused");
        }
    });
    
    sliderContainer.addEventListener('mouseleave', function() {
        if (!swiper.autoplay.running) {
            swiper.autoplay.start();
            console.log("Autoplay resumed");
        }
    });
}

// Update slider height on window resize
function updateSliderHeight() {
    const slider = document.querySelector('.apple-slider');
    if (slider) {
        slider.style.height = window.innerHeight + 'px';
    }
}

// Set initial height and update on resize
updateSliderHeight();
window.addEventListener('resize', updateSliderHeight);

// Log success
console.log("🍎 Apple Clone JavaScript loaded successfully with full-screen slider!");