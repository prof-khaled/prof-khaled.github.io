
(() => {
  'use strict';
  const root=document.documentElement;
  const dataNode=document.getElementById('books-data');
  const books=JSON.parse(dataNode?.textContent||'[]');
  const bookMap=new Map(books.map(book=>[book.id,book]));
  const cards=[...document.querySelectorAll('.book-card')];
  const search=document.getElementById('book-search');
  const filters=[...document.querySelectorAll('.filter-button')];
  const result=document.getElementById('book-results');
  const noResults=document.getElementById('no-results');
  let activeFilter='all';
  let lastTrigger=null;
  let currentIndex=0;
  const lang=()=>root.lang==='ar'?'ar':'en';
  const text=(en,ar)=>lang()==='ar'?ar:en;

  function applyFilters(scroll=false){
    const query=(search?.value||'').trim().toLowerCase();
    let visible=0;
    cards.forEach(card=>{
      const cats=(card.dataset.categories||'').split(/\s+/);
      const matchesFilter=activeFilter==='all'||cats.includes(activeFilter);
      const matchesSearch=!query||(card.dataset.search||'').includes(query);
      const show=matchesFilter&&matchesSearch;
      card.hidden=!show;
      if(show) visible++;
    });
    document.querySelectorAll('[data-catalogue-group]').forEach(group=>{
      group.hidden=![...group.querySelectorAll('.book-card')].some(card=>!card.hidden);
    });
    if(result) result.textContent=text(`${visible} ${visible===1?'book':'books'} found`,`تم العثور على ${visible} ${visible===1?'كتاب':'كتابًا'}`);
    noResults?.classList.toggle('is-visible',visible===0);
    if(scroll) document.getElementById('catalogue')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  filters.forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter||'all';
    filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    applyFilters();
  }));
  search?.addEventListener('input',()=>applyFilters());
  document.querySelectorAll('.js-series-filter').forEach(button=>button.addEventListener('click',()=>{
    activeFilter=button.dataset.filter||'all';
    filters.forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.filter===activeFilter)));
    applyFilters(true);
  }));

  const dialog=document.getElementById('book-dialog');
  const dialogTitle=document.getElementById('dialog-title');
  const dialogImage=document.getElementById('dialog-image');
  const dialogDesc=document.getElementById('dialog-description');
  const dialogData=document.getElementById('dialog-data');
  const dialogActions=document.getElementById('dialog-actions');
  const dialogBadges=document.getElementById('dialog-badges');
  const closeButton=dialog?.querySelector('.dialog-close');

  function renderDialog(book){
    if(!book) return;
    currentIndex=books.findIndex(item=>item.id===book.id);
    dialogTitle.textContent=book.title;
    dialogImage.src=book.image;
    dialogImage.alt=text(`Documented cover and publication record for ${book.title}`,`صورة الغلاف وبيانات النشر الموثقة لكتاب ${book.title}`);
    dialogDesc.textContent=lang()==='ar'?book.description_ar:book.description_en;
    const kind=book.kind==='digital'?text('Digital Book','كتاب رقمي'):text('Printed Question Bank','كتاب مطبوع وبنك أسئلة');
    dialogBadges.innerHTML=`<span class="book-badge gold">${kind}</span><span class="book-badge">${book.year}</span>${book.part?`<span class="book-badge">${book.part}</span>`:''}`;
    const rows=[
      [text('Author','المؤلف'),book.author],[text('Publication date','تاريخ النشر'),book.date],[text('Pages','عدد الصفحات'),book.pages],[text('Publisher / platform','الناشر / المنصة'),book.publisher]
    ];
    if(book.series) rows.push([text('Series','السلسلة'),book.series]);
    if(book.deposit_number) rows.push([text('Deposit number','رقم الإيداع'),book.deposit_number]);
    if(book.isbn) rows.push(['ISBN',book.isbn]);
    dialogData.innerHTML=rows.map(([k,v])=>`<dt>${k}</dt><dd><bdi>${v}</bdi></dd>`).join('');
    dialogActions.innerHTML='';
    if(book.url){
      const a=document.createElement('a');a.className='book-action';a.href=book.url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=text('View on Apple Books','عرض على Apple Books');dialogActions.append(a);
    }
    if(book.isbn){
      const button=document.createElement('button');button.type='button';button.className='book-action secondary';button.textContent=text('Copy ISBN','نسخ ISBN');button.addEventListener('click',()=>copyText(book.isbn,button));dialogActions.append(button);
    }
  }
  function openBook(id,trigger){
    const book=bookMap.get(id);if(!book||!dialog) return;lastTrigger=trigger;renderDialog(book);dialog.showModal();closeButton?.focus();
  }
  document.addEventListener('click',event=>{
    const opener=event.target.closest('.js-book-details');if(opener){openBook(opener.dataset.bookId,opener);return;}
    const copier=event.target.closest('.js-copy-isbn');if(copier) copyText(copier.dataset.isbn,copier);
  });
  async function copyText(value,button){
    try{await navigator.clipboard.writeText(value);const old=button.textContent;button.textContent=text('Copied','تم النسخ');setTimeout(()=>button.textContent=old,1300);}catch(_){window.prompt(text('Copy ISBN','انسخ رقم ISBN'),value);}
  }
  closeButton?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog) dialog.close();});
  dialog?.addEventListener('close',()=>lastTrigger?.focus());
  document.getElementById('dialog-prev')?.addEventListener('click',()=>renderDialog(books[(currentIndex-1+books.length)%books.length]));
  document.getElementById('dialog-next')?.addEventListener('click',()=>renderDialog(books[(currentIndex+1)%books.length]));
  document.addEventListener('site:languagechange',()=>{applyFilters();if(dialog?.open) renderDialog(books[currentIndex]);});
  applyFilters();
})();
