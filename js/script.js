// ===== CURSOR KUSTOM =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Hanya jalankan fungsi mouse move jika kedua elemen cursor ada
if(cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });
}

// ===== NAVBAR STICKY & BACK TO TOP =====
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    // Periksa header exists
    if(header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Periksa backToTop exists secara terpisah
    if(backToTop) {
        if (window.scrollY > 100) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

// ===== HAMBURGER MENU =====
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = document.querySelectorAll('.nav-links li');

if(burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        
        // Animasi burger
        const line1 = burger.querySelector('.line1');
        const line2 = burger.querySelector('.line2');
        const line3 = burger.querySelector('.line3');

        if(line1 && line2 && line3) {
            line1.classList.toggle('rotate1');
            line2.classList.toggle('hide');
            line3.classList.toggle('rotate2');
        }
        
        // Animasi links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}

// ===== EFEK TYPING =====
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

if(typedTextSpan && cursorSpan) {
    const textArray = ['Web Developer', 'UI/UX Designer', 'Content Creator', 'Freelancer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        try {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        } catch (error) {
            console.error('Error in typing effect:', error);
        }
    }

    function erase() {
        try {
            if (charIndex > 0) {
                if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove('typing');
                textArrayIndex++;
                if (textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        } catch (error) {
            console.error('Error in typing erase effect:', error);
        }
    }

    // Hanya mulai efek typing jika array teks tidak kosong
    if (textArray.length) setTimeout(type, newTextDelay + 250);
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            if(navLinks) navLinks.classList.remove('open');
            
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE MENU PADA SCROLL =====
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links li a');

if(sections.length > 0 && navLi.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').substring(1) === current) {
                li.classList.add('active');
            }
        });
    });
}

// ===== BACK TO TOP BUTTON =====
if(backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if(filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Tambah kelas active ke tombol yang diklik
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== ANIMASI PADA SCROLL =====
const animateElements = document.querySelectorAll('.animate');

function checkScroll() {
    if(animateElements.length > 0) {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    }
}

window.addEventListener('scroll', checkScroll);

// Periksa pada load halaman
window.addEventListener('load', checkScroll);

// ===== ANIMASI SKILL BAR =====
function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if(skillsSection && skillBars.length > 0) {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (sectionPos < screenPosition) {
            skillBars.forEach(bar => {
                try {
                    // Dapatkan nilai width dari style inline atau dari atribut data-width
                    const width = bar.style.width || bar.getAttribute('data-width');
                    
                    if(width) {
                        // Simpan nilai width asli jika belum ada
                        if(!bar.dataset.width) {
                            bar.dataset.width = width;
                        }
                        
                        // Animasi
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = bar.dataset.width;
                        }, 100);
                    }
                } catch (error) {
                    console.error('Error animating skill bar:', error);
                }
            });
        }
    }
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ===== FORMULIR KONTAK =====
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulasi pengiriman (dalam proyek sebenarnya, ini akan mengirim data ke server)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if(submitBtn) {
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Terkirim!';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 3000);
            }, 2000);
        }
    });
}

// ===== TAMBAHKAN KELAS CSS PADA BURGER MENU =====
(() => {
    if(!document.querySelector('style#burger-style')) {
        const style = document.createElement('style');
        style.id = 'burger-style';
        
        style.textContent = `
        .burger .line1.rotate1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        .burger .line2.hide {
            opacity: 0;
        }
        .burger .line3.rotate2 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        /* Style untuk mengatasi konflik kelas .cursor */
        .cursor.typing {
            animation: none !important;
            width: 3px !important;
            background-color: var(--primary-color) !important;
            position: relative !important;
            transform: none !important;
            mix-blend-mode: normal !important;
        }
        
        /* Perbaikan untuk animasi blink pada typing cursor */
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* Pastikan .cursor-follower tidak mengganggu .typed-text */
        .typed-text + .cursor {
            z-index: 1 !important;
        }
        `;
        
        document.head.appendChild(style);
    }
})(); 