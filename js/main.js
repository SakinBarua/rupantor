/* ============================================================
   রূপান্তর — Main JavaScript
   ============================================================ */

(function() {
  'use strict';

  // ===== NAVIGATION =====
  function initNav() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu on link click (mobile)
      navMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }

    // Scroll effect
    if (nav) {
      let lastScroll = 0;
      window.addEventListener('scroll', function() {
        const scroll = window.pageYOffset;
        if (scroll > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
        lastScroll = scroll;
      });
    }

    // Highlight active nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ===== HERO PARTICLES =====
  function initParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 15 + 's';
      p.style.animationDuration = (10 + Math.random() * 10) + 's';
      const size = 2 + Math.random() * 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      container.appendChild(p);
    }
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    const elements = document.querySelectorAll('.fade-in-up');
    if (!elements.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function(el, i) {
      el.style.transitionDelay = (i * 0.1) + 's';
      observer.observe(el);
    });
  }

  // ===== CARD FILTER =====
  function initCardFilter() {
    const filterBar = document.querySelector('.filter-bar');
    const cardGrid = document.getElementById('card-grid');
    if (!filterBar || !cardGrid) return;

    const cards = window.RUPANTOR_DATA ? window.RUPANTOR_DATA.CARDS : [];
    let currentFilter = 'all';
    let currentSearch = '';

    function renderCards() {
      let filtered = cards;
      if (currentFilter !== 'all') {
        filtered = filtered.filter(function(c) { return c.type === currentFilter; });
      }
      if (currentSearch) {
        const q = currentSearch.toLowerCase();
        filtered = filtered.filter(function(c) {
          return c.name_bn.toLowerCase().indexOf(q) > -1 ||
                 c.name_en.toLowerCase().indexOf(q) > -1 ||
                 String(c.num).indexOf(q) > -1;
        });
      }

      cardGrid.innerHTML = '';

      if (filtered.length === 0) {
        cardGrid.innerHTML = '<p class="text-center text-silver" style="grid-column:1/-1;padding:48px;">কোনো কার্ড পাওয়া যায়নি।</p>';
        return;
      }

      filtered.forEach(function(c) {
        const tile = document.createElement('div');
        tile.className = 'card-tile fade-in-up visible';
        tile.style.setProperty('--card-color', c.type_info.color);
        tile.innerHTML =
          '<div class="card-tile-num">#' + String(c.num).padStart(3, '0') + ' · ' + c.type_info.en + '</div>' +
          '<div class="card-tile-name">' + c.name_bn + '</div>' +
          '<div class="card-tile-en">' + c.name_en + '</div>' +
          '<div class="card-tile-art">' + generateCardArtSVG(c.num, c.type_info) + '</div>' +
          '<span class="card-tile-type">' + c.type_info.bn + ' কার্ড</span>' +
          '<p class="card-tile-ability">' + c.ability + '</p>';
        tile.addEventListener('click', function() { openCardModal(c); });
        cardGrid.appendChild(tile);
      });

      // Update count
      const countEl = document.getElementById('card-count');
      if (countEl) countEl.textContent = filtered.length + ' / ' + cards.length;
    }

    // Filter buttons
    filterBar.addEventListener('click', function(e) {
      if (e.target.classList.contains('filter-btn')) {
        filterBar.querySelectorAll('.filter-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderCards();
      }
    });

    // Search box
    const searchInput = document.getElementById('card-search');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        currentSearch = e.target.value;
        renderCards();
      });
    }

    renderCards();
  }

  // ===== GENERATE CARD ART (SVG) =====
  function generateCardArtSVG(num, tinfo) {
    const style = num % 8;
    const c1 = tinfo.color, c2 = tinfo.c2, accent = tinfo.accent;
    let s = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">';

    if (style === 0) {
      // Star
      const pts = [];
      for (let i = 0; i < 10; i++) {
        const a = (i * 36 - 90) * Math.PI / 180;
        const r = i % 2 === 0 ? 35 : 15;
        pts.push((50 + Math.cos(a) * r).toFixed(1) + ',' + (50 + Math.sin(a) * r).toFixed(1));
      }
      s += '<polygon points="' + pts.join(' ') + '" fill="' + accent + '" opacity="0.9"/>';
      s += '<circle cx="50" cy="50" r="6" fill="#FFFFFF" opacity="0.8"/>';
    } else if (style === 1) {
      // Concentric circles
      for (let i = 5; i > 0; i--) {
        s += '<circle cx="50" cy="50" r="' + (i * 7) + '" fill="none" stroke="' + accent + '" stroke-width="2" opacity="' + (0.3 + i * 0.12) + '"/>';
      }
      s += '<circle cx="50" cy="50" r="8" fill="' + accent + '"/>';
    } else if (style === 2) {
      // Triangle
      s += '<polygon points="50,15 85,80 15,80" fill="' + accent + '" opacity="0.9"/>';
      s += '<polygon points="50,30 75,75 25,75" fill="' + c2 + '" opacity="0.7"/>';
    } else if (style === 3) {
      // Diamond
      s += '<polygon points="50,10 85,50 50,90 15,50" fill="' + accent + '" opacity="0.9"/>';
      s += '<polygon points="50,25 70,50 50,75 30,50" fill="' + c2 + '" opacity="0.7"/>';
    } else if (style === 4) {
      // Hexagon
      const pts = [];
      for (let i = 0; i < 6; i++) {
        const a = (60 * i - 30) * Math.PI / 180;
        pts.push((50 + Math.cos(a) * 35).toFixed(1) + ',' + (50 + Math.sin(a) * 35).toFixed(1));
      }
      s += '<polygon points="' + pts.join(' ') + '" fill="' + accent + '" opacity="0.9"/>';
      s += '<circle cx="50" cy="50" r="18" fill="' + c2 + '" opacity="0.8"/>';
    } else if (style === 5) {
      // Sun
      for (let i = 0; i < 12; i++) {
        const a = (i * 30) * Math.PI / 180;
        const x1 = 50 + Math.cos(a) * 18;
        const y1 = 50 + Math.sin(a) * 18;
        const x2 = 50 + Math.cos(a) * 42;
        const y2 = 50 + Math.sin(a) * 42;
        s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + accent + '" stroke-width="3" opacity="0.7"/>';
      }
      s += '<circle cx="50" cy="50" r="15" fill="' + accent + '"/>';
    } else if (style === 6) {
      // Spiral
      let path = 'M 50 50 ';
      for (let t = 0; t < 360; t += 5) {
        const a = t * Math.PI / 180;
        const r = t * 0.06;
        path += 'L ' + (50 + Math.cos(a) * r).toFixed(1) + ' ' + (50 + Math.sin(a) * r).toFixed(1) + ' ';
      }
      s += '<path d="' + path + '" fill="none" stroke="' + accent + '" stroke-width="2.5" opacity="0.85"/>';
      s += '<circle cx="50" cy="50" r="6" fill="' + accent + '"/>';
    } else {
      // Cross
      s += '<rect x="42" y="15" width="16" height="70" fill="' + accent + '" opacity="0.9"/>';
      s += '<rect x="15" y="42" width="70" height="16" fill="' + accent + '" opacity="0.9"/>';
      s += '<circle cx="50" cy="50" r="10" fill="' + c2 + '"/>';
    }

    s += '</svg>';
    return s;
  }

  // ===== CARD MODAL =====
  function openCardModal(card) {
    let modal = document.getElementById('card-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'card-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML =
        '<div class="modal">' +
          '<button class="modal-close" aria-label="বন্ধ করুন">×</button>' +
          '<div id="card-modal-content"></div>' +
        '</div>';
      document.body.appendChild(modal);

      modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
          modal.classList.remove('active');
        }
      });
    }

    const content = modal.querySelector('#card-modal-content');
    content.style.setProperty('--card-color', card.type_info.color);
    content.innerHTML =
      '<div style="text-align:center;">' +
        '<div style="font-family:\'Cinzel\',serif;font-size:0.85rem;letter-spacing:0.2em;color:' + card.type_info.color + ';margin-bottom:8px;">' + card.type_info.en + ' · #' + String(card.num).padStart(3, '0') + '</div>' +
        '<div style="width:120px;height:120px;margin:0 auto 16px;background:linear-gradient(135deg,' + card.type_info.color + ',' + card.type_info.c2 + ');border-radius:50%;padding:20px;box-shadow:0 0 30px ' + card.type_info.color + ';">' + generateCardArtSVG(card.num, card.type_info) + '</div>' +
        '<h3 style="font-size:1.8rem;color:#F5F1E8;margin-bottom:4px;">' + card.name_bn + '</h3>' +
        '<p style="font-family:\'Cinzel\',serif;font-size:0.85rem;letter-spacing:0.15em;color:#C9A961;text-transform:uppercase;margin-bottom:24px;">' + card.name_en + '</p>' +
        '<div style="background:rgba(201,169,97,0.08);border-left:3px solid ' + card.type_info.color + ';padding:12px 16px;border-radius:0 8px 8px 0;text-align:left;margin-bottom:16px;">' +
          '<div style="font-size:0.75rem;letter-spacing:0.15em;color:#C9A961;text-transform:uppercase;margin-bottom:4px;">ক্ষমতা</div>' +
          '<div style="color:#E8ECF4;">' + card.ability + '</div>' +
        '</div>' +
        '<div style="background:rgba(74,138,111,0.08);padding:12px 16px;border-radius:8px;text-align:left;margin-bottom:16px;">' +
          '<div style="font-size:0.75rem;letter-spacing:0.15em;color:#C9A961;text-transform:uppercase;margin-bottom:4px;">লোর</div>' +
          '<div style="color:#B8C0D4;font-style:italic;">"' + card.lore + '"</div>' +
        '</div>' +
        '<div style="display:flex;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid rgba(201,169,97,0.2);">' +
          '<div><div style="font-size:0.7rem;color:#8A7548;letter-spacing:0.1em;">ধরন</div><div style="color:' + card.type_info.color + ';font-weight:600;">' + card.type_info.bn + ' কার্ড</div></div>' +
          '<div><div style="font-size:0.7rem;color:#8A7548;letter-spacing:0.1em;">দুর্লভতা</div><div style="color:#E8C878;font-weight:600;">' + card.rarity + '</div></div>' +
        '</div>' +
      '</div>';

    modal.classList.add('active');
  }

  // ===== MISSIONS PAGE =====
  function initMissionsPage() {
    const grid = document.getElementById('missions-grid');
    if (!grid) return;

    const missions = window.RUPANTOR_DATA ? window.RUPANTOR_DATA.MISSIONS : [];
    grid.innerHTML = '';

    missions.forEach(function(m) {
      const item = document.createElement('div');
      item.className = 'mission-item fade-in-up visible';
      item.innerHTML =
        '<div class="mission-num">#' + String(m.num).padStart(3, '0') + '</div>' +
        '<div class="mission-name">' + m.type + '</div>' +
        '<div class="mission-desc">' + m.desc + '</div>' +
        '<div class="mission-reward"><i class="fas fa-trophy"></i> পুরস্কার: ' + m.reward + '</div>';
      grid.appendChild(item);
    });
  }

  // ===== EXPANSIONS PAGE =====
  function initExpansionsPage() {
    const grid = document.getElementById('expansions-grid');
    if (!grid) return;

    const expansions = window.RUPANTOR_DATA ? window.RUPANTOR_DATA.EXPANSIONS : [];
    grid.innerHTML = '';

    expansions.forEach(function(e) {
      const card = document.createElement('div');
      card.className = 'feature-card fade-in-up visible';
      card.innerHTML =
        '<div class="feature-icon">' + e.n + '</div>' +
        '<h3 class="feature-title">' + e.name + '</h3>' +
        '<p class="feature-desc" style="font-family:Cinzel,serif;font-size:0.75rem;letter-spacing:0.15em;color:#C9A961;text-transform:uppercase;margin-bottom:12px;">' + e.en + '</p>' +
        '<p class="feature-desc">' + e.theme + '</p>' +
        '<div style="display:flex;gap:16px;margin-top:16px;padding-top:16px;border-top:1px solid rgba(201,169,97,0.2);">' +
          '<div><div style="font-size:0.7rem;color:#8A7548;letter-spacing:0.1em;">কার্ড</div><div style="color:#E8C878;font-weight:700;font-size:1.2rem;">' + e.cards + '</div></div>' +
          '<div><div style="font-size:0.7rem;color:#8A7548;letter-spacing:0.1em;">মিশন</div><div style="color:#E8C878;font-weight:700;font-size:1.2rem;">' + e.missions + '</div></div>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  // ===== FAQ ACCORDION =====
  function initFaqAccordion() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(function(item) {
      const header = item.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', function() {
          item.classList.toggle('active');
        });
      }
    });
  }

  // ===== FAQ PAGE POPULATION =====
  function initFaqPage() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    const faqs = window.RUPANTOR_DATA ? window.RUPANTOR_DATA.FAQ : [];
    container.innerHTML = '';

    faqs.forEach(function(f, i) {
      const item = document.createElement('div');
      item.className = 'accordion-item fade-in-up visible';
      item.innerHTML =
        '<div class="accordion-header">' +
          '<span>' + f.q + '</span>' +
          '<span class="accordion-icon">+</span>' +
        '</div>' +
        '<div class="accordion-body">' +
          '<div class="accordion-content">' + f.a + '</div>' +
        '</div>';
      container.appendChild(item);
    });

    initFaqAccordion();
  }

  // ===== RULEBOOK TABS =====
  function initRulebookTabs() {
    const tabs = document.querySelectorAll('.rulebook-tab');
    const panels = document.querySelectorAll('.rulebook-panel');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const target = tab.dataset.tab;
        tabs.forEach(function(t) { t.classList.remove('active'); });
        panels.forEach(function(p) { p.classList.remove('active'); });
        tab.classList.add('active');
        const panel = document.getElementById('tab-' + target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ===== ANIMATED COUNTERS =====
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter);
          const duration = 2000;
          const start = performance.now();

          function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(ease * target);
            el.textContent = value.toLocaleString('bn-BD');
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = target.toLocaleString('bn-BD');
          }
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(c) { observer.observe(c); });
  }

  // ===== CARD PREVIEW ON HOME PAGE =====
  function initHomePreview() {
    const grid = document.getElementById('home-card-preview');
    if (!grid) return;

    const allCards = window.RUPANTOR_DATA ? window.RUPANTOR_DATA.CARDS : [];
    // Show 8 random cards
    const shuffled = allCards.slice().sort(function() { return Math.random() - 0.5; });
    const preview = shuffled.slice(0, 8);

    grid.innerHTML = '';
    preview.forEach(function(c) {
      const tile = document.createElement('div');
      tile.className = 'card-tile';
      tile.style.setProperty('--card-color', c.type_info.color);
      tile.innerHTML =
        '<div class="card-tile-num">#' + String(c.num).padStart(3, '0') + ' · ' + c.type_info.en + '</div>' +
        '<div class="card-tile-name">' + c.name_bn + '</div>' +
        '<div class="card-tile-en">' + c.name_en + '</div>' +
        '<div class="card-tile-art">' + generateCardArtSVG(c.num, c.type_info) + '</div>' +
        '<span class="card-tile-type">' + c.type_info.bn + ' কার্ড</span>';
      tile.addEventListener('click', function() { openCardModal(c); });
      grid.appendChild(tile);
    });
  }

  // ===== INIT ALL =====
  document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initParticles();
    initScrollReveal();
    initCardFilter();
    initMissionsPage();
    initExpansionsPage();
    initFaqPage();
    initRulebookTabs();
    initCounters();
    initHomePreview();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    console.log('%cরূপান্তর ✦', 'color:#C9A961;font-size:24px;font-weight:bold;');
    console.log('%cকার্ড নয়, পৃথিবী বদলাও', 'color:#B8C0D4;font-size:14px;font-style:italic;');
  });
})();
