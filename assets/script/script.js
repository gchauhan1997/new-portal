// Add this script at the end of your HTML body or in a separate JS file

// Sticky Header on Scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// Mobile Dropdown Menu Handler
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle click on mobile devices (max-width: 991px)
            if (window.innerWidth <= 991) {
                e.preventDefault();
                
                const dropdownMenu = this.nextElementSibling;
                const isOpen = dropdownMenu.classList.contains('show');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                        const relatedToggle = menu.previousElementSibling;
                        if (relatedToggle) {
                            relatedToggle.classList.remove('show');
                            relatedToggle.setAttribute('aria-expanded', 'false');
                        }
                    }
                });
                
                // Toggle current dropdown
                if (isOpen) {
                    dropdownMenu.classList.remove('show');
                    this.classList.remove('show');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    dropdownMenu.classList.add('show');
                    this.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                }
            }
        });
    });

    // Close dropdown when clicking on dropdown item on mobile
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if it's an external link
            const href = this.getAttribute('href');
            const isExternalLink = href && !href.startsWith('#');
            
            if (window.innerWidth <= 991 && isExternalLink) {
                const dropdownMenu = this.closest('.dropdown-menu');
                const dropdownToggle = dropdownMenu.previousElementSibling;
                
                dropdownMenu.classList.remove('show');
                dropdownToggle.classList.remove('show');
                dropdownToggle.setAttribute('aria-expanded', 'false');
                
                // Also close the navbar collapse on mobile
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Handle window resize to ensure proper dropdown behavior
    window.addEventListener('resize', function() {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu.show');
        
        // If resizing to desktop, remove show classes
        if (window.innerWidth > 991) {
            dropdownMenus.forEach(menu => {
                menu.classList.remove('show');
                if (menu.previousElementSibling) {
                    menu.previousElementSibling.classList.remove('show');
                    menu.previousElementSibling.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});