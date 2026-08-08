(() => {
  'use strict';
  const root = document.documentElement;
  const filterButtons = [...document.querySelectorAll('[data-award-filter]')];
  const cards = [...document.querySelectorAll('[data-award-category]')];
  const sections = [...document.querySelectorAll('[data-category-section]')];
  const applyFilter = filter => {
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.awardFilter === filter)));
    cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.awardCategory !== filter; });
    sections.forEach(section => {
      const visible = [...section.querySelectorAll('[data-award-category]')].some(card => !card.hidden);
      section.hidden = !visible;
    });
  };
  filterButtons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.awardFilter)));

  const dialog = document.getElementById('document-dialog');
  if (!dialog) return;
  const image = document.getElementById('document-dialog-image');
  const title = document.getElementById('document-dialog-title');
  const meta = document.getElementById('document-dialog-meta');
  const counter = document.getElementById('document-dialog-counter');
  const closeButton = dialog.querySelector('.dialog-close');
  const previousButton = dialog.querySelector('.dialog-prev');
  const nextButton = dialog.querySelector('.dialog-next');
  let documents = [], altsEn = [], altsAr = [], current = 0, opener = null, activeData = null;

  const language = () => root.lang === 'ar' ? 'ar' : 'en';
  const render = () => {
    if (!documents.length || !activeData) return;
    image.src = documents[current];
    image.alt = (language() === 'ar' ? altsAr[current] : altsEn[current]) || '';
    title.textContent = language() === 'ar' ? activeData.titleAr : activeData.titleEn;
    meta.textContent = language() === 'ar' ? activeData.metaAr : activeData.metaEn;
    counter.textContent = language() === 'ar' ? `الوثيقة ${current + 1} من ${documents.length}` : `Document ${current + 1} of ${documents.length}`;
    previousButton.disabled = documents.length < 2;
    nextButton.disabled = documents.length < 2;
    closeButton.setAttribute('aria-label', language() === 'ar' ? 'إغلاق عارض الوثائق' : 'Close document viewer');
    previousButton.setAttribute('aria-label', language() === 'ar' ? 'الوثيقة السابقة' : 'Previous document');
    nextButton.setAttribute('aria-label', language() === 'ar' ? 'الوثيقة التالية' : 'Next document');
  };
  document.querySelectorAll('.view-document').forEach(button => button.addEventListener('click', () => {
    opener = button;
    documents = button.dataset.documents.split('|').filter(Boolean);
    altsEn = button.dataset.altEn.split('|');
    altsAr = button.dataset.altAr.split('|');
    activeData = {titleEn:button.dataset.titleEn,titleAr:button.dataset.titleAr,metaEn:button.dataset.metaEn,metaAr:button.dataset.metaAr};
    current = 0;
    render();
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open','');
    closeButton.focus();
  }));
  const move = delta => { if (!documents.length) return; current = (current + delta + documents.length) % documents.length; render(); };
  previousButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); opener?.focus(); });
  document.addEventListener('site:languagechange', render);
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') move(root.dir === 'rtl' ? 1 : -1);
    if (event.key === 'ArrowRight') move(root.dir === 'rtl' ? -1 : 1);
  });
})();
