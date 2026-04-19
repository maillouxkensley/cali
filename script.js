document.addEventListener('DOMContentLoaded', () => {
    // Form Handling
    const form = document.getElementById('coaching-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                instagram: document.getElementById('instagram').value,
                level: document.getElementById('level').value,
                goals: document.getElementById('goals').value,
                experience: document.getElementById('experience').value
            };
            
            console.log('Form Submitted:', formData);
            
            // Simulate success
            const originalButtonText = form.querySelector('button').innerText;
            form.querySelector('button').innerText = 'Application Sent!';
            form.querySelector('button').style.backgroundColor = '#28a745';
            form.reset();
            
            setTimeout(() => {
                form.querySelector('button').innerText = originalButtonText;
                form.querySelector('button').style.backgroundColor = '';
            }, 3000);
        });
    }

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Apply reveal class to items
    const animateItems = document.querySelectorAll('.problem-item, .feature-item, .solution-card, .form-container');
    animateItems.forEach(item => {
        item.classList.add('reveal');
        observer.observe(item);
    });
});

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Floating CTA Logic
const floatingCta = document.querySelector('.floating-cta');
if (floatingCta) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.8) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });

    // Hide if scrolling over the footer or actual form to prevent overlap issues
    const applySection = document.getElementById('apply');
    if (applySection) {
        window.addEventListener('scroll', () => {
            const applyRect = applySection.getBoundingClientRect();
            if (applyRect.top < window.innerHeight && applyRect.bottom >= 0) {
                 floatingCta.classList.remove('visible');
            }
        });
    }
}
