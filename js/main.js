// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.querySelector('.mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Handle Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Simulate form submission
    console.log('Form submitted with data:', {
        name: formData.get('name') || form.querySelector('input[type="text"]').value,
        email: formData.get('email') || form.querySelector('input[type="email"]').value,
        message: formData.get('message') || form.querySelector('textarea').value
    });
    
    // Show success message
    const originalText = form.querySelector('button').textContent;
    form.querySelector('button').textContent = 'Message Sent! ✓';
    form.querySelector('button').disabled = true;
    
    // Reset form
    setTimeout(() => {
        form.reset();
        form.querySelector('button').textContent = originalText;
        form.querySelector('button').disabled = false;
    }, 3000);
}

// Toggle FAQ Items
function toggleFAQ(element) {
    const answer = element.querySelector('.faq-answer');
    const toggle = element.querySelector('span');
    
    if (answer) {
        answer.classList.toggle('hidden');
        toggle.textContent = answer.classList.contains('hidden') ? '+' : '−';
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Navigation Active State
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-emerald-400');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-emerald-400');
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavigation();
    
    // Add fade-in animation to elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el, index) => {
        el.style.animation = `fadeIn 0.6s ease ${index * 0.1}s both`;
    });
    
    // Handle theme toggle if needed
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
        document.documentElement.classList.add('dark');
    }
});

// Performance: Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Analytics (Optional - Replace with your analytics service)
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
}

// Export functions for use in other scripts
window.SignWise = {
    toggleMenu,
    handleSubmit,
    toggleFAQ,
    copyToClipboard,
    trackEvent
};