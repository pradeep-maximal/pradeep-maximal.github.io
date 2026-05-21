/* ============================================================
   PORTFOLIO SCRIPTS — PRADEEP RAGUNATHAN KARUNAKARAN
   ============================================================ */

/* ── Config ─────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY71EvQBRMlI4dulHR4';   // replace after creating EmailJS account
const EMAILJS_SERVICE_ID  = 'service_5cqf6xl';   // replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_wwnnidh';  // replace with your EmailJS template ID

const TYPED_STRINGS = [
  'Service Desk Analyst',
  'Troubleshooting Expert',
  'ITIL Certified',
  'Security-Focused',
  'IT Support Engineer',
];

/* ── Theme ───────────────────────────────────────────────── */
function initTheme() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  if (!btn) return;

  function applyTheme(mode) {
    const isLight = mode === 'light';
    document.body.classList.toggle('light-theme', isLight);
    icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    btn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    localStorage.setItem('theme', mode);
  }

  btn.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
  });

  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    applyTheme('light');
  } else {
    applyTheme('dark');
  }
}

/* ── Navigation ──────────────────────────────────────────── */
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navbar    = document.getElementById('navbar');
  if (!hamburger || !navLinks || !navbar) return;

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Glassmorphism on scroll
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    toggleBackToTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => activeObserver.observe(s));
}

/* ── Back to Top ─────────────────────────────────────────── */
function toggleBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Typing Effect ───────────────────────────────────────── */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  let stringIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  const SPEED_TYPE   = 85;
  const SPEED_DELETE = 50;
  const PAUSE_END    = 2000;
  const PAUSE_START  = 450;

  function tick() {
    const current = TYPED_STRINGS[stringIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        stringIdx = (stringIdx + 1) % TYPED_STRINGS.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }

  tick();
}

/* ── Scroll Animations ───────────────────────────────────── */
function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-in-section');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(el => observer.observe(el));
}

/* ── Animated Counters ───────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseInt(el.dataset.target, 10);
      const suffix  = el.dataset.suffix || '';
      const steps   = 40;
      const delay   = 1400 / steps;
      let   current = 0;

      const interval = setInterval(() => {
        current += target / steps;
        if (current >= target) {
          el.textContent = target + suffix;
          clearInterval(interval);
        } else {
          el.textContent = Math.floor(current) + suffix;
        }
      }, delay);

      obs.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(c => observer.observe(c));
}

/* ── Skills Tabs ─────────────────────────────────────────── */
function initSkillsTabs() {
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.skills-panel');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => {
        p.classList.remove('active');
        p.hidden = true;
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('tab-' + btn.dataset.tab);
      if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
      }
    });

    // Arrow key navigation (ARIA pattern)
    btn.addEventListener('keydown', (e) => {
      const tabs = [...tabBtns];
      const idx  = tabs.indexOf(btn);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        tabs[(idx + 1) % tabs.length].focus();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        tabs[(idx - 1 + tabs.length) % tabs.length].focus();
      }
    });
  });
}

/* ── Contact Form ────────────────────────────────────────── */
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  // Progressive validation: mark field as touched on blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => field.classList.add('touched'));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Mark all required fields as touched to show errors
    form.querySelectorAll('input[required], textarea[required]').forEach(f => {
      f.classList.add('touched');
    });

    if (!form.checkValidity()) {
      showStatus(status, 'Please fill in all required fields.', 'error');
      return;
    }

    const submitBtn  = document.getElementById('form-submit');
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    submitBtn.disabled = true;
    btnText.hidden     = true;
    btnLoading.hidden  = false;
    status.className   = '';

    const params = {
      name:    document.getElementById('contact-name').value.trim(),
      email:   document.getElementById('contact-email').value.trim(),
      subject: document.getElementById('contact-subject').value || 'General Enquiry',
      message: document.getElementById('contact-message').value.trim(),
    };

    // If EmailJS keys are not configured, fall back to mailto
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      const mailtoLink = `mailto:pradeep23rk@gmail.com?subject=${encodeURIComponent(params.subject)}&body=${encodeURIComponent(`Name: ${params.name}\nEmail: ${params.email}\n\n${params.message}`)}`;
      window.location.href = mailtoLink;
      submitBtn.disabled = false;
      btnText.hidden     = false;
      btnLoading.hidden  = true;
      showStatus(status, 'Opening your email client — EmailJS is not yet configured.', 'success');
      return;
    }

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
      showStatus(status, "Message sent! I'll get back to you soon.", 'success');
      form.reset();
      form.querySelectorAll('.touched').forEach(f => f.classList.remove('touched'));
    } catch (err) {
      showStatus(status, 'Something went wrong. Please email me directly at pradeep23rk@gmail.com', 'error');
    } finally {
      submitBtn.disabled = false;
      btnText.hidden     = false;
      btnLoading.hidden  = true;
    }
  });
}

function showStatus(el, msg, type) {
  el.textContent   = msg;
  el.className     = type === 'success' ? 'form-status-success' : 'form-status-error';
  el.style.display = '';  // let CSS class control visibility
}

/* ── EmailJS Init ────────────────────────────────────────── */
function initEmailJS() {
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
}

/* ── Entry Point ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  initTheme();
  initNavigation();
  initBackToTop();
  initTypingEffect();
  initScrollAnimations();
  initCounters();
  initSkillsTabs();
  initContactForm();
});
