(() => {
  'use strict';

  const H = document.documentElement;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const storage = {
    get(key, fallback) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); } catch (_) { /* static-file safe */ }
    }
  };

  let lang = storage.get('pchem-lang', 'en');
  let done = new Set(JSON.parse(storage.get('pchem-done', '[]')));
  let marks = new Set(JSON.parse(storage.get('pchem-marks', '[]')));
  let filter = 'all';

  function progress() {
    const n = done.size;
    const ptext = $('#ptext');
    const pbar = $('#pbar');
    if (ptext) {
      ptext.textContent = lang === 'ar' ? `${n} / 20 فصلاً مكتملة` : `${n} / 20 chapters complete`;
    }
    if (pbar) pbar.style.width = `${n * 5}%`;
  }

  function setLang(nextLang) {
    lang = nextLang === 'ar' ? 'ar' : 'en';
    H.dataset.lang = lang;
    H.lang = lang;
    H.dir = lang === 'ar' ? 'rtl' : 'ltr';
    storage.set('pchem-lang', lang);

    $$('.figure img').forEach((img) => {
      const nextAlt = lang === 'ar' ? img.dataset.altAr : img.dataset.altEn;
      if (nextAlt) img.alt = nextAlt;
    });
    progress();
    drawExplorers();
  }

  function apply() {
    const search = $('#search');
    const q = search ? search.value.trim().toLowerCase() : '';
    $$('[data-nav]').forEach((a) => {
      const n = Number(a.dataset.nav);
      const module = $(`#module-${n}`);
      if (!module) return;
      const haystack = `${module.dataset.title || ''} ${module.textContent || ''}`.toLowerCase();
      let show = !q || haystack.includes(q);
      if (filter === 'bookmarked') show = show && marks.has(n);
      if (filter === 'incomplete') show = show && !done.has(n);
      a.hidden = !show;
    });
  }

  setLang(lang);

  const langButton = $('#lang');
  if (langButton) langButton.addEventListener('click', () => setLang(lang === 'en' ? 'ar' : 'en'));

  const printButton = $('#print');
  if (printButton) printButton.addEventListener('click', () => window.print());

  const menuButton = $('#menu');
  const nav = $('#nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => nav.classList.toggle('open'));
    $$('#nav a').forEach((a) => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  $$('.complete').forEach((control) => {
    const n = Number(control.dataset.complete);
    control.checked = done.has(n);
    control.addEventListener('change', () => {
      if (control.checked) done.add(n); else done.delete(n);
      storage.set('pchem-done', JSON.stringify([...done]));
      progress();
      apply();
    });
  });

  $$('.bookmark').forEach((button) => {
    const n = Number(button.dataset.bookmark);
    const paint = () => {
      const active = marks.has(n);
      button.classList.toggle('active', active);
      button.textContent = active ? '★' : '☆';
      button.setAttribute('aria-pressed', String(active));
    };
    paint();
    button.addEventListener('click', () => {
      if (marks.has(n)) marks.delete(n); else marks.add(n);
      storage.set('pchem-marks', JSON.stringify([...marks]));
      paint();
      apply();
    });
  });

  const resetButton = $('#reset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      done.clear();
      storage.set('pchem-done', '[]');
      $$('.complete').forEach((x) => { x.checked = false; });
      progress();
      apply();
    });
  }

  $$('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      $$('[data-filter]').forEach((x) => x.classList.remove('active'));
      button.classList.add('active');
      filter = button.dataset.filter || 'all';
      apply();
    });
  });

  const search = $('#search');
  if (search) search.addEventListener('input', apply);

  $$('.quiz').forEach((quiz) => {
    const answer = Number(quiz.dataset.answer);
    const feedback = $('.feedback', quiz);
    $$('.quiz-choice', quiz).forEach((button) => {
      button.addEventListener('click', () => {
        $$('.quiz-choice', quiz).forEach((x) => x.classList.remove('correct', 'wrong'));
        const selected = Number(button.dataset.index);
        const ok = selected === answer;
        button.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) {
          const correct = $(`[data-index="${answer}"]`, quiz);
          if (correct) correct.classList.add('correct');
        }
        if (feedback) {
          const explanation = lang === 'ar' ? feedback.dataset.ar : feedback.dataset.en;
          const prefix = ok
            ? (lang === 'ar' ? '✓ صحيح. ' : '✓ Correct. ')
            : (lang === 'ar' ? '✗ راجع النموذج. ' : '✗ Review the model. ');
          feedback.textContent = prefix + (explanation || '');
        }
      });
    });
  });


  function chartColors() {
    const styles = getComputedStyle(document.documentElement);
    return {
      navy: styles.getPropertyValue('--navy').trim() || '#10233f',
      gold: styles.getPropertyValue('--gold').trim() || '#b58b2a',
      ink: styles.getPropertyValue('--ink').trim() || '#1f2937',
      muted: styles.getPropertyValue('--muted').trim() || '#687487',
      paper: styles.getPropertyValue('--paper').trim() || '#fffdf8',
      line: styles.getPropertyValue('--line').trim() || '#ddd7c9'
    };
  }

  function baseCanvas(explorer) {
    const canvas = $('canvas', explorer);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    const c = chartColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = c.paper;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '14px Arial, sans-serif';
    ctx.fillStyle = c.ink;
    ctx.lineWidth = 1.5;
    return { canvas, ctx, c, left: 62, right: canvas.width - 28, top: 24, bottom: canvas.height - 58 };
  }

  function drawAxes(g, xLabel, yLabel, xTicks = [], yTicks = []) {
    const { ctx, c, left, right, top, bottom } = g;
    ctx.strokeStyle = c.navy;
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.lineTo(left, bottom);
    ctx.lineTo(right, bottom);
    ctx.stroke();
    ctx.fillStyle = c.ink;
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, (left + right) / 2, bottom + 42);
    ctx.save();
    ctx.translate(18, (top + bottom) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
    ctx.font = '12px Arial, sans-serif';
    xTicks.forEach(([x, label]) => {
      ctx.strokeStyle = c.line;
      ctx.beginPath(); ctx.moveTo(x, bottom); ctx.lineTo(x, bottom + 5); ctx.stroke();
      ctx.fillStyle = c.muted; ctx.textAlign = 'center'; ctx.fillText(label, x, bottom + 20);
    });
    yTicks.forEach(([y, label]) => {
      ctx.strokeStyle = c.line;
      ctx.beginPath(); ctx.moveTo(left - 5, y); ctx.lineTo(right, y); ctx.stroke();
      ctx.fillStyle = c.muted; ctx.textAlign = 'right'; ctx.fillText(label, left - 9, y + 4);
    });
  }

  function drawMaxwell(explorer) {
    const g = baseCanvas(explorer); if (!g) return;
    const input = $('[data-param="T"]', explorer);
    const T = Number(input.value);
    const R = 8.31446261815324, M = 0.0280134;
    const crms = Math.sqrt(3 * R * T / M);
    const vmp = Math.sqrt(2 * R * T / M);
    const vmax = Math.max(1000, crms * 3.15);
    const points = [];
    let ymax = 0;
    for (let i = 0; i <= 220; i += 1) {
      const v = vmax * i / 220;
      const f = 4 * Math.PI * Math.pow(M / (2 * Math.PI * R * T), 1.5) * v * v * Math.exp(-M * v * v / (2 * R * T));
      points.push([v, f]); ymax = Math.max(ymax, f);
    }
    const { ctx, c, left, right, top, bottom } = g;
    const x = (v) => left + (right - left) * v / vmax;
    const y = (f) => bottom - (bottom - top) * f / (ymax * 1.08);
    drawAxes(g, lang === 'ar' ? 'السرعة / m s⁻¹' : 'Speed / m s⁻¹', lang === 'ar' ? 'كثافة الاحتمال f(v)' : 'Probability density f(v)',
      [[left, '0'], [x(vmax / 2), String(Math.round(vmax / 2))], [right, String(Math.round(vmax))]],
      [[bottom, '0'], [y(ymax), ymax.toExponential(1)]]);
    ctx.strokeStyle = c.gold; ctx.lineWidth = 3; ctx.beginPath();
    points.forEach(([v, f], i) => { if (i === 0) ctx.moveTo(x(v), y(f)); else ctx.lineTo(x(v), y(f)); }); ctx.stroke();
    ctx.setLineDash([5, 5]); ctx.strokeStyle = c.navy;
    [vmp, crms].forEach((v) => { ctx.beginPath(); ctx.moveTo(x(v), bottom); ctx.lineTo(x(v), top); ctx.stroke(); });
    ctx.setLineDash([]);
    $('[data-output="T"]', explorer).textContent = `${T.toFixed(0)} K`;
    $('.explorer-readout', explorer).textContent = lang === 'ar'
      ? `عند T = ${T.toFixed(0)} K لغاز N₂: السرعة الأكثر احتمالاً ≈ ${vmp.toFixed(0)} m s⁻¹، والسرعة الجذرية المتوسطة التربيعية ≈ ${crms.toFixed(0)} m s⁻¹.`
      : `At T = ${T.toFixed(0)} K for N₂: most-probable speed ≈ ${vmp.toFixed(0)} m s⁻¹; rms speed ≈ ${crms.toFixed(0)} m s⁻¹.`;
  }

  function drawParticleBox(explorer) {
    const g = baseCanvas(explorer); if (!g) return;
    const n = Number($('[data-param="n"]', explorer).value);
    const Lnm = Number($('[data-param="L"]', explorer).value);
    const { ctx, c, left, right, top, bottom } = g;
    const mid = (top + bottom) / 2;
    drawAxes(g, lang === 'ar' ? 'الموضع داخل الصندوق' : 'Position in box', lang === 'ar' ? 'دالة موجة مقيسة ψ' : 'Scaled wavefunction ψ',
      [[left, '0'], [right, `${Lnm.toFixed(2)} nm`]], [[mid, '0']]);
    ctx.strokeStyle = c.gold; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 320; i += 1) {
      const u = i / 320;
      const px = left + (right - left) * u;
      const py = mid - Math.sin(n * Math.PI * u) * (bottom - top) * 0.36;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = c.navy;
    for (let k = 1; k < n; k += 1) {
      const px = left + (right - left) * k / n;
      ctx.beginPath(); ctx.arc(px, mid, 4, 0, Math.PI * 2); ctx.fill();
    }
    const h = 6.62607015e-34, me = 9.1093837015e-31, eV = 1.602176634e-19;
    const L = Lnm * 1e-9;
    const E = h * h * n * n / (8 * me * L * L) / eV;
    $('[data-output="n"]', explorer).textContent = String(n);
    $('[data-output="L"]', explorer).textContent = `${Lnm.toFixed(2)} nm`;
    $('.explorer-readout', explorer).textContent = lang === 'ar'
      ? `الحالة n = ${n} لها ${n - 1} عقد داخلية، وطاقة Eₙ ≈ ${E.toFixed(3)} eV عند L = ${Lnm.toFixed(2)} nm.`
      : `State n = ${n} has ${n - 1} internal node(s), with Eₙ ≈ ${E.toFixed(3)} eV at L = ${Lnm.toFixed(2)} nm.`;
  }

  function drawBoltzmann(explorer) {
    const g = baseCanvas(explorer); if (!g) return;
    const T = Number($('[data-param="T"]', explorer).value);
    const dE = Number($('[data-param="dE"]', explorer).value);
    const R = 8.31446261815324;
    const ratio = Math.exp(-dE * 1000 / (R * T));
    const q = 1 + ratio;
    const pg = 1 / q, pe = ratio / q;
    const { ctx, c, left, right, top, bottom } = g;
    const y = (p) => bottom - (bottom - top) * p;
    drawAxes(g, lang === 'ar' ? 'المستوى' : 'Level', lang === 'ar' ? 'كسر السكان' : 'Population fraction',
      [[left + (right-left)*0.3, lang === 'ar' ? 'أرضي' : 'Ground'], [left + (right-left)*0.7, lang === 'ar' ? 'مثار' : 'Excited']],
      [[bottom, '0'], [y(0.5), '0.5'], [top, '1.0']]);
    const bw = Math.min(130, (right-left)*0.18);
    [[0.3, pg], [0.7, pe]].forEach(([u,p], idx) => {
      const cx = left + (right-left)*u;
      ctx.fillStyle = idx === 0 ? c.navy : c.gold;
      ctx.fillRect(cx-bw/2, y(p), bw, bottom-y(p));
      ctx.fillStyle = c.ink; ctx.textAlign = 'center'; ctx.fillText(p.toFixed(3), cx, y(p)-8);
    });
    $('[data-output="T"]', explorer).textContent = `${T.toFixed(0)} K`;
    $('[data-output="dE"]', explorer).textContent = `${dE.toFixed(1)} kJ mol⁻¹`;
    $('.explorer-readout', explorer).textContent = lang === 'ar'
      ? `T = ${T.toFixed(0)} K، ΔE = ${dE.toFixed(1)} kJ mol⁻¹: السكان الأرضي = ${pg.toFixed(3)}، المثار = ${pe.toFixed(3)}، ودالة التقسيم q = ${q.toFixed(3)}.`
      : `T = ${T.toFixed(0)} K, ΔE = ${dE.toFixed(1)} kJ mol⁻¹: ground = ${pg.toFixed(3)}, excited = ${pe.toFixed(3)}, partition function q = ${q.toFixed(3)}.`;
  }

  function drawExplorers() {
    $$('[data-explorer]').forEach((explorer) => {
      const kind = Number(explorer.dataset.explorer);
      if (kind === 2) drawMaxwell(explorer);
      if (kind === 10) drawParticleBox(explorer);
      if (kind === 20) drawBoltzmann(explorer);
    });
  }

  function setupExplorers() {
    $$('[data-explorer] input[type="range"]').forEach((input) => {
      input.addEventListener('input', drawExplorers);
    });
    drawExplorers();
  }

  const back = $('#back');
  if (back) {
    const updateBack = () => back.classList.toggle('show', window.scrollY > 800);
    window.addEventListener('scroll', updateBack, { passive: true });
    back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateBack();
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$('[data-nav]').forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: '-25% 0px -65%' });
    $$('.module').forEach((m) => observer.observe(m));
  }

  setupExplorers();
  progress();
  apply();
})();
