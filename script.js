document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EMAILJS INITIALIZATION ---
    emailjs.init("_hEdz8OStmdG5Vwu3"); 

    // --- 2. THEME TOGGLE ---
    const btn = document.getElementById('theme-toggle');
    const body = document.body;

    btn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'light');
        }
    });

    // --- 3. SCROLL SPY LOGIC (ADJUSTED FOR LAPTOPS) ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Use a smaller threshold so sections highlight as soon as they appear
    // and use rootMargin to detect the section when it's in the top half of the screen
    const options = {
        threshold: 0.2, 
        rootMargin: "-10% 0px -70% 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));
                const id = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, options);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Special Check: If scrolled to the very bottom, highlight Contact
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 5) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const contactLink = document.querySelector('.nav-links a[href="#contact"]');
            if (contactLink) contactLink.classList.add("active");
        }
    });

    // --- 4. EMAILJS FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            emailjs.sendForm('service_vq5kttj', 'template_txin8we', this)
                .then(() => {
                    submitBtn.innerText = "Message Sent! ✓";
                    submitBtn.style.backgroundColor = "#28a745";
                    submitBtn.style.color = "#fff";
                    this.reset();

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        submitBtn.style.backgroundColor = ""; 
                        submitBtn.style.color = "";
                        submitBtn.style.opacity = "1";
                        submitBtn.disabled = false;
                    }, 3000);

                }, (error) => {
                    console.error('FAILED...', error);
                    submitBtn.innerText = "Error! Try Again";
                    submitBtn.disabled = false;
                });
        });
    }
});
