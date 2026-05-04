/* ============================================================
   Rootss Digital — Main JavaScript
   - Language switcher (EN/ES)
   - Mobile navigation toggle
   - FAQ accordion
   - Contact form handling (Netlify)
   - Fade-in scroll animations
   - Active nav state
   ============================================================ */

(function () {
  'use strict';

  /* ── Language Switcher ── */
  const LANG_KEY = 'rootss_lang';

  function setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_KEY, lang);

    document.querySelectorAll('.lang-en').forEach(el => {
      el.hidden = (lang === 'es');
    });
    document.querySelectorAll('.lang-es').forEach(el => {
      el.hidden = (lang === 'en');
    });

    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      el.textContent = lang === 'es' ? el.dataset.es : el.dataset.en;
    });

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        lang === 'en'
          ? 'Switch to Spanish / Cambiar a Español'
          : 'Switch to English / Cambiar a Inglés'
      );
    }
  }

  function initLanguage() {
    const saved = localStorage.getItem(LANG_KEY) || 'en';
    setLanguage(saved);

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = localStorage.getItem(LANG_KEY) || 'en';
        setLanguage(current === 'en' ? 'es' : 'en');
      });
    }
  }

  /* ── Mobile Navigation ── */
  function initNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });

    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ── Active Nav State ── */
  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.main-nav a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === '/' ? path === '/' : path.startsWith(href)) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── FAQ Accordion ── */
  function initFaq() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });
  }

  /* ── Contact Form (Netlify Forms) ── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const successMsg = document.getElementById('form-success');
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const err = field.parentElement.querySelector('.form-error');
        if (!field.value.trim()) {
          valid = false;
          field.setAttribute('aria-invalid', 'true');
          if (err) err.style.display = 'block';
        } else {
          field.setAttribute('aria-invalid', 'false');
          if (err) err.style.display = 'none';
        }
      });

      if (!valid) return;

      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';

      try {
        const formData = new FormData(form);
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          form.style.display = 'none';
          if (successMsg) successMsg.style.display = 'block';
        } else {
          throw new Error('Submission failed');
        }
      } catch {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        alert('Something went wrong. Please email sandra@rootssdigital.com directly.');
      }
    });

    const notifyForm = document.getElementById('notify-form');
    if (notifyForm) {
      const notifySuccess = document.getElementById('notify-success');
      notifyForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(notifyForm);
        try {
          await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
          });
          notifyForm.style.display = 'none';
          if (notifySuccess) notifySuccess.style.display = 'block';
        } catch {
          alert('Something went wrong. Please try again.');
        }
      });
    }
  }

  /* ── Scroll Fade-in Animations ── */
  function initFadeIn() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initNav();
    initActiveNav();
    initFaq();
    initContactForm();
    initFadeIn();
  });
})();
