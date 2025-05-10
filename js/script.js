// ===== CURSOR KUSTOM =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 50);
});

// ===== NAVBAR STICKY =====
const header = document.querySelector('header');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('show');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('show');
    }
});

// ===== HAMBURGER MENU =====
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const links = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    
    // Animasi burger
    burger.querySelector('.line1').classList.toggle('rotate1');
    burger.querySelector('.line2').classList.toggle('hide');
    burger.querySelector('.line3').classList.toggle('rotate2');
    
    // Animasi links
    links.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// ===== EFEK TYPING =====
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Web Developer', 'UI/UX Designer', 'Content Creator', 'Freelancer'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
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
}

if (textArray.length) setTimeout(type, newTextDelay + 250);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            navLinks.classList.remove('open');
            
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

// ===== BACK TO TOP BUTTON =====
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

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

// ===== ANIMASI PADA SCROLL =====
const animateElements = document.querySelectorAll('.animate');

function checkScroll() {
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

window.addEventListener('scroll', checkScroll);

// Periksa pada load halaman
checkScroll();

// ===== ANIMASI SKILL BAR =====
function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (sectionPos < screenPosition) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('style').match(/width: (\d+)%/)[1];
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 100);
        });
    }
}

window.addEventListener('scroll', animateSkills);

// ===== FORMULIR KONTAK =====
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulasi pengiriman (dalam proyek sebenarnya, ini akan mengirim data ke server)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
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
    });
}

// ===== PRELOADER =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('preloader-finish');
    }
});

// ===== TAMBAHKAN KELAS CSS PADA BURGER MENU =====
(() => {
    const burger = document.querySelector('.burger');
    const line1 = document.createElement('style');
    
    line1.textContent = `
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
    `;
    
    document.head.appendChild(line1);
})(); 