document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EMAILJS INITIALIZATION ---
    // Replace with your Public Key from EmailJS Account > API Keys
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

    // --- 3. SCROLL SPY LOGIC ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const options = {
        threshold: 0.5 
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

    // --- 4. EMAILJS FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitBtn = this.querySelector('.send-btn');
            const originalText = submitBtn.innerText;
            
            // Visual feedback: Loading
            submitBtn.innerText = "Sending...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            // Send form using Service ID and Template ID
            emailjs.sendForm('service_vq5kttj', 'template_txin8we', this)
                .then(() => {
                    // Aesthetic Success State
                    submitBtn.innerText = "Message Sent! ✓";
                    submitBtn.style.backgroundColor = "#28a745"; // Success green
                    submitBtn.style.color = "#fff";
                    this.reset();

                    // Reset button after 3 seconds
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
