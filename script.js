// --- THEME TOGGLE LOGIC ---
const btn = document.getElementById('theme-toggle');
const body = document.body;

btn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'light');
    }
});

// --- SCROLL HIGHLIGHT LOGIC ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const options = {
    threshold: 0.6 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));
            const id = entry.target.getAttribute("id");
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
        }
    });
}, options);

sections.forEach((section) => {
    observer.observe(section);
});
