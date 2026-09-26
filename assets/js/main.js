/* ==========================================================================
   IROCLEAR SOLUTIONS - site scripts
   Plain JavaScript. No libraries, no external requests except the form service.
   ========================================================================== */
(function () {
  'use strict';

  /* ======================================================================
     ONE-TIME SETUP - STEP 8 IN THE INSTRUCTIONS
     ----------------------------------------------------------------------
     Paste your Web3Forms access key between the quotes below (it looks
     like a long string of letters and numbers, e.g. "a1b2c3d4-....").
     Until you do, the contact form will politely tell visitors to email
     you instead. Nothing else on the site depends on this.
     ====================================================================== */
  var WEB3FORMS_ACCESS_KEY = 'PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE';
  var FORM_ENDPOINT = 'https://api.web3forms.com/submit';
  var FALLBACK_EMAIL = 'info@iroclearsolutions.online';

  /* ---------------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* ---------------------------------------------------------------------
     Header shadow on scroll
     --------------------------------------------------------------------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Footer year
     --------------------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------------------
     In-page anchor offset (keeps the sticky header from covering headings)
     --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 90;
      var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: top, behavior: smooth ? 'smooth' : 'auto' });
      history.replaceState(null, '', id);
    });
  });

  /* ---------------------------------------------------------------------
     Contact form
     --------------------------------------------------------------------- */
  var form = document.getElementById('inquiryForm');
  if (!form) return;

  var statusEl = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');
  var keyMissing = WEB3FORMS_ACCESS_KEY.indexOf('PASTE-YOUR') === 0;

  function setStatus(kind, html) {
    if (!statusEl) return;
    statusEl.className = 'form-status is-visible ' + (kind === 'ok' ? 'is-ok' : 'is-err');
    statusEl.innerHTML = html;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('is-invalid');

    if (!form.checkValidity()) {
      setStatus('err', 'Please fill in the required fields marked with an asterisk.');
      var firstBad = form.querySelector(':invalid');
      if (firstBad && firstBad.focus) firstBad.focus();
      return;
    }

    if (keyMissing) {
      setStatus('err',
        'This form is not switched on yet - the site owner still needs to finish one setup step. ' +
        'In the meantime please email <a href="mailto:' + FALLBACK_EMAIL + '">' + FALLBACK_EMAIL + '</a> directly.');
      return;
    }

    var data = new FormData(form);
    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('subject', 'New website enquiry - IROCLEAR SOLUTIONS');
    data.append('from_name', 'IROCLEAR SOLUTIONS website');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }
    setStatus('ok', 'Sending your enquiry...');
    statusEl.className = 'form-status is-visible is-ok';

    fetch(FORM_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (res) { return res.json().catch(function () { return {}; }); })
      .then(function (json) {
        if (json && json.success) {
          form.reset();
          form.classList.remove('is-invalid');
          setStatus('ok', 'Thank you - your enquiry has been sent. We will reply within one working day. If it is urgent, email us directly at <a href="mailto:' + FALLBACK_EMAIL + '">' + FALLBACK_EMAIL + '</a>.');
        } else {
          throw new Error((json && json.message) || 'Send failed');
        }
      })
      .catch(function () {
        setStatus('err', 'Sorry - something went wrong sending that. Please email <a href="mailto:' + FALLBACK_EMAIL + '">' + FALLBACK_EMAIL + '</a> and we will pick it up from there.');
      })
      .then(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send enquiry';
        }
      });
  });
})();
