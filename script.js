document.addEventListener("DOMContentLoaded", function() {

    // 1. Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    });

    // 2. Mobile Hamburger Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-xmark');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    // 3. Hero Image Auto Slider
    const slides = document.querySelectorAll('.hero-image-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Changes image every 4 seconds
    }

    // 4. Scroll Fade-in Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach((el) => {
        observer.observe(el);
    });

    // 5. Automatic Document Slider Logic
    const autoSlider = document.getElementById('autoSlider');
    if (autoSlider) {
        let scrollInterval;
        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (autoSlider.scrollLeft >= (autoSlider.scrollWidth - autoSlider.clientWidth - 1)) {
                    autoSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    const itemWidth = autoSlider.querySelector('.slider-item').offsetWidth + 20;
                    autoSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });
                }
            }, 3000);
        };

        const stopAutoScroll = () => clearInterval(scrollInterval);
        startAutoScroll();

        autoSlider.addEventListener('mouseover', stopAutoScroll);
        autoSlider.addEventListener('mouseout', startAutoScroll);
        autoSlider.addEventListener('touchstart', stopAutoScroll);
        autoSlider.addEventListener('touchend', startAutoScroll);
    }

    // 6. Lightbox (Zoom) Logic
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("lightboxImg");
    const captionText = document.getElementById("lightbox-caption");

    document.querySelectorAll('.zoomable-img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex"; 
            modalImg.src = this.src;
            captionText.innerHTML = this.alt || 'चेतक FPO गैलरी';
        });
    });

    document.querySelector(".lightbox-close").onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // 7. Back to Top Button Logic
    const backToTopBtn = document.getElementById("backToTopBtn");

    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    };

    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});
