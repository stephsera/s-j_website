/* =========================================
   S&J LAUNDROMAT — main.js
   ========================================= */

// ---- MOBILE NAV TOGGLE ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});


// ---- ACTIVE NAV LINK ON SCROLL ----
const sections = document.querySelectorAll('main section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));


// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});


// ---- CONTACT FORM (basic client-side) ----
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    formSuccess.textContent = '';

    const name  = form.name.value.trim();
    const email = form.email.value.trim();
    const msg   = form.message.value.trim();

    if (!name || !email || !msg) {
      formSuccess.style.color = '#c62828';
      formSuccess.textContent = 'Please fill in all required fields.';
      return;
    }

    // ---- Replace this block with a real form service (e.g. Formspree) ----
    // For now, we simulate a successful submission.
    form.reset();
    formSuccess.style.color = '#2e7d32';
    formSuccess.textContent = '✓ Message sent! We\'ll get back to you soon.';

    setTimeout(() => { formSuccess.textContent = ''; }, 6000);
  });
}