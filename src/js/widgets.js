/**
 * SOURX Global Interactive Widgets
 * 1. Back to Top Smooth Scroller
 * 2. Executive Advisory Live Discussion Widget (Chat Concierge)
 * Fully synchronized with active site language (FR, EN, ES)
 */

export function initGlobalWidgets() {
  initBackToTop();
  initChatWidget();
}

/* ==========================================================================
   1. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  if (document.getElementById('sourx-back-to-top')) return;

  const btn = document.createElement('button');
  btn.id = 'sourx-back-to-top';
  btn.className = 'sourx-back-to-top';
  btn.setAttribute('aria-label', 'Remonter en haut de page');
  btn.setAttribute('title', 'Remonter en haut');
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  `;

  document.body.appendChild(btn);

  let ticking = false;
  const updateVisibility = () => {
    if (window.scrollY > 320) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateVisibility);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  updateVisibility();
}

/* ==========================================================================
   2. Executive Advisory Live Discussion Widget (Language Synchronized)
   ========================================================================== */
function initChatWidget() {
  if (document.getElementById('sourx-chat-widget')) return;

  const getCurrentLang = () => {
    if (typeof window !== 'undefined' && typeof window.sourxGetLanguage === 'function') {
      return window.sourxGetLanguage();
    }
    return localStorage.getItem('sourx_lang') || document.documentElement.lang || 'fr';
  };

  const strings = {
    fr: {
      launcher_title: "Des questions ?",
      launcher_sub: "Assistance SOURX",
      header_title: "Conseil & Direction SOURX",
      header_status: "En ligne • Réponse rapide",
      just_now: "À l'instant",
      welcome_msg: "Bonjour et bienvenue chez SOURX EMEA. Comment pouvons-nous vous orienter aujourd'hui ? Nos associés répondent à vos questions stratégiques, comptables et techniques.",
      chip_consult: "Planifier une consultation avec un associé",
      chip_accounting: "Expertise comptable, audit & bilans",
      chip_call: "Contacter la permanence (+44 2081239177)",
      chip_leave_msg: "Poser une question spécifique",
      input_ph: "Écrivez votre message ici...",
      direct_call: "+44 2081239177",
      direct_email: "info@sourx.com",
      back_to_top: "Remonter en haut de page",
      ans_consult: "Avec plaisir ! Vous pouvez réserver votre créneau directement sur notre <a href='/contact/'>page de consultation</a> ou nous appeler au <a href='tel:+442081239177'>+44 2081239177</a>.",
      ans_accounting: "Notre <strong>Pôle 01 (Cœur de métier)</strong> assure la tenue de vos comptes, la certification de bilans, le commissariat aux comptes et l'audit légal international. <a href='/services/finance/'>Découvrir nos services d'audit &amp; finance →</a>",
      ans_call: "Notre permanence conseil est joignable du lundi au vendredi de 8h à 18h (UK Time) au <a href='tel:+442081239177'><strong>+44 2081239177</strong></a> ou par email à <a href='mailto:info@sourx.com'>info@sourx.com</a>.",
      ans_form_prompt: "Veuillez renseigner votre email ou téléphone pour qu'un associé vous réponde directement sous 24h ouvrées :",
      form_email_ph: "Votre email professionnel...",
      form_btn: "Envoyer ma demande",
      form_success: "Demande bien reçue. Un associé senior SOURX prendra contact sous 24h.",
      default_response: "Merci pour votre message. Nos associés examinent toutes les demandes confidentiellement sous 24h ouvrées. Vous pouvez également nous joindre directement au <a href='tel:+442081239177'>+44 2081239177</a> ou à <a href='mailto:info@sourx.com'>info@sourx.com</a>."
    },
    en: {
      launcher_title: "Have questions?",
      launcher_sub: "SOURX Advisory",
      header_title: "SOURX Advisory Desk",
      header_status: "Online • Quick response",
      just_now: "Just now",
      welcome_msg: "Hello and welcome to SOURX EMEA. How may we assist you today? Our partners are here to address your strategic, accounting, or technology requirements.",
      chip_consult: "Schedule a partner consultation",
      chip_accounting: "Chartered accountancy & statutory audit",
      chip_call: "Direct phone desk (+44 2081239177)",
      chip_leave_msg: "Ask a specific inquiry",
      input_ph: "Type your inquiry here...",
      direct_call: "+44 2081239177",
      direct_email: "info@sourx.com",
      back_to_top: "Back to top",
      ans_consult: "We would be delighted to connect. You can book an appointment on our <a href='/contact/'>consultation page</a> or reach our desk directly at <a href='tel:+442081239177'>+44 2081239177</a>.",
      ans_accounting: "Our <strong>Core Practice #01</strong> delivers statutory audit, annual financial statements, tax compliance, and financial engineering across the UK, Spain, and Africa. <a href='/services/finance/'>Explore Chartered Accountancy →</a>",
      ans_call: "Our advisory desk is available Monday–Friday, 8am–6pm (UK Time) at <a href='tel:+442081239177'><strong>+44 2081239177</strong></a> or via <a href='mailto:info@sourx.com'>info@sourx.com</a>.",
      ans_form_prompt: "Please leave your corporate email or telephone number so a partner can follow up directly:",
      form_email_ph: "Your corporate email...",
      form_btn: "Submit inquiry",
      form_success: "Request received. A SOURX partner will connect with you within 24 business hours.",
      default_response: "Thank you for reaching out. A SOURX partner will review your inquiry under strict confidentiality. You can also call directly at <a href='tel:+442081239177'>+44 2081239177</a>."
    },
    es: {
      launcher_title: "¿Preguntas?",
      launcher_sub: "Atención SOURX",
      header_title: "Despacho SOURX Advisory",
      header_status: "En línea • Respuesta rápida",
      just_now: "Ahora",
      welcome_msg: "Hola y bienvenido a SOURX EMEA. ¿Cómo podemos orientarle hoy? Nuestros socios están a su disposición para resolver sus dudas estratégicas, contables o técnicas.",
      chip_consult: "Solicitar una consulta con un socio",
      chip_accounting: "Contabilidad de empresas y auditoría",
      chip_call: "Llamar al despacho (+44 2081239177)",
      chip_leave_msg: "Hacer una consulta específica",
      input_ph: "Escriba su mensaje aquí...",
      direct_call: "+44 2081239177",
      direct_email: "info@sourx.com",
      back_to_top: "Volver arriba",
      ans_consult: "Con mucho gusto. Puede programar una reunión en nuestra <a href='/contact/'>página de contacto</a> o llamarnos al <a href='tel:+442081239177'>+44 2081239177</a>.",
      ans_accounting: "Nuestra <strong>División 01 (Actividad Principal)</strong> gestiona la contabilidad completa, auditoría de cuentas legal y formulación de balances. <a href='/services/finance/'>Ver Contabilidad y Finanzas →</a>",
      ans_call: "Nuestra línea directa atiende de lunes a viernes de 8:00 a 18:00 (hora de Londres) en el <a href='tel:+442081239177'><strong>+44 2081239177</strong></a> o en <a href='mailto:info@sourx.com'>info@sourx.com</a>.",
      ans_form_prompt: "Por favor indique su email corporativo o teléfono para que un socio se ponga en contacto en 24 horas:",
      form_email_ph: "Su email corporativo...",
      form_btn: "Enviar consulta",
      form_success: "Solicitud recibida. Un socio senior de SOURX se pondrá en contacto en 24 horas laborables.",
      default_response: "Gracias por su mensaje. Un socio de SOURX revisará su solicitud confidencialmente. También puede llamarnos al <a href='tel:+442081239177'>+44 2081239177</a>."
    }
  };

  // Professional Vector SVG Icons (No Emojis)
  const icons = {
    calendar: `
      <svg class="sourx-chat-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    `,
    accounting: `
      <svg class="sourx-chat-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    `,
    phone: `
      <svg class="sourx-chat-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `,
    mail: `
      <svg class="sourx-chat-chip-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    `,
    directPhone: `
      <svg class="sourx-chat-direct-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    `,
    directMail: `
      <svg class="sourx-chat-direct-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    `
  };

  const getT = () => strings[getCurrentLang()] || strings.fr;

  const widget = document.createElement('div');
  widget.id = 'sourx-chat-widget';
  widget.className = 'sourx-chat-widget';

  const t = getT();

  widget.innerHTML = `
    <!-- Launcher Button -->
    <button class="sourx-chat-launcher" aria-label="Ouvrir la discussion avec un conseiller" id="sourx-chat-launcher-btn">
      <div class="sourx-chat-launcher-icon-wrap">
        <span class="sourx-chat-pulse-dot"></span>
        <svg class="sourx-chat-icon-msg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        <svg class="sourx-chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </div>
      <div class="sourx-chat-launcher-label">
        <span id="sourx-chat-label-top">${t.launcher_title}</span>
        <span class="sourx-chat-launcher-sub" id="sourx-chat-label-sub">${t.launcher_sub}</span>
      </div>
    </button>

    <!-- Chat Panel -->
    <div class="sourx-chat-panel" id="sourx-chat-panel" role="dialog" aria-modal="true" aria-label="Fenêtre de discussion SOURX">
      <!-- Header -->
      <div class="sourx-chat-header">
        <div class="sourx-chat-header-info">
          <div class="sourx-chat-avatar-box">
            <img src="/images/consultant-portrait.jpg" alt="Associé SOURX">
          </div>
          <div class="sourx-chat-title-group">
            <span class="sourx-chat-title" id="sourx-chat-header-title">${t.header_title}</span>
            <span class="sourx-chat-status">
              <span class="sourx-chat-status-dot"></span>
              <span id="sourx-chat-header-status">${t.header_status}</span>
            </span>
          </div>
        </div>
        <button class="sourx-chat-close-btn" id="sourx-chat-close-btn" aria-label="Fermer la discussion">✕</button>
      </div>

      <!-- Messages Stream -->
      <div class="sourx-chat-messages" id="sourx-chat-messages">
        <!-- Bot Welcome Message -->
        <div class="sourx-chat-msg bot" id="sourx-chat-welcome-msg">
          <div class="sourx-chat-msg-bubble" id="sourx-chat-welcome-bubble">
            ${t.welcome_msg}
          </div>
          <span class="sourx-chat-msg-time" id="sourx-chat-welcome-time">${t.just_now}</span>
        </div>

        <!-- Suggestions Pills with Professional Vector Icons -->
        <div class="sourx-chat-suggestions" id="sourx-chat-suggestions">
          <button type="button" class="sourx-chat-chip-btn" data-action="consult">
            <span class="sourx-chat-chip-icon-box">${icons.calendar}</span>
            <span class="sourx-chat-chip-text" id="sourx-chat-chip-consult-text">${t.chip_consult}</span>
            <span class="sourx-chat-chip-arrow">→</span>
          </button>
          <button type="button" class="sourx-chat-chip-btn" data-action="accounting">
            <span class="sourx-chat-chip-icon-box">${icons.accounting}</span>
            <span class="sourx-chat-chip-text" id="sourx-chat-chip-accounting-text">${t.chip_accounting}</span>
            <span class="sourx-chat-chip-arrow">→</span>
          </button>
          <button type="button" class="sourx-chat-chip-btn" data-action="call">
            <span class="sourx-chat-chip-icon-box">${icons.phone}</span>
            <span class="sourx-chat-chip-text" id="sourx-chat-chip-call-text">${t.chip_call}</span>
            <span class="sourx-chat-chip-arrow">→</span>
          </button>
          <button type="button" class="sourx-chat-chip-btn" data-action="msg">
            <span class="sourx-chat-chip-icon-box">${icons.mail}</span>
            <span class="sourx-chat-chip-text" id="sourx-chat-chip-msg-text">${t.chip_leave_msg}</span>
            <span class="sourx-chat-chip-arrow">→</span>
          </button>
        </div>
      </div>

      <!-- Input Bar -->
      <form class="sourx-chat-input-bar" id="sourx-chat-input-form">
        <input type="text" class="sourx-chat-input" id="sourx-chat-input" placeholder="${t.input_ph}" autocomplete="off" required>
        <button type="submit" class="sourx-chat-send-btn" aria-label="Envoyer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </form>

      <!-- Direct Contact Footer Bar with Clean Vector Icons -->
      <div class="sourx-chat-direct-bar">
        <a href="tel:+442081239177" class="sourx-chat-direct-link">
          ${icons.directPhone}
          <span id="sourx-chat-direct-tel">${t.direct_call}</span>
        </a>
        <a href="mailto:info@sourx.com" class="sourx-chat-direct-link">
          ${icons.directMail}
          <span id="sourx-chat-direct-mail">${t.direct_email}</span>
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  // Dynamic Language Synchronization Function
  function applyLanguage(lang) {
    const curT = strings[lang] || strings.fr;

    const labelTop = widget.querySelector('#sourx-chat-label-top');
    const labelSub = widget.querySelector('#sourx-chat-label-sub');
    if (labelTop) labelTop.textContent = curT.launcher_title;
    if (labelSub) labelSub.textContent = curT.launcher_sub;

    const headerTitle = widget.querySelector('#sourx-chat-header-title');
    const headerStatus = widget.querySelector('#sourx-chat-header-status');
    if (headerTitle) headerTitle.textContent = curT.header_title;
    if (headerStatus) headerStatus.textContent = curT.header_status;

    const welcomeBubble = widget.querySelector('#sourx-chat-welcome-bubble');
    const welcomeTime = widget.querySelector('#sourx-chat-welcome-time');
    if (welcomeBubble) welcomeBubble.innerHTML = curT.welcome_msg;
    if (welcomeTime) welcomeTime.textContent = curT.just_now;

    const chipConsult = widget.querySelector('#sourx-chat-chip-consult-text');
    const chipAccounting = widget.querySelector('#sourx-chat-chip-accounting-text');
    const chipCall = widget.querySelector('#sourx-chat-chip-call-text');
    const chipMsg = widget.querySelector('#sourx-chat-chip-msg-text');
    if (chipConsult) chipConsult.textContent = curT.chip_consult;
    if (chipAccounting) chipAccounting.textContent = curT.chip_accounting;
    if (chipCall) chipCall.textContent = curT.chip_call;
    if (chipMsg) chipMsg.textContent = curT.chip_leave_msg;

    const chatInputEl = widget.querySelector('#sourx-chat-input');
    if (chatInputEl) chatInputEl.placeholder = curT.input_ph;

    const directTel = widget.querySelector('#sourx-chat-direct-tel');
    const directMail = widget.querySelector('#sourx-chat-direct-mail');
    if (directTel) directTel.textContent = curT.direct_call;
    if (directMail) directMail.textContent = curT.direct_email;

    // Also update Back-to-top title/aria-label
    const backBtn = document.getElementById('sourx-back-to-top');
    if (backBtn) {
      backBtn.setAttribute('title', curT.back_to_top);
      backBtn.setAttribute('aria-label', curT.back_to_top);
    }
  }

  // Listen to language switch events dispatched by i18n system
  window.addEventListener('sourx:langChange', (e) => {
    const nextLang = e.detail?.lang || getCurrentLang();
    applyLanguage(nextLang);
  });

  // Apply initially in case language was set prior to widget mount
  applyLanguage(getCurrentLang());

  // Event handlers
  const launcher = widget.querySelector('#sourx-chat-launcher-btn');
  const closeBtn = widget.querySelector('#sourx-chat-close-btn');
  const messagesContainer = widget.querySelector('#sourx-chat-messages');
  const inputForm = widget.querySelector('#sourx-chat-input-form');
  const chatInput = widget.querySelector('#sourx-chat-input');

  const toggleChat = (force) => {
    const isOpen = force !== undefined ? force : !widget.classList.contains('is-open');
    if (isOpen) {
      widget.classList.add('is-open');
      setTimeout(() => chatInput?.focus(), 250);
    } else {
      widget.classList.remove('is-open');
    }
  };

  launcher.addEventListener('click', () => toggleChat());
  closeBtn.addEventListener('click', () => toggleChat(false));

  // Escape key closes chat
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && widget.classList.contains('is-open')) {
      toggleChat(false);
    }
  });

  const getTimeStr = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  const appendMessage = (text, sender = 'bot', isHtml = false) => {
    const msgEl = document.createElement('div');
    msgEl.className = `sourx-chat-msg ${sender}`;
    msgEl.innerHTML = `
      <div class="sourx-chat-msg-bubble">
        ${isHtml ? text : escapeHtml(text)}
      </div>
      <span class="sourx-chat-msg-time">${getTimeStr()}</span>
    `;
    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const showTypingThenReply = (replyHtml, delay = 500) => {
    const typingEl = document.createElement('div');
    typingEl.className = 'sourx-chat-typing';
    typingEl.innerHTML = `
      <span class="sourx-chat-typing-dot"></span>
      <span class="sourx-chat-typing-dot"></span>
      <span class="sourx-chat-typing-dot"></span>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      typingEl.remove();
      appendMessage(replyHtml, 'bot', true);
    }, delay);
  };

  function escapeHtml(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  // Handle suggestion chips
  messagesContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.sourx-chat-chip-btn');
    if (!chip) return;

    const action = chip.dataset.action;
    const currentT = getT();
    const chipText = chip.querySelector('.sourx-chat-chip-text')?.textContent || '';

    // Append user's action
    appendMessage(chipText, 'user');

    if (action === 'consult') {
      showTypingThenReply(currentT.ans_consult);
    } else if (action === 'accounting') {
      showTypingThenReply(currentT.ans_accounting);
    } else if (action === 'call') {
      showTypingThenReply(currentT.ans_call);
    } else if (action === 'msg') {
      showTypingThenReply(`
        <div>${currentT.ans_form_prompt}</div>
        <form class="sourx-chat-mini-form" onsubmit="event.preventDefault(); this.querySelector('button').disabled = true; this.querySelector('button').textContent = '✓ Transmis !'; setTimeout(() => this.innerHTML = '<div style=\\'color:#b6e82c; font-size:12.5px; font-weight:600;\\'>${currentT.form_success}</div>', 400);">
          <input type="email" class="sourx-chat-mini-input" placeholder="${currentT.form_email_ph}" required>
          <button type="submit" class="sourx-chat-mini-submit">${currentT.form_btn} →</button>
        </form>
      `);
    }
  });

  // Handle custom input
  inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    chatInput.value = '';

    const lower = text.toLowerCase();
    const currentT = getT();

    let reply = currentT.default_response;

    if (lower.includes('comptab') || lower.includes('audit') || lower.includes('bilan') || lower.includes('fiscal') || lower.includes('account')) {
      reply = currentT.ans_accounting;
    } else if (lower.includes('consult') || lower.includes('rdv') || lower.includes('devis') || lower.includes('prix') || lower.includes('book') || lower.includes('meet')) {
      reply = currentT.ans_consult;
    } else if (lower.includes('tel') || lower.includes('phone') || lower.includes('appel') || lower.includes('contact') || lower.includes('call')) {
      reply = currentT.ans_call;
    }

    showTypingThenReply(reply, 600);
  });
}
