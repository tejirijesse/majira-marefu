/* Majira Marefu — shared client script */

(function () {
  'use strict';

  // Scroll-triggered nav state
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) nav.classList.add('nav--solid');
      else nav.classList.remove('nav--solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      toggle.textContent = nav.classList.contains('nav--open') ? 'Close' : 'Menu';
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  }

  // Toast helper
  window.toast = function (msg, ms = 4000) {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), ms);
  };

  // Multi-step form controller
  window.initStepForm = function (formId, opts = {}) {
    const form = document.getElementById(formId);
    if (!form) return;
    const steps = [...form.querySelectorAll('.step')];
    const dotsHost = form.querySelector('.step-dots');
    const prevBtn = form.querySelector('[data-prev]');
    const nextBtn = form.querySelector('[data-next]');
    let i = 0;

    if (dotsHost) {
      dotsHost.innerHTML = steps
        .map((_, k) => `<span class="step-dot${k === 0 ? ' active' : ''}" data-k="${k}"></span>`)
        .join('');
    }

    function render() {
      steps.forEach((s, k) => s.classList.toggle('active', k === i));
      if (dotsHost) {
        [...dotsHost.children].forEach((d, k) => {
          d.classList.toggle('active', k === i);
          d.classList.toggle('done', k < i);
        });
      }
      if (prevBtn) prevBtn.disabled = i === 0;
      if (nextBtn) nextBtn.textContent = i === steps.length - 1 ? 'Submit' : 'Continue';
    }

    function validateStep() {
      const active = steps[i];
      const required = [...active.querySelectorAll('[required]')];
      for (const el of required) {
        if (!el.value || !el.value.trim()) {
          el.focus();
          window.toast('This question is required.');
          return false;
        }
      }
      return true;
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); if (i > 0) { i--; render(); } });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!validateStep()) return;
      if (i < steps.length - 1) { i++; render(); return; }
      // submit
      if (opts.onSubmit) opts.onSubmit(new FormData(form));
    });

    render();
  };

  // Plain form handler — mock for now
  window.handleMockSubmit = function (formEl, successMsg) {
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      // Would POST to /api/waitlist etc. in real build
      console.log('[majira] would submit:', Object.fromEntries(new FormData(formEl)));
      formEl.reset();
      if (formEl.dataset.successPanel) {
        const panel = document.getElementById(formEl.dataset.successPanel);
        if (panel) {
          formEl.style.display = 'none';
          panel.style.display = 'block';
        }
      } else {
        window.toast(successMsg || 'Received. We will write back.');
      }
    });
  };

  // Ken-burns parallax hint on hero (subtle mouse influence, desktop only)
  const heroImg = document.querySelector('.hero-img');
  if (heroImg && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 6;
      const y = (e.clientY / window.innerHeight - 0.5) * 4;
      heroImg.style.transform = `scale(1.05) translate(${-x}px, ${-y}px)`;
    });
  }
})();
