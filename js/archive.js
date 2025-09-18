console.log('write: \"startGame()\"');

document.addEventListener('DOMContentLoaded', function() {
    const snapContainer = document.querySelector('.archive-snap-container');
    const sections = document.querySelectorAll('.snap-section');
    const dots = createNavigationDots();
    let isScrolling = false;
    let currentSection = 0;

    enableScroll();

    // Create navigation dots
    function createNavigationDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'navigation-dots';

        sections.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');

            dot.addEventListener('click', () => {
                scrollToSection(index);
            });

            dotsContainer.appendChild(dot);
        });

        document.body.appendChild(dotsContainer);
        return dotsContainer.querySelectorAll('.dot');
    }
    
    // Scroll to specific section
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        currentSection = index;
        sections[index].scrollIntoView({ behavior: 'smooth' });
        updateActiveDot(index);
    }
    
    // Update active navigation dot
    function updateActiveDot(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Handle wheel event for section navigation
    snapContainer.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        
        // Prevent default scrolling
        e.preventDefault();
        
        // Determine scroll direction
        const delta = Math.sign(e.deltaY);
        
        if (delta > 0) {
            // Scroll down - next section
            if (currentSection < sections.length - 1) {
                isScrolling = true;
                scrollToSection(currentSection + 1);
            }
        } else {
            // Scroll up - previous section
            if (currentSection > 0) {
                isScrolling = true;
                scrollToSection(currentSection - 1);
            }
        }
        
        // Reset scrolling flag after animation completes
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    }, { passive: false });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }
    });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    
    snapContainer.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    snapContainer.addEventListener('touchend', function(e) {
        if (isScrolling) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        // Minimum swipe distance
        if (Math.abs(deltaY) > 50) {
            if (deltaY > 0) {
                // Swipe up - next section
                if (currentSection < sections.length - 1) {
                    isScrolling = true;
                    scrollToSection(currentSection + 1);
                }
            } else {
                // Swipe down - previous section
                if (currentSection > 0) {
                    isScrolling = true;
                    scrollToSection(currentSection - 1);
                }
            }
            
            // Reset scrolling flag after animation completes
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }, { passive: true });
    
    // Intersection Observer for active section detection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                currentSection = index;
                updateActiveDot(index);
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Parallax effect for background
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.body.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
    });
});

function startGame() {
    window.location.href = './secret.html'
}