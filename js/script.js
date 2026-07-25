// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------
// Scroll-reveal: fade-up for text/tiles, curtain-wipe for art
// ---------------------------------------------------------
const revealTargets = document.querySelectorAll(
  '.section-head, .art-tile, .spotlight__text, .skills__list, .contact__email'
);
revealTargets.forEach(el => el.classList.add('reveal'));

// Gallery tiles get an explicit stagger so they cascade in, not pop together
document.querySelectorAll('.art-grid .art-tile').forEach((tile, i) => {
  tile.style.transitionDelay = `${i * 70}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Once a staggered gallery tile has finished revealing, drop the
      // inline delay so hover transitions stay snappy afterward.
      const delay = parseFloat(entry.target.style.transitionDelay) || 0;
      if (entry.target.style.transitionDelay) {
        setTimeout(() => { entry.target.style.transitionDelay = '0ms'; }, delay + 750);
      }
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ---------------------------------------------------------
// Scroll progress bar
// ---------------------------------------------------------
const scrollProgress = document.getElementById('scrollProgress');
const nav = document.getElementById('nav');
const heroSigil = document.querySelector('.hero__sigil');
const heroContent = document.querySelector('.hero');

let ticking = false;

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  if (nav) nav.classList.toggle('is-scrolled', scrollTop > 40);

  // Gentle parallax drift on the hero sigil, disabled for reduced-motion users
  if (heroSigil && !prefersReducedMotion) {
    const heroHeight = heroContent ? heroContent.offsetHeight : window.innerHeight;
    const within = Math.min(scrollTop / heroHeight, 1);
    const offsetY = scrollTop * 0.18;
    const fade = 1 - within * 0.7;
    heroSigil.style.transform = `translate(-50%, calc(-50% + ${offsetY}px))`;
    heroSigil.style.opacity = String(Math.max(fade, 0) * 0.5);
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

onScroll();

// Footer year
const yearEl = document.querySelector('.footer__year');
if (yearEl) yearEl.textContent = `© ${new Date().getFullYear()}`;
