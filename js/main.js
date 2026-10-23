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

  // Portfolio rows (.work-list) scroll sideways once they outgrow the
  // container, which isn't obvious at a glance. Overflowing rows drift on
  // their own as a seamless loop: the items are cloned once and the scroll
  // position wraps after one full set. Hover, focus, or touch pauses the
  // drift so visitors can still scroll and click normally.
  function initWorkMarquee() {
    var lists = document.querySelectorAll('.work-list');
    if (!lists.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var SPEED = 30; // px per second
    var TOUCH_RESUME_MS = 2500;

    lists.forEach(function (list) {
      var originals = Array.prototype.slice.call(list.children);
      if (!originals.length) return;

      var clones = [];
      var setWidth = 0;
      var pos = 0;
      var last = 0;
      var raf = 0;
      var visible = false;
      var hovering = false;
      var focused = false;
      var resumeAt = 0;
      var lastWidth = list.clientWidth;

      function enable() {
        if (list.scrollWidth <= list.clientWidth) return;
        originals.forEach(function (item) {
          var clone = item.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          clone.setAttribute('tabindex', '-1');
          list.appendChild(clone);
          clones.push(clone);
        });
        // distance from an item to its clone = one full set, gap included
        setWidth = clones[0].offsetLeft - originals[0].offsetLeft;
        list.classList.add('is-marquee');
        start();
      }

      function disable() {
        stop();
        clones.forEach(function (clone) { list.removeChild(clone); });
        clones = [];
        pos = 0;
        list.scrollLeft = 0;
        list.classList.remove('is-marquee');
      }

      function start() {
        if (raf || !clones.length || !visible) return;
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }

      function stop() {
        cancelAnimationFrame(raf);
        raf = 0;
      }

      function tick(now) {
        var dt = Math.min(now - last, 100) / 1000;
        last = now;
        if (!hovering && !focused && now >= resumeAt) {
          pos += SPEED * dt;
          if (pos >= setWidth) pos -= setWidth;
          list.scrollLeft = pos;
        }
        raf = requestAnimationFrame(tick);
      }

      // pick up wherever the visitor left it after a manual scroll
      list.addEventListener('scroll', function () {
        if (Math.abs(list.scrollLeft - pos) > 1) pos = list.scrollLeft;
      }, { passive: true });

      list.addEventListener('pointerenter', function (e) {
        if (e.pointerType === 'mouse') hovering = true;
      });
      list.addEventListener('pointerleave', function () { hovering = false; });
      list.addEventListener('focusin', function () { focused = true; });
      list.addEventListener('focusout', function () { focused = false; });
      list.addEventListener('touchstart', function () { resumeAt = Infinity; }, { passive: true });
      list.addEventListener('touchend', function () {
        resumeAt = performance.now() + TOUCH_RESUME_MS;
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          visible = entries[0].isIntersecting;
          if (visible) start(); else stop();
        }).observe(list);
      } else {
        visible = true;
      }

      // re-measure only on width changes (mobile URL bars fire height-only resizes)
      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (list.clientWidth === lastWidth) return;
          lastWidth = list.clientWidth;
          disable();
          enable();
        }, 200);
      });

      enable();
    });
  }

  function initFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initLoadReveal();
    initScrollReveal();
    initWorkMarquee();
    initFooterYear();
  });
})();
