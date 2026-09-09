// Shared behavior across every page: load-in animations for the nav/hero,
// and a scroll-triggered reveal system standing in for Framer Motion's
// whileInView + staggerChildren variants used throughout the original site.
(function () {
  function initLoadReveal() {
    var loadEls = document.querySelectorAll('[data-reveal="load"]');
    // rAF so the browser paints the initial (hidden) state before we flip
    // the class, otherwise the transition can get skipped.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        loadEls.forEach(function (el) {
          el.classList.add('in-view');
        });
      });
    });

    var nav = document.querySelector('.site-nav');
    if (nav) nav.classList.add('is-loaded');

    var navLogoText = document.querySelector('.nav-logo-text');
    if (navLogoText) navLogoText.classList.add('is-loaded');

    document.querySelectorAll('.hero').forEach(function (hero) {
      hero.classList.add('is-loaded');
    });
  }

  function initScrollReveal() {
    var scrollEls = document.querySelectorAll('[data-reveal="scroll"]');
    if (!scrollEls.length) return;

    if (!('IntersectionObserver' in window)) {
      scrollEls.forEach(function (el) {
        el.classList.add('in-view');
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    scrollEls.forEach(function (el) {
      io.observe(el);
    });
  }

  function initFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLoadReveal();
    initScrollReveal();
    initFooterYear();
  });
})();
