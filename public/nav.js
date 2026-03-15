(function () {
  function init() {
    // Desktop dropdowns
    document.querySelectorAll('[data-dropdown]').forEach(function (wrap) {
      var btn = wrap.querySelector('[data-dropdown-trigger]');
      var menu = wrap.querySelector('[data-dropdown-menu]');
      if (!btn || !menu) return;
      function openDD() { menu.classList.remove('hidden'); btn.setAttribute('aria-expanded', 'true'); }
      function closeDD() { menu.classList.add('hidden'); btn.setAttribute('aria-expanded', 'false'); }
      wrap.addEventListener('mouseenter', openDD);
      wrap.addEventListener('mouseleave', closeDD);
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.contains('hidden') ? openDD() : closeDD();
      });
      btn.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDD(); });
    });

    document.addEventListener('click', function () {
      document.querySelectorAll('[data-dropdown-menu]').forEach(function (menu) {
        menu.classList.add('hidden');
      });
      document.querySelectorAll('[data-dropdown-trigger]').forEach(function (btn) {
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // Mobile nav
    var nav = document.querySelector('[data-mobile-nav]');
    var openBtn = document.querySelector('[data-mobile-open-btn]');
    var closeBtn = nav ? nav.querySelector('[data-mobile-close-btn]') : null;
    var overlay = nav ? nav.querySelector('[data-mobile-overlay]') : null;

    function getFocusable() {
      if (!nav) return [];
      return Array.from(nav.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function (el) { return !el.closest('[aria-hidden="true"]'); });
    }

    function openNav() {
      if (!nav) return;
      nav.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      setTimeout(function () { if (closeBtn) closeBtn.focus(); }, 50);
    }

    function closeNav() {
      if (!nav) return;
      nav.classList.add('hidden');
      document.body.style.overflow = '';
      if (openBtn) { openBtn.setAttribute('aria-expanded', 'false'); openBtn.focus(); }
    }

    if (openBtn) openBtn.addEventListener('click', function (e) { e.stopPropagation(); openNav(); });
    if (closeBtn) closeBtn.addEventListener('click', closeNav);
    if (overlay) overlay.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav && !nav.classList.contains('hidden')) {
        closeNav();
        return;
      }
      // Focus trap inside mobile nav
      if (e.key === 'Tab' && nav && !nav.classList.contains('hidden')) {
        var focusable = getFocusable();
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
