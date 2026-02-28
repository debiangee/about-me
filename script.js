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

    // --- 3. MANUAL OFFSET SCROLL SPY (BEST FOR LAPTOPS) ---
    const navLinks = document.querySelectorAll(".nav-links a");

    // TUNE THESE NUMBERS: 
    // Higher number = Highlights EARLIER (further down the page)
    // Lower number = Highlights LATER (closer to the top)
    const sectionOffsets = {
        'home': 100,
        'about': 200,
        'projects': 250,
        'skills': 200,
        'experience': 200,
        'contact': 100
    };

    const handleScrollSpy = () => {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        let currentSection = "";

        // Loop through each ID in our manual list
        for (const id in sectionOffsets) {
            const element = document.getElementById(id);
            if (element) {
                // Check if the top of the section (minus your custom offset) has passed the scroll point
                if (scrollPos >= element.offsetTop - sectionOffsets[id]) {
                    currentSection = id;
                }
            }
        }

        // Force 'Contact' if user is at the very bottom of the page
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 5) {
            currentSection = "contact";
        }

        // Update Nav Links
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    };

    // Listen for scrolling
    window.addEventListener("scroll", handleScrollSpy);

    // FIX FOR CLICKING: Force highlight immediately on click
    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
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
