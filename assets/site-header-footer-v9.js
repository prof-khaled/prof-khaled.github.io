
(()=>{
 const root=document.documentElement,nav=document.querySelector('.kfk-nav'),toggle=document.querySelector('.kfk-menu-toggle'),mega=document.querySelector('.kfk-mega'),serviceBtn=document.querySelector('.kfk-services-trigger');
 const closeAll=()=>{document.querySelectorAll('.kfk-dd.is-open').forEach(x=>{x.classList.remove('is-open');x.querySelector('button')?.setAttribute('aria-expanded','false')});mega?.classList.remove('is-open');serviceBtn?.setAttribute('aria-expanded','false')};
 toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
 document.querySelectorAll('.kfk-dd>button').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();const dd=btn.parentElement,will=!dd.classList.contains('is-open');closeAll();dd.classList.toggle('is-open',will);btn.setAttribute('aria-expanded',String(will))}));
 serviceBtn?.addEventListener('click',e=>{e.stopPropagation();const open=!mega.classList.contains('is-open');closeAll();mega.classList.toggle('is-open',open);serviceBtn.setAttribute('aria-expanded',String(open))});
 document.addEventListener('click',e=>{if(!e.target.closest('.kfk-site-header')&&!e.target.closest('.kfk-nav-shell'))closeAll()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
 document.querySelectorAll('[data-kfk-lang]').forEach(btn=>btn.addEventListener('click',()=>{const lang=btn.dataset.kfkLang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';root.dataset.view=lang;document.querySelectorAll('[data-kfk-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));try{localStorage.setItem('site-language',lang)}catch(_){}}));
 const saved=(()=>{try{return localStorage.getItem('site-language')}catch(_){return null}})(); if(saved==='ar'||saved==='en'){root.lang=saved;root.dir=saved==='ar'?'rtl':'ltr';root.dataset.view=saved;document.querySelectorAll('[data-kfk-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.kfkLang===saved)))}
 document.querySelectorAll('[data-current-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();
