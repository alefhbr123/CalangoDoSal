// Navigation functionality
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');

// Handle scroll for header background
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just the logo link
        if (this.classList.contains('logo')) {
            e.preventDefault();
            document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        // Only prevent default for non-nav links
        if (!this.classList.contains('nav-link') && !this.classList.contains('social-link')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Back to top button
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections for animation
const aboutContent = document.querySelector('.about-content');
const aboutImage = document.querySelector('.about-image');

if (aboutContent) {
    aboutContent.style.opacity = '0';
    aboutContent.style.transform = 'translateX(48px)';
    aboutContent.style.transition = 'all 1s ease';
    observer.observe(aboutContent);
}

if (aboutImage) {
    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'translateX(-48px)';
    aboutImage.style.transition = 'all 1s ease';
    observer.observe(aboutImage);
}

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    const button = contactForm.querySelector('.submit-button');
    const originalText = button.textContent;
    
    try {
        button.classList.add('loading');
        button.textContent = 'Enviando...';
        
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success message
        button.textContent = '✓ Enviado com Sucesso!';
        button.style.backgroundColor = 'var(--accent)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.classList.remove('loading');
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
        
    } catch (error) {
        console.error('Error:', error);
        button.textContent = '✗ Erro ao enviar';
        button.style.backgroundColor = 'var(--destructive)';
        
        setTimeout(() => {
            button.classList.remove('loading');
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    }
});

// Add smooth scroll behavior polyfill check
if (!CSS.supports('scroll-behavior', 'smooth')) {
    // Fallback for browsers that don't support smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';
}

// Lazy load images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
});

// Utility function to close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container') && !e.target.closest('.mobile-menu')) {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Handle window resize to close mobile menu on larger screens
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Prevent form submission if fields are empty
contactForm.addEventListener('change', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    const button = contactForm.querySelector('.submit-button');
    button.disabled = !(name && email && phone && message);
});
