/**
 * SOURX Email Signatures Showcase — Interactive Controller
 * Handles filter selection, responsive modals, and HTML snippet inspector.
 */

import '../css/main.css';
import '../css/email-signatures.css';

document.addEventListener('DOMContentLoaded', () => {
  initFilterPills();
  initSignatureModals();
  initMobileDrawer();
});

/**
 * Mobile Drawer Menu Controller
 */
function initMobileDrawer() {
  const hamburger = document.querySelector('.advisano-hamburger-btn');
  const drawer = document.getElementById('advisano-mobile-menu');
  const closeBtn = document.querySelector('.advisano-drawer-close');

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Filter Cards by Category
 */
function initFilterPills() {
  const filterBtns = document.querySelectorAll('.sig-filter-btn');
  const cards = document.querySelectorAll('.sig-card');
  const countDisplay = document.querySelector('.sig-showing-count');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Update active state on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      let visibleCount = 0;

      cards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        const categoryList = categories.split(',').map(c => c.trim().toLowerCase());

        if (category === 'all' || categoryList.includes(category.toLowerCase())) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (countDisplay) {
        countDisplay.textContent = visibleCount;
      }
    });
  });
}

/**
 * Inspection Modal Controller
 */
function initSignatureModals() {
  const backdrop = document.getElementById('sigInspectModal');
  if (!backdrop) return;

  const closeBtn = backdrop.querySelector('.sig-modal-close-btn');
  const modalTitle = backdrop.querySelector('#modalConceptTitle');
  const modalNum = backdrop.querySelector('#modalConceptNum');
  const modalCanvasDesktop = backdrop.querySelector('#modalDesktopCanvas');
  const modalCanvasMobile = backdrop.querySelector('#modalMobileCanvas');
  const modalRationale = backdrop.querySelector('#modalRationale');
  const modalAudience = backdrop.querySelector('#modalAudience');
  const modalCodeBox = backdrop.querySelector('#modalCodeSnippet');
  const copyBtn = backdrop.querySelector('#modalCopyBtn');

  // Trigger buttons
  const inspectBtns = document.querySelectorAll('.sig-inspect-btn, .sig-card-preview-clickable');

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.sig-card');
      if (!card) return;

      const num = card.getAttribute('data-num') || '';
      const name = card.getAttribute('data-name') || '';
      const rationale = card.getAttribute('data-rationale') || '';
      const audience = card.getAttribute('data-audience') || '';
      const desktopHtml = card.querySelector('.sig-canvas-desktop .es-wrapper')?.outerHTML || '';
      const mobileHtml = card.querySelector('.sig-canvas-mobile .es-wrapper')?.outerHTML || '';
      const emailRawSnippet = card.querySelector('.sig-raw-html-template')?.innerHTML.trim() || desktopHtml;

      if (modalNum) modalNum.textContent = num;
      if (modalTitle) modalTitle.textContent = name;
      if (modalRationale) modalRationale.textContent = rationale;
      if (modalAudience) modalAudience.textContent = audience;
      if (modalCanvasDesktop) modalCanvasDesktop.innerHTML = desktopHtml;
      if (modalCanvasMobile) modalCanvasMobile.innerHTML = mobileHtml;
      if (modalCodeBox) modalCodeBox.textContent = cleanEmailHtmlForDisplay(emailRawSnippet);

      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Copy HTML snippet button
  if (copyBtn && modalCodeBox) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(modalCodeBox.textContent);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#b6e82c';
        copyBtn.style.color = '#012e5c';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.backgroundColor = '';
          copyBtn.style.color = '';
        }, 2000);
      } catch (err) {
        console.warn('Clipboard write failed:', err);
      }
    });
  }
}

/**
 * Format HTML string cleanly
 */
function cleanEmailHtmlForDisplay(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
}
