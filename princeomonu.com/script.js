// Mobile menu functionality
const menuButton = document.getElementById('menuButton');
const closeButton = document.getElementById('closeButton');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuLinks = mobileMenu.getElementsByTagName('a');

function toggleMenu() {
    const isOpen = mobileMenu.classList.contains('translate-x-0');
    mobileMenu.classList.toggle('translate-x-0');
    document.body.style.overflow = isOpen ? '' : 'hidden';
    // Hide/show menu button
    menuButton.style.opacity = isOpen ? '1' : '0';
    menuButton.style.visibility = isOpen ? 'visible' : 'hidden';
}

menuButton.addEventListener('click', toggleMenu);
closeButton.addEventListener('click', toggleMenu);

// Close menu when clicking a link
Array.from(mobileMenuLinks).forEach(link => {
    link.addEventListener('click', () => {
        toggleMenu();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 300);
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listener for navbar background
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
    } else {
        nav.classList.remove('shadow-lg');
    }
});

// Typewriter effect
function typeWriter(element, text, speed = 150) {
    let i = 0;
    element.innerHTML = '<span></span><span class="typewriter-cursor"></span>';
    const textSpan = element.querySelector('span');

    function type() {
        if (i < text.length) {
            textSpan.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            textSpan.textContent += '.'; // Add the period at the end
        }
    }
    type();
}

// Start the typewriter effect when the page loads
window.addEventListener('load', () => {
    const typewriterElement = document.getElementById('typewriter');
    typeWriter(typewriterElement, 'Prince Omonu');
});

// Add the cursor glow element
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

// Set default position under the tagline
function setDefaultGlowPosition() {
    const tagline = document.querySelector('h3');
    if (tagline) {
        const rect = tagline.getBoundingClientRect();
        cursorGlow.style.left = `${rect.left + rect.width / 2}px`;
        cursorGlow.style.top = `${rect.top + rect.height / 2}px`;
        cursorGlow.style.opacity = '1';
    }
}

// Set initial position
window.addEventListener('load', setDefaultGlowPosition);
window.addEventListener('resize', setDefaultGlowPosition);

let isMouseMoving = false;
let mouseTimeout;

// Update cursor glow position only when mouse moves
document.addEventListener('mousemove', (e) => {
    isMouseMoving = true;
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';

    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
        setDefaultGlowPosition();
    }, 2000); // Return to default position after 2 seconds of no movement
});

// Hide cursor glow when mouse leaves the window
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    if (!isMouseMoving) {
        setDefaultGlowPosition();
    } else {
        cursorGlow.style.opacity = '1';
    }
});

// Intersection Observer for fade-in sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

// Observe all sections with fade-in-section class
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => observer.observe(section));
});

// Intersection Observer for projects
const projectObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, projectObserverOptions);

// Observe all project cards and featured projects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const featuredProjects = document.querySelectorAll('.featured-project');

    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        projectObserver.observe(card);
    });

    featuredProjects.forEach((project, index) => {
        project.style.transitionDelay = `${index * 200}ms`;
        projectObserver.observe(project);
    });
});

// Scroll to top functionality
const scrollToTopButton = document.getElementById('scrollToTop');

// Show button when page is scrolled
const toggleScrollButton = () => {
    if (window.scrollY > 500) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
};

// Scroll to top when button is clicked
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Listen for scroll events
window.addEventListener('scroll', toggleScrollButton);

// Theme switcher functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitchers = ['theme-switcher', 'mobile-theme-switcher', 'mobile-header-theme-switcher'];

    // Function to update placeholder images
    function updatePlaceholderImages(theme) {
        const placeholderImages = document.querySelectorAll('img[src*="placehold.co"]');
        placeholderImages.forEach(img => {
            // Create new image to preload
            const newImage = new Image();
            const bgColor = theme.colors.background.replace('#', '');
            const accentColor = theme.colors.accent.replace('#', '');
            const projectName = img.src.split('?text=')[1];
            const newSrc = `https://placehold.co/600x400/${bgColor}/${accentColor}?text=${projectName}`;

            // Add fade out class
            img.style.opacity = '0';

            // When new image is loaded, update src and fade in
            newImage.onload = () => {
                img.src = newSrc;
                img.style.opacity = '1';
            };
            newImage.src = newSrc;
        });
    }

    // Add CSS for smooth image transitions
    const style = document.createElement('style');
    style.textContent = `
        img[src*="placehold.co"] {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    themeSwitchers.forEach(id => {
        const switcher = document.getElementById(id);
        if (switcher) {
            switcher.addEventListener('click', () => {
                const currentTheme = switcher.dataset.currentTheme;
                const nextTheme = window.themeManager.getNextTheme(currentTheme);
                window.themeManager.applyTheme(nextTheme);

                // Update placeholder images with new theme colors
                const theme = window.themeManager.themes[nextTheme];
                updatePlaceholderImages(theme);

                // Update all theme switchers
                themeSwitchers.forEach(id => {
                    const s = document.getElementById(id);
                    if (s) s.dataset.currentTheme = nextTheme;
                });
            });
        }
    });

    // Update placeholder images on initial load
    const initialTheme = localStorage.getItem('selected-theme') || 'navy';
    const theme = window.themeManager.themes[initialTheme];
    updatePlaceholderImages(theme);
});