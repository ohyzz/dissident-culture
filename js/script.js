document.addEventListener('DOMContentLoaded', function() {
    const verticalBars = document.getElementById('verticalBars');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    verticalBars.addEventListener('click', function() {
        sideMenu.classList.add('active');
    });
    
    closeMenu.addEventListener('click', function() {
        sideMenu.classList.remove('active');
    });
    

    document.addEventListener('click', function(event) {
        if (sideMenu.classList.contains('active') && 
            !sideMenu.contains(event.target) && 
            !verticalBars.contains(event.target)) {
            sideMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    const menuButtons = document.querySelectorAll('.menu-btn');
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetUrl = this.getAttribute('data-url');
            
            if (targetUrl) {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500);
            }
        });
    });

    sideMenu.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});