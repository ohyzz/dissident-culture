// about.js - JavaScript specific to the About page

document.addEventListener('DOMContentLoaded', function() {
    // Animation for brand items
    const brandItems = document.querySelectorAll('.brand-item');
    
    brandItems.forEach((item, index) => {
        // Staggered animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const background = document.querySelector('body');
        background.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
    });
    
    // Text animation
    const aboutText = document.querySelector('.about-text');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutText.style.opacity = '1';
                aboutText.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });
    
    aboutText.style.opacity = '0';
    aboutText.style.transform = 'translateY(20px)';
    aboutText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(aboutText);
});