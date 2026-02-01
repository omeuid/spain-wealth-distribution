/**
 * Spain Wealth Inequality - Static Website
 * Vanilla JavaScript for interactive features
 */

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for fade-in animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach((element) => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Add fade-in class to chart containers on load
function setupChartAnimations() {
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach((container) => {
        container.classList.add('fade-in');
    });
}

// Smooth scroll behavior for anchor links
function setupAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Add scroll event listener for header effects
function setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add subtle effects based on scroll position
        const hero = document.querySelector('.hero');
        if (hero && scrollTop < window.innerHeight) {
            const parallaxOffset = scrollTop * 0.3;
            hero.style.backgroundPosition = `0 ${parallaxOffset}px`;
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Lazy load images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // Images are already loaded, but this can be used for other lazy loading needs
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach((img) => {
            imageObserver.observe(img);
        });
    }
}

// Keyboard navigation support
function setupKeyboardNavigation() {
    const sections = document.querySelectorAll('[id]');
    const sectionIds = Array.from(sections).map((s) => s.id);

    document.addEventListener('keydown', (e) => {
        // Skip if modifier keys are pressed
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        const currentScroll = window.pageYOffset;
        let nextSectionId = null;

        if (e.key === 'ArrowDown' || e.key === ' ') {
            // Find next section below current scroll position
            for (const id of sectionIds) {
                const element = document.getElementById(id);
                if (element.offsetTop > currentScroll + 100) {
                    nextSectionId = id;
                    break;
                }
            }
        } else if (e.key === 'ArrowUp') {
            // Find previous section
            for (let i = sectionIds.length - 1; i >= 0; i--) {
                const id = sectionIds[i];
                const element = document.getElementById(id);
                if (element.offsetTop < currentScroll - 100) {
                    nextSectionId = id;
                    break;
                }
            }
        }

        if (nextSectionId) {
            e.preventDefault();
            scrollToSection(nextSectionId);
        }
    });
}

// Performance monitoring
function setupPerformanceMonitoring() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        });
    }
}

// Accessibility: Skip to main content
function setupAccessibility() {
    // Add skip link if not present
    const skipLink = document.createElement('a');
    skipLink.href = '#overview';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--primary);
        color: white;
        padding: 8px;
        z-index: 100;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Add print styles dynamically
function setupPrintStyles() {
    const printStyle = document.createElement('style');
    printStyle.textContent = `
        @media print {
            .scroll-indicator,
            .btn-primary {
                display: none !important;
            }
            
            .section {
                page-break-inside: avoid;
            }
            
            img {
                max-width: 100%;
                page-break-inside: avoid;
            }
        }
    `;
    document.head.appendChild(printStyle);
}

// Initialize all features
function initializeApp() {
    // Run initialization functions
    setupChartAnimations();
    initIntersectionObserver();
    setupAnchorLinks();
    setupScrollEffects();
    setupLazyLoading();
    setupKeyboardNavigation();
    setupAccessibility();
    setupPrintStyles();
    setupPerformanceMonitoring();

    console.log('Spain Wealth Inequality Analysis - Static Website Initialized');
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export for external use if needed
window.SpainWealthAnalysis = {
    scrollToSection,
    initIntersectionObserver,
};
