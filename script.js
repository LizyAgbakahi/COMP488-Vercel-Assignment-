// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const body = document.body;

// Check for saved theme preference or default to dark mode (since background is black)
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add a little animation to the button
    themeToggle.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Features Section Toggle
const ctaButton = document.getElementById('ctaButton');
const featuresSection = document.getElementById('featuresSection');
let featuresVisible = false;

ctaButton.addEventListener('click', () => {
    if (!featuresVisible) {
        // Show features with smooth animation
        featuresSection.style.display = 'block';
        setTimeout(() => {
            featuresSection.classList.add('show');
        }, 50);

        // Smooth scroll to features
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        ctaButton.textContent = 'Hide Features';
        featuresVisible = true;
    } else {
        // Hide features
        featuresSection.classList.remove('show');
        setTimeout(() => {
            featuresSection.style.display = 'none';
        }, 800);

        ctaButton.textContent = 'Explore Features';
        featuresVisible = false;

        // Scroll back to hero
        document.querySelector('.hero').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Feature Card Interactive Effects
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('click', () => {
        const feature = card.getAttribute('data-feature');
        showFeatureMessage(feature, card);
    });

    // Add hover effect with mouse tracking
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

function showFeatureMessage(feature, cardElement) {
    // Create and show a temporary message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 1000;
        font-size: 1.1rem;
        font-weight: 600;
        text-align: center;
        animation: popIn 0.3s ease;
        backdrop-filter: blur(10px);
    `;

    const messages = {
        networking: '🏥 Connect with healthcare professionals across all medical specialties!',
        collaboration: '🤝 Share knowledge and collaborate on improving patient care!',
        learning: '📚 Access continuous education and stay updated with medical advances!'
    };

    message.textContent = messages[feature] || '✨ This feature makes development awesome!';
    document.body.appendChild(message);

    // Add CSS for animation
    if (!document.querySelector('#popInAnimation')) {
        const style = document.createElement('style');
        style.id = 'popInAnimation';
        style.textContent = `
            @keyframes popIn {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove message after 3 seconds
    setTimeout(() => {
        message.style.animation = 'popIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 3000);

    // Add ripple effect to clicked card
    createRipple(cardElement, event);
}

// Ripple effect function
function createRipple(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;

    // Add ripple animation CSS if not exists
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Smooth scrolling for any future navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle entrance animation to the page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';

    setTimeout(() => {
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});