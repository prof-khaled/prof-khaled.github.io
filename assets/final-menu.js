(function(){
  function init(){
    const toggle=document.querySelector('.global-menu-toggle');
    const nav=document.querySelector('.global-navigation');
    if(!toggle||!nav)return;
    toggle.addEventListener('click',function(){
      const open=nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded',String(open));
    });
    document.addEventListener('click',function(e){
      if(window.innerWidth>1350)return;
      if(!nav.contains(e.target)&&!toggle.contains(e.target)){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
    window.addEventListener('resize',function(){
      if(window.innerWidth>1350){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
