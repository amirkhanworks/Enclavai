/* ═══════════════════════════════════════════════════════════════════════
   SANCTUM — script.js
   Scroll animations · Chat demo · Nav interactions
   ═══════════════════════════════════════════════════════════════════════ */

'use strict';

/* ── 1. NAV SCROLL EFFECT ──────────────────────────────────────────── */
(function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('nav-mobile');

  // Scrolled class for backdrop blur
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init

  // Hamburger toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();


/* ── 2. SCROLL REVEAL ANIMATIONS ───────────────────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ── 3. SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ── 4. CHAT DEMO ──────────────────────────────────────────────────── */
(function initChatDemo() {
  const askBtn = document.getElementById('demo-ask-btn');
  const messagesEl = document.getElementById('demo-messages');
  const welcomeEl = document.getElementById('demo-welcome');

  if (!askBtn || !messagesEl) return;

  // The realistic AI response
  const USER_QUERY = 'Can I afford a holiday in June?';

  const AI_RESPONSE_LINES = [
    { type: 'text', content: 'Sure — I\'ve checked across your connected accounts. Here\'s a complete picture:' },
    { type: 'divider' },
    { type: 'data', emoji: '💰', label: 'Current balance', value: '£3,240', note: 'Monzo + Starling combined' },
    { type: 'data', emoji: '📅', label: 'Committed outgoings to end of June', value: '£1,890', note: 'rent, subscriptions, direct debits' },
    { type: 'data', emoji: '✈️', label: 'Your last June holiday (2023)', value: '£780', note: 'flights + accommodation + spending' },
    { type: 'data', emoji: '📊', label: 'Free cash available by June 1st', value: '~£1,350', note: 'after all known outgoings' },
    { type: 'divider' },
    { type: 'verdict', content: '✅  Yes — comfortably. You could afford a mid-range UK or European break right now. If you set aside £200/month for the next 3 months, you\'d reach a £1,750 budget with headroom to spare.' },
    { type: 'badge' }
  ];

  let demoPlayed = false;

  askBtn.addEventListener('click', () => {
    if (demoPlayed) return;
    demoPlayed = true;
    askBtn.disabled = true;

    // 1. Remove welcome state
    welcomeEl.style.opacity = '0';
    welcomeEl.style.transform = 'scale(0.97)';
    welcomeEl.style.transition = 'opacity 0.3s, transform 0.3s';

    setTimeout(() => {
      welcomeEl.remove();

      // 2. Add user message
      addUserMessage(USER_QUERY);

      // 3. Show typing indicator after short delay
      setTimeout(() => {
        const typingEl = addTypingIndicator();

        // 4. After typing delay, show AI response
        setTimeout(() => {
          typingEl.remove();
          addAIResponse(AI_RESPONSE_LINES);
        }, 2200);
      }, 600);

    }, 350);
  });

  function addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'msg msg--user';
    msg.innerHTML = `
      <div class="msg-bubble">${escHtml(text)}</div>
    `;
    messagesEl.appendChild(msg);
    scrollToBottom();
  }

  function addTypingIndicator() {
    const msg = document.createElement('div');
    msg.className = 'msg msg--ai';
    msg.innerHTML = `
      <div class="msg-avatar">
        <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 3 L35 9 L35 21 C35 30 28 36 20 38 C12 36 5 30 5 21 L5 9 Z" fill="none" stroke="#5C6BC0" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="20" cy="19" r="5" fill="none" stroke="#7986CB" stroke-width="2"/>
          <rect x="17.5" y="22" width="5" height="7" rx="1.2" fill="#7986CB"/>
        </svg>
      </div>
      <div class="msg-bubble">
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesEl.appendChild(msg);
    scrollToBottom();
    return msg;
  }

  function addAIResponse(lines) {
    const msg = document.createElement('div');
    msg.className = 'msg msg--ai';

    // Build the inner HTML
    let bubbleContent = '';

    lines.forEach(line => {
      switch (line.type) {
        case 'text':
          bubbleContent += `<p style="margin-bottom:10px;">${escHtml(line.content)}</p>`;
          break;
        case 'divider':
          bubbleContent += `<hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:10px 0;">`;
          break;
        case 'data':
          bubbleContent += `
            <div class="ai-data-row" style="margin-bottom:6px;">
              <span style="font-size:15px;flex-shrink:0;">${line.emoji}</span>
              <div style="flex:1;">
                <span style="color:var(--text-3);font-size:12px;">${escHtml(line.label)}</span><br>
                <span style="font-weight:700;color:var(--text-1);font-size:14px;">${escHtml(line.value)}</span>
                <span style="color:var(--text-4);font-size:12px;"> · ${escHtml(line.note)}</span>
              </div>
            </div>`;
          break;
        case 'verdict':
          bubbleContent += `<p style="font-weight:600;color:var(--text-1);line-height:1.6;margin-top:4px;">${escHtml(line.content)}</p>`;
          break;
        case 'badge':
          bubbleContent += `
            <div class="ai-privacy-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Processed entirely on-device · Zero data left your machine
            </div>`;
          break;
      }
    });

    msg.innerHTML = `
      <div class="msg-avatar">
        <svg width="16" height="16" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 3 L35 9 L35 21 C35 30 28 36 20 38 C12 36 5 30 5 21 L5 9 Z" fill="none" stroke="#5C6BC0" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="20" cy="19" r="5" fill="none" stroke="#7986CB" stroke-width="2"/>
          <rect x="17.5" y="22" width="5" height="7" rx="1.2" fill="#7986CB"/>
        </svg>
      </div>
      <div class="msg-bubble" style="max-width:92%;">
        ${bubbleContent}
      </div>
    `;

    messagesEl.appendChild(msg);
    scrollToBottom();

    // Add replay option
    setTimeout(() => {
      const replay = document.createElement('div');
      replay.style.cssText = 'text-align:center;padding:12px 0 4px;';
      replay.innerHTML = `
        <button id="replay-btn" style="
          font-size:12px;color:var(--text-4);background:none;border:none;
          cursor:pointer;font-family:var(--font-body);padding:4px 8px;
          border-radius:6px;transition:color 0.2s;
        ">↺ Try again</button>
      `;
      messagesEl.appendChild(replay);
      replay.querySelector('#replay-btn').addEventListener('click', resetDemo);
      scrollToBottom();
    }, 400);
  }

  function resetDemo() {
    demoPlayed = false;
    messagesEl.innerHTML = '';

    // Re-create welcome state
    const welcome = document.createElement('div');
    welcome.className = 'demo-welcome';
    welcome.id = 'demo-welcome';
    welcome.innerHTML = `
      <div class="demo-welcome-icon" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 3 L35 9 L35 21 C35 30 28 36 20 38 C12 36 5 30 5 21 L5 9 Z" fill="none" stroke="#5C6BC0" stroke-width="2" stroke-linejoin="round"/>
          <circle cx="20" cy="19" r="5" fill="none" stroke="#7986CB" stroke-width="1.8"/>
          <rect x="17.5" y="22" width="5" height="7" rx="1.2" fill="#7986CB"/>
        </svg>
      </div>
      <p class="demo-welcome-text">Try a sample question below to see how EnclavAI responds using your personal data.</p>
      <button class="demo-sample-btn" id="demo-ask-btn">
        "Can I afford a holiday in June?"
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
      </button>
    `;
    messagesEl.appendChild(welcome);

    // Re-bind
    const newBtn = document.getElementById('demo-ask-btn');
    if (newBtn) {
      newBtn.addEventListener('click', () => {
        if (demoPlayed) return;
        demoPlayed = true;
        newBtn.disabled = true;
        const w = document.getElementById('demo-welcome');
        if (w) {
          w.style.opacity = '0';
          w.style.transform = 'scale(0.97)';
          w.style.transition = 'opacity 0.3s, transform 0.3s';
          setTimeout(() => {
            w.remove();
            addUserMessage(USER_QUERY);
            setTimeout(() => {
              const typing = addTypingIndicator();
              setTimeout(() => {
                typing.remove();
                addAIResponse(AI_RESPONSE_LINES);
              }, 2200);
            }, 600);
          }, 350);
        }
      });
    }
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();


/* ── 5. VAULT CARD SUBTLE ANIMATION ────────────────────────────────── */
(function initVaultAnimation() {
  // Stagger the source rows coming in after the hero is visible
  const rows = document.querySelectorAll('.source-row');
  rows.forEach((row, i) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(10px)';
    row.style.transition = `opacity 0.4s ease ${0.8 + i * 0.1}s, transform 0.4s ease ${0.8 + i * 0.1}s`;
    setTimeout(() => {
      row.style.opacity = '1';
      row.style.transform = 'translateX(0)';
    }, 100);
  });
})();


/* ── 6. HERO TITLE STAGGER ──────────────────────────────────────────── */
(function initHeroReveal() {
  // Hero reveals on load (no scroll needed)
  const heroReveals = document.querySelectorAll('#hero .reveal');
  heroReveals.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 + i * 120);
  });
})();


/* ── 7. ACTIVE NAV LINK HIGHLIGHT ──────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.style.color = 'var(--accent-ll)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(sec => observer.observe(sec));
})();
