import '../styles/tailwind.css';

export function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Make all reveal elements visible immediately
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('animate-in');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('animate-in');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  document.querySelectorAll('[data-reveal]').forEach((el) => {
    observer.observe(el);
  });
}
