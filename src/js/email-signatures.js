/**
 * SOURX Official Email Signature — Interactive Generator & Copy Controller
 * Allows real-time customization and one-click rich-text / HTML clipboard export.
 */

import '../css/main.css';
import '../css/email-signatures.css';

document.addEventListener('DOMContentLoaded', () => {
  initSignatureGenerator();
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
 * Live Signature Generator & Clipboard Controller
 */
function initSignatureGenerator() {
  const inputName = document.getElementById('inputName');
  const inputRole = document.getElementById('inputRole');
  const inputEmail = document.getElementById('inputEmail');
  const inputPhone = document.getElementById('inputPhone');

  const dispName = document.getElementById('dispName');
  const dispRole = document.getElementById('dispRole');
  const dispEmail = document.getElementById('dispEmail');
  const dispPhone = document.getElementById('dispPhone');

  const dispMobileName = document.getElementById('dispMobileName');
  const dispMobileRole = document.getElementById('dispMobileRole');
  const dispMobileEmail = document.getElementById('dispMobileEmail');
  const dispMobilePhone = document.getElementById('dispMobilePhone');
  const dispMobileRecipient = document.getElementById('dispMobileRecipient');

  const btnCopyVisual = document.getElementById('btnCopyVisual');
  const btnCopyHtml = document.getElementById('btnCopyHtml');
  const btnReset = document.getElementById('btnReset');
  const copyFeedback = document.getElementById('copyFeedback');
  const signatureWrap = document.getElementById('sourxOfficialSignature');

  if (!signatureWrap) return;

  const defaultValues = {
    name: 'Marc Dupont',
    role: 'Consultant Stratégique & Associé',
    email: 'marc.dupont@sourx.com',
    phone: '+44 2081239177'
  };

  function updateDisplay() {
    const nameVal = inputName?.value.trim() || defaultValues.name;
    const roleVal = inputRole?.value.trim() || defaultValues.role;
    const emailVal = inputEmail?.value.trim() || defaultValues.email;
    const phoneVal = inputPhone?.value.trim() || defaultValues.phone;

    // Desktop
    if (dispName) dispName.textContent = nameVal;
    if (dispRole) dispRole.innerHTML = `${escapeHtml(roleVal)} &bull; <strong style="color:#012e5c;">SOURX EMEA</strong>`;
    if (dispEmail) {
      dispEmail.textContent = emailVal;
      dispEmail.href = `mailto:${emailVal}`;
    }
    if (dispPhone) {
      dispPhone.textContent = phoneVal;
      dispPhone.href = `tel:${phoneVal.replace(/\s+/g, '')}`;
    }

    // Mobile
    if (dispMobileName) dispMobileName.textContent = nameVal;
    if (dispMobileRole) dispMobileRole.textContent = roleVal;
    if (dispMobileEmail) {
      dispMobileEmail.textContent = emailVal;
      dispMobileEmail.href = `mailto:${emailVal}`;
    }
    if (dispMobilePhone) {
      dispMobilePhone.textContent = phoneVal;
      dispMobilePhone.href = `tel:${phoneVal.replace(/\s+/g, '')}`;
    }
    if (dispMobileRecipient) {
      dispMobileRecipient.textContent = emailVal;
    }
  }

  // Live input synchronization
  [inputName, inputRole, inputEmail, inputPhone].forEach(input => {
    if (input) {
      input.addEventListener('input', updateDisplay);
    }
  });

  // Reset button
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (inputName) inputName.value = defaultValues.name;
      if (inputRole) inputRole.value = defaultValues.role;
      if (inputEmail) inputEmail.value = defaultValues.email;
      if (inputPhone) inputPhone.value = defaultValues.phone;
      updateDisplay();
    });
  }

  function showFeedback(msg) {
    if (!copyFeedback) return;
    copyFeedback.innerHTML = msg;
    copyFeedback.style.display = 'block';
    setTimeout(() => {
      copyFeedback.style.display = 'none';
    }, 5000);
  }

  // 1. Copy Rich Text / Formatted Signature to Clipboard
  if (btnCopyVisual) {
    btnCopyVisual.addEventListener('click', async () => {
      const originalText = btnCopyVisual.innerHTML;
      try {
        const html = signatureWrap.innerHTML;
        const text = signatureWrap.innerText;

        if (navigator.clipboard && window.ClipboardItem) {
          const blobHtml = new Blob([html], { type: 'text/html' });
          const blobText = new Blob([text], { type: 'text/plain' });
          const item = new ClipboardItem({
            'text/html': blobHtml,
            'text/plain': blobText
          });
          await navigator.clipboard.write([item]);
        } else {
          // Fallback selection copy
          const range = document.createRange();
          range.selectNode(signatureWrap);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('copy');
          selection.removeAllRanges();
        }

        btnCopyVisual.innerHTML = '<span>✓ Signature Copiée !</span>';
        btnCopyVisual.style.backgroundColor = '#a4d622';
        showFeedback('✓ Signature copiée avec succès ! Ouvrez vos paramètres d\'email (Gmail, Outlook, Apple Mail) et collez (<kbd>Cmd+V</kbd> ou <kbd>Ctrl+V</kbd>).');

        setTimeout(() => {
          btnCopyVisual.innerHTML = originalText;
          btnCopyVisual.style.backgroundColor = '';
        }, 2500);
      } catch (err) {
        console.warn('Rich text copy fallback:', err);
        // Fallback text copy
        try {
          await navigator.clipboard.writeText(signatureWrap.innerHTML);
          showFeedback('✓ Code de signature copié dans le presse-papiers.');
        } catch (e) {
          alert('Veuillez copier manuellement la signature sélectionnée.');
        }
      }
    });
  }

  // 2. Copy Raw HTML Code to Clipboard
  if (btnCopyHtml) {
    btnCopyHtml.addEventListener('click', async () => {
      const originalText = btnCopyHtml.innerHTML;
      try {
        const rawHtml = signatureWrap.innerHTML.trim();
        await navigator.clipboard.writeText(rawHtml);

        btnCopyHtml.innerHTML = '<span>✓ Code HTML Copié !</span>';
        btnCopyHtml.style.backgroundColor = '#b6e82c';
        btnCopyHtml.style.color = '#012e5c';
        showFeedback('✓ Code source HTML copié dans le presse-papiers.');

        setTimeout(() => {
          btnCopyHtml.innerHTML = originalText;
          btnCopyHtml.style.backgroundColor = '';
          btnCopyHtml.style.color = '';
        }, 2500);
      } catch (err) {
        console.error('Copy HTML failed:', err);
      }
    });
  }

  function escapeHtml(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }
}
