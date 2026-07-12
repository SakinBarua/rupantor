/* ============================================================
   রূপান্তর — Tutorial System
   Interactive step-by-step tutorial before game starts
   ============================================================ */

(function() {
  'use strict';

  // ===== TUTORIAL STEPS =====
  const TUTORIAL_STEPS = [
    {
      num: 'ধাপ ১ / ৭',
      title: 'স্বাগতম!',
      visual: function() {
        return '<div style="text-align:center;">' +
          '<svg width="80" height="80" viewBox="0 0 100 100" style="margin:0 auto 16px;">' +
            '<circle cx="50" cy="50" r="44" fill="none" stroke="#C9A961" stroke-width="1.5"/>' +
            '<polygon points="50,28 56,50 50,72 44,50" fill="#E8C878"/>' +
            '<polygon points="28,50 50,44 72,50 50,56" fill="#C9A961"/>' +
            '<circle cx="50" cy="50" r="3" fill="#FFE066"/>' +
          '</svg>' +
          '<div style="font-family:\'Noto Serif Bengali\',serif;font-size:1.1rem;color:#F5F1E8;font-weight:700;">রূপান্তর খেলুন</div>' +
        '</div>';
      },
      desc: '<strong>রূপান্তর</strong> একটি কৌশলগত কার্ড গেম। আপনি AI-এর বিরুদ্ধে খেলবেন। লক্ষ্য — টেবিলে কার্ড স্থাপন করে সবচেয়ে বেশি পয়েন্ট অর্জন করা। এই টিউটোরিয়াল ৭টি দ্রুত ধাপে গেমটি শিখাবে।'
    },
    {
      num: 'ধাপ ২ / ৭',
      title: 'আপনার হাত',
      visual: function() {
        return '<div style="width:100%;">' +
          '<div style="font-family:\'Cinzel\',serif;font-size:0.7rem;letter-spacing:0.2em;color:#C9A961;text-transform:uppercase;margin-bottom:12px;text-align:center;">আপনার ৫টি কার্ড</div>' +
          '<div class="demo-hand">' +
            '<div class="demo-hand-card" style="--demo-c1:#FF3B3B;--demo-c2:#780000;--demo-accent:#FFD60A;">বীজ</div>' +
            '<div class="demo-hand-card demo-selected" style="--demo-c1:#3A86FF;--demo-c2:#003566;--demo-accent:#FFD60A;">সময়</div>' +
            '<div class="demo-hand-card" style="--demo-c1:#9D4EDD;--demo-c2:#3C096C;--demo-accent:#FFB703;">স্মৃতি</div>' +
            '<div class="demo-hand-card" style="--demo-c1:#06A77D;--demo-c2:#023C2C;--demo-accent:#FFE066;">বিশ্ব</div>' +
            '<div class="demo-hand-card" style="--demo-c1:#FFD60A;--demo-c2:#8B6914;--demo-accent:#E63946;">মিশন</div>' +
          '</div>' +
          '<div style="text-align:center;margin-top:12px;font-size:0.8rem;color:#E8C878;font-style:italic;">↑ ক্লিক করে নির্বাচন করুন</div>' +
        '</div>';
      },
      desc: 'প্রতিটি খেলোয়াড়ের হাতে <strong>৫টি কার্ড</strong> থাকে। আপনার টার্নে একটি কার্ড ক্লিক করে নির্বাচন করুন। নির্বাচিত কার্ড উপরে উঠে যাবে ও উজ্জ্বল হবে।'
    },
    {
      num: 'ধাপ ৩ / ৭',
      title: 'টেবিলে স্থাপন',
      visual: function() {
        return '<div style="width:100%;">' +
          '<div class="demo-board" style="max-width:240px;margin:0 auto;">' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-card" style="--demo-c1:#FF3B3B;--demo-c2:#780000;--demo-accent:#FFD60A;">বীজ</div>' +
            '<div class="demo-cell demo-valid"></div>' +
            '<div class="demo-cell demo-card" style="--demo-c1:#3A86FF;--demo-c2:#003566;--demo-accent:#FFD60A;">সময়</div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-valid"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
          '</div>' +
          '<div style="text-align:center;margin-top:12px;font-size:0.8rem;color:#E8C878;font-style:italic;">↑ উজ্জ্বল ঘরে ক্লিক করুন</div>' +
        '</div>';
      },
      desc: 'নির্বাচিত কার্ড স্থাপনের জন্য টেবিলে একটি ঘরে ক্লিক করুন। <strong>উজ্জ্বল ঘরগুলি</strong> বৈধ স্থান — সংলগ্ন কার্ডের পাশে। প্রথম কার্ড কেন্দ্রে স্থাপন করতে হবে।'
    },
    {
      num: 'ধাপ ৪ / ৭',
      title: 'দিক নির্বাচন',
      visual: function() {
        return '<div style="text-align:center;">' +
          '<div class="demo-direction-picker" style="margin:0 auto 12px;">' +
            '<button class="dp-n">▲</button>' +
            '<button class="dp-w">◀</button>' +
            '<button class="dp-c"></button>' +
            '<button class="dp-e demo-active">▶</button>' +
            '<button class="dp-s">▼</button>' +
          '</div>' +
          '<div style="font-size:0.8rem;color:#E8C878;font-style:italic;">৪টি দিক: উত্তর, পূর্ব, দক্ষিণ, পশ্চিম</div>' +
        '</div>';
      },
      desc: 'কার্ড স্থাপনের সময় একটি <strong>দিক নির্বাচনকারী</strong> আবির্ভূত হবে। কার্ডের মুখ কোন দিকে থাকবে তা বেছে নিন। দিক গুরুত্বপূর্ণ — এটি সংযোগ ও পয়েন্ট নির্ধারণ করে।'
    },
    {
      num: 'ধাপ ৫ / ৭',
      title: 'সংযোগ ও পয়েন্ট',
      visual: function() {
        return '<div style="width:100%;">' +
          '<div class="demo-board" style="max-width:200px;margin:0 auto;">' +
            '<div class="demo-cell demo-card" style="--demo-c1:#FF3B3B;--demo-c2:#780000;--demo-accent:#FFD60A;">বীজ</div>' +
            '<div class="demo-cell demo-card" style="--demo-c1:#3A86FF;--demo-c2:#003566;--demo-accent:#FFD60A;">সময়</div>' +
            '<div class="demo-cell demo-empty"></div>' +
            '<div class="demo-cell demo-empty"></div>' +
          '</div>' +
          '<div style="text-align:center;margin-top:16px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap;font-size:0.75rem;">' +
            '<div><span style="color:#E8C878;font-weight:700;">+১</span> <span style="color:#B8C0D4;">প্রতি কার্ড</span></div>' +
            '<div><span style="color:#E8C878;font-weight:700;">+১</span> <span style="color:#B8C0D4;">প্রতি সংযোগ</span></div>' +
            '<div><span style="color:#FFE066;font-weight:700;">+১</span> <span style="color:#B8C0D4;">অনুরণিত</span></div>' +
          '</div>' +
        '</div>';
      },
      desc: 'সংলগ্ন কার্ডের মধ্যে <strong>সংযোগ</strong> গড়ে ওঠে। প্রতি কার্ড = ১ পয়েন্ট। প্রতি সংযোগ = ১ পয়েন্ট। যদি দুটি কার্ডের দিক মুখোমুখি হয় (অনুরণিত সংযোগ), তবে <strong>+১ বোনাস</strong> পয়েন্ট!'
    },
    {
      num: 'ধাপ ৬ / ৭',
      title: 'গোপন মিশন',
      visual: function() {
        return '<div style="width:100%;">' +
          '<div class="demo-mission" style="margin:0 auto 10px;">' +
            '<div class="demo-mission-title"><i class="fas fa-bullseye"></i> ত্রিমূর্তি</div>' +
            '<div class="demo-mission-desc">একই ধরনের ৩টি কার্ড সংলগ্নভাবে স্থাপন করো</div>' +
            '<div class="demo-mission-progress"><div class="demo-mission-progress-bar" style="width:67%;"></div></div>' +
          '</div>' +
          '<div class="demo-mission completed" style="margin:0 auto;">' +
            '<div class="demo-mission-title"><i class="fas fa-check-circle"></i> কেন্দ্র <span style="margin-left:auto;color:#4A8A6F;font-size:0.75rem;">+৪ পয়েন্ট</span></div>' +
            '<div class="demo-mission-desc">টেবিলের কেন্দ্রে একটি কার্ড স্থাপন করো</div>' +
            '<div class="demo-mission-progress"><div class="demo-mission-progress-bar" style="width:100%;"></div></div>' +
          '</div>' +
        '</div>';
      },
      desc: 'প্রতি খেলায় আপনি <strong>২টি গোপন মিশন</strong> পাবেন। মিশন পূরণ করলে অতিরিক্ত পয়েন্ট (৩-৬)। মিশনের অগ্রগতি নিচে দেখানো হবে। পূর্ণ হলে সবুজ হয়ে যাবে।'
    },
    {
      num: 'ধাপ ৭ / ৭',
      title: 'বিজয় অর্জন!',
      visual: function() {
        return '<div style="text-align:center;">' +
          '<div style="display:flex;justify-content:center;gap:24px;margin-bottom:16px;">' +
            '<div><div style="font-size:0.7rem;color:#8A7548;">আপনি</div><div style="font-family:\'Cinzel\',serif;font-weight:800;font-size:2rem;color:#E8C878;">২৪</div></div>' +
            '<div style="font-family:\'Cinzel\',serif;color:#C9A961;font-size:1rem;letter-spacing:0.2em;align-self:center;">VS</div>' +
            '<div><div style="font-size:0.7rem;color:#8A7548;">AI</div><div style="font-family:\'Cinzel\',serif;font-weight:800;font-size:2rem;color:#8B3A4A;">১৮</div></div>' +
          '</div>' +
          '<div style="display:inline-block;padding:6px 16px;background:linear-gradient(135deg,#C9A961,#8B6914);color:#0A0E1A;font-family:\'Cinzel\',serif;font-weight:700;font-size:0.8rem;letter-spacing:0.2em;border-radius:9999px;">VICTORY</div>' +
        '</div>';
      },
      desc: 'প্রতি খেলোয়াড় <strong>১২টি টার্ন</strong> পাবেন। সব টার্ন শেষে সবচেয়ে বেশি পয়েন্ট পাওয়া খেলোয়াড় বিজয়ী। পয়েন্ট আসে: কার্ড থেকে, সংযোগ থেকে, ও মিশন থেকে। <strong>এখন আপনি প্রস্তুত!</strong>'
    }
  ];

  let currentStep = 0;
  let tutorialActive = false;
  let onTutorialComplete = null;

  // ===== SHOW TUTORIAL =====
  function showTutorial(callback) {
    onTutorialComplete = callback;
    currentStep = 0;
    tutorialActive = true;

    let overlay = document.getElementById('tutorial-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'tutorial-overlay';
      overlay.className = 'tutorial-overlay';
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = '';
    overlay.classList.add('active');
    renderStep();

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function hideTutorial() {
    const overlay = document.getElementById('tutorial-overlay');
    if (overlay) overlay.classList.remove('active');
    tutorialActive = false;
    document.body.style.overflow = '';
    if (onTutorialComplete) {
      const cb = onTutorialComplete;
      onTutorialComplete = null;
      cb();
    }
  }

  function skipTutorial() {
    if (window.RUPANTOR_GAME && window.RUPANTOR_GAME.showToast) {
      window.RUPANTOR_GAME.showToast('টিউটোরিয়াল স্কিপ করা হলো', 'warn');
    }
    hideTutorial();
  }

  function renderStep() {
    const overlay = document.getElementById('tutorial-overlay');
    if (!overlay) return;

    const step = TUTORIAL_STEPS[currentStep];
    const isLast = currentStep === TUTORIAL_STEPS.length - 1;
    const isFirst = currentStep === 0;

    // Build progress dots
    let dotsHtml = '';
    for (let i = 0; i < TUTORIAL_STEPS.length; i++) {
      const cls = i === currentStep ? 'active' : (i < currentStep ? 'completed' : '');
      dotsHtml += '<div class="tutorial-dot ' + cls + '"></div>';
    }

    overlay.innerHTML =
      '<div class="tutorial-container">' +
        '<div class="tutorial-header">' +
          '<div class="tutorial-progress">' + dotsHtml + '</div>' +
          '<button class="tutorial-skip" onclick="window.RUPANTOR_TUTORIAL.skip()">' +
            '<i class="fas fa-forward"></i> স্কিপ করুন' +
          '</button>' +
        '</div>' +
        '<div class="tutorial-body">' +
          '<div class="tutorial-step-num">' + step.num + '</div>' +
          '<h3 class="tutorial-step-title">' + step.title + '</h3>' +
          '<div class="tutorial-step-visual">' + step.visual() + '</div>' +
          '<div class="tutorial-step-desc">' + step.desc + '</div>' +
        '</div>' +
        '<div class="tutorial-footer">' +
          '<button class="tutorial-btn tutorial-btn-prev" ' + (isFirst ? 'disabled' : 'onclick="window.RUPANTOR_TUTORIAL.prev()"') + '>' +
            '<i class="fas fa-arrow-left"></i> আগের' +
          '</button>' +
          (isLast ?
            '<button class="tutorial-btn tutorial-btn-finish" onclick="window.RUPANTOR_TUTORIAL.finish()">' +
              'শুরু করুন <i class="fas fa-play"></i>' +
            '</button>'
            :
            '<button class="tutorial-btn tutorial-btn-next" onclick="window.RUPANTOR_TUTORIAL.next()">' +
              'পরবর্তী <i class="fas fa-arrow-right"></i>' +
            '</button>'
          ) +
        '</div>' +
      '</div>';
  }

  function nextStep() {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      currentStep++;
      renderStep();
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  }

  function finish() {
    if (window.RUPANTOR_GAME && window.RUPANTOR_GAME.showToast) {
      window.RUPANTOR_GAME.showToast('টিউটোরিয়াল সম্পূর্ণ! গেম শুরু হচ্ছে...', 'success');
    }
    hideTutorial();
  }

  // ===== KEYBOARD NAV =====
  document.addEventListener('keydown', function(e) {
    if (!tutorialActive) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
      e.preventDefault();
      if (currentStep === TUTORIAL_STEPS.length - 1) finish();
      else nextStep();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevStep();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      skipTutorial();
    }
  });

  // ===== PUBLIC API =====
  window.RUPANTOR_TUTORIAL = {
    show: showTutorial,
    skip: skipTutorial,
    next: nextStep,
    prev: prevStep,
    finish: finish,
    isActive: function() { return tutorialActive; }
  };
})();
