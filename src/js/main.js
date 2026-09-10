/**
 * SOURX Digital Experience Platform - Core Interactive Scripts
 * Micro-interactions, dynamic canvas, and scroll intelligence
 */

import '../css/main.css';
import { initI18n } from './i18n.js';

function initApp() {
  try { initI18n(); } catch (err) { console.warn('[SOURX] initI18n:', err); }
  try { initStickyHeader(); } catch (err) { console.warn('[SOURX] initStickyHeader:', err); }
  try { initMobileMenu(); } catch (err) { console.warn('[SOURX] initMobileMenu:', err); }
  try { initFinovateHeroTabs(); } catch (err) { console.warn('[SOURX] initFinovateHeroTabs:', err); }
  try { initAdvisanoServicesTabs(); } catch (err) { console.warn('[SOURX] initAdvisanoServicesTabs:', err); }
  try { initHeroCanvas(); } catch (err) { console.warn('[SOURX] initHeroCanvas:', err); }
  try { initExpertiseAccordion(); } catch (err) { console.warn('[SOURX] initExpertiseAccordion:', err); }
  try { initScrollObserver(); } catch (err) { console.warn('[SOURX] initScrollObserver:', err); }
  try { initAnimatedCounters(); } catch (err) { console.warn('[SOURX] initAnimatedCounters:', err); }
  try { initPresenceMap(); } catch (err) { console.warn('[SOURX] initPresenceMap:', err); }
  try { initAboutScrollTextReveal(); } catch (err) { console.warn('[SOURX] initAboutScrollTextReveal:', err); }
  try { initProcessCardsScrollAlignment(); } catch (err) { console.warn('[SOURX] initProcessCardsScrollAlignment:', err); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ==========================================================================
   1. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   Finovate Hero Tabs & Slider Interaction
   ========================================================================== */
function initFinovateHeroTabs() {
  const tabs = document.querySelectorAll('.finovate-tab-btn');
  const sliderPill = document.querySelector('.finovate-slider-pill');
  const h1 = document.querySelector('.finovate-hero-h1');
  const h2 = document.querySelector('.finovate-hero-h2');
  if (!tabs.length) return;

  const slidesData = [
    {
      line1: 'Votre Partenaire',
      line2: 'Conseil de Confiance',
      sliderPos: '20%'
    },
    {
      line1: 'Excellence &',
      line2: 'Services Financiers',
      sliderPos: '50%'
    },
    {
      line1: 'Stratégie, IA &',
      line2: 'Croissance Pérenne',
      sliderPos: '80%'
    }
  ];

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const data = slidesData[index] || slidesData[0];

      if (sliderPill) {
        sliderPill.style.transition = 'top 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        sliderPill.style.top = data.sliderPos;
      }

      if (h1 && h2) {
        h1.style.opacity = '0';
        h2.style.opacity = '0';
        setTimeout(() => {
          h1.textContent = data.line1;
          h2.textContent = data.line2;
          h1.style.transition = 'opacity 0.3s ease';
          h2.style.transition = 'opacity 0.3s ease';
          h1.style.opacity = '1';
          h2.style.opacity = '1';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   2. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.advisano-hamburger-btn') || document.querySelector('.nav-toggle-btn');
  const drawer = document.querySelector('.advisano-mobile-drawer') || document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.advisano-drawer-close');
  if (!toggleBtn || !drawer) return;

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const toggleDrawer = () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Close when clicking any navigation link inside drawer
  drawer.querySelectorAll('.advisano-drawer-link, .advisano-drawer-cta-btn, .nav-link, .btn').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking outside the inner drawer content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. Hero Interactive Dynamic Network Canvas
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let mouse = { x: null, y: null, radius: 120 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Nodes definition
  const nodeCount = Math.min(38, Math.floor(width / 16));
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.5 + 1.5,
      isAccent: Math.random() > 0.8, // subtle Acid lime accents
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];

      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      // Mouse influence
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          n.x -= (dx / dist) * 0.8;
          n.y -= (dy / dist) * 0.8;
        }
      }

      // Draw connections
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 95) {
          const alpha = (1 - dist / 95) * 0.22;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.strokeStyle = n.isAccent || n2.isAccent 
            ? `rgba(182, 232, 0, ${alpha * 1.5})` 
            : `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw Node
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fillStyle = n.isAccent ? '#b6e800' : '#38BDF8';
      ctx.shadowBlur = n.isAccent ? 10 : 6;
      ctx.shadowColor = n.isAccent ? 'rgba(182, 232, 0, 0.7)' : 'rgba(56, 189, 248, 0.5)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   4. Core Expertise Interactive Accordion
   ========================================================================== */
function initExpertiseAccordion() {
  const rows = document.querySelectorAll('.expertise-row');
  if (!rows.length) return;

  rows.forEach(row => {
    const header = row.querySelector('.expertise-row-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = row.classList.contains('active');

      // Close all other rows
      rows.forEach(r => r.classList.remove('active'));

      // If clicked row wasn't active, activate it
      if (!isActive) {
        row.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   5. Scroll Observer for Reveal Animations
   ========================================================================== */
function initScrollObserver() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Animated Numerical Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-counter'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCounter(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo curve
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(easeOut * endValue);

          target.textContent = `${prefix}${current}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = `${prefix}${endValue}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   7. Interactive Global Presence Map
   ========================================================================== */
function initPresenceMap() {
  const items = document.querySelectorAll('.location-item');
  const nodes = document.querySelectorAll('.map-node');
  if (!items.length || !nodes.length) return;

  items.forEach(item => {
    item.addEventListener('click', () => {
      const country = item.getAttribute('data-location');

      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      nodes.forEach(node => {
        const nodeLocation = node.getAttribute('data-node');
        if (nodeLocation === country) {
          node.classList.add('active');
          node.setAttribute('r', '8');
          node.setAttribute('fill', '#b6e800');
        } else {
          node.classList.remove('active');
          node.setAttribute('r', '5');
          node.setAttribute('fill', '#38BDF8');
        }
      });
    });
  });

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const loc = node.getAttribute('data-node');
      const targetItem = document.querySelector(`.location-item[data-location="${loc}"]`);
      if (targetItem) {
        targetItem.click();
      }
    });
  });
}

/* ==========================================================================
   8. SOURX Interactive Services Bento (Dynamic Synchronization)
   ========================================================================== */
function initAdvisanoServicesTabs() {
  const items = document.querySelectorAll('.advisano-service-item');
  const images = document.querySelectorAll('.advisano-service-img');
  const counterEl = document.getElementById('advisano-services-counter');
  const topBadgeEl = document.getElementById('advisano-active-pillar-label');
  const glassTagEl = document.getElementById('advisano-glass-tag');
  const glassHeadlineEl = document.getElementById('advisano-glass-headline');
  const glassMetricEl = document.getElementById('advisano-glass-metric');
  const glassSubEl = document.getElementById('advisano-glass-sub');

  if (!items.length || !images.length) return;

  const serviceUrls = {
    strategy: '/services/strategy/',
    tech: '/services/technology/',
    innovation: '/services/innovation/',
    finance: '/services/finance/',
    growth: '/services/growth/'
  };

  const metadataByLang = {
    fr: {
      strategy: {
        badge: 'PÔLE STRATÉGIQUE',
        tag: 'ALIGNEMENT C-LEVEL & TERRAIN',
        headline: "Stratégie d'Entreprise",
        metric: '150+',
        sub: 'Missions'
      },
      tech: {
        badge: 'PÔLE DIGITAL & TECH',
        tag: 'APPLICATIONS & LOGICIELS SUR-MESURE',
        headline: 'Web, Mobile & Logiciels',
        metric: '100%',
        sub: 'Sur-Mesure'
      },
      innovation: {
        badge: 'INNOVATION & AUTOMATISATION',
        tag: 'IA & AUTOMATISATION APPLIQUÉE',
        headline: 'Agents IA & Prototypage MVP',
        metric: '40%',
        sub: 'Gain Vélocité'
      },
      finance: {
        badge: 'PÔLE FINANCE & AUDIT',
        tag: 'RIGUEUR FINANCIÈRE & RISQUES',
        headline: 'Restructuration & Conformité',
        metric: '100%',
        sub: 'Audit & Contrôle'
      },
      growth: {
        badge: 'PÔLE ACQUISITION & CROISSANCE',
        tag: 'PIPELINES CLIENTS QUALIFIÉS',
        headline: 'Acquisition & Lead Management',
        metric: '+80%',
        sub: 'Taux Succès'
      }
    },
    en: {
      strategy: {
        badge: 'STRATEGY PRACTICE',
        tag: 'BOARDROOM RIGOR & EXECUTION',
        headline: 'Corporate Strategy & Governance',
        metric: '150+',
        sub: 'Missions'
      },
      tech: {
        badge: 'TECH & DIGITAL PRACTICE',
        tag: 'CUSTOM WEB & MOBILE APPS',
        headline: 'Web, Mobile & Software Dev',
        metric: '100%',
        sub: 'Tailored'
      },
      innovation: {
        badge: 'INNOVATION & AUTOMATION',
        tag: 'APPLIED AI & AUTOMATION',
        headline: 'AI Agents & 30-Day MVP',
        metric: '40%',
        sub: 'Velocity Gain'
      },
      finance: {
        badge: 'FINANCE & AUDIT PRACTICE',
        tag: 'CAPITAL & RISK GOVERNANCE',
        headline: 'Turnaround Consulting & Assurance',
        metric: '100%',
        sub: 'Audit Compliance'
      },
      growth: {
        badge: 'GROWTH & ACQUISITION PRACTICE',
        tag: 'QUALIFIED LEAD PIPELINES',
        headline: 'Structured Acquisition Systems',
        metric: '+80%',
        sub: 'Client Growth'
      }
    },
    es: {
      strategy: {
        badge: 'PRÁCTICA ESTRATÉGICA',
        tag: 'RIGOR DIRECTIVO Y EJECUCIÓN',
        headline: 'Estrategia Corporativa y Gobierno',
        metric: '150+',
        sub: 'Misiones'
      },
      tech: {
        badge: 'PRÁCTICA DIGITAL Y TECH',
        tag: 'APLICACIONES Y SOFTWARE A MEDIDA',
        headline: 'Web, Móvil y Software',
        metric: '100%',
        sub: 'A Medida'
      },
      innovation: {
        badge: 'INNOVACIÓN Y AUTOMATIZACIÓN',
        tag: 'IA Y AUTOMATIZACIÓN APLICADA',
        headline: 'Agentes IA y Prototipado MVP',
        metric: '40%',
        sub: 'Más Rapidez'
      },
      finance: {
        badge: 'FINANZAS Y AUDITORÍA',
        tag: 'RIGOR FINANCIERO Y GOBERNANZA',
        headline: 'Reestructuración y Cumplimiento',
        metric: '100%',
        sub: 'Auditoría Legal'
      },
      growth: {
        badge: 'CAPTACIÓN Y CRECIMIENTO',
        tag: 'EMBUDOS DE PROSPECCIÓN CUALIFICADOS',
        headline: 'Sistemas de Captación Estructurados',
        metric: '+80%',
        sub: 'Crecimiento'
      }
    }
  };

  let currentTarget = 'strategy';

  function updateVisuals(target, indexStr) {
    currentTarget = target;
    const currentLang = localStorage.getItem('sourx_lang') || 'en';
    const langData = metadataByLang[currentLang] || metadataByLang.en;
    const data = langData[target] || langData.strategy;

    if (counterEl && indexStr) {
      counterEl.textContent = `${indexStr} / 05`;
    }

    if (topBadgeEl) {
      topBadgeEl.textContent = data.badge;
    }

    if (glassTagEl) glassTagEl.textContent = data.tag;
    if (glassHeadlineEl) glassHeadlineEl.textContent = data.headline;
    if (glassMetricEl) glassMetricEl.textContent = data.metric;
    if (glassSubEl) glassSubEl.textContent = data.sub;

    const imageLinkEl = document.getElementById('advisano-services-image-link');
    if (imageLinkEl && serviceUrls[target]) {
      imageLinkEl.href = serviceUrls[target];
    }
  }

  items.forEach(item => {
    const activate = () => {
      const target = item.getAttribute('data-target');
      const indexStr = item.getAttribute('data-index') || '01';
      if (!target) return;

      // Update active states on items
      items.forEach(i => {
        i.classList.remove('active');
        i.setAttribute('aria-selected', 'false');
      });
      item.classList.add('active');
      item.setAttribute('aria-selected', 'true');

      // Cross-fade to target image
      images.forEach(img => {
        if (img.getAttribute('data-service') === target) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      updateVisuals(target, indexStr);
    };

    item.addEventListener('mouseenter', activate);
    item.addEventListener('focus', activate);
    item.addEventListener('click', () => {
      activate();
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        const url = item.getAttribute('href') || serviceUrls[item.getAttribute('data-target')];
        if (url) window.location.href = url;
      }
    });
  });

  // Re-sync labels when language toggles
  window.addEventListener('sourx:langChange', () => {
    const activeItem = document.querySelector('.advisano-service-item.active');
    const indexStr = activeItem ? activeItem.getAttribute('data-index') : '01';
    updateVisuals(currentTarget, indexStr);
  });
}

/* ==========================================================================
   Scroll Text Reveal Effect (About Us Narrative)
   Progressively reveals words as the user scrolls past the narrative
   ========================================================================== */
function initAboutScrollTextReveal() {
  const statement = document.querySelector('.advisano-about-statement');
  if (!statement) return;

  let words = [];

  function tokenizeNode(node, extraClasses = '') {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) return [document.createTextNode(text)];

      // Split words while preserving spaces
      const parts = text.split(/(\s+)/);
      const result = [];
      parts.forEach(part => {
        if (/^\s+$/.test(part)) {
          result.push(document.createTextNode(part));
        } else if (part.length > 0) {
          const span = document.createElement('span');
          span.className = `scroll-reveal-word ${extraClasses}`.trim();
          span.textContent = part;
          result.push(span);
        }
      });
      return result;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const clone = node.cloneNode(false);
      let childClasses = extraClasses;
      const tag = node.tagName.toLowerCase();
      if (tag === 'strong' || tag === 'b') {
        childClasses += ' strong-word';
      } else if (node.classList.contains('advisano-text-muted')) {
        childClasses += ' muted-word';
      }

      Array.from(node.childNodes).forEach(child => {
        const childNodes = tokenizeNode(child, childClasses);
        childNodes.forEach(c => clone.appendChild(c));
      });
      return [clone];
    }
    return [node.cloneNode(true)];
  }

  function setupWords() {
    const rawNodes = Array.from(statement.childNodes);
    const fragment = document.createDocumentFragment();

    rawNodes.forEach(node => {
      const tokenized = tokenizeNode(node);
      tokenized.forEach(n => fragment.appendChild(n));
    });

    statement.innerHTML = '';
    statement.appendChild(fragment);
    words = Array.from(statement.querySelectorAll('.scroll-reveal-word'));
    updateReveal();
  }

  let ticking = false;

  function updateReveal() {
    if (!words.length) return;

    const rect = statement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Fluid reading range: starts as top reaches 78% of viewport, finishes around 30%
    const startY = windowHeight * 0.78;
    const endY = windowHeight * 0.28;
    const totalDistance = startY - endY + rect.height * 0.35;
    const progress = Math.max(0, Math.min(1, (startY - rect.top) / totalDistance));

    const activeCount = Math.floor(progress * words.length);

    words.forEach((word, index) => {
      if (index <= activeCount && progress > 0) {
        word.classList.add('is-revealed');
      } else {
        word.classList.remove('is-revealed');
      }
    });

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateReveal);
      ticking = true;
    }
  }

  setupWords();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Dynamically re-tokenize if the user toggles language (FR, EN, ES)
  window.addEventListener('sourx:langChange', () => {
    setTimeout(setupWords, 25);
  });
}

/* ==========================================================================
   Process Cards Scroll Alignment
   Progressively aligns the staggered cards horizontally as the user scrolls
   ========================================================================== */
function initProcessCardsScrollAlignment() {
  const section = document.getElementById('process') || document.querySelector('.advisano-process-section');
  const grid = document.querySelector('.advisano-process-grid');
  if (!section || !grid) return;

  const card1 = grid.querySelector('.card-step-1');
  const card2 = grid.querySelector('.card-step-2');
  const card3 = grid.querySelector('.card-step-3');
  if (!card1 || !card2 || !card3) return;

  let ticking = false;

  function updateCardAlignment() {
    // Only run horizontal staircase alignment on desktop (where grid has 3 columns)
    if (window.innerWidth <= 992 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      grid.style.removeProperty('--step2-offset');
      grid.style.removeProperty('--step3-offset');
      grid.classList.remove('is-aligned');
      ticking = false;
      return;
    }

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Responsive baseline offsets matching visual proportions
    const baseOffset = Math.min(140, Math.max(85, window.innerWidth * 0.085));
    const maxOffset2 = baseOffset;
    const maxOffset3 = baseOffset * 2;

    // Alignment window:
    // Starts aligning when the section enters lower viewport (78% from top)
    // Reaches perfect alignment when section is in comfortable reading position (15% from top)
    const startY = windowHeight * 0.78;
    const endY = windowHeight * 0.15;
    const totalRange = startY - endY;

    // Scroll progress from 0 (staggered) to 1 (aligned)
    const rawProgress = Math.max(0, Math.min(1, (startY - rect.top) / totalRange));

    // Smooth physical easing (easeOutCubic) for natural settling
    const ease = 1 - Math.pow(1 - rawProgress, 2.4);

    const currentOffset2 = (1 - ease) * maxOffset2;
    const currentOffset3 = (1 - ease) * maxOffset3;

    grid.style.setProperty('--step2-offset', `${currentOffset2.toFixed(1)}px`);
    grid.style.setProperty('--step3-offset', `${currentOffset3.toFixed(1)}px`);

    if (rawProgress >= 0.95) {
      grid.classList.add('is-aligned');
    } else {
      grid.classList.remove('is-aligned');
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateCardAlignment);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateCardAlignment();
}
