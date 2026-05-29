document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // STICKY HEADER & SCROLL SPY
    // ----------------------------------------------------
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const handleScroll = () => {
        // Sticky Header Toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Spy
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // Offset for header height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(`#${currentSectionId}`)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on page load

    // ----------------------------------------------------
    // MOBILE NAVIGATION DRAWER
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        menuToggle.classList.toggle('open');
        mobileNav.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); // Prevent page scroll when overlay is open
    };

    menuToggle.addEventListener('click', toggleMobileMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close menu when links are clicked
            menuToggle.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // ----------------------------------------------------
    // TOAST NOTIFICATIONS HELPER
    // ----------------------------------------------------
    const toastContainer = document.getElementById('toast-container');

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} fade-in`;

        // Icons based on toast type
        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation';

        toast.innerHTML = `
            <div class="toast-content">
                <i class="fa-solid ${iconClass} toast-icon"></i>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;

        toastContainer.appendChild(toast);

        // Bind close button event
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'fadeIn 0.5s ease reverse';
            setTimeout(() => toast.remove(), 500);
        }, 5000);
    };

    // ----------------------------------------------------
    // AJAX CONTACT FORM SUBMISSION
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');
            const formInputs = contactForm.querySelectorAll('.form-control');
            const errorSpans = contactForm.querySelectorAll('.error-msg');

            // Reset previous validation error text
            errorSpans.forEach(span => {
                span.textContent = '';
            });

            // Set loading button state
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            spinner.classList.remove('hidden');
            formInputs.forEach(input => input.disabled = true);

            // Package Form Data
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // Success callback
                    showToast(data.message, 'success');
                    contactForm.reset();
                } else {
                    // Form validation errors or custom error
                    showToast(data.message || 'Validation failed. Please correct form errors.', 'error');
                    
                    if (data.errors) {
                        // Display error highlights per field
                        for (const [field, errorMsg] of Object.entries(data.errors)) {
                            const errorSpan = document.getElementById(`error-${field}`);
                            if (errorSpan) {
                                errorSpan.textContent = errorMsg;
                            }
                        }
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                showToast('Failed to connect to the server. Please check your connection.', 'error');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                btnText.classList.remove('hidden');
                spinner.classList.add('hidden');
                formInputs.forEach(input => input.disabled = false);
            }
        });
    }
});
