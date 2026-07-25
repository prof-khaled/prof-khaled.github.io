(() => {
  const root = document.querySelector('[data-publications-browser]');
  if (!root) return;

  const els = {
    search: root.querySelector('[data-publication-search]'),
    year: root.querySelector('[data-publication-year]'),
    type: root.querySelector('[data-publication-type]'),
    sort: root.querySelector('[data-publication-sort]'),
    clear: root.querySelector('[data-publication-clear]'),
    count: root.querySelector('[data-publication-count]'),
    list: root.querySelector('[data-publication-list]'),
    more: root.querySelector('[data-publication-more]')
  };

  const PAGE_SIZE = 15;
  let records = [];
  let visible = PAGE_SIZE;

  const labels = {
    ar: {
      shown: (n, total) => `عرض ${n} من أصل ${total} منشورًا`,
      empty: 'لا توجد منشورات مطابقة لمعايير البحث.',
      link: 'عرض DOI',
      placeholder: 'العنوان أو المؤلف أو المجلة',
      allYears: 'جميع السنوات',
      allTypes: 'جميع الأنواع',
      sort: ['الترتيب الأصلي للملف','الأحدث أولًا','الأقدم أولًا','رقم المنشور','اسم المجلة'],
      types: {
        'research-article': 'مقالة بحثية',
        'review-article': 'مقالة مراجعة',
        'conference-paper': 'ورقة مؤتمر',
        corrigendum: 'تصحيح',
        erratum: 'استدراك'
      }
    },
    en: {
      shown: (n, total) => `Showing ${n} of ${total} publications`,
      empty: 'No publications match the selected filters.',
      link: 'View DOI',
      placeholder: 'Title, author, or journal',
      allYears: 'All years',
      allTypes: 'All types',
      sort: ['Original Document Order','Newest first','Oldest first','Publication number','Journal name'],
      types: {
        'research-article': 'Research Article',
        'review-article': 'Review Article',
        'conference-paper': 'Conference Paper',
        corrigendum: 'Corrigendum',
        erratum: 'Erratum'
      }
    }
  };

  const language = () => document.documentElement.lang === 'en' ? 'en' : 'ar';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));

  function filteredRecords() {
    const query = els.search.value.trim().toLocaleLowerCase();
    const year = els.year.value;
    const type = els.type.value;
    const sort = els.sort.value;
    const result = records.filter(record =>
      (!query || record.searchText.includes(query)) &&
      (!year || String(record.year) === year) &&
      (!type || record.type === type)
    );
    if (sort === 'newest') result.sort((a, b) => (b.year || 0) - (a.year || 0) || a.number - b.number);
    if (sort === 'oldest') result.sort((a, b) => (a.year || 0) - (b.year || 0) || a.number - b.number);
    if (sort === 'number') result.sort((a, b) => a.number - b.number);
    if (sort === 'journal') result.sort((a, b) => a.citation.localeCompare(b.citation, 'en'));
    return result;
  }

  function render() {
    const lang = language();
    const copy = labels[lang];
    els.search.placeholder = copy.placeholder;
    els.year.options[0].textContent = copy.allYears;
    els.type.options[0].textContent = copy.allTypes;
    [...els.type.options].slice(1).forEach(option => {
      option.textContent = copy.types[option.value] || option.value;
    });
    [...els.sort.options].forEach((option, index) => { option.textContent = copy.sort[index]; });
    const result = filteredRecords();
    const shown = result.slice(0, visible);
    els.count.textContent = copy.shown(shown.length, result.length);
    els.list.innerHTML = shown.length ? shown.map(record => `
      <article class="publication-card" dir="ltr" lang="en">
        <div class="publication-card__number" aria-label="Publication number ${record.number}">${record.number}</div>
        <div>
          <div class="publication-card__meta">
            ${record.year ? `<span class="publication-card__badge">${record.year}</span>` : ''}
            <span class="publication-card__badge">${escapeHTML(copy.types[record.type] || record.type)}</span>
            ${record.status === 'In Press' ? '<span class="publication-card__badge">In Press</span>' : ''}
          </div>
          <h3 class="publication-card__citation">${escapeHTML(record.citation)}</h3>
          ${record.doi ? `<a class="publication-card__link" href="${escapeHTML(record.doi)}" target="_blank" rel="noopener noreferrer">${copy.link}</a>` : ''}
        </div>
      </article>`).join('') : `<p class="publication-empty">${copy.empty}</p>`;
    els.more.hidden = shown.length >= result.length;
  }

  function resetPage() { visible = PAGE_SIZE; render(); }
  [els.search, els.year, els.type, els.sort].forEach(control => control.addEventListener('input', resetPage));
  els.clear.addEventListener('click', () => {
    els.search.value = '';
    els.year.value = '';
    els.type.value = '';
    els.sort.value = 'original';
    resetPage();
  });
  els.more.addEventListener('click', () => { visible += PAGE_SIZE; render(); });

  function loadRecords(data) {
      records = data.slice().sort((a, b) => a.displayOrder - b.displayOrder);
      [...new Set(records.map(item => item.year).filter(Boolean))]
        .sort((a, b) => a - b)
        .forEach(year => els.year.add(new Option(String(year), String(year))));
      render();
  }

  if (Array.isArray(window.PUBLICATIONS_DATA)) {
    loadRecords(window.PUBLICATIONS_DATA);
  } else {
    fetch('assets/publications-data.json')
      .then(response => {
        if (!response.ok) throw new Error(`Publication data request failed: ${response.status}`);
        return response.json();
      })
      .then(loadRecords)
      .catch(() => {
      els.list.innerHTML = '<p class="publication-empty">Publication data could not be loaded.</p>';
      els.more.hidden = true;
      });
  }

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
