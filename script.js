// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });

    // Initialize skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        const progress = bar.querySelector('.skill-progress');
        progress.style.setProperty('--progress', `${percentage}%`);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Typing Animation
    const typedTextElement = document.getElementById('typed-text');
    
    if (typedTextElement) { // Check if element exists
        const texts = [
            "Full Stack Developer",
            "UI/UX Designer",
            "Graphics designer",
            "AI Enthusiast"
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;
        let erasingDelay = 100;
        let newTextDelay = 2000;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = erasingDelay;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingDelay = newTextDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingDelay = 500;
            }

            setTimeout(type, typingDelay);
        }

        // Start the typing animation
        setTimeout(type, 1000); // Delay start by 1 second
    }

    // Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn = document.querySelector('.mobile-close-btn');
    const body = document.body;

    // Function to close mobile menu
    function closeMobileMenu() {
        hamburgerBtn.classList.remove('menu-open');
        mobileMenu.classList.remove('active');
        body.classList.remove('overflow-hidden');
    }

    if (hamburgerBtn && mobileMenu) {
        // Hamburger button open menu
        hamburgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle menu open/close
            this.classList.toggle('menu-open');
            mobileMenu.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            body.classList.toggle('overflow-hidden');
        });

        // Close button functionality
        if (mobileMenuCloseBtn) {
            mobileMenuCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !hamburgerBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Prevent menu close when clicking inside menu
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close menu when contact links are clicked
        const mobileContactLinks = mobileMenu.querySelectorAll('.mobile-contact-icon');
        mobileContactLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    // Hide header on scroll down, show on scroll up
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            // down
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            // up
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Form submission handling
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Here you would typically send the form data to your backend
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-500/20 text-green-500 p-4 rounded-lg mt-4 animate-fade-in';
                successMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'bg-red-500/20 text-red-500 p-4 rounded-lg mt-4 animate-fade-in';
                errorMessage.textContent = 'Failed to send message. Please try again.';
                contactForm.appendChild(errorMessage);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            const filter = button.dataset.filter;
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Theme toggle functionality (if implemented)
    const themeToggle = document.querySelector('#theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        });
    }

    // Initialize theme from localStorage
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Responsive navigation
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            nav.classList.add('-translate-y-full'); // Hide nav on scroll down
        } else {
            nav.classList.remove('-translate-y-full'); // Show nav on scroll up
        }
        lastScrollY = window.scrollY;
    });
});

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
    // Update any necessary responsive elements
    if (window.innerWidth <= 320) {
        // Mobile adjustments
        document.querySelectorAll('.skill-grid').forEach(grid => {
            grid.style.gridTemplateColumns = '1fr';
        });
    }
});
