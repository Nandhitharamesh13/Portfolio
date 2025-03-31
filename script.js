

function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    fetch('https://formspree.io/f/xeoaldeo', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error sending message');
      }
    })
    .then((data) => {
      document.getElementById('success-message').textContent = 'Thanks for contacting me!';
    })
    .catch((error) => {
      document.getElementById('success-message').textContent = 'Error sending message. Please try again.';
      console.error('Error sending message:', error);
    });
  }
  


document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle for mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            if (!menuOpen) {
                menuBtn.classList.add('open');
                navLinks.classList.add('nav-active');
                menuOpen = true;
            } else {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('nav-active');
                menuOpen = false;
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (menuOpen) {
                menuBtn.classList.remove('open');
                navLinks.classList.remove('nav-active');
                menuOpen = false;
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.hidden');
    
    function checkScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    }
    
    // Run once on page load
    checkScroll();
    
    // Run on scroll
    window.addEventListener('scroll', checkScroll);

    // Skill bar animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const parent = bar.parentElement.parentElement;
            if (isElementInViewport(parent)) {
                bar.style.width = bar.style.width || bar.getAttribute('style').split('width:')[1].split(';')[0].trim();
            } else {
                bar.style.width = '0%';
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate skills on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Initial animation
    setTimeout(animateSkillBars, 500);

    // Typewriter effect for hero section
    function typeWriter(textElement, text, i, fnCallback) {
        if (i < text.length) {
            textElement.innerHTML = text.substring(0, i+1) + '<span class="cursor"></span>';
            setTimeout(function() {
                typeWriter(textElement, text, i + 1, fnCallback)
            }, 100);
        } else if (typeof fnCallback == 'function') {
            setTimeout(fnCallback, 700);
        }
    }

    // Start the typewriter effect if the element exists
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.innerHTML = '<span class="cursor"></span>';
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 0, function() {
                heroTitle.classList.add('show');
            });
        }, 1000);
    }

    // Create animated background shapes
    function createBackgroundAnimation() {
        const heroSection = document.querySelector('.hero');
        const bgAnimation = document.createElement('div');
        bgAnimation.classList.add('background-animation');
        
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape');
            
            // Random properties
            const size = Math.random() * 80 + 20;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 15;
            
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            shape.style.left = `${posX}%`;
            shape.style.top = `${posY}%`;
            shape.style.animationDelay = `${delay}s`;
            shape.style.animationDuration = `${duration}s`;
            
            bgAnimation.appendChild(shape);
        }
        
        if (heroSection) {
            heroSection.appendChild(bgAnimation);
        }
    }
    
    createBackgroundAnimation();

    // Scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.classList.add('scroll-top');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // You would typically add form validation and AJAX submission here
            alert('Thank you for your message! This form is currently just a demonstration.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Page transition effect
    function pageTransition() {
        const transition = document.createElement('div');
        transition.classList.add('page-transition');
        document.body.appendChild(transition);
        
        transition.classList.add('active');
        
        setTimeout(() => {
            transition.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(transition);
            }, 500);
        }, 1000);
    }
    
    // Run page transition on load
    pageTransition();
});
