console.log('write: \"startGame()\"');

document.addEventListener('DOMContentLoaded', function() {
    const brandItems = document.querySelectorAll('.brand-item');
    
    brandItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const background = document.querySelector('body');
        background.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
    });
    
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

    document.querySelectorAll('.brand-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
                
            // Добавляем анимацию перехода
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease';
                
            // Переход после завершения анимации
            setTimeout(() => {
                window.location.href = url;
            }, 400);
        });
    })

});

function startGame() {
    window.location.href = './secret.html'
}