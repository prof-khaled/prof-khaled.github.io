
(() => {
  'use strict';

  const root = document.documentElement;
  const cards = [...document.querySelectorAll('[data-project]')];
  const search = document.getElementById('projectSearch');
  const filterButtons = [...document.querySelectorAll('[data-project-filter]')];
  const resultCount = document.getElementById('projectResultCount');
  const noResults = document.getElementById('projectNoResults');
  let activeFilter = 'all';

  const currentLanguage = () => root.lang === 'ar' ? 'ar' : 'en';

  function updateSearchPlaceholder() {
    if (!search) return;
    search.placeholder = currentLanguage() === 'ar'
      ? 'ابحث بالعنوان أو الجهة أو المجال أو السنة'
      : 'Search by title, organisation, field or year';
  }

  function updateImageAlternatives() {
    const isArabic = currentLanguage() === 'ar';
    document.querySelectorAll('img[data-alt-en][data-alt-ar]').forEach(image => {
      image.alt = isArabic ? image.dataset.altAr : image.dataset.altEn;
    });
  }

  function updateResultCount(count) {
    if (!resultCount) return;
    resultCount.textContent = currentLanguage() === 'ar'
      ? `يتم عرض ${count} مشروعًا`
      : `Showing ${count} project${count === 1 ? '' : 's'}`;
  }

  function cardMatchesFilter(card) {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pi' || activeFilter === 'copi') {
      return card.dataset.role === activeFilter;
    }
    return (card.dataset.categories || '').split(/\s+/).includes(activeFilter);
  }

  function applyFilters() {
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matchesText = !query || (card.dataset.search || '').includes(query);
      const matchesFilter = cardMatchesFilter(card);
      card.hidden = !(matchesText && matchesFilter);
      if (!card.hidden) visible += 1;
    });
    updateResultCount(visible);
    if (noResults) noResults.hidden = visible !== 0;
  }

  search?.addEventListener('input', applyFilters);
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.projectFilter || 'all';
      filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      applyFilters();
    });
  });

  const dialog = document.getElementById('projectDocumentDialog');
  const dialogTitle = document.getElementById('documentDialogTitle');
  const dialogImage = document.getElementById('documentDialogImage');
  const dialogCaption = document.getElementById('documentDialogCaption');
  const openButtons = [...document.querySelectorAll('.js-open-document')];
  const uniqueDocuments = [];
  const seen = new Set();
  openButtons.forEach(button => {
    const id = button.dataset.docId;
    if (!id || seen.has(id)) return;
    seen.add(id);
    uniqueDocuments.push({
      id,
      src: button.dataset.docSrc,
      titleEn: button.dataset.docTitleEn,
      titleAr: button.dataset.docTitleAr,
      captionEn: button.dataset.docCaptionEn,
      captionAr: button.dataset.docCaptionAr,
      altEn: button.dataset.docAltEn,
      altAr: button.dataset.docAltAr
    });
  });
  let activeDocumentIndex = 0;
  let returnFocus = null;

  function renderDocument(index) {
    if (!dialog || !uniqueDocuments.length) return;
    activeDocumentIndex = (index + uniqueDocuments.length) % uniqueDocuments.length;
    const item = uniqueDocuments[activeDocumentIndex];
    const isArabic = currentLanguage() === 'ar';
    dialogTitle.textContent = isArabic ? item.titleAr : item.titleEn;
    dialogImage.src = item.src;
    dialogImage.alt = isArabic ? item.altAr : item.altEn;
    dialogCaption.textContent = isArabic ? item.captionAr : item.captionEn;
  }

  function openDocument(button) {
    if (!dialog) return;
    returnFocus = button;
    const index = uniqueDocuments.findIndex(item => item.id === button.dataset.docId);
    renderDocument(index >= 0 ? index : 0);
    dialog.showModal();
    dialog.querySelector('[data-dialog-close]')?.focus();
  }

  openButtons.forEach(button => button.addEventListener('click', () => openDocument(button)));
  dialog?.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('[data-dialog-previous]')?.addEventListener('click', () => renderDocument(activeDocumentIndex - 1));
  dialog?.querySelector('[data-dialog-next]')?.addEventListener('click', () => renderDocument(activeDocumentIndex + 1));
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => returnFocus?.focus());
  dialog?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') renderDocument(activeDocumentIndex - 1);
    if (event.key === 'ArrowRight') renderDocument(activeDocumentIndex + 1);
  });

  document.addEventListener('site:languagechange', () => {
    updateSearchPlaceholder();
    updateImageAlternatives();
    updateResultCount(cards.filter(card => !card.hidden).length);
    if (dialog?.open) renderDocument(activeDocumentIndex);
    document.querySelectorAll('.document-thumb img').forEach(image => {
      const button = image.closest('.js-open-document');
      if (!button) return;
      image.alt = currentLanguage() === 'ar' ? button.dataset.docAltAr : button.dataset.docAltEn;
    });
  });

  updateSearchPlaceholder();
  updateImageAlternatives();
  applyFilters();
})();
