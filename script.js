/* ══════════════════════════════════════════════════════
   KAJW PORTFOLIO — script.js
══════════════════════════════════════════════════════ */

'use strict';

// ─── CURSOR ───────────────────────────────────────────
(function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (!cursor || !trail) return;

  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateTrail() {
    tx += (mx - tx) * 0.14;
    ty += (my - ty) * 0.14;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animateTrail);
  })();

  const hoverEls = document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
})();


// ─── NAV SCROLL ───────────────────────────────────────
(function initNav() {
  const nav    = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }
})();


// ─── TYPEWRITER ───────────────────────────────────────
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Analyste Cybersécurité',
    'Pentest & Audit Sécurité',
    'IDS/IPS · Suricata',
    'Python Automation',
    'CTF · Hacker Éthique',
  ];

  let pIdx = 0, cIdx = 0, deleting = false;
  const SPEED_TYPE = 75, SPEED_DEL = 40, PAUSE = 2200;

  function tick() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) {
        deleting = true;
        setTimeout(tick, PAUSE);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 800);
})();


// ─── STATUS TEXT ───────────────────────────────────────
(function initStatus() {
  const el = document.getElementById('statusText');
  if (!el) return;
  const msgs = [
    'Disponible · Stages & Collaborations',
    'Open to Opportunities',
    'Abidjan, Côte d\'Ivoire',
  ];
  let i = 0;
  el.textContent = msgs[0];
  setInterval(() => {
    i = (i + 1) % msgs.length;
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = msgs[i]; el.style.opacity = '1'; }, 300);
  }, 3000);
  el.style.transition = 'opacity 0.3s ease';
})();


// ─── TERMINAL ANIMATION ───────────────────────────────
(function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = [
    { type: 'cmd',  prompt: 'kajw@sec:~$', text: ' cat profile.json' },
    { type: 'out',  text: '{' },
    { type: 'out',  key: '"name"',     val: '"Kacou Ange Joël Wilfried",' },
    { type: 'out',  key: '"role"',     val: '"Analyste Cybersécurité",' },
    { type: 'out',  key: '"location"', val: '"Abidjan, CI",' },
    { type: 'out',  key: '"level"',    val: '"L2 · UVCI",' },
    { type: 'out',  key: '"cert"',     val: '"Google Cybersecurity ✓",' },
    { type: 'out',  text: '}' },
    { type: 'blank' },
    { type: 'cmd',  prompt: 'kajw@sec:~$', text: ' nmap --open opportunities' },
    { type: 'ok',   text: 'PORT     STATE   SERVICE' },
    { type: 'ok',   text: '80/tcp   open    stage-cdi' },
    { type: 'ok',   text: '443/tcp  open    collaboration' },
    { type: 'ok',   text: '22/tcp   open    remote-work' },
    { type: 'blank' },
    { type: 'cmd',  prompt: 'kajw@sec:~$', text: ' ping -c1 recruiter' },
    { type: 'ok',   text: 'PONG — 1 packet transmitted, 1 received' },
  ];

  let idx = 0;
  function addLine() {
    if (idx >= lines.length) return;
    const l = lines[idx++];
    const div = document.createElement('div');
    div.className = 't-line';

    if (l.type === 'blank') {
      div.style.height = '10px';
    } else if (l.type === 'cmd') {
      div.innerHTML = `<span class="t-prompt">${l.prompt}</span><span class="t-cmd">${l.text}</span>`;
    } else if (l.type === 'out' && l.key) {
      div.innerHTML = `<span class="t-out">&nbsp;&nbsp;<span class="t-key">${l.key}</span>: <span class="t-val">${l.val}</span></span>`;
    } else if (l.type === 'out') {
      div.innerHTML = `<span class="t-out">${l.text}</span>`;
    } else if (l.type === 'ok') {
      div.innerHTML = `<span class="t-out t-ok">${l.text}</span>`;
    }

    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    setTimeout(addLine, l.type === 'blank' ? 100 : l.type === 'cmd' ? 400 : 80);
  }

  setTimeout(addLine, 1200);
})();


// ─── SCROLL REVEAL ────────────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


// ─── SKILL BARS ───────────────────────────────────────
(function initSkillBars() {
  const cards = document.querySelectorAll('.skill-card[data-level]');
  if (!cards.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card  = entry.target;
        const level = card.dataset.level + '%';
        const fill  = card.querySelector('.skill-fill');
        if (fill) {
          setTimeout(() => { fill.style.width = level; }, 200);
        }
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(c => observer.observe(c));
})();


// ─── COUNT-UP ANIMATION ───────────────────────────────
(function initCountUp() {
  const els = document.querySelectorAll('.stat-val[data-count]');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el  = entry.target;
        const end = parseInt(el.dataset.count);
        let cur = 0;
        const step = Math.ceil(end / 20);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, end);
          el.textContent = cur;
          if (cur >= end) clearInterval(timer);
        }, 50);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
})();


// ─── ACTIVE NAV SECTION ───────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + entry.target.id
            ? 'var(--white)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();


// ─── SMOOTH SCROLL ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
