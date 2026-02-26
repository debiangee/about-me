document.addEventListener('DOMContentLoaded', () => {
    
    // --- THEME TOGGLE ---
    const btn = document.getElementById('theme-toggle');
    const body = document.body;

    btn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'light') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'light');
        }
    });

    // --- SCROLL SPY LOGIC ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    const options = {
        threshold: 0.5 // Triggers highlight when section is 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach((link) => link.classList.remove("active"));
                
                // Get current section ID
                const id = entry.target.getAttribute("id");
                
                // Find matching link and add active class
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
});
