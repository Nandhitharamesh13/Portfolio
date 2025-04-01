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
  
  // Add this code to suppress console messages
  const originalLog = console.log;
  console.log = function() {};
  
  
  
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animation for navbar elements
    const tl = gsap.timeline();
    
    // Logo animation
    tl.to(".logo", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Nav links staggered animation
    tl.to(".nav-link", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");
    
    // Menu button animation for mobile
    tl.to(".menu-btn", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.5");
    
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
                
                // GSAP animation for menu items when opening
                gsap.fromTo('.nav-active .nav-link', 
                    { opacity: 0, y: 20 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        stagger: 0.1, 
                        duration: 0.4,
                        ease: "power2.out"
                    }
                );
            } else {
                menuBtn.classList.remove('open');
                
                // GSAP animation for menu items when closing
                gsap.to('.nav-active .nav-link', {
                    opacity: 0,
                    y: 20,
                    stagger: 0.05,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        navLinks.classList.remove('nav-active');
                    }
                });
                
                menuOpen = false;
            }
        });
    }
    
    // Smooth scrolling for navigation links with GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            if (menuOpen) {
                menuBtn.classList.remove('open');
                
                gsap.to('.nav-active .nav-link', {
                    opacity: 0,
                    y: 20,
                    stagger: 0.05,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        navLinks.classList.remove('nav-active');
                    }
                });
                
                menuOpen = false;
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Set active class to clicked link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll with GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement.offsetTop - 80,
                        autoKill: false
                    },
                    ease: "power3.inOut"
                });
            }
        });
    });
    
    // Navbar scroll effect with GSAP
    const navbar = document.getElementById('navbar');
    
    ScrollTrigger.create({
        start: "top -80",
        onEnter: () => {
            gsap.to(navbar, {
                padding: "15px 50px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                duration: 0.3,
                ease: "power2.out"
            });
        },
        onLeaveBack: () => {
            gsap.to(navbar, {
                padding: "20px 50px",
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    
    if (sections.length > 0) {
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveLink('#' + section.id),
                onEnterBack: () => setActiveLink('#' + section.id)
            });
        });
    }
    
    function setActiveLink(sectionId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }
// Add this script to your existing JavaScript file or in a new <script> tag
// Make sure to include GSAP libraries before this script

// First, add GSAP CDN links to your HTML head section if not already present
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Get navbar elements
    const navbar = document.getElementById('navbar');
    const logo = navbar.querySelector('.logo');
    const navLinks = navbar.querySelectorAll('.nav-link');
    const menuBtn = navbar.querySelector('.menu-btn');
    
    // Set initial states for animation
    gsap.set(logo, { opacity: 0, y: -20 });
    gsap.set(navLinks, { opacity: 0, y: -10 });
    gsap.set(menuBtn, { opacity: 0 });
    
    // Create animation timeline
    const tl = gsap.timeline();
    
    // Logo animation
    tl.to(logo, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Nav links staggered animation
    tl.to(navLinks, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    }, "-=0.5");
    
    // Menu button animation
    tl.to(menuBtn, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.3");
    
    // Keep the original functionality for menu toggle
    let menuOpen = false;
    if (menuBtn) {
        // Store original click function
        const originalClickHandler = menuBtn.onclick;
        
        // Replace with enhanced version
        menuBtn.onclick = function(e) {
            if (originalClickHandler) {
                // Call original handler to maintain existing functionality
                originalClickHandler.call(this, e);
            }
            
            const navLinksContainer = document.querySelector('.nav-links');
            
            if (!menuOpen) {
                menuOpen = true;
                
                // Add animation for menu items when opening
                gsap.fromTo('.nav-active .nav-link', 
                    { opacity: 0, y: 20 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        stagger: 0.1, 
                        duration: 0.4,
                        ease: "power2.out"
                    }
                );
            } else {
                menuOpen = false;
                
                // Add animation for menu items when closing
                if (navLinksContainer.classList.contains('nav-active')) {
                    gsap.to('.nav-link', {
                        opacity: 0,
                        y: 20,
                        stagger: 0.05,
                        duration: 0.3,
                        ease: "power2.in",
                        onComplete: () => {
                            // Reset opacity after animation for desktop view
                            gsap.to('.nav-link', {opacity: 1, y: 0, duration: 0});
                        }
                    });
                }
            }
        };
    }
    
    // Enhanced navbar scroll effect using ScrollTrigger
    ScrollTrigger.create({
        start: "top -80",
        onEnter: () => {
            gsap.to(navbar, {
                padding: "15px 50px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                duration: 0.3,
                ease: "power2.out"
            });
        },
        onLeaveBack: () => {
            gsap.to(navbar, {
                padding: "20px 50px",
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
    
    // Add active link highlighting based on scroll position
    const sections = document.querySelectorAll('section');
    
    if (sections.length > 0) {
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top center",
                end: "bottom center",
                onEnter: () => setActiveLink('#' + section.id),
                onEnterBack: () => setActiveLink('#' + section.id)
            });
        });
    }
    
    function setActiveLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === sectionId) {
                link.classList.add('active');
            }
        });
    }
    
    // Add underline hover effect with GSAP
    navLinks.forEach(link => {
        const underline = link.querySelector('::after') || document.createElement('span');
        
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                color: 'var(--accent-color)',
                duration: 0.3,
                ease: "power1.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                gsap.to(link, {
                    color: 'var(--tertiary-color)',
                    duration: 0.3,
                    ease: "power1.out"
                });
            }
        });
    });
    
    // Add smooth scrolling with GSAP
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Set active class
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll with GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: targetElement.offsetTop - 80 },
                    ease: "power3.inOut"
                });
                
                // Close mobile menu if open
                if (menuOpen && menuBtn) {
                    menuBtn.click();
                }
            }
        });
    });
});// Fix for navigation click functionality
document.addEventListener('DOMContentLoaded', function() {
    
    
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.querySelector('.menu-btn');
    let menuOpen = false;
    
    // Determine if menuOpen state is based on a class
    if (menuBtn) {
        menuOpen = menuBtn.classList.contains('open');
    }
    
    // Enhanced click handler that preserves original functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's an external link (doesn't start with #)
            if (!targetId.startsWith('#')) {
                window.location.href = targetId;
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (menuOpen && menuBtn) {
                    menuBtn.click();
                }
                
                // Use standard scrolling as fallback if GSAP isn't available
                if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
                    // Make sure ScrollToPlugin is registered
                    if (ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);
                    
                    // Use GSAP for smooth scrolling
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: targetElement.offsetTop - 80 },
                        ease: "power3.inOut"
                    });
                } else {
                    // Fallback to standard smooth scrolling
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else {
                // If target doesn't exist in this page, use standard navigation
                window.location.href = targetId;
            }
        });
    });
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
    // Initial call
document.addEventListener('DOMContentLoaded', function() {
    // Your other code...
    
    // Call once after a short delay to allow page to render
    setTimeout(animateSkillBars, 500);
    
    // Call on scroll
    window.addEventListener('scroll', animateSkillBars);
});

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const parent = bar.parentElement.parentElement;
            
            // Store the original width in a data attribute when the page loads
            if (!bar.dataset.originalWidth) {
                const styleAttr = bar.getAttribute('style');
                if (styleAttr && styleAttr.includes('width:')) {
                    const widthMatch = styleAttr.match(/width:\s*(\d+%)/);
                    if (widthMatch && widthMatch[1]) {
                        bar.dataset.originalWidth = widthMatch[1];
                        // Initially set to 0
                        bar.style.width = '0%';
                    }
                }
            }
            
            // Animate to original width when in viewport
            if (isElementInViewport(parent) && bar.dataset.originalWidth) {
                bar.style.width = bar.dataset.originalWidth;
            } else if (!isElementInViewport(parent) && bar.dataset.originalWidth) {
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
    // Add this to your existing JavaScript file
// Make sure to include GSAP libraries in your HTML head:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    if (typeof gsap === 'undefined') {
      console.error('GSAP not loaded! Please include the GSAP library.');
      return;
    }
  
    // Reference elements
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    const heroParagraph = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.hero-btns');
    const socialIcons = document.querySelectorAll('.social-icon');
    
    // Only proceed if hero section exists
    if (!hero) return;
  
    // Set initial states (invisible)
    gsap.set([heroTitle, heroSubtitle, heroParagraph, heroButtons], { 
      opacity: 0, 
      y: 30 
    });
    
    gsap.set(socialIcons, { 
      opacity: 0, 
      y: 20 
    });
  
    // Create the animation timeline
    const tl = gsap.timeline();
  
    // Animate hero background gradients
    tl.fromTo('.hero::before', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
      0
    );
    
    tl.fromTo('.hero::after', 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
      0.3
    );
  
    // Animate title with typewriter effect
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      heroTitle.textContent = '';
      heroTitle.style.opacity = 1;
      
      tl.to(heroTitle, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
      
      let currentText = '';
      const typeSpeed = 0.05; // seconds per character
      
      for (let i = 0; i < originalText.length; i++) {
        currentText += originalText[i];
        tl.call(() => { 
          heroTitle.textContent = currentText + (i < originalText.length - 1 ? '|' : ''); 
        }, [], 0.8 + (i * typeSpeed));
      }
      
      // Remove cursor at the end
      tl.call(() => { 
        heroTitle.textContent = originalText; 
      }, [], 0.8 + (originalText.length * typeSpeed) + 0.2);
    }
  
    // Animate subtitle
    if (heroSubtitle) {
      tl.to(heroSubtitle, { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "power2.out" 
      }, "-=0.4");
    }
  
    // Animate paragraph
    if (heroParagraph) {
      tl.to(heroParagraph, { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "power2.out" 
      }, "-=0.5");
    }
  
    // Animate buttons
    if (heroButtons) {
      tl.to(heroButtons, { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "power2.out" 
      }, "-=0.5");
    }
  
    // Animate social icons with stagger
    if (socialIcons.length) {
      tl.to(socialIcons, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: "power2.out" 
      }, "-=0.3");
    }
  
    // Create animated background shapes with GSAP
    function createBackgroundAnimation() {
      // Remove any existing background animation
      const existingBg = document.querySelector('.background-animation');
      if (existingBg) existingBg.remove();
      
      const bgAnimation = document.createElement('div');
      bgAnimation.classList.add('background-animation');
      
      // Apply styles to the container
      bgAnimation.style.position = 'absolute';
      bgAnimation.style.width = '100%';
      bgAnimation.style.height = '100%';
      bgAnimation.style.top = '0';
      bgAnimation.style.left = '0';
      bgAnimation.style.overflow = 'hidden';
      bgAnimation.style.zIndex = '-1';
      
      // Generate shapes
      for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        
        // Base styles for shapes
        shape.style.position = 'absolute';
        shape.style.borderRadius = '50%';
        shape.style.backgroundColor = 'rgba(100, 255, 218, 0.03)';
        shape.style.boxShadow = '0 0 10px rgba(100, 255, 218, 0.05)';
        
        // Random properties
        const size = Math.random() * 80 + 20;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 4;
        
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        shape.style.opacity = 0;
        
        bgAnimation.appendChild(shape);
        
        // Animate each shape individually with GSAP
        gsap.set(shape, { opacity: 0, scale: 0 });
        
        // Create individual timeline for each shape
        const shapeTl = gsap.timeline({
          repeat: -1,
          delay: delay,
          repeatDelay: Math.random() * 5
        });
        
        // Complex animation path
        shapeTl.to(shape, {
          opacity: 0.7,
          scale: 1,
          duration: 1,
          ease: "power1.out"
        })
        .to(shape, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: 15 + Math.random() * 10,
          rotation: Math.random() * 360,
          ease: "none"
        }, "-=1")
        .to(shape, {
          opacity: 0,
          scale: 0.5,
          duration: 2,
          ease: "power1.in"
        }, "-=3");
      }
      
      hero.appendChild(bgAnimation);
    }
    
    // Initialize the background animation
    createBackgroundAnimation();
    
    // Add scroll-triggered animations
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Parallax effect on hero section
      gsap.to('.hero-content', {
        y: 100,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
      
      // Fade out hero section as user scrolls down
      gsap.to('.hero', {
        opacity: 0.7,
        scrollTrigger: {
          trigger: '.hero',
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
    
    // Add hover animations for buttons and social icons
    const buttons = document.querySelectorAll('.hero-btns a');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power1.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power1.out"
        });
      });
    });
    
    // Enhanced hover effect for social icons
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          y: -5,
          color: 'var(--accent-color)',
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          y: 0,
          color: 'var(--tertiary-color)',
          duration: 0.3,
          ease: "power1.out"
        });
      });
    });
  });
  
  // Fix for navigation click functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make sure GSAP ScrollToPlugin is loaded
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
    
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.querySelector('.menu-btn');
    let menuOpen = false;
    
    // Determine if menuOpen state is based on a class
    if (menuBtn) {
        menuOpen = menuBtn.classList.contains('open');
    }
    
    // Enhanced click handler that preserves original functionality
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's an external link (doesn't start with #)
            if (!targetId.startsWith('#')) {
                window.location.href = targetId;
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if it's open
                if (menuOpen && menuBtn) {
                    menuBtn.click();
                }
                
                // Use standard scrolling as fallback if GSAP isn't available
                if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
                    // Make sure ScrollToPlugin is registered
                    if (ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);
                    
                    // Use GSAP for smooth scrolling
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: targetElement.offsetTop - 80 },
                        ease: "power3.inOut"
                    });
                } else {
                    // Fallback to standard smooth scrolling
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else {
                // If target doesn't exist in this page, use standard navigation
                window.location.href = targetId;
            }
        });
    });
});



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