
(()=>{
  'use strict';
  const root=document.documentElement;
  const langButtons=[...document.querySelectorAll('[data-kfk-lang],[data-global-language]')];
  const pageTitles={en:document.body?.dataset.titleEn||document.title,ar:document.body?.dataset.titleAr||document.title};
  const pageDescriptions={en:document.body?.dataset.descriptionEn||'',ar:document.body?.dataset.descriptionAr||''};
  function applyLanguage(value){
    const lang=value==='ar'?'ar':'en';
    root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';root.dataset.view=lang;root.dataset.language=lang;
    document.querySelectorAll('.en,.ar').forEach(el=>{el.hidden=!el.classList.contains(lang)});
    document.querySelectorAll('[data-lang]').forEach(el=>{el.hidden=el.dataset.lang!==lang});
    langButtons.forEach(btn=>btn.setAttribute('aria-pressed',String((btn.dataset.kfkLang||btn.dataset.globalLanguage)===lang)));
    if(pageTitles[lang])document.title=pageTitles[lang];
    const meta=document.querySelector('meta[name="description"]');if(meta&&pageDescriptions[lang])meta.content=pageDescriptions[lang];
    try{localStorage.setItem('site-language',lang);localStorage.setItem('kfk-language',lang);localStorage.setItem('pk-language',lang)}catch(_){ }
    const mainNav=document.querySelector('.v13-nav-shell .kfk-nav');if(mainNav)mainNav.setAttribute('aria-label',lang==='ar'?'التنقل الرئيسي':'Main navigation');const menuToggle=document.querySelector('.v13-nav-shell .kfk-menu-toggle');if(menuToggle)menuToggle.setAttribute('aria-label',lang==='ar'?'فتح أو إغلاق القائمة':'Open or close menu');document.querySelectorAll('.v13-on-page').forEach(el=>el.setAttribute('aria-label',lang==='ar'?'في هذه الصفحة':'On this page'));window.dispatchEvent(new CustomEvent('kfk:language',{detail:{language:lang}}));
  }
  let saved='en';try{const queryLang=new URLSearchParams(location.search).get('lang');saved=(queryLang&&['en','ar'].includes(queryLang))?queryLang:(localStorage.getItem('site-language')||localStorage.getItem('kfk-language')||root.lang||'en')}catch(_){saved=root.lang||'en'}
  applyLanguage(saved);
  langButtons.forEach(btn=>btn.addEventListener('click',()=>applyLanguage(btn.dataset.kfkLang||btn.dataset.globalLanguage)));

  const nav=document.querySelector('.v13-nav-shell .kfk-nav');
  const toggle=document.querySelector('.v13-nav-shell .kfk-menu-toggle');
  const dropdowns=[...document.querySelectorAll('.v13-nav-shell .kfk-dd')];
  const closeDropdowns=(except=null)=>dropdowns.forEach(dd=>{if(dd===except)return;dd.classList.remove('is-open');dd.querySelector(':scope>button')?.setAttribute('aria-expanded','false')});
  toggle?.addEventListener('click',()=>{const open=nav?.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(Boolean(open)))});
  dropdowns.forEach(dd=>dd.querySelector(':scope>button')?.addEventListener('click',e=>{e.stopPropagation();const open=!dd.classList.contains('is-open');closeDropdowns(dd);dd.classList.toggle('is-open',open);dd.querySelector(':scope>button')?.setAttribute('aria-expanded',String(open))}));
  document.addEventListener('click',e=>{if(!e.target.closest('.v13-nav-shell'))closeDropdowns()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDropdowns();nav?.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false')}});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false')}));
  const current=(location.pathname.split('/').pop()||'index.html');document.querySelectorAll('.v13-nav-shell a[href]').forEach(a=>{if(a.getAttribute('href').split('#')[0]===current)a.setAttribute('aria-current','page')});
  document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();
