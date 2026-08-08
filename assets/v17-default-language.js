(()=>{
  // V17 requirement: English is the initial/default view on every standard website page.
  window.addEventListener('load',()=>{
    const root=document.documentElement;
    root.lang='en'; root.dir='ltr'; root.dataset.view='en';
    document.querySelectorAll('[data-kfk-lang],[data-lang],[data-language]').forEach(b=>{
      const val=b.dataset.kfkLang||b.dataset.lang||b.dataset.language;
      if(val==='en'||val==='ar') b.setAttribute('aria-pressed',String(val==='en'));
    });
  },{once:true});
})();
