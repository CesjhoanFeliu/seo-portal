/* ─────────────────────────────────────────────────────────────────
   SEO PORTAL — INTERACTIVE BEHAVIOR
   ───────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ───── Collapsible sections ─────
  document.querySelectorAll('.a-sec-head').forEach(function (head) {
    head.addEventListener('click', function () {
      var section = head.closest('.a-section');
      if (section) section.classList.toggle('closed');
    });
  });

  // ───── Smooth scroll + active sidebar link ─────
  var sideLinks = document.querySelectorAll('.side-nav a[href^="#"]');
  sideLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();

      // If section is closed, open it first
      var sec = target.closest('.a-section');
      if (sec && sec.classList.contains('closed')) {
        sec.classList.remove('closed');
      }

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      sideLinks.forEach(function (link) { link.classList.remove('active'); });
      a.classList.add('active');
    });
  });

  // ───── IntersectionObserver — highlight sidebar while scrolling ─────
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          if (!id) return;
          sideLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-140px 0px -55% 0px'
    });

    document.querySelectorAll('[id]').forEach(function (el) {
      if (el.classList.contains('a-section') || el.id === 'overview') {
        observer.observe(el);
      }
    });
  }

  // ───── PDF Download trigger ─────
  var pdfBtn = document.getElementById('pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', function () {
      // Expand all sections before printing
      document.querySelectorAll('.a-section').forEach(function (s) {
        s.classList.remove('closed');
      });
      // Give DOM a moment to update, then trigger print
      setTimeout(function () { window.print(); }, 100);
    });
  }

  // ───── Animate score bars on load ─────
  window.addEventListener('load', function () {
    document.querySelectorAll('.score-track-fill, .subscore-bar-fill, .sprint-bar-fill').forEach(function (el) {
      var target = el.getAttribute('data-width') || el.style.width;
      el.style.width = '0%';
      requestAnimationFrame(function () {
        setTimeout(function () { el.style.width = target; }, 120);
      });
    });
  });

})();
