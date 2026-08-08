(() => {
  const body = document.body;
  const langSelect = document.getElementById('languageMode');
  const searchInput = document.getElementById('courseSearch');
  const searchStatus = document.getElementById('searchStatus');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const progressFill = document.querySelectorAll('.progress-fill');
  const progressText = document.querySelectorAll('.progress-text');
  const moduleButtons = [...document.querySelectorAll('.complete-btn')];
  const bookmarkButtons = [...document.querySelectorAll('.bookmark-btn')];
  const modules = [...document.querySelectorAll('.module')];
  const backTop = document.getElementById('backTop');

  const safeStorage = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  };

  const savedLang = safeStorage.get('ci-lang', 'both');
  body.dataset.lang = savedLang;
  if (langSelect) langSelect.value = savedLang;

  langSelect?.addEventListener('change', () => {
    body.dataset.lang = langSelect.value;
    document.documentElement.lang = langSelect.value === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = langSelect.value === 'ar' ? 'rtl' : 'ltr';
    safeStorage.set('ci-lang', langSelect.value);
  });

  document.getElementById('fontUp')?.addEventListener('click', () => {
    const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
    document.documentElement.style.setProperty('--font-scale', Math.min(1.25, current + 0.05));
  });
  document.getElementById('fontDown')?.addEventListener('click', () => {
    const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
    document.documentElement.style.setProperty('--font-scale', Math.max(0.85, current - 0.05));
  });
  document.getElementById('contrastToggle')?.addEventListener('click', () => body.classList.toggle('high-contrast'));
  document.getElementById('printBtn')?.addEventListener('click', () => window.print());
  document.getElementById('pdfBtn')?.addEventListener('click', () => window.print());

  menuToggle?.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  sidebar?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));

  const completed = new Set(safeStorage.get('ci-completed', []));
  const bookmarks = new Set(safeStorage.get('ci-bookmarks', []));

  function updateProgress() {
    moduleButtons.forEach(btn => {
      const id = btn.dataset.module;
      const isDone = completed.has(id);
      btn.classList.toggle('done', isDone);
      btn.setAttribute('aria-pressed', String(isDone));
      btn.textContent = isDone ? (body.dataset.lang === 'ar' ? 'مكتملة ✓' : 'Complete ✓') : 'Mark complete · أكمل الوحدة';
      const navDot = document.querySelector(`[data-nav-module="${id}"] .status-dot`);
      if (navDot) navDot.textContent = isDone ? '●' : '○';
    });
    const pct = modules.length ? Math.round(completed.size / modules.length * 100) : 0;
    progressFill.forEach(el => el.style.width = `${pct}%`);
    progressText.forEach(el => el.textContent = `${completed.size} / ${modules.length} modules · ${pct}%`);
    safeStorage.set('ci-completed', [...completed]);
  }

  moduleButtons.forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.module;
    completed.has(id) ? completed.delete(id) : completed.add(id);
    updateProgress();
  }));

  function updateBookmarks() {
    bookmarkButtons.forEach(btn => {
      const id = btn.dataset.module;
      const active = bookmarks.has(id);
      btn.classList.toggle('bookmarked', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.textContent = active ? '★ Bookmarked · محفوظة' : '☆ Bookmark · حفظ';
    });
    safeStorage.set('ci-bookmarks', [...bookmarks]);
  }
  bookmarkButtons.forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.module;
    bookmarks.has(id) ? bookmarks.delete(id) : bookmarks.add(id);
    updateBookmarks();
  }));

  updateProgress();
  updateBookmarks();

  const searchable = [...document.querySelectorAll('.searchable')];
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.trim().toLocaleLowerCase();
    let visible = 0;
    searchable.forEach(section => {
      const hay = `${section.dataset.search || ''} ${section.textContent}`.toLocaleLowerCase();
      const match = !q || hay.includes(q);
      section.classList.toggle('search-hidden', !match);
      if (match) visible++;
    });
    searchStatus.textContent = q ? `${visible} matching sections · ${visible} أقسام مطابقة` : '';
  });

  document.querySelectorAll('.quiz-check').forEach(button => {
    button.addEventListener('click', () => {
      const block = button.closest('.quiz-question');
      const selected = block.querySelector('input[type="radio"]:checked');
      const feedback = block.querySelector('.quiz-feedback');
      if (!selected) {
        feedback.textContent = 'Choose an answer first · اختر إجابة أولاً';
        feedback.className = 'quiz-feedback incorrect';
        return;
      }
      const correct = selected.value === block.dataset.answer;
      feedback.textContent = correct ? block.dataset.correct : block.dataset.incorrect;
      feedback.className = `quiz-feedback ${correct ? 'correct' : 'incorrect'}`;
    });
  });

  function number(id) {
    const v = parseFloat(document.getElementById(id)?.value);
    return Number.isFinite(v) ? v : NaN;
  }
  function show(id, text) { const el = document.getElementById(id); if (el) el.value = text; }

  document.getElementById('calcEfficiency')?.addEventListener('submit', e => {
    e.preventDefault();
    const blank = number('effBlank'), inhibited = number('effInhibited');
    if (!(blank > 0) || !(inhibited >= 0)) return show('effOutput','Enter valid non-negative values · أدخل قيماً صحيحة');
    const ie = (blank - inhibited) / blank * 100;
    show('effOutput', `IE = ${ie.toFixed(2)}% | θ ≈ ${(ie/100).toFixed(3)}`);
  });

  document.getElementById('calcDose')?.addEventListener('submit', e => {
    e.preventDefault();
    const volume = number('doseVolume'), delta = number('doseDelta'), active = number('doseActive');
    if (!(volume > 0) || !(delta >= 0) || !(active > 0 && active <= 100)) return show('doseOutput','Check inputs · راجع المدخلات');
    const activeKg = delta * volume / 1e6;
    const productKg = activeKg / (active / 100);
    show('doseOutput', `Active = ${activeKg.toFixed(3)} kg | Product = ${productKg.toFixed(3)} kg`);
  });

  document.getElementById('calcLpr')?.addEventListener('submit', e => {
    e.preventDefault();
    const b = number('lprB'), rp = number('lprRp');
    if (!(b > 0) || !(rp > 0)) return show('lprOutput','Check inputs · راجع المدخلات');
    const microA = b / rp * 1e6;
    show('lprOutput', `i_corr = ${microA.toFixed(3)} μA cm⁻²`);
  });

  document.getElementById('calcLangmuir')?.addEventListener('submit', e => {
    e.preventDefault();
    const intercept = number('langIntercept');
    if (!(intercept > 0)) return show('langOutput','Intercept must be positive · يجب أن يكون الجزء المقطوع موجباً');
    const k = 1 / intercept;
    show('langOutput', `K_ads = ${k.toPrecision(5)} (reciprocal concentration unit)`);
  });

  // Conceptual polarization simulator
  const canvas = document.getElementById('polarCanvas');
  const sliders = ['simBlank','simInh','simShift'].map(id => document.getElementById(id));
  function drawPolarization() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(600, rect.width * dpr);
    canvas.height = 390 * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr,dpr);
    const w = canvas.width/dpr, h=390;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);
    const pad={l:70,r:30,t:28,b:55};
    const x0=pad.l,y0=h-pad.b,x1=w-pad.r,y1=pad.t;
    ctx.strokeStyle='#17202a';ctx.lineWidth=1.5;
    ctx.beginPath();ctx.moveTo(x0,y1);ctx.lineTo(x0,y0);ctx.lineTo(x1,y0);ctx.stroke();
    ctx.fillStyle='#17202a';ctx.font='13px Segoe UI';
    ctx.fillText('log |i|  →',w/2-30,h-18);
    ctx.save();ctx.translate(18,h/2+40);ctx.rotate(-Math.PI/2);ctx.fillText('Potential / mV  →',0,0);ctx.restore();
    const blank=Number(sliders[0]?.value||100), inh=Number(sliders[1]?.value||20), shift=Number(sliders[2]?.value||0);
    const logB=Math.log10(blank), logI=Math.log10(inh);
    const mapX = log => x0 + (log+1.2)/4.2*(x1-x0);
    const mapY = mv => y0 - (mv+700)/500*(y0-y1);
    function curve(logCorr, ecorr, color, label){
      const xc=mapX(logCorr), yc=mapY(ecorr);
      ctx.strokeStyle=color;ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(mapX(logCorr-1.15),mapY(ecorr-220));ctx.lineTo(xc,yc);ctx.lineTo(mapX(logCorr+1.15),mapY(ecorr+220));ctx.stroke();
      ctx.beginPath();ctx.moveTo(mapX(logCorr-1.15),mapY(ecorr+220));ctx.lineTo(xc,yc);ctx.lineTo(mapX(logCorr+1.15),mapY(ecorr-220));ctx.stroke();
      ctx.fillStyle=color;ctx.beginPath();ctx.arc(xc,yc,5,0,Math.PI*2);ctx.fill();
      ctx.fillText(label,Math.min(xc+8,w-150),yc-8);
    }
    curve(logB,-450,'#8e2e2e','Blank');
    curve(logI,-450+shift,'#1f7a55','Inhibited');
    const out=document.getElementById('polarOutput');
    if(out){
      const ie=(blank-inh)/blank*100;
      const classText=Math.abs(shift)<35?'mixed tendency / ميل مختلط':shift>0?'anodic tendency / ميل أنودي':'cathodic tendency / ميل كاثودي';
      out.textContent=`Conceptual IE = ${ie.toFixed(1)}%; ΔE = ${shift} mV; ${classText}. Classification requires full branch analysis.`;
    }
  }
  sliders.forEach(s => s?.addEventListener('input', drawPolarization));
  window.addEventListener('resize', drawPolarization);
  drawPolarization();

  // Active navigation
  const navLinks = [...document.querySelectorAll('.sidebar a[href^="#"]')];
  const observed = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${visible.target.id}`));
  }, {rootMargin:'-25% 0px -65% 0px',threshold:[0,.1,.5]});
  observed.forEach(el => observer.observe(el));

  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 700);
  });
  backTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
})();
